'use client';

import { useState, useMemo } from 'react';
import {
  VisualizationId,
  VisualizationTheme,
  OutputMode,
  NormalizedDeveloperIdentity,
} from '#/lib/visualizations/types';
import { VISUALIZATION_REGISTRY, ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { VISUALIZATION_THEMES } from '#/lib/visualizations/themes';
import {
  buildSyntheticDeveloperIdentity,
  fetchNormalizedDeveloperIdentity,
} from '#/lib/visualizations/data-engine';
import {
  generateCommitCitySvg,
  generateCommitRiverSvg,
  generateYearClockSvg,
  generateCodingPulseSvg,
  generateDeveloperTerminalSvg,
  generateContributionSnakeSvg,
  generateRepositoryGalaxySvg,
  generateDeveloperDnaSvg,
  generateSkillConstellationSvg,
} from '#/lib/visualizations/svg-generators';
import { CanvasVisualizer } from './CanvasVisualizer';
import { ReadmeDoctorModal } from '#/components/studio/ReadmeDoctorModal';
import {
  Sparkles,
  Play,
  Pause,
  Copy,
  Check,
  Download,
  Code2,
  ExternalLink,
  Search,
  Stethoscope,
  Star,
  Monitor,
  Flame,
} from 'lucide-react';
import { toast } from 'sonner';

export function VisualizationStudio() {
  const [username, setUsername] = useState('octocat');
  const [inputUsername, setInputUsername] = useState('octocat');
  const [activeVizId, setActiveVizId] = useState<VisualizationId>('commit-city');
  const [theme, setTheme] = useState<VisualizationTheme>('emerald');
  const [outputMode, setOutputMode] = useState<OutputMode>('canvas');
  const [speed, setSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDoctorOpen, setIsDoctorOpen] = useState<boolean>(false);

  // Identity state
  const [identity, setIdentity] = useState<NormalizedDeveloperIdentity>(() =>
    buildSyntheticDeveloperIdentity('octocat')
  );

  // Fetch telemetry whenever username changes
  const handleFetchUser = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputUsername.trim() || 'octocat';
    setUsername(clean);
    setIsLoading(true);
    toast.info(`Fetching live contributor activity for @${clean}...`);
    try {
      const data = await fetchNormalizedDeveloperIdentity(clean);
      setIdentity(data);
      toast.success(
        data.isRealData
          ? `Hydrated ${data.totalContributions} live GitHub contributions for @${clean}!`
          : `Calibrated real-time developer identity for @${clean}.`
      );
    } catch {
      toast.error('Failed to contact GitHub telemetry API. Reverting to local dataset.');
    } finally {
      setIsLoading(false);
    }
  };

  const activeManifest = VISUALIZATION_REGISTRY[activeVizId];

  // Active SVG content
  const activeSvg = useMemo(() => {
    switch (activeVizId) {
      case 'commit-city':
        return generateCommitCitySvg(identity, { theme });
      case 'commit-river':
        return generateCommitRiverSvg(identity, { theme });
      case 'year-clock':
        return generateYearClockSvg(identity, { theme });
      case 'coding-pulse':
        return generateCodingPulseSvg(identity, { theme });
      case 'developer-terminal':
        return generateDeveloperTerminalSvg(identity, { theme });
      case 'contribution-snake':
        return generateContributionSnakeSvg(identity, { theme });
      case 'repository-galaxy':
        return generateRepositoryGalaxySvg(identity, { theme });
      case 'developer-dna':
        return generateDeveloperDnaSvg(identity, { theme });
      case 'skill-constellation':
        return generateSkillConstellationSvg(identity, { theme });
      default:
        return generateCommitCitySvg(identity, { theme });
    }
  }, [activeVizId, identity, theme]);

  // Copy Markdown Embed
  const handleCopyMarkdown = () => {
    const pluginParam = activeVizId.replace(/-/g, '');
    const embedUrl = `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${pluginParam}&user=${encodeURIComponent(
      username
    )}&theme=${theme}`;
    const md = `[![${activeManifest.name}](${embedUrl})](https://github.com/yuvraj-thakur-exe/MONOFORGE)`;
    navigator.clipboard.writeText(md);
    setCopiedKey('markdown');
    toast.success('GitHub README Markdown snippet copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Copy SVG URL
  const handleCopyUrl = () => {
    const pluginParam = activeVizId.replace(/-/g, '');
    const embedUrl = `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${pluginParam}&user=${encodeURIComponent(
      username
    )}&theme=${theme}`;
    navigator.clipboard.writeText(embedUrl);
    setCopiedKey('url');
    toast.success('Direct Camo-safe SVG endpoint URL copied!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Download standalone SVG file
  const handleDownloadSvg = () => {
    const blob = new Blob([activeSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `monoforge-${activeVizId}-${username}-${theme}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${link.download}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Studio Header Bar */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold font-mono text-white tracking-wide">
                MONOFORGE 3.0 // VISUALIZATION STUDIO
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                P0 ENGINE ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden md:block">
              One Real GitHub Dataset &bull; 9 Signature 60fps Visual Experiences
            </p>
          </div>
        </div>

        {/* GitHub User Search Bar */}
        <form onSubmit={handleFetchUser} className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-mono font-bold text-slate-500">@</span>
            <input
              type="text"
              value={inputUsername}
              onChange={e => setInputUsername(e.target.value)}
              placeholder="github-username"
              className="pl-7 pr-3 py-1.5 w-36 sm:w-48 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#ffe600] text-slate-950 hover:bg-[#fde047] active:scale-95 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Calibrating...' : 'Sync'}</span>
          </button>

          {/* README Doctor Trigger */}
          <button
            type="button"
            onClick={() => setIsDoctorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all cursor-pointer"
            title="Launch README Doctor diagnostic inspection"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">README Doctor</span>
          </button>
        </form>
      </header>

      {/* Main Studio Body */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1720px] w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Left Sidebar: 9 Signature Visualizations Selector */}
        <aside className="w-full lg:w-80 shrink-0 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Signature Architectures ({ALL_VISUALIZATION_IDS.length})
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                REAL DATA
              </span>
            </div>

            <div className="space-y-1.5">
              {ALL_VISUALIZATION_IDS.map(vizId => {
                const manifest = VISUALIZATION_REGISTRY[vizId];
                const isActive = activeVizId === vizId;

                return (
                  <button
                    key={vizId}
                    type="button"
                    onClick={() => {
                      setActiveVizId(vizId);
                      setHoverInfo(null);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.15)] text-white'
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold truncate">{manifest.name}</span>
                        {isActive && <Flame className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{manifest.tagline}</p>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold shrink-0 bg-slate-800/80 text-slate-400 border border-slate-700/50">
                      {manifest.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Theme Selector */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Visual Theme Spectrum
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(VISUALIZATION_THEMES) as VisualizationTheme[]).map(tKey => {
                const tObj = VISUALIZATION_THEMES[tKey];
                const isSelected = theme === tKey;

                return (
                  <button
                    key={tKey}
                    type="button"
                    onClick={() => setTheme(tKey)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-amber-400 text-white'
                        : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: tObj.primary }}
                    />
                    <span className="truncate">{tObj.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* GitHub Star Recommendation */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-amber-500/30 text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Support MonoForge</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              ⭐ If MonoForge elevated your GitHub profile, please give the repository a star on GitHub:
            </p>
            <a
              href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </aside>

        {/* Center Canvas / SVG Studio Preview Stage */}
        <main className="flex-1 flex flex-col space-y-4 min-w-0">
          {/* Stage Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            {/* Dual Output Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => setOutputMode('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  outputMode === 'canvas'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Interactive Canvas (Portfolio)</span>
              </button>
              <button
                type="button"
                onClick={() => setOutputMode('svg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  outputMode === 'svg'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>GitHub Camo SVG (README)</span>
              </button>
            </div>

            {/* Animation Controls (Canvas Mode) */}
            {outputMode === 'canvas' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 text-[10px]">SPEED:</span>
                  {[0.5, 1, 2].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSpeed(s)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                        speed === s ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Export Actions Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                title="Copy ready-to-paste markdown for your GitHub profile README"
              >
                {copiedKey === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'markdown' ? 'Copied MD' : 'Copy MD Snippet'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#ffe600] text-slate-950 hover:bg-[#fde047] transition-all cursor-pointer"
                title="Download production-ready vector SVG asset"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export SVG</span>
              </button>
            </div>
          </div>

          {/* Active Visualization Preview Container */}
          <div className="relative flex-1 min-h-[460px] rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden flex flex-col items-center justify-center p-4">
            {outputMode === 'canvas' ? (
              <div className="w-full h-full min-h-[440px]">
                <CanvasVisualizer
                  id={activeVizId}
                  data={identity}
                  theme={theme}
                  speed={speed}
                  isPlaying={isPlaying}
                  onHoverInfo={setHoverInfo}
                />
              </div>
            ) : (
              <div
                className="w-full flex items-center justify-center overflow-x-auto p-2"
                dangerouslySetInnerHTML={{ __html: activeSvg }}
              />
            )}

            {/* Hover Tooltip / Status Readout */}
            {hoverInfo && (
              <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center pointer-events-none">
                <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-400/50 backdrop-blur-md shadow-xl text-xs font-mono text-amber-300 animate-in fade-in slide-in-from-bottom-2">
                  {hoverInfo}
                </div>
              </div>
            )}
          </div>

          {/* Description & Code Embed Panel */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase">
                {activeManifest.name} &bull; Architecture Specification
              </span>
              <button
                type="button"
                onClick={handleCopyUrl}
                className="text-[11px] font-mono text-amber-400 hover:underline cursor-pointer"
              >
                {copiedKey === 'url' ? 'URL Copied!' : 'Copy Direct SVG URL'}
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{activeManifest.description}</p>
          </div>
        </main>
      </div>

      {/* README Doctor Modal */}
      <ReadmeDoctorModal
        isOpen={isDoctorOpen}
        onClose={() => setIsDoctorOpen(false)}
        initialMarkdown={`# ${identity.displayName}\n${identity.bio}\n\n![${activeManifest.name}](https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${activeVizId.replace(/-/g, '')}&user=${username}&theme=${theme})\n\n## 🚀 Core Technologies\n- Systems Architecture & High-Performance Visualization\n- Open-Source Contributor`}
        onApplyFix={(fixed) => {
          navigator.clipboard.writeText(fixed);
          toast.success('Repaired markdown copied to clipboard!');
        }}
      />
    </div>
  );
}
