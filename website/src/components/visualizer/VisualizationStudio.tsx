'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '#/i18n/navigation';
import {
  VisualizationId,
  VisualizationTheme,
  OutputMode,
} from '#/lib/visualizations/types';
import { VISUALIZATION_REGISTRY, ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { VISUALIZATION_THEMES } from '#/lib/visualizations/themes';
import {
  buildSyntheticDeveloperIdentity,
  buildUnavailableDeveloperIdentity,
  fetchNormalizedDeveloperIdentity,
  isValidGitHubUsername,
  NormalizedDeveloperIdentityWithProvenance,
} from '#/lib/visualizations/data-engine';
import { PreviewDataStatus } from '#/lib/github/profile-preview';
import { generateUniversalVisualizationSvg } from '#/lib/visualizations/svg-generators';
import { copyToClipboard, downloadTextFile } from '#/lib/export/clipboard';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeMarkdownRenderer } from '#/components/common/ReadmeMarkdownRenderer';
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
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Info,
  Share2,
  FileText,
  ImageDown,
  PlusCircle,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';

type StudioPreviewMode = OutputMode | 'readme';

const FEATURED_ARCHETYPES: Array<{
  label: string;
  id: VisualizationId;
  theme: VisualizationTheme;
}> = [
  { label: 'Coding Pulse', id: 'coding-pulse', theme: 'slate' },
  { label: 'Year Clock', id: 'year-clock', theme: 'cyberpunk' },
  { label: 'Developer Terminal', id: 'developer-terminal', theme: 'matrix' },
  { label: 'Tech Solar System', id: 'tech-stack-solar-system', theme: 'cyberpunk' },
  { label: 'Language River', id: 'language-river', theme: 'ocean' },
  { label: 'Engineering Radar', id: 'engineering-radar', theme: 'emerald' },
  { label: 'Release Timeline', id: 'release-timeline', theme: 'amber' },
  { label: 'Commit City', id: 'commit-city', theme: 'emerald' },
  { label: 'Repository Galaxy', id: 'repository-galaxy', theme: 'cyberpunk' },
];

const STATUS_BADGE_MAP: Record<
  PreviewDataStatus,
  { label: string; badgeClass: string; bannerClass: string }
> = {
  sample: {
    label: 'Sample data',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    bannerClass: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
  },
  fetching: {
    label: 'Fetching GitHub data',
    badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
    bannerClass: 'bg-sky-500/10 border-sky-500/30 text-sky-200',
  },
  live: {
    label: 'Live GitHub data',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    bannerClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
  },
  partial: {
    label: 'Partial data available',
    badgeClass: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40',
    bannerClass: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200',
  },
  rate_limited: {
    label: 'Rate limited',
    badgeClass: 'bg-orange-500/15 text-orange-300 border-orange-500/40',
    bannerClass: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
  },
  unavailable: {
    label: 'GitHub data unavailable',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    bannerClass: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
  },
  invalid_username: {
    label: 'Invalid GitHub username',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    bannerClass: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
  },
};

function resolveStatusFromIdentity(
  data: NormalizedDeveloperIdentityWithProvenance
): { status: PreviewDataStatus; message: string } {
  if (data.source === 'sample') {
    return {
      status: 'sample',
      message: 'SAMPLE DATA — Connect a GitHub username to view real activity',
    };
  }
  if (data.rateLimited && data.source === 'unavailable') {
    return {
      status: 'rate_limited',
      message: `Rate limited while fetching GitHub data for @${data.username}.`,
    };
  }
  if (data.source === 'unavailable') {
    return {
      status: 'unavailable',
      message: data.error || `GitHub data unavailable for @${data.username}.`,
    };
  }
  if (data.source === 'partial') {
    const missing = data.missingFields?.length ? ` (${data.missingFields.join(', ')} unavailable)` : '';
    return {
      status: 'partial',
      message: `Partial GitHub data available for @${data.username}${missing}.`,
    };
  }
  if (data.isRealData && data.source === 'github') {
    return {
      status: 'live',
      message: `Live GitHub data loaded for @${data.username} (${data.totalContributions} contributions).`,
    };
  }
  return {
    status: 'unavailable',
    message: `GitHub data unavailable for @${data.username}.`,
  };
}

