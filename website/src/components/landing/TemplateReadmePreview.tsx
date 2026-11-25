'use client';

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { ReadmeConfig } from '#/lib/plugins/types';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { copyToClipboard, downloadTextFile } from '#/lib/export/clipboard';
import { ReadmeMarkdownRenderer } from '#/components/common/ReadmeMarkdownRenderer';
import { FileText, Copy, Check, Download, AlertCircle } from 'lucide-react';

export interface TemplateReadmePreviewProps {
  config: ReadmeConfig;
  templateName: string;
  mode?: 'compact' | 'full';
  device?: 'desktop' | 'tablet' | 'mobile';
  theme?: 'light' | 'dark';
  showToolbar?: boolean;
  className?: string;
}

const DEVICE_CONTAINER_CLASSES: Record<'desktop' | 'tablet' | 'mobile', string> = {
  desktop: 'max-w-full',
  tablet: 'max-w-[768px] mx-auto',
  mobile: 'max-w-[390px] mx-auto',
};

const TemplateReadmePreviewImpl: React.FC<TemplateReadmePreviewProps> = ({
  config,
  templateName,
  mode = 'compact',
  device = 'desktop',
  theme,
  showToolbar = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => mode === 'full');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (mode === 'full') {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    if (isVisible) return;

    const node = containerRef.current;
    if (!node) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mode, isVisible]);

  const { markdown, hasError } = useMemo(() => {
    if (!config || typeof config !== 'object' || !config.settings) {
      return { markdown: '', hasError: true };
    }
    try {
      const output = buildMarkdown(config);
      return { markdown: output, hasError: false };
    } catch {
      return { markdown: '', hasError: true };
    }
  }, [config]);

  const resolvedTheme: 'light' | 'dark' =
    theme ?? (config?.settings?.theme === 'light' ? 'light' : 'dark');

  const isLight = resolvedTheme === 'light';
  const rawHandle = config?.settings?.user?.github?.trim() || 'octocat';
  const lineCount = markdown ? markdown.split('\n').length : 0;

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!markdown) return;
    const result = await copyToClipboard(markdown);
    if (result.ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!markdown) return;
    downloadTextFile('README.md', markdown);
  };

  const frameSurface = isLight
    ? 'bg-[#ffffff] border-slate-200 text-[#0f172a]'
    : 'bg-[#0f172a] border-slate-700/80 text-slate-100';

  const headerSurface = isLight
    ? 'bg-[#f8fafc] border-slate-200 text-slate-700'
    : 'bg-[#1e293b] border-slate-700/80 text-slate-200';

  const fadeGradient = isLight
    ? 'from-[#ffffff] via-[#ffffff]/80 to-transparent'
    : 'from-[#0f172a] via-[#0f172a]/80 to-transparent';

  const widthConstraint = mode === 'full' ? DEVICE_CONTAINER_CLASSES[device] : 'max-w-full';

  return (
    <div
      ref={containerRef}
      data-testid="template-readme-preview"
      data-preview-mode={mode}
      data-preview-device={device}
      data-preview-theme={resolvedTheme}
      className={`w-full ${widthConstraint} rounded-xl border overflow-hidden transition-colors ${frameSurface} ${className}`}
    >
      {/* Subtle GitHub-style README.md File Header */}
      <div
        className={`flex items-center justify-between gap-2 px-3 py-2 border-b text-[11px] font-mono ${headerSurface}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <FileText
            className={`w-3.5 h-3.5 shrink-0 ${
              isLight ? 'text-slate-500' : 'text-amber-400'
            }`}
            aria-hidden="true"
          />
          <span className="font-bold tracking-tight truncate">README.md</span>
          <span className="hidden sm:inline opacity-60 truncate">
            {rawHandle}/{rawHandle}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {showToolbar && markdown && (
            <>
              <span className="hidden sm:inline text-[10px] opacity-65 mr-1">
                {lineCount} lines
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                }`}
                aria-label={`Copy ${templateName} markdown`}
                title="Copy Markdown"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                }`}
                aria-label={`Download ${templateName} README.md`}
                title="Download README.md"
              >
                <Download className="w-3 h-3" />
                <span>.md</span>
              </button>
            </>
          )}
          {!showToolbar && (
            <span className="text-[10px] opacity-60 truncate max-w-[140px]">
              {templateName}
            </span>
          )}
        </div>
      </div>

      {/* Preview Body */}
      {hasError || !markdown.trim() ? (
        <div
          data-testid="template-readme-preview-empty"
          className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center font-mono text-xs opacity-75"
        >
          <AlertCircle className="w-4 h-4 text-amber-500" aria-hidden="true" />
          <span>
            {hasError
              ? `Unable to compile README preview for "${templateName}".`
              : `No README sections configured for "${templateName}".`}
          </span>
        </div>
      ) : mode === 'compact' ? (
        <div className="relative">
          <div
            data-testid="template-readme-compact-viewport"
            className="h-[260px] overflow-y-auto scrollbar px-3.5 py-3"
          >
            {isVisible ? (
              <ReadmeMarkdownRenderer
                markdown={markdown}
                theme={resolvedTheme}
                compact
              />
            ) : (
              <div
                data-testid="template-readme-lazy-placeholder"
                className="space-y-2.5 animate-pulse py-2"
              >
                <div className="h-4 w-2/3 rounded bg-slate-500/20" />
                <div className="h-3 w-full rounded bg-slate-500/15" />
                <div className="h-3 w-5/6 rounded bg-slate-500/15" />
                <div className="h-20 w-full rounded-lg bg-slate-500/15 mt-3" />
              </div>
            )}
          </div>
          <div
            aria-hidden="true"
            className={`pointer-events-none sticky bottom-0 h-8 -mt-8 bg-gradient-to-t ${fadeGradient}`}
          />
        </div>
      ) : (
        <div
          data-testid="template-readme-full-viewport"
          className={device === 'mobile' ? 'p-3.5' : device === 'tablet' ? 'p-5' : 'p-6 sm:p-8'}
        >
          <ReadmeMarkdownRenderer markdown={markdown} theme={resolvedTheme} />
        </div>
      )}
    </div>
  );
};

export const TemplateReadmePreview = memo(TemplateReadmePreviewImpl);
export default TemplateReadmePreview;
