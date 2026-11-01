'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import type { TemplateItem } from '#/lib/templates/catalog';
import { useReadmeStore } from '#/store/useReadmeStore';
import confetti from 'canvas-confetti';
import { X, ArrowRight } from 'lucide-react';
import { playClickSound } from '#/lib/sound/sound-effects';

interface TemplateCompareModalProps {
  templates: TemplateItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (tmpl: TemplateItem) => void;
}

export const TemplateCompareModal: React.FC<TemplateCompareModalProps> = ({
  templates,
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  if (!isOpen || templates.length === 0 || typeof document === 'undefined') return null;

  const handleApply = (tmpl: TemplateItem) => {
    playClickSound();
    setEntireConfig(tmpl.config);
    onSelectTemplate(tmpl);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } catch {
      // Ignored
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-[#0f172a] border-2 border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 shadow-2xl">
        {/* Top Accent Strip */}
        <div className="h-2 w-full shrink-0 bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#ffe600] text-slate-950 flex items-center justify-center border-2 border-slate-900 shadow-2xs font-black text-sm">
              ⚖️
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase font-sans tracking-tight">
                Archetype Comparison Matrix
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                Compare architecture, included plugins, difficulty, and visual identity side-by-side.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors cursor-pointer"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className={`grid grid-cols-1 md:grid-cols-${templates.length} gap-4 sm:gap-6`}>
            {templates.map(tmpl => {
              const sections = tmpl.config.sections;
              const uniqueModules = Array.from(new Set(sections.map(s => s.type)));

              return (
                <div
                  key={tmpl.id}
                  className="rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-5 flex flex-col justify-between space-y-5 shadow-xs"
                >
                  <div className="space-y-4">
                    {/* Header Pill */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md font-black border bg-[#ffe600] text-slate-950 border-slate-900 shadow-2xs">
                        {tmpl.category}
                      </span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tmpl.accent }} />
                        <span className="text-[10px] font-mono font-bold">{tmpl.accent}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase font-sans tracking-tight">
                        {tmpl.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-mono mt-1 line-clamp-2">
                        {tmpl.description}
                      </p>
                    </div>

                    {/* Metadata Table */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500">Visual Theme:</span>
                        <span className="font-bold capitalize">{tmpl.config.settings.theme}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500">Alignment:</span>
                        <span className="font-bold capitalize">{tmpl.config.settings.align}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500">Difficulty:</span>
                        <span className="font-bold capitalize text-amber-600 dark:text-amber-400">
                          {tmpl.difficulty || 'Intermediate'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500">Active Sections:</span>
                        <span className="font-black text-emerald-600 dark:text-emerald-400">
                          {sections.length} Components
                        </span>
                      </div>
                    </div>

                    {/* Module Badges */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                        Included Plugins:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {uniqueModules.slice(0, 8).map(mod => (
                          <span
                            key={mod}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {mod}
                          </span>
                        ))}
                        {uniqueModules.length > 8 && (
                          <span className="text-[10px] font-mono text-slate-500">
                            +{uniqueModules.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Apply Action */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleApply(tmpl)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 text-xs font-mono font-black border-2 border-slate-950 shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Apply Archetype</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500">
          <span>Comparing {templates.length} of 3 maximum selected archetypes.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
