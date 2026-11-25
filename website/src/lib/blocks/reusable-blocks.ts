import { v4 as uuidv4 } from 'uuid';
import { SectionConfig } from '#/lib/plugins/types';

export type ReusableBlockType =
  | 'header'
  | 'bio'
  | 'socials'
  | 'skills'
  | 'tech-icons'
  | 'projects'
  | 'statistics'
  | 'contributions'
  | 'achievements'
  | 'custom-html'
  | 'footer';

export interface ReusableBlockDefinition {
  type: ReusableBlockType;
  pluginId: string;
  name: string;
  category: 'core' | 'identity' | 'showcase' | 'telemetry' | 'community';
  description: string;
  iconName: string;
  defaultProps: Record<string, unknown>;
  createSection: (userContext?: { github?: string; name?: string; role?: string }) => SectionConfig;
}

export const REUSABLE_BLOCKS: ReusableBlockDefinition[] = [
  // 1. Header Block
  {
    type: 'header',
    pluginId: 'readme-typing-svg',
    name: 'Dynamic Header & Typing Headline',
    category: 'core',
    description: 'Animated kinetic SVG typewriter banner with customizable titles and neon glow.',
    iconName: 'heading',
    defaultProps: {
      lines: ['Engineering resilient distributed systems', 'Crafting open-source developer tooling'],
      color: '#ffe600',
      size: 24,
    },
    createSection: (ctx) => ({
      id: uuidv4(),
      type: 'readme-typing-svg',
      visible: true,
      props: {
        styles: {},
        content: {
          lines: [
            `Hi, I'm ${ctx?.name || 'Developer'} 👋`,
            ctx?.role || 'Staff Software Engineer',
            'Building high-performance open-source tools',
          ],
          color: '#ffe600',
          size: 24,
        },
      },
    }),
  },

  // 2. Bio Block
  {
    type: 'bio',
    pluginId: 'mascot-bio',
    name: 'Developer Bio & Focus',
    category: 'identity',
    description: 'Personal mission statement, current focus, and developer location badges.',
    iconName: 'user',
    defaultProps: {
      mascot: 'cyber-bot',
      headline: "⚡ I'm a Digital Craftsman!",
      subtitle: 'Staff Software Engineer & Open-Source Architect',
      bio: 'Architecting resilient cloud-native infrastructures and developer productivity tools.',
      bullets:
        '🔭 Currently focusing on distributed consensus & WebAssembly runtimes\n🌱 Exploring high-throughput telemetry & type-safe tooling\n👨‍💻 Passionate open-source maintainer & mentor',
      showViewsBadge: true,
      viewsBadgeColor: '9333ea',
    },
    createSection: (ctx) => ({
      id: uuidv4(),
      type: 'mascot-bio',
      visible: true,
      props: {
        styles: {},
        content: {
          mascot: 'cyber-bot',
          headline: `⚡ Hi, I'm ${ctx?.name || 'Lead Architect'}!`,
          subtitle: ctx?.role || 'Staff Software Engineer & Open-Source Architect',
          bio: 'Passionate about distributed systems, type safety, and 60fps web interfaces.',
          bullets:
            '🔭 Zero-downtime deployments & telemetry\n🌱 Distributed consensus & WebAssembly runtimes\n👨‍💻 Open-source developer tooling',
          showViewsBadge: true,
          viewsBadgeColor: '9333ea',
        },
      },
    }),
  },

  // 3. Social Links Block
  {
    type: 'socials',
    pluginId: 'socials',
    name: 'Social Gateways & Connect Badges',
    category: 'identity',
    description: 'Curated links to GitHub, LinkedIn, Twitter/X, Discord, and personal portfolio.',
    iconName: 'share-2',
    defaultProps: {
      socials: {
        github: {
          message: 'GitHub',
          color: '181717',
          logo: 'github',
          logoColor: 'white',
          link: 'https://github.com/octocat',
        },
        linkedin: {
          message: 'LinkedIn',
          color: '0077B5',
          logo: 'linkedin',
          logoColor: 'white',
          link: 'https://linkedin.com/in/octocat',
        },
        twitter: {
          message: 'X',
          color: '000000',
          logo: 'x',
          logoColor: 'white',
          link: 'https://x.com/octocat',
        },
      },
    },
    createSection: (ctx) => {
      const handle = ctx?.github || 'octocat';
      return {
        id: uuidv4(),
        type: 'socials',
        visible: true,
        props: {
          styles: {},
          content: {
            socials: {
              github: {
                message: 'GitHub',
                color: '181717',
                logo: 'github',
                logoColor: 'white',
                link: `https://github.com/${handle}`,
              },
              linkedin: {
                message: 'LinkedIn',
                color: '0077B5',
                logo: 'linkedin',
                logoColor: 'white',
                link: `https://linkedin.com/in/${handle}`,
              },
              twitter: {
                message: 'X',
                color: '000000',
                logo: 'x',
                logoColor: 'white',
                link: `https://x.com/${handle}`,
              },
              gmail: {
                message: 'Email',
                color: 'D14836',
                logo: 'gmail',
                logoColor: 'white',
                link: `mailto:${handle}@example.com`,
              },
            },
          },
        },
      };
    },
  },

  // 4. Skills Block
  {
    type: 'skills',
    pluginId: 'markdown-badges',
    name: 'Categorized Skill Badges',
    category: 'showcase',
    description: 'Categorized shield badges covering frontend, backend, devops, and cloud.',
    iconName: 'award',
    defaultProps: {
      selectedBadges: ['typescript', 'rust', 'go', 'react', 'docker', 'kubernetes', 'postgres'],
      badgeStyle: 'for-the-badge',
    },
    createSection: () => ({
      id: uuidv4(),
      type: 'markdown-badges',
      visible: true,
      props: {
        styles: {},
        content: {
          selectedBadges: ['typescript', 'rust', 'go', 'react', 'docker', 'kubernetes', 'postgres', 'tailwind'],
          badgeStyle: 'for-the-badge',
        },
      },
    }),
  },

  // 5. Technology Icons Block
  {
    type: 'tech-icons',
    pluginId: 'skill-icons',
    name: 'Technology Icons Rack',
    category: 'showcase',
    description: 'Visually unified tech icon grid supporting 150+ frameworks and languages.',
    iconName: 'cpu',
    defaultProps: {
      icons: ['ts', 'react', 'nextjs', 'tailwind', 'rust', 'go', 'docker', 'k8s', 'aws', 'postgres'],
      theme: 'dark',
    },
    createSection: () => ({
      id: uuidv4(),
      type: 'skill-icons',
      visible: true,
      props: {
        styles: {},
        content: {
          icons: ['ts', 'react', 'nextjs', 'tailwind', 'rust', 'go', 'docker', 'k8s', 'aws', 'postgres'],
          theme: 'dark',
        },
      },
    }),
  },

  // 6. Projects Block
  {
    type: 'projects',
    pluginId: 'projects-showcase',
    name: 'Flagship Projects Showcase',
    category: 'showcase',
    description: 'Structured repository cards with problem statements, tech tags, and demo URLs.',
    iconName: 'folder',
    defaultProps: {
      layout: 'cards',
      sectionTitle: '🚀 Featured Open-Source Projects',
    },
    createSection: (ctx) => ({
      id: uuidv4(),
      type: 'projects-showcase',
      visible: true,
      props: {
        styles: {},
        content: {
          layout: 'cards',
          sectionTitle: '🚀 Featured Open-Source Projects',
          projects: [
            {
              title: 'VectorEngine',
              description: 'Zero-copy high-throughput telemetry aggregator built with Rust and WebSockets.',
              url: `https://github.com/${ctx?.github || 'octocat'}/VectorEngine`,
              tags: ['Rust', 'Telemetry', 'WASM'],
            },
            {
              title: 'MonoStudio',
              description: 'Next-gen profile creation platform with 60fps Camo-safe vector graphics.',
              url: `https://github.com/${ctx?.github || 'octocat'}/MonoStudio`,
              tags: ['TypeScript', 'Next.js', 'Tailwind'],
            },
          ],
        },
      },
    }),
  },

  // 7. Statistics Block
  {
    type: 'statistics',
    pluginId: 'github-readme-stats',
    name: 'GitHub Analytics & Streak Stats',
    category: 'telemetry',
    description: 'Aggregate star counts, commits, pull requests, and contribution grade cards.',
    iconName: 'bar-chart-2',
    defaultProps: {
      theme: 'tokyonight',
      show_icons: true,
    },
    createSection: (ctx) => ({
      id: uuidv4(),
      type: 'github-readme-stats',
      visible: true,
      props: {
        styles: {},
        content: {
          username: ctx?.github || 'octocat',
          theme: 'tokyonight',
          show_icons: true,
        },
      },
    }),
  },

  // 8. Contributions Block
  {
    type: 'contributions',
    pluginId: 'telemetry-isocalendar',
    name: '3D Isometric Commit Terrain',
    category: 'telemetry',
    description: 'Axonometric 3D commit voxel terrain showing streak momentum and commit elevation.',
    iconName: 'box',
    defaultProps: {
      span: 'full-year',
    },
    createSection: (ctx) => ({
      id: uuidv4(),
      type: 'telemetry-isocalendar',
      visible: true,
      props: {
        styles: {},
        content: {
          username: ctx?.github || 'octocat',
          span: 'full-year',
        },
      },
    }),
  },

  // 9. Achievements Block
  {
    type: 'achievements',
    pluginId: 'github-profile-trophy',
    name: 'Gamified Trophy Showcase',
    category: 'telemetry',
    description: 'Tiered Class S/A/B medals celebrating stars, streaks, and repository contributions.',
    iconName: 'trophy',
    defaultProps: {
      theme: 'onedark',
      column: 6,
    },
    createSection: (ctx) => ({
      id: uuidv4(),
      type: 'github-profile-trophy',
      visible: true,
      props: {
        styles: {},
        content: {
          username: ctx?.github || 'octocat',
          theme: 'onedark',
          column: 6,
        },
      },
    }),
  },

  // 10. Custom HTML Block
  {
    type: 'custom-html',
    pluginId: 'custom-html',
    name: 'Custom HTML / Markdown Section',
    category: 'core',
    description: 'Embed custom sanitized HTML, formatted callout boxes, or direct markdown notes.',
    iconName: 'code',
    defaultProps: {
      content: '<div align="center">\n  <h3>💡 Engineering Philosophy</h3>\n  <p>Simple code is resilient code. Measure twice, benchmark continuously.</p>\n</div>',
      align: 'left',
    },
    createSection: () => ({
      id: uuidv4(),
      type: 'custom-html',
      visible: true,
      props: {
        styles: {},
        content: {
          content: '<div align="center">\n  <h3>💡 Engineering Philosophy</h3>\n  <p>Simple code is resilient code. Measure twice, benchmark continuously.</p>\n</div>',
          align: 'left',
        },
      },
    }),
  },

  // 11. Footer Block
  {
    type: 'footer',
    pluginId: 'footer-block',
    name: 'Profile Concluding Footer',
    category: 'core',
    description: 'Back-to-top navigation link, closing developer quote, and open-source attribution.',
    iconName: 'layout',
    defaultProps: {
      tagline: 'Thanks for stopping by! Always open to interesting collaborations.',
      showBackToTop: true,
      showAttribution: true,
    },
    createSection: () => ({
      id: uuidv4(),
      type: 'footer-block',
      visible: true,
      props: {
        styles: {},
        content: {
          tagline: 'Thanks for stopping by! Always open to interesting collaborations and discussions.',
          showBackToTop: true,
          showAttribution: true,
        },
      },
    }),
  },
];

export function getReusableBlockByType(type: ReusableBlockType): ReusableBlockDefinition | undefined {
  return REUSABLE_BLOCKS.find((b) => b.type === type);
}
