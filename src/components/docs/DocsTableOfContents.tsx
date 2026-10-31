'use client';

import { useEffect, useState } from 'react';
import { DocHeading } from '#/content/docs/docs-data';
import { AlignLeft } from 'lucide-react';

interface DocsTableOfContentsProps {
  headings: DocHeading[];
}

export function DocsTableOfContents({ headings }: DocsTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="w-64 shrink-0 hidden xl:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pl-6 font-sans text-xs">
      <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-neutral-500 mb-3 text-[11px]">
        <AlignLeft className="w-3.5 h-3.5" />
        <span>On This Page</span>
      </div>
      <ul className="space-y-2 border-l border-neutral-200 dark:border-neutral-800">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block -ml-px pl-3 py-1 transition-colors leading-snug truncate ${
                  isActive
                    ? 'border-l-2 border-[#ffe600] text-neutral-950 dark:text-[#ffe600] font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                } ${h.level > 2 ? 'pl-6 text-[11px]' : ''}`}
              >
                {h.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
