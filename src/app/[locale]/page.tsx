'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { DocsHomePortal } from '#/components/docs/DocsHomePortal';

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-[#0c0d0e] text-neutral-900 dark:text-neutral-100 selection:bg-[#ffe600] selection:text-neutral-950 overflow-x-hidden font-sans transition-colors duration-200">
      {/* Documentation Top Navigation */}
      <TopNav />

      {/* Flagship Documentation & Technical Manual Portal */}
      <DocsHomePortal />
    </div>
  );
}
