import {
  EcosystemType,
  EnvVariable,
  InstallStep,
  ProjectAnalysisSource,
  ProjectBadge,
  ProjectReadmeConfig,
  ProjectTemplateType,
  TechStackItem,
} from './types';
import { PROJECT_TEMPLATES } from './templates';

export interface ParsedGitHubRepo {
  owner: string;
  repo: string;
  canonicalUrl: string;
}

export interface GitHubRepoMetadata {
  name?: string;
  full_name?: string;
  description?: string | null;
  homepage?: string | null;
  language?: string | null;
  stargazers_count?: number;
  topics?: string[];
  default_branch?: string;
  html_url?: string;
  license?: {
    spdx_id?: string | null;
    name?: string | null;
  } | null;
}

export interface RepoManifests {
  packageJson?: string | null;
  pyprojectToml?: string | null;
  cargoToml?: string | null;
  goMod?: string | null;
  dockerfile?: string | null;
  envExample?: string | null;
}

export interface RepositoryAnalysisResult {
  detectedName: string;
  detectedDescription: string;
  detectedEcosystem: EcosystemType;
  suggestedTemplate: ProjectTemplateType;
  techStack: TechStackItem[];
  suggestedBadges: ProjectBadge[];
  suggestedQuickStart: string;
  installSteps?: InstallStep[];
  envVariables?: EnvVariable[];
  license?: string;
  homepage?: string;
  topics?: string[];
  source?: ProjectAnalysisSource;
  statusMessage?: string;
}

const VALID_GITHUB_SEGMENT = /^[a-zA-Z0-9_.-]+$/;

/**
 * Strictly parses a GitHub repository URL (`https://github.com/owner/repo`)
 * or shorthand (`owner/repo`). Rejects non-GitHub hosts, arbitrary schemes,
 * embedded credentials, ports, and path traversal to prevent SSRF.
 */
export function parseGitHubRepoUrl(rawUrl: string): ParsedGitHubRepo | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed || /[\s\\]/.test(trimmed)) return null;

  // Reject raw or URL-encoded dot-segments (`.` / `..`) before `new URL()` normalizes them away
  let decodedRaw = trimmed;
  try {
    decodedRaw = decodeURIComponent(trimmed);
  } catch {
    return null;
  }
  if (
    trimmed.includes('..') ||
    decodedRaw.includes('..') ||
    /(?:^|\/)\.(?:\/|$|\?|#)/.test(trimmed) ||
    /(?:^|\/)\.(?:\/|$|\?|#)/.test(decodedRaw)
  ) {
    return null;
  }

  let owner = '';
  let repo = '';

  const hasScheme = trimmed.includes('://') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed);
  if (hasScheme) {
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      return null;
    }

    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    const hostname = parsed.hostname.toLowerCase();
    if (hostname !== 'github.com' && hostname !== 'www.github.com') {
      return null;
    }
    if (parsed.port || parsed.username || parsed.password) {
      return null;
    }

    const segments = parsed.pathname.split('/').filter(Boolean);
    if (segments.length < 2) {
      return null;
    }
    owner = segments[0];
    repo = segments[1].replace(/\.git$/i, '');
  } else {
    if (trimmed.startsWith('/') || trimmed.includes(':') || trimmed.includes('?') || trimmed.includes('#') || trimmed.includes('@')) {
      return null;
    }
    const segments = trimmed.split('/').filter(Boolean);
    if (segments.length !== 2) {
      return null;
    }
    owner = segments[0];
    repo = segments[1].replace(/\.git$/i, '');
  }

  if (
    !owner ||
    !repo ||
    owner === '.' ||
    owner === '..' ||
    repo === '.' ||
    repo === '..' ||
    owner.includes('..') ||
    repo.includes('..') ||
    !VALID_GITHUB_SEGMENT.test(owner) ||
    !VALID_GITHUB_SEGMENT.test(repo)
  ) {
    return null;
  }

  return {
    owner,
    repo,
    canonicalUrl: `https://github.com/${owner}/${repo}`,
  };
}

/**
 * Parses `.env.example` contents into structured EnvVariable items.
 */
