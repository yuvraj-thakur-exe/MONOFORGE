'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import {
  BookOpen,
  Terminal,
  ArrowRight,
  Check,
  Copy,
  Cpu,
  Github,
  Code2,
  BarChart3,
  Zap,
  Lock,
  Sparkles,
  Activity,
  Monitor,
  Gamepad2,
  Building2,
  Rocket,
  Layers,
  Search,
  Wand2,
  ShieldCheck,
} from 'lucide-react';
import { getDocsNavigation, getAllDocs } from '#/content/docs/docs-data';
import { GitHubStarButton } from '#/components/common/GitHubStarButton';
import { KineticTypewriter, KineticGradientText } from '#/components/common/KineticText';
import { ScrollReveal } from '#/components/motion/ScrollReveal';
import { TopNav } from '#/components/navigation/TopNav';
import { DocsSearchModal } from './DocsSearchModal';
import { playClickSound, playTone } from '#/lib/sound/sound-effects';
import { TEMPLATES } from '#/lib/templates/catalog';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { pluginRegistry } from '#/lib/plugins/registry';

type ShowcaseTab = 'isocalendar' | 'commit-city' | 'developer-terminal' | 'contribution-snake';

const TEMPLATE_COUNT = TEMPLATES.length;
const VIZ_COUNT = ALL_VISUALIZATION_IDS.length;
const PLUGIN_COUNT = pluginRegistry.length;
const GITHUB_HANDLE_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export function DocsHomePortal() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pnpm' | 'npm' | 'git' | 'cli'>('pnpm');
  const [showcaseTab, setShowcaseTab] = useState<ShowcaseTab>('isocalendar');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isDocsSearchOpen, setIsDocsSearchOpen] = useState(false);
  const [previewUser, setPreviewUser] = useState('octocat');

  const navigation = getDocsNavigation();
  const totalDocsCount = getAllDocs().length;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playClickSound();
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleTabSwitch = (tab: 'pnpm' | 'npm' | 'git' | 'cli') => {
    setActiveTab(tab);
    playClickSound();
  };

  const handleShowcaseTab = (tab: ShowcaseTab) => {
    setShowcaseTab(tab);
    playClickSound();
  };

  const codeSnippets = {
    pnpm: 'pnpm create monoforge-app\n# or clone directly:\ngit clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git\ncd MONOFORGE && pnpm install && pnpm dev',
    npm: 'npx create-monoforge-app\n# or run the standalone CLI without install:\nnpx github:yuvraj-thakur-exe/MONOFORGE generate --username octocat',
    git: 'git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git\ncd MONOFORGE\npnpm install\npnpm test\npnpm build',
    cli: '# Run standalone CLI (zero install needed with Node.js 18+):\nnode ./bin/monoforge.js list\nnode ./bin/monoforge.js generate --username octocat --archetype wow-3d-city-cat',
  };

  const rawPreviewUser = previewUser.trim().replace(/^@+/, '');
  const cleanPreviewUser = GITHUB_HANDLE_REGEX.test(rawPreviewUser) ? rawPreviewUser : 'octocat';
  const telemetryPreviewPath = `/api/telemetry/svg?plugin=${encodeURIComponent(showcaseTab)}&user=${encodeURIComponent(cleanPreviewUser)}`;
  const telemetryEmbedUrl = `https://monoforge-studio.vercel.app${telemetryPreviewPath}`;

  const showcaseMeta: Record<ShowcaseTab, { label: string; alt: string; vizId: string }> = {
    isocalendar: {
      label: '3D Isometric Calendar',
      alt: `${cleanPreviewUser} 3D Isometric Contribution Calendar`,
      vizId: 'commit-city',
    },
    'commit-city': {
      label: '3D Commit City',
      alt: `${cleanPreviewUser} 3D Commit City Skyline`,
      vizId: 'commit-city',
    },
    'developer-terminal': {
      label: 'Developer Terminal HUD',
      alt: `${cleanPreviewUser} Developer CRT Terminal HUD`,
      vizId: 'developer-terminal',
    },
    'contribution-snake': {
      label: 'Contribution Snake',
      alt: `${cleanPreviewUser} Arcade Contribution Snake`,
      vizId: 'contribution-snake',
    },
  };

  const currentShowcaseSnippet = `<p align="center">\n  <img src="${telemetryEmbedUrl}" alt="${showcaseMeta[showcaseTab].alt}" width="100%" />\n</p>`;

  const copyShowcaseMarkdown = () => {
    navigator.clipboard.writeText(currentShowcaseSnippet);
    playTone(1046.5, 'sine', 0.1, 0.05);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#ffe600] selection:text-slate-900 transition-colors">
      {/* Global MonoForge Top Navigation */}
      <TopNav />

      {/* Documentation Portal Hero */}
      <section className="relative border-b border-slate-200/80 dark:border-slate-800 py-10 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.16),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Column (7 cols): Engineering Docs Overview */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ENGINEERING MANUAL</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-black">
                {totalDocsCount} VERIFIED GUIDES
              </span>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans leading-[1.08]">
                MONOFORGE{' '}
                <KineticGradientText className="relative inline-block my-1">
                  DOCUMENTATION.
                </KineticGradientText>
              </h1>

              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-amber-600 dark:text-amber-400 justify-center sm:justify-start">
                <span className="font-bold text-slate-400">&gt;</span>
                <KineticTypewriter
                  words={[
                    `${TEMPLATE_COUNT} Curated Archetypes with Pure GFM Compilation`,
                    `${VIZ_COUNT} Camo-Safe 60fps SVG Visualizations & ${PLUGIN_COUNT} Modular Plugins`,
                    'Single Zustand Source-of-Truth Store Architecture',
                    'Zero Silent Push with Line-by-Line Git Diff Review',
                  ]}
                  className="font-bold"
                />
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans">
                Architecture specifications, GitHub Camo sanitizer invariants, CLI &amp; MCP references, and interactive SVG telemetry endpoints across all {totalDocsCount} technical manuals.
              </p>
            </div>

            {/* Primary Actions */}
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Link
                href="/templates"
                onClick={() => playClickSound()}
                className="btn-shimmer inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm border-2 border-amber-500 shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer font-sans tracking-wide"
              >
                <Rocket className="w-4 h-4 text-slate-900" />
                <span>START FORGING NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsDocsSearchOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-400 transition-all cursor-pointer font-mono"
              >
                <Search className="w-4 h-4 text-amber-500" />
                <span>Search {totalDocsCount} Manuals</span>
              </button>

              <GitHubStarButton className="h-[48px] px-4 rounded-2xl border border-slate-700 shadow-md shrink-0" />
            </div>

            {/* Standardized Counts & Navigation Shortcuts */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 font-mono text-xs pt-1">
              <Link
                href="/templates"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>{TEMPLATE_COUNT} Curated Archetypes</span>
              </Link>

              <Link
                href="/visualizer"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{VIZ_COUNT} SVG VISUALIZATIONS</span>
              </Link>

              <Link
                href="/developer"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{PLUGIN_COUNT} Modular Plugins</span>
              </Link>

              <Link
                href="/wizard"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Guided Wizard</span>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Quick Install Terminal & Essential Docs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  <div className="ml-2 flex items-center gap-1">
                    {(['pnpm', 'npm', 'git', 'cli'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleTabSwitch(tab)}
                        className={`px-2 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                          activeTab === tab
                            ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippets[activeTab], activeTab)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700 transition-colors text-[11px] cursor-pointer"
                >
                  {copiedCmd === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed bg-slate-900 text-emerald-400 selection:bg-emerald-500/20">
                <pre className="m-0 p-0">
                  <code>{codeSnippets[activeTab]}</code>
                </pre>
              </div>
            </div>

            {/* Recommended Reading Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Essential Specifications</span>
                </span>
                <span>{PLUGIN_COUNT} Plugins</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link
                  href="/docs/getting-started/quickstart"
                  onClick={() => playClickSound()}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-amber-400/15 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">Quick Start</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                </Link>
                <Link
                  href="/docs/reference/camo-rules"
                  onClick={() => playClickSound()}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-amber-400/15 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">Camo Rules</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                </Link>
                <Link
                  href="/docs/reference/architecture"
                  onClick={() => playClickSound()}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-amber-400/15 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                </Link>
                <Link
                  href="/docs/reference/cli"
                  onClick={() => playClickSound()}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-amber-400/15 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">CLI &amp; MCP</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live SVG & Telemetry Endpoint Laboratory */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                <Activity className="w-4 h-4" />
                <span>LIVE TELEMETRY SVG ENDPOINT LAB</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                60FPS CAMO-COMPLIANT VECTOR ENGINES
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-2xl">
                Test live <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">/api/telemetry/svg</code> endpoints directly in your browser. Zero JavaScript inside output SVGs — pure CSS keyframes safe for GitHub Camo CDN proxying.
              </p>
            </div>

            <button
              type="button"
              onClick={copyShowcaseMarkdown}
              className="btn-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold shadow-md hover:bg-amber-400 hover:text-slate-900 dark:hover:bg-amber-400 dark:hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>COPIED MARKDOWN!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY README SNIPPET</span>
                </>
              )}
            </button>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              {/* Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/70">
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => handleShowcaseTab('isocalendar')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      showcaseTab === 'isocalendar'
                        ? 'bg-amber-400 text-slate-900 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>3D Isocalendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShowcaseTab('commit-city')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      showcaseTab === 'commit-city'
                        ? 'bg-amber-400 text-slate-900 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Commit City</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShowcaseTab('developer-terminal')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      showcaseTab === 'developer-terminal'
                        ? 'bg-amber-400 text-slate-900 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Terminal HUD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShowcaseTab('contribution-snake')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      showcaseTab === 'contribution-snake'
                        ? 'bg-amber-400 text-slate-900 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Arcade Snake</span>
                  </button>
                </div>

                {/* Live Handle Preview Input */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <label htmlFor="docs-svg-user" className="text-slate-500 dark:text-slate-400 hidden sm:inline">
                    ?user=
                  </label>
                  <input
                    id="docs-svg-user"
                    type="text"
                    value={previewUser}
                    onChange={(e) => setPreviewUser(e.target.value)}
                    placeholder="octocat"
                    className="w-32 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs focus:outline-hidden focus:border-amber-400"
                  />
                  <Link
                    href={`/visualizer?viz=${showcaseMeta[showcaseTab].vizId}&user=${encodeURIComponent(cleanPreviewUser)}`}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold hover:bg-emerald-500/20 transition-colors"
                  >
                    Open Visualizer
                  </Link>
                </div>
              </div>

              {/* Stage Preview Area */}
              <div className="p-6 sm:p-10 min-h-[260px] flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
                <img
                  src={telemetryPreviewPath}
                  alt={showcaseMeta[showcaseTab].alt}
                  className="max-w-full max-h-[340px] rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg bg-slate-900"
                />
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
                  {showcaseMeta[showcaseTab].label} &bull; SERVED VIA {telemetryPreviewPath}
                </span>
              </div>

              {/* Code Snippet Bar */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-300 truncate">
                  {telemetryEmbedUrl}
                </span>
                <button
                  type="button"
                  onClick={copyShowcaseMarkdown}
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline self-end sm:self-auto cursor-pointer shrink-0"
                >
                  {copiedSnippet ? 'Copied to Clipboard!' : 'Copy snippet'}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Documentation Directory Bento Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-[#f8fafc] dark:bg-[#0f172a]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>DOCUMENTATION CHAPTERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              EXPLORE BY TOPIC &amp; ARCHITECTURE
            </h2>
            <p className="text-sm font-sans text-slate-600 dark:text-slate-400 max-w-2xl">
              {totalDocsCount} verified engineering manuals covering every layer of the MonoForge platform.
            </p>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navigation.map((cat, idx) => (
                <div
                  key={cat.name}
                  className="card-hover-lift flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/40 dark:hover:border-amber-400/30 transition-all duration-200 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Chapter 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {cat.items.length} articles
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white font-sans uppercase">
                    {cat.name}
                  </h3>

                  <ul className="space-y-1.5 flex-1">
                    {cat.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/docs/${item.slug}`}
                          onClick={() => playClickSound()}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group font-sans text-xs font-medium text-slate-700 dark:text-slate-200"
                        >
                          <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono uppercase px-2 py-0.2 rounded-full font-bold bg-amber-400 text-slate-900 shrink-0 ml-1">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/docs/${cat.items[0]?.slug}`}
                    onClick={() => playClickSound()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 pt-3 border-t border-slate-100 dark:border-slate-800"
                  >
                    <span>Start Reading Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Architectural Invariants */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              SYSTEM INVARIANTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              ARCHITECTURAL PRINCIPLES YOU CAN RELY ON
            </h2>
            <p className="text-sm font-sans text-slate-600 dark:text-slate-400 max-w-2xl">
              MonoForge is engineered with strict deterministic rules guaranteeing stability, privacy, and zero broken links.
            </p>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-hover-lift p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                  <Cpu className="w-4 h-4 text-emerald-500" />
                  <span>1. Single Source-of-Truth Store</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  A single Zustand store (<code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-900 font-mono text-[11px]">website/src/store/useReadmeStore.ts</code>) maintains profile state across all views. There is zero parallel or disconnected state.
                </p>
              </div>

              <div className="card-hover-lift p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  <span>2. Pure Function Markdown Pipeline</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  The function <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-900 font-mono text-[11px]">buildMarkdown(config)</code> produces clean GitHub Flavored Markdown across all {PLUGIN_COUNT} registered plugins with zero side effects.
                </p>
              </div>

              <div className="card-hover-lift p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>3. 60fps GitHub Camo Safe Vectors</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  All {VIZ_COUNT} SVG visualizations pass strict GitHub Camo CDN proxy checks: zero <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-900 font-mono text-[11px]">&lt;script&gt;</code>, zero <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-900 font-mono text-[11px]">&lt;foreignObject&gt;</code>, using only pure CSS keyframe animations.
                </p>
              </div>

              <div className="card-hover-lift p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                  <Lock className="w-4 h-4 text-rose-500" />
                  <span>4. Confirmation-Gated Data &amp; Sync</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  Nothing external writes to your store or pushes to your GitHub account without explicit, per-item user confirmation and line-by-line diff review.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CLI & MCP Integration Card */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-[#f8fafc] dark:bg-[#1e293b]/40">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>AUTOMATION &amp; AGENT SUITE</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                  STANDALONE CLI &amp; MODEL CONTEXT PROTOCOL (MCP)
                </h3>
              </div>
              <Link
                href="/docs/reference/cli"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold font-mono text-xs hover:bg-amber-400 hover:text-slate-900 dark:hover:bg-amber-400 dark:hover:text-slate-900 transition-all shrink-0 cursor-pointer"
              >
                <span>READ CLI SPEC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-3xl">
              MonoForge includes a zero-dependency CLI located in <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">bin/monoforge.js</code> and a Model Context Protocol (MCP) server. Use it to generate profiles in CI/CD pipelines, integrate with Cursor or Claude Code, or validate profiles directly in your terminal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-[11px]">monoforge generate</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Generates a README.md file from {TEMPLATE_COUNT} archetypes with optional output path.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">monoforge doctor</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Audits an existing profile for Camo compliance, broken links, and contrast issues.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-[11px]">monoforge mcp</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Starts the stdio Model Context Protocol (MCP) server for developer tools.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-400 font-mono text-xs">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <span className="font-black text-sm text-slate-900 dark:text-white uppercase font-sans">
                MONOFORGE
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Open-source developer identity engine &amp; GitHub profile customization suite.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <Link href="/wizard" onClick={() => playClickSound()} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                WIZARD
              </Link>
              <Link href="/developer" onClick={() => playClickSound()} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                DEVELOPER IDE
              </Link>
              <Link href="/templates" onClick={() => playClickSound()} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {TEMPLATE_COUNT} TEMPLATES
              </Link>
              <Link href="/visualizer" onClick={() => playClickSound()} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                VISUALIZER
              </Link>
              <Link href="/project-readme" onClick={() => playClickSound()} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                PROJECT README
              </Link>
              <Link href="/docs/getting-started/quickstart" onClick={() => playClickSound()} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                QUICKSTART
              </Link>
              <Link href="/info" onClick={() => playClickSound()} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                INFO HUB
              </Link>
              <a
                href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span>&copy; {new Date().getFullYear()} MonoForge Contributors. Released under the MIT License.</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All systems operational &bull; GitHub Camo CDN verified</span>
            </div>
          </div>
        </div>
      </footer>

      <DocsSearchModal isOpen={isDocsSearchOpen} onClose={() => setIsDocsSearchOpen(false)} />
    </div>
  );
}
