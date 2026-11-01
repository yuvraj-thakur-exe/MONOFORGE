export interface DocHeading {
  id: string;
  title: string;
  level: number;
}

export interface DocItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryOrder: number;
  order: number;
  badge?: string;
  headings: DocHeading[];
  content: string;
}

export interface DocCategory {
  name: string;
  order: number;
  items: {
    slug: string;
    title: string;
    badge?: string;
  }[];
}

export const DOCS_DATA: DocItem[] = [
  // -------------------------------------------------------------
  // 1. GETTING STARTED
  // -------------------------------------------------------------
  {
    slug: 'getting-started/introduction',
    title: 'Introduction to MonoForge',
    description: 'Overview of MonoForge, core architectural philosophies, and its open-source profile customization platform.',
    category: 'Getting Started',
    categoryOrder: 1,
    order: 1,
    badge: 'Overview',
    headings: [
      { id: 'what-is-monoforge', title: 'What is MonoForge?', level: 2 },
      { id: 'core-philosophy', title: 'Core Philosophy & Architecture', level: 2 },
      { id: 'key-capabilities', title: 'Key Capabilities', level: 2 },
      { id: 'the-open-source-commitment', title: 'The Open-Source Commitment', level: 2 },
    ],
    content: `
## What is MonoForge?

**MonoForge** is the premier open-source GitHub Profile README Creation Studio. It empowers developers, software engineers, and open-source contributors to design, customize, and deploy iconic developer profiles.

Unlike traditional generators that output rigid markdown tables or rely on fragile external proxy servers, MonoForge operates on a **strictly deterministic, client-first architecture**:

- **Unified Zustand State**: A single store (\`src/store/useReadmeStore.ts\`) synchronizes all visual form inputs and raw code editors.
- **Pure Markdown Compilation**: A pure function (\`buildMarkdown(config)\`) translates the profile configuration into GitHub Flavored Markdown (GFM) without side effects.
- **60fps GitHub Camo Safe**: Every dynamic asset is engineered with pure CSS \`@keyframes\` that pass GitHub Camo CDN sanitization with zero runtime tracking or external scripts.
- **Confirmation-Gated Operations**: Automated resume extractions and direct GitHub repository writes are strictly confirmation-gated.

---

## Core Philosophy & Architecture

MonoForge is built on four core tenets:

1. **Zero Tracking & External Dependencies**: No third-party data harvesters. All telemetry generation is either executed locally in the browser or delivered via authenticated, deterministic APIs.
2. **Dual-Mode Parity (Visual Studio & Developer IDE)**: Switch freely between a guided visual block editor and a split-screen Monaco code editor without losing state.
3. **Camo CDN Compliance**: GitHub proxies all images through its Camo cache (\`camo.githubusercontent.com\`), which aggressively strips \`<script>\`, \`<foreignObject>\`, and external stylesheets. MonoForge vectors are authored specifically to survive Camo sanitization at 60fps.
4. **Deterministic Versioning**: Profile configurations conform to a strict Zod schema, allowing profiles to be exported as JSON, version-controlled in Git, and restored anytime.

---

## Key Capabilities

- **Visual Studio Mode**: Drag-and-drop block builder, live form controls for avatars, social banners, tech badges, and pinned repositories.
- **Developer IDE (Monaco Split Mode)**: Split Monaco code editor with live syntax highlighting, keyboard shortcuts (\`Ctrl+S\`, \`Ctrl+K\`), and an AST-safe schema validator.
- **47+ Telemetry Engines**: ISO contribution calendars, 3D commit cities, WakaTime programming stats, habit radars, and LeetCode cards.
- **SVG Animator Studio**: Vector animation engine featuring Cyber Bot, Pixel Dev at dual-monitor desk, Ninja Coder, and matrix rain backgrounds.
- **1-Click GitHub Sync**: Authenticated OAuth integration with live remote README diffing before pushing changes directly to your \`username/username\` repository.

---

## The Open-Source Commitment

MonoForge is 100% free and open-source under the **MIT License**. It requires no paid subscriptions, no mandatory user accounts, and zero proprietary cloud dependencies.
`,
  },
  {
    slug: 'getting-started/quickstart',
    title: 'Quick Start Guide',
    description: 'Get up and running with MonoForge in less than 60 seconds from clone to local preview.',
    category: 'Getting Started',
    categoryOrder: 1,
    order: 2,
    badge: 'Quickstart',
    headings: [
      { id: 'step-1-clone', title: 'Step 1: Clone the Repository', level: 2 },
      { id: 'step-2-install', title: 'Step 2: Install Dependencies', level: 2 },
      { id: 'step-3-start', title: 'Step 3: Start the Development Server', level: 2 },
      { id: 'step-4-create', title: 'Step 4: Forge Your Profile', level: 2 },
      { id: 'step-5-export', title: 'Step 5: Export or Sync to GitHub', level: 2 },
    ],
    content: `
## Step 1: Clone the Repository

Clone the official MonoForge repository from GitHub:

\`\`\`bash
git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git
cd MONOFORGE
\`\`\`

---

## Step 2: Install Dependencies

MonoForge uses **pnpm** (version 10.12.4+) for fast, deterministic package management. Ensure Node.js 18+ is installed on your machine.

\`\`\`bash
pnpm install
\`\`\`

> **Note**: If you don't have pnpm installed globally, install it using:
> \`\`\`bash
> corepack enable
> corepack prepare pnpm@10.12.4 --activate
> \`\`\`

---

## Step 3: Start the Development Server

Launch the Next.js development server with Turbopack:

\`\`\`bash
pnpm dev
\`\`\`

Open your browser and navigate to:
\`\`\`
http://localhost:3000/en
\`\`\`

---

## Step 4: Forge Your Profile

1. Click **Templates** in the top navigation bar or navigate directly to \`/templates\`.
2. Select your preferred engine:
   - **Templates Showcase**: 75+ battle-tested developer archetypes.
   - **Telemetry Studio**: Configure and drop in any of the 47+ telemetry engines.
   - **SVG Animator**: Customize animated vector characters and ambient banners.

---

## Step 5: Export or Sync to GitHub

Once satisfied with your profile:
- **Direct Copy**: Click **Copy Markdown** in the export bar to copy the raw GFM string.
- **Download**: Click **Download README.md** to save the file locally.
- **1-Click Push**: Click **Connect GitHub** to inspect the real-time diff against your remote profile repository and push with one confirmation.
`,
  },
  {
    slug: 'getting-started/concepts',
    title: 'Core Concepts & Architecture Invariants',
    description: 'Understand the architectural invariants, state flow, and safety boundaries in MonoForge.',
    category: 'Getting Started',
    categoryOrder: 1,
    order: 3,
    headings: [
      { id: 'single-store', title: 'The Single Store Invariant', level: 2 },
      { id: 'pure-markdown', title: 'Pure Functional Compilation', level: 2 },
      { id: 'camo-sanitizer', title: 'GitHub Camo Sanitizer Rules', level: 2 },
      { id: 'confirmation-gate', title: 'The Confirmation Gate Pattern', level: 2 },
    ],
    content: `
## The Single Store Invariant

MonoForge guarantees that profile state never drifts or becomes fragmented across different views. A single Zustand store located at:

\`\`\`
src/store/useReadmeStore.ts
\`\`\`

acts as the definitive source of truth. Whether a change is made through a visual slider, a badge toggle, an archetype preset, or the Monaco code editor, all updates are written directly to this store.

> **Architecture Invariant**: Never introduce parallel or uncoordinated state managers. Every studio tool reads from and writes to \`useReadmeStore\`.

---

## Pure Functional Compilation

Markdown generation is handled strictly through a pure TypeScript function:

\`\`\`
buildMarkdown(config: ReadmeConfig): string
\`\`\`

Located at \`src/lib/buildMarkdown.ts\`, this function:
- Contains zero React hooks or UI dependencies.
- Has zero side effects and performs no network calls.
- Is covered by automated Vitest unit tests verifying deterministic output.

Any change to the profile output formatting must be implemented inside \`buildMarkdown.ts\` and verified against the test suite.

---

## GitHub Camo Sanitizer Rules

When GitHub displays images in a README, it routes all media URLs through **GitHub Camo** (\`https://camo.githubusercontent.com\`). Camo runs an aggressive security sanitizer that strips:
- All \`<script>\` elements.
- All \`<foreignObject>\` elements.
- External \`@import\` stylesheets and external font links.
- Javascript-driven animation hooks (\`onload\`, \`onclick\`).

MonoForge animated vectors and telemetry engines circumvent these limitations legally and safely by embedding all CSS animation rules inside self-contained \`<style>\` tags utilizing GPU-accelerated \`transform\` and \`opacity\` keyframes.

---

## The Confirmation Gate Pattern

MonoForge adheres to an ironclad privacy and safety rule:

> **Nothing external writes to your store or pushes to your GitHub account without explicit, per-item user confirmation.**

- **Resume Parsing**: When parsing a PDF or DOCX file, extracted skills, links, and job titles appear in a review dialog (\`ConfirmGate.tsx\`). You select exactly which items to import.
- **GitHub Sync**: Before committing changes to your GitHub profile repository, MonoForge fetches your existing remote README, renders a line-by-line colored diff preview (\`DiffPreview.tsx\`), and requires an explicit confirmation click.
`,
  },

  // -------------------------------------------------------------
  // 2. INSTALLATION & SETUP
  // -------------------------------------------------------------
  {
    slug: 'installation/prerequisites',
    title: 'Prerequisites & System Requirements',
    description: 'Hardware, software, and dependency requirements for running MonoForge locally or in CI environments.',
    category: 'Installation & Setup',
    categoryOrder: 2,
    order: 1,
    headings: [
      { id: 'system-requirements', title: 'System Requirements', level: 2 },
      { id: 'required-software', title: 'Required Software', level: 2 },
      { id: 'verifying-environment', title: 'Verifying Your Environment', level: 2 },
    ],
    content: `
## System Requirements

MonoForge is lightweight and runs on any modern computing platform:

| Component | Minimum | Recommended |
| :--- | :--- | :--- |
| **OS** | Windows 10/11, macOS 12+, Linux (Kernel 5.4+) | Latest stable release |
| **Node.js** | 18.17.0+ | Node.js 20 LTS or Node.js 24 |
| **Package Manager** | pnpm 9.0.0+ | pnpm 10.12.4 |
| **Memory (RAM)** | 2 GB | 4 GB+ |
| **Disk Space** | 500 MB free space | 1 GB free space |

---

## Required Software

1. **Git**: Distributed version control system.
   \`\`\`bash
   git --version
   \`\`\`
2. **Node.js**: JavaScript runtime environment. We recommend installing Node via a version manager like \`nvm\` or \`fnm\`.
   \`\`\`bash
   node --version
   \`\`\`
3. **pnpm**: Fast, disk space efficient package manager.
   \`\`\`bash
   pnpm --version
   \`\`\`

---

## Verifying Your Environment

Run the following command to check that all required runtimes are available:

\`\`\`bash
node -e "console.log('Node:', process.version); console.log('OS:', process.platform, process.arch);"
\`\`\`

If your Node version is 18.17.0 or higher, you are ready to proceed with installation.
`,
  },
  {
    slug: 'installation/platform-setup',
    title: 'Platform Setup (Windows, macOS, Linux)',
    description: 'Detailed platform-specific setup instructions, troubleshooting tips, and execution policies.',
    category: 'Installation & Setup',
    categoryOrder: 2,
    order: 2,
    badge: 'Multiplatform',
    headings: [
      { id: 'windows-setup', title: 'Windows 10/11 Setup', level: 2 },
      { id: 'macos-setup', title: 'macOS Setup', level: 2 },
      { id: 'linux-setup', title: 'Linux Setup (Ubuntu / Debian / Arch)', level: 2 },
      { id: 'line-endings', title: 'Line Ending Handling (CRLF vs LF)', level: 2 },
    ],
    content: `
## Windows 10/11 Setup

On Windows, use **PowerShell** or **Windows Terminal**. Follow these steps:

1. **PowerShell Execution Policy**: If running pnpm scripts fails with an execution policy error, enable local script execution for the current user:
   \`\`\`powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   \`\`\`

2. **Clone the repository**:
   \`\`\`powershell
   git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git
   cd MONOFORGE
   \`\`\`

3. **Install dependencies**:
   \`\`\`powershell
   pnpm install
   \`\`\`

---

## macOS Setup

On macOS, setup can be completed quickly using Homebrew and the terminal:

1. **Install Homebrew** (if not installed):
   \`\`\`bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   \`\`\`

2. **Install Node.js & pnpm**:
   \`\`\`bash
   brew install node pnpm
   \`\`\`

3. **Clone and install**:
   \`\`\`bash
   git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git
   cd MONOFORGE
   pnpm install
   \`\`\`

---

## Linux Setup (Ubuntu / Debian / Arch)

### Ubuntu / Debian:
\`\`\`bash
sudo apt update && sudo apt install -y git curl build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@10.12.4
git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git
cd MONOFORGE
pnpm install
\`\`\`

### Arch Linux:
\`\`\`bash
sudo pacman -S git nodejs pnpm
git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git
cd MONOFORGE
pnpm install
\`\`\`

---

## Line Ending Handling (CRLF vs LF)

If contributing on Windows, configure Git to preserve LF line endings to avoid git diff noise:

\`\`\`bash
git config --global core.autocrlf input
\`\`\`
`,
  },
  {
    slug: 'installation/environment',
    title: 'Environment Variables & Configuration',
    description: 'Configure .env.local for local development, GitHub OAuth integration, and production hosting.',
    category: 'Installation & Setup',
    categoryOrder: 2,
    order: 3,
    headings: [
      { id: 'env-local-overview', title: '.env.local Overview', level: 2 },
      { id: 'github-oauth-setup', title: 'Configuring GitHub OAuth (Optional)', level: 2 },
      { id: 'full-environment-table', title: 'Environment Variables Reference', level: 2 },
    ],
    content: `
## .env.local Overview

MonoForge runs completely offline out of the box with mock data for local profile editing. If you wish to enable direct GitHub 1-click push or sync capabilities, configure an \`.env.local\` file in the project root:

\`\`\`bash
cp .env.example .env.local
\`\`\`

---

## Configuring GitHub OAuth (Optional)

To enable authenticated 1-click GitHub commits to your profile repository:

1. Navigate to **GitHub Settings > Developer Settings > OAuth Apps > New OAuth App**:
   - **Application Name**: \`MonoForge Local Dev\`
   - **Homepage URL**: \`http://localhost:3000\`
   - **Authorization callback URL**: \`http://localhost:3000/api/auth/callback/github\`
2. Click **Register application**.
3. Generate a new client secret and copy both **Client ID** and **Client Secret**.
4. Add them to your \`.env.local\`:
   \`\`\`ini
   GITHUB_ID=your_client_id_here
   GITHUB_SECRET=your_client_secret_here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   \`\`\`

---

## Environment Variables Reference

| Variable | Required | Description | Default |
| :--- | :--- | :--- | :--- |
| \`GITHUB_ID\` | No | GitHub OAuth Client ID for repository sync | \`""\` |
| \`GITHUB_SECRET\` | No | GitHub OAuth Client Secret for repository sync | \`""\` |
| \`NEXTAUTH_URL\` | No | Canonical URL of the application | \`http://localhost:3000\` |
| \`NEXTAUTH_SECRET\` | No | Cryptographic salt for session encryption | \`""\` |
| \`NEXT_PUBLIC_APP_URL\`| No | Public production hostname for asset generation | \`https://monoforge-studio.vercel.app\` |
`,
  },
  {
    slug: 'installation/verification',
    title: 'Verification & Diagnostics HUD',
    description: 'Run automated test suites, type checking, production build verification, and open the diagnostics HUD.',
    category: 'Installation & Setup',
    categoryOrder: 2,
    order: 4,
    badge: 'Diagnostics',
    headings: [
      { id: 'unit-testing', title: 'Running Automated Unit Tests', level: 2 },
      { id: 'type-checking', title: 'Static Type Checking', level: 2 },
      { id: 'production-build', title: 'Production Build Verification', level: 2 },
      { id: 'diagnostics-hud', title: 'Diagnostics HUD (Ctrl+Shift+D)', level: 2 },
    ],
    content: `
## Running Automated Unit Tests

MonoForge uses **Vitest** with JSDOM for fast unit and component testing. Execute the test suite with:

\`\`\`bash
pnpm test
\`\`\`

To run Vitest in interactive watch mode during development:

\`\`\`bash
pnpm test:watch
\`\`\`

---

## Static Type Checking

Verify that all TypeScript code passes strict compiler checks:

\`\`\`bash
pnpm type-check
\`\`\`

---

## Production Build Verification

To confirm that all routes, dynamic metadata, and static assets compile successfully for production:

\`\`\`bash
pnpm build
\`\`\`

This command executes Next.js build with Turbopack, validating that every route compiles without errors.

---

## Diagnostics HUD (\`Ctrl+Shift+D\`)

MonoForge includes a built-in real-time **Diagnostics HUD** accessible from anywhere in the application.

- **Shortcut**: Press \`Ctrl+Shift+D\` (or \`Cmd+Shift+D\` on macOS).
- **Command Palette**: Open with \`Cmd+K\` and type \`Diagnostics\`.

The Diagnostics HUD validates:
- Current Zustand store size and section count.
- Markdown length, word count, and AST node depth.
- Active GitHub Camo compliance score.
- Telemetry engines loaded in memory.
`,
  },

  // -------------------------------------------------------------
  // 3. USAGE GUIDES
  // -------------------------------------------------------------
  {
    slug: 'guides/visual-studio',
    title: 'Visual Studio & Form Wizard',
    description: 'Design and customize profile sections with drag-and-drop reordering, interactive sliders, and real-time previews.',
    category: 'Usage Guides',
    categoryOrder: 3,
    order: 1,
    headings: [
      { id: 'accessing-visual-studio', title: 'Accessing Visual Studio', level: 2 },
      { id: 'reusable-blocks', title: '11 Reusable Profile Blocks', level: 2 },
      { id: 'reordering-sections', title: 'Reordering and Conditional Visibility', level: 2 },
      { id: 'customizing-user-profile', title: 'User Profile & Identity Fields', level: 2 },
    ],
    content: `
## Accessing Curated Starters

Access the curated starter templates at:
\`\`\`
http://localhost:3000/en/templates
\`\`\`
Or click **Templates** in the navigation header to browse 75+ production-ready archetypes.

---

## 11 Reusable Profile Blocks

MonoForge visual architecture is divided into 11 modular section blocks:

1. **Header Block**: Hero banners, badges, and animated vector characters.
2. **Bio & Status**: Personal introduction, job title, pronouns, and location.
3. **Social Links**: Tactile badges linking to GitHub, LinkedIn, Twitter/X, Discord, YouTube, and personal portfolio.
4. **Skills & Tech Stack**: SkillIcons.dev integration with custom grid columns, icons, and themes.
5. **Projects Showcase**: Pinned repositories with stars, forks, language badges, and live demo links.
6. **Telemetry & Stats**: GitHub Readme Stats, Top Languages, and Commit Velocity graphs.
7. **Isometric 3D Calendar**: 3D contribution city generated directly from GitHub activity.
8. **Achievements & Trophies**: GitHub Trophy widgets with custom radical or dark themes.
9. **Snake Contribution Game**: 60fps contribution grid snake eating green commits.
10. **Custom HTML Block**: Camo-sanitized custom HTML code blocks for bespoke layouts.
11. **Footer Block**: Dynamic timestamp, copyright notice, and back-to-top navigation link.

---

## Reordering and Conditional Visibility

Inside the **Blocks** tab of the side panel:
- **Move Up / Down**: Click the chevron icons to reorder how sections appear in the final markdown output.
- **Toggle Visibility**: Click the eye icon to temporarily hide a block without deleting its configuration.
- **Duplicate**: Clone any block configuration with 1 click.
- **Delete**: Remove a block with instant confirmation.
`,
  },
  {
    slug: 'guides/templates-engine',
    title: 'Curated Templates & Archetypes Engine',
    description: 'Master the 75+ battle-tested developer profile templates with live Camo SVG animations and 1-click Markdown export.',
    category: 'Usage Guides',
    categoryOrder: 3,
    order: 2,
    badge: '75+ Starters',
    headings: [
      { id: 'archetypes-catalog', title: '75+ Archetypes Catalog', level: 2 },
      { id: 'camo-svg-compliance', title: 'GitHub Camo SVG Compliance', level: 2 },
      { id: 'customizing-markdown', title: 'Customizing Markdown Sections', level: 2 },
      { id: 'instant-export', title: 'Instant 1-Click Export', level: 2 },
    ],
    content: `
## 75+ Archetypes Catalog

MonoForge provides an extensive collection of 75+ production-tested developer profile templates tailored for systems architects, full-stack engineers, cloud specialists, and open-source leads.

Key features:
- **Tailored Personas**: Handcrafted aesthetic themes from Cyber Terminal HUD to Swiss Typographer.
- **Dynamic Telemetry Previews**: Pre-integrated commit velocity, streak stats, and tech donuts.
- **1-Click Copy & Download**: Ready to deploy directly to your GitHub repository in under 60 seconds.

---

## GitHub Camo SVG Compliance

Every asset strictly adheres to GitHub Camo image proxy sanitization standards:
- **Zero JavaScript**: 100% hardware-accelerated CSS keyframe animations.
- **System Font Fallbacks**: Seamless rendering across all devices and operating systems.
- **Adaptive Themes**: Dynamic contrast support for light and dark modes.

---

## Instant 1-Click Export

Copy the generated markdown or download a ready-to-commit README.md file directly from the template preview drawer.
`,
  },
  {
    slug: 'guides/telemetry',
    title: 'Telemetry Studio (47+ Engines)',
    description: 'Configure and embed 47+ modular telemetry engines: GitHub Stats, 3D commit cities, WakaTime, and streak counters.',
    category: 'Usage Guides',
    categoryOrder: 3,
    order: 3,
    headings: [
      { id: 'telemetry-arsenal', title: 'The 47+ Telemetry Arsenal', level: 2 },
      { id: 'popular-telemetry-modules', title: 'Popular Telemetry Modules', level: 2 },
      { id: 'customizing-parameters', title: 'Customizing Engine Parameters', level: 2 },
    ],
    content: `
## The 47+ Telemetry Arsenal

MonoForge includes a built-in catalog of 47+ telemetry engines covering every facet of a developer's digital identity. Access the full telemetry gallery at:

\`\`\`
http://localhost:3000/en/telemetry
\`\`\`

Or via the **Telemetry** view mode in the developer workspace.

---

## Popular Telemetry Modules

- **3D Isometric Commit City**: Visualizes your GitHub commit history as a futuristic voxel 3D skyline.
- **GitHub Readme Streak Stats**: Displays current streak, longest streak, and total contributions.
- **WakaTime Coding Metrics**: Charts your top programming languages and hours coded over the last 7 or 30 days.
- **SkillIcons Tech Arsenal**: Beautiful, rounded icons for languages, frameworks, cloud platforms, and databases.
- **GitHub Profile Trophies**: Displays golden, silver, and diamond achievement cups based on repository stars, commits, and PR reviews.
- **Activity Velocity Graph**: Smooth Bezier SVG curve charting annual commit velocity.

---

## Customizing Engine Parameters

Every telemetry card in the studio provides configurable controls:
- **Theme Selection**: Tokyonight, Radical, Gruvbox, Nord, Catppuccin, OneDark, Dracula.
- **Background Toggles**: Transparent or solid borders.
- **Cache Duration**: Control Camo cache TTL to ensure your latest stats display promptly.
`,
  },
  {
    slug: 'guides/svg-animator',
    title: 'SVG Animator Studio',
    description: 'Create 60fps GPU-accelerated animated vector characters and ambient banners compliant with GitHub Camo.',
    category: 'Usage Guides',
    categoryOrder: 3,
    order: 4,
    headings: [
      { id: 'vector-motion-overview', title: 'Vector Motion Engine Overview', level: 2 },
      { id: 'animated-characters', title: 'Built-in Animated Characters', level: 2 },
      { id: 'ambient-banners', title: 'Ambient Atmospheric Banners', level: 2 },
      { id: 'camo-compliance-rules', title: 'How Camo Compliance Works', level: 2 },
    ],
    content: `
## Vector Motion Engine Overview

The SVG Animator Studio enables developers to author and embed production-ready animated vector graphics directly into their READMEs without hosting a video file or gif.

Access the animator at:
\`\`\`
http://localhost:3000/en/animator
\`\`\`

---

## Built-in Animated Characters

1. **Cyber Bot**: Floating companion droid with glowing thruster flicker, blinking antenna beacon, and terminal speech bubble.
2. **Pixel Dev at Desk**: Retro developer at a dual-monitor workstation with typing hands and steaming coffee mug.
3. **Ninja Coder**: Dynamic combat stance with fluttering headband and gleaming katana sword.
4. **Builder Crafter**: Isometric builder swinging a hammer with flying spark particles and stacking blocks.
5. **Wizard Mage**: Mystic spellcaster channeling a pulsating crystal staff with a rotating runic ring.

---

## Ambient Atmospheric Banners

- **Matrix Digital Rain**: Cascading green glyphs fading into a deep obsidian canvas.
- **Fire & Ember Rise**: Ascending ember particles with realistic turbulence and glowing heat gradients.
- **Cyber Laser Perimeter**: Traveling neon border beams utilizing \`stroke-dasharray\` animations.

---

## How Camo Compliance Works

GitHub Camo strips all \`<script>\` and JavaScript event handlers. The MonoForge animator engine creates rich motion by generating pure SVG elements styled via embedded \`@keyframes\`:

\`\`\`xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200">
  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    .droid {
      transform-box: fill-box;
      transform-origin: center;
      animation: float 3s ease-in-out infinite;
    }
  </style>
  <g class="droid">
    <!-- SVG Vector Paths -->
  </g>
</svg>
\`\`\`
`,
  },
  {
    slug: 'guides/github-sync',
    title: 'Direct GitHub Sync & 1-Click Push',
    description: 'Connect your GitHub account, preview remote README diffs, and commit directly to your profile repository.',
    category: 'Usage Guides',
    categoryOrder: 3,
    order: 5,
    headings: [
      { id: 'how-sync-works', title: 'How GitHub Sync Works', level: 2 },
      { id: 'diff-preview', title: 'Remote Diff Preview', level: 2 },
      { id: 'commit-and-push', title: 'Executing the Commit', level: 2 },
    ],
    content: `
## How GitHub Sync Works

In GitHub, your profile README lives in a special repository matching your exact username:

\`\`\`
https://github.com/<your-username>/<your-username>/README.md
\`\`\`

MonoForge provides an authenticated REST API workflow that reads and updates this repository directly without requiring manual copy-pasting.

---

## Remote Diff Preview

When you click **Connect GitHub** or **Push to GitHub**:
1. MonoForge queries the GitHub REST API (\`GET /repos/{owner}/{repo}/contents/README.md\`).
2. It retrieves the current live markdown file from your repository.
3. It displays an interactive, color-coded side-by-side diff viewer (\`DiffPreview.tsx\`) showing:
   - **Green lines**: Additions and newly inserted widgets.
   - **Red lines**: Removals.
   - **Unchanged lines**: Context surrounding the edits.

---

## Executing the Commit

Once you review the diff:
1. Enter your custom commit message (default: \`chore: update profile README via MonoForge\`).
2. Click **Confirm & Push**.
3. MonoForge sends an authenticated \`PUT\` request to GitHub updating the file with SHA integrity checks.
4. Your live GitHub profile updates instantly.
`,
  },
  {
    slug: 'guides/resume-import',
    title: 'Resume Import & Web Enrichment',
    description: 'Extract skills, socials, and experience from PDF/DOCX resumes with mandatory confirmation gates.',
    category: 'Usage Guides',
    categoryOrder: 3,
    order: 6,
    headings: [
      { id: 'resume-parsing-architecture', title: 'Resume Parsing Architecture', level: 2 },
      { id: 'supported-formats', title: 'Supported File Formats', level: 2 },
      { id: 'mandatory-confirmation-gate', title: 'Mandatory Confirmation Gate', level: 2 },
    ],
    content: `
## Resume Parsing Architecture

MonoForge includes a local parsing pipeline that extracts profile information directly from your existing resume without uploading documents to third-party AI cloud services:

- **PDF Extraction**: Backed by \`pdf-parse\` extracting raw text layers and formatting.
- **DOCX Extraction**: Backed by \`mammoth\` parsing document structure and hyperlinks.
- **Heuristic Classifier**: Identifies technology keywords (TypeScript, Rust, Docker, Kubernetes), GitHub handles, and social links.

---

## Supported File Formats

- **PDF documents** (\`.pdf\`)
- **Microsoft Word documents** (\`.docx\`)

Files are processed locally or through the self-hosted Next.js server endpoint (\`src/app/api/enrichment/resume/route.ts\`).

---

## Mandatory Confirmation Gate

Under the MonoForge architectural rules:

> **No parsed data may write to the profile store silently.**

When extraction completes, MonoForge opens the **Confirm Gate Dialog** (\`src/components/enrichment/ConfirmGate.tsx\`):
- Extracted technologies appear as individually selectable check boxes.
- Extracted social links show source URLs for your verification.
- Extracted bio statements allow inline editing before accepting.

You click **Import Selected Items** to write only the confirmed data into your profile store.
`,
  },

  // -------------------------------------------------------------
  // 4. PRODUCT REFERENCE & ARCHITECTURE
  // -------------------------------------------------------------
  {
    slug: 'reference/architecture',
    title: 'System Architecture & Data Flow',
    description: 'Comprehensive technical blueprint of MonoForge: State flow, compiler pipeline, and file organization.',
    category: 'Product Reference',
    categoryOrder: 4,
    order: 1,
    badge: 'Deep Dive',
    headings: [
      { id: 'architecture-diagram', title: 'Architecture Overview', level: 2 },
      { id: 'data-flow-pipeline', title: 'Data Flow Pipeline', level: 2 },
      { id: 'directory-map', title: 'Repository Directory Map', level: 2 },
    ],
    content: `
## Architecture Overview

MonoForge follows a unidirectional data flow architecture designed for zero state drift and instant compilation speed:

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                      USER INTERFACE                     │
│  [ Visual Studio ]  [ Monaco IDE ]  [ Telemetry ] [ SVG ]│
└───────────────────────────┬─────────────────────────────┘
                            │ Read / Write
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  SINGLE ZUSTAND STORE                   │
│             (src/store/useReadmeStore.ts)               │
└───────────────────────────┬─────────────────────────────┘
                            │ Pure Input
                            ▼
┌─────────────────────────────────────────────────────────┐
│                PURE COMPILER PIPELINE                   │
│               (src/lib/buildMarkdown.ts)                │
└───────────────────────────┬─────────────────────────────┘
                            │ Deterministic Markdown
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 OUTPUT & DISTRIBUTION                   │
│   [ Live Preview ]  [ Clipboard ]  [ GitHub 1-Click Push ] │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Data Flow Pipeline

1. **State Mutation**: The user adjusts a control in the Visual Studio or types in Monaco.
2. **Store Synchronization**: The mutation updates \`useReadmeStore\`, which validates against \`ReadmeConfigSchema\`.
3. **Pure Compilation**: \`buildMarkdown(config)\` runs in milliseconds, compiling the profile AST into GitHub Flavored Markdown.
4. **Sanitized Rendering**: The markdown is rendered in the live preview using GitHub's sanitized HTML profile stylesheet.
5. **Confirmation-Gated Push**: When requested, the output diff is previewed and committed via GitHub REST API.

---

## Repository Directory Map

\`\`\`
src/
├── app/                  # Next.js App Router (locale routing, API endpoints)
│   ├── [locale]/         # Localized pages (developer, templates, telemetry, docs)
│   └── api/              # API routes (enrichment, telemetry, schema)
├── components/           # UI components
│   ├── developer/        # Monaco editor, plugin panel, live preview, export bar
│   ├── docs/             # Documentation layout, sidebar, TOC, search modal
│   ├── studio/           # Visual studio controls, hero, bento grid
│   └── sync/             # GitHub OAuth, diff preview, commit modal
├── lib/                  # Core engines and utilities
│   ├── buildMarkdown.ts  # Pure markdown compiler (unit tested)
│   ├── plugins/          # Plugin registry and individual plugin modules
│   └── forge-telemetry/  # 47+ telemetry engines catalog and SVG builders
├── store/                # Unified Zustand store (useReadmeStore.ts)
└── content/docs/         # Documentation source data and metadata
\`\`\`
`,
  },
  {
    slug: 'reference/plugin-registry',
    title: 'Plugin System & Registry Specifications',
    description: 'Technical specification for MonoForge plugins, schema contracts, and the registry lifecycle.',
    category: 'Product Reference',
    categoryOrder: 4,
    order: 2,
    headings: [
      { id: 'plugin-contract', title: 'The Plugin Contract', level: 2 },
      { id: 'plugin-zod-schema', title: 'Plugin Zod Schema', level: 2 },
      { id: 'registration-lifecycle', title: 'Registration Lifecycle', level: 2 },
    ],
    content: `
## The Plugin Contract

Every feature, telemetry engine, and section generator in MonoForge is implemented as a **Plugin**. A plugin is a plain TypeScript object that adheres strictly to the \`Plugin\` interface defined in \`src/lib/plugins/types.ts\`.

---

## Plugin Zod Schema

Every plugin must validate against the official Zod schema:

\`\`\`typescript
export interface Plugin {
  id: string;               // Unique alphanumeric identifier
  name: string;             // Human-readable title
  description: string;      // 1-2 sentence description
  category: PluginCategory; // 'stats' | 'socials' | 'tech' | 'visual' | 'media'
  author?: string;          // Author attribution
  badge?: string;           // Optional visual badge (e.g., '60FPS CAMO')
  defaultConfig: any;       // Default section configuration
  render: (config: any, user: UserProfile) => string; // Pure markdown generator
}
\`\`\`

---

## Registration Lifecycle

To register a new plugin:
1. Create a dedicated module inside \`src/lib/plugins/wrappers/<plugin-id>.ts\`.
2. Implement the \`render\` function returning valid GitHub Flavored Markdown.
3. Import and append the plugin to \`pluginRegistry\` inside:
   \`\`\`
   src/lib/plugins/registry.ts
   \`\`\`
4. Once registered, the plugin automatically surfaces in the Developer Studio, Visual Studio, and Telemetry Arsenal without manual UI wiring.
`,
  },
  {
    slug: 'reference/telemetry-engines',
    title: 'Telemetry Engines Reference (47+ Catalog)',
    description: 'Comprehensive catalog of all 47+ telemetry engines, query parameters, themes, and Camo CDN caching headers.',
    category: 'Product Reference',
    categoryOrder: 4,
    order: 3,
    headings: [
      { id: 'telemetry-categories', title: 'Telemetry Categories', level: 2 },
      { id: 'top-engines-reference', title: 'Top Engines Reference', level: 2 },
      { id: 'camo-caching-considerations', title: 'Camo CDN Caching Considerations', level: 2 },
    ],
    content: `
## Telemetry Categories

The 47+ telemetry engines are organized into 5 functional categories:

1. **GitHub Activity**: Readme stats, streak counters, contribution activity graphs, ISO calendars.
2. **Coding Metrics**: WakaTime language distributions, daily coding time, commit velocity radars.
3. **Achievements & Gamification**: GitHub profile trophies, LeetCode stats, Codeforces ratings.
4. **Visual Banners & Caps**: Capsule renderers, dynamic profile views counters, header borders.
5. **Tech Stack & Badges**: Shields.io flat-square badges, SkillIcons grids, Devicons stacks.

---

## Top Engines Reference

### 1. 3D Isometric Commit Skyline (\`isometric-calendar\`)
- **Source**: \`https://github-profile-3d-contrib.vercel.app/api\`
- **Parameters**: \`username\`, \`theme\` (default: \`dark\`).
- **Output**: 3D extruded voxel representation of yearly contribution counts.

### 2. GitHub Readme Stats (\`github-stats\`)
- **Source**: \`https://github-readme-stats.vercel.app/api\`
- **Parameters**: \`username\`, \`show_icons=true\`, \`theme=tokyonight\`, \`rank_icon=github\`.
- **Output**: Total stars, commits, PRs, issues, and contribution grade (A+ to F).

### 3. WakaTime Programming Metrics (\`wakatime-stats\`)
- **Source**: \`https://github-readme-stats.vercel.app/api/wakatime\`
- **Parameters**: \`username\`, \`layout=compact\`, \`theme=radical\`.
- **Output**: Verified language percentages over the last 30 days.

---

## Camo CDN Caching Considerations

GitHub Camo caches external images based on the \`Cache-Control\` header sent by the telemetry server. If a telemetry engine sets:
\`\`\`http
Cache-Control: public, max-age=14400
\`\`\`
GitHub Camo will re-fetch the image every 4 hours. All MonoForge telemetry engines configure optimal cache headers balancing freshness with API rate limit conservation.
`,
  },
  {
    slug: 'reference/camo-rules',
    title: 'GitHub Camo Sanitize Rules & Best Practices',
    description: 'Technical rules for authoring SVGs that survive GitHub Camo sanitization with 60fps GPU acceleration.',
    category: 'Product Reference',
    categoryOrder: 4,
    order: 4,
    headings: [
      { id: 'why-camo-exists', title: 'Why GitHub Camo Exists', level: 2 },
      { id: 'stripped-elements', title: 'Forbidden & Stripped SVG Elements', level: 2 },
      { id: 'safe-animation-techniques', title: 'Safe 60fps Animation Techniques', level: 2 },
      { id: 'system-font-fallbacks', title: 'System Font Fallback Invariant', level: 2 },
    ],
    content: `
## Why GitHub Camo Exists

GitHub displays README files written by millions of untrusted third parties. To protect users from IP tracking, cross-site scripting (XSS), and SSL downgrade attacks, GitHub proxies all README media through its Camo CDN:

\`\`\`
https://camo.githubusercontent.com/<hash>/<hex-encoded-origin-url>
\`\`\`

Camo parses the incoming SVG XML tree and strips any element or attribute that could potentially execute malicious code.

---

## Forbidden & Stripped SVG Elements

The following items are completely removed by the Camo sanitizer:

- **\`<script>\` tags**: Any embedded JavaScript will result in the entire image being dropped or sanitized.
- **\`<foreignObject>\`**: Cannot be used to embed HTML within SVGs.
- **External stylesheets**: \`<link rel="stylesheet">\` or \`@import\` statements.
- **Inline event handlers**: \`onclick\`, \`onload\`, \`onmouseover\`.

---

## Safe 60fps Animation Techniques

To animate SVGs through Camo safely, use only **embedded CSS \`@keyframes\`** targeting GPU-accelerated CSS properties:

1. **\`transform\`**: \`translate3d()\`, \`rotate()\`, \`scale()\`.
2. **\`opacity\`**: 0.0 to 1.0 fades.
3. **\`stroke-dasharray\` & \`stroke-dashoffset\`**: For neon border beam and laser tracing animations.

Always declare:
\`\`\`css
transform-box: fill-box;
transform-origin: center;
\`\`\`
to ensure animations scale consistently across all device pixel densities.

---

## System Font Fallback Invariant

Because Camo blocks external Google Fonts or web fonts, all text elements in MonoForge SVGs must specify system monospace font stacks:

\`\`\`css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
\`\`\`
`,
  },
  {
    slug: 'reference/config-schema',
    title: 'Profile Configuration Schema (JSON)',
    description: 'Complete JSON Schema and TypeScript types defining the MonoForge ReadmeConfig structure.',
    category: 'Product Reference',
    categoryOrder: 4,
    order: 5,
    headings: [
      { id: 'schema-overview', title: 'Schema Overview', level: 2 },
      { id: 'typescript-definition', title: 'TypeScript Definition', level: 2 },
      { id: 'example-json-export', title: 'Example Profile JSON Export', level: 2 },
    ],
    content: `
## Schema Overview

All profiles created or edited in MonoForge conform to the **ReadmeConfig** schema. This schema ensures that profiles can be exported as clean JSON files, shared with team members, committed to repositories, and imported with full backwards compatibility.

---

## TypeScript Definition

\`\`\`typescript
export interface UserProfile {
  name: string;
  github: string;
  role: string;
  bio: string;
  location?: string;
  pronouns?: string;
  status?: string;
}

export interface SectionBlock {
  id: string;
  pluginId: string;
  visible: boolean;
  config: Record<string, any>;
}

export interface ReadmeSettings {
  badgeStyle: 'for-the-badge' | 'flat' | 'flat-square';
  alignment: 'left' | 'center' | 'right';
  theme: string;
  camoOptimized: boolean;
}

export interface ReadmeConfig {
  version: '2.0.0';
  settings: {
    user: UserProfile;
    badgeStyle: 'for-the-badge' | 'flat' | 'flat-square';
    alignment: 'left' | 'center' | 'right';
  };
  sections: SectionBlock[];
}
\`\`\`

---

## Example Profile JSON Export

\`\`\`json
{
  "version": "2.0.0",
  "settings": {
    "user": {
      "name": "Alex Rivers",
      "github": "octocat",
      "role": "Full-Stack Systems Engineer",
      "bio": "Building resilient open-source developer tooling."
    },
    "badgeStyle": "for-the-badge",
    "alignment": "center"
  },
  "sections": [
    {
      "id": "sec-header-1",
      "pluginId": "cyber-bot-header",
      "visible": true,
      "config": {
        "status": "ONLINE // ACTIVE",
        "quote": "Building systems that scale."
      }
    },
    {
      "id": "sec-telemetry-1",
      "pluginId": "github-readme-stats",
      "visible": true,
      "config": {
        "theme": "tokyonight",
        "showIcons": true
      }
    }
  ]
}
\`\`\`
`,
  },
  {
    slug: 'reference/cli',
    title: 'MonoForge CLI & MCP Server Reference',
    description: 'Documentation for real CLI commands provided by bin/monoforge.js including archetype listing, generation, and MCP server mode.',
    category: 'Product Reference',
    categoryOrder: 4,
    order: 6,
    badge: 'CLI',
    headings: [
      { id: 'cli-overview', title: 'CLI Overview', level: 2 },
      { id: 'command-list', title: 'Command: monoforge list', level: 2 },
      { id: 'command-generate', title: 'Command: monoforge generate', level: 2 },
      { id: 'command-skill-install', title: 'Command: monoforge skill-install', level: 2 },
      { id: 'command-mcp', title: 'Command: monoforge mcp (JSON-RPC)', level: 2 },
    ],
    content: `
## CLI Overview

MonoForge includes a standalone executable CLI tool at \`bin/monoforge.js\`. It requires zero external dependencies and runs anywhere with **Node.js 18+**.

You can run it locally with:
\`\`\`bash
node ./bin/monoforge.js help
\`\`\`

Or via pnpm:
\`\`\`bash
pnpm exec monoforge help
\`\`\`

---

## Command: \`monoforge list\`

Lists all available visual archetypes with their category, accent color, and ID:

\`\`\`bash
node ./bin/monoforge.js list
\`\`\`

### Example Output:
\`\`\`text
📦 MonoForge Visual Archetypes Catalog:

ID                            CATEGORY      ACCENT    NAME
--------------------------------------------------------------------------------
wow-3d-city-cat               Popular       #10b981   #1 Wow Profile (3D City & Peeking Cat)
bento-signal-dashboard        Popular       #38bdf8   #5 Signal Dashboard (Bento Grid)
cyberpunk-hacker-terminal     Developer     #00ff66   #12 Cyberpunk Terminal
\`\`\`

---

## Command: \`monoforge generate\`

Compiles a complete, Camo-compliant GitHub Profile README file directly to disk:

\`\`\`bash
node ./bin/monoforge.js generate --username octocat --archetype wow-3d-city-cat --output README.md
\`\`\`

### Flags & Options:
| Flag | Short | Description | Default |
| :--- | :--- | :--- | :--- |
| \`--username\` | \`-u\` | GitHub username for telemetry cards | \`octocat\` |
| \`--archetype\`| \`-a\` | Archetype ID from \`monoforge list\` | \`wow-3d-city-cat\` |
| \`--name\`     | \`-n\` | Custom display name | Optional |
| \`--role\`     | \`-r\` | Custom headline / role | Optional |
| \`--output\`   | \`-o\` | Output filepath (pass \`-\` for stdout) | \`README.md\` |

---

## Command: \`monoforge skill-install\`

Installs the MonoForge AI Agent skill files into any target repository or workspace:

\`\`\`bash
node ./bin/monoforge.js skill-install --target .
\`\`\`

---

## Command: \`monoforge mcp\` (Model Context Protocol)

Starts the stdio JSON-RPC MCP server for direct integration with AI coding assistants (such as Antigravity, Claude Code, or Cursor):

\`\`\`bash
node ./bin/monoforge.js mcp
\`\`\`

Exposes MCP tools:
- \`list_archetypes\`: Returns full archetype schemas and descriptions.
- \`generate_profile_readme\`: Generates deterministic GFM markdown profiles on demand.
`,
  },

  // -------------------------------------------------------------
  // 5. CONTRIBUTING & TROUBLESHOOTING
  // -------------------------------------------------------------
  {
    slug: 'contributing/overview',
    title: 'Contributing to MonoForge',
    description: 'Guidelines, code standards, Biome linting, Vitest test suites, and pull request workflows.',
    category: 'Contributing & Help',
    categoryOrder: 5,
    order: 1,
    headings: [
      { id: 'getting-started-contributing', title: 'Getting Started as a Contributor', level: 2 },
      { id: 'development-workflow', title: 'Development Workflow', level: 2 },
      { id: 'coding-standards', title: 'Coding Standards & Conventions', level: 2 },
      { id: 'pre-pr-checklist', title: 'Pre-PR Checklist', level: 2 },
    ],
    content: `
## Getting Started as a Contributor

We welcome contributions to MonoForge! Whether adding new telemetry plugins, authoring animated vector characters, fixing bugs, or improving documentation, here is how to get started:

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   \`\`\`bash
   git clone https://github.com/<your-username>/MONOFORGE.git
   cd MONOFORGE
   \`\`\`
3. **Create a topic branch**:
   \`\`\`bash
   git checkout -b feat/my-new-feature
   \`\`\`

---

## Development Workflow

MonoForge uses **Biome** for fast formatting and linting:

\`\`\`bash
# Run Biome lint checks
pnpm lint

# Automatically format code
pnpm format

# Run Vitest test suite
pnpm test
\`\`\`

---

## Coding Standards & Conventions

- **Framework**: Next.js 16 (App Router) with TypeScript in strict mode.
- **Styling**: Tailwind CSS utility classes.
- **State Management**: Zustand store at \`src/store/useReadmeStore.ts\`. Do not create secondary state stores.
- **Markdown Compiler**: Keep \`src/lib/buildMarkdown.ts\` pure and side-effect free.
- **Commit Messages**: Use Conventional Commits (\`feat:\`, \`fix:\`, \`docs:\`, \`chore:\`, \`refactor:\`).

---

## Pre-PR Checklist

Before opening a pull request, ensure all verification steps pass:

1. \`pnpm type-check\` passes with 0 errors.
2. \`pnpm test\` passes all Vitest test suites.
3. \`pnpm build\` completes successfully.
4. Any new plugin or markdown feature includes colocated unit tests.
`,
  },
  {
    slug: 'contributing/creating-plugins',
    title: 'Tutorial: Creating a New Plugin',
    description: 'Step-by-step guide to authoring, testing, and registering a new telemetry or visual plugin.',
    category: 'Contributing & Help',
    categoryOrder: 5,
    order: 2,
    headings: [
      { id: 'step-1-create-wrapper', title: 'Step 1: Create the Plugin Wrapper', level: 2 },
      { id: 'step-2-write-unit-test', title: 'Step 2: Colocate Vitest Unit Test', level: 2 },
      { id: 'step-3-register-plugin', title: 'Step 3: Register in Registry', level: 2 },
      { id: 'step-4-verify-in-studio', title: 'Step 4: Verify in Studio', level: 2 },
    ],
    content: `
## Step 1: Create the Plugin Wrapper

Create a new file inside \`src/lib/plugins/wrappers/my-awesome-telemetry.ts\`:

\`\`\`typescript
import { Plugin } from '#/lib/plugins/types';

export interface MyAwesomeTelemetryConfig {
  theme: string;
  showRanking: boolean;
}

export const myAwesomeTelemetryPlugin: Plugin = {
  id: 'my-awesome-telemetry',
  name: 'My Awesome Telemetry',
  description: 'Displays custom developer metrics formatted for GitHub Camo CDN.',
  category: 'stats',
  badge: '60FPS CAMO',
  defaultConfig: {
    theme: 'dark',
    showRanking: true,
  },
  render: (config: MyAwesomeTelemetryConfig, user) => {
    const username = user?.github || 'octocat';
    const theme = config.theme || 'dark';
    return \`<div align="center">
  <img src="https://api.example.com/stats?username=\${username}&theme=\${theme}" alt="Awesome Stats" />
</div>\`;
  },
};
\`\`\`

---

## Step 2: Colocate Vitest Unit Test

Create \`src/lib/plugins/wrappers/my-awesome-telemetry.test.ts\`:

\`\`\`typescript
import { describe, it, expect } from 'vitest';
import { myAwesomeTelemetryPlugin } from './my-awesome-telemetry';

describe('myAwesomeTelemetryPlugin', () => {
  it('renders valid markdown output', () => {
    const output = myAwesomeTelemetryPlugin.render(
      { theme: 'tokyonight', showRanking: true },
      { github: 'monoforge-dev', name: 'Dev', role: '', bio: '' }
    );
    expect(output).toContain('https://api.example.com/stats?username=monoforge-dev&theme=tokyonight');
    expect(output).toContain('alt="Awesome Stats"');
  });
});
\`\`\`

---

## Step 3: Register in Registry

Open \`src/lib/plugins/registry.ts\` and append your plugin to \`pluginRegistry\`:

\`\`\`typescript
import { myAwesomeTelemetryPlugin } from './wrappers/my-awesome-telemetry';

export const pluginRegistry: Plugin[] = [
  // ... existing plugins
  myAwesomeTelemetryPlugin,
];
\`\`\`

---

## Step 4: Verify in Studio

Launch \`pnpm dev\` and navigate to \`/telemetry\`. Your new plugin will immediately appear in the telemetry catalog, ready for 1-click export!
`,
  },
  {
    slug: 'troubleshooting/faq',
    title: 'Troubleshooting & Frequently Asked Questions',
    description: 'Solutions for common issues: port collisions, Next.js cache, Git line endings, and GitHub OAuth redirects.',
    category: 'Contributing & Help',
    categoryOrder: 5,
    order: 3,
    headings: [
      { id: 'port-3000-in-use', title: 'Port 3000 Already in Use', level: 2 },
      { id: 'nextjs-cache-clear', title: 'Clearing Next.js Turbopack Cache', level: 2 },
      { id: 'crlf-git-warnings', title: 'Git CRLF Line Ending Warnings', level: 2 },
      { id: 'github-oauth-redirect-mismatch', title: 'GitHub OAuth Redirect URI Mismatch', level: 2 },
      { id: 'faq', title: 'Frequently Asked Questions', level: 2 },
    ],
    content: `
## Port 3000 Already in Use

If port 3000 is occupied by another process when starting \`pnpm dev\`:

### Option A: Specify a custom port
\`\`\`bash
pnpm dev -p 3001
\`\`\`

### Option B: Free port 3000 on Windows
\`\`\`powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
\`\`\`

### Option C: Free port 3000 on macOS/Linux
\`\`\`bash
lsof -ti:3000 | xargs kill -9
\`\`\`

---

## Clearing Next.js Turbopack Cache

If encountering stale page bundles or persistent build anomalies, delete the local build cache:

\`\`\`bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# macOS / Linux
rm -rf .next
\`\`\`

Then re-run \`pnpm dev\` or \`pnpm build\`.

---

## Git CRLF Line Ending Warnings

If Git warns \`LF will be replaced by CRLF the next time Git touches it\`:

\`\`\`bash
git config core.autocrlf false
\`\`\`

---

## GitHub OAuth Redirect URI Mismatch

When setting up GitHub OAuth, ensure your callback URL in GitHub developer settings matches your local server port:

- **Local Development**: \`http://localhost:3000/api/auth/callback/github\`
- **Production**: \`https://monoforge-studio.vercel.app/api/auth/callback/github\`

---

## Frequently Asked Questions

### Is MonoForge completely free?
Yes. MonoForge is 100% free and open-source under the MIT license.

### Do I need to create an account?
No. MonoForge requires zero user accounts. All state lives client-side in your browser's \`localStorage\`.

### Why do some animated SVGs not work on GitHub?
GitHub Camo strips all \`<script>\` and \`<foreignObject>\` tags. MonoForge SVGs use pure CSS \`@keyframes\` and are verified to survive Camo sanitization.
`,
  },
];

