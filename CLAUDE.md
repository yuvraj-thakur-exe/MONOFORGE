# MonoForge — Claude & AI Agent Guide

MonoForge is an open-source, AI-native GitHub Profile & Project README engineering platform built with Next.js 16, React 19, TypeScript, Zustand, Zod, and Camo-safe SVG/Canvas engines.

Any AI coding assistant (**Claude Code**, **Claude Desktop**, **Cursor**, **Antigravity**, **Windsurf**, **Cline**, **GitHub Copilot**) can use this repository out of the box via **`.mcp.json`**, **`.claude/commands/`**, **CLI (`bin/monoforge.js`)**, or the **HTTP APIs**.

---

## 1. Zero-Config MCP Server (Recommended for Claude & Cursor)

`.mcp.json` (root) and `.cursor/mcp.json` automatically expose the MonoForge MCP stdio server (`node bin/monoforge.js mcp`):

- **`build_interactive_readme`** — Generates a personalized, interactive `README.md` with animated hero SVG/mascot, clickable Studio/CTA buttons, verified social badges, `diagonal-heatmap` + `whoami` or `city`/`radar` telemetry embeds, `<details>` expandable accordions, clean symbols, and a native Mermaid architecture diagram.
- **`generate_profile_readme`** — Generates Markdown from 40 built-in CLI archetypes (`wow-3d-city-cat`, `bento-signal-dashboard`, `forge-telemetry-dashboard`, `neon-craftsman-owl`, `minimal-light-unicorn`, `constellation-devops-desk`, `isometric-terminal-connect`, `pinterest-lofi-aesthetic`, etc.).
- **`list_archetypes`** — Lists all 40 CLI archetypes with categories and accent colors.
- **`list_visualizations`** — Returns all 30+ SVG telemetry plugins (`diagonal-heatmap`, `whoami`, `city`, `isocalendar`, `river`, `languageriver`, `radar`, `blueprint`, `pulse`, `yearclock`, `neofetch`, `synthwave`, etc.) and 7 themes (`emerald`, `matrix`, `cyberpunk`, `tokyonight`, `amber`, `slate`, `ocean`).
- **`search_assets`** — Searches real Camo-safe SVGs in `public/assets/` (53 assets) and all 47 verified social icons in `public/assets/icons/social/`.
- **`inspect_asset`** — Parses real SVG `viewBox`, dimensions, byte size, and validates Camo compliance (`0 <script>`, `0 <foreignObject>`).
- **`generate_telemetry_embed`** — Produces ready-to-embed `<img src="...">` HTML wrapped in an interactive clickable Studio button/link.

### Claude Code Slash Commands
- `/forge-readme` (`.claude/commands/forge-readme.md`) — Interactive profile README builder with animations, symbols, buttons, visuals, and telemetry.
- `/forge-project-readme` (`.claude/commands/forge-project-readme.md`) — Repo-inspector project README generator with Mermaid architecture diagrams and interactive collapsible specs.

---

## 2. Quick CLI Usage

```bash
# Build a customized interactive README directly to stdout
node bin/monoforge.js build --username <username> --name "<Name>" --role "<Role>" --theme emerald -o -

# Generate from any of the 40 visual archetypes
node bin/monoforge.js generate --username <username> --archetype wow-3d-city-cat --output README.md

# List all 40 archetypes
node bin/monoforge.js list

# Run standalone MCP stdio server
node bin/monoforge.js mcp
```

---

## 3. Active Web Studio Routes & Machine APIs

- `/en` — Main Visual Studio
- `/en/templates` — **330 Curated Archetypes** rendered through the real GFM pipeline (`buildMarkdown`)
- `/en/developer` — Monaco Raw Mode JSON IDE + Zod IntelliSense + **22 modular plugins**
- `/en/visualizer` — **30+ SVG/Canvas Engines** + **6-Act Contribution Story** pure Canvas animations
- `/en/animator` — Vector Animator Studio + **Terminal Profile Kit & Monochrome ASCII Portrait SVG**
- `/en/project-readme` — 9-tab Project README Studio with real GitHub repo manifest inspection (`/api/project-readme/inspect`)
- `/en/telemetry` — Telemetry Arsenal (20 infographic presets + GitHub Actions generator)
- `/en/assets` — Unified Asset & Sticker Vault (53 core assets + 47 verified social icons)
- **Machine Endpoints**: `/api/schema`, `/api/agent/skill`, `/api/telemetry/svg`, `/llms.txt`, `/llms-full.txt`, `/.well-known/ai-plugin.json`

### Autonomous Agent Skill Specs
- [`.agents/skills/monoforge/SKILL.md`](.agents/skills/monoforge/SKILL.md)
- [`.agents/skills/monoforge-readme-creator/SKILL.md`](.agents/skills/monoforge-readme-creator/SKILL.md)
- [`.agents/skills/visual-asset-builder/SKILL.md`](.agents/skills/visual-asset-builder/SKILL.md)
- [`.agents/skills/readme-vector-animator/SKILL.md`](.agents/skills/readme-vector-animator/SKILL.md)

---

## 4. Architecture Invariants (Never Violate)

- **Single Zustand Store**: `website/src/store/useReadmeStore.ts` holds all profile state. Never create duplicate stores.
- **Pure Generator Function**: `buildMarkdown(config) -> string` (`website/src/lib/buildMarkdown.ts`) compiles profile Markdown with zero React and zero side effects.
- **Plugin System**: Every plugin is a pure object in `website/src/lib/plugins/wrappers/` conforming to `website/src/lib/plugins/types.ts` and registered in `website/src/lib/plugins/registry.ts`.
- **GitHub Camo Rules**: Zero `<script>`, zero `<foreignObject>`, system font fallbacks, `@media (prefers-reduced-motion: reduce)`, and GPU-accelerated CSS animations (`opacity`, `transform`).
- **Confirmation Gates**: Resume imports (`ConfirmGate.tsx`) and GitHub commits (`DiffPreview.tsx`) require explicit user confirmation.
- **Asset Intelligence & Protection**: Search the MonoForge Asset Registry before generating new icons or logos; reuse existing verified assets in `public/assets/`.
- **Palette Invariant**: Avoid pitch black (`#000000`, `#0a0a0a`, `#18181b`). Use refined slate (`#1e293b`, `#334155`, `#475569`), warm white (`#fafbfc`, `#f8fafc`), amber (`#f59e0b`, `#ffe600`), and emerald (`#10b981`).

## Commands

```bash
pnpm install
pnpm dev        # Run web studio at http://localhost:3000
pnpm test       # Run Vitest unit tests
pnpm type-check # Run tsc --noEmit
pnpm lint       # Biome lint check
pnpm build      # Production build
```
