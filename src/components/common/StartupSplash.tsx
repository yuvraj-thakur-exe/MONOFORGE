'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * StartupSplash — MonoForge Signature Developer Startup Experience
 *
 * Requirements met:
 * 1. Branded full-screen startup before revealing application.
 * 2. Uses official MonoForge geometric monkey vector & wordmark.
 * 3. Deep black / charcoal (#09090B), subtle geometric grid, soft #FFE600 ambient glow.
 * 4. Calibrated logo animation: energy ring -> geometric monkey -> golden glow -> sparks -> wordmark -> tagline.
 * 5. Signature forging animation: rotating geometric rings, tiny sparks, glowing border beam.
 * 6. Indeterminate loading bar: "PREPARING YOUR WORKSPACE...", "FORGE YOUR DEVELOPER IDENTITY." (no fake percentages).
 * 7. Shown on fresh application load (sessionStorage tracked), ~2.0s perception time, failsafe timeout (3.2s).
 * 8. Completely silent (0 audio playback).
 * 9. Fully responsive (320px to ultrawide), prefers-reduced-motion safe, ARIA role="status".
 */
export function StartupSplash() {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [stage, setStage] = useState<number>(0);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const dismiss = useCallback(() => {
    setIsExiting(true);
    try {
      sessionStorage.setItem('monoforge_startup_viewed', 'true');
    } catch {
      // Ignore private browsing storage errors
    }
    const exitTimer = setTimeout(() => {
      setMounted(false);
    }, 500);
    timerRefs.current.push(exitTimer);
  }, []);

  useEffect(() => {
    // Check if already viewed in this browser session
    try {
      if (sessionStorage.getItem('monoforge_startup_viewed') === 'true') {
        return;
      }
    } catch {
      // Continue if sessionStorage is restricted
    }

    setMounted(true);

    // Check reduced motion preference safely
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setStage(4);
      const reducedTimer = setTimeout(() => {
        dismiss();
      }, 700);
      timerRefs.current.push(reducedTimer);
      return;
    }

    // Calibrated animation sequence
    const t1 = setTimeout(() => setStage(1), 150); // Background & energy ring
    const t2 = setTimeout(() => setStage(2), 450); // Monkey vector & golden aura
    const t3 = setTimeout(() => setStage(3), 850); // Forging sparks & border trace
    const t4 = setTimeout(() => setStage(4), 1250); // Wordmark & tagline reveal
    const t5 = setTimeout(() => dismiss(), 2200); // Begin smooth fade-out
    const failsafe = setTimeout(() => dismiss(), 3400); // Absolute safety timeout

    timerRefs.current.push(t1, t2, t3, t4, t5, failsafe);

    // Keyboard listener: Escape key skips instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      timerRefs.current.forEach(clearTimeout);
    };
  }, [dismiss]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading MonoForge Workspace"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09090b] text-white select-none overflow-hidden transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-[0.985] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        @keyframes forge-spin-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes forge-spin-ccw {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes forge-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes forge-pulse-glow {
          0%,
          100% {
            opacity: 0.35;
            filter: drop-shadow(0 0 16px rgba(255, 230, 0, 0.3));
          }
          50% {
            opacity: 0.75;
            filter: drop-shadow(0 0 28px rgba(255, 230, 0, 0.65));
          }
        }
        @keyframes forge-indeterminate {
          0% {
            left: -35%;
            width: 35%;
          }
          50% {
            left: 30%;
            width: 45%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }
        @keyframes spark-drift {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-24px) scale(1.2);
            opacity: 0;
          }
        }
        .anim-spin-cw {
          animation: forge-spin-cw 18s linear infinite;
        }
        .anim-spin-ccw {
          animation: forge-spin-ccw 14s linear infinite;
        }
        .anim-float {
          animation: forge-float 3.6s ease-in-out infinite;
        }
        .anim-glow {
          animation: forge-pulse-glow 2.4s ease-in-out infinite;
        }
        .anim-progress {
          animation: forge-indeterminate 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .spark-1 {
          animation: spark-drift 2.2s ease-in-out infinite 0.1s;
        }
        .spark-2 {
          animation: spark-drift 2.5s ease-in-out infinite 0.6s;
        }
        .spark-3 {
          animation: spark-drift 1.9s ease-in-out infinite 1.1s;
        }
        .spark-4 {
          animation: spark-drift 2.3s ease-in-out infinite 1.6s;
        }
      `}</style>

      {/* Subtle Geometric Engineering Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Soft Yellow Center Ambient Light */}
      <div
        className="absolute pointer-events-none w-[520px] h-[520px] rounded-full blur-3xl transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(255, 230, 0, 0.15) 0%, rgba(9, 9, 11, 0) 70%)',
          opacity: stage >= 1 ? 1 : 0,
        }}
      />

      {/* Centerpiece Content Block */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-md w-full text-center">
        {/* Animated Forging Centerpiece Container */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
          {/* Outer Rotating Energy Ring */}
          <svg
            className={`absolute inset-0 w-full h-full pointer-events-none anim-spin-cw transition-opacity duration-700 ${
              stage >= 1 ? 'opacity-80' : 'opacity-0'
            }`}
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle
              cx="100"
              cy="100"
              r="92"
              stroke="#FFE600"
              strokeWidth="1.5"
              strokeDasharray="6 14"
              opacity="0.35"
            />
            {/* Cardinal Tick Crosshairs */}
            <circle cx="100" cy="8" r="2.5" fill="#FFE600" opacity="0.8" />
            <circle cx="192" cy="100" r="2.5" fill="#FFE600" opacity="0.8" />
            <circle cx="100" cy="192" r="2.5" fill="#FFE600" opacity="0.8" />
            <circle cx="8" cy="100" r="2.5" fill="#FFE600" opacity="0.8" />
          </svg>

          {/* Inner Counter-Rotating Energy Ring */}
          <svg
            className={`absolute inset-0 w-full h-full pointer-events-none anim-spin-ccw transition-opacity duration-700 ${
              stage >= 1 ? 'opacity-60' : 'opacity-0'
            }`}
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle
              cx="100"
              cy="100"
              r="76"
              stroke="#FFE600"
              strokeWidth="1"
              strokeDasharray="3 9"
              opacity="0.3"
            />
          </svg>

          {/* Tiny Floating Forging Sparks */}
          {stage >= 2 && (
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <div
                className="spark-1 absolute w-1.5 h-1.5 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600]"
                style={{ top: '22%', left: '18%' }}
              />
              <div
                className="spark-2 absolute w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_10px_#FFE600]"
                style={{ top: '74%', left: '78%' }}
              />
              <div
                className="spark-3 absolute w-1.5 h-1.5 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600]"
                style={{ top: '28%', left: '80%' }}
              />
              <div
                className="spark-4 absolute w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#FFE600]"
                style={{ top: '78%', left: '22%' }}
              />
            </div>
          )}

          {/* Mascot Center Card with Border Glow */}
          <div
            className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0d0d11] border-2 border-neutral-800 flex items-center justify-center p-3 shadow-2xl transition-all duration-700 ease-out anim-float ${
              stage >= 2
                ? 'opacity-100 scale-100 shadow-[0_0_36px_rgba(255,230,0,0.22)] border-[#FFE600]/60'
                : 'opacity-0 scale-90'
            }`}
          >
            {/* Animated Traveling Border Laser */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div
                className="absolute inset-[-100%] anim-spin-cw opacity-30"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, #FFE600 60deg, transparent 120deg)',
                }}
              />
              <div className="absolute inset-[1.5px] rounded-[14px] bg-[#0d0d11]" />
            </div>

            {/* Official MonoForge Geometric Monkey Vector Icon */}
            <div className="relative z-10 w-full h-full flex items-center justify-center anim-glow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,230,0,0.4)]"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Left Ear */}
                <path
                  d="M 273 374 C 185 374 168 410 168 452 C 168 494 185 521 250 521"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Right Ear */}
                <path
                  d="M 748 374 C 836 374 854 410 854 452 C 854 494 836 521 771 521"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Outer Polygonal Head */}
                <polygon
                  points="512,195 719,310 774,493 594,733 430,733 250,493 305,310"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                  fill="none"
                />

                {/* Inner Facial Mask / Brow Contour */}
                <path
                  d="M 512 393 L 622 342 L 696 415 L 650 545 L 644 650 M 512 393 L 400 342 L 327 415 L 373 545 L 379 650"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                  fill="none"
                />

                {/* Left Eye */}
                <circle cx="424" cy="459" r="32" fill="#FFE600" />

                {/* Right Eye */}
                <circle cx="598" cy="459" r="32" fill="#FFE600" />

                {/* Nose */}
                <path
                  d="M 453 507 L 512 558 L 571 507"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                  fill="none"
                />

                {/* Philtrum */}
                <line x1="512" y1="558" x2="512" y2="626" stroke="#FFE600" strokeWidth="36" />

                {/* Mouth */}
                <path
                  d="M 432 651 L 512 626 L 592 651"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* MONOFORGE Official Wordmark */}
        <div
          className={`space-y-1.5 transition-all duration-700 ease-out ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-sans text-white flex items-center justify-center">
            <span>Mono</span>
            <span className="text-[#FFE600] drop-shadow-[0_0_16px_rgba(255,230,0,0.5)]">Forge</span>
          </h1>

          {/* Official Tagline */}
          <p className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.22em] text-[#A1A1AA] font-bold">
            FORGE YOUR DEVELOPER IDENTITY.
          </p>
        </div>

        {/* Indeterminate Loading Progress Bar */}
        <div
          className={`mt-8 w-full flex flex-col items-center gap-3 transition-all duration-700 delay-100 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="w-56 sm:w-64 h-1.5 rounded-full bg-neutral-800/80 overflow-hidden relative border border-neutral-700/50">
            <div className="absolute top-0 bottom-0 bg-[#FFE600] rounded-full anim-progress shadow-[0_0_12px_#FFE600]" />
          </div>

          {/* Calibrated Status Line */}
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping" />
            <span>PREPARING YOUR WORKSPACE</span>
            <span className="tracking-normal font-sans">...</span>
          </div>
        </div>
      </div>

      {/* Discrete Keyboard-Accessible Skip Control */}
      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-5 right-6 text-[10px] font-mono tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors focus:outline-hidden focus:ring-1 focus:ring-[#FFE600] px-2 py-1 rounded cursor-pointer"
        aria-label="Skip startup splash"
      >
        PRESS ESC TO SKIP
      </button>
    </div>
  );
}

export default StartupSplash;
