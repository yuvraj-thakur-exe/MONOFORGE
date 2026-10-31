'use client';

import type { ReactNode } from 'react';
import { DocsCodeBlock } from './DocsCodeBlock';
import { DocsCallout, CalloutType } from './DocsCallout';

interface DocsContentRendererProps {
  content: string;
}

export function DocsContentRenderer({ content }: DocsContentRendererProps) {
  // Parse markdown content line by line into structured blocks
  const lines = content.trim().split('\n');
  const elements: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced Code Blocks (```lang ... ```)
    if (line.trim().startsWith('```')) {
      const langMatch = line.trim().match(/^```([a-zA-Z0-9_-]*)/);
      const language = langMatch && langMatch[1] ? langMatch[1] : 'bash';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      elements.push(
        <DocsCodeBlock
          key={`code-${i}`}
          language={language}
          code={codeLines.join('\n')}
        />
      );
      continue;
    }

    // Callouts / Blockquotes (> **Note**: ... or > **Warning**: ...)
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      const rawText = quoteLines.join('\n');
      let type: CalloutType = 'note';
      let title = 'Note';
      let body = rawText;

      const noteMatch = rawText.match(/^\*\*(Note|Tip|Important|Warning|Caution)\*\*:\s*(.*)/is);
      if (noteMatch) {
        type = noteMatch[1].toLowerCase() as CalloutType;
        title = noteMatch[1];
        body = noteMatch[2];
      }

      elements.push(
        <DocsCallout key={`callout-${i}`} type={type} title={title}>
          <p>{body}</p>
        </DocsCallout>
      );
      continue;
    }

    // Heading 2 (## Title)
    if (line.startsWith('## ')) {
      const title = line.replace('## ', '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      elements.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="scroll-mt-24 text-2xl font-black tracking-tight text-neutral-950 dark:text-white mt-10 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center group font-sans"
        >
          <span>{title}</span>
          <a
            href={`#${id}`}
            className="ml-2 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm"
            aria-label={`Link to ${title}`}
          >
            #
          </a>
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3 (### Title)
    if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      elements.push(
        <h3
          key={`h3-${i}`}
          id={id}
          className="scroll-mt-24 text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-6 mb-3 flex items-center group font-sans"
        >
          <span>{title}</span>
          <a
            href={`#${id}`}
            className="ml-2 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs"
            aria-label={`Link to ${title}`}
          >
            #
          </a>
        </h3>
      );
      i++;
      continue;
    }

    // Tables (| col1 | col2 |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCols = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const bodyRows = tableLines.slice(2).map((r) =>
          r
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-neutral-100 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono">
                <tr>
                  {headerCols.map((col, idx) => (
                    <th key={idx} className="px-4 py-2.5 font-bold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Unordered List (- item or * item)
    if (line.trim().match(/^[-*]\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^[-*]\s+/)) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 pl-6 list-disc space-y-1.5 text-neutral-800 dark:text-neutral-300 text-sm leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List (1. item)
    if (line.trim().match(/^\d+\.\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 pl-6 list-decimal space-y-1.5 text-neutral-800 dark:text-neutral-300 text-sm leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal Rule (---)
    if (line.trim() === '---') {
      elements.push(
        <hr key={`hr-${i}`} className="my-8 border-neutral-200 dark:border-neutral-800" />
      );
      i++;
      continue;
    }

    // Regular Paragraph
    if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="my-3 text-neutral-800 dark:text-neutral-300 text-sm leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    }

    i++;
  }

  return <div className="space-y-1 font-sans">{elements}</div>;
}

// Inline Markdown Parser for bold (**text**), code (`code`), and links ([text](url))
function renderInlineMarkdown(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-neutral-950 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 font-mono text-[12px] border border-neutral-200 dark:border-neutral-700"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            className="text-amber-600 dark:text-[#ffe600] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
            target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
            rel={linkMatch[2].startsWith('http') ? 'noreferrer' : undefined}
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
