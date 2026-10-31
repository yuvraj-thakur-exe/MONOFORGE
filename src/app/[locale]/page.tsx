'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { StudioAudioToggle } from '#/components/studio/StudioAudioToggle';
import { NomokeyHero } from '#/components/studio/NomokeyHero';
import { LivePlaygroundBar } from '#/components/studio/LivePlaygroundBar';
import { HowItWorks } from '#/components/studio/HowItWorks';
import { NomokeyMarquee } from '#/components/studio/NomokeyMarquee';
import { StudioBento } from '#/components/studio/StudioBento';
import { TransformationShowcase } from '#/components/studio/TransformationShowcase';
import { NomokeyStickerBoard } from '#/components/studio/NomokeyStickerBoard';
import { CuratedArchetypes } from '#/components/studio/CuratedArchetypes';
import { NomokeyManifesto } from '#/components/studio/NomokeyManifesto';
import { FinalCta } from '#/components/studio/FinalCta';
import { HomeBrandLogoEmblem } from '#/components/home/HomeBrandLogoEmblem';
import { HomeCapabilitiesMatrix } from '#/components/home/HomeCapabilitiesMatrix';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { Link } from '#/i18n/navigation';
import {
  Github,
  BarChart3,
  Code2,
  Sparkles,
  BookOpen,
  Film,
  LayoutTemplate,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { playClickSound } from '#/lib/sound/sound-effects';

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-[#0c0d0e] text-neutral-900 dark:text-neutral-100 selection:bg-[#ffe600] selection:text-neutral-950 overflow-x-hidden font-sans transition-colors duration-200">
      {/* Floating Lo-Fi Audio Ambience Player */}
      <StudioAudioToggle />

      {/* Flagship Top Navigation with Replay Forge & Sound Controls */}
      <TopNav />

      {/* High-Impact Top Kinetic Marquee */}
      <NomokeyMarquee speed="fast" />

      {/* Flagship Centerpiece: Nomokey Hero with Paired Text & Geometric Monkey Companion */}
      <NomokeyHero />

      {/* Brand Logo Showcase & Live Telemetry Strip */}
      <section className="py-6 px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800 bg-[#fafbfc] dark:bg-[#0f172a]">
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

      {/* Reverse Amber Marquee Footer Strip */}
      <NomokeyMarquee reverse={true} theme="amber" speed="normal" />

      {/* High-Fashion Studio Editorial Footer */}
      <footer className="relative z-10 border-t-2 border-neutral-900 bg-white dark:bg-[#090a0f] py-12 px-4 sm:px-6 text-xs text-neutral-700 dark:text-neutral-300">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] overflow-hidden">
                <MonoForgeMonkeyIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
                  MONO<span className="text-amber-500">FORGE</span>
                </span>
                <p className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                  Zero Monkey Business. Pure Precision Profile Engineering.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
              <Link
                href="/developer?mode=visual"
                onClick={() => playClickSound()}
                className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>ALL-IN-ONE STUDIO</span>
              </Link>
              <Link
                href="/templates"
                onClick={() => playClickSound()}
                className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
              >
                <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
                <span>85+ TEMPLATES</span>
              </Link>
              <Link
                href="/developer?mode=editor"
                onClick={() => playClickSound()}
                className="hover:text-cyan-600 transition-colors flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>DEVELOPER IDE</span>
              </Link>
              <Link
                href="/developer?mode=telemetry"
                onClick={() => playClickSound()}
                className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                <span>47+ TELEMETRY</span>
              </Link>
              <Link
                href="/animator"
                onClick={() => playClickSound()}
                className="hover:text-purple-600 transition-colors flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-purple-500" />
                <span>SVG ANIMATOR</span>
              </Link>
              <Link
                href="/docs"
                onClick={() => playClickSound()}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>DOCUMENTATION</span>
              </Link>
              <a
                href="https://github.com/monoforge/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Camo CDN Safe &bull; Zero JavaScript Inside Generated SVGs &bull; Open Source MIT</span>
            </span>
            <span className="flex items-center gap-1">
              <span>Engineered with precision for developers</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
