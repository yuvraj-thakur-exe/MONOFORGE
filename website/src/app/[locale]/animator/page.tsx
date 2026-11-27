import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AnimatorStudio } from '#/components/animator/AnimatorStudio';
import { TopNav } from '#/components/navigation/TopNav';
import { GeometricLoader } from '#/components/common/GeometricLoader';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

type AnimatorPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AnimatorPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/animator`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/animator`;
  }

  const title = 'SVG Animator & Motion Studio | MonoForge';
  const description =
    'Design 60fps GitHub Camo-compliant animated SVG banners, vector characters, kinetic typography, and timeline keyframe animations with live sanitizer validation.';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent('SVG Animator & Motion Studio')}`;

  return {
    title,
    description,
    keywords: [
      'github svg animator',
      'camo safe animated svg',
      'github profile banner generator',
      'svg keyframe timeline',
      'monoforge animator',
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/animator`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/animator`,
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

export default function LocalizedAnimatorPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      <TopNav />
      <Suspense
        fallback={
          <div className="flex-1 min-h-[60vh] bg-[#0f172a] flex flex-col items-center justify-center gap-4 text-slate-400 font-mono text-xs">
            <GeometricLoader mode="triple" size="md" />
            <span>Loading MonoForge SVG Animator Studio...</span>
          </div>
        }
      >
        <AnimatorStudio />
      </Suspense>
    </div>
  );
}
