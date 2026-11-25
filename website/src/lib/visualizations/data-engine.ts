import {
  NormalizedDeveloperIdentity,
  ContributionWeekData,
  ContributionDayData,
  RepoData,
  LanguageComposition,
  SkillNode,
} from './types';

export const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export type DeveloperIdentitySource = 'github' | 'sample' | 'partial' | 'unavailable';

export interface NormalizedDeveloperIdentityWithProvenance extends NormalizedDeveloperIdentity {
  source?: DeveloperIdentitySource;
  missingFields?: string[];
  rateLimited?: boolean;
  notFound?: boolean;
  error?: string;
}

export interface FetchIdentityOptions {
  mode?: 'live' | 'sample';
  timeoutMs?: number;
  signal?: AbortSignal;
  baseUrl?: string;
}

export interface PublicGitHubAccountResult {
  ok: boolean;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  publicRepos?: number;
  followers?: number;
  following?: number;
  repositories?: RepoData[];
  languages?: LanguageComposition[];
  skills?: SkillNode[];
  rateLimited?: boolean;
  notFound?: boolean;
  error?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Lua: '#000080',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Scala: '#c22d40',
  Zig: '#ec915c',
};

export function isValidGitHubUsername(username: string): boolean {
  if (typeof username !== 'string') return false;
  const trimmed = username.trim();
  return trimmed.length > 0 && trimmed.length <= 39 && GITHUB_USERNAME_REGEX.test(trimmed);
}

function isFiniteNonNegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isValidIsoDate(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = Date.parse(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed);
}

function clampContributionLevel(level: unknown, count: number): 0 | 1 | 2 | 3 | 4 {
  if (typeof level === 'number' && Number.isInteger(level) && level >= 0 && level <= 4) {
    return level as 0 | 1 | 2 | 3 | 4;
  }
  if (count <= 0) return 0;
  if (count > 8) return 4;
  if (count > 4) return 3;
  if (count > 1) return 2;
  return 1;
}

/**
 * Creates an empty 52-week (364-day) contribution calendar with all counts set to 0.
 * Never invents synthetic activity.
 */
export function createEmptyCalendar(): { weeks: ContributionWeekData[]; days: ContributionDayData[] } {
  const now = new Date();
  const days: ContributionDayData[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    days.push({
      date: d.toISOString().split('T')[0],
      count: 0,
      level: 0,
    });
  }

  const weeks: ContributionWeekData[] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push({ days: days.slice(w * 7, (w + 1) * 7) });
  }

  return { weeks, days };
}

function computeStreakMetrics(days: ContributionDayData[]): {
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  dailyAverage: number;
  highestDay: number;
  activeDaysCount: number;
} {
  if (days.length === 0) {
    return {
      totalContributions: 0,
      currentStreak: 0,
      maxStreak: 0,
      dailyAverage: 0,
      highestDay: 0,
      activeDaysCount: 0,
    };
  }

  let totalContributions = 0;
  let highestDay = 0;
  let activeDaysCount = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  for (const day of days) {
    totalContributions += day.count;
    if (day.count > highestDay) highestDay = day.count;
    if (day.count > 0) {
      activeDaysCount++;
      tempStreak++;
      if (tempStreak > maxStreak) maxStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      if (i === days.length - 1) continue;
      break;
    }
  }

  const dailyAverage = Number((totalContributions / days.length).toFixed(1));

  return {
    totalContributions,
    currentStreak,
    maxStreak: Math.max(maxStreak, currentStreak),
    dailyAverage,
    highestDay,
    activeDaysCount,
  };
}

/**
 * Derives skill constellation nodes strictly from real detected languages.
 * Returns empty array when no languages are present.
 */