export function parseEnvExample(content: string): EnvVariable[] {
  if (!content || typeof content !== 'string') return [];

  const lines = content.split(/\r?\n/);
  const envVars: EnvVariable[] = [];
  let pendingComment = '';
  let index = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      pendingComment = '';
      continue;
    }

    if (line.startsWith('#')) {
      const cleaned = line.replace(/^#+\s*/, '').trim();
      if (cleaned) {
        pendingComment = pendingComment ? `${pendingComment} ${cleaned}` : cleaned;
      }
      continue;
    }

    const match = line.match(/^(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)$/i);
    if (!match) {
      pendingComment = '';
      continue;
    }

    const key = match[1];
    let rawValue = match[2].trim();
    // Strip inline comment if unquoted
    if (
      !(rawValue.startsWith('"') && rawValue.endsWith('"')) &&
      !(rawValue.startsWith("'") && rawValue.endsWith("'"))
    ) {
      rawValue = rawValue.replace(/\s+#.*$/, '').trim();
    } else {
      rawValue = rawValue.slice(1, -1);
    }

    const isPlaceholder =
      !rawValue ||
      /^(?:your[_-]|<[^>]+>|changeme|replace[_-]?me|example|xxx+|todo)/i.test(rawValue);

    index += 1;
    envVars.push({
      id: `env_${index}`,
      key,
      description: pendingComment || `Configuration value for ${key}`,
      required: isPlaceholder,
      defaultValue: isPlaceholder ? undefined : rawValue,
    });

    pendingComment = '';
  }

  return envVars;
}



const NODE_TECH_CATALOG: Record<string, Omit<TechStackItem, 'id'>> = {
  next: { name: 'Next.js', category: 'Frontend', color: '000000' },
  react: { name: 'React', category: 'Frontend', color: '61DAFB' },
  vue: { name: 'Vue.js', category: 'Frontend', color: '4FC08D' },
  svelte: { name: 'Svelte', category: 'Frontend', color: 'FF3E00' },
  astro: { name: 'Astro', category: 'Frontend', color: 'BC52EE' },
  typescript: { name: 'TypeScript', category: 'Core', color: '3178C6' },
  tailwindcss: { name: 'Tailwind CSS', category: 'Frontend', color: '38BDF8' },
  zustand: { name: 'Zustand', category: 'Core', color: '4338CA' },
  zod: { name: 'Zod', category: 'Core', color: '3E67B1' },
  express: { name: 'Express', category: 'Backend', color: '000000' },
  fastify: { name: 'Fastify', category: 'Backend', color: '000000' },
  hono: { name: 'Hono', category: 'Backend', color: 'E36002' },
  '@nestjs/core': { name: 'NestJS', category: 'Backend', color: 'E0234E' },
  prisma: { name: 'Prisma', category: 'Database', color: '2D3748' },
  '@prisma/client': { name: 'Prisma', category: 'Database', color: '2D3748' },
  'drizzle-orm': { name: 'Drizzle ORM', category: 'Database', color: 'C5F74F' },
  mongoose: { name: 'MongoDB / Mongoose', category: 'Database', color: '47A248' },
  pg: { name: 'PostgreSQL', category: 'Database', color: '4169E1' },
  redis: { name: 'Redis', category: 'Database', color: 'DC382D' },
  ioredis: { name: 'Redis', category: 'Database', color: 'DC382D' },
  vitest: { name: 'Vitest', category: 'Testing', color: '6E9F18' },
  jest: { name: 'Jest', category: 'Testing', color: 'C21325' },
  '@playwright/test': { name: 'Playwright', category: 'Testing', color: '2EAD33' },
  openai: { name: 'OpenAI SDK', category: 'AI/ML', color: '412991' },
  '@anthropic-ai/sdk': { name: 'Anthropic SDK', category: 'AI/ML', color: 'D97757' },
  ai: { name: 'Vercel AI SDK', category: 'AI/ML', color: '000000' },
  langchain: { name: 'LangChain', category: 'AI/ML', color: '1C3C3C' },
  '@biomejs/biome': { name: 'Biome', category: 'DevOps', color: '60A5FA' },
  eslint: { name: 'ESLint', category: 'DevOps', color: '4B32C3' },
};

