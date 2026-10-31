import { z } from 'zod';
import { ReadmeConfig } from '#/lib/plugins/types';

export const AssetCategorySchema = z.enum([
  'templates',
  'animated-svg',
  'banners',
  'badges',
  'sections',
  'presets',
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
  category: AssetCategorySchema,
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
