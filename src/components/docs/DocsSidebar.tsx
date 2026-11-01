'use client';

import { Link, usePathname } from '#/i18n/navigation';
import { DocCategory } from '#/content/docs/docs-data';
import {
  Search,
  ChevronRight,
  ExternalLink,
  Github,
  BookOpen,
} from 'lucide-react';

interface DocsSidebarProps {
  navigation: DocCategory[];
  onOpenSearch: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function DocsSidebar({
  navigation,
  onOpenSearch,
  isOpenMobile = false,
  onCloseMobile,
}: DocsSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full font-sans text-xs">
      {/* Search Trigger Button */}
      <div className="p-3 border-b border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 transition-all cursor-pointer font-mono text-xs shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search docs...</span>
          </span>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar">
        {navigation.map((category) => (
          <div key={category.name} className="space-y-1.5">
            <h3 className="px-2 font-mono font-bold uppercase tracking-wider text-[11px] text-slate-400 dark:text-slate-500">
              {category.name}
            </h3>
            <ul className="space-y-0.5">
              {category.items.map((item) => {
                const href = `/docs/${item.slug}`;
                const isActive = pathname?.includes(item.slug);

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium transition-all group ${
                        isActive
                          ? 'bg-amber-400/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-400/30 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold shrink-0 ml-1.5 ${
                            isActive
                              ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Sidebar Footer Links */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-1 font-mono text-[11px]">
        <Link
          href="/docs"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>Documentation Index</span>
          </span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </Link>
        <a
          href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200/80 dark:border-slate-800 sticky top-14 h-[calc(100vh-3.5rem)] bg-[#fafbfc]/80 dark:bg-[#0c0f17]/80 backdrop-blur-md">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
