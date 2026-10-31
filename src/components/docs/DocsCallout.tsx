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
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/5',
      text: 'text-blue-600 dark:text-blue-400',
      icon: <Info className="w-4 h-4 shrink-0 text-blue-500" />,
      defaultTitle: 'Note',
    },
    tip: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/5',
      text: 'text-emerald-600 dark:text-emerald-400',
      icon: <Lightbulb className="w-4 h-4 shrink-0 text-emerald-500" />,
      defaultTitle: 'Tip',
    },
    important: {
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/5',
      text: 'text-purple-600 dark:text-purple-400',
      icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-purple-500" />,
      defaultTitle: 'Important',
    },
    warning: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      text: 'text-amber-600 dark:text-amber-400',
      icon: <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />,
      defaultTitle: 'Warning',
    },
    caution: {
      border: 'border-red-500/30',
      bg: 'bg-red-500/5',
      text: 'text-red-600 dark:text-red-400',
      icon: <AlertOctagon className="w-4 h-4 shrink-0 text-red-500" />,
      defaultTitle: 'Caution',
    },
  };

  const current = configs[type] || configs.note;

  return (
    <div className={`my-5 rounded-xl border-l-4 ${current.border} ${current.bg} p-4 font-sans text-sm`}>
      <div className={`flex items-center gap-2 font-bold font-mono text-xs uppercase tracking-wide mb-1.5 ${current.text}`}>
        {current.icon}
        <span>{title || current.defaultTitle}</span>
      </div>
      <div className="text-neutral-800 dark:text-neutral-300 leading-relaxed text-[13px] prose-compact">
        {children}
      </div>
    </div>
  );
}
