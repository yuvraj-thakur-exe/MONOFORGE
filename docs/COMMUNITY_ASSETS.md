# Community Asset Submission Guidelines

The **MonoForge Asset Marketplace** is a registry-driven library for animated SVGs, banners, badges, and layout blocks.

---

## Asset Categories

- `templates`: Full profile layouts.
- `animated-svg`: 60fps standalone animated vector graphics.
- `banners`: Header hero graphics, retro CRT displays, and matrix digital rain banners.
- `badges`: Shield.io and tactile developer stamps.
- `sections`: Pre-configured markdown tables and project showcases.
- `presets`: Animation timeline easing curves and particle configurations.

---

## Asset Metadata Schema

Every asset registered in `src/lib/assets/registry.ts` adheres to:

```typescript
export interface CommunityAsset {
  id: string;
  name: string;
  description: string;
  category: 'templates' | 'animated-svg' | 'banners' | 'badges' | 'sections' | 'presets';
  author: {
    name: string;
    github: string;
    avatarUrl?: string;
  };
  previewUrl: string;
  tags: string[];
  license: 'MIT' | 'Apache-2.0' | 'CC-BY-4.0';
  rawSnippet: string; // Ready-to-paste markdown or SVG snippet
  options?: Record<string, any>;
  createdDate: string;
}
```

---

## Submission Rules

1. **Permissive Licensing**: Assets must be licensed under MIT, Apache-2.0, or CC-BY-4.0.
2. **Camo Proxy Compatibility**: SVGs must contain 0 `<script>` tags and 0 `<foreignObject>` tags.
3. **No External Tracking**: Assets must not ping external tracking or analytics servers.
4. **Self-Contained Styles**: All SVG styling must reside inside `<style>` blocks with system font fallbacks.

---

## How to Submit

1. Add your asset object to `COMMUNITY_ASSETS` in `src/lib/assets/registry.ts`.
2. Add a test in `src/lib/assets/registry.test.ts`.
3. Open a GitHub pull request to `yuvraj-thakur-exe/MONOFORGE`.
