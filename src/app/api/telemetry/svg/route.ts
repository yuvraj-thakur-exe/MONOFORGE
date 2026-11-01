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
import { fetchUserContributions } from '#/lib/github/contributions';

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

    default:
      svgContent = generateIsocalendarSvg({ username: user });
      break;
  }

  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

