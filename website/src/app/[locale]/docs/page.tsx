import type { Metadata } from 'next';
import { DocsHomePortal } from '#/components/docs/DocsHomePortal';
import { routing } from '#/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'MonoForge Documentation — Architecture, Camo Invariants & Quickstart',
  description: 'Complete developer documentation, vector motion laboratory, Camo sanitizer invariants, 47+ telemetry engines, and installation guides for MonoForge.',
};

export default function DocsIndexPage() {
  return <DocsHomePortal />;
}
