import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ProfileIntelligenceModal } from './ProfileIntelligenceModal';
import { useReadmeStore } from '#/store/useReadmeStore';

describe('ProfileIntelligenceModal Component', () => {
  beforeEach(() => {
    cleanup();
    useReadmeStore.setState({
      config: {
        version: '1.0.0',
        title: 'Intelligence Test Profile',
        settings: {
          user: { github: 'devlead', name: 'Dev Lead', role: 'Principal Architect' },
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

  it('renders Profile IQ, grade, and tabs when isOpen is true', () => {
    render(<ProfileIntelligenceModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/Profile Intelligence & AST Radar/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Overview/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /9 Dimensions/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Actionable Fixes/i })).toBeDefined();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<ProfileIntelligenceModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('switches to dimensions and suggestions tabs cleanly', () => {
    render(<ProfileIntelligenceModal isOpen={true} onClose={() => {}} />);

    const dimensionsTab = screen.getByRole('button', { name: /9 Dimensions/i });
    fireEvent.click(dimensionsTab);
    expect(screen.getByText(/Architecture & Structure/i)).toBeDefined();

    const fixesTab = screen.getByRole('button', { name: /Actionable Fixes/i });
    fireEvent.click(fixesTab);
    expect(screen.getByText(/Showcase 2-3 flagship projects/i)).toBeDefined();
  });
});
