import { describe, it, expect } from 'vitest';
import {
  calculateContributionMetrics,
  generateSyntheticContributions,
  type ContributionDay,
} from './contributions';

describe('GitHub Contributions Metric Engine', () => {
  it('correctly calculates totals, streaks, and peak day', () => {
    const mockDays: ContributionDay[] = [
      { date: '2026-01-01', count: 0, level: 0 },
      { date: '2026-01-02', count: 2, level: 1 },
      { date: '2026-01-03', count: 5, level: 2 },
      { date: '2026-01-04', count: 0, level: 0 },
      { date: '2026-01-05', count: 8, level: 3 },
      { date: '2026-01-06', count: 12, level: 4 },
      { date: '2026-01-07', count: 3, level: 1 },
    ];

    const stats = calculateContributionMetrics(mockDays, 'alexdev', undefined, true);

    expect(stats.username).toBe('alexdev');
    expect(stats.totalContributions).toBe(30);
    expect(stats.highestDay).toBe(12);
    expect(stats.currentStreak).toBe(3); // days 5, 6, 7
    expect(stats.maxStreak).toBe(3);
    expect(stats.isRealData).toBe(true);
    expect(stats.weeks.length).toBe(1);
  });

  it('generates consistent synthetic contributions for a username', () => {
    const stats1 = generateSyntheticContributions('shadcn');
    const stats2 = generateSyntheticContributions('shadcn');

    expect(stats1.totalContributions).toBe(stats2.totalContributions);
    expect(stats1.highestDay).toBe(stats2.highestDay);
    expect(stats1.weeks.length).toBe(26);
    expect(stats1.isRealData).toBe(false);
  });
});
