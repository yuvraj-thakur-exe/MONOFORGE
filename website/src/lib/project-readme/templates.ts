import { ProjectReadmeConfig, ProjectTemplateType } from './types';

export const PROJECT_TEMPLATES: Record<ProjectTemplateType, ProjectReadmeConfig> = {
  'developer-tool': {
    version: '1.0.0',
    name: 'MonoForge',
    tagline: 'The Developer Identity & README Engineering Studio',
    description:
      'Turn ordinary software repositories and GitHub profiles into high-impact engineering showcases. Built with Next.js 16, Monaco Editor, and 47+ real-time telemetry engines.',
    template: 'developer-tool',
    ecosystem: 'node',
    repositoryUrl: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
    liveDemoUrl: 'https://monoforge-studio.vercel.app/en',
    license: 'MIT',
    logoUrl: 'https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/branding/monoforge-logo.svg',
    showBadges: true,
    badges: [
      { id: 'b1', label: 'License', text: 'MIT', color: 'blue', style: 'for-the-badge', enabled: true },
      { id: 'b2', label: 'Next.js', text: '16.0', color: 'black', style: 'for-the-badge', enabled: true },
      { id: 'b3', label: 'TypeScript', text: '5.6', color: '3178C6', style: 'for-the-badge', enabled: true },
      { id: 'b4', label: 'CI/CD', text: 'Passing', color: '2ea44f', style: 'for-the-badge', enabled: true },
      { id: 'b5', label: 'PRs', text: 'Welcome', color: 'brightgreen', style: 'for-the-badge', enabled: true },
    ],
    features: [
      {
        id: 'f1',
        title: 'Project README Studio',
        description: 'Auto-detect repository architecture, dependencies, and scripts to compile production-grade READMEs in seconds.',
      },
      {
        id: 'f2',
        title: '75+ Profile Archetypes',
        description: 'From high-density Bento dashboards to isometric 3D commit cities and retro terminal themes.',
      },
      {
        id: 'f3',
        title: 'Monaco Code IDE',
        description: 'Split-screen editing with real-time schema validation, AST parsing, and live markdown compilation.',
      },
      {
        id: 'f4',
        title: '47+ Telemetry Engines',
        description: 'Modular engines covering contribution velocity, language donuts, streak radars, and LeetCode stats.',
      },
      {
        id: 'f5',
        title: 'GitHub Camo Safe Animations',
        description: '60fps animated SVG banners rendered natively via CSS keyframes with zero client-side JavaScript.',
      },
    ],
    techStack: [
      { id: 't1', name: 'Next.js 16 (App Router)', category: 'Frontend', color: '000000' },
      { id: 't2', name: 'React 19 & TypeScript', category: 'Frontend', color: '3178c6' },
      { id: 't3', name: 'Monaco Code Editor', category: 'Core', color: '1e1e1e' },
      { id: 't4', name: 'Tailwind CSS & Biome', category: 'DevOps', color: '38bdf8' },
      { id: 't5', name: 'Zustand 5 State Engine', category: 'Core', color: '4338ca' },
    ],
    installSteps: [
      { id: 's1', step: 'Clone Repository', command: 'git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git' },
      { id: 's2', step: 'Install Dependencies', command: 'pnpm install' },
      { id: 's3', step: 'Start Local Development', command: 'pnpm dev' },
    ],
    quickStartCommand: 'npx monoforge generate --username octocat',
    showArchitecture: true,
    architectureMermaid: `flowchart TD
  User([Developer / Creator]) --> UI[MonoForge Studio Interface]
  UI --> ProjectMode[Project README Studio]
  UI --> ProfileMode[GitHub Profile Studio]
  ProjectMode --> Parser[Repo Stack Analyzer]
  ProfileMode --> Archetype[75+ Curated Archetypes]
  Parser & Archetype --> Monaco[Monaco IDE & Compiler]
  Monaco --> Telemetry[47+ Telemetry Engines]
  Monaco --> CamoSVG[60fps Animated SVGs]
  Telemetry & CamoSVG --> Output[Production GFM & Direct Git Sync]`,
    showRoadmap: true,
    roadmap: [
      { id: 'r1', task: 'Visual Profile Builder & Wizard', done: true },
      { id: 'r2', task: 'Monaco IDE live sync & validation', done: true },
      { id: 'r3', task: 'Dedicated Project README Studio', done: true },
      { id: 'r4', task: 'AI Agent MCP Server Integration', done: true },
      { id: 'r5', task: 'Automated CI/CD GitHub Action', done: false },
    ],
    showEnvVariables: true,
    envVariables: [
      { id: 'e1', key: 'NEXT_PUBLIC_APP_URL', description: 'Application base URL', required: true, defaultValue: 'http://localhost:3000' },
      { id: 'e2', key: 'GITHUB_ACCESS_TOKEN', description: 'Personal access token for GitHub sync and API telemetry', required: false },
    ],
    showContributing: true,
    showLicense: true,
    customSections: [],
  },

  saas: {
    version: '1.0.0',
    name: 'CloudPulse',
    tagline: 'Autonomous Infrastructure Intelligence & Telemetry Platform',
    description:
      'Enterprise-grade observability suite that monitors distributed microservices, analyzes anomaly vectors in real-time, and generates automated incident post-mortems.',
    template: 'saas',
    ecosystem: 'docker',
    repositoryUrl: 'https://github.com/acme/cloudpulse',
    liveDemoUrl: 'https://cloudpulse.example.com',
    license: 'Apache-2.0',
    showBadges: true,
    badges: [
      { id: 'b1', label: 'License', text: 'Apache 2.0', color: 'blue', style: 'for-the-badge', enabled: true },
      { id: 'b2', label: 'Docker', text: 'Containerized', color: '2496ED', style: 'for-the-badge', enabled: true },
      { id: 'b3', label: 'Status', text: 'Active', color: 'green', style: 'for-the-badge', enabled: true },
    ],
    features: [
      { id: 'f1', title: 'Sub-second Ingestion', description: 'Processes 250,000 metric events per second with zero drop rates.' },
      { id: 'f2', title: 'AI Anomaly Detection', description: 'Automated Bayesian baseline modeling across multi-region VPCs.' },
      { id: 'f3', title: 'Interactive Topology', description: 'Live graph rendering of container mesh traffic and latency bottlenecks.' },
    ],
    techStack: [
      { id: 't1', name: 'Go (Golang)', category: 'Backend', color: '00ADD8' },
      { id: 't2', name: 'ClickHouse', category: 'Database', color: 'FFCC01' },
      { id: 't3', name: 'React & Vite', category: 'Frontend', color: '61DAFB' },
      { id: 't4', name: 'Docker & Kubernetes', category: 'DevOps', color: '2496ED' },
    ],
    installSteps: [
      { id: 's1', step: 'Pull Container Image', command: 'docker pull cloudpulse/server:latest' },
      { id: 's2', step: 'Run with Docker Compose', command: 'docker compose up -d' },
    ],
    quickStartCommand: 'curl -fsSL https://cloudpulse.io/install.sh | bash',
    showArchitecture: true,
    architectureMermaid: `graph LR
  Agent[Telemetry Agent] --> Collector[Ingestion Gateway]
  Collector --> Kafka[Event Bus]
  Kafka --> Processor[Stream Processor]
  Processor --> DB[(ClickHouse TSDB)]
  DB --> Dashboard[Web Observability UI]`,
    showRoadmap: true,
    roadmap: [
      { id: 'r1', task: 'Core metric collector daemon', done: true },
      { id: 'r2', task: 'Real-time WebSocket alerting', done: true },
      { id: 'r3', task: 'OpenTelemetry native exporter', done: false },
    ],
    showEnvVariables: true,
    envVariables: [
      { id: 'e1', key: 'PORT', description: 'Server listening port', required: false, defaultValue: '8080' },
      { id: 'e2', key: 'DATABASE_URL', description: 'ClickHouse connection URI', required: true },
    ],
    showContributing: true,
    showLicense: true,
    customSections: [],
  },

  'oss-library': {
    version: '2.4.0',
    name: 'SuperStruct-TS',
    tagline: 'Blazing Fast Type-Safe Validation & Data Transformation Engine',
    description:
      'Zero-dependency runtime validation library with sub-millisecond execution times, automated TypeScript type inference, and JSON schema compilation.',
    template: 'oss-library',
    ecosystem: 'node',
    repositoryUrl: 'https://github.com/developer/superstruct-ts',
    license: 'MIT',
    showBadges: true,
    badges: [
      { id: 'b1', label: 'NPM', text: 'v2.4.0', color: 'CB3837', style: 'for-the-badge', enabled: true },
      { id: 'b2', label: 'Size', text: '< 1.8 kB gzip', color: 'informational', style: 'for-the-badge', enabled: true },
      { id: 'b3', label: 'Coverage', text: '100%', color: 'brightgreen', style: 'for-the-badge', enabled: true },
    ],
    features: [
      { id: 'f1', title: 'Zero Dependencies', description: 'Zero third-party bloat. Pure vanilla modern TypeScript.' },
      { id: 'f2', title: 'Full Type Inference', description: 'Extract static TypeScript interfaces directly from validation schemas.' },
      { id: 'f3', title: '5x Faster Execution', description: 'Compiled JIT validator outperforms Zod and Yup in microbenchmarks.' },
    ],
    techStack: [
      { id: 't1', name: 'TypeScript', category: 'Core', color: '3178C6' },
      { id: 't2', name: 'Vitest', category: 'Testing', color: '6E9F18' },
      { id: 't3', name: 'tsup', category: 'DevOps', color: '000000' },
    ],
    installSteps: [
      { id: 's1', step: 'Package Installation', command: 'npm install superstruct-ts' },
    ],
    quickStartCommand: 'pnpm add superstruct-ts',
    showArchitecture: false,
    architectureMermaid: '',
    showRoadmap: false,
    roadmap: [],
    showEnvVariables: false,
    envVariables: [],
    showContributing: true,
    showLicense: true,
    customSections: [],
  },

  'cli-tool': {
    version: '1.2.0',
    name: 'ForgeCLI',
    tagline: 'Next-Generation Terminal Tool for Automated Project Orchestration',
    description:
      'A cross-platform binary CLI for scaffolding production microservices, synchronizing multi-cloud secrets, and managing CI pipelines with interactive terminal prompts.',
    template: 'cli-tool',
    ecosystem: 'rust',
    repositoryUrl: 'https://github.com/developer/forge-cli',
    license: 'MIT',
    showBadges: true,
    badges: [
      { id: 'b1', label: 'Crates.io', text: 'v1.2.0', color: 'orange', style: 'for-the-badge', enabled: true },
      { id: 'b2', label: 'Platform', text: 'macOS | Linux | Windows', color: '555555', style: 'for-the-badge', enabled: true },
    ],
    features: [
      { id: 'f1', title: 'Instant Scaffolding', description: 'Initialize full-stack monorepos in under 300 milliseconds.' },
      { id: 'f2', title: 'Interactive TUI', description: 'Beautiful terminal prompts powered by ratatui and crossterm.' },
      { id: 'f3', title: 'Zero-Config Encrypted Vault', description: 'Secure credential storage backed by hardware keychains.' },
    ],
    techStack: [
      { id: 't1', name: 'Rust', category: 'Core', color: 'DEA584' },
      { id: 't2', name: 'Clap v4', category: 'Core', color: 'DEA584' },
      { id: 't3', name: 'Tokio Async', category: 'Core', color: 'DEA584' },
    ],
    installSteps: [
      { id: 's1', step: 'Cargo Install', command: 'cargo install forge-cli' },
      { id: 's2', step: 'Homebrew (macOS / Linux)', command: 'brew install developer/tap/forge' },
    ],
    quickStartCommand: 'forge init my-app --template fullstack',
    showArchitecture: false,
    architectureMermaid: '',
    showRoadmap: true,
    roadmap: [
      { id: 'r1', task: 'Cross-platform CLI engine', done: true },
      { id: 'r2', task: 'SSH / GPG key signing integration', done: false },
    ],
    showEnvVariables: false,
    envVariables: [],
    showContributing: true,
    showLicense: true,
    customSections: [],
  },

  'ai-ml': {
    version: '0.8.0',
    name: 'AetherAgent',
    tagline: 'Autonomous Multi-Agent Orchestration & Reasoning Framework',
    description:
      'An enterprise framework for coordinating fleets of LLM coding agents, managing shared memory vectors, and validating autonomous pull requests with strict deterministic constraints.',
    template: 'ai-ml',
    ecosystem: 'python',
    repositoryUrl: 'https://github.com/developer/aether-agent',
    license: 'Apache-2.0',
    showBadges: true,
    badges: [
      { id: 'b1', label: 'Python', text: '3.11+', color: '3776AB', style: 'for-the-badge', enabled: true },
      { id: 'b2', label: 'PyTorch', text: '2.5', color: 'EE4C2C', style: 'for-the-badge', enabled: true },
      { id: 'b3', label: 'License', text: 'Apache 2.0', color: 'blue', style: 'for-the-badge', enabled: true },
    ],
    features: [
      { id: 'f1', title: 'Multi-Agent Consensus', description: 'Enforce dual-agent verification and peer code review loops before commit.' },
      { id: 'f2', title: 'Context Memory Graphs', description: 'Vector embeddings with semantic clustering for long-term project knowledge.' },
      { id: 'f3', title: 'Deterministic Sandboxing', description: 'Executes agent commands inside isolated microVM containers.' },
    ],
    techStack: [
      { id: 't1', name: 'Python 3.11', category: 'Core', color: '3776AB' },
      { id: 't2', name: 'LangGraph & LiteLLM', category: 'AI/ML', color: '00A67E' },
      { id: 't3', name: 'ChromaDB / Qdrant', category: 'Database', color: 'FF6F61' },
      { id: 't4', name: 'FastAPI', category: 'Backend', color: '009688' },
    ],
    installSteps: [
      { id: 's1', step: 'Create Virtual Environment', command: 'python -m venv .venv && source .venv/bin/activate' },
      { id: 's2', step: 'Install Dependencies', command: 'pip install aether-agent' },
    ],
    quickStartCommand: 'python -m aether.run --agent reviewer --repo .',
    showArchitecture: true,
    architectureMermaid: `graph TD
  Plan[Planning Agent] --> Critic[Critic Agent]
  Critic --> Exec[Coding Sandbox]
  Exec --> Verifier[Test & AST Verifier]
  Verifier --> Final[Pull Request Delivery]`,
    showRoadmap: true,
    roadmap: [
      { id: 'r1', task: 'Agent workflow engine', done: true },
      { id: 'r2', task: 'MCP server implementation', done: true },
      { id: 'r3', task: 'Self-healing compiler integration', done: false },
    ],
    showEnvVariables: true,
    envVariables: [
      { id: 'e1', key: 'OPENAI_API_KEY', description: 'API key for foundational reasoning models', required: true },
      { id: 'e2', key: 'AGENT_CONCURRENCY', description: 'Maximum simultaneous subagents', required: false, defaultValue: '4' },
    ],
    showContributing: true,
    showLicense: true,
    customSections: [],
  },

  'fullstack-web': {
    version: '1.0.0',
    name: 'NexusStack',
    tagline: 'Modern Full-Stack Production Starter with Edge Architecture',
    description:
      'Complete end-to-end web architecture featuring Next.js App Router, PostgreSQL with Drizzle ORM, Lucide icons, Stripe subscriptions, and shadcn/ui components.',
    template: 'fullstack-web',
    ecosystem: 'node',
    repositoryUrl: 'https://github.com/developer/nexus-stack',
    license: 'MIT',
    showBadges: true,
    badges: [
      { id: 'b1', label: 'Stack', text: 'Full-Stack', color: '7c3aed', style: 'for-the-badge', enabled: true },
      { id: 'b2', label: 'Database', text: 'PostgreSQL', color: '4169E1', style: 'for-the-badge', enabled: true },
    ],
    features: [
      { id: 'f1', title: 'Authentication & RBAC', description: 'Complete session handling, OAuth, and role-based permissions.' },
      { id: 'f2', title: 'Edge Caching & SSR', description: 'Dynamic data rendering with sub-50ms TTFB worldwide.' },
      { id: 'f3', title: 'Stripe Billing Ready', description: 'Turnkey subscription tiers, webhook processing, and customer portal.' },
    ],
    techStack: [
      { id: 't1', name: 'Next.js 16', category: 'Frontend', color: '000000' },
      { id: 't2', name: 'PostgreSQL & Drizzle', category: 'Database', color: '4169E1' },
      { id: 't3', name: 'Tailwind CSS', category: 'Frontend', color: '38BDF8' },
      { id: 't4', name: 'Redis Cache', category: 'Backend', color: 'DC382D' },
    ],
    installSteps: [
      { id: 's1', step: 'Clone Repo', command: 'git clone https://github.com/developer/nexus-stack.git' },
      { id: 's2', step: 'Install & Setup Env', command: 'pnpm install && cp .env.example .env.local' },
      { id: 's3', step: 'Run Database Migrations', command: 'pnpm db:push' },
      { id: 's4', step: 'Start Dev Server', command: 'pnpm dev' },
    ],
    quickStartCommand: 'pnpm dev',
    showArchitecture: false,
    architectureMermaid: '',
    showRoadmap: true,
    roadmap: [
      { id: 'r1', task: 'Base template and auth flows', done: true },
      { id: 'r2', task: 'Multi-tenant team workspaces', done: false },
    ],
    showEnvVariables: true,
    envVariables: [
      { id: 'e1', key: 'DATABASE_URL', description: 'Postgres connection string', required: true },
      { id: 'e2', key: 'NEXTAUTH_SECRET', description: 'Session encryption key', required: true },
    ],
    showContributing: true,
    showLicense: true,
    customSections: [],
  },
};

