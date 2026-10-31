'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SIGNATURE MONOFORGE MONKEY LOADING ANIMATION
 *
 * Visual Hierarchy:
 * 1. MONKEY MASCOT (Centerpiece, SVG geometric path assembly, subtle floating, glowing eye pulse, traveling energy)
 * 2. MONOFORGE (Staggered letter reveal, FORGE in signature #FFE600)
 * 3. Tagline: "Forge a GitHub profile that gets noticed."
 * 4. Animated yellow progress line with moving forge spark
 * 5. Contextual rotating loading messages (Initializing MonoForge... -> Preparing your workspace... -> Loading creative studio... -> Almost ready...)
 *
 * Technical Requirements:
 * - Authentic MonoForge polygonal vector geometry (100% brand preservation)
 * - Signature palette: Yellow (#FFE600), Deep Black (#18181B), White (#FFFFFF)
 * - Framer Motion GPU-accelerated transforms & opacity
 * - Smooth transition: Mascot scales down, wordmark fades, transitions into app
 * - Mobile responsive (320px to ultrawide), prefers-reduced-motion safe, ARIA role="status"
 */

const LOADING_MESSAGES = [
  'Initializing MonoForge...',
  'Preparing your workspace...',
  'Loading creative studio...',
  'Almost ready...',
];

const MONO_LETTERS = ['M', 'O', 'N', 'O'];
const FORGE_LETTERS = ['F', 'O', 'R', 'G', 'E'];

export function StartupSplash() {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const dismiss = useCallback(() => {
    setIsExiting(true);
    try {
      sessionStorage.setItem('monoforge_startup_viewed', 'true');
    } catch {
      // Ignore private browsing storage restrictions
    }
    const exitTimer = setTimeout(() => {
      setMounted(false);
    }, 550);
    timerRefs.current.push(exitTimer);
  }, []);

  useEffect(() => {
    // Check if user already viewed startup screen in this session
    try {
      if (sessionStorage.getItem('monoforge_startup_viewed') === 'true') {
        return;
      }
    } catch {
      // Continue if storage is restricted
    }

    setMounted(true);

    // Respect reduced motion accessibility setting
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => dismiss(), 650);
      timerRefs.current.push(timer);
      return;
    }

    // Contextual message progression timeline
    const m1 = setTimeout(() => setMessageIndex(1), 600);
    const m2 = setTimeout(() => setMessageIndex(2), 1200);
    const m3 = setTimeout(() => setMessageIndex(3), 1750);

    // Smooth exit transition once application is ready
    const tReady = setTimeout(() => {
      dismiss();
    }, 2250);

    // Safety failsafe timer so user is never trapped
    const tFailsafe = setTimeout(() => dismiss(), 3600);

    timerRefs.current.push(m1, m2, m3, tReady, tFailsafe);

    // Keyboard ESC listener to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Allow manual replay via custom event
    const handleReplay = () => {
      try {
        sessionStorage.removeItem('monoforge_startup_viewed');
      } catch {}
      setMounted(true);
      setIsExiting(false);
      setMessageIndex(0);
    };
    window.addEventListener('monoforge:replay-startup', handleReplay);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('monoforge:replay-startup', handleReplay);
      timerRefs.current.forEach(clearTimeout);
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
          scale: isExiting ? 0.95 : 1,
          filter: isExiting ? 'blur(6px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#18181B] text-white select-none overflow-hidden"
      >
        {/* Subtle Background Engineering Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 230, 0, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 230, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Signature Yellow Radial Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{
            opacity: [0.65, 0.9, 0.65],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none w-[600px] h-[600px] rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 230, 0, 0.20) 0%, rgba(255, 230, 0, 0.06) 45%, rgba(24, 24, 27, 0) 70%)',
          }}
        />

        {/* Floating Geometric Particles / Forging Embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: '16%', left: '20%', size: 'w-1.5 h-1.5', delay: 0.2, duration: 4 },
            { top: '24%', left: '78%', size: 'w-2 h-2', delay: 0.5, duration: 3.6 },
            { top: '74%', left: '18%', size: 'w-1.5 h-1.5', delay: 0.8, duration: 4.2 },
            { top: '70%', left: '84%', size: 'w-2.5 h-2.5', delay: 0.3, duration: 3.8 },
            { top: '38%', left: '10%', size: 'w-1 h-1', delay: 1.1, duration: 4.5 },
            { top: '44%', left: '90%', size: 'w-1.5 h-1.5', delay: 0.7, duration: 3.2 },
            { top: '82%', left: '48%', size: 'w-1.5 h-1.5', delay: 1.3, duration: 3.9 },
          ].map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: [0, 0.85, 0],
                y: [-10, -40],
                rotate: [0, 45, 90],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
              className={`absolute rounded-xs bg-[#FFE600] shadow-[0_0_10px_#FFE600] ${p.size}`}
              style={{ top: p.top, left: p.left }}
            />
          ))}
        </div>

        {/* Visual Hierarchy Container */}
        <div className="relative z-10 flex flex-col items-center px-4 max-w-lg w-full text-center">
          {/* 1. MONKEY MASCOT CENTERPIECE */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-6">
            {/* Outer Concentric Rotating Energy Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <circle
                  cx="100"
                  cy="100"
                  r="94"
                  stroke="#FFE600"
                  strokeWidth="1.5"
                  strokeDasharray="6 14"
                  opacity="0.45"
                />
                {/* Cardinal Energy Sparks */}
                <circle cx="100" cy="6" r="2.5" fill="#FFE600" />
                <circle cx="194" cy="100" r="2.5" fill="#FFE600" />
                <circle cx="100" cy="194" r="2.5" fill="#FFE600" />
                <circle cx="6" cy="100" r="2.5" fill="#FFE600" />
              </svg>
            </motion.div>

            {/* Inner Counter-Rotating Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] pointer-events-none"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#FFE600"
                  strokeWidth="1"
                  strokeDasharray="3 9"
                  opacity="0.3"
                />
              </svg>
            </motion.div>

            {/* Mascot Emblem Card Frame with subtle bobbing */}
            <motion.div
              animate={{
                y: isExiting ? 10 : [-4, 4, -4],
                scale: isExiting ? 0.88 : 1,
              }}
              transition={{
                duration: isExiting ? 0.45 : 3.2,
                repeat: isExiting ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-[#141417] border-2 border-neutral-700/80 p-4 shadow-[0_0_40px_rgba(255,230,0,0.28)] flex items-center justify-center overflow-hidden"
            >
              {/* Traveling Perimeter Laser Spark */}
              <div
                className="absolute inset-[-100%] pointer-events-none opacity-45 animate-spin"
                style={{
                  animationDuration: '5.5s',
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, #FFE600 60deg, transparent 120deg)',
                }}
              />
              <div className="absolute inset-[2px] rounded-[22px] bg-[#141417]" />

              {/* Exact Geometric Monkey Mascot Vector (Animated Path Assembly) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(255,230,0,0.5)]"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Left Ear */}
                <motion.path
                  d="M 273 374 C 185 374 168 410 168 452 C 168 494 185 521 250 521"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
                />

                {/* Right Ear */}
                <motion.path
                  d="M 748 374 C 836 374 854 410 854 452 C 854 494 836 521 771 521"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
                />

                {/* Outer Polygonal Head */}
                <motion.polygon
                  points="512,195 719,310 774,493 594,733 430,733 250,493 305,310"
                  stroke="#FFE600"
                  strokeWidth="38"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.05, ease: 'easeInOut', delay: 0.2 }}
                />

                {/* Inner Facial Brow / Mask Contour */}
                <motion.path
                  d="M 512 393 L 622 342 L 696 415 L 650 545 L 644 650 M 512 393 L 400 342 L 327 415 L 373 545 L 379 650"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.95, ease: 'easeInOut', delay: 0.35 }}
                />

                {/* Left Eye with Gentle Highlight Pulse */}
                <motion.circle
                  cx="424"
                  cy="459"
                  r="32"
                  fill="#FFE600"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.15, 1],
                    opacity: [0, 1, 0.9],
                  }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />

                {/* Right Eye with Gentle Highlight Pulse */}
                <motion.circle
                  cx="598"
                  cy="459"
                  r="32"
                  fill="#FFE600"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.15, 1],
                    opacity: [0, 1, 0.9],
                  }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                />

                {/* Nose */}
                <motion.path
                  d="M 453 507 L 512 558 L 571 507"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.5 }}
                />

                {/* Philtrum Vertical Stem */}
                <motion.line
                  x1="512"
                  y1="558"
                  x2="512"
                  y2="626"
                  stroke="#FFE600"
                  strokeWidth="36"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                />

                {/* Mouth */}
                <motion.path
                  d="M 432 651 L 512 626 L 592 651"
                  stroke="#FFE600"
                  strokeWidth="36"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.6 }}
                />
              </svg>
            </motion.div>
          </div>

          {/* 2. MONOFORGE WORDMARK (Staggered Letter Reveal) */}
          <div className="space-y-2 mb-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-sans flex items-center justify-center leading-none">
              {/* MONO in White */}
              <span className="flex">
                {MONO_LETTERS.map((letter, i) => (
                  <motion.span
                    key={`mono-${i}`}
                    initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.38,
                      delay: 0.4 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-white inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>

              {/* FORGE in Signature Yellow #FFE600 */}
              <span className="flex ml-1 text-[#FFE600] drop-shadow-[0_0_20px_rgba(255,230,0,0.6)]">
                {FORGE_LETTERS.map((letter, i) => (
                  <motion.span
                    key={`forge-${i}`}
                    initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.38,
                      delay: 0.6 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* 3. BRAND TAGLINE */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.85 }}
              className="text-xs sm:text-sm font-sans font-medium text-neutral-300 tracking-wide"
            >
              Forge a GitHub profile that gets noticed.
            </motion.p>
          </div>

          {/* 4. ANIMATED YELLOW PROGRESS LINE WITH MOVING FORGE SPARK */}
          <div className="mt-6 w-full flex flex-col items-center gap-3">
            <div className="w-60 sm:w-68 h-1.5 rounded-full bg-neutral-800/90 overflow-hidden relative border border-neutral-700/60">
              {/* Indeterminate moving progress bar */}
              <motion.div
                animate={{
                  left: ['-35%', '30%', '100%'],
                  width: ['35%', '45%', '30%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute top-0 bottom-0 bg-[#FFE600] rounded-full shadow-[0_0_14px_#FFE600]"
              />

              {/* Moving Forge Spark Riding Front Edge */}
              <motion.div
                animate={{
                  left: ['0%', '75%', '100%'],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#FFE600,0_0_4px_#FFF]"
              />
            </div>

            {/* 5. CONTEXTUAL ROTATING LOADING MESSAGES */}
            <div className="h-5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-neutral-400 font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse shrink-0" />
                  <span>{LOADING_MESSAGES[messageIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Keyboard-Accessible Fast Skip */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute bottom-5 right-6 text-[10px] font-mono tracking-widest uppercase text-neutral-500 hover:text-neutral-300 transition-colors focus:outline-hidden focus:ring-1 focus:ring-[#FFE600] px-2 py-1 rounded cursor-pointer"
          aria-label="Skip startup splash"
        >
          PRESS ESC TO SKIP
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default StartupSplash;
