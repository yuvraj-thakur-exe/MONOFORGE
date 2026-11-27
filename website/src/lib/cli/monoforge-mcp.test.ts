import { describe, it, expect } from 'vitest';
import {
  ARCHETYPES,
  VISUALIZATION_CATALOG,
  SUPPORTED_THEMES,
  searchRepoAssets,
  inspectRepoAsset,
  buildTelemetryEmbedSnippet,
  buildInteractiveReadme,
  generateProfile,
} from '../../../../bin/monoforge.js';

describe('MonoForge CLI & MCP Helpers (bin/monoforge.js)', () => {
  it('exposes 40 archetypes, supported themes, and live visualization definitions', () => {
    expect(ARCHETYPES.length).toBe(40);
    expect(SUPPORTED_THEMES).toContain('emerald');
    expect(VISUALIZATION_CATALOG.some((v) => v.id === 'diagonal-heatmap')).toBe(true);
    expect(VISUALIZATION_CATALOG.some((v) => v.id === 'whoami')).toBe(true);
  });

  it('searches real SVG assets and 47 social icons inside public/assets', () => {
    const botMatches = searchRepoAssets('bot', 'mascot');
    expect(botMatches.some((a) => a.id === 'roaming-bot')).toBe(true);

    const socialMatches = searchRepoAssets('github', 'social');
    expect(socialMatches.some((a) => a.platform === 'github')).toBe(true);
  });

  it('inspects SVG assets cleanly and enforces path traversal guard', () => {
    const inspected = inspectRepoAsset('roaming-bot');
    expect(inspected.error).toBeUndefined();
    expect(inspected.camoSafe).toBe(true);
    expect(inspected.rawUrl).toContain('/public/assets/roaming-bot.svg');

    const traversal = inspectRepoAsset('../../package.json');
    expect(traversal.error).toContain('Path traversal');
  });

  it('builds telemetry embeds wrapped in interactive Studio deep-links', () => {
    const embed = buildTelemetryEmbedSnippet({
      username: 'yuvraj-thakur-exe',
      plugin: 'diagonal-heatmap',
      theme: 'emerald',
    });
    expect(embed.imgUrl).toContain('plugin=diagonal-heatmap');
    expect(embed.markdown).toContain('<a href="https://monoforge-studio.vercel.app/en/visualizer');
    expect(embed.markdown).toContain('<img src="');
  });

  it('synthesizes interactive READMEs with visuals, buttons, <details>, and Mermaid', () => {
    const md = buildInteractiveReadme({
      username: 'yuvraj-thakur-exe',
      name: 'Yuvraj Thakur',
      role: 'Principal Systems Architect',
      theme: 'emerald',
      mascot: 'bot',
    });
    expect(md).toContain('Yuvraj Thakur');
    expect(md).toContain('roaming-bot.svg');
    expect(md).toContain('digital-hands-divider.svg');
    expect(md).toContain('plugin=diagonal-heatmap');
    expect(md).toContain('plugin=whoami');
    expect(md).toContain('<details>');
    expect(md).toContain('```mermaid');
    expect(md).toContain('Edit_Profile_in_IDE');

    const cliInteractive = generateProfile({ username: 'octocat', interactive: true });
    expect(cliInteractive).toContain('<details>');
  });
});
