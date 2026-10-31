import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomeCapabilitiesMatrix } from './HomeCapabilitiesMatrix';

vi.mock('#/i18n/navigation', () => ({
  Link: ({ children, href, onClick, className }: any) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('#/components/motion/ScrollReveal', () => ({
  ScrollReveal: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('#/lib/sound/sound-effects', () => ({
  playClickSound: vi.fn(),
  playTone: vi.fn(),
}));

describe('HomeCapabilitiesMatrix', () => {
  it('renders capability matrix headline and tabs', () => {
    render(<HomeCapabilitiesMatrix />);
    expect(
      screen.getByText(/WHAT MONOFORGE CAN DO & WHAT IT HAS/i)
    ).toBeDefined();
    expect(screen.getAllByText(/18\+ ARCHETYPES/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/60FPS VECTORS/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/47\+ ENGINES/i).length).toBeGreaterThanOrEqual(1);
  });

  it('switches tabs on click', () => {
    render(<HomeCapabilitiesMatrix />);
    const buttons = screen.getAllByRole('button');
    const vectorTab = buttons.find((btn) => btn.textContent?.includes('60FPS VECTORS'));
    expect(vectorTab).toBeDefined();

    if (vectorTab) {
      fireEvent.click(vectorTab);
    }
    expect(screen.getByText(/Animated Vector Kinematics/i)).toBeDefined();
  });
});
