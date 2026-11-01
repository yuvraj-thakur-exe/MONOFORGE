# MonoForge 3.0: README Creator Agent & Visualization Engine Integration Architecture

## 1. Executive Summary & Product Architecture

**MonoForge 3.0** evolves beyond traditional static GitHub README markdown generation into a **unified Developer Identity & Creative Visualization Platform**. It enables developers to transform verified, multi-source telemetry (GitHub GraphQL/REST, WakaTime, npm, PyPI, Hugging Face, LeetCode, and custom JSON imports) into:

1. **Interactive Portfolio Mode**: 60fps high-DPI HTML5 Canvas and WebGL scenes with interactive hover inspection, scrubbable timelines, audio telemetry, and 3D camera controls.
2. **GitHub Profile Mode**: 100% GitHub Camo-safe SVG and markdown embeds adhering strictly to security invariants (zero `<script>`, zero `<foreignObject>`, pure GPU-accelerated CSS `@keyframes` with `transform-box: fill-box;`).

---

## 2. Core Repository Audit Findings

- **Frontend Core**: Next.js 16 (App Router with Turbopack), React 19, TypeScript 5.8, Tailwind CSS, Radix UI.
- **State Architecture**: Single source of truth in Zustand store (`website/src/store/useReadmeStore.ts` with `website/src/stores/readme-store.ts` backward-compatible export).
- **Markdown Serialization**: Pure, side-effect-free function `buildMarkdown(config)` in `website/src/lib/buildMarkdown.ts` validated by unit tests.
- **Asset Intelligence**: Centralized manifest (`src/assets/manifest.generated.json` and `website/src/assets/manifest.generated.json`) indexing 170+ Camo-safe SVGs, brand emblems, and social vectors with cryptographic SHA-256 integrity checks.
- **Telemetry Endpoints**: Serverless SVG synthesis in `/api/telemetry/svg` providing dynamic 3D isometric skylines, 52-week heatmaps, velocity radars, and polyglot donuts.

---

## 3. The 30 Signature Developer Visualizations

The platform standardizes a **single normalized dataset (`NormalizedDeveloperIdentity`) powering 30 distinct visual experiences across 4 categories**:

### A. Developer Activity & Contribution Rhythms
1. **Commit City**: 3D Isometric voxel skyline where building heights scale with daily commits and districts represent months.
2. **Commit River**: Fluid streamline with variable laminar flow and luminous particles representing sprint density.
3. **Developer Year Clock**: 360° circular chronometer with rotating radar beam sweeping across 12 monthly sectors.
4. **Coding Pulse**: Medical EKG cardiogram with glowing phosphor persistence tracking weekly velocity.
5. **Developer Terminal**: Retro amber/green CRT shell rendering typing git commands (`git log --stat`).
6. **Contribution Snake**: 60fps arcade snake traversing the 52-week contribution grid eating commit dots.
7. **Commit Waterfall**: Vertical data cascade with gravity-driven commit droplets pooling into sprint reservoirs.
8. **Contribution Topography**: Contour elevation map showing geographical intensity terrain.
9. **Coding Weather**: Dynamic atmospheric conditions (sunny, lightning, aurora) derived from weekly commit habits.
10. **Developer Seasons**: 4-phase cyclic foliage and environment shifts representing annual development cadence.

### B. Repository Universe & Architecture
11. **Repository Galaxy**: Orbiting planetary solar system where stars determine radius and languages set surface shaders.
12. **Project Constellation**: Star map connecting repositories sharing overlapping dependencies and languages.
13. **Codebase Blueprint**: Architectural blueprint displaying folder hierarchy, modules, and API boundaries.
14. **Language River**: Sinuous multi-stream river mapping polyglot byte breakdown over time.
15. **Tech Stack Solar System**: Core language sun surrounded by framework, database, and devops satellite moons.
16. **Release Timeline**: Horizontal transit line tracking version tags, changelog highlights, and milestones.
17. **Repository Tree**: Botanical branching tree showing file tree complexity and commit foliage.
18. **Commit Constellation**: Deep space stellar nebula mapping commit times to star coordinates.
19. **Code Impact Map**: Heat-intensity chronology highlighting major architectural milestones.
20. **Collaboration Network**: Force-directed graph of shared repository contributions and open-source peers.

