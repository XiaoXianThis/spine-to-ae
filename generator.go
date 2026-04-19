package main

import (
	"encoding/json"
	"fmt"
	"math"
	"strconv"
	"strings"
)

// ============================================================
// Coordinate system conversion:
//
// Spine:  Y-up,  rotation CCW positive, origin at skeleton root (0,0)
// AE:    Y-down, rotation CW positive, origin at comp top-left
//
// Mapping:
//   - Comp maps skeleton AABB + padding
//   - Root bone placed in comp so that Spine (0,0) maps correctly
//   - Child bone positions: AE_x = bone.x,  AE_y = -bone.y  (relative to parent null anchor)
//   - Rotation: AE_rotation = -Spine_rotation
//   - Scale: AE_scale = [Spine_scaleX * 100, Spine_scaleY * 100]
//   - Null layers (100x100) for bones, anchor at [50,50]
//   - Child position relative to parent null: [50 + dx, 50 - dy]
// ============================================================

type GeneratorOptions struct {
	SpineData     *SpineData
	TextureDir    string
	AnimationName string
	CompName      string
	CompPadding   float64
}

func GenerateScript(opts GeneratorOptions) string {
	data := opts.SpineData
	textureDir := opts.TextureDir
	animationName := opts.AnimationName
	compName := opts.CompName
	if compName == "" {
		compName = "Spine Import"
	}
	compPadding := opts.CompPadding
	if compPadding == 0 {
		compPadding = 200
	}

	skeleton := data.Skeleton
	bones := data.Bones
	boneOrder := data.BoneOrder
	slots := data.Slots
	attachments := data.Attachments
	animations := data.Animations

	fps := skeleton.FPS
	if fps == 0 {
		fps = 30
	}
	compWidth := int(math.Ceil(skeleton.Width + compPadding*2))
	compHeight := int(math.Ceil(skeleton.Height + compPadding*2))

	rootCompX := -skeleton.X + compPadding
	rootCompY := skeleton.Y + skeleton.Height + compPadding

	duration := 5.0
	if animationName != "" {
		if anim, ok := animations.Values[animationName]; ok {
			d := getAnimationDuration(anim)
			if d > 0 {
				duration = d
			}
		}
	}
	layerDur := duration + 1

	var L []string
	w := func(s string) { L = append(L, s) }

	// ---- Header ----
	w("// Auto-generated Spine to AE import script")
	w("(function() {")
	w(`app.beginUndoGroup("Spine Import");`)
	w("try {")
	w("")
	w(fmt.Sprintf("var comp = app.project.items.addComp(%s, %d, %d, 1, %s, %s);",
		jsStr(compName), compWidth, compHeight, fmtF(layerDur), fmtF(fps)))
	w("comp.openInViewer();")
	w("")

	// ---- Import footage ----
	w(`var footageFolder = app.project.items.addFolder("Spine Footage");`)
	w(fmt.Sprintf("var texDir = %s;", jsStr(strings.ReplaceAll(textureDir, "\\", "/"))))
	w("var ftg = {};")
	w("function imp(n) {")
	w(`  var f = new File(texDir + "/" + n + ".png");`)
	w("  if (!f.exists) return null;")
	w("  var item = app.project.importFile(new ImportOptions(f));")
	w("  item.parentFolder = footageFolder;")
	w("  return item;")
	w("}")

	neededImages := make(map[string]bool)
	neededOrder := make([]string, 0)
	for _, slotMap := range attachments {
		for _, attKey := range slotMap.Keys {
			att := slotMap.Values[attKey]
			if !neededImages[att.Path] {
				neededImages[att.Path] = true
				neededOrder = append(neededOrder, att.Path)
			}
		}
	}
	for _, img := range neededOrder {
		w(fmt.Sprintf("ftg[%s] = imp(%s);", jsStr(img), jsStr(img)))
	}
	w("")

	// ---- Bone null layers ----
	w("var BL = {};")
	for _, boneName := range boneOrder {
		bone := bones[boneName]
		isRoot := bone.Parent == ""
		var posX, posY float64
		if isRoot {
			posX = rootCompX
			posY = rootCompY
		} else {
			posX = 50 + bone.X
			posY = 50 + (-bone.Y)
		}
		w("(function(){")
		w(fmt.Sprintf("  var n = comp.layers.addNull(%s);", fmtF(layerDur)))
		w(fmt.Sprintf("  n.name = %s;", jsStr("bone:"+boneName)))
		w("  n.label = 1;")
		w(fmt.Sprintf("  BL[%s] = n;", jsStr(boneName)))
		if bone.Parent != "" {
			w(fmt.Sprintf("  n.parent = BL[%s];", jsStr(bone.Parent)))
		}
		w(`  var t = n.property("Transform");`)
		w(`  t.property("Anchor Point").setValue([50,50]);`)
		w(fmt.Sprintf(`  t.property("Position").setValue([%s,%s]);`, fmtF(posX), fmtF(posY)))
		w(fmt.Sprintf(`  t.property("Rotation").setValue(%s);`, fmtF(-bone.Rotation)))
		w(fmt.Sprintf(`  t.property("Scale").setValue([%s,%s]);`, fmtF(bone.ScaleX*100), fmtF(bone.ScaleY*100)))
		w("})();")
	}
	w("")

	// ---- Image layers for slot attachments ----
	w("var SL = {};")
	for _, slot := range slots {
		slotAtts, ok := attachments[slot.Name]
		if !ok || len(slotAtts.Keys) == 0 {
			continue
		}
		w(fmt.Sprintf("SL[%s] = {};", jsStr(slot.Name)))
		for _, attName := range slotAtts.Keys {
			att := slotAtts.Values[attName]
			isDefault := slot.Attachment == attName
			w("(function(){")
			w(fmt.Sprintf("  var fg = ftg[%s];", jsStr(att.Path)))
			w("  if (!fg) return;")
			w(fmt.Sprintf("  var ly = comp.layers.add(fg, %s);", fmtF(layerDur)))
			w(fmt.Sprintf("  ly.name = %s;", jsStr(slot.Name+"/"+attName)))
			w("  ly.label = 9;")

			if att.IsMesh && len(att.MeshBoneContribs) > 0 {
				// Weighted mesh: NO parent - position via expression in comp space
				w(`  var t = ly.property("Transform");`)
				anchorU := att.MeshAnchorU
				if anchorU == 0 {
					anchorU = 0.5
				}
				anchorV := att.MeshAnchorV
				if anchorV == 0 {
					anchorV = 0.5
				}
				w(fmt.Sprintf(`  t.property("Anchor Point").setValue([fg.width*%s, fg.height*%s]);`, fmtFull(anchorU), fmtFull(anchorV)))
				w(fmt.Sprintf(`  t.property("Position").setValue([%s,%s]);`, fmtF(float64(compWidth)/2), fmtF(float64(compHeight)/2)))
				posExpr := buildMeshPosExpr(att.MeshBoneContribs)
				w(fmt.Sprintf(`  t.property("Position").expression = %s;`, jsStr(posExpr)))
				w(`  t.property("Rotation").setValue(0);`)
				rotExpr := buildMeshRotExpr(att.MeshBoneContribs)
				w(fmt.Sprintf(`  t.property("Rotation").expression = %s;`, jsStr(rotExpr)))
				w(fmt.Sprintf(`  t.property("Scale").setValue([%s,%s]);`, fmtF(att.ScaleX*100), fmtF(att.ScaleY*100)))
				opacity := 0.0
				if isDefault {
					opacity = slot.Color.A * 100
				}
				w(fmt.Sprintf(`  t.property("Opacity").setValue(%s);`, fmtF(opacity)))
			} else {
				// Region attachment: parent to bone
				w(fmt.Sprintf("  ly.parent = BL[%s];", jsStr(slot.BoneName)))
				w(`  var t = ly.property("Transform");`)
				w(`  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);`)
				w(fmt.Sprintf(`  t.property("Position").setValue([50+%s, 50+%s]);`, fmtF(att.X), fmtF(-att.Y)))
				w(fmt.Sprintf(`  t.property("Rotation").setValue(%s);`, fmtF(-att.Rotation)))
				w(fmt.Sprintf(`  t.property("Scale").setValue([%s,%s]);`, fmtF(att.ScaleX*100), fmtF(att.ScaleY*100)))
				opacity := 0.0
				if isDefault {
					opacity = slot.Color.A * 100
				}
				w(fmt.Sprintf(`  t.property("Opacity").setValue(%s);`, fmtF(opacity)))
			}

			w(fmt.Sprintf("  SL[%s][%s] = ly;", jsStr(slot.Name), jsStr(attName)))
			w("})();")
		}
	}
	w("")

	// ---- Animation keyframes ----
	if animationName != "" {
		if anim, ok := animations.Values[animationName]; ok {
			w(fmt.Sprintf("// === Animation: %s ===", animationName))

			if len(anim.Bones.Keys) > 0 {
				for _, boneName := range anim.Bones.Keys {
					tl := anim.Bones.Values[boneName]
					bone, ok := bones[boneName]
					if !ok {
						continue
					}
					genBoneKFs(w, boneName, bone, tl, rootCompX, rootCompY)
				}
			}

			if len(anim.Slots.Keys) > 0 {
				for _, slotName := range anim.Slots.Keys {
					tl := anim.Slots.Values[slotName]
					var slot *NormalizedSlot
					for _, s := range slots {
						if s.Name == slotName {
							slot = s
							break
						}
					}
					if slot == nil {
						continue
					}
					genSlotKFs(w, slotName, slot, tl, attachments[slotName])
				}
			}
		}
	}

	w("")
	w(`} catch(e) { alert("Spine Import Error: " + e.toString()); }`)
	w("app.endUndoGroup();")
	w("})();")

	return strings.Join(L, "\n")
}

