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
  Wand2,
  Code2,
  Sparkles,
  FileCode2,
  Film,
  Layers,
  Info,
  Shield,
} from 'lucide-react';
import { playClickSound } from '#/lib/sound/sound-effects';
import { TEMPLATES } from '#/lib/templates/catalog';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { pluginRegistry } from '#/lib/plugins/registry';

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
  const templateCount = TEMPLATES.length;
  const vizCount = ALL_VISUALIZATION_IDS.length;
  const pluginCount = pluginRegistry.length;

  return (
    <div className="relative flex flex-col min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-[#ffe600] selection:text-slate-950 overflow-x-hidden font-sans transition-colors duration-200">
      {/* Accessible Skip Link for Keyboard & Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ffe600] focus:text-slate-900 focus:font-black focus:border-2 focus:border-slate-800 focus:rounded-xl focus:shadow-[2px_2px_0px_#334155]"
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
        <section className="py-6 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
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
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 text-xs text-slate-800 dark:text-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
                <MonoForgeMonkeyIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                  MONO<span className="text-amber-500">FORGE</span>
                </span>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300 font-bold">
                  Zero Monkey Business. Pure Precision Profile Engineering.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 w-full lg:w-auto">
              <Link
                href="/wizard"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Wand2 className="w-3.5 h-3.5 text-amber-500" />
                <span>GUIDED WIZARD</span>
              </Link>
              <Link
                href="/developer"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>DEVELOPER IDE ({pluginCount})</span>
              </Link>
              <Link
                href="/templates"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
                <span>{templateCount} TEMPLATES</span>
              </Link>
              <Link
                href="/visualizer"
                onClick={() => playClickSound()}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{vizCount} VISUALIZATIONS</span>
              </Link>
              <Link
                href="/project-readme"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <FileCode2 className="w-3.5 h-3.5 text-amber-500" />
                <span>PROJECT README</span>
              </Link>
              <Link
                href="/telemetry"
                onClick={() => playClickSound()}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>TELEMETRY HUB</span>
              </Link>
              <Link
                href="/animator"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-amber-500" />
                <span>ANIMATOR (60FPS)</span>
              </Link>
              <Link
                href="/assets"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>ASSET VAULT</span>
              </Link>
              <Link
                href="/docs"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>DOCUMENTATION</span>
              </Link>
              <Link
                href="/info"
                onClick={() => playClickSound()}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>INFO HUB</span>
              </Link>
              <Link
                href="/privacy-policy"
                onClick={() => playClickSound()}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>PRIVACY POLICY</span>
              </Link>
              <a
                href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-600 dark:text-slate-300 font-bold">
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
                href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-amber-500 transition-colors"
              >
                MonoForge Open Source — Yuvraj Vinod Thakur
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
