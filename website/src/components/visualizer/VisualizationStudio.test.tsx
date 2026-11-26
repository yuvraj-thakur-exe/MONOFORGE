import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { VisualizationStudio } from './VisualizationStudio';
import { useReadmeStore } from '#/store/useReadmeStore';
import * as dataEngine from '#/lib/visualizations/data-engine';
import * as clipboardLib from '#/lib/export/clipboard';

const mockPush = vi.fn();
let mockSearchParamsMap: Record<string, string> = {};

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => mockSearchParamsMap[key] ?? null,
  }),
}));

vi.mock('#/i18n/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock CanvasVisualizer to avoid heavy 2D canvas animation loops in jsdom
vi.mock('./CanvasVisualizer', () => ({
  CanvasVisualizer: ({ id, theme, speed, isPlaying }: any) => (
    <div
      data-testid="mock-canvas-visualizer"
      data-viz-id={id}
      data-theme={theme}
      data-speed={speed}
      data-playing={String(isPlaying)}
    >
      <canvas />
    </div>
  ),
}));

// Mock ReadmeDoctorModal
vi.mock('#/components/studio/ReadmeDoctorModal', () => ({
  ReadmeDoctorModal: () => null,
}));

describe('VisualizationStudio', () => {
  beforeEach(() => {
    mockSearchParamsMap = {};
    mockPush.mockReset();
    useReadmeStore.getState().resetConfig();
    vi.spyOn(clipboardLib, 'copyToClipboard').mockResolvedValue({ ok: true });
    vi.spyOn(clipboardLib, 'downloadTextFile').mockReturnValue({ ok: true });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders honest Sample data state for octocat on initial mount', () => {
    render(<VisualizationStudio />);

    const badge = screen.getByTestId('studio-data-status-badge');
    expect(badge.textContent).toContain('Sample data');

    const banner = screen.getByTestId('studio-status-banner');
    expect(banner.textContent).toContain('SAMPLE DATA');
    expect(banner.textContent).toContain('@octocat');
  });

  it('supports category filtering and real-time search filtering', () => {
    render(<VisualizationStudio />);

    // Default shows all visualizations
    expect(screen.getByText(/Showing 30 \/ 30/i)).toBeDefined();

    // Filter by Skills category
    const skillsTab = screen.getByRole('button', { name: /^Skills$/i });
    fireEvent.click(skillsTab);
    expect(screen.queryByText(/Showing 30 \/ 30/i)).toBeNull();

    // Reset to All and search for "Year Clock"
    const allTab = screen.getByRole('button', { name: /^All \(30\)$/i });
    fireEvent.click(allTab);

    const searchInput = screen.getByPlaceholderText(/Filter 30 visualizations/i);
    fireEvent.change(searchInput, { target: { value: 'Year Clock' } });

    expect(screen.getByText(/Showing 1 \/ 30/i)).toBeDefined();
    expect(screen.getByText('Developer Year Clock')).toBeDefined();
  });

  it('updates Markdown, SVG URL, and Share Link when switching visualization and theme', async () => {
    render(<VisualizationStudio />);

    // Select Developer Year Clock
    fireEvent.click(screen.getByRole('button', { name: /Developer Year Clock/i }));
    // Select Cyberpunk Neon theme
    fireEvent.click(screen.getByRole('button', { name: /Cyberpunk Neon/i }));

    // Embed URL readout should reflect plugin=yearclock and theme=cyberpunk
    expect(
      screen.getByText(/plugin=yearclock&user=octocat&theme=cyberpunk&mode=sample/i)
    ).toBeDefined();

    // Copy Markdown
    fireEvent.click(screen.getByRole('button', { name: /Copy Markdown/i }));
    await waitFor(() => {
      expect(clipboardLib.copyToClipboard).toHaveBeenCalledWith(
        expect.stringContaining('plugin=yearclock&user=octocat&theme=cyberpunk&mode=sample')
      );
    });

    // Copy Share Link
    fireEvent.click(screen.getByRole('button', { name: /Copy Share Link/i }));
    await waitFor(() => {
      expect(clipboardLib.copyToClipboard).toHaveBeenCalledWith(
        expect.stringContaining('/en/visualizer?user=octocat&viz=year-clock&theme=cyberpunk')
      );
    });

    // Copy for Project README
    fireEvent.click(screen.getByRole('button', { name: /Copy for Project README/i }));
    await waitFor(() => {
      expect(clipboardLib.copyToClipboard).toHaveBeenCalledWith(
        expect.stringContaining('<div align="center">')
      );
    });

    // Download SVG
    fireEvent.click(screen.getByRole('button', { name: /Download SVG/i }));
    expect(clipboardLib.downloadTextFile).toHaveBeenCalledWith(
      'monoforge-year-clock-octocat-cyberpunk.svg',
      expect.stringContaining('<svg'),
      'image/svg+xml;charset=utf-8'
    );
  });

  it('switches cleanly between Interactive Canvas, Live SVG Embed, and README Preview modes', () => {
    render(<VisualizationStudio />);

    // Starts in Interactive Canvas mode
    expect(screen.getByTestId('mock-canvas-visualizer')).toBeDefined();

    // Switch to Live SVG Embed
    fireEvent.click(screen.getByRole('tab', { name: /Live SVG Embed/i }));
    const svgImg = screen.getByRole('img', { name: /Commit City Live SVG Embed/i }) as HTMLImageElement;
    expect(svgImg.getAttribute('src')).toBe('/api/telemetry/svg?plugin=commitcity&user=octocat&theme=emerald&mode=sample');

    // Trigger image error to verify graceful inline SVG fallback
    fireEvent.error(svgImg);
    expect(screen.getByTestId('svg-fallback-preview')).toBeDefined();

    // Switch to README Preview
    fireEvent.click(screen.getByRole('tab', { name: /README Preview/i }));
    const readmeContainer = screen.getByTestId('readme-preview-container');
    expect(readmeContainer.textContent).toContain('Commit City');
  });

  it('hydrates ?user=&viz=&theme= from URL query params and auto-fetches non-octocat user', async () => {
    mockSearchParamsMap = {
      user: 'torvalds',
      viz: 'year-clock',
      theme: 'cyberpunk',
    };

    const liveIdentity = {
      ...dataEngine.buildSyntheticDeveloperIdentity('torvalds'),
      isRealData: true,
      source: 'github' as const,
      totalContributions: 1337,
    };

    const fetchSpy = vi
      .spyOn(dataEngine, 'fetchNormalizedDeveloperIdentity')
      .mockResolvedValue(liveIdentity);

    render(<VisualizationStudio />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('torvalds', expect.any(Object));
    });

    await waitFor(() => {
      expect(screen.getByTestId('studio-data-status-badge').textContent).toContain('Live GitHub data');
    });

    const canvas = screen.getByTestId('mock-canvas-visualizer');
    expect(canvas.getAttribute('data-viz-id')).toBe('year-clock');
    expect(canvas.getAttribute('data-theme')).toBe('cyberpunk');
  });

  it('adds telemetry-engine section to Profile IDE store and navigates to /developer', () => {
    render(<VisualizationStudio />);

    fireEvent.click(screen.getByRole('button', { name: /Add to Profile IDE/i }));

    const sections = useReadmeStore.getState().config.sections;
    expect(sections.length).toBe(1);
    expect(sections[0].type).toBe('telemetry-engine');
    expect(mockPush).toHaveBeenCalledWith('/developer');
  });
});
