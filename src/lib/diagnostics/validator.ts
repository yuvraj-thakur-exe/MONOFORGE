/**
 * MonoForge Central Diagnostics & Quality Engine
 *
 * Comprehensive validator inspecting Markdown syntax, security boundaries,
 * Camo CDN compatibility, URL health, and profile completeness.
 */

export type DiagnosticSeverity = 'error' | 'warning' | 'info';

export type DiagnosticCategory =
  | 'security'
  | 'markdown'
  | 'camo-svg'
  | 'urls'
  | 'completeness'
  | 'accessibility';

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
export function runDiagnostics(markdown: string): DiagnosticReport {
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

  // 2. Remove javascript: URIs
  fixed = fixed.replace(/javascript:[^"'\s)]+/gi, '#');

  // 3. Upgrade http to https
  fixed = fixed.replace(/http:\/\//gi, 'https://');

  // 4. Remove empty links: [text]() -> text
  fixed = fixed.replace(/\[([^\]]+)\]\(\s*\)/g, '$1');

  // 5. Replace empty image alt: ![](url) -> ![Image](url)
  fixed = fixed.replace(/!\[\s*\]\((.*?)\)/g, '![Developer Badge]($1)');

  // 6. Remove empty headings
  const lines = fixed.split('\n');
  const filteredLines = lines.filter((l) => !/^#+\s*$/.test(l.trim()));
  fixed = filteredLines.join('\n');

  // 7. Close unclosed code fences
  const fenceMatches = fixed.match(/```/g);
  if (fenceMatches && fenceMatches.length % 2 !== 0) {
    fixed += '\n```\n';
  }

  return fixed;
}

