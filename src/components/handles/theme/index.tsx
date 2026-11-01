'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { command } from '#/lib/command';

export function ThemeHandler() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  function applyTheme(targetTheme: string) {
    const normalized = targetTheme === 'dark' ? 'dark' : 'light';
    setTheme(normalized);

    if (typeof document !== 'undefined') {
      if (normalized === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }

  function toggleTheme() {
    const current = resolvedTheme || theme || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    // Keep document class and data-theme strictly in sync with next-themes state
    const active = resolvedTheme || theme || 'light';
    applyTheme(active);

    const disposeUse = command.handle('theme.use', (t: string) => applyTheme(t));
    const disposeToggle = command.handle('theme.toggle', toggleTheme);

    return () => {
      disposeUse();
      disposeToggle();
    };
  }, [theme, resolvedTheme]);

  return null;
}
