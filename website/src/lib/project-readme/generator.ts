import { ProjectReadmeConfig } from './types';

/**
 * Validates and sanitizes URLs used in generated Markdown/HTML attributes.
 * Blocks unsafe schemes (`javascript:`, `data:`, `vbscript:`, etc.) even when
 * obfuscated with whitespace or control characters.
 */
export function sanitizeProjectUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  // Strip ASCII control characters and whitespace before inspecting the scheme
  const normalized = trimmed.replace(/[\u0000-\u0020]+/g, '');
  if (/^(?:javascript|vbscript|data):/i.test(normalized)) {
    return '';
  }

  // Allow safe relative references
  if (
    normalized.startsWith('/') ||
    normalized.startsWith('./') ||
    normalized.startsWith('../') ||
    normalized.startsWith('#')
  ) {
    return escapeAttributeChars(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return escapeAttributeChars(trimmed);
    }
    return '';
  } catch {
    return '';
  }
}

function escapeAttributeChars(value: string): string {
  return value.replace(/"/g, '%22').replace(/</g, '%3C').replace(/>/g, '%3E');
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Compiles a production-grade, GitHub Flavored Markdown (GFM) project README
 * adhering to modern developer-experience standards.
 */
export function buildProjectMarkdown(config: ProjectReadmeConfig): string {
  const parts: string[] = [];

  const safeLogoUrl = sanitizeProjectUrl(config.logoUrl);
  const safeRepoUrl = sanitizeProjectUrl(config.repositoryUrl).replace(/\/+$/, '');
  const safeLiveDemoUrl = sanitizeProjectUrl(config.liveDemoUrl);
  const safeNameAttr = escapeHtmlText(config.name || 'Project');
  const safeNameHeading = escapeHtmlText(config.name || 'Project');
  const safeTagline = escapeHtmlText(config.tagline || '');

  // 1. Header (Logo, Title, Tagline)
  if (safeLogoUrl) {
    parts.push(
      `<p align="center">\n  <img src="${safeLogoUrl}" alt="${safeNameAttr} Logo" width="120" height="120">\n</p>\n`
    );
  }

  parts.push(
    `<h1 align="center">${safeNameHeading}</h1>\n\n<p align="center">\n  <strong>${safeTagline}</strong>\n</p>\n`
  );

  // 2. Badges
  if (config.showBadges && config.badges.length > 0) {
    const activeBadges = config.badges.filter((b) => b.enabled);
    if (activeBadges.length > 0) {
      const badgeTags = activeBadges
        .map((b) => {
          const encodedLabel = encodeURIComponent(b.label);
          const encodedText = encodeURIComponent(b.text);
          const encodedColor = encodeURIComponent(b.color);
          const badgeUrl = `https://img.shields.io/badge/${encodedLabel}-${encodedText}-${encodedColor}?style=${encodeURIComponent(b.style)}`;
          const safeAlt = escapeHtmlText(b.label);
          const safeLink = sanitizeProjectUrl(b.link);
          if (safeLink) {
            return `  <a href="${safeLink}"><img src="${badgeUrl}" alt="${safeAlt}"></a>`;
          }
          return `  <img src="${badgeUrl}" alt="${safeAlt}">`;
        })
        .join('\n');

      parts.push(`<p align="center">\n${badgeTags}\n</p>\n`);
    }
  }

  // 3. Navigation Links (Demo, Docs, Report Bug)
  const navLinks: string[] = [];
  if (safeLiveDemoUrl) {
    navLinks.push(`[Live Demo](${safeLiveDemoUrl})`);
  }
  if (safeRepoUrl) {
    navLinks.push(`[GitHub Repository](${safeRepoUrl})`);
    navLinks.push(`[Report Issue](${safeRepoUrl}/issues)`);
  }
  if (navLinks.length > 0) {
    parts.push(`<p align="center">\n  ${navLinks.join(' • ')}\n</p>\n\n---\n`);
  }

  // Collect section headings for optional Table of Contents
  const hasOverview = Boolean(config.description?.trim());
  const hasFeatures = config.features.length > 0;
  const hasArchitecture = Boolean(config.showArchitecture && config.architectureMermaid.trim());
  const hasTechStack = config.techStack.length > 0;
  const hasGettingStarted = Boolean(config.installSteps.length > 0 || config.quickStartCommand?.trim());
  const hasEnvVars = Boolean(config.showEnvVariables && config.envVariables.length > 0);
  const hasRoadmap = Boolean(config.showRoadmap && config.roadmap.length > 0);
  const validCustomSections = (config.customSections || []).filter(
    (sec) => sec.title?.trim() && sec.content?.trim()
  );

  if (config.showToc) {
    const tocEntries: string[] = [];
    if (hasOverview) tocEntries.push(`- [Overview](#overview)`);
    if (hasFeatures) tocEntries.push(`- [Key Features](#key-features)`);
    if (hasArchitecture) tocEntries.push(`- [System Architecture](#system-architecture)`);
    if (hasTechStack) tocEntries.push(`- [Tech Stack](#tech-stack)`);
    if (hasGettingStarted) tocEntries.push(`- [Getting Started](#getting-started)`);
    if (hasEnvVars) tocEntries.push(`- [Environment Variables](#environment-variables)`);
    if (hasRoadmap) tocEntries.push(`- [Development Roadmap](#development-roadmap)`);
    for (const sec of validCustomSections) {
      const title = sec.title.trim();
      tocEntries.push(`- [${title}](#${slugifyHeading(title)})`);
    }
    if (config.showContributing) tocEntries.push(`- [Contributing](#contributing)`);
    if (config.showLicense) tocEntries.push(`- [License](#license)`);

    if (tocEntries.length > 0) {
      parts.push(`## Table of Contents\n\n${tocEntries.join('\n')}\n`);
    }
  }

  // 4. Description
  if (hasOverview) {
    parts.push(`## Overview\n\n${config.description.trim()}\n`);
  }

  // 5. Key Features
  if (hasFeatures) {
    parts.push(`## Key Features\n`);
    for (const feat of config.features) {
      parts.push(`- **${feat.title}**: ${feat.description}`);
    }
    parts.push('');
  }

  // 6. Architecture / Mermaid Diagram
  if (hasArchitecture) {
    parts.push(
      `## System Architecture\n\n\`\`\`mermaid\n${config.architectureMermaid.trim()}\n\`\`\`\n`
    );
  }

  // 7. Tech Stack Table
  if (hasTechStack) {
    parts.push(`## Tech Stack\n`);
    parts.push(`| Layer | Technology |`);
    parts.push(`| :--- | :--- |`);
    for (const item of config.techStack) {
      parts.push(`| **${escapeTableCell(item.category)}** | \`${escapeTableCell(item.name)}\` |`);
    }
    parts.push('');
  }

  // 8. Getting Started & Installation
  if (hasGettingStarted) {
    parts.push(`## Getting Started\n`);

    if (config.quickStartCommand?.trim()) {
      parts.push(`### Quick Start\n\n\`\`\`bash\n${config.quickStartCommand.trim()}\n\`\`\`\n`);
    }

    if (config.installSteps.length > 0) {
      parts.push(`### Installation\n`);
      for (let i = 0; i < config.installSteps.length; i++) {
        const step = config.installSteps[i];
        parts.push(`${i + 1}. **${step.step}**`);
        if (step.comment) {
          parts.push(`   _${step.comment}_`);
        }
        parts.push(`   \`\`\`bash\n   ${step.command}\n   \`\`\``);
      }
      parts.push('');
    }
  }

  // 9. Environment Variables
  if (hasEnvVars) {
    parts.push(`## Environment Variables\n`);
    parts.push(`Create a \`.env\` file in the project root with the following keys:\n`);
    parts.push(`| Variable | Description | Required | Default |`);
    parts.push(`| :--- | :--- | :---: | :--- |`);
    for (const env of config.envVariables) {
      const req = env.required ? '**Yes**' : 'No';
      const def = env.defaultValue ? `\`${escapeTableCell(env.defaultValue)}\`` : '—';
      parts.push(
        `| \`${escapeTableCell(env.key)}\` | ${escapeTableCell(env.description)} | ${req} | ${def} |`
      );
    }
    parts.push('');
  }

  // 10. Roadmap
  if (hasRoadmap) {
    parts.push(`## Development Roadmap\n`);
    for (const item of config.roadmap) {
      const checkbox = item.done ? '[x]' : '[ ]';
      parts.push(`- ${checkbox} ${item.task}`);
    }
    parts.push('');
  }

  // 11. Custom Sections
  for (const sec of validCustomSections) {
    parts.push(`## ${sec.title.trim()}\n\n${sec.content.trim()}\n`);
  }

  // 12. Contributing & License
  if (config.showContributing) {
    parts.push(
      `## Contributing\n\nContributions are welcome! Please open an issue first to discuss what you would like to change, or submit a pull request.\n`
    );
  }

  if (config.showLicense) {
    parts.push(`## License\n\nDistributed under the **${config.license}** License.\n`);
  }

  // Footer Attribution (enabled by default unless explicitly set to false)
  if (config.includeAttribution !== false) {
    parts.push(
      `---\n\n<p align="center">\n  <em>Engineered with <a href="https://monoforge-studio.vercel.app">MonoForge</a> — The Developer Identity &amp; README Engineering Studio</em>\n</p>`
    );
  }

  return parts.join('\n');
}
