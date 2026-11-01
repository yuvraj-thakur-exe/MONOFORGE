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
import { Menu, Search, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

interface DocsLayoutProps {
  currentDoc: DocItem;
}

export function DocsLayout({ currentDoc }: DocsLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

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
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-[#ffe600] selection:text-slate-950">
      {/* Top Navigation */}
      <TopNav />

      {/* Mobile Docs Sub-header Bar */}
      <div className="lg:hidden sticky top-14 z-30 flex items-center justify-between px-4 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold"
        >
          <Menu className="w-4 h-4" />
          <span>Documentation Menu</span>
        </button>

        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
        </button>
      </div>

      {/* Main Documentation Body */}
      <div className="flex-1 max-w-[1720px] w-full mx-auto flex relative">
        {/* Ambient background glow */}
        <div className="absolute top-10 right-1/4 w-[500px] h-[300px] bg-amber-400/[0.04] dark:bg-amber-400/[0.05] rounded-full blur-3xl pointer-events-none" />

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
          <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                {currentDoc.category}
              </span>
              {currentDoc.badge && (
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  {currentDoc.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              {currentDoc.title}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {currentDoc.description}
            </p>
          </div>

          {/* Main Markdown Body Content */}
          <article className="prose dark:prose-invert max-w-none">
            <DocsContentRenderer content={currentDoc.content} />
          </article>

          {/* Was this helpful feedback bar */}
          <div className="my-10 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">
                Was this documentation page helpful?
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Help us refine our technical guides and architecture specifications.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {feedback ? (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thanks for your feedback!</span>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setFeedback('yes')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Yes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedback('no')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
                    <span>No</span>
                  </button>
                </>
              )}
            </div>
          </div>

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
