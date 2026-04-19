package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
)

// ============================================================
// CLI: spineToAE <spine.json> [options]
//
// Options:
//   --texture <dir>       Path to individual texture PNGs (default: <json_dir>/texture)
//   --animation <name>    Animation name to apply (default: first animation)
//   --output <file>       Output .jsx path (default: <json_name>.jsx next to json)
//   --name <comp_name>    AE composition name (default: json file name)
//   --padding <px>        Comp padding around skeleton (default: 200)
//   --run                 Auto-execute in AE via afterfx.exe
//   --ae <path>           Path to AfterFX.exe
//   --list                List available animations and exit
// ============================================================

func main() {
	args := os.Args[1:]

	if len(args) == 0 {
		fmt.Println("Usage: spineToAE <spine.json> [options]")
		fmt.Println("")
		fmt.Println("Options:")
		fmt.Println("  --texture <dir>       Texture PNGs directory")
		fmt.Println("  --animation <name>    Animation to apply")
		fmt.Println("  --output <file>       Output .jsx path")
		fmt.Println("  --name <comp>         Composition name")
		fmt.Println("  --padding <px>        Padding (default: 200)")
		fmt.Println("  --run                 Execute in AE")
		fmt.Println("  --ae <path>           AfterFX.exe path")
		fmt.Println("  --list                List animations")
		os.Exit(1)
	}

	jsonPath, _ := filepath.Abs(args[0])
	jsonDir := filepath.Dir(jsonPath)
	jsonName := strings.TrimSuffix(filepath.Base(jsonPath), filepath.Ext(jsonPath))

	// Parse options
	textureDir := filepath.Join(jsonDir, "texture")
	animationName := ""
	outputPath := filepath.Join(jsonDir, jsonName+".jsx")
	compNameOpt := jsonName
	padding := 200.0
	autoRun := false
	aePath := ""
	listMode := false

	for i := 1; i < len(args); i++ {
		switch args[i] {
		case "--texture":
			i++
			if i < len(args) {
				textureDir, _ = filepath.Abs(args[i])
			}
		case "--animation":
			i++
			if i < len(args) {
				animationName = args[i]
			}
		case "--output":
			i++
			if i < len(args) {
				outputPath, _ = filepath.Abs(args[i])
			}
		case "--name":
			i++
			if i < len(args) {
				compNameOpt = args[i]
			}
		case "--padding":
			i++
			if i < len(args) {
				if v, err := strconv.ParseFloat(args[i], 64); err == nil {
					padding = v
				}
			}
		case "--run":
			autoRun = true
		case "--ae":
			i++
			if i < len(args) {
				aePath = args[i]
			}
		case "--list":
			listMode = true
		}
	}

	// Read and parse JSON
	fmt.Printf("Reading: %s\n", jsonPath)
	rawJson, err := os.ReadFile(jsonPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading file: %v\n", err)
		os.Exit(1)
	}

	var spineJson SpineJson
	if err := json.Unmarshal(rawJson, &spineJson); err != nil {
		fmt.Fprintf(os.Stderr, "Error parsing JSON: %v\n", err)
		os.Exit(1)
	}

	spineData := ParseSpineJson(&spineJson)

	spineVer := spineData.Skeleton.Spine
	if spineVer == "" {
		spineVer = "unknown"
	}
	fmt.Printf("Spine version: %s\n", spineVer)
	fmt.Printf("Bones: %d\n", len(spineData.BoneOrder))
	fmt.Printf("Slots: %d\n", len(spineData.Slots))

	animNames := spineData.Animations.Keys
	fmt.Printf("Animations: %s\n", strings.Join(animNames, ", "))
	fmt.Printf("AABB: %.2f x %.2f\n", spineData.Skeleton.Width, spineData.Skeleton.Height)

	if listMode {
		fmt.Println("\nAvailable animations:")
		for _, name := range animNames {
			fmt.Printf("  - %s\n", name)
		}
		os.Exit(0)
	}

	// Default to first animation if not specified
	if animationName == "" && len(animNames) > 0 {
		animationName = animNames[0]
		fmt.Printf("\nUsing first animation: \"%s\"\n", animationName)
	}

	// Resolve texture directory
	textureDir, _ = filepath.Abs(textureDir)
	fmt.Printf("Texture dir: %s\n", textureDir)

	// Generate script
	fmt.Println("\nGenerating ExtendScript...")
	script := GenerateScript(GeneratorOptions{
		SpineData:     spineData,
		TextureDir:    textureDir,
		AnimationName: animationName,
		CompName:      compNameOpt,
		CompPadding:   padding,
	})

	// Write output
	if err := os.WriteFile(outputPath, []byte(script), 0644); err != nil {
		fmt.Fprintf(os.Stderr, "Error writing output: %v\n", err)
		os.Exit(1)
	}
	fmt.Printf("Written: %s\n", outputPath)
	fmt.Printf("Script size: %.1f KB\n", float64(len(script))/1024)

	// Auto-run in AE
	if autoRun {
		aeExe := aePath
		if aeExe == "" {
			aeExe = findAE()
		}
		if aeExe == "" {
			fmt.Fprintln(os.Stderr, "Could not find AfterFX.exe. Use --ae <path> to specify.")
			os.Exit(1)
		}
		fmt.Printf("\nExecuting in AE: %s\n", aeExe)
		cmd := exec.Command(aeExe, "-r", outputPath)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		if err := cmd.Run(); err != nil {
			fmt.Fprintf(os.Stderr, "AE execution error: %v\n", err)
			os.Exit(1)
		}
		fmt.Println("Done.")
	} else {
		fmt.Println("\nTo execute in AE:")
		fmt.Println("  1. Open After Effects")
		fmt.Println("  2. File > Scripts > Run Script File...")
		fmt.Printf("  3. Select: %s\n", outputPath)
		fmt.Println("\nOr run with --run flag to auto-execute.")
	}
}

func findAE() string {
	candidates := []string{
		"C:/Program Files/Adobe/Adobe After Effects 2026/Support Files/AfterFX.exe",
		"C:/Program Files/Adobe/Adobe After Effects 2025/Support Files/AfterFX.exe",
		"C:/Program Files/Adobe/Adobe After Effects 2024/Support Files/AfterFX.exe",
		"C:/Program Files/Adobe/Adobe After Effects 2023/Support Files/AfterFX.exe",
		"C:/Program Files/Adobe/Adobe After Effects CC 2022/Support Files/AfterFX.exe",
		"C:/Program Files/Adobe/Adobe After Effects CC 2021/Support Files/AfterFX.exe",
		"C:/Program Files/Adobe/Adobe After Effects CC 2020/Support Files/AfterFX.exe",
	}
	for _, p := range candidates {
		if _, err := os.Stat(p); err == nil {
			return p
		}
	}
	return ""
}
