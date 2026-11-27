import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { NomokeyHero } from './NomokeyHero';
import { TEMPLATES } from '#/lib/templates/catalog';
import { useReadmeStore } from '#/store/useReadmeStore';

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

describe('NomokeyHero', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders hero with properly paired tagline text', () => {
    render(<NomokeyHero />);

    // Check the exact paired text requested by user
    expect(screen.getByText(/Forge a GitHub profile that gets noticed/i)).toBeDefined();
    expect(screen.getByText(/60fps Camo CDN vectors/i)).toBeDefined();
    expect(screen.getByText(/Zero external tracking/i)).toBeDefined();

    // Check headline and primary actions
    expect(screen.getByText(/YOUR GITHUB PROFILE/i)).toBeDefined();
    expect(screen.getByText(/BUILD MY PROFILE/i)).toBeDefined();
    expect(screen.getByText(new RegExp(`${TEMPLATES.length} TEMPLATES`, 'i'))).toBeDefined();
  });

  it('provides quick-start bar links wired to entered GitHub handle', () => {
    render(<NomokeyHero />);
    const input = screen.getByLabelText(/Enter GitHub handle/i);
    fireEvent.change(input, { target: { value: 'torvalds' } });

    const ideLink = screen.getByRole('link', { name: /Open in Developer IDE/i });
    const wizardLink = screen.getByRole('link', { name: /Open Wizard/i });
    const visualizerLink = screen.getByRole('link', { name: /Preview Visualizer/i });

    expect(ideLink.getAttribute('href')).toBe('/developer?user=torvalds');
    expect(wizardLink.getAttribute('href')).toBe('/wizard?user=torvalds');
    expect(visualizerLink.getAttribute('href')).toBe('/visualizer?user=torvalds');

    fireEvent.click(ideLink);
    expect(useReadmeStore.getState().config.settings.user.github).toBe('torvalds');
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
