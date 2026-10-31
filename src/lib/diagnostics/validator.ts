/**
 * MonoForge Central Diagnostics & Quality Engine
 *
 * Comprehensive validator inspecting Markdown syntax, security boundaries,
 * Camo CDN compatibility, URL health, profile completeness, configuration integrity,
 * and export bounds.
 */

import { ReadmeConfig } from '#/lib/plugins/types';

export type DiagnosticSeverity = 'error' | 'warning' | 'info';

export type DiagnosticCategory =
  | 'security'
  | 'markdown'
  | 'camo-svg'
  | 'urls'
  | 'completeness'
  | 'accessibility'
  | 'config'
  | 'integration'
  | 'export';

export interface DiagnosticIssue {
  id: string;
  severity: DiagnosticSeverity;
  category: DiagnosticCategory;
  title: string;
  description: string;
  line?: number;
  autoFixable: boolean;
  fixLabel?: string;
}

export interface DiagnosticReport {
  issues: DiagnosticIssue[];
  errorCount: number;
  warningCount: number;
  infoCount: number;
  score: number; // 0 - 100
  camoSafe: boolean;
}

/**
 * Runs deep diagnostic checks on raw markdown and optional profile metadata.
 */
export function runDiagnostics(markdown: string, config?: ReadmeConfig): DiagnosticReport {
  const issues: DiagnosticIssue[] = [];
  const lines = (markdown || '').split('\n');

  let openCodeFence = false;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // 1. Check code blocks
    if (trimmed.startsWith('```')) {
      openCodeFence = !openCodeFence;
    }

    // 2. Security checks (GitHub Camo & Markdown sanitation)
    if (/<script/i.test(line)) {
      issues.push({
        id: `sec_script_${lineNum}`,
        severity: 'error',
        category: 'security',
        title: 'Prohibited <script> tag detected',
        description: 'GitHub Camo strips all <script> tags immediately. Remove it or replace with animated SVG.',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Strip <script> tags',
      });
    }

    if (/<(?:iframe|object|embed|applet)/i.test(line)) {
      issues.push({
        id: `sec_embed_${lineNum}`,
        severity: 'error',
        category: 'security',
        title: 'Prohibited embedding tag (<iframe/object/embed>)',
        description: 'GitHub markdown strips embedded frame/object elements for security.',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Remove embedding elements',
      });
    }

    if (/\bon\w+\s*=/i.test(line)) {
      issues.push({
        id: `sec_event_handler_${lineNum}`,
        severity: 'error',
        category: 'security',
        title: 'Inline javascript event handler detected',
        description: 'Inline event handlers (like onclick or onerror) are forbidden by GitHub sanitizers.',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Strip event handlers',
      });
    }

    if (/javascript:/i.test(line)) {
      issues.push({
        id: `sec_js_uri_${lineNum}`,
        severity: 'error',
        category: 'security',
        title: 'Prohibited javascript: URI',
        description: 'Inline javascript URIs are rejected by GitHub sanitizers.',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Remove javascript: URIs',
      });
    }

    if (/<foreignObject/i.test(line)) {
      issues.push({
        id: `camo_foreign_obj_${lineNum}`,
        severity: 'error',
        category: 'camo-svg',
        title: 'Forbidden <foreignObject> in SVG',
        description: 'GitHub Camo proxy strips <foreignObject> elements, causing broken renders.',
        line: lineNum,
        autoFixable: false,
      });
    }

    if (/http:\/\//i.test(line)) {
      issues.push({
        id: `insecure_url_${lineNum}`,
        severity: 'warning',
        category: 'urls',
        title: 'Insecure HTTP link found',
        description: 'GitHub enforces HTTPS. Insecure HTTP links may trigger mixed content warnings.',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Upgrade to HTTPS',
      });
    }

    // 3. Markdown Syntax & Quality
    if (/\[.*?\]\(\s*\)/.test(line)) {
      issues.push({
        id: `broken_empty_link_${lineNum}`,
        severity: 'error',
        category: 'markdown',
        title: 'Empty markdown link target',
        description: 'Found a markdown link with no destination URL [text]().',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Remove empty link parentheses',
      });
    }

    if (/^#+\s*$/.test(trimmed)) {
      issues.push({
        id: `empty_heading_${lineNum}`,
        severity: 'warning',
        category: 'markdown',
        title: 'Empty markdown heading',
        description: 'Found a heading marker with no text.',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Remove empty heading',
      });
    }

    // 4. Accessibility checks (images without alt text)
    if (/!\[\s*\]\(.*?\)/.test(line)) {
      issues.push({
        id: `missing_alt_${lineNum}`,
        severity: 'warning',
        category: 'accessibility',
        title: 'Image missing alt text',
        description: 'Screen readers cannot announce image context without descriptive alt text.',
        line: lineNum,
        autoFixable: true,
        fixLabel: 'Add default alt text',
      });
    }
  });

  // Dangling unclosed code fence check
  if (openCodeFence) {
    issues.push({
      id: 'unclosed_code_fence',
      severity: 'error',
      category: 'markdown',
      title: 'Unclosed markdown code block',
      description: 'Found an unclosed ``` code fence at the end of the file.',
      autoFixable: true,
      fixLabel: 'Close code fence (```)',
    });
  }

  // Completeness checks
  if (markdown.trim().length < 50) {
    issues.push({
      id: 'profile_too_short',
      severity: 'warning',
      category: 'completeness',
      title: 'Profile content is very short',
      description: 'High-performing developer profiles typically feature a bio, tech stack, and telemetry metrics.',
      autoFixable: false,
    });
  }

  if (!markdown.includes('# ')) {
    issues.push({
      id: 'missing_h1',
      severity: 'info',
      category: 'completeness',
      title: 'No primary H1 heading found',
      description: 'Consider adding a top-level "# Hello, I\'m [Name]" heading for strong visual hierarchy.',
      autoFixable: true,
      fixLabel: 'Insert H1 greeting',
    });
  }

  // 5. Configuration and Integration Integrity checks (when config is provided)
  if (config) {
    const userHandle = config.settings?.user?.github?.trim().toLowerCase();
    if (!userHandle || userHandle === 'username' || userHandle === 'zusername' || userHandle === 'your-username') {
      issues.push({
        id: 'cfg_placeholder_username',
        severity: 'warning',
        category: 'config',
        title: 'Placeholder GitHub handle detected',
        description: 'Configure your real GitHub username in Profile Settings to generate live telemetry.',
        autoFixable: false,
      });
    }

    if (!config.settings?.user?.name) {
      issues.push({
        id: 'cfg_missing_name',
        severity: 'info',
        category: 'config',
        title: 'Developer name not set',
        description: 'Add your display name in settings to personalize profile introductions.',
        autoFixable: false,
      });
    }

    // Check integration dependencies
    const hasTelemetry = config.sections?.some(
      s => s.type === 'github-readme-stats' || s.type === 'telemetry-isocalendar' || s.type === 'activity-graph'
    );
    if (hasTelemetry && (!userHandle || userHandle === 'username')) {
      issues.push({
        id: 'integration_unconfigured_telemetry',
        severity: 'warning',
        category: 'integration',
        title: 'Telemetry integration requires valid GitHub username',
        description: 'Telemetry widgets will fall back to demo mode until your GitHub handle is specified.',
        autoFixable: false,
      });
    }
  }

  // 6. Export Bounds checks
  if (markdown.length > 50000) {
    issues.push({
      id: 'export_size_warning',
      severity: 'warning',
      category: 'export',
      title: 'Large profile size (>50KB)',
      description: 'GitHub README pages render smoothest under 30KB. Consider optimizing image counts.',
      autoFixable: false,
    });
  }

  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  const infoCount = issues.filter((i) => i.severity === 'info').length;

  // Calculate quality score (0 - 100)
  let calculatedScore = 100;
  calculatedScore -= errorCount * 25;
  calculatedScore -= warningCount * 8;
  calculatedScore -= infoCount * 2;
  const finalScore = Math.max(0, Math.min(100, calculatedScore));

  const camoSafe = !issues.some(
    (i) => i.category === 'security' || i.category === 'camo-svg'
  );

  return {
    issues,
    errorCount,
    warningCount,
    infoCount,
    score: finalScore,
    camoSafe,
  };
}

