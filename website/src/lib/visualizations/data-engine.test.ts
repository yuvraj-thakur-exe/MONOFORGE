import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  buildSyntheticDeveloperIdentity,
  fetchNormalizedDeveloperIdentity,
  normalizeDeveloperIdentityData,
  assembleDeveloperIdentity,
  isValidGitHubUsername,
} from './data-engine';

describe('MonoForge 3.0 Developer Identity Data Engine', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates complete, deterministic synthetic sample dataset with isRealData === false', () => {
    const data = buildSyntheticDeveloperIdentity('octocat');

    expect(data.username).toBe('octocat');
    expect(data.displayName).toContain('octocat');
    expect(data.totalContributions).toBeGreaterThan(0);
    expect(data.days.length).toBe(364);
    expect(data.weeks.length).toBe(52);
    expect(data.repositories.length).toBeGreaterThanOrEqual(4);
    expect(data.languages.length).toBeGreaterThanOrEqual(3);
    expect(data.skills.length).toBeGreaterThanOrEqual(6);
    expect(data.isRealData).toBe(false);
    expect(data.source).toBe('sample');
  });

  it('guarantees deterministic output for the same username', () => {
    const data1 = buildSyntheticDeveloperIdentity('developer');
    const data2 = buildSyntheticDeveloperIdentity('developer');

    expect(data1.totalContributions).toBe(data2.totalContributions);
    expect(data1.highestDay).toBe(data2.highestDay);
    expect(data1.currentStreak).toBe(data2.currentStreak);
  });

  it('produces distinct data for different usernames', () => {
    const dataA = buildSyntheticDeveloperIdentity('alice');
    const dataB = buildSyntheticDeveloperIdentity('bob');

    expect(dataA.totalContributions).not.toBe(dataB.totalContributions);
  });

  it('preserves valid 0 commits, 0 streak, 0 repos, and 0 languages without synthetic fallback', async () => {
    const zeroDays = Array.from({ length: 7 }, (_, i) => ({
      date: `2026-01-0${i + 1}`,
      count: 0,
      level: 0 as const,
    }));
    const zeroWeeks = [{ days: zeroDays }];

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          data: {
            username: 'zero-dev',
            displayName: 'Zero Dev',
            bio: '',
            location: '',
            totalContributions: 0,
            currentStreak: 0,
            maxStreak: 0,
            dailyAverage: 0,
            highestDay: 0,
            activeDaysCount: 0,
            weeks: zeroWeeks,
            days: zeroDays,
            repositories: [],
            languages: [],
            isRealData: true,
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );

    const result = await fetchNormalizedDeveloperIdentity('zero-dev');

    expect(result.username).toBe('zero-dev');
    expect(result.totalContributions).toBe(0);
    expect(result.currentStreak).toBe(0);
    expect(result.maxStreak).toBe(0);
    expect(result.dailyAverage).toBe(0);
    expect(result.highestDay).toBe(0);
    expect(result.activeDaysCount).toBe(0);
    expect(result.repositories).toEqual([]);
    expect(result.languages).toEqual([]);
    expect(result.isRealData).toBe(true);
    expect(result.source).toBe('github');
    expect(result.missingFields).toEqual([]);
  });

  it('tracks partial data and missingFields cleanly and never marks partial data as isRealData: true', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          data: {
            username: 'partial-dev',
            totalContributions: 12,
            currentStreak: 0,
            maxStreak: 3,
            dailyAverage: 1.7,
            highestDay: 5,
            weeks: [
              {
                days: [
                  { date: '2026-01-01', count: 5, level: 3 },
                  { date: '2026-01-02', count: 7, level: 3 },
                  { date: 'invalid-date', count: 99, level: 4 },
                ],
              },
            ],
            isRealData: true,
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );

    const result = await fetchNormalizedDeveloperIdentity('partial-dev');

    expect(result.isRealData).toBe(false);
    expect(result.source).toBe('partial');
    expect(result.missingFields).toContain('repositories');
    expect(result.missingFields).toContain('languages');
    expect(result.repositories).toEqual([]);
    expect(result.languages).toEqual([]);
    expect(result.days.length).toBe(2); // Invalid date entry dropped without inventing activity
    expect(result.currentStreak).toBe(0);
  });

  it('never marks upstream synthetic fallback (isRealData: false) as real data', () => {
    const normalized = normalizeDeveloperIdentityData('some-user', {
      username: 'some-user',
      totalContributions: 999,
      currentStreak: 20,
      isRealData: false,
    });

    expect(normalized.isRealData).toBe(false);
    expect(normalized.source).toBe('unavailable');
    expect(normalized.totalContributions).toBe(0);
    expect(normalized.currentStreak).toBe(0);
  });

  it('handles HTTP 429 rate limit gracefully without throwing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await fetchNormalizedDeveloperIdentity('octocat');

    expect(result.isRealData).toBe(false);
    expect(result.source).toBe('unavailable');
    expect(result.rateLimited).toBe(true);
    expect(result.totalContributions).toBe(0);
    expect(result.weeks.length).toBe(52);
  });

  it('handles HTTP 404 unknown user gracefully without inventing stats', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await fetchNormalizedDeveloperIdentity('nonexistent-user-404');

    expect(result.isRealData).toBe(false);
    expect(result.source).toBe('unavailable');
    expect(result.notFound).toBe(true);
    expect(result.totalContributions).toBe(0);
    expect(result.repositories).toEqual([]);
  });

  it('handles network timeouts / AbortError gracefully', async () => {
    const abortErr = new Error('The operation was aborted');
    abortErr.name = 'AbortError';
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(abortErr);

    const result = await fetchNormalizedDeveloperIdentity('timeout-user');

    expect(result.isRealData).toBe(false);
    expect(result.source).toBe('unavailable');
    expect(result.error).toContain('timed out');
    expect(result.weeks.length).toBe(52);
  });

  it('falls back gracefully on network or API failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network offline'));

    const fallback = await fetchNormalizedDeveloperIdentity('offline-user-999');
    expect(fallback).toBeDefined();
    expect(fallback.username).toBe('offline-user-999');
    expect(fallback.weeks.length).toBe(52);
    expect(fallback.isRealData).toBe(false);
    expect(fallback.source).toBe('unavailable');
    expect(fallback.totalContributions).toBe(0);
  });

  it('rejects invalid GitHub usernames cleanly', async () => {
    const spy = vi.spyOn(globalThis, 'fetch');
    expect(isValidGitHubUsername('-invalid')).toBe(false);
    expect(isValidGitHubUsername('a'.repeat(40))).toBe(false);

    const result = await fetchNormalizedDeveloperIdentity('bad<script>');
    expect(spy).not.toHaveBeenCalled();
    expect(result.isRealData).toBe(false);
    expect(result.source).toBe('unavailable');
    expect(result.missingFields).toContain('username');
  });

  it('assembles partial identity when GitHub account exists but contributions failed', () => {
    const identity = assembleDeveloperIdentity(
      'alice',
      { isRealData: false, totalContributions: 1234 },
      {
        ok: true,
        username: 'alice',
        displayName: 'Alice',
        bio: 'Builder',
        location: 'Berlin',
        repositories: [
          {
            name: 'core',
            stars: 10,
            forks: 2,
            language: 'TypeScript',
            description: 'Core repo',
            activityScore: 50,
            color: '#3178c6',
          },
        ],
        languages: [{ name: 'TypeScript', percentage: 100, color: '#3178c6', bytes: 2048 }],
      }
    );

    expect(identity.isRealData).toBe(false);
    expect(identity.source).toBe('partial');
    expect(identity.missingFields).toContain('contributions');
    expect(identity.totalContributions).toBe(0);
    expect(identity.repositories.length).toBe(1);
  });
});
