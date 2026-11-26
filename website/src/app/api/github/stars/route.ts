import { NextResponse } from 'next/server';

const REPO_API_URL = 'https://api.github.com/repos/yuvraj-thakur-exe/MONOFORGE';
const CACHE_TTL_MS = 60 * 60 * 1000;

let cachedStars: { value: number; expiresAt: number } | null = null;

export function resetStarsCacheForTests(): void {
  cachedStars = null;
}

/**
 * Cached server-side proxy for MonoForge GitHub star count.
 * Always returns HTTP 200 `{ stars, source }` so rate-limited client browsers
 * never emit 403 console errors.
 */
export async function GET() {
  const now = Date.now();
  if (cachedStars && cachedStars.expiresAt > now) {
    return NextResponse.json(
      { stars: cachedStars.value, source: 'github' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'MonoForge-Stars-Proxy',
  };

  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(REPO_API_URL, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { stars: cachedStars?.value ?? null, source: 'fallback' },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
          },
        }
      );
    }

    const data = (await res.json()) as { stargazers_count?: unknown };
    if (typeof data.stargazers_count === 'number') {
      cachedStars = {
        value: data.stargazers_count,
        expiresAt: now + CACHE_TTL_MS,
      };
      return NextResponse.json(
        { stars: data.stargazers_count, source: 'github' },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    }
  } catch {
    // Fall back cleanly with HTTP 200
  }

  return NextResponse.json(
    { stars: cachedStars?.value ?? null, source: 'fallback' },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    }
  );
}
