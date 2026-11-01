import type { SvgAnalysisReport } from './types';

/**
 * Analyzes an SVG string for security, Camo compliance, paths, and color palette.
 */
export function analyzeSvg(svgContent: string): SvgAnalysisReport {
  const securityWarnings: string[] = [];

  const hasScripts = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(svgContent);
  if (hasScripts) {
    securityWarnings.push('Contains <script> tags which are blocked by GitHub Camo proxy');
  }

  const hasForeignObject = /<foreignObject\b/gi.test(svgContent);
  if (hasForeignObject) {
    securityWarnings.push('Contains <foreignObject> tags which are stripped by GitHub Camo proxy');
  }

  const hasEventHandlers = /\son[a-z]+\s*=/gi.test(svgContent);
  if (hasEventHandlers) {
    securityWarnings.push('Contains inline JavaScript event handlers (e.g. onload, onclick)');
  }

  const hasJavascriptUrls = /href\s*=\s*['"]\s*javascript:/gi.test(svgContent);
  if (hasJavascriptUrls) {
    securityWarnings.push('Contains javascript: pseudo-protocol in href attributes');
  }

  const hasAnimations = /<animate\b|<animateTransform\b|@keyframes/gi.test(svgContent);

  // Extract viewBox, width, height
  const viewBoxMatch = svgContent.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : undefined;

  const widthMatch = svgContent.match(/width\s*=\s*["']?(\d+)/i);
  const width = widthMatch ? Number.parseInt(widthMatch[1], 10) : undefined;

  const heightMatch = svgContent.match(/height\s*=\s*["']?(\d+)/i);
  const height = heightMatch ? Number.parseInt(heightMatch[1], 10) : undefined;

  // Count paths and gradients
  const pathMatches = svgContent.match(/<path\b/gi);
  const pathCount = pathMatches ? pathMatches.length : 0;

  const gradientMatches = svgContent.match(/<(?:linearGradient|radialGradient)\b/gi);
  const gradientCount = gradientMatches ? gradientMatches.length : 0;

  // Color extraction (hex, rgb, named)
  const colorRegex = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
  const rawColors = svgContent.match(colorRegex) || [];
  const uniqueColors = Array.from(new Set(rawColors.map(c => c.toLowerCase())));

  const isCamoSafe = !hasScripts && !hasForeignObject && !hasEventHandlers && !hasJavascriptUrls;
  const isValid = svgContent.includes('<svg') && svgContent.includes('</svg>');

  return {
    isValid,
    isCamoSafe,
    hasScripts,
    hasForeignObject,
    hasEventHandlers,
    hasAnimations,
    viewBox,
    width,
    height,
    pathCount,
    gradientCount,
    dominantColors: uniqueColors.slice(0, 5),
    extractedColors: uniqueColors,
    securityWarnings,
  };
}

/**
 * Strips scripts, event handlers, and unsafe constructs while preserving valid vectors and animations.
 */
export function sanitizeSvg(svgContent: string): string {
  let clean = svgContent;

  // 1. Remove script tags and content
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 2. Remove foreignObject elements and content
  clean = clean.replace(/<foreignObject\b[^<]*(?:(?!<\/foreignObject>)<[^<]*)*<\/foreignObject>/gi, '');

  // 3. Remove inline event handler attributes (onload, onclick, etc.)
  clean = clean.replace(/\son[a-z]+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, '');

  // 4. Remove javascript: URLs
  clean = clean.replace(/href\s*=\s*["']\s*javascript:[^"']*["']/gi, 'href="#"');

  return clean.trim();
}

