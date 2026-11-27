import { NextResponse } from 'next/server';

const SKILL_MARKDOWN = `---
name: monoforge
description: Open-source AI-native GitHub Profile and Project README generator and visual studio with 330 curated archetypes, 30+ Camo-safe 60fps SVG visualizations, a 6-Act Canvas Contribution Story, Terminal Profile Kit with ASCII Portrait, 22 modular plugins, 47 verified social icons, and confirmation-gated GitHub sync.
---

# MonoForge Agent Skill Specification

MonoForge enables AI coding assistants (Claude Code, Cursor, Antigravity, Copilot, Windsurf, Devin) to generate, customize, and validate Camo-compliant GitHub profile and repository \`README.md\` files and telemetry visuals.

## 1. Live Studio & Machine Endpoints

- **Studio Home**: https://monoforge-studio.vercel.app/en
- **Templates Gallery (330 Archetypes)**: https://monoforge-studio.vercel.app/en/templates
- **Developer Raw Mode IDE (Monaco + JSON)**: https://monoforge-studio.vercel.app/en/developer
- **Visualization Studio (30+ Engines & 6-Act Story)**: https://monoforge-studio.vercel.app/en/visualizer
- **SVG Animator & Terminal Profile Kit (ASCII Portrait)**: https://monoforge-studio.vercel.app/en/animator
- **Project README Studio**: https://monoforge-studio.vercel.app/en/project-readme
- **Telemetry Studio**: https://monoforge-studio.vercel.app/en/telemetry
- **Asset & Sticker Vault**: https://monoforge-studio.vercel.app/en/assets
- **JSON Schema API**: https://monoforge-studio.vercel.app/api/schema
- **LLM Context**: https://monoforge-studio.vercel.app/llms.txt
- **Full Technical Reference**: https://monoforge-studio.vercel.app/llms-full.txt
- **GitHub Repository**: https://github.com/yuvraj-thakur-exe/MONOFORGE

## 2. Zero-Config MCP Server (7 Tools) & CLI Invocations

Connect any MCP client (Claude Code, Claude Desktop, Cursor, Antigravity) using root \`.mcp.json\` or \`node ./bin/monoforge.js mcp\` for 7 tools: \`build_interactive_readme\`, \`generate_profile_readme\`, \`list_archetypes\`, \`list_visualizations\`, \`search_assets\`, \`inspect_asset\`, and \`generate_telemetry_embed\`.

\`\`\`bash
# Build a customized interactive README with animated SVGs, buttons & <details> panels
npx github:yuvraj-thakur-exe/MONOFORGE build --username <github-username> --theme emerald

# Generate a profile README from 40 built-in archetypes directly from GitHub
npx github:yuvraj-thakur-exe/MONOFORGE generate --username <github-username> --archetype wow-3d-city-cat

# Output Markdown to stdout
node ./bin/monoforge.js generate -u <github-username> -a bento-signal-dashboard -o -

# List available CLI archetypes or live SVG visualizations
node ./bin/monoforge.js list
node ./bin/monoforge.js visualizations

# Start the stdio MCP server
node ./bin/monoforge.js mcp
\`\`\`

## 3. Live Dynamic Telemetry SVG Endpoints (GitHub Camo Safe)

Always embed real GitHub contribution data instead of static placeholder charts:

\`\`\`markdown
<!-- MonoForge Diagonal Contribution Heatmap & Neofetch Whoami -->
<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=diagonal-heatmap&user=<username>&theme=emerald" alt="Diagonal Contribution Heatmap" width="100%" />
<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=whoami&user=<username>&theme=emerald" alt="Developer Whoami Card" width="490" />

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
