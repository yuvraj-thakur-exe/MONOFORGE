import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsLayout } from '#/components/docs/DocsLayout';
import { getAllDocs, getDocBySlug } from '#/content/docs/docs-data';
import { routing } from '#/i18n/routing';

type DocsPageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export async function generateStaticParams() {
  const docs = getAllDocs();
  const params: { locale: string; slug: string[] }[] = [];

  for (const locale of routing.locales) {
    for (const doc of docs) {
      params.push({
        locale,
        slug: doc.slug.split('/'),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'Documentation Not Found — MonoForge',
    };
  }

  return {
    title: `${doc.title} — MonoForge Docs`,
    description: doc.description,
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return <DocsLayout currentDoc={doc} />;
}

