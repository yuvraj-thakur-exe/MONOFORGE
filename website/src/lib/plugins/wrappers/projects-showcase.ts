import { Plugin, UserSettings } from '../types';

export interface ProjectEntry {
  title: string;
  description: string;
  url: string;
  repo?: string;
  tags?: string[];
  stars?: number;
}

export const projectsShowcasePlugin: Plugin = {
  id: 'projects-showcase',
  name: 'Flagship Projects Showcase',
  description: 'Showcase curated repositories, descriptions, tech stacks, and live demo links.',
  author: 'MonoForge',
  repository: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
  category: 'widgets',
  icon: 'folder',
  fields: [
    {
      name: 'layout',
      label: 'Display Layout',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Tactile Markdown Cards', value: 'cards' },
        { label: 'GitHub Repo Pin Embeds', value: 'pins' },
        { label: 'Clean Bullet List', value: 'list' },
      ],
      required: false,
    },
    {
      name: 'sectionTitle',
      label: 'Section Heading',
      type: 'text',
      defaultValue: '🚀 Featured Projects',
      placeholder: '🚀 Featured Projects',
      required: false,
    },
  ],
  defaultConfig: {
    layout: 'cards',
    sectionTitle: '🚀 Featured Projects',
    projects: [
      {
        title: 'QueryEngine',
        description: 'Ultra-fast vectorized query execution engine written in modern Rust.',
        url: 'https://github.com/octocat/QueryEngine',
        tags: ['Rust', 'SIMD', 'Distributed'],
      },
      {
        title: 'VectorStudio',
        description: 'Next-generation 60fps SVG animator and developer telemetry studio.',
        url: 'https://github.com/octocat/VectorStudio',
        tags: ['TypeScript', 'Next.js', 'Tailwind'],
      },
    ],
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const user = settings.user.github || 'octocat';
    const align = settings.align || 'left';
    const layout = (props.layout as string) || 'cards';
    const sectionTitle = (props.sectionTitle as string) || '🚀 Featured Projects';

    const rawProjects = Array.isArray(props.projects) ? (props.projects as ProjectEntry[]) : [];
    const projects: ProjectEntry[] = rawProjects.length > 0 ? rawProjects : [
      {
        title: 'QueryEngine',
        description: 'Ultra-fast vectorized query execution engine written in modern Rust.',
        url: `https://github.com/${user}/QueryEngine`,
        tags: ['Rust', 'Distributed Systems'],
      },
      {
        title: 'VectorStudio',
        description: 'Next-generation 60fps SVG animator and developer telemetry studio.',
        url: `https://github.com/${user}/VectorStudio`,
        tags: ['TypeScript', 'Next.js'],
      },
    ];

    const lines: string[] = [];
    lines.push(`## ${sectionTitle}\n`);

    if (layout === 'pins') {
      const pinCards = projects.map(p => {
        const repoName = p.repo || p.title.replace(/\s+/g, '-');
        return `[![${repoName}](https://github-readme-stats.vercel.app/api/pin/?username=${user}&repo=${repoName}&theme=tokyonight)](${p.url})`;
      });
      lines.push(`<div align="${align}">\n\n${pinCards.join('\n')}\n\n</div>`);
    } else if (layout === 'list') {
      for (const p of projects) {
        const tagStr = p.tags && p.tags.length > 0 ? ` \`(${p.tags.join(', ')})\`` : '';
        lines.push(`- **[${p.title}](${p.url})** - ${p.description}${tagStr}`);
      }
    } else {
      // Default: clean table/cards format
      lines.push('| Project | Description | Stack |');
      lines.push('| :--- | :--- | :--- |');
      for (const p of projects) {
        const tagBadges = (p.tags || []).map(t => `\`${t}\``).join(' ');
        lines.push(`| **[${p.title}](${p.url})** | ${p.description} | ${tagBadges || '`Open Source`'} |`);
      }
    }

    return lines.join('\n');
  },
};

