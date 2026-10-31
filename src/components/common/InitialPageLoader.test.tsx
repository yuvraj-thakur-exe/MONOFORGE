import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { InitialPageLoader } from './InitialPageLoader';

// Mock sound effects
vi.mock('#/lib/sound/sound-effects', () => ({
  playWelcomeChord: vi.fn(),
  playClickSound: vi.fn(),
}));

describe('InitialPageLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders initial loader when mounted', () => {
    render(<InitialPageLoader />);
    expect(screen.getByRole('status', { name: /Welcome Loading/i })).toBeDefined();
    expect(screen.getByText(/MONOFORGE \/\/ OS/i)).toBeDefined();
    expect(screen.getAllByText(/FAST LAUNCH/i).length).toBeGreaterThanOrEqual(1);
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
});
