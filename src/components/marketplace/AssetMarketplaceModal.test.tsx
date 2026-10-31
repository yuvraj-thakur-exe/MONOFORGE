import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { AssetMarketplaceModal } from './AssetMarketplaceModal';
import { useReadmeStore } from '#/store/useReadmeStore';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('AssetMarketplaceModal Component', () => {
  beforeEach(() => {
    cleanup();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    useReadmeStore.setState({
      config: {
        version: '1.0.0',
        title: 'Marketplace Test Profile',
        settings: {
          user: { github: 'dev', name: 'Dev User' },
          theme: 'dark',
          accentColor: '#ffe600',
          badgeStyle: 'for-the-badge',
          align: 'left',
        },
        sections: [],
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders modal with search bar, categories, and asset cards when isOpen is true', () => {
    render(<AssetMarketplaceModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/Community Asset Marketplace/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/search assets by keyword/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /all assets/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /animated svgs/i })).toBeDefined();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<AssetMarketplaceModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('filters assets by search keyword', () => {
    render(<AssetMarketplaceModal isOpen={true} onClose={() => {}} />);

    const searchInput = screen.getByPlaceholderText(/search assets by keyword/i);
    fireEvent.change(searchInput, { target: { value: 'matrix' } });

    expect(screen.getByText(/Matrix Digital Glyph Rain/i)).toBeDefined();
  });

  it('copies raw markdown of an asset on click', () => {
    render(<AssetMarketplaceModal isOpen={true} onClose={() => {}} />);

    const copyButtons = screen.getAllByRole('button', { name: /copy md/i });
    expect(copyButtons.length).toBeGreaterThan(0);
    fireEvent.click(copyButtons[0]);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('inserts an asset into the profile store on click', () => {
    render(<AssetMarketplaceModal isOpen={true} onClose={() => {}} />);

    const insertButtons = screen.getAllByRole('button', { name: /^insert$/i });
    expect(insertButtons.length).toBeGreaterThan(0);
    fireEvent.click(insertButtons[0]);

    const sections = useReadmeStore.getState().config.sections;
    expect(sections.length).toBeGreaterThan(0);
  });
});
