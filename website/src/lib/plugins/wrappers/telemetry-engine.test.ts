import { describe, it, expect } from 'vitest';
import { telemetryEnginePlugin } from './telemetry-engine';
import { UserSettings } from '../types';
import { ALL_VISUALIZATION_IDS } from '../../visualizations/registry';

const defaultSettings: UserSettings = {
  user: { github: 'octocat' },
  theme: 'dark',
  accentColor: '#f59e0b',
  badgeStyle: 'for-the-badge',
  align: 'center',
};

describe('Plugin: telemetry-engine', () => {
  it('has valid metadata and fields', () => {
    expect(telemetryEnginePlugin.id).toBe('telemetry-engine');
    expect(telemetryEnginePlugin.name).toBe('MonoForge Telemetry');
    expect(telemetryEnginePlugin.category).toBe('stats');
    expect(telemetryEnginePlugin.fields.length).toBeGreaterThan(5);
  });

  it('renders direct SVG markdown using absolute native endpoint', () => {
    const res = telemetryEnginePlugin.renderMarkdown(
      {
        username: 'monalisa',
        outputMode: 'direct_svg',
        isocalendar: true,
        languages: true,
      },
      defaultSettings
    ) as { markdown: string };

    expect(res.markdown).toContain('https://monoforge-studio.vercel.app/api/telemetry/svg?');
    expect(res.markdown).toContain('monalisa');
    expect(res.markdown).not.toContain('metrics.lecoq.io');
  });

  it('supports activeVizId and plugin across all 30 visualizations', () => {
    expect(ALL_VISUALIZATION_IDS).toHaveLength(30);
    for (const vizId of ALL_VISUALIZATION_IDS) {
      const res = telemetryEnginePlugin.renderMarkdown(
        {
          username: 'devuser',
          activeVizId: vizId,
          theme: 'emerald',
          isocalendar: true,
        },
        defaultSettings
      ) as { markdown: string };

      expect(res.markdown).toContain(
        `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${vizId}&user=devuser`
      );
      expect(res.markdown).toContain('theme=emerald');
    }

    const byPlugin = telemetryEnginePlugin.renderMarkdown(
      { username: 'devuser', plugin: 'year-clock' },
      defaultSettings
    ) as { markdown: string };
    expect(byPlugin.markdown).toContain('plugin=year-clock&user=devuser');
  });

  it('renders working action workflow YAML without monoforge/telemetry-action@v2', () => {
    const res = telemetryEnginePlugin.renderMarkdown(
      {
        username: 'octocat',
        outputMode: 'action',
        template: 'terminal',
      },
      defaultSettings
    ) as { markdown: string; workflows?: Record<string, string> };

    const workflow = res.workflows?.['monoforge-telemetry.yml'] || '';
    expect(res.markdown).toContain('monoforge-telemetry.svg');
    expect(workflow).toContain('name: MonoForge Telemetry');
    expect(workflow).toContain('filename: monoforge-telemetry.svg');
    expect(workflow).toContain('pnpm export:telemetry');
    expect(workflow).toContain('/api/telemetry/svg');
    expect(workflow).not.toContain('monoforge/telemetry-action@v2');
  });
});
