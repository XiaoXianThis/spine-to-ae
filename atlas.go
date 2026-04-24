package main

import (
	"fmt"
	"image"
	"image/draw"
	"image/png"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// ============================================================
// Spine Atlas parser & texture unpacker
// Supports both old format (xy/size/orig/offset) and
// new format (bounds/offsets).
// ============================================================

type AtlasPage struct {
	ImageName string
	Width     int
	Height    int
}

type AtlasRegion struct {
	Name    string
	X, Y    int // position in page image
	Width   int // packed width (original, pre-rotation)
	Height  int // packed height (original, pre-rotation)
	OrigW   int // original width before whitespace strip
	OrigH   int // original height before whitespace strip
	OffsetX int // trimmed pixels from left
	OffsetY int // trimmed pixels from bottom (Spine Y-up coords)
	Rotate  int // rotation degrees: 0 or 90
	Index   int
	Page    *AtlasPage
}

// parseIntList splits a comma-separated string and returns ints.
func parseIntList(s string, count int) []int {
	parts := strings.Split(s, ",")
	result := make([]int, count)
	for i := 0; i < count && i < len(parts); i++ {
		result[i], _ = strconv.Atoi(strings.TrimSpace(parts[i]))
	}
	return result
}

// ParseAtlas parses a Spine .atlas file, returning pages and regions.
func ParseAtlas(atlasPath string) ([]*AtlasPage, []*AtlasRegion, error) {
	data, err := os.ReadFile(atlasPath)
	if err != nil {
		return nil, nil, err
	}

	var pages []*AtlasPage
	var regions []*AtlasRegion
	var currentPage *AtlasPage
	var currentRegion *AtlasRegion
	expectPage := true

	lines := strings.Split(string(data), "\n")
	for _, rawLine := range lines {
		line := strings.TrimRight(rawLine, "\r")

		if strings.TrimSpace(line) == "" {
			expectPage = true
			if currentRegion != nil {
				finalizeAtlasRegion(currentRegion)
				currentRegion = nil
			}
			continue
		}

		trimmed := strings.TrimSpace(line)

		// A line with a colon is a property; without is a name (page or region).
		colonIdx := strings.Index(trimmed, ":")
		if colonIdx <= 0 {
			// Name line
			if currentRegion != nil {
				finalizeAtlasRegion(currentRegion)
				currentRegion = nil
			}
			if expectPage {
				currentPage = &AtlasPage{ImageName: trimmed}
				pages = append(pages, currentPage)
				expectPage = false
			} else {
				currentRegion = &AtlasRegion{
					Name:  trimmed,
					Page:  currentPage,
					Index: -1,
				}
				regions = append(regions, currentRegion)
			}
		} else {
			key := strings.TrimSpace(trimmed[:colonIdx])
			value := strings.TrimSpace(trimmed[colonIdx+1:])

			if currentRegion != nil {
				applyRegionProp(currentRegion, key, value)
			} else if currentPage != nil {
				applyPageProp(currentPage, key, value)
			}
		}
	}

	if currentRegion != nil {
		finalizeAtlasRegion(currentRegion)
	}
	return pages, regions, nil
}

func applyPageProp(p *AtlasPage, key, value string) {
	switch key {
	case "size":
		v := parseIntList(value, 2)
		p.Width = v[0]
		p.Height = v[1]
	}
}

func applyRegionProp(r *AtlasRegion, key, value string) {
	switch key {
	// New format
	case "bounds":
		v := parseIntList(value, 4)
		r.X = v[0]
		r.Y = v[1]
		r.Width = v[2]
		r.Height = v[3]
	case "offsets":
		v := parseIntList(value, 4)
		r.OffsetX = v[0]
		r.OffsetY = v[1]
		r.OrigW = v[2]
		r.OrigH = v[3]
	// Old format
	case "xy":
		v := parseIntList(value, 2)
		r.X = v[0]
		r.Y = v[1]
	case "size":
		v := parseIntList(value, 2)
		r.Width = v[0]
		r.Height = v[1]
	case "orig":
		v := parseIntList(value, 2)
		r.OrigW = v[0]
		r.OrigH = v[1]
	case "offset":
		v := parseIntList(value, 2)
		r.OffsetX = v[0]
		r.OffsetY = v[1]
	// Common
	case "rotate":
		if value == "true" {
			r.Rotate = 90
		} else if value != "false" {
			r.Rotate, _ = strconv.Atoi(value)
		}
	case "index":
		r.Index, _ = strconv.Atoi(value)
	}
}

func finalizeAtlasRegion(r *AtlasRegion) {
	if r.OrigW == 0 {
		r.OrigW = r.Width
	}
	if r.OrigH == 0 {
		r.OrigH = r.Height
	}
}

// ============================================================
// Texture unpacking
// ============================================================

// UnpackAtlasFile reads a .atlas and its page images, extracts every
// region as an individual PNG into outputDir. Returns the count of
// extracted regions.
func UnpackAtlasFile(atlasPath string, pageImagePath string, outputDir string) (int, error) {
	pages, regions, err := ParseAtlas(atlasPath)
	if err != nil {
		return 0, err
	}

	atlasDir := filepath.Dir(atlasPath)

	// Load page images
	pageImages := make(map[string]image.Image, len(pages))
	for i, page := range pages {
		var imgPath string
		if pageImagePath != "" && i == 0 {
			imgPath = pageImagePath
		} else {
			imgPath = filepath.Join(atlasDir, page.ImageName)
		}
		img, err := loadPNG(imgPath)
		if err != nil {
			return 0, fmt.Errorf("failed to load page image %s: %w", imgPath, err)
		}
		pageImages[page.ImageName] = img
	}

	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return 0, fmt.Errorf("failed to create output directory: %w", err)
	}

	for _, region := range regions {
		pageImg := pageImages[region.Page.ImageName]
		if pageImg == nil {
			continue
		}
		extracted := extractRegion(pageImg, region)
		outPath := filepath.Join(outputDir, region.Name+".png")
		if err := savePNG(outPath, extracted); err != nil {
			return 0, fmt.Errorf("failed to save region %s: %w", region.Name, err)
		}
	}

	return len(regions), nil
}

