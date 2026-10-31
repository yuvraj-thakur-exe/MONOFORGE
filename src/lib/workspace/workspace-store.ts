/**
 * MONOFORGE Local-First Developer Profile Workspace
 * Manages multiple profile projects, variants, saved templates, and export history
 * without requiring cloud logins or external tracking databases.
 */

import { ReadmeConfig } from '#/lib/plugins/types';
import { v4 as uuidv4 } from 'uuid';

export interface ProjectProfile {
  id: string;
  name: string;
  variantLabel?: string;
  createdAt: number;
  updatedAt: number;
  config: ReadmeConfig;
}

export interface SavedTemplate {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  config: ReadmeConfig;
}

export interface ExportedAssetRecord {
  id: string;
  name: string;
  format: 'markdown' | 'svg' | 'json';
  timestamp: number;
  byteSize: number;
}

export interface WorkspaceData {
  activeProjectId: string;
  projects: ProjectProfile[];
  savedTemplates: SavedTemplate[];
  exportHistory: ExportedAssetRecord[];
}

const STORAGE_KEY = '@monoforge-workspace-v2';

const DEFAULT_PROJECT_CONFIG: ReadmeConfig = {
  version: '1.0.0',
  title: 'MonoForge Profile',
  settings: {
    user: { github: '', name: '', role: '', bio: '' },
    theme: 'dark',
    accentColor: '#ffe600',
    badgeStyle: 'for-the-badge',
    align: 'left',
  },
  sections: [],
};

export class LocalWorkspace {
  private data: WorkspaceData;

  constructor() {
    this.data = this.loadFromStorage();
  }

  private loadFromStorage(): WorkspaceData {
    if (typeof window === 'undefined') {
      const defaultId = uuidv4();
      return {
        activeProjectId: defaultId,
        projects: [
          {
            id: defaultId,
            name: 'Primary GitHub Profile',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            config: DEFAULT_PROJECT_CONFIG,
          },
        ],
        savedTemplates: [],
        exportHistory: [],
      };
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.projects && parsed.projects.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }

    const defaultId = uuidv4();
    const initialData: WorkspaceData = {
      activeProjectId: defaultId,
      projects: [
        {
          id: defaultId,
          name: 'Primary GitHub Profile',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          config: DEFAULT_PROJECT_CONFIG,
        },
      ],
      savedTemplates: [],
      exportHistory: [],
    };

    this.saveToStorage(initialData);
    return initialData;
  }

  private saveToStorage(data: WorkspaceData): void {
    this.data = data;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // Storage full or unavailable
      }
    }
  }

  public getData(): WorkspaceData {
    return this.data;
  }

  public getActiveProject(): ProjectProfile {
    const active = this.data.projects.find(p => p.id === this.data.activeProjectId);
    return active || this.data.projects[0];
  }

  public createProject(name: string, initialConfig?: ReadmeConfig, variantLabel?: string): ProjectProfile {
    const newProject: ProjectProfile = {
      id: uuidv4(),
      name: name.trim() || `Profile Project #${this.data.projects.length + 1}`,
      variantLabel,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      config: initialConfig ? JSON.parse(JSON.stringify(initialConfig)) : DEFAULT_PROJECT_CONFIG,
    };

    const nextData: WorkspaceData = {
      ...this.data,
      activeProjectId: newProject.id,
      projects: [newProject, ...this.data.projects],
    };

    this.saveToStorage(nextData);
    return newProject;
  }

  public switchProject(projectId: string): ProjectProfile | null {
    const found = this.data.projects.find(p => p.id === projectId);
    if (!found) return null;

    const nextData: WorkspaceData = {
      ...this.data,
      activeProjectId: projectId,
    };

    this.saveToStorage(nextData);
    return found;
  }

  public updateProjectConfig(projectId: string, config: ReadmeConfig): void {
    const index = this.data.projects.findIndex(p => p.id === projectId);
    if (index === -1) return;

    const updatedProjects = [...this.data.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      config,
      updatedAt: Date.now(),
    };

    this.saveToStorage({
      ...this.data,
      projects: updatedProjects,
    });
  }

  public duplicateProject(projectId: string, newName?: string): ProjectProfile | null {
    const target = this.data.projects.find(p => p.id === projectId);
    if (!target) return null;

    const cloned: ProjectProfile = {
      id: uuidv4(),
      name: newName || `${target.name} (Copy)`,
      variantLabel: target.variantLabel ? `${target.variantLabel}-variant` : 'variant',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      config: JSON.parse(JSON.stringify(target.config)),
    };

    const nextData: WorkspaceData = {
      ...this.data,
      activeProjectId: cloned.id,
      projects: [cloned, ...this.data.projects],
    };

    this.saveToStorage(nextData);
    return cloned;
  }

  public deleteProject(projectId: string): boolean {
    if (this.data.projects.length <= 1) return false; // Prevent deleting only project

    const filtered = this.data.projects.filter(p => p.id !== projectId);
    const newActiveId = this.data.activeProjectId === projectId ? filtered[0].id : this.data.activeProjectId;

    this.saveToStorage({
      ...this.data,
      activeProjectId: newActiveId,
      projects: filtered,
    });

    return true;
  }

  public saveCustomTemplate(name: string, description: string, config: ReadmeConfig): SavedTemplate {
    const template: SavedTemplate = {
      id: uuidv4(),
      name: name.trim() || 'My Custom Template',
      description: description.trim() || 'User created custom archetype',
      createdAt: Date.now(),
      config: JSON.parse(JSON.stringify(config)),
    };

    this.saveToStorage({
      ...this.data,
      savedTemplates: [template, ...this.data.savedTemplates],
    });

    return template;
  }

  public deleteCustomTemplate(templateId: string): void {
    this.saveToStorage({
      ...this.data,
      savedTemplates: this.data.savedTemplates.filter(t => t.id !== templateId),
    });
  }

  public recordExport(name: string, format: 'markdown' | 'svg' | 'json', byteSize: number): void {
    const record: ExportedAssetRecord = {
      id: uuidv4(),
      name,
      format,
      timestamp: Date.now(),
      byteSize,
    };

    this.saveToStorage({
      ...this.data,
      exportHistory: [record, ...this.data.exportHistory.slice(0, 49)],
    });
  }
}

// Singleton helper
let workspaceInstance: LocalWorkspace | null = null;

export function getWorkspace(): LocalWorkspace {
  if (!workspaceInstance) {
    workspaceInstance = new LocalWorkspace();
  }
  return workspaceInstance;
}