const PYTHON_TECH_CATALOG: Record<string, Omit<TechStackItem, 'id'>> = {
  fastapi: { name: 'FastAPI', category: 'Backend', color: '009688' },
  django: { name: 'Django', category: 'Backend', color: '092E20' },
  flask: { name: 'Flask', category: 'Backend', color: '000000' },
  torch: { name: 'PyTorch', category: 'AI/ML', color: 'EE4C2C' },
  pytorch: { name: 'PyTorch', category: 'AI/ML', color: 'EE4C2C' },
  transformers: { name: 'HuggingFace Transformers', category: 'AI/ML', color: 'FFD21E' },
  langchain: { name: 'LangChain', category: 'AI/ML', color: '1C3C3C' },
  langgraph: { name: 'LangGraph', category: 'AI/ML', color: '00A67E' },
  openai: { name: 'OpenAI SDK', category: 'AI/ML', color: '412991' },
  pydantic: { name: 'Pydantic', category: 'Core', color: 'E92063' },
  sqlalchemy: { name: 'SQLAlchemy', category: 'Database', color: 'D71F00' },
  pytest: { name: 'Pytest', category: 'Testing', color: '0A9EDC' },
  numpy: { name: 'NumPy', category: 'AI/ML', color: '013243' },
  pandas: { name: 'Pandas', category: 'AI/ML', color: '150458' },
};

const RUST_TECH_CATALOG: Record<string, Omit<TechStackItem, 'id'>> = {
  clap: { name: 'Clap', category: 'Core', color: 'DEA584' },
  tokio: { name: 'Tokio', category: 'Core', color: 'DEA584' },
  serde: { name: 'Serde', category: 'Core', color: 'DEA584' },
  axum: { name: 'Axum', category: 'Backend', color: 'DEA584' },
  'actix-web': { name: 'Actix Web', category: 'Backend', color: 'DEA584' },
  ratatui: { name: 'Ratatui', category: 'Frontend', color: 'DEA584' },
  sqlx: { name: 'SQLx', category: 'Database', color: 'DEA584' },
  reqwest: { name: 'Reqwest', category: 'Backend', color: 'DEA584' },
};

const GO_TECH_CATALOG: Record<string, Omit<TechStackItem, 'id'>> = {
  'github.com/gin-gonic/gin': { name: 'Gin', category: 'Backend', color: '00ADD8' },
  'github.com/gofiber/fiber': { name: 'Fiber', category: 'Backend', color: '00ADD8' },
  'github.com/labstack/echo': { name: 'Echo', category: 'Backend', color: '00ADD8' },
  'github.com/spf13/cobra': { name: 'Cobra CLI', category: 'Core', color: '00ADD8' },
  'gorm.io/gorm': { name: 'GORM', category: 'Database', color: '00ADD8' },
};

function addUniqueTech(list: TechStackItem[], item: Omit<TechStackItem, 'id'>) {
  const normalized = item.name.toLowerCase();
  if (list.some((existing) => existing.name.toLowerCase() === normalized)) return;
  list.push({
    ...item,
    id: `t_${list.length + 1}`,
  });
}

/**
 * Computes rich structured project analysis from real GitHub repository metadata
 * and root manifest files.
 */
