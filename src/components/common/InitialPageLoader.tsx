'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { GeometricLoader } from './GeometricLoader';
import { playWelcomeChord, playClickSound, playTone } from '#/lib/sound/sound-effects';
import {
  Terminal,
  CheckCircle2,
  Cpu,
  Volume2,
  Sparkles,
  FastForward,
  Flame,
  ShieldCheck,
  Bot,
  Activity,
} from 'lucide-react';

interface ContentStep {
  step: string;
  tag: string;
  title: string;
  detail: string;
  delay: number;
}

const CONTENT_STEPS: ContentStep[] = [
  {
    step: '01',
    tag: 'VOXEL_3D',
    title: 'Extruding 3D GitHub Contribution Skyline',
    detail: 'Generating isometric commits voxel mesh with GitHub Camo safety...',
    delay: 150,
  },
  {
    step: '02',
    tag: 'VECTORS_60FPS',
    title: 'Compiling 60fps CSS Vector Kinematics',
    detail: 'Injecting Cyber Bot beacons, Pixel Dev desk motion, and Matrix rain...',
    delay: 450,
  },
  {
    step: '03',
    tag: 'TELEMETRY_RADAR',
    title: 'Mounting 47+ Scraped Stats & Habit Radars',
    detail: 'Calibrating streak counters, Spotify now-playing, and LeetCode ratings...',
    delay: 800,
  },
  {
    step: '04',
    tag: 'AST_COMPILER',
    title: 'Synchronizing Monaco IDE with Zod Schemas',
    detail: 'Zero parallel state. Verifying buildMarkdown(config) deterministic pipeline...',
    delay: 1150,
  },
  {
    step: '05',
    tag: 'FORGE_ONLINE',
    title: 'Developer Identity Engine Nominal',
    detail: 'All systems verified. Ready to forge an iconic GitHub profile.',
    delay: 1500,
  },
];

export const REPLAY_WELCOME_EVENT = 'monoforge:replay-welcome';

/**
 * Global trigger to replay the cinematic welcome loader anytime from any button or component.
 */
export function replayWelcomeLoader(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem('monoforge_loaded');
  } catch {
    // Ignore
  }
  window.dispatchEvent(new CustomEvent(REPLAY_WELCOME_EVENT));
}

/**
 * Content-Related Welcome Loader featuring:
 * - 3D Contribution Skyline & Cyber Bot vector forging animation
 * - Real-time content telemetry steps (3D City, 60fps Camo Vectors, 47+ Telemetry, Monaco AST)
 * - Harmonic Web Audio chords & progress bar
 * - Fast Launch bypass & replayable anytime
 */
