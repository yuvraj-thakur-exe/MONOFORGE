'use client';

import { Link } from '#/i18n/navigation';
import { Sparkles, Github, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { playClickSound } from '#/lib/sound/sound-effects';

export function FinalCta() {
  return (
    <section className="relative bg-white dark:bg-[#0f172a] border-b-2 border-slate-300 dark:border-slate-800 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl border-2 border-slate-800 dark:border-slate-700 bg-[#fffde6] dark:bg-slate-900 p-8 sm:p-14 shadow-[8px_8px_0px_#334155] dark:shadow-[8px_8px_0px_#475569] overflow-hidden text-center space-y-8 transition-colors duration-200">
          {/* Subtle Corner Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe600] text-slate-900 font-mono text-xs font-black border-2 border-slate-800 shadow-[2px_2px_0px_#334155] uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>ZERO MONKEY BUSINESS. PURE PRECISION ENGINEERING.</span>
          </div>

          {/* Center Graphic */}
          <div className="flex justify-center">
            <div className="relative p-2 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-800 dark:border-slate-700 shadow-[4px_4px_0px_#334155]">
              <MonoForgeMonkeyIcon className="w-16 h-16 sm:w-20 sm:h-20" />
              <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-[#ffe600] text-slate-900 text-[10px] font-mono font-black border border-slate-800 shadow-2xs">
                OFFICIAL
              </span>
            </div>
          </div>

          {/* Statement Headline */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans leading-tight">
              BUILD A PROFILE WORTH EXPLORING.
            </h2>
            <p className="text-sm sm:text-base font-mono text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              Your GitHub profile is more than a list of repositories. It is your developer identity. Make it visual. Make it personal. Make it yours.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/templates"
              onClick={() => playClickSound()}
              data-cursor-label="TEMPLATES"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-black text-sm tracking-wide border-2 border-slate-800 shadow-[4px_4px_0px_#334155] hover:shadow-[2px_2px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all btn-tactile cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-900 group-hover:rotate-12 transition-transform" />
              <span>EXPLORE TEMPLATES</span>
              <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound()}
              data-cursor-label="GITHUB"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm tracking-wide border-2 border-slate-800 dark:border-slate-700 shadow-[3px_3px_0px_#334155] hover:bg-[#ffe600] dark:hover:bg-[#ffe600] dark:hover:text-slate-900 transition-all btn-tactile cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>EXPLORE ON GITHUB</span>
            </a>
          </div>

          {/* Footer Guarantee */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-800 dark:text-slate-200 font-bold pt-4">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>100% Camo CDN Safe &bull; Zero External JS &bull; Open Source Engine</span>
          </div>
        </div>
      </div>
    </section>
  );
}
