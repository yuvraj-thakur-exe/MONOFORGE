'use client';

import { StartupSplash } from './StartupSplash';

/**
 * InitialPageLoader — Backwards-compatible alias for StartupSplash.
 * All startup loading flows now run through the MonoForge Signature Startup Splash.
 */
export function InitialPageLoader() {
  return <StartupSplash />;
}

export default InitialPageLoader;
