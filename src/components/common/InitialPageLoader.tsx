'use client';

import { useEffect, useState } from 'react';
import { GeometricLoader } from './GeometricLoader';

/**
 * Initial page entrance loader using the Uiverse.io geometric path & dot animation.
 * Smoothly fades out once the DOM is interactive and ready.
 */
export function InitialPageLoader() {
  const [visible, setVisible] = useState(true);
  const [rendered, setRendered] = useState(true);

  useEffect(() => {
    // Quick exit after initial hydration
    const timer = setTimeout(() => {
      setVisible(false);
      const removeTimer = setTimeout(() => {
        setRendered(false);
      }, 400); // Wait for transition fade out
      return () => clearTimeout(removeTimer);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  if (!rendered) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white dark:bg-[#0f172a] pointer-events-none transition-opacity duration-400 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Geometric Loader from Uiverse.io */}
        <GeometricLoader mode="triple" size="md" />

        {/* Branding & Status */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-800 dark:text-neutral-200">
              MONOFORGE // INITIALIZING
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
            DOCUMENTATION &amp; SPECIFICATION SUITE
          </span>
        </div>
      </div>
    </div>
  );
}
