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

