import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CustomSection,
  EnvVariable,
  InstallStep,
  ProjectAnalysisSource,
  ProjectBadge,
  ProjectEditorCategory,
  ProjectFeature,
  ProjectReadmeConfig,
  ProjectTemplateType,
  TechStackItem,
} from '#/lib/project-readme/types';
import { PROJECT_TEMPLATES } from '#/lib/project-readme/templates';
import { buildProjectMarkdown } from '#/lib/project-readme/generator';
import {
  analyzeRepositoryUrl,
  createConfigFromAnalysis,
  RepositoryAnalysisResult,
} from '#/lib/project-readme/analyzer';

let itemIdCounter = 0;
function createItemId(prefix: string): string {
  itemIdCounter += 1;
  return `${prefix}_${Date.now()}_${itemIdCounter}`;
}

export interface ProjectReadmeStoreState {
  config: ProjectReadmeConfig;
  viewMode: 'split' | 'editor' | 'preview';
  activeCategory: ProjectEditorCategory;
  isAnalyzing: boolean;
  analysisSource: ProjectAnalysisSource;
  analysisMessage: string | null;
  rawMarkdownOverride: string | null;

  // Actions
  setViewMode: (mode: 'split' | 'editor' | 'preview') => void;
  setActiveCategory: (cat: ProjectEditorCategory) => void;
  updateConfig: (patch: Partial<ProjectReadmeConfig>) => void;
  loadTemplate: (type: ProjectTemplateType) => void;
  analyzeRepository: (url: string) => Promise<void>;
  toggleBadge: (badgeId: string) => void;
  addBadge: (badge: Omit<ProjectBadge, 'id'>) => void;
  removeBadge: (id: string) => void;
  addFeature: (feature: Omit<ProjectFeature, 'id'>) => void;
  removeFeature: (id: string) => void;
  updateArchitecture: (mermaid: string) => void;
  addTechStack: (item: Omit<TechStackItem, 'id'>) => void;
  removeTechStack: (id: string) => void;
  addInstallStep: (step: Omit<InstallStep, 'id'>) => void;
  removeInstallStep: (id: string) => void;
  addRoadmapItem: (task: string) => void;
  toggleRoadmapItem: (id: string) => void;
  removeRoadmapItem: (id: string) => void;
  addEnvVariable: (env: Omit<EnvVariable, 'id'>) => void;
  removeEnvVariable: (id: string) => void;
  addCustomSection: (sec: Omit<CustomSection, 'id'>) => void;
  updateCustomSection: (id: string, patch: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  setRawMarkdownOverride: (markdown: string | null) => void;
  getCompiledMarkdown: () => string;
  resetToDefault: () => void;
}

const DEFAULT_PROJECT_CONFIG = PROJECT_TEMPLATES['developer-tool'];

export const useProjectReadmeStore = create<ProjectReadmeStoreState>()(
  persist(
    (set, get) => ({
      config: DEFAULT_PROJECT_CONFIG,
      viewMode: 'split',
      activeCategory: 'meta',
      isAnalyzing: false,
      analysisSource: 'default',
      analysisMessage: null,
      rawMarkdownOverride: null,

      setViewMode: (mode) => set({ viewMode: mode }),
      setActiveCategory: (cat) => set({ activeCategory: cat }),

      updateConfig: (patch) => {
        set((state) => ({
          config: { ...state.config, ...patch },
          rawMarkdownOverride: null,
        }));
      },

      loadTemplate: (type) => {
        const template = PROJECT_TEMPLATES[type] || DEFAULT_PROJECT_CONFIG;
        set({
          config: { ...template },
          rawMarkdownOverride: null,
          analysisSource: 'default',
          analysisMessage: null,
        });
      },

      analyzeRepository: async (url: string) => {
        set({ isAnalyzing: true });

        try {
          const response = await fetch('/api/project-readme/inspect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          });

          const data = (await response.json()) as {
            source?: ProjectAnalysisSource;
            statusMessage?: string;
            error?: string;
            repository?: { url?: string };
            analysis?: RepositoryAnalysisResult;
            config?: ProjectReadmeConfig;
          };

          if (!response.ok || data.source === 'error' || (!data.config && !data.analysis)) {
            if (response.status === 400) {
              set({
                isAnalyzing: false,
                analysisSource: 'error',
                analysisMessage:
                  data.error || 'Invalid GitHub repository URL. Use https://github.com/owner/repo or owner/repo.',
              });
              return;
            }

            const fallbackAnalysis = analyzeRepositoryUrl(url);
            const fallbackConfig = createConfigFromAnalysis(url, fallbackAnalysis);
            set({
              config: fallbackConfig,
              isAnalyzing: false,
              rawMarkdownOverride: null,
              analysisSource: 'heuristic',
              analysisMessage:
                data.statusMessage ||
                'Inspector returned an error — generated heuristic analysis from repository URL.',
            });
            return;
          }

          const resolvedUrl = data.repository?.url || url;
          const newConfig = data.config ?? createConfigFromAnalysis(resolvedUrl, data.analysis!);
          set({
            config: newConfig,
            isAnalyzing: false,
            rawMarkdownOverride: null,
            analysisSource: data.source || 'github',
            analysisMessage: data.statusMessage || null,
          });
        } catch {
          const fallbackAnalysis = analyzeRepositoryUrl(url);
          const fallbackConfig = createConfigFromAnalysis(url, fallbackAnalysis);
          set({
            config: fallbackConfig,
            isAnalyzing: false,
            rawMarkdownOverride: null,
            analysisSource: 'heuristic',
            analysisMessage:
              'Network request failed — fell back to offline heuristic URL analysis.',
          });
        }
      },

      toggleBadge: (badgeId: string) => {
        set((state) => ({
          config: {
            ...state.config,
            badges: state.config.badges.map((b) =>
              b.id === badgeId ? { ...b, enabled: !b.enabled } : b
            ),
          },
          rawMarkdownOverride: null,
        }));
      },

      addBadge: (badge) => {
        const id = createItemId('b');
        set((state) => ({
          config: {
            ...state.config,
            badges: [...state.config.badges, { ...badge, id }],
          },
          rawMarkdownOverride: null,
        }));
      },

      removeBadge: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            badges: state.config.badges.filter((b) => b.id !== id),
          },
          rawMarkdownOverride: null,
        }));
      },

