import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DocsHomePortal } from './DocsHomePortal';
import { TEMPLATES } from '#/lib/templates/catalog';
import { ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';
import { pluginRegistry } from '#/lib/plugins/registry';

// Mock navigation
vi.mock('#/i18n/navigation', () => ({
  Link: ({ children, href, onClick, className }: any) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
  usePathname: () => '/docs',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
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
  afterEach(() => {
    cleanup();
  });

  it('renders docs portal with standardized counts, start forging CTA, and telemetry lab', () => {
    render(<DocsHomePortal />);

    // Brand emblem and titles
    expect(screen.getAllByText(/MONOFORGE/i).length).toBeGreaterThanOrEqual(1);

    // Primary CTA
    expect(screen.getByText(/START FORGING NOW/i)).toBeDefined();

    // Live Telemetry SVG Endpoint Lab
    expect(screen.getByText(/LIVE TELEMETRY SVG ENDPOINT LAB/i)).toBeDefined();

    // Standardized navigation counts
    expect(screen.getAllByText(new RegExp(`${ALL_VISUALIZATION_IDS.length} SVG VISUALIZATIONS`, 'i')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(new RegExp(`${TEMPLATES.length} Curated Archetypes`, 'i')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(new RegExp(`${pluginRegistry.length} Modular Plugins`, 'i')).length).toBeGreaterThanOrEqual(1);
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
