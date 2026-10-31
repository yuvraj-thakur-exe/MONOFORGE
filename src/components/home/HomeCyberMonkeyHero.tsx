'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import {
  Sparkles,
  Flame,
  Copy,
  Check,
  Terminal,
  Smile,
  Volume2,
  VolumeX,
} from 'lucide-react';

const MONKEY_PROVERBS = [
  'Zero monkey business. Pure Camo-safe SVG keyframes at 60fps!',
  'Your GitHub profile is your 24/7 technical handshake. Make it demand attention!',
  'Single Zustand store architecture: zero duplicate state, 100% deterministic.',
  'A banana a day keeps merge conflicts away! 🍌',
  '47+ telemetry engines loaded. Ready to forge your developer identity.',
  'Never push to GitHub silently — always review diffs before sync!',
  'Clean code, crisp commits, and 100% GitHub Camo CDN proxy safety.',
  'Did someone say Next.js 16? My cyber visor is locked onto port 3000!',
];

const MONKEY_RESPONSES: Record<string, string[]> = {
  advice: [
    'Tip: Keep your top languages chart above the fold so recruiters see your stack immediately!',
    'Tip: Use high-contrast shield badges — they look stunning on both GitHub dark & light themes.',
    'Tip: Add an animated vector banner! It draws eyes directly to your mission statement.',
    'Tip: Don’t forget your commit velocity graph — consistency speaks louder than words.',
  ],
  joke: [
    'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    'There are 10 types of people in the world: those who understand binary, and those who don’t.',
    'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',
    'How does a monkey debug code? By peeling the stack trace one layer at a time! 🍌',
  ],
  hack: [
    'HACKING ACTIVE // Accessing GitHub API telemetry pipelines...',
    'Injecting 60fps CSS keyframes into Camo CDN proxy buffer...',
    'AST compiler ready: generating pure GFM Markdown with zero side-effects!',
  ],
  banana: [
    'NOM NOM NOM! 🍌 Banana energy at MAXIMUM! Processing speed +200%!',
    'Delicious! The monkey CPU is running at peak overclock performance!',
    'Banana power fully absorbed! Star power initiated! ⭐',
  ],
};

function playCyberChime(freq = 880, type: OscillatorType = 'sine', duration = 0.12) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio permission or context error
  }
}

