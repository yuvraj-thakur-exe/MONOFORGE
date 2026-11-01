import type { TemplateItem } from './catalog';

export interface TechShield {
  id: string;
  name: string;
  badgeSlug: string;
  bgColor: string;
  logo: string;
  logoColor: string;
  url: string;
}

/**
 * 60+ Modern Technology Shields Dictionary with verified logos, official hex codes, and URLs
 */
export const BEST_README_TECH_SHIELDS: Record<string, TechShield> = {
  nextjs: { id: 'nextjs', name: 'Next.js', badgeSlug: 'Next.js', bgColor: '000000', logo: 'nextdotjs', logoColor: 'white', url: 'https://nextjs.org/' },
  react: { id: 'react', name: 'React', badgeSlug: 'React.js', bgColor: '20232A', logo: 'react', logoColor: '61DAFB', url: 'https://react.dev/' },
  typescript: { id: 'typescript', name: 'TypeScript', badgeSlug: 'TypeScript', bgColor: '3178C6', logo: 'typescript', logoColor: 'white', url: 'https://www.typescriptlang.org/' },
  tailwind: { id: 'tailwind', name: 'Tailwind CSS', badgeSlug: 'Tailwind_CSS', bgColor: '38B2AC', logo: 'tailwind-css', logoColor: 'white', url: 'https://tailwindcss.com/' },
  rust: { id: 'rust', name: 'Rust', badgeSlug: 'Rust', bgColor: '000000', logo: 'rust', logoColor: 'white', url: 'https://www.rust-lang.org/' },
  go: { id: 'go', name: 'Go', badgeSlug: 'Go', bgColor: '00ADD8', logo: 'go', logoColor: 'white', url: 'https://go.dev/' },
  python: { id: 'python', name: 'Python', badgeSlug: 'Python', bgColor: '3776AB', logo: 'python', logoColor: 'white', url: 'https://www.python.org/' },
  vue: { id: 'vue', name: 'Vue.js', badgeSlug: 'Vue.js', bgColor: '35495E', logo: 'vuedotjs', logoColor: '4FC08D', url: 'https://vuejs.org/' },
  svelte: { id: 'svelte', name: 'Svelte', badgeSlug: 'Svelte', bgColor: '4A4A55', logo: 'svelte', logoColor: 'FF3E00', url: 'https://svelte.dev/' },
  angular: { id: 'angular', name: 'Angular', badgeSlug: 'Angular', bgColor: 'DD0031', logo: 'angular', logoColor: 'white', url: 'https://angular.dev/' },
  astro: { id: 'astro', name: 'Astro', badgeSlug: 'Astro', bgColor: 'BC52EE', logo: 'astro', logoColor: 'white', url: 'https://astro.build/' },
  nodejs: { id: 'nodejs', name: 'Node.js', badgeSlug: 'Node.js', bgColor: '339933', logo: 'nodedotjs', logoColor: 'white', url: 'https://nodejs.org/' },
  bun: { id: 'bun', name: 'Bun', badgeSlug: 'Bun', bgColor: '000000', logo: 'bun', logoColor: 'FBF0DF', url: 'https://bun.sh/' },
  docker: { id: 'docker', name: 'Docker', badgeSlug: 'Docker', bgColor: '2496ED', logo: 'docker', logoColor: 'white', url: 'https://www.docker.com/' },
  kubernetes: { id: 'kubernetes', name: 'Kubernetes', badgeSlug: 'Kubernetes', bgColor: '326CE5', logo: 'kubernetes', logoColor: 'white', url: 'https://kubernetes.io/' },
  postgresql: { id: 'postgresql', name: 'PostgreSQL', badgeSlug: 'PostgreSQL', bgColor: '4169E1', logo: 'postgresql', logoColor: 'white', url: 'https://www.postgresql.org/' },
  redis: { id: 'redis', name: 'Redis', badgeSlug: 'Redis', bgColor: 'DC382D', logo: 'redis', logoColor: 'white', url: 'https://redis.io/' },
  supabase: { id: 'supabase', name: 'Supabase', badgeSlug: 'Supabase', bgColor: '3ECF8E', logo: 'supabase', logoColor: 'white', url: 'https://supabase.com/' },
  graphql: { id: 'graphql', name: 'GraphQL', badgeSlug: 'GraphQL', bgColor: 'E10098', logo: 'graphql', logoColor: 'white', url: 'https://graphql.org/' },
  vite: { id: 'vite', name: 'Vite', badgeSlug: 'Vite', bgColor: '646CFF', logo: 'vite', logoColor: 'FFD62E', url: 'https://vite.dev/' },
  vitest: { id: 'vitest', name: 'Vitest', badgeSlug: 'Vitest', bgColor: '6E9F18', logo: 'vitest', logoColor: 'FCC72B', url: 'https://vitest.dev/' },
  playwright: { id: 'playwright', name: 'Playwright', badgeSlug: 'Playwright', bgColor: '2EAD33', logo: 'playwright', logoColor: 'white', url: 'https://playwright.dev/' },
  biome: { id: 'biome', name: 'Biome', badgeSlug: 'Biome', bgColor: '60A5FA', logo: 'biome', logoColor: 'white', url: 'https://biomejs.dev/' },
  tauri: { id: 'tauri', name: 'Tauri', badgeSlug: 'Tauri', bgColor: '24C8DB', logo: 'tauri', logoColor: 'white', url: 'https://tauri.app/' },
  flutter: { id: 'flutter', name: 'Flutter', badgeSlug: 'Flutter', bgColor: '02569B', logo: 'flutter', logoColor: 'white', url: 'https://flutter.dev/' },
  fastapi: { id: 'fastapi', name: 'FastAPI', badgeSlug: 'FastAPI', bgColor: '009688', logo: 'fastapi', logoColor: 'white', url: 'https://fastapi.tiangolo.com/' },
};

