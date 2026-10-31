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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#141517] rounded-2xl border-2 border-neutral-900 shadow-[6px_6px_0px_#18181b] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b-2 border-neutral-900 bg-neutral-50 dark:bg-[#18191c]">
          <Search className="w-5 h-5 text-neutral-500 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, guides, and reference..."
            className="w-full bg-transparent text-sm font-sans text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-mono font-bold bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded border border-neutral-300 dark:border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/60 max-h-[50vh]">
          {query.trim() === '' ? (
            <div className="py-12 text-center font-mono text-xs text-neutral-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-neutral-400" />
              <span>Type keywords to search documentation (e.g. "pnpm", "camo", "cli", "telemetry")</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-neutral-500">
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
                      ? 'bg-[#ffe600] text-neutral-950 font-medium'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                        isSelected ? 'bg-neutral-950 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {doc.category}
                      </span>
                      <h4 className="font-bold text-xs truncate font-sans">
                        {doc.title}
                      </h4>
                    </div>
                    <p className={`text-[11px] line-clamp-1 ${
                      isSelected ? 'text-neutral-800' : 'text-neutral-500 dark:text-neutral-400'
                    }`}>
                      {doc.description}
                    </p>
                  </div>
                  <CornerDownLeft className={`w-3.5 h-3.5 shrink-0 mt-1 ${
                    isSelected ? 'opacity-100 text-neutral-950' : 'opacity-0'
                  }`} />
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#18191c] flex items-center justify-between text-[11px] font-mono text-neutral-500">
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
