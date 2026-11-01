'use client';

import dynamic from 'next/dynamic';
import { TopNav } from '#/components/navigation/TopNav';
import { StudioAudioToggle } from '#/components/studio/StudioAudioToggle';
import { NomokeyHero } from '#/components/studio/NomokeyHero';
import { LivePlaygroundBar } from '#/components/studio/LivePlaygroundBar';
import { HowItWorks } from '#/components/studio/HowItWorks';
import { NomokeyMarquee } from '#/components/studio/NomokeyMarquee';
import { StudioBento } from '#/components/studio/StudioBento';
import { NomokeyManifesto } from '#/components/studio/NomokeyManifesto';
import { FinalCta } from '#/components/studio/FinalCta';
import { HomeBrandLogoEmblem } from '#/components/home/HomeBrandLogoEmblem';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { Link } from '#/i18n/navigation';
import {
  Github,
  BarChart3,
  BookOpen,
  LayoutTemplate,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { playClickSound } from '#/lib/sound/sound-effects';

// High-Performance Below-The-Fold Code-Splitting with SSR Pre-Rendering
const TransformationShowcase = dynamic(
  () => import('#/components/studio/TransformationShowcase').then((m) => m.TransformationShowcase),
  { ssr: true }
);

const NomokeyStickerBoard = dynamic(
  () => import('#/components/studio/NomokeyStickerBoard').then((m) => m.NomokeyStickerBoard),
  { ssr: true }
);

const CuratedArchetypes = dynamic(
  () => import('#/components/studio/CuratedArchetypes').then((m) => m.CuratedArchetypes),
  { ssr: true }
);

const HomeCapabilitiesMatrix = dynamic(
  () => import('#/components/home/HomeCapabilitiesMatrix').then((m) => m.HomeCapabilitiesMatrix),
  { ssr: true }
);

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-[#ffe600] selection:text-slate-950 overflow-x-hidden font-sans transition-colors duration-200">
      {/* Accessible Skip Link for Keyboard & Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ffe600] focus:text-slate-950 focus:font-black focus:border-2 focus:border-slate-900 focus:rounded-xl focus:shadow-[2px_2px_0px_#0f172a]"
      >
        Skip to main content
      </a>

      {/* Floating Lo-Fi Audio Ambience Player */}
      <StudioAudioToggle />

      {/* Flagship Top Navigation & Controls */}
      <TopNav />

      {/* High-Impact Top Kinetic Marquee */}
      <NomokeyMarquee speed="fast" />

      {/* Primary Page Landmark for Screen Readers & SEO */}
      <main id="main-content" role="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Flagship Centerpiece: Nomokey Hero with Paired Text & Geometric Monkey Companion */}
        <NomokeyHero />

        {/* Brand Logo Showcase & Live Telemetry Strip */}
        <section className="py-6 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="max-w-7xl mx-auto">
            <HomeBrandLogoEmblem />
          </div>
        </section>

        {/* Interactive Handle Live Sandbox */}
        <LivePlaygroundBar />

        {/* 6-Step How It Works Guide */}
        <HowItWorks />

        {/* Studio Bento Grid: Telemetry, Monaco IDE, Vector Camo Engines */}
        <StudioBento />

        {/* Flagship What MonoForge Can Do & What It Has: Full Capability Matrix */}
        <HomeCapabilitiesMatrix />

        {/* Transformation Showcase: Night & Day Before/After */}
        <TransformationShowcase />

        {/* Tactile Sticker Deck */}
        <NomokeyStickerBoard />

        {/* Curated Signature Profile Starters */}
        <CuratedArchetypes />

        {/* The MonoForge Manifesto & Technical FAQ */}
        <NomokeyManifesto />

        {/* Final Conversion CTA: Build a profile worth exploring */}
        <FinalCta />
      </main>

      {/* Reverse Amber Marquee Footer Strip */}
      <NomokeyMarquee reverse={true} theme="amber" speed="normal" />

      {/* High-Fashion Studio Editorial Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] py-12 px-4 sm:px-6 text-xs text-slate-800 dark:text-neutral-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
                <MonoForgeMonkeyIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                  MONO<span className="text-amber-500">FORGE</span>
                </span>
                <p className="text-[11px] font-mono text-slate-600 dark:text-neutral-300 font-bold">
                  Zero Monkey Business. Pure Precision Profile Engineering.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-black text-slate-900 dark:text-white">
              <Link
                href="/templates"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
                <span>75+ TEMPLATES</span>
              </Link>
              <Link
                href="/telemetry"
                onClick={() => playClickSound()}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>47+ TELEMETRY</span>
              </Link>
              <Link
                href="/docs"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>DOCUMENTATION</span>
              </Link>
              <a
                href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-600 dark:text-neutral-300 font-bold">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Camo CDN Safe &bull; Zero JavaScript Inside Generated SVGs &bull; Open Source MIT</span>
            </span>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="flex items-center gap-1">
                <span>Engineered with precision for developers</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
              </span>
              <a
                href="https://github.com/yuvraj-thakur-exe"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono font-bold text-slate-800 dark:text-neutral-200 hover:text-amber-500 transition-colors"
              >
                Made by Yuvraj Vinod Thakur
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
