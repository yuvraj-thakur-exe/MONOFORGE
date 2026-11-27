'use client';

import { Link } from '#/i18n/navigation';
import { TopNav } from '#/components/navigation/TopNav';
import {
  Home,
  LayoutTemplate,
  Code2,
  Sparkles,
  Compass,
  ArrowRight,
  Search,
} from 'lucide-react';
import { TEMPLATES } from '#/lib/templates/catalog';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';

export default function LocalizedNotFound() {
  const openCommandPalette = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('monoforge-open-command-palette'));
    }
  };

  const destinations = [
    {
      href: '/',
      title: 'Studio Home',
      description: 'Return to the main landing hub and live GitHub handle quick-start.',
      icon: Home,
      badge: 'HOME',
      accent: 'text-amber-600 dark:text-amber-400',
    },
    {
      href: '/templates',
      title: 'Curated Templates',
      description: `Browse ${TEMPLATES.length} production-ready profile archetypes across 12 disciplines.`,
      icon: LayoutTemplate,
      badge: `${TEMPLATES.length} PRESETS`,
      accent: 'text-amber-600 dark:text-amber-400',
    },
    {
      href: '/developer',
      title: 'Developer IDE',
      description: 'Edit profile JSON with Monaco IntelliSense, Zod validation, and live preview.',
      icon: Code2,
      badge: 'MONACO IDE',
      accent: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      href: '/visualizer',
      title: 'Visualizer Studio',
      description: `Explore ${ALL_VISUALIZATION_IDS.length} Camo-safe SVG and Canvas telemetry engines.`,
      icon: Sparkles,
      badge: `${ALL_VISUALIZATION_IDS.length} ENGINES`,
      accent: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <TopNav />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl rounded-3xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-[6px_6px_0px_#334155] dark:shadow-[6px_6px_0px_#475569] space-y-8">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe600] text-slate-900 border border-slate-700 font-mono text-xs font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>404 // ROUTE NOT FOUND</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                THIS MONOFORGE COORDINATE DOES NOT EXIST.
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                The page or manual you requested may have moved. Jump straight back into one of our active studios or press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono text-xs">⌘K</kbd> to search anywhere.
              </p>
            </div>

            <button
              type="button"
              onClick={openCommandPalette}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-[#ffe600] text-white dark:text-slate-900 font-mono text-xs font-black border-2 border-slate-700 shadow-[3px_3px_0px_#334155] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH COMMANDS (⌘K)</span>
            </button>
          </div>

          {/* 4 Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destinations.map((dest) => {
              const Icon = dest.icon;
              return (
                <Link
                  key={dest.href}
                  href={dest.href}
                  className="group p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-[#fffde6] dark:hover:bg-slate-800 hover:border-amber-400 transition-all flex flex-col justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <Icon className={`w-5 h-5 ${dest.accent}`} />
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[10px] font-black text-slate-700 dark:text-slate-300">
                        {dest.badge}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white font-sans">
                      {dest.title}
                    </h2>
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-black text-slate-900 dark:text-amber-400">
                    <span>Open {dest.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