      addFeature: (feat) => {
        const id = createItemId('f');
        set((state) => ({
          config: {
            ...state.config,
            features: [...state.config.features, { ...feat, id }],
          },
          rawMarkdownOverride: null,
        }));
      },

      removeFeature: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            features: state.config.features.filter((f) => f.id !== id),
          },
          rawMarkdownOverride: null,
        }));
      },

      updateArchitecture: (mermaid: string) => {
        set((state) => ({
          config: {
            ...state.config,
            architectureMermaid: mermaid,
          },
          rawMarkdownOverride: null,
        }));
      },

      addTechStack: (item) => {
        const id = createItemId('t');
        set((state) => ({
          config: {
            ...state.config,
            techStack: [...state.config.techStack, { ...item, id }],
          },
          rawMarkdownOverride: null,
        }));
      },

      removeTechStack: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            techStack: state.config.techStack.filter((t) => t.id !== id),
          },
          rawMarkdownOverride: null,
        }));
      },

      addInstallStep: (step) => {
        const id = createItemId('s');
        set((state) => ({
          config: {
            ...state.config,
            installSteps: [...state.config.installSteps, { ...step, id }],
          },
          rawMarkdownOverride: null,
        }));
      },

      removeInstallStep: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            installSteps: state.config.installSteps.filter((s) => s.id !== id),
          },
          rawMarkdownOverride: null,
        }));
      },

      addRoadmapItem: (task: string) => {
        const trimmed = task.trim();
        if (!trimmed) return;
        const id = createItemId('r');
        set((state) => ({
          config: {
            ...state.config,
            roadmap: [...state.config.roadmap, { id, task: trimmed, done: false }],
          },
          rawMarkdownOverride: null,
        }));
      },

      toggleRoadmapItem: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            roadmap: state.config.roadmap.map((r) =>
              r.id === id ? { ...r, done: !r.done } : r
            ),
          },
          rawMarkdownOverride: null,
        }));
      },

      removeRoadmapItem: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            roadmap: state.config.roadmap.filter((r) => r.id !== id),
          },
          rawMarkdownOverride: null,
        }));
      },

      addEnvVariable: (env) => {
        const id = createItemId('e');
        set((state) => ({
          config: {
            ...state.config,
            envVariables: [...state.config.envVariables, { ...env, id }],
          },
          rawMarkdownOverride: null,
        }));
      },

      removeEnvVariable: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            envVariables: state.config.envVariables.filter((e) => e.id !== id),
          },
          rawMarkdownOverride: null,
        }));
      },

      addCustomSection: (sec) => {
        const id = createItemId('sec');
        set((state) => ({
          config: {
            ...state.config,
            customSections: [...state.config.customSections, { ...sec, id }],
          },
          rawMarkdownOverride: null,
        }));
      },

      updateCustomSection: (id: string, patch: Partial<CustomSection>) => {
        set((state) => ({
          config: {
            ...state.config,
            customSections: state.config.customSections.map((sec) =>
              sec.id === id ? { ...sec, ...patch } : sec
            ),
          },
          rawMarkdownOverride: null,
        }));
      },

      removeCustomSection: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            customSections: state.config.customSections.filter((sec) => sec.id !== id),
          },
          rawMarkdownOverride: null,
        }));
      },

      setRawMarkdownOverride: (markdown) => {
        set({ rawMarkdownOverride: markdown });
      },

      getCompiledMarkdown: () => {
        const state = get();
        if (state.rawMarkdownOverride !== null) {
          return state.rawMarkdownOverride;
        }
        return buildProjectMarkdown(state.config);
      },

      resetToDefault: () => {
        set({
          config: DEFAULT_PROJECT_CONFIG,
          rawMarkdownOverride: null,
          viewMode: 'split',
          activeCategory: 'meta',
          analysisSource: 'default',
          analysisMessage: null,
        });
      },
    }),
    {
      name: 'monoforge-project-readme-storage',
    }
  )
);
