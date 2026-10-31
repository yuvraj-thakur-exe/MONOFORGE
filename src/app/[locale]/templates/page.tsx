'use client';

import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { Link } from '#/i18n/navigation';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0c0d0e] text-neutral-950 dark:text-neutral-100 font-sans selection:bg-[#ffe600] selection:text-neutral-950 flex flex-col">
      <TopNav />

      {/* Hero Showcase Section */}
      <section className="relative bg-white dark:bg-[#141517] border-b-2 border-neutral-900 dark:border-neutral-800 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-neutral-900 dark:border-neutral-800">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs">
                  [ 85+ SIGNATURE ARCHETYPES ]
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 hidden sm:inline">
                  &bull; 100% GITHUB CAMO SAFE &bull; ZERO JS &bull; 60FPS CSS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
                Curated Profile Templates.
              </h1>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl font-mono leading-relaxed">
                Explore 85+ production-ready developer profile archetypes. From 3D isometric commit terrains and cyberpunk HUDs to Swiss typographers and minimalist portfolios. Review technical specifications and copy markdown snippets directly.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
              <Link
                href="/docs"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-950 dark:text-white font-bold border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b] btn-tactile transition-all"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>DOCUMENTATION</span>
              </Link>

              <Link
                href="/docs/getting-started/quickstart"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-bold border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] btn-tactile transition-all"
              >
                <span>QUICKSTART GUIDE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Feature Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center gap-2.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Camo Safe (0 &lt;script&gt;)</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center gap-2.5 shadow-2xs">
              <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Pure CSS @keyframes</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center gap-2.5 shadow-2xs">
              <span className="text-amber-500 font-black">#</span>
              <span>85 Tested Archetypes</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center gap-2.5 shadow-2xs">
              <span className="text-emerald-500 font-black">●</span>
              <span>Zero Tracking Harvesters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filterable Gallery */}
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 text-center font-mono text-xs text-neutral-500">
              Loading curated archetypes catalog...
            </div>
          }
        >
          <TemplateGallery />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-neutral-900 dark:border-neutral-800 bg-white dark:bg-[#0c0d0e] py-8 px-4 text-center font-mono text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MonoForgeMonkeyIcon className="w-5 h-5" />
            <span className="font-bold text-neutral-950 dark:text-white">MonoForge Templates</span>
          </div>
          <span>Curated Open-Source GitHub Profile README Archetypes. MIT Licensed.</span>
        </div>
      </footer>
    </div>
  );
}
