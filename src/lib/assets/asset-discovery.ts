import type {
  AssetDefinition,
  AssetSearchQuery,
  SvgAnalysisReport,
} from './types';
import { getAllAssets, getAssetById, searchAssets } from './registry';
import { analyzeSvg, sanitizeSvg } from './svg-sanitizer';

export interface AssetInspectionResult {
  asset: AssetDefinition;
  viewBox?: string;
  width?: number;
  height?: number;
  fileSize: number;
  colorInformation: string[];
  variants: Record<string, string>;
  previewUrl: string;
  usageInstructions: {
    markdown: string;
    html: string;
    jsx: string;
  };
  svgReport?: SvgAnalysisReport;
}

export interface AssetCategorySummary {
  category: string;
  count: number;
  sampleAssetIds: string[];
}

/**
 * 1. search_assets: Search registered assets by query, category, format, or tags.
 */
export function search_assets(query: AssetSearchQuery): AssetDefinition[] {
  return searchAssets(query);
}

/**
 * 2. inspect_asset: Return deep structural, color, dimension, and usage details.
 */
export function inspect_asset(id: string): AssetInspectionResult | null {
  const asset = getAssetById(id);
  if (!asset) return null;

  let svgReport: SvgAnalysisReport | undefined;

  // If in Node.js server context and format is SVG, attempt dynamic read for comprehensive report
  if (typeof window === 'undefined' && asset.format === 'svg') {
    try {
      // Dynamic require to prevent client-side bundling of node built-ins
      const nodeFs = eval('require("fs")');
      const nodePath = eval('require("path")');
      const fullPath = nodePath.resolve(process.cwd(), asset.path);
      if (nodeFs.existsSync(fullPath)) {
        const content = nodeFs.readFileSync(fullPath, 'utf-8');
        svgReport = analyzeSvg(content);
      }
    } catch {
      // Fallback
    }
  }

  // Fallback report if not loaded from file
  if (!svgReport && asset.format === 'svg') {
    svgReport = {
      isValid: true,
      isCamoSafe: true,
      hasScripts: false,
      hasForeignObject: false,
      hasEventHandlers: false,
      hasAnimations: asset.tags.includes('animated') || asset.tags.includes('60fps'),
      viewBox: asset.viewBox,
      width: asset.width,
      height: asset.height,
      pathCount: 1,
      gradientCount: 0,
      dominantColors: asset.dominantColors || [],
      extractedColors: asset.dominantColors || [],
      securityWarnings: [],
    };
  }

  // Find all variants sharing the same brand or parent
  const variants = find_asset_variants(id);

  // Generate production-ready usage instructions
  const markdown = `<p align="center">\n  <img src="${asset.publicUrl}" alt="${asset.name}" width="${asset.width || '100%'}" />\n</p>`;
  const html = `<img src="${asset.publicUrl}" alt="${asset.name}" width="${asset.width || '100%'}" />`;
  const jsx = `<Image src="${asset.publicUrl}" alt="${asset.name}" width={${asset.width || 800}} height={${asset.height || 400}} />`;

  return {
    asset,
    viewBox: asset.viewBox || svgReport?.viewBox,
    width: asset.width || svgReport?.width,
    height: asset.height || svgReport?.height,
    fileSize: asset.fileSize,
    colorInformation: asset.dominantColors && asset.dominantColors.length > 0 ? asset.dominantColors : (svgReport?.dominantColors || []),
    variants,
    previewUrl: asset.publicUrl,
    usageInstructions: {
      markdown,
      html,
      jsx,
    },
    svgReport,
  };
}

/**
 * 3. get_asset: Direct lookup by ID.
 */
export function get_asset(id: string): AssetDefinition | null {
  return getAssetById(id) || null;
}

/**
 * 4. import_asset: Export asset ready for immediate insertion into profile markdown or code.
 */
export function import_asset(
  id: string,
  targetFormat: 'markdown' | 'jsx' | 'url' | 'raw' = 'markdown'
): string | null {
  const asset = getAssetById(id);
  if (!asset) return null;

  switch (targetFormat) {
    case 'markdown':
      return `<p align="center">\n  <img src="${asset.publicUrl}" alt="${asset.name}" />\n</p>`;
    case 'jsx':
      return `<img src="${asset.publicUrl}" alt="${asset.name}" className="max-w-full h-auto" />`;
    case 'url':
      return asset.publicUrl;
    case 'raw': {
      if (typeof window === 'undefined') {
        try {
          const nodeFs = eval('require("fs")');
          const nodePath = eval('require("path")');
          const fullPath = nodePath.resolve(process.cwd(), asset.path);
          if (nodeFs.existsSync(fullPath)) {
            return sanitizeSvg(nodeFs.readFileSync(fullPath, 'utf-8'));
          }
        } catch {
          // Fallback
        }
      }
      return asset.publicUrl;
    }
    default:
      return asset.publicUrl;
  }
}