export function deriveSkillsFromLanguages(languages: LanguageComposition[]): SkillNode[] {
  if (!Array.isArray(languages) || languages.length === 0) return [];

  const categoryForLanguage = (name: string): SkillNode['category'] => {
    const lower = name.toLowerCase();
    if (['typescript', 'javascript', 'html', 'css', 'scss', 'vue', 'svelte'].includes(lower)) return 'frontend';
    if (['rust', 'c', 'c++', 'zig'].includes(lower)) return 'systems';
    if (['python', 'jupyter notebook'].includes(lower)) return 'ai';
    if (['shell', 'dockerfile', 'hcl'].includes(lower)) return 'devops';
    return 'backend';
  };

  const nodes: SkillNode[] = languages.slice(0, 10).map((lang, idx) => {
    const id = lang.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `lang-${idx}`;
    const level = lang.percentage >= 35 ? 5 : lang.percentage >= 20 ? 4 : lang.percentage >= 10 ? 3 : lang.percentage >= 4 ? 2 : 1;
    return {
      id,
      name: lang.name,
      category: categoryForLanguage(lang.name),
      level,
      connectedTo: [],
    };
  });

  for (let i = 0; i < nodes.length; i++) {
    if (i + 1 < nodes.length) nodes[i].connectedTo.push(nodes[i + 1].id);
    if (i === 0 && nodes.length > 2) nodes[i].connectedTo.push(nodes[2].id);
  }

  return nodes;
}

/**
 * Creates a deterministic pseudo-random number generator for sample/demo rendering.
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
 * Builds deterministic sample/demo developer identity.
 * Always tagged isRealData: false and source: 'sample'.
 */
export function buildSyntheticDeveloperIdentity(username: string): NormalizedDeveloperIdentityWithProvenance {
  const cleanUser = username.trim() || 'octocat';
  const rng = createSeededRandom(cleanUser.toLowerCase());
  const now = new Date();
  const days: ContributionDayData[] = [];
  const weeks: ContributionWeekData[] = [];

  let totalCommits = 0;
  let activeDays = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  for (let i = 363; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];

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

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      if (i === days.length - 1) continue;
      break;
    }
  }

  for (let w = 0; w < 52; w++) {
    weeks.push({
      days: days.slice(w * 7, (w + 1) * 7),
    });
  }

  const highestDay = days.reduce((max, d) => Math.max(max, d.count), 0);
  const dailyAverage = Number((totalCommits / days.length).toFixed(1));

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

  const languages: LanguageComposition[] = [
    { name: 'TypeScript', percentage: 48.5, color: '#3178c6', bytes: 642100 },
    { name: 'Rust', percentage: 22.4, color: '#dea584', bytes: 296800 },
    { name: 'Python', percentage: 14.8, color: '#3572A5', bytes: 196000 },
    { name: 'Go', percentage: 9.3, color: '#00ADD8', bytes: 123400 },
    { name: 'Shell / Bash', percentage: 5.0, color: '#89e051', bytes: 66200 },
  ];

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
    username: cleanUser,
    displayName: cleanUser === 'octocat' ? 'octocat (Sample)' : `${cleanUser} (Sample)`,
    avatarUrl: `https://github.com/${encodeURIComponent(cleanUser)}.png`,
    bio: 'Sample Developer Profile — Connect a GitHub username to view real activity',
    location: 'Sample Environment',
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
    source: 'sample',
    missingFields: [],
  };
}

/**
 * Builds an honest zero-activity unavailable identity when GitHub telemetry cannot be fetched.
 */
export function buildUnavailableDeveloperIdentity(
  username: string,
  options: {
    rateLimited?: boolean;
    notFound?: boolean;
    error?: string;
    missingFields?: string[];
  } = {}
): NormalizedDeveloperIdentityWithProvenance {
  const cleanUser = username.trim();
  const { weeks, days } = createEmptyCalendar();

  return {
    username: cleanUser,
    displayName: cleanUser || 'Unknown User',
    avatarUrl: isValidGitHubUsername(cleanUser)
      ? `https://github.com/${encodeURIComponent(cleanUser)}.png`
      : '',
    bio: '',
    location: '',
    totalContributions: 0,
    currentStreak: 0,
    maxStreak: 0,
    dailyAverage: 0,
    highestDay: 0,
    activeDaysCount: 0,
    weeks,
    days,
    repositories: [],
    languages: [],
    skills: [],
    isRealData: false,
    source: 'unavailable',
    missingFields: options.missingFields ?? ['contributions', 'profile', 'repositories', 'languages'],
    rateLimited: options.rateLimited,
    notFound: options.notFound,
    error: options.error,
  };
}

