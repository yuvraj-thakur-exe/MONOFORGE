'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import { Code2, ArrowRight } from 'lucide-react';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { playClickSound } from '#/lib/sound/sound-effects';

interface ArchetypeItem {
  id: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
  accentColor: string;
}

const ARCHETYPES: ArchetypeItem[] = [
  {
    id: 'cyber-monkey-hud',
    name: 'Cyber Monkey HUD',
    role: 'Systems & Infrastructure',
    description: 'High-density terminal HUD with real-time cursor tracking, radar circles, and nightly action telemetry.',
    tags: ['Interactive SVG', '47+ Telemetry', 'Terminal HUD'],
    accentColor: '#f59e0b',
  },
  {
    id: 'swiss-minimalist',
    name: 'Swiss Typographer',
    role: 'Product Designer & Frontend',
    description: 'Generous whitespace, stark typographic hierarchy, and subtle monochrome micro-borders inspired by Poulo.',
    tags: ['Editorial', 'Monochrome', 'Zero Noise'],
    accentColor: '#18181b',
  },
  {
    id: 'isometric-polyglot',
    name: 'Isometric Polyglot',
    role: 'Full-Stack Polyglot',
    description: 'Full-year 3D isometric commit cube sphere paired with precise language time-distribution analytics.',
    tags: ['3D Isocalendar', 'Language Radar', 'LeetCode'],
    accentColor: '#06b6d4',
  },
  {
    id: 'pixel-craftsman',
    name: 'Pixel Craftsman',
    role: 'Game Dev & Creative Engineer',
    description: 'Dual-monitor pixel developer workstation with rising coffee steam, matrix scanlines, and retro stickers.',
    tags: ['Pixel Art', '60fps Loop', 'Stickers'],
    accentColor: '#10b981',
  },
];

export function CuratedArchetypes() {
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const toggleTemplates = () => {
    playClickSound();
    setShowAllTemplates(!showAllTemplates);
  };

  return (
    <section className="relative bg-[#fafbfc] dark:bg-[#1e293b]/50 border-b-2 border-slate-300 dark:border-slate-700 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-slate-300 dark:border-slate-700 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-slate-950 font-black border border-slate-400 shadow-2xs">
                [ 06 // SIGNATURE ARCHETYPES ]
              </span>
              <span className="font-bold text-slate-600 dark:text-slate-400">MARCO MADONNA &amp; POULO INSPIRED</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              CURATED PROFILE STARTERS.
            </h2>
          </div>

          <Link
            href="/templates"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-950 dark:text-white text-xs font-mono font-black border-2 border-slate-300 dark:border-slate-600 shadow-[2px_2px_0px_#334155] dark:shadow-[2px_2px_0px_#475569] hover:bg-[#ffe600] dark:hover:bg-[#ffe600] dark:hover:text-slate-950 transition-all btn-tactile cursor-pointer"
          >
            <span>Browse All Curated Archetypes &amp; Templates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Archetypes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARCHETYPES.map((arch) => (
            <div
              key={arch.id}
              className="rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 p-6 flex flex-col justify-between shadow-[4px_4px_0px_#334155] dark:shadow-[4px_4px_0px_#475569] hover:shadow-[2px_2px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-900 dark:border-slate-600"
                    style={{ backgroundColor: arch.accentColor }}
                  />
                  <span className="text-[10px] font-mono font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {arch.role}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {arch.name}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-mono mt-2 leading-relaxed">
                    {arch.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {arch.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-black bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <Link
                  href={`/developer?template=${arch.id}&mode=visual`}
                  onClick={() => playClickSound()}
                  className="px-3.5 py-2 rounded-xl bg-[#ffe600] text-slate-950 text-xs font-mono font-black border-2 border-slate-900 shadow-[2px_2px_0px_#334155] hover:bg-[#ffdf00] inline-flex items-center gap-1.5 transition-all btn-tactile"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/developer?template=${arch.id}&mode=editor`}
                  onClick={() => playClickSound()}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-[2px_2px_0px_#334155] transition-all btn-tactile"
                  title="Edit in Monaco Raw Mode"
                >
                  <Code2 className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Full Interactive Template Gallery */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={toggleTemplates}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-[#ffe600] dark:hover:bg-[#ffe600] text-slate-900 dark:text-white dark:hover:text-slate-950 font-mono text-xs sm:text-sm font-black border-2 border-slate-300 dark:border-slate-700 shadow-[4px_4px_0px_#334155] hover:shadow-[2px_2px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer btn-tactile"
          >
            <span>{showAllTemplates ? '▲ COLLAPSE ARCHETYPE VAULT' : '▼ EXPLORE CURATED ARCHETYPES WITH LIVE SEARCH & PREVIEW'}</span>
          </button>
        </div>

        {/* Embedded Full Template Gallery */}
        {showAllTemplates && (
          <div className="pt-10 border-t-2 border-slate-300 dark:border-slate-700 animate-in fade-in duration-300">
            <TemplateGallery />
          </div>
        )}
      </div>
    </section>
  );
}
