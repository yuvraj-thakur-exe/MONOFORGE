import { NextRequest, NextResponse } from 'next/server';
import { fetchUserContributions } from '#/lib/github/contributions';
import {
  assembleDeveloperIdentity,
  buildSyntheticDeveloperIdentity,
  fetchPublicGitHubAccount,
  isValidGitHubUsername,
} from '#/lib/visualizations/data-engine';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUser = searchParams.get('user') ?? searchParams.get('username');
  const mode = searchParams.get('mode');
  const username = rawUser === null ? 'octocat' : rawUser.trim();

  if (!isValidGitHubUsername(username)) {
    return NextResponse.json(
      {
        success: false,
        source: 'unavailable',
        error: 'Invalid GitHub username format',
      },
      { status: 400 }
    );
  }

  if (mode === 'sample') {
    return NextResponse.json(
      {
        success: true,
        data: buildSyntheticDeveloperIdentity(username),
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=900, stale-while-revalidate=86400',
        },
      }
    );
  }

  try {
    const [contribOutcome, accountOutcome] = await Promise.allSettled([
      fetchUserContributions(username),
      fetchPublicGitHubAccount(username, { timeoutMs: 4500 }),
    ]);

    const contribStats =
      contribOutcome.status === 'fulfilled'
        ? (contribOutcome.value as unknown as Record<string, unknown>)
        : null;

    const accountResult =
      accountOutcome.status === 'fulfilled'
        ? accountOutcome.value
        : {
            ok: false,
            username,
            error: 'GitHub user lookup failed',
          };

    const identity = assembleDeveloperIdentity(username, contribStats, accountResult);

    if (identity.source === 'unavailable') {
      const status = identity.notFound ? 404 : identity.rateLimited ? 429 : 503;
      return NextResponse.json(
        {
          success: false,
          source: 'unavailable',
          notFound: Boolean(identity.notFound),
          rateLimited: Boolean(identity.rateLimited),
          error: identity.error || 'Failed to fetch contributor activity',
        },
        {
          status,
          headers: {
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: identity,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=900, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        source: 'unavailable',
        error: error instanceof Error ? error.message : 'Failed to fetch contributor activity',
      },
      { status: 500 }
    );
  }
}
