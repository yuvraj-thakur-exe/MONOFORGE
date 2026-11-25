import '#/styles/global.css';
import '#/styles/markdown-theme.css';
import '#/styles/prism-syntax-theme.css';
import '#/styles/geometric-loader.css';

import '#/features/text/text-styles.css';

// Suppress React 19 false-positive warning for next-themes inline script injection during SSR
if (typeof console !== 'undefined') {
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    origError.apply(console, args);
  };
}

import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { config } from '#/config';
import { Handles } from '#/components/handles';
import { Modal } from '#/components/molecules/modal';
import { Features } from '#/features';
import { routing } from '#/i18n/routing';
import { ThemeProvider } from '#/components/theme/ThemeProvider';
import { ScrollProgressIndicator } from '#/components/common/ScrollProgressIndicator';
import { ScrollToTopButton } from '#/components/common/ScrollToTopButton';
import { StudioCursor } from '#/components/studio/StudioCursor';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });

  const title = t('title');
  const description = t('description');
  let appUrl = config.general.urls.app;

  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'https';
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      appUrl = `${proto}://${host}`;
    }
  } catch {
    // Fallback to static appUrl
  }

  const languages: Record<string, string> = {
    'x-default': `${appUrl}/en`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${appUrl}/${loc}`;
  }

  return {
    metadataBase: new URL(appUrl),
    title,
    description,
    authors: [{ name: t('author') }],
    keywords: t.raw('keywords') as string[],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'ai:ready': 'true',
      'ai:model-context': `${appUrl}/llms.txt`,
      'ai:agent-skill': `${appUrl}/api/agent/skill`,
      'ai:mcp': 'npx github:yuvraj-thakur-exe/MONOFORGE mcp',
      'ai:description':
        'MonoForge is an open-source AI-native GitHub Profile README generator featuring 350+ curated archetypes, Camo-safe 60fps SVG animations, 30+ SVG visualizations, 22 modular plugins, 47 verified social icons, and confirmation-gated GitHub sync.',
      'ai:capability':
        'camo-safe-svg, 60fps-animation, telemetry-bento, dynamic-isometric-skyline, direct-github-sync, monaco-raw-editor, live-heatmap',
      'llms-txt': `${appUrl}/llms.txt`,
    },
    manifest: '/manifest.json',
    icons: {
      icon: '/logo-icon.svg',
      shortcut: '/favicon.svg',
      apple: '/logo-icon.svg',
    },
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'MONOFORGE',
      url: `${appUrl}/${locale}`,
      images: [
        {
          url: `${appUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: 'MonoForge - GitHub Profile README Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${appUrl}/api/og`],
    },
    alternates: {
      canonical: `${appUrl}/${locale}`,
      languages,
    },
    verification: {
      google: [
        'bz6vQ1AHEnhwY9bON5NOfiVM7B-KtMHPLMENF2JXX9g',
        'google6fe900e7443f16a1',
        'nH_oO8Fxc76PZpqDg9y4loKj8DNPDL84Zz0zAKgAaSA',
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#f59e0b',
};

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Google Fonts (display=swap for non-blocking text rendering) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
        {/* Above-the-fold Hero LCP Asset Preload with High Priority */}
        <link
          rel="preload"
          href="/assets/monoforge-monkey-logo-256.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="help" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />
        <link rel="describedby" href="/api/schema" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${config.general.urls.app}/#website`,
                  url: config.general.urls.app,
                  name: 'MonoForge',
                  description:
                    'AI-native GitHub profile README engine with 350+ curated archetypes, 30+ SVG visualizations, 22 modular plugins, and Camo-safe 60fps SVG animations.',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${config.general.urls.app}/en/docs?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': ['WebApplication', 'SoftwareApplication'],
                  '@id': `${config.general.urls.app}/#app`,
                  name: 'MONOFORGE',
                  alternateName: [
                    'MonoForge GitHub Profile Generator',
                    'MonoForge Studio',
                    'MonoForge README Builder',
                  ],
                  softwareVersion: '2.0.0',
                  applicationCategory: 'DeveloperApplication',
                  operatingSystem: 'All',
                  url: config.general.urls.app,
                  description:
                    'Open-source AI-native GitHub profile README generator and visual studio featuring 350+ curated archetypes, 47 verified social icons, 30+ Camo-safe 60fps vector SVG visualizations, 22 modular plugins, and confirmation-gated GitHub push.',
                  featureList: [
                    '350+ Curated Starter Archetypes (3D Isometric, Bento, Terminal, Cyberpunk)',
                    '47 Official Verified Brand Social Platform Badges & Icons',
                    '100% Camo-Safe 60FPS Pure CSS SVG Animations (Zero Script, Zero Bitrot)',
                    'Real GitHub Dynamic Contributor Telemetry & Skyline Heatmaps',
                    'Interactive Visual Studio, Project README Studio & Monaco Raw Mode IDE',
                    'Confirmation-Gated GitHub Sync with Side-by-Side Diff Preview',
                    'MCP Server Integration for AI Coding Assistants (Cursor, Claude, Copilot)',
                  ],
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  creator: {
                    '@type': 'Organization',
                    name: 'MonoForge Open Source Contributors',
                    url: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
                  },
                  sameAs: ['https://github.com/yuvraj-thakur-exe/MONOFORGE'],
                },
                {
                  '@type': 'Organization',
                  '@id': `${config.general.urls.app}/#organization`,
                  name: 'MonoForge',
                  url: config.general.urls.app,
                  logo: `${config.general.urls.app}/assets/monoforge-monkey-logo.jpg`,
                  sameAs: [
                    'https://github.com/yuvraj-thakur-exe/MONOFORGE',
                    'https://github.com/yuvraj-thakur-exe',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="palette-surface min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] font-sans selection:bg-[#ffe600] selection:text-slate-950 transition-colors duration-200">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ScrollProgressIndicator />
            <ScrollToTopButton />
            <StudioCursor />
            <Handles />

            {children}

            <Modal />
            <Features />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
