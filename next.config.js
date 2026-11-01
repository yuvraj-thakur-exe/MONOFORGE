import analyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for container builds (Docker), but native serverless on Vercel
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  async rewrites() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
      },
      {
        source: '/:locale/sitemap',
        destination: '/sitemap.xml',
      },
      {
        source: '/:locale/sitemap.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