function normalizeDaysList(rawDays: unknown): ContributionDayData[] | null {
  if (!Array.isArray(rawDays)) return null;
  const result: ContributionDayData[] = [];

  for (const item of rawDays) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    if (!isValidIsoDate(record.date)) continue;
    const count = isFiniteNonNegativeNumber(record.count) ? record.count : 0;
    const level = clampContributionLevel(record.level, count);
    result.push({ date: record.date, count, level });
  }

  return result;
}

function normalizeWeeksList(rawWeeks: unknown): ContributionWeekData[] | null {
  if (!Array.isArray(rawWeeks)) return null;
  const result: ContributionWeekData[] = [];

  for (const week of rawWeeks) {
    if (!week || typeof week !== 'object') continue;
    const rawDays = (week as Record<string, unknown>).days;
    const days = normalizeDaysList(rawDays);
    if (days !== null) {
      result.push({ days });
    }
  }

  return result;
}

function normalizeRepoList(rawRepos: unknown): RepoData[] | null {
  if (!Array.isArray(rawRepos)) return null;
  const repos: RepoData[] = [];

  for (const item of rawRepos) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;
    if (typeof r.name !== 'string' || !r.name.trim()) continue;
    const language = typeof r.language === 'string' && r.language.trim() ? r.language.trim() : 'Unknown';
    repos.push({
      name: r.name.trim(),
      stars: isFiniteNonNegativeNumber(r.stars) ? r.stars : 0,
      forks: isFiniteNonNegativeNumber(r.forks) ? r.forks : 0,
      language,
      description: typeof r.description === 'string' ? r.description : '',
      activityScore: isFiniteNonNegativeNumber(r.activityScore) ? Math.min(100, r.activityScore) : 0,
      color: typeof r.color === 'string' && r.color ? r.color : (LANGUAGE_COLORS[language] ?? '#64748b'),
    });
  }

  return repos;
}

function normalizeLanguageList(rawLangs: unknown): LanguageComposition[] | null {
  if (!Array.isArray(rawLangs)) return null;
  const langs: LanguageComposition[] = [];

  for (const item of rawLangs) {
    if (!item || typeof item !== 'object') continue;
    const l = item as Record<string, unknown>;
    if (typeof l.name !== 'string' || !l.name.trim()) continue;
    const name = l.name.trim();
    langs.push({
      name,
      percentage: isFiniteNonNegativeNumber(l.percentage) ? l.percentage : 0,
      color: typeof l.color === 'string' && l.color ? l.color : (LANGUAGE_COLORS[name] ?? '#64748b'),
      bytes: isFiniteNonNegativeNumber(l.bytes) ? l.bytes : 0,
    });
  }

  return langs;
}

function normalizeSkillList(rawSkills: unknown): SkillNode[] | null {
  if (!Array.isArray(rawSkills)) return null;
  const validCategories = new Set(['frontend', 'backend', 'devops', 'ai', 'systems', 'tooling']);
  const skills: SkillNode[] = [];

  for (const item of rawSkills) {
    if (!item || typeof item !== 'object') continue;
    const s = item as Record<string, unknown>;
    if (typeof s.id !== 'string' || typeof s.name !== 'string') continue;
    const category = typeof s.category === 'string' && validCategories.has(s.category)
      ? (s.category as SkillNode['category'])
      : 'backend';
    const level = isFiniteNonNegativeNumber(s.level) ? Math.min(5, Math.max(1, Math.round(s.level))) : 1;
    const connectedTo = Array.isArray(s.connectedTo)
      ? s.connectedTo.filter((c): c is string => typeof c === 'string')
      : [];
    skills.push({ id: s.id, name: s.name, category, level, connectedTo });
  }

  return skills;
}

/**
 * Pure, null-aware normalizer that preserves valid 0 values and never mixes synthetic fallback into real data.
 */
