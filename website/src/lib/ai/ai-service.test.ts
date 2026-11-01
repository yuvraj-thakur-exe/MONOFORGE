import { describe, expect, it } from 'vitest';
import { synthesizeFallbackAiResponse } from './ai-service';
import { AiRequestSchema } from './types';

describe('AI Creation Assistant Service', () => {
  it('synthesizes complete README profile from prompt', () => {
    const res = synthesizeFallbackAiResponse(
      'generate-readme',
      'Senior Distributed Systems Engineer'
    );
    expect(res).toBeDefined();
    expect(res.markdown).toContain('# Hey there');
    expect(res.technologies).toContain('TypeScript');
    expect(res.suggestions).toBeDefined();
    expect(res.suggestions?.length).toBeGreaterThan(0);
  });

  it('synthesizes high-impact bio options', () => {
    const res = synthesizeFallbackAiResponse(
      'generate-bio',
      'Staff Engineer at Fintech'
    );
    expect(res.bio).toBeDefined();
    expect(res.headline).toBeDefined();
  });

  it('suggests relevant tech stack for a given role', () => {
    const res = synthesizeFallbackAiResponse(
      'suggest-skills',
      'Full-stack Next.js Developer'
    );
    expect(res.technologies).toContain('Next.js');
    expect(res.technologies).toContain('React');
    expect(res.technologies).toContain('Tailwind CSS');
  });

  it('suggests structured section layout for profile architecture', () => {
    const res = synthesizeFallbackAiResponse('suggest-sections', 'Cloud Native Architect');
    expect(res.suggestions).toBeDefined();
    expect(res.suggestions?.length).toBeGreaterThan(4);
    expect(res.summary).toBeDefined();
  });

  it('generates custom template and explains telemetry metrics', () => {
    const tmpl = synthesizeFallbackAiResponse('generate-template', 'Rust Systems Engineer');
    expect(tmpl.markdown).toContain('# Alex Vance');
    expect(tmpl.technologies).toContain('Rust');

    const telemetry = synthesizeFallbackAiResponse('explain-telemetry', 'Weekly commit activity');
    expect(telemetry.summary).toContain('telemetry');
    expect(telemetry.suggestions?.length).toBeGreaterThan(0);
  });

  it('provides design hierarchy recommendations', () => {
    const design = synthesizeFallbackAiResponse('recommend-design', 'Audit visual contrast');
    expect(design.suggestions?.some(s => s.includes('badge'))).toBe(true);
  });

  it('validates AiRequest schema correctly', () => {
    const valid = AiRequestSchema.safeParse({
      action: 'generate-readme',
      prompt: 'Alex Vance — Quantum Robotics',
    });
    expect(valid.success).toBe(true);

    const invalid = AiRequestSchema.safeParse({
      action: 'non-existent-action',
      prompt: '',
    });
    expect(invalid.success).toBe(false);
  });
});

