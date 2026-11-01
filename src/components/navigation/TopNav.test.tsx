import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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

describe('TopNav', () => {
  it('renders brand logo, links, and action controls', () => {
    render(<TopNav />);

    // Brand logo
    expect(screen.getAllByText(/MONO/i).length).toBeGreaterThanOrEqual(1);

    // Navigation Links
    expect(screen.getByText(/HOME/i)).toBeDefined();
    expect(screen.getByText(/TEMPLATES/i)).toBeDefined();
    expect(screen.getByText(/DOCS/i)).toBeDefined();
    expect(screen.getByText(/INFO/i)).toBeDefined();
    expect(screen.queryByRole('link', { name: /STUDIO/i })).toBeNull();
  });
});
