import { describe, it, expect } from 'vitest';
import { buildSyntheticDeveloperIdentity } from './data-engine';
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
} from './svg-generators';

describe('MonoForge 3.0 Signature Visualization SVG Generators', () => {
  const mockIdentity = buildSyntheticDeveloperIdentity('octocat');

  const generators = [
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

  generators.forEach(({ name, fn }) => {
    it(`generates valid, well-formed SVG for ${name}`, () => {
      const svg = fn(mockIdentity, { theme: 'emerald' });
      expect(svg).toBeTruthy();
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it(`strictly adheres to GitHub Camo security invariants for ${name}`, () => {
      const svg = fn(mockIdentity, { theme: 'matrix' });
      // Zero scripts allowed
      expect(svg.toLowerCase()).not.toContain('<script');
      expect(svg.toLowerCase()).not.toContain('javascript:');
      // Zero foreignObject allowed
      expect(svg.toLowerCase()).not.toContain('<foreignobject');
      // No external network fonts
      expect(svg.toLowerCase()).not.toContain('@import');
    });

    it(`supports multiple visual themes for ${name}`, () => {
      const themes = ['emerald', 'matrix', 'cyberpunk', 'tokyonight', 'amber'] as const;
      themes.forEach(t => {
        const svg = fn(mockIdentity, { theme: t });
        expect(svg).toBeTruthy();
        expect(svg.length).toBeGreaterThan(100);
      });
    });
  });
});

