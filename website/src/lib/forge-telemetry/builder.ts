import { ForgeTelemetryConfig } from './types';
import { ALL_VISUALIZATION_IDS } from '../visualizations/registry';
import { VISUALIZATION_THEMES } from '../visualizations/themes';

export const DEFAULT_TELEMETRY_BASE_URL = 'https://monoforge-studio.vercel.app';

export interface TelemetryBuilderConfig extends ForgeTelemetryConfig {
  activeVizId?: string;
  plugin?: string;
  viz?: string;
  theme?: string;
}

const NORMALIZED_VIZ_MAP = new Map<string, string>(
  ALL_VISUALIZATION_IDS.map((id) => [id.replace(/[-_]/g, '').toLowerCase(), id])
);

const EXPORTED_TELEMETRY_ASSET_MAP: Record<string, string> = {
  isocalendar: 'website/public/assets/telemetry-isocalendar-3d.svg',
  languages: 'website/public/assets/telemetry-languages-donut.svg',
  habits: 'website/public/assets/telemetry-habits-radar.svg',
  achievements: 'website/public/assets/telemetry-achievements-rack.svg',
  terminal: 'website/public/assets/telemetry-terminal-hud.svg',
  pagespeed: 'website/public/assets/telemetry-pagespeed-audit.svg',
  music: 'website/public/assets/telemetry-music-player.svg',
  leetcode: 'website/public/assets/telemetry-leetcode-stats.svg',
};

function sanitizeWorkflowSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').replace(/"/g, '\\"').trim();
}

export function resolveTelemetryPlugin(config: TelemetryBuilderConfig): string {
  const rawRequested =
    (typeof config.activeVizId === 'string' && config.activeVizId.trim()) ||
    (typeof config.plugin === 'string' && config.plugin.trim()) ||
    (typeof config.viz === 'string' && config.viz.trim()) ||
    '';

  const lowered = rawRequested.toLowerCase();
  if (lowered && lowered !== 'full' && lowered !== 'all') {
    const normalized = lowered.replace(/[-_]/g, '');
    return NORMALIZED_VIZ_MAP.get(normalized) ?? lowered;
  }

  if (config.customPlugins) {
    for (const customKey of Object.keys(config.customPlugins)) {
      const cleanCustom = customKey.trim().toLowerCase();
      if (!cleanCustom) continue;
      const normalized = cleanCustom.replace(/[-_]/g, '');
      return NORMALIZED_VIZ_MAP.get(normalized) ?? cleanCustom;
    }
  }

  if (config.isocalendar?.enabled) return 'isocalendar';
  if (config.languages?.enabled) return 'languages';
  if (config.habits?.enabled) return 'habits';
  if (config.achievements?.enabled) return 'achievements';
  if (config.leetcode?.enabled) return 'leetcode';
  return 'isocalendar';
}

/**
 * Builds the GitHub Action workflow YAML for MonoForge Telemetry engine.
 */
