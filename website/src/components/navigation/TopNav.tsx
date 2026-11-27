'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, usePathname } from '#/i18n/navigation';
import {
  Home,
  BookOpen,
  Layers,
  Search,
  Menu,
  X,
  Info,
  ChevronRight,
  ChevronDown,
  Sparkles,
  LayoutTemplate,
  FileCode2,
  Wand2,
  Code2,
  BarChart3,
  Film,
  Wrench,
} from 'lucide-react';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { GitHubStarButton } from '#/components/common/GitHubStarButton';
import { SoundToggleButton } from '#/components/common/SoundToggleButton';
import { playClickSound } from '#/lib/sound/sound-effects';
import { AssetLibraryModal } from '#/components/assets/AssetLibraryModal';
import { TEMPLATES } from '#/lib/templates/catalog';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { TELEMETRY_PLUGINS_CATALOG } from '#/lib/forge-telemetry/catalog';

export function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '' || pathname === '/en' || pathname === '/pt-BR';
  const isWizard = Boolean(pathname?.includes('/wizard'));
  const isDeveloper = Boolean(pathname?.includes('/developer'));
  const isProjectReadme = Boolean(pathname?.includes('/project-readme'));
  const isTemplates = Boolean(pathname?.includes('/templates'));
  const isVisualizer = Boolean(pathname?.includes('/visualizer'));
  const isTelemetry = Boolean(pathname?.includes('/telemetry'));
  const isAnimator = Boolean(pathname?.includes('/animator'));
  const isAssets = Boolean(pathname?.includes('/assets'));
  const isDocs = Boolean(pathname?.includes('/docs'));
  const isInfo = Boolean(pathname?.includes('/info'));
  const isToolRoute = isWizard || isDeveloper || isTelemetry || isAnimator || isAssets;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [isAssetLibraryOpen, setIsAssetLibraryOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  const openCommandPalette = () => {
    playClickSound();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('monoforge-open-command-palette'));
    }
  };

  // Handle Escape key & click-outside for menus (Cmd+K lives globally in CommandPalette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (toolsMenuOpen) setToolsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setToolsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, toolsMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsMenuOpen(false);
  }, [pathname]);

  const navLinkClass = (active: boolean, amberActive = false) =>
    `flex items-center gap-1.5 px-2.5 py-1.5 font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
      active
        ? amberActive
          ? 'bg-amber-400 text-slate-900 border-amber-500 font-black shadow-xs'
          : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white font-black shadow-xs'
        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  const mobileLinkClass = (active: boolean, amberActive = false) =>
    `flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
      active
        ? amberActive
          ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs'
          : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-[#f8fafc]/90 dark:bg-[#0f172a]/90 backdrop-blur-md shadow-xs transition-colors">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-3 sm:px-6 gap-2">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0" data-cursor-label="HOME">
            <div className="w-8 h-8 rounded-lg border-2 border-slate-800 bg-amber-400 flex items-center justify-center p-1 shadow-[2px_2px_0px_#334155] transition-transform group-hover:scale-105">
              <MonoForgeMonkeyIcon className="w-full h-full text-slate-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white font-mono leading-none">
                MONOFORGE
              </span>
              <span
                suppressHydrationWarning
                className="text-[9px] text-slate-500 dark:text-slate-400 font-mono font-medium hidden 2xl:inline uppercase"
              >
                GITHUB PROFILE BUILDER &amp; ENGINES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-1.5 font-mono text-[11px]">
            <Link
              href="/"
              onClick={() => playClickSound()}
              data-cursor-label="HOME"
              className={navLinkClass(isHome)}
            >
              <Home className="w-3.5 h-3.5 text-amber-500" />
              <span>HOME</span>
            </Link>

            <Link
              href="/project-readme"
              onClick={() => playClickSound()}
              data-cursor-label="PROJECT-README"
              className={navLinkClass(isProjectReadme, true)}
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-500" />
              <span>PROJECT README</span>
            </Link>

            <Link
              href="/templates"
              onClick={() => playClickSound()}
              data-cursor-label="TEMPLATES"
              className={navLinkClass(isTemplates)}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
              <span>TEMPLATES</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-700 dark:text-amber-300 text-[10px] font-black">
                {TEMPLATES.length}
              </span>
            </Link>

            <Link
              href="/visualizer"
              onClick={() => playClickSound()}
              data-cursor-label="VISUALIZER"
              className={navLinkClass(isVisualizer)}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>VISUALIZER</span>
            </Link>

            {/* Compact Engines & Builders Dropdown */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                aria-expanded={toolsMenuOpen}
                aria-haspopup="menu"
                onClick={() => {
                  playClickSound();
                  setToolsMenuOpen((prev) => !prev);
                }}
                className={navLinkClass(isToolRoute || toolsMenuOpen)}
              >
                <Wrench className="w-3.5 h-3.5 text-emerald-500" />
                <span>TOOLS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    toolsMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {toolsMenuOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-2 space-y-1 z-50"
                >
                  <Link
                    href="/wizard"
                    role="menuitem"
                    onClick={() => playClickSound()}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                      isWizard
                        ? 'bg-amber-400/20 text-slate-900 dark:text-white font-black'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Wand2 className="w-4 h-4 text-amber-500" />
                      <span>Guided Wizard</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">6-Step</span>
                  </Link>

                  <Link
                    href="/developer"
                    role="menuitem"
                    onClick={() => playClickSound()}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                      isDeveloper
                        ? 'bg-amber-400/20 text-slate-900 dark:text-white font-black'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-emerald-500" />
                      <span>Developer IDE</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Monaco JSON</span>
                  </Link>

                  <Link
                    href="/telemetry"
                    role="menuitem"
                    onClick={() => playClickSound()}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                      isTelemetry
                        ? 'bg-amber-400/20 text-slate-900 dark:text-white font-black'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <BarChart3 className="w-4 h-4 text-emerald-500" />
                      <span>Telemetry Hub</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {ALL_VISUALIZATION_IDS.length} SVGs
                    </span>
                  </Link>

                  <Link
                    href="/animator"
                    role="menuitem"
                    onClick={() => playClickSound()}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                      isAnimator
                        ? 'bg-amber-400/20 text-slate-900 dark:text-white font-black'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Film className="w-4 h-4 text-amber-500" />
                      <span>Vector Animator</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">60fps</span>
                  </Link>

                  <Link
                    href="/assets"
                    role="menuitem"
                    onClick={() => playClickSound()}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                      isAssets
                        ? 'bg-amber-400/20 text-slate-900 dark:text-white font-black'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-amber-500" />
                      <span>Asset &amp; Sticker Vault</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Camo SVG</span>
                  </Link>

                  <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        playClickSound();
                        setToolsMenuOpen(false);
                        setIsAssetLibraryOpen(true);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-emerald-500" />
                        <span>Quick Asset Picker</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Modal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/docs"
              onClick={() => playClickSound()}
              data-cursor-label="DOCS"
              className={navLinkClass(isDocs)}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>DOCS</span>
            </Link>

            <Link
              href="/info"
              onClick={() => playClickSound()}
              data-cursor-label="INFO"
              className={navLinkClass(isInfo)}
            >
              <Info className="w-3.5 h-3.5 text-amber-500" />
              <span>INFO</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

            {/* Sound Toggle */}
            <SoundToggleButton />

            {/* Global Command Palette Trigger Button */}
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
              title="Open Global Command Palette (⌘K)"
              aria-label="Open Global Command Palette"
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="px-1.5 py-0.2 rounded text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Animated GitHub Star Button */}
            <GitHubStarButton className="scale-95" />
          </nav>

          {/* Mobile Right Controls: Search + Hamburger Toggle */}
          <div className="flex xl:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={openCommandPalette}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs cursor-pointer"
              title="Open Command Palette (⌘K)"
              aria-label="Open Global Command Palette"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-[#f8fafc] dark:bg-[#0f172a] p-4 space-y-2 animate-in slide-in-from-top-2 duration-150 font-mono text-xs shadow-lg max-h-[82vh] overflow-y-auto">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isHome)}>
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-500" />
                <span>HOME</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/wizard" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isWizard)}>
              <span className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-amber-500" />
                <span>GUIDED WIZARD</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/developer" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isDeveloper)}>
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-500" />
                <span>DEVELOPER IDE</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/project-readme" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isProjectReadme, true)}>
              <span className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-amber-500" />
                <span>PROJECT README</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/templates" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isTemplates)}>
              <span className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-amber-500" />
                <span>TEMPLATES ({TEMPLATES.length})</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/visualizer" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isVisualizer)}>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>VISUALIZER ({ALL_VISUALIZATION_IDS.length})</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/telemetry" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isTelemetry)}>
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                <span>TELEMETRY ({TELEMETRY_PLUGINS_CATALOG.length}+)</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/animator" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isAnimator)}>
              <span className="flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-500" />
                <span>ANIMATOR (60FPS)</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/assets" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isAssets)}>
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>ASSET VAULT</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAssetLibraryOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border font-black transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>ASSET LIBRARY PICKER</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isDocs)}>
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>DOCUMENTATION</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link href="/info" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(isInfo)}>
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500" />
                <span>INFORMATION &amp; GUIDE</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <div className="pt-2 flex items-center justify-between gap-2">
              <SoundToggleButton />
              <GitHubStarButton />
            </div>
          </div>
        )}
      </header>

      {/* MonoForge Asset Intelligence Library Modal */}
      <AssetLibraryModal isOpen={isAssetLibraryOpen} onClose={() => setIsAssetLibraryOpen(false)} />
    </>
  );
}
