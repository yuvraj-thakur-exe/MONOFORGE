import type { MetadataRoute } from 'next';
import { config } from '#/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = config.general.urls.app;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/auth/', '/api/github/sync'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/assets/', '/api/telemetry/', '/api/og'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap`],
    host: baseUrl,
  };
}
