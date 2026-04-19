package main

import (
	"math"
	"strconv"
)

// ============================================================
// Color parsing
// ============================================================

func parseColor(hex string) RGBA {
	if hex == "" {
		return RGBA{1, 1, 1, 1}
	}
	r := parseHexByte(hex, 0)
	g := parseHexByte(hex, 2)
	b := parseHexByte(hex, 4)
	a := 1.0
	if len(hex) >= 8 {
		a = parseHexByte(hex, 6)
	}
	return RGBA{r, g, b, a}
}

func parseHexByte(hex string, offset int) float64 {
	if offset+2 > len(hex) {
		return 1.0
	}
	v, _ := strconv.ParseUint(hex[offset:offset+2], 16, 8)
	return float64(v) / 255.0
}

// ============================================================
// Bone world transforms
// ============================================================

type boneWorld struct {
	A, B, C, D     float64
	WorldX, WorldY float64
}

func computeBoneWorlds(bones map[string]*NormalizedBone, boneOrder []string) map[string]*boneWorld {
	deg := math.Pi / 180
	out := make(map[string]*boneWorld, len(boneOrder))
	for _, name := range boneOrder {
		bone := bones[name]
		cr := math.Cos(bone.Rotation * deg)
		sr := math.Sin(bone.Rotation * deg)
		la := cr * bone.ScaleX
		lb := -sr * bone.ScaleY
		lc := sr * bone.ScaleX
		ld := cr * bone.ScaleY
		if bone.Parent == "" {
			out[name] = &boneWorld{A: la, B: lb, C: lc, D: ld, WorldX: bone.X, WorldY: bone.Y}
		} else {
			p := out[bone.Parent]
			out[name] = &boneWorld{
				A: p.A*la + p.B*lc, B: p.A*lb + p.B*ld,
				C: p.C*la + p.D*lc, D: p.C*lb + p.D*ld,
				WorldX: p.A*bone.X + p.B*bone.Y + p.WorldX,
				WorldY: p.C*bone.X + p.D*bone.Y + p.WorldY,
			}
		}
	}
	return out
}

// ============================================================
// Weighted mesh vertex parsing
// ============================================================

type meshVertex struct {
	U, V       float64
	Influences []MeshBoneInfluence
}

func parseWeightedMeshVertices(vertices []float64, uvs []float64, vertCount int, boneNames []string) []meshVertex {
	result := make([]meshVertex, 0, vertCount)
	idx := 0
	for vi := 0; vi < vertCount; vi++ {
		bc := int(vertices[idx])
		idx++
		influences := make([]MeshBoneInfluence, 0, bc)
		for b := 0; b < bc; b++ {
			bi := int(vertices[idx])
			lx := vertices[idx+1]
			ly := vertices[idx+2]
			w := vertices[idx+3]
			idx += 4
			influences = append(influences, MeshBoneInfluence{
				BoneName: boneNames[bi],
				LocalX:   lx,
				LocalY:   ly,
				Weight:   w,
			})
		}
		result = append(result, meshVertex{
			U:          uvs[vi*2],
			V:          uvs[vi*2+1],
			Influences: influences,
		})
	}
	return result
}

func vertexWorldPos(influences []MeshBoneInfluence, worlds map[string]*boneWorld) (wx, wy float64) {
	for _, inf := range influences {
		t := worlds[inf.BoneName]
		wx += (t.A*inf.LocalX + t.B*inf.LocalY + t.WorldX) * inf.Weight
		wy += (t.C*inf.LocalX + t.D*inf.LocalY + t.WorldY) * inf.Weight
	}
	return
}

// ============================================================
// Main parser
// ============================================================

func optF(p *float64, def float64) float64 {
	if p != nil {
		return *p
	}
	return def
}

