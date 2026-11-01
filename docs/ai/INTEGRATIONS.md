# MonoForge Open-Source Ecosystem Integration Map

This map outlines the role and licensing compliance of key open-source technologies integrated into MonoForge:

## 1. Core Integrations Matrix

| Technology | Category | Role in MonoForge | License |
|---|---|---|---|
| **ReadmeAI** | AI Agent | Pipeline reference for smart repository analysis and multi-model abstraction | MIT |
| **Motion** (`motion`) | Animation | Interface animation, smooth UI transitions, layout morphing | MIT |
| **D3.js** (`d3`) | Data Viz | Mathematical calculation of radial scales, river streamlines, and EKG spline curves | ISC |
| **Three.js** | 3D Engine | Advanced 3D rendering for 3D skyline and planetary galaxy interactive scenes | MIT |
| **Mermaid** | Diagrams | GitHub-native technical architecture, sequence diagrams, and flowcharts | MIT |
| **Shields.io** | Badges | Reusable standard badge specifications (`for-the-badge`, `flat-square`) | CC0 / MIT |
| **Simple Icons** | Brand SVGs | Standardized brand vector icons for programming languages and developer tools | CC0 |
| **html-to-image** | Asset Export | Client-side DOM rasterization to PNG snapshots | MIT |

## 2. Invariant: Runtime Separation
GitHub profile READMEs are not an application runtime. While MonoForge's interactive web studio leverages Canvas, Motion, and Three.js for interactive portfolio mode, all README exports are compiled into validated GitHub Camo-safe Markdown and pure CSS animated SVGs.
