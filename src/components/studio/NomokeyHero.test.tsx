import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NomokeyHero } from './NomokeyHero';

vi.mock('#/i18n/navigation', () => ({
  Link: ({ children, href, onClick, className }: any) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('#/lib/sound/sound-effects', () => ({
  playClickSound: vi.fn(),
  playTone: vi.fn(),
}));

vi.mock('#/components/common/InitialPageLoader', () => ({
  replayWelcomeLoader: vi.fn(),
}));

describe('NomokeyHero', () => {
  it('renders hero with properly paired tagline text', () => {
    render(<NomokeyHero />);

    // Check the exact paired text requested by user
    expect(screen.getByText(/Forge a GitHub profile that gets noticed/i)).toBeDefined();
    expect(screen.getByText(/60fps Camo CDN vectors/i)).toBeDefined();
    expect(screen.getByText(/Zero external tracking/i)).toBeDefined();

    // Check replay button
    expect(screen.getByText(/REPLAY WELCOME FORGE/i)).toBeDefined();

    // Check headline and primary actions
    expect(screen.getByText(/YOUR GITHUB PROFILE/i)).toBeDefined();
    expect(screen.getByText(/BUILD MY PROFILE/i)).toBeDefined();
    expect(screen.getByText(/85\+ TEMPLATES/i)).toBeDefined();
  });

  it('switches between monkey core and generated preview views', () => {
    render(<NomokeyHero />);
    const buttons = screen.getAllByRole('button');
    const previewBtn = buttons.find((btn) => btn.textContent?.includes('GENERATED PROFILE'));
    expect(previewBtn).toBeDefined();

    if (previewBtn) {
      fireEvent.click(previewBtn);
    }
    expect(screen.getByText(/ALEXANDER FORGE/i)).toBeDefined();
  });
});
