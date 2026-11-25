'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopNav } from '#/components/navigation/TopNav';
import { WizardContainer } from '#/components/wizard';
import { WizardSkeleton } from '#/components/wizard/WizardSkeleton';
import { CanvasTemplate } from '#/components/templates/canvas';
import { LayoutDashboard, ListOrdered, Sparkles } from 'lucide-react';

function WizardContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams?.get('mode') === 'canvas' ? 'canvas' : 'guided';
  const [studioMode, setStudioMode] = useState<'canvas' | 'guided'>(initialMode);

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 flex flex-col">
      <TopNav />

      {/* Studio Mode Switcher Bar */}
      <div className="bg-[#f8fafc] dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-300 dark:border-slate-600">
            <button
              type="button"
              onClick={() => setStudioMode('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                studioMode === 'canvas'
                  ? 'bg-[#ffe600] text-slate-900 border border-slate-700 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Visual Canvas Studio</span>
            </button>
            <button
              type="button"
              onClick={() => setStudioMode('guided')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                studioMode === 'guided'
                  ? 'bg-[#ffe600] text-slate-900 border border-slate-700 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Step-by-Step Wizard</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 hidden sm:flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {studioMode === 'canvas'
              ? 'Click or drag sections to visually customize your profile layout'
              : 'Guided questions with automated archetype generation'}
          </span>
        </div>
      </div>

      <main className="flex-1 overflow-x-hidden">
        {studioMode === 'canvas' ? <CanvasTemplate /> : <WizardContainer />}
      </main>
    </div>
  );
}

export function WizardClient() {
  return (
    <Suspense fallback={<WizardSkeleton />}>
      <WizardContent />
    </Suspense>
  );
}
