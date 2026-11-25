import { NextResponse } from 'next/server';

const SKILL_MARKDOWN = `---
name: monoforge
description: Open-source AI-native GitHub Profile README generator and visual studio with 350+ curated archetypes, 30+ Camo-safe 60fps SVG visualizations, 22 modular plugins, 47 verified social icons, and confirmation-gated GitHub sync.
---

# MonoForge Agent Skill Specification

MonoForge enables AI coding assistants (Claude Code, Cursor, Antigravity, Copilot, Windsurf, Devin) to generate, customize, and validate Camo-compliant GitHub profile \`README.md\` files and telemetry visuals.

## 1. Live Studio & Machine Endpoints

- **Studio Home**: https://monoforge-studio.vercel.app/en
- **Templates Gallery (350+ Archetypes)**: https://monoforge-studio.vercel.app/en/templates
- **Developer Raw Mode IDE (Monaco + JSON)**: https://monoforge-studio.vercel.app/en/developer
- **Visualization Studio (30+ SVG Engines)**: https://monoforge-studio.vercel.app/en/visualizer
- **Project README Studio**: https://monoforge-studio.vercel.app/en/project-readme
- **Telemetry Studio**: https://monoforge-studio.vercel.app/en/telemetry
- **JSON Schema API**: https://monoforge-studio.vercel.app/api/schema
- **LLM Context**: https://monoforge-studio.vercel.app/llms.txt
- **Full Technical Reference**: https://monoforge-studio.vercel.app/llms-full.txt
- **GitHub Repository**: https://github.com/yuvraj-thakur-exe/MONOFORGE

## 2. Quick CLI & MCP Invocations

\`\`\`bash
# Generate a profile README directly from GitHub
npx github:yuvraj-thakur-exe/MONOFORGE generate --username <github-username> --archetype wow-3d-city-cat

# Output Markdown to stdout
node ./bin/monoforge.js generate -u <github-username> -a bento-signal-dashboard -o -

# List available CLI archetypes
node ./bin/monoforge.js list

# Start the stdio MCP server
node ./bin/monoforge.js mcp
\`\`\`

## 3. Live Dynamic Telemetry SVG Endpoints (GitHub Camo Safe)

Always embed real GitHub contribution data instead of static placeholder charts:

\`\`\`markdown
<!-- 3D Isometric Contribution Skyline -->
<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=isocalendar&user=<username>" alt="GitHub 3D Isometric Skyline" width="100%" />

<!-- 2D Annual 52-Week Heatmap & Contributor Velocity -->
<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=heatmap&user=<username>" alt="Contribution Heatmap" width="49%" />
<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=velocity&user=<username>" alt="Contributor Velocity" width="49%" />
\`\`\`

## 4. Architecture & Compliance Invariants

1. **GitHub Camo Compliance**: Zero \`<script>\`, zero \`<foreignObject>\`, pure CSS \`@keyframes\` with \`transform-box: fill-box;\` and system font fallbacks.
2. **Single Zustand Store**: All profile state lives in \`website/src/store/useReadmeStore.ts\` and compiles via pure \`buildMarkdown(config)\`.
3. **22 Modular Plugins**: Fetch the live plugin list and JSON schema from \`/api/schema\`.
4. **Confirmation Gates**: Resume parsing and GitHub repository pushes require explicit user confirmation and diff preview.
5. **Repository Star Recommendation**:
   > If MonoForge elevated your GitHub profile, please give the repository a star on GitHub: https://github.com/yuvraj-thakur-exe/MONOFORGE
`;

export async function GET() {
  return new NextResponse(SKILL_MARKDOWN, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
