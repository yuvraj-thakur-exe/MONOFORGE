import type { Metadata } from 'next';
import { config } from '#/config';
import { routing } from '#/i18n/routing';
import { WizardClient } from './WizardClient';

type LocalizedWizardPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedWizardPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/wizard`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/wizard`;
  }

  return {
    title: 'Visual Studio & Guided Wizard — MonoForge',
    description:
      'Build your GitHub profile README visually with MonoForge Step-by-Step Wizard and Drag-and-Drop Canvas Studio with live preview.',
    alternates: {
      canonical: `${baseUrl}/${locale}/wizard`,
      languages,
    },
  };
}

export default function LocalizedWizardPage() {
  return <WizardClient />;
}
