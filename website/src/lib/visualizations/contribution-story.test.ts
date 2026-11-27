import { describe, it, expect, vi } from 'vitest';
import {
  prepareStoryCalendar,
  drawStoryGrid,
  drawStorySkyline,
  drawStoryPulse,
  drawStoryRing,
  drawStoryStreak,
  drawStoryTerminal,
  easeBack,
  mixHex,
} from './contribution-story';
import { buildSyntheticDeveloperIdentity } from './data-engine';

function createMockCtx() {
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    roundRect: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 40 })),
    setTransform: vi.fn(),
    fillStyle: '#000',
    strokeStyle: '#000',
    lineWidth: 1,
    globalAlpha: 1,
    font: '',
    textAlign: 'left',
    textBaseline: 'alphabetic',
  } as unknown as CanvasRenderingContext2D;
}

describe('contribution-story engine', () => {
  it('computes streak, best day, and scaling factor to match totalContributions', () => {
    const data = buildSyntheticDeveloperIdentity('tester');
    const boosted = { ...data, totalContributions: data.totalContributions + 150 };
    const cal = prepareStoryCalendar(boosted);

    expect(cal.total).toBe(boosted.totalContributions);
    expect(cal.scale).toBeGreaterThan(1);
    expect(cal.bestDay).not.toBeNull();
    expect(cal.weeklyTotals.length).toBe(cal.weekCount);
  });

  it('easeBack and mixHex return valid bounded outputs', () => {
    expect(easeBack(0)).toBeCloseTo(0, 5);
    expect(easeBack(1)).toBeCloseTo(1, 5);
    expect(mixHex('#000000', '#ffffff', 0.5)).toBe('rgb(128, 128, 128)');
  });

  it('draws all 6 acts cleanly at both t=500 and t=Infinity (reduced-motion)', () => {
    const data = buildSyntheticDeveloperIdentity('octo');
    const draws = [
      drawStoryGrid,
      drawStorySkyline,
      drawStoryPulse,
      drawStoryRing,
      drawStoryStreak,
      drawStoryTerminal,
    ];

    for (const drawFn of draws) {
      const ctxMid = createMockCtx();
      drawFn(ctxMid, 640, 240, 500, data, { darkMode: true });
      expect((ctxMid.fillRect as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(0);

      const ctxEnd = createMockCtx();
      drawFn(ctxEnd, 640, 240, Infinity, data, { darkMode: false });
      expect((ctxEnd.fillRect as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(0);
    }
  });
});
