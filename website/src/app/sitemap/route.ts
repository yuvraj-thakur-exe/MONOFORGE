import { NextResponse } from 'next/server';

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://monoforge-studio.vercel.app/en</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR" />
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/pt-BR</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR" />
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/en/templates</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/templates" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/templates" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/pt-BR/templates</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/templates" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/templates" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/en/telemetry</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/telemetry" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/telemetry" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/pt-BR/telemetry</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/telemetry" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/telemetry" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/en/docs</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/docs" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/docs" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/pt-BR/docs</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/docs" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/docs" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/en/info</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/info" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/info" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/pt-BR/info</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/info" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/info" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/en/privacy-policy</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/privacy-policy" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/privacy-policy" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monoforge-studio.vercel.app/pt-BR/privacy-policy</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://monoforge-studio.vercel.app/en/privacy-policy" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://monoforge-studio.vercel.app/pt-BR/privacy-policy" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;

export async function GET() {
  return new NextResponse(SITEMAP_XML.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}