export function normalizeDeveloperIdentityData(
  username: string,
  rawPayload: unknown
): NormalizedDeveloperIdentityWithProvenance {
  const cleanUser = username.trim();

  if (!rawPayload || typeof rawPayload !== 'object') {
    return buildUnavailableDeveloperIdentity(cleanUser, {
      error: 'Invalid telemetry payload',
      missingFields: ['contributions', 'profile', 'repositories', 'languages'],
    });
  }

  const data = rawPayload as Record<string, unknown>;

  if (data.source === 'sample') {
    return buildSyntheticDeveloperIdentity(cleanUser);
  }

  if (data.isRealData === false && data.source !== 'partial') {
    return buildUnavailableDeveloperIdentity(cleanUser, {
      rateLimited: Boolean(data.rateLimited),
      notFound: Boolean(data.notFound),
      error: typeof data.error === 'string' ? data.error : 'Real GitHub contribution data unavailable',
      missingFields: Array.isArray(data.missingFields)
        ? data.missingFields.filter((f): f is string => typeof f === 'string')
        : ['contributions'],
    });
  }

  const missingFields: string[] = Array.isArray(data.missingFields)
    ? data.missingFields.filter((f): f is string => typeof f === 'string')
    : [];

  const addMissing = (field: string) => {
    if (!missingFields.includes(field)) missingFields.push(field);
  };

  let days = normalizeDaysList(data.days);
  let weeks = normalizeWeeksList(data.weeks);

  if (weeks === null && days !== null && days.length > 0) {
    weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push({ days: days.slice(i, i + 7) });
    }
  } else if (days === null && weeks !== null && weeks.length > 0) {
    days = weeks.flatMap(w => w.days);
  }

  const hasContributionCalendar =
    (days !== null && days.length > 0) || (weeks !== null && weeks.length > 0);

  if (!hasContributionCalendar) {
    addMissing('contributions');
    const empty = createEmptyCalendar();
    days = empty.days;
    weeks = empty.weeks;
  }

  const resolvedDays = days ?? [];
  const resolvedWeeks = weeks ?? [];
  const computed = computeStreakMetrics(resolvedDays);

  const totalContributions = isFiniteNonNegativeNumber(data.totalContributions)
    ? data.totalContributions
    : (hasContributionCalendar ? computed.totalContributions : (addMissing('totalContributions'), 0));

  const currentStreak = isFiniteNonNegativeNumber(data.currentStreak)
    ? data.currentStreak
    : (hasContributionCalendar ? computed.currentStreak : (addMissing('currentStreak'), 0));

  const maxStreak = isFiniteNonNegativeNumber(data.maxStreak)
    ? data.maxStreak
    : (hasContributionCalendar ? computed.maxStreak : (addMissing('maxStreak'), 0));

  const dailyAverage = isFiniteNonNegativeNumber(data.dailyAverage)
    ? data.dailyAverage
    : (hasContributionCalendar ? computed.dailyAverage : (addMissing('dailyAverage'), 0));

  const highestDay = isFiniteNonNegativeNumber(data.highestDay)
    ? data.highestDay
    : (hasContributionCalendar ? computed.highestDay : (addMissing('highestDay'), 0));

  const activeDaysCount = isFiniteNonNegativeNumber(data.activeDaysCount)
    ? data.activeDaysCount
    : (hasContributionCalendar ? computed.activeDaysCount : 0);

  const repos = normalizeRepoList(data.repositories);
  if (repos === null) addMissing('repositories');

  const langs = normalizeLanguageList(data.languages);
  if (langs === null) addMissing('languages');

  const resolvedRepos = repos ?? [];
  const resolvedLangs = langs ?? [];
  const rawSkills = normalizeSkillList(data.skills);
  const resolvedSkills = rawSkills ?? deriveSkillsFromLanguages(resolvedLangs);

  const profileObj = (data.profile && typeof data.profile === 'object')
    ? (data.profile as Record<string, unknown>)
    : undefined;

  const displayName =
    typeof data.displayName === 'string' && data.displayName.trim()
      ? data.displayName.trim()
      : typeof profileObj?.displayName === 'string' && profileObj.displayName.trim()
      ? profileObj.displayName.trim()
      : cleanUser;

  const bio =
    typeof data.bio === 'string'
      ? data.bio
      : typeof profileObj?.bio === 'string'
      ? profileObj.bio
      : '';

  const location =
    typeof data.location === 'string'
      ? data.location
      : typeof profileObj?.location === 'string'
      ? profileObj.location
      : '';

  const avatarUrl =
    typeof data.avatarUrl === 'string' && data.avatarUrl
      ? data.avatarUrl
      : typeof profileObj?.avatarUrl === 'string' && profileObj.avatarUrl
      ? profileObj.avatarUrl
      : isValidGitHubUsername(cleanUser)
      ? `https://github.com/${encodeURIComponent(cleanUser)}.png`
      : '';

  const hasProfileOrRepos = Boolean(profileObj || repos !== null || langs !== null);
  const explicitlyPartial = data.source === 'partial' || missingFields.length > 0;

  let source: DeveloperIdentitySource;
  let isRealData: boolean;

  if (!hasContributionCalendar && !hasProfileOrRepos) {
    source = 'unavailable';
    isRealData = false;
  } else if (explicitlyPartial || data.isRealData === false) {
    source = 'partial';
    isRealData = false;
  } else {
    source = 'github';
    isRealData = true;
  }

  return {
    username: cleanUser,
    displayName,
    avatarUrl,
    bio,
    location,
    totalContributions,
    currentStreak,
    maxStreak,
    dailyAverage,
    highestDay,
    activeDaysCount,
    weeks: resolvedWeeks,
    days: resolvedDays,
    repositories: resolvedRepos,
    languages: resolvedLangs,
    skills: resolvedSkills,
    isRealData,
    source,
    missingFields,
    rateLimited: Boolean(data.rateLimited),
    notFound: Boolean(data.notFound),
    error: typeof data.error === 'string' ? data.error : undefined,
  };
}