export function InitialPageLoader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [logs, setLogs] = useState<ContentStep[]>([]);
  const [visible, setVisible] = useState(true);
  const [rendered, setRendered] = useState(true);
  const finishedRef = useRef(false);
  const activeTimersRef = useRef<Array<() => void>>([]);

  const clearAllTimers = useCallback(() => {
    activeTimersRef.current.forEach((clear) => clear());
    activeTimersRef.current = [];
  }, []);

  const completeLoading = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);

    // Play celebratory audio chime
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
      }, 450);
    }, 400);
  }, []);

  const startCinematic = useCallback(() => {
    clearAllTimers();
    finishedRef.current = false;
    setProgress(0);
    setActiveStepIdx(0);
    setLogs([]);
    setVisible(true);
    setRendered(true);

    const startTime = Date.now();
    const duration = 1800; // 1.8s smooth duration

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 99);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
        completeLoading();
      }
    }, 35);

    activeTimersRef.current.push(() => clearInterval(progressInterval));

    CONTENT_STEPS.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setActiveStepIdx(idx);
        setLogs((prev) => [...prev, step]);
        playTone(600 + idx * 120, 'sine', 0.08, 0.03);
      }, step.delay);
      activeTimersRef.current.push(() => clearTimeout(timer));
    });
  }, [clearAllTimers, completeLoading]);

  const handleSkip = () => {
    playClickSound();
    completeLoading();
  };

  useEffect(() => {
    setMounted(true);

    // Listen for replay requests
    const handleReplay = () => {
      startCinematic();
    };
    window.addEventListener(REPLAY_WELCOME_EVENT, handleReplay);

    let alreadyVisited = false;
    try {
      alreadyVisited = sessionStorage.getItem('monoforge_loaded') === 'true';
    } catch {
      alreadyVisited = false;
    }

    if (alreadyVisited) {
      // Fast bypass on returning tabs
      const fastTimer = setTimeout(() => {
        completeLoading();
      }, 300);
      return () => {
        clearTimeout(fastTimer);
        window.removeEventListener(REPLAY_WELCOME_EVENT, handleReplay);
      };
    }

    startCinematic();

    return () => {
      clearAllTimers();
      window.removeEventListener(REPLAY_WELCOME_EVENT, handleReplay);
    };
  }, [clearAllTimers, completeLoading, startCinematic]);

  if (!mounted || !rendered) return null;

  const currentStep = CONTENT_STEPS[activeStepIdx] || CONTENT_STEPS[0];

  return (
    <div
      aria-hidden={!visible}
      role="status"
      aria-label="Welcome Loading"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-8 bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-md transition-all duration-500 ease-out select-none ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'
      }`}
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md border border-neutral-900">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 dark:text-white tracking-widest uppercase text-xs">
              MONOFORGE // PROFILE FORGE KERNEL
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">
              CONTENT &amp; ASSET COMPILATION ENGINE
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-neutral-900 bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-bold text-xs shadow-[2px_2px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
        >
          <span>FAST LAUNCH</span>
          <FastForward className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
        </button>
      </div>

      {/* Center Cinematic Stage: Real Content-Themed Visual Simulation */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-5 my-auto">
        {/* Animated Visual Stage showcasing real MonoForge Content Assets */}
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border-2 border-neutral-900 shadow-[6px_6px_0px_#18181b] flex flex-col items-center gap-4 relative overflow-hidden">
          {/* Subtle grid pattern backdrop */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#18181b 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Interactive Content-Related Stage Graphic */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full py-2">
            {/* 1. Geometric Orbiting Loader */}
            <div className="shrink-0 scale-90 sm:scale-100">
              <GeometricLoader mode="triple" size="md" dotColor="#f59e0b" pathColor="currentColor" />
            </div>

            {/* 2. Visual Content Artifact Simulator (3D City Skylines + Cyber Bot) */}
            <div className="flex-1 max-w-xs p-3.5 rounded-2xl bg-white dark:bg-slate-950 border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-black text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500 animate-bounce" />
                  <span>{currentStep.tag}</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  STEP {currentStep.step}/05
                </span>
              </div>

              {/* Dynamic 3D City Voxel Rising Animation */}
              <div className="h-16 rounded-xl bg-slate-900 p-2 flex items-end justify-center gap-1.5 border border-slate-800 relative overflow-hidden">
                <div
                  className="w-3.5 bg-emerald-500 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.min(progress * 0.6, 52)}px` }}
                />
                <div
                  className="w-3.5 bg-emerald-400 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.min(progress * 0.45, 40)}px` }}
                />
                <div
                  className="w-3.5 bg-amber-400 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.min(progress * 0.75, 60)}px` }}
                />
                <div
                  className="w-3.5 bg-cyan-400 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.min(progress * 0.55, 46)}px` }}
                />
                <div
                  className="w-3.5 bg-emerald-300 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.min(progress * 0.35, 30)}px` }}
                />
                <div
                  className="w-3.5 bg-emerald-500 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.min(progress * 0.65, 54)}px` }}
                />
              </div>

              <p className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 truncate">
                {currentStep.title}
              </p>
            </div>
          </div>

          {/* Progress Display */}
          <div className="w-full space-y-1.5 text-center relative z-10 pt-1">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800 dark:text-slate-200 px-1">
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{currentStep.title.toUpperCase()}</span>
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {progress}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-neutral-900 overflow-hidden relative shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content-Themed Terminal Logging Box */}
        <div className="w-full rounded-2xl bg-slate-950 border-2 border-neutral-900 text-left overflow-hidden shadow-[4px_4px_0px_#18181b]">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800 bg-slate-900/90 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-slate-200">CONTENT_FORGE_STREAMS.LOG</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GPU 60FPS SYNTHESIS</span>
            </div>
          </div>

          <div className="p-3.5 font-mono text-[11px] space-y-1.5 max-h-32 overflow-y-auto min-h-[92px]">
            {logs.map((log, idx) => (
              <div key={`${log.tag}-${idx}`} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-500 font-bold select-none">[{log.step}]</span>
                <span className="text-amber-400 font-bold">[{log.tag}]</span>
                <span className="text-slate-200 flex-1">{log.detail}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
              </div>
            ))}
            {progress < 100 && (
              <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                <span>&gt; forging GitHub Camo vectors &amp; 3D isometric city mesh...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Diagnostics Test Badges */}
      <div className="w-full max-w-3xl pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 shadow-2xs">
            <Cpu className="w-3 h-3 text-indigo-500" />
            <span>3D CITY: VOXEL</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>CAMO CDN: 100%</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 shadow-2xs">
            <Bot className="w-3 h-3 text-cyan-500" />
            <span>CYBER BOT: 60FPS</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 shadow-2xs">
            <Activity className="w-3 h-3 text-amber-500" />
            <span>TELEMETRY: 47 ENGINES</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 shadow-2xs">
            <Volume2 className="w-3 h-3 text-purple-500" />
            <span>SYNTH: ACTIVE</span>
          </span>
        </div>

        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
          FAST LAUNCH AVAILABLE
        </span>
      </div>
    </div>
  );
}
