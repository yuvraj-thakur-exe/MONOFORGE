# MonoForge — Cursor AI Rules & MCP Integration

MonoForge generates Camo-safe, interactive GitHub profile & project READMEs (**330 curated archetypes**, **40 CLI archetypes**, **30+ SVG/Canvas visualizations**, **6-Act Contribution Story**, **Terminal Profile Kit & ASCII Portrait**, **22 modular plugins**, **47 verified social icons**) and provides autonomous agent tools.

## Cursor & Multi-AI MCP Integration
Both `.mcp.json` (root) and `.cursor/mcp.json` register the `monoforge` stdio MCP server (`node bin/monoforge.js mcp`) with 7 built-in tools:
- `build_interactive_readme`
- `generate_profile_readme`
- `list_archetypes`
- `list_visualizations`
- `search_assets`
- `inspect_asset`
- `generate_telemetry_embed`

## CLI Usage
```bash
node bin/monoforge.js build --username <username> --name "<Name>" --role "<Role>" --theme emerald --output README.md
node bin/monoforge.js generate --username <username> --archetype wow-3d-city-cat --output README.md
node bin/monoforge.js list
```

## Agent Skill Manifests
Read `.agents/skills/monoforge/SKILL.md` and `.agents/skills/monoforge-readme-creator/SKILL.md` for complete archetype parameters, interactive GFM patterns, clickable Studio buttons, and Camo compliance rules.
