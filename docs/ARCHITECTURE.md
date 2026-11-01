# MonoForge Architecture & Technical Specification

## 1. Architectural Invariants (Non-Negotiable)

1. **Single Source of Truth (`src/store/useReadmeStore.ts`)**:
   All profile configuration, settings, sections, and theme options live in a single Zustand store. The Visual Wizard, `/developer` raw-mode editor, and studio modals all read and write this store. Never create duplicate or parallel state.

2. **Pure Markdown Generator (`src/lib/buildMarkdown.ts`)**:
   `buildMarkdown(config) -> string` is a pure function. It has zero React dependencies, zero side effects, and is 100% unit-tested. Any modification to output Markdown goes through this function.

3. **Registry-Driven Plugin System (`src/lib/plugins/`)**:
   Plugins are plain TypeScript objects adhering to the Zod schema in `src/lib/plugins/types.ts` and registered in `src/lib/plugins/registry.ts`. To add a widget: add one wrapper file, register it in the registry, and it automatically surfaces across the application.

4. **Zero-Trust Confirmation Gates**:
   - Web enrichment & resume parser data never writes to the store without explicit per-item user confirmation (`src/components/enrichment/ConfirmGate.tsx`).
   - GitHub push is never silent: every push fetches remote content, renders a side-by-side diff preview (`src/components/sync/DiffPreview.tsx`), and requires explicit user confirmation.

5. **GitHub Camo Proxy Strict Compliance**:
   Every generated SVG must:
   - Contain zero `<script>` elements.
   - Contain zero `<foreignObject>` elements.
   - Include `@media (prefers-reduced-motion: reduce)` accessibility overrides.
   - Use standard system font stacks (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace`).
   - Animate strictly via GPU-accelerated CSS `transform` and `opacity`.

---

## 2. Telemetry & Visualization Pipeline

```
GitHub GraphQL / REST / Scraper
             │
             ▼
[/api/telemetry/contributions] (15-min in-memory cache)
             │
             ├──► [CanvasVisualizer] (Portfolio Mode: 60fps Interactive HTML5 Canvas)
             │
             └──► [/api/telemetry/svg?plugin=...] (README Mode: Camo-Safe SVG)
                        │
                        ├──► Commit City 3D
                        ├──► Commit River
                        ├──► Year Clock HUD
                        ├──► Coding Pulse EKG
                        ├──► Developer Terminal CRT
                        ├──► Contribution Snake
                        ├──► Repository Galaxy
                        ├──► Developer DNA
                        └──► Skill Constellation
```
