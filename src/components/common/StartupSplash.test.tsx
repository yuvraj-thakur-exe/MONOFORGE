import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { StartupSplash } from './StartupSplash';
import { InitialPageLoader } from './InitialPageLoader';

describe('StartupSplash', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders signature branded loading experience with official logo and tagline', () => {
    render(<StartupSplash />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText('Mono')).toBeDefined();
    expect(screen.getAllByText(/Forge/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/FORGE YOUR DEVELOPER IDENTITY/i)).toBeDefined();
    expect(screen.getByText(/PREPARING YOUR WORKSPACE/i)).toBeDefined();
  });

  it('allows skipping via ESC key', () => {
    render(<StartupSplash />);
    expect(screen.getByRole('status')).toBeDefined();

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(sessionStorage.getItem('monoforge_startup_viewed')).toBe('true');
  });

  it('allows skipping via skip button click', () => {
    render(<StartupSplash />);
    const skipBtn = screen.getByRole('button', { name: /skip startup splash/i });
    expect(skipBtn).toBeDefined();

    act(() => {
      fireEvent.click(skipBtn);
    });

    expect(sessionStorage.getItem('monoforge_startup_viewed')).toBe('true');
  });

  it('does not display if already viewed in sessionStorage', () => {
    sessionStorage.setItem('monoforge_startup_viewed', 'true');
    const { container } = render(<StartupSplash />);
    expect(container.firstChild).toBeNull();
  });

  it('InitialPageLoader renders StartupSplash seamlessly', () => {
    render(<InitialPageLoader />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText(/FORGE YOUR DEVELOPER IDENTITY/i)).toBeDefined();
  });
});
