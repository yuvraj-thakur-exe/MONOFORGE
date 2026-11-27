import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { GeometricLoader } from '#/components/common/GeometricLoader';
import { config } from '#/config';
import { routing } from '#/i18n/routing';
import { AssetsClient } from './AssetsClient';

type AssetsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AssetsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/assets`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/assets`;
  }

  const title = 'Asset & Sticker Vault + Marketplace | MonoForge';
  const description =
    'Browse, search, and inspect Camo-safe SVG stickers, animated characters, dividers, banners, and community profile assets. Copy Camo URLs, Markdown, or insert straight into MonoForge Studio.';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent('Asset & Sticker Vault')}`;

  return {
    title,
    description,
    keywords: [
      'github readme stickers',
      'camo safe svg assets',
      'github profile dividers',
      'animated svg mascots',
      'monoforge assets vault',
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/assets`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/assets`,
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

export default function AssetsPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] flex flex-col">
      <TopNav />
      <Suspense
        fallback={
          <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
            <GeometricLoader mode="triple" size="md" />
            <span>Loading MonoForge Asset &amp; Sticker Vault...</span>
          </div>
        }
      >
        <AssetsClient />
      </Suspense>
    </div>
  );
}
