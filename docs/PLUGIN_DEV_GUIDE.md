# MonoForge Plugin Development Guide

Welcome to the **MonoForge Plugin Architecture**. This guide details how to build, test, and register custom plugins for GitHub Profile README generation.

---

## Architecture Overview

MonoForge follows a strict, registry-driven plugin design:
- All plugins live as self-contained definitions validated against the `Plugin` Zod schema in `src/lib/plugins/types.ts`.
- Plugins are registered in `src/lib/plugins/registry.ts`.
- Core wizard and developer editor logic are entirely registry-driven — registering a plugin automatically surfaces it across the UI, search panels, and markdown generator.

```
src/lib/plugins/
├── types.ts                    # Zod schemas (Plugin, SectionConfig, etc.)
├── registry.ts                 # Central plugin registry
└── wrappers/
    ├── your-plugin.ts          # Plugin implementation
    └── your-plugin.test.ts     # Colocated Vitest suite
```

---

## Step 1: Define Your Plugin Wrapper

Create a new file in `src/lib/plugins/wrappers/<plugin-name>.ts`:

```typescript
import { z } from 'zod';
import { Plugin } from '../types';

export const MyTelemetryPropsSchema = z.object({
  username: z.string().default('octocat'),
  theme: z.enum(['tokyonight', 'cyberpunk', 'dracula', 'nord']).default('tokyonight'),
  showBorder: z.boolean().default(true),
});

export type MyTelemetryProps = z.infer<typeof MyTelemetryPropsSchema>;

export const myTelemetryPlugin: Plugin = {
  id: 'my-telemetry',
  name: 'My Telemetry Sensor',
  description: 'Displays custom developer activity metrics in a sleek, GitHub Camo-safe SVG card.',
  category: 'stats',
  version: '1.0.0',
  author: 'community',
  tags: ['telemetry', 'stats', 'activity'],
  defaultProps: {
    username: 'octocat',
    theme: 'tokyonight',
    showBorder: true,
  },
  schema: MyTelemetryPropsSchema,
  generator: (props: MyTelemetryProps) => {
    const url = `https://monoforge-studio.vercel.app/api/telemetry/svg?type=radar&user=${encodeURIComponent(props.username)}&theme=${props.theme}`;
    return `<p align="center">\n  <img src="${url}" alt="${props.username}'s Telemetry" />\n</p>`;
  },
};
```

---

## Step 2: GitHub Camo & Security Invariants

All plugins generating SVG or HTML output MUST comply with GitHub Camo proxy rules:

1. **Zero `<script>` Tags**: GitHub strips all script elements. Use CSS `@keyframes` for animation.
2. **Zero `<foreignObject>` Tags**: Stripped by GitHub's image cache. Use native SVG `<text>` and `<path>`.
3. **Responsive Scaling**: Always specify `viewBox` and `preserveAspectRatio="xMidYMid meet"`.
4. **HTTPS Enforced**: All external asset URLs must use `https://`.
5. **No Event Handlers**: Attributes like `onload`, `onclick`, `onerror` are strictly prohibited.

---

## Step 3: Register in `registry.ts`

Add your plugin to `src/lib/plugins/registry.ts`:

```typescript
import { myTelemetryPlugin } from './wrappers/my-telemetry';

export const PLUGIN_REGISTRY: Record<string, Plugin> = {
  // Existing plugins...
  'my-telemetry': myTelemetryPlugin,
};
```

---

## Step 4: Write Colocated Unit Tests

Create `src/lib/plugins/wrappers/my-telemetry.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { myTelemetryPlugin } from './my-telemetry';

describe('My Telemetry Plugin', () => {
  it('generates valid markdown snippet', () => {
    const md = myTelemetryPlugin.generator({
      username: 'torvalds',
      theme: 'cyberpunk',
      showBorder: true,
    });

    expect(md).toContain('<img');
    expect(md).toContain('torvalds');
    expect(md).not.toContain('<script');
  });

  it('validates default props against schema', () => {
    const parsed = myTelemetryPlugin.schema.safeParse(myTelemetryPlugin.defaultProps);
    expect(parsed.success).toBe(true);
  });
});
```

Run test suite:
```bash
npx vitest run src/lib/plugins/wrappers/my-telemetry.test.ts
```

---

## Step 5: Submit Pull Request

Open a PR against `yuvraj-thakur-exe/MONOFORGE` on branch `main`. Ensure all tests and lint checks pass:
```bash
pnpm test
pnpm build
```

