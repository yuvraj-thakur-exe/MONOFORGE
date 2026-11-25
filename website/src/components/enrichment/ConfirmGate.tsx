'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ShieldCheck, Check, X, Sparkles } from 'lucide-react';

export interface ProposedEnrichmentItem {
  id: string;
  field: string;
  label: string;
  currentValue: string | string[];
  proposedValue: string | string[];
  category: 'identity' | 'skills' | 'projects' | 'bio' | 'socials';
  confidence?: 'high' | 'medium' | 'low';
  evidence?: string;
}

interface ConfirmGateProps {
  items: ProposedEnrichmentItem[];
  onComplete: () => void;
  onCancel: () => void;
}

export const ConfirmGate: React.FC<ConfirmGateProps> = ({
  items,
  onComplete,
  onCancel,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(items.map(i => i.id))
  );
  const [editedValues, setEditedValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const item of items) {
      initial[item.id] = Array.isArray(item.proposedValue)
        ? item.proposedValue.join(', ')
        : String(item.proposedValue);
    }
    return initial;
  });

  const updateSettings = useReadmeStore(state => state.updateSettings);
  const addSection = useReadmeStore(state => state.addSection);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleApply = () => {
    const accepted = items.filter(i => selectedIds.has(i.id));

    // Explicit confirmation gate: only write confirmed items
    for (const item of accepted) {
      const rawValue = editedValues[item.id] ?? item.proposedValue;
      const finalValue = Array.isArray(rawValue) ? rawValue.join(', ') : String(rawValue);

      if (item.field === 'user.name') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, name: finalValue },
        }));
      } else if (item.field === 'user.bio') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, bio: finalValue },
        }));
      } else if (item.field === 'user.role') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, role: finalValue },
        }));
      } else if (item.field === 'user.location') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, location: finalValue },
        }));
      } else if (item.field === 'user.github') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, github: finalValue },
        }));
      } else if (
        item.category === 'skills' ||
        item.field === 'skills' ||
        item.field === 'techs'
      ) {
        const skillSlugs = finalValue
          .split(',')
          .map(s => s.trim().toLowerCase())
          .filter(Boolean);

        if (skillSlugs.length > 0) {
          addSection('skill-icons', {
            content: {
              icons: skillSlugs,
              theme: 'dark',
              perLine: 15,
            },
          });
        }
      }
    }

    onComplete();
  };

  return (
    <div className="p-5 bg-[#fafbfc] dark:bg-[#1e293b] border-2 border-slate-300 dark:border-slate-700 rounded-xl space-y-5 max-w-2xl mx-auto shadow-xl">
      {/* Header Guard Banner */}
      <div className="flex items-start gap-3 p-3.5 bg-amber-500/15 border border-amber-500/40 rounded-lg">
        <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Explicit Confirmation Gate
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
            Nothing from resume parsing or web enrichment writes to your profile configuration without your review and approval.
          </p>
        </div>
      </div>

      {/* Items Review List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {items.map(item => {
          const isSelected = selectedIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-lg border transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-amber-500/60 shadow-2xs'
                  : 'bg-slate-100/80 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-slate-400 dark:border-slate-600 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {item.label}
                  </span>
                </label>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                  {item.category}
                </span>
              </div>

              {/* Current vs Proposed Diff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/80 rounded border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                    Current Value
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {Array.isArray(item.currentValue)
                      ? item.currentValue.join(', ') || '(empty)'
                      : item.currentValue || '(empty)'}
                  </span>
                </div>

                <div className="p-2 bg-amber-500/10 rounded border border-amber-500/30">
                  <span className="text-[10px] font-semibold uppercase text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Proposed Value (Editable)
                  </span>
                  <input
                    type="text"
                    value={editedValues[item.id] ?? ''}
                    disabled={!isSelected}
                    onChange={e =>
                      setEditedValues(prev => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-300 dark:border-slate-700 text-xs">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" /> Cancel &amp; Discard
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedIds(new Set(items.map(i => i.id)))}
            className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={selectedIds.size === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-bold border border-slate-700 disabled:opacity-40 shadow-sm transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" /> Apply {selectedIds.size} Selected Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmGate;
