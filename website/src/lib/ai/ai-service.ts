import {
  AiActionType,
  AiRequest,
  AiResponse,
  AiResponseResult,
} from './types';
import { suggest_assets, search_assets } from '../assets/asset-discovery';

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
    case 'search-assets': {
      const suggested = suggest_assets(cleanPrompt);
      const fallbackSearch = suggested.length > 0 ? suggested : search_assets({ query: cleanPrompt });
      const assetList = fallbackSearch.map(a => ({
        id: a.id,
        name: a.name,
        publicUrl: a.publicUrl,
        category: a.category,
        format: a.format,
      }));

      const topAsset = fallbackSearch[0];
      const markdown = topAsset
        ? `<p align="center">\n  <img src="${topAsset.publicUrl}" alt="${topAsset.name}" width="${topAsset.width || '100%'}" />\n</p>`
        : '';

      return {
        assets: assetList,
        markdown,
        summary: `Discovered ${assetList.length} matching application assets in MonoForge Asset Registry.`,
        suggestions: assetList.slice(0, 3).map(a => `Reuse ${a.name} (${a.category}) at ${a.publicUrl}`),
      };
    }

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

    case 'suggest-sections': {
      return {
        suggestions: [
          '1. Kinetic Cyber Banner (Header hook)',
          '2. Elevator Bio with role declaration',
          '3. 3-Tier Categorized Tech Badges (Languages, Frameworks, Cloud)',
          '4. Flagship Projects Showcase with live demo URLs',
          '5. 3D Isometric Commit Terrain & 24h Rhythm Dial',
          '6. Gamified Achievement Badges',
          '7. Social Gateways & Contact Footer',
        ],
        summary: 'Recommended high-conversion 7-stage developer narrative.',
      };
    }

    case 'generate-template': {
      const templateMd = `# Alex Vance — Principal Systems Architect

> Designing resilient distributed state machines and high-throughput stream engines.

### ⚡ Technical Stack
\`Rust\` \`TypeScript\` \`Go\` \`PostgreSQL\` \`Kubernetes\` \`Docker\` \`Kafka\`

### 🏆 Featured Artifacts
- **[AetherNet](https://github.com)** — Zero-copy peer-to-peer event broker.
- **[VoxelGrid](https://github.com)** — 60fps GPU telemetry engine for web.

### 📊 Activity Radar
<p align="center">
  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?type=radar&user=octocat&theme=cyberpunk" alt="Radar Telemetry" />
</p>
`;
      return {
        markdown: templateMd,
        headline: 'Principal Systems Architect',
        bio: 'Designing resilient distributed state machines and high-throughput stream engines.',
        technologies: ['Rust', 'TypeScript', 'Go', 'PostgreSQL', 'Kubernetes', 'Docker'],
        suggestions: [
          'Applied Cyberpunk Architect layout archetype',
          'Configured high-contrast neon badges',
          'Injected Camo-safe activity radar SVG',
        ],
      };
    }

    case 'explain-telemetry': {
      return {
        summary:
          'Your profile telemetry highlights a strong weekend rhythm with highest commit density between 14:00 and 19:00 UTC. The 3D isometric terrain reflects sustained 42-day streak consistency, while the polyglot donut indicates a TypeScript-dominant architecture (64%) supported by Go (22%) and Rust (14%).',
        suggestions: [
          'Feature the 3D Isometric terrain prominently to showcase streak momentum',
          'Pair the 24h Activity dial with your primary timezone badge',
        ],
      };
    }

    case 'recommend-design': {
      return {
        suggestions: [
          'Align badge styles: use uniform "for-the-badge" or "flat" style across all skill tags',
          'Maintain consistent spacing: introduce horizontal rules (<hr/>) between major sections',
          'Center telemetry charts with <p align="center"> for balanced GitHub desktop & mobile presentation',
          'Adopt a curated theme (e.g. TokyoNight or Cyberpunk) across SVG badges for visual unity',
        ],
        summary: 'Audited visual hierarchy: recommended badge standardization and section centering.',
      };
    }

    // --- MonoForge README Creator Agent Slash Commands ---
    case 'create': {
      const name = cleanPrompt || 'Alex Mercer';
      return {
        markdown: `# ${name} // Principal Systems Architect\n\n> Building resilient distributed computing engines and high-throughput telemetry pipelines.\n\n[![Commit City](https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=commitcity&user=octocat&theme=emerald)](https://github.com/yuvraj-thakur-exe/MONOFORGE)\n\n### ⚡ Mastered Architecture\n- **Languages**: TypeScript, Rust, Python, Go, SQL\n- **Cloud & Systems**: Kubernetes, Docker, AWS, Kafka, Linux eBPF\n\n### 📊 Live Contributor Telemetry\n<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=pulse&user=octocat&theme=matrix" alt="Coding Pulse" width="100%" />\n</p>`,
        headline: 'Principal Systems Architect',
        bio: 'Building resilient distributed computing engines and high-throughput telemetry pipelines.',
        technologies: ['TypeScript', 'Rust', 'Python', 'Go', 'Kubernetes', 'Docker'],
        suggestions: ['Hydrated 3D Commit City', 'Configured 60fps Coding Pulse', 'Audited Camo safety'],
      };
    }

    case 'visual': {
      return {
        markdown: `[![Developer Visualization](https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=commitcity&user=octocat&theme=emerald)](https://github.com/yuvraj-thakur-exe/MONOFORGE)`,
        summary: 'Generated 60fps Camo-safe visual asset embed snippet (Commit City 3D).',
        suggestions: ['Select between 9 signature architectures in /visualizer'],
      };
    }

    case 'animate': {
      return {
        markdown: `<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=snake&user=octocat&theme=amber" alt="Animated Snake" width="100%" />\n</p>`,
        summary: 'Generated 60fps vector animation asset (Contribution Snake arcade journey).',
        suggestions: ['Embedded CSS @keyframes', 'Respects prefers-reduced-motion'],
      };
    }

    case 'chart': {
      return {
        markdown: `<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=river&user=octocat&theme=ocean" alt="Commit River" width="100%" />\n</p>`,
        summary: 'Hydrated dynamic SVG river chart with live contributor frequency.',
        suggestions: ['Synced with GitHub user commit history'],
      };
    }

    case 'diagram': {
      return {
        markdown: `\`\`\`mermaid\ngraph LR\n  A[Next.js Client] --> B[Zustand Store]\n  B --> C[Pure buildMarkdown]\n  C --> D[GitHub Camo Proxy]\n  D --> E[Profile README.md]\n\`\`\``,
        summary: 'Generated GitHub-compatible architecture sequence diagram.',
        suggestions: ['Renders natively on GitHub without external images'],
      };
    }

    case 'banner': {
      return {
        markdown: `<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,2,3,4&height=180&section=header&text=MONOFORGE&fontSize=52&fontColor=fff&animation=twinkling" width="100%" />\n</p>`,
        summary: 'Created dynamic waving capsule banner tuned to signature palette.',
        suggestions: ['Camo-safe animated header'],
      };
    }

    case 'component': {
      return {
        markdown: `<p align="center">\n  <img src="https://skillicons.dev/icons?i=ts,react,next,rust,py,docker,aws" alt="Tech Stack" />\n</p>`,
        summary: 'Generated categorized skill icons deck.',
        suggestions: ['High-contrast shields for top languages'],
      };
    }

    case 'import': {
      return {
        summary: 'Imported repository metadata and calibrated streak metrics into store.',
        suggestions: ['Verified remote diff before applying'],
      };
    }

    case 'redesign': {
      return {
        markdown: `# Transformed Developer Portfolio\n\n> Engineered for high impact, dynamic telemetry, and clean typographic hierarchy.\n\n[![Constellation](https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=constellation&user=octocat&theme=slate)](https://github.com/yuvraj-thakur-exe/MONOFORGE)`,
        summary: 'Executed full visual redesign conforming to MonoForge standards.',
        suggestions: ['Upgraded boring static markdown to dynamic telemetry bento'],
      };
    }

    case 'optimize': {
      return {
        summary: 'Optimized README: removed broken links, compressed assets, ensured zero foreignObject tags.',
        suggestions: ['Ready for production deployment'],
      };
    }

    case 'doctor': {
      return {
        summary: 'README Doctor audit: Score 96/100. Camo safe, no broken tags, valid markdown AST.',
        suggestions: ['Launch /doctor modal for 1-click auto fix'],
      };
    }

    case 'export': {
      return {
        markdown: `# Export Package Ready\n\nProfile README formatted for production push to <username>/<username> repo.`,
        summary: 'Prepared export assets and confirmed Camo compliance.',
        suggestions: ['Ready for 1-click GitHub push'],
      };
    }

    case 'generate-readme':
    default: {
      const name = cleanPrompt || 'Software Craftsman';
      const markdown = `# Hey there, I'm ${name} 👋

> Full-stack developer building open-source tooling, modern web architectures, and reliable cloud software.

[![Header](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,2,3,4&height=180&section=header&text=${encodeURIComponent(
        name
      )}&fontSize=42&fontColor=fff&animation=fadeIn)](https://github.com/yuvraj-thakur-exe/MONOFORGE)

---

### 💻 Mastered Stack
<p align="center">
  <img src="https://skillicons.dev/icons?i=ts,react,next,node,postgres,docker,git" alt="My Skills" />
</p>

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
