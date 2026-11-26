import { describe, it, expect } from 'vitest';
import { buildSyntheticDeveloperIdentity } from './data-engine';
import {
  ALL_VISUALIZATION_IDS,
  FEATURED_VISUALIZATION_IDS,
  VISUALIZATION_REGISTRY,
} from './registry';
import { VISUALIZATION_THEMES } from './themes';
import {
  generateCommitCitySvg,
  generateCommitRiverSvg,
  generateYearClockSvg,
  generateCodingPulseSvg,
  generateDeveloperTerminalSvg,
  generateContributionSnakeSvg,
  generateRepositoryGalaxySvg,
  generateDeveloperDnaSvg,
  generateSkillConstellationSvg,
  generateEngineeringRadarSvg,
  generateCodebaseBlueprintSvg,
  generateLanguageRiverSvg,
  generateReleaseTimelineSvg,
  generateTechStackSolarSystemSvg,
  generateSynthwaveBentoSvg,
  generateNeofetchTerminalSvg,
  generateUniversalVisualizationSvg,
} from './svg-generators';

describe('MonoForge 3.0 Signature Visualization SVG Generators', () => {
  const mockIdentity = buildSyntheticDeveloperIdentity('octocat');

  const namedGenerators = [
    { name: 'Commit City', fn: generateCommitCitySvg },
    { name: 'Commit River', fn: generateCommitRiverSvg },
    { name: 'Developer Year Clock', fn: generateYearClockSvg },
    { name: 'Coding Pulse', fn: generateCodingPulseSvg },
    { name: 'Developer Terminal', fn: generateDeveloperTerminalSvg },
    { name: 'Contribution Snake', fn: generateContributionSnakeSvg },
    { name: 'Repository Galaxy', fn: generateRepositoryGalaxySvg },
    { name: 'Developer DNA', fn: generateDeveloperDnaSvg },
    { name: 'Skill Constellation', fn: generateSkillConstellationSvg },
    { name: 'Engineering Radar', fn: generateEngineeringRadarSvg },
    { name: 'Codebase Blueprint', fn: generateCodebaseBlueprintSvg },
    { name: 'Language River', fn: generateLanguageRiverSvg },
    { name: 'Release Timeline', fn: generateReleaseTimelineSvg },
    { name: 'Tech Stack Solar System', fn: generateTechStackSolarSystemSvg },
    { name: 'Synthwave Bento', fn: generateSynthwaveBentoSvg },
    { name: 'Neofetch Terminal', fn: generateNeofetchTerminalSvg },
  ];

  namedGenerators.forEach(({ name, fn }) => {
    it(`generates valid, Camo-safe SVG for ${name}`, () => {
      const svg = fn(mockIdentity, { theme: 'emerald' });
      expect(svg).toBeTruthy();
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain('preserveAspectRatio="xMidYMid meet"');
      expect(svg.toLowerCase()).not.toContain('<script');
      expect(svg.toLowerCase()).not.toContain('javascript:');
      expect(svg.toLowerCase()).not.toContain('<foreignobject');
      expect(svg.toLowerCase()).not.toContain('@import');
    });
  });

  it('registers all 30 visualizations with featured flags and dataDependencies', () => {
    expect(ALL_VISUALIZATION_IDS).toHaveLength(30);
    expect(FEATURED_VISUALIZATION_IDS.length).toBeGreaterThan(0);
    expect(FEATURED_VISUALIZATION_IDS.length).toBeLessThan(ALL_VISUALIZATION_IDS.length);

    for (const id of ALL_VISUALIZATION_IDS) {
      const entry = VISUALIZATION_REGISTRY[id];
      expect(entry.id).toBe(id);
      expect(typeof entry.featured).toBe('boolean');
      expect(entry.dataDependencies.length).toBeGreaterThan(0);
    }
  });

  it('generates 30 distinct, Camo-safe SVGs with zero silent fallbacks', () => {
    const outputs = ALL_VISUALIZATION_IDS.map((id) =>
      generateUniversalVisualizationSvg(id, mockIdentity, { theme: 'emerald' })
    );

    outputs.forEach((svg) => {
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain('preserveAspectRatio="xMidYMid meet"');
      expect(svg.toLowerCase()).not.toContain('<script');
      expect(svg.toLowerCase()).not.toContain('javascript:');
      expect(svg.toLowerCase()).not.toContain('<foreignobject');
      expect(svg.toLowerCase()).not.toContain('@import');
    });

    // Every single one of the 30 visualizations must produce a unique SVG
    expect(new Set(outputs).size).toBe(30);
  });

  it('supports all 7 themes without harsh #000000 backgrounds', () => {
    const themeKeys = Object.keys(VISUALIZATION_THEMES) as Array<keyof typeof VISUALIZATION_THEMES>;
    expect(themeKeys.length).toBe(7);

    themeKeys.forEach((t) => {
      expect(VISUALIZATION_THEMES[t].bg.toLowerCase()).not.toBe('#000000');
      const svg = generateUniversalVisualizationSvg('commit-city', mockIdentity, { theme: t });
      expect(svg.length).toBeGreaterThan(200);
    });
  });

  it('handles empty repositories, languages, and skills without throwing', () => {
    const emptyIdentity = {
      ...mockIdentity,
      repositories: [],
      languages: [],
      skills: [],
      totalContributions: 0,
      currentStreak: 0,
      maxStreak: 0,
    };

    for (const id of ALL_VISUALIZATION_IDS) {
      const svg = generateUniversalVisualizationSvg(id, emptyIdentity, { theme: 'slate' });
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
    }
  });
});
