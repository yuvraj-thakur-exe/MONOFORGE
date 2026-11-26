export type ProjectTemplateType =
  | 'saas'
  | 'developer-tool'
  | 'oss-library'
  | 'cli-tool'
  | 'ai-ml'
  | 'fullstack-web';

export type EcosystemType =
  | 'node'
  | 'python'
  | 'rust'
  | 'go'
  | 'docker'
  | 'general';

export type ProjectAnalysisSource =
  | 'default'
  | 'github'
  | 'partial'
  | 'heuristic'
  | 'rate_limited'
  | 'not_found'
  | 'error';

export type AnalysisSource = ProjectAnalysisSource;

export type ProjectEditorCategory =
  | 'meta'
  | 'badges'
  | 'features'
  | 'architecture'
  | 'stack'
  | 'install'
  | 'env'
  | 'roadmap'
  | 'sections';

export type ProjectStudioCategory = ProjectEditorCategory;

export interface ProjectBadge {
  id: string;
  label: string;
  text: string;
  color: string;
  style: 'for-the-badge' | 'flat-square' | 'flat' | 'plastic';
  link?: string;
  enabled: boolean;
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'Core' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Testing';
  badgeUrl?: string;
  color?: string;
}

export interface InstallStep {
  id: string;
  step: string;
  command: string;
  comment?: string;
}

export interface RoadmapItem {
  id: string;
  task: string;
  done: boolean;
}

export interface EnvVariable {
  id: string;
  key: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ProjectReadmeConfig {
  version: string;
  name: string;
  tagline: string;
  description: string;
  template: ProjectTemplateType;
  ecosystem: EcosystemType;
  repositoryUrl: string;
  liveDemoUrl?: string;
  license: string;
  logoUrl?: string;
  badges: ProjectBadge[];
  features: ProjectFeature[];
  techStack: TechStackItem[];
  installSteps: InstallStep[];
  quickStartCommand: string;
  architectureMermaid: string;
  showArchitecture: boolean;
  showBadges: boolean;
  showRoadmap: boolean;
  roadmap: RoadmapItem[];
  showEnvVariables: boolean;
  envVariables: EnvVariable[];
  showContributing: boolean;
  showLicense: boolean;
  showToc?: boolean;
  includeAttribution?: boolean;
  customSections: CustomSection[];
}
