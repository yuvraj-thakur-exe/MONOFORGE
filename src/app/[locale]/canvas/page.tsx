'use client';

import { useEffect } from 'react';
import { useRouter } from '#/i18n/navigation';

export default function CanvasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/developer?mode=visual');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs">
      <div className="flex items-center gap-2 p-4 rounded-xl border-2 border-neutral-900 bg-[#ffe600] font-black shadow-[3px_3px_0px_#18181b] animate-pulse">
        <span>REDIRECTING TO ALL-IN-ONE STUDIO...</span>
      </div>
    </div>
  );
}