// ============================================================

func getAnimationDuration(anim *SpineAnimation) float64 {
	maxT := 0.0
	chk := func(kfs []SpineKeyframe) {
		for _, kf := range kfs {
			if kf.Time != nil && *kf.Time > maxT {
				maxT = *kf.Time
			}
		}
	}
	chkAtt := func(kfs []SpineAttachmentKeyframe) {
		for _, kf := range kfs {
			if kf.Time != nil && *kf.Time > maxT {
				maxT = *kf.Time
			}
		}
	}
	for _, name := range anim.Bones.Keys {
		t := anim.Bones.Values[name]
		chk(t.Rotate)
		chk(t.Translate)
		chk(t.Scale)
		chk(t.Shear)
	}
	for _, name := range anim.Slots.Keys {
		t := anim.Slots.Values[name]
		chkAtt(t.Attachment)
		chk(t.Color)
	}
	for _, ev := range anim.Events {
		if ev.Time > maxT {
			maxT = ev.Time
		}
	}
	for _, d := range anim.DrawOrder {
		if d.Time != nil && *d.Time > maxT {
			maxT = *d.Time
		}
	}
	return maxT
}

// ============================================================
// Bone keyframes
// ============================================================

func genBoneKFs(w func(string), name string, bone *NormalizedBone, tl *SpineBoneTimelines, rootCompX, rootCompY float64) {
	ref := fmt.Sprintf("BL[%s]", jsStr(name))
	isRoot := bone.Parent == ""

	// --- Rotate ---
	if len(tl.Rotate) > 0 {
		w("(function(){")
		w(fmt.Sprintf(`  var p = %s.property("Transform").property("Rotation");`, ref))
		var times, vals []string
		for _, kf := range tl.Rotate {
			t := optF(kf.Time, 0)
			angle := optF(kf.Angle, 0)
			times = append(times, fmtF(t))
			vals = append(vals, fmtF(-(bone.Rotation + angle)))
		}
		w(fmt.Sprintf("  var ts = [%s];", strings.Join(times, ",")))
		w(fmt.Sprintf("  var vs = [%s];", strings.Join(vals, ",")))
		w("  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);")
		genEasing(w, tl.Rotate, "p", 1)
		w("})();")
	}

	// --- Translate ---
	if len(tl.Translate) > 0 {
		w("(function(){")
		w(fmt.Sprintf(`  var p = %s.property("Transform").property("Position");`, ref))
		var times, entries []string
		for _, kf := range tl.Translate {
			dx := optF(kf.X, 0)
			dy := optF(kf.Y, 0)
			t := optF(kf.Time, 0)
			var px, py float64
			if isRoot {
				px = rootCompX + dx
				py = rootCompY - dy
			} else {
				px = 50 + bone.X + dx
				py = 50 - (bone.Y + dy)
			}
			times = append(times, fmtF(t))
			entries = append(entries, fmt.Sprintf("[%s,%s]", fmtF(px), fmtF(py)))
		}
		w(fmt.Sprintf("  var ts = [%s];", strings.Join(times, ",")))
		w(fmt.Sprintf("  var vs = [%s];", strings.Join(entries, ",")))
		w("  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);")
		genEasing(w, tl.Translate, "p", 2)
		w("})();")
	}

	// --- Scale ---
	if len(tl.Scale) > 0 {
		w("(function(){")
		w(fmt.Sprintf(`  var p = %s.property("Transform").property("Scale");`, ref))
		var times, entries []string
		for _, kf := range tl.Scale {
			sx := optF(kf.X, 1)
			sy := optF(kf.Y, 1)
			t := optF(kf.Time, 0)
			times = append(times, fmtF(t))
			entries = append(entries, fmt.Sprintf("[%s,%s]", fmtF(sx*bone.ScaleX*100), fmtF(sy*bone.ScaleY*100)))
		}
		w(fmt.Sprintf("  var ts = [%s];", strings.Join(times, ",")))
		w(fmt.Sprintf("  var vs = [%s];", strings.Join(entries, ",")))
		w("  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);")
		genEasing(w, tl.Scale, "p", 2)
		w("})();")
	}

	// --- Shear ---
	if len(tl.Shear) > 0 {
		w(fmt.Sprintf(`// Bone "%s" shear timeline omitted (AE has no native shear).`, name))
	}
}

