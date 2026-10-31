import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { InitialPageLoader, replayWelcomeLoader } from './InitialPageLoader';

// Mock sound effects
vi.mock('#/lib/sound/sound-effects', () => ({
  playWelcomeChord: vi.fn(),
  playClickSound: vi.fn(),
  playTone: vi.fn(),
}));

describe('InitialPageLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders initial loader when mounted with content-themed compilation', () => {
    render(<InitialPageLoader />);
    expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/MONOFORGE \/\/ PROFILE FORGE KERNEL/i)).toBeDefined();
    expect(screen.getAllByText(/FAST LAUNCH/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/CAMO CDN: 100%/i).length).toBeGreaterThanOrEqual(1);
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

  it('re-triggers loader when replayWelcomeLoader is invoked', () => {
    render(<InitialPageLoader />);
    act(() => {
      replayWelcomeLoader();
    });
    expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1);
  });
});
