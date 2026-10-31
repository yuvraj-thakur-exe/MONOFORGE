import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { InitialPageLoader } from './InitialPageLoader';

// Mock sound effects
vi.mock('#/lib/sound/sound-effects', () => ({
  playWelcomeChord: vi.fn(),
  playClickSound: vi.fn(),
  playTone: vi.fn(),
  isSoundEnabled: () => true,
  setSoundEnabled: vi.fn(),
}));

describe('InitialPageLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders interactive 20-second loader with web capabilities', () => {
    render(<InitialPageLoader />);
    expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/MONOFORGE/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/FAST LAUNCH/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/100% GitHub Camo CDN Safe/i)).toBeDefined();

    // Verify 20s loading bar and timing indicators
    expect(screen.getByText(/00:20s/i)).toBeDefined();

    // Verify web capabilities are visible
    expect(screen.getByText(/18\+ Visual Archetypes/i)).toBeDefined();
    expect(screen.getByText(/60fps Camo Vectors/i)).toBeDefined();
    expect(screen.getByText(/47\+ Telemetry Cards/i)).toBeDefined();
    expect(screen.getByText(/Monaco AST IDE/i)).toBeDefined();
  });

  it('allows interactive theme accent color switching', () => {
    render(<InitialPageLoader />);

    const violetBtn = screen.getAllByText(/Cyber Violet/i)[0];
    expect(violetBtn).toBeDefined();

    act(() => {
      fireEvent.click(violetBtn);
    });

    expect(violetBtn.closest('button')?.className).toContain('scale-105');
  });

  it('allows switching geometric loader shape', () => {
    render(<InitialPageLoader />);

    const circleBtn = screen.getAllByRole('button', { name: /^circle$/i })[0];
    expect(circleBtn).toBeDefined();

    act(() => {
      fireEvent.click(circleBtn);
    });

    expect(circleBtn.className).toContain('bg-neutral-900');
  });

  it('allows fast launching via skip button', () => {
    render(<InitialPageLoader />);
    const buttons = screen.getAllByRole('button');
    const skipBtn = buttons.find((btn) => btn.textContent?.includes('FAST LAUNCH'));
    expect(skipBtn).toBeDefined();

    act(() => {
      if (skipBtn) fireEvent.click(skipBtn);
    });
    expect(sessionStorage.getItem('monoforge_loaded')).toBe('true');
  });

  it('allows fast launching via Escape key press', () => {
    render(<InitialPageLoader />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(sessionStorage.getItem('monoforge_loaded')).toBe('true');
  });
});
