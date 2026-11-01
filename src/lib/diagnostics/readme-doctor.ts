/**
 * MonoForge README Doctor — Comprehensive Diagnostic & Quality Auditor
 * Analyzes GitHub Profile README Markdown, checks for broken embeds,
 * accessibility violations, Camo restrictions, and provides actionable auto-fixes.
 */

export interface DiagnosticIssue {
  id: string;
  category: 'camo' | 'accessibility' | 'syntax' | 'performance' | 'completeness';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  recommendation: string;
  autoFixAvailable: boolean;
  affectedLine?: number;
}

export interface ReadmeAuditReport {
  score: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  issues: DiagnosticIssue[];
  metrics: {
    totalLines: number;
    totalWords: number;
    imageCount: number;
    linkCount: number;
    codeBlockCount: number;
    badgesCount: number;
  };
  passedChecks: string[];
}

export function auditReadmeContent(markdown: string): ReadmeAuditReport {
  const issues: DiagnosticIssue[] = [];
  const passedChecks: string[] = [];

  const lines = markdown.split('\n');
  const totalLines = lines.length;
  const totalWords = markdown.split(/\s+/).filter(Boolean).length;

  // 1. Camo & Security Checks (Zero scripts, Zero iframes, Zero forms)
  const forbiddenPatterns = [
    { tag: '<script', name: 'Script Execution', rec: 'Remove <script> tags. GitHub Camo strips all executable scripts.' },
    { tag: '<iframe', name: 'iFrame Embedding', rec: 'Remove <iframe> tags. Use standard linked preview images instead.' },
    { tag: '<form', name: 'Form Inputs', rec: 'Remove <form> tags. GitHub does not allow interactive form elements in READMEs.' },
    { tag: '<style>@import', name: 'External CSS Imports', rec: 'Remove external font/CSS @import. Camo blocks external network imports.' },
  ];

  let hasCamoViolation = false;
  forbiddenPatterns.forEach(({ tag, name, rec }) => {
    if (markdown.toLowerCase().includes(tag)) {
      hasCamoViolation = true;
      issues.push({
        id: `camo-${tag.replace(/[^a-z]/g, '')}`,
        category: 'camo',
        severity: 'critical',
        title: `Unsupported ${name} Detected`,
        description: `Your README contains \`${tag}\` which is stripped or blocked by GitHub Camo proxy.`,
        recommendation: rec,
        autoFixAvailable: true,
      });
    }
  });

  if (!hasCamoViolation) {
    passedChecks.push('GitHub Camo Security: Zero prohibited scripts, frames, or external network font imports.');
  }

  // 2. Accessibility Checks (Images must have non-empty alt text)
  const markdownImgRegex = /!\[(.*?)\]\((.*?)\)/g;
  let emptyAltCount = 0;
  let imgMatch: RegExpExecArray | null;
  let imageCount = 0;

  while ((imgMatch = markdownImgRegex.exec(markdown)) !== null) {
    imageCount++;
    const altText = imgMatch[1].trim();
    if (!altText || altText === 'image' || altText === 'alt') {
      emptyAltCount++;
    }
  }

  // HTML <img> tags
  const htmlImgRegex = /<img\s+[^>]*>/gi;
  let htmlImgMatch: RegExpExecArray | null;
  while ((htmlImgMatch = htmlImgRegex.exec(markdown)) !== null) {
    imageCount++;
    const tag = htmlImgMatch[0];
    if (!tag.includes('alt=') || tag.includes('alt=""') || tag.includes("alt=''")) {
      emptyAltCount++;
    }
  }

  if (emptyAltCount > 0) {
    issues.push({
      id: 'a11y-missing-alt',
      category: 'accessibility',
      severity: 'warning',
      title: `${emptyAltCount} Image(s) Missing Alt Text`,
      description: 'Screen readers and assistive technologies require descriptive alt text for visual images and badges.',
      recommendation: 'Provide meaningful alt text for all badges and headers (e.g. ![TypeScript](...) or alt="TypeScript").',
      autoFixAvailable: true,
    });
  } else {
    passedChecks.push('Accessibility: All images and telemetry widgets contain descriptive alt text.');
  }

  // 3. Syntax & Markdown Balance (Unclosed code fences)
  const codeFenceMatches = markdown.match(/^```/gm) || [];
  const codeBlockCount = Math.floor(codeFenceMatches.length / 2);
  if (codeFenceMatches.length % 2 !== 0) {
    issues.push({
      id: 'syntax-unclosed-fence',
      category: 'syntax',
      severity: 'critical',
      title: 'Unclosed Code Block Fence',
      description: 'You have an odd number of ``` markdown code fences, which causes the rest of your README to render as code.',
      recommendation: 'Close your open code blocks with a matching ``` fence.',
      autoFixAvailable: true,
    });
  } else {
    passedChecks.push('Markdown Syntax: Code block fences are properly closed and formatted.');
  }

  // 4. Links & Embed Count
  const linkMatches = markdown.match(/\[.*?\]\((.*?)\)/g) || [];
  const linkCount = linkMatches.length;
  const badgesCount = (markdown.match(/img\.shields\.io|badge/gi) || []).length;

  // Insecure HTTP link warning
  if (markdown.includes('http://')) {
    issues.push({
      id: 'sec-insecure-http',
      category: 'camo',
      severity: 'warning',
      title: 'Insecure HTTP URLs Found',
      description: 'GitHub warns or blocks mixed-content HTTP images and links.',
      recommendation: 'Upgrade all URLs to https://.',
      autoFixAvailable: true,
    });
  } else {
    passedChecks.push('Security: All links and embeds use secure HTTPS transport.');
  }

  // 5. Completeness & Impact Checks
  if (totalLines < 15) {
    issues.push({
      id: 'complete-sparse',
      category: 'completeness',
      severity: 'info',
      title: 'Profile README is Very Brief',
      description: `Only ${totalLines} lines detected. Developer portfolios are more impactful with project highlights, skills, and telemetry.`,
      recommendation: 'Add an About Me section, active projects, and contribution metrics.',
      autoFixAvailable: false,
    });
  } else {
    passedChecks.push(`Content Depth: Comprehensive layout with ${totalLines} lines and ${totalWords} words.`);
  }

  // 6. External Widget Reliability
  if (markdown.includes('github-readme-stats.vercel.app') && !markdown.includes('cache_seconds')) {
    issues.push({
      id: 'perf-widget-cache',
      category: 'performance',
      severity: 'info',
      title: 'Uncached External Stats Widget',
      description: 'Third-party stats servers can experience rate-limiting during peak GitHub traffic.',
      recommendation: 'Use MonoForge native cached telemetry API (/api/telemetry/svg?plugin=...) for 100% uptime.',
      autoFixAvailable: false,
    });
  }

  // Calculate weighted score
  let score = 100;
  issues.forEach(issue => {
    if (issue.severity === 'critical') score -= 25;
    if (issue.severity === 'warning') score -= 10;
    if (issue.severity === 'info') score -= 4;
  });
  score = Math.max(0, Math.min(100, score));

  let grade: ReadmeAuditReport['grade'] = 'A+';
  if (score < 60) grade = 'F';
  else if (score < 70) grade = 'D';
  else if (score < 80) grade = 'C';
  else if (score < 90) grade = 'B';
  else if (score < 97) grade = 'A';

  return {
    score,
    grade,
    issues,
    metrics: {
      totalLines,
      totalWords,
      imageCount,
      linkCount,
      codeBlockCount,
      badgesCount,
    },
    passedChecks,
  };
}

/**
 * Automatically applies non-destructive fixes to common README issues
 */
export function autoFixReadmeContent(markdown: string): string {
  let fixed = markdown;

  // 1. Upgrade http:// to https://
  fixed = fixed.replace(/http:\/\/([^\s)]+)/gi, 'https://$1');

  // 2. Remove illegal scripts and frames
  fixed = fixed.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  fixed = fixed.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 3. Fix empty alt markdown images: ![]() -> ![Developer Badge]()
  fixed = fixed.replace(/!\[\s*\]\((.*?)\)/g, '![Developer Badge]($1)');

  // 4. Close unclosed code fences
  const fences = fixed.match(/^```/gm) || [];
  if (fences.length % 2 !== 0) {
    fixed += '\n```\n';
  }

  return fixed;
}
