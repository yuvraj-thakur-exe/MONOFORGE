# MonoForge Developer API & Telemetry Reference

MonoForge exposes high-throughput, edge-cached endpoints for generating real-time developer identity SVGs and querying contribution activity.

## 1. Contributor Activity API
### `GET /api/telemetry/contributions`
Returns structured contribution telemetry, streaks, and day-by-day counts.

**Query Parameters:**
- `user` (or `username`): GitHub handle (default: `octocat`)

**Response:**
```json
{
  "success": true,
  "data": {
    "username": "octocat",
    "totalContributions": 1420,
    "currentStreak": 14,
    "maxStreak": 42,
    "dailyAverage": 3.9,
    "highestDay": 18,
    "weeks": [...],
    "days": [...],
    "isRealData": true
  }
}
```

---

## 2. Dynamic SVG Telemetry Endpoint
### `GET /api/telemetry/svg`
Generates Camo-safe standalone vector SVG graphics.

**Query Parameters:**
- `plugin`: Visual architecture to render:
  - `commitcity`: 3D isometric architectural skyline
  - `river`: Luminous flowing stream dynamics
  - `yearclock`: 360° circular chronometer and radar
  - `pulse`: Bio-telemetry oscilloscope cardiogram
  - `terminal`: Retro CRT shell typing git logs
  - `snake`: 52-week arcade snake journey
  - `galaxy`: Planetary repository cosmos
  - `dna`: Biometric double-helix genetic strand
  - `constellation`: Celestial star map of skills
  - `isocalendar`: 3D isometric calendar
  - `heatmap`: 52-week annual commit matrix
  - `velocity`: Contributor velocity and momentum radar
  - `languages`: Polyglot languages donut chart
  - `habits`: 24-hour coding habit radar
- `user`: Target GitHub username
- `theme`: Palette preset (`emerald`, `matrix`, `cyberpunk`, `tokyonight`, `amber`, `ocean`, `slate`)

---

## 3. Plugin Development Guide
All widgets adhere to the `Plugin` contract in `src/lib/plugins/types.ts`:
```typescript
export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  category: 'stats' | 'socials' | 'techs' | 'media' | 'utility' | 'dynamic';
  icon: string;
  defaultConfig: Record<string, unknown>;
  renderMarkdown: (props: PluginRenderProps) => string;
}
```
To register a new plugin, implement this interface and add it to `src/lib/plugins/registry.ts`.
