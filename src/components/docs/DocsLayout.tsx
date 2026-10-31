'use client';

import { useState, useEffect } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { DocsSidebar } from './DocsSidebar';
import { DocsBreadcrumbs } from './DocsBreadcrumbs';
import { DocsTableOfContents } from './DocsTableOfContents';
import { DocsPagination } from './DocsPagination';
import { DocsSearchModal } from './DocsSearchModal';
import { DocsContentRenderer } from './DocsContentRenderer';
import { DocItem, getDocsNavigation, getAllDocs } from '#/content/docs/docs-data';
import { Menu, Search } from 'lucide-react';

interface DocsLayoutProps {
  currentDoc: DocItem;
}

export function DocsLayout({ currentDoc }: DocsLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = getDocsNavigation();
  const allDocs = getAllDocs();

  // Find previous and next documents
  const currentIndex = allDocs.findIndex((d) => d.slug === currentDoc.slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : undefined;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : undefined;

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0d0e] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <TopNav />

      {/* Mobile Docs Sub-header Bar */}
      <div className="lg:hidden sticky top-14 z-30 flex items-center justify-between px-4 py-2.5 bg-neutral-100 dark:bg-[#141517] border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-bold"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
        </button>
      </div>

      {/* Main Documentation Body */}
      <div className="flex-1 max-w-[1720px] w-full mx-auto flex">
        {/* Left Sidebar */}
        <DocsSidebar
          navigation={navigation}
          onOpenSearch={() => setIsSearchOpen(true)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Central Article Container */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <DocsBreadcrumbs
            category={currentDoc.category}
            title={currentDoc.title}
          />

          {/* Doc Header */}
          <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 border border-neutral-900">
                {currentDoc.category}
              </span>
              {currentDoc.badge && (
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-400 text-neutral-950 border border-neutral-900">
                  {currentDoc.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white font-sans">
              {currentDoc.title}
            </h1>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              {currentDoc.description}
            </p>
          </div>

          {/* Main Markdown Body Content */}
          <article className="prose dark:prose-invert max-w-none">
            <DocsContentRenderer content={currentDoc.content} />
          </article>

          {/* Previous / Next Article Pagination */}
          <DocsPagination prev={prevDoc} next={nextDoc} />
        </main>

        {/* Right Table of Contents */}
        <DocsTableOfContents headings={currentDoc.headings} />
      </div>

      {/* Client-side Search Modal */}
      <DocsSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
