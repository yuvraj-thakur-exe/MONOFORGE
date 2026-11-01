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
  generateUniversalVisualizationSvg,
} from '#/lib/visualizations/svg-generators';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { buildSyntheticDeveloperIdentity } from '#/lib/visualizations/data-engine';
import { fetchUserContributions } from '#/lib/github/contributions';
import { VisualizationTheme } from '#/lib/visualizations/types';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const plugin = searchParams.get('plugin') || 'isocalendar';
  const user = searchParams.get('user') || 'octocat';

  let svgContent = '';

  switch (plugin.toLowerCase()) {
    case 'isocalendar':
    case 'calendar':
    case 'iso': {
      const realStats = await fetchUserContributions(user);
      const streak = searchParams.get('streak') ? parseInt(searchParams.get('streak')!, 10) : realStats.currentStreak;
      const maxStreak = searchParams.get('max_streak') ? parseInt(searchParams.get('max_streak')!, 10) : realStats.maxStreak;
      const commits = searchParams.get('commits') ? parseInt(searchParams.get('commits')!, 10) : realStats.totalContributions;
      const average = searchParams.get('average') ? parseFloat(searchParams.get('average')!) : realStats.dailyAverage;
      const highestDay = searchParams.get('highest_day') ? parseInt(searchParams.get('highest_day')!, 10) : realStats.highestDay;
      const weeksData = realStats.weeks.map(w => w.days.map(d => ({ level: d.level, count: d.count })));

      svgContent = generateIsocalendarSvg({
        username: user,
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
      const realStats = await fetchUserContributions(user);
      const streak = searchParams.get('streak') ? parseInt(searchParams.get('streak')!, 10) : realStats.currentStreak;
      const maxStreak = searchParams.get('max_streak') ? parseInt(searchParams.get('max_streak')!, 10) : realStats.maxStreak;
      const commits = searchParams.get('commits') ? parseInt(searchParams.get('commits')!, 10) : realStats.totalContributions;
      const average = searchParams.get('average') ? parseFloat(searchParams.get('average')!) : realStats.dailyAverage;
      const highestDay = searchParams.get('highest_day') ? parseInt(searchParams.get('highest_day')!, 10) : realStats.highestDay;
      const weeksData = realStats.weeks.map(w => w.days.map(d => ({ level: d.level, count: d.count, date: d.date })));

      svgContent = generateContributionHeatmapSvg({
        username: user,
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
      const realStats = await fetchUserContributions(user);
      const streak = searchParams.get('streak') ? parseInt(searchParams.get('streak')!, 10) : realStats.currentStreak;
      const maxStreak = searchParams.get('max_streak') ? parseInt(searchParams.get('max_streak')!, 10) : realStats.maxStreak;
      const commits = searchParams.get('commits') ? parseInt(searchParams.get('commits')!, 10) : realStats.totalContributions;
      const activeDays = realStats.days.filter(d => d.count > 0).length;

      svgContent = generateContributionVelocitySvg({
        username: user,
        commits,
        streak,
        maxStreak,
        activeDays,
      });
      break;
    }

    case 'languages':
    case 'langs': {
      svgContent = generateLanguagesDonutSvg({ username: user });
      break;
    }

    case 'habits':
    case 'rhythm': {
      const peakHour = searchParams.get('peak') ? parseInt(searchParams.get('peak')!, 10) : undefined;
      svgContent = generateHabitsRadarSvg({ username: user, peakHour });
      break;
    }

    case 'achievements':
    case 'medals':
    case 'trophies': {
      svgContent = generateAchievementsRackSvg({ username: user });
      break;
    }

    case 'terminal':
    case 'console':
    case 'hud': {
      const repos = searchParams.get('repos') ? parseInt(searchParams.get('repos')!, 10) : undefined;
      const stars = searchParams.get('stars') ? parseInt(searchParams.get('stars')!, 10) : undefined;
      svgContent = generateTerminalHudSvg({ username: user, repos, stars });
      break;
    }

    case 'pagespeed':
    case 'speed':
    case 'lighthouse': {
      const url = searchParams.get('url') || `${user}.github.io`;
      svgContent = generatePageSpeedAuditSvg({ url });
      break;
    }

    case 'music':
    case 'spotify':
    case 'nowplaying': {
      const track = searchParams.get('track') || undefined;
      const artist = searchParams.get('artist') || undefined;
      svgContent = generateMusicPlayerSvg({ track, artist });
      break;
    }

    case 'leetcode':
    case 'algorithms': {
      const solved = searchParams.get('solved') ? parseInt(searchParams.get('solved')!, 10) : undefined;
      svgContent = generateLeetCodeStatsSvg({ username: user, solved });
      break;
    }

    // --- MonoForge 3.0 Signature Visualizations ---
    case 'commitcity':
    case 'city':
    case 'skyline': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'emerald') as VisualizationTheme;
      svgContent = generateCommitCitySvg(identity, { theme });
      break;
    }

    case 'river':
    case 'commitriver':
    case 'stream': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'ocean') as VisualizationTheme;
      svgContent = generateCommitRiverSvg(identity, { theme });
      break;
    }

    case 'yearclock':
    case 'clock':
    case 'radial': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'amber') as VisualizationTheme;
      svgContent = generateYearClockSvg(identity, { theme });
      break;
    }

    case 'pulse':
    case 'codingpulse':
    case 'ekg': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'matrix') as VisualizationTheme;
      svgContent = generateCodingPulseSvg(identity, { theme });
      break;
    }

    case 'developerterminal':
    case 'devterminal':
    case 'crtshell': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'matrix') as VisualizationTheme;
      svgContent = generateDeveloperTerminalSvg(identity, { theme });
      break;
    }

    case 'snake':
    case 'contributionsnake':
    case 'arcadesnake': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'amber') as VisualizationTheme;
      svgContent = generateContributionSnakeSvg(identity, { theme });
      break;
    }

    case 'galaxy':
    case 'repogalaxy':
    case 'planets': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'cyberpunk') as VisualizationTheme;
      svgContent = generateRepositoryGalaxySvg(identity, { theme });
      break;
    }

    case 'dna':
    case 'developerdna':
    case 'helix': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'cyberpunk') as VisualizationTheme;
      svgContent = generateDeveloperDnaSvg(identity, { theme });
      break;
    }

    case 'constellation':
    case 'skillconstellation':
    case 'starmap': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'tokyonight') as VisualizationTheme;
      svgContent = generateSkillConstellationSvg(identity, { theme });
      break;
    }

    case 'radar':
    case 'engineeringradar': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'emerald') as VisualizationTheme;
      svgContent = generateEngineeringRadarSvg(identity, { theme });
      break;
    }

    case 'blueprint':
    case 'schematic':
    case 'codebaseblueprint': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'emerald') as VisualizationTheme;
      svgContent = generateCodebaseBlueprintSvg(identity, { theme });
      break;
    }

    case 'languageriver':
    case 'polyglot': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'ocean') as VisualizationTheme;
      svgContent = generateLanguageRiverSvg(identity, { theme });
      break;
    }

    case 'timeline':
    case 'releasetimeline':
    case 'roadmap': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'amber') as VisualizationTheme;
      svgContent = generateReleaseTimelineSvg(identity, { theme });
      break;
    }

    case 'solarsystem':
    case 'techstack':
    case 'techstacksolarsystem': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'cyberpunk') as VisualizationTheme;
      svgContent = generateTechStackSolarSystemSvg(identity, { theme });
      break;
    }

    case 'synthwave':
    case 'outrun':
    case 'bento':
    case 'synthwavebento': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'cyberpunk') as VisualizationTheme;
      svgContent = generateSynthwaveBentoSvg(identity, { theme });
      break;
    }

    case 'neofetch':
    case 'fastfetch':
    case 'asciiterminal': {
      const identity = buildSyntheticDeveloperIdentity(user);
      const theme = (searchParams.get('theme') || 'matrix') as VisualizationTheme;
      svgContent = generateNeofetchTerminalSvg(identity, { theme });
      break;
    }

    case 'stamp':
    case 'badge':
    case 'brand': {
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 36" width="176" height="36" fill="none" preserveAspectRatio="xMidYMid meet">
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
      break;
    }

    default: {
      const cleanPlugin = plugin.toLowerCase().replace(/[-_]/g, '');
      const match = ALL_VISUALIZATION_IDS.find(
        id => id.replace(/[-_]/g, '') === cleanPlugin || id.toLowerCase() === plugin.toLowerCase()
      );
      if (match) {
        const identity = buildSyntheticDeveloperIdentity(user);
        const theme = (searchParams.get('theme') || 'emerald') as VisualizationTheme;
        svgContent = generateUniversalVisualizationSvg(match, identity, { theme });
      } else {
        svgContent = generateIsocalendarSvg({ username: user });
      }
      break;
    }
  }

  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

