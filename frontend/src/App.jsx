import { useState, useRef, useEffect, useCallback } from 'react'
import {
  LoadSpineFile,
  Convert,
  ConvertSkelToJson,
  FindAE,
  RunInAE,
  UnpackAtlas,
} from '../wailsjs/go/main/App'
import { OnFileDrop, OnFileDropOff } from '../wailsjs/runtime/runtime'

// ─── i18n ────────────────────────────────────────────────
const i18n = {
  zh: {
    title: 'Spine → AE',
    dropHint: '拖放 Spine JSON 文件到此处',
    dropHintSub: '支持 .json 和 .skel 文件',
    textureDir: '贴图目录',
    texturePlaceholder: '自动识别或手动输入路径...',
    animation: '动画',
    allAnimations: '全部动画',
    exportingAll: '正在导出全部动画...',
    exportingAnim: '正在导出动画',
    compName: '合成名称',
    padding: '边距 (px)',
    autoImportAE: '自动导入 AE',
    aePath: 'AE 路径',
    aeAutoDetected: '已自动识别',
    aeNotFound: '未找到，请手动输入',
    aePlaceholder: 'AfterFX.exe 路径...',
    generate: '生成 JSX',
    generateAndRun: '生成并导入 AE',
    generating: '生成中...',
    running: '导入中...',
    log: '日志',
    ready: '就绪',
    fileLoaded: '已加载',
    bones: '骨骼',
    slots: '插槽',
    anims: '动画',
    written: '已输出',
    scriptSize: '脚本大小',
    executingAE: '正在导入 After Effects...',
    doneAE: '完成！请查看 After Effects',
    errNoFile: '请先选择 Spine 文件',
    errNotJson: '请选择 .json 或 .skel 文件',
    convertingSkel: '正在转换 .skel → .json ...',
    skelConverted: '.skel 转换完成',
    skelConvertFailed: '.skel 转换失败',
    generatingScript: '正在生成 ExtendScript...',
    foundAE: '找到 AE',
    aeNotFoundLog: '未在默认路径找到 After Effects',
    atlasDetected: '已自动识别',
    atlasFile: 'Atlas 文件',
    atlasPlaceholder: '自动识别或手动输入 .atlas 路径...',
    pageImage: '图集贴图',
    pageImagePlaceholder: '自动识别或手动输入 .png 路径...',
    unpackAtlas: '解包贴图',
    unpacking: '解包中...',
    unpackDone: '解包完成',
    unpackRegions: '张贴图已输出到',
    unpackFailed: '解包失败',
    noAtlas: '请先设定 Atlas 文件路径',
  },
  en: {
    title: 'Spine → AE',
    dropHint: 'Drop Spine JSON file here',
    dropHintSub: 'Supports .json and .skel files',
    textureDir: 'Texture Directory',
    texturePlaceholder: 'Auto-detected or enter path...',
    animation: 'Animation',
    allAnimations: 'All Animations',
    exportingAll: 'Exporting all animations...',
    exportingAnim: 'Exporting animation',
    compName: 'Comp Name',
    padding: 'Padding (px)',
    autoImportAE: 'Auto Import to AE',
    aePath: 'AE Path',
    aeAutoDetected: 'Auto-detected',
    aeNotFound: 'Not found, enter manually',
    aePlaceholder: 'AfterFX.exe path...',
    generate: 'Generate JSX',
    generateAndRun: 'Generate & Import AE',
    generating: 'Generating...',
    running: 'Importing...',
    log: 'Log',
    ready: 'Ready.',
    fileLoaded: 'Loaded',
    bones: 'bones',
    slots: 'slots',
    anims: 'anims',
    written: 'Written',
    scriptSize: 'Script size',
    executingAE: 'Importing to After Effects...',
    doneAE: 'Done! Check After Effects.',
    errNoFile: 'Please select a Spine file first',
    errNotJson: 'Please select a .json or .skel file',
    convertingSkel: 'Converting .skel → .json ...',
    skelConverted: '.skel conversion done',
    skelConvertFailed: '.skel conversion failed',
    generatingScript: 'Generating ExtendScript...',
    foundAE: 'Found AE',
    aeNotFoundLog: 'After Effects not found in standard paths',
    atlasDetected: 'Auto-detected',
    atlasFile: 'Atlas File',
    atlasPlaceholder: 'Auto-detected or enter .atlas path...',
    pageImage: 'Page Image',
    pageImagePlaceholder: 'Auto-detected or enter .png path...',
    unpackAtlas: 'Unpack Textures',
    unpacking: 'Unpacking...',
    unpackDone: 'Unpack complete',
    unpackRegions: 'regions exported to',
    unpackFailed: 'Unpack failed',
    noAtlas: 'Please set Atlas file path first',
  },
}

