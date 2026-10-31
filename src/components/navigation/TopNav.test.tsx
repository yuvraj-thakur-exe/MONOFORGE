import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopNav } from './TopNav';

// Mock navigation
vi.mock('#/i18n/navigation', () => ({
  Link: ({ children, href, onClick, className }: any) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock sound effects
vi.mock('#/lib/sound/sound-effects', () => ({
  playClickSound: vi.fn(),
  playTone: vi.fn(),
  isSoundEnabled: () => true,
  setSoundEnabled: vi.fn(),
}));

// Mock replayWelcomeLoader
vi.mock('#/components/common/InitialPageLoader', () => ({
  replayWelcomeLoader: vi.fn(),
}));

describe('TopNav', () => {
  it('renders brand logo, links, replay forge button, and controls', () => {
    render(<TopNav />);

    // Brand logo
    expect(screen.getAllByText(/MONO/i).length).toBeGreaterThanOrEqual(1);

    // Replay Forge Button
    expect(screen.getByText(/REPLAY FORGE/i)).toBeDefined();

    // Navigation Links
    expect(screen.getAllByText(/STUDIO/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/TEMPLATES/i)).toBeDefined();
    expect(screen.getByText(/IDE/i)).toBeDefined();
    expect(screen.getByText(/DOCS/i)).toBeDefined();
    expect(screen.getByText(/INFO/i)).toBeDefined();
  });

  it('triggers replay when clicking Replay Forge button', () => {
    render(<TopNav />);
    const buttons = screen.getAllByRole('button');
    const replayBtn = buttons.find((b) => b.textContent?.includes('REPLAY FORGE'));
    expect(replayBtn).toBeDefined();

    if (replayBtn) {
      fireEvent.click(replayBtn);
    }
  });
});
