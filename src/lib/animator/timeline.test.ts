import { describe, expect, it } from 'vitest';
import {
  PRESET_TIMELINE_SCENES,
  createDefaultTimelineProject,
  generateTimelineSvg,
  validateTimelineProject,
} from './timeline';

describe('Animation Timeline Engine', () => {
  it('creates a valid default timeline project', () => {
    const project = createDefaultTimelineProject();
    expect(project).toBeDefined();
    expect(project.width).toBe(800);
    expect(project.height).toBe(220);
    expect(project.layers.length).toBeGreaterThan(0);
    expect(project.motionCurve).toBe('ease-in-out');

    const validation = validateTimelineProject(project);
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  it('generates valid Camo-compliant SVG with CSS keyframes', () => {
    const project = createDefaultTimelineProject('Test Suite Cyber');
    const svg = generateTimelineSvg(project);

    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0 800 220"');
    expect(svg).toContain('preserveAspectRatio="xMidYMid meet"');
    expect(svg).toContain('@keyframes');
    expect(svg).toContain('prefers-reduced-motion');
    // Invariants: 0 script, 0 foreignObject
    expect(svg).not.toContain('<script');
    expect(svg).not.toContain('<foreignObject');
    expect(svg).not.toContain('javascript:');
  });

  it('rejects unsafe elements in timeline layers (Camo enforcement)', () => {
    const project = createDefaultTimelineProject();
    project.layers.push({
      id: 'bad_layer',
      name: 'Malicious Layer',
      type: 'custom-svg',
      visible: true,
      locked: false,
      opacity: 1,
      keyframes: [],
      svgContent: '<script>alert("hack")</script>',
    });

    const validation = validateTimelineProject(project);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((err) => err.includes('<script>'))).toBe(true);

    expect(() => generateTimelineSvg(project)).toThrow();
  });

  it('validates all built-in preset timeline scenes', () => {
    for (const preset of PRESET_TIMELINE_SCENES) {
      const validation = validateTimelineProject(preset);
      expect(validation.valid).toBe(true);

      const svg = generateTimelineSvg(preset);
      expect(svg).toContain('<svg');
      expect(svg).not.toContain('<script');
    }
  });
});
