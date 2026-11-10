import { TemplateItem } from './catalog';

export const SHOWCASE_30_TEMPLATES: TemplateItem[] = [
  // 01. Minimal Professional
  {
    id: '01-minimal-professional',
    name: 'Minimal Professional',
    description: 'A clean, minimal and professional GitHub profile README with stats, clean typography and heatmap.',
    category: 'Minimal',
    accent: '#3b82f6',
    tags: ['minimal', 'clean', 'professional', 'light', 'engineering'],
    visualStyle: 'minimal',
    developerType: 'Software Engineer',
    difficulty: 'beginner',
    popularity: 99,
    featured: true,
    prompt: 'Create a sophisticated, minimal GitHub profile for a professional software engineer. Use charcoal typography, subtle grey dividers, compact introduction, clean skill badges, featured project cards, GitHub statistics, and a contribution heatmap. Prioritize spacing and readability.',
    config: {
      version: '1.0.0',
      title: 'Minimal Professional Profile',
      settings: {
        user: {
          github: 'alex-demo',
          name: 'Alex Morgan',
          role: 'Software Developer',
          bio: 'Building reliable systems with TypeScript, Go and distributed cloud architectures.',
          location: 'San Francisco, CA',
          pronouns: 'they/them',
          status: 'Shipping clean open source',
        },
        theme: 'light',
        accentColor: '#3b82f6',
        badgeStyle: 'flat',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-01-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['ts', 'go', 'react', 'nextjs', 'docker', 'postgres'], theme: 'light' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-01-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'default', includeAllCommits: true, rank: 'A+' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-01-activity',
          type: 'activity-graph',
          props: {
            content: { theme: 'github-light', area: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 02. Neon Cyberpunk
  {
    id: '02-neon-cyberpunk',
    name: 'Neon Cyberpunk',
    description: 'A cyberpunk themed profile with neon glow, retro terminal, high-voltage accents and hacker vibe.',
    category: 'Cyberpunk',
    accent: '#ec4899',
    tags: ['cyberpunk', 'neon', 'dark', 'retro', 'terminal'],
    visualStyle: 'dark',
    developerType: 'Full-Stack Developer',
    difficulty: 'intermediate',
    popularity: 98,
    featured: true,
    prompt: 'Create a futuristic cyberpunk developer profile. Use black and deep purple visual assets, electric magenta and cyan accents, futuristic typography, neon city-inspired banner artwork, contribution snake, and radical GitHub telemetry widgets.',
    config: {
      version: '1.0.0',
      title: 'Neon Cyberpunk Profile',
      settings: {
        user: {
          github: 'kai-cyber',
          name: 'Kai_',
          role: 'Full-Stack Cyber Glitcher',
          bio: 'Synthesizing WebGL shaders, distributed algorithms, and high-frequency real-time web engines.',
          location: 'Neo-Tokyo',
          pronouns: 'he/him',
          status: 'Compiling Rust into WebAssembly',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-02-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: '> HELLO, I\'M KAI_ // CYBER_DEV', color: 'ec4899', style: 'waving', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-02-snake',
          type: 'snk',
          props: {
            content: { colorDots: '#222,#ec4899,#06b6d4,#f43f5e,#a855f7' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-02-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'tokyonight', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 03. Bento Dashboard
  {
    id: '03-bento-dashboard',
    name: 'Bento Dashboard',
    description: 'A modern bento-style GitHub README with balanced cards, tech stack, and telemetry metrics.',
    category: 'Dashboard',
    accent: '#6366f1',
    tags: ['bento', 'dashboard', 'modern', 'telemetry', 'grid'],
    visualStyle: 'data',
    developerType: 'Product Engineer',
    difficulty: 'intermediate',
    popularity: 97,
    featured: true,
    prompt: 'Create a modern bento-grid GitHub profile inspired by premium developer dashboards. Organize the profile into visually balanced content blocks: introduction, technologies, projects, GitHub statistics, contribution activity, and social links.',
    config: {
      version: '1.0.0',
      title: 'Bento Dashboard Profile',
      settings: {
        user: {
          github: 'aria-code',
          name: 'Aria Chen',
          role: 'Staff Product Engineer',
          bio: 'Building useful things with code. Passionate about UI micro-interactions, accessibility, and high-velocity frontend engineering.',
          location: 'Toronto, Canada',
          pronouns: 'she/her',
          status: 'Designing cohesive design systems',
        },
        theme: 'dark',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-03-telemetry',
          type: 'telemetry-engine',
          props: {
            content: { engineType: 'radar', period: 'monthly' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-03-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'radical', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-03-pie',
          type: 'pie-chart',
          props: {
            content: { languages: ['TypeScript', 'Rust', 'Python', 'Tailwind'] },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 04. Glassmorphism / Glass-inspired Developer
  {
    id: '04-glassmorphism',
    name: 'Glassmorphism',
    description: 'An elegant glass-inspired developer profile with translucent aesthetic, soft glow and modern layout.',
    category: 'Modern',
    accent: '#8b5cf6',
    tags: ['glass', 'gradient', 'modern', 'aesthetic'],
    visualStyle: 'colorful',
    developerType: 'Creative Technologist',
    difficulty: 'intermediate',
    popularity: 96,
    featured: true,
    prompt: 'Create an elegant glass-inspired developer profile using translucent-looking visual cards in the banner and supporting SVG artwork. Use soft blue, purple, and white gradients in images, subtle light effects, and spacious typography.',
    config: {
      version: '1.0.0',
      title: 'Glassmorphism Profile',
      settings: {
        user: {
          github: 'nova-dev',
          name: 'Nova Starlight',
          role: 'Developer • Designer • Creator',
          bio: 'Crafting translucent digital interfaces, 3D web experiences, and scalable design systems.',
          location: 'Stockholm, Sweden',
          pronouns: 'they/them',
          status: 'Exploring WebGPU shaders',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-04-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'HEY, I\'M NOVA // CREATIVE TECH', color: '8b5cf6', style: 'soft', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-04-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'synthwave', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 05. Dark Developer
  {
    id: '05-dark-developer',
    name: 'Dark Developer',
    description: 'A dark themed developer profile with graphite aesthetics, terminal cards, and GitHub stats.',
    category: 'Dark',
    accent: '#10b981',
    tags: ['dark', 'graphite', 'terminal', 'developer'],
    visualStyle: 'dark',
    developerType: 'Full-Stack Developer',
    difficulty: 'beginner',
    popularity: 95,
    featured: true,
    prompt: 'Create a premium dark developer profile with a black and graphite visual identity. Use a clean terminal-inspired hero, readable white typography, carefully selected technology badges, featured projects, GitHub statistics, and a contribution heatmap.',
    config: {
      version: '1.0.0',
      title: 'Dark Developer Profile',
      settings: {
        user: {
          github: 'dev-matrix',
          name: 'Devon Black',
          role: 'Full-Stack Systems Engineer',
          bio: 'Designing high-throughput microservices, Linux kernel modules, and low-latency APIs.',
          location: 'Berlin, Germany',
          pronouns: 'he/him',
          status: 'Building with Go & PostgreSQL',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'flat-square',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-05-typing',
          type: 'readme-typing-svg',
          props: {
            content: { lines: ['Full-Stack Systems Engineer', 'Go & Rust Concurrency', 'Kubernetes & Linux Kernel'] },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-05-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'dark', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-05-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['go', 'rust', 'c', 'linux', 'docker', 'postgres'], theme: 'dark' },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 06. Anime Aesthetic
  {
    id: '06-anime-aesthetic',
    name: 'Anime Aesthetic',
    description: 'An anime-inspired GitHub profile with custom vector art, pastel sunset tones, and moodboard.',
    category: 'Anime',
    accent: '#f472b6',
    tags: ['anime', 'aesthetic', 'pastel', 'illustration'],
    visualStyle: 'colorful',
    developerType: 'Frontend Developer',
    difficulty: 'intermediate',
    popularity: 94,
    featured: true,
    prompt: 'Create an anime-inspired developer profile with original anime-style banner artwork, beautiful pastel lighting, expressive visual composition, and a distinctive developer identity. Include a short introduction, technology badges, favorite projects, GitHub activity, and social links.',
    config: {
      version: '1.0.0',
      title: 'Anime Aesthetic Profile',
      settings: {
        user: {
          github: 'koharu-dev',
          name: 'Koharu',
          role: 'Frontend Artisan & Anime Lover',
          bio: 'Bringing whimsical anime visuals and smooth 60fps animations into modern web applications.',
          location: 'Kyoto, Japan',
          pronouns: 'she/her',
          status: 'Listening to lofi hip hop while coding',
        },
        theme: 'dark',
        accentColor: '#f472b6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-06-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'KOHARU // FRONTEND ARTISAN', color: 'f472b6', style: 'waving', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-06-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'dracula', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 07. Space Explorer
  {
    id: '07-space-explorer',
    name: 'Space Explorer',
    description: 'A space exploration themed profile with astronaut, galaxy background, cosmic orbital charts and telemetry.',
    category: 'Sci-Fi',
    accent: '#38bdf8',
    tags: ['space', 'galaxy', 'astronaut', 'cosmos'],
    visualStyle: 'dark',
    developerType: 'Systems Engineer',
    difficulty: 'intermediate',
    popularity: 93,
    featured: true,
    prompt: 'Create a space explorer developer profile with an astronaut-themed hero banner, deep-space visuals, stars, planets, and futuristic typography. Organize the README into an introduction, developer mission, technology stack, featured projects, GitHub statistics, and contribution activity.',
    config: {
      version: '1.0.0',
      title: 'Space Explorer Profile',
      settings: {
        user: {
          github: 'orion-astro',
          name: 'Orion Vance',
          role: 'Space Systems & Embedded Engineer',
          bio: 'Calculating orbital trajectories, telemetry downlinks, and fault-tolerant satellite firmware.',
          location: 'Houston, TX',
          pronouns: 'he/him',
          status: 'Simulating deep space telemetry',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-07-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'ORION VANCE // ORBITAL SYSTEMS', color: '38bdf8', style: 'geometric', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-07-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'algolia', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 08. Nature & Calm
  {
    id: '08-nature-calm',
    name: 'Nature & Calm',
    description: 'A nature-inspired GitHub profile with forest illustration, organic shapes, and calm green tones.',
    category: 'Nature',
    accent: '#22c55e',
    tags: ['nature', 'forest', 'calm', 'organic', 'green'],
    visualStyle: 'colorful',
    developerType: 'Open Source Crafter',
    difficulty: 'beginner',
    popularity: 92,
    featured: true,
    prompt: 'Create a peaceful nature-inspired developer profile with forest or mountain banner artwork. Use organic shapes, gentle colors, balanced typography, and a calm layout. Present the developer introduction, skills, projects, GitHub activity, and contact information.',
    config: {
      version: '1.0.0',
      title: 'Nature & Calm Profile',
      settings: {
        user: {
          github: 'leaf-nature',
          name: 'Leaf Greenfield',
          role: 'Developer & Nature Lover',
          bio: 'Writing serene, resilient software from a solar-powered cabin in the Pacific Northwest.',
          location: 'Oregon, USA',
          pronouns: 'they/them',
          status: 'Planting trees & maintaining OSS',
        },
        theme: 'light',
        accentColor: '#22c55e',
        badgeStyle: 'flat',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-08-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'gruvbox', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-08-activity',
          type: 'activity-graph',
          props: {
            content: { theme: 'github-compact', area: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 09. Retro Terminal
  {
    id: '09-retro-terminal',
    name: 'Retro Terminal',
    description: 'A retro terminal style profile with ASCII art, command prompt, phosphor green glow and dev info.',
    category: 'Terminal',
    accent: '#22c55e',
    tags: ['terminal', 'retro', 'ascii', 'cli', 'monospace'],
    visualStyle: 'terminal',
    developerType: 'DevOps / Linux Engineer',
    difficulty: 'advanced',
    popularity: 95,
    featured: true,
    prompt: 'Create a retro command-line developer profile inspired by classic computer terminals. Use a black visual background, green monospace typography, ASCII-inspired decorative artwork, and a terminal-style introduction.',
    config: {
      version: '1.0.0',
      title: 'Retro Terminal Profile',
      settings: {
        user: {
          github: 'retro-dev',
          name: 'Terminal 1984',
          role: 'Linux Kernel & Shell Artisan',
          bio: '> whoami\n> dev\n> role: Software Developer\n> focus: Open Source, Tools, AI',
          location: '127.0.0.1',
          pronouns: 'sys/root',
          status: 'vim /etc/profile',
        },
        theme: 'dark',
        accentColor: '#22c55e',
        badgeStyle: 'flat-square',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-09-typing',
          type: 'readme-typing-svg',
          props: {
            content: { lines: ['> whoami', '> dev', '> role: Software Developer', '> focus: Open Source, Tools, AI'] },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-09-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'dark', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 10. Apple-Like Clean / Editorial Minimal
  {
    id: '10-apple-like-clean',
    name: 'Apple-Like Clean',
    description: 'A clean, Apple-inspired GitHub README with minimal design, elegant layout, and generous whitespace.',
    category: 'Minimal',
    accent: '#64748b',
    tags: ['apple', 'clean', 'editorial', 'minimal', 'typography'],
    visualStyle: 'minimal',
    developerType: 'Staff Software Architect',
    difficulty: 'beginner',
    popularity: 97,
    featured: true,
    prompt: 'Create an editorial-style developer profile inspired by premium product design and modern digital publications. Use large typography in the hero image, precise alignment, generous whitespace, understated icons, and a disciplined layout.',
    config: {
      version: '1.0.0',
      title: 'Editorial Clean Profile',
      settings: {
        user: {
          github: 'indigo-arch',
          name: 'Indigo Sterling',
          role: 'Staff Software Engineer',
          bio: 'Refining developer toolchains and designing deterministic software architectures with relentless attention to detail.',
          location: 'Cupertino, CA',
          pronouns: 'he/him',
          status: 'Designing frictionless developer tools',
        },
        theme: 'light',
        accentColor: '#64748b',
        badgeStyle: 'flat',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-10-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'default', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 11. Windows Fluent / Fluent Blue
  {
    id: '11-windows-fluent',
    name: 'Windows Fluent',
    description: 'A Windows Fluent design inspired profile with modern glass cards and soft azure gradients.',
    category: 'Modern',
    accent: '#0284c7',
    tags: ['fluent', 'windows', 'azure', 'modern', 'blue'],
    visualStyle: 'colorful',
    developerType: 'Cloud & Full-Stack Developer',
    difficulty: 'intermediate',
    popularity: 91,
    featured: true,
    prompt: 'Create a modern blue developer profile inspired by contemporary operating-system design. Use soft blue gradient artwork, fluid abstract shapes, clean typography, and organized content sections.',
    config: {
      version: '1.0.0',
      title: 'Windows Fluent Profile',
      settings: {
        user: {
          github: 'pixel-fluent',
          name: 'Pixel Vance',
          role: 'Full-Stack & Cloud Engineer',
          bio: 'Developing enterprise cloud platforms, cross-platform apps, and accessible user experiences.',
          location: 'Seattle, WA',
          pronouns: 'he/him',
          status: 'Architecting Azure & TypeScript microservices',
        },
        theme: 'light',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-11-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['cs', 'dotnet', 'azure', 'ts', 'react'], theme: 'light' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-11-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'nord', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 12. Matrix Hacker
  {
    id: '12-matrix-hacker',
    name: 'Matrix Hacker',
    description: 'A Matrix-inspired hacker profile with digital rain, green glow, terminal stats and cybersecurity cards.',
    category: 'Security',
    accent: '#10b981',
    tags: ['matrix', 'hacker', 'security', 'cyber', 'green'],
    visualStyle: 'terminal',
    developerType: 'Security Researcher',
    difficulty: 'advanced',
    popularity: 96,
    featured: true,
    prompt: 'Create a Matrix-inspired cybersecurity profile with original digital rain artwork, black and green visual elements, terminal-style typography, and a technical atmosphere.',
    config: {
      version: '1.0.0',
      title: 'Matrix Hacker Profile',
      settings: {
        user: {
          github: 'neo-cipher',
          name: 'Neo Cipher',
          role: 'Security Researcher & Penetration Tester',
          bio: 'Analyzing binary vulnerabilities, reverse-engineering malware payloads, and securing zero-trust networks.',
          location: 'Zion // Matrix',
          pronouns: 'they/them',
          status: 'Following the white rabbit',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'flat-square',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-12-typing',
          type: 'readme-typing-svg',
          props: {
            content: { lines: ['> WAKE UP, NEO...', '> THE MATRIX HAS YOU...', '> FOLLOW THE WHITE RABBIT.'] },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-12-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'matrix', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 13. AI & Machine Learning
  {
    id: '13-ai-machine-learning',
    name: 'AI & Machine Learning',
    description: 'An AI/ML focused profile with neural network visuals, tech badges, and reasoning telemetry.',
    category: 'AI & ML',
    accent: '#8b5cf6',
    tags: ['ai', 'ml', 'neural', 'pytorch', 'python'],
    visualStyle: 'data',
    developerType: 'AI / ML Engineer',
    difficulty: 'intermediate',
    popularity: 98,
    featured: true,
    prompt: 'Create a profile for an AI engineer or machine learning researcher. Use neural network artwork, abstract brain visuals, data-flow graphics, clean scientific typography, and an organized technical layout.',
    config: {
      version: '1.0.0',
      title: 'AI & ML Engineer Profile',
      settings: {
        user: {
          github: 'aari-ai',
          name: 'Aari Thorne',
          role: 'AI / ML Research Engineer',
          bio: 'Training foundational reasoning models, multi-agent frameworks, and high-performance vector retrieval architectures.',
          location: 'Boston, MA',
          pronouns: 'she/her',
          status: 'Fine-tuning LLM agent swarms',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-13-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'AARI THORNE // AUTONOMOUS AI & NEURAL SYSTEMS', color: '8b5cf6', style: 'geometric', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-13-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['py', 'pytorch', 'tensorflow', 'cuda', 'docker'], theme: 'dark' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-13-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'tokyonight', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 14. 3D Isometric Workspace
  {
    id: '14-3d-isometric',
    name: '3D Isometric',
    description: 'A 3D isometric style profile with a developer desk setup, isometric skyline, and project stats.',
    category: '3D',
    accent: '#6366f1',
    tags: ['3d', 'isometric', 'desk', 'workspace', 'purple'],
    visualStyle: '3d',
    developerType: 'Full-Stack Developer',
    difficulty: 'advanced',
    popularity: 96,
    featured: true,
    prompt: 'Create a 3D isometric developer profile featuring an illustration of a futuristic coding workspace with a monitor, keyboard, desk, and developer tools. Use isometric artwork and clean Markdown sections.',
    config: {
      version: '1.0.0',
      title: '3D Isometric Profile',
      settings: {
        user: {
          github: 'vox-dev',
          name: 'Vox Sterling',
          role: 'Full-Stack 3D Web Architect',
          bio: 'Architecting Three.js graphics, isometric data worlds, and full-stack cloud applications.',
          location: 'Austin, TX',
          pronouns: 'he/him',
          status: 'Rendering WebGL commit cities',
        },
        theme: 'dark',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-14-3d',
          type: 'portfolio-contributions',
          props: {
            content: { theme: 'classic' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-14-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'radical', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 15. Gaming Developer
  {
    id: '15-gaming-theme',
    name: 'Gaming Theme',
    description: 'A gamer themed GitHub profile with pixel elements, game HUD UI, HP hearts and quest stats.',
    category: 'Gaming',
    accent: '#ef4444',
    tags: ['gaming', 'hud', 'controller', 'retro', 'hearts'],
    visualStyle: 'colorful',
    developerType: 'Game Developer',
    difficulty: 'intermediate',
    popularity: 94,
    featured: true,
    prompt: 'Create a gaming-inspired developer profile with a gaming HUD banner, game controller artwork, pixel accents, level-inspired section labels, and a bold project showcase.',
    config: {
      version: '1.0.0',
      title: 'Gaming Theme Profile',
      settings: {
        user: {
          github: 'gamedev-quest',
          name: 'GameDev Arthur',
          role: 'Game Developer & Engine Crafter',
          bio: 'Level 99 Indie Game Architect. Building physics engines in C++ and immersive worlds in Unreal Engine 5.',
          location: 'Montreal, Canada',
          pronouns: 'he/him',
          status: 'Compiling custom voxel shader',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-15-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'PLAYER 1 // READY // LEVEL 99 GAMEDEV', color: 'ef4444', style: 'waving', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-15-trophies',
          type: 'github-profile-trophy',
          props: {
            content: { theme: 'dracula', column: 4 },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 16. Travel & Explorer
  {
    id: '16-travel-explorer',
    name: 'Travel & Explorer',
    description: 'A travel inspired profile with mountains, wanderlust topography, map elements and a developer identity.',
    category: 'Lifestyle',
    accent: '#f97316',
    tags: ['travel', 'mountains', 'nomad', 'orange', 'landscape'],
    visualStyle: 'colorful',
    developerType: 'Remote Engineer',
    difficulty: 'beginner',
    popularity: 91,
    featured: true,
    prompt: 'Create a travel-themed profile for a developer who loves exploring the world. Use mountain, landscape, map, and travel-inspired banner artwork with personal introduction and toolkit.',
    config: {
      version: '1.0.0',
      title: 'Travel & Explorer Profile',
      settings: {
        user: {
          github: 'trek-nomad',
          name: 'Trek Wilder',
          role: 'Developer • Traveler • Photographer',
          bio: 'Digital nomad writing scalable TypeScript from mountain summits and coastal cafes around the globe.',
          location: 'Nomadic // Global',
          pronouns: 'they/them',
          status: 'Exploring remote trails & deploying serverless',
        },
        theme: 'dark',
        accentColor: '#f97316',
        badgeStyle: 'flat',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-16-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'gruvbox', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 17. Retro Pixel Art
  {
    id: '17-retro-pixel-art',
    name: 'Retro Pixel Art',
    description: 'A pixel art styled GitHub profile with retro game visuals, 8-bit sprites, and developer info.',
    category: 'Pixel Art',
    accent: '#a855f7',
    tags: ['pixel', '8bit', 'retro', 'arcade', 'purple'],
    visualStyle: 'colorful',
    developerType: 'Pixel Artist & Dev',
    difficulty: 'intermediate',
    popularity: 93,
    featured: true,
    prompt: 'Create a pixel-art developer profile inspired by classic 8-bit and 16-bit games. Use pixel illustrations, retro interface elements, monospace headings, and a carefully structured README.',
    config: {
      version: '1.0.0',
      title: 'Retro Pixel Art Profile',
      settings: {
        user: {
          github: 'pixel-craft',
          name: 'PixelCraft',
          role: 'Developer & Pixel Artist',
          bio: 'Crafting nostalgic pixel art games, PICO-8 cartridges, and retro web emulators.',
          location: 'Arcade City',
          pronouns: 'he/him',
          status: 'Drawing 16x16 sprite sheets',
        },
        theme: 'dark',
        accentColor: '#a855f7',
        badgeStyle: 'flat-square',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-17-snake',
          type: 'snk',
          props: {
            content: { colorDots: '#111,#a855f7,#06b6d4,#facc15' },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 18. Zen Minimal
  {
    id: '18-zen-minimal',
    name: 'Zen Minimal',
    description: 'A zen and minimal profile with Japanese ink-style art, red sun emblem, and clean developer sections.',
    category: 'Minimal',
    accent: '#dc2626',
    tags: ['zen', 'japanese', 'ink', 'minimal', 'red'],
    visualStyle: 'minimal',
    developerType: 'Software Craftsman',
    difficulty: 'beginner',
    popularity: 95,
    featured: true,
    prompt: 'Create a peaceful Japanese-inspired minimalist developer profile with ink-style mountain or landscape artwork, subtle geometric elements, and restrained typography. Use a clean introduction and compact tech section.',
    config: {
      version: '1.0.0',
      title: 'Zen Minimal Profile',
      settings: {
        user: {
          github: 'zen-coder',
          name: 'Zen Takahashi',
          role: 'Developer • Builder • Learner',
          bio: 'Simplicity is the soul of efficiency. Writing disciplined, minimalist code inspired by Wabi-Sabi philosophy.',
          location: 'Tokyo, Japan',
          pronouns: 'he/him',
          status: 'Seeking harmony in distributed code',
        },
        theme: 'light',
        accentColor: '#dc2626',
        badgeStyle: 'flat',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-18-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'default', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 19. Rainbow Gradient
  {
    id: '19-rainbow-gradient',
    name: 'Rainbow Gradient',
    description: 'A vibrant gradient profile with modern flowing mesh typography, colorful badges, and GitHub stats.',
    category: 'Creative',
    accent: '#f43f5e',
    tags: ['rainbow', 'gradient', 'vibrant', 'creative', 'colorful'],
    visualStyle: 'colorful',
    developerType: 'Creative Technologist',
    difficulty: 'beginner',
    popularity: 92,
    featured: true,
    prompt: 'Create a vibrant creative developer profile with flowing gradient artwork, colorful typography, expressive visual sections, and a lively identity. Include the developer introduction, technology badges, and stats.',
    config: {
      version: '1.0.0',
      title: 'Rainbow Gradient Profile',
      settings: {
        user: {
          github: 'prism-dev',
          name: 'Prism Vance',
          role: 'Creative Frontend Technologist',
          bio: 'Painting the digital web with high-contrast rainbow palettes, CSS Houdini, and fluid micro-animations.',
          location: 'Amsterdam, Netherlands',
          pronouns: 'they/them',
          status: 'Crafting generative art on canvas',
        },
        theme: 'light',
        accentColor: '#f43f5e',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-19-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'PRISM // VIBRANT EXPERIMENTAL CREATIVE', color: 'f43f5e', style: 'waving', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-19-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'radical', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 20. Futuristic HUD
  {
    id: '20-futuristic-hud',
    name: 'Futuristic HUD',
    description: 'A futuristic HUD style profile with holographic elements, circular radar charts, and system stats.',
    category: 'Sci-Fi',
    accent: '#06b6d4',
    tags: ['hud', 'futuristic', 'holographic', 'scifi', 'cyan'],
    visualStyle: 'dark',
    developerType: 'Systems Architect',
    difficulty: 'advanced',
    popularity: 97,
    featured: true,
    prompt: 'Create a futuristic systems-engineer profile with a holographic heads-up display visual identity. Use circular data visualizations, technical grids, thin lines, futuristic labels, and a dark interface aesthetic.',
    config: {
      version: '1.0.0',
      title: 'Futuristic HUD Profile',
      settings: {
        user: {
          github: 'atlas-systems',
          name: 'Atlas Thorne',
          role: 'Autonomous Systems & Aerospace Engineer',
          bio: '> Atlas Systems Protocol 0.9.4\n> Real-time flight avionics & distributed micro-sat clusters online.',
          location: 'Sub-Orbital Facility 4',
          pronouns: 'sys/node',
          status: 'Calibrating high-frequency radar sweep',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-20-telemetry',
          type: 'telemetry-engine',
          props: {
            content: { engineType: 'radar', period: 'weekly' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-20-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'tokyonight', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 21. Bookworm Developer
  {
    id: '21-bookworm-dev',
    name: 'Bookworm Dev',
    description: 'A cozy bookworm themed profile with bookshelf, warm amber lamp colors, and reader notes.',
    category: 'Lifestyle',
    accent: '#d97706',
    tags: ['books', 'cozy', 'warm', 'reader', 'amber'],
    visualStyle: 'colorful',
    developerType: 'Writer & Engineer',
    difficulty: 'beginner',
    popularity: 90,
    featured: true,
    prompt: 'Create a warm developer profile for a software engineer who enjoys reading, learning, research, and writing. Use library, bookshelf, notebook, or study-desk artwork.',
    config: {
      version: '1.0.0',
      title: 'Bookworm Dev Profile',
      settings: {
        user: {
          github: 'lyra-reads',
          name: 'Lyra Bennett',
          role: 'Developer • Reader • Writer',
          bio: 'Reading computer science classics, taking copious markdown notes, and writing deep technical essays on distributed consensus.',
          location: 'Oxford, UK',
          pronouns: 'she/her',
          status: 'Currently reading: Designing Data-Intensive Applications',
        },
        theme: 'light',
        accentColor: '#d97706',
        badgeStyle: 'flat',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-21-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'gruvbox', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 22. Open Source Hero
  {
    id: '22-open-source-hero',
    name: 'Open Source Hero',
    description: 'An open source themed profile with Octocat style superhero cape, contributor stats, and trophy cards.',
    category: 'Open Source',
    accent: '#3b82f6',
    tags: ['opensource', 'octocat', 'hero', 'community', 'contributor'],
    visualStyle: 'colorful',
    developerType: 'OSS Maintainer',
    difficulty: 'intermediate',
    popularity: 98,
    featured: true,
    prompt: 'Create an open-source contributor profile that places community work and engineering contributions at the center. Use a strong hero banner, contribution-focused sections, featured repositories, project badges, and trophies.',
    config: {
      version: '1.0.0',
      title: 'Open Source Hero Profile',
      settings: {
        user: {
          github: 'opendev-hero',
          name: 'OpenDev',
          role: 'Open Source Hero & Maintainer',
          bio: '16,000+ stars across 20+ open-source libraries. Empowering global developers with free, accessible tools.',
          location: 'Global Open Web',
          pronouns: 'they/them',
          status: 'Reviewing community pull requests',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-22-trophies',
          type: 'github-profile-trophy',
          props: {
            content: { theme: 'flat', column: 4 },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-22-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'nord', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 23. Cloud & DevOps
  {
    id: '23-cloud-devops',
    name: 'Cloud & DevOps',
    description: 'A cloud and DevOps focused profile with cloud infrastructure elements, tool icons, and deployment stats.',
    category: 'Cloud',
    accent: '#0284c7',
    tags: ['cloud', 'devops', 'kubernetes', 'aws', 'docker'],
    visualStyle: 'dark',
    developerType: 'DevOps / SRE',
    difficulty: 'intermediate',
    popularity: 94,
    featured: true,
    prompt: 'Create a cloud engineer and DevOps developer profile. Use cloud infrastructure artwork, deployment pipelines, server architecture visuals, and clean technical typography.',
    config: {
      version: '1.0.0',
      title: 'Cloud & DevOps Profile',
      settings: {
        user: {
          github: 'cloudy-devops',
          name: 'Cloudy Skyes',
          role: 'DevOps • Cloud • Infrastructure Architect',
          bio: 'Automating multi-cloud Kubernetes clusters, GitOps pipelines with ArgoCD, and zero-downtime microservice deployments.',
          location: 'Denver, CO',
          pronouns: 'he/him',
          status: 'Terraform apply: 0 destroyed, 12 added',
        },
        theme: 'dark',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-23-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['aws', 'gcp', 'k8s', 'docker', 'terraform', 'githubactions'], theme: 'dark' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-23-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'radical', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 24. Security & Cybersecurity
  {
    id: '24-security-cybersec',
    name: 'Security & Cybersec',
    description: 'A cybersecurity themed profile with shield visuals, dark red accents, and vulnerability metrics.',
    category: 'Security',
    accent: '#ef4444',
    tags: ['security', 'cyber', 'red', 'shield', 'infosec'],
    visualStyle: 'dark',
    developerType: 'Security Engineer',
    difficulty: 'advanced',
    popularity: 95,
    featured: true,
    prompt: 'Create a cybersecurity specialist profile with shield, circuit, and security-network visual identity. Use a dark premium layout, strong red accents, clear technical sections, and structured project cards.',
    config: {
      version: '1.0.0',
      title: 'Security & Cybersec Profile',
      settings: {
        user: {
          github: 'cipher-sec',
          name: 'Cipher Hayes',
          role: 'Cybersecurity Engineer & Threat Hunter',
          bio: 'Hardening cloud perimeters, auditing smart contracts, and engineering cryptographic security primitives.',
          location: 'Washington, DC',
          pronouns: 'they/them',
          status: 'Mitigating zero-day vulnerabilities',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-24-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'CIPHER // APPARATUS DEFENSE // SEC-OPS', color: 'ef4444', style: 'geometric', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-24-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'dark', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 25. Data & Analytics
  {
    id: '25-data-analytics',
    name: 'Data & Analytics',
    description: 'A data analytics themed profile with charts, graphs, data-flow diagrams and pipeline telemetry.',
    category: 'Data',
    accent: '#8b5cf6',
    tags: ['data', 'analytics', 'charts', 'sql', 'python'],
    visualStyle: 'data',
    developerType: 'Data Engineer / Scientist',
    difficulty: 'intermediate',
    popularity: 93,
    featured: true,
    prompt: 'Create a data engineer and analytics developer profile with a dashboard-inspired visual design. Use charts, data-flow artwork, and graph illustrations in the banner with telemetry.',
    config: {
      version: '1.0.0',
      title: 'Data & Analytics Profile',
      settings: {
        user: {
          github: 'data-zen',
          name: 'DataZen',
          role: 'Data Engineer & Analytics Architect',
          bio: 'Transforming petabyte-scale streaming pipelines into real-time analytical dashboards using Spark, dbt, and BigQuery.',
          location: 'Chicago, IL',
          pronouns: 'she/her',
          status: 'Optimizing distributed columnar storage',
        },
        theme: 'light',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-25-pie',
          type: 'pie-chart',
          props: {
            content: { languages: ['Python', 'SQL', 'Scala', 'R', 'Rust'] },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-25-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'dracula', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 26. Creative Designer
  {
    id: '26-creative-designer',
    name: 'Creative Designer',
    description: 'A creative developer profile with artistic visuals, design tools, and modern portfolio layout.',
    category: 'Design',
    accent: '#f59e0b',
    tags: ['design', 'figma', 'creative', 'artistic', 'uiux'],
    visualStyle: 'colorful',
    developerType: 'Design Engineer',
    difficulty: 'beginner',
    popularity: 92,
    featured: true,
    prompt: 'Create a creative developer and designer profile combining software engineering with visual creativity. Use abstract shapes, expressive illustration, colorful geometric elements, and a portfolio-like layout.',
    config: {
      version: '1.0.0',
      title: 'Creative Designer Profile',
      settings: {
        user: {
          github: 'muse-designer',
          name: 'Muse Rivera',
          role: 'Developer • Designer • Creator',
          bio: 'Bridging the chasm between Figma vectors and production React components with bespoke typography and smooth animations.',
          location: 'Barcelona, Spain',
          pronouns: 'she/her',
          status: 'Refining design tokens in Figma',
        },
        theme: 'light',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-26-figma',
          type: 'figma-design',
          props: {
            content: { projectName: 'MonoForge Design Tokens', fileUrl: 'https://figma.com/@muse' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-26-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['figma', 'react', 'tailwind', 'ts', 'nextjs'], theme: 'light' },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 27. Robotics & IoT
  {
    id: '27-robotics-iot',
    name: 'Robotics & IoT',
    description: 'A robotics and IoT themed profile with robot illustration, hardware icons, circuits and embedded stats.',
    category: 'Hardware',
    accent: '#06b6d4',
    tags: ['robotics', 'iot', 'hardware', 'embedded', 'circuits'],
    visualStyle: 'dark',
    developerType: 'Embedded Engineer',
    difficulty: 'advanced',
    popularity: 94,
    featured: true,
    prompt: 'Create a robotics and embedded systems developer profile with robotic hardware illustrations, circuit-board graphics, and futuristic engineering artwork. Include programming languages, microcontrollers, and hardware projects.',
    config: {
      version: '1.0.0',
      title: 'Robotics & IoT Profile',
      settings: {
        user: {
          github: 'robo-embedded',
          name: 'Robo Keller',
          role: 'Robotics • IoT • Embedded Systems Engineer',
          bio: 'Writing bare-metal C++ firmware for autonomous mobile robots, ROS2 navigation stacks, and ESP32 mesh sensors.',
          location: 'Munich, Germany',
          pronouns: 'he/him',
          status: 'Calibrating LiDAR SLAM map',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-27-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['cpp', 'c', 'rust', 'raspberrypi', 'arduino', 'linux'], theme: 'dark' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-27-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'tokyonight', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 28. Music Coder
  {
    id: '28-music-coder',
    name: 'Music Coder',
    description: 'A music themed developer profile with audio visuals, equalizer waveform, headphones, and a dark layout.',
    category: 'Music',
    accent: '#d946ef',
    tags: ['music', 'audio', 'waveform', 'equalizer', 'synth'],
    visualStyle: 'dark',
    developerType: 'Audio Engineer & Dev',
    difficulty: 'intermediate',
    popularity: 93,
    featured: true,
    prompt: 'Create a music-inspired developer profile featuring headphone, sound-wave, and audio-visualization artwork. Use waveform motifs, elegant typography, and a dark visual identity.',
    config: {
      version: '1.0.0',
      title: 'Music Coder Profile',
      settings: {
        user: {
          github: 'beat-coder',
          name: 'Beat Harmon',
          role: 'Audio DSP & Creative Web Coder',
          bio: 'Crafting WebAudio synthesizers, real-time Fourier transform analyzers, and generative ambient algorithms.',
          location: 'London, UK',
          pronouns: 'he/him',
          status: 'Synthesizing 808 sub-bass in WebAssembly',
        },
        theme: 'dark',
        accentColor: '#d946ef',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-28-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'BEAT HARMON // AUDIO DSP & SYNTHESIS', color: 'd946ef', style: 'waving', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-28-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'synthwave', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 29. Space & Science
  {
    id: '29-space-science',
    name: 'Space & Science',
    description: 'A space and science themed profile with galaxy visuals, quantum physics equations and GitHub stats.',
    category: 'Science',
    accent: '#a855f7',
    tags: ['science', 'space', 'physics', 'astronomy', 'quantum'],
    visualStyle: 'dark',
    developerType: 'Computational Scientist',
    difficulty: 'advanced',
    popularity: 95,
    featured: true,
    prompt: 'Create a scientific developer profile for someone interested in space, physics, mathematics, and research. Use galaxy, orbital, telescope, or scientific visualization artwork.',
    config: {
      version: '1.0.0',
      title: 'Space & Science Profile',
      settings: {
        user: {
          github: 'cosmos-science',
          name: 'Cosmos Drake',
          role: 'Computational Physicist & Science Enthusiast',
          bio: 'Simulating N-body gravitational fields, general relativity geodesics, and quantum lattice gauge theories.',
          location: 'Geneva, Switzerland // CERN',
          pronouns: 'they/them',
          status: 'Running Monte Carlo lattice calculations',
        },
        theme: 'dark',
        accentColor: '#a855f7',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'sec-29-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'COSMOS DRAKE // COMPUTATIONAL ASTROPHYSICS', color: 'a855f7', style: 'geometric', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-29-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'tokyonight', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },

  // 30. Ultimate Developer (All-in-One)
  {
    id: '30-ultimate-developer',
    name: 'Ultimate Developer (All-in-One)',
    description: 'An ultimate all-in-one developer profile with bento layout, stats, tech stack, projects and live activity.',
    category: 'Ultimate',
    accent: '#6366f1',
    tags: ['ultimate', 'allinone', 'bento', 'telemetry', 'comprehensive'],
    visualStyle: 'data',
    developerType: 'Principal Full-Stack Architect',
    difficulty: 'advanced',
    popularity: 100,
    featured: true,
    prompt: 'Create a comprehensive premium developer profile combining the best elements of modern dashboard layouts, clean typography, data visualizations, and structured project showcases. Include hero banner, personal introduction, skill matrix, featured projects, GitHub statistics, and telemetry.',
    config: {
      version: '1.0.0',
      title: 'Ultimate Developer All-in-One Profile',
      settings: {
        user: {
          github: 'multidev-pro',
          name: 'MultiDev Pro',
          role: 'Full-Stack • AI • DevOps • Open Source Architect',
          bio: 'Architecting end-to-end cloud platforms, multi-agent reasoning loops, 60fps WebGL visualizations, and high-frequency backend clusters.',
          location: 'San Francisco, CA',
          pronouns: 'he/him',
          status: 'Shipping MonoForge 3.0',
        },
        theme: 'dark',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'sec-30-capsule',
          type: 'capsule-banner',
          props: {
            content: { text: 'MULTIDEV PRO // PRINCIPAL SYSTEMS ARCHITECT', color: '6366f1', style: 'waving', animation: 'fadeIn' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-30-telemetry',
          type: 'telemetry-engine',
          props: {
            content: { engineType: 'radar', period: 'monthly' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-30-skills',
          type: 'skill-icons',
          props: {
            content: { skills: ['ts', 'react', 'nextjs', 'rust', 'go', 'py', 'docker', 'postgres'], theme: 'dark' },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-30-trophies',
          type: 'github-profile-trophy',
          props: {
            content: { theme: 'radical', column: 4 },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'sec-30-stats',
          type: 'github-readme-stats',
          props: {
            content: { showIcons: true, theme: 'radical', includeAllCommits: true },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
];
