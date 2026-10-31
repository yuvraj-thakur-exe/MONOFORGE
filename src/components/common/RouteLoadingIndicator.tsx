'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function RouteLoadingIndicator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger loading animation on pathname change
  useEffect(() => {
    setLoading(true);
    setProgress(20);

    const timer1 = setTimeout(() => setProgress(65), 100);
    const timer2 = setTimeout(() => setProgress(90), 250);
    const timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <>
      {/* 1. Top High-Precision Laser Line with Glowing Traveling Spark */}
      <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-[#FFE600] to-yellow-300 border-b border-neutral-900 shadow-[0_0_14px_#FFE600,0_0_4px_#18181b] transition-all duration-200 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-neutral-900 shadow-[0_0_10px_#FFE600] animate-ping" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-950" />
        </div>
      </div>

      {/* 2. Floating Center Micro-Badge: Distinct Page Navigation Motion */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 border border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-md flex items-center gap-2 text-[10px] font-mono text-white animate-in fade-in zoom-in-95 duration-150">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping shrink-0" />
        <span className="font-black tracking-wider uppercase text-slate-100">PAGE LOADING</span>
        <span className="text-[9px] text-[#FFE600] font-bold">100% CAMO</span>
      </div>
    </>
  );
}