/**
 * Automatically repairs fixable issues in the markdown string.
 */
export function autoFixDiagnostics(markdown: string): string {
  let fixed = markdown;

  // 1. Remove <script> tags
  fixed = fixed.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  fixed = fixed.replace(/<script.*?>/gi, '');

  // 2. Remove <iframe>, <object>, <embed>, <applet>
  fixed = fixed.replace(/<(?:iframe|object|embed|applet)\b[^<]*(?:(?!<\/(?:iframe|object|embed|applet)>)<[^<]*)*<\/(?:iframe|object|embed|applet)>/gi, '');
  fixed = fixed.replace(/<\/?(?:iframe|object|embed|applet)[^>]*>/gi, '');

  // 3. Remove inline on* event handlers
  fixed = fixed.replace(/\bon\w+\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, '');

  // 4. Remove javascript: URIs
  fixed = fixed.replace(/javascript:[^"'\s)]+/gi, '#');

  // 5. Upgrade http to https
  fixed = fixed.replace(/http:\/\//gi, 'https://');

  // 6. Remove empty links: [text]() -> text
  fixed = fixed.replace(/\[([^\]]+)\]\(\s*\)/g, '$1');

  // 7. Replace empty image alt: ![](url) -> ![Developer Badge](url)
  fixed = fixed.replace(/!\[\s*\]\((.*?)\)/g, '![Developer Badge]($1)');

  // 8. Remove empty headings
  const lines = fixed.split('\n');
  const filteredLines = lines.filter((l) => !/^#+\s*$/.test(l.trim()));
  fixed = filteredLines.join('\n');

  // 9. Close unclosed code fences
  const fenceMatches = fixed.match(/```/g);
  if (fenceMatches && fenceMatches.length % 2 !== 0) {
    fixed += '\n```\n';
  }

  return fixed;
}