export function detectFromManifests(input: {
  owner: string;
  repo: string;
  repoMeta: GitHubRepoMetadata;
  manifests: RepoManifests;
}): RepositoryAnalysisResult {
  const { owner, repo, repoMeta, manifests } = input;
  const repoUrl = repoMeta.html_url || `https://github.com/${owner}/${repo}`;
  const defaultBranch = repoMeta.default_branch || 'main';
  const topics = Array.isArray(repoMeta.topics) ? repoMeta.topics : [];
  const language = repoMeta.language || '';
  const license =
    repoMeta.license?.spdx_id && repoMeta.license.spdx_id !== 'NOASSERTION'
      ? repoMeta.license.spdx_id
      : repoMeta.license?.name || 'MIT';

  const techStack: TechStackItem[] = [];
  const installSteps: InstallStep[] = [
    {
      id: 's_1',
      step: 'Clone Repository',
      command: `git clone ${repoUrl}.git`,
    },
  ];
  let quickStart = `git clone ${repoUrl}.git && cd ${repo}`;
  let detectedEcosystem: EcosystemType = 'general';

  // Parse package.json
  let parsedPkg: {
    name?: string;
    description?: string;
    packageManager?: string;
    bin?: unknown;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  } | null = null;

  if (manifests.packageJson) {
    try {
      parsedPkg = JSON.parse(manifests.packageJson);
      detectedEcosystem = 'node';
      const allDeps = {
        ...(parsedPkg?.dependencies || {}),
        ...(parsedPkg?.devDependencies || {}),
      };
      for (const depName of Object.keys(allDeps)) {
        const match = NODE_TECH_CATALOG[depName];
        if (match) addUniqueTech(techStack, match);
      }

      const pmRaw = parsedPkg?.packageManager || '';
      const pm = pmRaw.startsWith('pnpm')
        ? 'pnpm'
        : pmRaw.startsWith('yarn')
          ? 'yarn'
          : pmRaw.startsWith('bun')
            ? 'bun'
            : 'npm';

      installSteps.splice(0, installSteps.length, {
        id: 's_1',
        step: 'Clone & Enter Repository',
        command: `git clone ${repoUrl}.git && cd ${repo}`,
      });
      installSteps.push({
        id: `s_${installSteps.length + 1}`,
        step: 'Install Dependencies',
        command: `${pm} install`,
      });

      const scripts = parsedPkg?.scripts || {};
      if (scripts.dev) {
        installSteps.push({
          id: `s_${installSteps.length + 1}`,
          step: 'Start Development Server',
          command: `${pm} run dev`,
        });
        quickStart = `git clone ${repoUrl}.git && cd ${repo} && ${pm} install && ${pm} run dev`;
      } else if (scripts.start) {
        installSteps.push({
          id: `s_${installSteps.length + 1}`,
          step: 'Run Application',
          command: `${pm} start`,
        });
        quickStart = `git clone ${repoUrl}.git && cd ${repo} && ${pm} install && ${pm} start`;
      } else if (parsedPkg?.bin) {
        quickStart = `npx ${parsedPkg.name || repo}`;
      } else {
        quickStart = `${pm} install ${parsedPkg?.name || repo}`;
      }
    } catch {
      // Malformed package.json — skip JSON parse
    }
  }

  // Parse pyproject.toml
  if (manifests.pyprojectToml) {
    if (detectedEcosystem === 'general') detectedEcosystem = 'python';
    addUniqueTech(techStack, { name: 'Python', category: 'Core', color: '3776AB' });
    const lowerPy = manifests.pyprojectToml.toLowerCase();
    for (const [pkg, tech] of Object.entries(PYTHON_TECH_CATALOG)) {
      if (new RegExp(`["'\\s\\[]${pkg}(?:[\\s"'=<>~!\\[]|$)`, 'i').test(lowerPy)) {
        addUniqueTech(techStack, tech);
      }
    }
    if (detectedEcosystem === 'python') {
      const nameMatch = manifests.pyprojectToml.match(/^\s*name\s*=\s*["']([^"']+)["']/m);
      const pkgName = nameMatch?.[1] || repo;
      installSteps.push({
        id: `s_${installSteps.length + 1}`,
        step: 'Create Virtual Environment & Install',
        command: `cd ${repo} && python -m venv .venv && pip install -e .`,
      });
      quickStart = `pip install ${pkgName}`;
    }
  }

  // Parse Cargo.toml
  if (manifests.cargoToml) {
    if (detectedEcosystem === 'general') detectedEcosystem = 'rust';
    addUniqueTech(techStack, { name: 'Rust', category: 'Core', color: 'DEA584' });
    const lowerCargo = manifests.cargoToml.toLowerCase();
    for (const [crate, tech] of Object.entries(RUST_TECH_CATALOG)) {
      if (new RegExp(`^\\s*${crate}\\s*=`, 'm').test(lowerCargo)) {
        addUniqueTech(techStack, tech);
      }
    }
    if (detectedEcosystem === 'rust') {
      const nameMatch = manifests.cargoToml.match(/^\s*name\s*=\s*["']([^"']+)["']/m);
      const crateName = nameMatch?.[1] || repo;
      installSteps.push({
        id: `s_${installSteps.length + 1}`,
        step: 'Build Release Binary',
        command: `cd ${repo} && cargo build --release`,
      });
      quickStart = `cargo install ${crateName}`;
    }
  }

  // Parse go.mod
  if (manifests.goMod) {
    if (detectedEcosystem === 'general') detectedEcosystem = 'go';
    addUniqueTech(techStack, { name: 'Go', category: 'Core', color: '00ADD8' });
    for (const [mod, tech] of Object.entries(GO_TECH_CATALOG)) {
      if (manifests.goMod.includes(mod)) {
        addUniqueTech(techStack, tech);
      }
    }
    if (detectedEcosystem === 'go') {
      installSteps.push({
        id: `s_${installSteps.length + 1}`,
        step: 'Download Modules & Build',
        command: `cd ${repo} && go mod download && go build ./...`,
      });
      quickStart = `go run ./...`;
    }
  }

  // Parse Dockerfile
  if (manifests.dockerfile) {
    if (detectedEcosystem === 'general') detectedEcosystem = 'docker';
    addUniqueTech(techStack, { name: 'Docker', category: 'DevOps', color: '2496ED' });
    if (detectedEcosystem === 'docker') {
      installSteps.push({
        id: `s_${installSteps.length + 1}`,
        step: 'Build & Run Container',
        command: `cd ${repo} && docker build -t ${repo.toLowerCase()} . && docker run --rm ${repo.toLowerCase()}`,
      });
      quickStart = `docker build -t ${repo.toLowerCase()} .`;
    }
  }

  // Fallback ecosystem from GitHub primary language
  if (detectedEcosystem === 'general' && language) {
    const lowerLang = language.toLowerCase();
    if (lowerLang === 'typescript' || lowerLang === 'javascript') detectedEcosystem = 'node';
    else if (lowerLang === 'python') detectedEcosystem = 'python';
    else if (lowerLang === 'rust') detectedEcosystem = 'rust';
    else if (lowerLang === 'go') detectedEcosystem = 'go';
    else if (lowerLang === 'dockerfile') detectedEcosystem = 'docker';
  }

  if (language) {
    addUniqueTech(techStack, { name: language, category: 'Core', color: '475569' });
  }

  // Parse .env.example
  const envVariables = manifests.envExample ? parseEnvExample(manifests.envExample) : [];

  // Choose template based on detected signals
  const hasAiTech = techStack.some((t) => t.category === 'AI/ML') || topics.some((t) => /ai|llm|agent|ml/i.test(t));
  const hasFrontend = techStack.some((t) => t.category === 'Frontend');
  const hasDatabase = techStack.some((t) => t.category === 'Database');
  const isCli =
    Boolean(parsedPkg?.bin) ||
    detectedEcosystem === 'rust' ||
    topics.some((t) => /cli|terminal|command-line/i.test(t));

  let suggestedTemplate: ProjectTemplateType = 'developer-tool';
  if (hasAiTech) {
    suggestedTemplate = 'ai-ml';
  } else if (isCli) {
    suggestedTemplate = 'cli-tool';
  } else if (hasFrontend && hasDatabase) {
    suggestedTemplate = 'fullstack-web';
  } else if (manifests.dockerfile && !hasFrontend) {
    suggestedTemplate = 'saas';
  } else if (detectedEcosystem === 'node' && !hasFrontend && parsedPkg && !parsedPkg.scripts?.dev) {
    suggestedTemplate = 'oss-library';
  }

  // Dynamic badges
  const suggestedBadges: ProjectBadge[] = [
    {
      id: 'b_license',
      label: 'License',
      text: license,
      color: 'blue',
      style: 'for-the-badge',
      link: `${repoUrl}/blob/${defaultBranch}/LICENSE`,
      enabled: true,
    },
  ];

  if (typeof repoMeta.stargazers_count === 'number') {
    const starsLabel =
      repoMeta.stargazers_count >= 1000
        ? `${(repoMeta.stargazers_count / 1000).toFixed(1)}k`
        : String(repoMeta.stargazers_count);
    suggestedBadges.push({
      id: 'b_stars',
      label: 'Stars',
      text: starsLabel,
      color: 'f59e0b',
      style: 'for-the-badge',
      link: `${repoUrl}/stargazers`,
      enabled: true,
    });
  }

  if (language) {
    suggestedBadges.push({
      id: 'b_lang',
      label: 'Language',
      text: language,
      color: '3178C6',
      style: 'for-the-badge',
      enabled: true,
    });
  }

  suggestedBadges.push({
    id: 'b_prs',
    label: 'PRs',
    text: 'Welcome',
    color: 'brightgreen',
    style: 'for-the-badge',
    link: `${repoUrl}/pulls`,
    enabled: true,
  });

  const detectedName = repoMeta.name || parsedPkg?.name || repo;
  const detectedDescription =
    repoMeta.description?.trim() ||
    parsedPkg?.description?.trim() ||
    `${detectedName} — Open source ${detectedEcosystem} project hosted on GitHub.`;

  return {
    detectedName,
    detectedDescription,
    detectedEcosystem,
    suggestedTemplate,
    techStack,
    suggestedBadges,
    suggestedQuickStart: quickStart,
    installSteps,
    envVariables,
    license,
    homepage: repoMeta.homepage?.trim() || undefined,
    topics,
    source: 'github',
  };
}

