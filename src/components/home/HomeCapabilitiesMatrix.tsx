'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import {
  ArrowRight,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';
import { playClickSound, playTone } from '#/lib/sound/sound-effects';
import { ScrollReveal } from '#/components/motion/ScrollReveal';

export interface CapabilityFeature {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  metrics: string[];
  specs: Array<{ label: string; value: string }>;
  ctaText: string;
  ctaHref: string;
  previewType: 'archetypes' | 'vector' | 'telemetry' | 'resume' | 'sync' | 'store';
}

const CAPABILITIES: CapabilityFeature[] = [
  {
    id: 'archetypes',
    badge: '18+ ARCHETYPES',
    title: 'Visual Identity Archetypes',
    tagline: 'From 3D Contribution Cities to Cyberpunk Terminal Bento Grids',
    description:
      'Engineered for diverse developer personalities. Choose from 18+ high-impact templates including isometric 3D GitHub contribution skylines, glassmorphism telemetry dashboards, retro 8-bit arcade themes, and executive minimalist layouts.',
    metrics: ['18 Curated Archetypes', '100% Responsive Grid', 'Dark & Light Mode'],
    specs: [
      { label: 'Rendering', value: 'SVG & GFM Hybrid' },
      { label: 'Camo CDN Status', value: '100% Compatible' },
      { label: 'Config AST', value: 'Strict Zod Schema' },
    ],
    ctaText: 'EXPLORE ARCHETYPES',
    ctaHref: '/templates',
    previewType: 'archetypes',
  },
  {
    id: 'vector',
    badge: '60FPS VECTORS',
    title: 'Animated Vector Kinematics',
    tagline: 'Zero JavaScript. Pure CSS Keyframe Magic Safe for GitHub Camo',
    description:
      'Living animated vector assets embedded directly into markdown. Featuring the Cyber Bot with antenna beacon, Pixel Dev typing at dual-monitor desk with coffee steam, Ninja Coder with katana glint, Matrix cyber rain, and dynamic neon banners.',
    metrics: ['60fps GPU Hardware Accel', '0 Bytes JS in Output', 'Prefers-Reduced-Motion'],
    specs: [
      { label: 'Format', value: 'Pure SVG + CSS' },
      { label: 'GitHub Sanitizer', value: 'Strict Camo Safe' },
      { label: 'Frame Rate', value: 'Target 60 FPS' },
    ],
    ctaText: 'LAUNCH VECTOR STUDIO',
    ctaHref: '/animator',
    previewType: 'vector',
  },
  {
    id: 'telemetry',
    badge: '47+ ENGINES',
    title: 'Scraped Telemetry & Live Stats',
    tagline: 'Real-time Developer Metrics Without External Downtime Risks',
    description:
      'Dynamic telemetry cards showing GitHub streaks, commit velocity, top programming languages, Spotify now-playing music badges, WakaTime coding hours, Chess.com ELO ratings, and LeetCode problem solving rankings.',
    metrics: ['47+ Provider Integrations', 'Smart Edge Caching', 'Custom SVGs'],
    specs: [
      { label: 'Refresh Rate', value: 'Configurable TTL' },
      { label: 'Data Providers', value: 'GitHub, WakaTime, Spotify' },
      { label: 'Fallback', value: 'Instant Cached SVGs' },
    ],
    ctaText: 'VIEW TELEMETRY HUB',
    ctaHref: '/telemetry',
    previewType: 'telemetry',
  },
  {
    id: 'resume',
    badge: 'SMART PARSER',
    title: 'Resume Import & Enrichment',
    tagline: 'Transform PDF & DOCX Resumes into Structured Profile Blocks',
    description:
      'Upload an existing resume to extract professional experience, key skills, and repository links. Enforce the hard architecture invariant: nothing writes to your profile without per-item user confirmation.',
    metrics: ['PDF & DOCX Support', 'Zero Silent Overwrites', 'Confirm Gate Required'],
    specs: [
      { label: 'Extraction', value: 'Server-side AST Parser' },
      { label: 'Privacy', value: 'Local Memory Only' },
      { label: 'Security', value: 'Confirmation-Gated' },
    ],
    ctaText: 'TRY RESUME WIZARD',
    ctaHref: '/wizard',
    previewType: 'resume',
  },
  {
    id: 'sync',
    badge: 'ZERO SILENT PUSH',
    title: 'Direct GitHub Sync & Diff',
    tagline: 'Commit Directly to username/username with Line-by-Line Review',
    description:
      'Push your forged profile directly to your special GitHub repository using OAuth. Before committing, MonoForge fetches your existing remote README, highlights every line-by-line diff, and requires explicit confirmation.',
    metrics: ['Direct Octokit Sync', 'Visual Line-by-Line Diff', 'No Token Stored'],
    specs: [
      { label: 'API Scope', value: 'User Profile Repo Only' },
      { label: 'Safety', value: 'Explicit Confirm Gate' },
      { label: 'Rollback', value: 'Git Commit History' },
    ],
    ctaText: 'START PROFILE WIZARD',
    ctaHref: '/wizard',
    previewType: 'sync',
  },
  {
    id: 'store',
    badge: 'SINGLE STORE',
    title: 'Single Zustand Source-of-Truth',
    tagline: 'Seamless Transition Between Visual Wizard & Monaco Raw Editor',
    description:
      'Never lose edits when switching between modes. The visual Wizard and raw Monaco `/developer` editor both bind to the exact same Zustand store. The pure `buildMarkdown(config)` pipeline guarantees deterministic rendering.',
    metrics: ['Zero Parallel State', 'Pure Function Compiler', 'Dual-Mode Editor'],
    specs: [
      { label: 'State Engine', value: 'Zustand 5' },
      { label: 'Editor', value: 'Monaco Editor AST' },
      { label: 'Validation', value: 'Zod Config Schema' },
    ],
    ctaText: 'OPEN DEVELOPER MODE',
    ctaHref: '/developer',
    previewType: 'store',
  },
];

