'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Boxes,
  Check,
  Code2,
  Columns,
  Copy,
  Cpu,
  Download,
  Eye,
  FileCode2,
  FilePlus2,
  FileText,
  GitBranch,
  Github,
  KeyRound,
  ListChecks,
  Monitor,
  Moon,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  Terminal,
  Trash2,
} from 'lucide-react';
import { ReadmeMarkdownRenderer } from '#/components/common/ReadmeMarkdownRenderer';
import { copyToClipboard, downloadTextFile } from '#/lib/export/clipboard';
import type {
  AnalysisSource,
  EcosystemType,
  ProjectBadge,
  ProjectStudioCategory,
  ProjectTemplateType,
  TechStackItem,
} from '#/lib/project-readme/types';
import { useProjectReadmeStore } from '#/store/useProjectReadmeStore';

const TEMPLATE_PRESETS: { id: ProjectTemplateType; label: string; desc: string }[] = [
  { id: 'developer-tool', label: 'Developer Tool', desc: 'Monaco, AST, split-screen live preview' },
  { id: 'saas', label: 'SaaS Platform', desc: 'Enterprise microservices & architecture' },
  { id: 'oss-library', label: 'OSS Library', desc: 'Zero-deps, typed API & micro-benchmarks' },
  { id: 'cli-tool', label: 'CLI Binary', desc: 'Cross-platform terminal tool & commands' },
  { id: 'ai-ml', label: 'AI / LLM Agent', desc: 'Reasoning loops, memory graphs & sandbox' },
  { id: 'fullstack-web', label: 'Full-Stack Web', desc: 'App Router, PostgreSQL, Tailwind & auth' },
];

const EDITOR_TABS: { id: ProjectStudioCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'meta', label: 'Meta', icon: <FileCode2 className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'badges', label: 'Badges', icon: <Boxes className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'features', label: 'Features', icon: <Sparkles className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'architecture', label: 'Architecture', icon: <GitBranch className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'stack', label: 'Stack', icon: <Cpu className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'install', label: 'Install', icon: <Terminal className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'env', label: 'Env Vars', icon: <KeyRound className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'roadmap', label: 'Roadmap', icon: <ListChecks className="w-3.5 h-3.5 shrink-0" /> },
  { id: 'sections', label: 'Sections', icon: <FilePlus2 className="w-3.5 h-3.5 shrink-0" /> },
];

const ARCHITECTURE_PRESETS: { id: string; label: string; mermaid: string }[] = [
  {
    id: 'fullstack',
    label: 'Full-Stack App',
    mermaid: `flowchart LR
  Client([Browser / Next.js UI]) --> Edge[Edge Middleware & Auth]
  Edge --> API[API Route Handlers]
  API --> Cache[(Redis / Edge Cache)]
  API --> DB[(PostgreSQL Database)]`,
  },
  {
    id: 'ai-agent',
    label: 'AI Agent Pipeline',
    mermaid: `flowchart TD
  Input([User Prompt & Context]) --> Planner[Reasoning & Tool Router]
  Planner --> Memory[(Vector Memory Store)]
  Planner --> Tools[Sandboxed Tool Executors]
  Tools --> Verifier[Schema & Safety Verifier]
  Verifier --> Output([Structured Response])`,
  },
  {
    id: 'cli-binary',
    label: 'CLI Binary',
    mermaid: `flowchart LR
  Args([CLI Args & Flags]) --> Parser[Command Parser]
  Parser --> Config[Config & Env Loader]
  Config --> Runner[Core Execution Engine]
  Runner --> Stdout([Formatted Terminal Output])`,
  },
  {
    id: 'microservices',
    label: 'Microservices',
    mermaid: `flowchart TD
  Gateway[API Gateway] --> AuthSvc[Auth Service]
  Gateway --> CoreSvc[Core Domain Service]
  CoreSvc --> Queue[[Event Bus / Queue]]
  Queue --> Worker[Async Telemetry Worker]
  CoreSvc & Worker --> Store[(Primary Data Store)]`,
  },
];

const STACK_CATEGORIES: TechStackItem['category'][] = [
  'Core',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'AI/ML',
  'Testing',
];

const BADGE_STYLES: ProjectBadge['style'][] = [
  'for-the-badge',
  'flat-square',
  'flat',
  'plastic',
];

function getAnalysisStatusMeta(source: AnalysisSource | undefined) {
  switch (source) {
    case 'github':
      return {
        label: 'Live GitHub Repo',
        badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
        bannerClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
        dotClass: 'bg-emerald-400',
        icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      };
    case 'partial':
      return {
        label: 'Partial GitHub Data',
        badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
        bannerClass: 'bg-sky-500/10 border-sky-500/30 text-sky-200',
        dotClass: 'bg-sky-400',
        icon: <AlertTriangle className="w-3.5 h-3.5 text-sky-400 shrink-0" />,
      };
    case 'heuristic':
      return {
        label: 'Heuristic Analysis',
        badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
        bannerClass: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
        dotClass: 'bg-amber-400',
        icon: <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      };
    case 'rate_limited':
      return {
        label: 'Rate Limited',
        badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
        bannerClass: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
        dotClass: 'bg-amber-400',
        icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      };
    case 'not_found':
      return {
        label: 'Not Found',
        badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
        bannerClass: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
        dotClass: 'bg-rose-400',
        icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
      };
    case 'error':
      return {
        label: 'Inspection Error',
        badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
        bannerClass: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
        dotClass: 'bg-rose-400',
        icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
      };
    case 'default':
    default:
      return {
        label: 'Template Preset',
        badgeClass: 'bg-slate-700/60 text-slate-200 border-slate-600',
        bannerClass: 'bg-slate-800/70 border-slate-700 text-slate-300',
        dotClass: 'bg-slate-400',
        icon: <FileCode2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />,
      };
  }
}

