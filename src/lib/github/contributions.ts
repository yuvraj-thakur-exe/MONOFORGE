/**
 * MonoForge - Real GitHub Contributor Activity Fetcher & Calculator
 * Fetches real, live GitHub contribution calendar data, streaks, and day-by-day counts.
 * Uses public CORS-friendly JSON endpoint with fallback to GitHub contributions HTML scrape,
 * cached in-memory to prevent rate-limiting.
 */

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface UserContributionStats {
  username: string;
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  dailyAverage: number;
  highestDay: number;
  weeks: ContributionWeek[];
  days: ContributionDay[];
  isRealData: boolean;
}

// In-memory cache with 15-minute TTL to keep requests snappy and respect external rate limits
interface CacheEntry {
  stats: UserContributionStats;
  timestamp: number;
}

const CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Calculates current streak, max streak, peak day, and daily average from a sorted array of contribution days.
 */
export function calculateContributionMetrics(
  days: ContributionDay[],
  username: string,
  totalContributionsOverride?: number,
  isRealData = true
): UserContributionStats {
  const total = totalContributionsOverride ?? days.reduce((sum, d) => sum + d.count, 0);
  const highestDay = days.reduce((max, d) => Math.max(max, d.count), 0);
  const totalDays = Math.max(1, days.length);
  const dailyAverage = Number((total / totalDays).toFixed(1));

  // Calculate streaks
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  // Walk backwards from the most recent day to find current streak
  // (Allow for today having 0 commits if yesterday was active)
  const todayIdx = days.length - 1;
  let activeWalking = true;

  for (let i = todayIdx; i >= 0; i--) {
    const day = days[i];
    if (day.count > 0) {
      if (activeWalking) currentStreak++;
    } else {
      // If today is index todayIdx and count is 0, allow looking back to yesterday before breaking current streak
      if (i === todayIdx) {
        continue;
      }
      activeWalking = false;
    }
  }

  // Walk forward to calculate max streak
  for (let i = 0; i < days.length; i++) {
    if (days[i].count > 0) {
      tempStreak++;
      if (tempStreak > maxStreak) {
        maxStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Group into weeks of 7 days
  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({
      days: days.slice(i, i + 7),
    });
  }

  return {
    username,
    totalContributions: total,
    currentStreak,
    maxStreak: Math.max(maxStreak, currentStreak),
    dailyAverage,
    highestDay,
    weeks,
    days,
    isRealData,
  };
}

/**
 * Deterministic synthetic fallback generator when offline or rate-limited.
 * Uses username character codes as PRNG seed to ensure stable, realistic numbers.
 */
export function generateSyntheticContributions(username: string): UserContributionStats {
  const cleanUser = username.trim().toLowerCase() || 'octocat';
  let seed = 0;
  for (let i = 0; i < cleanUser.length; i++) {
    seed = (seed << 5) - seed + cleanUser.charCodeAt(i);
    seed |= 0;
  }

  const days: ContributionDay[] = [];
  const now = new Date();
  const dayCount = 182; // 26 weeks

  for (let i = dayCount - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Seeded pseudo-random level between 0 and 4
    const pseudo = Math.abs(Math.sin((seed + i * 17) * 0.45) * Math.cos((seed + i * 3) * 0.8));
    const level = pseudo > 0.75 ? 4 : pseudo > 0.55 ? 3 : pseudo > 0.35 ? 2 : pseudo > 0.18 ? 1 : 0;
    const count = level === 4 ? Math.floor(15 + pseudo * 15) : level === 3 ? 8 : level === 2 ? 4 : level === 1 ? 1 : 0;

    days.push({
      date: dateStr,
      count,
      level: level as 0 | 1 | 2 | 3 | 4,
    });
  }

  return calculateContributionMetrics(days, username, undefined, false);
}

/**
 * Fetches real contributor activity for a GitHub user.
 * Tries the fast public JSON API, then falls back to GitHub HTML parse, and finally synthetic.
 */
export async function fetchUserContributions(username: string): Promise<UserContributionStats> {
  const cleanUser = username.trim();
  if (!cleanUser) {
    return generateSyntheticContributions('octocat');
  }

  const cacheKey = cleanUser.toLowerCase();
  const cached = CACHE.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.stats;
  }

  // 1. Primary Method: jogruber GitHub contributions public JSON API
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(cleanUser)}?y=last`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'MonoForge-Profile-Engine/3.0',
      },
      next: { revalidate: 1800 },
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.contributions) && data.contributions.length > 0) {
        const days: ContributionDay[] = data.contributions.map((c: { date: string; count: number; level: number }) => ({
          date: c.date,
          count: Number(c.count) || 0,
          level: Math.min(4, Math.max(0, Number(c.level) || 0)) as 0 | 1 | 2 | 3 | 4,
        }));

        const totalContributions = typeof data.total?.lastYear === 'number' ? data.total.lastYear : undefined;
        const stats = calculateContributionMetrics(days, cleanUser, totalContributions, true);

        CACHE.set(cacheKey, { stats, timestamp: Date.now() });
        return stats;
      }
    }
  } catch {
    // Continue to fallback
  }

  // 2. Secondary Method: GitHub HTML contributions endpoint
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://github.com/users/${encodeURIComponent(cleanUser)}/contributions`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MonoForge',
      },
      next: { revalidate: 1800 },
    });

    clearTimeout(timeout);

    if (res.ok) {
      const html = await res.text();
      const dayMatches = html.matchAll(/data-date="([^"]+)"[^>]*data-level="([0-4])"/g);
      const days: ContributionDay[] = [];

      for (const match of dayMatches) {
        const date = match[1];
        const level = parseInt(match[2], 10) as 0 | 1 | 2 | 3 | 4;
        const count = level === 4 ? 12 : level === 3 ? 7 : level === 2 ? 4 : level === 1 ? 1 : 0;
        days.push({ date, count, level });
      }

      if (days.length > 30) {
        const stats = calculateContributionMetrics(days, cleanUser, undefined, true);
        CACHE.set(cacheKey, { stats, timestamp: Date.now() });
        return stats;
      }
    }
  } catch {
    // Continue to synthetic
  }

  // 3. Fallback: Seeded realistic synthetic contributions
  const synthetic = generateSyntheticContributions(cleanUser);
  return synthetic;
}

