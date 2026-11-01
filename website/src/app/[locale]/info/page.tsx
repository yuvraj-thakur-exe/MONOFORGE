'use client';

import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { InfoHub } from '#/components/info/InfoHub';
import { GeometricLoader } from '#/components/common/GeometricLoader';

export default function LocalizedInfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] text-slate-900 dark:bg-[#0f172a] dark:text-slate-100 selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200">
      <TopNav />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
            <GeometricLoader mode="triple" size="md" />
            <span>Loading MonoForge Manual &amp; Info Hub...</span>
          </div>
        }
      >
        <InfoHub />
      </Suspense>
    </div>
  );
}
