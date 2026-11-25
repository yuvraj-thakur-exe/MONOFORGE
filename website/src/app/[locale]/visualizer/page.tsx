import type { Metadata } from 'next';
import { VisualizationStudio } from '#/components/visualizer/VisualizationStudio';
import { TopNav } from '#/components/navigation/TopNav';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

type VisualizerPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: VisualizerPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/visualizer`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/visualizer`;
  }

  const title = 'Developer Identity & Visualization Studio | MonoForge';
  const description =
    'Transform real GitHub contribution and telemetry data into 30+ signature 60fps SVG visualizations: Commit City, Commit River, Year Clock, Coding Pulse, Terminal, Snake, and Galaxy.';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent('Developer Visualization Studio')}`;

  return {
    title,
    description,
    keywords: [
      'GitHub contribution graph',
      '3D isometric commit city',
      'developer identity studio',
      'camo safe svg',
      'git visualization',
      'developer portfolio canvas',
      'monoforge visualizer',
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/visualizer`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/visualizer`,
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

export default function VisualizerPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <TopNav />
      <VisualizationStudio />
    </div>
  );
}
