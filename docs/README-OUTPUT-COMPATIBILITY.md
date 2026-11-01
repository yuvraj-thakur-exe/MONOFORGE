# README Output Compatibility and Security

## Output formats by destination

| Feature | MonoForge browser preview | GitHub README | Portable generated asset |
|---|---:|---:|---:|
| Markdown headings, lists, tables, links | Yes | Yes | N/A |
| Mermaid diagram code blocks | Yes | Supported by GitHub | SVG/PNG via Mermaid CLI |
| Static SVG image | Yes | Yes, subject to GitHub sanitization/rendering behavior | SVG |
| Static PNG/JPEG | Yes | Yes | PNG/JPEG |
| Animated GIF | Yes | Yes, subject to size/rendering limits | GIF |
| Arbitrary JavaScript | Yes, in app runtime only | No | Not an image format |
| React component | Yes, in app runtime only | No | Build to image/asset or host separately |
| Canvas | Yes, in app runtime only | No | Render to image/animation |
| Arbitrary CSS animation | Yes, in app runtime only | Do not rely on it | Render frames to GIF/video where a destination supports it |
| iframe/embed app | Yes, if app policy permits | Do not rely on it | Hosted widget URL for portfolio use |
| Three.js/WebGL scene | Yes, in hosted app | No | Render selected frames to image/GIF/video |

## Recommended multi-output pattern

For a feature such as an animated contribution city, create:

1. A live React/Canvas/Three.js widget inside MonoForge Studio.
2. A validated static PNG/SVG fallback.
3. An optional GIF export for README embedding after compatibility and file-size checks.
4. A short Markdown embed snippet and descriptive alt text.
5. A source/data snapshot so the output can be regenerated.

## SVG allowlist baseline

For exported SVG, allow only the elements and attributes required by the internal renderer. Reject by default:

- `script` elements;
- event-handler attributes such as `onload` and `onclick`;
- `foreignObject`;
- external script, stylesheet, font, image, or document references;
- `javascript:` and unsafe `data:` URLs;
- arbitrary CSS `url()` references;
- embedded HTML;
- unbounded filters, masks, dimensions, or path complexity.

Validate the sanitized output with an SVG parser and render it in the chosen preview/export engine.

## Asset and performance limits

Set configurable caps for:
- image width/height;
- SVG element count and byte size;
- GIF dimensions, frame count, and duration;
- render CPU time and memory;
- external fetch size and timeout;
- animation frame rate and pixel ratio.

Provide a reduced-motion option and a static fallback for every animated component.

## GitHub output checks

Run checks for:
- Markdown parser success;
- local asset references resolving relative to the README location;
- image alt text;
- heading hierarchy;
- valid Mermaid syntax;
- no script or iframe assumptions;
- image size budget;
- no secrets or private data;
- no unsupported custom HTML claims.