/**
 * Fetches public GitHub user profile and public repositories without inventing missing stats.
 */
export async function fetchPublicGitHubAccount(
  username: string,
  options: { timeoutMs?: number; signal?: AbortSignal } = {}
): Promise<PublicGitHubAccountResult> {
  const cleanUser = username.trim();
  if (!isValidGitHubUsername(cleanUser)) {
    return {
      ok: false,
      username: cleanUser,
      error: 'Invalid GitHub username',
    };
  }

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 5000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const onParentAbort = () => controller.abort();
  options.signal?.addEventListener('abort', onParentAbort, { once: true });

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };

  if (typeof window === 'undefined') {
    headers['User-Agent'] = 'MonoForge-Profile-Engine/3.0';
    if (typeof process !== 'undefined' && process.env?.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`, {
      signal: controller.signal,
      headers,
    });

    if (userRes.status === 404) {
      return {
        ok: false,
        username: cleanUser,
        notFound: true,
        error: `GitHub user "@${cleanUser}" not found`,
      };
    }

    if (userRes.status === 403 || userRes.status === 429) {
      return {
        ok: false,
        username: cleanUser,
        rateLimited: true,
        error: 'GitHub API rate limit exceeded',
      };
    }

    if (!userRes.ok) {
      return {
        ok: false,
        username: cleanUser,
        error: `GitHub user lookup failed (${userRes.status})`,
      };
    }

    const userJson = (await userRes.json()) as Record<string, unknown>;
    if (!userJson || typeof userJson.login !== 'string') {
      return {
        ok: false,
        username: cleanUser,
        error: 'Invalid GitHub user response',
      };
    }

    let repositories: RepoData[] = [];
    let languages: LanguageComposition[] = [];

    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=updated&per_page=30`,
        { signal: controller.signal, headers }
      );

      if (reposRes.ok) {
        const reposJson = await reposRes.json();
        if (Array.isArray(reposJson)) {
          const nonForks = reposJson.filter((r): r is Record<string, unknown> => Boolean(r && typeof r === 'object'));
          const sorted = [...nonForks].sort(
            (a, b) => (Number(b.stargazers_count) || 0) - (Number(a.stargazers_count) || 0)
          );

          repositories = sorted.slice(0, 12).map((r) => {
            const lang = typeof r.language === 'string' && r.language.trim() ? r.language.trim() : 'Unknown';
            const stars = isFiniteNonNegativeNumber(r.stargazers_count) ? r.stargazers_count : 0;
            const forks = isFiniteNonNegativeNumber(r.forks_count) ? r.forks_count : 0;
            const size = isFiniteNonNegativeNumber(r.size) ? r.size : 0;
            return {
              name: typeof r.name === 'string' ? r.name : 'repo',
              stars,
              forks,
              language: lang,
              description: typeof r.description === 'string' ? r.description : '',
              activityScore: Math.min(100, Math.round(Math.min(60, stars * 2) + Math.min(25, forks * 2) + (size > 0 ? 15 : 0))),
              color: LANGUAGE_COLORS[lang] ?? '#64748b',
            };
          });

          const langTotals = new Map<string, number>();
          let totalWeight = 0;

          for (const r of nonForks) {
            if (typeof r.language !== 'string' || !r.language.trim()) continue;
            const lang = r.language.trim();
            const weight = isFiniteNonNegativeNumber(r.size) && r.size > 0 ? r.size * 1024 : 1024;
            langTotals.set(lang, (langTotals.get(lang) ?? 0) + weight);
            totalWeight += weight;
          }

          if (totalWeight > 0) {
            languages = Array.from(langTotals.entries())
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8)
              .map(([name, bytes]) => ({
                name,
                bytes,
                percentage: Number(((bytes / totalWeight) * 100).toFixed(1)),
                color: LANGUAGE_COLORS[name] ?? '#64748b',
              }));
          }
        }
      }
    } catch {
      // Repositories endpoint failed or timed out; keep empty arrays without inventing data
    }

    const login = userJson.login;
    const displayName =
      typeof userJson.name === 'string' && userJson.name.trim() ? userJson.name.trim() : login;

    return {
      ok: true,
      username: login,
      displayName,
      avatarUrl: typeof userJson.avatar_url === 'string' ? userJson.avatar_url : `https://github.com/${encodeURIComponent(login)}.png`,
      bio: typeof userJson.bio === 'string' ? userJson.bio : '',
      location: typeof userJson.location === 'string' ? userJson.location : '',
      publicRepos: isFiniteNonNegativeNumber(userJson.public_repos) ? userJson.public_repos : 0,
      followers: isFiniteNonNegativeNumber(userJson.followers) ? userJson.followers : 0,
      following: isFiniteNonNegativeNumber(userJson.following) ? userJson.following : 0,
      repositories,
      languages,
      skills: deriveSkillsFromLanguages(languages),
    };
  } catch (err) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    return {
      ok: false,
      username: cleanUser,
      error: isAbort ? 'GitHub request timed out' : err instanceof Error ? err.message : 'GitHub request failed',
    };
  } finally {
    clearTimeout(timeoutId);
    options.signal?.removeEventListener('abort', onParentAbort);
  }
}

