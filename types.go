package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
)

func bytesReader(data []byte) io.Reader {
	return bytes.NewReader(data)
}

// ============================================================
// Spine JSON 3.7/3.8 format type definitions
// ============================================================

// --- Raw JSON types (as parsed from file) ---

// OrderedMap preserves JSON key insertion order for map fields.
type OrderedMap[V any] struct {
	Keys   []string
	Values map[string]V
}

func (om *OrderedMap[V]) UnmarshalJSON(data []byte) error {
	om.Values = make(map[string]V)
	// First pass: unmarshal all values
	var raw map[string]json.RawMessage
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}
	// Second pass: use Decoder to extract key order
	dec := json.NewDecoder(bytesReader(data))
	t, _ := dec.Token() // opening {
	if fmt.Sprintf("%v", t) != "{" {
		return fmt.Errorf("expected object")
	}
	for dec.More() {
		// Read key
		tok, _ := dec.Token()
		key := fmt.Sprintf("%v", tok)
		// Skip the value in the decoder stream
		skipJSONValue(dec)
		// Unmarshal from raw
		var val V
		if rawVal, ok := raw[key]; ok {
			if err := json.Unmarshal(rawVal, &val); err != nil {
				return err
			}
		}
		if _, exists := om.Values[key]; !exists {
			om.Keys = append(om.Keys, key)
		}
		om.Values[key] = val
	}
	return nil
}

// skipJSONValue consumes one complete JSON value from the decoder.
func skipJSONValue(dec *json.Decoder) {
	t, err := dec.Token()
	if err != nil {
		return
	}
	// If it's a delimiter, we need to consume until the matching close
	delim, ok := t.(json.Delim)
	if !ok {
		return // primitive value, already consumed
	}
	switch delim {
	case '{':
		for dec.More() {
			dec.Token()    // key
			skipJSONValue(dec) // value
		}
		dec.Token() // closing }
	case '[':
		for dec.More() {
			skipJSONValue(dec)
		}
		dec.Token() // closing ]
	}
}

type SpineJson struct {
	Skeleton   SpineSkeleton                            `json:"skeleton"`
	Bones      []SpineBone                              `json:"bones"`
	Slots      []SpineSlot                              `json:"slots"`
	Skins      []SpineSkin                              `json:"skins"`
	Events     map[string]SpineEvent                    `json:"events,omitempty"`
	Animations OrderedMap[*SpineAnimation]              `json:"animations"`
}

