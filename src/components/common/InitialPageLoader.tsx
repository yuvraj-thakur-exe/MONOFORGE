'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { GeometricLoader, type GeometricLoaderMode } from './GeometricLoader';
import {
  playWelcomeChord,
  playClickSound,
  playTone,
  isSoundEnabled,
  setSoundEnabled,
} from '#/lib/sound/sound-effects';
import {
  Sparkles,
  FastForward,
  Volume2,
  VolumeX,
  Palette,
  ShieldCheck,
  Code2,
  Bot,
  BarChart3,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export interface LoaderThemeOption {
  id: string;
  name: string;
  hex: string;
  gradient: string;
  glow: string;
}

const THEME_ACCENTS: LoaderThemeOption[] = [
  {
    id: 'amber',
    name: 'Solar Amber',
    hex: '#f59e0b',
    gradient: 'from-amber-500 via-amber-400 to-yellow-400',
    glow: 'rgba(245, 158, 11, 0.4)',
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    hex: '#8b5cf6',
    gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    glow: 'rgba(139, 92, 246, 0.4)',
  },
  {
    id: 'emerald',
    name: 'Matrix Emerald',
    hex: '#10b981',
    gradient: 'from-emerald-600 via-emerald-500 to-teal-400',
    glow: 'rgba(16, 185, 129, 0.4)',
  },
  {
    id: 'cyan',
    name: 'Neon Cyan',
    hex: '#06b6d4',
    gradient: 'from-cyan-500 via-sky-400 to-blue-500',
    glow: 'rgba(6, 182, 212, 0.4)',
  },
  {
    id: 'rose',
    name: 'Hyper Rose',
    hex: '#f43f5e',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    glow: 'rgba(244, 63, 94, 0.4)',
  },
];

interface EnginePhase {
  step: number;
  timeRange: string;
  title: string;
  subtitle: string;
  icon: typeof Cpu;
}

const ENGINE_PHASES: EnginePhase[] = [
  {
    step: 1,
    timeRange: '0s - 4s',
    title: 'Initializing Profile README Engine',
    subtitle: 'Connecting GitHub REST API & deterministic Zod schema validation pipelines',
    icon: Cpu,
  },
  {
    step: 2,
    timeRange: '4s - 8s',
    title: 'Compiling 60fps Vector Kinematics',
    subtitle: 'Generating Camo-safe SVG avatars (Cyber Bot, Ninja Coder, Pixel Dev desk)',
    icon: Bot,
  },
  {
    step: 3,
    timeRange: '8s - 12s',
    title: 'Hydrating 18+ Profile Archetypes',
    subtitle: 'Loading Bento grids, Neobrutalist layouts, Tokyo Night, and Minimalist themes',
    icon: Palette,
  },
  {
    step: 4,
    timeRange: '12s - 16s',
    title: 'Calibrating 47+ Scraped Telemetry Cards',
    subtitle: 'Wiring contribution heatmaps, streak counters, and habit radars with 0 external tracking',
    icon: BarChart3,
  },
  {
    step: 5,
    timeRange: '16s - 20s',
    title: 'Synchronizing Monaco AST IDE & Markdown Pipeline',
    subtitle: 'Verifying pure buildMarkdown(config) generator with zero parallel state drift',
    icon: Code2,
  },
];

interface WebFeature {
  id: string;
  title: string;
  desc: string;
  badge: string;
}

const WEB_FEATURES: WebFeature[] = [
  {
    id: 'archetypes',
    title: '18+ Visual Archetypes',
    desc: 'Bento, Cyberpunk, Neobrutalism, Minimalist, Tokyo Night & Terminal layouts.',
    badge: '1-CLICK APPLY',
  },
  {
    id: 'vectors',
    title: '60fps Camo Vectors',
    desc: 'Self-contained SVGs with CSS keyframes, zero foreignObject, and dark/light support.',
    badge: 'CAMO CDN SAFE',
  },
  {
    id: 'telemetry',
    title: '47+ Telemetry Cards',
    desc: 'Streak badges, habit radars, Spotify now-playing & LeetCode stats without external trackers.',
    badge: 'ZERO TRACKING',
  },
  {
    id: 'monaco',
    title: 'Monaco AST IDE',
    desc: 'Bi-directional live editor with Zod schema validation and authenticated GitHub commit sync.',
    badge: 'DIRECT PUSH',
  },
];

const TOTAL_DURATION_MS = 20000; // Exact 20 seconds duration

export function InitialPageLoader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activeTheme, setActiveTheme] = useState<LoaderThemeOption>(THEME_ACCENTS[0]);
  const [activeShape, setActiveShape] = useState<GeometricLoaderMode>('triple');
  const [selectedFeature, setSelectedFeature] = useState<string>('archetypes');
  const [soundActive, setSoundActive] = useState(true);
  const [visible, setVisible] = useState(true);
  const [rendered, setRendered] = useState(true);

  const finishedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const completeLoading = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);
    setElapsedSeconds(20);

    // Audio chime on 100% completion
    playWelcomeChord();

    try {
      sessionStorage.setItem('monoforge_loaded', 'true');
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setRendered(false);
      }, 500);
    }, 450);
  }, []);

  const handleFastLaunch = useCallback(() => {
    playClickSound();
    completeLoading();
  }, [completeLoading]);

  // Handle color accent switch
  const handleColorSwitch = (theme: LoaderThemeOption) => {
    setActiveTheme(theme);
    playTone(520, 'sine', 0.1, 0.04);
  };

  // Handle shape switch
  const handleShapeSwitch = (shape: GeometricLoaderMode) => {
    setActiveShape(shape);
    playClickSound();
  };

  // Handle feature card click
  const handleFeatureClick = (id: string) => {
    setSelectedFeature(id);
    playClickSound();
  };

  // Handle sound toggle
  const handleSoundToggle = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) {
      playTone(660, 'sine', 0.12, 0.05);
    }
  };

  // Run the 20-second progress bar
  useEffect(() => {
    setMounted(true);
    setSoundActive(isSoundEnabled());

    const startTime = performance.now();

    const tick = (now: number) => {
      if (finishedRef.current) return;

      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / TOTAL_DURATION_MS) * 100), 99);
      const seconds = Math.min(Math.floor(elapsed / 1000), 20);

      setProgress(pct);
      setElapsedSeconds(seconds);

      // Soft milestone tone every 4 seconds (at phases 1, 2, 3, 4)
      if (seconds > 0 && seconds % 4 === 0 && seconds < 20) {
        const stepIdx = Math.floor(seconds / 4);
        if (Math.abs(elapsed - seconds * 1000) < 50) {
          playTone(480 + stepIdx * 100, 'sine', 0.08, 0.02);
        }
      }

      if (elapsed >= TOTAL_DURATION_MS) {
        completeLoading();
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    // Keyboard listener for instant skip (Esc or Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleFastLaunch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [completeLoading, handleFastLaunch]);

  if (!mounted || !rendered) return null;

  // Calculate current active phase (0 to 4) based on elapsed seconds (0-20s)
  const currentPhaseIndex = Math.min(Math.floor(elapsedSeconds / 4), 4);
  const currentPhase = ENGINE_PHASES[currentPhaseIndex];
  const PhaseIcon = currentPhase.icon;
  const remainingSeconds = Math.max(0, 20 - elapsedSeconds);

  return (
    <div
      aria-hidden={!visible}
      role="status"
      aria-label="MonoForge Interactive Studio Loader"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 bg-slate-50/95 dark:bg-[#0a0b10]/95 backdrop-blur-2xl transition-all duration-500 ease-out select-none ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {/* 1. Top Header Bar: Clean Branding & Quick Actions */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#ffe600] text-neutral-950 flex items-center justify-center font-black text-sm border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm text-slate-900 dark:text-white tracking-wider uppercase">
                MONOFORGE
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold border border-amber-400/30">
                PROFILE STUDIO
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Interactive Profile Engine Initializer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Audio toggle button */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-neutral-900 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold shadow-[2px_2px_0px_#18181b] hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
            title={soundActive ? 'Mute synthesized audio' : 'Unmute audio effects'}
          >
            {soundActive ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span className="hidden sm:inline">{soundActive ? 'SOUND ON' : 'MUTED'}</span>
          </button>

          {/* Fast Launch / Skip button */}
          <button
            type="button"
            onClick={handleFastLaunch}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-neutral-900 bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black shadow-[3px_3px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            title="Skip loading and jump straight into the studio (Esc)"
          >
            <span>FAST LAUNCH</span>
            <FastForward className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
          </button>
        </div>
      </header>

      {/* 2. Main Center Card: Luminous, Clean, Interactive Studio Loader */}
      <main className="w-full max-w-3xl my-auto py-4">
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border-2 border-neutral-900 shadow-[8px_8px_0px_#18181b] flex flex-col items-center gap-6 relative overflow-hidden transition-all duration-300">
          {/* Subtle luminous background glow tuned to activeTheme */}
          <div
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none transition-all duration-700"
            style={{ backgroundColor: activeTheme.glow }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none transition-all duration-700"
            style={{ backgroundColor: activeTheme.glow }}
          />

          {/* Top Status & Shape Switcher */}
          <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeTheme.hex }} />
              <span className="font-mono text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <PhaseIcon className="w-3.5 h-3.5" style={{ color: activeTheme.hex }} />
                <span>PHASE 0{currentPhase.step} / 05</span>
              </span>
            </div>

            {/* Interactive Shape Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-[11px] font-bold">
              {(['triple', 'circle', 'triangle', 'rect'] as GeometricLoaderMode[]).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => handleShapeSwitch(shape)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer capitalize ${
                    activeShape === shape
                      ? 'bg-neutral-900 text-white shadow-xs font-black dark:bg-white dark:text-neutral-900'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {shape === 'triple' ? 'Triple' : shape}
                </button>
              ))}
            </div>
          </div>

          {/* Centered Geometric Loader with activeTheme Dot Color */}
          <div className="relative z-10 py-3 flex flex-col items-center justify-center">
            <div
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center transition-all duration-300"
              style={{ boxShadow: `0 0 24px ${activeTheme.glow}` }}
            >
              <GeometricLoader
                mode={activeShape}
                size="lg"
                dotColor={activeTheme.hex}
                pathColor="currentColor"
              />
            </div>
          </div>

          {/* Interactive Accent Palette Chooser: Lets user interact with loader hues */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
            <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>THEME HUE:</span>
            </span>
            {THEME_ACCENTS.map((theme) => {
              const isActive = activeTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleColorSwitch(theme)}
                  className={`group relative flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold border transition-all cursor-pointer ${
                    isActive
                      ? 'border-neutral-900 dark:border-white shadow-[2px_2px_0px_#18181b] scale-105 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                  title={`Switch loader accent to ${theme.name}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-xs"
                    style={{ backgroundColor: theme.hex }}
                  />
                  <span>{theme.name}</span>
                </button>
              );
            })}
          </div>

          {/* Current Web Milestone Display */}
          <div className="relative z-10 w-full text-center space-y-1.5 px-2">
            <div className="flex items-center justify-between font-mono text-xs font-black text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5 text-left" style={{ color: activeTheme.hex }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="truncate">{currentPhase.title}</span>
              </span>
              <span className="text-base font-black tracking-tight shrink-0 pl-2">
                {progress}%
              </span>
            </div>

            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 text-left line-clamp-1">
              {currentPhase.subtitle}
            </p>

            {/* The 20-Second Loading Bar Track */}
            <div className="w-full pt-2">
              <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-neutral-900 overflow-hidden relative shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${activeTheme.gradient} rounded-full transition-all duration-100 ease-out shadow-sm`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Timing telemetry: Elapsed vs Total 20 Seconds */}
              <div className="flex items-center justify-between pt-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-bold">
                  Elapsed: 00:{elapsedSeconds.toString().padStart(2, '0')}s / 00:20s
                </span>
                <span className="font-bold" style={{ color: activeTheme.hex }}>
                  {remainingSeconds > 0 ? `${remainingSeconds}s remaining` : 'Launching studio...'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Web Capabilities Spotlight (Related directly to MonoForge) */}
          <div className="relative z-10 w-full border-t border-slate-200 dark:border-slate-800 pt-4">
            <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
              <span>EXPLORE WHAT MONOFORGE CRUCIAL ENGINES PROVIDE:</span>
              <span className="text-[10px] text-slate-400">(Click to preview)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
              {WEB_FEATURES.map((feature) => {
                const isSelected = selectedFeature === feature.id;
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => handleFeatureClick(feature.id)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'border-neutral-900 dark:border-slate-300 bg-slate-50 dark:bg-slate-800/80 shadow-[3px_3px_0px_#18181b]'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                        {feature.title}
                      </span>
                      <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {feature.badge}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                      {feature.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Bottom Footer Bar: Camo Safe Notice & Shortcut */}
      <footer className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="font-bold text-slate-700 dark:text-slate-300">
            100% GitHub Camo CDN Safe • Zero External Script Injection
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span>Tip: Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700 shadow-2xs">
            Esc
          </kbd>
          <span>or</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700 shadow-2xs">
            Space
          </kbd>
          <span>to enter studio instantly</span>
        </div>
      </footer>
    </div>
  );
}