export function HomeCapabilitiesMatrix() {
  const [activeTab, setActiveTab] = useState<string>('archetypes');
  const [copiedCode, setCopiedCode] = useState(false);

  const activeFeature =
    CAPABILITIES.find((cap) => cap.id === activeTab) || CAPABILITIES[0];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    playClickSound();
  };

  const handleCopyMarkdown = (code: string) => {
    navigator.clipboard.writeText(code);
    playTone(1046.5, 'sine', 0.1, 0.05);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center sm:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL CAPABILITY MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            WHAT MONOFORGE CAN DO &amp; WHAT IT HAS
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-sans">
            A comprehensive overview of every tool, feature, and architectural guarantee built into the MonoForge developer ecosystem.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {CAPABILITIES.map((cap) => {
            const isActive = cap.id === activeTab;
            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => handleTabChange(cap.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-102'
                    : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400/50 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <span>{cap.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Card */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column (7 cols): Detailed Explanation, Metrics, Specs */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{activeFeature.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase font-sans tracking-tight">
                  {activeFeature.title}
                </h3>

                <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-bold">
                  &gt; {activeFeature.tagline}
                </p>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {activeFeature.description}
                </p>

                {/* Key Bullet Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {activeFeature.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Specs Table */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 p-4 space-y-2 font-mono text-xs">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                    SPECIFICATION INVARIANTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {activeFeature.specs.map((spec) => (
                      <div key={spec.label} className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">
                          {spec.label}
                        </span>
                        <p className="font-bold text-slate-900 dark:text-white truncate">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link & Try Button */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={activeFeature.ctaHref}
                  onClick={() => playClickSound()}
                  className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs font-mono shadow-md hover:bg-amber-300 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <span>{activeFeature.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/docs"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  <span>TECHNICAL SPECS</span>
                </Link>
              </div>
            </div>

            {/* Right Column (5 cols): Live Interactive Visual Simulation Preview */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-50 dark:bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="uppercase font-bold tracking-wider">LIVE ARTIFACT PREVIEW</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    CAMO VERIFIED
                  </span>
                </div>

                {/* Preview Content based on active feature */}
                {activeFeature.previewType === 'archetypes' && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-amber-600 dark:text-amber-400">3D_CITY_CAT.SVG</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">ARCHETYPE #01</span>
                    </div>
                    <div className="h-32 rounded-xl bg-radial from-slate-900 to-slate-950 p-4 flex items-center justify-center border border-slate-800">
                      <div className="flex items-end gap-1.5 h-20">
                        <div className="w-4 h-12 bg-emerald-500 rounded-t-sm animate-pulse" />
                        <div className="w-4 h-20 bg-emerald-400 rounded-t-sm" />
                        <div className="w-4 h-16 bg-emerald-600 rounded-t-sm" />
                        <div className="w-4 h-8 bg-emerald-300 rounded-t-sm" />
                        <div className="w-4 h-14 bg-amber-400 rounded-t-sm" />
                        <div className="w-4 h-18 bg-emerald-500 rounded-t-sm" />
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 text-center">
                      Isometric skyline built directly from your real GitHub commit history.
                    </p>
                  </div>
                )}

                {activeFeature.previewType === 'vector' && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-cyan-500">CYBER_BOT_V2.SVG</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">60FPS CSS</span>
                    </div>
                    <div className="h-32 rounded-xl bg-slate-950 p-4 flex items-center justify-center border border-slate-800">
                      <svg viewBox="0 0 160 90" className="w-44 h-24">
                        <rect x="40" y="20" width="80" height="50" rx="12" fill="#18181b" stroke="#38bdf8" strokeWidth="2.5" />
                        <circle cx="62" cy="42" r="7" fill="#38bdf8" className="animate-pulse" />
                        <circle cx="98" cy="42" r="7" fill="#38bdf8" className="animate-pulse" />
                        <line x1="80" y1="20" x2="80" y2="8" stroke="#38bdf8" strokeWidth="2.5" />
                        <circle cx="80" cy="6" r="4" fill="#f59e0b" className="animate-ping" />
                        <path d="M70 58 Q80 64 90 58" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                      </svg>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 text-center">
                      Interactive vector bot with antenna beacon and pulse eye oscillators.
                    </p>
                  </div>
                )}

                {activeFeature.previewType === 'telemetry' && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-500">TELEMETRY_STREAM</span>
                      <span className="text-[10px] text-slate-500">LIVE SCRAPE</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
                      <div className="flex justify-between text-slate-300">
                        <span>Current Streak:</span>
                        <span className="text-amber-400 font-bold">142 Days 🔥</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Commit Velocity:</span>
                        <span className="text-emerald-400 font-bold">8.4 / day</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Primary Stack:</span>
                        <span className="text-cyan-400 font-bold">TS, Rust, Go</span>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 text-center">
                      Aggregates 47+ services with zero risk of broken links on GitHub.
                    </p>
                  </div>
                )}

                {activeFeature.previewType === 'resume' && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-500">CONFIRM_GATE.TSX</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-500 font-bold">GATED</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>Experience extracted: Staff Engineer</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>Skills found: TypeScript, Next.js, Docker</span>
                      </div>
                      <div className="text-[10px] text-amber-400 pt-1 font-bold">
                        [WAITING] User approval required before store update
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.previewType === 'sync' && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-500">DIFF_PREVIEW.TSX</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold">OCTOKIT</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-1 text-slate-300">
                      <div className="text-red-400">- ## Old Profile Title</div>
                      <div className="text-emerald-400">+ # Hi, I&apos;m Alex // Full-Stack Architect</div>
                      <div className="text-emerald-400">+ &lt;img src=&quot;camo/city-3d.svg&quot; /&gt;</div>
                      <div className="text-slate-500 pt-1 text-[9px] font-bold">
                        [SAFETY LOCK] Confirm button enabled after manual inspection
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.previewType === 'store' && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-500">ZUSTAND_STORE.TS</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">SINGLE SOURCE</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300 space-y-1">
                      <div>const config = useReadmeStore(s =&gt; s.config);</div>
                      <div className="text-emerald-400">buildMarkdown(config) // Pure functional</div>
                      <div className="text-slate-500">// Wizard &amp; Monaco share 100% state</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Code Snippet Copy */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 truncate text-[11px]">
                  pnpm monoforge generate --archetype {activeFeature.id}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyMarkdown(
                      `pnpm monoforge generate --archetype ${activeFeature.id}`
                    )
                  }
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline shrink-0 ml-2 cursor-pointer flex items-center gap-1"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