export function VisualizationStudio() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addSection = useReadmeStore((s) => s.addSection);
  const setStoreGithub = useReadmeStore((s) => s.setGithub);
  const storeGithub = useReadmeStore((s) => s.config.settings.user.github);

  const [username, setUsername] = useState('octocat');
  const [inputUsername, setInputUsername] = useState('octocat');
  const [activeVizId, setActiveVizId] = useState<VisualizationId>('commit-city');
  const [theme, setTheme] = useState<VisualizationTheme>('emerald');
  const [outputMode, setOutputMode] = useState<StudioPreviewMode>('canvas');
  const [speed, setSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDoctorOpen, setIsDoctorOpen] = useState<boolean>(false);
  const [svgLoadError, setSvgLoadError] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vizSearchQuery, setVizSearchQuery] = useState<string>('');

  // Identity & provenance state (honest default: octocat sample)
  const [identity, setIdentity] = useState<NormalizedDeveloperIdentityWithProvenance>(() =>
    buildSyntheticDeveloperIdentity('octocat')
  );
  const [dataStatus, setDataStatus] = useState<PreviewDataStatus>('sample');
  const [statusMessage, setStatusMessage] = useState<string>(
    'SAMPLE DATA — Connect a GitHub username to view real activity'
  );

  const fetchSeqRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasHydratedUrlRef = useRef<boolean>(false);

  const totalVisualizations = ALL_VISUALIZATION_IDS.length;
  const featuredCount = FEATURED_ARCHETYPES.length;

  const filteredVizIds = useMemo(() => {
    return ALL_VISUALIZATION_IDS.filter((vizId) => {
      const manifest = VISUALIZATION_REGISTRY[vizId];
      if (!manifest) return false;
      const matchesCat = selectedCategory === 'all' || manifest.category === selectedCategory;
      if (!matchesCat) return false;
      if (!vizSearchQuery.trim()) return true;
      const q = vizSearchQuery.toLowerCase();
      return (
        manifest.name.toLowerCase().includes(q) ||
        manifest.tagline.toLowerCase().includes(q) ||
        manifest.badge.toLowerCase().includes(q) ||
        manifest.description.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, vizSearchQuery]);

  const executeFetchUser = useCallback(async (rawUsername: string) => {
    const clean = rawUsername.trim();

    abortControllerRef.current?.abort();
    const requestId = ++fetchSeqRef.current;

    if (!clean) {
      setUsername('octocat');
      setInputUsername('octocat');
      setIdentity(buildSyntheticDeveloperIdentity('octocat'));
      setDataStatus('sample');
      setStatusMessage('SAMPLE DATA — Connect a GitHub username to view real activity');
      setHoverInfo(null);
      return;
    }

    if (!isValidGitHubUsername(clean)) {
      setUsername(clean);
      setIdentity(
        buildUnavailableDeveloperIdentity(clean, {
          error: 'Invalid GitHub username format',
          missingFields: ['username'],
        })
      );
      setDataStatus('invalid_username');
      setStatusMessage('Invalid GitHub username. Use 1-39 alphanumeric characters or single hyphens.');
      setHoverInfo(null);
      toast.error('Invalid GitHub username format.');
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setUsername(clean);
    setIdentity(buildUnavailableDeveloperIdentity(clean));
    setDataStatus('fetching');
    setStatusMessage(`Fetching live GitHub telemetry for @${clean}...`);
    setHoverInfo(null);
    setIsLoading(true);

    try {
      const data = await fetchNormalizedDeveloperIdentity(clean, {
        signal: controller.signal,
      });

      if (requestId !== fetchSeqRef.current) return;

      setIdentity(data);
      const resolved = resolveStatusFromIdentity(data);
      setDataStatus(resolved.status);
      setStatusMessage(resolved.message);

      if (resolved.status === 'live') {
        toast.success(resolved.message);
      } else if (resolved.status === 'partial') {
        toast.warning(resolved.message);
      } else {
        toast.error(resolved.message);
      }
    } catch {
      if (requestId !== fetchSeqRef.current) return;
      setIdentity(buildUnavailableDeveloperIdentity(clean, { error: 'GitHub telemetry request failed' }));
      setDataStatus('unavailable');
      setStatusMessage(`GitHub data unavailable for @${clean}.`);
      toast.error('Failed to contact GitHub telemetry API.');
    } finally {
      if (requestId === fetchSeqRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleFetchUser = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await executeFetchUser(inputUsername);
  };

  // Deep-Link URL Hydration on mount
  useEffect(() => {
    if (hasHydratedUrlRef.current) return;
    hasHydratedUrlRef.current = true;

    const paramUser = searchParams.get('user')?.trim() ?? '';
    const paramViz = searchParams.get('viz')?.trim() ?? '';
    const paramTheme = searchParams.get('theme')?.trim() ?? '';

    if (paramViz && paramViz in VISUALIZATION_REGISTRY) {
      setActiveVizId(paramViz as VisualizationId);
    }
    if (paramTheme && paramTheme in VISUALIZATION_THEMES) {
      setTheme(paramTheme as VisualizationTheme);
    }
    if (paramUser) {
      setInputUsername(paramUser);
      if (paramUser.toLowerCase() !== 'octocat') {
        void executeFetchUser(paramUser);
      }
    }
  }, [searchParams, executeFetchUser]);

  // Sync URL query params without triggering navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const safeUser = isValidGitHubUsername(username) ? username : 'octocat';
    const nextUrl = `${window.location.pathname}?user=${encodeURIComponent(safeUser)}&viz=${encodeURIComponent(
      activeVizId
    )}&theme=${encodeURIComponent(theme)}`;
    try {
      window.history.replaceState(null, '', nextUrl);
    } catch {
      // Ignore history errors in restricted test environments
    }
  }, [username, activeVizId, theme]);

  const activeManifest = VISUALIZATION_REGISTRY[activeVizId];

  const activeSvg = useMemo(() => {
    return generateUniversalVisualizationSvg(activeVizId, identity, { theme });
  }, [activeVizId, identity, theme]);

  const svgQuerySuffix = useMemo(() => {
    const pluginParam = activeVizId.replace(/-/g, '');
    const safeUser = isValidGitHubUsername(username) ? username : 'octocat';
    const modeQuery =
      dataStatus === 'sample'
        ? '&mode=sample'
        : safeUser.toLowerCase() === 'octocat' && (dataStatus === 'live' || dataStatus === 'partial')
        ? '&mode=live'
        : '';
    return `?plugin=${pluginParam}&user=${encodeURIComponent(safeUser)}&theme=${theme}${modeQuery}`;
  }, [activeVizId, username, theme, dataStatus]);

  const localSvgEndpoint = `/api/telemetry/svg${svgQuerySuffix}`;
  const embedUrl = `https://monoforge-studio.vercel.app/api/telemetry/svg${svgQuerySuffix}`;

  useEffect(() => {
    setSvgLoadError(false);
  }, [localSvgEndpoint]);

  const shareUrl = useMemo(() => {
    const safeUser = isValidGitHubUsername(username) ? username : 'octocat';
    const origin =
      typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null'
        ? window.location.origin
        : 'https://monoforge-studio.vercel.app';
    return `${origin}/en/visualizer?user=${encodeURIComponent(safeUser)}&viz=${encodeURIComponent(
      activeVizId
    )}&theme=${encodeURIComponent(theme)}`;
  }, [username, activeVizId, theme]);

  const readmeSnippet = useMemo(() => {
    const safeUser = isValidGitHubUsername(username) ? username : 'octocat';
    return [
      `### ${activeManifest.name} — @${safeUser}`,
      '',
      `[![${activeManifest.name}](${embedUrl})](https://github.com/yuvraj-thakur-exe/MONOFORGE)`,
      '',
      `> *${activeManifest.tagline}*`,
    ].join('\n');
  }, [activeManifest.name, activeManifest.tagline, embedUrl, username]);

  const markCopied = (key: string) => {
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyMarkdown = async () => {
    const md = `[![${activeManifest.name}](${embedUrl})](https://github.com/yuvraj-thakur-exe/MONOFORGE)`;
    const result = await copyToClipboard(md);
    if (result.ok) {
      markCopied('markdown');
      toast.success('GitHub README Markdown snippet copied to clipboard!');
    } else {
      toast.error(result.error || 'Failed to copy Markdown snippet to clipboard.');
    }
  };

  const handleCopyProjectReadme = async () => {
    const projectMd = `<div align="center">\n  <a href="https://github.com/yuvraj-thakur-exe/MONOFORGE">\n    <img src="${embedUrl}" alt="${activeManifest.name}" width="100%" />\n  </a>\n</div>`;
    const result = await copyToClipboard(projectMd);
    if (result.ok) {
      markCopied('project-readme');
      toast.success('Project README HTML/Markdown block copied!');
    } else {
      toast.error(result.error || 'Failed to copy Project README snippet.');
    }
  };

  const handleCopyUrl = async () => {
    const result = await copyToClipboard(embedUrl);
    if (result.ok) {
      markCopied('url');
      toast.success('Direct Camo-safe SVG endpoint URL copied!');
    } else {
      toast.error(result.error || 'Failed to copy SVG endpoint URL.');
    }
  };

  const handleCopyShareLink = async () => {
    const result = await copyToClipboard(shareUrl);
    if (result.ok) {
      markCopied('share');
      toast.success('Visualizer deep-link copied to clipboard!');
    } else {
      toast.error(result.error || 'Failed to copy share link.');
    }
  };

  const handleDownloadSvg = () => {
    const safeUser = isValidGitHubUsername(username) ? username : 'sample';
    const filename = `monoforge-${activeVizId}-${safeUser}-${theme}.svg`;
    const result = downloadTextFile(filename, activeSvg, 'image/svg+xml;charset=utf-8');
    if (result.ok) {
      toast.success(`Downloaded ${filename}`);
    } else {
      toast.error(result.error || 'Failed to download SVG.');
    }
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || outputMode !== 'canvas') {
      toast.info('Switch to Interactive Canvas mode to export a PNG snapshot.');
      return;
    }
    const safeUser = isValidGitHubUsername(username) ? username : 'sample';
    const filename = `monoforge-${activeVizId}-${safeUser}-${theme}.png`;

    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error('Failed to encode canvas PNG.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // Ignore cleanup errors
        }
      }, 1000);
      toast.success(`Downloaded ${filename}`);
    }, 'image/png');
  };

  const handleAddToProfileIde = () => {
    const safeUser = isValidGitHubUsername(username) ? username : '';
    if (safeUser && safeUser.toLowerCase() !== 'octocat' && !storeGithub) {
      setStoreGithub(safeUser);
    }
    addSection('telemetry-engine', {
      username: safeUser,
      template: theme === 'matrix' ? 'terminal' : 'classic',
      outputMode: 'direct_svg',
      isocalendar: true,
      languages: true,
      habits: true,
      achievements: true,
    });
    toast.success(`Added ${activeManifest.name} telemetry to Profile IDE.`);
    router.push('/developer');
  };

  const statusMeta = STATUS_BADGE_MAP[dataStatus];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans overflow-x-hidden">
      {/* Studio Header Bar */}
      <header className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold font-mono text-white tracking-wide truncate">
                MONOFORGE 3.0 // VISUALIZATION STUDIO
              </h1>
              <span
                data-testid="studio-data-status-badge"
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 ${statusMeta.badgeClass}`}
              >
                {dataStatus === 'fetching' && <Loader2 className="w-3 h-3 animate-spin" />}
                {dataStatus === 'live' && <CheckCircle2 className="w-3 h-3" />}
                {(dataStatus === 'sample' || dataStatus === 'partial') && <Info className="w-3 h-3" />}
                {(dataStatus === 'unavailable' ||
                  dataStatus === 'rate_limited' ||
                  dataStatus === 'invalid_username') && <AlertTriangle className="w-3 h-3" />}
                <span>{statusMeta.label}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden md:block">
              {featuredCount} Featured &bull; {totalVisualizations} Total 60fps Visualizations
            </p>
          </div>
        </div>

        {/* GitHub User Search Bar & Quick Actions */}
        <form onSubmit={handleFetchUser} className="flex flex-wrap items-center gap-2 max-w-full">
          <div className="relative">
            <span className="absolute left-3 top-2 text-xs font-mono font-bold text-slate-500">@</span>
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              placeholder="github-username"
              aria-label="GitHub username"
              className="pl-7 pr-3 py-1.5 w-32 sm:w-44 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#ffe600] text-slate-950 hover:bg-[#fde047] active:scale-95 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Syncing...' : 'Sync'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
            title="Copy deep-link URL to this exact visualization, user, and theme"
          >
            {copiedKey === 'share' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{copiedKey === 'share' ? 'Link Copied' : 'Copy Share Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddToProfileIde}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer"
            title="Insert this telemetry visualization into Profile IDE"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Add to Profile IDE</span>
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
        {/* Left Sidebar: Registry Visualizations Selector */}
        <aside className="w-full lg:w-80 shrink-0 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Showing {filteredVizIds.length} / {totalVisualizations}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${statusMeta.badgeClass}`}
              >
                {statusMeta.label}
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-none">
              {[
                { id: 'all', label: `All (${totalVisualizations})` },
                { id: 'activity', label: 'Activity' },
                { id: 'repository', label: 'Repos' },
                { id: 'skills', label: 'Skills' },
                { id: 'identity', label: 'Identity' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Real-time Search Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                value={vizSearchQuery}
                onChange={(e) => setVizSearchQuery(e.target.value)}
                placeholder={`Filter ${totalVisualizations} visualizations...`}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Visualization Item List */}
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredVizIds.map((vizId) => {
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
              {filteredVizIds.length === 0 && (
                <div className="p-4 text-center text-xs font-mono text-slate-500">
                  No visualizations match &quot;{vizSearchQuery}&quot;
                </div>
              )}
            </div>
          </div>

          {/* Color Theme Selector */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Visual Theme Spectrum
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(VISUALIZATION_THEMES) as VisualizationTheme[]).map((tKey) => {
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
              If MonoForge elevated your GitHub profile, please give the repository a star on GitHub:
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
          {/* Honest Provenance Status Banner */}
          <div
            data-testid="studio-status-banner"
            className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border text-xs font-mono ${statusMeta.bannerClass}`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {dataStatus === 'live' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : dataStatus === 'fetching' ? (
                <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              )}
              <span className="truncate font-semibold">{statusMessage}</span>
            </div>
            <span className="shrink-0 text-[10px] uppercase tracking-wider opacity-80">
              @{identity.username || username}
            </span>
          </div>

          {/* Featured Archetype Quick Pills */}
          <div className="flex items-center gap-2 overflow-x-auto p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 scrollbar-none text-[11px] font-mono">
            <span className="text-slate-500 font-bold shrink-0 text-[10px] uppercase tracking-wider pl-1">
              FEATURED ({featuredCount}):
            </span>
            {FEATURED_ARCHETYPES.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => {
                  setActiveVizId(pill.id);
                  setTheme(pill.theme);
                  setHoverInfo(null);
                }}
                className={`px-2.5 py-1 rounded-xl border text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  activeVizId === pill.id
                    ? 'bg-amber-400/10 border-amber-400/80 text-amber-300 shadow-xs'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Stage Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            {/* Triple Output Mode Switcher */}
            <div
              role="tablist"
              aria-label="Preview mode"
              className="flex flex-wrap items-center p-1 rounded-xl bg-slate-950 border border-slate-800 max-w-full"
            >
              <button
                type="button"
                role="tab"
                aria-selected={outputMode === 'canvas'}
                onClick={() => setOutputMode('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  outputMode === 'canvas'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Interactive Canvas</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={outputMode === 'svg'}
                onClick={() => setOutputMode('svg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  outputMode === 'svg'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Live SVG Embed</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={outputMode === 'readme'}
                onClick={() => setOutputMode('readme')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  outputMode === 'readme'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>README Preview</span>
              </button>
            </div>

            {/* Animation Controls (Canvas Mode) */}
            {outputMode === 'canvas' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 text-[10px]">SPEED:</span>
                  {[0.5, 1, 2].map((s) => (
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
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                title="Copy ready-to-paste markdown for your GitHub profile README"
              >
                {copiedKey === 'markdown' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'markdown' ? 'Copied MD' : 'Copy Markdown'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyProjectReadme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                title="Copy centered HTML/Markdown snippet for a Project README"
              >
                {copiedKey === 'project-readme' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <FileText className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'project-readme' ? 'Copied Project Snippet' : 'Copy for Project README'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#ffe600] text-slate-950 hover:bg-[#fde047] transition-all cursor-pointer"
                title="Download production-ready vector SVG asset"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPng}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all cursor-pointer"
                title="Download PNG snapshot from Interactive Canvas"
              >
                <ImageDown className="w-3.5 h-3.5" />
                <span>Download PNG</span>
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
                  canvasRef={canvasRef}
                />
              </div>
            ) : outputMode === 'svg' ? (
              <div className="w-full flex flex-col items-center justify-center gap-3 overflow-x-auto p-2">
                {!svgLoadError ? (
                  <img
                    src={localSvgEndpoint}
                    alt={`${activeManifest.name} Live SVG Embed`}
                    onError={() => setSvgLoadError(true)}
                    className="max-w-full h-auto rounded-xl border border-slate-800 shadow-lg"
                  />
                ) : (
                  <div
                    data-testid="svg-fallback-preview"
                    className="w-full flex items-center justify-center overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: activeSvg }}
                  />
                )}
              </div>
            ) : (
              <div
                data-testid="readme-preview-container"
                className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-xl bg-[#0d1117] border border-slate-800 overflow-x-auto"
              >
                <ReadmeMarkdownRenderer markdown={readmeSnippet} theme="dark" />
              </div>
            )}

            {/* Hover Tooltip / Status Readout */}
            {hoverInfo && outputMode === 'canvas' && (
              <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center pointer-events-none">
                <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-400/50 backdrop-blur-md shadow-xl text-xs font-mono text-amber-300 animate-in fade-in slide-in-from-bottom-2">
                  {hoverInfo}
                </div>
              </div>
            )}
          </div>

          {/* Description & Code Embed Panel */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                {activeManifest.name} &bull; Architecture Specification
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="text-[11px] font-mono text-amber-400 hover:underline cursor-pointer"
                >
                  {copiedKey === 'url' ? 'SVG URL Copied!' : 'Copy SVG URL'}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{activeManifest.description}</p>
            <div className="pt-1 text-[11px] font-mono text-slate-500 truncate" title={embedUrl}>
              {embedUrl}
            </div>
          </div>
        </main>
      </div>

      {/* README Doctor Modal */}
      <ReadmeDoctorModal
        isOpen={isDoctorOpen}
        onClose={() => setIsDoctorOpen(false)}
        initialMarkdown={`# ${identity.displayName}\n${identity.bio}\n\n![${activeManifest.name}](${embedUrl})\n\n## Core Technologies\n- Systems Architecture & High-Performance Visualization\n- Open-Source Contributor`}
        onApplyFix={async (fixed) => {
          const result = await copyToClipboard(fixed);
          if (result.ok) {
            toast.success('Repaired markdown copied to clipboard!');
          } else {
            toast.error(result.error || 'Failed to copy repaired markdown.');
          }
        }}
      />
    </div>
  );
}
