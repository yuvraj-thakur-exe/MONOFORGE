import { describe, it, expect } from 'vitest';
import { REUSABLE_BLOCKS, getReusableBlockByType } from './reusable-blocks';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { ReadmeConfig } from '#/lib/plugins/types';

describe('Reusable Profile Blocks Engine', () => {
  it('defines all 11 standard reusable blocks requested in specification', () => {
    const types = REUSABLE_BLOCKS.map(b => b.type);
    expect(types).toContain('header');
    expect(types).toContain('bio');
    expect(types).toContain('socials');
    expect(types).toContain('skills');
    expect(types).toContain('tech-icons');
    expect(types).toContain('projects');
    expect(types).toContain('statistics');
    expect(types).toContain('contributions');
    expect(types).toContain('achievements');
    expect(types).toContain('custom-html');
    expect(types).toContain('footer');
    expect(REUSABLE_BLOCKS.length).toBe(11);
  });

  it('generates valid SectionConfig objects compatible with useReadmeStore and buildMarkdown', () => {
    const userCtx = { github: 'devlead', name: 'Dev Lead', role: 'Principal Architect' };

    for (const block of REUSABLE_BLOCKS) {
      const section = block.createSection(userCtx);
      expect(section.id).toBeDefined();
      expect(section.type).toBe(block.pluginId);
      expect(section.visible).toBe(true);

      const testConfig: ReadmeConfig = {
        version: '1.0.0',
        title: 'Test Profile',
        settings: {
          user: { github: 'devlead', name: 'Dev Lead' },
          theme: 'dark',
          accentColor: '#ffe600',
          badgeStyle: 'for-the-badge',
          align: 'left',
        },
        sections: [section],
      };

      const md = buildMarkdown(testConfig);
      expect(typeof md).toBe('string');
      expect(md.length).toBeGreaterThan(0);
    }
  });

  it('retrieves reusable block definition by type', () => {
    const block = getReusableBlockByType('projects');
    expect(block).toBeDefined();
    expect(block?.name).toContain('Projects');

    const notFound = getReusableBlockByType('non-existent' as any);
    expect(notFound).toBeUndefined();
  });
});
