import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { InitialPageLoader } from './InitialPageLoader';

describe('InitialPageLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders signature branded loading experience', () => {
    render(<InitialPageLoader />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText('Forge a GitHub profile that gets noticed.')).toBeDefined();
    expect(screen.getByText(/Initializing MonoForge/i)).toBeDefined();
  });

  it('allows fast launching via Escape key press', () => {
    render(<InitialPageLoader />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(sessionStorage.getItem('monoforge_startup_viewed')).toBe('true');
  });

  it('allows fast launching via skip button', () => {
    render(<InitialPageLoader />);
    const skipBtn = screen.getByRole('button', { name: /skip startup splash/i });
    expect(skipBtn).toBeDefined();

    act(() => {
      fireEvent.click(skipBtn);
    });
    expect(sessionStorage.getItem('monoforge_startup_viewed')).toBe('true');
  });
});
