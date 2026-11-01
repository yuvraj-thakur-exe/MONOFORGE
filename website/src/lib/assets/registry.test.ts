import { describe, it, expect } from 'vitest';
import { COMMUNITY_ASSET_REGISTRY, getAssetsByCategory, searchAssets } from './registry';
import { CommunityAssetSchema } from './types';

describe('Community Asset Registry', () => {
  it('validates all registry items against CommunityAssetSchema', () => {
    expect(COMMUNITY_ASSET_REGISTRY.length).toBeGreaterThan(0);
    for (const asset of COMMUNITY_ASSET_REGISTRY) {
      const parsed = CommunityAssetSchema.safeParse(asset);
      expect(parsed.success).toBe(true);
      expect(asset.camoCompliant).toBe(true);
      expect(asset.author.github).toBeDefined();
      expect(asset.license).toBeDefined();
    }
  });

  it('filters assets by category accurately', () => {
    const banners = getAssetsByCategory('banners');
    expect(banners.length).toBeGreaterThan(0);
    expect(banners.every(b => b.category === 'banners')).toBe(true);

    const animatedSvgs = getAssetsByCategory('animated-svg');
    expect(animatedSvgs.length).toBeGreaterThan(0);
    expect(animatedSvgs.every(s => s.category === 'animated-svg')).toBe(true);
  });

  it('searches assets by query keyword across tags and titles', () => {
    const results = searchAssets('cyber');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.name.toLowerCase().includes('cyber') || r.tags.includes('cyber'))).toBe(true);
  });
});

