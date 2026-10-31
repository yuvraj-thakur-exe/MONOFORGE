# MonoForge V2 — Rebuild Plan & Technical Specification

> **Version:** 2.0.0  
> **Status:** Active Execution  
> **Target:** Full Website Redesign + Dedicated Professional Documentation Platform  
>

---

## 1. Executive Summary & Product Positioning

MonoForge is the premier open-source GitHub Profile README Creation Studio and Developer Profile Customization Platform. It bridges the gap between visual design and raw developer-grade markdown:

- **Single Source of Truth:** A unified Zustand store (`src/store/useReadmeStore.ts`) powers the entire application across all views (Visual Studio, Monaco IDE, Telemetry Studio, and SVG Animator).
- **Pure Functional Markdown Generation:** `buildMarkdown(config)` in `src/lib/buildMarkdown.ts` produces deterministic, GitHub Camo CDN-compliant markdown.
- **Zero Server Proxy Risk:** All SVG generators run client-side or through authenticated, deterministic APIs—100% compliant with GitHub Camo sanitization rules (0 `<script>`, 0 `<foreignObject>`, CSS `@keyframes` only).
- **Confirmation-Gated Operations:** All resume extractions and GitHub repository writes require explicit per-item confirmation—zero silent writes.
- **Strict Scope Invariant:** Zero AI copilots, zero AI chat assistants, zero LLM prompts/configurations. MonoForge is built for developers who demand full deterministic control over their developer identity.

---

## 2. Information Architecture: Documentation Platform

The documentation platform is , organized into logical categories with client-side fast search, on-this-page table of contents, copyable code blocks with language pills, and GitHub-style callouts.

```
/docs
├── 1. Getting Started
│   ├── /docs/getting-started/introduction     (Overview, philosophy, features)
│   ├── /docs/getting-started/quickstart       (60-second walkthrough)
│   └── /docs/getting-started/concepts         (Store, plugins, Camo, confirmation gate)
├── 2. Installation & Setup
│   ├── /docs/installation/prerequisites       (Node 18+, pnpm 10.12.4, Git)
│   ├── /docs/installation/platform-setup      (Windows, macOS, Linux step-by-step)
│   ├── /docs/installation/environment         (.env.local variables, GitHub OAuth)
│   └── /docs/installation/verification        (Test suite, dev server, diagnostics HUD)
├── 3. Usage Guides
│   ├── /docs/guides/visual-studio             (Form wizard, drag-and-drop blocks)
│   ├── /docs/guides/developer-ide             (Monaco split editor, keyboard shortcuts)
│   ├── /docs/guides/telemetry                 (47+ telemetry engines, badges, charts)
│   ├── /docs/guides/svg-animator              (Vector characters, cyber frames, orbits)
│   ├── /docs/guides/github-sync               (OAuth, diff preview, 1-click push)
│   └── /docs/guides/resume-import             (PDF/DOCX parsing, confirmation gate)
├── 4. Product Reference & Architecture
│   ├── /docs/reference/architecture           (State flow, pipeline, storage)
│   ├── /docs/reference/plugin-registry        (Plugin schema, registry, wrappers)
│   ├── /docs/reference/telemetry-engines      (All 47+ engines, params, Camo caching)
│   ├── /docs/reference/camo-rules             (GitHub sanitization rules, @keyframes)
│   ├── /docs/reference/config-schema          (Full JSON schema for ReadmeConfig)
│   └── /docs/reference/cli                    (Real bin/monoforge.js commands & MCP)
└── 5. Contributing & Troubleshooting
    ├── /docs/contributing/overview            (Branching, tests, Biome linting)
    ├── /docs/contributing/creating-plugins    (Adding a new telemetry or visual plugin)
    └── /docs/troubleshooting/faq              (Common issues, port conflicts, CRLF, FAQ)
```

---

## 3. UI/UX Design System Specification

| Token / Element | Dark Mode (Default) | Light Mode | Notes |
| :--- | :--- | :--- | :--- |
| **Canvas / Background** | `#09090b` (zinc-950) | `#fafafa` (zinc-50) | Deep industrial dark canvas |
| **Surface / Card** | `#18181b` (zinc-900) | `#ffffff` | High-contrast container borders |
| **Border** | `#27272a` (zinc-800) | `#e4e4e7` (zinc-200) | 1px crisp borders, 2px focus rings |
| **Primary Accent** | `#ffe600` (Electric Yellow) | `#d97706` (Amber 600) | High visibility developer action color |
| **Secondary Accent** | `#10b981` (Emerald 500) | `#059669` (Emerald 600) | Camo safe / Live telemetry indicator |
| **Typography** | Inter / Geist + JetBrains Mono | Inter / Geist + JetBrains Mono | Monospace for all code, flags, and metrics |

---

## 4. AI Deprecation & Feature Cleanup Plan

1. **Remove `CyberMonkeyCopilot` UI:** Remove copilot floating widgets and assistant dialogs from `src/app/[locale]/developer/page.tsx`, `src/app/developer/page.tsx`, and `CommandPalette.tsx`.
2. **Template Gallery Refactor:** Replace "AI Prompt for LLMs" with "Archetype Spec / Raw Markdown / Quick Load" across `TemplateGallery.tsx` and associated tests.
3. **Plugin Panel Refactor:** Replace "Copy Agent Prompt with Config" with "Copy Markdown / JSON Spec" in `PluginPanel.tsx`.
4. **Preserve Deterministic Engines:** Ensure `ProfileIntelligenceModal` remains a deterministic, rule-based static analyzer checking broken badges, missing socials, and structure scores without external LLM dependencies.

---

## 5. Verification & Testing Matrix

- `pnpm test` (Vitest): All test suites must pass (156+ test files, 720+ tests).
- `pnpm type-check` (TypeScript): Zero compiler errors across strict Next.js App Router.
- `pnpm build` (Next.js): All static and SSG documentation routes prerendered without runtime errors.
- Camo Sanitization: All SVG output verified against GitHub proxy rules.
