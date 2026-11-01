'use client';

import { useState, useEffect } from 'react';
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
  Sparkles,
  LayoutTemplate,
} from 'lucide-react';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { DocsSearchModal } from '#/components/docs/DocsSearchModal';
import { GitHubStarButton } from '#/components/common/GitHubStarButton';
import { SoundToggleButton } from '#/components/common/SoundToggleButton';
import { playClickSound } from '#/lib/sound/sound-effects';
import { AssetLibraryModal } from '#/components/assets/AssetLibraryModal';

export function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '' || pathname === '/en';
  const isTemplates = Boolean(pathname?.includes('/templates'));
  const isVisualizer = Boolean(pathname?.includes('/visualizer'));
  const isDocs = Boolean(pathname?.includes('/docs'));
  const isInfo = Boolean(pathname?.includes('/info'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssetLibraryOpen, setIsAssetLibraryOpen] = useState(false);

  // Handle Escape key to close mobile menu & Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-[#f8fafc]/90 dark:bg-[#0f172a]/90 backdrop-blur-md shadow-xs transition-colors">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-3 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group" data-cursor-label="HOME">
            <div className="w-8 h-8 rounded-lg border-2 border-slate-900 bg-amber-400 flex items-center justify-center p-1 shadow-[2px_2px_0px_#0f172a] transition-transform group-hover:scale-105">
              <MonoForgeMonkeyIcon className="w-full h-full text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 dark:text-white font-mono leading-none">
                MONOFORGE
              </span>
              <span
                suppressHydrationWarning
                className="text-[9px] text-slate-500 dark:text-slate-400 font-mono font-medium hidden sm:inline uppercase"
              >
                GITHUB PROFILE BUILDER &amp; ENGINES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            {/* Home Navigation Button */}
            <Link
              href="/"
              onClick={() => playClickSound()}
              data-cursor-label="HOME"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border transition-all cursor-pointer ${
                isHome
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white font-black shadow-xs'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-amber-500" />
              <span className={isHome ? 'text-white dark:text-slate-950' : 'text-slate-800 dark:text-slate-200'}>
                HOME
              </span>
            </Link>

            {/* 75+ Templates */}
            <Link
              href="/templates"
              onClick={() => playClickSound()}
              data-cursor-label="TEMPLATES"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border transition-all cursor-pointer ${
                isTemplates
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white font-black shadow-xs'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
              <span className={isTemplates ? 'text-white dark:text-slate-950' : 'text-slate-800 dark:text-slate-200'}>
                TEMPLATES
              </span>
            </Link>

            {/* Visualizer Studio */}
            <Link
              href="/visualizer"
              onClick={() => playClickSound()}
              data-cursor-label="VISUALIZER"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border transition-all cursor-pointer ${
                isVisualizer
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white font-black shadow-xs'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className={isVisualizer ? 'text-white dark:text-slate-950' : 'text-slate-800 dark:text-slate-200'}>
                VISUALIZER
              </span>
            </Link>

            {/* Asset Intelligence Library Trigger */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsAssetLibraryOpen(true);
              }}
              data-cursor-label="ASSETS"
              className="flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border transition-all cursor-pointer border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-slate-800 dark:text-slate-200">ASSETS</span>
            </button>

            {/* Documentation Hub */}
            <Link
              href="/docs"
              onClick={() => playClickSound()}
              data-cursor-label="DOCS"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border transition-all cursor-pointer ${
                isDocs
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white font-black shadow-xs'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span className={isDocs ? 'text-white dark:text-slate-950' : 'text-slate-800 dark:text-slate-200'}>
                DOCS
              </span>
            </Link>

            {/* Info Hub */}
            <Link
              href="/info"
              onClick={() => playClickSound()}
              data-cursor-label="INFO"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border transition-all cursor-pointer ${
                isInfo
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white font-black shadow-xs'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-amber-500" />
              <span className={isInfo ? 'text-white dark:text-slate-950' : 'text-slate-800 dark:text-slate-200'}>
                INFO
              </span>
            </Link>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

            {/* Sound Toggle */}
            <SoundToggleButton />

            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
              title="Search documentation (⌘K)"
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
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs cursor-pointer"
              title="Search"
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
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-[#f8fafc] dark:bg-[#0f172a] p-4 space-y-2 animate-in slide-in-from-top-2 duration-150 font-mono text-xs shadow-lg">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isHome
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-500" />
                <span>HOME</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isTemplates
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-amber-500" />
                <span>TEMPLATES (120+)</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/visualizer"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isVisualizer
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>VISUALIZER STUDIO</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAssetLibraryOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border font-black transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 text-left"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>ASSET LIBRARY</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isDocs
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>DOCUMENTATION</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/info"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isInfo
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500" />
                <span>INFORMATION &amp; GUIDE</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <div className="pt-2 flex items-center justify-between">
              <SoundToggleButton />
              <GitHubStarButton />
            </div>
          </div>
        )}
      </header>

      {/* Docs Search Modal (Cmd+K) */}
      <DocsSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* MonoForge Asset Intelligence Library Modal */}
      <AssetLibraryModal isOpen={isAssetLibraryOpen} onClose={() => setIsAssetLibraryOpen(false)} />
    </>
  );
}
