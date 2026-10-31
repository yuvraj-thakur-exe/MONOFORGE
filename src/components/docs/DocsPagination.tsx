'use client';

import { Link } from '#/i18n/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DocItem } from '#/content/docs/docs-data';

interface DocsPaginationProps {
  prev?: DocItem;
  next?: DocItem;
}

export function DocsPagination({ prev, next }: DocsPaginationProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="flex flex-col p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-400/50 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all shadow-xs group"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 mb-1 group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-3.5 h-3.5 text-amber-500" />
            <span>Previous Chapter</span>
          </span>
          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="flex flex-col items-end p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-400/50 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-right shadow-xs group sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 mb-1 group-hover:translate-x-1 transition-transform">
            <span>Next Chapter</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
          </span>
          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
            {next.title}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
