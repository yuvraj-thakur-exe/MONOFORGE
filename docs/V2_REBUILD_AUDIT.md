# MonoForge V2 — Deep Codebase Audit & Architectural Blueprint

**Date:** 2026-10-31  
**Author:** Senior Staff Software Engineer & Principal Product Designer  
**Scope:** Full Platform Audit, Architecture Findings, Gap Analysis, V2 Redesign & Implementation Roadmap  
**Branch:** `feat/monoforge-v2-redesign`

---

## 1. Executive Summary

MonoForge is an open-source GitHub profile README creation studio combining interactive visual canvas tools, a Monaco-powered developer editor, 47+ native SVG telemetry engines, an SVG character and motion animator, an AI copilot, and direct GitHub authentication and synchronization.

While the core functionality and foundational unit tests (141 test suites, 662 tests) are robust and passing, our comprehensive audit reveals crucial UX, design system, and feature gaps that prevent the application from delivering a world-class, seamless developer SaaS experience:

1. **Fragmented Workflows**: Studio capabilities (Visual Canvas, Guided Wizard, Monaco Editor, Telemetry Engine, and SVG Animator) previously felt disconnected across isolated routes (`/wizard`, `/canvas`, `/animator`, `/telemetry`, `/developer`). They require a unified, cohesive workspace shell with instant mode-switching and live split previews.
2. **Visual Hierarchy & Neo-Brutalist Polish**: While the `#FFE600` brand yellow and `#18181B` ink borders are established, visual elements in dark modes and deep nested panels had color contrast collisions (e.g. dark text on dark surfaces, inconsistent focus rings).
3. **Missing High-Value Capabilities**:
   - Automated **README Quality / Health Score** (0–100 scale analyzing Camo compliance, SEO/readability, missing sections, and actionable 1-click fixes).
   - **Direct README Importer** (loading existing GitHub READMEs directly via username `github.com/:username/:username` or raw markdown paste into the store with confirmation).
   - **Local Version History & Snapshots** (undo/redo timeline, timestamped snapshot restoration, prevention of accidental loss).
   - **Responsive Device Preview Frame** (Desktop, Tablet, Mobile viewport emulation for README rendering).
   - **Curated Asset Vault** (quick-insert tech stack icons, SVGs, dividers, badges, and animated stickers).
   - **Global Command Palette (`Cmd+K` / `Ctrl+K`)** for instant navigation, archetype switching, and quick actions.
4. **GitHub Camo Strict Invariants**: Ensure all 47+ telemetry widgets and character animations use zero `<script>` and zero `<foreignObject>`, valid `viewBox`, pure CSS `@keyframes`, and strict 60fps GPU acceleration.
5. **Mandatory Confirmation Gate**: Strict preservation of the rule that no external data (resume extraction, web suggestions, AI rewrites) or remote GitHub writes occur silently without explicit user approval.

---

## 2. Architecture & Systems Inventory

| Subsystem | Primary Location | Key Responsibilities | Audit Findings & Status |
| :--- | :--- | :--- | :--- |
| **Zustand Profile Store** | `src/store/useReadmeStore.ts` | Single source of truth for profile state, section ordering, and plugin config. | Clean architecture. Backwards-compatible alias in `src/stores/readme-store.ts`. Needs version history snapshots integration. |
| **Markdown Compiler** | `src/lib/buildMarkdown.ts` | Pure functional markdown compiler (`buildMarkdown(config) → string`). | Excellent pure function design. 100% test coverage. No side-effects. |
| **Telemetry Engine** | `src/lib/forge-telemetry/` | 47+ SVG generators, 3D isocalendar, donut charts, habits radar, trophy rack, LeetCode, PageSpeed. | Rich SVG generation. Verified Camo safety. Endpoint at `/api/telemetry/svg`. |
| **SVG Animator** | `src/lib/animator/` | Character kinematics (Cyber Bot, Pixel Dev, Ninja Coder, Builder, Wizard), banners, and border beams. | Camo compliant. Standalone SVG generation works cleanly. |
| **Developer Studio** | `src/app/[locale]/developer/page.tsx` | All-in-One Studio shell hosting Visual Studio, IDE, Telemetry, and Animator. | Recently unified; needs responsive viewport toggles, README health gauge, and Asset Vault insertion. |
| **Template Marketplace** | `src/app/[locale]/templates/page.tsx` | 85+ archetypes catalog with search, category filtering, and modal preview. | Catalog comprehensive. Needs quick-sort (Popular, Featured, Recent) and 1-click merge options. |
| **AI Copilot** | `src/components/mascot/CyberMonkeyCopilot.tsx` | Cyber Monkey Copilot assistant with suggestions and BYOK/OpenRouter interface. | Working, but needs integration with README Health Analyzer and 1-click suggestion application. |
| **GitHub Integration** | `src/components/sync/GitHubSyncModal.tsx`, `src/lib/github/sync.ts` | OAuth & PAT authentication, remote repo fetch, side-by-side git diff preview, commit API. | Fully functional. Diff preview is robust and Camo safe. Must be easily triggerable via TopNav and Command Palette. |
| **Documentation Hub** | `src/app/[locale]/info/page.tsx`, `src/components/info/InfoHub.tsx` | Documentation, archetype explorer, telemetry docs, and CLI instructions. | Working with rich interactive tabs; needs polish and Command Palette deep-links. |

