import { NextRequest, NextResponse } from 'next/server';
import {
  analyzeRepositoryUrl,
  createConfigFromAnalysis,
  detectFromManifests,
  GitHubRepoMetadata,
  parseGitHubRepoUrl,
  RepoManifests,
} from '#/lib/project-readme/analyzer';

interface GitHubContentsResponse {
  content?: string;
  encoding?: string;
}

const MANIFEST_FILES: Array<{ path: string; key: keyof RepoManifests }> = [
  { path: 'package.json', key: 'packageJson' },
  { path: 'pyproject.toml', key: 'pyprojectToml' },
  { path: 'Cargo.toml', key: 'cargoToml' },
  { path: 'go.mod', key: 'goMod' },
  { path: 'Dockerfile', key: 'dockerfile' },
  { path: '.env.example', key: 'envExample' },
];

function decodeGitHubContent(data: GitHubContentsResponse | string): string | null {
  if (typeof data === 'string') return data;
  if (!data || typeof data.content !== 'string') return null;

  if (!data.encoding || data.encoding === 'base64') {
    try {
      return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');
    } catch {
      return null;
    }
  }

  return data.content;
}

export async function POST(req: NextRequest) {
  let body: { url?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body.', source: 'error' },
      { status: 400 }
    );
  }

  const rawUrl = typeof body?.url === 'string' ? body.url : '';
  const parsedRepo = parseGitHubRepoUrl(rawUrl);

  if (!parsedRepo) {
    return NextResponse.json(
      {
        error: 'Invalid GitHub repository URL. Provide https://github.com/owner/repo or owner/repo.',
        source: 'error',
      },
      { status: 400 }
    );
  }

  const { owner, repo, canonicalUrl } = parsedRepo;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'MonoForge-Project-Readme-Inspector',
  };

  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      cache: 'no-store',
    });

    if (repoRes.status === 404) {
      const statusMessage = `Repository ${owner}/${repo} was not found on GitHub (or is private). Falling back to heuristic analysis.`;
      const analysis = {
        ...analyzeRepositoryUrl(canonicalUrl),
        source: 'not_found' as const,
        statusMessage,
      };
      return NextResponse.json({
        source: 'not_found',
        statusMessage,
        repository: { owner, repo, url: canonicalUrl },
        analysis,
        config: createConfigFromAnalysis(canonicalUrl, analysis),
      });
    }

    if (repoRes.status === 403 || repoRes.status === 429) {
      const statusMessage =
        'GitHub API rate limit exceeded. Falling back to heuristic analysis without fabricated dependencies.';
      const analysis = {
        ...analyzeRepositoryUrl(canonicalUrl),
        source: 'rate_limited' as const,
        statusMessage,
      };
      return NextResponse.json({
        source: 'rate_limited',
        statusMessage,
        repository: { owner, repo, url: canonicalUrl },
        analysis,
        config: createConfigFromAnalysis(canonicalUrl, analysis),
      });
    }

    if (!repoRes.ok) {
      const statusMessage = `GitHub API returned HTTP ${repoRes.status}. Falling back to heuristic analysis.`;
      const analysis = {
        ...analyzeRepositoryUrl(canonicalUrl),
        source: 'heuristic' as const,
        statusMessage,
      };
      return NextResponse.json({
        source: 'heuristic',
        statusMessage,
        repository: { owner, repo, url: canonicalUrl },
        analysis,
        config: createConfigFromAnalysis(canonicalUrl, analysis),
      });
    }

    const repoMeta = (await repoRes.json()) as GitHubRepoMetadata;

    const manifests: RepoManifests = {};
    const detectedFiles: string[] = [];
    let partialFailure = false;

    const manifestResults = await Promise.all(
      MANIFEST_FILES.map(async ({ path, key }) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
            { headers, cache: 'no-store' }
          );

          if (res.status === 404) {
            return { key, path, content: null, partial: false };
          }
          if (res.status === 403 || res.status === 429 || !res.ok) {
            return { key, path, content: null, partial: true };
          }

          const payload = (await res.json()) as GitHubContentsResponse | string;
          return { key, path, content: decodeGitHubContent(payload), partial: false };
        } catch {
          return { key, path, content: null, partial: true };
        }
      })
    );

    for (const item of manifestResults) {
      if (item.partial) {
        partialFailure = true;
      }
      if (item.content !== null) {
        manifests[item.key] = item.content;
        detectedFiles.push(item.path);
      }
    }

    const analysis = detectFromManifests({
      owner,
      repo,
      repoMeta,
      manifests,
    });

    const source = partialFailure ? 'partial' : 'github';
    const statusMessage = partialFailure
      ? `Fetched GitHub metadata for ${owner}/${repo}, though some manifest files could not be inspected.`
      : detectedFiles.length > 0
        ? `Inspected live GitHub repository ${owner}/${repo} (${detectedFiles.join(', ')}).`
        : `Inspected live GitHub repository ${owner}/${repo}.`;

    analysis.source = source;
    analysis.statusMessage = statusMessage;

    const resolvedUrl = repoMeta.html_url || canonicalUrl;
    const config = createConfigFromAnalysis(resolvedUrl, analysis);

    return NextResponse.json({
      source,
      statusMessage,
      repository: {
        owner,
        repo,
        url: resolvedUrl,
        name: analysis.detectedName,
        description: analysis.detectedDescription,
        homepage: analysis.homepage,
        license: analysis.license,
        language: repoMeta.language || undefined,
        stars: repoMeta.stargazers_count,
        topics: analysis.topics || [],
      },
      analysis,
      config,
    });
  } catch {
    const statusMessage =
      'Failed to reach GitHub API. Falling back to offline heuristic analysis.';
    const analysis = {
      ...analyzeRepositoryUrl(canonicalUrl),
      source: 'heuristic' as const,
      statusMessage,
    };
    return NextResponse.json({
      source: 'heuristic',
      statusMessage,
      repository: { owner, repo, url: canonicalUrl },
      analysis,
      config: createConfigFromAnalysis(canonicalUrl, analysis),
    });
  }
}
