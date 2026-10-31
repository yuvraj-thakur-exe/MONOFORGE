import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { WorkspaceManagerModal } from './WorkspaceManagerModal';
import { useReadmeStore } from '#/store/useReadmeStore';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('WorkspaceManagerModal Component', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    useReadmeStore.setState({
      config: {
        version: '1.0.0',
        title: 'Workspace Test Profile',
        settings: {
          user: { github: 'devlead', name: 'Dev Lead' },
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

  it('renders modal with title, tabs, and project list when isOpen is true', () => {
    render(<WorkspaceManagerModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/developer profile workspace/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /projects \(/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /saved templates \(/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /export history \(/i })).toBeDefined();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<WorkspaceManagerModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('creates a new project in the workspace', () => {
    render(<WorkspaceManagerModal isOpen={true} onClose={() => {}} />);

    const nameInput = screen.getByPlaceholderText(/Open Source Maintainer Profile/i);
    fireEvent.change(nameInput, { target: { value: 'OSS Portfolio' } });

    const createBtn = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createBtn);

    expect(screen.getByText(/OSS Portfolio/i)).toBeDefined();
  });

  it('switches to templates tab and history tab', () => {
    render(<WorkspaceManagerModal isOpen={true} onClose={() => {}} />);

    const templatesTab = screen.getByRole('button', { name: /saved templates \(/i });
    fireEvent.click(templatesTab);
    expect(screen.getByText(/Save Current Profile as Template/i)).toBeDefined();

    const historyTab = screen.getByRole('button', { name: /export history \(/i });
    fireEvent.click(historyTab);
    expect(screen.getByText(/No export history recorded yet/i)).toBeDefined();
  });
});
