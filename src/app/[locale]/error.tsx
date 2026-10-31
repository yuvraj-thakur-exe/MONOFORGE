'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react';

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
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans text-neutral-950">
      <div className="w-full max-w-lg rounded-2xl border-2 border-neutral-900 bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#18181b] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-100 border-2 border-red-900 text-red-600 font-bold shadow-[2px_2px_0px_#18181b]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-red-600">
              [ RUNTIME ERROR RECOVERED ]
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950">
              Workspace Restored
            </h1>
          </div>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed font-mono bg-neutral-100 p-3 rounded-xl border border-neutral-300 break-words">
          {error?.message || 'A client-side initialization anomaly occurred. MonoForge isolated the error.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ffe600] text-neutral-950 font-mono font-bold text-sm border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#18181b] transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Workspace</span>
          </button>

          <button
            type="button"
            onClick={handleHardReset}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 font-mono font-bold text-sm border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#18181b] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Stored Cache</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <a
            href="/en"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-600 hover:text-neutral-950 underline"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Studio Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
