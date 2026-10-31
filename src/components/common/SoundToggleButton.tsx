'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playTone } from '#/lib/sound/sound-effects';

export function SoundToggleButton({ className = '' }: { className?: string }) {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(isSoundEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
    if (next) {
      playTone(880, 'sine', 0.15, 0.05);
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      title={enabled ? 'Sound Effects: ON (Click to Mute)' : 'Sound Effects: MUTED (Click to Enable)'}
      aria-label={enabled ? 'Mute sound effects' : 'Enable sound effects'}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-mono font-bold ${
        enabled
          ? 'bg-amber-400/15 border-amber-400/40 text-amber-700 dark:text-amber-300 shadow-xs'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500'
      } ${className}`}
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="hidden sm:inline">SFX: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">SFX: OFF</span>
        </>
      )}
    </button>
  );
}

