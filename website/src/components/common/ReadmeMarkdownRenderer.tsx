'use client';

import React, { memo, useEffect, useMemo, useState } from 'react';
import parse, { DOMNode, Element, HTMLReactParserOptions } from 'html-react-parser';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { ImageOff } from 'lucide-react';

export interface ReadmeMarkdownRendererProps {
  markdown: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

export const readmeSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), 'align', 'className', 'class'],
    p: [...(defaultSchema.attributes?.p || []), 'align', 'className', 'class'],
    h1: [...(defaultSchema.attributes?.h1 || []), 'align'],
    h2: [...(defaultSchema.attributes?.h2 || []), 'align'],
    h3: [...(defaultSchema.attributes?.h3 || []), 'align'],
    img: [...(defaultSchema.attributes?.img || []), 'src', 'alt', 'height', 'width', 'align'],
    source: [...(defaultSchema.attributes?.source || []), 'media', 'srcset'],
    picture: [...(defaultSchema.attributes?.picture || [])],
    a: [...(defaultSchema.attributes?.a || []), 'href', 'target', 'rel'],
    table: [...(defaultSchema.attributes?.table || []), 'width', 'align'],
    tr: [...(defaultSchema.attributes?.tr || []), 'align'],
    td: [...(defaultSchema.attributes?.td || []), 'valign', 'width', 'align'],
    th: [...(defaultSchema.attributes?.th || []), 'valign', 'width', 'align'],
    details: [...(defaultSchema.attributes?.details || []), 'open'],
    summary: [...(defaultSchema.attributes?.summary || [])],
    sub: [...(defaultSchema.attributes?.sub || [])],
    sup: [...(defaultSchema.attributes?.sup || [])],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'picture',
    'source',
    'svg',
    'path',
    'circle',
    'rect',
    'details',
    'summary',
    'sub',
    'sup',
  ],
};

const MAX_HTML_CACHE_ENTRIES = 250;
const compiledHtmlCache = new Map<string, string>();

function compileSanitizedHtml(markdown: string): { ok: true; html: string } | { ok: false } {
  const cached = compiledHtmlCache.get(markdown);
  if (cached !== undefined) {
    return { ok: true, html: cached };
  }

  try {
    const file = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize, readmeSanitizeSchema)
      .use(rehypeStringify)
      .processSync(markdown);

    const html = String(file);
    if (compiledHtmlCache.size >= MAX_HTML_CACHE_ENTRIES) {
      const oldestKey = compiledHtmlCache.keys().next().value;
      if (oldestKey !== undefined) {
        compiledHtmlCache.delete(oldestKey);
      }
    }
    compiledHtmlCache.set(markdown, html);
    return { ok: true, html };
  } catch {
    return { ok: false };
  }
}

function formatImageSourceLabel(src: string): string {
  if (!src) return 'missing image source';
  try {
    if (src.startsWith('/')) {
      return src.length > 44 ? `${src.slice(0, 41)}...` : src;
    }
    const parsed = new URL(src);
    const label = `${parsed.host}${parsed.pathname}`;
    return label.length > 48 ? `${label.slice(0, 45)}...` : label;
  } catch {
    return src.length > 48 ? `${src.slice(0, 45)}...` : src;
  }
}

function isRenderableImageSrc(src?: string): src is string {
  if (!src || typeof src !== 'string') return false;
  const trimmed = src.trim();
  if (!trimmed) return false;
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./')
  );
}

interface ResilientReadmeImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  align?: string;
}

