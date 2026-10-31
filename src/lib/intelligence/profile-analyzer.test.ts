import { describe, it, expect } from 'vitest';
import { analyzeDeveloperProfile } from './profile-analyzer';

describe('Profile Intelligence Engine', () => {
  it('correctly analyzes an empty or sparse profile and surfaces critical recommendations', () => {
    const report = analyzeDeveloperProfile('');
    expect(report.overallScore).toBeLessThan(60);
    expect(report.suggestions.length).toBeGreaterThan(0);
    expect(report.suggestions.some(s => s.priority === 'critical')).toBe(true);
    expect(report.dimensions.securityAndCamo.score).toBeGreaterThan(0);
  });

  it('evaluates a rich senior developer profile with high score and high profileIQ', () => {
    const richMarkdown = `
<div align="center">

# Hi there, I'm Alex Johnson 👋
### Staff Distributed Systems Architect

Building hyper-scalable distributed query engines, high-speed telemetry, and open-source compilers.

[![GitHub](https://img.shields.io/badge/GITHUB-18181B?style=for-the-badge&logo=github)](https://github.com/alexdev)
[![LinkedIn](https://img.shields.io/badge/LINKEDIN-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/alexdev)
[![Website](https://img.shields.io/badge/PORTFOLIO-000000?style=for-the-badge)](https://alexdev.io)

---

## 🛠️ Core Technologies & Tooling
<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=ts,react,nextjs,rust,go,py,docker,k8s,aws,postgres&theme=dark" alt="Skill Icons" />
</a>

---

## 🚀 Featured Projects
- **QueryEngine**: Ultra-fast vectorized query execution engine in Rust. [Live Demo](https://queryengine.dev)
- **VectorGraph**: GPU accelerated node visualizer for large graphs. [Live Demo](https://graph.io)

---

## 📊 Live Developer Telemetry
<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=isocalendar&user=alexdev" width="100%" alt="Alex 3D Calendar" />
<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=languages&user=alexdev" width="100%" alt="Languages Donut" />

</div>
    `;

    const report = analyzeDeveloperProfile(richMarkdown);
    expect(report.overallScore).toBeGreaterThanOrEqual(80);
    expect(report.profileIQ).toBeGreaterThanOrEqual(130);
    expect(report.dimensions.skills.score).toBeGreaterThan(12);
    expect(report.dimensions.telemetry.score).toBeGreaterThan(12);
    expect(report.dimensions.projects.score).toBeGreaterThan(12);
    expect(report.dimensions.securityAndCamo.score).toBe(20);
  });

  it('detects insecure http links and penalizes security dimension', () => {
    const insecureMarkdown = `
# Developer
<img src="http://my-insecure-site.com/image.png" alt="Insecure Banner" />
    `;

    const report = analyzeDeveloperProfile(insecureMarkdown);
    expect(report.dimensions.securityAndCamo.score).toBeLessThan(15);
    expect(report.suggestions.some(s => s.id === 'sec-http')).toBe(true);
  });

  it('detects forbidden script tags and flags critical warning', () => {
    const maliciousMarkdown = `
# Developer
<script>alert("hack")</script>
    `;

    const report = analyzeDeveloperProfile(maliciousMarkdown);
    expect(report.dimensions.securityAndCamo.score).toBeLessThan(10);
    expect(report.suggestions.some(s => s.id === 'sec-script')).toBe(true);
  });
});
