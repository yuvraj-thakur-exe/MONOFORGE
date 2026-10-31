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
  Zap,
  Lock,
  Sparkles,
  Activity,
  Bot,
  Swords,
  Binary,
} from 'lucide-react';
import { getDocsNavigation } from '#/content/docs/docs-data';
import { GitHubStarButton } from '#/components/common/GitHubStarButton';
import { GeometricLoader } from '#/components/common/GeometricLoader';
import { KineticTypewriter, KineticGradientText } from '#/components/common/KineticText';

type ShowcaseTab = 'geometric' | 'cyberbot' | 'ninja' | 'matrix';

export function DocsHomePortal() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pnpm' | 'npm' | 'git' | 'cli'>('pnpm');
  const [showcaseTab, setShowcaseTab] = useState<ShowcaseTab>('geometric');
  const [loaderColor, setLoaderColor] = useState<string>('#ffe600');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const navigation = getDocsNavigation();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const codeSnippets = {
    pnpm: 'pnpm create monoforge-app\n# or clone directly:\ngit clone https://github.com/monoforge/MONOFORGE.git\ncd MONOFORGE && pnpm install && pnpm dev',
    npm: 'npx create-monoforge-app\n# or run the standalone CLI without install:\nnpx monoforge generate --username octocat',
    git: 'git clone https://github.com/monoforge/MONOFORGE.git\ncd MONOFORGE\npnpm install\npnpm test\npnpm build',
    cli: '# Run standalone CLI (zero install needed with Node.js 18+):\nnode ./bin/monoforge.js list\nnode ./bin/monoforge.js generate --username octocat --archetype wow-3d-city-cat',
  };

  const showcaseSnippets: Record<ShowcaseTab, string> = {
    geometric: `<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/assets/loaders/geometric.svg" alt="Geometric Dot & Path Loader" width="180" />\n</p>`,
    cyberbot: `<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/assets/characters/cyber-bot.svg" alt="Cyber Bot Companion" width="420" />\n</p>`,
    ninja: `<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/assets/characters/ninja-coder.svg" alt="Ninja Coder Glint" width="420" />\n</p>`,
    matrix: `<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/assets/banners/matrix-rain.svg" alt="Matrix Cyber Rain" width="100%" />\n</p>`,
  };

  const copyShowcaseMarkdown = () => {
    navigator.clipboard.writeText(showcaseSnippets[showcaseTab]);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#ffe600] selection:text-slate-950 transition-colors">
      {/* Top Banner Notice */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs py-2 px-4 text-center font-mono text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-slate-900 dark:text-white">MonoForge V2</span> — Official Technical Documentation, Architecture Blueprint &amp; Open-Source Specification.
      </div>

      {/* Main Hero Section with Ambient Glow */}
      <section className="relative border-b border-slate-200/80 dark:border-slate-800 py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(99,102,241,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10 text-center sm:text-left">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>DOCUMENTATION &amp; SPECIFICATION PLATFORM</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
              18 GUIDES
            </span>
          </div>

          {/* Headline with Kinetic Text Animation */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans leading-[1.08]">
              FORGE AN ICONIC{' '}
              <KineticGradientText className="relative inline-block my-1">
                GITHUB IDENTITY.
              </KineticGradientText>
            </h1>
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-amber-600 dark:text-amber-400">
              <span className="font-bold text-slate-400">&gt;</span>
              <KineticTypewriter
                words={[
                  '100% Camo CDN Safe with Zero Broken Links',
                  '60fps CSS Keyframe Vector Characters & Banners',
                  '47+ Modular Scraped Telemetry Engines',
                  'Single Zustand Source-of-Truth Store Architecture',
                  'Zero Silent Push with Line-by-Line Diff Review',
                ]}
                className="font-bold"
              />
            </div>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-sans font-normal">
              The definitive developer manual for MonoForge. Learn the single-store state architecture, explore the 47+ telemetry engines, review GitHub Camo sanitization rules, and integrate the standalone CLI.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-2 font-mono text-xs">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-black border border-amber-500 shadow-md hover:bg-amber-300 hover:shadow-lg transition-all text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>EXPLORE DOCUMENTATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/docs/getting-started/quickstart"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 shadow-xs hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>60-SECOND QUICKSTART</span>
            </Link>

            <Link
              href="/info"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 shadow-xs hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-indigo-500" />
              <span>INFO HUB &amp; BADGES</span>
            </Link>

            <GitHubStarButton className="h-[46px] px-5 py-3 rounded-xl border border-slate-800 shadow-md" />
          </div>

          {/* Quick Terminal Installation Box */}
          <div className="pt-4 max-w-3xl">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c0d12] overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  <div className="ml-2 flex items-center gap-1">
                    {(['pnpm', 'npm', 'git', 'cli'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                          activeTab === tab
                            ? 'bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30'
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
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors text-[11px] cursor-pointer"
                >
                  {copiedCmd === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy snippet</span>
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
          </div>
        </div>
      </section>

      {/* Interactive Live SVG & Animation Laboratory Showcase */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                <Activity className="w-4 h-4" />
                <span>INTERACTIVE MOTION &amp; ASSET LABORATORY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                60FPS CAMO-COMPLIANT VECTOR ENGINES
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-2xl">
                Test and preview real animated vector assets directly inside the browser. Zero JavaScript inside output SVGs — 100% pure CSS keyframes safe for GitHub Camo CDN proxying.
              </p>
            </div>

            {/* Quick Copy Markdown Action */}
            <button
              type="button"
              onClick={copyShowcaseMarkdown}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-mono font-bold shadow-md hover:bg-amber-400 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 transition-all cursor-pointer"
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

          {/* Interactive Playground Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
              {/* Asset Mode Toggles */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setShowcaseTab('geometric')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    showcaseTab === 'geometric'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Geometric Loader</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowcaseTab('cyberbot')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    showcaseTab === 'cyberbot'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Cyber Bot</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowcaseTab('ninja')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    showcaseTab === 'ninja'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Swords className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Ninja Coder</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowcaseTab('matrix')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    showcaseTab === 'matrix'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Binary className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Matrix Rain</span>
                </button>
              </div>

              {/* Color Dot Swatches (when geometric is active) */}
              {showcaseTab === 'geometric' && (
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                  <span className="hidden sm:inline">Dot Glow:</span>
                  {(['#ffe600', '#6366f1', '#10b981', '#06b6d4', '#ec4899'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setLoaderColor(color)}
                      aria-label={`Select color ${color}`}
                      className="w-4 h-4 rounded-full border border-white dark:border-slate-800 transition-transform hover:scale-125 cursor-pointer shadow-xs"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Stage Preview Area */}
            <div className="p-8 sm:p-12 min-h-[260px] flex items-center justify-center bg-radial from-slate-50 to-white dark:from-slate-900/90 dark:to-slate-950 relative overflow-hidden">
              {showcaseTab === 'geometric' && (
                <div className="flex flex-col items-center gap-4">
                  <GeometricLoader mode="triple" size="lg" dotColor={loaderColor} />
                  <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    UIVERSE GEOMETRIC PATH &amp; DOT LOADER (TRIPLE ORBIT)
                  </span>
                </div>
              )}

              {showcaseTab === 'cyberbot' && (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-56 h-32">
                      <rect x="50" y="30" width="100" height="70" rx="14" fill="#18181b" stroke="#38bdf8" strokeWidth="3" />
                      <circle cx="75" cy="60" r="10" fill="#38bdf8" className="animate-pulse" />
                      <circle cx="125" cy="60" r="10" fill="#38bdf8" className="animate-pulse" />
                      <path d="M85 85 Q100 95 115 85" stroke="#38bdf8" strokeWidth="3" fill="none" />
                      <line x1="100" y1="30" x2="100" y2="12" stroke="#38bdf8" strokeWidth="3" />
                      <circle cx="100" cy="10" r="5" fill="#f59e0b" className="animate-ping" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    CYBER BOT VECTOR WITH REAL-TIME ANTENNA BEACON
                  </span>
                </div>
              )}

              {showcaseTab === 'ninja' && (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-56 h-32">
                      <circle cx="100" cy="55" r="35" fill="#18181b" stroke="#f43f5e" strokeWidth="3" />
                      <rect x="75" y="48" width="50" height="12" rx="3" fill="#f43f5e" />
                      <circle cx="90" cy="54" r="3" fill="#ffffff" />
                      <circle cx="110" cy="54" r="3" fill="#ffffff" />
                      <line x1="130" y1="50" x2="160" y2="35" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                      <line x1="130" y1="55" x2="165" y2="45" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    NINJA CODER COMBAT STANCE WITH FLUTTERING HEADBAND
                  </span>
                </div>
              )}

              {showcaseTab === 'matrix' && (
                <div className="w-full max-w-lg p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-emerald-400 font-mono text-xs shadow-2xl space-y-2">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 text-[10px] text-emerald-500">
                    <span>MATRIX_RAIN_ENGINE.SVG</span>
                    <span className="animate-pulse">STREAM ACTIVE</span>
                  </div>
                  <p className="tracking-widest font-bold opacity-90">01001101 01001111 01001110 01001111 01000110</p>
                  <p className="tracking-widest font-bold text-emerald-300">01001111 01010010 01000111 01000101 00100000</p>
                  <p className="tracking-widest font-bold opacity-75">10110010 11001101 01010110 00110010 11010101</p>
                </div>
              )}
            </div>

            {/* Code Snippet Bar */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400 truncate">
                {showcaseSnippets[showcaseTab].split('\n')[1]?.trim()}
              </span>
              <button
                type="button"
                onClick={copyShowcaseMarkdown}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline self-end sm:self-auto cursor-pointer"
              >
                {copiedSnippet ? 'Copied to Clipboard!' : 'Copy snippet'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Directory Bento Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-[#f8fafc] dark:bg-[#0c0f17]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              <span>DOCUMENTATION CHAPTERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              EXPLORE BY TOPIC &amp; ARCHITECTURE
            </h2>
            <p className="text-sm font-sans text-slate-600 dark:text-slate-400 max-w-2xl">
              18 verified engineering manuals covering every layer of the MonoForge platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigation.map((cat, idx) => (
              <div
                key={cat.name}
                className="flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500/40 dark:hover:border-amber-400/30 transition-all duration-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Chapter 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
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
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group font-sans text-xs font-medium text-slate-700 dark:text-slate-200"
                      >
                        <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono uppercase px-2 py-0.2 rounded-full font-bold bg-amber-400 text-slate-950 shrink-0 ml-1">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/docs/${cat.items[0]?.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 pt-3 border-t border-slate-100 dark:border-slate-800"
                >
                  <span>Start Reading Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Architectural Invariants */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a]">
        <div className="max-w-6xl mx-auto space-y-12">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <span>1. Single Source-of-Truth Store</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                A single Zustand store (<code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">src/store/useReadmeStore.ts</code>) maintains profile state across all views. There is zero parallel or disconnected state.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                <Code2 className="w-4 h-4 text-indigo-500" />
                <span>2. Pure Function Markdown Pipeline</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                The function <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">buildMarkdown(config)</code> produces clean GitHub Flavored Markdown with zero React dependencies or side effects.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>3. 60fps GitHub Camo Safe Vectors</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                All SVGs pass strict GitHub Camo CDN proxy checks: zero <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">&lt;script&gt;</code>, zero <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">&lt;foreignObject&gt;</code>, using only pure CSS keyframe animations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-slate-900 dark:text-white uppercase">
                <Lock className="w-4 h-4 text-rose-500" />
                <span>4. Confirmation-Gated Data &amp; Sync</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                Nothing external writes to your store or pushes to your GitHub account without explicit, per-item user confirmation and line-by-line diff review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLI & MCP Integration Card */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-[#f8fafc] dark:bg-[#0c0f17]">
        <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                AUTOMATION &amp; AGENT SUITE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                STANDALONE CLI &amp; MODEL CONTEXT PROTOCOL (MCP)
              </h3>
            </div>
            <Link
              href="/docs/reference/cli"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold font-mono text-xs hover:bg-amber-400 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 transition-all shrink-0 cursor-pointer"
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
                Generates a README.md file from archetypes with optional output path.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">monoforge doctor</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Audits an existing profile for Camo compliance, broken links, and bad contrast.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">monoforge mcp</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Starts the stdio Model Context Protocol (MCP) server for developer tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-400 font-mono text-xs">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <span className="font-black text-sm text-slate-900 dark:text-white uppercase font-sans">
                MONOFORGE
              </span>
              <p className="text-[11px] text-slate-500">
                Open-source developer identity engine &amp; GitHub profile customization suite.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <Link href="/docs" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                DOCUMENTATION
              </Link>
              <Link href="/docs/getting-started/quickstart" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                QUICKSTART
              </Link>
              <Link href="/docs/reference/architecture" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                SPECS
              </Link>
              <Link href="/info" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                INFO HUB
              </Link>
              <a
                href="https://github.com/monoforge/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <span>&copy; {new Date().getFullYear()} MonoForge Contributors. Released under the MIT License.</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All systems operational &bull; GitHub Camo CDN verified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
