import { describe, it, expect } from 'vitest';
import { projectsShowcasePlugin } from './projects-showcase';
import { UserSettings } from '../types';

describe('projectsShowcasePlugin', () => {
  const dummySettings: UserSettings = {
    user: { github: 'octocat' },
    theme: 'dark',
    accentColor: '#8b5cf6',
    badgeStyle: 'for-the-badge',
    align: 'left',
  };

  it('renders markdown table cards layout by default', () => {
    const result = projectsShowcasePlugin.renderMarkdown({}, dummySettings);
    expect(typeof result).toBe('string');
    expect(result).toContain('## 🚀 Featured Projects');
    expect(result).toContain('| Project | Description | Stack |');
    expect(result).toContain('QueryEngine');
  });

  it('renders repo pins when layout is pins', () => {
    const result = projectsShowcasePlugin.renderMarkdown({ layout: 'pins' }, dummySettings);
    expect(typeof result).toBe('string');
    expect(result).toContain('github-readme-stats.vercel.app/api/pin');
  });

  it('renders clean bullet list when layout is list', () => {
    const result = projectsShowcasePlugin.renderMarkdown({ layout: 'list' }, dummySettings);
    expect(typeof result).toBe('string');
    expect(result).toContain('- **[QueryEngine]');
  });
});

