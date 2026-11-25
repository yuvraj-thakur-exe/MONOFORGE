import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchGitHubPreviewProfile } from './profile-preview';
import { ReadmeConfig } from '#/lib/plugins/types';

const BASE_CONFIG: ReadmeConfig = {
  version: '1.0.0',
  title: 'Test Profile',
  settings: {
    user: {
      github: 'octocat',
      name: 'Sample Name',
      bio: 'Sample Bio',
      location: 'Sample City',
    },
    theme: 'dark',
    accentColor: '#8b5cf6',
    badgeStyle: 'for-the-badge',
    align: 'center',
  },
  sections: [
    {
      id: 'sec-1',
      type: 'telemetry-isocalendar',
      props: {
        content: {
          username: 'octocat',
          format: 'isocalendar',
        },
        styles: {},
      },
    },
    {
      id: 'sec-2',
      type: 'waka-readme-stats',
      props: {
        content: {
          wakaUsername: 'custom-waka-handle',
        },
        styles: {},
      },
    },
  ],
};

describe('GitHub Account Preview Helper (profile-preview.ts)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects invalid GitHub usernames without making network calls', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const invalidCases = ['', '   ', '-leading', 'trailing-', 'double--dash', 'user name', 'a'.repeat(40), 'xss<script>'];
    for (const bad of invalidCases) {
      const result = await fetchGitHubPreviewProfile(bad);
      expect(result.status).toBe('invalid_username');
      expect(result.identity).toBeUndefined();
      const cloned = result.applyToConfig(BASE_CONFIG);
      expect(cloned).not.toBe(BASE_CONFIG);
      expect(cloned.settings.user.github).toBe('octocat');
    }

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns live status and updates local ReadmeConfig copy without mutating baseConfig', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

      if (url === 'https://api.github.com/users/torvalds') {
        return new Response(
          JSON.stringify({
            login: 'torvalds',
            name: 'Linus Torvalds',
            bio: 'Linux kernel creator',
            location: 'Portland, OR',
            avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
            public_repos: 7,
            followers: 200000,
            following: 0,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (url.startsWith('https://api.github.com/users/torvalds/repos')) {
        return new Response(
          JSON.stringify([
            {
              name: 'linux',
              stargazers_count: 180000,
              forks_count: 55000,
              language: 'C',
              description: 'Linux kernel source tree',
              size: 500000,
            },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (url.startsWith('/api/telemetry/contributions?user=torvalds')) {
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              username: 'torvalds',
              totalContributions: 3120,
              currentStreak: 14,
              maxStreak: 42,
              dailyAverage: 8.5,
              highestDay: 28,
              activeDaysCount: 300,
              weeks: [
                {
                  days: [{ date: '2026-01-01', count: 10, level: 4 }],
                },
              ],
              days: [{ date: '2026-01-01', count: 10, level: 4 }],
              isRealData: true,
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response('Not Found', { status: 404 });
    });

    const result = await fetchGitHubPreviewProfile('torvalds');

    expect(result.status).toBe('live');
    expect(result.username).toBe('torvalds');
    expect(result.identity).toBeDefined();
    expect(result.identity?.isRealData).toBe(true);
    expect(result.identity?.totalContributions).toBe(3120);
    expect(result.identity?.repositories[0]?.name).toBe('linux');

    const updated = result.applyToConfig(BASE_CONFIG);
    // Original baseConfig must remain untouched
    expect(BASE_CONFIG.settings.user.github).toBe('octocat');
    expect(BASE_CONFIG.settings.user.name).toBe('Sample Name');
    expect(BASE_CONFIG.sections[0].props.content.username).toBe('octocat');

    // Updated copy has verified user + telemetry username without touching wakaUsername
    expect(updated.settings.user.github).toBe('torvalds');
    expect(updated.settings.user.name).toBe('Linus Torvalds');
    expect(updated.settings.user.bio).toBe('Linux kernel creator');
    expect(updated.settings.user.location).toBe('Portland, OR');
    expect((updated.settings.user as { avatarUrl?: string }).avatarUrl).toBe(
      'https://avatars.githubusercontent.com/u/1024025?v=4'
    );
    expect(updated.sections[0].props.content.username).toBe('torvalds');
    expect(updated.sections[1].props.content.wakaUsername).toBe('custom-waka-handle');
  });

  it('returns partial status when profile loads but contributions fail, without inventing streaks', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

      if (url === 'https://api.github.com/users/alice') {
        return new Response(
          JSON.stringify({
            login: 'alice',
            name: 'Alice Dev',
            bio: null,
            location: null,
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            public_repos: 0,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (url.startsWith('https://api.github.com/users/alice/repos')) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      return new Response(JSON.stringify({ success: false }), { status: 503 });
    });

    const result = await fetchGitHubPreviewProfile('alice');

    expect(result.status).toBe('partial');
    expect(result.identity?.isRealData).toBe(false);
    expect(result.identity?.totalContributions).toBe(0);
    expect(result.identity?.currentStreak).toBe(0);
    expect(result.identity?.repositories).toEqual([]);
  });

  it('returns rate_limited when GitHub API responds 403/429 and contributions fail', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
      if (url.startsWith('https://api.github.com/')) {
        return new Response(JSON.stringify({ message: 'API rate limit exceeded' }), { status: 403 });
      }
      return new Response(JSON.stringify({ success: false, rateLimited: true }), { status: 429 });
    });

    const result = await fetchGitHubPreviewProfile('octocat');
    expect(result.status).toBe('rate_limited');
    expect(result.identity).toBeUndefined();
  });

  it('returns unavailable when GitHub user does not exist (404)', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
      return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    });

    const result = await fetchGitHubPreviewProfile('definitely-no-such-user-xyz');
    expect(result.status).toBe('unavailable');
    expect(result.statusMessage).toContain('not found');
  });
});
