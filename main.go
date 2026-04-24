package main

import (
	"embed"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title:  "Spine to AE",
		Width:  800,
		Height: 860,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 17, G: 24, B: 39, A: 255},
		OnStartup:        app.startup,
		OnDomReady:       app.domReady,
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop:     true,
			DisableWebViewDrop: false,
		},
		Windows: &windows.Options{
			WebviewIsTransparent: false,
		},
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
		os.Exit(1)
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
