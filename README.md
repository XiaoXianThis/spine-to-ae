# spineToAE (Go Version)

A Golang implementation of [spineToAE](https://github.com/XiaoXianThis/spine-to-ae) — converts Spine skeletal animations to Adobe After Effects ExtendScript (.jsx).

## Features

- **Spine 3.7/3.8 JSON Support**: Parses bones, slots, skins, attachments (region & mesh)
- **Weighted Mesh Support**: Multi-bone weighted vertices with position/rotation expressions
- **Animation Keyframes**: Rotate, Translate, Scale with bezier easing
- **Cross-Platform**: Single binary executable for Windows/Linux/macOS
- **CLI Interface**: Full control over output options

## Installation

### Build from Source

```bash
cd go
go build -o spineToAE .
```

### Download Binary

See [Releases](https://github.com/XiaoXianThis/spine-to-ae/releases) for pre-built executables.

## Usage

```bash
spineToAE <spine.json> [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--texture <dir>` | Path to texture PNGs directory | `<json_dir>/texture` |
| `--animation <name>` | Animation to apply | First animation in JSON |
| `--output <file>` | Output .jsx path | `<json_name>.jsx` next to JSON |
| `--name <comp>` | AE composition name | JSON file name |
| `--padding <px>` | Padding around skeleton | 200 |
| `--run` | Auto-execute in After Effects | false |
| `--ae <path>` | Path to AfterFX.exe | Auto-detect (Windows) |
| `--list` | List available animations and exit | false |

### Examples

```bash
# Basic conversion
spineToAE spine-files/SunFlower.json

# With specific animation
spineToAE spine-files/SunFlower.json --animation idle

# Custom output and composition name
spineToAE spine-files/SunFlower.json --animation idle --output output/SunFlower.jsx --name "My Animation"

# Auto-run in After Effects (Windows)
spineToAE spine-files/SunFlower.json --animation idle --run
```

## How It Works

1. **Parsing**: Reads Spine JSON and normalizes data structures
2. **Bone World Transforms**: Computes hierarchical bone matrices
3. **Mesh Processing**: 
   - Calculates UV centroid for anchor points
   - Computes world bounding box for scale
   - Generates per-bone weighted contributions
4. **Script Generation**: Outputs ExtendScript that:
   - Creates AE composition with proper dimensions
   - Imports texture footage
   - Creates null layers for bones (100x100, anchor at [50,50])
   - Creates image layers for attachments
   - For weighted meshes: uses Position/Rotation expressions instead of parenting
   - Applies animation keyframes with proper easing

## Coordinate Systems

| System | Y-Axis | Rotation | Origin |
|--------|--------|----------|--------|
| Spine | Up | CCW positive | Skeleton root (0,0) |
| AE | Down | CW positive | Comp top-left |

- **Position**: `AE_x = bone.x`, `AE_y = -bone.y` (relative to parent)
- **Rotation**: `AE_rotation = -Spine_rotation`
- **Scale**: `AE_scale = [Spine_scaleX * 100, Spine_scaleY * 100]`

## Mesh Deformation Approach

Since After Effects lacks direct mesh deformation scripting, this tool uses:

- **Position Expression**: Weighted average of contributing bone world positions
- **Rotation Expression**: Weighted average of bone world rotations (delta from setup pose)
- **Scale**: Computed from mesh world bounding box

This provides approximate mesh movement without true vertex deformation.

## Comparison with TypeScript Version

| Feature | TypeScript | Go |
|---------|------------|-----|
| Runtime | Bun | Native binary |
| Binary Size | ~108 MB | ~3.2 MB |
| Dependencies | Bun runtime | None (static binary) |
| Startup Speed | Moderate | Fast |
| Output Identical | Yes | Yes |

## Development

```bash
# Run tests
go test ./...

# Format code
go fmt ./...

# Build
go build -o spineToAE .
```

## License

MIT

## Original Project

[TypeScript version](https://github.com/XiaoXianThis/spine-to-ae)
