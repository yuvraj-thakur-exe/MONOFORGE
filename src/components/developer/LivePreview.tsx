'use client';

import React, { useState, useMemo } from 'react';
import parse from 'html-react-parser';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { Copy, Check, Eye, Code, Monitor, Tablet, Smartphone, Terminal, Sparkles } from 'lucide-react';

const sanitizeSchema = {
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
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'picture',
    'source',
    'svg',
    'path',
    'circle',
    'rect',
  ],
};

interface LivePreviewProps {
  className?: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ className = '' }) => {
  const config = useReadmeStore(state => state.config);
  const [tab, setTab] = useState<'preview' | 'raw'>('preview');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile' | 'crt'>('desktop');
  const [copied, setCopied] = useState<boolean>(false);

  const accentColor = config.settings?.accentColor || '#ffe600';

  const markdown = useMemo(() => {
    try {
      return buildMarkdown(config);
    } catch {
      return '<!-- Error generating markdown from configuration -->';
    }
  }, [config]);

  const renderedContent = useMemo(() => {
    try {
      const file = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize, sanitizeSchema)
        .use(rehypeStringify)
        .processSync(markdown);
      return parse(String(file));
    } catch {
      return (
        <pre className="font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
          {markdown}
        </pre>
      );
    }
  }, [markdown]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lineCount = markdown.split('\n').length;
  const charCount = markdown.length;

  const rawUser = config.settings?.user?.github?.trim().toLowerCase();
  const isPlaceholder = !rawUser || rawUser === 'username' || rawUser === 'zusername' || rawUser === 'your-username';

  return (
    <div
      className={`flex flex-col h-full bg-white dark:bg-[#1e293b] rounded-2xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden shadow-[4px_4px_0px_#334155] dark:shadow-[4px_4px_0px_#0f172a] transition-colors ${className}`}
    >
      {/* Dynamic Accent Color Banner */}
      <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: accentColor }} />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/90 border-b-2 border-slate-300 dark:border-slate-700 text-xs gap-2">
        <div className="flex items-center gap-2">
          {/* Rendered vs Raw Markdown */}
          <div className="flex items-center bg-slate-200/70 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-300 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setTab('preview')}
              style={
                tab === 'preview'
                  ? { backgroundColor: accentColor, color: '#0f172a' }
                  : undefined
              }
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                tab === 'preview'
                  ? 'font-black border border-slate-900 shadow-2xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> RENDERED
            </button>
            <button
              type="button"
              onClick={() => setTab('raw')}
              style={
                tab === 'raw'
                  ? { backgroundColor: accentColor, color: '#0f172a' }
                  : undefined
              }
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                tab === 'raw'
                  ? 'font-black border border-slate-900 shadow-2xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> RAW MD
            </button>
          </div>

          {/* Viewport Frame Switcher */}
          {tab === 'preview' && (
            <div className="hidden sm:flex items-center bg-white dark:bg-slate-900 rounded-lg p-0.5 border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  viewMode === 'desktop'
                    ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold'
                    : 'hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Desktop View"
                aria-label="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('tablet')}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  viewMode === 'tablet'
                    ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold'
                    : 'hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Tablet View (768px)"
                aria-label="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 font-bold'
                    : 'hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Mobile View"
                aria-label="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('crt')}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  viewMode === 'crt'
                    ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Cyber CRT View"
                aria-label="Cyber CRT View"
              >
                <Terminal className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <span
              className="w-2.5 h-2.5 rounded-full border border-slate-900 dark:border-slate-600 shadow-2xs"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
              {accentColor}
            </span>
          </div>

          <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] hidden sm:inline">
            {lineCount} lines · {charCount} chars
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#ffe600] hover:bg-[#ffdf00] text-slate-950 border border-slate-900 text-xs font-mono font-black transition-all shadow-2xs active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            title="Copy markdown to clipboard"
            aria-label="Copy markdown"
          >
            {copied ? (
              <Check className="w-3 h-3 text-slate-950" />
            ) : (
              <Copy className="w-3 h-3 text-slate-950" />
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-slate-100/70 dark:bg-[#0f172a] flex justify-center transition-colors">
        {tab === 'raw' ? (
          <pre className="w-full font-mono text-xs text-slate-100 bg-[#0a0f1d] p-5 rounded-2xl border-2 border-slate-800 shadow-lg whitespace-pre-wrap break-words leading-relaxed select-all">
            {markdown}
          </pre>
        ) : (
          <div
            className={`w-full transition-all duration-300 ${
              viewMode === 'mobile'
                ? 'max-w-[390px] border-4 border-slate-300 dark:border-slate-700 rounded-3xl p-3 bg-white dark:bg-[#1e293b] shadow-2xl my-2'
                : viewMode === 'tablet'
                ? 'max-w-[768px] border-4 border-slate-300 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-[#1e293b] shadow-xl my-2'
                : viewMode === 'crt'
                ? 'max-w-4xl border-2 border-emerald-500/40 rounded-xl p-4 bg-[#0a100d] text-emerald-300 font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)] scanline-overlay'
                : 'max-w-4xl'
            }`}
          >
            {isPlaceholder && (
              <div className="mb-3 px-3 py-2 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2 font-mono">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  Using demo preview (<strong>octocat</strong>). Set{' '}
                  <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded text-amber-950 dark:text-amber-200">
                    settings.user.github
                  </code>{' '}
                  to your handle to generate real telemetry!
                </span>
              </div>
            )}

            <div
              className="p-5 sm:p-8 bg-white dark:bg-[#1e293b] rounded-2xl border-2 border-slate-300 dark:border-slate-700 space-y-5 shadow-[4px_4px_0px_#334155] dark:shadow-[4px_4px_0px_#000000] transition-colors"
              style={{
                boxShadow: `0 0 0 1px ${accentColor}25, 4px 4px 0px #334155`,
              }}
            >
              {/* macOS Style GitHub File Window Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 dark:border-slate-700 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444] border border-slate-900" />
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b] border border-slate-900" />
                  <span className="w-3 h-3 rounded-full bg-[#10b981] border border-slate-900" />
                  <span
                    className="ml-2 font-mono text-xs font-black px-2.5 py-0.5 rounded-md border border-slate-900 shadow-2xs"
                    style={{ backgroundColor: accentColor, color: '#0f172a' }}
                  >
                    README.md
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold hidden sm:inline">
                    github.com/{rawUser || 'developer'}/{rawUser || 'developer'}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-mono text-[10px] font-black flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>● 60FPS CAMO SAFE</span>
                </span>
              </div>

              {/* Rendered Markdown Body */}
              <div className="markdown-body prose prose-slate dark:prose-invert max-w-none text-slate-900 dark:text-slate-100 text-sm leading-relaxed overflow-x-auto">
                {renderedContent}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
