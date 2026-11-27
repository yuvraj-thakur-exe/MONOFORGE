'use client';

import { Link } from '#/i18n/navigation';
import {
  Sparkles,
  SlidersHorizontal,
  BarChart3,
  Eye,
  GitPullRequest,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { playClickSound } from '#/lib/sound/sound-effects';
import { TEMPLATES } from '#/lib/templates/catalog';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { pluginRegistry } from '#/lib/plugins/registry';

const TEMPLATE_COUNT = TEMPLATES.length;
const VIZ_COUNT = ALL_VISUALIZATION_IDS.length;
const PLUGIN_COUNT = pluginRegistry.length;

const STEPS = [
  {
    step: '01',
    title: 'Explore Curated Archetypes',
    description: `Select from ${TEMPLATE_COUNT} battle-tested developer archetypes, tailored layouts, and high-impact personas.`,
    icon: Sparkles,
    badge: 'START',
    link: '/templates',
    ctaText: `Browse ${TEMPLATE_COUNT} Templates`,
  },
  {
    step: '02',
    title: 'Pick Your Persona',
    description: 'Filter by stack: Systems, Cloud Native, Web, AI, or Design with real-time Markdown preview.',
    icon: SlidersHorizontal,
    badge: 'DESIGN',
    link: '/wizard',
    ctaText: 'Launch Guided Wizard',
  },
  {
    step: '03',
    title: 'Add Live Telemetry',
    description: `Select from ${VIZ_COUNT} SVG visualizations and ${PLUGIN_COUNT} modular plugins: 3D skylines, commit radars, streak trackers, and WakaTime.`,
    icon: BarChart3,
    badge: 'METRICS',
    link: '/telemetry',
    ctaText: `Browse ${VIZ_COUNT} Visualizations`,
  },
  {
    step: '04',
    title: 'Animate With 60fps Vectors',
    description: 'Inject animated vector characters, kinetic typewriter titles, and glowing cyber border beams.',
    icon: Eye,
    badge: '60FPS',
    link: '/animator',
    ctaText: 'Open Vector Animator',
  },
  {
    step: '05',
    title: 'Inspect Camo CDN Standards',
    description: '100% Camo CDN safety guarantee: 0 scripts, system fonts, dark and light theme adaptability.',
    icon: GitPullRequest,
    badge: 'CAMO SAFE',
    link: '/docs',
    ctaText: 'Read Docs',
  },
  {
    step: '06',
    title: 'One-Click Copy & Ship',
    description: 'Edit JSON or copy optimized Markdown straight to your GitHub profile repository in under 60 seconds.',
    icon: CheckCircle2,
    badge: 'DEPLOYED',
    link: '/developer',
    ctaText: 'Open Developer IDE',
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-[#fafbfc] dark:bg-[#0f172a] border-b-2 border-slate-300 dark:border-slate-700 py-16 sm:py-24 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-slate-300 dark:border-slate-700 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-slate-900 font-black border-2 border-slate-800 shadow-[2px_2px_0px_#334155]">
                [ 04 // HOW IT WORKS ]
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-300">SIX PRECISION STEPS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              HOW MONOFORGE WORKS.
            </h2>
          </div>
        </div>

        {/* 6-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="group p-6 sm:p-7 rounded-2xl border-2 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-[#fffde6] dark:hover:bg-slate-800 shadow-[5px_5px_0px_#334155] dark:shadow-[5px_5px_0px_#475569] hover:shadow-[2px_2px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-[#ffe600] text-slate-900 font-mono text-sm font-black flex items-center justify-center border-2 border-slate-800 shadow-[2px_2px_0px_#334155]">
                        {step.step}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-[10px] font-mono font-black border border-slate-300 dark:border-slate-600 shadow-2xs">
                        {step.badge}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 group-hover:bg-[#ffe600] group-hover:border-slate-800 transition-colors">
                      <Icon className="w-4 h-4 text-slate-900 dark:text-slate-100 group-hover:text-slate-900" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Card Bottom CTA Link */}
                <div className="pt-5 mt-4 border-t-2 border-slate-200 dark:border-slate-800">
                  <Link
                    href={step.link}
                    onClick={() => playClickSound()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-slate-900 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors btn-tactile"
                  >
                    <span>{step.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