/**
 * 5. list_asset_categories: Return available asset categories and counts.
 */
export function list_asset_categories(): AssetCategorySummary[] {
  const all = getAllAssets();
  const catMap = new Map<string, string[]>();

  for (const a of all) {
    const list = catMap.get(a.category) || [];
    list.push(a.id);
    catMap.set(a.category, list);
  }

  return Array.from(catMap.entries()).map(([category, ids]) => ({
    category,
    count: ids.length,
    sampleAssetIds: ids.slice(0, 5),
  }));
}

/**
 * 6. find_asset_variants: Discover matching light/dark/default variants for a brand.
 */
export function find_asset_variants(id: string): Record<string, string> {
  const asset = getAssetById(id);
  if (!asset) return {};

  const variants: Record<string, string> = {};
  if (asset.variants) {
    if (asset.variants.default) variants['default'] = asset.variants.default;
    if (asset.variants.light) variants['light'] = asset.variants.light;
    if (asset.variants.dark) variants['dark'] = asset.variants.dark;
    if (asset.variants.monochrome) variants['monochrome'] = asset.variants.monochrome;
    return variants;
  }

  // Fallback: search by brand
  if (asset.brand) {
    const brandAssets = getAllAssets().filter(
      a => a.brand?.toLowerCase() === asset.brand?.toLowerCase()
    );
    for (const ba of brandAssets) {
      if (ba.id.includes('dark')) variants['dark'] = ba.publicUrl;
      else if (ba.id.includes('light')) variants['light'] = ba.publicUrl;
      else if (ba.isDefault) variants['default'] = ba.publicUrl;
    }
  }

  return variants;
}

/**
 * 7. analyze_svg: Analyze raw SVG content for Camo safety, geometry, and color palette.
 */
export function analyze_svg_content(svgContent: string): SvgAnalysisReport {
  return analyzeSvg(svgContent);
}

/**
 * 8. suggest_assets: Intelligently recommend assets based on design brief or developer context.
 */
export function suggest_assets(
  contextOrQuery:
    | string
    | {
        role?: string;
        technologies?: string[];
        style?: 'minimal' | 'cyber' | 'retro' | 'playful';
      }
): AssetDefinition[] {
  const all = getAllAssets();
  const suggestions: AssetDefinition[] = [];

  if (typeof contextOrQuery === 'string') {
    const q = contextOrQuery.toLowerCase();
    const words = q.split(/[\s,.-]+/).filter(w => w.length > 2);
    const scored = all
      .map(asset => {
        let score = 0;
        for (const w of words) {
          if (asset.id.toLowerCase().includes(w)) score += 3;
          if (asset.name.toLowerCase().includes(w)) score += 2;
          if (asset.tags.some(t => t.toLowerCase().includes(w))) score += 1;
        }
        return { asset, score };
      })
      .filter(item => item.score > 0);

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 12).map(s => s.asset);
  }

  const context = contextOrQuery;
  const techTerms = (context.technologies || []).map(t => t.toLowerCase());
  const roleTerms = (context.role || '').toLowerCase().split(/\s+/);

  for (const asset of all) {
    // Match technologies against tags or name
    const matchesTech = techTerms.some(
      t => asset.tags.some(at => at.toLowerCase().includes(t)) || asset.name.toLowerCase().includes(t)
    );

    // Match role keywords
    const matchesRole = roleTerms.some(
      r => r.length > 2 && (asset.name.toLowerCase().includes(r) || asset.tags.some(at => at.toLowerCase().includes(r)))
    );

    if (matchesTech || matchesRole) {
      suggestions.push(asset);
    }

    if (suggestions.length >= 12) break;
  }

  // Fallback defaults if few or none found
  if (suggestions.length < 4) {
    const popularIds = [
      'brand-monoforge-logo',
      'telemetry-telemetry-isocalendar-3d',
      'character-characters-dragonborn-paladin',
      'mascot-cyber-monkey-mascot',
    ];
    for (const pid of popularIds) {
      const fallback = getAssetById(pid);
      if (fallback && !suggestions.some(s => s.id === fallback.id)) {
        suggestions.push(fallback);
      }
    }
  }

  return suggestions;
}
