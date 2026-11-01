# MonoForge Design System Specification

## 1. Palette Invariant: Refined "Light Dark and Its Shades"
Avoid harsh pitch black (`#000000`, `#0a0a0a`, `#18181b`). MonoForge employs an intentional palette of refined dark slates, warm creams, amber sparks, and GitHub emeralds:

| Token | Hex Code | Semantic Role |
|---|---|---|
| Deep Space Slate | `#0b0f19` | Application main background |
| Night Slate | `#0f172a` | Header bars, card bodies, modal backdrops |
| Elevated Slate | `#1e293b` | Interactive hover cards, dropdowns, input fields |
| Border Slate | `#334155` | Subtle architectural borders and dividers |
| Muted Text Slate | `#94a3b8` | Supporting metadata, timestamps, tags |
| Primary Text Cream | `#f8fafc` | High-contrast readable typography |
| MonoForge Amber Spark | `#ffe600` / `#f59e0b` | Primary call to action, live preview, badges |
| GitHub Emerald | `#10b981` | Success states, active commits, streak indicators |

## 2. Typography Hierarchy
- **Display Headings**: System sans-serif (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) with bold tracking.
- **Code & Telemetry**: Monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`) for statistics, git logs, and hashes.

## 3. Kinetic Motion Invariants
- 60fps GPU acceleration: animate only `transform` and `opacity`.
- Use `<FadeIn>` / `<Stagger>` wrappers (`src/components/motion/`) rather than inlining complex framer-motion variants.
- In vector SVGs, set `transform-box: fill-box; transform-origin: center;`.
- Always respect `@media (prefers-reduced-motion: reduce)`.