export function buildTelemetryActionWorkflow(config: TelemetryBuilderConfig): string {
  const username = config.username || '${{ github.repository_owner }}';
  const template = config.template || 'classic';
  const timezone = config.timezone || 'UTC';
  const commitMsg = sanitizeWorkflowSingleLine(
    config.commitMessage || 'Update MonoForge profile telemetry'
  );
  const resolvedPlugin = resolveTelemetryPlugin(config);

  const inputs: string[] = [
    `filename: monoforge-telemetry.svg`,
    `user: ${username === '${{ github.repository_owner }}' ? '${{ github.repository_owner }}' : username}`,
    `template: ${template}`,
    `plugin: ${resolvedPlugin}`,
    `config_timezone: ${timezone}`,
    `committer_message: "${commitMsg}"`,
  ];

  // Base configuration
  if (config.base) {
    const parts: string[] = [];
    if (config.base.header !== false) parts.push('header');
    if (config.base.activity !== false) parts.push('activity');
    if (config.base.community !== false) parts.push('community');
    if (config.base.repositories !== false) parts.push('repositories');
    if (config.base.metadata !== false) parts.push('metadata');
    inputs.push(`base: ${parts.join(', ')}`);
  }

  // Isocalendar
  if (config.isocalendar?.enabled) {
    inputs.push('plugin_isocalendar: yes');
    inputs.push(`plugin_isocalendar_duration: ${config.isocalendar.duration || 'half-year'}`);
  }

  // Languages
  if (config.languages?.enabled) {
    inputs.push('plugin_languages: yes');
    inputs.push(`plugin_languages_limit: ${config.languages.limit || 8}`);
    if (config.languages.ignored?.length) {
      inputs.push(`plugin_languages_ignored: ${config.languages.ignored.join(', ')}`);
    }
    if (config.languages.sections?.length) {
      inputs.push(`plugin_languages_sections: ${config.languages.sections.join(', ')}`);
    }
    if (config.languages.indepth) {
      inputs.push('plugin_languages_indepth: yes');
    }
  }

  // Habits
  if (config.habits?.enabled) {
    inputs.push('plugin_habits: yes');
    inputs.push(`plugin_habits_from: ${config.habits.from || 200}`);
    inputs.push(`plugin_habits_days: ${config.habits.days || 14}`);
    inputs.push(`plugin_habits_facts: ${config.habits.facts !== false ? 'yes' : 'no'}`);
    inputs.push(`plugin_habits_charts: ${config.habits.charts !== false ? 'yes' : 'no'}`);
  }

  // Achievements
  if (config.achievements?.enabled) {
    inputs.push('plugin_achievements: yes');
    inputs.push(`plugin_achievements_threshold: ${config.achievements.threshold || 'B'}`);
    inputs.push(`plugin_achievements_secrets: ${config.achievements.secrets ? 'yes' : 'no'}`);
    inputs.push(`plugin_achievements_display: ${config.achievements.display || 'compact'}`);
    if (config.achievements.limit) {
      inputs.push(`plugin_achievements_limit: ${config.achievements.limit}`);
    }
  }

  // LeetCode
  if (config.leetcode?.enabled) {
    inputs.push('plugin_leetcode: yes');
    if (config.leetcode.user) {
      inputs.push(`plugin_leetcode_user: ${config.leetcode.user}`);
    }
    if (config.leetcode.sections?.length) {
      inputs.push(`plugin_leetcode_sections: ${config.leetcode.sections.join(', ')}`);
    }
  }

  // Topics
  if (config.topics?.enabled) {
    inputs.push('plugin_topics: yes');
    inputs.push(`plugin_topics_mode: ${config.topics.mode || 'starred'}`);
    inputs.push(`plugin_topics_sort: ${config.topics.sort || 'stars'}`);
    inputs.push(`plugin_topics_limit: ${config.topics.limit || 15}`);
  }

  // WakaTime
  if (config.wakatime?.enabled) {
    inputs.push('plugin_wakatime: yes');
    inputs.push(`plugin_wakatime_days: ${config.wakatime.days || 7}`);
    inputs.push('plugin_wakatime_token: ${{ secrets.WAKATIME_TOKEN }}');
  }

  // Custom extra plugins
  if (config.customPlugins) {
    for (const [pluginName, pluginOpts] of Object.entries(config.customPlugins)) {
      inputs.push(`plugin_${pluginName}: yes`);
      for (const [optKey, optVal] of Object.entries(pluginOpts)) {
        inputs.push(`plugin_${pluginName}_${optKey}: ${String(optVal)}`);
      }
    }
  }

  const embedBaseParams = new URLSearchParams();
  embedBaseParams.set('plugin', resolvedPlugin);
  if (template !== 'classic') {
    embedBaseParams.set('template', template);
  }
  if (config.theme && config.theme in VISUALIZATION_THEMES) {
    embedBaseParams.set('theme', config.theme);
  }
  const embedBaseUrl = `${DEFAULT_TELEMETRY_BASE_URL}/api/telemetry/svg?${embedBaseParams.toString()}`;
  const localAssetPath = EXPORTED_TELEMETRY_ASSET_MAP[resolvedPlugin] || '';
  const commentedConfig = inputs.map((line) => `        # ${line}`).join('\n');

  return `name: MonoForge Telemetry
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches:
      - master
      - main

jobs:
  monoforge-telemetry:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          token: \${{ secrets.TELEMETRY_TOKEN || github.token }}

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Generate MonoForge Telemetry SVG
${commentedConfig}
        env:
          GITHUB_TOKEN: \${{ secrets.TELEMETRY_TOKEN || github.token }}
          GITHUB_USER: ${username}
          TELEMETRY_FILENAME: monoforge-telemetry.svg
          TELEMETRY_BASE_URL: "${embedBaseUrl}"
          LOCAL_EXPORTED_ASSET: "${localAssetPath}"
        run: |
          if [ -f "package.json" ] && grep -q '"export:telemetry"' package.json && [ -n "$LOCAL_EXPORTED_ASSET" ]; then
            corepack enable
            pnpm install --frozen-lockfile
            pnpm export:telemetry
            cp "$LOCAL_EXPORTED_ASSET" "$TELEMETRY_FILENAME"
          else
            curl -fsSL "$TELEMETRY_BASE_URL&user=$GITHUB_USER" -o "$TELEMETRY_FILENAME"
          fi

      - name: Commit Telemetry SVG (only if changed)
        env:
          COMMIT_MESSAGE: "${commitMsg}"
          TELEMETRY_FILENAME: monoforge-telemetry.svg
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add "$TELEMETRY_FILENAME"
          git diff --quiet --cached || git commit -m "$COMMIT_MESSAGE"
          git push || true
`;
}

/**
 * Builds the direct image URL for MonoForge native telemetry (zero external dependencies).
 */
export function buildTelemetryEmbedUrl(
  config: TelemetryBuilderConfig,
  baseUrl = DEFAULT_TELEMETRY_BASE_URL
): string {
  const effectiveBase = (baseUrl && baseUrl.trim() ? baseUrl.trim() : DEFAULT_TELEMETRY_BASE_URL).replace(
    /\/+$/,
    ''
  );
  const username = config.username?.trim() || 'octocat';
  const resolvedPlugin = resolveTelemetryPlugin(config);
  const params = new URLSearchParams();

  params.set('plugin', resolvedPlugin);
  params.set('user', username);

  if (config.template && config.template !== 'classic') {
    params.set('template', config.template);
  }

  if (config.theme && config.theme in VISUALIZATION_THEMES) {
    params.set('theme', config.theme);
  }

  return `${effectiveBase}/api/telemetry/svg?${params.toString()}`;
}

/**
 * Builds the embed markdown for README profiles (100% self-hosted).
 */
export function buildTelemetryMarkdownSnippet(
  config: TelemetryBuilderConfig,
  align: 'left' | 'center' | 'right' = 'center'
): string {
  const user = config.username?.trim() || 'octocat';
  const isAction = config.outputMode === 'action';

  const src = isAction ? 'monoforge-telemetry.svg' : buildTelemetryEmbedUrl(config);

  return `<div align="${align}">
  <img src="${src}" alt="${user}'s MonoForge Telemetry" />
</div>`;
}
