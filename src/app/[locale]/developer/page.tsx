'use client';

import { Suspense, useEffect, useState } from 'react';
import { Link } from '#/i18n/navigation';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ExportBar } from '#/components/developer/ExportBar';
import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { ReadmeHealthScoreModal } from '#/components/studio/ReadmeHealthScoreModal';
import { ReadmeImporterModal } from '#/components/importer/ReadmeImporterModal';
import { VersionHistoryModal } from '#/components/studio/VersionHistoryModal';
import { AssetVaultModal } from '#/components/studio/AssetVaultModal';
import { DiagnosticsHUDModal } from '#/components/diagnostics/DiagnosticsHUDModal';
import { ProfileIntelligenceModal } from '#/components/intelligence/ProfileIntelligenceModal';
import { AssetMarketplaceModal } from '#/components/marketplace/AssetMarketplaceModal';
import { WorkspaceManagerModal } from '#/components/workspace/WorkspaceManagerModal';
import { calculateProfileQualityScore } from '#/lib/optimizer/quality-score';
import { TEMPLATES } from '#/lib/templates/catalog';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  BookOpen,
  Copy,
  Check,
  BarChart3,
  Film,
  Github,
  LayoutDashboard,
  ListOrdered,
  LayoutTemplate,
  TrendingUp,
  FileUp,
  History,
  Package,
  Brain,
  ShoppingBag,
  FolderKanban,
} from 'lucide-react';

const CanvasTemplate = dynamic(
  () => import('#/components/templates/canvas').then(mod => mod.CanvasTemplate),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center font-mono text-xs text-neutral-500 animate-pulse bg-white">
        Loading Visual Canvas Studio...
      </div>
    ),
  }
);

const WizardContainer = dynamic(
  () => import('#/components/wizard').then(mod => mod.WizardContainer),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center font-mono text-xs text-neutral-500 animate-pulse bg-white">
        Loading Step-by-Step Guided Wizard...
      </div>
    ),
  }
);

const TelemetryStudio = dynamic(
  () => import('#/components/telemetry/TelemetryStudio').then(mod => mod.TelemetryStudio),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[500px] w-full flex items-center justify-center font-mono text-xs text-neutral-500 animate-pulse bg-[#fafafa]">
        Loading 47+ Telemetry Arsenal...
      </div>
    ),
  }
);

const AnimatorStudio = dynamic(
  () => import('#/components/animator/AnimatorStudio').then(mod => mod.AnimatorStudio),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[500px] w-full flex items-center justify-center font-mono text-xs text-neutral-500 animate-pulse bg-white">
        Loading Vector Animation Studio...
      </div>
    ),
  }
);

type StudioMode = 'visual' | 'telemetry' | 'animator';

