import type { Metadata } from 'next';
import { config } from '#/config';
import { routing } from '#/i18n/routing';
import { TelemetryClient } from './TelemetryClient';

type TelemetryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TelemetryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/telemetry`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/telemetry`;
  }

  const title = 'MonoForge Telemetry Studio — Native Camo-Safe GitHub Infographics';
  const description =
    'Generate real-time GitHub profile infographics, 3D isometric contribution calendars, language donuts, habit radars, and GitHub Action workflows with zero external trackers.';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent('MonoForge Telemetry Studio')}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/telemetry`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/telemetry`,
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

export default function TelemetryStudioPage() {
  return <TelemetryClient />;
}
