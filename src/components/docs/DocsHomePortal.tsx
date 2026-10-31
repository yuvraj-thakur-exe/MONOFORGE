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
  Star,
  Code2,
  Zap,
  Lock,
} from 'lucide-react';
import { getDocsNavigation } from '#/content/docs/docs-data';

export function DocsHomePortal() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pnpm' | 'git' | 'cli'>('pnpm');

  const navigation = getDocsNavigation();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const codeSnippets = {
    pnpm: 'pnpm create monoforge-app\n# or clone directly:\ngit clone https://github.com/monoforge/MONOFORGE.git\ncd MONOFORGE && pnpm install && pnpm dev',
    git: 'git clone https://github.com/monoforge/MONOFORGE.git\ncd MONOFORGE\npnpm install\npnpm test\npnpm build',
    cli: '# Run standalone CLI (zero install needed with Node.js 18+):\nnode ./bin/monoforge.js list\nnode ./bin/monoforge.js generate --username octocat --archetype wow-3d-city-cat',
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0c0d0e] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-[#ffe600] selection:text-neutral-950 transition-colors">
      {/* Top Banner Notice */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141517] py-2 px-4 text-center font-mono text-xs text-neutral-600 dark:text-neutral-400">
        <span className="font-bold text-neutral-900 dark:text-white">MonoForge V2</span> — Official Technical Documentation, Architecture Blueprint &amp; Open-Source Specification.
      </div>

      {/* Main Hero Section */}
      <section className="relative border-b-2 border-neutral-900 dark:border-neutral-800 py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-8 text-center sm:text-left">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b] font-mono text-xs font-bold text-neutral-950 dark:text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>DOCUMENTATION &amp; INFORMATION PLATFORM</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black">
              18 GUIDES
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-950 dark:text-white uppercase font-sans leading-[1.08]">
              FORGE AN ICONIC GITHUB IDENTITY.
            </h1>
            <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed font-sans font-normal">
              The definitive developer manual for MonoForge. Learn the single-store state architecture, explore the 47+ telemetry engines, review GitHub Camo sanitization rules, and integrate the standalone CLI.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-2 font-mono text-xs">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ffe600] text-neutral-950 font-black border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all btn-tactile text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>EXPLORE DOCUMENTATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/docs/getting-started/quickstart"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-bold border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] hover:bg-[#ffe600] hover:text-neutral-950 dark:hover:bg-[#ffe600] dark:hover:text-neutral-950 transition-all btn-tactile"
            >
              <span>60-SECOND QUICKSTART</span>
            </Link>

            <Link
              href="/info"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-bold border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all btn-tactile"
            >
              <Terminal className="w-4 h-4 text-amber-500" />
              <span>INFO HUB &amp; BADGES</span>
            </Link>

            <a
              href="https://github.com/monoforge/MONOFORGE"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] hover:bg-[#ffe600] hover:text-neutral-950 transition-all btn-tactile"
            >
              <Github className="w-4 h-4" />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>GITHUB REPO</span>
            </a>
          </div>

          {/* Quick Terminal Installation Box */}
          <div className="pt-4 max-w-3xl">
            <div className="rounded-2xl border-2 border-neutral-900 dark:border-neutral-800 bg-[#0c0d0e] overflow-hidden shadow-[4px_4px_0px_#18181b]">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-[#141517] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <div className="ml-2 flex items-center gap-1">
                    {(['pnpm', 'git', 'cli'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase cursor-pointer ${
                          activeTab === tab
                            ? 'bg-neutral-800 text-white'
                            : 'text-neutral-400 hover:text-neutral-200'
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
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-[11px] cursor-pointer"
                >
                  {copiedCmd === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 overflow-x-auto text-[#e6edf3] font-mono text-[12.5px] leading-relaxed">
                <pre>
                  <code>{codeSnippets[activeTab]}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Directory Bento Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-b-2 border-neutral-900 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#0c0d0e]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-neutral-500 tracking-wider">
              <span>DOCUMENTATION CHAPTERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
              EXPLORE BY TOPIC &amp; ARCHITECTURE
            </h2>
            <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 max-w-2xl">
              18 verified reference manuals covering every layer of the MonoForge system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigation.map((cat, idx) => (
              <div
                key={cat.name}
                className="flex flex-col p-6 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[4px_4px_0px_#18181b] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                    Chapter 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {cat.items.length} articles
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white font-sans uppercase">
                  {cat.name}
                </h3>

                <ul className="space-y-2 flex-1">
                  {cat.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/docs/${item.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group font-sans text-xs font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        <span className="group-hover:text-amber-600 dark:group-hover:text-[#ffe600] transition-colors truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold bg-[#ffe600] text-neutral-950 shrink-0 ml-1">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/docs/${cat.items[0]?.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-950 dark:text-white hover:text-amber-600 dark:hover:text-[#ffe600] pt-2 border-t border-neutral-200 dark:border-neutral-800"
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-b-2 border-neutral-900 dark:border-neutral-800 bg-white dark:bg-[#111215]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-[#ffe600]">
              SYSTEM INVARIANTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
              ARCHITECTURAL PRINCIPLES YOU CAN RELY ON
            </h2>
            <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 max-w-2xl">
              MonoForge is engineered with strict deterministic rules guaranteeing stability, privacy, and zero broken links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-neutral-950 dark:text-white uppercase">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <span>1. Single Source-of-Truth Store</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                A single Zustand store (<code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[11px]">src/store/useReadmeStore.ts</code>) maintains profile state across all views. There is zero parallel or disconnected state.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-neutral-950 dark:text-white uppercase">
                <Code2 className="w-4 h-4 text-blue-500" />
                <span>2. Pure Functional Markdown Engine</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                The compilation function (<code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[11px]">buildMarkdown(config)</code>) is 100% pure TypeScript with zero side effects, no React dependencies, and full test suite coverage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-neutral-950 dark:text-white uppercase">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>3. 60fps GitHub Camo Safe Vectors</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                All SVGs pass strict GitHub Camo CDN proxy checks: zero <code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[11px]">&lt;script&gt;</code>, zero <code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[11px]">&lt;foreignObject&gt;</code>, using only pure CSS keyframe animations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-neutral-950 dark:text-white uppercase">
                <Lock className="w-4 h-4 text-purple-500" />
                <span>4. Mandatory Confirmation Gates</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                Nothing external writes to your store or pushes to your GitHub account without explicit, per-item user confirmation and line-by-line diff review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standalone CLI Tool Showcase */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-b-2 border-neutral-900 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#0c0d0e]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-neutral-900 dark:border-neutral-800 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                COMMAND LINE TOOL &amp; MCP SERVER
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
                BIN/MONOFORGE.JS REFERENCE
              </h2>
            </div>
            <Link
              href="/docs/reference/cli"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 font-mono text-xs font-bold shadow-[2px_2px_0px_#18181b] hover:bg-[#ffe600] hover:text-neutral-950 transition-all"
            >
              <span>View Full CLI Manual</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] space-y-2 font-mono text-xs">
              <div className="font-bold text-neutral-950 dark:text-white">monoforge list</div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] font-sans">
                Lists all 85+ archetypes with their category, accent color, and ID.
              </p>
              <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 text-[11px] text-neutral-800 dark:text-neutral-200">
                $ node ./bin/monoforge.js list
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] space-y-2 font-mono text-xs">
              <div className="font-bold text-neutral-950 dark:text-white">monoforge generate</div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] font-sans">
                Generates a complete Camo-compliant profile README directly to disk.
              </p>
              <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 text-[11px] text-neutral-800 dark:text-neutral-200">
                $ node ./bin/monoforge.js generate -u octocat
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[3px_3px_0px_#18181b] space-y-2 font-mono text-xs">
              <div className="font-bold text-neutral-950 dark:text-white">monoforge mcp</div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] font-sans">
                Starts the stdio Model Context Protocol (MCP) server for developer tools.
              </p>
              <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 text-[11px] text-neutral-800 dark:text-neutral-200">
                $ node ./bin/monoforge.js mcp
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="border-t-2 border-neutral-900 dark:border-neutral-800 bg-white dark:bg-[#0c0d0e] py-12 px-4 sm:px-6 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <span className="font-black text-sm tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
                MONO<span className="text-amber-500">FORGE</span> DOCUMENTATION
              </span>
              <p className="text-[11px] text-neutral-500 mt-1">
                Open-source technical reference &amp; profile README architecture guide.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
              <Link href="/docs" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                DOCUMENTATION
              </Link>
              <Link href="/docs/getting-started/quickstart" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                QUICKSTART
              </Link>
              <Link href="/docs/reference/architecture" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                SPECS
              </Link>
              <Link href="/info" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                INFO HUB
              </Link>
              <a
                href="https://github.com/monoforge/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <span>
              &copy; {new Date().getFullYear()} MonoForge Contributors. 100% Free &amp; Open Source under MIT License.
            </span>
            <span>
              Pure Camo-safe keyframe SVG vectors. Zero tracking proxies.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