### C. Developer DNA & Verified Skill Systems
21. **Developer DNA**: Double-helix biometric fingerprint generated from real commit density, language ratios, and streak data.
22. **Engineering Radar**: Hexagonal capability radar contrasting frontend, backend, devops, AI, systems, and tooling.
23. **Skill Tree**: Game-inspired talent tree showing mastered technologies and learning pathways.
24. **Skill Constellation**: Interconnected orbital nodes with live hover proficiency tooltips.
25. **Project DNA**: Comparative genetic barcode contrasting tech stack compositions between repositories.
26. **Open Source Footprints**: Verified trail of merged PRs, submitted issues, and community contributions.
27. **PR Flight Path**: Arc trajectory visualizing pull requests from development branch to production merge.
28. **Issue Garden**: Generative botanical garden blooming upon resolution of issues and bugs.
29. **Year in Code**: Cinematic narrative story recapping annual achievements, streaks, and milestone PRs.
30. **Developer Timeline**: Chronological career trajectory highlighting roles, publications, and projects.

---

## 4. Open-Source Integration & Licensing Architecture

| Library / Source | License | Integration Responsibility | Safety Invariant |
| :--- | :--- | :--- | :--- |
| **Mermaid.js** | MIT | Text-to-diagram generation (flowcharts, sequence, architecture) | Renders natively in GitHub Markdown without third-party images |
| **D3.js** | ISC | Mathematical scales, radial curves, and voronoi cell algorithms | Executed purely for geometric calculation; no client DOM leaks |
| **Motion** | MIT | Fluid UI transitions, modal viewports, and spring animations | Respects `prefers-reduced-motion` across all viewports |
| **Simple Icons** | CC0-1.0 | Authenticated SVG technology and brand emblems | Camo-sanitized; zero inline scripts or external references |
| **Shields.io** | CC0-1.0 | Standardized flat/for-the-badge shield badges | Cached via local SVG templates or verified badge endpoints |
| **html-to-image** | MIT | Client-side DOM canvas rasterization for PNG exports | Bounded to high-DPI max scale 2; no remote asset poisoning |

---

## 5. README Creator Agent Slash Command Protocol

The AI agent in MonoForge implements a complete 12-command suite:

```bash
/create      # Generate full profile README from verified developer identity
/visual      # Synthesize standalone 60fps Camo-safe visual asset (e.g. Commit City)
/animate     # Build dynamic vector animation asset (e.g. Contribution Snake)
/chart       # Generate data-driven chart (e.g. Commit River or Polyglot Donut)
/diagram     # Generate GitHub-native Mermaid architecture diagram
/banner      # Build custom waving capsule or cyber hero banner
/component   # Synthesize a reusable markdown block (Bento grid, tech stack)
/import      # Reconstruct and parse external README without data loss
/redesign    # Execute visual upgrade while strictly preserving verified facts
/optimize    # Restructure headings, readability, and alt text
/doctor      # Full AST audit for Camo safety, broken links, and mobile layout
/export      # Package complete bundle (README.md, SVGs, PNGs, and source config)
```

---

## 6. Security & Invariant Checklist

1. **Zero Hallucination Policy**: All factual claims regarding skills, repositories, and streak velocity MUST be derived from verified data. The agent is explicitly prohibited from fabricating competencies.
2. **Camo Compliance Mandate**: Zero `<script>`, zero `<foreignObject>`, zero external fonts. All animations must execute using pure CSS `@keyframes` with `transform-box: fill-box;`.
3. **No Unconfirmed Writes**: Any changes to the profile store from resume extraction, web enrichment, or agent synthesis require explicit user approval.
4. **Repository Star Mandate**:
   `⭐ If MonoForge elevated your GitHub profile, please give the repository a star on GitHub: https://github.com/yuvraj-thakur-exe/MONOFORGE`
