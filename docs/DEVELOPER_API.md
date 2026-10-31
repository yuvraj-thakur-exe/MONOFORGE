# MonoForge Developer API & Serverless Endpoints

MonoForge provides developer APIs for dynamic SVG generation, resume extraction, AI profile synthesis, and client state orchestration.

---

## 1. Dynamic Telemetry SVG API

Endpoint: `GET /api/telemetry/svg`

Generates real-time, 60fps GPU-accelerated SVG infographics compatible with GitHub Camo CDN.

### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `type` | string | `radar` | Module type: `radar`, `isocalendar`, `languages`, `habits`, `achievements`, `banner`. |
| `user` | string | `octocat` | Target GitHub username to analyze. |
| `theme` | string | `tokyonight` | Color theme: `tokyonight`, `cyberpunk`, `dracula`, `nord`, `minimal-light`. |
| `speed` | number | `4` | Animation loop duration in seconds. |

### Example Request

```markdown
<p align="center">
  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?type=radar&user=yuvraj-thakur-exe&theme=cyberpunk" alt="Activity Radar" />
</p>
```

---

## 2. AI Profile Architect API

Endpoint: `POST /api/ai`

Model-provider proxy supporting OpenRouter with graceful heuristic fallbacks.

### Request Body

```json
{
  "action": "generate-readme",
  "prompt": "Senior Cloud Infrastructure Engineer with 8 years experience in Kubernetes, Go, and Terraform.",
  "model": "google/gemini-2.0-flash-exp:free",
  "apiKey": "sk-or-v1-optional-user-key",
  "context": {
    "currentBio": "Building cloud native tools.",
    "technologies": ["Go", "Kubernetes", "AWS"]
  }
}
```

### Response

```json
{
  "success": true,
  "result": {
    "markdown": "# Hey there, I'm ...",
    "bio": "Building scalable cloud infra...",
    "technologies": ["Go", "Kubernetes", "AWS", "Terraform", "Docker"],
    "suggestions": ["Generated 4-section README layout", "Injected featured projects table"]
  },
  "modelUsed": "google/gemini-2.0-flash-exp:free"
}
```

---

## 3. Resume & Bio Extraction API

Endpoint: `POST /api/enrichment/resume`

Extracts structured work history, skills, and projects from uploaded PDF or DOCX files.

- Strict confirmation gate: nothing writes to the Zustand profile store without explicit user review.
- Supported file types: `.pdf`, `.docx`, `.txt`.
- Max payload size: 10 MB.

---

## 4. Client State API (`useReadmeStore`)

The single source of truth for profile state is managed via Zustand in `src/store/useReadmeStore.ts`:

```typescript
import { useReadmeStore } from '@/store/useReadmeStore';

// Read state
const config = useReadmeStore((state) => state.config);
const rawMarkdown = useReadmeStore((state) => state.rawMarkdown);

// Mutate state
const {
  updateBio,
  toggleSectionVisibility,
  duplicateSection,
  moveSection,
  addSection,
  removeSection,
  setRawMarkdown,
} = useReadmeStore.getState();
```

---

## 5. Pure Markdown Compiler (`buildMarkdown`)

Located in `src/lib/buildMarkdown.ts`:

```typescript
import { buildMarkdown } from '@/lib/buildMarkdown';

const markdownString = buildMarkdown(config);
```

- Zero side-effects, 100% pure function.
- Respects `visible: false` on section items.
- Camo-tested and covered by unit tests in `src/lib/buildMarkdown.test.ts`.