/**
 * Offline/fallback heuristic repository analyzer based on GitHub URL patterns.
 * Always marks itself honestly as heuristic rather than live GitHub data.
 */
export function analyzeRepositoryUrl(rawUrl: string): RepositoryAnalysisResult {
  const parsed = parseGitHubRepoUrl(rawUrl);
  const cleanUrl = parsed?.canonicalUrl || rawUrl.trim().replace(/\/$/, '');
  const urlParts = cleanUrl.split('/').filter(Boolean);
  const repoName = (parsed?.repo || urlParts[urlParts.length - 1] || 'MyProject').replace(/\.git$/i, '');
  const lower = repoName.toLowerCase();

  const isAi = lower.includes('agent') || lower.includes('ai') || lower.includes('llm') || lower.includes('ml');
  const isCli = lower.includes('cli') || lower.includes('tool') || lower.includes('term');
  const isGo = lower.includes('go-') || lower.endsWith('-go') || lower.includes('golang');
  const isDocker = lower.includes('docker') || lower.includes('k8s') || lower.includes('cloud');
  const isWeb = lower.includes('web') || lower.includes('app') || lower.includes('next') || lower.includes('ui');
  const isLib = lower.includes('lib') || lower.includes('sdk') || lower.includes('core');

  let detectedEcosystem: EcosystemType = 'node';
  let suggestedTemplate: ProjectTemplateType = 'developer-tool';
  let techStack: TechStackItem[] = [
    { id: 't1', name: 'TypeScript', category: 'Core', color: '3178C6' },
    { id: 't2', name: 'Node.js', category: 'Backend', color: '339933' },
  ];
  let installSteps: InstallStep[] = [
    { id: 's1', step: 'Clone Repository', command: `git clone ${cleanUrl}.git` },
    { id: 's2', step: 'Install Dependencies', command: `cd ${repoName} && npm install` },
  ];
  let suggestedQuickStart = `git clone ${cleanUrl}.git && cd ${repoName} && npm install`;

  if (isAi) {
    detectedEcosystem = 'python';
    suggestedTemplate = 'ai-ml';
    techStack = [
      { id: 't1', name: 'Python', category: 'Core', color: '3776AB' },
      { id: 't2', name: 'PyTorch', category: 'AI/ML', color: 'EE4C2C' },
    ];
    installSteps = [
      { id: 's1', step: 'Clone Repository', command: `git clone ${cleanUrl}.git` },
      { id: 's2', step: 'Install Dependencies', command: `cd ${repoName} && pip install -e .` },
    ];
    suggestedQuickStart = `pip install ${repoName}`;
  } else if (isCli) {
    detectedEcosystem = 'rust';
    suggestedTemplate = 'cli-tool';
    techStack = [
      { id: 't1', name: 'Rust', category: 'Core', color: 'DEA584' },
      { id: 't2', name: 'Clap', category: 'Core', color: 'DEA584' },
    ];
    installSteps = [
      { id: 's1', step: 'Clone Repository', command: `git clone ${cleanUrl}.git` },
      { id: 's2', step: 'Build Binary', command: `cd ${repoName} && cargo build --release` },
    ];
    suggestedQuickStart = `cargo install ${repoName}`;
  } else if (isGo) {
    detectedEcosystem = 'go';
    suggestedTemplate = 'developer-tool';
    techStack = [{ id: 't1', name: 'Go', category: 'Core', color: '00ADD8' }];
    installSteps = [
      { id: 's1', step: 'Clone Repository', command: `git clone ${cleanUrl}.git` },
      { id: 's2', step: 'Build Module', command: `cd ${repoName} && go build ./...` },
    ];
    suggestedQuickStart = `go run ./...`;
  } else if (isDocker) {
    detectedEcosystem = 'docker';
    suggestedTemplate = 'saas';
    techStack = [{ id: 't1', name: 'Docker', category: 'DevOps', color: '2496ED' }];
    installSteps = [
      { id: 's1', step: 'Clone Repository', command: `git clone ${cleanUrl}.git` },
      { id: 's2', step: 'Start Services', command: `cd ${repoName} && docker compose up -d` },
    ];
    suggestedQuickStart = `docker compose up -d`;
  } else if (isWeb) {
    detectedEcosystem = 'node';
    suggestedTemplate = 'fullstack-web';
    techStack = [
      { id: 't1', name: 'TypeScript', category: 'Core', color: '3178C6' },
      { id: 't2', name: 'React', category: 'Frontend', color: '61DAFB' },
      { id: 't3', name: 'Tailwind CSS', category: 'Frontend', color: '38BDF8' },
    ];
  } else if (isLib) {
    detectedEcosystem = 'node';
    suggestedTemplate = 'oss-library';
  }

  const suggestedBadges: ProjectBadge[] = [
    { id: 'b1', label: 'License', text: 'MIT', color: 'blue', style: 'for-the-badge', enabled: true },
    { id: 'b2', label: 'Ecosystem', text: detectedEcosystem.toUpperCase(), color: 'black', style: 'for-the-badge', enabled: true },
    { id: 'b3', label: 'PRs', text: 'Welcome', color: 'brightgreen', style: 'for-the-badge', enabled: true },
  ];

  return {
    detectedName: repoName,
    detectedDescription: `${repoName} — Software repository configured via URL heuristic analysis.`,
    detectedEcosystem,
    suggestedTemplate,
    techStack,
    suggestedBadges,
    suggestedQuickStart,
    installSteps,
    envVariables: [],
    license: 'MIT',
    source: 'heuristic',
    statusMessage: 'Heuristic estimate derived from repository URL pattern.',
  };
}

