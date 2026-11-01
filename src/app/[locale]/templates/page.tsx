import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { Link } from '#/i18n/navigation';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { config } from '#/config';
import { routing } from '#/i18n/routing';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

type TemplatesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TemplatesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/templates`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/templates`;
  }

  const title = '75+ GitHub Profile README Templates & Curated Archetypes | MonoForge';
  const description =
    'Browse 75+ production-ready developer profile README templates. 100% GitHub Camo-safe, zero JavaScript, pure CSS 60fps animations, 3D isometric commit skylines, bento grids, and live telemetry widgets.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/templates`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/templates`,
      siteName: 'MONOFORGE',
      images: [
        {
          url: `${baseUrl}/api/og?title=75%2B%20Curated%20GitHub%20Profile%20Templates`,
          width: 1200,
          height: 630,
          alt: 'MonoForge 75+ Curated Profile Archetypes',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/api/og?title=75%2B%20Curated%20GitHub%20Profile%20Templates`],
      creator: '@yuvrajthakur',
      site: '@monoforge',
    },
    other: {
      'ai:ready': 'true',
      'ai:model-context': `${baseUrl}/llms.txt`,
      'ai:agent-skill': `${baseUrl}/.agents/skills/monoforge/SKILL.md`,
      'ai:capability': 'github-profile-templates, camo-safe-svg, 60fps-animation, telemetry-bento, dynamic-isometric-skyline',
    },
  };
}

export default async function TemplatesPage({ params }: TemplatesPageProps) {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  return (
    <div className="min-h-screen bg-[#F4F6FB] dark:bg-[#0B101D] text-[#172033] dark:text-slate-100 font-sans selection:bg-[#6366F1] selection:text-white flex flex-col transition-colors duration-200">
      {/* Schema.org CollectionPage & ItemList Structured Data for AI & Search Console */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${baseUrl}/${locale}/templates#webpage`,
            url: `${baseUrl}/${locale}/templates`,
            name: 'Curated GitHub Profile README Templates & Archetypes',
            description:
              'Browse 75+ production-ready developer profile README templates. 100% GitHub Camo-safe, zero JavaScript, pure CSS 60fps animations, 3D isometric commit skylines, bento grids, and live telemetry widgets.',
            isPartOf: {
              '@type': 'WebSite',
              '@id': `${baseUrl}/#website`,
              name: 'MonoForge',
              url: baseUrl,
            },
            about: {
              '@type': 'SoftwareApplication',
              name: 'MonoForge Template Catalog',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'All',
            },
          }),
        }}
      />

      <TopNav />

      {/* Hero Showcase Section */}
      <section className="relative bg-gradient-to-b from-white via-[#F8FAFC] to-[#F4F6FB] dark:from-[#111827] dark:via-[#0F172A] dark:to-[#0B101D] border-b border-[#DCE3EF] dark:border-slate-800 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#DCE3EF] dark:border-slate-800">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#172033] dark:text-white">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#EEF2FF] text-[#4338CA] dark:bg-indigo-950/60 dark:text-indigo-300 font-black border border-[#C7D2FE] dark:border-indigo-800 shadow-2xs">
                  [ 75+ SIGNATURE ARCHETYPES ]
                </span>
                <span className="text-[#64748B] dark:text-slate-400 hidden sm:inline">
                  &bull; 100% GITHUB CAMO SAFE &bull; ZERO JS &bull; 60FPS CSS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#172033] dark:text-white uppercase font-sans">
                Curated Profile Templates.
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-300 max-w-2xl font-mono leading-relaxed">
                Explore production-ready developer profile archetypes. From 3D isometric commit terrains and cyberpunk HUDs to Swiss typographers and minimalist portfolios. Review technical specifications and copy markdown snippets directly.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
              <Link
                href="/docs"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#EEF2FF] dark:hover:bg-slate-700 text-[#172033] dark:text-white font-bold border border-[#DCE3EF] dark:border-slate-700 shadow-xs hover:border-[#6366F1] transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#6366F1] dark:text-indigo-400" />
                <span>DOCUMENTATION</span>
              </Link>

              <Link
                href="/docs/getting-started/quickstart"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-bold shadow-[0_4px_14px_-2px_rgba(99,102,241,0.4)] transition-all"
              >
                <span>QUICKSTART GUIDE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Feature Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs font-bold text-[#172033] dark:text-slate-200">
            <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-slate-800 flex items-center gap-2.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Camo Safe (0 &lt;script&gt;)</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-slate-800 flex items-center gap-2.5 shadow-xs">
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Pure CSS @keyframes</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-slate-800 flex items-center gap-2.5 shadow-xs">
              <span className="text-amber-500 font-black">#</span>
              <span>75+ Tested Archetypes</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-slate-800 flex items-center gap-2.5 shadow-xs">
              <span className="text-emerald-500 font-black">●</span>
              <span>Zero Tracking Harvesters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filterable Gallery */}
      <main className="flex-1 bg-[#F4F6FB] dark:bg-[#0B101D]">
        <Suspense
          fallback={
            <div className="py-24 text-center font-mono text-xs text-[#64748B]">
              Loading curated archetypes catalog...
            </div>
          }
        >
          <TemplateGallery />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DCE3EF] dark:border-slate-800 bg-white dark:bg-[#111827] py-8 px-4 text-center font-mono text-xs text-[#64748B] dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MonoForgeMonkeyIcon className="w-5 h-5" />
            <span className="font-bold text-[#172033] dark:text-white">MonoForge Templates</span>
          </div>
          <span>Curated Open-Source GitHub Profile README Archetypes. MIT Licensed.</span>
        </div>
      </footer>
    </div>
  );
}
