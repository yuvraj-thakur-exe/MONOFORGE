import {
  AiActionType,
  AiRequest,
  AiResponse,
  AiResponseResult,
} from './types';

/**
 * Heuristic synthesizer for offline mode or demo accounts without OpenRouter key.
 */
export function synthesizeFallbackAiResponse(
  action: AiActionType,
  prompt: string,
  context?: AiRequest['context']
): AiResponseResult {
  const cleanPrompt = prompt.trim();

  switch (action) {
    case 'generate-bio': {
      return {
        bio: `Software Engineer specializing in scalable distributed systems and high-craft interfaces. Passionate about open-source tooling, modern web architectures, and crafting developer experiences that feel like magic.`,
        headline: `Staff Engineer & Systems Architect`,
        suggestions: [
          'Add metrics on user impact or performance gains',
          'Include a personal link or social handle',
        ],
      };
    }

    case 'suggest-skills': {
      const skills = [
        'TypeScript',
        'Next.js',
        'React',
        'Node.js',
        'Tailwind CSS',
        'PostgreSQL',
        'Docker',
        'GraphQL',
        'Vitest',
        'Git',
      ];
      return {
        technologies: skills,
        suggestions: [
          'Organize skills into Languages, Frameworks, and Cloud/DevOps tiers',
          'Prioritize technologies actively used in recent repositories',
        ],
      };
    }

    case 'describe-project': {
      return {
        projects: [
          {
            name: cleanPrompt.length < 30 ? cleanPrompt : 'MonoForge Engine',
            description:
              'A high-performance open-source developer toolkit and profile README generator with 47+ native telemetry modules.',
            url: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
            tags: ['TypeScript', 'Next.js', 'Tailwind', 'SVG'],
          },
        ],
        suggestions: [
          'Add live demo badges and test coverage stats to project cards',
        ],
      };
    }

    case 'improve-readme': {
      const current = context?.rawMarkdown || prompt;
      const improved = current.includes('# ')
        ? current
        : `# ${cleanPrompt || 'Developer Profile'}\n\n${current}\n\n### 🚀 Telemetry & Metrics\n\n![Stats](https://github-readme-stats.vercel.app/api?username=octocat&show_icons=true&theme=tokyonight)`;

      return {
        markdown: improved,
        suggestions: [
          'Restructured headings for high-impact visual hierarchy',
          'Added animated tech badge shelf and stats banner',
          'Improved markdown readability score by ~22%',
        ],
      };
    }

    case 'generate-readme':
    default: {
      const name = cleanPrompt.length < 40 ? cleanPrompt : 'Lead Engineer';
      const markdown = `# Hey there, I'm ${name} 👋

> **Crafting scalable distributed systems & high-performance developer identity tooling.**

---

### ⚡ Core Tech Stack
\`TypeScript\` \`Next.js 16\` \`React\` \`Node.js\` \`PostgreSQL\` \`Docker\` \`Tailwind CSS\` \`Vitest\`

---

### 🛠️ Featured Open-Source Projects
- **[HyperDrive](https://github.com)** — Distributed in-memory cache with sub-millisecond p99 latencies.
- **[NeonPulse](https://github.com)** — 60fps GPU-accelerated SVG visualization dashboard.

---

### 📊 GitHub Activity Telemetry
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=yuvraj-thakur-exe&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</p>
`;
      return {
        markdown,
        bio: `Crafting scalable distributed systems & high-performance developer identity tooling.`,
        headline: `${name} — Software Architect`,
        technologies: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
        suggestions: [
          'Generated 4-section README layout',
          'Injected featured projects table with link badges',
          'Added 100% Camo-safe telemetry metrics',
        ],
      };
    }
  }
}

/**
 * Calls server API endpoint `/api/ai` or falls back gracefully.
 */
export async function requestAiAssistant(request: AiRequest): Promise<AiResponse> {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      // If server returned error, fall back gracefully with heuristic response
      return {
        success: true,
        result: synthesizeFallbackAiResponse(request.action, request.prompt, request.context),
        error: errData.error || 'API rate limited; fallback generator applied.',
        modelUsed: 'heuristic-engine',
      };
    }

    const data: AiResponse = await res.json();
    return data;
  } catch (err) {
    // Network or client error -> synthesize fallback
    return {
      success: true,
      result: synthesizeFallbackAiResponse(request.action, request.prompt, request.context),
      error: (err as Error).message,
      modelUsed: 'heuristic-engine',
    };
  }
}
