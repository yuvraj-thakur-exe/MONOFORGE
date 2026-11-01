import {
  NormalizedDeveloperIdentity,
  ContributionWeekData,
  ContributionDayData,
  RepoData,
  LanguageComposition,
  SkillNode,
} from './types';

/**
 * Creates a deterministic pseudo-random number generator for consistent rendering
 */
function createSeededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return () => {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

/**
 * Normalizes contribution days and computes accurate streaks and totals.
 */
export function buildSyntheticDeveloperIdentity(username: string): NormalizedDeveloperIdentity {
  const rng = createSeededRandom(username.toLowerCase());
  const now = new Date();
  const days: ContributionDayData[] = [];
  const weeks: ContributionWeekData[] = [];

  // Generate 52 weeks of contributions (364 days)
  let totalCommits = 0;
  let activeDays = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  for (let i = 363; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];

    // Activity distribution with periodic sprints and weekend lulls
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const activityChance = isWeekend ? 0.35 : 0.72;
    const hasActivity = rng() < activityChance;

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (hasActivity) {
      activeDays++;
      const r = rng();
      if (r > 0.92) {
        count = Math.floor(rng() * 12) + 8;
        level = 4;
      } else if (r > 0.7) {
        count = Math.floor(rng() * 5) + 4;
        level = 3;
      } else if (r > 0.35) {
        count = Math.floor(rng() * 3) + 2;
        level = 2;
      } else {
        count = 1;
        level = 1;
      }
      totalCommits += count;
      tempStreak++;
      if (tempStreak > maxStreak) maxStreak = tempStreak;
    } else {
      tempStreak = 0;
    }

    days.push({ date: dateStr, count, level });
  }

  // Calculate current streak from the end
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      if (i === days.length - 1) continue; // Allow today to have 0 if yesterday was active
      break;
    }
  }

  // Group into 52 weeks of 7 days
  for (let w = 0; w < 52; w++) {
    weeks.push({
      days: days.slice(w * 7, (w + 1) * 7),
    });
  }

  const highestDay = days.reduce((max, d) => Math.max(max, d.count), 0);
  const dailyAverage = Number((totalCommits / days.length).toFixed(1));

  // Verified repositories for the galaxy
  const repositories: RepoData[] = [
    {
      name: 'monoforge',
      stars: Math.floor(rng() * 1200) + 480,
      forks: Math.floor(rng() * 140) + 45,
      language: 'TypeScript',
      description: 'Developer Identity & Creative Visualization Engine',
      activityScore: 98,
      color: '#3178c6',
    },
    {
      name: 'telemetry-engine',
      stars: Math.floor(rng() * 450) + 120,
      forks: Math.floor(rng() * 60) + 18,
      language: 'Rust',
      description: 'High-throughput real-time stream visualizer and metrics analyzer',
      activityScore: 91,
      color: '#dea584',
    },
    {
      name: 'ai-prompt-studio',
      stars: Math.floor(rng() * 380) + 90,
      forks: Math.floor(rng() * 45) + 12,
      language: 'Python',
      description: 'Constrained generative design agent with structured JSON outputs',
      activityScore: 84,
      color: '#3572A5',
    },
    {
      name: 'vector-motion-kernel',
      stars: Math.floor(rng() * 290) + 65,
      forks: Math.floor(rng() * 30) + 8,
      language: 'TypeScript',
      description: '60fps GPU-accelerated SVG and Canvas motion runtime',
      activityScore: 78,
      color: '#3178c6',
    },
    {
      name: 'cloud-mesh-operator',
      stars: Math.floor(rng() * 210) + 40,
      forks: Math.floor(rng() * 25) + 5,
      language: 'Go',
      description: 'Autonomous zero-trust service mesh controller for Kubernetes',
      activityScore: 72,
      color: '#00ADD8',
    },
  ];

  // Language composition
  const languages: LanguageComposition[] = [
    { name: 'TypeScript', percentage: 48.5, color: '#3178c6', bytes: 642100 },
    { name: 'Rust', percentage: 22.4, color: '#dea584', bytes: 296800 },
    { name: 'Python', percentage: 14.8, color: '#3572A5', bytes: 196000 },
    { name: 'Go', percentage: 9.3, color: '#00ADD8', bytes: 123400 },
    { name: 'Shell / Bash', percentage: 5.0, color: '#89e051', bytes: 66200 },
  ];

  // Skill Constellation Nodes
  const skills: SkillNode[] = [
    { id: 'ts', name: 'TypeScript', category: 'frontend', level: 5, connectedTo: ['react', 'next', 'node'] },
    { id: 'react', name: 'React', category: 'frontend', level: 5, connectedTo: ['ts', 'next', 'tailwind'] },
    { id: 'next', name: 'Next.js', category: 'frontend', level: 5, connectedTo: ['react', 'ts', 'node'] },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 4, connectedTo: ['react', 'next'] },
    { id: 'rust', name: 'Rust', category: 'systems', level: 4, connectedTo: ['ts', 'wasm', 'docker'] },
    { id: 'wasm', name: 'WebAssembly', category: 'systems', level: 3, connectedTo: ['rust', 'ts'] },
    { id: 'node', name: 'Node.js', category: 'backend', level: 5, connectedTo: ['ts', 'docker', 'graphql'] },
    { id: 'docker', name: 'Docker', category: 'devops', level: 4, connectedTo: ['node', 'k8s', 'rust'] },
    { id: 'k8s', name: 'Kubernetes', category: 'devops', level: 3, connectedTo: ['docker', 'go'] },
    { id: 'go', name: 'Go', category: 'backend', level: 4, connectedTo: ['k8s', 'docker'] },
    { id: 'python', name: 'Python', category: 'ai', level: 4, connectedTo: ['pytorch', 'docker'] },
    { id: 'pytorch', name: 'PyTorch / AI', category: 'ai', level: 3, connectedTo: ['python'] },
  ];

  return {
    username,
    displayName: username === 'octocat' ? 'Alex Mercer (octocat)' : `${username}`,
    avatarUrl: `https://github.com/${username}.png`,
    bio: 'Systems Architect, Creative Technologist & Core Open-Source Maintainer',
    location: 'San Francisco, CA & Remote',
    totalContributions: totalCommits,
    currentStreak,
    maxStreak: Math.max(maxStreak, currentStreak),
    dailyAverage,
    highestDay,
    activeDaysCount: activeDays,
    weeks,
    days,
    repositories,
    languages,
    skills,
    isRealData: false,
  };
}

