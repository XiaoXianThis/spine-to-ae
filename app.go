package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct is the main application binding for Wails
type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Debug log to file next to exe
	exePath, _ := os.Executable()
	logFile, _ := os.OpenFile(filepath.Join(filepath.Dir(exePath), "debug.log"), os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if logFile != nil {
		log.SetOutput(logFile)
	}
	log.Println("startup called")
}

func (a *App) domReady(ctx context.Context) {
	log.Println("domReady called")
}

func (a *App) OpenSpineFile() (string, error) {
	path, err := wailsRuntime.OpenFileDialog(a.ctx, wailsRuntime.OpenDialogOptions{
		Title: "Select Spine File",
		Filters: []wailsRuntime.FileFilter{
			{DisplayName: "Spine Files (*.json;*.skel)", Pattern: "*.json;*.skel"},
			{DisplayName: "All Files (*.*)", Pattern: "*.*"},
		},
	})
	if err != nil {
		return "", err
	}
	return path, nil
}

// --- Types returned to frontend ---

type SpineInfo struct {
	Version           string   `json:"version"`
	BoneCount         int      `json:"boneCount"`
	SlotCount         int      `json:"slotCount"`
	Animations        []string `json:"animations"`
	Width             float64  `json:"width"`
	Height            float64  `json:"height"`
	DefaultTextureDir string   `json:"defaultTextureDir"`
	DefaultOutputPath string   `json:"defaultOutputPath"`
	DefaultCompName   string   `json:"defaultCompName"`
	AtlasPath         string   `json:"atlasPath"`
	PageImagePath     string   `json:"pageImagePath"`
}

type UnpackResult struct {
	OutputDir   string `json:"outputDir"`
	RegionCount int    `json:"regionCount"`
}

type ConvertOptions struct {
	JsonPath      string  `json:"jsonPath"`
	TextureDir    string  `json:"textureDir"`
	AnimationName string  `json:"animationName"`
	OutputPath    string  `json:"outputPath"`
	CompName      string  `json:"compName"`
	Padding       float64 `json:"padding"`
}

type ConvertResult struct {
	OutputPath string  `json:"outputPath"`
	ScriptSize float64 `json:"scriptSize"`
}

// --- Core methods ---

func (a *App) LoadSpineFile(path string) (*SpineInfo, error) {
	rawJson, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	var spineJson SpineJson
	if err := json.Unmarshal(rawJson, &spineJson); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	spineData := ParseSpineJson(&spineJson)

	jsonDir := filepath.Dir(path)
	jsonName := strings.TrimSuffix(filepath.Base(path), filepath.Ext(path))

	version := spineData.Skeleton.Spine
	if version == "" {
		version = "unknown"
	}

	// Detect atlas file
	atlasPath := ""
	atlasList := DetectAtlasFiles(path)
	if len(atlasList) > 0 {
		atlasPath = atlasList[0]
	}

	// Detect page image
	pageImagePath := ""
	if atlasPath != "" {
		pages, _, _ := ParseAtlas(atlasPath)
		if len(pages) > 0 {
			candidate := filepath.Join(filepath.Dir(atlasPath), pages[0].ImageName)
			if _, err := os.Stat(candidate); err == nil {
				pageImagePath = candidate
			}
		}
	}
	if pageImagePath == "" {
		candidate := filepath.Join(jsonDir, jsonName+".png")
		if _, err := os.Stat(candidate); err == nil {
			pageImagePath = candidate
		}
	}

	return &SpineInfo{
		Version:           version,
		BoneCount:         len(spineData.BoneOrder),
		SlotCount:         len(spineData.Slots),
		Animations:        spineData.Animations.Keys,
		Width:             spineData.Skeleton.Width,
		Height:            spineData.Skeleton.Height,
		DefaultTextureDir: filepath.Join(jsonDir, "texture"),
		DefaultOutputPath: filepath.Join(jsonDir, jsonName+".jsx"),
		DefaultCompName:   jsonName,
		AtlasPath:         atlasPath,
		PageImagePath:     pageImagePath,
	}, nil
}

func (a *App) Convert(opts ConvertOptions) (*ConvertResult, error) {
	rawJson, err := os.ReadFile(opts.JsonPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	var spineJson SpineJson
	if err := json.Unmarshal(rawJson, &spineJson); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	spineData := ParseSpineJson(&spineJson)

	padding := opts.Padding
	if padding == 0 {
		padding = 200
	}

	script := GenerateScript(GeneratorOptions{
		SpineData:     spineData,
		TextureDir:    opts.TextureDir,
		AnimationName: opts.AnimationName,
		CompName:      opts.CompName,
		CompPadding:   padding,
	})

	if err := os.WriteFile(opts.OutputPath, []byte(script), 0644); err != nil {
		return nil, fmt.Errorf("failed to write output: %w", err)
	}

	return &ConvertResult{
		OutputPath: opts.OutputPath,
		ScriptSize: float64(len(script)) / 1024,
	}, nil
}

func (a *App) ConvertSkelToJson(skelPath string) (string, error) {
	dir := filepath.Dir(skelPath)
	base := strings.TrimSuffix(filepath.Base(skelPath), filepath.Ext(skelPath))
	jsonPath := filepath.Join(dir, base+".json")

	skelExe, err := findSkeletonExe()
	if err != nil {
		return "", err
	}

	cmd := exec.Command(skelExe, skelPath, jsonPath, "-v", "3.8.99")
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("skel conversion failed: %w\n%s", err, string(output))
	}

	if _, err := os.Stat(jsonPath); err != nil {
		return "", fmt.Errorf("conversion produced no output file")
	}

	return jsonPath, nil
}

func findSkeletonExe() (string, error) {
	exePath, err := os.Executable()
	if err == nil {
		exeDir := filepath.Dir(exePath)
		candidates := []string{
			filepath.Join(exeDir, "skeleton.exe"),
			filepath.Join(exeDir, "bin", "skeleton.exe"),
		}
		for _, c := range candidates {
			if _, err := os.Stat(c); err == nil {
				return c, nil
			}
		}
	}

	wdCandidates := []string{
		filepath.Join("bin", "skeleton.exe"),
		"skeleton.exe",
	}
	for _, c := range wdCandidates {
		if _, err := os.Stat(c); err == nil {
			abs, _ := filepath.Abs(c)
			return abs, nil
		}
	}

	return "", fmt.Errorf("skeleton.exe not found, please place it in the bin/ directory next to the application")
}

func (a *App) UnpackAtlas(atlasPath string, pageImagePath string, outputDir string) (*UnpackResult, error) {
	if atlasPath == "" {
		return nil, fmt.Errorf("atlas path is empty")
	}
	if outputDir == "" {
		outputDir = filepath.Join(filepath.Dir(atlasPath), "texture")
	}
	count, err := UnpackAtlasFile(atlasPath, pageImagePath, outputDir)
	if err != nil {
		return nil, err
	}
	return &UnpackResult{
		OutputDir:   outputDir,
		RegionCount: count,
	}, nil
}

func (a *App) FindAE() string {
	return findAE()
}

func (a *App) RunInAE(jsxPath string, aePath string) error {
	if aePath == "" {
		aePath = findAE()
	}
	if aePath == "" {
		return fmt.Errorf("could not find AfterFX.exe, please specify the path")
	}
	cmd := exec.Command(aePath, "-r", jsxPath)
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("AE execution error: %w", err)
	}
	return nil
}
