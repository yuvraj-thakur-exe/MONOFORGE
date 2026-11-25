'use client';

import { useRef, useEffect, useMemo } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { downloadTextFile } from '#/lib/export/clipboard';
import { ReadmeMarkdownRenderer } from '#/components/common/ReadmeMarkdownRenderer';
import { Eye, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CopyButton } from '#/components/common/CopyButton';

export function LivePreviewPane() {
  const config = useReadmeStore(state => state.config);
  const containerRef = useRef<HTMLDivElement>(null);

  const markdown = useMemo(() => {
    try {
      return buildMarkdown(config);
    } catch {
      return '<!-- Error generating markdown from configuration -->';
    }
  }, [config]);

  useEffect(() => {
    if (containerRef.current) {
      autoAnimate(containerRef.current);
    }
  }, []);

  const handleDownload = () => {
    const result = downloadTextFile('README.md', markdown);
    if (result.ok) {
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch {
        // Ignore confetti errors in headless or test environments
      }
    }
  };

  const rawUser = config.settings?.user?.github?.trim().toLowerCase();
  const isPlaceholder =
    !rawUser || rawUser === 'username' || rawUser === 'zusername' || rawUser === 'your-username';

  return (
    <div className="flex flex-col h-full rounded-xl border border-palette-line bg-palette-base shadow-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-palette-line bg-palette-soft/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-palette-contrast">
            Live Preview
          </span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/10 text-amber-500 font-mono">
            {config.sections.length} sections
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-palette-base border border-palette-line hover:border-amber-500/50 text-palette-contrast transition-all"
            title="Download README.md"
            aria-label="Download README.md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.md</span>
          </button>

          <CopyButton
            textToCopy={markdown}
            label="Copy"
            copiedLabel="Copied!"
            variant="primary"
            size="xs"
            className="rounded-lg shadow-sm"
          />
        </div>
      </div>

      {isPlaceholder && (
        <div className="mx-4 mt-3 mb-1 px-3 py-2 rounded-lg bg-violet-950/40 border border-violet-800/40 text-[11px] text-amber-600 dark:text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
          <span>
            Previewing with active demo account (<strong>octocat</strong>). Set your GitHub username
            in step 1 to see your real personal trophies and stats!
          </span>
        </div>
      )}

      {/* Rendered Preview Body */}
      <div
        ref={containerRef}
        className="flex-1 p-6 overflow-y-auto scrollbar bg-palette-base text-palette-contrast"
      >
        <ReadmeMarkdownRenderer markdown={markdown} />
      </div>
    </div>
  );
}
