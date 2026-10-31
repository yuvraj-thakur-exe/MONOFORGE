import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';

export const telemetryIsocalendarPlugin: Plugin = {
  id: 'telemetry-isocalendar',
  name: '3D Isometric Calendar',
  description: 'Axonometric 3D projection of commit history, streak counters, and elevation terrain.',
  author: 'MonoForge',
  repository: 'https://github.com/monoforge/MONOFORGE',
  category: 'stats',
  icon: 'calendar',
  fields: [
    {
      name: 'username',
      label: 'GitHub Username Override (Leave blank to use profile)',
      type: 'text',
      defaultValue: '',
      placeholder: 'e.g. octocat or leave blank',
      required: false,
    },
    {
      name: 'format',
      label: 'Contributor Activity Form',
      type: 'select',
      defaultValue: 'isocalendar',
      options: [
        { label: '3D Isometric Skyline Landscape', value: 'isocalendar' },
        { label: '2D Annual Contribution Heatmap', value: 'heatmap' },
        { label: 'Contributor Velocity & Momentum Radar', value: 'velocity' },
      ],
      required: false,
    },
    {
      name: 'duration',
      label: 'Isometric Horizon Duration',
      type: 'select',
      defaultValue: 'half-year',
      options: [
        { label: 'Half-Year (180 days)', value: 'half-year' },
        { label: 'Full-Year (365 days)', value: 'full-year' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    format: 'isocalendar',
    duration: 'half-year',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const effectiveUser = resolveEffectiveUsername(props, settings);
    const user = effectiveUser || 'octocat';
    const duration = props.duration === 'full-year' ? 'full-year' : 'half-year';
    const format = props.format === 'heatmap' ? 'heatmap' : props.format === 'velocity' ? 'velocity' : 'isocalendar';
    const url = `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${format}&user=${encodeURIComponent(user)}&duration=${duration}`;

    const title = format === 'heatmap' ? "Annual Contribution Heatmap" : format === 'velocity' ? "Contributor Velocity Radar" : "3D Isometric Calendar";

    return {
      markdown: `<div align="${settings.align || 'center'}">\n  <img src="${url}" alt="${user}'s ${title}" />\n</div>`,
    };
  },
};
