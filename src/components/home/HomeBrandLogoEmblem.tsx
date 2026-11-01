'use client';

import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export function HomeBrandLogoEmblem() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-md">
      {/* Brand Icon Emblem with Glowing Cyber Ring */}
      <div className="relative group shrink-0">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-indigo-500 opacity-70 blur-xs group-hover:opacity-100 transition-opacity" />
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 border border-amber-400/50 flex items-center justify-center p-2 shadow-xl overflow-hidden">
          {/* Subtle Grid Lines inside icon */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)',
              backgroundSize: '8px 8px',
            }}
          />
          <img
            src="/assets/monoforge-monkey-logo.jpg"
            alt="MonoForge Official Logo"
            className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Brand Identity & Version Telemetry */}
      <div className="flex-1 text-center sm:text-left space-y-1.5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-white uppercase">
            MONO<span className="text-amber-500">FORGE</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            100% CLIENT-SIDE
          </span>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 font-mono tracking-wide leading-relaxed w-full">
          Forge a GitHub profile that gets noticed &bull; 60fps Camo CDN vectors &bull; Zero external tracking
        </p>

        {/* Micro Specs Bar */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Broken Links</span>
          </div>
          <span>&bull;</span>
          <div className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>Single-Store Architecture</span>
          </div>
          <span>&bull;</span>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>10 Production Archetypes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBrandLogoEmblem;

