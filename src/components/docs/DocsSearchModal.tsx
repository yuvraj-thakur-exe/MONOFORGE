'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from '#/i18n/navigation';
import { Search, X, BookOpen, CornerDownLeft } from 'lucide-react';
import { searchDocs, DocItem } from '#/content/docs/docs-data';

interface DocsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSearchModal({ isOpen, onClose }: DocsSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DocItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    const found = searchDocs(query);
    setResults(found);
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (doc: DocItem) => {
    onClose();
    router.push(`/docs/${doc.slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60">
          <Search className="w-5 h-5 text-amber-500 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, guides, and reference..."
            className="w-full bg-transparent text-sm font-sans text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[50vh] scrollbar">
          {query.trim() === '' ? (
            <div className="py-12 text-center font-mono text-xs text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-500" />
              <span>Type keywords to search documentation (e.g. "pnpm", "camo", "cli", "telemetry")</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-slate-500">
              <span>No documentation matching "{query}"</span>
            </div>
          ) : (
            results.map((doc, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  type="button"
                  key={doc.slug}
                  onClick={() => handleSelect(doc)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/15 text-amber-900 dark:text-amber-200 border border-amber-400/40 shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {doc.category}
                      </span>
                      <h4 className="font-bold text-xs truncate font-sans">
                        {doc.title}
                      </h4>
                    </div>
                    <p className={`text-[11px] line-clamp-1 ${
                      isSelected ? 'text-amber-800 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {doc.description}
                    </p>
                  </div>
                  <CornerDownLeft className={`w-3.5 h-3.5 shrink-0 mt-1 ${
                    isSelected ? 'opacity-100 text-amber-600 dark:text-amber-400' : 'opacity-0'
                  }`} />
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>Navigate: <kbd className="font-bold">↑</kbd> <kbd className="font-bold">↓</kbd></span>
            <span>Select: <kbd className="font-bold">↵</kbd></span>
          </div>
          <span>MonoForge Documentation</span>
        </div>
      </div>
    </div>
  );
}
