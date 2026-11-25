import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { ReadmeMarkdownRenderer } from './ReadmeMarkdownRenderer';
import { TemplateReadmePreview } from '#/components/landing/TemplateReadmePreview';
import { copyToClipboard, downloadTextFile } from '#/lib/export/clipboard';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { TEMPLATES } from '#/lib/templates/catalog';
import { pluginRegistry, getPluginById } from '#/lib/plugins/registry';
import { useReadmeStore } from '#/store/useReadmeStore';
import type { ReadmeConfig } from '#/lib/plugins/types';

describe('clipboard and download export helpers', () => {
  const originalClipboard = navigator.clipboard;
  const originalExecCommand = document.execCommand;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
    document.execCommand = originalExecCommand;
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('copies text with navigator.clipboard.writeText and returns ok: true', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const res = await copyToClipboard('# Hello MonoForge');
    expect(res).toEqual({ ok: true });
    expect(writeText).toHaveBeenCalledWith('# Hello MonoForge');
  });

  it('falls back to execCommand copy when navigator.clipboard rejects and respects failure status', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const execMock = vi.fn().mockReturnValue(true);
    document.execCommand = execMock;

    const okRes = await copyToClipboard('fallback payload');
    expect(okRes).toEqual({ ok: true });
    expect(execMock).toHaveBeenCalledWith('copy');

    execMock.mockReturnValue(false);
    const failRes = await copyToClipboard('failing payload');
    expect(failRes.ok).toBe(false);
    expect(failRes.error).toBeTruthy();
  });

  it('downloads text file and defers URL.revokeObjectURL by 1000ms', () => {
    vi.useFakeTimers();
    const createObjectURL = vi.fn().mockReturnValue('blob:monoforge-test');
    const revokeObjectURL = vi.fn();
    const origCreate = URL.createObjectURL;
    const origRevoke = URL.revokeObjectURL;
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;

    const clickSpy = vi.fn();
    const origCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const el = origCreateElement(tagName);
      if (tagName.toLowerCase() === 'a') {
        el.click = clickSpy;
      }
      return el;
    });

    try {
      const res = downloadTextFile('README.md', '# Sample');
      expect(res).toEqual({ ok: true });
      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledTimes(1);
      // Must NOT revoke synchronously
      expect(revokeObjectURL).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1000);
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:monoforge-test');
    } finally {
      URL.createObjectURL = origCreate;
      URL.revokeObjectURL = origRevoke;
    }
  });
});

