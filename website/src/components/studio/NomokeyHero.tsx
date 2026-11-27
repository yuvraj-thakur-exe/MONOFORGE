'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '#/i18n/navigation';
import {
  Sparkles,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  LayoutTemplate,
  BookOpen,
  Play,
  X,
  BatteryCharging,
  Cpu,
  Flame,
  Zap,
  MessageSquare,
  RotateCw,
  Code2,
  Wand2,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { playClickSound } from '#/lib/sound/sound-effects';
import { TEMPLATES } from '#/lib/templates/catalog';
import { ALL_VISUALIZATION_IDS, FEATURED_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { pluginRegistry } from '#/lib/plugins/registry';
import { useReadmeStore } from '#/store/useReadmeStore';

const TEMPLATE_COUNT = TEMPLATES.length;
const VIZ_TOTAL_COUNT = ALL_VISUALIZATION_IDS.length;
const VIZ_FEATURED_COUNT = FEATURED_VISUALIZATION_IDS.length;
const PLUGIN_COUNT = pluginRegistry.length;

const GITHUB_HANDLE_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

const MONKEY_QUOTES = [
  'Zero monkey business. Pure precision profile engineering.',
  'Compiling 60fps Camo SVGs directly for GitHub Camo CDN.',
  'Monaco IDE split-preview ready. AST-safe schema enforced.',
  `${VIZ_FEATURED_COUNT} featured / ${VIZ_TOTAL_COUNT} total SVG visualizations & ${PLUGIN_COUNT} modular plugins loaded.`,
  'Zero external tracking. Open-source & self-hostable.',
  'Battery charged to 100%. Ready to deploy.',
];

type StudioMode = 'clean' | 'cyber' | 'lofi' | 'hyperspeed';

const ROTATING_HIGHLIGHTS = [
  '60fps Camo Safe SVG vectors & animated characters',
  `${VIZ_FEATURED_COUNT} featured / ${VIZ_TOTAL_COUNT} total SVG visualizations & ${PLUGIN_COUNT} modular plugins with zero external tracking`,
  'Split-screen Monaco IDE with AST Zod validation & live preview',
  '47 verified social icons & tactile badges ready for GitHub CDN',
  `${TEMPLATE_COUNT} signature design archetypes across 12 disciplines`,
];

export function NomokeyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ideQuickStartRef = useRef<HTMLAnchorElement>(null);
  const setGithub = useReadmeStore((state) => state.setGithub);

  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rotate: 0, translateY: 0 });
  const [activeMode, setActiveMode] = useState<StudioMode>('cyber');
  const [cardView, setCardView] = useState<'monkey' | 'preview'>('monkey');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [copiedCli, setCopiedCli] = useState(false);
  const [sparkEffect, setSparkEffect] = useState(false);
  const [bananaFuel, setBananaFuel] = useState<number>(75);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<'detailed' | 'short'>('detailed');
  const [quickHandle, setQuickHandle] = useState('');

  const trimmedHandle = quickHandle.trim().replace(/^@+/, '');
  const isHandleValid = !trimmedHandle || GITHUB_HANDLE_REGEX.test(trimmedHandle);
  const resolvedHandle = trimmedHandle && isHandleValid ? trimmedHandle : 'octocat';

  const handleQuickLaunch = () => {
    playClickSound();
    if (!isHandleValid) {
      toast.error('Please enter a valid GitHub handle (letters, numbers, single hyphens).');
      return;
    }
    setGithub(resolvedHandle);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % ROTATING_HIGHLIGHTS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const clickBanana = () => {
    setBananaFuel((prev) => {
      const next = prev >= 100 ? 25 : prev + 25;
      if (next === 100) {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffe600', '#f59e0b', '#06b6d4', '#10b981'],
          });
        } catch {
          // ignore
        }
        toast.success('BANANA BATTERY CHARGED TO 100%! MAXIMUM POWER!');
      } else {
        toast(`Banana Fuel: ${next}% Charged`);
      }
      return next;
    });
    setQuoteIdx((prev) => (prev + 1) % MONKEY_QUOTES.length);
    setSparkEffect(true);
    setTimeout(() => setSparkEffect(false), 500);
  };

  // Mouse coordinate tracking relative to the monkey face center
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxPupilDist = 8;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 25, maxPupilDist);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });

      setHeadTilt({
        rotate: Math.max(-6, Math.min(6, deltaX / 80)),
        translateY: Math.max(-4, Math.min(4, deltaY / 100)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % MONKEY_QUOTES.length);
    setSparkEffect(true);
    setTimeout(() => setSparkEffect(false), 500);
  };

  const copyCliCommand = () => {
    navigator.clipboard.writeText('npx github:yuvraj-thakur-exe/MONOFORGE generate --username octocat');
    setCopiedCli(true);
    toast.success('CLI command copied to clipboard!');
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 transition-colors duration-300">
      {/* Subtle fine technical grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Warm Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ffe600]/[0.10] dark:bg-[#ffe600]/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Pre-header Studio Badge: Properly Paired Text */}
        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-4 py-2 rounded-2xl border-2 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[3px_3px_0px_#334155] text-xs font-mono font-bold tracking-tight">
            <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-400" />
              <span>Forge a GitHub profile that gets noticed</span>
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-black select-none">•</span>
            <span className="flex items-center gap-1.5 text-cyan-800 dark:text-cyan-200 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>60fps Camo CDN vectors</span>
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-black select-none">•</span>
            <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-200 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Zero external tracking</span>
            </span>
          </div>
        </div>

        {/* Main Grid: Headline + Interactive Monkey Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Typographic Statement */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#ffe600] text-slate-900 border-2 border-slate-800 font-mono text-xs font-black tracking-widest uppercase shadow-[2px_2px_0px_#334155]">
                <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                <span>THE NEXT-GEN GITHUB PROFILE ENGINE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.98] uppercase font-sans text-slate-900 dark:text-white">
                YOUR GITHUB PROFILE.<br className="hidden sm:inline" />
                <span className="relative inline-block text-slate-900 bg-[#ffe600] px-2 rounded-lg border-2 border-slate-800 shadow-[3px_3px_0px_#334155] rotate-[-1deg] my-1">
                  FORGED
                </span>{' '}
                TO STAND OUT.
              </h1>
            </div>

            {/* High-Performance Capability Description */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
              Create a professional GitHub profile README with a{' '}
              <span className="font-bold text-slate-900 dark:text-white decoration-[#ffe600] underline decoration-2 underline-offset-4">
                visual editor
              </span>
              ,{' '}
              <span className="font-bold text-slate-900 dark:text-white decoration-[#ffe600] underline decoration-2 underline-offset-4">
                live previews
              </span>
              ,{' '}
              <span className="font-bold text-slate-900 dark:text-white decoration-[#ffe600] underline decoration-2 underline-offset-4">
                developer statistics
              </span>
              ,{' '}
              <span className="font-bold text-slate-900 dark:text-white decoration-[#ffe600] underline decoration-2 underline-offset-4">
                animated SVGs
              </span>
              , and{' '}
              <span className="font-bold text-slate-900 dark:text-white decoration-[#ffe600] underline decoration-2 underline-offset-4">
                customizable templates
              </span>
              . Build your{' '}
              <span className="font-bold text-slate-900 dark:text-white decoration-[#ffe600] underline decoration-2 underline-offset-4">
                developer identity
              </span>{' '}
              without manually wrestling with Markdown.
            </p>

            {/* Kinetic Typewriter / Dynamic Engine Status Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-800 dark:border-slate-700 shadow-[2px_2px_0px_#334155] text-xs font-mono font-bold text-slate-900 dark:text-slate-100 overflow-hidden max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-[#ffe600] text-slate-900 border border-slate-800 shrink-0">
                LIVE STATUS
              </span>
              <span className="truncate transition-all duration-300">
                {ROTATING_HIGHLIGHTS[highlightIdx]}
              </span>
              <span className="w-1.5 h-3.5 bg-slate-800 dark:bg-amber-400 animate-pulse shrink-0" />
            </div>

            {/* 1-Click Quick-Start Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isHandleValid) {
                  toast.error('Invalid GitHub handle format.');
                  return;
                }
                handleQuickLaunch();
                ideQuickStartRef.current?.click();
              }}
              className="rounded-2xl border-2 border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 p-3 sm:p-4 shadow-[4px_4px_0px_#334155] space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 uppercase">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick-Start With Your GitHub Handle</span>
                </span>
                <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400">
                  1-Click Launch
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm font-black text-slate-500 dark:text-slate-400 select-none">
                    @
                  </span>
                  <input
                    type="text"
                    value={quickHandle}
                    onChange={(e) => setQuickHandle(e.target.value)}
                    aria-label="Enter GitHub handle"
                    placeholder="Enter GitHub handle (e.g. octocat)"
                    className={`w-full pl-7 pr-3 py-2.5 rounded-xl border-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 font-mono text-xs font-bold focus:outline-hidden ${
                      isHandleValid
                        ? 'border-slate-300 dark:border-slate-600 focus:border-amber-400'
                        : 'border-red-500 focus:border-red-500'
                    }`}
                  />
                </div>

                <Link
                  ref={ideQuickStartRef}
                  href={`/developer?user=${encodeURIComponent(resolvedHandle)}`}
                  onClick={handleQuickLaunch}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-mono text-xs font-black border-2 border-slate-800 shadow-[2px_2px_0px_#334155] transition-all cursor-pointer shrink-0"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Open in Developer IDE</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <Link
                  href={`/wizard?user=${encodeURIComponent(resolvedHandle)}`}
                  onClick={handleQuickLaunch}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-600 transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Open Wizard</span>
                </Link>

                <Link
                  href={`/visualizer?user=${encodeURIComponent(resolvedHandle)}`}
                  onClick={handleQuickLaunch}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-600 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Preview Visualizer</span>
                </Link>

                {!isHandleValid && (
                  <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Invalid GitHub username format</span>
                  </span>
                )}
              </div>
            </form>

            {/* Action Buttons: Tactile Slate & Amber Style */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Primary Action */}
              <Link
                href="/templates"
                onClick={() => playClickSound()}
                data-cursor-label="TEMPLATES"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-black text-sm tracking-wide border-2 border-slate-800 shadow-[4px_4px_0px_#334155] hover:shadow-[2px_2px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 btn-tactile cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-900 group-hover:rotate-12 transition-transform" />
                <span>BUILD MY PROFILE</span>
                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Templates Vault */}
              <Link
                href="/templates"
                onClick={() => playClickSound()}
                data-cursor-label="TEMPLATES"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm tracking-wide border-2 border-slate-800 dark:border-slate-600 shadow-[3px_3px_0px_#334155] hover:shadow-[1px_1px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 btn-tactile hover:bg-[#ffe600] hover:text-slate-900 cursor-pointer"
              >
                <LayoutTemplate className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{TEMPLATE_COUNT} TEMPLATES</span>
              </Link>

              {/* Watch Launch Video */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setVideoModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#ffe600] font-mono text-xs font-bold border-2 border-slate-800 shadow-[3px_3px_0px_#334155] transition-all btn-tactile cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-[#ffe600] text-[#ffe600]" />
                <span>WATCH FILM</span>
              </button>

              {/* Documentation Website */}
              <Link
                href="/docs"
                onClick={() => playClickSound()}
                data-cursor-label="DOCS"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#ffe600] hover:text-slate-900 text-slate-900 dark:text-white font-mono text-xs font-bold border-2 border-slate-800 dark:border-slate-600 shadow-[2px_2px_0px_#334155] transition-colors btn-tactile cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>DOCS</span>
              </Link>
            </div>

            {/* Quick Terminal Copy Bar */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 p-1.5 pl-3 rounded-lg bg-slate-900 border-2 border-slate-700 text-xs font-mono text-white max-w-full overflow-hidden shadow-[2px_2px_0px_#334155]">
                <Terminal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-slate-400 select-none">$</span>
                <span className="truncate font-semibold text-slate-200">
                  npx github:yuvraj-thakur-exe/MONOFORGE generate -u &lt;you&gt;
                </span>
                <button
                  type="button"
                  onClick={copyCliCommand}
                  aria-label="Copy CLI command"
                  className="p-1.5 ml-2 rounded bg-slate-800 hover:bg-[#ffe600] hover:text-slate-900 text-slate-200 border border-slate-700 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedCli ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Geometric Monkey Companion */}
          <div className="lg:col-span-5 relative" ref={containerRef}>
            {/* Clean Floating Badge */}
            <div className="absolute -top-7 right-0 z-20 hidden sm:block">
              <div className="px-2.5 py-1 rounded-lg bg-[#ffe600] text-slate-900 border-2 border-slate-800 font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#334155] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>100% ZERO JS &bull; 60FPS CAMO</span>
              </div>
            </div>

            {/* View Switcher: Interactive Companion vs Generated README Preview */}
            <div className="flex items-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => setCardView('monkey')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-black border-2 border-slate-800 dark:border-slate-700 transition-all cursor-pointer btn-tactile ${
                  cardView === 'monkey'
                    ? 'bg-[#ffe600] text-slate-900 shadow-[2px_2px_0px_#334155]'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-[#ffe600] hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>MONKEY CORE</span>
              </button>
              <button
                type="button"
                onClick={() => setCardView('preview')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-black border-2 border-slate-800 dark:border-slate-700 transition-all cursor-pointer btn-tactile ${
                  cardView === 'preview'
                    ? 'bg-[#ffe600] text-slate-900 shadow-[2px_2px_0px_#334155]'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-[#ffe600] hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>GENERATED PROFILE</span>
              </button>
            </div>

            <div className="relative rounded-2xl border-2 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-[6px_6px_0px_#334155] dark:shadow-[6px_6px_0px_#475569] overflow-hidden transition-all duration-200">
              {cardView === 'preview' ? (
                /* Generated Profile Preview Mode */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 border border-slate-700" />
                      <span className="w-3 h-3 rounded-full bg-[#ffe600] border border-slate-700" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border border-slate-700" />
                      <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 ml-1">
                        github.com/developer/developer/README.md
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#ffe600] text-slate-900 text-[10px] font-mono font-black border border-slate-800">
                      LIVE PREVIEW
                    </span>
                  </div>

                  {/* Profile Header Card */}
                  <div className="p-4 sm:p-5 rounded-xl border-2 border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden shadow-[3px_3px_0px_#334155]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffe600] text-slate-900 font-mono text-[10px] font-black border border-slate-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>FULL-STACK ARCHITECT // SYSTEMS</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-slate-900 dark:text-white uppercase">
                          ALEXANDER FORGE
                        </h3>
                        <p className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed w-full">
                          Architecting distributed systems, zero-dependency CLIs, and 60fps GPU web applications.
                        </p>
                      </div>
                      <img
                        src="/assets/monoforge-monkey-logo-256.jpg"
                        srcSet="/assets/monoforge-monkey-logo-256.jpg 1x, /assets/monoforge-monkey-logo-512.jpg 2x"
                        alt="Avatar"
                        width={64}
                        height={64}
                        loading="eager"
                        decoding="async"
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_#334155] shrink-0"
                      />
                    </div>
                  </div>

                  {/* Voxel & Telemetry Strip */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-mono">
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase block font-bold">COMMITS</span>
                      <span className="text-base font-black text-slate-900 dark:text-white">2,847</span>
                    </div>
                    <div className="p-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-mono">
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase block font-bold">STREAK</span>
                      <span className="text-base font-black text-amber-600 dark:text-amber-400 inline-flex items-center justify-center gap-1">
                        <span>42 days</span>
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-mono">
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase block font-bold">PERCENTILE</span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">TOP 2%</span>
                    </div>
                  </div>

                  {/* Stack Badges */}
                  <div className="p-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1.5 font-mono">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block">CORE TECH STACK</span>
                    <div className="flex flex-wrap gap-1">
                      {['TypeScript', 'Rust', 'Go', 'Next.js', 'Docker', 'GraphQL'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-bold border border-slate-300 dark:border-slate-700 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t-2 border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                    <span className="text-slate-500 dark:text-slate-400 font-bold">100% CAMO CDN SAFE</span>
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-1 font-black text-amber-700 dark:text-amber-400 hover:text-amber-600 underline"
                    >
                      <span>CUSTOMIZE THIS &rarr;</span>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Interactive Cyber Monkey Workstation View */
                <>
                  {/* Studio Card Header: Mode Switcher */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 border border-slate-700" />
                      <span className="w-3 h-3 rounded-full bg-[#ffe600] border border-slate-700" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border border-slate-700" />
                      <span className="text-[11px] font-mono font-black text-slate-900 dark:text-white ml-1">
                        MONKEY_CORE
                      </span>
                    </div>

                    {/* Mode Selector Pills */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border-2 border-slate-800 dark:border-slate-700 text-[10px] font-mono font-bold shadow-2xs">
                      {(['clean', 'cyber', 'lofi', 'hyperspeed'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setActiveMode(mode)}
                          className={`px-2 py-1 rounded transition-all cursor-pointer btn-tactile ${
                            activeMode === mode
                              ? 'bg-[#ffe600] text-slate-900 font-black border border-slate-800 shadow-xs'
                              : 'bg-transparent text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {mode === 'lofi' ? 'LO-FI' : mode === 'hyperspeed' ? 'WARP' : mode.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Banana Battery */}
                  <button
                    type="button"
                    onClick={clickBanana}
                    className="w-full text-left cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-700 text-xs font-mono font-bold hover:border-[#ffe600] transition-all mb-4 group select-none shadow-[2px_2px_0px_#334155] active:scale-[0.98]"
                    title="Click to recharge companion battery!"
                  >
                    <div className="flex items-center gap-2">
                      <BatteryCharging className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-black uppercase text-slate-900 dark:text-white">
                        BANANA BATTERY
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-20 h-2.5 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden border-2 border-slate-800 dark:border-slate-700">
                        <div
                          className="h-full bg-[#ffe600] transition-all duration-300"
                          style={{ width: `${bananaFuel}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">
                        {bananaFuel}%
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[9px] px-2 py-0.5 rounded bg-[#ffe600] text-slate-900 font-black border border-slate-800 shadow-2xs group-hover:scale-105 transition-transform">
                        <span>CHARGE</span>
                        <Zap className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </button>

                  {/* Speech Bubble: Click to cycle quotes */}
                  <button
                    type="button"
                    onClick={triggerQuote}
                    className="w-full text-left cursor-pointer mb-5 p-3.5 rounded-xl bg-[#fffde6] dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-600 text-xs font-mono text-slate-900 dark:text-slate-100 relative group transition-all hover:border-amber-500 shadow-[3px_3px_0px_#334155]"
                    title="Click to cycle companion insights"
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <p className="flex-1 italic tracking-tight select-none font-bold text-slate-900 dark:text-slate-100">
                        &ldquo;{MONKEY_QUOTES[quoteIdx]}&rdquo;
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-800 dark:border-slate-600 text-slate-900 dark:text-white group-hover:bg-[#ffe600] group-hover:text-slate-900 shrink-0">
                        <span>NEXT</span>
                        <RotateCw className="w-2.5 h-2.5" />
                      </span>
                    </div>
                    <div className="absolute -bottom-2 left-12 w-3.5 h-3.5 bg-[#fffde6] dark:bg-slate-800 border-b-2 border-r-2 border-slate-800 dark:border-slate-600 rotate-45" />
                  </button>

                  {/* The Monkey Companion Canvas */}
                  <div
                    className="relative mx-auto flex items-center justify-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-800 dark:border-slate-700 select-none overflow-hidden cursor-pointer"
                    style={{ minHeight: '280px' }}
                    onClick={triggerQuote}
                  >
                    {activeMode === 'cyber' && (
                      <>
                        <div
                          className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] opacity-15 pointer-events-none"
                          style={{ backgroundSize: '16px 16px' }}
                        />
                        <div className="absolute top-2 left-2 text-[9px] font-mono text-amber-600 dark:text-amber-400">
                          HUD // LOCK_ON: TRUE
                        </div>
                        <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-600 dark:text-cyan-400">
                          FPS: 60 // CAMO: PASS
                        </div>
                        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-500 dark:text-slate-400">
                          POS_X: {Math.round(pupilOffset.x * 10)} / POS_Y: {Math.round(pupilOffset.y * 10)}
                        </div>
                      </>
                    )}

                    {activeMode === 'hyperspeed' && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />
                        <div className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse delay-100" />
                        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse delay-200" />
                      </div>
                    )}

                    <div
                      className="relative transition-transform duration-100 ease-out will-change-transform cursor-pointer"
                      style={{
                        transform: `rotate(${headTilt.rotate}deg) translateY(${headTilt.translateY}px) scale(${sparkEffect ? 1.06 : 1})`,
                      }}
                    >
                      <img
                        src="/assets/monoforge-monkey-logo-256.jpg"
                        srcSet="/assets/monoforge-monkey-logo-256.jpg 1x, /assets/monoforge-monkey-logo-512.jpg 2x"
                        alt="MonoForge Official Logo"
                        width={220}
                        height={220}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-2xl border-2 border-slate-800 shadow-[4px_4px_0px_#334155] bg-white select-none pointer-events-none"
                      />
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#ffe600] text-slate-900 text-[10px] font-mono font-black border border-slate-800 shadow-xs">
                        OFFICIAL
                      </span>
                    </div>
                  </div>

                  {/* Studio Bottom Bar */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>INTERACTIVE COMPANION</span>
                    </span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {activeMode.toUpperCase()} MODE ACTIVE
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Launch Modal */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="MonoForge Launch Video"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md animate-fade-in"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffe600] p-1 flex items-center justify-center">
                  <img
                    src="/assets/logo-icon.svg"
                    alt="MonoForge Monkey"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white font-sans tracking-wide uppercase flex items-center gap-2">
                    <span>MONOFORGE LAUNCH FILM</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ffe600]/10 text-[#ffe600] border border-[#ffe600]/30">
                      OFFICIAL 4K
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    The Developer Identity &amp; Profile Engineering Studio Walkthrough
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveVideo('detailed')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeVideo === 'detailed'
                        ? 'bg-[#ffe600] text-slate-900 font-black'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Walkthrough (67s)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveVideo('short')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeVideo === 'short'
                        ? 'bg-[#ffe600] text-slate-900 font-black'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Short (25s)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player Stage */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
              <video
                key={activeVideo}
                controls
                autoPlay
                playsInline
                poster={
                  activeVideo === 'detailed'
                    ? '/assets/videos/monoforge-detailed-poster.jpg'
                    : '/assets/videos/monoforge-short-poster.jpg'
                }
                className="w-full h-full object-contain"
              >
                <source
                  src={
                    activeVideo === 'detailed'
                      ? '/assets/videos/monoforge-detailed-launch-long.mp4'
                      : '/assets/videos/monoforge-social-launch-short.mp4'
                  }
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Modal Footer Meta */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {TEMPLATE_COUNT} Templates Live
                </span>
                <span>&bull;</span>
                <span className="text-cyan-400">
                  {VIZ_FEATURED_COUNT} Featured / {VIZ_TOTAL_COUNT} Total Visualizations &bull; {PLUGIN_COUNT} Modular Plugins
                </span>
                <span>&bull;</span>
                <span>Local-First Profile Compiler</span>
              </div>
              <span className="text-slate-400">monoforge-studio.vercel.app</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
