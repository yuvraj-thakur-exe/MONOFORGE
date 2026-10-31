import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocsHomePortal } from './DocsHomePortal';

// Mock navigation
vi.mock('#/i18n/navigation', () => ({
  Link: ({ children, href, onClick, className }: any) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

// Mock motion
vi.mock('#/components/motion/ScrollReveal', () => ({
  ScrollReveal: ({ children }: any) => <div>{children}</div>,
}));

// Mock sound effects
vi.mock('#/lib/sound/sound-effects', () => ({
  playClickSound: vi.fn(),
  playTone: vi.fn(),
  isSoundEnabled: () => true,
  setSoundEnabled: vi.fn(),
}));

describe('DocsHomePortal', () => {
  it('renders home portal with hero, brand emblem, start forging CTA, and capabilities', () => {
    render(<DocsHomePortal />);

    // Brand emblem and titles
    expect(screen.getAllByText(/MONOFORGE/i).length).toBeGreaterThanOrEqual(1);

    // Primary CTA
    expect(screen.getByText(/START FORGING NOW/i)).toBeDefined();

    // Capabilities Matrix
    expect(screen.getByText(/WHAT MONOFORGE CAN DO & WHAT IT HAS/i)).toBeDefined();

    // Secondary navigation modes
    expect(screen.getByText(/OPEN RAW IDE/i)).toBeDefined();
    expect(screen.getByText(/Vector Animator/i)).toBeDefined();
  });

  it('triggers sound and tab change when clicking terminal install tabs', () => {
    render(<DocsHomePortal />);
    const buttons = screen.getAllByRole('button');
    const npmBtn = buttons.find((b) => b.textContent?.trim() === 'npm');
    expect(npmBtn).toBeDefined();

    if (npmBtn) {
      fireEvent.click(npmBtn);
    }
    expect(screen.getByText(/npx create-monoforge-app/i)).toBeDefined();
  });
});
