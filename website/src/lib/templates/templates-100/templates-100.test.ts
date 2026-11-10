import { describe, it, expect } from 'vitest';
import { TEMPLATES_100 } from './index';

describe('100 GitHub Profile Templates System', () => {
  it('should have exactly 100 registered templates', () => {
    expect(TEMPLATES_100.length).toBe(100);
  });

  it('should have unique IDs and consecutive numbers from 1 to 100', () => {
    const ids = new Set<string>();
    const numbers = new Set<number>();

    for (const tpl of TEMPLATES_100) {
      expect(ids.has(tpl.id)).toBe(false);
      ids.add(tpl.id);

      expect(numbers.has(tpl.number)).toBe(false);
      numbers.add(tpl.number);

      expect(tpl.number).toBeGreaterThanOrEqual(1);
      expect(tpl.number).toBeLessThanOrEqual(100);
    }

    expect(ids.size).toBe(100);
    expect(numbers.size).toBe(100);
  });

  it('should have valid metadata, palettes, and descriptions for every template', () => {
    for (const tpl of TEMPLATES_100) {
      expect(tpl.name).toBeTruthy();
      expect(tpl.description).toBeTruthy();
      expect(tpl.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(tpl.category).toBeTruthy();
      expect(tpl.categoryGroup).toBeTruthy();
      expect(tpl.tags.length).toBeGreaterThan(0);
      expect(tpl.config).toBeDefined();
      expect(tpl.config.settings.user.name).toBeTruthy();
      expect(tpl.config.sections.length).toBeGreaterThan(0);
    }
  });

  it('should have exactly 10 categories with 10 templates each', () => {
    const categoryCounts: Record<string, number> = {};
    for (const tpl of TEMPLATES_100) {
      categoryCounts[tpl.categoryGroup] = (categoryCounts[tpl.categoryGroup] || 0) + 1;
    }

    expect(Object.keys(categoryCounts).length).toBe(10);
    for (const cat of Object.keys(categoryCounts)) {
      expect(categoryCounts[cat]).toBe(10);
    }
  });

  it('should have exactly 130 templates in ALL_130_TEMPLATES with rich master dashboard prompts', async () => {
    const { ALL_130_TEMPLATES } = await import('../catalog');
    expect(ALL_130_TEMPLATES.length).toBe(130);

    const ids = new Set<string>();
    for (const t of ALL_130_TEMPLATES) {
      expect(ids.has(t.id), `Duplicate ID in ALL_130_TEMPLATES: ${t.id}`).toBe(false);
      ids.add(t.id);

      expect(t.prompt).toBeDefined();
      expect(t.prompt.length).toBeGreaterThanOrEqual(300);
      expect(t.prompt).toContain('Master Profile Dashboard');
      expect(t.prompt).toContain('Section A');
      expect(t.prompt).toContain('GitHub Camo');
    }
    expect(ids.size).toBe(130);
  });
});
