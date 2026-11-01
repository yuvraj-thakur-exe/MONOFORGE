import { describe, it, expect } from 'vitest';
import { TEMPLATES } from './catalog';
import { PRESETS_120 } from './catalog-120';

describe('MonoForge Comprehensive Template Library (120+ Presets)', () => {
  it('contains at least 120 presets in PRESETS_120', () => {
    expect(PRESETS_120.length).toBeGreaterThanOrEqual(120);
  });

  it('guarantees unique IDs across the entire catalog', () => {
    const ids = new Set<string>();
    for (const t of TEMPLATES) {
      expect(ids.has(t.id)).toBe(false);
      ids.add(t.id);
    }
  });

  it('verifies all 12 required categories have at least 10 presets', () => {
    const requiredCategories = [
      'Minimal Professional',
      'Editorial & Typography',
      'Terminal & ASCII',
      'Neon & Cyberpunk',
      'Data Dashboard',
      '3D & Isometric',
      'Illustrated & Mascot',
      'Creative & Anime-Inspired',
      'Student & Learning Journey',
      'Open-Source Maintainer',
      'AI, ML & Data Science',
      'Full-Stack Developer Portfolio',
    ];

    const categoryCounts: Record<string, number> = {};
    for (const t of TEMPLATES) {
      categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    }

    for (const cat of requiredCategories) {
      expect(categoryCounts[cat], `Category "${cat}" should have at least 10 presets`).toBeGreaterThanOrEqual(10);
    }
  });

  it('verifies reference image design archetypes are present and sanitized', () => {
    // 1. Mountain Nature Coder (Reference Image 1)
    const mountain = TEMPLATES.find(t => t.id === 'illus-01');
    expect(mountain).toBeDefined();
    expect(mountain?.name).toBe('Mountain Nature Coder');
    expect(mountain?.config.settings.user.name).not.toContain('Rahul');

    // 2. Neon Purple Confetti Owl (Reference Image 2)
    const owl = TEMPLATES.find(t => t.id === 'neon-02');
    expect(owl).toBeDefined();
    expect(owl?.name).toBe('Neon Purple Confetti Owl');
    expect(owl?.config.settings.user.name).not.toContain('Kiran');

    // 3. Anime Gaming Connector (Reference Image 3)
    const anime = TEMPLATES.find(t => t.id === 'anime-01');
    expect(anime).toBeDefined();
    expect(anime?.name).toBe('Anime Gaming Connector');
    expect(anime?.config.settings.user.name).not.toContain('Piyush');

    // 4. Superhero GenAI Architect (Reference Image 4)
    const genai = TEMPLATES.find(t => t.id === 'aiml-01');
    expect(genai).toBeDefined();
    expect(genai?.name).toBe('Superhero GenAI Architect');
    expect(genai?.config.settings.user.name).not.toContain('Arvind');

    // 5. Editorial Community Lead (Reference Image 5)
    const editorial = TEMPLATES.find(t => t.id === 'edit-02');
    expect(editorial).toBeDefined();
    expect(editorial?.name).toBe('Editorial Community Lead');
    expect(editorial?.config.settings.user.name).not.toContain('Monica');
  });

  it('validates configuration integrity of every template preset', () => {
    for (const t of TEMPLATES) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.accent).toMatch(/^#[0-9a-fA-F]{3,8}$/);
      expect(t.config).toBeDefined();
      expect(t.config.version).toBe('1.0.0');
      expect(t.config.settings).toBeDefined();
      expect(t.config.settings.user).toBeDefined();
      expect(t.config.settings.user.github).toBeTruthy();
      expect(Array.isArray(t.config.sections)).toBe(true);
    }
  });
});