/**
 * Combines contribution stats (from contributions fetcher) and public GitHub account data
 * into a single provenance-tracked NormalizedDeveloperIdentityWithProvenance.
 */
export function assembleDeveloperIdentity(
  username: string,
  contribData: Record<string, unknown> | null | undefined,
  account: PublicGitHubAccountResult | null | undefined
): NormalizedDeveloperIdentityWithProvenance {
  const cleanUser = account?.ok && account.username ? account.username : username.trim();
  const contribIsReal = Boolean(contribData && contribData.isRealData === true);
  const accountOk = Boolean(account && account.ok);

  if (account?.notFound) {
    return buildUnavailableDeveloperIdentity(cleanUser, {
      notFound: true,
      error: account.error || `GitHub user "@${cleanUser}" not found`,
    });
  }

  if (!contribIsReal && !accountOk) {
    return buildUnavailableDeveloperIdentity(cleanUser, {
      rateLimited: Boolean(account?.rateLimited),
      notFound: Boolean(account?.notFound),
      error: account?.error || 'GitHub telemetry unavailable',
    });
  }

  const missingFields: string[] = [];
  if (!contribIsReal) missingFields.push('contributions');
  if (!accountOk) missingFields.push('profile', 'repositories', 'languages');

  const payload: Record<string, unknown> = {
    username: cleanUser,
    displayName: accountOk ? account!.displayName : cleanUser,
    avatarUrl: accountOk ? account!.avatarUrl : `https://github.com/${encodeURIComponent(cleanUser)}.png`,
    bio: accountOk ? (account!.bio ?? '') : '',
    location: accountOk ? (account!.location ?? '') : '',
    repositories: accountOk ? (account!.repositories ?? []) : undefined,
    languages: accountOk ? (account!.languages ?? []) : undefined,
    skills: accountOk ? (account!.skills ?? []) : undefined,
    isRealData: contribIsReal && accountOk,
    source: contribIsReal && accountOk ? 'github' : 'partial',
    missingFields,
    rateLimited: Boolean(account?.rateLimited),
    error: !accountOk ? account?.error : undefined,
  };

  if (contribIsReal && contribData) {
    payload.totalContributions = contribData.totalContributions;
    payload.currentStreak = contribData.currentStreak;
    payload.maxStreak = contribData.maxStreak;
    payload.dailyAverage = contribData.dailyAverage;
    payload.highestDay = contribData.highestDay;
    payload.activeDaysCount = contribData.activeDaysCount;
    payload.weeks = contribData.weeks;
    payload.days = contribData.days;
  }

  return normalizeDeveloperIdentityData(cleanUser, payload);
}