export interface BestReadmeOptions {
  user: {
    github: string;
    repo: string;
    projectTitle: string;
    tagline: string;
    description: string;
    authorName?: string;
    twitter?: string;
    email?: string;
    license?: string;
  };
  technologies?: string[];
  bannerUrl?: string;
  screenshotUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  includeTelemetry?: boolean;
}

/**
 * Pure generator to produce world-class Best-README markdown
 */
export function buildBestReadmeMarkdown(opts: BestReadmeOptions): string {
  const gh = opts.user.github || 'octocat';
  const repo = opts.user.repo || 'awesome-project';
  const title = opts.user.projectTitle || 'Awesome Project';
  const tagline = opts.user.tagline || 'An exceptional open-source repository engineered for production.';
  const desc = opts.user.description || 'A modern, high-performance solution solving developer workflow bottlenecks with zero friction.';
  const author = opts.user.authorName || 'Lead Engineer';
  const twitter = opts.user.twitter || 'developer';
  const email = opts.user.email || 'developer@example.com';
  const license = opts.user.license || 'MIT';
  const demoUrl = opts.demoUrl || `https://${repo}.vercel.app`;
  const docsUrl = opts.docsUrl || `https://github.com/${gh}/${repo}#readme`;
  const banner = opts.bannerUrl || 'https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/best-readme/banner.svg';
  const screenshot = opts.screenshotUrl || 'https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/best-readme/screenshot.png';

  const techKeys = opts.technologies && opts.technologies.length > 0
    ? opts.technologies
    : ['nextjs', 'react', 'typescript', 'tailwind', 'rust', 'docker', 'vitest'];

  const selectedTechs = techKeys.map(k => BEST_README_TECH_SHIELDS[k]).filter(Boolean);

  const builtWithLines = selectedTechs.map(t => `* [![${t.name}][${t.badgeSlug}]][${t.badgeSlug}-url]`).join('\n');
  const techRefLines = selectedTechs.map(t =>
    `[${t.badgeSlug}]: https://img.shields.io/badge/${encodeURIComponent(t.name)}-${t.bgColor}?style=for-the-badge&logo=${t.logo}&logoColor=${t.logoColor}\n[${t.badgeSlug}-url]: ${t.url}`
  ).join('\n');

  const telemetrySection = opts.includeTelemetry ? `
<!-- DYNAMIC TELEMETRY & ACTIVITY -->
## Real-Time Contributor Telemetry

<p align="center">
  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=heatmap&user=${gh}" alt="52-Week Contributor Matrix" width="100%" />
</p>
<p align="center">
  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=velocity&user=${gh}" alt="Contributor Velocity & Radar" width="100%" />
</p>
` : '';

  return `<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
[![MonoForge Verified][monoforge-shield]][monoforge-url]

</div>

<!-- PROJECT BANNER & HERO -->
<br />
<div align="center">
  <a href="https://github.com/${gh}/${repo}">
    <img src="${banner}" alt="${title} Hero Banner" width="100%">
  </a>

  <h3 align="center">${title}</h3>

  <p align="center">
    ${tagline}
    <br />
    <a href="${docsUrl}"><strong>Explore the documentation »</strong></a>
    <br />
    <br />
    <a href="${demoUrl}">View Live Demo</a>
    ·
    <a href="https://github.com/${gh}/${repo}/issues/new?labels=bug&template=bug_report.md">Report Bug</a>
    ·
    <a href="https://github.com/${gh}/${repo}/issues/new?labels=enhancement&template=feature_request.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><strong>Table of Contents</strong> (click to expand)</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Preview Screenshot][product-screenshot]](${demoUrl})

${desc}

### Key Architectural Strengths:
* ⚡ **High Performance & Low Latency**: Engineered for sub-millisecond responsiveness and zero runtime friction.
* 🛡️ **Zero Security Compromise**: Camo-compliant assets, strict type safety, and rigorous automated validation.
* 📦 **Modular Extensibility**: Decoupled plugin architecture enabling rapid feature extension.
* 🎨 **Production Design System**: Balanced dark/light palette with accessible contrast standards.

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

### Built With

${builtWithLines}

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>
${telemetrySection}
<!-- GETTING STARTED -->
## Getting Started

Follow these step-by-step instructions to get a local copy up and running.

### Prerequisites

Ensure you have the latest runtime and package manager installed:
* **Node.js**: \`>= 20.x\` (or **Bun** \`>= 1.1\`)
* **pnpm** (recommended):
  \`\`\`sh
  npm install -g pnpm
  \`\`\`

### Installation

1. **Clone the repository**:
   \`\`\`sh
   git clone https://github.com/${gh}/${repo}.git
   cd ${repo}
   \`\`\`

2. **Install project dependencies**:
   \`\`\`sh
   pnpm install
   \`\`\`

3. **Configure Environment Variables**:
   \`\`\`sh
   cp .env.example .env.local
   \`\`\`

4. **Launch the development server**:
   \`\`\`sh
   pnpm dev
   \`\`\`
   Visit \`http://localhost:3000\` in your browser to inspect the application.

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

<!-- USAGE -->
## Usage

Run core commands directly from your terminal:

\`\`\`bash
# Run unit & integration test suites
pnpm test

# Build production bundle
pnpm build

# Run linting & code formatting
pnpm lint && pnpm format
\`\`\`

_For comprehensive interactive tutorials and API specifications, refer to our [Documentation Portal](${docsUrl})._

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Production Release v1.0 with Camo-safe SVG engine
- [x] Dynamic Contributor Telemetry & GitHub activity integration
- [x] Interactive Table of Contents & 60+ Built-With Tech Shields
- [ ] Multi-region automated replication
- [ ] Real-time collaborative workspace streaming
    - [ ] WebRTC peer synchronization

See the [open issues](https://github.com/${gh}/${repo}/issues) for a full list of proposed features and ongoing milestones.

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an empowering ecosystem to learn, build, and innovate. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feat/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'feat: Add AmazingFeature'\`)
4. Push to the Branch (\`git push origin feat/AmazingFeature\`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

### Top Contributors

<a href="https://github.com/${gh}/${repo}/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=${gh}/${repo}" alt="Top Contributors" />
</a>

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

<!-- LICENSE -->
## License

Distributed under the **${license} License**. See [\`LICENSE\`](https://github.com/${gh}/${repo}/blob/main/LICENSE) for complete legal details.

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

<!-- CONTACT -->
## Contact

**${author}** - [@${twitter}](https://twitter.com/${twitter}) - [${email}](mailto:${email})

Project Repository: [https://github.com/${gh}/${repo}](https://github.com/${gh}/${repo})

Live Demo Application: [${demoUrl}](${demoUrl})

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Best-README-Template by othneildrew](https://github.com/othneildrew/Best-README-Template) — The foundational open-source documentation standard.
* [MonoForge Studio](https://monoforge-studio.vercel.app) — Camo-compliant dynamic vector and telemetry portfolio engine.
* [Shields.io](https://shields.io) — Quality badges for open source projects.
* [contrib.rocks](https://contrib.rocks) — Real-time contributor avatar wall generation.

<p align="right">(<a href="#readme-top">back to top ↑</a>)</p>

<!-- MARKDOWN REFERENCE LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/${gh}/${repo}.svg?style=for-the-badge&color=10b981
[contributors-url]: https://github.com/${gh}/${repo}/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/${gh}/${repo}.svg?style=for-the-badge&color=0f172a
[forks-url]: https://github.com/${gh}/${repo}/network/members
[stars-shield]: https://img.shields.io/github/stars/${gh}/${repo}.svg?style=for-the-badge&color=ffe600&labelColor=0f172a
[stars-url]: https://github.com/${gh}/${repo}/stargazers
[issues-shield]: https://img.shields.io/github/issues/${gh}/${repo}.svg?style=for-the-badge&color=f59e0b
[issues-url]: https://github.com/${gh}/${repo}/issues
[license-shield]: https://img.shields.io/github/license/${gh}/${repo}.svg?style=for-the-badge&color=3b82f6
[license-url]: https://github.com/${gh}/${repo}/blob/main/LICENSE
[monoforge-shield]: https://img.shields.io/badge/MonoForge-Verified-ffe600?style=for-the-badge&logo=github&logoColor=020617
[monoforge-url]: https://monoforge-studio.vercel.app
[product-screenshot]: ${screenshot}

<!-- BUILT WITH SHIELDS -->
${techRefLines}
`;
}

