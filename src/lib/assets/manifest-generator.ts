import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import type { AssetDefinition, AssetCategory, AssetFormat } from './types';
import { analyzeSvg } from './svg-sanitizer';
import { isAssetProtected } from './protection';

export function determineCategory(relPath: string): AssetCategory {
  const norm = relPath.replace(/\\/g, '/').toLowerCase();
  if (norm.includes('icons/social') || norm.includes('social/')) return 'social';
  if (norm.includes('characters/')) return 'character';
  if (norm.includes('telemetry-') || norm.includes('telemetry/')) return 'telemetry';
  if (norm.includes('logo') || norm.includes('brand') || norm.includes('favicon')) return 'brand';
  if (norm.includes('snake') || norm.includes('pacman') || norm.includes('bomberman') || norm.includes('galaga') || norm.includes('breakout') || norm.includes('puzzle-bobble')) return 'game';
  if (norm.includes('banner') || norm.includes('header') || norm.includes('deck')) return 'banner';
  if (norm.includes('illustration') || norm.includes('desk') || norm.includes('hands') || norm.includes('unicorn') || norm.includes('owl')) return 'illustration';
  if (norm.includes('mascot') || norm.includes('bot')) return 'mascot';
  return 'other';
}

export function generateAssetManifest(workspaceRoot: string = process.cwd()): AssetDefinition[] {
  const assets: AssetDefinition[] = [];

  const scanDirs = [
    path.join(workspaceRoot, 'website', 'public', 'assets'),
    path.join(workspaceRoot, 'public', 'assets'),
    path.join(workspaceRoot, 'website', 'src', 'assets'),
    path.join(workspaceRoot, 'src', 'assets'),
  ];

  for (const baseDir of scanDirs) {
    if (!fs.existsSync(baseDir)) continue;

    const walk = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase().replace('.', '') as AssetFormat;
          if (!['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'ico'].includes(ext)) continue;

          const fileBuffer = fs.readFileSync(fullPath);
          const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

          // Relative path normalized for the public URL / reference
          const relToRoot = path.relative(workspaceRoot, fullPath).replace(/\\/g, '/');
          
          // Generate a public URL path
          let publicUrl = '';
          if (relToRoot.includes('public/')) {
            publicUrl = '/' + relToRoot.substring(relToRoot.indexOf('public/') + 7);
          } else {
            publicUrl = '/' + relToRoot;
          }

          const category = determineCategory(relToRoot);
          const fileNameNoExt = path.basename(entry.name, path.extname(entry.name));
          const parentDirName = path.basename(path.dirname(fullPath));

          // Compute ID
          const id = `${category}-${parentDirName !== 'assets' ? `${parentDirName}-` : ''}${fileNameNoExt}`
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, '-');

          // Avoid duplicates by exact id
          if (assets.some(a => a.id === id)) continue;

          let width: number | undefined;
          let height: number | undefined;
          let viewBox: number | string | undefined;
          let dominantColors: string[] = [];

          if (ext === 'svg') {
            const svgContent = fileBuffer.toString('utf-8');
            const analysis = analyzeSvg(svgContent);
            width = analysis.width;
            height = analysis.height;
            viewBox = analysis.viewBox;
            dominantColors = analysis.dominantColors;
          }

          const tags: string[] = [category, ext, fileNameNoExt];
          if (parentDirName && parentDirName !== 'assets') {
            tags.push(parentDirName);
          }
          if (category === 'social') {
            tags.push('icon', 'social-media', 'brand-icon');
          }

          const isDefault = entry.name === 'default.svg' || entry.name.toLowerCase().includes('default');
          const isProtected = isAssetProtected(relToRoot);

          assets.push({
            id,
            name: `${parentDirName !== 'assets' ? `${parentDirName} ` : ''}${fileNameNoExt}`.trim(),
            path: relToRoot,
            publicUrl,
            category,
            format: ext,
            tags: Array.from(new Set(tags)),
            width,
            height,
            viewBox: typeof viewBox === 'string' ? viewBox : undefined,
            hash,
            fileSize: fileBuffer.length,
            isDefault,
            isProtected,
            brand: category === 'social' || category === 'brand' ? parentDirName : undefined,
            dominantColors: dominantColors.length > 0 ? dominantColors : undefined,
          });
        }
      }
    };

    walk(baseDir);
  }

  return assets;
}

export function writeManifestFile(workspaceRoot: string = process.cwd()): { path: string; count: number } {
  const assets = generateAssetManifest(workspaceRoot);
  const jsonContent = JSON.stringify(assets, null, 2);

  const targets = [
    path.join(workspaceRoot, 'website', 'src', 'assets', 'manifest.generated.json'),
    path.join(workspaceRoot, 'src', 'assets', 'manifest.generated.json'),
  ];

  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, jsonContent, 'utf-8');
  }

  return { path: targets[0], count: assets.length };
}
