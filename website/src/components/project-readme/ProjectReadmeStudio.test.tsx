import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProjectReadmeStudio } from './ProjectReadmeStudio';
import { useProjectReadmeStore } from '#/store/useProjectReadmeStore';
import * as clipboardLib from '#/lib/export/clipboard';

describe('ProjectReadmeStudio', () => {
  beforeEach(() => {
    cleanup();
    useProjectReadmeStore.getState().resetToDefault();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the studio, preset bar, 9 editor tabs, and GFM rendered preview', () => {
    render(<ProjectReadmeStudio />);

    expect(screen.getByRole('heading', { name: 'README STUDIO' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Developer Tool' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'SaaS Platform' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'OSS Library' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'CLI Binary' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'AI / LLM Agent' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Full-Stack Web' })).toBeDefined();

    // All 9 editor tabs are present
    for (const tabLabel of [
      'Meta',
      'Badges',
      'Features',
      'Architecture',
      'Stack',
      'Install',
      'Env Vars',
      'Roadmap',
      'Sections',
    ]) {
      expect(screen.getByRole('tab', { name: tabLabel })).toBeDefined();
    }

    // Rendered README powered by ReadmeMarkdownRenderer
    expect(screen.getByTestId('readme-markdown-renderer')).toBeDefined();
    expect(screen.getByTestId('inspection-status-badge').textContent).toContain('Template Preset');
  });

  it('switches templates and updates rendered markdown preview', () => {
    render(<ProjectReadmeStudio />);

    fireEvent.click(screen.getByRole('button', { name: 'SaaS Platform' }));

    expect(useProjectReadmeStore.getState().config.template).toBe('saas');
    expect(screen.getByTestId('readme-markdown-renderer').textContent).toContain('CloudPulse');
  });

  it('updates compiled markdown when structured Meta fields and toggles are edited', () => {
    render(<ProjectReadmeStudio />);

    const nameInput = screen.getByLabelText('Project Name');
    fireEvent.change(nameInput, { target: { value: 'HyperEngine' } });

    const tocCheckbox = screen.getByLabelText('Table of Contents');
    fireEvent.click(tocCheckbox);

    const compiled = useProjectReadmeStore.getState().getCompiledMarkdown();
    expect(compiled).toContain('HyperEngine');
    expect(compiled).toContain('Table of Contents');
    expect(screen.getByTestId('readme-markdown-renderer').textContent).toContain('HyperEngine');
  });

  it('switches between Rendered README and Raw Markdown tabs and supports manual override + reset', () => {
    render(<ProjectReadmeStudio />);

    // Toggle viewport & theme on Rendered README
    fireEvent.click(screen.getByRole('button', { name: 'Mobile Viewport' }));
    expect(screen.getByTestId('readme-viewport-frame').getAttribute('data-viewport')).toBe(
      'mobile'
    );
    fireEvent.click(screen.getByRole('button', { name: /Switch preview to light theme/i }));
    expect(screen.getByTestId('readme-viewport-frame').getAttribute('data-theme')).toBe('light');

    const rawTab = screen.getByRole('tab', { name: 'Raw Markdown' });
    fireEvent.click(rawTab);

    const editor = screen.getByLabelText('Raw Markdown Editor') as HTMLTextAreaElement;
    expect(editor.value).toContain('MonoForge');

    fireEvent.change(editor, { target: { value: '# Custom Raw Override\n\nManual edit' } });
    expect(useProjectReadmeStore.getState().rawMarkdownOverride).toBe(
      '# Custom Raw Override\n\nManual edit'
    );

    const resetOverrideBtns = screen.getAllByRole('button', { name: /Reset to Structured/i });
    fireEvent.click(resetOverrideBtns[0]);

    expect(useProjectReadmeStore.getState().rawMarkdownOverride).toBeNull();
    expect((screen.getByLabelText('Raw Markdown Editor') as HTMLTextAreaElement).value).toContain(
      'MonoForge'
    );
  });

  it('adds and removes Tech Stack items, Env Variables, Roadmap items, and Custom Sections', () => {
    render(<ProjectReadmeStudio />);

    // Stack tab
    fireEvent.click(screen.getByRole('tab', { name: 'Stack' }));
    fireEvent.change(screen.getByLabelText('Technology name'), { target: { value: 'ClickHouse' } });
    fireEvent.change(screen.getByLabelText('Technology category'), {
      target: { value: 'Database' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Tech Stack Item/i }));
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain('ClickHouse');

    fireEvent.click(screen.getByRole('button', { name: 'Remove tech ClickHouse' }));
    expect(
      useProjectReadmeStore.getState().config.techStack.some((t) => t.name === 'ClickHouse')
    ).toBe(false);

    // Env Vars tab
    fireEvent.click(screen.getByRole('tab', { name: 'Env Vars' }));
    fireEvent.change(screen.getByLabelText('Env variable key'), { target: { value: 'REDIS_URL' } });
    fireEvent.change(screen.getByLabelText('Env variable description'), {
      target: { value: 'Redis cache endpoint' },
    });
    fireEvent.change(screen.getByLabelText('Env default value'), {
      target: { value: 'redis://localhost:6379' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Env Variable/i }));
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain('REDIS_URL');

    fireEvent.click(screen.getByRole('button', { name: 'Remove env REDIS_URL' }));
    expect(
      useProjectReadmeStore.getState().config.envVariables.some((e) => e.key === 'REDIS_URL')
    ).toBe(false);

    // Roadmap tab
    fireEvent.click(screen.getByRole('tab', { name: 'Roadmap' }));
    fireEvent.change(screen.getByLabelText('Roadmap milestone task'), {
      target: { value: 'Launch GraphQL API' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Milestone/i }));
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain('Launch GraphQL API');

    fireEvent.click(screen.getByLabelText('Toggle roadmap item Launch GraphQL API'));
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain(
      '- [x] Launch GraphQL API'
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Remove roadmap item Launch GraphQL API' })
    );
    expect(
      useProjectReadmeStore.getState().config.roadmap.some((r) => r.task === 'Launch GraphQL API')
    ).toBe(false);

    // Sections tab
    fireEvent.click(screen.getByRole('tab', { name: 'Sections' }));
    fireEvent.change(screen.getByLabelText('New section title'), {
      target: { value: 'Security Policy' },
    });
    fireEvent.change(screen.getByLabelText('New section content'), {
      target: { value: 'Report vulnerabilities via security@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Custom Section/i }));
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain('## Security Policy');

    fireEvent.click(screen.getByRole('button', { name: 'Remove section Security Policy' }));
    expect(
      useProjectReadmeStore
        .getState()
        .config.customSections.some((s) => s.title === 'Security Policy')
    ).toBe(false);
  });

  it('adds and removes badges, features, install steps, and switches architecture presets', () => {
    render(<ProjectReadmeStudio />);

    // Badges tab
    fireEvent.click(screen.getByRole('tab', { name: 'Badges' }));
    fireEvent.change(screen.getByLabelText('Badge label'), { target: { value: 'Coverage' } });
    fireEvent.change(screen.getByLabelText('Badge text'), { target: { value: '99%' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Badge/i }));
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain('Coverage');
    fireEvent.click(screen.getByRole('button', { name: 'Remove Coverage badge' }));
    expect(
      useProjectReadmeStore.getState().config.badges.some((b) => b.label === 'Coverage')
    ).toBe(false);

    // Architecture tab
    fireEvent.click(screen.getByRole('tab', { name: 'Architecture' }));
    fireEvent.click(screen.getByRole('button', { name: 'Microservices' }));
    expect(useProjectReadmeStore.getState().config.architectureMermaid).toContain('API Gateway');

    // Install tab
    fireEvent.click(screen.getByRole('tab', { name: 'Install' }));
    fireEvent.change(screen.getByLabelText('Step title'), { target: { value: 'Run Tests' } });
    fireEvent.change(screen.getByLabelText('Step command'), { target: { value: 'pnpm test' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Install Step/i }));
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain('pnpm test');
    fireEvent.click(screen.getByRole('button', { name: 'Remove step Run Tests' }));
    expect(
      useProjectReadmeStore.getState().config.installSteps.some((s) => s.step === 'Run Tests')
    ).toBe(false);
  });

  it('calls copyToClipboard and downloadTextFile with status feedback', async () => {
    const copySpy = vi.spyOn(clipboardLib, 'copyToClipboard').mockResolvedValue({ ok: true });
    const downloadSpy = vi.spyOn(clipboardLib, 'downloadTextFile').mockReturnValue({ ok: true });

    render(<ProjectReadmeStudio />);

    fireEvent.click(screen.getByRole('button', { name: /COPY GFM/i }));
    await waitFor(() => {
      expect(copySpy).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('studio-feedback-toast').textContent).toContain(
        'Copied GFM README.md'
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /EXPORT \.MD/i }));
    expect(downloadSpy).toHaveBeenCalledWith(
      'README.md',
      expect.stringContaining('MonoForge'),
      'text/markdown;charset=utf-8'
    );
    expect(screen.getByTestId('studio-feedback-toast').textContent).toContain(
      'Downloaded README.md.'
    );
  });

  it('displays honest inspection status badges/messages and resets cleanly', () => {
    useProjectReadmeStore.setState({
      analysisSource: 'heuristic',
      analysisMessage: 'Using heuristic URL analysis (GitHub API unavailable).',
    });

    render(<ProjectReadmeStudio />);

    expect(screen.getByTestId('inspection-status-badge').textContent).toContain(
      'Heuristic Analysis'
    );
    expect(screen.getByTestId('inspection-status-message').textContent).toContain(
      'heuristic URL analysis'
    );

    fireEvent.change(screen.getByLabelText('Project Name'), { target: { value: 'TempName' } });
    expect(useProjectReadmeStore.getState().config.name).toBe('TempName');

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(useProjectReadmeStore.getState().config.name).toBe('MonoForge');
    expect(useProjectReadmeStore.getState().analysisSource).toBe('default');
  });
});
