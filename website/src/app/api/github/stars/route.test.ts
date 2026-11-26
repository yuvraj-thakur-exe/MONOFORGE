import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET, resetStarsCacheForTests } from './route';

describe('GET /api/github/stars', () => {
  beforeEach(() => {
    resetStarsCacheForTests();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns HTTP 200 with live star count on GitHub success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ stargazers_count: 42 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ stars: 42, source: 'github' });
  });

  it('returns HTTP 200 fallback when GitHub returns 403 rate limit', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'API rate limit exceeded' }), {
        status: 403,
      })
    );

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ stars: null, source: 'fallback' });
  });
});
