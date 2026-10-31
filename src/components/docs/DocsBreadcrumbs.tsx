'use client';

import { Link } from '#/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface DocsBreadcrumbsProps {
  category: string;
  title: string;
}

export function DocsBreadcrumbs({ category, title }: DocsBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mb-6">
      <Link
        href="/docs"
        className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Docs</span>
      </Link>
      <ChevronRight className="w-3 h-3 text-neutral-400" />
      <span className="text-neutral-600 dark:text-neutral-400">{category}</span>
      <ChevronRight className="w-3 h-3 text-neutral-400" />
      <span className="font-bold text-neutral-950 dark:text-white truncate">{title}</span>
    </nav>
  );
}
