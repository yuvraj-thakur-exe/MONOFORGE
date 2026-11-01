'use client';

import { Info, Lightbulb, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';

export type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution';

interface DocsCalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function DocsCallout({ type = 'note', title, children }: DocsCalloutProps) {
  const configs = {
    note: {
      border: 'border-blue-500/30 dark:border-blue-400/30',
      bg: 'bg-blue-50/50 dark:bg-blue-950/20',
      text: 'text-blue-700 dark:text-blue-300',
      badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
      icon: <Info className="w-3.5 h-3.5 shrink-0 text-blue-500" />,
      defaultTitle: 'Note',
    },
    tip: {
      border: 'border-emerald-500/30 dark:border-emerald-400/30',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      text: 'text-emerald-700 dark:text-emerald-300',
      badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
      icon: <Lightbulb className="w-3.5 h-3.5 shrink-0 text-emerald-500" />,
      defaultTitle: 'Tip',
    },
    important: {
      border: 'border-amber-500/30 dark:border-amber-400/30',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      text: 'text-amber-800 dark:text-amber-300',
      badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20',
      icon: <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-amber-500" />,
      defaultTitle: 'Important',
    },
    warning: {
      border: 'border-amber-500/30 dark:border-amber-400/30',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      text: 'text-amber-700 dark:text-amber-300',
      badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
      icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />,
      defaultTitle: 'Warning',
    },
    caution: {
      border: 'border-rose-500/30 dark:border-rose-400/30',
      bg: 'bg-rose-50/50 dark:bg-rose-950/20',
      text: 'text-rose-700 dark:text-rose-300',
      badgeBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
      icon: <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-rose-500" />,
      defaultTitle: 'Caution',
    },
  };

  const current = configs[type] || configs.note;

  return (
    <div className={`my-5 rounded-2xl border ${current.border} ${current.bg} p-4 sm:p-5 font-sans text-sm shadow-xs`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold font-mono text-[11px] uppercase tracking-wide border ${current.badgeBg}`}>
          {current.icon}
          <span>{title || current.defaultTitle}</span>
        </span>
      </div>
      <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-[13px] prose-compact">
        {children}
      </div>
    </div>
  );
}
