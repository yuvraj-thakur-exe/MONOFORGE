import { describe, it, expect, vi, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import * as contributionsModule from '#/lib/github/contributions';
import * as dataEngineModule from '#/lib/visualizations/data-engine';

describe('API Route: /api/telemetry/svg', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns valid SVG for isocalendar plugin with honest SAMPLE DATA label for octocat', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=isocalendar&user=octocat');
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/svg+xml');
    const text = await res.text();
    expect(text).toContain('<svg');
    expect(text).toContain('@octocat');
    expect(text).toContain('Isometric Contribution Landscape');
    expect(text).toContain('SAMPLE DATA');
  }, 15000);

  it('returns valid SVG for languages plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=languages&user=dev&mode=sample');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Polyglot Language Telemetry');
    expect(text).toContain('@dev');
    expect(text).toContain('SAMPLE DATA');
  });

  it('returns valid SVG for terminal plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=terminal&user=neo&mode=sample');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('monoforge@neo');
  });

  it('returns valid SVG for real contribution heatmap plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=heatmap&user=shadcn');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Annual Contribution Activity Heatmap');
    expect(text).toContain('@shadcn');
  }, 15000);

  it('returns valid SVG for contributor velocity momentum plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=velocity&user=torvalds');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Contributor Velocity &amp; Momentum Radar');
    expect(text).toContain('@torvalds');
  }, 15000);

  it('returns valid SVG for commitcity signature visualization', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=commitcity&user=octocat&theme=emerald');
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/svg+xml');
    const text = await res.text();
    expect(text).toContain('COMMIT CITY // 3D ISOMETRIC DISTRICTS');
    expect(text).toContain('octocat');
    expect(text).toContain('SAMPLE DATA');
  });

  it('returns valid SVG for river, pulse, and galaxy signature visualizations', async () => {
    const reqRiver = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=river&user=octocat');
    const resRiver = await GET(reqRiver);
    expect(await resRiver.text()).toContain('COMMIT RIVER');

    const reqPulse = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=pulse&user=octocat');
    const resPulse = await GET(reqPulse);
    expect(await resPulse.text()).toContain('CODING PULSE');

    const reqGalaxy = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=galaxy&user=octocat');
    const resGalaxy = await GET(reqGalaxy);
    expect(await resGalaxy.text()).toContain('REPOSITORY GALAXY');
  });

  it('strictly omits <script> and <foreignObject> across signature visualizations', async () => {
    const plugins = ['commitcity', 'river', 'yearclock', 'pulse', 'dna', 'radar', 'blueprint', 'languageriver', 'timeline', 'solarsystem', 'synthwave', 'neofetch'];
    for (const plugin of plugins) {
      const req = new NextRequest(`http://localhost:3000/api/telemetry/svg?plugin=${plugin}&user=octocat`);
      const res = await GET(req);
      expect(res.status).toBe(200);
      const svg = await res.text();
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.toLowerCase()).not.toContain('<script');
      expect(svg.toLowerCase()).not.toContain('<foreignobject');
      expect(svg.toLowerCase()).not.toContain('javascript:');
    }
  });

  it('returns HTTP 400 for invalid GitHub usernames, unknown plugins, and invalid themes', async () => {
    const badUserReq = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=commitcity&user=<script>alert(1)</script>');
    expect((await GET(badUserReq)).status).toBe(400);

    const longUserReq = new NextRequest(`http://localhost:3000/api/telemetry/svg?plugin=commitcity&user=${'a'.repeat(40)}`);
    expect((await GET(longUserReq)).status).toBe(400);

    const badVizReq = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=not-a-valid-viz&user=octocat');
    expect((await GET(badVizReq)).status).toBe(400);

    const badThemeReq = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=commitcity&user=octocat&theme=nonexistent');
    expect((await GET(badThemeReq)).status).toBe(400);
  });

  it('XML-escapes malicious query params (track, artist, url) without executing scripts', async () => {
    const reqMusic = new NextRequest(
      'http://localhost:3000/api/telemetry/svg?plugin=music&track=%3Cscript%3Ealert(1)%3C/script%3E&artist=A%26B%22C'
    );
    const resMusic = await GET(reqMusic);
    expect(resMusic.status).toBe(200);
    const svgMusic = await resMusic.text();
    expect(svgMusic.toLowerCase()).not.toContain('<script');
    expect(svgMusic).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(svgMusic).toContain('A&amp;B&quot;C');

    const reqSpeed = new NextRequest(
      'http://localhost:3000/api/telemetry/svg?plugin=pagespeed&url=%3Cimg%20onerror%3Dalert(1)%3E'
    );
    const resSpeed = await GET(reqSpeed);
    expect(resSpeed.status).toBe(200);
    const svgSpeed = await resSpeed.text();
    expect(svgSpeed).not.toContain('<img');
    expect(svgSpeed).toContain('&lt;img onerror=alert(1)&gt;');
  });

  it('routes 3.0 visualizations through the shared normalized GitHub pipeline and preserves zero commits', async () => {
    const mockDays = [
      { date: '2026-01-01', count: 0, level: 0 as const },
      { date: '2026-01-02', count: 0, level: 0 as const },
    ];
    vi.spyOn(contributionsModule, 'fetchUserContributions').mockResolvedValue({
      username: 'zero-contrib-user',
      totalContributions: 0,
      currentStreak: 0,
      maxStreak: 0,
      dailyAverage: 0,
      highestDay: 0,
      weeks: [{ days: mockDays }],
      days: mockDays,
      isRealData: true,
    });
    vi.spyOn(dataEngineModule, 'fetchPublicGitHubAccount').mockResolvedValue({
      ok: true,
      username: 'zero-contrib-user',
      displayName: 'Zero User',
      bio: '',
      location: '',
      repositories: [],
      languages: [],
      skills: [],
    });

    const reqCity = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=commitcity&user=zero-contrib-user&theme=emerald');
    const resCity = await GET(reqCity);
    expect(resCity.status).toBe(200);
    const citySvg = await resCity.text();
    expect(citySvg).toContain('0 COMMITS');
    expect(citySvg).toContain('0D STREAK');
    expect(citySvg).toContain('LIVE GITHUB');

    const reqDna = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=dna&user=zero-contrib-user');
    const resDna = await GET(reqDna);
    expect(resDna.status).toBe(200);
    const dnaSvg = await resDna.text();
    expect(dnaSvg).toContain('0 VERIFIED LANGUAGES');
  });

  it('labels SVG DATA UNAVAILABLE when GitHub data fails or is rate-limited', async () => {
    vi.spyOn(contributionsModule, 'fetchUserContributions').mockResolvedValue({
      username: 'offline-user',
      totalContributions: 999,
      currentStreak: 42,
      maxStreak: 100,
      dailyAverage: 5,
      highestDay: 20,
      weeks: [],
      days: [],
      isRealData: false,
    });
    vi.spyOn(dataEngineModule, 'fetchPublicGitHubAccount').mockResolvedValue({
      ok: false,
      username: 'offline-user',
      rateLimited: true,
      error: 'GitHub API rate limit exceeded',
    });

    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=commitcity&user=offline-user');
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe('no-store');
    const svg = await res.text();
    expect(svg).toContain('DATA UNAVAILABLE');
    expect(svg).toContain('0 COMMITS');
    expect(svg).not.toContain('999 COMMITS');
  });

  it('serves all 30 registered visualizations with distinct, Camo-safe SVGs and provenance labels', async () => {
    const svgs: string[] = [];

    for (const id of ALL_VISUALIZATION_IDS) {
      const req = new NextRequest(
        `http://localhost:3000/api/telemetry/svg?plugin=${id}&user=octocat&theme=emerald`
      );
      const res = await GET(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toContain('image/svg+xml');

      const svg = await res.text();
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
      expect(svg).toContain('preserveAspectRatio="xMidYMid meet"');
      expect(svg).toContain('SAMPLE DATA');
      expect(svg.toLowerCase()).not.toContain('<script');
      expect(svg.toLowerCase()).not.toContain('<foreignobject');
      expect(svg.toLowerCase()).not.toContain('javascript:');
      svgs.push(svg);
    }

    expect(new Set(svgs).size).toBe(ALL_VISUALIZATION_IDS.length);
  });
});
