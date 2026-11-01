/**
 * MonoForge 3.0 — Signature Visualization & Developer Identity Types
 * Provides unified typing for developer datasets, dual output modes,
 * themes, motion controllers, and the visualization registry.
 */

export type VisualizationId =
  | 'commit-city'
  | 'commit-river'
  | 'year-clock'
  | 'coding-pulse'
  | 'developer-terminal'
  | 'contribution-snake'
  | 'repository-galaxy'
  | 'developer-dna'
  | 'skill-constellation';

export type OutputMode = 'canvas' | 'svg';

export type VisualizationCategory = 'activity' | 'repository' | 'skills' | 'identity';

export type VisualizationTheme =
  | 'emerald'
  | 'matrix'
  | 'cyberpunk'
  | 'tokyonight'
  | 'amber'
  | 'slate'
  | 'ocean';

export interface ThemeColors {
  id: VisualizationTheme;
  name: string;
  bg: string;
  cardBg: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  textPrimary: string;
  textMuted: string;
  levels: [string, string, string, string, string]; // Level 0 to 4
}

export interface ContributionDayData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeekData {
  days: ContributionDayData[];
}

export interface RepoData {
  name: string;
  stars: number;
  forks: number;
  language: string;
  description: string;
  activityScore: number; // 0 to 100
  color: string;
}

export interface LanguageComposition {
  name: string;
  percentage: number;
  color: string;
  bytes: number;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'ai' | 'systems' | 'tooling';
  level: number; // 1 to 5
  connectedTo: string[];
}

export interface NormalizedDeveloperIdentity {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  location: string;
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  dailyAverage: number;
  highestDay: number;
  activeDaysCount: number;
  weeks: ContributionWeekData[];
  days: ContributionDayData[];
  repositories: RepoData[];
  languages: LanguageComposition[];
  skills: SkillNode[];
  isRealData: boolean;
}

export interface VisualizationConfig {
  id: VisualizationId;
  theme: VisualizationTheme;
  outputMode: OutputMode;
  speed: number; // 0.5, 1, 1.5, 2
  loop: boolean;
  reducedMotion: boolean;
  interactive: boolean;
  zoom?: number;
  showLabels?: boolean;
}

export interface VisualizationManifest {
  id: VisualizationId;
  name: string;
  tagline: string;
  category: VisualizationCategory;
  description: string;
  badge: string;
  accent: string;
  supportsCanvas: boolean;
  supportsSvg: boolean;
  exportFormats: Array<'svg' | 'png' | 'markdown' | 'embed'>;
}

