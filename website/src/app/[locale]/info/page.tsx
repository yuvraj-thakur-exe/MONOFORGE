import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { InfoHub } from '#/components/info/InfoHub';
import { GeometricLoader } from '#/components/common/GeometricLoader';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

type InfoPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/info`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/info`;
  }

  const title = 'Architecture, Manual & Info Hub | MonoForge';
  const description =
    'Explore MonoForge architecture, Camo CDN compliance rules, telemetry engines, CLI usage, and open-source contributor guidelines.';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent('MonoForge Architecture & Info Hub')}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/info`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/info`,
      siteName: 'MONOFORGE',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function LocalizedInfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] text-slate-900 dark:bg-[#0f172a] dark:text-slate-100 selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200">
      <TopNav />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
            <GeometricLoader mode="triple" size="md" />
            <span>Loading MonoForge Manual &amp; Info Hub...</span>
          </div>
        }
      >
        <InfoHub />
      </Suspense>
    </div>
  );
}
