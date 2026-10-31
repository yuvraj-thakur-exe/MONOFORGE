'use client';

import { Link, usePathname } from '#/i18n/navigation';
import { DocCategory } from '#/content/docs/docs-data';
import {
  Search,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Github,
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
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700/80 transition-all cursor-pointer font-mono text-xs"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search docs...</span>
          </span>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigation.map((category) => (
          <div key={category.name} className="space-y-1.5">
            <h3 className="px-2 font-mono font-bold uppercase tracking-wider text-[11px] text-neutral-500 dark:text-neutral-400">
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
                          ? 'bg-[#ffe600] text-neutral-950 font-bold shadow-2xs'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold shrink-0 ml-1.5 ${
                            isActive
                              ? 'bg-neutral-950 text-white'
                              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700'
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
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-1.5 font-mono text-[11px]">
        <Link
          href="/developer"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Open Studio</span>
          </span>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
        </Link>
        <a
          href="https://github.com/monoforge/MONOFORGE"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <span className="flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repo</span>
          </span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-neutral-200 dark:border-neutral-800 sticky top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-[#0c0d0e]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#0c0d0e] border-r border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
