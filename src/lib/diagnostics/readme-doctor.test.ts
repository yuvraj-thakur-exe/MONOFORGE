import { describe, it, expect } from 'vitest';
import { auditReadmeContent, autoFixReadmeContent } from './readme-doctor';

describe('MonoForge README Doctor Diagnostic Suite', () => {
  it('awards a perfect score (100 / A+) to clean, well-formed READMEs', () => {
    const cleanMarkdown = `
# Alex Mercer
Principal Systems Architect & Open-Source Maintainer

![Commit City](https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=commitcity&user=octocat)

## About Me
- Building distributed data engines and creative developer tooling.
- Core maintainer of MonoForge.

\`\`\`typescript
const status = "Shipping 60fps developer telemetry";
\`\`\`
    `.trim();

    const report = auditReadmeContent(cleanMarkdown);
    expect(report.score).toBeGreaterThanOrEqual(95);
    expect(report.grade).toMatch(/A\+?|A/);
    expect(report.issues.filter(i => i.severity === 'critical')).toHaveLength(0);
  });

  it('detects Camo-incompatible scripts and unclosed code fences', () => {
    const badMarkdown = `
# Broken README
<script>alert('hack')</script>
\`\`\`javascript
const unclosed = true;
    `.trim();

    const report = auditReadmeContent(badMarkdown);
    expect(report.score).toBeLessThan(70);
    const criticals = report.issues.filter(i => i.severity === 'critical');
    expect(criticals.length).toBeGreaterThanOrEqual(2);
    expect(criticals.some(i => i.id.includes('camo'))).toBe(true);
    expect(criticals.some(i => i.id.includes('fence'))).toBe(true);
  });

  it('detects missing alt text and insecure HTTP links', () => {
    const accessibleIssues = `
![](http://example.com/badge.png)
<img src="http://example.com/pic.jpg" />
    `.trim();

    const report = auditReadmeContent(accessibleIssues);
    expect(report.issues.some(i => i.id === 'a11y-missing-alt')).toBe(true);
    expect(report.issues.some(i => i.id === 'sec-insecure-http')).toBe(true);
  });

  it('automatically repairs common issues with autoFixReadmeContent', () => {
    const broken = `
![](http://example.com/badge.png)
<script>console.log('strip me');</script>
\`\`\`bash
echo "open fence"
    `.trim();

    const fixed = autoFixReadmeContent(broken);
    expect(fixed).not.toContain('<script>');
    expect(fixed).not.toContain('http://');
    expect(fixed).toContain('https://');
    expect(fixed).not.toContain('![](');
    expect(fixed).toContain('![Developer Badge](');

    // After autofix, code fences must be balanced
    const fences = fixed.match(/^```/gm) || [];
    expect(fences.length % 2).toBe(0);
  });
});
