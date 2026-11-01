import { describe, it, expect } from 'vitest';
import { buildSyntheticDeveloperIdentity, fetchNormalizedDeveloperIdentity } from './data-engine';

describe('MonoForge 3.0 Developer Identity Data Engine', () => {
  it('generates complete, deterministic developer identity dataset', () => {
    const data = buildSyntheticDeveloperIdentity('octocat');

    expect(data.username).toBe('octocat');
    expect(data.displayName).toContain('octocat');
    expect(data.totalContributions).toBeGreaterThan(0);
    expect(data.days.length).toBe(364);
    expect(data.weeks.length).toBe(52);
    expect(data.repositories.length).toBeGreaterThanOrEqual(4);
    expect(data.languages.length).toBeGreaterThanOrEqual(3);
    expect(data.skills.length).toBeGreaterThanOrEqual(6);
  });

  it('guarantees deterministic output for the same username', () => {
    const data1 = buildSyntheticDeveloperIdentity('yuvraj');
    const data2 = buildSyntheticDeveloperIdentity('yuvraj');

    expect(data1.totalContributions).toBe(data2.totalContributions);
    expect(data1.highestDay).toBe(data2.highestDay);
    expect(data1.currentStreak).toBe(data2.currentStreak);
  });

  it('produces distinct data for different usernames', () => {
    const dataA = buildSyntheticDeveloperIdentity('alice');
    const dataB = buildSyntheticDeveloperIdentity('bob');

    expect(dataA.totalContributions).not.toBe(dataB.totalContributions);
  });

  it('falls back gracefully on network or API failure', async () => {
    const fallback = await fetchNormalizedDeveloperIdentity('offline-user-999');
    expect(fallback).toBeDefined();
    expect(fallback.username).toBe('offline-user-999');
    expect(fallback.weeks.length).toBe(52);
  });
});
