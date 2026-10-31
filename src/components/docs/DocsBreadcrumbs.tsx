'use client';

import { Link } from '#/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface DocsBreadcrumbsProps {
  category: string;
  title: string;
}

export function DocsBreadcrumbs({ category, title }: DocsBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-6">
      <Link
        href="/docs"
        className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Docs</span>
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
      <span className="text-slate-500 dark:text-slate-400">{category}</span>
      <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
      <span className="font-bold text-slate-900 dark:text-white truncate">{title}</span>
    </nav>
  );
}
