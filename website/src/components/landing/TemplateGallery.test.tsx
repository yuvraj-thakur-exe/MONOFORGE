import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { TemplateGallery, TEMPLATES } from './TemplateGallery';
import { useReadmeStore } from '#/store/useReadmeStore';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('TemplateGallery Component', () => {
  beforeEach(() => {
    useReadmeStore.getState().resetConfig();
    window.history.replaceState({}, '', '/en/templates');
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders section title and template items', () => {
    render(<TemplateGallery />);
    expect(screen.getByText(/Curated Starter Archetypes/i)).toBeDefined();
    expect(screen.getAllByText(/Minimal Professional/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Neon Cyberpunk/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bento Dashboard/i).length).toBeGreaterThan(0);
  }, 15000);

  it('filters templates when clicking a category pill', () => {
    render(<TemplateGallery />);

    const gamingPill = screen.getByRole('button', { name: /^Gaming\s*\d+$/i });
    fireEvent.click(gamingPill);

    expect(screen.getAllByRole('heading', { name: /Gaming Theme/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { name: /Minimal Professional/i })).toBeNull();
  }, 15000);

  it('filters templates when searching via the search bar', () => {
    render(<TemplateGallery />);

    const searchInput = screen.getByPlaceholderText(/Search by archetype/i);
    fireEvent.change(searchInput, { target: { value: 'Kubernetes' } });

    expect(screen.getAllByText(/Cloud & DevOps/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Neon Cyberpunk/i)).toBeNull();
  }, 15000);

  it('opens interactive preview modal and allows tab switching', () => {
    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    const modal = within(dialog);
    expect(modal.getByRole('button', { name: /Full Profile/i })).toBeDefined();
    expect(modal.getByRole('button', { name: /README Only/i })).toBeDefined();
    expect(modal.getByRole('button', { name: /^AI Prompt$/i })).toBeDefined();

    fireEvent.click(modal.getByRole('button', { name: /^AI Prompt$/i }));
    expect(modal.getByText(/AI Generation Master Prompt/i)).toBeDefined();

    fireEvent.click(modal.getByRole('button', { name: /README Only/i }));
    expect(modal.getByText(/Popular Repositories/i)).toBeDefined();
  }, 15000);

  it('hydrates ?template=<id> and #template=<id> URLs on mount', async () => {
    window.history.replaceState({}, '', `/en/templates?template=${TEMPLATES[1].id}`);
    render(<TemplateGallery />);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeDefined();
    });
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toContain(TEMPLATES[1].name);

    cleanup();
    window.history.replaceState({}, '', `/en/templates#template=${TEMPLATES[0].id}`);
    render(<TemplateGallery />);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeDefined();
    });
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toContain(TEMPLATES[0].name);
  }, 15000);

  it('copies archetype spec when clicking copy prompt button', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<TemplateGallery />);

    const copyPromptButtons = screen.getAllByTitle(/Copy Master AI Generation Prompt/i);
    expect(copyPromptButtons.length).toBeGreaterThan(0);

    fireEvent.click(copyPromptButtons[0]);
    expect(writeTextMock).toHaveBeenCalledWith(TEMPLATES[0].prompt);
  }, 15000);

  it('applies template to store on apply from preview modal', () => {
    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    const applyButton = screen.getByRole('button', { name: /APPLY TEMPLATE/i });
    fireEvent.click(applyButton);

    const storeConfig = useReadmeStore.getState().config;
    expect(storeConfig.settings.user.name).toBe(TEMPLATES[0].config.settings.user.name);
  }, 15000);

  it('copies shareable ?template= link from preview modal', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    const shareButton = screen.getByRole('button', { name: /^SHARE$/i });
    fireEvent.click(shareButton);

    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining(`?template=${TEMPLATES[0].id}`)
    );
  }, 15000);

  it('renders simulated GitHub profile view inside preview modal', () => {
    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    expect(screen.getByText(/Overview/i)).toBeDefined();
    expect(screen.getByText(/Popular Repositories/i)).toBeDefined();
    expect(screen.getByText(/Edit profile \(Preview\)/i)).toBeDefined();
  }, 15000);

  it('toggles device viewport switcher between Desktop, Tablet, and Mobile', () => {
    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    const tabletBtn = screen.getByTitle(/^Tablet$/i);
    fireEvent.click(tabletBtn);
    expect(tabletBtn).toBeDefined();

    const mobileBtn = screen.getByTitle(/^Mobile$/i);
    fireEvent.click(mobileBtn);
    expect(mobileBtn).toBeDefined();

    const desktopBtn = screen.getByTitle(/^Desktop$/i);
    fireEvent.click(desktopBtn);
    expect(desktopBtn).toBeDefined();
  }, 15000);

  it('toggles template favorite and adds template to compare matrix', () => {
    render(<TemplateGallery />);

    const favoriteBtn = screen.getAllByTitle(/Add to favorites/i)[0];
    fireEvent.click(favoriteBtn);

    expect(screen.getByText(/Favorites \(1\)/i)).toBeDefined();

    const compareBtn = screen.getAllByTitle(/Add to compare/i)[0];
    fireEvent.click(compareBtn);

    expect(screen.getByText(/Comparing/i)).toBeDefined();
    expect(screen.getByText(/Compare Matrix/i)).toBeDefined();
  }, 15000);
});
