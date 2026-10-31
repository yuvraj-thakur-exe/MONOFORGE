'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '#/i18n/navigation';
import {
  Github,
  Star,
  BookOpen,
  Terminal,
  Layers,
  Search,
  Menu,
  X,
  Info,
  ChevronRight,
} from 'lucide-react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { DocsSearchModal } from '#/components/docs/DocsSearchModal';

export function TopNav() {
  const pathname = usePathname();
  const isDocs = pathname?.includes('/docs');
  const isInfo = pathname?.includes('/info');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle Escape key to close mobile menu
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
      <header className="sticky top-0 z-50 w-full border-b-2 border-neutral-900 bg-white dark:bg-[#0c0d0e] dark:border-neutral-800 backdrop-blur-xl shadow-xs transition-colors">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-3 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group" data-cursor-label="HOME">
            <div className="relative p-1 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b] group-hover:scale-105 transition-transform duration-200 overflow-hidden">
              <MonoForgeMonkeyIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
                MONO<span className="text-[#ffe600] bg-neutral-950 dark:bg-neutral-800 px-1 rounded ml-0.5 border border-neutral-900">DOCS</span>
              </span>
              <span className="text-[9px] text-neutral-500 font-mono font-bold hidden sm:inline uppercase">
                OPEN SOURCE MANUAL &amp; SPEC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            {/* Documentation Hub */}
            <Link
              href="/docs"
              data-cursor-label="DOCS"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border-2 transition-all btn-tactile ${
                isDocs
                  ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                  : 'border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 dark:hover:bg-[#ffe600] dark:hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>DOCUMENTATION</span>
            </Link>

            {/* Quickstart Guide */}
            <Link
              href="/docs/getting-started/quickstart"
              className="flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 dark:hover:bg-[#ffe600] dark:hover:text-neutral-950 shadow-[2px_2px_0px_#18181b] transition-all btn-tactile"
            >
              <span>QUICKSTART</span>
            </Link>

            {/* Architecture Specs */}
            <Link
              href="/docs/reference/architecture"
              className="flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 dark:hover:bg-[#ffe600] dark:hover:text-neutral-950 shadow-[2px_2px_0px_#18181b] transition-all btn-tactile"
            >
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>SPECS</span>
            </Link>

            {/* CLI & MCP Tool */}
            <Link
              href="/docs/reference/cli"
              className="flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 dark:hover:bg-[#ffe600] dark:hover:text-neutral-950 shadow-[2px_2px_0px_#18181b] transition-all btn-tactile"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>CLI &amp; MCP</span>
            </Link>

            {/* Info Hub */}
            <Link
              href="/info"
              className={`flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg border-2 transition-all btn-tactile ${
                isInfo
                  ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                  : 'border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 dark:hover:bg-[#ffe600] dark:hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-purple-500" />
              <span>INFO HUB</span>
            </Link>

            <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 mx-1" />

            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors shadow-[2px_2px_0px_#18181b] cursor-pointer"
              title="Search documentation (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Search docs</span>
              <kbd className="px-1.5 py-0.2 rounded text-[10px] bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* GitHub Star Pill */}
            <a
              href="https://github.com/monoforge/MONOFORGE"
              target="_blank"
              rel="noreferrer"
              data-cursor-label="STAR"
              className="flex items-center gap-1.5 px-3 py-1.5 font-bold rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b] hover:bg-[#ffe600] hover:text-neutral-950 dark:hover:bg-[#ffe600] dark:hover:text-neutral-950 transition-all btn-tactile"
            >
              <Github className="w-3.5 h-3.5" />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden lg:inline">STAR</span>
            </a>
          </nav>

          {/* Mobile Right Controls: Search + Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-lg border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-2xs cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-1.5 rounded-lg border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-2xs btn-tactile cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-neutral-900 dark:border-neutral-800 bg-white dark:bg-[#141517] p-4 space-y-2 animate-in slide-in-from-top-2 duration-150 font-mono text-xs">
            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border-2 font-bold transition-all ${
                isDocs
                  ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                  : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-900 dark:border-neutral-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>DOCUMENTATION</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <Link
              href="/docs/getting-started/quickstart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 font-bold"
            >
              <span>QUICKSTART GUIDE</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <Link
              href="/docs/reference/architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 font-bold"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>SPECS &amp; ARCHITECTURE</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <Link
              href="/docs/reference/cli"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 font-bold"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-500" />
                <span>CLI &amp; MCP REFERENCE</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <Link
              href="/info"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl border-2 font-bold transition-all ${
                isInfo
                  ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                  : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-900 dark:border-neutral-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-500" />
                <span>INFO &amp; MANUAL HUB</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <a
              href="https://github.com/monoforge/MONOFORGE"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-2 border-neutral-900 font-bold shadow-[2px_2px_0px_#18181b]"
            >
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <span>GITHUB REPOSITORY</span>
              </span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </a>
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
