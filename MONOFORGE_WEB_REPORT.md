# MONOFORGE — Comprehensive Web Application & Architecture Report
*Generated on: October 31, 2026*
*Target Audience: AI Coding Assistant / ChatGPT / Engineering Team*
*Live Production URL:* [https://monoforge-studio.vercel.app](https://monoforge-studio.vercel.app)
*Alternate URL:* [https://monoforge-eight.vercel.app](https://monoforge-eight.vercel.app)

---

## 1. Executive Summary

**MonoForge** is a production-grade, open-source web application designed to generate, customize, and synchronize high-impact, professional GitHub profile READMEs and developer telemetry infographics.

It solves the friction of manually writing Markdown, styling badges, configuring telemetry widgets, and dealing with broken third-party servers by providing:
1. **A Unified All-in-One Studio** at `/developer` combining visual block editing, raw Monaco JSON IDE, 47+ standalone SVG telemetry modules, and a 60fps vector animation studio.
2. **A Dedicated 85+ Archetypes Catalog** at `/templates` with instant category filtering, real-time search, 1-click studio loading, and pre-engineered AI prompts.
3. **100% Native GitHub Camo CDN Safety**: Zero external tracking proxies, zero third-party cookies, and 0 `<script>` / `<foreignObject>` tags. All SVG assets use hardware-accelerated CSS animations compliant with GitHub's strict sanitization rules.
4. **Confirmation-Gated GitHub Sync**: Authenticated OAuth / PAT synchronization with remote README fetching, side-by-side git diff previews, and mandatory confirmation before committing.

---

## 2. Tech Stack & Engineering Standards

| Layer | Technologies |
| :--- | :--- |
| **Framework** | **Next.js 16** (App Router, Turbopack, React 19 Server & Client Components) |
| **Language** | **TypeScript 5.x** (Strict Mode, 100% Typed, zero `any` in core pipelines) |
| **Styling** | **Tailwind CSS 4.x** + Neo-brutalist tactile theme (`#ffe600` accent, 2px borders, hard shadows) |
| **State Management** | **Zustand** (`src/store/useReadmeStore.ts`) — Single source of truth across all views |
| **Validation** | **Zod** schema validation for configuration AST and plugin registries |
| **Code Editor** | **Monaco Editor** (`@monaco-editor/react`) + Offline RAW Textarea fallback mode |
| **Internationalization** | **next-intl** (English `/en`, Portuguese `/pt-BR`) |
| **Code Quality** | **Biome** (formatting & linting) + **KaTeX** math rendering |
| **Testing** | **Vitest** (141 test suites, 662 unit tests) + **Playwright** (end-to-end browser audits) |
| **Hosting & CI/CD** | **Vercel** serverless edge infrastructure |

---

## 3. Core Pages & Unified Studio Navigation

### 3.1 All-in-One Creation Studio (`/developer`)
All previously fragmented creation tools have been merged into **one master studio** at `/[locale]/developer`. A top tactile mode dock enables instant 1-click switching with URL synchronization (`?mode=...`) without losing profile state:

1. **🎨 VISUAL STUDIO (`?mode=visual`)**:
   - Interactive Visual Canvas (`<CanvasTemplate />`): Click sections to add, remove, and reorder visually.
   - Step-by-Step Guided Wizard (`<WizardContainer />`): Guided interview answering questions to dynamically assemble a tailored README.
   - Sub-bar toggle between Canvas and Guided questions.

2. **💻 DEVELOPER IDE (`?mode=editor`)**:
   - Split Monaco JSON Editor (`<Editor />`) with full AST schema validation.
   - Offline fallback mode: Automatically switches to high-contrast raw textarea if Monaco CDN encounters timeouts.
   - Live Camo Markdown Preview (`<LivePreview />`): Side-by-side rendered HTML and raw Markdown tabs.
   - Arsenal & Presets Drawer (`<PluginPanel />`): Searchable library of badges, telemetry, and archetype configs.
   - Cyber Monkey Co-Pilot (`<CyberMonkeyCopilot />`): AI prompt generation and profile optimization assistant.
   - Quick Layout Switcher: Split View, Editor-only, or Preview-only.

3. **📊 47+ TELEMETRY ARSENAL (`?mode=telemetry`)**:
   - Standalone SVG generator for 47+ native metrics modules:
     - 3D Isometric Commit Calendar (voxel terrain with streak elevations)
     - Polyglot Languages Donut (multi-ring byte counts & diffs)
     - 24h Habits Radar (hourly commit rhythm & weekday histogram)
     - Achievements Rack (S/A/B rank medals & golden halos)
     - Cyberpunk Terminal HUD (CRT scanline developer console)
     - PageSpeed Web Vitals (Lighthouse 4-pillar audit gauges)
     - Music Player & Equalizer (Spotify/Last.fm 18-band audio visualizer)
     - LeetCode Problem Mastery (Easy/Medium/Hard problem radar)
   - Real-time preview, standalone `.svg` download, embed URLs, and automated GitHub Actions workflow YAML generator.

4. **🎬 SVG ANIMATOR (`?mode=animator`)**:
   - 60fps hardware-accelerated vector motion studio.
   - Animated vector characters: Cyber Bot, Pixel Dev at dual-monitor desk with coffee steam, Ninja Coder with katana glint, Builder Crafter with hammer sparks, and Wizard Mage with runic circles.
   - Dynamic backgrounds: Matrix digital rain, fire/ember rises, cyber grids, starfield nebula.
   - Kinetic typography: Stepped terminal typewriter with blinking cursor, chromatic glitch split.
   - Built-in GitHub Sanitizer Validator: Verifies 0 `<script>`, 0 `<foreignObject>`, valid viewBox, and `< 100 KB` payload.

### 3.2 Archetype Templates Catalog (`/templates`)
- Hosted at `/[locale]/templates`.
- Showcase of **85+ curated developer archetypes** across 19 categories (Full-Stack, Minimalist, Cyberpunk, 3D Holo, Game Dev, DevOps/Cloud, Research/Academic, Retro Terminal, AI/ML, Security, Open Source, etc.).
- Instant fuzzy search across archetype names, descriptions, and technology tags.
- Category filter pills with live count badges.
- Card actions:
  - **"Studio"**: 1-click loads the template into the Zustand store and opens the studio (`/developer?template=<id>&mode=visual`).
  - **"AI Prompt"**: Copies pre-engineered LLM prompt for Claude, ChatGPT, or Gemini.
  - **"Preview"**: Opens live modal with visual rendering, raw Markdown, and plugin manager.

### 3.3 Documentation & Guide Hub (`/info`)
- Hosted at `/[locale]/info`.
- CLI installation instructions (npm, Linux curl, Windows PowerShell, Docker).
- Interactive Mini-Playground for instant handle experimentation.
- Badges reference catalog and technical FAQ.

### 3.4 Home Showcase (`/`)
- Editorial Nomokey hero with interactive geometric monkey companion.
- 6-step workflow guide ("How MonoForge Works").
- Transformation showcase: Poulo-style before/after comparison.
- Tactile sticker board and manifesto.

### 3.5 Seamless Route Redirects
- `/wizard` &rarr; Redirects to `/developer?mode=visual`
- `/canvas` &rarr; Redirects to `/developer?mode=visual`
- `/animator` &rarr; Redirects to `/developer?mode=animator`
- `/telemetry` &rarr; Redirects to `/developer?mode=telemetry`

---

## 4. Key Architectural Invariants

1. **Single Source of Truth**:
   - `src/store/useReadmeStore.ts` holds all state.
   - Visual Builder, Monaco IDE, and Sync modals all read and mutate this single store.
   - Safe rehydration (`onRehydrateStorage`) sanitizes corrupted `localStorage` objects back to `DEFAULT_CONFIG`.

2. **Pure Function Markdown Generation**:
   - `buildMarkdown(config: ReadmeConfig): string` in `src/lib/buildMarkdown.ts` is 100% pure, side-effect-free, and fully unit-tested.
   - Any markdown structure change occurs strictly inside this function.

3. **Registry-Driven Extensibility**:
   - Plugins live in `src/lib/plugins/registry.ts`, validated against the Zod schema in `src/lib/plugins/types.ts`.
   - Adding a plugin requires creating one file and registering it; it automatically renders in all studio drawers.

4. **Zero Unconfirmed Writes (Confirmation Gates)**:
   - Web enrichment and resume parsing never write to state without explicit user approval (`ConfirmGate.tsx`).
   - GitHub push fetches remote README content, displays a side-by-side color-coded git diff (`DiffPreview.tsx`), and requires explicit "Confirm & Push".

5. **GitHub Camo Compliance**:
   - Zero `<script>` tags, zero `<foreignObject>` tags.
   - 60fps CSS animations using `@keyframes` inside `<style>` blocks.
   - Every SVG contains `preserveAspectRatio="xMidYMid meet"`, `transform-box: fill-box; transform-origin: center;`, and accessibility fallback `@media (prefers-reduced-motion: reduce)`.

---

## 5. Repository Directory Map

```
monoforge/
├── public/
│   ├── assets/              # Live Camo SVGs, badges, character vectors, and sticker packs
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/        # Next.js App Router localized routes (en, pt-BR)
│   │   │   ├── developer/   # Master All-in-One Studio (Visual, IDE, Telemetry, Animator)
│   │   │   ├── templates/   # 85+ Archetype Templates Catalog
│   │   │   ├── info/        # Documentation & Guide Hub
│   │   │   ├── privacy-policy/
│   │   │   ├── error.tsx    # Client-side Error Boundary with reset capability
│   │   │   ├── layout.tsx   # Root layout with StudioCursor, fonts, theme
│   │   │   └── page.tsx     # Homepage centerpiece
│   │   └── api/
│   │       ├── telemetry/svg/ # Dynamic serverless pure SVG endpoint
│   │       └── enrichment/  # Resume parsing and web search suggestions
│   ├── components/
│   │   ├── animator/        # Vector Animation Studio component
│   │   ├── telemetry/       # Standalone 47+ Telemetry Studio component
│   │   ├── developer/       # Monaco Editor, LivePreview, PluginPanel, ExportBar
│   │   ├── landing/         # TemplateGallery, Typewriter, IdeIntegrationShelf
│   │   ├── navigation/      # TopNav (with ⚡ CONNECT GITHUB action)
│   │   ├── studio/          # NomokeyHero, StudioBento, StudioCursor, FinalCta
│   │   ├── sync/            # GitHubSyncModal, DiffPreview, GitHub OAuth
│   │   ├── templates/canvas/# Visual drag-and-drop section builder
│   │   └── wizard/          # Step-by-step guided question containers
│   ├── lib/
│   │   ├── buildMarkdown.ts # Pure Markdown generator
│   │   ├── forge-telemetry/ # 47+ telemetry generators, SVG builders, and catalog
│   │   ├── github/          # Octokit REST API authenticated commit & diff engine
│   │   ├── plugins/         # Plugin registry, zod schemas, wrappers
│   │   └── templates/       # 85+ rich archetype catalog definitions
│   └── store/
│       └── useReadmeStore.ts# Unified Zustand store with persistence
```

---

## 6. Verification & Test Metrics

- **Vitest Unit Suite**: **141/141 test files passed** (**662/662 tests**).
- **Next.js Production Build**: **32/32 static routes** compiled in 2.4s with 0 errors.
- **Playwright Headless Browser Audit**: All routes (`/en`, `/en/developer`, `/en/templates`, `/en/info`) return HTTP 200 with **0 console errors** and **0 page errors**.
- **Live Deployment**: Deployed on Vercel production alias `https://monoforge-studio.vercel.app`.

---

## 7. Context & Prompt Instructions for ChatGPT

When asking ChatGPT to generate new features, archetype configs, or components for MonoForge, provide this instruction block:

```text
You are assisting with the MonoForge codebase (GitHub profile README generator).
Key project guidelines:
1. All profile state resides in the Zustand store ('src/store/useReadmeStore.ts'). Never introduce parallel state.
2. Output markdown is generated solely through pure function 'buildMarkdown(config)' in 'src/lib/buildMarkdown.ts'.
3. All SVG vectors must be 100% GitHub Camo safe: 0 <script>, 0 <foreignObject>, valid viewBox, preserveAspectRatio="xMidYMid meet", and GPU keyframe animations only.
4. UI styling follows Tailwind CSS with tactile neo-brutalist styling: 2px solid neutral-900 borders, #ffe600 accent, and hard shadows [2px_2px_0px_#18181b].
5. Navigation and creation are unified under '/developer' (modes: 'visual', 'editor', 'telemetry', 'animator') and archetypes under '/templates'.
```

