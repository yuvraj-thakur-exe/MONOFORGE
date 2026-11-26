import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { buildProjectMarkdown, sanitizeProjectUrl } from './generator';
import { PROJECT_TEMPLATES } from './templates';
import {
  analyzeRepositoryUrl,
  createConfigFromAnalysis,
  parseEnvExample,
  parseGitHubRepoUrl,
} from './analyzer';
import { POST } from '#/app/api/project-readme/inspect/route';
import { useProjectReadmeStore } from '#/store/useProjectReadmeStore';
import { ProjectReadmeConfig } from './types';

function makeBase64JsonResponse(data: unknown, status = 200): Response {
  const encoded = Buffer.from(JSON.stringify(data), 'utf8').toString('base64');
  return new Response(JSON.stringify({ content: encoded, encoding: 'base64' }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function makeBase64TextResponse(text: string, status = 200): Response {
  const encoded = Buffer.from(text, 'utf8').toString('base64');
  return new Response(JSON.stringify({ content: encoded, encoding: 'base64' }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('project-readme templates', () => {
  it('uses accurate MonoForge counts, CLI command, cd MONOFORGE, and valid logo URL in developer-tool template', () => {
    const devTemplate = PROJECT_TEMPLATES['developer-tool'];
    const md = buildProjectMarkdown(devTemplate);

    expect(md).toContain('330+ Profile Archetypes');
    expect(md).toContain('30+ SVG Visualizations');
    expect(md).toContain('22 Modular Plugins');
    expect(md).toContain('npx github:yuvraj-thakur-exe/MONOFORGE generate -u octocat');
    expect(md).toContain(
      'https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/monoforge-logo.svg'
    );
    expect(md).toContain('cd MONOFORGE');
  });
});

describe('buildProjectMarkdown & URL sanitization', () => {
  it('renders all sections including Table of Contents, custom sections, and optional attribution', () => {
    const config: ProjectReadmeConfig = {
      ...PROJECT_TEMPLATES['developer-tool'],
      showToc: true,
      includeAttribution: true,
      customSections: [
        {
          id: 'sec_1',
          title: 'Security & Governance',
          content: 'All dependencies are audited automatically.',
        },
      ],
    };

    const md = buildProjectMarkdown(config);

    expect(md).toContain('<h1 align="center">MonoForge</h1>');
    expect(md).toContain('## Table of Contents');
    expect(md).toContain('- [Overview](#overview)');
    expect(md).toContain('- [Key Features](#key-features)');
    expect(md).toContain('- [System Architecture](#system-architecture)');
    expect(md).toContain('- [Tech Stack](#tech-stack)');
    expect(md).toContain('- [Getting Started](#getting-started)');
    expect(md).toContain('- [Environment Variables](#environment-variables)');
    expect(md).toContain('- [Development Roadmap](#development-roadmap)');
    expect(md).toContain('- [Security & Governance](#security-governance)');
    expect(md).toContain('- [Contributing](#contributing)');
    expect(md).toContain('- [License](#license)');
    expect(md).toContain('```mermaid');
    expect(md).toContain('| **Core** | `Monaco Code Editor` |');
    expect(md).toContain('- [x] Visual Profile Builder & Wizard');
    expect(md).toContain('- [ ] Automated CI/CD GitHub Action');
    expect(md).toContain('## Security & Governance\n\nAll dependencies are audited automatically.');
    expect(md).toContain('Engineered with <a href="https://monoforge-studio.vercel.app">MonoForge</a>');
  });

  it('omits Table of Contents when showToc is false and omits attribution when includeAttribution is false', () => {
    const config: ProjectReadmeConfig = {
      ...PROJECT_TEMPLATES['oss-library'],
      showToc: false,
      includeAttribution: false,
    };

    const md = buildProjectMarkdown(config);

    expect(md).not.toContain('## Table of Contents');
    expect(md).not.toContain('Engineered with <a href="https://monoforge-studio.vercel.app">MonoForge</a>');
  });

  it('sanitizes unsafe javascript:, data:, and vbscript: URLs across logoUrl, repositoryUrl, liveDemoUrl, and badge.link', () => {
    expect(sanitizeProjectUrl('javascript:alert(1)')).toBe('');
    expect(sanitizeProjectUrl('  JaVaScRiPt:void(0)')).toBe('');
    expect(sanitizeProjectUrl('data:text/html,<script>alert(1)</script>')).toBe('');
    expect(sanitizeProjectUrl('vbscript:msgbox(1)')).toBe('');
    expect(sanitizeProjectUrl('https://github.com/owner/repo')).toBe('https://github.com/owner/repo');

    const unsafeConfig: ProjectReadmeConfig = {
      ...PROJECT_TEMPLATES['developer-tool'],
      logoUrl: 'javascript:alert(1)',
      repositoryUrl: 'vbscript:msgbox(1)',
      liveDemoUrl: 'data:text/html,<svg onload=alert(1)>',
      badges: [
        {
          id: 'bad_badge',
          label: 'Custom',
          text: 'Test',
          color: 'blue',
          style: 'flat',
          link: 'java\nscript:alert(2)',
          enabled: true,
        },
      ],
    };

    const md = buildProjectMarkdown(unsafeConfig);

    expect(md.toLowerCase()).not.toContain('javascript:');
    expect(md.toLowerCase()).not.toContain('vbscript:');
    expect(md.toLowerCase()).not.toContain('data:text/html');
    expect(md).not.toContain('<img src="javascript:');
    expect(md).not.toContain('[Live Demo]');
    expect(md).not.toContain('[GitHub Repository]');
    expect(md).not.toContain('<a href="java');
  });
});

describe('analyzer helpers', () => {
  it('validates GitHub URLs strictly and blocks SSRF/non-GitHub inputs', () => {
    expect(parseGitHubRepoUrl('https://github.com/vercel/next.js')).toEqual({
      owner: 'vercel',
      repo: 'next.js',
      canonicalUrl: 'https://github.com/vercel/next.js',
    });
    expect(parseGitHubRepoUrl('octocat/Hello-World.git')).toEqual({
      owner: 'octocat',
      repo: 'Hello-World',
      canonicalUrl: 'https://github.com/octocat/Hello-World',
    });

    expect(parseGitHubRepoUrl('http://169.254.169.254/latest/meta-data')).toBeNull();
    expect(parseGitHubRepoUrl('https://evil.com/owner/repo')).toBeNull();
    expect(parseGitHubRepoUrl('http://localhost:3000/owner/repo')).toBeNull();
    expect(parseGitHubRepoUrl('https://github.com/owner/..')).toBeNull();
    expect(parseGitHubRepoUrl('https://github.com/../etc/passwd')).toBeNull();
    expect(parseGitHubRepoUrl('https://github.com/./owner/repo')).toBeNull();
    expect(parseGitHubRepoUrl('https://github.com/owner/%2e%2e/passwd')).toBeNull();
    expect(parseGitHubRepoUrl('../etc/passwd')).toBeNull();
    expect(parseGitHubRepoUrl('javascript:alert(1)')).toBeNull();
  });

  it('parses .env.example files and produces honest heuristic results', () => {
    const envVars = parseEnvExample(
      [
        '# Primary database connection',
        'DATABASE_URL=your_postgres_url',
        'PORT=3000',
        'API_KEY=',
      ].join('\n')
    );

    expect(envVars).toEqual([
      {
        id: 'env_1',
        key: 'DATABASE_URL',
        description: 'Primary database connection',
        required: true,
        defaultValue: undefined,
      },
      {
        id: 'env_2',
        key: 'PORT',
        description: 'Configuration value for PORT',
        required: false,
        defaultValue: '3000',
      },
      {
        id: 'env_3',
        key: 'API_KEY',
        description: 'Configuration value for API_KEY',
        required: true,
        defaultValue: undefined,
      },
    ]);

    const heuristic = analyzeRepositoryUrl('https://github.com/acme/vision-ai-agent');
    expect(heuristic.source).toBe('heuristic');
    expect(heuristic.detectedEcosystem).toBe('python');
    expect(heuristic.suggestedTemplate).toBe('ai-ml');

    const cfg = createConfigFromAnalysis('https://github.com/acme/vision-ai-agent', heuristic);
    expect(cfg.name).toBe('vision-ai-agent');
    expect(cfg.repositoryUrl).toBe('https://github.com/acme/vision-ai-agent');
  });
});

describe('POST /api/project-readme/inspect', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects SSRF, non-GitHub hosts, and traversal payloads with 400 without fetching', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const badInputs = [
      'http://169.254.169.254/latest/meta-data',
      'https://gitlab.com/owner/repo',
      'https://github.com/../etc/passwd',
      'https://github.com/owner/../secret',
      'https://github.com/owner/%2e%2e/passwd',
      'javascript:alert(1)',
      '',
    ];

    for (const url of badInputs) {
      const req = new NextRequest('http://localhost:3000/api/project-readme/inspect', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.source).toBe('error');
    }

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('inspects a live GitHub repo mock including package.json and .env.example', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);

      if (url === 'https://api.github.com/repos/acme/hyper-app') {
        return new Response(
          JSON.stringify({
            name: 'hyper-app',
            description: 'High-speed full-stack workspace engine',
            homepage: 'https://hyper-app.dev',
            language: 'TypeScript',
            stargazers_count: 1420,
            topics: ['nextjs', 'fullstack'],
            default_branch: 'main',
            html_url: 'https://github.com/acme/hyper-app',
            license: { spdx_id: 'MIT', name: 'MIT License' },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (url.endsWith('/contents/package.json')) {
        return makeBase64JsonResponse({
          name: 'hyper-app',
          packageManager: 'pnpm@10.0.0',
          scripts: { dev: 'next dev', build: 'next build' },
          dependencies: {
            next: '^16.0.0',
            react: '^19.0.0',
            'drizzle-orm': '^0.40.0',
          },
          devDependencies: {
            typescript: '^5.8.0',
            vitest: '^4.0.0',
          },
        });
      }

      if (url.endsWith('/contents/.env.example')) {
        return makeBase64TextResponse('# Postgres connection URI\nDATABASE_URL=your_db_url\nPORT=3000\n');
      }

      return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    });

    const req = new NextRequest('http://localhost:3000/api/project-readme/inspect', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://github.com/acme/hyper-app' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();

    expect(body.source).toBe('github');
    expect(body.repository.name).toBe('hyper-app');
    expect(body.repository.homepage).toBe('https://hyper-app.dev');
    expect(body.repository.license).toBe('MIT');
    expect(body.analysis.detectedEcosystem).toBe('node');
    expect(body.analysis.suggestedTemplate).toBe('fullstack-web');
    expect(body.analysis.techStack.map((t: { name: string }) => t.name)).toEqual(
      expect.arrayContaining(['Next.js', 'React', 'Drizzle ORM', 'TypeScript', 'Vitest'])
    );
    expect(body.analysis.envVariables).toHaveLength(2);
    expect(body.analysis.envVariables[0].key).toBe('DATABASE_URL');
    expect(body.analysis.envVariables[0].required).toBe(true);
    expect(body.analysis.suggestedBadges.map((b: { label: string }) => b.label)).toEqual(
      expect.arrayContaining(['License', 'Stars', 'Language', 'PRs'])
    );
    expect(body.analysis.installSteps.some((s: { command: string }) => s.command.includes('pnpm install'))).toBe(true);
  });

  it('returns honest rate_limited and not_found responses without fabricating dependencies', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'API rate limit exceeded' }), { status: 403 })
    );

    const rateReq = new NextRequest('http://localhost:3000/api/project-readme/inspect', {
      method: 'POST',
      body: JSON.stringify({ url: 'octocat/Hello-World' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const rateRes = await POST(rateReq);
    expect(rateRes.status).toBe(200);
    const rateData = await rateRes.json();
    expect(rateData.source).toBe('rate_limited');
    expect(rateData.statusMessage).toContain('rate limit');

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 })
    );

    const notFoundReq = new NextRequest('http://localhost:3000/api/project-readme/inspect', {
      method: 'POST',
      body: JSON.stringify({ url: 'octocat/missing-repo' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const notFoundRes = await POST(notFoundReq);
    expect(notFoundRes.status).toBe(200);
    const notFoundData = await notFoundRes.json();
    expect(notFoundData.source).toBe('not_found');
    expect(notFoundData.statusMessage).toContain('not found');
  });

  it('marks source as partial when repo metadata succeeds but manifest requests fail', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);
      if (url === 'https://api.github.com/repos/acme/partial-repo') {
        return new Response(
          JSON.stringify({
            name: 'partial-repo',
            description: 'Partial test repo',
            language: 'Go',
            stargazers_count: 10,
            html_url: 'https://github.com/acme/partial-repo',
          }),
          { status: 200 }
        );
      }
      return new Response(JSON.stringify({ message: 'rate limited' }), { status: 403 });
    });

    const req = new NextRequest('http://localhost:3000/api/project-readme/inspect', {
      method: 'POST',
      body: JSON.stringify({ url: 'acme/partial-repo' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.source).toBe('partial');
  });
});

describe('useProjectReadmeStore CRUD & analyzeRepository', () => {
  beforeEach(() => {
    useProjectReadmeStore.getState().resetToDefault();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('supports all 9 categories and CRUD actions across badges, stack, install, env, roadmap, and custom sections', () => {
    const store = useProjectReadmeStore.getState();

    store.setActiveCategory('roadmap');
    expect(useProjectReadmeStore.getState().activeCategory).toBe('roadmap');

    store.setActiveCategory('sections');
    expect(useProjectReadmeStore.getState().activeCategory).toBe('sections');

    // Badges
    const initialBadgeCount = useProjectReadmeStore.getState().config.badges.length;
    store.addBadge({
      label: 'Coverage',
      text: '99%',
      color: 'brightgreen',
      style: 'flat',
      enabled: true,
    });
    const addedBadge = useProjectReadmeStore.getState().config.badges.at(-1)!;
    expect(useProjectReadmeStore.getState().config.badges).toHaveLength(initialBadgeCount + 1);
    store.toggleBadge(addedBadge.id);
    expect(useProjectReadmeStore.getState().config.badges.find((b) => b.id === addedBadge.id)?.enabled).toBe(false);
    store.removeBadge(addedBadge.id);
    expect(useProjectReadmeStore.getState().config.badges).toHaveLength(initialBadgeCount);

    // Tech stack
    const initialStackCount = useProjectReadmeStore.getState().config.techStack.length;
    store.addTechStack({ name: 'Drizzle ORM', category: 'Database' });
    const addedStack = useProjectReadmeStore.getState().config.techStack.at(-1)!;
    expect(useProjectReadmeStore.getState().config.techStack).toHaveLength(initialStackCount + 1);
    store.removeTechStack(addedStack.id);
    expect(useProjectReadmeStore.getState().config.techStack).toHaveLength(initialStackCount);

    // Install steps
    const initialInstallCount = useProjectReadmeStore.getState().config.installSteps.length;
    store.addInstallStep({ step: 'Run Tests', command: 'pnpm test', comment: 'Runs Vitest suite' });
    const addedStep = useProjectReadmeStore.getState().config.installSteps.at(-1)!;
    expect(useProjectReadmeStore.getState().config.installSteps).toHaveLength(initialInstallCount + 1);
    store.removeInstallStep(addedStep.id);
    expect(useProjectReadmeStore.getState().config.installSteps).toHaveLength(initialInstallCount);

    // Env variables
    const initialEnvCount = useProjectReadmeStore.getState().config.envVariables.length;
    store.addEnvVariable({ key: 'REDIS_URL', description: 'Cache URL', required: true });
    const addedEnv = useProjectReadmeStore.getState().config.envVariables.at(-1)!;
    expect(useProjectReadmeStore.getState().config.envVariables).toHaveLength(initialEnvCount + 1);
    store.removeEnvVariable(addedEnv.id);
    expect(useProjectReadmeStore.getState().config.envVariables).toHaveLength(initialEnvCount);

    // Roadmap
    const initialRoadmapCount = useProjectReadmeStore.getState().config.roadmap.length;
    store.addRoadmapItem('Ship v2.0');
    const addedRoadmap = useProjectReadmeStore.getState().config.roadmap.at(-1)!;
    expect(addedRoadmap.done).toBe(false);
    store.toggleRoadmapItem(addedRoadmap.id);
    expect(useProjectReadmeStore.getState().config.roadmap.find((r) => r.id === addedRoadmap.id)?.done).toBe(true);
    store.removeRoadmapItem(addedRoadmap.id);
    expect(useProjectReadmeStore.getState().config.roadmap).toHaveLength(initialRoadmapCount);

    // Custom sections
    store.addCustomSection({ title: 'Benchmarks', content: 'Sub-millisecond compilation.' });
    const addedSec = useProjectReadmeStore.getState().config.customSections.at(-1)!;
    expect(addedSec.title).toBe('Benchmarks');
    store.updateCustomSection(addedSec.id, { content: 'Updated benchmark numbers.' });
    expect(useProjectReadmeStore.getState().getCompiledMarkdown()).toContain('Updated benchmark numbers.');
    store.removeCustomSection(addedSec.id);
    expect(useProjectReadmeStore.getState().config.customSections).toHaveLength(0);
  });

  it('calls /api/project-readme/inspect in analyzeRepository and handles fallback gracefully', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          source: 'github',
          statusMessage: 'Inspected live GitHub repository acme/demo (package.json).',
          repository: { url: 'https://github.com/acme/demo' },
          analysis: {
            detectedName: 'demo',
            detectedDescription: 'Live repo description',
            detectedEcosystem: 'node',
            suggestedTemplate: 'oss-library',
            techStack: [{ id: 't1', name: 'TypeScript', category: 'Core' }],
            suggestedBadges: [{ id: 'b1', label: 'License', text: 'MIT', color: 'blue', style: 'flat', enabled: true }],
            suggestedQuickStart: 'npm install demo',
            envVariables: [],
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );

    await useProjectReadmeStore.getState().analyzeRepository('https://github.com/acme/demo');
    let state = useProjectReadmeStore.getState();
    expect(state.analysisSource).toBe('github');
    expect(state.analysisMessage).toContain('acme/demo');
    expect(state.config.name).toBe('demo');
    expect(state.isAnalyzing).toBe(false);

    // Network failure falls back gracefully to heuristic
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network down'));
    await useProjectReadmeStore.getState().analyzeRepository('https://github.com/acme/fallback-cli');
    state = useProjectReadmeStore.getState();
    expect(state.analysisSource).toBe('heuristic');
    expect(state.config.name).toBe('fallback-cli');
    expect(state.isAnalyzing).toBe(false);
  });
});