---

## 3. Detailed Gap Analysis & Issues Identified

### Issue 1: Command Palette Accessibility (`Cmd+K` / `Ctrl+K`)
- **Status**: Implemented in `src/components/navigation/CommandPalette.tsx`, but needs global keyboard listener registration across all views, deep-linking into all studio modes, template archetypes, telemetry plugins, and GitHub sync modal.
- **Solution**: Wire global listener in root layout and TopNav with quick-search for 85+ templates and 47+ telemetry modules.

### Issue 2: README Health Analyzer & Camo Compliance Audit
- **Status**: Missing as an automated interactive diagnostic HUD inside the Studio and Homepage.
- **Solution**: Implement `src/lib/optimizer/quality-score.ts` calculating a 0–100 score evaluating:
  - Header impact & bio completeness.
  - Tech stack representation.
  - Telemetry & visual widget presence.
  - Camo proxy compliance (detecting broken external images or forbidden tags).
  - Social & contact links.
  - Actionable 1-click recommendations to instantly improve the score.

### Issue 3: GitHub & Markdown Importer
- **Status**: While resume parsing exists, users currently cannot paste arbitrary existing README markdown or fetch `github.com/:username/:username` to populate the Studio in 1 click.
- **Solution**: Create `src/components/importer/ReadmeImporterModal.tsx` and parser utility to load remote or raw markdown into the store with a mandatory Confirmation Gate preview.

### Issue 4: Local Version History & Snapshot Rollback
- **Status**: Users risk losing edits if they reset or make radical changes in the studio.
- **Solution**: Add snapshot tracking with undo/redo and timestamped save points to `useReadmeStore.ts` (persisted in local storage).

### Issue 5: Responsive Device Viewport Emulation
- **Status**: Live preview currently renders in a single flexible pane.
- **Solution**: Add Desktop (100%), Tablet (768px), and Mobile (375px) frame toggles in `LivePreview.tsx` and `LivePreviewPane.tsx`.

### Issue 6: Asset Vault
- **Status**: Users often want quick copy-paste access to badges, animated dividers, tech stacks, and SVG banners without switching to a different tool.
- **Solution**: Build an interactive Asset Vault drawer / tab providing 1-click insertable SVGs into the current profile.

---

## 4. MonoForge V2 Implementation Roadmap

- [x] **Phase 1: Deep Codebase Audit & Architectural Blueprint** (`docs/V2_REBUILD_AUDIT.md`)
- [ ] **Phase 2: Formalized Design System Tokens** (Standardized `#FFE600`, `#18181B`, `#FAFAFA`, tactile borders, shadows, and focus rings in Tailwind)
- [ ] **Phase 3: Global Shell & Omnipresent Command Palette** (Seamless `Cmd+K` / `Ctrl+K`, tactile status bar, mobile drawer)
- [ ] **Phase 4: Rebuilt Homepage Experience** (High-impact Neo-Brutalist hero, geometric mascot, Live Playground bar, Bento capabilities grid, interactive Before/After comparison, 6-step workflow, trust metrics, footer)
- [ ] **Phase 5: Rebuilt All-in-One Developer Studio** (`/developer` with Canvas, Wizard, Monaco IDE, Telemetry, Animator, Device Frame toggles, and Health Score HUD)
- [ ] **Phase 6: Template Marketplace Enhancements** (85+ archetypes, sorting, favorites, fast search, Camo modal)
- [ ] **Phase 7 & 8: 47+ Telemetry Arsenal & SVG Animator Hardening** (Camo validation, 60fps keyframes, download & embed options)
- [ ] **Phase 9: AI Copilot & Automated Profile Quality Scoring** (Integrated quality audit, actionable recommendations, confirmation gates)
- [ ] **Phase 10: Real GitHub Authentication & Diff Workflow** (OAuth/PAT, remote diff preview, direct commit)
- [ ] **Phase 11: High-Value Capabilities** (README Importer, Version History Snapshots, Asset Vault)
- [ ] **Phase 12: Documentation Hub Polish** (`/info` step-by-step guides and search)
- [ ] **Phase 13-17: Quality Assurance, Vitest Suite & Build Verification** (141+ suites, 662+ tests passing, Next.js build clean)

---

## 5. Architectural Invariants to Maintain
1. **Single Zustand Store**: `src/store/useReadmeStore.ts` remains the sole store for profile data.
2. **Pure Functional Markdown**: `buildMarkdown(config)` in `src/lib/buildMarkdown.ts` produces all markdown.
3. **Zero Camo Violations**: Standalone SVGs must never contain `<script>` or `<foreignObject>`.
4. **Mandatory Confirmation Gates**: Remote GitHub writes and external imports must require explicit user approval.