type SpineSkeleton struct {
	Hash   string  `json:"hash,omitempty"`
	Spine  string  `json:"spine,omitempty"`
	X      float64 `json:"x"`
	Y      float64 `json:"y"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
	FPS    float64 `json:"fps,omitempty"`
	Images string  `json:"images,omitempty"`
	Audio  string  `json:"audio,omitempty"`
}

type SpineBone struct {
	Name      string   `json:"name"`
	Parent    string   `json:"parent,omitempty"`
	Length    *float64 `json:"length,omitempty"`
	Transform string   `json:"transform,omitempty"`
	X         *float64 `json:"x,omitempty"`
	Y         *float64 `json:"y,omitempty"`
	Rotation  *float64 `json:"rotation,omitempty"`
	ScaleX    *float64 `json:"scaleX,omitempty"`
	ScaleY    *float64 `json:"scaleY,omitempty"`
	ShearX    *float64 `json:"shearX,omitempty"`
	ShearY    *float64 `json:"shearY,omitempty"`
	Color     string   `json:"color,omitempty"`
}

type SpineSlot struct {
	Name       string `json:"name"`
	Bone       string `json:"bone"`
	Color      string `json:"color,omitempty"`
	Dark       string `json:"dark,omitempty"`
	Attachment string `json:"attachment,omitempty"`
	Blend      string `json:"blend,omitempty"`
}

type SpineSkin struct {
	Name        string                                              `json:"name"`
	Attachments map[string]OrderedMap[*SpineAttachment]             `json:"attachments"`
}

type SpineAttachment struct {
	Type     string    `json:"type,omitempty"`
	Name     string    `json:"name,omitempty"`
	Path     string    `json:"path,omitempty"`
	X        *float64  `json:"x,omitempty"`
	Y        *float64  `json:"y,omitempty"`
	ScaleX   *float64  `json:"scaleX,omitempty"`
	ScaleY   *float64  `json:"scaleY,omitempty"`
	Rotation *float64  `json:"rotation,omitempty"`
	Width    *float64  `json:"width,omitempty"`
	Height   *float64  `json:"height,omitempty"`
	Color    string    `json:"color,omitempty"`
	UVs      []float64 `json:"uvs,omitempty"`
	Triangles []int    `json:"triangles,omitempty"`
	Vertices []float64 `json:"vertices,omitempty"`
	Hull     *int      `json:"hull,omitempty"`
	Edges    []int     `json:"edges,omitempty"`
}

type SpineEvent struct {
	Int     *int     `json:"int,omitempty"`
	Float   *float64 `json:"float,omitempty"`
	String  string   `json:"string,omitempty"`
	Audio   string   `json:"audio,omitempty"`
	Volume  *float64 `json:"volume,omitempty"`
	Balance *float64 `json:"balance,omitempty"`
}

// --- Animation types ---

type SpineAnimation struct {
	Bones     OrderedMap[*SpineBoneTimelines]             `json:"bones,omitempty"`
	Slots     OrderedMap[*SpineSlotTimelines]             `json:"slots,omitempty"`
	IK        map[string][]SpineKeyframe                  `json:"ik,omitempty"`
	Transform map[string][]SpineKeyframe                  `json:"transform,omitempty"`
	Deform    map[string]map[string]map[string][]SpineKeyframe `json:"deform,omitempty"`
	Events    []SpineEventKeyframe                        `json:"events,omitempty"`
	DrawOrder []SpineDrawOrderKeyframe                    `json:"drawOrder,omitempty"`
}

type SpineBoneTimelines struct {
	Rotate    []SpineKeyframe `json:"rotate,omitempty"`
	Translate []SpineKeyframe `json:"translate,omitempty"`
	Scale     []SpineKeyframe `json:"scale,omitempty"`
	Shear     []SpineKeyframe `json:"shear,omitempty"`
}

type SpineSlotTimelines struct {
	Attachment []SpineAttachmentKeyframe `json:"attachment,omitempty"`
	Color      []SpineKeyframe          `json:"color,omitempty"`
	TwoColor   []SpineKeyframe          `json:"twoColor,omitempty"`
}

// SpineKeyframe uses json.RawMessage for curve since it can be number, string, or array.
type SpineKeyframe struct {
	Time  *float64         `json:"time,omitempty"`
	Curve json.RawMessage  `json:"curve,omitempty"`
	C2    *float64         `json:"c2,omitempty"`
	C3    *float64         `json:"c3,omitempty"`
	C4    *float64         `json:"c4,omitempty"`
	// Rotate
	Angle *float64 `json:"angle,omitempty"`
	// Translate / Scale / Shear
	X *float64 `json:"x,omitempty"`
	Y *float64 `json:"y,omitempty"`
	// Color
	Color string `json:"color,omitempty"`
}

type SpineAttachmentKeyframe struct {
	Time *float64 `json:"time,omitempty"`
	Name *string  `json:"name"` // can be null
}

type SpineEventKeyframe struct {
	Time   float64  `json:"time"`
	Name   string   `json:"name"`
	Int    *int     `json:"int,omitempty"`
	Float  *float64 `json:"float,omitempty"`
	String string   `json:"string,omitempty"`
}

type SpineDrawOrderKeyframe struct {
	Time    *float64                `json:"time,omitempty"`
	Offsets []SpineDrawOrderOffset  `json:"offsets,omitempty"`
}

type SpineDrawOrderOffset struct {
	Slot   string `json:"slot"`
	Offset int    `json:"offset"`
}

// --- Normalized / processed types used by the converter ---

type NormalizedBone struct {
	Name     string
	Parent   string // "" if root
	X        float64
	Y        float64
	Rotation float64
	ScaleX   float64
	ScaleY   float64
	ShearX   float64
	ShearY   float64
	Length   float64
	Children []string
}

type RGBA struct {
	R, G, B, A float64
}

type NormalizedSlot struct {
	Name       string
	BoneName   string
	Attachment string // "" if none
	Color      RGBA
	Blend      string
	Index      int
}

type MeshBoneInfluence struct {
	BoneName string
	LocalX   float64
	LocalY   float64
	Weight   float64
}

type MeshBoneContribution struct {
	BoneName   string
	AvgLocalX  float64
	AvgLocalY  float64
	Weight     float64
	SetupAngle float64
}

type NormalizedRegionAttachment struct {
	Name       string
	Path       string
	X          float64
	Y          float64
	ScaleX     float64
	ScaleY     float64
	Rotation   float64
	Width      float64
	Height     float64
	IsMesh     bool
	MeshAnchorU float64
	MeshAnchorV float64
	MeshBoneContribs []MeshBoneContribution
}

// OrderedMap preserves insertion order for slot→attachment map
type OrderedAttachments struct {
	Keys   []string
	Values map[string]*NormalizedRegionAttachment
}

type SpineData struct {
	Skeleton    SpineSkeleton
	Bones       map[string]*NormalizedBone
	BoneOrder   []string
	Slots       []*NormalizedSlot
	Attachments map[string]*OrderedAttachments // slotName → attachments
	Animations  OrderedMap[*SpineAnimation]
}
