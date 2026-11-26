import type { Metadata } from 'next';
import { ProjectReadmeStudio } from '#/components/project-readme/ProjectReadmeStudio';
import { TopNav } from '#/components/navigation/TopNav';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

type ProjectReadmePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProjectReadmePageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en/project-readme`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/project-readme`;
  }

  const title = 'Project README Studio | MonoForge 3.0';
  const description =
    'Turn ordinary software repositories into professional, high-impact project READMEs. Auto-detect repository architecture, configure Shields.io badges, render Mermaid diagrams, and export production-grade GitHub Flavored Markdown.';
  const ogImage = `${baseUrl}/api/og?title=Project+README+Studio`;

  return {
    title,
    description,
    keywords: [
      'Project README generator',
      'GitHub README builder',
      'Repository documentation',
      'Mermaid architecture diagrams',
      'Shields.io badges',
      'Developer tool documentation',
      'MonoForge',
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/project-readme`,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${locale}/project-readme`,
      siteName: 'MONOFORGE',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'MonoForge Project README Studio',
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

export default function ProjectReadmePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
      <TopNav />
      <ProjectReadmeStudio />
    </div>
  );
}