describe('ReadmeMarkdownRenderer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders template config -> buildMarkdown -> sanitized HTML', () => {
    const template = TEMPLATES.find(t => t.id === 'fullstack') || TEMPLATES[0];
    const md = buildMarkdown(template.config);
    const { container } = render(<ReadmeMarkdownRenderer markdown={md} theme="dark" />);

    const root = screen.getByTestId('readme-markdown-renderer');
    expect(root.getAttribute('data-readme-theme')).toBe('dark');
    expect(container.textContent).toContain(template.config.settings.user.name);
    expect(container.querySelectorAll('img').length).toBeGreaterThan(0);
  });

  it('produces distinct rendered outputs for minimalist vs cyberpunk vs AI vs terminal templates', () => {
    const minimalist = TEMPLATES.find(t => t.id === 'minimalist')!;
    const cyberpunk = TEMPLATES.find(t => t.id === 'cyberpunk')!;
    const ai = TEMPLATES.find(t => t.id === 'aiml-01' || t.id === 'autonomous-ai-agent-engineer')!;
    const terminal = TEMPLATES.find(t => t.id === 'term-02' || t.id === 'isometric-terminal-connect')!;

    expect(minimalist).toBeDefined();
    expect(cyberpunk).toBeDefined();
    expect(ai).toBeDefined();
    expect(terminal).toBeDefined();

    const outputs = [minimalist, cyberpunk, ai, terminal].map(t => {
      const md = buildMarkdown(t.config);
      const { container, unmount } = render(<ReadmeMarkdownRenderer markdown={md} />);
      const html = container.innerHTML;
      unmount();
      return html;
    });

    expect(new Set(outputs).size).toBe(4);
  });

  it('renders GFM tables, headings, lists, links, and responsive images', () => {
    const gfm = [
      '# Main Profile Heading',
      '',
      '## Stack Matrix',
      '',
      '| Layer | Tool |',
      '| :--- | :--- |',
      '| Frontend | Next.js |',
      '| Testing | Vitest |',
      '',
      '- Item One',
      '- Item Two',
      '',
      '![Status Badge](https://img.shields.io/badge/Build-Passing-10b981)',
    ].join('\n');

    const { container } = render(<ReadmeMarkdownRenderer markdown={gfm} theme="light" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Main Profile Heading' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Stack Matrix' })).toBeDefined();
    expect(container.querySelector('table')).not.toBeNull();
    expect(container.querySelectorAll('tbody tr').length).toBe(2);
    expect(container.querySelectorAll('ul li').length).toBe(2);

    const img = screen.getByAltText('Status Badge');
    expect(img.className).toContain('max-w-full');
    expect(img.className).toContain('h-auto');
  });

  it('strips dangerous script tags, event handlers, and javascript: URIs via rehype-sanitize', () => {
    const malicious = [
      '# Safe Heading',
      '<script>window.__hacked = true; alert("xss")</script>',
      '<img src="https://example.com/avatar.png" alt="Avatar" onerror="alert(1)" onload="alert(2)" />',
      '<a href="javascript:alert(3)" onclick="steal()">Click</a>',
      '<iframe src="https://evil.example"></iframe>',
    ].join('\n\n');

    const { container } = render(<ReadmeMarkdownRenderer markdown={malicious} />);
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('iframe')).toBeNull();
    expect(container.innerHTML).not.toContain('onerror');
    expect(container.innerHTML).not.toContain('onload');
    expect(container.innerHTML).not.toContain('onclick');
    expect(container.innerHTML).not.toContain('javascript:');
    expect(screen.getByRole('heading', { level: 1, name: 'Safe Heading' })).toBeDefined();
  });

  it('renders clean inline fallback when an image fails to load or has an invalid src', () => {
    const md = [
      '![Broken Stats Card](https://example.com/nonexistent-stats.svg)',
      '<img src="javascript:alert(1)" alt="Blocked Image" />',
    ].join('\n\n');

    render(<ReadmeMarkdownRenderer markdown={md} theme="dark" />);

    // Blocked protocol image immediately uses fallback without inventing fake charts
    expect(screen.getByLabelText('Blocked Image (unavailable)')).toBeDefined();

    const img = screen.getByAltText('Broken Stats Card');
    fireEvent.error(img);

    const fallback = screen.getByLabelText('Broken Stats Card (unavailable)');
    expect(fallback.getAttribute('data-image-fallback')).toBe('true');
    expect(fallback.textContent).toContain('Broken Stats Card');
    expect(fallback.textContent).toContain('unavailable');
  });

  it('handles empty or malformed markdown content gracefully without crashing', () => {
    const { rerender } = render(<ReadmeMarkdownRenderer markdown="" />);
    expect(screen.getByTestId('readme-markdown-empty')).toBeDefined();

    rerender(<ReadmeMarkdownRenderer markdown={'   \n\t  '} />);
    expect(screen.getByTestId('readme-markdown-empty')).toBeDefined();

    rerender(<ReadmeMarkdownRenderer markdown={'<div><span>Unclosed HTML & <<<broken>>>'} />);
    expect(screen.getByTestId('readme-markdown-renderer').textContent).toContain('Unclosed HTML');
  });
});

