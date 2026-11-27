import type { MetadataRoute } from 'next';
import { config } from '#/config';
import { routing } from '#/i18n/routing';
import { getAllDocs } from '#/content/docs/docs-data';

function buildLocaleEntries(
  baseUrl: string,
  route: string,
  now: Date,
  priorityForLocale: (locale: string) => number,
  changeFrequency: 'daily' | 'weekly'
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en${route}`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}${route}`;
  }

  return routing.locales.map(locale => ({
    url: `${baseUrl}/${locale}${route}`,
    lastModified: now,
    changeFrequency,
    priority: priorityForLocale(locale),
    alternates: {
      languages,
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.general.urls.app;
  const now = new Date();

  const coreRoutes = [
    '',
    '/wizard',
    '/templates',
    '/developer',
    '/visualizer',
    '/animator',
    '/project-readme',
    '/telemetry',
    '/assets',
    '/docs',
    '/info',
    '/privacy-policy',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of coreRoutes) {
    entries.push(
      ...buildLocaleEntries(
        baseUrl,
        route,
        now,
        locale => (route === '' ? (locale === 'en' ? 1.0 : 0.9) : 0.8),
        route === '' ? 'daily' : 'weekly'
      )
    );
  }

  for (const doc of getAllDocs()) {
    entries.push(
      ...buildLocaleEntries(
        baseUrl,
        `/docs/${doc.slug}`,
        now,
        () => 0.7,
        'weekly'
      )
    );
  }

  return entries;
}
