'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SIGNATURE MONOFORGE MONKEY LOADING ANIMATION
 *
 * Fast, non-blocking startup intro (~900ms) with:
 * - Immediate skip via click, Esc, or Fast Launch button
 * - Instant dismiss for `prefers-reduced-motion: reduce`
 * - `pointer-events-none` backdrop so users immediately reach the workspace
 * - Session-scoped (`sessionStorage`) so it never repeats across navigation
 */

const TOTAL_DURATION_MS = 900;

const MONO_LETTERS = ['M', 'O', 'N', 'O'];
const FORGE_LETTERS = ['F', 'O', 'R', 'G', 'E'];

export function StartupSplash() {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRefs = useRef<ReturnType<typeof setInterval>[]>([]);

  const dismiss = useCallback(() => {
    setIsExiting(true);
    try {
      sessionStorage.setItem('monoforge_startup_viewed', 'true');
    } catch {
      // Ignore private browsing storage restrictions
    }
    const exitTimer = setTimeout(() => {
      setMounted(false);
    }, 220);
    timerRefs.current.push(exitTimer);
  }, []);

  useEffect(() => {
    // Check if user already viewed startup screen in this session
    try {
      if (sessionStorage.getItem('monoforge_startup_viewed') === 'true') {
        return;
      }
      // Mark viewed immediately so route navigation never replays the splash
      sessionStorage.setItem('monoforge_startup_viewed', 'true');
    } catch {
      // Continue if storage is restricted
    }

    // Respect reduced motion accessibility setting with instant dismiss
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(pct);
    }, 30);
    intervalRefs.current.push(progressInterval);

    const tReady = setTimeout(() => {
      dismiss();
    }, TOTAL_DURATION_MS);

    const tFailsafe = setTimeout(() => {
      setMounted(false);
    }, TOTAL_DURATION_MS + 400);

    timerRefs.current.push(tReady, tFailsafe);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handleReplay = () => {
      try {
        sessionStorage.removeItem('monoforge_startup_viewed');
      } catch {
        // Ignore storage restrictions
      }
      setMounted(true);
      setIsExiting(false);
      setProgress(0);
    };
    window.addEventListener('monoforge:replay-startup', handleReplay);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('monoforge:replay-startup', handleReplay);
      timerRefs.current.forEach(clearTimeout);
      intervalRefs.current.forEach(clearInterval);
    };
  }, [dismiss]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        aria-label="MonoForge Workspace Startup"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 0.98 : 1,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-sm text-white select-none overflow-hidden"
      >
        {/* Subtle Background Engineering Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 230, 0, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 230, 0, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Signature Yellow Radial Aura */}
        <div
          className="absolute pointer-events-none w-[520px] h-[520px] rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 230, 0, 0.18) 0%, rgba(255, 230, 0, 0.05) 45%, rgba(15, 23, 42, 0) 70%)',
          }}
        />

        {/* Visual Hierarchy Container */}
        <div className="relative z-10 flex flex-col items-center px-4 max-w-lg w-full text-center">
          {/* 1. MONKEY MASCOT CENTERPIECE */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-5">
            <motion.div
              animate={{
                scale: isExiting ? 0.92 : 1,
              }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-800 border-2 border-slate-700 p-3.5 shadow-[0_0_32px_rgba(255,230,0,0.22)] flex items-center justify-center overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,230,0,0.45)]"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M 273 374 C 185 374 168 410 168 452 C 168 494 185 521 250 521"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinecap="round"
                />
                <path
                  d="M 748 374 C 836 374 854 410 854 452 C 854 494 836 521 771 521"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinecap="round"
                />
                <polygon
                  points="512,195 719,310 774,493 594,733 430,733 250,493 305,310"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                />
                <path
                  d="M 512 393 L 622 342 L 696 415 L 650 545 L 644 650 M 512 393 L 400 342 L 327 415 L 373 545 L 379 650"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                />
                <circle cx="424" cy="459" r="32" fill="#FFE600" />
                <circle cx="598" cy="459" r="32" fill="#FFE600" />
                <path
                  d="M 453 507 L 512 558 L 571 507"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                />
                <line x1="512" y1="558" x2="512" y2="626" stroke="#FFE600" strokeWidth="36" />
                <path
                  d="M 432 651 L 512 626 L 592 651"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                />
              </svg>
            </motion.div>
          </div>

          {/* 2. MONOFORGE WORDMARK */}
          <div className="space-y-2 mb-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-sans flex items-center justify-center leading-none">
              <span className="flex">
                {MONO_LETTERS.map((letter, i) => (
                  <motion.span
                    key={`mono-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-white inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>

              <span className="flex ml-1 text-[#FFE600] drop-shadow-[0_0_16px_rgba(255,230,0,0.5)]">
                {FORGE_LETTERS.map((letter, i) => (
                  <motion.span
                    key={`forge-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.12 + i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-sans font-medium text-slate-300 tracking-wide">
              Forge a GitHub profile that gets noticed.
            </p>
          </div>

          {/* 3. FAST PROGRESS LINE */}
          <div className="mt-5 w-full flex flex-col items-center gap-2.5">
            <div className="w-60 sm:w-72 h-1.5 rounded-full bg-slate-800 overflow-hidden relative border border-slate-700/70">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-[#FFE600] to-yellow-300 rounded-full shadow-[0_0_10px_#FFE600] transition-all duration-75 ease-out"
                style={{ width: `${Math.max(8, progress)}%` }}
              />
            </div>

            <div className="w-60 sm:w-72 flex items-center justify-between text-[11px] font-mono">
              <span className="flex items-center gap-2 tracking-wider uppercase text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse shrink-0" />
                <span>Preparing studio...</span>
              </span>
              <button
                type="button"
                onClick={dismiss}
                className="pointer-events-auto px-2 py-0.5 rounded bg-[#FFE600]/15 hover:bg-[#FFE600] text-[#FFE600] hover:text-slate-900 border border-[#FFE600]/40 text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1"
                aria-label="Skip startup splash"
              >
                <span>Skip</span>
                <span className="font-sans font-black">&raquo;</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StartupSplash;
