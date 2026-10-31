'use client';

import { Suspense, useState } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { Link } from '#/i18n/navigation';
import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import {
  Sparkles,
  LayoutTemplate,
  Github,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export default function TemplatesPage() {
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-950 font-sans selection:bg-[#ffe600] selection:text-neutral-950 flex flex-col">
      <TopNav />

      {/* Hero Showcase Section */}
      <section className="relative bg-white border-b-2 border-neutral-900 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-neutral-900">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs">
                  [ 85+ SIGNATURE ARCHETYPES ]
                </span>
                <span className="text-neutral-600 hidden sm:inline">
                  &bull; 100% GITHUB CAMO SAFE &bull; ZERO JS &bull; 60FPS CSS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 uppercase font-sans">
                Curated Profile Templates.
              </h1>
              <p className="text-sm sm:text-base text-neutral-700 max-w-2xl font-mono leading-relaxed">
                Explore 85+ production-ready developer profile archetypes. From 3D isometric commit terrains and cyberpunk HUDs to Swiss typographers and minimalist portfolios. 1-click load into the all-in-one studio or copy directly.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsSyncModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>CONNECT GITHUB</span>
              </button>

              <Link
                href="/developer?mode=visual"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] btn-tactile transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>OPEN STUDIO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Feature Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs font-bold text-neutral-800">
            <div className="p-3 rounded-xl bg-neutral-50 border-2 border-neutral-900 flex items-center gap-2.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Camo Safe (0 &lt;script&gt;)</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border-2 border-neutral-900 flex items-center gap-2.5 shadow-2xs">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>60fps GPU Hardware Motion</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border-2 border-neutral-900 flex items-center gap-2.5 shadow-2xs">
              <LayoutTemplate className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>85+ Ready-to-Use Layouts</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border-2 border-neutral-900 flex items-center gap-2.5 shadow-2xs">
              <Cpu className="w-4 h-4 text-purple-600 shrink-0" />
              <span>1-Click Studio Load &amp; Diff</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Template Vault */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <Suspense
          fallback={
            <div className="p-12 text-center font-mono text-sm text-neutral-500 animate-pulse">
              Loading MonoForge Archetype Vault...
            </div>
          }
        >
          <TemplateGallery />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-neutral-900 bg-white py-8 px-4 sm:px-6 text-xs text-neutral-700 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <MonoForgeMonkeyIcon className="w-5 h-5" />
            <span className="font-bold text-neutral-950">MONOFORGE ARCHETYPE VAULT</span>
          </div>
          <span>&copy; {new Date().getFullYear()} MonoForge &bull; Open-source under MIT License.</span>
        </div>
      </footer>

      {/* GitHub Sync Modal */}
      <GitHubSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />
    </div>
  );
}