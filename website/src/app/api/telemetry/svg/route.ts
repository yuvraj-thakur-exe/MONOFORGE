import { NextRequest, NextResponse } from 'next/server';
import {
  generateIsocalendarSvg,
  generateContributionHeatmapSvg,
  generateContributionVelocitySvg,
  generateLanguagesDonutSvg,
  generateHabitsRadarSvg,
  generateAchievementsRackSvg,
  generateTerminalHudSvg,
  generatePageSpeedAuditSvg,
  generateMusicPlayerSvg,
  generateLeetCodeStatsSvg,
} from '#/lib/forge-telemetry/svg-generators';
import {
  generateCommitCitySvg,
  generateCommitRiverSvg,
  generateYearClockSvg,
  generateCodingPulseSvg,
  generateDeveloperTerminalSvg,
  generateContributionSnakeSvg,
  generateRepositoryGalaxySvg,
  generateDeveloperDnaSvg,
  generateSkillConstellationSvg,
  generateEngineeringRadarSvg,
  generateCodebaseBlueprintSvg,
  generateLanguageRiverSvg,
  generateReleaseTimelineSvg,
  generateTechStackSolarSystemSvg,
  generateSynthwaveBentoSvg,
  generateNeofetchTerminalSvg,
  generateDiagonalHeatmapSvg,
  generateWhoamiCardSvg,
  generateUniversalVisualizationSvg,
} from '#/lib/visualizations/svg-generators';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { VISUALIZATION_THEMES } from '#/lib/visualizations/themes';
import {
  assembleDeveloperIdentity,
  buildSyntheticDeveloperIdentity,
  fetchPublicGitHubAccount,
  isValidGitHubUsername,
  NormalizedDeveloperIdentityWithProvenance,
} from '#/lib/visualizations/data-engine';
import { fetchUserContributions } from '#/lib/github/contributions';
import { VisualizationTheme } from '#/lib/visualizations/types';

export const runtime = 'nodejs';

const TELEMETRY_PLUGINS = new Set([
  'isocalendar',
  'calendar',
  'iso',
  'heatmap',
  'contributions',
  'matrix',
  'velocity',
  'momentum',
  'languages',
  'langs',
  'habits',
  'rhythm',
  'achievements',
  'medals',
  'trophies',
  'terminal',
  'console',
  'hud',
  'pagespeed',
  'speed',
  'lighthouse',
  'music',
  'spotify',
  'nowplaying',
  'leetcode',
  'algorithms',
  'stamp',
  'badge',
  'brand',
]);

const SIGNATURE_VIZ_ALIASES = new Set([
  'commitcity',
  'city',
  'skyline',
  'river',
  'commitriver',
  'stream',
  'yearclock',
  'clock',
  'radial',
  'pulse',
  'codingpulse',
  'ekg',
  'developerterminal',
  'devterminal',
  'crtshell',
  'snake',
  'contributionsnake',
  'arcadesnake',
  'galaxy',
  'repogalaxy',
  'planets',
  'dna',
  'developerdna',
  'helix',
  'constellation',
  'skillconstellation',
  'starmap',
  'radar',
  'engineeringradar',
  'blueprint',
  'schematic',
  'codebaseblueprint',
  'languageriver',
  'polyglot',
  'timeline',
  'releasetimeline',
  'roadmap',
  'solarsystem',
  'techstack',
  'techstacksolarsystem',
  'synthwave',
  'outrun',
  'bento',
  'synthwavebento',
  'neofetch',
  'fastfetch',
  'asciiterminal',
  'diagonalheatmap',
  'contribheatmap',
  'whoami',
  'infocard',
]);

const NORMALIZED_REGISTRY_IDS = new Set(
  ALL_VISUALIZATION_IDS.map((id) => id.replace(/[-_]/g, '').toLowerCase())
);

