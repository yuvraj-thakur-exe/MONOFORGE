import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ProjectReadmeConfig,
  ProjectTemplateType,
  ProjectBadge,
  ProjectFeature,
  TechStackItem,
  InstallStep,
} from '#/lib/project-readme/types';
import { PROJECT_TEMPLATES } from '#/lib/project-readme/templates';
import { buildProjectMarkdown } from '#/lib/project-readme/generator';
import { analyzeRepositoryUrl, createConfigFromAnalysis } from '#/lib/project-readme/analyzer';

export interface ProjectReadmeStoreState {
  config: ProjectReadmeConfig;
  viewMode: 'split' | 'editor' | 'preview';
  activeCategory: 'meta' | 'badges' | 'features' | 'architecture' | 'stack' | 'install' | 'env';
  isAnalyzing: boolean;
  rawMarkdownOverride: string | null;

  // Actions
  setViewMode: (mode: 'split' | 'editor' | 'preview') => void;
  setActiveCategory: (cat: 'meta' | 'badges' | 'features' | 'architecture' | 'stack' | 'install' | 'env') => void;
  updateConfig: (patch: Partial<ProjectReadmeConfig>) => void;
  loadTemplate: (type: ProjectTemplateType) => void;
  analyzeRepository: (url: string) => Promise<void>;
  toggleBadge: (badgeId: string) => void;
  addFeature: (feature: Omit<ProjectFeature, 'id'>) => void;
  removeFeature: (id: string) => void;
  updateArchitecture: (mermaid: string) => void;
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
      rawMarkdownOverride: null,

      setViewMode: (mode) => set({ viewMode: mode }),
      setActiveCategory: (cat) => set({ activeCategory: cat }),

      updateConfig: (patch) => {
        set((state) => ({
          config: { ...state.config, ...patch },
          rawMarkdownOverride: null, // Reset manual override on structured edits
        }));
      },

      loadTemplate: (type) => {
        const template = PROJECT_TEMPLATES[type] || DEFAULT_PROJECT_CONFIG;
        set({
          config: { ...template },
          rawMarkdownOverride: null,
        });
      },

      analyzeRepository: async (url: string) => {
        set({ isAnalyzing: true });
        // Simulate async analysis delay for smooth UI responsiveness
        await new Promise((resolve) => setTimeout(resolve, 600));
        const analysis = analyzeRepositoryUrl(url);
        const newConfig = createConfigFromAnalysis(url, analysis);
        set({
          config: newConfig,
          isAnalyzing: false,
          rawMarkdownOverride: null,
        });
      },

      toggleBadge: (badgeId: string) => {
        set((state) => ({
          config: {
            ...state.config,
            badges: state.config.badges.map((b) =>
              b.id === badgeId ? { ...b, enabled: !b.enabled } : b
            ),
          },
        }));
      },

      addFeature: (feat) => {
        const id = `f_${Date.now()}`;
        set((state) => ({
          config: {
            ...state.config,
            features: [...state.config.features, { ...feat, id }],
          },
        }));
      },

      removeFeature: (id: string) => {
        set((state) => ({
          config: {
            ...state.config,
            features: state.config.features.filter((f) => f.id !== id),
          },
        }));
      },

      updateArchitecture: (mermaid: string) => {
        set((state) => ({
          config: {
            ...state.config,
            architectureMermaid: mermaid,
          },
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
        });
      },
    }),
    {
      name: 'monoforge-project-readme-storage',
    }
  )
);

