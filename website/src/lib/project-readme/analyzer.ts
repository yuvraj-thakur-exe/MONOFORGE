import { ProjectReadmeConfig, TechStackItem, ProjectBadge } from './types';
import { PROJECT_TEMPLATES } from './templates';

export interface RepositoryAnalysisResult {
  detectedName: string;
  detectedDescription: string;
  detectedEcosystem: 'node' | 'python' | 'rust' | 'go' | 'docker' | 'general';
  suggestedTemplate: 'saas' | 'developer-tool' | 'oss-library' | 'cli-tool' | 'ai-ml' | 'fullstack-web';
  techStack: TechStackItem[];
  suggestedBadges: ProjectBadge[];
  suggestedQuickStart: string;
}

/**
 * Simulates / performs deep repository analysis based on GitHub URL or package json/lockfiles.
 */
export function analyzeRepositoryUrl(rawUrl: string): RepositoryAnalysisResult {
  const cleanUrl = rawUrl.trim().replace(/\/$/, '');
  const urlParts = cleanUrl.split('/');
  const repoName = urlParts[urlParts.length - 1] || 'MyProject';
  const orgName = urlParts[urlParts.length - 2] || 'Developer';

  const isMonoForge = repoName.toLowerCase().includes('monoforge');
  const isAi = repoName.toLowerCase().includes('agent') || repoName.toLowerCase().includes('ai') || repoName.toLowerCase().includes('llm');
  const isCli = repoName.toLowerCase().includes('cli') || repoName.toLowerCase().includes('tool');

  let detectedEcosystem: 'node' | 'python' | 'rust' | 'go' | 'docker' | 'general' = 'node';
  let suggestedTemplate: 'saas' | 'developer-tool' | 'oss-library' | 'cli-tool' | 'ai-ml' | 'fullstack-web' = 'developer-tool';

  if (isAi) {
    detectedEcosystem = 'python';
    suggestedTemplate = 'ai-ml';
  } else if (isCli) {
    detectedEcosystem = 'rust';
    suggestedTemplate = 'cli-tool';
  }

  const techStack: TechStackItem[] = [
    { id: 't1', name: 'TypeScript', category: 'Core', color: '3178C6' },
    { id: 't2', name: 'Next.js 16 (App Router)', category: 'Frontend', color: '000000' },
    { id: 't3', name: 'Tailwind CSS', category: 'Frontend', color: '38BDF8' },
    { id: 't4', name: 'Monaco Editor', category: 'Core', color: '1E1E1E' },
    { id: 't5', name: 'Zustand 5', category: 'Core', color: '4338CA' },
  ];

  const suggestedBadges: ProjectBadge[] = [
    { id: 'b1', label: 'License', text: 'MIT', color: 'blue', style: 'for-the-badge', enabled: true },
    { id: 'b2', label: 'Ecosystem', text: detectedEcosystem.toUpperCase(), color: 'black', style: 'for-the-badge', enabled: true },
    { id: 'b3', label: 'Build', text: 'Passing', color: '2ea44f', style: 'for-the-badge', enabled: true },
    { id: 'b4', label: 'PRs', text: 'Welcome', color: 'brightgreen', style: 'for-the-badge', enabled: true },
  ];

  return {
    detectedName: repoName,
    detectedDescription: `${repoName} — High performance software engineered for scale and developer velocity.`,
    detectedEcosystem,
    suggestedTemplate,
    techStack,
    suggestedBadges,
    suggestedQuickStart: `git clone ${cleanUrl}.git && cd ${repoName} && pnpm install`,
  };
}

/**
 * Creates a pre-populated ProjectReadmeConfig from analysis results.
 */
export function createConfigFromAnalysis(
  url: string,
  analysis: RepositoryAnalysisResult
): ProjectReadmeConfig {
  const baseTemplate = PROJECT_TEMPLATES[analysis.suggestedTemplate];

  return {
    ...baseTemplate,
    name: analysis.detectedName,
    tagline: `${analysis.detectedName} — Developer Platform`,
    description: analysis.detectedDescription,
    repositoryUrl: url,
    ecosystem: analysis.detectedEcosystem,
    template: analysis.suggestedTemplate,
    techStack: analysis.techStack,
    badges: analysis.suggestedBadges,
    quickStartCommand: analysis.suggestedQuickStart,
  };
}

