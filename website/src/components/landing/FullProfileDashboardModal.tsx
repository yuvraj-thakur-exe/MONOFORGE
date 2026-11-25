'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  FileText,
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  Copy,
  Check,
  Download,
  Sparkles,
  Share2,
  Layers,
  RefreshCw,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { TemplateItem } from '#/lib/templates/catalog';
import { ReadmeConfig } from '#/lib/plugins/types';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { getPluginById } from '#/lib/plugins/registry';
import { useReadmeStore } from '#/store/useReadmeStore';
import { TemplateReadmePreview } from '#/components/landing/TemplateReadmePreview';
import { copyToClipboard, downloadTextFile } from '#/lib/export/clipboard';
import { fetchGitHubPreviewProfile, type PreviewDataStatus } from '#/lib/github/profile-preview';
import { playClickSound, playTone } from '#/lib/sound/sound-effects';

interface FullProfileDashboardModalProps {
  template: TemplateItem;
  config: ReadmeConfig;
  isOpen: boolean;
  onClose: () => void;
  onApply: (template: TemplateItem, activeConfig?: ReadmeConfig) => void;
  onShare?: (template: TemplateItem) => void;
}

export const FullProfileDashboardModal: React.FC<FullProfileDashboardModalProps> = ({
  template,
  config,
  isOpen,
  onClose,
  onApply,
  onShare,
}) => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  // Active configuration for preview (isolated local state, never directly mutates store)
  const [activeConfig, setActiveConfig] = useState<ReadmeConfig>(() =>
    JSON.parse(JSON.stringify(config))
  );

  const [viewTab, setViewTab] = useState<'rendered' | 'raw' | 'plugins' | 'prompt'>('rendered');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
    config.settings.theme === 'light' ? 'light' : 'dark'
  );

  // Live GitHub Account Preview Bar state
  const [usernameInput, setUsernameInput] = useState<string>(
    config.settings.user.github || ''
  );
  const [previewStatus, setPreviewStatus] = useState<PreviewDataStatus>('sample');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [statusDetail, setStatusDetail] = useState<string | null>(null);

  // Feedback states
  const [copiedMd, setCopiedMd] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [appliedFeedback, setAppliedFeedback] = useState<boolean>(false);

  // Reset local state when props change
  useEffect(() => {
    setActiveConfig(JSON.parse(JSON.stringify(config)));
    setUsernameInput(config.settings.user.github || '');
    setPreviewStatus('sample');
    setStatusDetail(null);
  }, [config, template]);

  const accent = template.accent || activeConfig.settings.accentColor || '#f59e0b';

  // Generated pure markdown
  const rawMarkdown = useMemo(() => {
    try {
      return buildMarkdown(activeConfig);
    } catch {
      return '# Error rendering Markdown';
    }
  }, [activeConfig]);

  // Sync GitHub user profile info for preview only
  const handleSyncGitHub = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const handle = usernameInput.trim();
    if (!handle) {
      setPreviewStatus('invalid_username' as PreviewDataStatus);
      setStatusDetail('Please enter a valid GitHub username.');
      return;
    }

    setIsSyncing(true);
    setPreviewStatus('fetching' as PreviewDataStatus);
    setStatusDetail(`Connecting to GitHub API for @${handle}...`);
    playTone(900, 'sine', 0.05, 0.02);

    try {
      const res = await fetchGitHubPreviewProfile(handle);
      setPreviewStatus(res.status);
      if (res.statusMessage) {
        setStatusDetail(res.statusMessage);
      } else {
        setStatusDetail(null);
      }

      if (typeof res.applyToConfig === 'function') {
        setActiveConfig(res.applyToConfig(activeConfig));
      } else if ((res as any).config) {
        setActiveConfig((res as any).config);
      } else if ((res as any).user) {
        setActiveConfig(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            user: {
              ...prev.settings.user,
              ...(res as any).user,
              github: handle,
            },
          },
        }));
      }
    } catch {
      setPreviewStatus('unavailable' as PreviewDataStatus);
      setStatusDetail('Could not complete live preview fetch. Using fallback data.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetProfile = () => {
    playClickSound();
    setActiveConfig(JSON.parse(JSON.stringify(config)));
    setUsernameInput(config.settings.user.github || '');
    setPreviewStatus('sample');
    setStatusDetail(null);
  };

  const handleCopyMarkdown = async () => {
    playClickSound();
    const res = await copyToClipboard(rawMarkdown);
    if (res.ok) {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    }
  };

  const handleDownload = () => {
    playClickSound();
    const filename = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-README.md`;
    downloadTextFile(filename, rawMarkdown);
  };

  const handleCopyPrompt = async () => {
    playClickSound();
    const res = await copyToClipboard(template.prompt);
    if (res.ok) {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleToggleSection = (sectionId: string) => {
    playClickSound();
    setActiveConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id === sectionId) {
          const currentlyVisible = s.visible !== false;
          return { ...s, visible: !currentlyVisible };
        }
        return s;
      }),
    }));
  };

  const handleApplyToEditor = () => {
    playClickSound();
    setEntireConfig(activeConfig);
    setAppliedFeedback(true);
    onApply(template, activeConfig);
    setTimeout(() => {
      setAppliedFeedback(false);
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  const isDark = themeMode === 'dark';
  const containerBg = isDark ? 'bg-[#0f172a] text-[#f8fafc]' : 'bg-[#fafbfc] text-[#0f172a]';
  const cardBg = isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200';

  // Status badge color, label, and icon
  const getStatusBadge = () => {
    const s = String(previewStatus).toLowerCase().replace(/\s+/g, '_');
    switch (s) {
      case 'live':
      case 'live_github_data':
        return {
          label: 'Live GitHub data',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'partial':
      case 'partial_data_available':
        return {
          label: 'Partial data available',
          bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          dot: 'bg-sky-400',
        };
      case 'fetching':
      case 'fetching_github_information':
        return {
          label: 'Fetching GitHub information',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400 animate-ping',
        };
      case 'rate_limited':
        return {
          label: 'Rate limited',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'invalid_username':
        return {
          label: 'Invalid username',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400',
        };
      case 'unavailable':
      case 'github_data_unavailable':
        return {
          label: 'GitHub data unavailable',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400',
        };
      case 'sample':
      case 'sample_profile':
      default:
        return {
          label: 'Sample profile',
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          dot: 'bg-slate-400',
        };
    }
  };

  const statusBadge = getStatusBadge();

  // Classify plugin data sources
  const classifyDataSource = (type: string): 'static' | 'dynamic' | 'unavailable' => {
    const dynamicTypes = [
      'github-readme-stats',
      'activity-graph',
      'pie-chart',
      'waka-readme-stats',
      'portfolio-contributions',
      'telemetry-isocalendar',
      'telemetry-engine',
      'snk',
      'visitor-counter',
      'github-profile-trophy',
      'github-achievements',
    ];
    if (dynamicTypes.includes(type)) {
      const s = String(previewStatus).toLowerCase();
      if (s.includes('unavailable')) return 'unavailable';
      return 'dynamic';
    }
    return 'static';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${template.name} README Studio`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="flex flex-col w-full max-w-[1600px] h-[94vh] rounded-3xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f172a] shadow-2xl">
        {/* Top Control Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/90 text-xs font-mono">
          {/* Left: Template info */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full border border-slate-900/20"
              style={{ backgroundColor: accent }}
            />
            <span className="font-black text-slate-900 dark:text-white text-sm sm:text-base tracking-tight uppercase font-sans">
              {template.name}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#ffe600] text-slate-950 border border-slate-900 text-[10px] font-black uppercase shadow-2xs">
              {template.category}
            </span>
            {template.difficulty && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-[10px] font-bold capitalize">
                {template.difficulty}
              </span>
            )}
          </div>

          {/* Center: Tabs & Viewport Toggles */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-300 dark:border-slate-800 shadow-xs max-w-full overflow-x-auto">
            {/* View Mode Tabs */}
            <button
              type="button"
              onClick={() => {
                setViewTab('rendered');
                playClickSound();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewTab === 'rendered'
                  ? 'bg-[#ffe600] text-slate-950 border border-slate-900 font-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Rendered README</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewTab('raw');
                playClickSound();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewTab === 'raw'
                  ? 'bg-[#ffe600] text-slate-950 border border-slate-900 font-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Raw Markdown</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewTab('plugins');
                playClickSound();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewTab === 'plugins'
                  ? 'bg-[#ffe600] text-slate-950 border border-slate-900 font-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Plugin Info ({activeConfig.sections.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewTab('prompt');
                playClickSound();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewTab === 'prompt'
                  ? 'bg-[#ffe600] text-slate-950 border border-slate-900 font-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Prompt</span>
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Viewport Width Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  device === 'desktop'
                    ? 'bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Desktop Viewport"
                aria-label="Desktop Viewport"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  device === 'tablet'
                    ? 'bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tablet Viewport"
                aria-label="Tablet Viewport"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  device === 'mobile'
                    ? 'bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Mobile Viewport"
                aria-label="Mobile Viewport"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              title="Toggle theme preview"
              aria-label="Toggle theme preview"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
              )}
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold cursor-pointer transition-colors"
              title="Copy Rendered Markdown"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedMd ? 'COPIED' : 'COPY MD'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold cursor-pointer transition-colors"
              title="Download README.md"
            >
              <Download className="w-3.5 h-3.5 text-amber-500" />
              <span>EXPORT</span>
            </button>

            {onShare && (
              <button
                type="button"
                onClick={() => onShare(template)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold cursor-pointer transition-colors"
                title="Copy share link to this archetype"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>SHARE</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleApplyToEditor}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-black text-xs font-mono cursor-pointer border border-slate-950 shadow-2xs transition-transform active:scale-95"
            >
              {appliedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>APPLIED!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>APPLY TEMPLATE</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close README studio modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Live GitHub Profile Sync Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 sm:px-6 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
          <form onSubmit={handleSyncGitHub} className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-1 max-w-xl w-full">
            <span className="text-slate-500 font-bold uppercase text-[11px] shrink-0">
              GitHub Preview Handle:
            </span>
            <div className="relative flex-1">
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Enter username (e.g. torvalds)..."
                className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:outline-hidden focus:border-amber-400"
              />
              {usernameInput && (
                <button
                  type="button"
                  onClick={() => setUsernameInput('')}
                  className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Fetching...' : 'Sync'}</span>
            </button>

            {previewStatus !== 'sample' && (
              <button
                type="button"
                onClick={handleResetProfile}
                className="px-2 py-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 underline text-[11px] cursor-pointer"
              >
                Reset
              </button>
            )}
          </form>

          {/* Honest Status Label */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${statusBadge.bg}`}>
              <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
              <span>{statusBadge.label}</span>
            </span>
            {statusDetail && (
              <span className="text-[11px] text-slate-500 max-w-xs truncate" title={statusDetail}>
                {statusDetail}
              </span>
            )}
          </div>
        </div>

        {/* Main Canvas Scroll Area */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-8 ${containerBg}`}>
          <div
            className={`transition-all duration-300 ${
              device === 'mobile'
                ? 'max-w-[420px] mx-auto'
                : device === 'tablet'
                ? 'max-w-[768px] mx-auto'
                : 'w-full max-w-5xl mx-auto'
            }`}
          >
            {/* TAB: Rendered README Preview */}
            {viewTab === 'rendered' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span>
                    Rendering <b>{template.name}</b> in <b>{device}</b> view ({isDark ? 'Dark' : 'Light'} theme)
                  </span>
                  <span className="text-emerald-500 font-bold">100% Camo Safe Vector README</span>
                </div>

                <div className={`rounded-2xl border ${cardBg} p-4 sm:p-8 shadow-inner overflow-hidden`}>
                  <TemplateReadmePreview
                    config={activeConfig}
                    templateName={template.name}
                    mode="full"
                    device={device}
                    theme={themeMode}
                  />
                </div>
              </div>
            )}

            {/* TAB: Raw Markdown */}
            {viewTab === 'raw' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span>
                    Generated Pure Markdown &bull; <b>{rawMarkdown.length}</b> characters &bull; <b>{rawMarkdown.split('\n').length}</b> lines
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1 text-amber-500 font-bold hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedMd ? 'Copied to Clipboard' : 'Copy Full Markdown'}</span>
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-900 text-slate-100 p-5 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                  <pre className="whitespace-pre-wrap select-text">{rawMarkdown}</pre>
                </div>
              </div>
            )}

            {/* TAB: Plugin Info & Data Source Classification */}
            {viewTab === 'plugins' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span>
                    Active Plugin Architecture &bull; <b>{activeConfig.sections.length}</b> configured components
                  </span>
                  <span className="text-slate-400">
                    {activeConfig.sections.filter(s => s.visible !== false).length} Enabled
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  {activeConfig.sections.map((section, idx) => {
                    const pluginDef = getPluginById(section.type);
                    const isEnabled = section.visible !== false;
                    const dataSource = classifyDataSource(section.type);

                    return (
                      <div
                        key={section.id || idx}
                        className={`p-4 rounded-xl border transition-all ${
                          isEnabled
                            ? cardBg
                            : 'bg-slate-100 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {pluginDef?.name || section.title || section.type}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {section.type}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleSection(section.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer transition-colors ${
                              isEnabled
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {isEnabled ? 'Enabled' : 'Disabled'}
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                          {pluginDef?.description || 'Custom configured profile section.'}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px]">
                          <span className="text-slate-500">
                            Category: <b className="text-slate-700 dark:text-slate-300">{pluginDef?.category || 'general'}</b>
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded font-bold border ${
                              dataSource === 'dynamic'
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                                : dataSource === 'unavailable'
                                ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                                : 'bg-slate-500/10 text-slate-500 border-slate-500/30'
                            }`}
                          >
                            {dataSource === 'dynamic'
                              ? 'Dynamic Telemetry'
                              : dataSource === 'unavailable'
                              ? 'Telemetry Unavailable'
                              : 'Static Content'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: Master AI Prompt */}
            {viewTab === 'prompt' && (
              <div className="space-y-6 animate-in fade-in py-2">
                <div className={`p-6 sm:p-8 rounded-2xl border ${cardBg} space-y-4`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <span className="font-mono text-xs uppercase tracking-wider text-amber-500 font-bold">
                          AI Generation Master Prompt
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 font-sans">
                        {template.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                        {template.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-black text-sm cursor-pointer shadow-md transition-transform active:scale-95"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                          <span>COPIED TO CLIPBOARD</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                          <span>COPY MASTER PROMPT</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                      Archetype: <b className="text-slate-900 dark:text-white">{template.name}</b>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                      Category: <b className="text-slate-900 dark:text-white">{template.category}</b>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                      Accent: <b style={{ color: accent }}>{accent}</b>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                      Length: <b className="text-slate-900 dark:text-white">{template.prompt?.length || 0} characters</b>
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800 text-xs font-mono">
                    <span className="text-slate-400">master-prompt.md &bull; Ready for Claude / GPT-4o / Antigravity</span>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-6 font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed select-text overflow-x-auto max-h-[50vh]">
                    {template.prompt}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero fabricated statistics &bull; Real GitHub README preview studio &bull; Camo-safe</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleApplyToEditor}
              className="px-5 py-1.5 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-black border border-slate-950 shadow-2xs cursor-pointer"
            >
              Apply to Workspace
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
