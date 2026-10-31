'use client';

import { Suspense, useEffect, useState } from 'react';
import { Link } from '#/i18n/navigation';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useReadmeStore } from '#/store/useReadmeStore';
import { LivePreview } from '#/components/developer/LivePreview';
import { PluginPanel } from '#/components/developer/PluginPanel';
import { ExportBar } from '#/components/developer/ExportBar';
import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { CyberMonkeyCopilot } from '#/components/mascot/CyberMonkeyCopilot';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { EditorSkeleton } from '#/components/developer/EditorSkeleton';
import { TEMPLATES } from '#/lib/templates/catalog';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Eye,
  FileCode2,
  Columns2,
  Copy,
  Check,
  BarChart3,
  Film,
  Github,
  LayoutDashboard,
  ListOrdered,
  LayoutTemplate,
} from 'lucide-react';

// Dynamic lazy-loaded studio modes for high-speed initial bundle & zero lag
const Editor = dynamic(
  () => import('#/components/developer/Editor').then(mod => mod.Editor),
  {
    ssr: false,
    loading: () => <EditorSkeleton />,
  }
);

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

type StudioMode = 'visual' | 'editor' | 'telemetry' | 'animator';

function LocalizedDeveloperContent() {
  const searchParams = useSearchParams();
  const config = useReadmeStore(state => state.config);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);
  const updateSettings = useReadmeStore(state => state.updateSettings);

  // Studio Mode: visual | editor | telemetry | animator
  const modeParam = searchParams?.get('mode');
  const initialMode: StudioMode =
    modeParam === 'visual' || modeParam === 'telemetry' || modeParam === 'animator'
      ? (modeParam as StudioMode)
      : 'editor';

  const [studioMode, setStudioMode] = useState<StudioMode>(initialMode);
  const [visualSubMode, setVisualSubMode] = useState<'canvas' | 'guided'>('canvas');

  // Developer IDE View Controls
  const [showPluginPanel, setShowPluginPanel] = useState<boolean>(true);
  const [showCopilot, setShowCopilot] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview' | 'plugins' | 'copilot'>('editor');
  const [desktopView, setDesktopView] = useState<'split' | 'editor' | 'preview'>('split');
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  // Update mode when URL param changes
  useEffect(() => {
    const currentModeParam = searchParams?.get('mode');
    if (
      currentModeParam &&
      (currentModeParam === 'visual' ||
        currentModeParam === 'editor' ||
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
        {/* Brand & All-in-One Studio Badge */}
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

          {/* Master 4-Mode Switcher */}
          <nav aria-label="Studio Modes" className="flex items-center bg-neutral-100 p-1 rounded-xl border-2 border-neutral-900 gap-1 shadow-2xs">
            <button
              type="button"
              onClick={() => handleModeChange('visual')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                studioMode === 'visual'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white'
              }`}
              title="Visual Studio: Drag & drop sections and canvas"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="hidden md:inline">VISUAL STUDIO</span>
              <span className="md:hidden">VISUAL</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('editor')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                studioMode === 'editor'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white'
              }`}
              title="Developer IDE: Monaco JSON split editor and live preview"
            >
              <FileCode2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="hidden md:inline">&lt;/&gt; DEVELOPER IDE</span>
              <span className="md:hidden">IDE</span>
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
          {/* Templates Catalog Link */}
          <Link
            href="/templates"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold transition-all border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile"
            title="Browse All 85+ Archetypes & Templates"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
            <span>TEMPLATES</span>
          </Link>

          {/* Quick Copy Markdown Action */}
          <button
            type="button"
            onClick={handleQuickCopy}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 text-white hover:bg-[#ffe600] hover:text-neutral-950 text-xs font-mono font-bold transition-all border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] cursor-pointer"
            title="1-Click Copy Profile Markdown"
          >
            {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#ffe600]" />}
            <span>{copiedMd ? 'COPIED MD' : 'COPY MD'}</span>
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
      {/* 3. MODE 2: DEVELOPER IDE (Monaco Split View & Arsenal)          */}
      {/* ============================================================== */}
      {studioMode === 'editor' && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Sub-bar for Monaco IDE Controls */}
          <div className="bg-white border-b-2 border-neutral-900 px-3 sm:px-4 py-1.5 flex items-center justify-between shrink-0 gap-2">
            <div className="flex items-center gap-2">
              {/* Desktop Plugin Drawer Toggle */}
              <button
                type="button"
                onClick={() => setShowPluginPanel(prev => !prev)}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] cursor-pointer ${
                  showPluginPanel
                    ? 'bg-[#ffe600] text-neutral-950 font-black'
                    : 'bg-white text-neutral-950 hover:bg-[#ffe600]'
                }`}
                title="Toggle Arsenal & Templates Drawer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Arsenal &amp; Presets</span>
                {showPluginPanel ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>

              {/* Cyber Monkey Co-Pilot Toggle */}
              <button
                type="button"
                onClick={() => setShowCopilot(prev => !prev)}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] cursor-pointer ${
                  showCopilot
                    ? 'bg-[#ffe600] text-neutral-950 font-black'
                    : 'bg-white text-neutral-950 hover:bg-[#ffe600]'
                }`}
                title="Toggle Cyber Monkey Co-Pilot Assistant"
              >
                <span>🐵</span>
                <span>Co-Pilot</span>
              </button>

              {/* Design Tokens: Badge Style Switcher */}
              <div className="hidden xl:flex items-center gap-1 bg-[#f4f4f5] px-2 py-0.5 rounded-lg border border-neutral-300 text-xs">
                <span className="text-[10px] font-mono text-neutral-600 font-bold uppercase mr-1">Badges:</span>
                {(['for-the-badge', 'flat', 'flat-square'] as const).map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => updateSettings({ badgeStyle: style })}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      config.settings?.badgeStyle === style
                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {style.replace('for-the-', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Layout Switcher: Split / Editor / Preview */}
            <div className="hidden lg:flex items-center bg-white p-0.5 rounded-lg border-2 border-neutral-900 gap-1 shadow-[2px_2px_0px_#18181b]">
              <button
                type="button"
                onClick={() => setDesktopView('split')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  desktopView === 'split'
                    ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
                title="Split View (Editor + Preview)"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>Split</span>
              </button>
              <button
                type="button"
                onClick={() => setDesktopView('editor')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  desktopView === 'editor'
                    ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
                title="Editor Fullscreen"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setDesktopView('preview')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  desktopView === 'preview'
                    ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
                title="Preview Fullscreen"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>

            {/* Mobile View Switcher */}
            <div className="flex md:hidden items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setMobileTab('editor')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  mobileTab === 'editor'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FileCode2 className="w-3 h-3" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('preview')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  mobileTab === 'preview'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('plugins')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  mobileTab === 'plugins'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Arsenal</span>
              </button>
            </div>
          </div>

          {/* Main Split Area */}
          <main className="flex-1 flex min-h-0 overflow-hidden p-2 sm:p-2.5 gap-2 sm:gap-2.5 bg-[#f4f4f5]">
            {/* Left: Plugin & Template Drawer */}
            <aside
              className={`shrink-0 h-full ${
                showPluginPanel ? 'md:block md:w-72 lg:w-80' : 'md:hidden'
              } ${mobileTab === 'plugins' ? 'block w-full' : 'hidden md:block'}`}
            >
              <PluginPanel />
            </aside>

            {/* Center: Monaco JSON Editor */}
            <section
              className={`h-full ${
                desktopView === 'preview'
                  ? 'hidden'
                  : desktopView === 'editor'
                  ? 'flex-1 w-full'
                  : 'flex-1 min-w-[280px]'
              } ${mobileTab === 'editor' ? 'block' : 'hidden md:block'}`}
            >
              <Editor />
            </section>

            {/* Optional Right Drawer: Cyber Monkey Co-Pilot */}
            {showCopilot && (
              <aside className="hidden lg:block w-72 shrink-0 h-full overflow-y-auto">
                <CyberMonkeyCopilot />
              </aside>
            )}

            {/* Right: Live Markdown Preview */}
            <section
              className={`h-full ${
                desktopView === 'editor'
                  ? 'hidden'
                  : desktopView === 'preview'
                  ? 'flex-1 w-full'
                  : 'flex-1 min-w-[280px]'
              } ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}
            >
              <LivePreview />
            </section>
          </main>

          {/* Bottom Export Bar */}
          <footer className="shrink-0 border-t-2 border-neutral-900">
            <ExportBar onOpenSync={() => setIsSyncModalOpen(true)} />
          </footer>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. MODE 3: 47+ TELEMETRY (Interactive SVG Modules & Workflows) */}
      {/* ============================================================== */}
      {studioMode === 'telemetry' && (
        <div className="flex-1 bg-[#fafafa]">
          <TelemetryStudio />
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. MODE 4: SVG ANIMATOR (Vector Keyframe Motion Studio)         */}
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
        <div className="w-72 h-full rounded-2xl bg-white border-2 border-neutral-900 shadow-2xs hidden md:flex flex-col p-4 space-y-3 animate-pulse shrink-0">
          <div className="h-4 w-28 bg-neutral-200 rounded mb-2" />
          <div className="h-10 w-full bg-neutral-100 rounded-xl border border-neutral-300" />
          <div className="h-10 w-full bg-neutral-100 rounded-xl border border-neutral-300" />
        </div>
        <div className="flex-1 h-full min-w-0">
          <EditorSkeleton />
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