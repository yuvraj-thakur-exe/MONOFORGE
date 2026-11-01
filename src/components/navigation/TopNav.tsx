'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '#/i18n/navigation';
import {
  Home,
  BookOpen,
  Terminal,
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

export function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '' || pathname === '/en';
  const isTemplates = Boolean(pathname?.includes('/templates'));
  const isDocs = Boolean(pathname?.includes('/docs'));
  const isInfo = Boolean(pathname?.includes('/info'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      <header className="sticky top-0 z-50 w-full border-b border-[#DCE3EF] dark:border-slate-800 bg-[#F4F6FB]/85 dark:bg-[#0B101D]/85 backdrop-blur-md shadow-xs transition-colors">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-3 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group" data-cursor-label="HOME">
            <div className="relative p-1 rounded-xl bg-white dark:bg-slate-900 border border-[#DCE3EF] dark:border-slate-750 shadow-xs group-hover:scale-105 transition-transform duration-200 overflow-hidden">
              <MonoForgeMonkeyIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-[#172033] dark:text-white uppercase font-sans">
                MONO<span className="text-[#6366F1]">FORGE</span>
              </span>
              <span
                suppressHydrationWarning
                className="text-[9px] text-[#64748B] dark:text-slate-400 font-mono font-medium hidden sm:inline uppercase"
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
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-transparent font-black shadow-xs'
                  : 'border-[#DCE3EF] dark:border-slate-700 bg-white dark:bg-slate-900/60 text-[#172033] dark:text-white hover:bg-[#EEF2FF] dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-amber-500" />
              <span className={isHome ? 'text-white' : 'text-[#172033] dark:text-white'}>
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
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-transparent font-black shadow-xs'
                  : 'border-[#DCE3EF] dark:border-slate-700 bg-white dark:bg-slate-900/60 text-[#172033] dark:text-white hover:bg-[#EEF2FF] dark:hover:bg-slate-800'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
              <span className={isTemplates ? 'text-white' : 'text-[#172033] dark:text-white'}>
                TEMPLATES
              </span>
            </Link>

            {/* Documentation Hub */}
            <Link
              href="/docs"
              onClick={() => playClickSound()}
              data-cursor-label="DOCS"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border transition-all cursor-pointer ${
                isDocs
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-transparent font-black shadow-xs'
                  : 'border-[#DCE3EF] dark:border-slate-700 bg-white dark:bg-slate-900/60 text-[#172033] dark:text-white hover:bg-[#EEF2FF] dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span className={isDocs ? 'text-white' : 'text-[#172033] dark:text-white'}>
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
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-transparent font-black shadow-xs'
                  : 'border-[#DCE3EF] dark:border-slate-700 bg-white dark:bg-slate-900/60 text-[#172033] dark:text-white hover:bg-[#EEF2FF] dark:hover:bg-slate-800'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              <span className={isInfo ? 'text-white' : 'text-[#172033] dark:text-white'}>
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
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#DCE3EF] dark:border-slate-700 bg-[#E9EEF8] dark:bg-slate-800/80 hover:bg-[#EEF2FF] dark:hover:bg-slate-750 text-[#172033] dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
              title="Search documentation (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="px-1.5 py-0.2 rounded text-[10px] bg-white dark:bg-slate-900 border border-[#DCE3EF] dark:border-slate-600 text-[#172033] dark:text-slate-300 font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Animated GitHub Star Button from Uiverse.io */}
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
          <div className="md:hidden border-t border-[#DCE3EF] dark:border-slate-800 bg-[#F4F6FB] dark:bg-[#0B101D] p-4 space-y-2 animate-in slide-in-from-top-2 duration-150 font-mono text-xs shadow-lg">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isHome
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-[#172033] dark:text-white border-[#DCE3EF] dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-500" />
                <span className={isHome ? 'text-white' : 'text-[#172033] dark:text-white'}>
                  HOME
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isTemplates
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-[#172033] dark:text-white border-[#DCE3EF] dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-amber-500" />
                <span className={isTemplates ? 'text-white' : 'text-[#172033] dark:text-white'}>
                  TEMPLATES (75+)
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isDocs
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-[#172033] dark:text-white border-[#DCE3EF] dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span className={isDocs ? 'text-white' : 'text-[#172033] dark:text-white'}>
                  DOCUMENTATION
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/docs/getting-started/quickstart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-amber-500/10 font-medium"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-slate-900 dark:text-white">QUICKSTART GUIDE</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/docs/reference/architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-indigo-500/10 font-medium"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span className="text-slate-900 dark:text-white">SPECS &amp; ARCHITECTURE</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/docs/reference/cli"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-cyan-500/10 font-medium"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-500" />
                <span className="text-slate-900 dark:text-white">CLI &amp; MCP REFERENCE</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/info"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border font-black transition-all ${
                isInfo
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-500" />
                <span className={isInfo ? 'text-white dark:text-slate-950' : 'text-slate-900 dark:text-white'}>
                  INFO &amp; MANUAL HUB
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <div className="pt-2">
              <GitHubStarButton className="w-full max-w-full justify-center py-2.5 h-auto text-sm" />
            </div>
          </div>
        )}
      </header>

      {/* Global Documentation Search Modal */}
      <DocsSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
