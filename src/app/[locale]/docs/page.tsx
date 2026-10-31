import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsLayout } from '#/components/docs/DocsLayout';
import { getDocBySlug } from '#/content/docs/docs-data';
import { routing } from '#/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Documentation — MonoForge',
  description: 'Complete technical documentation, installation guides, and API reference for MonoForge.',
};

export default function DocsIndexPage() {
  const doc = getDocBySlug(['getting-started', 'introduction']);
  if (!doc) {
    notFound();
  }
  return <DocsLayout currentDoc={doc} />;
}
