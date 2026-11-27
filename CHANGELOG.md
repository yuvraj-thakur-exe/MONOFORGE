# Changelog — MonoForge

All notable changes to MonoForge will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-11-28
### Added
- **6-Act Contribution Story (`website/src/lib/visualizations/contribution-story.ts`)**: Six pure time-based HTML5 Canvas animations inside `/visualizer` (`The Grid`, `Skyline` with `sqrt(count)` height scaling, `Week by Week` sparkline, `Round the Year` radial ring, `The Streak` tracer, and `In the Terminal`), complete with `IntersectionObserver`, `Replay All`, Dark/Light palette toggle, hover square inspection, and `t = Infinity` `prefers-reduced-motion` support.
- **Terminal Profile Kit & Monochrome ASCII Portrait (`website/src/lib/animator/ascii-portrait.ts`)**: Browser photo-to-ASCII SVG generator with contrast/threshold sliders, staggered Camo-safe `rowWipe` animations, editable Neofetch `whoami` info card, `diagonal-heatmap` SVG, and self-hosted `scripts/fetch-github.mjs` + GitHub Actions workflow builder inside `/animator`.
- **New Telemetry SVG API Plugins (`website/src/app/api/telemetry/svg/route.ts`)**: Added `diagonal-heatmap` (`contrib-heatmap`) and `whoami` (`info-card`) alongside strict data-provenance badges (`LIVE GITHUB`, `SAMPLE DATA`, `PARTIAL DATA`, `DATA UNAVAILABLE`).
- **Project README Studio (`website/src/app/[locale]/project-readme/`)**: Real GitHub repository inspector (`/api/project-readme/inspect`), automatic manifest parsing (`package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Dockerfile`, `.env.example`), 9 structured tabs, Mermaid presets, and live GFM/Raw renderer.
- **Asset & Sticker Vault Page (`website/src/app/[locale]/assets/`)**: Unified gallery for MonoForge's 53 protected core SVGs and community stickers with Camo URL copy, Markdown copy, and 1-click store insertion.
- **Real GFM Markdown Previews (`TemplateReadmePreview.tsx`)**: Upgraded every template gallery card, modal, and comparison view to render `buildMarkdown(template.config)` through `ReadmeMarkdownRenderer`, replacing legacy static mock dashboards.
- **Navigation & Error UX**: Unified `TopNav` quick links across all studios, global `Cmd+K` `CommandPalette`, and themed `404` pages (`not-found.tsx` and `global-not-found.tsx`).

### Changed
- Consolidated redundant component directories, tightened refined slate/amber/emerald palette consistency, and expanded unit test coverage to **98 automated test files**.

## [1.0.0] - 2026-11-15
### Added
- Scaled curated profile catalog to **330 Web Studio archetypes** (`TEMPLATES`) and **40 standalone CLI archetypes** (`bin/monoforge.js`).
- Launched **30 signature developer visualizations** across SVG and Canvas modes paired with **20 telemetry presets** and **22 modular plugins**.
- Added standalone MCP stdio server (`node bin/monoforge.js mcp`) and AI discovery endpoints (`/api/schema`, `/api/agent/skill`, `/llms.txt`, `/llms-full.txt`, `/.well-known/ai-plugin.json`).

## [0.1.0] - 2026-10-25
### Added
- Complete rebuild as **MonoForge** ("Forge a GitHub profile that gets noticed.").
- Unified Zustand state management (`useReadmeStore`) powering both wizard and `/developer`.
- Pure, unit-tested markdown generator (`buildMarkdown`).
- Initial plugin wrappers (`github-readme-stats`, `github-profile-trophy`, `readme-typing-svg`, `snk`, `waka-readme-stats`, `markdown-badges`, `visitor-counter`, `portfolio-contributions`).
- Dedicated `/developer` route with split Monaco JSON editor and real-time live preview.
- Light/Dark/System theme toggle using `next-themes`, global command palette (`Cmd+K`), AST-based profile README importer, export suite, confirmation-gated resume parser, direct GitHub diff-preview sync, and English / Portuguese (`pt-BR`) i18n.
