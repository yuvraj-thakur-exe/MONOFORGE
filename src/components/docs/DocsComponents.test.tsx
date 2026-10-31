import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocsCallout } from './DocsCallout';
import { DocsCodeBlock } from './DocsCodeBlock';
import { DocsBreadcrumbs } from './DocsBreadcrumbs';
import { DocsPagination } from './DocsPagination';
import { DocsContentRenderer } from './DocsContentRenderer';
import { getAllDocs } from '#/content/docs/docs-data';

// Mock next-intl navigation
vi.mock('#/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/docs/getting-started/introduction',
}));

describe('Documentation UI Components', () => {
  it('renders DocsCallout with custom title and type', () => {
    render(
      <DocsCallout type="warning" title="Important Notice">
        <span>Be cautious with production credentials.</span>
      </DocsCallout>
    );

    expect(screen.getByText(/Important Notice/i)).toBeDefined();
    expect(screen.getByText(/Be cautious with production credentials/i)).toBeDefined();
  });

  it('renders DocsCodeBlock and handles copy action', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<DocsCodeBlock language="bash" code="pnpm install" filename="terminal" />);

    expect(screen.getByText(/terminal/i)).toBeDefined();
    expect(screen.getByText(/pnpm install/i)).toBeDefined();

    const copyBtn = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalledWith('pnpm install');
  });

  it('renders DocsBreadcrumbs with category and doc title', () => {
    render(<DocsBreadcrumbs category="Installation & Setup" title="Platform Setup" />);

    expect(screen.getByText(/Docs/i)).toBeDefined();
    expect(screen.getByText(/Installation & Setup/i)).toBeDefined();
    expect(screen.getByText(/Platform Setup/i)).toBeDefined();
  });

  it('renders DocsPagination with prev and next article links', () => {
    const docs = getAllDocs();
    render(<DocsPagination prev={docs[0]} next={docs[1]} />);

    expect(screen.getByText(/Previous/i)).toBeDefined();
    expect(screen.getByText(docs[0].title)).toBeDefined();
    expect(screen.getByText(/Next/i)).toBeDefined();
    expect(screen.getByText(docs[1].title)).toBeDefined();
  });

  it('renders DocsContentRenderer with markdown headings, tables, and lists', () => {
    const markdown = `
## Getting Started Section

This is a test paragraph with **bold text** and \`inline code\`.

| Option | Default | Description |
| :--- | :--- | :--- |
| Theme | dark | Theme style |

- First item
- Second item
`;

    render(<DocsContentRenderer content={markdown} />);

    expect(screen.getByText(/Getting Started Section/i)).toBeDefined();
    expect(screen.getByText(/bold text/i)).toBeDefined();
    expect(screen.getByText(/inline code/i)).toBeDefined();
    expect(screen.getByText(/Option/i)).toBeDefined();
    expect(screen.getByText(/Theme style/i)).toBeDefined();
    expect(screen.getByText(/First item/i)).toBeDefined();
  });
});

