# Contributing Templates & Archetypes to MonoForge

MonoForge features a library of **85+ visual archetypes** catering to developers, researchers, gamers, minimalists, and enterprise engineers. This guide explains how to design and contribute a new template.

---

## Archetype Categories

Templates are organized into seven core genres:

1. **Cyberpunk & Terminal**: High-contrast neon lines (`#FFE600`, `#00F0FF`), scanlines, ASCII banners, and CLI aesthetics.
2. **Minimalist**: Clean typography, generous whitespace, monochrome badges, and distraction-free layouts.
3. **Enterprise & Executive**: Polished cards, leadership impact summaries, metrics tables, and professional social badges.
4. **Open-Source Maintainer**: Star history widgets, release badges, sponsor banners, and contributor graphs.
5. **Creative & Game Dev**: Pixel art characters, game engine shields, animated sprites, and audio visualizer cards.
6. **Academic & Researcher**: Paper citations, arXiv links, LaTeX math formatting, and lab affiliation cards.
7. **Polyglot & Full-Stack**: Multi-language donut charts, framework ecosystems, and devops telemetry.

---

## Template Specification

Templates live in `src/lib/templates/archetypes.ts`. Each archetype adheres to the following interface:

```typescript
export interface ArchetypeTemplate {
  id: string;
  name: string;
  category: 'cyberpunk' | 'minimalist' | 'executive' | 'maintainer' | 'gamedev' | 'academic' | 'polyglot';
  description: string;
  previewUrl: string;
  tags: string[];
  config: {
    theme: string;
    headline: string;
    bio: string;
    sections: Array<{
      id: string;
      pluginId: string;
      title?: string;
      visible?: boolean;
      props: Record<string, any>;
    }>;
  };
}
```

---

## Contribution Process

1. **Fork the Repository**:
   Fork [yuvraj-thakur-exe/MONOFORGE](https://github.com/yuvraj-thakur-exe/MONOFORGE) to your GitHub account.

2. **Add Your Template**:
   Add your entry into `src/lib/templates/archetypes.ts`. Make sure all referenced `pluginId`s exist in `PLUGIN_REGISTRY`.

3. **Verify Pure Markdown Output**:
   Run the template markdown test:
   ```bash
   npx vitest run src/lib/buildMarkdown.test.ts
   ```

4. **Test in the UI**:
   Start the dev server:
   ```bash
   pnpm dev
   ```
   Navigate to `/developer`, open the **Template Gallery**, and verify that your template renders accurately in the Live Preview pane.

5. **Open Pull Request**:
   Create a PR with screenshot comparisons and title `feat(templates): add [Template Name] archetype`.