/**
 * Hydrates real data from `/api/telemetry/contributions` without inventing fallback values.
 */
export async function fetchNormalizedDeveloperIdentity(
  username: string,
  options: FetchIdentityOptions = {}
): Promise<NormalizedDeveloperIdentityWithProvenance> {
  const cleanUser = username.trim();

  if (!isValidGitHubUsername(cleanUser)) {
    return buildUnavailableDeveloperIdentity(cleanUser, {
      error: 'Invalid GitHub username',
      missingFields: ['username'],
    });
  }

  if (options.mode === 'sample') {
    return buildSyntheticDeveloperIdentity(cleanUser);
  }

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 8000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const onParentAbort = () => controller.abort();
  options.signal?.addEventListener('abort', onParentAbort, { once: true });

  try {
    const base = options.baseUrl ?? '';
    const res = await fetch(
      `${base}/api/telemetry/contributions?user=${encodeURIComponent(cleanUser)}`,
      { signal: controller.signal }
    );

    let json: Record<string, unknown> | null = null;
    try {
      json = (await res.json()) as Record<string, unknown>;
    } catch {
      json = null;
    }

    if (res.status === 429) {
      return buildUnavailableDeveloperIdentity(cleanUser, {
        rateLimited: true,
        error: typeof json?.error === 'string' ? json.error : 'GitHub API rate limit exceeded',
      });
    }

    if (res.status === 404) {
      return buildUnavailableDeveloperIdentity(cleanUser, {
        notFound: true,
        error: typeof json?.error === 'string' ? json.error : `GitHub user "@${cleanUser}" not found`,
      });
    }

    if (!res.ok || !json?.success || !json?.data) {
      return buildUnavailableDeveloperIdentity(cleanUser, {
        rateLimited: Boolean(json?.rateLimited),
        notFound: Boolean(json?.notFound),
        error: typeof json?.error === 'string' ? json.error : `Telemetry request failed (${res.status})`,
      });
    }

    return normalizeDeveloperIdentityData(cleanUser, json.data);
  } catch (err) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    return buildUnavailableDeveloperIdentity(cleanUser, {
      error: isAbort ? 'Request timed out' : err instanceof Error ? err.message : 'Network error',
    });
  } finally {
    clearTimeout(timeoutId);
    options.signal?.removeEventListener('abort', onParentAbort);
  }
}
