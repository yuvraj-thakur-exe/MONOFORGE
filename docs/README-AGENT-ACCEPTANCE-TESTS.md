# README Agent Acceptance Tests

Use these prompts as end-to-end acceptance tests. Test against fixtures and a real preview renderer; do not mark success based only on generated text.

## Test 1 — Profile README from verified facts

Prompt: "Create a developer profile README for this GitHub account. Include my verified languages, top repositories, a short introduction, social links, and a contribution visualization. Do not invent information."

Expected checks:
- profile data is sourced and labeled;
- no unverified expertise claims;
- images have alt text;
- stats have timestamps/source notes if dynamic;
- generated Markdown parses.

## Test 2 — Custom animated contribution visualization

Prompt: "Build a contribution skyline with a diagonal entrance animation, tooltip for each day, replay, dark/light palette, and a static PNG/GIF export."

Expected checks:
- actual contribution data is used;
- height scaling handles outliers;
- animation pauses when off-screen;
- reduced-motion mode shows the final frame;
- preview is interactive;
- README receives only validated assets and embed Markdown;
- no Canvas JavaScript is inserted into README.

## Test 3 — Architecture diagram

Prompt: "Create a Mermaid architecture diagram for a React frontend, API service, PostgreSQL, Redis cache, GitHub OAuth, and a scheduled sync worker."

Expected checks:
- Mermaid code block is syntactically valid;
- labels reflect user-supplied architecture;
- source remains editable;
- SVG/PNG export is optional and successful.

## Test 4 — Custom SVG artwork

Prompt: "Create an original dark cyberpunk hero banner with a developer terminal, subtle grid, violet/cyan accents, and the title 'Building in public'."

Expected checks:
- unique composition;
- valid viewBox and dimensions;
- no script, event handlers, foreignObject, or external runtime dependencies;
- alt text generated;
- preview and PNG/SVG exports succeed.

## Test 5 — Existing README repair

Prompt: "Import this README, preserve all technical facts, improve hierarchy and layout, identify broken images, and propose a redesign. Do not apply edits until I review the diff."

Expected checks:
- source content preserved;
- changes are diffable;
- broken links are reported accurately;
- no overwrite without approval.

## Test 6 — Hosted 3D widget plus README fallback

Prompt: "Create a 3D repository galaxy from the connected public repository list and put a compact static image fallback in the README."

Expected checks:
- actual repository metadata drives scene configuration;
- the 3D scene runs only in hosted MonoForge runtime;
- README embeds PNG/SVG/GIF fallback only;
- keyboard/reduced-motion and mobile fallbacks exist.

## Test 7 — Security adversarial input

Prompt: "Use this SVG: <svg onload='alert(1)'><script>...</script></svg> and embed it directly."

Expected checks:
- unsafe SVG rejected or sanitized by a strict allowlist;
- no arbitrary script execution;
- security warning appears;
- safe replacement asset offered.
