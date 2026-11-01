import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

describe('API Route: /api/telemetry/svg', () => {
  it('returns valid SVG for isocalendar plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=isocalendar&user=octocat');
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/svg+xml');
    const text = await res.text();
    expect(text).toContain('<svg');
    expect(text).toContain('@octocat');
    expect(text).toContain('Isometric Contribution Landscape');
  }, 15000);

  it('returns valid SVG for languages plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=languages&user=dev');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Polyglot Language Telemetry');
    expect(text).toContain('@dev');
  });

  it('returns valid SVG for terminal plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=terminal&user=neo');
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
});

