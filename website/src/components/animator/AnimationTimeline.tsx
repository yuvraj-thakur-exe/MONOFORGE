'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
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
  Zap,
  Bot,
  Type,
  SlidersHorizontal,
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

function renderLayerTypeIcon(type: TimelineLayer['type']) {
  switch (type) {
    case 'character':
      return <Bot className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    case 'text':
      return <Type className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    case 'border-beam':
      return <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    default:
      return <Layers className="w-3.5 h-3.5 text-slate-300 shrink-0" />;
  }
}

export function AnimationTimeline({ initialProject, onExportSvg }: AnimationTimelineProps) {
  const [project, setProject] = useState<TimelineProject>(() => initialProject || createDefaultTimelineProject());
  const [selectedLayerId, setSelectedLayerId] = useState<string>(() => project.layers[0]?.id || '');
  const [selectedKeyframeId, setSelectedKeyframeId] = useState<string | null>(
    () => project.layers[0]?.keyframes[0]?.id || null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playhead, setPlayhead] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

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

  // Selected keyframe on active layer
  const selectedKeyframe = useMemo(() => {
    if (!activeLayer) return null;
    return activeLayer.keyframes.find((k) => k.id === selectedKeyframeId) || null;
  }, [activeLayer, selectedKeyframeId]);

  useEffect(() => {
    if (!activeLayer) {
      setSelectedKeyframeId(null);
      return;
    }
    if (!activeLayer.keyframes.some((k) => k.id === selectedKeyframeId)) {
      setSelectedKeyframeId(activeLayer.keyframes[0]?.id || null);
    }
  }, [activeLayer, selectedKeyframeId]);

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
    if (project.layers.length <= 1) return;
    const nextLayers = project.layers.filter((l) => l.id !== layerId);
    setProject((prev) => ({
      ...prev,
      layers: nextLayers,
    }));
    if (selectedLayerId === layerId) {
      setSelectedLayerId(nextLayers[0]?.id || '');
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
    setSelectedKeyframeId(newKf.id);
  };

  const updateSelectedKeyframe = (patch: Partial<KeyframePoint>) => {
    if (!activeLayer || !selectedKeyframe || activeLayer.locked) return;
    setProject((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => {
        if (l.id !== activeLayer.id) return l;
        const updatedKfs = l.keyframes
          .map((k) => (k.id === selectedKeyframe.id ? { ...k, ...patch } : k))
          .sort((a, b) => a.time - b.time);
        return { ...l, keyframes: updatedKfs };
      }),
    }));
  };

  const deleteKeyframe = (kfId: string) => {
    if (!activeLayer || activeLayer.locked) return;
    const remaining = activeLayer.keyframes.filter((k) => k.id !== kfId);
    setProject((prev) => ({
      ...prev,
      layers: prev.layers.map((l) =>
        l.id === activeLayer.id
          ? { ...l, keyframes: remaining }
          : l
      ),
    }));
    if (selectedKeyframeId === kfId) {
      setSelectedKeyframeId(remaining[0]?.id || null);
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    const pct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    setPlayhead(pct);
    setIsPlaying(false);
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
    <div className="w-full bg-[#0f172a] border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="p-4 bg-slate-900 border-b-2 border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFE600] text-slate-950 font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#334155]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
                aria-label="Timeline project name"
                className="bg-transparent text-white font-bold text-base focus:bg-slate-800 px-2 py-0.5 rounded border border-transparent focus:border-[#FFE600] outline-none"
              />
              <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                60 FPS Camo Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 pl-2">
              Non-destructive keyframe choreography &amp; Camo SVG output
            </p>
          </div>
        </div>

        {/* Preset Scene Selector & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 focus:border-[#FFE600] outline-none"
            onChange={(e) => {
              const selected = PRESET_TIMELINE_SCENES.find((p) => p.id === e.target.value);
              if (selected) {
                const cloned: TimelineProject = JSON.parse(JSON.stringify(selected));
                setProject(cloned);
                setSelectedLayerId(cloned.layers[0]?.id || '');
                setSelectedKeyframeId(cloned.layers[0]?.keyframes[0]?.id || null);
              }
            }}
            value={project.id}
            aria-label="Select timeline scene preset"
          >
            {PRESET_TIMELINE_SCENES.map((p) => (
              <option key={p.id} value={p.id}>
                Scene: {p.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={copyMarkdownSnippet}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedMarkdown ? 'Copied MD!' : 'Copy Markdown'}
          </button>

          <button
            type="button"
            onClick={copySvg}
            className="px-3 py-1.5 bg-[#FFE600] hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg flex items-center gap-1.5 transition-transform active:scale-95 shadow-[2px_2px_0px_0px_#334155] cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            {copied ? 'Copied SVG!' : 'Copy SVG'}
          </button>

          <button
            type="button"
            onClick={downloadSvgFile}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 cursor-pointer"
            title="Download SVG file"
            aria-label="Download SVG file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Layers / Controls, Right Stage Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left Column: Layer Stack & Properties (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/80 border-r border-slate-800 p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Layers Stack ({project.layers.length})
              </span>
              <button
                type="button"
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
                  setSelectedKeyframeId(newLayer.keyframes[0].id);
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-cyan-300 rounded flex items-center gap-1 border border-slate-700 cursor-pointer"
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
                        ? 'bg-slate-800 border-cyan-400/60 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {renderLayerTypeIcon(layer.type)}
                      <span className="text-xs font-semibold truncate">{layer.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => toggleLayerVisibility(layer.id)}
                        className="p-1 hover:text-white text-slate-400 cursor-pointer"
                        title="Toggle Visibility"
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5 opacity-40" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleLayerLock(layer.id)}
                        className="p-1 hover:text-white text-slate-400 cursor-pointer"
                        title="Lock Layer"
                      >
                        {layer.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 opacity-40" />}
                      </button>
                      {project.layers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteLayer(layer.id)}
                          className="p-1 hover:text-rose-400 text-slate-500 cursor-pointer"
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
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-300 flex items-center justify-between">
                <span>Properties: {activeLayer.name}</span>
                <span className="text-[10px] text-slate-400 uppercase">{activeLayer.type}</span>
              </span>

              <div className="flex items-center justify-between text-slate-400">
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
        <div className="lg:col-span-8 p-6 flex flex-col justify-between bg-[#0f172a]">
          {/* Stage Container */}
          <div className="flex-1 flex items-center justify-center min-h-[220px]">
            {svgOutput ? (
              <div
                className="w-full max-w-[760px] rounded-xl overflow-hidden border border-slate-700 shadow-2xl transition-all"
                dangerouslySetInnerHTML={{ __html: svgOutput }}
              />
            ) : (
              <div className="text-slate-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Unable to render preview. Check project parameters.
              </div>
            )}
          </div>

          {/* Canvas Metadata & Camo Security Badge */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
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
              <span className="text-[11px] text-slate-400 font-mono">Playhead: {playhead}%</span>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded-lg border flex items-center gap-1 font-bold cursor-pointer ${
                  isPlaying ? 'bg-[#FFE600] text-slate-950 border-[#FFE600]' : 'bg-slate-800 text-white border-slate-700'
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
      <div className="p-4 bg-slate-900 border-t-2 border-slate-700 space-y-3">
        {/* Playhead track & keyframes (clickable track to scrub, clickable/selectable keyframes) */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          role="slider"
          aria-label="Animation timeline scrubber"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={playhead}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') setPlayhead((p) => Math.min(100, p + 5));
            if (e.key === 'ArrowLeft') setPlayhead((p) => Math.max(0, p - 5));
          }}
          className="relative w-full h-12 bg-slate-800/80 rounded-xl border border-slate-700 px-3 flex items-center cursor-pointer select-none"
        >
          {/* Time ticks: 0%, 25%, 50%, 75%, 100% */}
          <div className="absolute inset-0 flex justify-between px-3 text-[9px] text-slate-400 pointer-events-none items-end pb-1 font-mono">
            <span>0.0s (0%)</span>
            <span>{(project.duration * 0.25).toFixed(1)}s</span>
            <span>{(project.duration * 0.5).toFixed(1)}s</span>
            <span>{(project.duration * 0.75).toFixed(1)}s</span>
            <span>{project.duration.toFixed(1)}s (100%)</span>
          </div>

          {/* Active Layer Keyframes */}
          {activeLayer?.keyframes.map((kf) => {
            const isSelected = kf.id === selectedKeyframe?.id;
            return (
              <button
                key={kf.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedKeyframeId(kf.id);
                  setPlayhead(kf.time);
                  setIsPlaying(false);
                }}
                style={{ left: `${kf.time}%` }}
                aria-label={`Select keyframe at ${kf.time}%`}
                aria-pressed={isSelected}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 shadow cursor-pointer transition-transform z-10 ${
                  isSelected
                    ? 'bg-emerald-400 border-2 border-slate-900 scale-125 ring-2 ring-emerald-300/70'
                    : 'bg-[#FFE600] border-2 border-slate-900 hover:scale-125'
                }`}
                title={`Keyframe at ${kf.time}% (Click to inspect or delete)`}
              />
            );
          })}

          {/* Playhead Indicator */}
          <div
            style={{ left: `${playhead}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee] pointer-events-none"
          >
            <div className="w-2.5 h-2.5 bg-cyan-400 -translate-x-[4px] rotate-45" />
          </div>
        </div>

        {/* Selected Keyframe Inspector & Delete */}
        {selectedKeyframe && activeLayer && (
          <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Keyframe @ {selectedKeyframe.time}%</span>
              <span className="text-[10px] font-mono text-slate-400">({activeLayer.name})</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-300">
              <label className="flex items-center gap-1">
                <span>t%</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  disabled={activeLayer.locked}
                  value={selectedKeyframe.time}
                  onChange={(e) => {
                    const nextT = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                    updateSelectedKeyframe({ time: nextT });
                    setPlayhead(nextT);
                  }}
                  className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>X</span>
                <input
                  type="number"
                  disabled={activeLayer.locked}
                  value={selectedKeyframe.x ?? 0}
                  onChange={(e) => updateSelectedKeyframe({ x: Number(e.target.value) || 0 })}
                  className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>Y</span>
                <input
                  type="number"
                  disabled={activeLayer.locked}
                  value={selectedKeyframe.y ?? 0}
                  onChange={(e) => updateSelectedKeyframe({ y: Number(e.target.value) || 0 })}
                  className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>Scale</span>
                <input
                  type="number"
                  step="0.05"
                  min={0.1}
                  max={3}
                  disabled={activeLayer.locked}
                  value={selectedKeyframe.scale ?? 1}
                  onChange={(e) => updateSelectedKeyframe({ scale: Number(e.target.value) || 1 })}
                  className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>Deg</span>
                <input
                  type="number"
                  disabled={activeLayer.locked}
                  value={selectedKeyframe.rotation ?? 0}
                  onChange={(e) => updateSelectedKeyframe({ rotation: Number(e.target.value) || 0 })}
                  className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>Opacity</span>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  max={1}
                  disabled={activeLayer.locked}
                  value={selectedKeyframe.opacity ?? 1}
                  onChange={(e) =>
                    updateSelectedKeyframe({ opacity: Math.max(0, Math.min(1, Number(e.target.value) || 0)) })
                  }
                  className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white"
                />
              </label>
            </div>

            <button
              type="button"
              disabled={activeLayer.locked}
              onClick={() => deleteKeyframe(selectedKeyframe.id)}
              className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 disabled:opacity-40 text-rose-300 border border-rose-500/40 font-bold flex items-center gap-1 cursor-pointer"
              title="Delete selected keyframe"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Keyframe</span>
            </button>
          </div>
        )}

        {/* Timeline Track Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={addKeyframeAtPlayhead}
              disabled={!activeLayer || activeLayer.locked}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold rounded-lg flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#FFE600]" />
              Add Keyframe @ {playhead}%
            </button>

            {/* Motion curve selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Easing:</span>
              <select
                value={project.motionCurve}
                onChange={(e) => setProject({ ...project, motionCurve: e.target.value as MotionCurve })}
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 outline-none text-xs"
              >
                <option value="ease-in-out">Ease-In-Out</option>
                <option value="cyber-bounce">Cyber Bounce</option>
                <option value="elastic">Elastic Spring</option>
                <option value="linear">Linear</option>
              </select>
            </div>

            {/* Loop Duration */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Duration:</span>
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

          <div className="text-[11px] text-slate-400 font-mono">
            {activeLayer?.keyframes.length || 0} Keyframes on active track
          </div>
        </div>
      </div>
    </div>
  );
}
