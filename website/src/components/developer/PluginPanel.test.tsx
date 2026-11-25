import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { PluginPanel } from './PluginPanel';
import { useReadmeStore } from '#/store/useReadmeStore';
import { getPluginById } from '#/lib/plugins/registry';

describe('PluginPanel Developer Component', () => {
  beforeEach(() => {
    cleanup();
    useReadmeStore.setState({
      config: {
        version: '1.0.0',
        title: 'Plugin Test',
        settings: {
          user: { github: 'dev', name: 'Dev User' },
          theme: 'dark',
          accentColor: '#8b5cf6',
          badgeStyle: 'for-the-badge',
          align: 'left',
        },
        sections: [],
      },
      history: [],
      future: [],
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders search input and category pills', () => {
    render(<PluginPanel />);

    const searchInput = screen.getByPlaceholderText(/search badges, stats, widgets/i);
    expect(searchInput).toBeDefined();

    const allPill = screen.getByRole('button', { name: /^all$/i });
    expect(allPill).toBeDefined();
  });

  it('filters plugins by typing a search query', () => {
    render(<PluginPanel />);

    const searchInput = screen.getByPlaceholderText(/search badges, stats, widgets/i);
    fireEvent.change(searchInput, { target: { value: 'trophy' } });

    expect(screen.getByText(/github profile trophy/i)).toBeDefined();
  });

  it('inserts plugin with defaultConfig wrapped in props.content and invokes callback', () => {
    const handleInserted = vi.fn();
    render(<PluginPanel onPluginInserted={handleInserted} />);

    const searchInput = screen.getByPlaceholderText(/search badges, stats, widgets/i);
    fireEvent.change(searchInput, { target: { value: 'typing' } });

    const insertBtn = screen.getByRole('button', { name: /insert/i });
    fireEvent.click(insertBtn);

    expect(handleInserted).toHaveBeenCalledWith('readme-typing-svg');
    const sections = useReadmeStore.getState().config.sections;
    const inserted = sections.find(s => s.type === 'readme-typing-svg');
    expect(inserted).toBeDefined();

    const expectedDefaults = getPluginById('readme-typing-svg')?.defaultConfig ?? {};
    expect(inserted?.props?.content).toEqual(expectedDefaults);
  });

  it('switches to Templates tab, preserves search, and applies archetype', () => {
    render(<PluginPanel />);

    const templatesTab = screen.getByRole('button', { name: /templates/i });
    fireEvent.click(templatesTab);

    expect(screen.getByRole('heading', { name: /minimal professional/i })).toBeDefined();
    const loadButtons = screen.getAllByRole('button', { name: /load preset/i });
    expect(loadButtons.length).toBeGreaterThan(0);
    fireEvent.click(loadButtons[0]);

    const title = useReadmeStore.getState().config.title;
    expect(title).toBe('Minimal Professional Profile');
    expect(screen.getByRole('button', { name: /undo/i })).toBeDefined();
  }, 15000);

  it('switches to Schema & API tab and triggers copy json', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    render(<PluginPanel />);

    const schemaTab = screen.getByRole('button', { name: /schema & api/i });
    fireEvent.click(schemaTab);

    expect(screen.getByText(/workspace schema json/i)).toBeDefined();
    const copyPromptBtn = screen.getByRole('button', { name: /copy configuration json/i });
    fireEvent.click(copyPromptBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('switches to Blocks tab, renders active sections, and inserts a reusable block', () => {
    const handleInserted = vi.fn();
    render(<PluginPanel onPluginInserted={handleInserted} />);

    const blocksTab = screen.getByRole('button', { name: /blocks/i });
    fireEvent.click(blocksTab);

    expect(screen.getByText(/11 reusable blocks/i)).toBeDefined();
    const insertButtons = screen.getAllByRole('button', { name: /insert/i });
    expect(insertButtons.length).toBeGreaterThan(0);

    fireEvent.click(insertButtons[0]);
    expect(handleInserted).toHaveBeenCalled();
  });
});
