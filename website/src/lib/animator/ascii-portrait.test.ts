import { describe, it, expect } from 'vitest';
import {
  buildSamplePortraitGrid,
  buildSelfHostedKitFiles,
  generateAsciiPortraitSvg,
  imageDataToAsciiGrid,
} from './ascii-portrait';
import {
  generateDiagonalHeatmapSvg,
  generateWhoamiCardSvg,
} from '#/lib/visualizations/svg-generators';
import { buildSyntheticDeveloperIdentity } from '#/lib/visualizations/data-engine';

describe('ascii-portrait and terminal profile SVG generators', () => {
  it('converts RGBA image buffer into a monochrome ASCII grid', () => {
    const w = 16;
    const h = 16;
    const rgba = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const val = x < 8 ? 20 : 250;
        rgba[idx] = val;
        rgba[idx + 1] = val;
        rgba[idx + 2] = val;
        rgba[idx + 3] = 255;
      }
    }
    const grid = imageDataToAsciiGrid(rgba, w, h, { cols: 24, rows: 12 });
    expect(grid).toHaveLength(12);
    expect(grid[0]).toHaveLength(24);
    expect(grid[0].slice(0, 6).trim().length).toBeGreaterThan(0);
    expect(grid[0].slice(-4).trim()).toBe('');
  });

  it('generates Camo-safe ASCII portrait SVG without <script> or <foreignObject>', () => {
    const grid = buildSamplePortraitGrid(48, 24);
    const svg = generateAsciiPortraitSvg(grid, { label: 'dev@github ~ $ whoami' });
    expect(svg).toContain('<svg');
    expect(svg).toContain('preserveAspectRatio="xMidYMid meet"');
    expect(svg).toContain('rowWipe');
    expect(svg).not.toContain('<script');
    expect(svg).not.toContain('<foreignObject');
  });

  it('generates Camo-safe diagonal heatmap and whoami card SVGs', () => {
    const data = buildSyntheticDeveloperIdentity('tester');
    const heatmap = generateDiagonalHeatmapSvg(data, { theme: 'emerald' });
    const whoami = generateWhoamiCardSvg(data, {
      theme: 'emerald',
      nowText: 'Shipping MonoForge',
      stackText: 'TypeScript · Rust',
    });

    expect(heatmap).toContain('diagSlide');
    expect(heatmap).toContain('contributions in the last year');
    expect(heatmap).not.toContain('<script');

    expect(whoami).toContain('tester@github ~ $ whoami');
    expect(whoami).toContain('Shipping MonoForge');
    expect(whoami).not.toContain('<script');
  });

  it('builds self-hosted fetch-github.mjs and GitHub Action workflow YAML', () => {
    const { fetchScript, workflowYml } = buildSelfHostedKitFiles('monodev');
    expect(fetchScript).toContain('https://api.github.com/graphql');
    expect(fetchScript).toContain('monodev');
    expect(workflowYml).toContain('cron: "17 6 * * *"');
    expect(workflowYml).toContain('plugin=diagonal-heatmap&user=monodev');
  });
});