func loadPNG(path string) (image.Image, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	return png.Decode(f)
}

func savePNG(path string, img image.Image) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()
	return png.Encode(f, img)
}

func extractRegion(pageImg image.Image, region *AtlasRegion) image.Image {
	var cropped *image.NRGBA

	if region.Rotate == 90 {
		// Region stored CCW 90° in atlas, so atlas block is (Height × Width).
		cropW := region.Height
		cropH := region.Width
		rect := image.Rect(region.X, region.Y, region.X+cropW, region.Y+cropH)
		tmp := image.NewNRGBA(image.Rect(0, 0, cropW, cropH))
		draw.Draw(tmp, tmp.Bounds(), pageImg, rect.Min, draw.Src)
		// Rotate CW 90° to restore original orientation.
		cropped = rotate90CW(tmp)
	} else {
		rect := image.Rect(region.X, region.Y, region.X+region.Width, region.Y+region.Height)
		cropped = image.NewNRGBA(image.Rect(0, 0, region.Width, region.Height))
		draw.Draw(cropped, cropped.Bounds(), pageImg, rect.Min, draw.Src)
	}

	// Restore stripped whitespace when orig differs from packed size.
	if region.OrigW != region.Width || region.OrigH != region.Height ||
		region.OffsetX != 0 || region.OffsetY != 0 {
		full := image.NewNRGBA(image.Rect(0, 0, region.OrigW, region.OrigH))
		// OffsetY is from bottom (Spine Y-up), convert to top-left image coords.
		destY := region.OrigH - region.OffsetY - region.Height
		destRect := image.Rect(
			region.OffsetX, destY,
			region.OffsetX+region.Width, destY+region.Height,
		)
		draw.Draw(full, destRect, cropped, image.Point{}, draw.Src)
		return full
	}

	return cropped
}

// rotate90CW rotates an NRGBA image 90° clockwise.
func rotate90CW(src *image.NRGBA) *image.NRGBA {
	srcW := src.Bounds().Dx()
	srcH := src.Bounds().Dy()
	dst := image.NewNRGBA(image.Rect(0, 0, srcH, srcW))
	for y := 0; y < srcH; y++ {
		for x := 0; x < srcW; x++ {
			dst.Set(srcH-1-y, x, src.At(x, y))
		}
	}
	return dst
}

// DetectAtlasFiles finds .atlas files alongside a spine file.
func DetectAtlasFiles(spineFilePath string) []string {
	dir := filepath.Dir(spineFilePath)
	base := strings.TrimSuffix(filepath.Base(spineFilePath), filepath.Ext(spineFilePath))
	// Also handle double extensions like "Foo.skel.json"
	base2 := strings.TrimSuffix(base, filepath.Ext(base))

	var results []string
	seen := make(map[string]bool)

	// Priority: exact match first, then any .atlas in dir
	candidates := []string{
		filepath.Join(dir, base+".atlas"),
		filepath.Join(dir, base2+".atlas"),
		filepath.Join(dir, base+".skel.atlas"),
	}
	for _, c := range candidates {
		if _, err := os.Stat(c); err == nil && !seen[c] {
			results = append(results, c)
			seen[c] = true
		}
	}

	// Fallback: scan directory for any .atlas
	entries, _ := os.ReadDir(dir)
	for _, e := range entries {
		if e.IsDir() {
			continue
		}
		if strings.HasSuffix(strings.ToLower(e.Name()), ".atlas") {
			full := filepath.Join(dir, e.Name())
			if !seen[full] {
				results = append(results, full)
				seen[full] = true
			}
		}
	}

	return results
}