func ParseSpineJson(j *SpineJson) *SpineData {
	// --- Normalize bones ---
	bones := make(map[string]*NormalizedBone, len(j.Bones))
	boneOrder := make([]string, 0, len(j.Bones))

	for _, raw := range j.Bones {
		bone := &NormalizedBone{
			Name:     raw.Name,
			Parent:   raw.Parent,
			X:        optF(raw.X, 0),
			Y:        optF(raw.Y, 0),
			Rotation: optF(raw.Rotation, 0),
			ScaleX:   optF(raw.ScaleX, 1),
			ScaleY:   optF(raw.ScaleY, 1),
			ShearX:   optF(raw.ShearX, 0),
			ShearY:   optF(raw.ShearY, 0),
			Length:   optF(raw.Length, 0),
		}
		bones[bone.Name] = bone
		boneOrder = append(boneOrder, bone.Name)
	}

	// Build children lists
	for _, bone := range bones {
		if bone.Parent != "" {
			if parent, ok := bones[bone.Parent]; ok {
				parent.Children = append(parent.Children, bone.Name)
			}
		}
	}

	// Pre-compute bone world transforms
	boneWorlds := computeBoneWorlds(bones, boneOrder)

	// --- Normalize slots ---
	slots := make([]*NormalizedSlot, len(j.Slots))
	slotBoneMap := make(map[string]string, len(j.Slots))
	for i, raw := range j.Slots {
		blend := raw.Blend
		if blend == "" {
			blend = "normal"
		}
		slots[i] = &NormalizedSlot{
			Name:       raw.Name,
			BoneName:   raw.Bone,
			Attachment: raw.Attachment,
			Color:      parseColor(raw.Color),
			Blend:      blend,
			Index:      i,
		}
		slotBoneMap[raw.Name] = raw.Bone
	}

	// --- Collect region & mesh attachments from all skins ---
	attachments := make(map[string]*OrderedAttachments)

	for _, skin := range j.Skins {
		for slotName, slotAttachments := range skin.Attachments {
			if _, ok := attachments[slotName]; !ok {
				attachments[slotName] = &OrderedAttachments{
					Values: make(map[string]*NormalizedRegionAttachment),
				}
			}
			slotMap := attachments[slotName]

			for _, attKey := range slotAttachments.Keys {
				attData := slotAttachments.Values[attKey]
				if attData == nil {
					continue
				}
				typ := attData.Type
				if typ == "" {
					typ = "region"
				}
				if typ != "region" && typ != "mesh" {
					continue
				}

				ax := optF(attData.X, 0)
				ay := optF(attData.Y, 0)
				aRot := optF(attData.Rotation, 0)
				aSx := optF(attData.ScaleX, 1)
				aSy := optF(attData.ScaleY, 1)

				isMesh := false
				meshAnchorU := 0.0
				meshAnchorV := 0.0
				var meshBoneContribs []MeshBoneContribution

				// For weighted mesh
				if typ == "mesh" && len(attData.Vertices) > 0 && len(attData.UVs) > 0 {
					vertCount := len(attData.UVs) / 2
					isWeighted := len(attData.Vertices) > vertCount*2
					if isWeighted {
						isMesh = true
						meshVerts := parseWeightedMeshVertices(attData.Vertices, attData.UVs, vertCount, boneOrder)

						// UV centroid for anchor point
						su, sv := 0.0, 0.0
						for _, mv := range meshVerts {
							su += mv.U
							sv += mv.V
						}
						meshAnchorU = su / float64(vertCount)
						meshAnchorV = sv / float64(vertCount)

						// World bounding box + centroid
						twx, twy := 0.0, 0.0
						minWx, maxWx := math.Inf(1), math.Inf(-1)
						minWy, maxWy := math.Inf(1), math.Inf(-1)
						for _, mv := range meshVerts {
							wpx, wpy := vertexWorldPos(mv.Influences, boneWorlds)
							twx += wpx
							twy += wpy
							minWx = math.Min(minWx, wpx)
							maxWx = math.Max(maxWx, wpx)
							minWy = math.Min(minWy, wpy)
							maxWy = math.Max(maxWy, wpy)
						}
						cwx := twx / float64(vertCount)
						cwy := twy / float64(vertCount)
						meshWorldW := maxWx - minWx
						meshWorldH := maxWy - minWy

						if slotBone, ok := slotBoneMap[slotName]; ok {
							bt := boneWorlds[slotBone]
							det := bt.A*bt.D - bt.B*bt.C
							dx := cwx - bt.WorldX
							dy := cwy - bt.WorldY
							ax = (bt.D*dx - bt.B*dy) / det
							ay = (-bt.C*dx + bt.A*dy) / det
						}

						// Scale: world extent / image pixels
						imgW := optF(attData.Width, 1)
						imgH := optF(attData.Height, 1)
						aSx = meshWorldW / imgW
						aSy = meshWorldH / imgH
						aRot = 0

						// Per-bone contributions for Position expression
						type boneAccum struct {
							sumLx, sumLy, sumW float64
						}
						boneMap := make(map[string]*boneAccum)
						for _, mv := range meshVerts {
							for _, inf := range mv.Influences {
								e, ok := boneMap[inf.BoneName]
								if !ok {
									e = &boneAccum{}
									boneMap[inf.BoneName] = e
								}
								e.sumLx += inf.LocalX * inf.Weight
								e.sumLy += inf.LocalY * inf.Weight
								e.sumW += inf.Weight
							}
						}
						totalW := 0.0
						for _, e := range boneMap {
							totalW += e.sumW
						}
						meshBoneContribs = make([]MeshBoneContribution, 0, len(boneMap))
						for boneName, e := range boneMap {
							bt := boneWorlds[boneName]
							meshBoneContribs = append(meshBoneContribs, MeshBoneContribution{
								BoneName:   boneName,
								AvgLocalX:  e.sumLx / e.sumW,
								AvgLocalY:  e.sumLy / e.sumW,
								Weight:     e.sumW / totalW,
								SetupAngle: math.Atan2(-bt.C, bt.A),
							})
						}
					} else {
						// Non-weighted mesh: vertices are bone-local [x,y,...]
						sx, sy := 0.0, 0.0
						for i := 0; i < len(attData.Vertices); i += 2 {
							sx += attData.Vertices[i]
							sy += attData.Vertices[i+1]
						}
						ax = sx / float64(vertCount)
						ay = sy / float64(vertCount)
						aRot = 0
						aSx = 1
						aSy = 1
					}
				}

				attPath := attData.Path
				if attPath == "" {
					attPath = attData.Name
				}
				if attPath == "" {
					attPath = attKey
				}

				att := &NormalizedRegionAttachment{
					Name:             attKey,
					Path:             attPath,
					X:                ax,
					Y:                ay,
					ScaleX:           aSx,
					ScaleY:           aSy,
					Rotation:         aRot,
					Width:            optF(attData.Width, 0),
					Height:           optF(attData.Height, 0),
					IsMesh:           isMesh,
					MeshAnchorU:      meshAnchorU,
					MeshAnchorV:      meshAnchorV,
					MeshBoneContribs: meshBoneContribs,
				}
				if _, exists := slotMap.Values[attKey]; !exists {
					slotMap.Keys = append(slotMap.Keys, attKey)
				}
				slotMap.Values[attKey] = att
			}
		}
	}

	return &SpineData{
		Skeleton:    j.Skeleton,
		Bones:       bones,
		BoneOrder:   boneOrder,
		Slots:       slots,
		Attachments: attachments,
		Animations:  j.Animations,
	}
}
