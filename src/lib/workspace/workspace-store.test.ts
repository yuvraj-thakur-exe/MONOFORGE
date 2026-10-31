import { describe, it, expect, beforeEach } from 'vitest';
import { LocalWorkspace } from './workspace-store';
import { ReadmeConfig } from '#/lib/plugins/types';

describe('LocalWorkspace Engine', () => {
  let ws: LocalWorkspace;

  beforeEach(() => {
    ws = new LocalWorkspace();
  });

  it('initializes with default primary project', () => {
    const data = ws.getData();
    expect(data.projects.length).toBeGreaterThanOrEqual(1);
    expect(ws.getActiveProject()).toBeDefined();
  });

  it('creates, switches, duplicates, and deletes profile projects', () => {
    const customConfig: ReadmeConfig = {
      version: '1.0.0',
      title: 'OSS Profile',
      settings: {
        user: { github: 'torvalds' },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [],
    };

    const newProject = ws.createProject('Linux Kernel Profile', customConfig, 'oss');
    expect(newProject.name).toBe('Linux Kernel Profile');
    expect(ws.getActiveProject().id).toBe(newProject.id);

    // Duplicate project
    const duplicated = ws.duplicateProject(newProject.id, 'Linux Kernel Variant B');
    expect(duplicated).toBeDefined();
    expect(duplicated?.name).toBe('Linux Kernel Variant B');
    expect(ws.getData().projects.length).toBeGreaterThanOrEqual(3);

    // Switch project
    const switched = ws.switchProject(newProject.id);
    expect(switched?.id).toBe(newProject.id);
    expect(ws.getActiveProject().id).toBe(newProject.id);

    // Delete project
    const deleted = ws.deleteProject(duplicated!.id);
    expect(deleted).toBe(true);
  });

  it('saves and deletes custom user templates', () => {
    const config: ReadmeConfig = {
      version: '1.0.0',
      title: 'Template',
      settings: {
        user: { github: 'alex' },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [],
    };

    const tpl = ws.saveCustomTemplate('Minimalist Dark', 'Clean typography template', config);
    expect(tpl.name).toBe('Minimalist Dark');
    expect(ws.getData().savedTemplates.length).toBe(1);

    ws.deleteCustomTemplate(tpl.id);
    expect(ws.getData().savedTemplates.length).toBe(0);
  });

  it('records export history entries', () => {
    ws.recordExport('README.md', 'markdown', 1420);
    const history = ws.getData().exportHistory;
    expect(history.length).toBe(1);
    expect(history[0].name).toBe('README.md');
    expect(history[0].byteSize).toBe(1420);
  });
});