export function HomeCyberMonkeyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rotate: 0, translateY: 0 });
  const [showVisor, setShowVisor] = useState(true);
  const [showHeadphones, setShowHeadphones] = useState(true);
  const [overclock, setOverclock] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bananaEnergy, setBananaEnergy] = useState(4); // 1-4 bars
  const [speechText, setSpeechText] = useState(MONKEY_PROVERBS[0]);
  const [copied, setCopied] = useState(false);
  const [reactionSpark, setReactionSpark] = useState(false);
  const [isChewing, setIsChewing] = useState(false);

  // Mouse pupil tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxPupilDist = 9;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 24, maxPupilDist);

      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      setPupilOffset({ x: px, y: py });
      setHeadTilt({
        rotate: Math.max(-6, Math.min(6, deltaX / 80)),
        translateY: Math.max(-4, Math.min(4, deltaY / 100)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerSound = (freq = 880, type: OscillatorType = 'sine') => {
    if (soundEnabled) {
      playCyberChime(freq, type);
    }
  };

  const handleInteract = (type: 'proverb' | 'advice' | 'joke' | 'hack' | 'banana') => {
    setReactionSpark(true);
    setTimeout(() => setReactionSpark(false), 600);

    if (type === 'banana') {
      setIsChewing(true);
      setTimeout(() => setIsChewing(false), 900);
      setBananaEnergy((prev) => Math.min(4, prev + 1));
      triggerSound(1040, 'triangle');

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { x: 0.75, y: 0.4 },
          colors: ['#ffe600', '#f59e0b', '#10b981', '#06b6d4'],
        });
      } catch {
        // Confetti fallback
      }

      const list = MONKEY_RESPONSES.banana;
      const pick = list[Math.floor(Math.random() * list.length)];
      setSpeechText(pick);
      toast.success('🍌 Fed delicious banana! Cyber monkey energy restored!');
      return;
    }

    if (type === 'proverb') {
      triggerSound(660);
      const pick = MONKEY_PROVERBS[Math.floor(Math.random() * MONKEY_PROVERBS.length)];
      setSpeechText(pick);
      return;
    }

    const list = MONKEY_RESPONSES[type];
    const pick = list[Math.floor(Math.random() * list.length)];
    setSpeechText(pick);

    if (type === 'advice') triggerSound(784);
    if (type === 'joke') triggerSound(880, 'triangle');
    if (type === 'hack') {
      triggerSound(523, 'sawtooth');
      setShowVisor(true);
    }
  };

  const handleCopyMarkdown = () => {
    const markdown = `<p align="center">
  <img src="https://monoforge-studio.vercel.app/assets/cyber-monkey-mascot.svg" alt="MonoForge Cyber Monkey Companion" width="420" />
</p>`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    triggerSound(1200);
    toast.success('Copied Cyber Monkey SVG snippet to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="card-hover-lift relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl p-5 sm:p-7 overflow-hidden space-y-5"
    >
      {/* Background Holographic Glow */}
      <div
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          overclock
            ? 'bg-amber-400/20 dark:bg-amber-500/25 scale-125'
            : 'bg-amber-400/10 dark:bg-amber-500/10'
        }`}
      />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Status Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
            🐵
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                CYBER MONKEY COMPANION
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE // 60FPS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Cursor-following vector mascot &bull; Zero external network scripts
            </p>
          </div>
        </div>

        {/* Audio Toggle & Quick Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute SFX' : 'Enable Cyber SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-500" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="btn-shimmer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-mono font-bold hover:bg-amber-400 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied SVG!' : 'Copy to README'}</span>
          </button>
        </div>
      </div>

      {/* Speech Balloon Bubble */}
      <div
        onClick={() => handleInteract('proverb')}
        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative select-none ${
          reactionSpark
            ? 'border-amber-400 bg-amber-400/10 shadow-lg scale-[1.01]'
            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:border-amber-400/50'
        }`}
        title="Click to hear another thought!"
      >
        <div className="flex items-start gap-2.5">
          <span className="text-amber-500 text-lg leading-none shrink-0 font-mono font-black mt-0.5">💬</span>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
              <span>NOMOKEY NEURAL SYNAPSE</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold hover:underline">Click to shuffle</span>
            </div>
            <p className="text-xs sm:text-sm font-sans font-bold text-slate-900 dark:text-white leading-relaxed">
              &ldquo;{speechText}&rdquo;
            </p>
          </div>
        </div>

        {/* Speech Balloon Triangle Tip */}
        <div className="absolute -bottom-2 left-10 w-4 h-4 bg-slate-50 dark:bg-slate-850 border-r border-b border-slate-200 dark:border-slate-800 rotate-45 transform" />
      </div>

      {/* Center Stage: Interactive Vector Mascot */}
      <div className="relative flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-slate-100/60 to-slate-50/30 dark:from-slate-950/80 dark:to-slate-900/40 border border-slate-200/80 dark:border-slate-800 min-h-[300px] overflow-hidden">
        {/* Subtle grid pattern inside monkey stage */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Overclock Electricity Sparks */}
        {overclock && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-pulse">
            <div className="w-64 h-64 rounded-full border border-amber-400/40 animate-ping" />
          </div>
        )}

        {/* Interactive SVG Render Canvas */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full select-none"
            style={{
              transform: `rotate(${headTilt.rotate}deg) translateY(${headTilt.translateY + (isChewing ? 4 : 0)}px)`,
              transition: 'transform 0.08s ease-out',
            }}
          >
            <defs>
              <linearGradient id="fur-grad-hero" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#382e26" />
                <stop offset="50%" stopColor="#261e18" />
                <stop offset="100%" stopColor="#18130f" />
              </linearGradient>

              <linearGradient id="skin-grad-hero" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e2ba99" />
                <stop offset="100%" stopColor="#ba825a" />
              </linearGradient>

              <radialGradient id="iris-grad-hero" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="80%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>
            </defs>

            {/* Ears */}
            <ellipse cx="140" cy="240" rx="42" ry="48" fill="url(#fur-grad-hero)" />
            <ellipse cx="145" cy="240" rx="28" ry="32" fill="url(#skin-grad-hero)" />
            <circle cx="115" cy="230" r="4" fill="#38bdf8" />
            <circle cx="112" cy="250" r="4" fill="#fbbf24" />

            <ellipse cx="360" cy="240" rx="42" ry="48" fill="url(#fur-grad-hero)" />
            <ellipse cx="355" cy="240" rx="28" ry="32" fill="url(#skin-grad-hero)" />
            <circle cx="385" cy="230" r="4" fill="#38bdf8" />
            <circle cx="388" cy="250" r="4" fill="#fbbf24" />

            {/* Head Silhouette */}
            <ellipse cx="250" cy="230" rx="115" ry="110" fill="url(#fur-grad-hero)" stroke="#111827" strokeWidth="2" />

            {/* Hair Tufts */}
            <path d="M 235 125 C 245 95, 260 95, 270 125 Z" fill="#382e26" />
            <path d="M 220 130 C 230 105, 245 105, 255 130 Z" fill="#261e18" />

            {/* Face Plate */}
            <path
              d="M 250 185 C 210 150, 160 180, 175 240 C 185 280, 215 295, 250 295 C 285 295, 315 280, 325 240 C 340 180, 290 150, 250 185 Z"
              fill="url(#skin-grad-hero)"
            />

            {/* Muzzle & Snout */}
            <ellipse cx="250" cy="295" rx="72" ry="48" fill="url(#skin-grad-hero)" />
            <ellipse cx="250" cy="305" rx="58" ry="32" fill="#ba825a" opacity="0.3" />

            {/* Nostrils */}
            <ellipse cx="240" cy="280" rx="5" ry="7" fill="#451a03" transform="rotate(-12 240 280)" />
            <ellipse cx="260" cy="280" rx="5" ry="7" fill="#451a03" transform="rotate(12 260 280)" />

            {/* Smirk / Chewing */}
            {isChewing ? (
              <ellipse cx="250" cy="315" rx="16" ry="10" fill="#451a03" />
            ) : (
              <path d="M 220 310 Q 250 330 280 310" fill="none" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
            )}

            {/* EYES WITH REAL CURSOR TRACKING */}
            {/* Left Eye */}
            <g transform="translate(205, 210)">
              <ellipse cx="0" cy="0" rx="24" ry="28" fill="#ffffff" stroke="#1f2937" strokeWidth="2" />
              <ellipse cx={pupilOffset.x} cy={pupilOffset.y} rx="14" ry="16" fill="url(#iris-grad-hero)" />
              <circle cx={pupilOffset.x + 1} cy={pupilOffset.y} r="8" fill="#04070d" />
              <circle cx={pupilOffset.x - 4} cy={pupilOffset.y - 5} r="4" fill="#ffffff" />
              <circle cx={pupilOffset.x + 5} cy={pupilOffset.y + 4} r="2" fill="#ffffff" />
              <path d="M -22 -10 Q 0 -22 22 -10" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Right Eye */}
            <g transform="translate(295, 210)">
              <ellipse cx="0" cy="0" rx="24" ry="28" fill="#ffffff" stroke="#1f2937" strokeWidth="2" />
              <ellipse cx={pupilOffset.x} cy={pupilOffset.y} rx="14" ry="16" fill="url(#iris-grad-hero)" />
              <circle cx={pupilOffset.x + 1} cy={pupilOffset.y} r="8" fill="#04070d" />
              <circle cx={pupilOffset.x - 4} cy={pupilOffset.y - 5} r="4" fill="#ffffff" />
              <circle cx={pupilOffset.x + 5} cy={pupilOffset.y + 4} r="2" fill="#ffffff" />
              <path d="M -22 -10 Q 0 -22 22 -10" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Cyber Visor Monocle (Toggleable) */}
            {showVisor && (
              <g transform="translate(295, 210)">
                <polygon points="-32,-26 36,-22 32,30 -28,32" fill="#06b6d4" opacity="0.35" />
                <polygon points="-32,-26 36,-22 32,30 -28,32" fill="none" stroke="#38bdf8" strokeWidth="2" />
                <line x1="-28" y1="2" x2="-18" y2="2" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="22" y1="2" x2="32" y2="2" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="2" y1="-22" x2="2" y2="-12" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="2" y1="18" x2="2" y2="28" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="-20" y="-10" fill="#38bdf8" fontFamily="monospace" fontSize="6" fontWeight="bold">LOCK: 100%</text>
                <path d="M 36 -10 L 80 -2" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {/* Studio DJ Headphones (Toggleable) */}
            {showHeadphones && (
              <g>
                <path d="M 115 195 C 115 80, 385 80, 385 195" fill="none" stroke="#111827" strokeWidth="18" strokeLinecap="round" />
                <path d="M 125 180 C 135 95, 365 95, 375 180" fill="none" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
                <path d="M 140 160 C 155 110, 345 110, 360 160" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />

                {/* Left Ear Cushion */}
                <rect x="96" y="185" width="38" height="90" rx="16" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                <rect x="102" y="195" width="26" height="70" rx="10" fill="#0d1117" />
                <rect x="110" y="215" width="4" height="24" rx="2" fill="#06b6d4" />
                <rect x="118" y="222" width="4" height="18" rx="2" fill="#fbbf24" />

                {/* Right Ear Cushion */}
                <rect x="366" y="185" width="38" height="90" rx="16" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                <rect x="372" y="195" width="26" height="70" rx="10" fill="#0d1117" />
                <rect x="378" y="220" width="4" height="20" rx="2" fill="#fbbf24" />
                <rect x="386" y="212" width="4" height="28" rx="2" fill="#10b981" />
              </g>
            )}

            {/* Torso & Collar */}
            <path d="M 160 360 C 145 390, 130 435, 120 450 L 380 450 C 370 435, 355 390, 340 360 Z" fill="#111827" stroke="#1f2937" strokeWidth="2" />
            <line x1="250" y1="360" x2="250" y2="450" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>

        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 text-center">
          Move your cursor around the screen &bull; Eyes track your coordinates in real-time
        </span>
      </div>

      {/* Interactive Control & Response Chips Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            BANANA POWER: {bananaEnergy * 25}%
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-3.5 h-1.5 rounded-sm transition-all ${
                  bananaEnergy >= bar ? 'bg-amber-400' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Prompt Response Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => handleInteract('banana')}
            className="btn-shimmer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold border border-amber-500 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            <span>🍌 Feed Banana</span>
          </button>

          <button
            type="button"
            onClick={() => handleInteract('advice')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Profile Advice</span>
          </button>

          <button
            type="button"
            onClick={() => handleInteract('joke')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            <Smile className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tell Joke</span>
          </button>

          <button
            type="button"
            onClick={() => handleInteract('hack')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            <span>Hack Mode</span>
          </button>
        </div>

        {/* Gear Wearable Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono">
          <span className="text-slate-400">GEAR TOGGLES:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowVisor((prev) => !prev);
                triggerSound(600);
              }}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                showVisor
                  ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              Visor: {showVisor ? 'ON' : 'OFF'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowHeadphones((prev) => !prev);
                triggerSound(700);
              }}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                showHeadphones
                  ? 'bg-amber-400/15 border-amber-400/40 text-amber-700 dark:text-amber-400 font-bold'
                  : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              Headphones: {showHeadphones ? 'ON' : 'OFF'}
            </button>

            <button
              type="button"
              onClick={() => {
                setOverclock((prev) => !prev);
                triggerSound(950, 'sawtooth');
              }}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                overclock
                  ? 'bg-rose-500/15 border-rose-400/40 text-rose-600 dark:text-rose-400 font-bold animate-pulse'
                  : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              Overclock: {overclock ? 'ACTIVE' : 'IDLE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCyberMonkeyHero;
