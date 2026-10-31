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
    <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="flex flex-col p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900/40 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all group"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mb-1 group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </span>
          <span className="font-bold text-sm text-neutral-950 dark:text-white truncate">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="flex flex-col items-end p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900/40 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all text-right group sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mb-1 group-hover:translate-x-1 transition-transform">
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="font-bold text-sm text-neutral-950 dark:text-white truncate">
            {next.title}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
