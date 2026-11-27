'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import {
  Sparkles,
  ArrowRight,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { playClickSound } from '#/lib/sound/sound-effects';

export function TransformationShowcase() {
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');

  const switchMode = (mode: 'after' | 'before') => {
    playClickSound();
    setViewMode(mode);
  };

  return (
    <section className="relative bg-[#fafbfc] dark:bg-[#0f172a] border-b-2 border-slate-300 dark:border-slate-700 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-slate-300 dark:border-slate-700 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-slate-900 font-black border-2 border-slate-800 shadow-[2px_2px_0px_#334155]">
                [ 03 // VISUAL TRANSFORMATION ]
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-300">DUAL STATE PREVIEW</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              THE NIGHT &amp; DAY DIFFERENCE.
            </h2>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-700 shadow-[2px_2px_0px_#334155]">
            <button
              type="button"
              onClick={() => switchMode('before')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-black transition-all btn-tactile cursor-pointer ${
                viewMode === 'before'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-black'
              }`}
            >
              BORING DEFAULT README
            </button>
            <button
              type="button"
              onClick={() => switchMode('after')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-black flex items-center gap-1.5 transition-all btn-tactile cursor-pointer ${
                viewMode === 'after'
                  ? 'bg-[#ffe600] text-slate-900 border border-slate-800 shadow-xs'
                  : 'text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>MONOFORGE PROFILE</span>
            </button>
          </div>
        </div>

        {/* Viewport Card */}
        <div className="relative rounded-2xl border-2 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_#334155] dark:shadow-[6px_6px_0px_#475569] overflow-hidden">
          {/* GitHub Window Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 border border-slate-700/40" />
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-slate-700/40" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 border border-slate-700/40" />
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold ml-2">
                github.com/developer/developer/README.md
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              {viewMode === 'after' ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>MONOFORGE 60FPS CAMO ENGINE</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-red-500 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>DEFAULT TEMPLATE</span>
                </span>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 font-sans">
            {viewMode === 'before' ? (
              /* BORING BEFORE STATE */
              <div className="space-y-4 max-w-xl text-slate-700 dark:text-slate-300 font-mono text-sm leading-relaxed opacity-85">
                <div className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 text-xs font-bold mb-2">
                  Generic GitHub Starter
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Hi there
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>I&apos;m currently working on my personal portfolio...</li>
                  <li>I&apos;m currently learning Rust and TypeScript...</li>
                  <li>I&apos;m looking to collaborate on open source projects...</li>
                  <li>Ask me about React, Next.js, and CSS...</li>
                  <li>How to reach me: myemail@example.com</li>
                  <li>Fun fact: I drink a lot of coffee.</li>
                </ul>
                <div className="pt-6 space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono font-bold border border-slate-300 dark:border-slate-700">
                    [ SAMPLE DEVELOPER DATA // ILLUSTRATIVE PREVIEW ]
                  </span>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 italic">
                    Standard bullet-point READMEs lack visual hierarchy and fail to showcase developer momentum or technical depth.
                  </p>
                </div>
              </div>
            ) : (
              /* MONOFORGE ICONIC AFTER STATE */
              <div className="space-y-8">
                {/* Hero HUD Banner */}
                <div className="rounded-xl border-2 border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white p-6 sm:p-8 relative overflow-hidden shadow-[4px_4px_0px_#334155]">
                  <div className="absolute top-3 right-3 p-1">
                    <img
                      src="/assets/monoforge-monkey-logo.jpg"
                      alt="Logo"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_#334155]"
                    />
                  </div>
                  <div className="relative z-10 space-y-3 pr-24 sm:pr-28">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ffe600] text-slate-900 border border-slate-800 font-mono text-xs font-black shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>FULL-STACK ARCHITECT // SYSTEMS ENGINEER</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-mono text-[10px] font-bold">
                        [ SAMPLE DEVELOPER DATA ]
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
                      ALEXANDER FORGE
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 font-medium leading-relaxed w-full">
                      Architecting distributed systems, zero-dependency CLIs, and 60fps GPU web applications.
                    </p>
                  </div>
                </div>

                {/* Telemetry Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block mb-1">
                      YEARLY CONTRIBUTIONS
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      2,419
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                      Top 2% Worldwide
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block mb-1">
                      CORE STACK
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">
                      TypeScript &bull; Rust &bull; Go
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block mt-1">
                      Verified Commit Distribution
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block mb-1">
                      TELEMETRY STATUS
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                      Active Action Sync
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                      Midnight UTC Daily Dispatch
                    </span>
                  </div>
                </div>

                {/* CTA inside preview */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                    Ready to transform your own profile in 60 seconds?
                  </span>
                  <Link
                    href="/wizard"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#ffe600] text-slate-900 font-black text-xs border-2 border-slate-800 shadow-[2px_2px_0px_#334155] hover:bg-amber-300 transition-all btn-tactile"
                  >
                    <span>Forge My Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
