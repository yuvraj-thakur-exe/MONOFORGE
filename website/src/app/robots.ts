import type { MetadataRoute } from 'next';
import { config } from '#/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = config.general.urls.app;

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/assets/',
          '/api/og',
          '/api/telemetry/',
          '/api/schema',
          '/api/agent/skill',
          '/llms.txt',
          '/llms-full.txt',
        ],
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
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  };
}
