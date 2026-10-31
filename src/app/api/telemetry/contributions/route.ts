import { NextRequest, NextResponse } from 'next/server';
import { fetchUserContributions } from '#/lib/github/contributions';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('user') || searchParams.get('username') || 'octocat';

  try {
    const stats = await fetchUserContributions(username);

    return NextResponse.json(
      {
        success: true,
        data: stats,
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
        error: error instanceof Error ? error.message : 'Failed to fetch contributor activity',
      },
      { status: 500 }
    );
  }
}
