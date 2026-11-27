'use client';

import { useEffect } from 'react';
import { Link } from '#/i18n/navigation';
import { AlertTriangle, RefreshCw, Home, RotateCcw, Code2 } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error to console
    console.error('MonoForge Error Boundary Caught:', error);
  }, [error]);

  const handleHardReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('@monoforge-store');
        sessionStorage.clear();
      }
    } catch {
      // Ignored
    }
    reset();
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] flex items-center justify-center p-4 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-lg rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[6px_6px_0px_#334155] dark:shadow-[6px_6px_0px_#475569] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-500 text-amber-700 dark:text-amber-400 font-bold shadow-[2px_2px_0px_#334155]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              [ RUNTIME ERROR RECOVERED ]
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Workspace Restored
            </h1>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 break-words">
          {error?.message || 'A client-side initialization anomaly occurred. MonoForge isolated the error.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-mono font-bold text-sm border-2 border-slate-800 shadow-[3px_3px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#334155] transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Workspace</span>
          </button>

          <button
            type="button"
            onClick={handleHardReset}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-mono font-bold text-sm border-2 border-slate-300 dark:border-slate-600 shadow-[3px_3px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#334155] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Stored Cache</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2 text-xs font-mono font-bold">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 underline"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Studio Home</span>
          </Link>
          <Link
            href="/developer"
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 underline"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Open Developer IDE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
