'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Play,
  Pause,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  TimelineProject,
  TimelineLayer,
  KeyframePoint,
  MotionCurve,
  createDefaultTimelineProject,
  generateTimelineSvg,
  validateTimelineProject,
  PRESET_TIMELINE_SCENES,
} from '#/lib/animator/timeline';

export interface AnimationTimelineProps {
  initialProject?: TimelineProject;
  onExportSvg?: (svg: string) => void;
}

export function AnimationTimeline({ initialProject, onExportSvg }: AnimationTimelineProps) {
  const [project, setProject] = useState<TimelineProject>(() => initialProject || createDefaultTimelineProject());
  const [selectedLayerId, setSelectedLayerId] = useState<string>(() => project.layers[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playhead, setPlayhead] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  // Playhead scrubber simulation when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayhead((prev) => (prev >= 100 ? 0 : prev + 1));
    }, (project.duration * 1000) / 100);

    return () => clearInterval(interval);
  }, [isPlaying, project.duration]);

  // Selected layer
  const activeLayer = useMemo(() => {
    return project.layers.find((l) => l.id === selectedLayerId) || project.layers[0];
  }, [project.layers, selectedLayerId]);

  // Validation
  const validation = useMemo(() => {
    return validateTimelineProject(project);
  }, [project]);

  // SVG Output
  const svgOutput = useMemo(() => {
    try {
      return generateTimelineSvg(project);
    } catch {
      return '';
    }
  }, [project]);

  // Layer manipulation
  const toggleLayerVisibility = (layerId: string) => {
    setProject((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l)),
    }));
  };

  const toggleLayerLock = (layerId: string) => {
    setProject((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === layerId ? { ...l, locked: !l.locked } : l)),
    }));
  };

  const deleteLayer = (layerId: string) => {
    if (project.layers.length <= 1) return; // Keep at least one
    setProject((prev) => ({
      ...prev,
      layers: prev.layers.filter((l) => l.id !== layerId),
    }));
    if (selectedLayerId === layerId) {
      setSelectedLayerId(project.layers.find((l) => l.id !== layerId)?.id || '');
    }
  };

  const addKeyframeAtPlayhead = () => {
    if (!activeLayer || activeLayer.locked) return;
    const newKf: KeyframePoint = {
      id: `kf_${Date.now()}`,
      time: playhead,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
    };
    setProject((prev) => ({
      ...prev,
      layers: prev.layers.map((l) =>
        l.id === activeLayer.id
          ? {
              ...l,
              keyframes: [...l.keyframes.filter((k) => k.time !== playhead), newKf].sort(
                (a, b) => a.time - b.time
              ),
            }
          : l
      ),
    }));
  };

  const copySvg = () => {
    if (!svgOutput) return;
    navigator.clipboard.writeText(svgOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onExportSvg?.(svgOutput);
  };

  const copyMarkdownSnippet = () => {
    if (!svgOutput) return;
    const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgOutput)}`;
    const md = `<p align="center">\n  <img src="${dataUri}" alt="${project.name}" width="100%" />\n</p>`;
    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const downloadSvgFile = () => {
    if (!svgOutput) return;
    const blob = new Blob([svgOutput], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#0E1117] border-2 border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="p-4 bg-[#141A23] border-b-2 border-[#1E293B] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFE600] text-black font-black flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_#000]">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                className="bg-transparent text-white font-bold text-base focus:bg-[#0E1117] px-2 py-0.5 rounded border border-transparent focus:border-[#FFE600] outline-none"
              />
              <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                60 FPS Camo Engine
              </span>
            </div>
            <p className="text-xs text-neutral-400 pl-2">
              Non-destructive keyframe choreography & Camo SVG output
            </p>
          </div>
        </div>

        {/* Preset Scene Selector & Actions */}
        <div className="flex items-center gap-2">
          <select
            className="bg-[#0E1117] text-xs font-semibold text-neutral-200 border border-[#2D3748] rounded-lg px-3 py-1.5 focus:border-[#FFE600] outline-none"
            onChange={(e) => {
              const selected = PRESET_TIMELINE_SCENES.find((p) => p.id === e.target.value);
              if (selected) {
                setProject(JSON.parse(JSON.stringify(selected)));
                setSelectedLayerId(selected.layers[0]?.id || '');
              }
            }}
            value={project.id}
          >
            {PRESET_TIMELINE_SCENES.map((p) => (
              <option key={p.id} value={p.id}>
                Scene: {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={copyMarkdownSnippet}
            className="px-3 py-1.5 bg-[#1F2937] hover:bg-[#374151] text-xs font-bold text-neutral-200 rounded-lg border border-[#374151] flex items-center gap-1.5 transition-colors"
          >
            {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedMarkdown ? 'Copied MD!' : 'Copy Markdown'}
          </button>

          <button
            onClick={copySvg}
            className="px-3 py-1.5 bg-[#FFE600] hover:bg-[#FFD000] text-neutral-950 text-xs font-black rounded-lg flex items-center gap-1.5 transition-transform active:scale-95 shadow-[2px_2px_0px_0px_#000]"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            {copied ? 'Copied SVG!' : 'Copy SVG'}
          </button>

          <button
            onClick={downloadSvgFile}
            className="p-1.5 bg-[#1F2937] hover:bg-[#374151] text-neutral-200 rounded-lg border border-[#374151]"
            title="Download SVG file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Layers / Controls, Right Stage Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left Column: Layer Stack & Properties (4 cols) */}
        <div className="lg:col-span-4 bg-[#111620] border-r border-[#1E293B] p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
                Layers Stack ({project.layers.length})
              </span>
              <button
                onClick={() => {
                  const newLayer: TimelineLayer = {
                    id: `layer_${Date.now()}`,
                    name: `Custom Shape ${project.layers.length + 1}`,
                    type: 'custom-svg',
                    visible: true,
                    locked: false,
                    opacity: 1,
                    keyframes: [
                      { id: `kf_s_${Date.now()}`, time: 0, opacity: 0.5, scale: 0.9 },
                      { id: `kf_m_${Date.now()}`, time: 50, opacity: 1, scale: 1.1 },
                      { id: `kf_e_${Date.now()}`, time: 100, opacity: 0.5, scale: 0.9 },
                    ],
                    svgContent: `<circle cx="400" cy="110" r="30" fill="#FFE600" opacity="0.8" filter="drop-shadow(0 0 8px #FFE600)"/>`,
                  };
                  setProject((p) => ({ ...p, layers: [...p.layers, newLayer] }));
                  setSelectedLayerId(newLayer.id);
                }}
                className="px-2 py-1 bg-[#1E293B] hover:bg-[#334155] text-[11px] font-bold text-[#00F0FF] rounded flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Layer
              </button>
            </div>

            {/* Layer List */}
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {project.layers.map((layer) => {
                const isSelected = layer.id === selectedLayerId;
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1E293B] border-[#00F0FF]/50 text-white shadow-sm'
                        : 'bg-[#0E1117]/60 border-[#1E293B] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-xs">
                        {layer.type === 'character' ? '🤖' : layer.type === 'text' ? '🔤' : layer.type === 'border-beam' ? '⚡' : '🎨'}
                      </span>
                      <span className="text-xs font-semibold truncate">{layer.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleLayerVisibility(layer.id)}
                        className="p-1 hover:text-white text-neutral-400"
                        title="Toggle Visibility"
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5 text-[#00F0FF]" /> : <EyeOff className="w-3.5 h-3.5 opacity-40" />}
                      </button>
                      <button
                        onClick={() => toggleLayerLock(layer.id)}
                        className="p-1 hover:text-white text-neutral-400"
                        title="Lock Layer"
                      >
                        {layer.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 opacity-40" />}
                      </button>
                      {project.layers.length > 1 && (
                        <button
                          onClick={() => deleteLayer(layer.id)}
                          className="p-1 hover:text-red-400 text-neutral-500"
                          title="Delete Layer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Layer Inspector */}
          {activeLayer && (
            <div className="bg-[#0E1117] p-3 rounded-xl border border-[#1E293B] space-y-2 text-xs">
              <span className="font-bold text-neutral-300 flex items-center justify-between">
                <span>Properties: {activeLayer.name}</span>
                <span className="text-[10px] text-neutral-500 uppercase">{activeLayer.type}</span>
              </span>

              <div className="flex items-center justify-between text-neutral-400">
                <span>Opacity</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={activeLayer.opacity}
                    disabled={activeLayer.locked}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setProject((p) => ({
                        ...p,
                        layers: p.layers.map((l) => (l.id === activeLayer.id ? { ...l, opacity: val } : l)),
                      }));
                    }}
                    className="w-24 accent-[#FFE600]"
                  />
                  <span className="w-8 text-right font-mono text-white">
                    {Math.round(activeLayer.opacity * 100)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Camo SVG Canvas Stage (8 cols) */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between bg-[#080B10]">
          {/* Stage Container */}
          <div className="flex-1 flex items-center justify-center min-h-[220px]">
            {svgOutput ? (
              <div
                className="w-full max-w-[760px] rounded-xl overflow-hidden border border-[#1E293B] shadow-2xl transition-all"
                dangerouslySetInnerHTML={{ __html: svgOutput }}
              />
            ) : (
              <div className="text-neutral-500 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Unable to render preview. Check project parameters.
              </div>
            )}
          </div>

          {/* Canvas Metadata & Camo Security Badge */}
          <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-4">
              <span className={`flex items-center gap-1.5 font-semibold ${validation.valid ? 'text-emerald-400' : 'text-amber-400'}`}>
                <ShieldCheck className="w-4 h-4" /> {validation.valid ? '100% Camo Safe' : 'Camo Warning'}
              </span>
              <span>
                {project.width}x{project.height}px
              </span>
              <span>{project.duration}s Loop</span>
              <span>{project.motionCurve}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-neutral-500">Playhead: {playhead}%</span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded-lg border flex items-center gap-1 font-bold ${
                  isPlaying ? 'bg-[#FFE600] text-black border-[#FFE600]' : 'bg-[#1E293B] text-white border-[#334155]'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Keyframe Track Scrubber */}
      <div className="p-4 bg-[#141A23] border-t-2 border-[#1E293B] space-y-3">
        {/* Playhead track & keyframes */}
        <div className="relative w-full h-12 bg-[#0E1117] rounded-xl border border-[#1E293B] px-3 flex items-center">
          {/* Time ticks: 0%, 25%, 50%, 75%, 100% */}
          <div className="absolute inset-0 flex justify-between px-3 text-[9px] text-neutral-600 pointer-events-none items-end pb-1 font-mono">
            <span>0.0s (0%)</span>
            <span>{(project.duration * 0.25).toFixed(1)}s</span>
            <span>{(project.duration * 0.5).toFixed(1)}s</span>
            <span>{(project.duration * 0.75).toFixed(1)}s</span>
            <span>{project.duration.toFixed(1)}s (100%)</span>
          </div>

          {/* Active Layer Keyframes */}
          {activeLayer?.keyframes.map((kf) => (
            <div
              key={kf.id}
              style={{ left: `${kf.time}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#FFE600] border-2 border-black rotate-45 shadow cursor-pointer hover:scale-125 transition-transform"
              title={`Keyframe at ${kf.time}%`}
            />
          ))}

          {/* Playhead Indicator */}
          <div
            style={{ left: `${playhead}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] pointer-events-none"
          >
            <div className="w-2.5 h-2.5 bg-[#00F0FF] -translate-x-[4px] rotate-45" />
          </div>
        </div>

        {/* Timeline Track Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={addKeyframeAtPlayhead}
              disabled={!activeLayer || activeLayer.locked}
              className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] disabled:opacity-40 text-neutral-200 font-bold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#FFE600]" />
              Add Keyframe @ {playhead}%
            </button>

            {/* Motion curve selector */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-medium">Easing:</span>
              <select
                value={project.motionCurve}
                onChange={(e) => setProject({ ...project, motionCurve: e.target.value as MotionCurve })}
                className="bg-[#0E1117] text-neutral-200 border border-[#2D3748] rounded px-2 py-1 outline-none text-xs"
              >
                <option value="ease-in-out">Ease-In-Out</option>
                <option value="cyber-bounce">Cyber Bounce</option>
                <option value="elastic">Elastic Spring</option>
                <option value="linear">Linear</option>
              </select>
            </div>

            {/* Loop Duration */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-medium">Duration:</span>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={project.duration}
                onChange={(e) => setProject({ ...project, duration: parseFloat(e.target.value) })}
                className="w-20 accent-[#FFE600]"
              />
              <span className="font-mono text-white">{project.duration}s</span>
            </div>
          </div>

          <div className="text-[11px] text-neutral-500 font-mono">
            {activeLayer?.keyframes.length || 0} Keyframes on active track
          </div>
        </div>
      </div>
    </div>
  );
}
