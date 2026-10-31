'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { GeometricLoader } from './GeometricLoader';
import { playWelcomeChord, playClickSound } from '#/lib/sound/sound-effects';
import { Terminal, CheckCircle2, Cpu, Zap, Volume2, Sparkles, FastForward } from 'lucide-react';

interface BootLog {
  id: string;
  timestamp: string;
  tag: string;
  message: string;
  status: 'pending' | 'ok';
}

const BOOT_LOG_SEQUENCE: Array<{ tag: string; message: string; delay: number }> = [
  { tag: 'BOOT', message: 'Initializing MonoForge Engine v2.4.0 Kernel...', delay: 150 },
  { tag: 'AUDIO', message: 'Calibrating Web Audio synthesizer & harmonics...', delay: 400 },
  { tag: 'STYLE', message: 'Verifying 60fps CSS vector keyframes & GPU shaders...', delay: 750 },
  { tag: 'CAMO', message: 'Pre-warming GitHub Camo proxy sanitizer & CDN...', delay: 1100 },
  { tag: 'READY', message: 'Developer workstation nominal. Ready to forge.', delay: 1450 },
];

/**
 * Cinematic Welcome Loader with terminal logging, visual styles diagnostics,
 * progress indicator, and Web Audio welcome chime.
 */
export function InitialPageLoader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<BootLog[]>([]);
  const [visible, setVisible] = useState(true);
  const [rendered, setRendered] = useState(true);
  const finishedRef = useRef(false);

  const completeLoading = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);

    // Play celebratory welcome audio
    playWelcomeChord();

    // Mark session as loaded
    try {
      sessionStorage.setItem('monoforge_loaded', 'true');
    } catch {
      // Ignore sessionStorage errors
    }

    // Smooth exit
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setRendered(false);
      }, 450);
    }, 400);
  }, []);

  const handleSkip = () => {
    playClickSound();
    completeLoading();
  };

  useEffect(() => {
    setMounted(true);

    // If already loaded in this session, provide a rapid entrance transition
    let alreadyVisited = false;
    try {
      alreadyVisited = sessionStorage.getItem('monoforge_loaded') === 'true';
    } catch {
      alreadyVisited = false;
    }

    if (alreadyVisited) {
      // Rapid exit for returning tabs
      const fastTimer = setTimeout(() => {
        completeLoading();
      }, 350);
      return () => clearTimeout(fastTimer);
    }

    // Sequence progress smoothly 0 -> 100
    const startTime = Date.now();
    const duration = 1600; // 1.6s smooth duration

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 98);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
        completeLoading();
      }
    }, 40);

    // Sequence logs
    const logTimeouts = BOOT_LOG_SEQUENCE.map((item) => {
      return setTimeout(() => {
        const now = new Date();
        const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(
          now.getSeconds()
        ).padStart(2, '0')}.${String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')}`;

        setLogs((prev) => [
          ...prev,
          {
            id: item.tag + '_' + Date.now(),
            timestamp: timeStr,
            tag: item.tag,
            message: item.message,
            status: 'ok',
          },
        ]);
      }, item.delay);
    });

    return () => {
      clearInterval(progressInterval);
      logTimeouts.forEach(clearTimeout);
    };
  }, [completeLoading]);

  // Don't render until client mount to eliminate hydration differences
  if (!mounted || !rendered) return null;

  return (
    <div
      aria-hidden={!visible}
      role="status"
      aria-label="Welcome Loading"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-md transition-all duration-500 ease-out select-none ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'
      }`}
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
            M
          </div>
          <span className="font-bold text-slate-900 dark:text-white tracking-widest uppercase">
            MONOFORGE // OS
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
            SYSTEM BOOT
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors text-[11px] font-bold cursor-pointer"
        >
          <span>FAST LAUNCH</span>
          <FastForward className="w-3.5 h-3.5 text-amber-500" />
        </button>
      </div>

      {/* Center Cinematic Stage */}
      <div className="w-full max-w-xl flex flex-col items-center gap-6 my-auto">
        {/* Geometric Orbiting Loader */}
        <div className="relative p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
          <GeometricLoader mode="triple" size="lg" dotColor="#f59e0b" pathColor="currentColor" />
        </div>

        {/* Progress Display */}
        <div className="w-full space-y-2 text-center">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-300 px-1">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>INITIALIZING CORE ARCHITECTURE</span>
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Logging Box */}
        <div className="w-full rounded-2xl bg-slate-950 border border-slate-800/90 text-left overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-slate-200">BOOT_CONSOLE.LOG</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TELEMETRY</span>
            </div>
          </div>

          <div className="p-3.5 font-mono text-[11px] space-y-1.5 max-h-36 overflow-y-auto min-h-[92px]">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-500 select-none">{log.timestamp}</span>
                <span className="text-amber-400 font-bold">[{log.tag}]</span>
                <span className="text-slate-200 flex-1">{log.message}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
              </div>
            ))}
            {progress < 100 && (
              <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                <span>&gt; compiling shaders &amp; telemetry schemas...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Diagnostics Test Badges */}
      <div className="w-full max-w-2xl pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
            <Cpu className="w-3 h-3 text-indigo-500" />
            <span>GPU 60FPS: OK</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>CAMO CDN: STRICT</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>STATE: ZUSTAND</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
            <Volume2 className="w-3 h-3 text-cyan-500" />
            <span>AUDIO: SYNTH</span>
          </span>
        </div>

        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          PRESS FAST LAUNCH TO BYPASS
        </span>
      </div>
    </div>
  );
}
