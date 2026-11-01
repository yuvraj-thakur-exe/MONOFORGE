import type { AssetDefinition } from './types';

/**
 * Patterns and IDs of protected assets that must NEVER be deleted during repository optimization.
 */
export const PROTECTED_ASSET_PATTERNS: RegExp[] = [
  /icons\/social\//i,
  /characters\//i,
  /monoforge-.*logo/i,
  /monoforge-.*icon/i,
  /logo-.*\.svg/i,
  /logo\.svg/i,
  /favicon\./i,
  /default\.svg$/i,
  /telemetry-/i,
  /owl-confetti/i,
  /octocat-coffee/i,
  /developer-desk/i,
  /agent-suite/i,
  /snake\.svg$/i,
  /pacman\.svg$/i,
  /best-readme\//i,
];

/**
 * Checks whether an asset path or definition is protected under MonoForge asset governance.
 */
export function isAssetProtected(assetOrPath: string | AssetDefinition): boolean {
  const path = typeof assetOrPath === 'string' ? assetOrPath : assetOrPath.path;
  const normalized = path.replace(/\\/g, '/').toLowerCase();

  return PROTECTED_ASSET_PATTERNS.some(pattern => pattern.test(normalized));
}

/**
 * Guard function preventing the deletion of protected assets.
 * Returns { allowed: boolean, reason?: string }
 */
export function validateAssetDeletion(assetPath: string): { allowed: boolean; reason?: string } {
  if (isAssetProtected(assetPath)) {
    return {
      allowed: false,
      reason: `Asset "${assetPath}" is protected under MonoForge asset governance rules and cannot be deleted.`,
    };
  }
  return { allowed: true };
}