// ============================================================
// Slot keyframes
// ============================================================

func genSlotKFs(w func(string), slotName string, slot *NormalizedSlot, tl *SpineSlotTimelines, slotAtts *OrderedAttachments) {
	// --- Attachment switching via opacity ---
	if len(tl.Attachment) > 0 && slotAtts != nil {
		attKFs := tl.Attachment
		allAtts := slotAtts.Keys

		for _, attName := range allAtts {
			w("(function(){")
			w(fmt.Sprintf("  var ly = (SL[%s]||{})[%s];", jsStr(slotName), jsStr(attName)))
			w("  if(!ly) return;")
			w(`  var op = ly.property("Transform").property("Opacity");`)

			isDefault := slot.Attachment == attName
			type pair struct {
				t, v float64
			}
			var pairs []pair

			firstT := 0.0
			if attKFs[0].Time != nil {
				firstT = *attKFs[0].Time
			}
			if firstT > 0 {
				v := 0.0
				if isDefault {
					v = 100
				}
				pairs = append(pairs, pair{0, v})
			}

			for _, kf := range attKFs {
				t := 0.0
				if kf.Time != nil {
					t = *kf.Time
				}
				v := 0.0
				if kf.Name != nil && *kf.Name == attName {
					v = 100
				}
				pairs = append(pairs, pair{t, v})
			}

			for _, p := range pairs {
				w(fmt.Sprintf("  op.setValueAtTime(%s,%s);", fmtF(p.t), fmtF(p.v)))
			}
			w("  for(var k=1;k<=op.numKeys;k++) op.setInterpolationTypeAtKey(k,KeyframeInterpolationType.HOLD);")
			w("})();")
		}
	}

	// --- Color/Opacity ---
	if len(tl.Color) > 0 && slotAtts != nil {
		allAtts := slotAtts.Keys
		for _, attName := range allAtts {
			w("(function(){")
			w(fmt.Sprintf("  var ly = (SL[%s]||{})[%s];", jsStr(slotName), jsStr(attName)))
			w("  if(!ly) return;")
			w(`  var op = ly.property("Transform").property("Opacity");`)
			for _, kf := range tl.Color {
				hex := kf.Color
				if hex == "" {
					hex = "FFFFFFFF"
				}
				a := parseHexByte(hex, 6)
				t := optF(kf.Time, 0)
				w(fmt.Sprintf("  op.setValueAtTime(%s,%s);", fmtF(t), fmtF(a*100)))
			}
			w("})();")
		}
	}
}