const ResilientReadmeImage: React.FC<ResilientReadmeImageProps> = ({
  src,
  alt,
  width,
  height,
  align,
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const cleanAlt = alt?.trim() || 'README image';
  const validSrc = isRenderableImageSrc(src);

  if (!validSrc || failed) {
    const sourceLabel = formatImageSourceLabel(src?.trim() || '');
    return (
      <span
        role="img"
        aria-label={`${cleanAlt} (unavailable)`}
        data-image-fallback="true"
        data-image-status="unavailable"
        title={src || cleanAlt}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-md border text-[11px] font-mono leading-tight align-middle max-w-full"
        style={{
          backgroundColor: 'var(--rm-fallback-bg, rgba(148, 163, 184, 0.12))',
          borderColor: 'var(--rm-fallback-border, rgba(148, 163, 184, 0.35))',
          color: 'var(--rm-fallback-text, inherit)',
        }}
      >
        <ImageOff className="w-3.5 h-3.5 shrink-0 opacity-75" aria-hidden="true" />
        <span className="truncate font-semibold">{cleanAlt}</span>
        <span className="opacity-65 shrink-0">· unavailable</span>
        {sourceLabel && (
          <span className="hidden sm:inline truncate max-w-[180px] opacity-55">
            ({sourceLabel})
          </span>
        )}
      </span>
    );
  }

  // Preserve explicit pixel/percent height when width is omitted (e.g. height="28" stamps),
  // while keeping responsive max-w-full h-auto aspect ratio preservation.
  const normalizedHeight = height?.trim();
  const normalizedWidth = width?.trim();
  const inlineStyle: React.CSSProperties = {};
  if (normalizedHeight && !normalizedWidth) {
    inlineStyle.height = /^\d+$/.test(normalizedHeight)
      ? `${normalizedHeight}px`
      : normalizedHeight;
    inlineStyle.width = 'auto';
  } else if (normalizedWidth && normalizedWidth.endsWith('%')) {
    inlineStyle.width = normalizedWidth;
  }

  const alignClass =
    align === 'center'
      ? 'mx-auto block'
      : align === 'right'
      ? 'ml-auto block'
      : 'inline-block align-middle';

  return (
    <img
      src={src.trim()}
      alt={cleanAlt}
      width={normalizedWidth}
      height={normalizedHeight}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      className={`max-w-full h-auto rounded-sm ${alignClass}`}
    />
  );
};

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode instanceof Element && domNode.tagName === 'img') {
      const attribs = domNode.attribs || {};
      return (
        <ResilientReadmeImage
          key={attribs.src || attribs.alt}
          src={attribs.src}
          alt={attribs.alt}
          width={attribs.width}
          height={attribs.height}
          align={attribs.align}
        />
      );
    }
    return undefined;
  },
};

function getTypographyClasses(theme: 'light' | 'dark' | undefined, compact: boolean): string {
  const spacing = compact
    ? [
        'text-xs leading-relaxed space-y-2.5',
        '[&_h1]:text-base [&_h1]:font-bold [&_h1]:pb-1.5 [&_h1]:mb-2 [&_h1]:border-b',
        '[&_h2]:text-sm [&_h2]:font-bold [&_h2]:pb-1 [&_h2]:mb-2 [&_h2]:border-b',
        '[&_h3]:text-xs [&_h3]:font-semibold [&_h3]:mb-1.5',
        '[&_p]:my-1.5',
        '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1.5 [&_ul]:space-y-1',
        '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1.5 [&_ol]:space-y-1',
        '[&_li]:list-item',
        '[&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_table]:text-[11px]',
        '[&_th]:px-2 [&_th]:py-1 [&_th]:border [&_th]:font-semibold',
        '[&_td]:px-2 [&_td]:py-1 [&_td]:border',
        '[&_pre]:p-2.5 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-[11px] [&_pre]:font-mono [&_pre]:my-2',
        '[&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[11px] [&_code]:font-mono',
        '[&_pre_code]:p-0 [&_pre_code]:bg-transparent',
        '[&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2',
        '[&_hr]:my-3',
      ]
    : [
        'text-sm leading-relaxed space-y-4',
        '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:pb-2 [&_h1]:mb-3 [&_h1]:border-b',
        '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:pb-1.5 [&_h2]:mb-2.5 [&_h2]:border-b',
        '[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2',
        '[&_p]:my-2',
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2.5 [&_ul]:space-y-1.5',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2.5 [&_ol]:space-y-1.5',
        '[&_li]:list-item',
        '[&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_table]:text-xs',
        '[&_th]:px-3 [&_th]:py-2 [&_th]:border [&_th]:font-semibold',
        '[&_td]:px-3 [&_td]:py-2 [&_td]:border',
        '[&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:font-mono [&_pre]:my-3',
        '[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono',
        '[&_pre_code]:p-0 [&_pre_code]:bg-transparent',
        '[&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3',
        '[&_hr]:my-5',
      ];

  const themeClasses =
    theme === 'light'
      ? [
          'text-[#0f172a]',
          '[&_h1]:text-[#0f172a] [&_h1]:border-slate-200',
          '[&_h2]:text-[#0f172a] [&_h2]:border-slate-200',
          '[&_h3]:text-[#1e293b]',
          '[&_a]:text-[#0284c7] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#0369a1]',
          '[&_th]:bg-[#f8fafc] [&_th]:border-slate-300 [&_th]:text-[#0f172a]',
          '[&_td]:border-slate-200',
          '[&_pre]:bg-[#f8fafc] [&_pre]:text-[#1e293b] [&_pre]:border [&_pre]:border-slate-200',
          '[&_code]:bg-slate-100 [&_code]:text-[#0f172a]',
          '[&_blockquote]:border-slate-300 [&_blockquote]:text-slate-600',
          '[&_hr]:border-slate-200',
          '[&_sub]:text-slate-500',
        ]
      : theme === 'dark'
      ? [
          'text-slate-100',
          '[&_h1]:text-slate-50 [&_h1]:border-slate-700',
          '[&_h2]:text-slate-50 [&_h2]:border-slate-700',
          '[&_h3]:text-slate-100',
          '[&_a]:text-sky-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-sky-300',
          '[&_th]:bg-[#1e293b] [&_th]:border-slate-700 [&_th]:text-slate-100',
          '[&_td]:border-slate-700/80',
          '[&_pre]:bg-[#1e293b] [&_pre]:text-slate-100 [&_pre]:border [&_pre]:border-slate-700',
          '[&_code]:bg-slate-800 [&_code]:text-slate-100',
          '[&_blockquote]:border-slate-600 [&_blockquote]:text-slate-300',
          '[&_hr]:border-slate-700',
          '[&_sub]:text-slate-400',
        ]
      : [
          'text-slate-900 dark:text-slate-100',
          '[&_h1]:text-slate-900 dark:[&_h1]:text-slate-50 [&_h1]:border-slate-200 dark:[&_h1]:border-slate-700',
          '[&_h2]:text-slate-900 dark:[&_h2]:text-slate-50 [&_h2]:border-slate-200 dark:[&_h2]:border-slate-700',
          '[&_h3]:text-slate-800 dark:[&_h3]:text-slate-100',
          '[&_a]:text-sky-600 dark:[&_a]:text-sky-400 [&_a]:underline [&_a]:underline-offset-2',
          '[&_th]:bg-slate-50 dark:[&_th]:bg-slate-800 [&_th]:border-slate-300 dark:[&_th]:border-slate-700',
          '[&_td]:border-slate-200 dark:[&_td]:border-slate-700/80',
          '[&_pre]:bg-slate-100 dark:[&_pre]:bg-slate-800 [&_pre]:text-slate-900 dark:[&_pre]:text-slate-100 [&_pre]:border [&_pre]:border-slate-200 dark:[&_pre]:border-slate-700',
          '[&_code]:bg-slate-100 dark:[&_code]:bg-slate-800 [&_code]:text-slate-900 dark:[&_code]:text-slate-100',
          '[&_blockquote]:border-slate-300 dark:[&_blockquote]:border-slate-600 [&_blockquote]:text-slate-600 dark:[&_blockquote]:text-slate-300',
          '[&_hr]:border-slate-200 dark:[&_hr]:border-slate-700',
          '[&_sub]:text-slate-500 dark:[&_sub]:text-slate-400',
        ];

  return [...spacing, ...themeClasses, '[&_div[align="center"]]:text-center [&_p[align="center"]]:text-center [&_div[align="right"]]:text-right [&_p[align="right"]]:text-right [&_img]:inline-block [&_picture]:inline-block'].join(' ');
}

