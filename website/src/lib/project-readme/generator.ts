import { ProjectReadmeConfig } from './types';

/**
 * Compiles a production-grade, GitHub Flavored Markdown (GFM) project README
 * adhering to modern developer-experience standards.
 */
export function buildProjectMarkdown(config: ProjectReadmeConfig): string {
  const parts: string[] = [];

  // 1. Header (Logo, Title, Tagline)
  if (config.logoUrl) {
    parts.push(
      `<p align="center">\n  <img src="${config.logoUrl}" alt="${config.name} Logo" width="120" height="120">\n</p>\n`
    );
  }

  parts.push(
    `<h1 align="center">${config.name}</h1>\n\n<p align="center">\n  <strong>${config.tagline}</strong>\n</p>\n`
  );

  // 2. Badges
  if (config.showBadges && config.badges.length > 0) {
    const activeBadges = config.badges.filter((b) => b.enabled);
    if (activeBadges.length > 0) {
      const badgeTags = activeBadges
        .map((b) => {
          const encodedLabel = encodeURIComponent(b.label);
          const encodedText = encodeURIComponent(b.text);
          const badgeUrl = `https://img.shields.io/badge/${encodedLabel}-${encodedText}-${b.color}?style=${b.style}`;
          if (b.link) {
            return `  <a href="${b.link}"><img src="${badgeUrl}" alt="${b.label}"></a>`;
          }
          return `  <img src="${badgeUrl}" alt="${b.label}">`;
        })
        .join('\n');

      parts.push(`<p align="center">\n${badgeTags}\n</p>\n`);
    }
  }

  // 3. Navigation Links (Demo, Docs, Report Bug)
  const navLinks: string[] = [];
  if (config.liveDemoUrl) {
    navLinks.push(`[Live Demo](${config.liveDemoUrl})`);
  }
  if (config.repositoryUrl) {
    navLinks.push(`[GitHub Repository](${config.repositoryUrl})`);
    navLinks.push(`[Report Issue](${config.repositoryUrl}/issues)`);
  }
  if (navLinks.length > 0) {
    parts.push(`<p align="center">\n  ${navLinks.join(' • ')}\n</p>\n\n---\n`);
  }

  // 4. Description
  if (config.description) {
    parts.push(`## Overview\n\n${config.description}\n`);
  }

  // 5. Key Features
  if (config.features.length > 0) {
    parts.push(`## Key Features\n`);
    for (const feat of config.features) {
      parts.push(`- **${feat.title}**: ${feat.description}`);
    }
    parts.push('');
  }

  // 6. Architecture / Mermaid Diagram
  if (config.showArchitecture && config.architectureMermaid.trim()) {
    parts.push(
      `## System Architecture\n\n\`\`\`mermaid\n${config.architectureMermaid.trim()}\n\`\`\`\n`
    );
  }

  // 7. Tech Stack Table
  if (config.techStack.length > 0) {
    parts.push(`## Tech Stack\n`);
    parts.push(`| Layer | Technology |`);
    parts.push(`| :--- | :--- |`);
    for (const item of config.techStack) {
      parts.push(`| **${item.category}** | \`${item.name}\` |`);
    }
    parts.push('');
  }

  // 8. Getting Started & Installation
  if (config.installSteps.length > 0 || config.quickStartCommand) {
    parts.push(`## Getting Started\n`);

    if (config.quickStartCommand) {
      parts.push(`### Quick Start\n\n\`\`\`bash\n${config.quickStartCommand}\n\`\`\`\n`);
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
  if (config.showEnvVariables && config.envVariables.length > 0) {
    parts.push(`## Environment Variables\n`);
    parts.push(`Create a \`.env\` file in the project root with the following keys:\n`);
    parts.push(`| Variable | Description | Required | Default |`);
    parts.push(`| :--- | :--- | :---: | :--- |`);
    for (const env of config.envVariables) {
      const req = env.required ? '**Yes**' : 'No';
      const def = env.defaultValue ? `\`${env.defaultValue}\`` : '—';
      parts.push(`| \`${env.key}\` | ${env.description} | ${req} | ${def} |`);
    }
    parts.push('');
  }

  // 10. Roadmap
  if (config.showRoadmap && config.roadmap.length > 0) {
    parts.push(`## Development Roadmap\n`);
    for (const item of config.roadmap) {
      const checkbox = item.done ? '[x]' : '[ ]';
      parts.push(`- ${checkbox} ${item.task}`);
    }
    parts.push('');
  }

  // 11. Custom Sections
  if (config.customSections.length > 0) {
    for (const sec of config.customSections) {
      if (sec.title && sec.content) {
        parts.push(`## ${sec.title}\n\n${sec.content}\n`);
      }
    }
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

  // Footer Attribution
  parts.push(
    `---\n\n<p align="center">\n  <em>Engineered with <a href="https://monoforge-studio.vercel.app">MonoForge</a> — The Developer Identity &amp; README Engineering Studio</em>\n</p>`
  );

  return parts.join('\n');
}