// ============================================================
// Easing helper
// ============================================================

func genEasing(w func(string), kfs []SpineKeyframe, propVar string, dims int) {
	hasAny := false
	for _, kf := range kfs {
		if len(kf.Curve) > 0 {
			hasAny = true
			break
		}
	}
	if !hasAny {
		return
	}

	w("  var _KIE = KeyframeInterpolationType;")

	for i, kf := range kfs {
		ki := i + 1

		curveType, cx1, cy1, cx2, cy2 := parseCurve(kf)

		if curveType == "stepped" {
			w(fmt.Sprintf("  try{ %s.setInterpolationTypeAtKey(%d, _KIE.HOLD); }catch(e){}", propVar, ki))
		} else if curveType == "bezier" {
			outInf := clampF(cx1*100, 0.1, 100)
			inInf := clampF((1-cx2)*100, 0.1, 100)

			outEaseArr := arrOf(dims, fmt.Sprintf("new KeyframeEase(0, %s)", fmtR(outInf)))
			inEaseArr := arrOf(dims, fmt.Sprintf("new KeyframeEase(0, %s)", fmtR(outInf)))
			nextInArr := arrOf(dims, fmt.Sprintf("new KeyframeEase(0, %s)", fmtR(inInf)))

			w("  try{")
			w(fmt.Sprintf("    %s.setTemporalEaseAtKey(%d, [%s], [%s]);", propVar, ki, outEaseArr, inEaseArr))
			if i+1 < len(kfs) {
				w(fmt.Sprintf("    %s.setTemporalEaseAtKey(%d, [%s], [%s]);", propVar, ki+1, nextInArr, nextInArr))
			}
			w("  }catch(e){}")
		}
		_ = cy1
		_ = cy2
	}
}