describe('TemplateReadmePreview', () => {
  const originalIO = globalThis.IntersectionObserver;

  beforeEach(() => {
    useReadmeStore.getState().resetConfig();
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders compact preview without mutating central store', () => {
    const template = TEMPLATES.find(t => t.id === 'cyberpunk') || TEMPLATES[1];
    const initialStoreJson = JSON.stringify(useReadmeStore.getState().config);

    // Ensure jsdom fallback works even when IntersectionObserver is undefined
    // @ts-expect-error test override
    delete globalThis.IntersectionObserver;

    render(
      <TemplateReadmePreview
        config={template.config}
        templateName={template.name}
        mode="compact"
      />
    );

    expect(screen.getByText('README.md')).toBeDefined();
    expect(screen.getByTestId('template-readme-compact-viewport')).toBeDefined();
    expect(screen.getByTestId('readme-markdown-renderer')).toBeDefined();
    expect(JSON.stringify(useReadmeStore.getState().config)).toBe(initialStoreJson);
  });

  it('lazy-renders compact preview via IntersectionObserver when available', () => {
    let observerCallback: IntersectionObserverCallback | null = null;
    const disconnectSpy = vi.fn();

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '200px';
      readonly scrollMargin = '0px';
      readonly thresholds = [0];
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = disconnectSpy;
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    const template = TEMPLATES[0];

    render(
      <TemplateReadmePreview
        config={template.config}
        templateName={template.name}
        mode="compact"
      />
    );

    expect(screen.getByTestId('template-readme-lazy-placeholder')).toBeDefined();
    expect(screen.queryByTestId('readme-markdown-renderer')).toBeNull();

    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(screen.getByTestId('readme-markdown-renderer')).toBeDefined();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('scales full preview for desktop, tablet, and mobile viewports and handles invalid configs', () => {
    const template = TEMPLATES[0];
    const { rerender } = render(
      <TemplateReadmePreview
        config={template.config}
        templateName={template.name}
        mode="full"
        device="desktop"
        showToolbar
      />
    );

    expect(screen.getByTestId('template-readme-preview').className).toContain('max-w-full');

    rerender(
      <TemplateReadmePreview
        config={template.config}
        templateName={template.name}
        mode="full"
        device="tablet"
      />
    );
    expect(screen.getByTestId('template-readme-preview').className).toContain('max-w-[768px]');

    rerender(
      <TemplateReadmePreview
        config={template.config}
        templateName={template.name}
        mode="full"
        device="mobile"
      />
    );
    expect(screen.getByTestId('template-readme-preview').className).toContain('max-w-[390px]');

    rerender(
      <TemplateReadmePreview
        config={{} as ReadmeConfig}
        templateName="Broken Config"
        mode="full"
      />
    );
    expect(screen.getByTestId('template-readme-preview-empty')).toBeDefined();
  });
});

describe('TEMPLATES catalog plugin registry and buildMarkdown audit', () => {
  it('verifies every section type across all TEMPLATES exists in pluginRegistry and produces distinct non-empty Markdown', () => {
    const registeredIds = new Set(pluginRegistry.map(p => p.id));
    const renderedOutputs = new Set<string>();

    expect(TEMPLATES.length).toBeGreaterThanOrEqual(300);

    for (const template of TEMPLATES) {
      for (const section of template.config.sections) {
        expect(
          registeredIds.has(section.type),
          `Template "${template.id}" references unregistered plugin "${section.type}"`
        ).toBe(true);

        const plugin = getPluginById(section.type);
        expect(plugin).toBeDefined();
        const sectionOut = plugin!.renderMarkdown(
          (section.props?.content || {}) as Record<string, unknown>,
          template.config.settings
        );
        const sectionMd = typeof sectionOut === 'string' ? sectionOut : sectionOut?.markdown || '';
        expect(
          sectionMd.trim().length,
          `Section "${section.id}" (${section.type}) in template "${template.id}" rendered empty markdown`
        ).toBeGreaterThan(0);
      }

      const md = buildMarkdown(template.config);
      expect(md.trim().length, `Template "${template.id}" produced empty markdown`).toBeGreaterThan(0);
      expect(
        renderedOutputs.has(md),
        `Template "${template.id}" produced duplicate markdown output`
      ).toBe(false);
      renderedOutputs.add(md);
    }
  });
});
