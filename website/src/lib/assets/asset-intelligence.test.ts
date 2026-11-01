import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  search_assets,
  inspect_asset,
  get_asset,
  import_asset,
  list_asset_categories,
  find_asset_variants,
  suggest_assets,
} from './asset-discovery';
import { analyzeSvg, sanitizeSvg } from './svg-sanitizer';
import { isAssetProtected, validateAssetDeletion } from './protection';
import { getAllAssets, getAssetById } from './registry';

describe('MonoForge Asset Intelligence System', () => {
  describe('Phase 1 — Asset Restoration & Protection Verification', () => {
    it('verifies src/assets/icons/social/discord/default.svg exists and is valid', () => {
      const discordSrc = path.resolve(process.cwd(), 'src/assets/icons/social/discord/default.svg');
      const discordWeb = path.resolve(process.cwd(), 'website/src/assets/icons/social/discord/default.svg');

      expect(fs.existsSync(discordSrc), 'src/assets discord default.svg must exist').toBe(true);
      expect(fs.existsSync(discordWeb), 'website/src/assets discord default.svg must exist').toBe(true);

      const content = fs.readFileSync(discordSrc, 'utf-8');
      expect(content).toContain('<svg');
      expect(content).toContain('</svg>');
      expect(content).toContain('<path');
    });

    it('identifies Discord and official logos as protected assets', () => {
      expect(isAssetProtected('src/assets/icons/social/discord/default.svg')).toBe(true);
      expect(isAssetProtected('public/assets/monoforge-logo.svg')).toBe(true);
      expect(isAssetProtected('public/assets/telemetry-isocalendar-3d.svg')).toBe(true);
      expect(isAssetProtected('public/assets/characters/dragonborn-paladin.svg')).toBe(true);
    });

    it('blocks deletion of protected assets via deletion guard', () => {
      const res = validateAssetDeletion('src/assets/icons/social/discord/default.svg');
      expect(res.allowed).toBe(false);
      expect(res.reason).toContain('is protected');
    });
  });

  describe('Phase 2 & 3 — Centralized Asset Registry & Manifest', () => {
    it('loads indexed manifest with over 100 authentic assets', () => {
      const assets = getAllAssets();
      expect(assets.length).toBeGreaterThanOrEqual(100);
    });

    it('indexes Discord default asset with metadata and Camo protection', () => {
      const discord = getAssetById('social-discord-default');
      expect(discord).toBeDefined();
      expect(discord?.category).toBe('social');
      expect(discord?.format).toBe('svg');
      expect(discord?.isDefault).toBe(true);
      expect(discord?.isProtected).toBe(true);
      expect(discord?.dominantColors).toBeDefined();
    });

    it('guarantees unique IDs across the entire asset library', () => {
      const all = getAllAssets();
      const ids = new Set<string>();
      for (const a of all) {
        expect(ids.has(a.id), `Duplicate asset ID: ${a.id}`).toBe(false);
        ids.add(a.id);
      }
    });
  });

  describe('Phase 4 — AI Asset Discovery Operations', () => {
    it('1. search_assets returns matching assets for "discord"', () => {
      const results = search_assets({ query: 'discord' });
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results.some(r => r.id.includes('discord'))).toBe(true);
    });

    it('2. inspect_asset returns structural analysis, colors, and usage instructions', () => {
      const result = inspect_asset('social-discord-default');
      expect(result).not.toBeNull();
      expect(result?.previewUrl).toContain('discord');
      expect(result?.usageInstructions.markdown).toContain('<img');
      expect(result?.usageInstructions.jsx).toContain('<Image');
      expect(result?.colorInformation.length).toBeGreaterThan(0);
    });

    it('3. get_asset retrieves exact asset by ID', () => {
      const asset = get_asset('social-discord-default');
      expect(asset).not.toBeNull();
      expect(asset?.name).toContain('discord');
    });

    it('4. import_asset formats markdown, jsx, and url snippets', () => {
      const md = import_asset('social-discord-default', 'markdown');
      const url = import_asset('social-discord-default', 'url');
      expect(md).toContain('<p align="center">');
      expect(md).toContain('<img');
      expect(url).toContain('/assets/icons/social/discord/default.svg');
    });

    it('5. list_asset_categories returns all registered categories with counts', () => {
      const categories = list_asset_categories();
      expect(categories.length).toBeGreaterThan(0);
      const socialCat = categories.find(c => c.category === 'social');
      expect(socialCat).toBeDefined();
      expect(socialCat!.count).toBeGreaterThanOrEqual(30);
    });

    it('6. find_asset_variants discovers default and variant options', () => {
      const variants = find_asset_variants('social-discord-default');
      expect(variants.default).toBeDefined();
    });

    it('7. suggest_assets recommends existing assets for design briefs', () => {
      const suggestions = suggest_assets('Need a dark profile with discord links and a snake contribution graph');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some(a => a.id.includes('discord') || a.id.includes('snake'))).toBe(true);
    });
  });

  describe('Phase 6 — SVG Inspection & Sanitizer Engine', () => {
    it('detects unsafe scripts and foreignObject constructs', () => {
      const maliciousSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <script>alert('xss')</script>
        <foreignObject width="100" height="100"><div>Unsafe</div></foreignObject>
        <circle cx="50" cy="50" r="40" fill="#ffe600" onload="alert(1)" />
      </svg>`;

      const analysis = analyzeSvg(maliciousSvg);
      expect(analysis.isCamoSafe).toBe(false);
      expect(analysis.hasScripts).toBe(true);
      expect(analysis.hasForeignObject).toBe(true);
      expect(analysis.hasEventHandlers).toBe(true);
      expect(analysis.dominantColors).toContain('#ffe600');
    });

    it('sanitizes SVG content by stripping scripts while preserving valid vectors', () => {
      const raw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <script>alert('hack')</script>
        <circle cx="50" cy="50" r="40" fill="#10b981" onclick="doSomething()" />
      </svg>`;

      const clean = sanitizeSvg(raw);
      expect(clean).not.toContain('<script');
      expect(clean).not.toContain('onclick');
      expect(clean).toContain('<circle');
      expect(clean).toContain('fill="#10b981"');
    });
  });
});
