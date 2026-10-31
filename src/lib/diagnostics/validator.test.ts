import { describe, expect, it } from 'vitest';
import { runDiagnostics, autoFixDiagnostics } from './validator';

describe('Central Diagnostics & Quality Engine', () => {
  it('detects no errors on a clean, valid profile', () => {
    const cleanMarkdown = `# Alex Rivera — Senior Cloud Architect

> Building resilient distributed databases and developer tooling.

### ⚡ Technologies
TypeScript, Go, Kubernetes, PostgreSQL

### 📊 Telemetry
![Stats](https://github-readme-stats.vercel.app/api?username=alex)
`;
    const report = runDiagnostics(cleanMarkdown);
    expect(report.errorCount).toBe(0);
    expect(report.camoSafe).toBe(true);
    expect(report.score).toBeGreaterThanOrEqual(90);
  });

  it('catches security violations (<script> and javascript: URIs)', () => {
    const badMarkdown = `# Hacked Profile
<script>alert('xss')</script>
[Click Me](javascript:void(0))
`;
    const report = runDiagnostics(badMarkdown);
    expect(report.errorCount).toBeGreaterThanOrEqual(2);
    expect(report.camoSafe).toBe(false);
    expect(report.score).toBeLessThan(70);
  });

  it('catches unclosed code fences and empty headings', () => {
    const brokenMarkdown = `# Valid
##
\`\`\`ts
const x = 10;
`;
    const report = runDiagnostics(brokenMarkdown);
    expect(report.issues.some((i) => i.id === 'unclosed_code_fence')).toBe(true);
    expect(report.issues.some((i) => i.id.startsWith('empty_heading'))).toBe(true);
  });

  it('auto-fixes security tags, unclosed fences, and http links', () => {
    const messyMarkdown = `# Hello
<script>alert(1)</script>
[Link](http://example.com)
\`\`\`typescript
const a = 1;
`;
    const fixed = autoFixDiagnostics(messyMarkdown);
    expect(fixed).not.toContain('<script');
    expect(fixed).toContain('https://example.com');
    // Code fence was closed
    const reportAfter = runDiagnostics(fixed);
    expect(reportAfter.errorCount).toBe(0);
    expect(reportAfter.camoSafe).toBe(true);
  });
});

