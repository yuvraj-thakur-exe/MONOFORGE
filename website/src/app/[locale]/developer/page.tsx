import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DeveloperWorkspace } from '#/components/developer/DeveloperWorkspace';
import { EditorSkeleton } from '#/components/developer/EditorSkeleton';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

type LocalizedDeveloperPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedDeveloperPageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/developer`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/developer`;
  }

  return {
    title: 'Developer IDE Mode — MonoForge',
    description:
      'Power-user JSON IDE with Monaco IntelliSense, Zod schema diagnostics, 22 modular plugins, and live GitHub README rendering.',
    alternates: {
      canonical: `${baseUrl}/${locale}/developer`,
      languages,
    },
  };
}

export default function LocalizedDeveloperPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen p-4 bg-[#fafbfc] dark:bg-[#0f172a]">
          <EditorSkeleton />
        </div>
      }
    >
      <DeveloperWorkspace />
    </Suspense>
  );
}
