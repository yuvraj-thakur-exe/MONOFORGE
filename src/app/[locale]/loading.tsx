'use client';

import { GeometricLoader } from '#/components/common/GeometricLoader';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md p-4 font-sans text-slate-950 dark:text-slate-50">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b0a_1px,transparent_1px),linear-gradient(to_bottom,#18181b0a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Loading Card */}
      <div className="relative w-full max-w-sm p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Geometric Loader from Uiverse.io */}
        <div className="py-2 flex justify-center">
          <GeometricLoader mode="triple" size="md" />
        </div>

        {/* Title & Brand */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              MONOFORGE // DOCS
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Loading technical specification...
          </p>
        </div>
      </div>
    </div>
  );
}
