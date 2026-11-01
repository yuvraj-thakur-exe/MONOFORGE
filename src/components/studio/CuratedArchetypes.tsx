'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import { ArrowRight } from 'lucide-react';
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
    id: 'best-readme-flagship',
    name: 'Best-README Flagship',
    role: 'Open-Source Lead Maintainer',
    description: 'The world-standard repository documentation template with reference shields, collapsible TOC, and 60+ tech badges.',
    tags: ['Reference Shields', 'Interactive TOC', '60+ Tech Badges'],
    accentColor: '#ffe600',
  },
  {
    id: 'cyber-monkey-hud',
    name: 'Cyber Monkey HUD',
    role: 'Systems & Infrastructure',
    description: 'High-density terminal HUD with real-time cursor tracking, radar circles, and nightly action telemetry.',
    tags: ['Interactive SVG', '47+ Telemetry', 'Terminal HUD'],
    accentColor: '#f59e0b',
  },
  {
    id: 'minimalist',
    name: 'Minimalist Clean',
    role: 'Staff Frontend Engineer',
    description: 'Understated typography and precise spacing with pure markdown cards, essential stack badges, and zero visual noise.',
    tags: ['Editorial', 'Understated', 'Zero Noise'],
    accentColor: '#64748b',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk & Gamer',
    role: 'Creative Full-Stack Hacker',
    description: 'Rain-soaked terminal with perspective grid, retro arcade snake game, and live GitHub commit velocity equalizer.',
    tags: ['Neon Cyber', 'Arcade Snake', 'Velocity Radar'],
    accentColor: '#00e5ff',
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Polyglot',
    role: 'Distributed Systems Architect',
    description: 'Structured bento dashboard highlighting full-stack frameworks, 3D commit city, and interactive language distribution.',
    tags: ['Bento Grid', '3D Skyline', 'Language Donut'],
    accentColor: '#38bdf8',
  },
  {
    id: 'cloud-architect',
    name: 'Cloud & DevOps Master',
    role: 'Platform & Kubernetes SRE',
    description: 'Designed for platform engineers showcasing Docker, Kubernetes, Terraform, and automated deployment pipelines.',
    tags: ['K8s & Cloud', 'Terraform', 'CI/CD Radar'],
    accentColor: '#06b6d4',
  },
  {
    id: 'oss-maintainer',
    name: 'Open-Source Maintainer',
    role: 'Ecosystem Architect',
    description: 'Equipped with Camo visitor counter, contribution chart, WakaTime metrics, and sponsorship links.',
    tags: ['Visitor Counter', 'Sponsors', 'WakaTime'],
    accentColor: '#10b981',
  },
  {
    id: 'best-readme-fullstack',
    name: 'Best-README Full-Stack SaaS',
    role: 'Full-Stack SaaS Engineer',
    description: 'Complete production repository README with Next.js 16, TypeScript, PostgreSQL, Prisma, Supabase, and Vercel cloud sync.',
    tags: ['Next.js 16', 'Cloud Sync', 'Prerequisites'],
    accentColor: '#e0a84b',
  },
];

export function CuratedArchetypes() {
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const toggleTemplates = () => {
    playClickSound();
    setShowAllTemplates(!showAllTemplates);
  };

  return (
    <section className="relative bg-[#fafbfc] dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200 mb-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#ffe600] text-slate-950 font-black border border-slate-900 shadow-2xs">
                [ 100+ CURATED ARCHETYPES ]
              </span>
              <span className="font-bold text-slate-600 dark:text-slate-400">7 CORE ENGINEERING DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              CURATED PROFILE STARTERS.
            </h2>
          </div>

          <Link
            href="/templates"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-bold border-2 border-slate-300 dark:border-slate-700 shadow-xs hover:border-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <span>Browse All 100+ Archetypes &amp; Templates</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>

        {/* Archetypes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARCHETYPES.map((arch) => (
            <div
              key={arch.id}
              className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-900 dark:hover:border-slate-600 hover:-translate-y-1 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shadow-xs"
                    style={{ backgroundColor: arch.accentColor }}
                  />
                  <span className="text-[10px] font-mono font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {arch.role}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {arch.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-mono mt-2 leading-relaxed">
                    {arch.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {arch.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/templates"
                  onClick={() => playClickSound()}
                  className="w-full justify-center px-3.5 py-2.5 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 text-xs font-mono font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
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
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-950 dark:text-white font-mono text-xs sm:text-sm font-black border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_#0f172a] hover:shadow-[4px_4px_0px_#0f172a] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>{showAllTemplates ? '▲ COLLAPSE ARCHETYPE VAULT' : '▼ EXPLORE CURATED ARCHETYPES WITH LIVE SEARCH & PREVIEW'}</span>
          </button>
        </div>

        {/* Embedded Full Template Gallery */}
        {showAllTemplates && (
          <div className="pt-10 border-t border-[#DCE3EF] dark:border-slate-800 animate-in fade-in duration-300">
            <TemplateGallery />
          </div>
        )}
      </div>
    </section>
  );
}