function LocalizedDeveloperContent() {
  const searchParams = useSearchParams();
  const config = useReadmeStore(state => state.config);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  // Studio Mode: visual | telemetry | animator (raw editor mode removed)
  const modeParam = searchParams?.get('mode');
  const initialMode: StudioMode =
    modeParam === 'telemetry' || modeParam === 'animator'
      ? (modeParam as StudioMode)
      : 'visual';

  const [studioMode, setStudioMode] = useState<StudioMode>(initialMode);
  const [visualSubMode, setVisualSubMode] = useState<'canvas' | 'guided'>('canvas');

  // Studio Action Controls
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState<boolean>(false);
  const [isDiagnosticsModalOpen, setIsDiagnosticsModalOpen] = useState<boolean>(false);
  const [isIntelligenceModalOpen, setIsIntelligenceModalOpen] = useState<boolean>(false);
  const [isMarketplaceModalOpen, setIsMarketplaceModalOpen] = useState<boolean>(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState<boolean>(false);
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  const qualityReport = calculateProfileQualityScore(config);

  // Update mode when URL param changes; automatically redirect mode=editor to visual
  useEffect(() => {
    const currentModeParam = searchParams?.get('mode');
    if (currentModeParam === 'editor') {
      handleModeChange('visual');
      return;
    }
    if (
      currentModeParam &&
      (currentModeParam === 'visual' ||
        currentModeParam === 'telemetry' ||
        currentModeParam === 'animator')
    ) {
      setStudioMode(currentModeParam as StudioMode);
    }
  }, [searchParams]);

  const handleModeChange = (newMode: StudioMode) => {
    setStudioMode(newMode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', newMode);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handleQuickCopy = () => {
    try {
      const md = buildMarkdown(config);
      navigator.clipboard?.writeText(md);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ['#ffe600', '#06b6d4'] });
      } catch {
        // Ignored
      }
    } catch {
      // Fallback
    }
  };

  // Decode config or load template from URL if provided (?config=base64 or ?template=id)
  useEffect(() => {
    const configParam = searchParams?.get('config');
    if (configParam) {
      try {
        const decoded = decodeURIComponent(escape(atob(configParam)));
        setEntireConfig(decoded);
        return;
      } catch {
        // Ignore invalid URL param
      }
    }

    const templateParam = searchParams?.get('template');
    if (templateParam) {
      const found = TEMPLATES.find(t => t.id === templateParam);
      if (found) {
        setEntireConfig(found.config);
      }
    }
  }, [searchParams, setEntireConfig]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-neutral-950 font-sans selection:bg-[#ffe600] selection:text-neutral-950">
      {/* ============================================================== */}
      {/* 1. MASTER UNIFIED STUDIO HEADER BAR                             */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-3 sm:px-4 py-2 bg-white border-b-2 border-neutral-900 shrink-0 gap-2 shadow-xs">
        {/* Brand & Studio Emblem */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
            <div className="p-1 rounded-lg bg-white border-2 border-neutral-900 group-hover:scale-105 transition-transform shadow-[2px_2px_0px_#18181b] overflow-hidden">
              <MonoForgeMonkeyIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="font-black text-sm tracking-tight text-neutral-950 hidden sm:inline uppercase">
              MONO<span className="text-[#ffe600] bg-neutral-950 px-1 rounded ml-0.5 border border-neutral-900">FORGE</span>
            </span>
          </Link>

          <div className="h-4 w-px bg-neutral-300 hidden sm:block" />

          {/* Master Studio Modes Switcher */}
          <nav aria-label="Studio Modes" className="flex items-center bg-neutral-100 p-1 rounded-xl border-2 border-neutral-900 gap-1 shadow-2xs">
            <button
              type="button"
              onClick={() => handleModeChange('visual')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                studioMode === 'visual'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white'
              }`}
              title="Visual Studio: Drag & drop sections, visual canvas & wizard"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="hidden md:inline">VISUAL STUDIO</span>
              <span className="md:hidden">VISUAL</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('telemetry')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                studioMode === 'telemetry'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white'
              }`}
              title="47+ Telemetry: Standalone SVG infographics and Action YAML"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden md:inline">47+ TELEMETRY</span>
              <span className="md:hidden">STATS</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('animator')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                studioMode === 'animator'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white'
              }`}
              title="SVG Animator: 60fps dynamic vector animations and motion"
            >
              <Film className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="hidden md:inline">SVG ANIMATOR</span>
              <span className="md:hidden">ANIMATE</span>
            </button>
          </nav>
        </div>

        {/* Global Action Controls on Right */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* README Health Score Pill */}
          <button
            type="button"
            onClick={() => setIsHealthModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="README Health Score & Camo CDN Audit"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">HEALTH:</span>
            <span className="font-black px-1 rounded bg-neutral-950 text-[#ffe600] text-[11px]">{qualityReport.overallScore}%</span>
          </button>

          {/* Import README Action */}
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="Import existing README from GitHub or Markdown"
          >
            <FileUp className="w-3.5 h-3.5 text-blue-600" />
            <span>IMPORT</span>
          </button>

          {/* Version History Action */}
          <button
            type="button"
            onClick={() => setIsHistoryModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="Version History & Snapshots"
          >
            <History className="w-3.5 h-3.5 text-amber-600" />
            <span>HISTORY</span>
          </button>

          {/* Asset Vault Action */}
          <button
            type="button"
            onClick={() => setIsVaultModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="Asset & Badge Vault"
          >
            <Package className="w-3.5 h-3.5 text-indigo-600" />
            <span>VAULT</span>
          </button>

          {/* Diagnostics HUD Action */}
          <button
            type="button"
            onClick={() => setIsDiagnosticsModalOpen(true)}
            className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="System Diagnostics & Telemetry HUD"
          >
            <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
            <span>DIAGNOSTICS</span>
          </button>

          {/* Intelligence IQ Action */}
          <button
            type="button"
            onClick={() => setIsIntelligenceModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="AI Profile Intelligence & Scoring"
          >
            <Brain className="w-3.5 h-3.5 text-violet-600" />
            <span>PROFILE IQ</span>
          </button>

          {/* Marketplace Action */}
          <button
            type="button"
            onClick={() => setIsMarketplaceModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="Community Asset Marketplace"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-pink-600" />
            <span>MARKET</span>
          </button>

          {/* Workspaces Action */}
          <button
            type="button"
            onClick={() => setIsWorkspaceModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title="Workspace & Multi-Profile Manager"
          >
            <FolderKanban className="w-3.5 h-3.5 text-teal-600" />
            <span>WORKSPACES</span>
          </button>

          {/* Curated Archetypes Link */}
          <Link
            href="/templates"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile"
            title="Curated Starter Archetypes"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden lg:inline">TEMPLATES</span>
          </Link>

          {/* Quick Copy Markdown */}
          <button
            type="button"
            onClick={handleQuickCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold font-mono transition-all border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            title="Quick Copy Raw Markdown"
          >
            {copiedMd ? <Check className="w-3.5 h-3.5 text-[#ffe600]" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedMd ? 'COPIED!' : 'COPY MD'}</span>
          </button>

          {/* Connect GitHub Button */}
          <button
            type="button"
            onClick={() => setIsSyncModalOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 text-xs font-black font-mono transition-all border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            title="Authenticate & Push Directly to GitHub Profile README"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CONNECT GITHUB</span>
            <span className="sm:hidden">SYNC</span>
          </button>

          <Link
            href="/info"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-mono font-bold transition-all border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile"
            title="Guide Hub & Docs"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUIDE</span>
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. MODE 1: VISUAL STUDIO (Canvas & Guided Questions)            */}
      {/* ============================================================== */}
      {studioMode === 'visual' && (
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          {/* Visual Studio Sub-bar */}
          <div className="bg-white border-b-2 border-neutral-900 px-4 py-1.5 flex items-center justify-between z-10 h-11 shrink-0">
            <div className="flex items-center bg-white p-0.5 rounded-lg border-2 border-neutral-900 gap-1 shadow-[2px_2px_0px_#18181b]">
              <button
                type="button"
                onClick={() => setVisualSubMode('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  visualSubMode === 'canvas'
                    ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                    : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>VISUAL CANVAS</span>
              </button>
              <button
                type="button"
                onClick={() => setVisualSubMode('guided')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  visualSubMode === 'guided'
                    ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                    : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>STEP-BY-STEP WIZARD</span>
              </button>
            </div>

            <div className="text-[11px] font-mono font-bold text-neutral-700 hidden sm:flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>
                {visualSubMode === 'canvas'
                  ? 'Click sections to add and customize layout visually'
                  : 'Answer guided questions to generate your optimal profile archetype'}
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto">
            {visualSubMode === 'canvas' ? <CanvasTemplate /> : <WizardContainer />}
          </div>

          <div className="shrink-0 border-t-2 border-neutral-900">
            <ExportBar onOpenSync={() => setIsSyncModalOpen(true)} />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. MODE 2: 47+ TELEMETRY (Interactive SVG Modules & Workflows)  */}
      {/* ============================================================== */}
      {studioMode === 'telemetry' && (
        <div className="flex-1 bg-[#fafafa]">
          <TelemetryStudio />
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. MODE 3: SVG ANIMATOR (Vector Keyframe Motion Studio)         */}
      {/* ============================================================== */}
      {studioMode === 'animator' && (
        <div className="flex-1 bg-white">
          <AnimatorStudio />
        </div>
      )}

      {/* GitHub Sync Modal */}
      <GitHubSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      {/* Platform Modals */}
      <ReadmeHealthScoreModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />
      <ReadmeImporterModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      <VersionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
      <AssetVaultModal
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
      />
      <DiagnosticsHUDModal
        isOpen={isDiagnosticsModalOpen}
        onClose={() => setIsDiagnosticsModalOpen(false)}
      />
      <ProfileIntelligenceModal
        isOpen={isIntelligenceModalOpen}
        onClose={() => setIsIntelligenceModalOpen(false)}
      />
      <AssetMarketplaceModal
        isOpen={isMarketplaceModalOpen}
        onClose={() => setIsMarketplaceModalOpen(false)}
      />
      <WorkspaceManagerModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
      />
    </div>
  );
}

function DeveloperPageSkeleton() {
  return (
    <div className="h-screen bg-[#fafafa] flex flex-col p-2.5 sm:p-4 space-y-3 font-mono select-none">
      <div className="h-12 w-full rounded-xl bg-white border-2 border-neutral-900 shadow-2xs flex items-center px-4 justify-between animate-pulse">
        <div className="h-4 w-36 bg-neutral-200 rounded" />
        <div className="flex gap-2">
          <div className="h-7 w-24 bg-neutral-100 rounded border border-neutral-300" />
          <div className="h-7 w-28 bg-[#ffe600] rounded border border-neutral-900" />
        </div>
      </div>
      <div className="flex-1 flex gap-3 min-h-0 overflow-hidden">
        <div className="w-full h-full rounded-2xl bg-white border-2 border-neutral-900 shadow-2xs flex flex-col p-6 space-y-4 animate-pulse">
          <div className="h-6 w-48 bg-neutral-200 rounded mb-4" />
          <div className="h-32 w-full bg-neutral-100 rounded-xl border border-neutral-300" />
          <div className="h-32 w-full bg-neutral-100 rounded-xl border border-neutral-300" />
        </div>
      </div>
    </div>
  );
}

export default function LocalizedDeveloperPage() {
  return (
    <Suspense fallback={<DeveloperPageSkeleton />}>
      <LocalizedDeveloperContent />
    </Suspense>
  );
}
