import type { Metadata } from 'next';
import { PrivacyPolicyTemplate } from '#/components/templates/privacy-policy';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/privacy-policy`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/privacy-policy`;
  }

  const title = 'Privacy Policy — Local-First Open-Source Architecture | MonoForge';
  const description =
    'MonoForge is an open-source, local-first GitHub Profile README generator. Profile configurations stay in your browser, with zero tracking and no server-side token storage.';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent('MonoForge Privacy Policy')}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy-policy`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/privacy-policy`,
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyTemplate />;
}