function isAllowedPlugin(pluginKey: string): boolean {
  const clean = pluginKey.replace(/[-_]/g, '').toLowerCase();
  return (
    TELEMETRY_PLUGINS.has(pluginKey) ||
    SIGNATURE_VIZ_ALIASES.has(pluginKey) ||
    SIGNATURE_VIZ_ALIASES.has(clean) ||
    NORMALIZED_REGISTRY_IDS.has(clean)
  );
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function parseOptionalInt(value: string | null): number | undefined {
  if (value === null || value.trim() === '') return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseOptionalFloat(value: string | null): number | undefined {
  if (value === null || value.trim() === '') return undefined;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

function annotateSvgProvenance(
  svg: string,
  identity: NormalizedDeveloperIdentityWithProvenance
): string {
  const source = identity.source ?? (identity.isRealData ? 'github' : 'unavailable');
  let label = 'LIVE GITHUB';
  let fill = '#064e3b';
  let stroke = '#10b981';
  let textFill = '#34d399';
  let badgeWidth = 110;

  if (source === 'sample') {
    label = 'SAMPLE DATA';
    fill = '#451a03';
    stroke = '#f59e0b';
    textFill = '#fbbf24';
    badgeWidth = 114;
  } else if (source === 'partial') {
    label = 'PARTIAL DATA';
    fill = '#422006';
    stroke = '#eab308';
    textFill = '#fde047';
    badgeWidth = 118;
  } else if (source === 'unavailable') {
    label = identity.rateLimited ? 'RATE LIMITED · DATA UNAVAILABLE' : 'DATA UNAVAILABLE';
    fill = '#450a0a';
    stroke = '#ef4444';
    textFill = '#fca5a5';
    badgeWidth = identity.rateLimited ? 218 : 138;
  }

  const badgeSvg = `
  <g data-provenance="${source}" transform="translate(16, 8)">
    <rect x="0" y="0" width="${badgeWidth}" height="18" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="1" />
    <text x="${badgeWidth / 2}" y="12.5" text-anchor="middle" fill="${textFill}" font-family="monospace" font-size="9" font-weight="700">${escapeXml(label)}</text>
  </g>
</svg>`;

  const closingIdx = svg.lastIndexOf('</svg>');
  if (closingIdx === -1) return svg;
  return `${svg.slice(0, closingIdx)}${badgeSvg}`;
}

function buildEmptyDnaSvg(
  identity: NormalizedDeveloperIdentityWithProvenance,
  themeKey: VisualizationTheme
): string {
  const theme = VISUALIZATION_THEMES[themeKey] || VISUALIZATION_THEMES.cyberpunk;
  const width = 880;
  const height = 360;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 34)">
    <text x="0" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">DEVELOPER DNA // BIOMETRIC GENETIC STRAND</text>
    <text x="0" y="28" fill="${theme.textMuted}" font-family="monospace" font-size="11">Base-Pair Mapping &bull; ${escapeXml(identity.displayName)}</text>
  </g>
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="13">0 VERIFIED LANGUAGES &bull; NO REPOSITORY LANGUAGE DATA</text>
</svg>`;
}

async function fetchServerNormalizedIdentity(
  username: string,
  mode: string | null
): Promise<NormalizedDeveloperIdentityWithProvenance> {
  if (mode === 'sample' || (username.toLowerCase() === 'octocat' && mode !== 'live')) {
    return buildSyntheticDeveloperIdentity(username);
  }

  const [contribOutcome, accountOutcome] = await Promise.allSettled([
    fetchUserContributions(username),
    fetchPublicGitHubAccount(username, { timeoutMs: 4500 }),
  ]);

  const contribStats =
    contribOutcome.status === 'fulfilled'
      ? (contribOutcome.value as unknown as Record<string, unknown>)
      : null;

  const accountResult =
    accountOutcome.status === 'fulfilled'
      ? accountOutcome.value
      : {
          ok: false,
          username,
          error: 'GitHub user lookup failed',
        };

  return assembleDeveloperIdentity(username, contribStats, accountResult);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawPlugin = searchParams.get('plugin') || 'isocalendar';
  const pluginKey = rawPlugin.trim().toLowerCase();

  if (!isAllowedPlugin(pluginKey)) {
    return NextResponse.json(
      { success: false, error: 'Unsupported visualization plugin' },
      { status: 400 }
    );
  }

  const rawUser = searchParams.get('user');
  const user = rawUser === null ? 'octocat' : rawUser.trim();
  if (!isValidGitHubUsername(user)) {
    return NextResponse.json(
      { success: false, error: 'Invalid GitHub username format' },
      { status: 400 }
    );
  }

  const rawTheme = searchParams.get('theme');
  if (rawTheme !== null && !(rawTheme in VISUALIZATION_THEMES)) {
    return NextResponse.json(
      { success: false, error: 'Invalid visualization theme' },
      { status: 400 }
    );
  }
  const requestedTheme = rawTheme as VisualizationTheme | null;

  const rawMode = searchParams.get('mode');
  if (rawMode !== null && rawMode !== 'sample' && rawMode !== 'live') {
    return NextResponse.json(
      { success: false, error: 'Invalid mode parameter' },
      { status: 400 }
    );
  }

  // Non-GitHub-identity badges / standalone cards
  if (pluginKey === 'stamp' || pluginKey === 'badge' || pluginKey === 'brand') {
    const stampSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 36" width="176" height="36" fill="none" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="mfAmber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="mfAura" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0.25" />
    </linearGradient>
    <style>
      .stamp-bg { fill: #ffffff; stroke: #e2e8f0; }
      .stamp-aura { fill: url(#mfAura); opacity: 0.8; }
      .stamp-icon-box { fill: #090d16; stroke: #1e293b; }
      .stamp-mono { fill: #09090b; }
      .stamp-pill-bg { fill: #ecfdf5; stroke: #a7f3d0; }
      .stamp-pill-text { fill: #059669; }
      @media (prefers-color-scheme: dark) {
        .stamp-bg { fill: #090d16; stroke: #1e293b; }
        .stamp-icon-box { fill: #030712; stroke: #334155; }
        .stamp-mono { fill: #f8fafc; }
        .stamp-pill-bg { fill: #064e3b; stroke: #059669; }
        .stamp-pill-text { fill: #34d399; }
      }
    </style>
  </defs>
  <rect x="1" y="1" width="174" height="34" rx="9" class="stamp-bg" stroke-width="1.2" />
  <rect x="4" y="4" width="28" height="28" rx="8" class="stamp-aura" />
  <rect x="5.5" y="5.5" width="25" height="25" rx="7" class="stamp-icon-box" stroke-width="1.2" />
  <g transform="translate(6.8, 6.4) scale(0.022)" stroke="#f59e0b" stroke-width="34" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="4" fill="none">
    <path d="M 273 374 C 185 374 168 410 168 452 C 168 494 185 521 250 521" stroke-linecap="round" />
    <path d="M 748 374 C 836 374 854 410 854 452 C 854 494 836 521 771 521" stroke-linecap="round" />
    <polygon points="512,195 719,310 774,493 594,733 430,733 250,493 305,310" />
    <path d="M 512 393 L 622 342 L 696 415 L 650 545 L 644 650 M 512 393 L 400 342 L 327 415 L 373 545 L 379 650" />
    <circle cx="424" cy="459" r="32" fill="#f59e0b" stroke="none" />
    <circle cx="598" cy="459" r="32" fill="#f59e0b" stroke="none" />
    <path d="M 453 507 L 512 558 L 571 507" />
    <line x1="512" y1="558" x2="512" y2="626" />
    <path d="M 432 651 L 512 626 L 592 651" />
  </g>
  <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif" font-weight="900" font-size="13" letter-spacing="-0.3">
    <tspan class="stamp-mono">MONO</tspan><tspan fill="url(#mfAmber)">FORGE</tspan>
  </text>
  <rect x="127" y="10" width="42" height="16" rx="8" class="stamp-pill-bg" stroke-width="0.8" />
  <circle cx="134" cy="18" r="2.5" fill="#10b981" />
  <text x="140" y="21" font-family="'JetBrains Mono', 'Fira Code', monospace" font-weight="700" font-size="7.5" class="stamp-pill-text" letter-spacing="0.3">
    CAMO
  </text>
</svg>`;
    return new NextResponse(stampSvg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  if (pluginKey === 'pagespeed' || pluginKey === 'speed' || pluginKey === 'lighthouse') {
    const rawUrl = searchParams.get('url')?.slice(0, 200);
    const svgContent = generatePageSpeedAuditSvg({ url: rawUrl || `${user}.github.io` });
    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  if (pluginKey === 'music' || pluginKey === 'spotify' || pluginKey === 'nowplaying') {
    const track = searchParams.get('track')?.slice(0, 120) || undefined;
    const artist = searchParams.get('artist')?.slice(0, 120) || undefined;
    const svgContent = generateMusicPlayerSvg({ track, artist });
    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  if (pluginKey === 'leetcode' || pluginKey === 'algorithms') {
    const solved = parseOptionalInt(searchParams.get('solved'));
    const svgContent = generateLeetCodeStatsSvg({ username: user, solved });
    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  // All GitHub-backed telemetry & MonoForge 3.0 visualizations share one normalized identity pipeline
  const identity = await fetchServerNormalizedIdentity(user, rawMode);
  let svgContent = '';

  switch (pluginKey) {
    case 'isocalendar':
    case 'calendar':
    case 'iso': {
      const streak = parseOptionalInt(searchParams.get('streak')) ?? identity.currentStreak;
      const maxStreak = parseOptionalInt(searchParams.get('max_streak')) ?? identity.maxStreak;
      const commits = parseOptionalInt(searchParams.get('commits')) ?? identity.totalContributions;
      const average = parseOptionalFloat(searchParams.get('average')) ?? identity.dailyAverage;
      const highestDay = parseOptionalInt(searchParams.get('highest_day')) ?? identity.highestDay;
      const weeksData = identity.weeks.map((w) => w.days.map((d) => ({ level: d.level, count: d.count })));

      svgContent = generateIsocalendarSvg({
        username: identity.username,
        streak,
        maxStreak,
        commits,
        average,
        highestDay,
        weeksData,
      });
      break;
    }

    case 'heatmap':
    case 'contributions':
    case 'matrix': {
      const streak = parseOptionalInt(searchParams.get('streak')) ?? identity.currentStreak;
      const maxStreak = parseOptionalInt(searchParams.get('max_streak')) ?? identity.maxStreak;
      const commits = parseOptionalInt(searchParams.get('commits')) ?? identity.totalContributions;
      const average = parseOptionalFloat(searchParams.get('average')) ?? identity.dailyAverage;
      const highestDay = parseOptionalInt(searchParams.get('highest_day')) ?? identity.highestDay;
      const weeksData = identity.weeks.map((w) =>
        w.days.map((d) => ({ level: d.level, count: d.count, date: d.date }))
      );

      svgContent = generateContributionHeatmapSvg({
        username: identity.username,
        commits,
        streak,
        maxStreak,
        average,
        highestDay,
        weeksData,
      });
      break;
    }

    case 'velocity':
    case 'momentum': {
      const streak = parseOptionalInt(searchParams.get('streak')) ?? identity.currentStreak;
      const maxStreak = parseOptionalInt(searchParams.get('max_streak')) ?? identity.maxStreak;
      const commits = parseOptionalInt(searchParams.get('commits')) ?? identity.totalContributions;
      const activeDays = identity.activeDaysCount;

      svgContent = generateContributionVelocitySvg({
        username: identity.username,
        commits,
        streak,
        maxStreak,
        activeDays,
      });
      break;
    }

    case 'languages':
    case 'langs': {
      const totalBytesNum = identity.languages.reduce((acc, l) => acc + l.bytes, 0);
      const mappedLangs = identity.languages.slice(0, 5).map((l) => ({
        name: l.name,
        color: l.color,
        percent: l.percentage,
        bytes: formatBytes(l.bytes),
      }));

      svgContent = generateLanguagesDonutSvg({
        username: identity.username,
        languages: mappedLangs,
        totalBytes: formatBytes(totalBytesNum),
        uniqueCount: identity.languages.length || 1,
      });
      if (identity.languages.length === 0) {
        svgContent = svgContent.replace('1 LANGUAGES', '0 LANGUAGES');
      }
      break;
    }

    case 'habits':
    case 'rhythm': {
      const peakHour = parseOptionalInt(searchParams.get('peak'));
      svgContent = generateHabitsRadarSvg({ username: identity.username, peakHour });
      break;
    }

    case 'achievements':
    case 'medals':
    case 'trophies': {
      svgContent = generateAchievementsRackSvg({ username: identity.username });
      break;
    }

    case 'terminal':
    case 'console':
    case 'hud': {
      const repos = parseOptionalInt(searchParams.get('repos')) ?? identity.repositories.length;
      const stars =
        parseOptionalInt(searchParams.get('stars')) ??
        identity.repositories.reduce((sum, r) => sum + r.stars, 0);
      const forks = identity.repositories.reduce((sum, r) => sum + r.forks, 0);
      svgContent = generateTerminalHudSvg({
        username: identity.username,
        repos,
        stars,
        forks,
        commits: identity.totalContributions,
        velocity: `${identity.dailyAverage} commits / day`,
      });
      break;
    }

    // --- MonoForge 3.0 Signature Visualizations ---
    case 'commitcity':
    case 'city':
    case 'skyline': {
      svgContent = generateCommitCitySvg(identity, { theme: requestedTheme ?? 'emerald' });
      break;
    }

    case 'river':
    case 'commitriver':
    case 'stream': {
      svgContent = generateCommitRiverSvg(identity, { theme: requestedTheme ?? 'ocean' });
      break;
    }

    case 'yearclock':
    case 'clock':
    case 'radial': {
      svgContent = generateYearClockSvg(identity, { theme: requestedTheme ?? 'amber' });
      break;
    }

    case 'pulse':
    case 'codingpulse':
    case 'ekg': {
      svgContent = generateCodingPulseSvg(identity, { theme: requestedTheme ?? 'matrix' });
      break;
    }

    case 'developerterminal':
    case 'devterminal':
    case 'crtshell': {
      svgContent = generateDeveloperTerminalSvg(identity, { theme: requestedTheme ?? 'matrix' });
      break;
    }

    case 'snake':
    case 'contributionsnake':
    case 'arcadesnake': {
      svgContent = generateContributionSnakeSvg(identity, { theme: requestedTheme ?? 'amber' });
      break;
    }

    case 'galaxy':
    case 'repogalaxy':
    case 'planets': {
      svgContent = generateRepositoryGalaxySvg(identity, { theme: requestedTheme ?? 'cyberpunk' });
      break;
    }

    case 'dna':
    case 'developerdna':
    case 'helix': {
      const theme = requestedTheme ?? 'cyberpunk';
      svgContent =
        identity.languages.length > 0
          ? generateDeveloperDnaSvg(identity, { theme })
          : buildEmptyDnaSvg(identity, theme);
      break;
    }

    case 'constellation':
    case 'skillconstellation':
    case 'starmap': {
      svgContent = generateSkillConstellationSvg(identity, {
        theme: requestedTheme ?? 'tokyonight',
      });
      break;
    }

    case 'radar':
    case 'engineeringradar': {
      svgContent = generateEngineeringRadarSvg(identity, { theme: requestedTheme ?? 'emerald' });
      break;
    }

    case 'blueprint':
    case 'schematic':
    case 'codebaseblueprint': {
      svgContent = generateCodebaseBlueprintSvg(identity, { theme: requestedTheme ?? 'emerald' });
      break;
    }

    case 'languageriver':
    case 'polyglot': {
      svgContent = generateLanguageRiverSvg(identity, { theme: requestedTheme ?? 'ocean' });
      break;
    }

    case 'timeline':
    case 'releasetimeline':
    case 'roadmap': {
      svgContent = generateReleaseTimelineSvg(identity, { theme: requestedTheme ?? 'amber' });
      break;
    }

    case 'solarsystem':
    case 'techstack':
    case 'techstacksolarsystem': {
      svgContent = generateTechStackSolarSystemSvg(identity, {
        theme: requestedTheme ?? 'cyberpunk',
      });
      break;
    }

    case 'synthwave':
    case 'outrun':
    case 'bento':
    case 'synthwavebento': {
      svgContent = generateSynthwaveBentoSvg(identity, { theme: requestedTheme ?? 'cyberpunk' });
      break;
    }

    case 'neofetch':
    case 'fastfetch':
    case 'asciiterminal': {
      svgContent = generateNeofetchTerminalSvg(identity, { theme: requestedTheme ?? 'matrix' });
      break;
    }

    case 'diagonal-heatmap':
    case 'diagonalheatmap':
    case 'contrib-heatmap':
    case 'contribheatmap': {
      svgContent = generateDiagonalHeatmapSvg(identity, { theme: requestedTheme ?? 'emerald' });
      break;
    }

    case 'whoami':
    case 'info-card':
    case 'infocard': {
      svgContent = generateWhoamiCardSvg(identity, { theme: requestedTheme ?? 'emerald' });
      break;
    }

    default: {
      const cleanPlugin = pluginKey.replace(/[-_]/g, '');
      const match = ALL_VISUALIZATION_IDS.find(
        (id) => id.replace(/[-_]/g, '').toLowerCase() === cleanPlugin || id.toLowerCase() === pluginKey
      );
      if (!match) {
        return NextResponse.json(
          { success: false, error: 'Unsupported visualization plugin' },
          { status: 400 }
        );
      }
      svgContent = generateUniversalVisualizationSvg(match, identity, {
        theme: requestedTheme ?? 'emerald',
      });
      break;
    }
  }

  const annotatedSvg = annotateSvgProvenance(svgContent, identity);

  return new NextResponse(annotatedSvg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control':
        identity.source === 'unavailable'
          ? 'no-store'
          : 'public, max-age=900, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
