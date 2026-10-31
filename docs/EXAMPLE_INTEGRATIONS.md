# MonoForge Example Integrations

This guide details how to integrate MonoForge telemetry engines, animated SVGs, and automated profile updates across various developer workflows.

---

## 1. Automated GitHub Actions Profile Sync

Sync your dynamic telemetry directly to your repository's `README.md` on a scheduled cron job:

```yaml
# .github/workflows/sync-monoforge-readme.yml
name: Sync MonoForge Profile README

on:
  schedule:
    - cron: '0 0 * * *' # Every day at midnight UTC
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Fetch Dynamic Telemetry SVG
        run: |
          curl -s "https://monoforge-studio.vercel.app/api/telemetry/svg?type=radar&user=${{ github.repository_owner }}&theme=cyberpunk" -o assets/radar-telemetry.svg

      - name: Commit & Push Changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(telemetry): update 24h activity radar SVG"
          file_pattern: "assets/radar-telemetry.svg"
```

---

## 2. Direct GitHub Profile Markdown Embeds

Embed standalone 60fps Camo-safe SVGs straight into your `username/username` repository:

### Kinetic 3D Commit Radar
```markdown
<p align="center">
  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?type=radar&user=yuvraj-thakur-exe&theme=cyberpunk" alt="24h Rhythm Radar" width="100%" />
</p>
```

### High-Impact Cyber Bot Hero
```markdown
<p align="center">
  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?type=banner&user=yuvraj-thakur-exe&theme=tokyonight" alt="MonoForge Hero Banner" width="100%" />
</p>
```

---

## 3. Node.js & Next.js Programmatic Markdown Generation

Generate profile markdown inside your own scripts or build pipelines:

```typescript
import { buildMarkdown } from '#/lib/buildMarkdown';
import { ReadmeConfig } from '#/lib/plugins/types';

const myConfig: ReadmeConfig = {
  version: '1.0.0',
  title: 'Lead Architect',
  settings: {
    user: {
      github: 'octocat',
      name: 'Octo Developer',
      role: 'Principal Engineer',
      bio: 'Crafting resilient distributed systems.',
    },
    theme: 'dark',
    accentColor: '#FFE600',
    badgeStyle: 'for-the-badge',
    align: 'left',
  },
  sections: [
    {
      id: 'sec_1',
      type: 'projects-showcase',
      visible: true,
      props: {
        displayMode: 'table-cards',
        projects: [
          {
            name: 'MonoForge',
            description: '47+ Native telemetry profile studio.',
            url: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
            language: 'TypeScript',
          },
        ],
      },
    },
  ],
};

const outputMarkdown = buildMarkdown(myConfig);
console.log(outputMarkdown);
```

