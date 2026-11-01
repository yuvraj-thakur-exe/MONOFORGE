import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { RouteLoadingIndicator } from './RouteLoadingIndicator';

// Mock next/navigation usePathname
const mockPathname = vi.fn(() => '/');
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('RouteLoadingIndicator (Separate Page Loading Animation)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    cleanup();
  });

  it('renders page transition badge and laser line on route change', () => {
    mockPathname.mockReturnValue('/wizard');
    const { rerender } = render(<RouteLoadingIndicator />);

    // Initially loading state is active
    expect(screen.getByText('PAGE LOADING')).toBeDefined();
    expect(screen.getByText('100% CAMO')).toBeDefined();

    // Advance timers through progress increments (100ms, 250ms, 400ms + 200ms)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Still visible before completion
    expect(screen.queryByText('PAGE LOADING')).not.toBeNull();

    // Complete transition
    act(() => {
      vi.advanceTimersByTime(350);
    });

    // Cleaned up after navigation completes
    expect(screen.queryByText('PAGE LOADING')).toBeNull();

    // Trigger another route change
    mockPathname.mockReturnValue('/templates');
    rerender(<RouteLoadingIndicator />);
    expect(screen.getByText('PAGE LOADING')).toBeDefined();
  });
});

