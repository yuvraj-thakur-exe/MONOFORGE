import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DiagnosticsHUDModal } from './DiagnosticsHUDModal';
import { useReadmeStore } from '#/store/useReadmeStore';

describe('DiagnosticsHUDModal Component', () => {
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
        title: 'Diagnostic Test Profile',
        settings: {
          user: { github: 'octocat', name: 'Mona Lisa' },
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

  it('renders modal with score and filter buttons when isOpen is true', () => {
    render(<DiagnosticsHUDModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/Diagnostics & Quality HUD/i)).toBeDefined();
    expect(screen.getByText(/Camo CDN Safety/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /all issues/i })).toBeDefined();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<DiagnosticsHUDModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('triggers auto fix and copies repaired markdown to clipboard when issues exist', () => {
    useReadmeStore.setState({
      config: {
        version: '1.0.0',
        title: 'Diagnostic Test Profile',
        settings: {
          user: {
            github: 'octocat',
            name: 'Mona Lisa',
            bio: '[Click here]() and visit http://insecure.test for updates.',
          },
          theme: 'dark',
          accentColor: '#ffe600',
          badgeStyle: 'for-the-badge',
          align: 'left',
        },
        sections: [],
      },
    });

    render(<DiagnosticsHUDModal isOpen={true} onClose={() => {}} />);

    const fixBtn = screen.getByRole('button', { name: /auto-fix all/i });
    expect(fixBtn.hasAttribute('disabled')).toBe(false);
    fireEvent.click(fixBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
