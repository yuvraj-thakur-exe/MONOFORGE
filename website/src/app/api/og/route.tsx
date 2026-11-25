import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Forge a GitHub profile that gets noticed.';
    const rawUser = searchParams.get('user') || searchParams.get('username') || 'monoforge';
    const username = rawUser.replace(/^@/, '').slice(0, 39);
    const archetype = searchParams.get('archetype');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0f172a',
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.22), transparent 55%), radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.16), transparent 55%)',
            fontFamily: 'sans-serif',
            padding: '52px 64px',
            color: '#f8fafc',
            border: '8px solid #1e293b',
          }}
        >
          {/* Top Brand + Archetype / Handle Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#f59e0b',
                  border: '2px solid #ffe600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
                  <polyline points="8 11 12 15 16 11" />
                  <line x1="12" y1="7" x2="12" y2="15" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: 900,
                    letterSpacing: '-0.5px',
                    color: '#f8fafc',
                  }}
                >
                  MONOFORGE
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#f59e0b',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                  }}
                >
                  GITHUB PROFILE STUDIO
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {archetype ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#1e293b',
                    border: '2px solid #f59e0b',
                    color: '#ffe600',
                    fontSize: '18px',
                    fontWeight: 800,
                  }}
                >
                  Archetype: {archetype}
                </div>
              ) : null}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  backgroundColor: '#1e293b',
                  border: '2px solid #334155',
                  color: '#10b981',
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                @{username}
              </div>
            </div>
          </div>

          {/* Main Card Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              backgroundColor: '#1e293b',
              border: '2px solid #334155',
              borderRadius: '20px',
              padding: '40px 44px',
            }}
          >
            <div
              style={{
                fontSize: '46px',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#f8fafc',
                letterSpacing: '-0.5px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '21px',
                color: '#cbd5e1',
                fontWeight: 500,
              }}
            >
              350+ Curated Archetypes · 30+ SVG Visualizations · 22 Modular Plugins · 47 Verified Icons
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '18px',
              color: '#94a3b8',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#10b981' }}>100% Camo-Safe 60fps Vector SVGs</span>
            <span>github.com/yuvraj-thakur-exe/MONOFORGE</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
