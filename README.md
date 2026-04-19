# spineToAE

![screenshot](imgs/24dab2cc-7bed-4361-879e-55fe172dfd58.png)

Converts Spine skeletal animations to Adobe After Effects ExtendScript (.jsx).

---

**[中文文档](#中文文档)** | **[English](#english)**

---

## 中文文档

### 功能特性

- **Spine 3.7/3.8 JSON 支持**：解析骨骼、插槽、皮肤、附件（区域和网格）
- **加权网格支持**：多骨骼加权顶点，带位置/旋转表达式
- **动画关键帧**：旋转、平移、缩放，带贝塞尔缓动
- **跨平台**：Windows/Linux/macOS 单文件可执行
- **命令行界面**：完整的输出选项控制

### 使用方法

```bash
spine2ae <spine.json> [选项]
```

### 命令行选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--texture <dir>` | 纹理 PNG 目录路径 | `<json_dir>/texture` |
| `--animation <name>` | 要应用的动画 | JSON 中的第一个动画 |
| `--output <file>` | 输出 .jsx 路径 | JSON 同目录下的 `<json_name>.jsx` |
| `--name <comp>` | AE 合成名称 | JSON 文件名 |
| `--padding <px>` | 骨架周围填充 | 200 |
| `--run` | 在 After Effects 中自动执行 | false |
| `--ae <path>` | AfterFX.exe 路径 | 自动检测（Windows） |
| `--list` | 列出可用动画并退出 | false |

### 使用示例

```bash
# 基本转换
spine2ae spine-files/SunFlower.json

# 指定动画
spine2ae spine-files/SunFlower.json --animation idle

# 自定义输出和合成名称
spine2ae spine-files/SunFlower.json --animation idle --output output/SunFlower.jsx --name "我的动画"

# 在 After Effects 中自动运行（Windows）
spine2ae spine-files/SunFlower.json --animation idle --run
```

### 工作原理

1. **解析**：读取 Spine JSON 并规范化数据结构
2. **骨骼世界变换**：计算层次骨骼矩阵
3. **网格处理**：
   - 计算 UV 质心作为锚点
   - 计算世界边界框用于缩放
   - 生成每骨骼加权贡献
4. **脚本生成**：输出 ExtendScript，包含：
   - 创建正确尺寸的 AE 合成
   - 导入纹理素材
   - 为骨骼创建空图层（100x100，锚点 [50,50]）
   - 为附件创建图像图层
   - 对于加权网格：使用位置/旋转表达式而非父子关系
   - 应用带正确缓动的动画关键帧

### 坐标系统

| 系统 | Y 轴 | 旋转 | 原点 |
|------|------|------|------|
| Spine | 向上 | 逆时针为正 | 骨架根节点 (0,0) |
| AE | 向下 | 顺时针为正 | 合成左上角 |

- **位置**：`AE_x = bone.x`，`AE_y = -bone.y`（相对于父级）
- **旋转**：`AE_rotation = -Spine_rotation`
- **缩放**：`AE_scale = [Spine_scaleX * 100, Spine_scaleY * 100]`

### 网格变形方案

由于 After Effects 缺少直接的网格变形脚本功能，本工具使用：

- **位置表达式**：贡献骨骼世界位置的加权平均
- **旋转表达式**：骨骼世界旋转的加权平均（相对于设置姿态的差值）
- **缩放**：从网格世界边界框计算

这提供了近似的网格移动，无需真正的顶点变形。

### 下载预编译版本

访问 [Releases](https://github.com/XiaoXianThis/spine-to-ae/releases) 获取预编译的可执行文件。

### 从源码编译

```bash
# 克隆仓库
git clone https://github.com/XiaoXianThis/spine-to-ae.git
cd spine-to-ae/go

# 编译
go build -o spine2ae .

# 运行
./spine2ae <your_spine.json>
```

### 许可证

MIT

---

## English

### Features

- **Spine 3.7/3.8 JSON Support**: Parses bones, slots, skins, attachments (region & mesh)
- **Weighted Mesh Support**: Multi-bone weighted vertices with position/rotation expressions
- **Animation Keyframes**: Rotate, Translate, Scale with bezier easing
- **Cross-Platform**: Single binary executable for Windows/Linux/macOS
- **CLI Interface**: Full control over output options

### Usage

```bash
spine2ae <spine.json> [options]
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
spine2ae spine-files/SunFlower.json

# With specific animation
spine2ae spine-files/SunFlower.json --animation idle

# Custom output and composition name
spine2ae spine-files/SunFlower.json --animation idle --output output/SunFlower.jsx --name "My Animation"

# Auto-run in After Effects (Windows)
spine2ae spine-files/SunFlower.json --animation idle --run
```

### How It Works

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

### Coordinate Systems

| System | Y-Axis | Rotation | Origin |
|--------|--------|----------|--------|
| Spine | Up | CCW positive | Skeleton root (0,0) |
| AE | Down | CW positive | Comp top-left |

- **Position**: `AE_x = bone.x`, `AE_y = -bone.y` (relative to parent)
- **Rotation**: `AE_rotation = -Spine_rotation`
- **Scale**: `AE_scale = [Spine_scaleX * 100, Spine_scaleY * 100]`

### Mesh Deformation Approach

Since After Effects lacks direct mesh deformation scripting, this tool uses:

- **Position Expression**: Weighted average of contributing bone world positions
- **Rotation Expression**: Weighted average of bone world rotations (delta from setup pose)
- **Scale**: Computed from mesh world bounding box

This provides approximate mesh movement without true vertex deformation.

### Download Pre-built Binaries

Visit [Releases](https://github.com/XiaoXianThis/spine-to-ae/releases) for pre-built executables.

### Build from Source

```bash
# Clone repository
git clone https://github.com/XiaoXianThis/spine-to-ae.git
cd spine-to-ae/go

# Build
go build -o spine2ae .

# Run
./spine2ae <your_spine.json>
```

### License

MIT