const ReadmeMarkdownRendererImpl: React.FC<ReadmeMarkdownRendererProps> = ({
  markdown,
  theme,
  compact = false,
  className = '',
}) => {
  const safeMarkdown = typeof markdown === 'string' ? markdown : '';

  const compiled = useMemo(() => {
    if (!safeMarkdown.trim()) {
      return null;
    }
    const result = compileSanitizedHtml(safeMarkdown);
    if (!result.ok) {
      return (
        <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed opacity-85">
          {safeMarkdown}
        </pre>
      );
    }
    try {
      return parse(result.html, parserOptions);
    } catch {
      return (
        <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed opacity-85">
          {safeMarkdown}
        </pre>
      );
    }
  }, [safeMarkdown]);

  const fallbackVars =
    theme === 'light'
      ? ({
          '--rm-fallback-bg': '#f8fafc',
          '--rm-fallback-border': '#cbd5e1',
          '--rm-fallback-text': '#334155',
        } as React.CSSProperties)
      : theme === 'dark'
      ? ({
          '--rm-fallback-bg': '#1e293b',
          '--rm-fallback-border': '#475569',
          '--rm-fallback-text': '#cbd5e1',
        } as React.CSSProperties)
      : undefined;

  if (!safeMarkdown.trim()) {
    return (
      <div
        data-testid="readme-markdown-empty"
        className={`font-mono text-xs opacity-65 italic ${className}`}
      >
        No README content generated yet.
      </div>
    );
  }

  return (
    <div
      data-testid="readme-markdown-renderer"
      data-readme-theme={theme || 'auto'}
      style={fallbackVars}
      className={`markdown-body max-w-none break-words overflow-x-auto ${getTypographyClasses(
        theme,
        compact
      )} ${className}`}
    >
      {compiled}
    </div>
  );
};

export const ReadmeMarkdownRenderer = memo(ReadmeMarkdownRendererImpl);
export default ReadmeMarkdownRenderer;
