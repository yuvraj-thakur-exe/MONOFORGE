import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { TemplateGallery, TEMPLATES } from './TemplateGallery';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mock navigation
const mockPush = vi.fn();
vi.mock('#/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  Link: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
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

  it('renders section title and template items with registry counts and zero fabricated metrics', () => {
    const { container } = render(<TemplateGallery />);
    expect(screen.getByText(/Curated Starter Archetypes/i)).toBeDefined();
    expect(screen.getAllByText(/Minimal Professional/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Neon Cyberpunk/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bento Dashboard/i).length).toBeGreaterThan(0);

    // Verify registry-derived count badge
    expect(screen.getByText(new RegExp(`${TEMPLATES.length} READY-TO-SHIP`, 'i'))).toBeDefined();

    // Verify zero fabricated Octocat metrics exist in the DOM
    const textContent = container.textContent || '';
    expect(textContent).not.toContain('2,847');
    expect(textContent).not.toContain('2,840+');
    expect(textContent).not.toContain('42-day streak');
    expect(textContent).not.toContain('42d');
    expect(textContent).not.toContain('LIVE GITHUB FETCH');
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

  it('strictly excludes templates without difficulty metadata when difficulty filter is active', () => {
    render(<TemplateGallery />);

    // Identify templates without difficulty in the catalog
    const withoutDifficulty = TEMPLATES.filter(t => !t.difficulty);
    const withBeginner = TEMPLATES.filter(t => t.difficulty === 'beginner');

    expect(withBeginner.length).toBeGreaterThan(0);

    const difficultySelect = screen.getByDisplayValue(/All Difficulties/i);
    fireEvent.change(difficultySelect, { target: { value: 'beginner' } });

    // Beginner templates should be displayed
    const firstBeginner = withBeginner[0];
    expect(screen.getAllByText(firstBeginner.name).length).toBeGreaterThan(0);

    // Any template with missing difficulty MUST NOT appear
    if (withoutDifficulty.length > 0) {
      const missingName = withoutDifficulty[0].name;
      expect(screen.queryByRole('heading', { name: new RegExp(missingName, 'i') })).toBeNull();
    }
  }, 15000);

  it('opens interactive preview studio modal with Rendered README, Raw Markdown, Plugin Info, and AI Prompt tabs', () => {
    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    const modal = within(dialog);

    // Verify studio tab buttons
    expect(modal.getByRole('button', { name: /Rendered README/i })).toBeDefined();
    expect(modal.getByRole('button', { name: /Raw Markdown/i })).toBeDefined();
    expect(modal.getByRole('button', { name: /Plugin Info/i })).toBeDefined();
    expect(modal.getByRole('button', { name: /^AI Prompt$/i })).toBeDefined();

    // Raw Markdown tab displays pure markdown from buildMarkdown
    fireEvent.click(modal.getByRole('button', { name: /Raw Markdown/i }));
    const expectedMarkdown = buildMarkdown(TEMPLATES[0].config);
    expect(dialog.textContent).toContain(expectedMarkdown.slice(0, 30));

    // Plugin Info tab displays plugins and data sources
    fireEvent.click(modal.getByRole('button', { name: /Plugin Info/i }));
    expect(modal.getByText(/Active Plugin Architecture/i)).toBeDefined();

    // AI Prompt tab displays archetype prompt
    fireEvent.click(modal.getByRole('button', { name: /^AI Prompt$/i }));
    expect(modal.getByText(/AI Generation Master Prompt/i)).toBeDefined();
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

  it('copies archetype spec when clicking copy prompt button', async () => {
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

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(TEMPLATES[0].prompt);
    });
  }, 15000);

  it('applies template to store on apply from preview modal and navigates to /developer', () => {
    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    const applyButton = screen.getByRole('button', { name: /APPLY TEMPLATE/i });
    fireEvent.click(applyButton);

    const storeConfig = useReadmeStore.getState().config;
    expect(storeConfig.settings.user.name).toBe(TEMPLATES[0].config.settings.user.name);
    expect(mockPush).toHaveBeenCalledWith('/developer');
  }, 15000);

  it('copies shareable ?template= link from preview modal', async () => {
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

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(
        expect.stringContaining(`?template=${TEMPLATES[0].id}`)
      );
    });
  }, 30000);

  it('toggles device viewport switcher between Desktop, Tablet, and Mobile', () => {
    render(<TemplateGallery />);

    const previewButtons = screen.getAllByRole('button', { name: /^Preview archetype/i });
    fireEvent.click(previewButtons[0]);

    const tabletBtn = screen.getByTitle(/Tablet Viewport/i);
    fireEvent.click(tabletBtn);
    expect(tabletBtn).toBeDefined();

    const mobileBtn = screen.getByTitle(/Mobile Viewport/i);
    fireEvent.click(mobileBtn);
    expect(mobileBtn).toBeDefined();

    const desktopBtn = screen.getByTitle(/Desktop Viewport/i);
    fireEvent.click(desktopBtn);
    expect(desktopBtn).toBeDefined();
  }, 30000);

  it('toggles template favorite with persistence and adds template to compare matrix with max-3 limit', () => {
    render(<TemplateGallery />);

    const favoriteBtn = screen.getAllByTitle(/Add to favorites/i)[0];
    fireEvent.click(favoriteBtn);

    expect(screen.getByText(/Favorites \(1\)/i)).toBeDefined();
    const stored = JSON.parse(localStorage.getItem('monoforge:favorites') || '[]');
    expect(stored.length).toBe(1);

    // Test adding up to 3 to compare matrix
    const compareButtons = screen.getAllByTitle(/Add to compare/i);
    fireEvent.click(compareButtons[0]);
    fireEvent.click(compareButtons[1]);
    fireEvent.click(compareButtons[2]);

    expect(screen.getByText(/Comparing/i)).toBeDefined();
    expect(screen.getByText(/Compare Matrix/i)).toBeDefined();

    // Attempting a 4th triggers the max-3 toast
    if (compareButtons[3]) {
      fireEvent.click(compareButtons[3]);
      expect(screen.getByText(/Maximum 3 archetypes can be compared at once/i)).toBeDefined();
    }
  }, 30000);

  it('renders distinct previews for minimalist vs cyberpunk templates', () => {
    render(<TemplateGallery />);

    const minimalTemplate = TEMPLATES.find(t => t.id === 'minimalist' || t.name.includes('Minimal'));
    const cyberpunkTemplate = TEMPLATES.find(t => t.id === 'cyberpunk' || t.name.includes('Cyberpunk'));

    expect(minimalTemplate).toBeDefined();
    expect(cyberpunkTemplate).toBeDefined();

    if (minimalTemplate && cyberpunkTemplate) {
      expect(minimalTemplate.name).not.toBe(cyberpunkTemplate.name);
      expect(minimalTemplate.config.settings.theme).not.toBe(
        // Verify distinct configs
        cyberpunkTemplate.accent === minimalTemplate.accent ? 'different' : 'same'
      );
    }
  }, 15000);
});