func parseCurve(kf SpineKeyframe) (curveType string, cx1, cy1, cx2, cy2 float64) {
	if len(kf.Curve) == 0 {
		return "linear", 0, 0, 0, 0
	}

	// Try string first
	var s string
	if json.Unmarshal(kf.Curve, &s) == nil {
		if s == "stepped" {
			return "stepped", 0, 0, 0, 0
		}
		return "linear", 0, 0, 0, 0
	}

	// Try array
	var arr []float64
	if json.Unmarshal(kf.Curve, &arr) == nil && len(arr) >= 4 {
		return "bezier", arr[0], arr[1], arr[2], arr[3]
	}

	// Try single number (cx1)
	var num float64
	if json.Unmarshal(kf.Curve, &num) == nil {
		return "bezier", num, optF(kf.C2, 0), optF(kf.C3, 1), optF(kf.C4, 1)
	}

	return "linear", 0, 0, 0, 0
}

// ============================================================
// Mesh Position expression builder
// ============================================================

func buildMeshPosExpr(contribs []MeshBoneContribution) string {
	var lines []string
	var terms []string

	for i, c := range contribs {
		bVar := fmt.Sprintf("b%d", i)
		lines = append(lines, fmt.Sprintf("var %s=thisComp.layer(%s).toComp([50+(%s),50+(%s)])",
			bVar, jsStr("bone:"+c.BoneName), fmtR4(c.AvgLocalX), fmtR4(-c.AvgLocalY)))
		if len(contribs) == 1 {
			terms = append(terms, bVar)
		} else {
			terms = append(terms, fmt.Sprintf("%s*%s", bVar, fmtR4(c.Weight)))
		}
	}
	lines = append(lines, strings.Join(terms, "+"))
	return strings.Join(lines, ";\n") + ";"
}

// ============================================================
// Mesh Rotation expression builder
// ============================================================

func buildMeshRotExpr(contribs []MeshBoneContribution) string {
	var lines []string
	var angleTerms []string

	setupAngle := 0.0
	for _, c := range contribs {
		setupAngle += c.SetupAngle * c.Weight
	}

	for i, c := range contribs {
		bName := jsStr("bone:" + c.BoneName)
		lines = append(lines, fmt.Sprintf("var p%da=thisComp.layer(%s).toComp([50,50])", i, bName))
		lines = append(lines, fmt.Sprintf("var p%db=thisComp.layer(%s).toComp([51,50])", i, bName))
		lines = append(lines, fmt.Sprintf("var a%d=Math.atan2(p%db[1]-p%da[1],p%db[0]-p%da[0])", i, i, i, i, i))
		if len(contribs) == 1 {
			angleTerms = append(angleTerms, fmt.Sprintf("a%d", i))
		} else {
			angleTerms = append(angleTerms, fmt.Sprintf("a%d*%s", i, fmtR4(c.Weight)))
		}
	}
	lines = append(lines, fmt.Sprintf("(%s-(%s))*180/Math.PI", strings.Join(angleTerms, "+"), fmtR4(setupAngle)))
	return strings.Join(lines, ";\n") + ";"
}

// ============================================================
// Formatting helpers
// ============================================================

func jsStr(s string) string {
	b, _ := json.Marshal(s)
	return string(b)
}

func fmtF(v float64) string {
	if v == float64(int(v)) {
		return strconv.Itoa(int(v))
	}
	return strconv.FormatFloat(v, 'f', -1, 64)
}

func fmtFull(v float64) string {
	return strconv.FormatFloat(v, 'f', -1, 64)
}

func fmtR(v float64) string {
	return fmtF(math.Round(v*10) / 10)
}

func fmtR4(v float64) string {
	return fmtF(math.Round(v*10000) / 10000)
}

func clampF(v, lo, hi float64) float64 {
	return math.Max(lo, math.Min(hi, v))
}

func arrOf(n int, expr string) string {
	parts := make([]string, n)
	for i := range parts {
		parts[i] = expr
	}
	return strings.Join(parts, ", ")
}