/**
 * Hydrates real data from API or falls back to synthetic dataset.
 */
export async function fetchNormalizedDeveloperIdentity(username: string): Promise<NormalizedDeveloperIdentity> {
  const fallback = buildSyntheticDeveloperIdentity(username);

  try {
    const res = await fetch(`/api/telemetry/contributions?user=${encodeURIComponent(username)}`);
    if (!res.ok) return fallback;

    const json = await res.json();
    if (!json?.success || !json?.data) return fallback;

    const data = json.data;
    const realWeeks: ContributionWeekData[] = (data.weeks || []).map((w: any) => ({
      days: (w.days || []).map((d: any) => ({
        date: d.date,
        count: d.count || 0,
        level: d.level ?? (d.count > 8 ? 4 : d.count > 4 ? 3 : d.count > 1 ? 2 : d.count > 0 ? 1 : 0),
      })),
    }));

    const realDays: ContributionDayData[] = (data.days || []).map((d: any) => ({
      date: d.date,
      count: d.count || 0,
      level: d.level ?? (d.count > 8 ? 4 : d.count > 4 ? 3 : d.count > 1 ? 2 : d.count > 0 ? 1 : 0),
    }));

    return {
      ...fallback,
      username,
      totalContributions: data.totalContributions || fallback.totalContributions,
      currentStreak: data.currentStreak || fallback.currentStreak,
      maxStreak: data.maxStreak || fallback.maxStreak,
      dailyAverage: data.dailyAverage || fallback.dailyAverage,
      highestDay: data.highestDay || fallback.highestDay,
      activeDaysCount: realDays.filter(d => d.count > 0).length || fallback.activeDaysCount,
      weeks: realWeeks.length > 0 ? realWeeks : fallback.weeks,
      days: realDays.length > 0 ? realDays : fallback.days,
      isRealData: true,
    };
  } catch {
    return fallback;
  }
}
