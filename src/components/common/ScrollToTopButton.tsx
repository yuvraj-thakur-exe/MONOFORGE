'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Modern floating back-to-top button with circular SVG scroll progress ring.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const pct = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setProgress(pct);
        setVisible(totalScroll > 280);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-lg backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-200 group cursor-pointer"
    >
      {/* Circular Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-slate-200 dark:text-slate-800"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-amber-500 transition-all duration-75"
        />
      </svg>

      <ChevronUp className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:-translate-y-0.5 group-hover:text-amber-500 transition-all relative z-10" />
    </button>
  );
}