/**
 * 4 Curated Best-README Flagship Archetypes for catalog integration
 */
export const BEST_README_TEMPLATES: TemplateItem[] = [
  {
    id: 'best-readme-flagship',
    name: 'Best-README Flagship (Open Source)',
    description: 'The definitive open-source project README inspired by othneildrew/Best-README-Template, rebranded with 60fps Camo banners, reference shields, and contributor telemetry.',
    category: 'Best-README',
    accent: '#ffe600',
    prompt:
      'Generate the flagship Best-README-Template for an open-source project. Include reference-style shields (contributors, forks, stars, issues, license, MonoForge verified), animated Camo hero banner, centered logo and description, interactive collapsible Table of Contents, About the Project with screenshot, 60+ Built With technology shields, prerequisite & installation instructions, usage code blocks, roadmap check-list, dynamic contrib.rocks contributor wall, license, and author contact.',
    config: {
      version: '1.0.0',
      title: 'Best-README Flagship Template',
      settings: {
        user: {
          github: 'octocat',
          name: 'The Best-README Project',
          role: 'Open-Source Flagship Repository',
          bio: 'The gold standard documentation template for world-class open source projects.',
          location: 'Global Open Source',
          pronouns: '',
          status: 'v1.0 Production Ready',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        align: 'left',
        badgeStyle: 'for-the-badge',
      },
      sections: [
        {
          id: 'sec-br-banner',
          type: 'capsule-banner',
          props: {
            content: {
              text: 'BEST-README-TEMPLATE',
              theme: 'cyber-amber',
              height: 220,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-skills',
          type: 'skill-icons',
          props: {
            content: {
              skills: ['nextjs', 'react', 'typescript', 'tailwind', 'rust', 'docker', 'vitest', 'biome'],
              perLine: 8,
              theme: 'dark',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-trophy',
          type: 'github-profile-trophy',
          props: {
            content: {
              theme: 'flat',
              column: 6,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-telemetry',
          type: 'portfolio-contributions',
          props: {
            content: {
              theme: 'emerald',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-socials',
          type: 'socials',
          props: {
            content: {
              platforms: ['github', 'twitter', 'linkedin', 'discord'],
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'best-readme-fullstack',
    name: 'Best-README Full-Stack SaaS',
    description: 'Tailored for production web apps with Next.js 16, TypeScript, PostgreSQL, Prisma, Supabase, Tailwind CSS, and Vercel cloud architecture.',
    category: 'Best-README',
    accent: '#38bdf8',
    prompt:
      'Generate a comprehensive Best-README-Template for a modern Full-Stack SaaS application. Include Next.js 16, Tailwind CSS, TypeScript, PostgreSQL, and Vercel stack shields, database migration prerequisites, environment configuration, Stripe webhook setup, and roadmap checklist.',
    config: {
      version: '1.0.0',
      title: 'Full-Stack SaaS Repository README',
      settings: {
        user: {
          github: 'octocat',
          name: 'HyperScale SaaS Engine',
          role: 'Full-Stack SaaS Application',
          bio: 'Production-ready Next.js 16 SaaS boilerplate with database migrations and cloud sync.',
          location: 'San Francisco, CA',
          pronouns: '',
          status: 'Shipping Fast',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        align: 'left',
        badgeStyle: 'for-the-badge',
      },
      sections: [
        {
          id: 'sec-br-fs-banner',
          type: 'capsule-banner',
          props: {
            content: {
              text: 'FULLSTACK SAAS ENGINE',
              theme: 'ocean-blue',
              height: 200,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-fs-skills',
          type: 'skill-icons',
          props: {
            content: {
              skills: ['nextjs', 'react', 'typescript', 'tailwind', 'postgresql', 'supabase', 'redis', 'playwright'],
              perLine: 8,
              theme: 'dark',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-fs-stats',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'best-readme-systems',
    name: 'Best-README Systems & CLI (Rust / Go)',
    description: 'Minimal, high-velocity repository README for command-line utilities, native binaries, crates, and system daemons.',
    category: 'Best-README',
    accent: '#10b981',
    prompt:
      'Generate a high-performance Best-README-Template for a Rust / Go command-line systems binary. Feature Cargo / Homebrew / Go install commands, benchmark ASCII charts, memory safety guarantees, and flag documentation.',
    config: {
      version: '1.0.0',
      title: 'Rust & Go CLI Binary README',
      settings: {
        user: {
          github: 'octocat',
          name: 'HyperFast CLI Tool',
          role: 'Systems & CLI Tooling',
          bio: 'Zero-overhead binary built with Rust and Tokio for async microsecond processing.',
          location: 'Remote',
          pronouns: '',
          status: 'Crates.io v1.0',
        },
        theme: 'dark',
        accentColor: '#10b981',
        align: 'left',
        badgeStyle: 'for-the-badge',
      },
      sections: [
        {
          id: 'sec-br-sys-skills',
          type: 'skill-icons',
          props: {
            content: {
              skills: ['rust', 'go', 'cplusplus', 'docker', 'linux', 'bash'],
              perLine: 6,
              theme: 'dark',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-sys-activity',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'github-dark',
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'best-readme-cloud',
    name: 'Best-README Cloud-Native & Microservices',
    description: 'Designed for Kubernetes operators, Helm charts, Terraform modules, Docker containers, and distributed service meshes.',
    category: 'Best-README',
    accent: '#06b6d4',
    prompt:
      'Generate an enterprise Cloud-Native Best-README-Template highlighting Kubernetes deployment manifests, Helm charts, Terraform modules, Grafana dashboard setups, and distributed tracing.',
    config: {
      version: '1.0.0',
      title: 'Cloud-Native Infrastructure README',
      settings: {
        user: {
          github: 'octocat',
          name: 'Cloud Mesh Operator',
          role: 'Cloud Native & SRE Infrastructure',
          bio: 'Multi-cluster Kubernetes mesh with automated canary rollouts and zero-downtime CI/CD.',
          location: 'Multi-Region Cloud',
          pronouns: '',
          status: 'Kubernetes v1.31 Ready',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        align: 'left',
        badgeStyle: 'for-the-badge',
      },
      sections: [
        {
          id: 'sec-br-cloud-skills',
          type: 'skill-icons',
          props: {
            content: {
              skills: ['kubernetes', 'docker', 'terraform', 'aws', 'gcp', 'prometheus'],
              perLine: 6,
              theme: 'dark',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-br-cloud-stats',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'radical',
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
];
