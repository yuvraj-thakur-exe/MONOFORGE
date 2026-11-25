import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

type ResultPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/templates`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/templates`;
  }

  const title = 'Generated README Export & Templates | MonoForge';
  const description =
    'Preview, export, and sync your generated GitHub Profile README directly from MonoForge.';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent('MonoForge Export & Templates')}`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function LocalizedResultPage({ params }: ResultPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/templates`);
}
