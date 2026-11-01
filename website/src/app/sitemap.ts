import type { MetadataRoute } from 'next';
import { config } from '#/config';
import { routing } from '#/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.general.urls.app;
  const now = new Date();

  const coreRoutes = [
    '',
    '/templates',
    '/telemetry',
    '/docs',
    '/developer',
    '/wizard',
    '/changelog',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of coreRoutes) {
    for (const locale of routing.locales) {
      const url = `${baseUrl}/${locale}${route}`;
      const languages: Record<string, string> = {};
      for (const loc of routing.locales) {
        languages[loc] = `${baseUrl}/${loc}${route}`;
      }
      languages['x-default'] = `${baseUrl}/en${route}`;

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? (locale === 'en' ? 1.0 : 0.9) : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
