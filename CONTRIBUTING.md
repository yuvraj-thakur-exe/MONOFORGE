# Contributing to MonoForge

MonoForge is 100% open-source software built by and for the global developer community with zero barriers or restrictions. Whether you are adding an animated SVG character, expanding the **30+ visualization & telemetry engines**, adding one of the **22 modular profile plugins**, improving Studio UI/UX ergonomics, or submitting a fix, your contributions are warmly welcomed!

---

## Architecture Overview

- **Web Studio & UI**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Radix UI, Zustand (`website/src/store/useReadmeStore.ts`), `unified`/`remark`/`rehype`, and Lucide SVG icons (no amateur UI emojis).
- **MonoForge Telemetry & Visualizer (`/telemetry` & `/visualizer`)**: 30 signature visualizations (`website/src/lib/visualizations/registry.ts`), 35 SVG generators (`svg-generators.ts`), 20 telemetry engine presets (`website/src/lib/forge-telemetry/catalog.ts`), and the 6-Act pure Canvas Contribution Story (`website/src/lib/visualizations/contribution-story.ts`).
- **SVG Animator & Terminal Kit (`/animator`)**: Camo-safe vector layers, timelines, monochrome ASCII Portrait SVG generator (`website/src/lib/animator/ascii-portrait.ts`), and self-hosted GitHub Actions kit.
- **Project README Studio (`/project-readme`)**: Real GitHub repository inspector (`/api/project-readme/inspect`), 9 structured documentation tabs, Mermaid presets, and pure Markdown output (`website/src/lib/project-readme/`).
- **Plugins (`website/src/lib/plugins/`)**: Registry-driven modular wrappers validated against a unified Zod schema (`website/src/lib/plugins/types.ts`).
- **Asset Intelligence (`website/src/lib/assets/`)**: Central asset manifest (`website/src/assets/manifest.generated.json`) indexing **53 core SVGs** and **47 verified social icons**. Always inspect/reuse existing assets before introducing new ones.

---

## Local Development Setup

### Prerequisites
- Node.js 20.x or later
- pnpm 10.12.4 (`corepack enable && corepack prepare pnpm@10.12.4 --activate`)

### 1. Clone & Install
```bash
git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git
cd MONOFORGE
pnpm install
```

### 2. Run Dev Server
```bash
pnpm dev
# Main Studio:           http://localhost:3000/en
# Developer IDE:         http://localhost:3000/en/developer
# Archetypes Gallery:    http://localhost:3000/en/templates
# Visualizer & Story:    http://localhost:3000/en/visualizer
# Animator & ASCII Kit:  http://localhost:3000/en/animator
# Project README Studio: http://localhost:3000/en/project-readme
# Telemetry Studio:      http://localhost:3000/en/telemetry
# Asset & Sticker Vault: http://localhost:3000/en/assets
```

### 3. Export Standalone Telemetry SVGs
```bash
pnpm export:telemetry
# Runs tsx scripts/export-telemetry-svgs.ts to write standalone SVGs into website/public/assets/
```

---

## Verification & Testing

Before submitting a Pull Request, verify all checks locally:

```bash
# 1. Run Vitest Unit Tests (98 test files under website/src/)
pnpm test

# 2. Strict TypeScript Type Check
pnpm type-check

# 3. Biome Code Linter & Formatter
pnpm lint
pnpm format:check

# 4. Production Next.js Build
pnpm build
```

---

## Adding a New Profile Plugin

1. Create a wrapper file in `website/src/lib/plugins/wrappers/<plugin-name>.ts`.
2. Implement the `Plugin` interface (`website/src/lib/plugins/types.ts`).
3. Colocate a unit test file `website/src/lib/plugins/wrappers/<plugin-name>.test.ts`.
4. Register the plugin in `website/src/lib/plugins/registry.ts` — it automatically surfaces in `/developer` without extra wiring.
5. Run `pnpm test` to verify automatic registry discovery and Zod validation.

---

## Extending Visualizations or Animator Engines

- **New SVG / Canvas Visualization**: Add the manifest to `website/src/lib/visualizations/registry.ts`, implement its Camo-safe SVG builder (`zero <script>`, `zero <foreignObject>`, `preserveAspectRatio="xMidYMid meet"`, `@media (prefers-reduced-motion: reduce)`), wire its plugin key in `website/src/app/api/telemetry/svg/route.ts`, and add coverage in `route.test.ts` and `svg-generators.test.ts`.
- **Palette & Contrast**: Never use harsh pitch black (`#000000`, `#0a0a0a`, `#18181b`) in UI surfaces. Stick to refined slate surfaces (`#1e293b`, `#334155`, `#475569`), warm white (`#fafbfc`, `#f8fafc`), amber (`#f59e0b`, `#ffe600`), and GitHub emerald (`#10b981`).

---

## Git Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: add leetcode topic badges to telemetry studio`
- `fix: resolve isometric calendar date calculation`
- `docs: update README and llms technical references`
- `test: add coverage for contribution story canvases`