export const ProjectReadmeStudio: React.FC = () => {
  const {
    config,
    viewMode,
    activeCategory,
    isAnalyzing,
    analysisSource,
    analysisMessage,
    rawMarkdownOverride,
    setViewMode,
    setActiveCategory,
    updateConfig,
    loadTemplate,
    analyzeRepository,
    toggleBadge,
    addBadge,
    removeBadge,
    addFeature,
    removeFeature,
    updateArchitecture,
    addTechStack,
    removeTechStack,
    addInstallStep,
    removeInstallStep,
    addEnvVariable,
    removeEnvVariable,
    addRoadmapItem,
    toggleRoadmapItem,
    removeRoadmapItem,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    setRawMarkdownOverride,
    getCompiledMarkdown,
    resetToDefault,
  } = useProjectReadmeStore();

  const [repoInput, setRepoInput] = useState(
    config.repositoryUrl || 'https://github.com/yuvraj-thakur-exe/MONOFORGE'
  );
  const [previewTab, setPreviewTab] = useState<'rendered' | 'raw'>('rendered');
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [copied, setCopied] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<{
    kind: 'success' | 'error';
    text: string;
  } | null>(null);

  // Local form states
  const [newBadgeLabel, setNewBadgeLabel] = useState('');
  const [newBadgeText, setNewBadgeText] = useState('');
  const [newBadgeColor, setNewBadgeColor] = useState('f59e0b');
  const [newBadgeStyle, setNewBadgeStyle] = useState<ProjectBadge['style']>('for-the-badge');
  const [newBadgeLink, setNewBadgeLink] = useState('');

  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureDesc, setNewFeatureDesc] = useState('');

  const [newTechName, setNewTechName] = useState('');
  const [newTechCategory, setNewTechCategory] = useState<TechStackItem['category']>('Core');

  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepCommand, setNewStepCommand] = useState('');
  const [newStepComment, setNewStepComment] = useState('');

  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvDesc, setNewEnvDesc] = useState('');
  const [newEnvRequired, setNewEnvRequired] = useState(true);
  const [newEnvDefault, setNewEnvDefault] = useState('');

  const [newRoadmapTask, setNewRoadmapTask] = useState('');

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');

  useEffect(() => {
    setRepoInput(config.repositoryUrl || '');
  }, [config.repositoryUrl]);

  useEffect(() => {
    if (!feedbackToast) return;
    const timer = setTimeout(() => setFeedbackToast(null), 3200);
    return () => clearTimeout(timer);
  }, [feedbackToast]);

  const compiledMarkdown = useMemo(
    () => getCompiledMarkdown(),
    [config, rawMarkdownOverride, getCompiledMarkdown]
  );

  const showToast = (kind: 'success' | 'error', text: string) => {
    setFeedbackToast({ kind, text });
  };

  const handleCopy = async () => {
    const result = await copyToClipboard(compiledMarkdown);
    if (result.ok) {
      setCopied(true);
      showToast('success', 'Copied GFM README.md to clipboard.');
      setTimeout(() => setCopied(false), 2000);
    } else {
      showToast('error', result.error || 'Failed to copy README markdown.');
    }
  };

  const handleDownload = () => {
    const result = downloadTextFile('README.md', compiledMarkdown, 'text/markdown;charset=utf-8');
    if (result.ok) {
      showToast('success', 'Downloaded README.md.');
    } else {
      showToast('error', result.error || 'Failed to export README.md.');
    }
  };

  const handleReset = () => {
    resetToDefault();
    showToast('success', 'Restored default Project README configuration.');
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoInput.trim()) {
      showToast('error', 'Enter a GitHub repository URL or owner/repo.');
      return;
    }
    await analyzeRepository(repoInput);
  };

  const statusMeta = getAnalysisStatusMeta(analysisSource);
  const lineCount = compiledMarkdown.split('\n').length;

  const viewportContainerClass =
    deviceViewport === 'mobile'
      ? 'w-full max-w-[375px] mx-auto'
      : deviceViewport === 'tablet'
      ? 'w-full max-w-[768px] mx-auto'
      : 'w-full max-w-4xl mx-auto';

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] text-slate-100 min-h-[calc(100vh-3.5rem)] overflow-x-hidden">
      {/* Top Studio Control Bar */}
      <header className="border-b border-slate-800 bg-[#1e293b]/95 backdrop-blur-md px-3 sm:px-6 py-3">
        <div className="max-w-[1720px] mx-auto space-y-2.5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Left: Studio Identity & URL Ingestion */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 min-w-0">
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-md bg-[#ffe600] text-[#0f172a] font-mono text-xs font-black tracking-wider uppercase">
                  Project Mode
                </span>
                <h1 className="text-base font-bold text-white tracking-tight font-mono">
                  README STUDIO
                </h1>
              </div>

              {/* Ingestion Input */}
              <form
                onSubmit={handleAnalyze}
                className="flex items-center gap-1.5 w-full sm:w-auto sm:flex-1 sm:min-w-[260px] max-w-[460px] min-w-0"
              >
                <div className="relative flex-1 min-w-0">
                  <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    aria-label="GitHub repository URL"
                    value={repoInput}
                    onChange={(e) => setRepoInput(e.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 font-mono focus:outline-hidden focus:border-amber-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 rounded-lg bg-[#ffe600] hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 text-[#0f172a] text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>INSPECTING</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>INSPECT</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: View Modes & Output Actions */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 min-w-0">
              {/* View Mode Toggle */}
              <div
                className="flex items-center bg-[#0f172a] rounded-lg p-0.5 border border-slate-700"
                role="group"
                aria-label="Studio Layout Mode"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                    viewMode === 'split'
                      ? 'bg-slate-800 text-amber-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Split View (Editor + Live Preview)"
                  aria-label="Split View"
                >
                  <Columns className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('editor')}
                  className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                    viewMode === 'editor'
                      ? 'bg-slate-800 text-amber-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Structured Inspector"
                  aria-label="Editor View"
                >
                  <Code2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                    viewMode === 'preview'
                      ? 'bg-slate-800 text-amber-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Full Preview"
                  aria-label="Preview View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-[#0f172a] hover:bg-slate-800 text-slate-200 font-mono text-xs font-medium transition-colors cursor-pointer shadow-xs"
                title="Reset configuration to default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-medium transition-colors cursor-pointer shadow-xs"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{copied ? 'COPIED' : 'COPY GFM'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/50 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 font-mono text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>EXPORT .MD</span>
              </button>
            </div>
          </div>

          {/* Second Row: Responsive Template Preset Bar (All Screen Sizes) + Repository Inspection Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            <div
              className="flex items-center gap-1.5 overflow-x-auto pb-0.5 max-w-full"
              role="group"
              aria-label="Project Template Presets"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
                Presets:
              </span>
              {TEMPLATE_PRESETS.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => loadTemplate(tpl.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    config.template === tpl.id
                      ? 'bg-[#ffe600] text-[#0f172a] font-bold shadow-xs'
                      : 'bg-[#0f172a] border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                  title={tpl.desc}
                >
                  {tpl.label}
                </button>
              ))}
            </div>

            {/* Honest Repository Inspection Status Badge & Message */}
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span
                data-testid="inspection-status-badge"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-mono font-semibold shrink-0 ${statusMeta.badgeClass}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusMeta.dotClass}`} />
                {statusMeta.icon}
                <span>{statusMeta.label}</span>
              </span>
              {analysisMessage && (
                <span
                  data-testid="inspection-status-message"
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md border truncate max-w-full sm:max-w-[380px] ${statusMeta.bannerClass}`}
                  title={analysisMessage}
                >
                  {analysisMessage}
                </span>
              )}
            </div>
          </div>

          {feedbackToast && (
            <div
              role="status"
              aria-live="polite"
              data-testid="studio-feedback-toast"
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between gap-2 ${
                feedbackToast.kind === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
              }`}
            >
              <span>{feedbackToast.text}</span>
              <button
                type="button"
                onClick={() => setFeedbackToast(null)}
                className="text-[11px] underline opacity-80 hover:opacity-100 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="flex-1 max-w-[1720px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 min-w-0">
        {/* LEFT PANE: Structured Inspector */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <aside
            className={`border-b lg:border-b-0 lg:border-r border-slate-800 bg-[#1e293b]/40 flex flex-col min-w-0 ${
              viewMode === 'editor' ? 'lg:col-span-12' : 'lg:col-span-5'
            }`}
          >
            {/* 9-Tab Category Navigation */}
            <div
              role="tablist"
              aria-label="Project README Editor Categories"
              className="flex items-center gap-1 p-2.5 border-b border-slate-800 bg-[#0f172a]/75 overflow-x-auto text-xs font-mono"
            >
              {EDITOR_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === tab.id
                      ? 'bg-[#ffe600] text-[#0f172a] font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Category Content Panels */}
            <div className="p-4 sm:p-5 space-y-5 flex-1 overflow-y-auto min-w-0">
              {/* 1. META TAB */}
              {activeCategory === 'meta' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Repository Identity
                    </h2>
                    <span className="text-[10px] font-mono text-amber-400">
                      Pillar 1 • Project README
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="project-name-input"
                      className="block text-xs font-mono text-slate-300 mb-1"
                    >
                      Project Name
                    </label>
                    <input
                      id="project-name-input"
                      type="text"
                      value={config.name}
                      onChange={(e) => updateConfig({ name: e.target.value })}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project-tagline-input"
                      className="block text-xs font-mono text-slate-300 mb-1"
                    >
                      Tagline / Headline
                    </label>
                    <input
                      id="project-tagline-input"
                      type="text"
                      value={config.tagline}
                      onChange={(e) => updateConfig({ tagline: e.target.value })}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project-description-input"
                      className="block text-xs font-mono text-slate-300 mb-1"
                    >
                      Overview Description
                    </label>
                    <textarea
                      id="project-description-input"
                      rows={3}
                      value={config.description}
                      onChange={(e) => updateConfig({ description: e.target.value })}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="project-logo-input"
                        className="block text-xs font-mono text-slate-300 mb-1"
                      >
                        Logo URL
                      </label>
                      <input
                        id="project-logo-input"
                        type="text"
                        value={config.logoUrl || ''}
                        onChange={(e) => updateConfig({ logoUrl: e.target.value })}
                        placeholder="https://.../logo.svg"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="project-repo-input"
                        className="block text-xs font-mono text-slate-300 mb-1"
                      >
                        Repository URL
                      </label>
                      <input
                        id="project-repo-input"
                        type="text"
                        value={config.repositoryUrl}
                        onChange={(e) => updateConfig({ repositoryUrl: e.target.value })}
                        placeholder="https://github.com/owner/repo"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="project-license-input"
                        className="block text-xs font-mono text-slate-300 mb-1"
                      >
                        License
                      </label>
                      <input
                        id="project-license-input"
                        type="text"
                        value={config.license}
                        onChange={(e) => updateConfig({ license: e.target.value })}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="project-ecosystem-select"
                        className="block text-xs font-mono text-slate-300 mb-1"
                      >
                        Ecosystem
                      </label>
                      <select
                        id="project-ecosystem-select"
                        value={config.ecosystem}
                        onChange={(e) =>
                          updateConfig({ ecosystem: e.target.value as EcosystemType })
                        }
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      >
                        <option value="node">Node / TypeScript</option>
                        <option value="python">Python</option>
                        <option value="rust">Rust</option>
                        <option value="go">Go (Golang)</option>
                        <option value="docker">Docker / Container</option>
                        <option value="general">Multi-Language</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="project-demo-input"
                      className="block text-xs font-mono text-slate-300 mb-1"
                    >
                      Live Demo URL
                    </label>
                    <input
                      id="project-demo-input"
                      type="text"
                      value={config.liveDemoUrl || ''}
                      onChange={(e) => updateConfig({ liveDemoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  {/* Section Visibility Toggles */}
                  <div className="pt-2 border-t border-slate-800 space-y-2.5">
                    <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      README Section Toggles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        {
                          key: 'showBadges',
                          label: 'Badges',
                          checked: config.showBadges,
                          onChange: (checked: boolean) => updateConfig({ showBadges: checked }),
                        },
                        {
                          key: 'showArchitecture',
                          label: 'Architecture',
                          checked: config.showArchitecture,
                          onChange: (checked: boolean) =>
                            updateConfig({ showArchitecture: checked }),
                        },
                        {
                          key: 'showRoadmap',
                          label: 'Roadmap',
                          checked: config.showRoadmap,
                          onChange: (checked: boolean) => updateConfig({ showRoadmap: checked }),
                        },
                        {
                          key: 'showEnvVariables',
                          label: 'Env Vars',
                          checked: config.showEnvVariables,
                          onChange: (checked: boolean) =>
                            updateConfig({ showEnvVariables: checked }),
                        },
                        {
                          key: 'showContributing',
                          label: 'Contributing',
                          checked: config.showContributing,
                          onChange: (checked: boolean) =>
                            updateConfig({ showContributing: checked }),
                        },
                        {
                          key: 'showLicense',
                          label: 'License',
                          checked: config.showLicense,
                          onChange: (checked: boolean) => updateConfig({ showLicense: checked }),
                        },
                        {
                          key: 'showToc',
                          label: 'Table of Contents',
                          checked: Boolean(config.showToc),
                          onChange: (checked: boolean) => updateConfig({ showToc: checked }),
                        },
                        {
                          key: 'includeAttribution',
                          label: 'MonoForge Attribution',
                          checked: config.includeAttribution !== false,
                          onChange: (checked: boolean) =>
                            updateConfig({ includeAttribution: checked }),
                        },
                      ].map((toggle) => (
                        <label
                          key={toggle.key}
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-800 bg-[#0f172a]/70 text-xs font-mono text-slate-200 cursor-pointer hover:border-slate-700"
                        >
                          <span>{toggle.label}</span>
                          <input
                            type="checkbox"
                            checked={toggle.checked}
                            onChange={(e) => toggle.onChange(e.target.checked)}
                            className="rounded border-slate-600 bg-[#0f172a] text-amber-400 focus:ring-0"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. BADGES TAB */}
              {activeCategory === 'badges' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Shields.io Badges
                    </h2>
                    <span className="text-[10px] font-mono text-emerald-400">
                      GitHub Camo Compatible
                    </span>
                  </div>

                  <div className="space-y-2">
                    {config.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border transition-all ${
                          badge.enabled
                            ? 'bg-slate-800/80 border-amber-400/50 text-white'
                            : 'bg-[#0f172a]/70 border-slate-800 text-slate-400 opacity-75'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleBadge(badge.id)}
                          className="flex items-center gap-2.5 flex-1 text-left min-w-0 cursor-pointer"
                          aria-label={`Toggle ${badge.label} badge`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              badge.enabled ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                            }`}
                          >
                            {badge.enabled && (
                              <Check className="w-2.5 h-2.5 text-[#0f172a] stroke-[3]" />
                            )}
                          </div>
                          <span className="font-mono text-xs font-bold truncate">
                            {badge.label}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#0f172a] border border-slate-700 text-slate-300 truncate">
                            {badge.text}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBadge(badge.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer shrink-0"
                          aria-label={`Remove ${badge.label} badge`}
                          title="Remove badge"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Custom Badge Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-700 bg-[#0f172a]/50 space-y-2.5">
                    <span className="font-mono text-xs text-slate-300 block font-bold">
                      Add Custom Badge
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        aria-label="Badge label"
                        placeholder="Label (e.g., Coverage)"
                        value={newBadgeLabel}
                        onChange={(e) => setNewBadgeLabel(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      />
                      <input
                        type="text"
                        aria-label="Badge text"
                        placeholder="Text (e.g., 98%)"
                        value={newBadgeText}
                        onChange={(e) => setNewBadgeText(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        aria-label="Badge color"
                        placeholder="Color (e.g., 10b981 or green)"
                        value={newBadgeColor}
                        onChange={(e) => setNewBadgeColor(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      />
                      <select
                        aria-label="Badge style"
                        value={newBadgeStyle}
                        onChange={(e) =>
                          setNewBadgeStyle(e.target.value as ProjectBadge['style'])
                        }
                        className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      >
                        {BADGE_STYLES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      aria-label="Badge link URL"
                      placeholder="Optional link URL (https://...)"
                      value={newBadgeLink}
                      onChange={(e) => setNewBadgeLink(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newBadgeLabel.trim() || !newBadgeText.trim()) return;
                        addBadge({
                          label: newBadgeLabel.trim(),
                          text: newBadgeText.trim(),
                          color: newBadgeColor.trim() || 'f59e0b',
                          style: newBadgeStyle,
                          link: newBadgeLink.trim() || undefined,
                          enabled: true,
                        });
                        setNewBadgeLabel('');
                        setNewBadgeText('');
                        setNewBadgeLink('');
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Badge</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 3. FEATURES TAB */}
              {activeCategory === 'features' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Core Feature Cards
                    </h2>
                    <span className="text-[10px] font-mono text-slate-400">
                      {config.features.length} configured
                    </span>
                  </div>

                  <div className="space-y-2">
                    {config.features.map((feat) => (
                      <div
                        key={feat.id}
                        className="p-3 rounded-lg border border-slate-800 bg-[#0f172a]/70 space-y-1 relative"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">
                            {feat.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFeature(feat.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            aria-label={`Remove feature ${feat.title}`}
                            title="Remove feature"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-300">{feat.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Feature Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-700 bg-[#0f172a]/50 space-y-2">
                    <span className="font-mono text-xs text-slate-300 block font-bold">
                      Add New Feature
                    </span>
                    <input
                      type="text"
                      aria-label="Feature title"
                      placeholder="Feature Title (e.g., Live AST Parser)"
                      value={newFeatureTitle}
                      onChange={(e) => setNewFeatureTitle(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <textarea
                      aria-label="Feature description"
                      placeholder="Concise description of the capability..."
                      rows={2}
                      value={newFeatureDesc}
                      onChange={(e) => setNewFeatureDesc(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeatureTitle.trim() && newFeatureDesc.trim()) {
                          addFeature({
                            title: newFeatureTitle.trim(),
                            description: newFeatureDesc.trim(),
                          });
                          setNewFeatureTitle('');
                          setNewFeatureDesc('');
                        }
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Append Feature</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. ARCHITECTURE (MERMAID) TAB */}
              {activeCategory === 'architecture' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Mermaid System Diagram
                    </h2>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-200">
                      <input
                        type="checkbox"
                        checked={config.showArchitecture}
                        onChange={(e) => updateConfig({ showArchitecture: e.target.checked })}
                        className="rounded border-slate-600 bg-[#0f172a] text-amber-400 focus:ring-0"
                      />
                      <span>Include in README</span>
                    </label>
                  </div>

                  <p className="text-xs text-slate-400">
                    Renders natively on GitHub using GitHub&apos;s built-in Mermaid diagram block.
                  </p>

                  {/* Quick Architecture Presets */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-mono font-semibold text-slate-300">
                      Quick Diagram Presets
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ARCHITECTURE_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => updateArchitecture(preset.mermaid)}
                          className="px-2.5 py-1 rounded-md border border-slate-700 bg-[#0f172a] hover:border-amber-400/70 hover:text-amber-300 text-[11px] font-mono text-slate-200 transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={10}
                    aria-label="Mermaid diagram definition"
                    value={config.architectureMermaid}
                    onChange={(e) => updateArchitecture(e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-xs text-emerald-300 font-mono leading-relaxed focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              )}

              {/* 5. TECH STACK TAB */}
              {activeCategory === 'stack' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Ecosystem &amp; Tech Stack
                    </h2>
                    <span className="text-[10px] font-mono text-slate-400">
                      {config.techStack.length} technologies
                    </span>
                  </div>

                  <div className="space-y-2">
                    {config.techStack.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-800 bg-[#0f172a]/70"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="font-mono text-xs font-bold text-white truncate">
                            {tech.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 uppercase">
                            {tech.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeTechStack(tech.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            aria-label={`Remove tech ${tech.name}`}
                            title="Remove technology"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Tech Stack Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-700 bg-[#0f172a]/50 space-y-2">
                    <span className="font-mono text-xs text-slate-300 block font-bold">
                      Add Technology
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        aria-label="Technology name"
                        placeholder="Name (e.g., PostgreSQL 16)"
                        value={newTechName}
                        onChange={(e) => setNewTechName(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      />
                      <select
                        aria-label="Technology category"
                        value={newTechCategory}
                        onChange={(e) =>
                          setNewTechCategory(e.target.value as TechStackItem['category'])
                        }
                        className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      >
                        {STACK_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newTechName.trim()) return;
                        addTechStack({ name: newTechName.trim(), category: newTechCategory });
                        setNewTechName('');
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Tech Stack Item</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 6. INSTALL & COMMANDS TAB */}
              {activeCategory === 'install' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Terminal Quickstart &amp; Steps
                    </h2>
                    <span className="text-[10px] font-mono text-slate-400">
                      {config.installSteps.length} steps
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="quickstart-command-input"
                      className="block text-xs font-mono text-slate-300 mb-1"
                    >
                      Quickstart One-Liner
                    </label>
                    <input
                      id="quickstart-command-input"
                      type="text"
                      value={config.quickStartCommand}
                      onChange={(e) => updateConfig({ quickStartCommand: e.target.value })}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-300 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="block text-xs font-mono text-slate-300">
                      Installation Sequence
                    </span>
                    {config.installSteps.map((step, idx) => (
                      <div
                        key={step.id}
                        className="p-2.5 rounded-lg border border-slate-800 bg-[#0f172a]/70 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-slate-100">
                            {idx + 1}. {step.step}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeInstallStep(step.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            aria-label={`Remove step ${step.step}`}
                            title="Remove step"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {step.comment && (
                          <p className="text-[11px] font-mono text-slate-400">{step.comment}</p>
                        )}
                        <code className="block text-[11px] font-mono text-emerald-300 bg-slate-900 px-2 py-1 rounded overflow-x-auto">
                          {step.command}
                        </code>
                      </div>
                    ))}
                  </div>

                  {/* Add Install Step Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-700 bg-[#0f172a]/50 space-y-2">
                    <span className="font-mono text-xs text-slate-300 block font-bold">
                      Add Installation Step
                    </span>
                    <input
                      type="text"
                      aria-label="Step title"
                      placeholder="Step Title (e.g., Run Database Migrations)"
                      value={newStepTitle}
                      onChange={(e) => setNewStepTitle(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <input
                      type="text"
                      aria-label="Step command"
                      placeholder="Command (e.g., pnpm db:migrate)"
                      value={newStepCommand}
                      onChange={(e) => setNewStepCommand(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-emerald-300 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <input
                      type="text"
                      aria-label="Step comment"
                      placeholder="Optional comment / note"
                      value={newStepComment}
                      onChange={(e) => setNewStepComment(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newStepTitle.trim() || !newStepCommand.trim()) return;
                        addInstallStep({
                          step: newStepTitle.trim(),
                          command: newStepCommand.trim(),
                          comment: newStepComment.trim() || undefined,
                        });
                        setNewStepTitle('');
                        setNewStepCommand('');
                        setNewStepComment('');
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Install Step</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 7. ENV VARS TAB */}
              {activeCategory === 'env' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Environment Variables
                    </h2>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-200">
                      <input
                        type="checkbox"
                        checked={config.showEnvVariables}
                        onChange={(e) => updateConfig({ showEnvVariables: e.target.checked })}
                        className="rounded border-slate-600 bg-[#0f172a] text-amber-400 focus:ring-0"
                      />
                      <span>Include Env Variables</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    {config.envVariables.map((env) => (
                      <div
                        key={env.id}
                        className="p-2.5 rounded-lg border border-slate-800 bg-[#0f172a]/70 space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <code className="text-xs font-mono font-bold text-amber-300 truncate">
                              {env.key}
                            </code>
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                                env.required
                                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                            >
                              {env.required ? 'Required' : 'Optional'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeEnvVariable(env.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            aria-label={`Remove env ${env.key}`}
                            title="Remove environment variable"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-300">{env.description}</p>
                        {env.defaultValue && (
                          <div className="text-[11px] font-mono text-slate-400">
                            Default: <code className="text-emerald-300">{env.defaultValue}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Env Variable Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-700 bg-[#0f172a]/50 space-y-2">
                    <span className="font-mono text-xs text-slate-300 block font-bold">
                      Add Environment Variable
                    </span>
                    <input
                      type="text"
                      aria-label="Env variable key"
                      placeholder="Key (e.g., DATABASE_URL)"
                      value={newEnvKey}
                      onChange={(e) => setNewEnvKey(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-amber-300 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <input
                      type="text"
                      aria-label="Env variable description"
                      placeholder="Description (e.g., PostgreSQL connection string)"
                      value={newEnvDesc}
                      onChange={(e) => setNewEnvDesc(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                      <input
                        type="text"
                        aria-label="Env default value"
                        placeholder="Default value (optional)"
                        value={newEnvDefault}
                        onChange={(e) => setNewEnvDefault(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                      />
                      <label className="flex items-center gap-2 text-xs font-mono text-slate-200 cursor-pointer px-1">
                        <input
                          type="checkbox"
                          checked={newEnvRequired}
                          onChange={(e) => setNewEnvRequired(e.target.checked)}
                          className="rounded border-slate-600 bg-[#0f172a] text-amber-400 focus:ring-0"
                        />
                        <span>Required variable</span>
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newEnvKey.trim() || !newEnvDesc.trim()) return;
                        addEnvVariable({
                          key: newEnvKey.trim(),
                          description: newEnvDesc.trim(),
                          required: newEnvRequired,
                          defaultValue: newEnvDefault.trim() || undefined,
                        });
                        setNewEnvKey('');
                        setNewEnvDesc('');
                        setNewEnvDefault('');
                        setNewEnvRequired(true);
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Env Variable</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 8. ROADMAP TAB */}
              {activeCategory === 'roadmap' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Development Roadmap
                    </h2>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-200">
                      <input
                        type="checkbox"
                        checked={config.showRoadmap}
                        onChange={(e) => updateConfig({ showRoadmap: e.target.checked })}
                        className="rounded border-slate-600 bg-[#0f172a] text-amber-400 focus:ring-0"
                      />
                      <span>Include Roadmap</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    {config.roadmap.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-800 bg-[#0f172a]/70"
                      >
                        <label className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleRoadmapItem(item.id)}
                            aria-label={`Toggle roadmap item ${item.task}`}
                            className="rounded border-slate-600 bg-[#0f172a] text-emerald-400 focus:ring-0"
                          />
                          <span
                            className={`text-xs font-mono truncate ${
                              item.done ? 'line-through text-slate-400' : 'text-slate-100'
                            }`}
                          >
                            {item.task}
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => removeRoadmapItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer shrink-0"
                          aria-label={`Remove roadmap item ${item.task}`}
                          title="Remove roadmap item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Roadmap Item Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-700 bg-[#0f172a]/50 space-y-2">
                    <span className="font-mono text-xs text-slate-300 block font-bold">
                      Add Roadmap Milestone
                    </span>
                    <input
                      type="text"
                      aria-label="Roadmap milestone task"
                      placeholder="Milestone (e.g., Release v2.0 Plugin SDK)"
                      value={newRoadmapTask}
                      onChange={(e) => setNewRoadmapTask(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newRoadmapTask.trim()) return;
                        addRoadmapItem(newRoadmapTask.trim());
                        setNewRoadmapTask('');
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Milestone</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 9. CUSTOM SECTIONS TAB */}
              {activeCategory === 'sections' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Custom Markdown Sections
                    </h2>
                    <span className="text-[10px] font-mono text-slate-400">
                      {config.customSections.length} sections
                    </span>
                  </div>

                  <div className="space-y-3">
                    {config.customSections.map((sec) => (
                      <div
                        key={sec.id}
                        className="p-3 rounded-lg border border-slate-800 bg-[#0f172a]/70 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            aria-label={`Custom section title ${sec.title}`}
                            value={sec.title}
                            onChange={(e) =>
                              updateCustomSection(sec.id, { title: e.target.value })
                            }
                            className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-amber-300 font-mono font-bold focus:outline-hidden focus:border-amber-400"
                          />
                          <button
                            type="button"
                            onClick={() => removeCustomSection(sec.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer shrink-0"
                            aria-label={`Remove section ${sec.title}`}
                            title="Remove section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          aria-label={`Custom section content ${sec.title}`}
                          value={sec.content}
                          onChange={(e) =>
                            updateCustomSection(sec.id, { content: e.target.value })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Custom Section Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-700 bg-[#0f172a]/50 space-y-2">
                    <span className="font-mono text-xs text-slate-300 block font-bold">
                      Add Custom Section
                    </span>
                    <input
                      type="text"
                      aria-label="New section title"
                      placeholder="Section Title (e.g., Benchmarks)"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <textarea
                      rows={3}
                      aria-label="New section content"
                      placeholder="Markdown content (tables, code blocks, callouts)..."
                      value={newSectionContent}
                      onChange={(e) => setNewSectionContent(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newSectionTitle.trim() || !newSectionContent.trim()) return;
                        addCustomSection({
                          title: newSectionTitle.trim(),
                          content: newSectionContent.trim(),
                        });
                        setNewSectionTitle('');
                        setNewSectionContent('');
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Custom Section</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* RIGHT PANE: Real GFM Rendered Preview + Raw Markdown Editor */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <main
            className={`flex flex-col bg-[#0f172a] min-w-0 ${
              viewMode === 'preview' ? 'lg:col-span-12' : 'lg:col-span-7'
            }`}
          >
            {/* Preview Toolbar: Rendered README vs Raw Markdown + Viewport + Theme */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 border-b border-slate-800 bg-[#1e293b]/60 text-[11px] font-mono">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                {/* Preview Sub-Tabs */}
                <div
                  role="tablist"
                  aria-label="Preview Output Tabs"
                  className="flex items-center bg-[#0f172a] rounded-lg p-0.5 border border-slate-700"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={previewTab === 'rendered'}
                    onClick={() => setPreviewTab('rendered')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                      previewTab === 'rendered'
                        ? 'bg-[#ffe600] text-[#0f172a]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Rendered README</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={previewTab === 'raw'}
                    onClick={() => setPreviewTab('raw')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                      previewTab === 'raw'
                        ? 'bg-[#ffe600] text-[#0f172a]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Raw Markdown</span>
                  </button>
                </div>

                {/* Viewport Switcher & Theme Toggle */}
                {previewTab === 'rendered' && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className="flex items-center bg-[#0f172a] rounded-lg p-0.5 border border-slate-700"
                      role="group"
                      aria-label="Preview Viewport Width"
                    >
                      <button
                        type="button"
                        onClick={() => setDeviceViewport('desktop')}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          deviceViewport === 'desktop'
                            ? 'bg-slate-800 text-amber-400'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="Desktop Viewport"
                        aria-label="Desktop Viewport"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeviceViewport('tablet')}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          deviceViewport === 'tablet'
                            ? 'bg-slate-800 text-amber-400'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="Tablet Viewport (768px)"
                        aria-label="Tablet Viewport"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeviceViewport('mobile')}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          deviceViewport === 'mobile'
                            ? 'bg-slate-800 text-amber-400'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="Mobile Viewport (375px)"
                        aria-label="Mobile Viewport"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setPreviewTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
                      }
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-200 hover:border-slate-500 transition-colors cursor-pointer"
                      aria-label={`Switch preview to ${previewTheme === 'dark' ? 'light' : 'dark'} theme`}
                      title="Toggle Preview Theme"
                    >
                      {previewTheme === 'dark' ? (
                        <>
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                          <span className="hidden sm:inline">Light</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5 text-sky-400" />
                          <span className="hidden sm:inline">Dark</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-slate-400">
                {rawMarkdownOverride !== null && (
                  <button
                    type="button"
                    onClick={() => setRawMarkdownOverride(null)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md border border-amber-400/50 bg-amber-400/15 text-amber-300 hover:bg-amber-400/25 font-bold cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Structured</span>
                  </button>
                )}
                <span>{lineCount} LINES</span>
                <span>{compiledMarkdown.length} BYTES</span>
                <span className="text-emerald-400 hidden sm:inline">GITHUB CAMO SAFE</span>
              </div>
            </div>

            {/* Output Content Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 min-w-0">
              {previewTab === 'rendered' ? (
                <div
                  data-testid="readme-viewport-frame"
                  data-viewport={deviceViewport}
                  data-theme={previewTheme}
                  className={`${viewportContainerClass} rounded-xl border overflow-hidden shadow-lg transition-all duration-200 ${
                    previewTheme === 'light'
                      ? 'bg-[#fafbfc] text-[#0f172a] border-slate-300'
                      : 'bg-[#0f172a] text-slate-100 border-slate-700'
                  }`}
                >
                  {/* Realistic GitHub README.md Container Header */}
                  <div
                    className={`flex items-center justify-between px-4 py-2.5 border-b text-xs font-mono ${
                      previewTheme === 'light'
                        ? 'bg-[#f8fafc] border-slate-200 text-slate-700'
                        : 'bg-[#1e293b] border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-bold">README.md</span>
                      {rawMarkdownOverride !== null && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-400 text-[10px] font-bold">
                          Manual Override
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] opacity-75 uppercase">
                      {deviceViewport} · {previewTheme}
                    </span>
                  </div>

                  {/* Sanitized GFM Renderer */}
                  <div className="p-4 sm:p-8 min-w-0">
                    <ReadmeMarkdownRenderer markdown={compiledMarkdown} theme={previewTheme} />
                  </div>
                </div>
              ) : (
                <div className="max-w-5xl mx-auto h-full flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">README.md Source</span>
                      {rawMarkdownOverride !== null ? (
                        <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold">
                          Manual Override Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px]">
                          Synced with Structured Editor
                        </span>
                      )}
                    </div>
                  </div>

                  <textarea
                    aria-label="Raw Markdown Editor"
                    value={compiledMarkdown}
                    onChange={(e) => setRawMarkdownOverride(e.target.value)}
                    rows={24}
                    spellCheck={false}
                    className="w-full flex-1 min-h-[420px] rounded-xl border border-slate-700 bg-[#1e293b]/70 p-4 font-mono text-xs text-slate-100 leading-relaxed focus:outline-hidden focus:border-amber-400 resize-y"
                  />
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
};