// ─── Components ──────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        className={`relative w-9 h-5 rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-gray-600'
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </div>
      <span className="text-xs text-gray-300">{label}</span>
    </label>
  )
}

// ─── App ─────────────────────────────────────────────────
function App() {
  const [lang, setLang] = useState('zh')
  const t = i18n[lang]

  const [jsonPath, setJsonPath] = useState('')
  const [textureDir, setTextureDir] = useState('')
  const [atlasPath, setAtlasPath] = useState('')
  const [pageImagePath, setPageImagePath] = useState('')
  const [atlasAutoDetected, setAtlasAutoDetected] = useState(false)
  const [pageImageAutoDetected, setPageImageAutoDetected] = useState(false)
  const [compName, setCompName] = useState('')
  const [padding, setPadding] = useState('200')
  const [aePath, setAePath] = useState('')
  const [animationName, setAnimationName] = useState('')
  const [spineInfo, setSpineInfo] = useState(null)
  const [logs, setLogs] = useState([])
  const [generating, setGenerating] = useState(false)
  const [unpacking, setUnpacking] = useState(false)
  const [autoImport, setAutoImport] = useState(false)
  const [aeDetected, setAeDetected] = useState(false)
  const [dragging, setDragging] = useState(false)
  const logRef = useRef(null)

  const addLog = useCallback((msg) => {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, `[${time}] ${msg}`])
  }, [])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  // Derive output path from jsonPath + animation name
  const outputPath = jsonPath
    ? animationName === '__all__'
      ? jsonPath.replace(/\.[^.]+$/, '_*.jsx')
      : jsonPath.replace(/\.[^.]+$/, (animationName ? '_' + animationName : '') + '.jsx')
    : ''

  // ─── Load spine file ───
  const loadFile = useCallback(async (path) => {
    const lower = path.toLowerCase()
    if (lower.endsWith('.skel')) {
      try {
        addLog(t.convertingSkel)
        const converted = await ConvertSkelToJson(path)
        addLog(`${t.skelConverted}: ${converted}`)
        path = converted
      } catch (e) {
        addLog(`${t.skelConvertFailed}: ${e}`)
        return
      }
    } else if (!lower.endsWith('.json')) {
      addLog(t.errNotJson)
      return
    }
    try {
      setJsonPath(path)
      const info = await LoadSpineFile(path)
      setSpineInfo(info)
      setTextureDir(info.defaultTextureDir)
      setCompName(info.defaultCompName)
      if (info.atlasPath) {
        setAtlasPath(info.atlasPath)
        setAtlasAutoDetected(true)
      } else {
        setAtlasPath('')
        setAtlasAutoDetected(false)
      }
      if (info.pageImagePath) {
        setPageImagePath(info.pageImagePath)
        setPageImageAutoDetected(true)
      } else {
        setPageImagePath('')
        setPageImageAutoDetected(false)
      }
      if (info.animations && info.animations.length > 0) {
        setAnimationName('__all__')
      }
      addLog(`${t.fileLoaded}: ${path}`)
      addLog(
        `Spine ${info.version} | ${info.boneCount} ${t.bones}, ${info.slotCount} ${t.slots}, ${info.animations.length} ${t.anims}`
      )
      addLog(`AABB: ${info.width.toFixed(0)} × ${info.height.toFixed(0)}`)
    } catch (e) {
      addLog(`Error: ${e}`)
    }
  }, [addLog, t])

  // ─── Wails file drop (JS OnFileDrop registers HTML5 drag listeners) ───
  const loadFileRef = useRef(loadFile)
  useEffect(() => { loadFileRef.current = loadFile }, [loadFile])

  useEffect(() => {
    OnFileDropOff()
    OnFileDrop((x, y, paths) => {
      setDragging(false)
      if (paths && paths.length > 0) {
        const file = paths.find((p) => {
          const l = p.toLowerCase()
          return l.endsWith('.json') || l.endsWith('.skel')
        })
        if (file) {
          loadFileRef.current(file)
        }
      }
    }, true)
    return () => OnFileDropOff()
  }, [])

  // ─── Unpack atlas textures ───
  const handleUnpack = useCallback(async () => {
    if (!atlasPath) {
      addLog(t.noAtlas)
      return
    }
    setUnpacking(true)
    try {
      const result = await UnpackAtlas(atlasPath, pageImagePath, textureDir)
      addLog(`${t.unpackDone}: ${result.regionCount} ${t.unpackRegions} ${result.outputDir}`)
    } catch (e) {
      addLog(`${t.unpackFailed}: ${e}`)
    } finally {
      setUnpacking(false)
    }
  }, [atlasPath, pageImagePath, textureDir, addLog, t])

  // ─── HTML5 drag visual feedback ───
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragging(false)
  }
  const handleDrop = (e) => {
    setDragging(false)
  }

  // ─── AE auto-detect when toggle on ───
  useEffect(() => {
    if (autoImport && !aePath) {
      FindAE().then((path) => {
        if (path) {
          setAePath(path)
          setAeDetected(true)
          addLog(`${t.foundAE}: ${path}`)
        } else {
          setAeDetected(false)
          addLog(t.aeNotFoundLog)
        }
      })
    }
  }, [autoImport]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Generate ───
  const handleGenerate = async () => {
    if (!jsonPath) {
      addLog(t.errNoFile)
      return
    }
    setGenerating(true)
    try {
      const isAll = animationName === '__all__'
      const anims = isAll ? spineInfo.animations : [animationName]
      if (isAll) addLog(t.exportingAll)

      for (const anim of anims) {
        const animOutput = jsonPath.replace(/\.[^.]+$/, '_' + anim + '.jsx')
        if (isAll) addLog(`${t.exportingAnim}: ${anim}`)
        else addLog(t.generatingScript)

        const result = await Convert({
          jsonPath,
          textureDir,
          animationName: anim,
          outputPath: animOutput,
          compName,
          padding: parseFloat(padding) || 200,
        })
        addLog(`${t.written}: ${result.outputPath}`)
        addLog(`${t.scriptSize}: ${result.scriptSize.toFixed(1)} KB`)

        if (autoImport) {
          addLog(t.executingAE)
          await RunInAE(result.outputPath, aePath)
          addLog(t.doneAE)
        }
      }
    } catch (e) {
      addLog(`Error: ${e}`)
    } finally {
      setGenerating(false)
    }
  }

  const btnLabel = autoImport
    ? (generating ? t.running : t.generateAndRun)
    : (generating ? t.generating : t.generate)

  return (
    <div
      className="h-screen bg-gray-900 text-gray-100 flex flex-col select-none overflow-hidden"
      style={{ '--wails-drop-target': 'drop' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div
        className="shrink-0 px-5 py-3 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur flex items-center justify-between"
        style={{ '--wails-draggable': 'drag' }}
      >
        <h1 className="text-base font-semibold tracking-tight">
          <span className="text-blue-400">Spine</span>{' '}
          <span className="text-gray-500 font-normal">→</span>{' '}
          <span className="text-amber-400">AE</span>
        </h1>
        <button
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="text-[11px] text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700
                     px-2 py-0.5 rounded transition-colors"
          style={{ '--wails-draggable': 'no-drag' }}
        >
          {lang === 'zh' ? 'EN' : '中文'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5">
        {/* Drop zone */}
        <div
          className={`rounded-xl border-2 border-dashed transition-all text-center py-6 ${
            dragging
              ? 'border-blue-400 bg-blue-500/10'
              : jsonPath
                ? 'border-gray-700/50 bg-gray-800/30'
                : 'border-gray-600 bg-gray-800/40'
          }`}
          
        >
          {jsonPath ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-200 font-medium truncate px-4">{jsonPath.split(/[/\\]/).pop()}</p>
              <p className="text-[11px] text-gray-500 truncate px-4">{jsonPath}</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t.dropHint}</p>
              <p className="text-[11px] text-gray-600">{t.dropHintSub}</p>
            </div>
          )}
        </div>

        {/* Info bar */}
        {spineInfo && (
          <div className="rounded-lg bg-gray-800/50 border border-gray-700/40 px-3.5 py-2 text-xs text-gray-400 flex flex-wrap gap-x-3 gap-y-1">
            <span className="text-blue-400">v{spineInfo.version}</span>
            <span>
              <b className="text-gray-300">{spineInfo.boneCount}</b> {t.bones}
            </span>
            <span>
              <b className="text-gray-300">{spineInfo.slotCount}</b> {t.slots}
            </span>
            <span>
              <b className="text-gray-300">{spineInfo.animations.length}</b> {t.anims}
            </span>
            <span>
              {spineInfo.width.toFixed(0)} × {spineInfo.height.toFixed(0)}
            </span>
          </div>
        )}

        {/* Texture Directory */}
        <Field label={t.textureDir}>
          <input
            type="text"
            value={textureDir}
            onChange={(e) => setTextureDir(e.target.value)}
            placeholder={t.texturePlaceholder}
            className="input w-full"
          />
        </Field>

        {/* Atlas Unpack Section */}
        <div className="rounded-lg bg-gray-800/30 border border-gray-700/40 px-3.5 py-3 space-y-2.5">
          <Field label={t.atlasFile}>
            <div className="relative">
              <input
                type="text"
                value={atlasPath}
                onChange={(e) => { setAtlasPath(e.target.value); setAtlasAutoDetected(false) }}
                placeholder={t.atlasPlaceholder}
                className="input w-full pr-16"
              />
              {atlasPath && atlasAutoDetected && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-emerald-400">
                  {t.atlasDetected}
                </span>
              )}
            </div>
          </Field>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Field label={t.pageImage}>
                <div className="relative">
                  <input
                    type="text"
                    value={pageImagePath}
                    onChange={(e) => { setPageImagePath(e.target.value); setPageImageAutoDetected(false) }}
                    placeholder={t.pageImagePlaceholder}
                    className="input w-full pr-16"
                  />
                  {pageImagePath && pageImageAutoDetected && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-emerald-400">
                      {t.atlasDetected}
                    </span>
                  )}
                </div>
              </Field>
            </div>
            <button
              onClick={handleUnpack}
              disabled={unpacking || !atlasPath}
              className="btn-secondary shrink-0 flex items-center gap-1.5 mb-px"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {unpacking ? t.unpacking : t.unpackAtlas}
            </button>
          </div>
        </div>

        {/* Animation */}
        {spineInfo && spineInfo.animations.length > 0 && (
          <Field label={t.animation}>
            <select
              value={animationName}
              onChange={(e) => setAnimationName(e.target.value)}
              className="input w-full"
            >
              <option value="__all__">✨ {t.allAnimations} ({spineInfo.animations.length})</option>
              {spineInfo.animations.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </Field>
        )}

        {/* Comp Name & Padding */}
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.compName}>
            <input
              type="text"
              value={compName}
              onChange={(e) => setCompName(e.target.value)}
              className="input w-full"
            />
          </Field>
          <Field label={t.padding}>
            <input
              type="number"
              value={padding}
              onChange={(e) => setPadding(e.target.value)}
              className="input w-full"
            />
          </Field>
        </div>

        {/* Auto Import Toggle + AE Path */}
        <div className="space-y-2.5">
          <Toggle
            checked={autoImport}
            onChange={setAutoImport}
            label={t.autoImportAE}
          />
          {autoImport && (
            <Field label={t.aePath}>
              <div className="relative">
                <input
                  type="text"
                  value={aePath}
                  onChange={(e) => { setAePath(e.target.value); setAeDetected(false) }}
                  placeholder={t.aePlaceholder}
                  className="input w-full pr-20"
                />
                {aePath && aeDetected && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-emerald-400">
                    {t.aeAutoDetected}
                  </span>
                )}
              </div>
            </Field>
          )}
        </div>
      </div>

      {/* Action - pinned above log */}
      <div className="shrink-0 px-5 py-2.5 border-t border-gray-700/50 bg-gray-900/80">
        <button
          onClick={handleGenerate}
          disabled={!jsonPath || generating}
          className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors text-sm
            disabled:opacity-40 disabled:cursor-not-allowed
            ${autoImport
              ? 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white'
              : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white'
            }`}
        >
          {btnLabel}
        </button>
      </div>

      {/* Log */}
      <div className="shrink-0 border-t border-gray-700/50 bg-gray-950/40">
        <div className="px-5 py-1.5 text-[10px] text-gray-500 font-medium uppercase tracking-wider">
          {t.log}
        </div>
        <div
          ref={logRef}
          className="px-5 pb-3 h-28 overflow-y-auto text-xs font-mono text-gray-500 space-y-px"
        >
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
