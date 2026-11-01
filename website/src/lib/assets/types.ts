import { z } from 'zod';
import type { ReadmeConfig } from '#/lib/plugins/types';

// --- Community Asset Schemas (Used by Marketplace & Community Registry) ---

export const AssetCategorySchema = z.enum([
  'templates',
  'animated-svg',
  'banners',
  'banner',
  'badges',
  'sections',
  'presets',
  'social',
  'technology',
  'language',
  'framework',
  'tool',
  'brand',
  'illustration',
  'mascot',
  'telemetry',
  'character',
  'game',
  'background',
  'other',
]);

export type AssetCategory = z.infer<typeof AssetCategorySchema>;

export const AssetLicenseSchema = z.enum([
  'MIT',
  'Apache-2.0',
  'CC-BY-4.0',
  'Unlicense',
]);

export type AssetLicense = z.infer<typeof AssetLicenseSchema>;

export const AssetAuthorSchema = z.object({
  name: z.string(),
  github: z.string(),
  avatarUrl: z.string().optional(),
});

export type AssetAuthor = z.infer<typeof AssetAuthorSchema>;

export const AssetOptionSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['text', 'color', 'select', 'boolean']),
  defaultValue: z.unknown(),
  options: z.array(z.string()).optional(),
});

export type AssetOption = z.infer<typeof AssetOptionSchema>;

export const CommunityAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  author: AssetAuthorSchema,
  license: AssetLicenseSchema,
  version: z.string().default('1.0.0'),
  camoCompliant: z.boolean().default(true),
  previewSvg: z.string().optional(),
  previewUrl: z.string().optional(),
  supportedOptions: z.array(AssetOptionSchema).optional(),
  rawMarkdown: z.string(),
  configPatch: z.custom<Partial<ReadmeConfig>>().optional(),
});

export type CommunityAsset = z.infer<typeof CommunityAssetSchema>;

// --- Asset Intelligence Engine Types (Comprehensive File Manifest & App Inventory) ---

export type AssetFormat = 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif' | 'ico';

export interface AssetVariants {
  default?: string;
  light?: string;
  dark?: string;
  monochrome?: string;
}

export interface AssetDefinition {
  id: string;
  name: string;
  path: string;
  publicUrl: string;
  category: AssetCategory;
  format: AssetFormat;
  tags: string[];
  width?: number;
  height?: number;
  viewBox?: string;
  variants?: AssetVariants;
  hash: string;
  fileSize: number;
  isDefault: boolean;
  isProtected: boolean;
  description?: string;
  brand?: string;
  dominantColors?: string[];
}

export interface AssetSearchQuery {
  query?: string;
  category?: AssetCategory | 'all';
  format?: AssetFormat | 'all';
  tags?: string[];
  brand?: string;
  onlyProtected?: boolean;
}

export interface SvgAnalysisReport {
  isValid: boolean;
  isCamoSafe: boolean;
  hasScripts: boolean;
  hasForeignObject: boolean;
  hasEventHandlers: boolean;
  hasAnimations: boolean;
  viewBox?: string;
  width?: number;
  height?: number;
  pathCount: number;
  gradientCount: number;
  dominantColors: string[];
  extractedColors: string[];
  securityWarnings: string[];
}