// Helper functions for documentation querying and navigation
export function getAllDocs(): DocItem[] {
  return DOCS_DATA;
}

export function getDocBySlug(slugArray: string[]): DocItem | undefined {
  const fullSlug = slugArray.join('/');
  return DOCS_DATA.find((doc) => doc.slug === fullSlug);
}

export function getDocsNavigation(): DocCategory[] {
  const categoriesMap = new Map<string, { order: number; items: DocItem[] }>();

  for (const doc of DOCS_DATA) {
    if (!categoriesMap.has(doc.category)) {
      categoriesMap.set(doc.category, {
        order: doc.categoryOrder,
        items: [],
      });
    }
    categoriesMap.get(doc.category)!.items.push(doc);
  }

  const sortedCategories: DocCategory[] = [];
  for (const [name, data] of categoriesMap.entries()) {
    data.items.sort((a, b) => a.order - b.order);
    sortedCategories.push({
      name,
      order: data.order,
      items: data.items.map((item) => ({
        slug: item.slug,
        title: item.title,
        badge: item.badge,
      })),
    });
  }

  sortedCategories.sort((a, b) => a.order - b.order);
  return sortedCategories;
}

export function searchDocs(query: string): DocItem[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  return DOCS_DATA.filter((doc) => {
    const titleMatch = doc.title.toLowerCase().includes(q);
    const descMatch = doc.description.toLowerCase().includes(q);
    const categoryMatch = doc.category.toLowerCase().includes(q);
    const headingMatch = doc.headings.some((h) => h.title.toLowerCase().includes(q));
    const contentMatch = doc.content.toLowerCase().includes(q);
    return titleMatch || descMatch || categoryMatch || headingMatch || contentMatch;
  });
}

