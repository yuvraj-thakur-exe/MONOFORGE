'use client';

import type { CSSProperties } from 'react';

export type GeometricLoaderMode = 'triple' | 'circle' | 'triangle' | 'rect';

export interface GeometricLoaderProps {
  mode?: GeometricLoaderMode;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dotColor?: string;
  pathColor?: string;
}

/**
 * Geometric Path & Dot Loader
 * From Uiverse.io by mobinkakei, styled for MonoForge Docs & Studio.
 */
export function GeometricLoader({
  mode = 'triple',
  label,
  size = 'md',
  className = '',
  dotColor,
  pathColor,
}: GeometricLoaderProps) {
  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';

  const customStyle: Record<string, string | number> = {};
  if (dotColor) customStyle['--dot'] = dotColor;
  if (pathColor) customStyle['--path'] = pathColor;

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`} role="status" aria-label={label || 'Loading'}>
      <div className={`geometric-loader-container ${scale} transition-transform duration-200`} style={customStyle as CSSProperties}>
        {(mode === 'triple' || mode === 'circle') && (
          <div className="loader circle-shape" title="Loading Circle">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" />
            </svg>
          </div>
        )}

        {(mode === 'triple' || mode === 'triangle') && (
          <div className="loader triangle triangle-shape" title="Loading Triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72" />
            </svg>
          </div>
        )}

        {(mode === 'triple' || mode === 'rect') && (
          <div className="loader rect-shape" title="Loading Rectangle">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64" />
            </svg>
          </div>
        )}
      </div>

      {label && (
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}