/**
 * Creates a pre-populated ProjectReadmeConfig from analysis results.
 */
export function createConfigFromAnalysis(
  url: string,
  analysis: RepositoryAnalysisResult
): ProjectReadmeConfig {
  const baseTemplate = PROJECT_TEMPLATES[analysis.suggestedTemplate] || PROJECT_TEMPLATES['developer-tool'];
  const parsed = parseGitHubRepoUrl(url);
  const repositoryUrl = parsed?.canonicalUrl || url.trim();
  const isMonoForge =
    analysis.detectedName.toLowerCase() === 'monoforge' &&
    repositoryUrl.toLowerCase().includes('yuvraj-thakur-exe/monoforge');

  if (isMonoForge && analysis.source === 'heuristic') {
    return {
      ...PROJECT_TEMPLATES['developer-tool'],
      repositoryUrl,
    };
  }

  const envVariables = analysis.envVariables ?? baseTemplate.envVariables;

  return {
    ...baseTemplate,
    name: analysis.detectedName,
    tagline: `${analysis.detectedName} — ${analysis.detectedEcosystem.toUpperCase()} Project`,
    description: analysis.detectedDescription,
    repositoryUrl,
    liveDemoUrl: analysis.homepage || undefined,
    logoUrl: isMonoForge ? baseTemplate.logoUrl : undefined,
    license: analysis.license || baseTemplate.license,
    ecosystem: analysis.detectedEcosystem,
    template: analysis.suggestedTemplate,
    techStack: analysis.techStack,
    badges: analysis.suggestedBadges,
    quickStartCommand: analysis.suggestedQuickStart,
    installSteps: analysis.installSteps && analysis.installSteps.length > 0 ? analysis.installSteps : baseTemplate.installSteps,
    envVariables,
    showEnvVariables: envVariables.length > 0,
  };
}
