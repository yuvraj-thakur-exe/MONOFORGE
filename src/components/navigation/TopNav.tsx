'use client';

import { Link, usePathname } from '#/i18n/navigation';
import {
  Github,
  Star,
  BookOpen,
  Sparkles,
  BarChart3,
  Film,
  Volume2,
  VolumeX,
  Menu,
  X,
  LayoutTemplate,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { CommandPalette } from '#/components/navigation/CommandPalette';

export function TopNav() {
  const pathname = usePathname();
  const isStudio = pathname?.includes('/developer') || pathname?.includes('/wizard') || pathname?.includes('/canvas');
  const isTemplates = pathname?.includes('/templates');
  const isInfo = pathname?.includes('/info');

  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMuted(localStorage.getItem('monoforge-audio-mute') === 'true');
    }
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('monoforge-audio-mute', next ? 'true' : 'false');
      if (!next) {
        (window as unknown as { __monoforge_playClick?: (freq?: number) => void }).__monoforge_playClick?.(1200);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-neutral-900 bg-white backdrop-blur-xl shadow-xs">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group" data-cursor-label="HOME">
          <div className="relative p-1 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] group-hover:scale-105 transition-transform duration-200 overflow-hidden">
            <MonoForgeMonkeyIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight text-neutral-950 uppercase">
              MONO<span className="text-[#ffe600] bg-neutral-950 px-1 rounded ml-0.5 border border-neutral-900">FORGE</span>
            </span>
            <span className="text-[9px] text-neutral-500 font-mono font-bold hidden sm:inline uppercase">
              ICONIC README STUDIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5 sm:gap-2">
          {/* Master All-in-One Studio */}
          <Link
            href="/developer?mode=visual"
            data-cursor-label="STUDIO"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isStudio
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>ALL-IN-ONE STUDIO</span>
          </Link>

          {/* Templates Catalog */}
          <Link
            href="/templates"
            data-cursor-label="TEMPLATES"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isTemplates
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
            <span>85+ TEMPLATES</span>
          </Link>

          {/* Telemetry Direct */}
          <Link
            href="/developer?mode=telemetry"
            data-cursor-label="STATS"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b] transition-all btn-tactile"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>TELEMETRY</span>
          </Link>

          {/* SVG Animator Direct */}
          <Link
            href="/developer?mode=animator"
            data-cursor-label="ANIMATE"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b] transition-all btn-tactile"
          >
            <Film className="w-3.5 h-3.5 text-purple-600" />
            <span>ANIMATOR</span>
          </Link>

          {/* Guide Hub */}
          <Link
            href="/info"
            data-cursor-label="GUIDE"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isInfo
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUIDE</span>
          </Link>

          <div className="h-4 w-px bg-neutral-300 mx-1" />

          {/* Global Quick Command Palette (Cmd+K) */}
          <CommandPalette />

          {/* Connect GitHub Button (Prominent on Desktop!) */}
          <button
            type="button"
            onClick={() => setIsSyncModalOpen(true)}
            data-cursor-label="SYNC"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-black rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:bg-[#ffdf00] transition-all btn-tactile cursor-pointer"
            title="Connect GitHub Account to Push Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span>CONNECT GITHUB</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-lg border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-[#ffe600] hover:text-neutral-950 transition-colors shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title={isMuted ? 'Unmute Audio & Tactile Sound FX' : 'Mute Audio & Tactile Sound FX'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-500" />}
          </button>

          <ThemeToggle />

          {/* GitHub Star Pill */}
          <a
            href="https://github.com/monoforge/MONOFORGE"
            target="_blank"
            rel="noreferrer"
            data-cursor-label="STAR"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-neutral-950 text-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:bg-[#ffe600] hover:text-neutral-950 transition-all btn-tactile"
          >
            <Github className="w-3.5 h-3.5" />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="hidden lg:inline">STAR</span>
          </a>
        </nav>

        {/* Mobile Right Controls: Connect GitHub + Mute + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsSyncModalOpen(true)}
            className="p-1.5 rounded-lg border-2 border-neutral-900 bg-[#ffe600] text-neutral-950 font-bold shadow-2xs btn-tactile cursor-pointer"
            title="Connect GitHub"
          >
            <Github className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-lg border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-[#ffe600] transition-colors shadow-2xs btn-tactile cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-500" />}
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg border-2 border-neutral-900 bg-[#ffe600] text-neutral-950 font-black shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide-down with full touch targets) */}
      <GitHubSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />

      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-neutral-900 bg-white p-4 space-y-2.5 animate-in slide-in-from-top-2 duration-150">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSyncModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-neutral-900 bg-[#ffe600] text-neutral-950 font-mono text-xs font-black shadow-[2px_2px_0px_#18181b] cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>CONNECT &amp; PUSH TO GITHUB</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('monoforge-open-command-palette'));
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-neutral-900 bg-white text-neutral-950 font-mono text-xs font-bold hover:bg-[#ffe600] shadow-[2px_2px_0px_#18181b] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>COMMAND PALETTE</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-950 text-[10px] text-white">⌘K</kbd>
          </button>

          <Link
            href="/developer?mode=visual"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isStudio
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>ALL-IN-ONE STUDIO</span>
            </span>
            <span className="text-[10px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-300">
              VISUAL &amp; IDE
            </span>
          </Link>

          <Link
            href="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isTemplates
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-amber-500" />
              <span>85+ TEMPLATES CATALOG</span>
            </span>
            <span className="text-[10px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-300">
              ARCHETYPES
            </span>
          </Link>

          <Link
            href="/developer?mode=telemetry"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl border-2 border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] font-mono text-xs font-black transition-all"
          >
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>47+ TELEMETRY ARSENAL</span>
            </span>
            <span className="text-[10px] text-neutral-500">METRICS</span>
          </Link>

          <Link
            href="/developer?mode=animator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl border-2 border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] font-mono text-xs font-black transition-all"
          >
            <span className="flex items-center gap-2">
              <Film className="w-4 h-4 text-purple-600" />
              <span>SVG ANIMATOR STUDIO</span>
            </span>
            <span className="text-[10px] text-neutral-500">60FPS</span>
          </Link>

          <Link
            href="/info"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isInfo
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>GUIDE &amp; DOCS</span>
            </span>
            <span className="text-[10px] text-neutral-500">DOCS</span>
          </Link>

          <a
            href="https://github.com/monoforge/MONOFORGE"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 text-white border-2 border-neutral-900 font-mono text-xs font-bold shadow-[2px_2px_0px_#18181b]"
          >
            <span className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>STAR MONOFORGE ON GITHUB</span>
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </a>
        </div>
      )}
    </header>
  );
}

export default TopNav;