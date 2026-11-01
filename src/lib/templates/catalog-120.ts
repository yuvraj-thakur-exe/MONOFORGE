import type { TemplateItem } from './catalog';

/**
 * 120 Handcrafted, Unique Profile Template Presets
 * Organized across 12 distinct categories (10 unique presets per category).
 * Fully sanitized with zero personal info, production-tested, and Camo-safe.
 */
export const PRESETS_120: TemplateItem[] = [
  {
    id: 'min-01',
    name: "Minimalist Horizon",
    description: "Understated typography with essential skills and compact social badges.",
    category: "Minimal Professional",
    accent: '#64748b',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 92,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Software Craftsman. Focus: Understated typography with essential skills and compact social badges.. Styling: dark theme with #64748b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Minimalist Clean Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Minimalist Clean",
          role: "Software Craftsman",
          bio: "Building minimal, reliable, and decoupled systems for the modern web.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#64748b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "react",
                                              "nodejs",
                                              "tailwind"
                                      ],
                                      "perLine": 6,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-02',
    name: "Monochrome Slate",
    description: "Deep slate cards with high contrast and fine line dividers.",
    category: "Minimal Professional",
    accent: '#475569',
    tags: ['minimal', 'backend', 'advanced'],
    visualStyle: 'minimal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 89,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Staff Systems Architect. Focus: Deep slate cards with high contrast and fine line dividers.. Styling: dark theme with #475569 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Monochrome Slate Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Monochrome Slate",
          role: "Staff Systems Architect",
          bio: "Obsessed with mechanical sympathy, low latency, and deterministic execution.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#475569',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "rust",
                                              "go",
                                              "cplusplus",
                                              "linux"
                                      ],
                                      "perLine": 6,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-03',
    name: "Executive Summary",
    description: "Concise leadership bio, strategic focus areas, and verified organizational metrics.",
    category: "Minimal Professional",
    accent: '#334155',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 86,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a VP of Engineering. Focus: Concise leadership bio, strategic focus areas, and verified organizational metrics.. Styling: light theme with #334155 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Executive Summary Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Executive Summary",
          role: "VP of Engineering",
          bio: "Scaling engineering teams, developer velocity, and mission-critical cloud infrastructure.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#334155',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "email"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-04',
    name: "Nordic Simplicity",
    description: "Ice-slate accents, subtle badges, and generous whitespace.",
    category: "Minimal Professional",
    accent: '#94a3b8',
    tags: ['light', 'frontend', 'beginner'],
    visualStyle: 'light',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 83,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Frontend Architect. Focus: Ice-slate accents, subtle badges, and generous whitespace.. Styling: light theme with #94a3b8 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Nordic Simplicity Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Nordic Simplicity",
          role: "Frontend Architect",
          bio: "Crafting serene user experiences guided by accessibility and functional design.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#94a3b8',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "react",
                                              "nextjs",
                                              "tailwind",
                                              "figma"
                                      ],
                                      "perLine": 5,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-05',
    name: "Architectural Blueprint",
    description: "Structured system principles and compact technology pill matrix.",
    category: "Minimal Professional",
    accent: '#0284c7',
    tags: ['minimal', 'devops', 'advanced'],
    visualStyle: 'minimal',
    developerType: 'devops',
    difficulty: 'advanced',
    popularity: 80,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Cloud Native Architect. Focus: Structured system principles and compact technology pill matrix.. Styling: dark theme with #0284c7 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Architectural Blueprint Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Architectural Blueprint",
          role: "Cloud Native Architect",
          bio: "Designing fault-tolerant distributed topologies across multi-region clusters.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "kubernetes",
                                              "docker",
                                              "terraform",
                                              "aws",
                                              "go"
                                      ],
                                      "perLine": 5,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-06',
    name: "Clean Line Craftsman",
    description: "Fine geometric borders and understated typography with zero decorative noise.",
    category: "Minimal Professional",
    accent: '#64748b',
    tags: ['minimal', 'frontend', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 77,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Senior UI/UX Engineer. Focus: Fine geometric borders and understated typography with zero decorative noise.. Styling: dark theme with #64748b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Clean Line Craftsman Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Clean Line Craftsman",
          role: "Senior UI/UX Engineer",
          bio: "Bridging the divide between high-end digital aesthetics and rock-solid code.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#64748b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "vue",
                                              "react",
                                              "svelte",
                                              "typescript"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-07',
    name: "Pure Markdown Zen",
    description: "Native GitHub markdown styling, fast rendering, and accessible links.",
    category: "Minimal Professional",
    accent: '#1e293b',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 74,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Open-Source Craftsman. Focus: Native GitHub markdown styling, fast rendering, and accessible links.. Styling: dark theme with #1e293b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Pure Markdown Zen Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Pure Markdown Zen",
          role: "Open-Source Craftsman",
          bio: "Simplicity is prerequisite for reliability. Building lightweight tools for hackers.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#1e293b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "twitter",
                                              "discord"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-08',
    name: "Silent Observer",
    description: "Minimalist status badge, focused repositories, and clean social icons.",
    category: "Minimal Professional",
    accent: '#0f172a',
    tags: ['dark', 'backend', 'advanced'],
    visualStyle: 'dark',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 71,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Security Researcher. Focus: Minimalist status badge, focused repositories, and clean social icons.. Styling: dark theme with #0f172a accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Silent Observer Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Silent Observer",
          role: "Security Researcher",
          bio: "Auditing smart contracts and distributed consensus algorithms.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#0f172a',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-09',
    name: "Modern Minimal Ivory",
    description: "Warm cream palette, crisp dark text, and understated skills cluster.",
    category: "Minimal Professional",
    accent: '#d97706',
    tags: ['light', 'frontend', 'beginner'],
    visualStyle: 'light',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 68,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Product Designer & Coder. Focus: Warm cream palette, crisp dark text, and understated skills cluster.. Styling: light theme with #d97706 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Modern Minimal Ivory Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Modern Minimal Ivory",
          role: "Product Designer & Coder",
          bio: "Designing software that respects user attention and feels effortless.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#d97706',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "figma",
                                              "react",
                                              "typescript",
                                              "tailwind"
                                      ],
                                      "perLine": 4,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'min-10',
    name: "Distilled Core",
    description: "3-bullet engineering philosophy, verified credentials, and compact stats.",
    category: "Minimal Professional",
    accent: '#475569',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 65,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Principal Engineer. Focus: 3-bullet engineering philosophy, verified credentials, and compact stats.. Styling: dark theme with #475569 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Distilled Core Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Distilled Core",
          role: "Principal Engineer",
          bio: "3 principles: Ship working software, automate repetitive work, document rationale.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#475569',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "rust",
                                              "python",
                                              "docker",
                                              "typescript"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 3
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-01',
    name: "Swiss Typographer",
    description: "Oversized display title, asymmetric columns, and strict typographic grid.",
    category: "Editorial & Typography",
    accent: '#3157d5',
    tags: ['minimal', 'frontend', 'advanced'],
    visualStyle: 'minimal',
    developerType: 'frontend',
    difficulty: 'advanced',
    popularity: 94,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Design Systems Lead. Focus: Oversized display title, asymmetric columns, and strict typographic grid.. Styling: light theme with #3157d5 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Swiss Typographer Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Swiss Typographer",
          role: "Design Systems Lead",
          bio: "Pursuing typographic discipline, mathematical grids, and timeless composition.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#3157d5',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "SWISS TYPOGRAPHY & CODE",
                                      "theme": "cyber-amber",
                                      "height": 180
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "react",
                                              "tailwind",
                                              "figma"
                                      ],
                                      "perLine": 6,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-02',
    name: "Editorial Community Lead",
    description: "Clean editorial header banner, illustrated avatar with laptop, community bio, and modern social links.",
    category: "Editorial & Typography",
    accent: '#a855f7',
    tags: ['light', 'fullstack', 'beginner'],
    visualStyle: 'light',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 91,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Software Engineer & Community Builder. Focus: Clean editorial header banner, illustrated avatar with laptop, community bio, and modern social links.. Styling: light theme with #a855f7 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Editorial Community Lead Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Editorial Community Lead",
          role: "Software Engineer & Community Builder",
          bio: "Passionate about making open-source more accessible, creating technology to elevate people, and building community.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#a855f7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "SOFTWARE ENGINEER & COMMUNITY ORGANIZER",
                                      "theme": "ocean-blue",
                                      "height": 190
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "twitter",
                                              "linkedin",
                                              "email"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "react",
                                              "typescript",
                                              "nextjs",
                                              "graphql"
                                      ],
                                      "perLine": 6,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-03',
    name: "Modernist Serif",
    description: "High-contrast serif headlines, literary quote blocks, and elegant bio narrative.",
    category: "Editorial & Typography",
    accent: '#78350f',
    tags: ['light', 'fullstack', 'beginner'],
    visualStyle: 'light',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 88,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Technical Writer & Core Contributor. Focus: High-contrast serif headlines, literary quote blocks, and elegant bio narrative.. Styling: light theme with #78350f accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Modernist Serif Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Modernist Serif",
          role: "Technical Writer & Core Contributor",
          bio: "Writing words and code that stand the test of time.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#78350f',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "twitter",
                                              "linkedin"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-04',
    name: "Tech Journalist & Essayist",
    description: "Masthead header, publication highlights, and curated essay links.",
    category: "Editorial & Typography",
    accent: '#0369a1',
    tags: ['colorful', 'frontend', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 85,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Developer Advocate. Focus: Masthead header, publication highlights, and curated essay links.. Styling: dark theme with #0369a1 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Tech Journalist & Essayist Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Tech Journalist & Essayist",
          role: "Developer Advocate",
          bio: "Deconstructing complex engineering breakthroughs into clear, engaging essays.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#0369a1',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "markdown",
                                              "nextjs",
                                              "react",
                                              "git"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-05',
    name: "Brutalist Monospace",
    description: "Raw monospaced typography, heavy black borders, and typewriter accents.",
    category: "Editorial & Typography",
    accent: '#000000',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 82,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Low-Level Kernel Hacker. Focus: Raw monospaced typography, heavy black borders, and typewriter accents.. Styling: dark theme with #000000 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Brutalist Monospace Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Brutalist Monospace",
          role: "Low-Level Kernel Hacker",
          bio: "RAW CODE. ZERO ABSTRACTION. MAXIMUM MECHANICAL THROUGHPUT.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#000000',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "SYSTEM ARCHITECT",
                                              "KERNEL CONTRIBUTOR",
                                              "C / RUST DEV"
                                      ],
                                      "color": "#ffe600"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-06',
    name: "The Standard Review",
    description: "Two-column editorial layout, published RFCs, and language work.",
    category: "Editorial & Typography",
    accent: '#1e3a8a',
    tags: ['minimal', 'fullstack', 'advanced'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'advanced',
    popularity: 79,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Language Specification Lead. Focus: Two-column editorial layout, published RFCs, and language work.. Styling: dark theme with #1e3a8a accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "The Standard Review Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "The Standard Review",
          role: "Language Specification Lead",
          bio: "Contributing to ECMAScript, Rust RFCs, and open web standards.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#1e3a8a',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "rust",
                                              "typescript",
                                              "wasm",
                                              "cplusplus"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-07',
    name: "Type & Kerning Lead",
    description: "Kinetic typography SVG, font pairing showcase, and design tokens.",
    category: "Editorial & Typography",
    accent: '#e11d48',
    tags: ['animated', 'frontend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'frontend',
    difficulty: 'advanced',
    popularity: 76,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Creative Typographer & WebGL. Focus: Kinetic typography SVG, font pairing showcase, and design tokens.. Styling: dark theme with #e11d48 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Type & Kerning Lead Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Type & Kerning Lead",
          role: "Creative Typographer & WebGL",
          bio: "Sculpting variable fonts, kinetic motion, and vector typography.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#e11d48',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "VARIABLE TYPE EXPERIMENTS",
                                              "WEBGL TYPOGRAPHY",
                                              "DESIGN TOKENS"
                                      ],
                                      "color": "#f43f5e"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-08',
    name: "Curated Anthology",
    description: "Chapter-style sections, table of contents, and project milestones.",
    category: "Editorial & Typography",
    accent: '#4338ca',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 73,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Engineering Director. Focus: Chapter-style sections, table of contents, and project milestones.. Styling: dark theme with #4338ca accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Curated Anthology Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Curated Anthology",
          role: "Engineering Director",
          bio: "Documenting architectural evolution through curated technical essays and case studies.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#4338ca',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-09',
    name: "Bold Headline Vanguard",
    description: "Massive gradient headline, crisp subheadings, and high-impact layout.",
    category: "Editorial & Typography",
    accent: '#ffe600',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 70,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Stack Creator. Focus: Massive gradient headline, crisp subheadings, and high-impact layout.. Styling: dark theme with #ffe600 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Bold Headline Vanguard Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Bold Headline Vanguard",
          role: "Full-Stack Creator",
          bio: "Turning zero-to-one product ideas into reality with speed and conviction.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "BUILDING AT THE EDGE",
                                      "theme": "cyber-amber",
                                      "height": 200
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'edit-10',
    name: "Minimalist Colophon",
    description: "Footnote-inspired structure, technical specifications, and clean colophon.",
    category: "Editorial & Typography",
    accent: '#525252',
    tags: ['minimal', 'backend', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'backend',
    difficulty: 'beginner',
    popularity: 67,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Software Evaluator & Polymath. Focus: Footnote-inspired structure, technical specifications, and clean colophon.. Styling: light theme with #525252 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Minimalist Colophon Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Minimalist Colophon",
          role: "Software Evaluator & Polymath",
          bio: "Every detail considered. Every line of code purposeful. Designed to last.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#525252',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "go",
                                              "rust",
                                              "postgresql",
                                              "docker"
                                      ],
                                      "perLine": 4,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-01',
    name: "Neo Matrix Digital Rain",
    description: "CRT scanlines, green phosphor digital rain banner, and terminal prompt.",
    category: "Terminal & ASCII",
    accent: '#00ff66',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 96,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Cyberpunk Systems Operator. Focus: CRT scanlines, green phosphor digital rain banner, and terminal prompt.. Styling: dark theme with #00ff66 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Neo Matrix Digital Rain Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Neo Matrix Digital Rain",
          role: "Cyberpunk Systems Operator",
          bio: "Wake up, Neo. The matrix has you. Follow the green commit rabbit.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#00ff66',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "CONNECTING TO MAINFRAME...",
                                              "ACCESS GRANTED // ROOT",
                                              "OVERCLOCKING KERNEL"
                                      ],
                                      "color": "#00ff66"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "matrix"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-02',
    name: "Linux Bash Workstation",
    description: "whoami and neofetch style system card, bash aliases, and CLI telemetry.",
    category: "Terminal & ASCII",
    accent: '#10b981',
    tags: ['terminal', 'devops', 'beginner'],
    visualStyle: 'terminal',
    developerType: 'devops',
    difficulty: 'beginner',
    popularity: 93,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Linux Systems Administrator. Focus: whoami and neofetch style system card, bash aliases, and CLI telemetry.. Styling: dark theme with #10b981 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Linux Bash Workstation Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Linux Bash Workstation",
          role: "Linux Systems Administrator",
          bio: "Automating everything with bash, awk, sed, and systemd daemons.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "bash",
                                              "linux",
                                              "docker",
                                              "python"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-03',
    name: "ASCII Cyber Skull",
    description: "Handcrafted ASCII art banner, monochrome phosphor text, and uptime counter.",
    category: "Terminal & ASCII",
    accent: '#f43f5e',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 90,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Exploit Researcher & Pentester. Focus: Handcrafted ASCII art banner, monochrome phosphor text, and uptime counter.. Styling: dark theme with #f43f5e accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "ASCII Cyber Skull Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "ASCII Cyber Skull",
          role: "Exploit Researcher & Pentester",
          bio: "Finding zero-days before malicious actors do. Binary analysis & fuzzing.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f43f5e',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-04',
    name: "Retro VT100 Terminal",
    description: "Warm amber CRT glow, monospaced ASCII tables, and keyboard shortcut rack.",
    category: "Terminal & ASCII",
    accent: '#f59e0b',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 87,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Mainframe Systems Engineer. Focus: Warm amber CRT glow, monospaced ASCII tables, and keyboard shortcut rack.. Styling: dark theme with #f59e0b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Retro VT100 Terminal Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Retro VT100 Terminal",
          role: "Mainframe Systems Engineer",
          bio: "Keeping the 40-year-old financial transaction backbone running at 99.9999% uptime.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "c",
                                              "cplusplus",
                                              "linux",
                                              "bash"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-05',
    name: "Zsh Powerline HUD",
    description: "Powerline glyphs, git branch indicators, execution timers, and prompt status.",
    category: "Terminal & ASCII",
    accent: '#06b6d4',
    tags: ['terminal', 'fullstack', 'beginner'],
    visualStyle: 'terminal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 84,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Developer Experience Specialist. Focus: Powerline glyphs, git branch indicators, execution timers, and prompt status.. Styling: dark theme with #06b6d4 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Zsh Powerline HUD Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Zsh Powerline HUD",
          role: "Developer Experience Specialist",
          bio: "Fine-tuning shells, dotfiles, and keyboard workflows for peak ergonomics.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "git",
                                              "bash",
                                              "neovim",
                                              "rust"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-06',
    name: "Hacker Command Center",
    description: "Simulated ncurses dashboard, packet velocity meters, and memory map.",
    category: "Terminal & ASCII",
    accent: '#14b8a6',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 81,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Network Security Architect. Focus: Simulated ncurses dashboard, packet velocity meters, and memory map.. Styling: dark theme with #14b8a6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Hacker Command Center Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Hacker Command Center",
          role: "Network Security Architect",
          bio: "Packet capture, intrusion prevention systems, and distributed firewall rules.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#14b8a6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-07',
    name: "Vim Keybindings Master",
    description: "Modal editor status line (-- NORMAL --), buffer tabs, and motion keys.",
    category: "Terminal & ASCII",
    accent: '#22c55e',
    tags: ['terminal', 'fullstack', 'beginner'],
    visualStyle: 'terminal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 78,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Neovim Plugin Author. Focus: Modal editor status line (-- NORMAL --), buffer tabs, and motion keys.. Styling: dark theme with #22c55e accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Vim Keybindings Master Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Vim Keybindings Master",
          role: "Neovim Plugin Author",
          bio: ":w !sudo tee % > /dev/null - Never touch the mouse. Modal editing perfection.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#22c55e',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "lua",
                                              "neovim",
                                              "rust",
                                              "typescript"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-08',
    name: "Sysadmin Log Stream",
    description: "Timestamped commit events formatted like an enterprise log journal.",
    category: "Terminal & ASCII",
    accent: '#eab308',
    tags: ['terminal', 'devops', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'devops',
    difficulty: 'advanced',
    popularity: 75,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Site Reliability Engineer. Focus: Timestamped commit events formatted like an enterprise log journal.. Styling: dark theme with #eab308 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Sysadmin Log Stream Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Sysadmin Log Stream",
          role: "Site Reliability Engineer",
          bio: "tail -f /var/log/syslog - Monitoring 10,000 nodes with real-time alerting.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#eab308',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-09',
    name: "MS-DOS 6.22 Retro",
    description: "Classic blue-and-white DOS prompt, directory listing, and floppy disk icon.",
    category: "Terminal & ASCII",
    accent: '#3b82f6',
    tags: ['terminal', 'gamedev', 'beginner'],
    visualStyle: 'terminal',
    developerType: 'gamedev',
    difficulty: 'beginner',
    popularity: 72,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Retro Computing Enthusiast. Focus: Classic blue-and-white DOS prompt, directory listing, and floppy disk icon.. Styling: dark theme with #3b82f6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "MS-DOS 6.22 Retro Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "MS-DOS 6.22 Retro",
          role: "Retro Computing Enthusiast",
          bio: "C:\\> DIR /W - Writing Turbo Pascal, x86 assembly, and VGA demoscene graphics.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "c",
                                              "assembly",
                                              "cpp"
                                      ],
                                      "perLine": 3,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'term-10',
    name: "Cyberpunk BIOS Post",
    description: "Boot sequence ASCII diagnostics, CPU frequency, and memory checks.",
    category: "Terminal & ASCII",
    accent: '#ec4899',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 69,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Hardware Firmware Specialist. Focus: Boot sequence ASCII diagnostics, CPU frequency, and memory checks.. Styling: dark theme with #ec4899 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Cyberpunk BIOS Post Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Cyberpunk BIOS Post",
          role: "Hardware Firmware Specialist",
          bio: "POST check completed. Flash ROM verified. Booting custom microkernel.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-01',
    name: "Cyberpunk Arcade Gamer",
    description: "Neon pink and cyan glows, retro arcade snake eating commits, and 3D trophies.",
    category: "Neon & Cyberpunk",
    accent: '#ec4899',
    tags: ['animated', 'gamedev', 'beginner'],
    visualStyle: 'animated',
    developerType: 'gamedev',
    difficulty: 'beginner',
    popularity: 98,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Creative Full-Stack Hacker. Focus: Neon pink and cyan glows, retro arcade snake eating commits, and 3D trophies.. Styling: dark theme with #ec4899 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Cyberpunk Arcade Gamer Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Cyberpunk Arcade Gamer",
          role: "Creative Full-Stack Hacker",
          bio: "Writing shaders, WebGL experiments, and high-frequency real-time web applications.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-snake",
                      "type": "snk",
                      "props": {
                              "content": {
                                      "color": "pink"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "radical",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-02',
    name: "Neon Purple Confetti Owl",
    description: "Curved purple capsule banner, celebration mascot owl, profile views, and skills row.",
    category: "Neon & Cyberpunk",
    accent: '#a855f7',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 95,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Digital Craftsman & Full-Stack Developer. Focus: Curved purple capsule banner, celebration mascot owl, profile views, and skills row.. Styling: dark theme with #a855f7 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Neon Purple Confetti Owl Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Neon Purple Confetti Owl",
          role: "Digital Craftsman & Full-Stack Developer",
          bio: "Full-stack developer and machine learning enthusiast. Turning ideas into working code every day.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#a855f7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "HELLO WORLD // WELCOME TO MY PROFILE",
                                      "theme": "cyber-amber",
                                      "height": 200
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-views",
                      "type": "profile-views",
                      "props": {
                              "content": {
                                      "color": "purple"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "react",
                                              "nodejs",
                                              "django",
                                              "postgresql"
                                      ],
                                      "perLine": 5,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "twitter",
                                              "email"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-03',
    name: "Synthwave 80s Grid",
    description: "Sunset wireframe grid, purple-to-amber gradient, and DeLorean aesthetic.",
    category: "Neon & Cyberpunk",
    accent: '#f59e0b',
    tags: ['colorful', 'frontend', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 92,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Creative Technologist. Focus: Sunset wireframe grid, purple-to-amber gradient, and DeLorean aesthetic.. Styling: dark theme with #f59e0b accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Synthwave 80s Grid Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Synthwave 80s Grid",
          role: "Creative Technologist",
          bio: "Driving into the digital sunset. Synthesizers, vector displays, and creative code.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "SYNTHWAVE 80S GRID",
                                      "theme": "cyber-amber",
                                      "height": 210
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-04',
    name: "Tokyo Night Runner",
    description: "Rainy neon alleyways, kanji cyber emblems, and dark blue/violet HUD.",
    category: "Neon & Cyberpunk",
    accent: '#3b82f6',
    tags: ['dark', 'fullstack', 'beginner'],
    visualStyle: 'dark',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 89,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Stack TypeScript Engineer. Focus: Rainy neon alleyways, kanji cyber emblems, and dark blue/violet HUD.. Styling: dark theme with #3b82f6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Tokyo Night Runner Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Tokyo Night Runner",
          role: "Full-Stack TypeScript Engineer",
          bio: "Coding under Tokyo neon lights. Node.js microservices and React Native apps.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "react",
                                              "nextjs",
                                              "tailwind"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-05',
    name: "Electric Cyan Overdrive",
    description: "60fps traveling laser border beams and glowing HUD targeting crosshairs.",
    category: "Neon & Cyberpunk",
    accent: '#06b6d4',
    tags: ['animated', 'devops', 'advanced'],
    visualStyle: 'animated',
    developerType: 'devops',
    difficulty: 'advanced',
    popularity: 86,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Platform Systems Engineer. Focus: 60fps traveling laser border beams and glowing HUD targeting crosshairs.. Styling: dark theme with #06b6d4 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Electric Cyan Overdrive Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Electric Cyan Overdrive",
          role: "Platform Systems Engineer",
          bio: "Overclocked CI/CD execution and lightning-fast developer feedback loops.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "PERIMETER LASER BEAM ACTIVE",
                                              "ZERO DOWNTIME ROLLOUT",
                                              "LATENCY < 1MS"
                                      ],
                                      "color": "#06b6d4"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-06',
    name: "Vaporwave Glitch Split",
    description: "Chromatic aberration text effect, pastel magenta/teal, and retro statues.",
    category: "Neon & Cyberpunk",
    accent: '#d946ef',
    tags: ['colorful', 'frontend', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 83,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Audio & DSP Programmer. Focus: Chromatic aberration text effect, pastel magenta/teal, and retro statues.. Styling: dark theme with #d946ef accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Vaporwave Glitch Split Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Vaporwave Glitch Split",
          role: "Audio & DSP Programmer",
          bio: "A E S T H E T I C S - Chopping samples, coding VST plugins, and WebAudio DSP.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#d946ef',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "cplusplus",
                                              "rust",
                                              "webaudio",
                                              "python"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-07',
    name: "Acid Green Glitch",
    description: "Hyper-saturated lime green on deep pitch slate with glitch split animations.",
    category: "Neon & Cyberpunk",
    accent: '#84cc16',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 80,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Offensive Security Engineer. Focus: Hyper-saturated lime green on deep pitch slate with glitch split animations.. Styling: dark theme with #84cc16 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Acid Green Glitch Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Acid Green Glitch",
          role: "Offensive Security Engineer",
          bio: "Exploiting race conditions and memory leaks. Red team specialist.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#84cc16',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "matrix"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-08',
    name: "Cyber Mercenary Stance",
    description: "Cyber combat robot mascot with thruster glow and targeting HUD.",
    category: "Neon & Cyberpunk",
    accent: '#ef4444',
    tags: ['animated', 'aiml', 'advanced'],
    visualStyle: 'animated',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 77,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Autonomous Agent Engineer. Focus: Cyber combat robot mascot with thruster glow and targeting HUD.. Styling: dark theme with #ef4444 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Cyber Mercenary Stance Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Cyber Mercenary Stance",
          role: "Autonomous Agent Engineer",
          bio: "Deploying autonomous agent swarms and multi-agent coordination frameworks.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "DEPLOYING AGENT SWARM",
                                              "CONSENSUS REACHED",
                                              "TASK EXECUTED"
                                      ],
                                      "color": "#ef4444"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-09',
    name: "Outrun Highway Racer",
    description: "Palm tree silhouettes, speed streak gauges, and retro audio player.",
    category: "Neon & Cyberpunk",
    accent: '#f97316',
    tags: ['colorful', 'gamedev', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'gamedev',
    difficulty: 'beginner',
    popularity: 74,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Game Physics Programmer. Focus: Palm tree silhouettes, speed streak gauges, and retro audio player.. Styling: dark theme with #f97316 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Outrun Highway Racer Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Outrun Highway Racer",
          role: "Game Physics Programmer",
          bio: "High-speed arcade vehicle physics, custom raycasting engines, and retro racers.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f97316',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'neon-10',
    name: "Dark Cybernetic Core",
    description: "Pulsing plasma reactor SVG, heat telemetry, and overclocked commit velocity.",
    category: "Neon & Cyberpunk",
    accent: '#8b5cf6',
    tags: ['animated', 'backend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 71,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Distributed Consensus Engineer. Focus: Pulsing plasma reactor SVG, heat telemetry, and overclocked commit velocity.. Styling: dark theme with #8b5cf6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Dark Cybernetic Core Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Dark Cybernetic Core",
          role: "Distributed Consensus Engineer",
          bio: "Designing zero-knowledge proofs, state channels, and decentralized protocols.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-01',
    name: "Signal Bento Dashboard",
    description: "Multi-panel bento grid with language donut, velocity chart, and habit radar.",
    category: "Data Dashboard",
    accent: '#38bdf8',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 100,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Stack Data Engineer. Focus: Multi-panel bento grid with language donut, velocity chart, and habit radar.. Styling: dark theme with #38bdf8 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Signal Bento Dashboard Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Signal Bento Dashboard",
          role: "Full-Stack Data Engineer",
          bio: "Turning high-volume telemetry streams into actionable executive intelligence.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-pie",
                      "type": "pie-chart",
                      "props": {
                              "content": {
                                      "chartMode": "top-langs-donut",
                                      "theme": "tokyonight",
                                      "title": "Language Distribution"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-02',
    name: "Contributor Velocity Radar",
    description: "52-week activity wave chart with streak telemetry and pull request metrics.",
    category: "Data Dashboard",
    accent: '#10b981',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 97,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Core Maintainer. Focus: 52-week activity wave chart with streak telemetry and pull request metrics.. Styling: dark theme with #10b981 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Contributor Velocity Radar Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Contributor Velocity Radar",
          role: "Core Maintainer",
          bio: "Maintaining consistent commit momentum and rigorous code review turnaround.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-03',
    name: "Full-Year Contribution Grid",
    description: "Real GitHub contribution matrix with streak counter and heat levels.",
    category: "Data Dashboard",
    accent: '#22c55e',
    tags: ['data', 'backend', 'beginner'],
    visualStyle: 'data',
    developerType: 'backend',
    difficulty: 'beginner',
    popularity: 94,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Open-Source Lead. Focus: Real GitHub contribution matrix with streak counter and heat levels.. Styling: dark theme with #22c55e accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Full-Year Contribution Grid Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Full-Year Contribution Grid",
          role: "Open-Source Lead",
          bio: "Green grid every single day. Relentless execution and continuous delivery.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#22c55e',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-contributions",
                      "type": "portfolio-contributions",
                      "props": {
                              "content": {
                                      "theme": "emerald"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-04',
    name: "Language Distribution Donut",
    description: "Interactive percentage breakdown across primary programming stacks.",
    category: "Data Dashboard",
    accent: '#f59e0b',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 91,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Polyglot Software Architect. Focus: Interactive percentage breakdown across primary programming stacks.. Styling: dark theme with #f59e0b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Language Distribution Donut Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Language Distribution Donut",
          role: "Polyglot Software Architect",
          bio: "Fluent in TypeScript, Rust, Python, Go, and SQL. Picking the right tool for the job.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-pie",
                      "type": "pie-chart",
                      "props": {
                              "content": {
                                      "chartMode": "top-langs-donut",
                                      "theme": "radical",
                                      "title": "Top Languages Breakdown"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-05',
    name: "WakaTime Editor Telemetry",
    description: "Coding time distribution across VSCode, Neovim, and terminal editors.",
    category: "Data Dashboard",
    accent: '#6366f1',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 88,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Software Craftsman. Focus: Coding time distribution across VSCode, Neovim, and terminal editors.. Styling: dark theme with #6366f1 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "WakaTime Editor Telemetry Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "WakaTime Editor Telemetry",
          role: "Software Craftsman",
          bio: "Deep focus coder. Logging 40+ hours of focused code time each week.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-06',
    name: "GitHub Metric Cards Suite",
    description: "Verified total stars, forks, commits, and pull requests telemetry.",
    category: "Data Dashboard",
    accent: '#ffe600',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 85,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a High-Impact Contributor. Focus: Verified total stars, forks, commits, and pull requests telemetry.. Styling: dark theme with #ffe600 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "GitHub Metric Cards Suite Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "GitHub Metric Cards Suite",
          role: "High-Impact Contributor",
          bio: "Authored tools starred by thousands of developers globally.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-07',
    name: "Habit & Time Analytics",
    description: "Peak commit hours radar, morning vs night owl metrics, and day-of-week heatmap.",
    category: "Data Dashboard",
    accent: '#06b6d4',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 82,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Productivity Hacker & Engineer. Focus: Peak commit hours radar, morning vs night owl metrics, and day-of-week heatmap.. Styling: dark theme with #06b6d4 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Habit & Time Analytics Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Habit & Time Analytics",
          role: "Productivity Hacker & Engineer",
          bio: "Morning flow state builder. Optimizing cognitive load and commit cadence.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-08',
    name: "Repo Star Tracker HUD",
    description: "Live stargazers telemetry, repository sparklines, and fork counts.",
    category: "Data Dashboard",
    accent: '#eab308',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 79,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Open-Source Creator. Focus: Live stargazers telemetry, repository sparklines, and fork counts.. Styling: dark theme with #eab308 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Repo Star Tracker HUD Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Repo Star Tracker HUD",
          role: "Open-Source Creator",
          bio: "Tracking exponential repository growth, community adoption, and star velocity.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#eab308',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-09',
    name: "Code Review & PR Scorecard",
    description: "Community reviews given, merged pull requests, and turnaround velocity.",
    category: "Data Dashboard",
    accent: '#14b8a6',
    tags: ['data', 'fullstack', 'advanced'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'advanced',
    popularity: 76,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Principal Reviewer & Maintainer. Focus: Community reviews given, merged pull requests, and turnaround velocity.. Styling: dark theme with #14b8a6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Code Review & PR Scorecard Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Code Review & PR Scorecard",
          role: "Principal Reviewer & Maintainer",
          bio: "Mentoring hundreds of contributors and conducting rigorous peer code reviews.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#14b8a6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'data-10',
    name: "Executive KPI Dashboard",
    description: "SLA uptime gauges, release velocity metrics, and milestone progress bars.",
    category: "Data Dashboard",
    accent: '#3b82f6',
    tags: ['data', 'devops', 'advanced'],
    visualStyle: 'data',
    developerType: 'devops',
    difficulty: 'advanced',
    popularity: 73,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Engineering Lead & Director. Focus: SLA uptime gauges, release velocity metrics, and milestone progress bars.. Styling: dark theme with #3b82f6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Executive KPI Dashboard Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Executive KPI Dashboard",
          role: "Engineering Lead & Director",
          bio: "Aligning business OKRs with continuous deployment health and SLA guarantees.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-01',
    name: "3D Isometric Commit City",
    description: "Skyscraper blocks generated from GitHub contribution history with 3D shadows.",
    category: "3D & Isometric",
    accent: '#ffe600',
    tags: ['3d', 'gamedev', 'advanced'],
    visualStyle: '3d',
    developerType: 'gamedev',
    difficulty: 'advanced',
    popularity: 102,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Graphics & Simulation Engineer. Focus: Skyscraper blocks generated from GitHub contribution history with 3D shadows.. Styling: dark theme with #ffe600 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "3D Isometric Commit City Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "3D Isometric Commit City",
          role: "Graphics & Simulation Engineer",
          bio: "Transforming year-long GitHub contributions into a towering 3D skyscraper skyline.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-city",
                      "type": "portfolio-contributions",
                      "props": {
                              "content": {
                                      "theme": "emerald"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-02',
    name: "Isometric Developer Desk",
    description: "3D isometric workstation with dual monitors, mechanical keyboard, and desk plant.",
    category: "3D & Isometric",
    accent: '#38bdf8',
    tags: ['3d', 'frontend', 'beginner'],
    visualStyle: '3d',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 99,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Frontend Craftsman. Focus: 3D isometric workstation with dual monitors, mechanical keyboard, and desk plant.. Styling: dark theme with #38bdf8 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Isometric Developer Desk Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Isometric Developer Desk",
          role: "Frontend Craftsman",
          bio: "Cozy mechanical keyboard clicks, dual ultrawide monitors, and clean code.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "react",
                                              "nextjs",
                                              "typescript",
                                              "tailwind"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-03',
    name: "Voxel Island Sandbox",
    description: "Floating voxel island with animated clouds and voxel coder character.",
    category: "3D & Isometric",
    accent: '#10b981',
    tags: ['3d', 'gamedev', 'advanced'],
    visualStyle: '3d',
    developerType: 'gamedev',
    difficulty: 'advanced',
    popularity: 96,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Indie Game Architect. Focus: Floating voxel island with animated clouds and voxel coder character.. Styling: dark theme with #10b981 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Voxel Island Sandbox Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Voxel Island Sandbox",
          role: "Indie Game Architect",
          bio: "Building voxel worlds, procedural terrain generators, and interactive sandboxes.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "cplusplus",
                                              "rust",
                                              "opengl",
                                              "godot"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-04',
    name: "Isometric Server Rack",
    description: "3D datacenter servers with flashing LEDs and rack cable management.",
    category: "3D & Isometric",
    accent: '#06b6d4',
    tags: ['3d', 'devops', 'advanced'],
    visualStyle: '3d',
    developerType: 'devops',
    difficulty: 'advanced',
    popularity: 93,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Datacenter Infrastructure Engineer. Focus: 3D datacenter servers with flashing LEDs and rack cable management.. Styling: dark theme with #06b6d4 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Isometric Server Rack Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Isometric Server Rack",
          role: "Datacenter Infrastructure Engineer",
          bio: "High-density blade servers, fiber interconnects, and cooling optimization.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "linux",
                                              "docker",
                                              "kubernetes",
                                              "ansible"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-05',
    name: "Geometric Polyhedron Core",
    description: "Rotating wireframe icosahedron with glowing vertices and nodes.",
    category: "3D & Isometric",
    accent: '#a855f7',
    tags: ['3d', 'backend', 'advanced'],
    visualStyle: '3d',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 90,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Mathematical Physicist & Coder. Focus: Rotating wireframe icosahedron with glowing vertices and nodes.. Styling: dark theme with #a855f7 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Geometric Polyhedron Core Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Geometric Polyhedron Core",
          role: "Mathematical Physicist & Coder",
          bio: "Non-Euclidean geometry, high-dimensional manifolds, and numerical simulations.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#a855f7',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "cplusplus",
                                              "julia",
                                              "latex"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-06',
    name: "Isometric Cloud Architecture",
    description: "Multi-tier AWS and Kubernetes microservices in 3D isometric view.",
    category: "3D & Isometric",
    accent: '#f59e0b',
    tags: ['3d', 'devops', 'advanced'],
    visualStyle: '3d',
    developerType: 'devops',
    difficulty: 'advanced',
    popularity: 87,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a AWS Solutions Architect. Focus: Multi-tier AWS and Kubernetes microservices in 3D isometric view.. Styling: dark theme with #f59e0b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Isometric Cloud Architecture Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Isometric Cloud Architecture",
          role: "AWS Solutions Architect",
          bio: "Visualizing serverless event-driven architectures with zero-latency queues.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "aws",
                                              "terraform",
                                              "kubernetes",
                                              "docker"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-07',
    name: "3D Glassmorphism Cube",
    description: "Transparent refractive glass cube with floating technology badges.",
    category: "3D & Isometric",
    accent: '#ec4899',
    tags: ['3d', 'frontend', 'beginner'],
    visualStyle: '3d',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 84,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Creative UI Technologist. Focus: Transparent refractive glass cube with floating technology badges.. Styling: dark theme with #ec4899 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "3D Glassmorphism Cube Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "3D Glassmorphism Cube",
          role: "Creative UI Technologist",
          bio: "Pushing browser rendering limits with WebGL materials and refractive glass.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "threejs",
                                              "webgl",
                                              "react",
                                              "typescript"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-08',
    name: "Isometric Game Level Map",
    description: "RPG dungeon room with treasure chests representing highlighted repositories.",
    category: "3D & Isometric",
    accent: '#eab308',
    tags: ['3d', 'gamedev', 'beginner'],
    visualStyle: '3d',
    developerType: 'gamedev',
    difficulty: 'beginner',
    popularity: 81,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Level Designer & Scripter. Focus: RPG dungeon room with treasure chests representing highlighted repositories.. Styling: dark theme with #eab308 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Isometric Game Level Map Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Isometric Game Level Map",
          role: "Level Designer & Scripter",
          bio: "Crafting isometric dungeon rooms, tilemaps, and atmospheric lighting.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#eab308',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "csharp",
                                              "unity",
                                              "blender",
                                              "python"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-09',
    name: "Voxel Cyber Street",
    description: "Isometric cyberpunk street scene with neon signs and animated delivery drones.",
    category: "3D & Isometric",
    accent: '#06b6d4',
    tags: ['3d', 'gamedev', 'advanced'],
    visualStyle: '3d',
    developerType: 'gamedev',
    difficulty: 'advanced',
    popularity: 78,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Voxel Artist & Game Coder. Focus: Isometric cyberpunk street scene with neon signs and animated delivery drones.. Styling: dark theme with #06b6d4 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Voxel Cyber Street Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Voxel Cyber Street",
          role: "Voxel Artist & Game Coder",
          bio: "Neon ramen shops, flying delivery hovercrafts, and rain-soaked voxel streets.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "blender",
                                              "cplusplus",
                                              "rust",
                                              "godot"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'iso-10',
    name: "3D Wireframe Landscape",
    description: "Perspective terrain grid with elevation peaks mapping commit frequency.",
    category: "3D & Isometric",
    accent: '#22c55e',
    tags: ['3d', 'backend', 'advanced'],
    visualStyle: '3d',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 75,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Scientific Computing Researcher. Focus: Perspective terrain grid with elevation peaks mapping commit frequency.. Styling: dark theme with #22c55e accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "3D Wireframe Landscape Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "3D Wireframe Landscape",
          role: "Scientific Computing Researcher",
          bio: "Topographic terrain modeling, fluid flow dynamics, and seismic simulation.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#22c55e',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-01',
    name: "Mountain Nature Coder",
    description: "Landscape mountain banner, stick-figure coder with squirrel/fox, toggleable stats/joke cards, and skills row.",
    category: "Illustrated & Mascot",
    accent: '#10b981',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 104,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Stack Developer & Nature Lover. Focus: Landscape mountain banner, stick-figure coder with squirrel/fox, toggleable stats/joke cards, and skills row.. Styling: dark theme with #10b981 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Mountain Nature Coder Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Mountain Nature Coder",
          role: "Full-Stack Developer & Nature Lover",
          bio: "Coding under the open sky. Building scalable web projects while exploring the outdoors.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "HELLO FELLOW DEVELOPERS!",
                                      "theme": "cyber-amber",
                                      "height": 210
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-views",
                      "type": "profile-views",
                      "props": {
                              "content": {
                                      "color": "green"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "react",
                                              "javascript",
                                              "cplusplus",
                                              "docker"
                                      ],
                                      "perLine": 5,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-02',
    name: "Cyber Monkey Copilot",
    description: "Official MonoForge cyber monkey with interactive HUD and floating sparks.",
    category: "Illustrated & Mascot",
    accent: '#ffe600',
    tags: ['animated', 'fullstack', 'beginner'],
    visualStyle: 'animated',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 101,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a MonoForge Core Contributor. Focus: Official MonoForge cyber monkey with interactive HUD and floating sparks.. Styling: dark theme with #ffe600 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Cyber Monkey Copilot Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Cyber Monkey Copilot",
          role: "MonoForge Core Contributor",
          bio: "Forging exceptional GitHub profiles with vector kinematics and real telemetry.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-mascot",
                      "type": "mascot-bio",
                      "props": {
                              "content": {
                                      "mascotType": "cyber-monkey",
                                      "greeting": "LET US FORGE SOMETHING LEGENDARY"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "react",
                                              "tailwind",
                                              "rust"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-03',
    name: "Pixel Coffee & Cat",
    description: "Cozy pixel art room with peeking black cat and steaming mug of coffee.",
    category: "Illustrated & Mascot",
    accent: '#f59e0b',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 98,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Stack Cozy Coder. Focus: Cozy pixel art room with peeking black cat and steaming mug of coffee.. Styling: dark theme with #f59e0b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Pixel Coffee & Cat Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Pixel Coffee & Cat",
          role: "Full-Stack Cozy Coder",
          bio: "Writing code accompanied by lo-fi beats, warm tea, and a curious black cat.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "react",
                                              "python",
                                              "vue",
                                              "tailwind"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-04',
    name: "Ninja Coder Combat Stance",
    description: "Fluttering headband, katana glint, and stealth dark-mode aesthetics.",
    category: "Illustrated & Mascot",
    accent: '#ef4444',
    tags: ['animated', 'backend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 95,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Security & Penetration Tester. Focus: Fluttering headband, katana glint, and stealth dark-mode aesthetics.. Styling: dark theme with #ef4444 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Ninja Coder Combat Stance Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Ninja Coder Combat Stance",
          role: "Security & Penetration Tester",
          bio: "Silent, swift, and lethal in production. Zero footprint security audits.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-05',
    name: "Builder Dwarf Smith",
    description: "Rhythmic hammer strikes on anvil with flying golden sparks.",
    category: "Illustrated & Mascot",
    accent: '#d97706',
    tags: ['animated', 'backend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 92,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Rust Systems Crafter. Focus: Rhythmic hammer strikes on anvil with flying golden sparks.. Styling: dark theme with #d97706 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Builder Dwarf Smith Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Builder Dwarf Smith",
          role: "Rust Systems Crafter",
          bio: "Forging bulletproof systems in the fires of the compiler.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#d97706',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "rust",
                                              "c",
                                              "assembly",
                                              "linux"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-06',
    name: "Wizard Mage Staff",
    description: "Pulsating crystal orb staff with rotating runic magic circles.",
    category: "Illustrated & Mascot",
    accent: '#8b5cf6',
    tags: ['animated', 'backend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 89,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Algorithm Enchanter & Researcher. Focus: Pulsating crystal orb staff with rotating runic magic circles.. Styling: dark theme with #8b5cf6 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Wizard Mage Staff Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Wizard Mage Staff",
          role: "Algorithm Enchanter & Researcher",
          bio: "Casting spells of high-order complexity and data transformation.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "radical",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-07',
    name: "Roaming Cyber Bot",
    description: "Hovering companion robot with antenna beacon and terminal speech bubble.",
    category: "Illustrated & Mascot",
    accent: '#06b6d4',
    tags: ['animated', 'devops', 'beginner'],
    visualStyle: 'animated',
    developerType: 'devops',
    difficulty: 'beginner',
    popularity: 86,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Autonomous Drone Engineer. Focus: Hovering companion robot with antenna beacon and terminal speech bubble.. Styling: dark theme with #06b6d4 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Roaming Cyber Bot Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Roaming Cyber Bot",
          role: "Autonomous Drone Engineer",
          bio: "Programming quadcopters, autonomous rovers, and sensor telemetry.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "cplusplus",
                                              "ros",
                                              "linux"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-08',
    name: "Cozy Pixel Campfire",
    description: "Crackling campfire, starry night sky, and marshmallow coder illustration.",
    category: "Illustrated & Mascot",
    accent: '#ea580c',
    tags: ['colorful', 'frontend', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 83,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Community Educator. Focus: Crackling campfire, starry night sky, and marshmallow coder illustration.. Styling: dark theme with #ea580c accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Cozy Pixel Campfire Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Cozy Pixel Campfire",
          role: "Community Educator",
          bio: "Gather around the fire. Sharing lessons learned from a decade of coding.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ea580c',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "youtube",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-09',
    name: "Astronaut Space Explorer",
    description: "Floating zero-gravity spacewalker tethered to GitHub spaceship.",
    category: "Illustrated & Mascot",
    accent: '#38bdf8',
    tags: ['animated', 'backend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 80,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Aerospace Software Engineer. Focus: Floating zero-gravity spacewalker tethered to GitHub spaceship.. Styling: dark theme with #38bdf8 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Astronaut Space Explorer Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Astronaut Space Explorer",
          role: "Aerospace Software Engineer",
          bio: "Writing flight software for micro-satellites and deep space probes.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "c",
                                              "cplusplus",
                                              "python",
                                              "rust"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'illus-10',
    name: "Dragonborn Paladin",
    description: "Fantasy RPG warrior with shield badges and quest achievement log.",
    category: "Illustrated & Mascot",
    accent: '#dc2626',
    tags: ['colorful', 'gamedev', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'gamedev',
    difficulty: 'beginner',
    popularity: 77,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Gaming Backend Engineer. Focus: Fantasy RPG warrior with shield badges and quest achievement log.. Styling: dark theme with #dc2626 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Dragonborn Paladin Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Dragonborn Paladin",
          role: "Gaming Backend Engineer",
          bio: "Slaying bugs, defending uptime, and upholding code honor across the realm.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#dc2626',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "radical",
                                      "column": 3
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-01',
    name: "Anime Gaming Connector",
    description: "Retro gaming banner, social pills, anime character hero, and chat prompt.",
    category: "Creative & Anime-Inspired",
    accent: '#8b5cf6',
    tags: ['colorful', 'gamedev', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'gamedev',
    difficulty: 'beginner',
    popularity: 106,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Game Developer & Anime Enthusiast. Focus: Retro gaming banner, social pills, anime character hero, and chat prompt.. Styling: dark theme with #8b5cf6 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Anime Gaming Connector Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Anime Gaming Connector",
          role: "Game Developer & Anime Enthusiast",
          bio: "Building multiplayer games, gaming bots, and vibrant developer communities. Let us connect!",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "HEY EVERYONE! LET US CONNECT!",
                                      "theme": "ocean-blue",
                                      "height": 200
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "twitter",
                                              "discord"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "unity",
                                              "csharp",
                                              "cplusplus",
                                              "godot"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-02',
    name: "Demon Slayer Night Blade",
    description: "Dark purple and cyan sword slashes with animated water/fire breathing effects.",
    category: "Creative & Anime-Inspired",
    accent: '#06b6d4',
    tags: ['animated', 'fullstack', 'advanced'],
    visualStyle: 'animated',
    developerType: 'fullstack',
    difficulty: 'advanced',
    popularity: 103,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Stack Web Samurai. Focus: Dark purple and cyan sword slashes with animated water/fire breathing effects.. Styling: dark theme with #06b6d4 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Demon Slayer Night Blade Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Demon Slayer Night Blade",
          role: "Full-Stack Web Samurai",
          bio: "Total Concentration: Code Breathing, Eleventh Form: Zero Production Bugs.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "TOTAL CONCENTRATION BREATHING",
                                              "ELEVENTH FORM: DEAD CALM",
                                              "SLAYING PRODUCTION BUGS"
                                      ],
                                      "color": "#06b6d4"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "react",
                                              "nextjs",
                                              "tailwind"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-03',
    name: "Lo-Fi Study Beats Anime",
    description: "Rainy window pane, headphone coder, and pastel sunset aesthetic.",
    category: "Creative & Anime-Inspired",
    accent: '#f472b6',
    tags: ['colorful', 'frontend', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 100,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Frontend Developer. Focus: Rainy window pane, headphone coder, and pastel sunset aesthetic.. Styling: dark theme with #f472b6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Lo-Fi Study Beats Anime Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Lo-Fi Study Beats Anime",
          role: "Frontend Developer",
          bio: "Chill beats, rainfall outside, and writing clean React components into the night.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f472b6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "react",
                                              "vue",
                                              "tailwind",
                                              "javascript"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-04',
    name: "Mecha Pilot Cockpit",
    description: "Gundam HUD interface with tactical radar and target tracking systems.",
    category: "Creative & Anime-Inspired",
    accent: '#3b82f6',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 97,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Robotics Software Architect. Focus: Gundam HUD interface with tactical radar and target tracking systems.. Styling: dark theme with #3b82f6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Mecha Pilot Cockpit Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Mecha Pilot Cockpit",
          role: "Robotics Software Architect",
          bio: "Synchronizing neural interface with telemetry HUD. All weapons systems online.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-05',
    name: "Chibi Tech Squad",
    description: "Kawaii chibi avatars holding tech logos with pastel speech bubbles.",
    category: "Creative & Anime-Inspired",
    accent: '#fb7185',
    tags: ['light', 'frontend', 'beginner'],
    visualStyle: 'light',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 94,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a UI Designer & Frontend Coder. Focus: Kawaii chibi avatars holding tech logos with pastel speech bubbles.. Styling: light theme with #fb7185 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Chibi Tech Squad Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Chibi Tech Squad",
          role: "UI Designer & Frontend Coder",
          bio: "Cute designs, joyful interactions, and friendly accessible web experiences.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#fb7185',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "html5",
                                              "css3",
                                              "javascript",
                                              "react"
                                      ],
                                      "perLine": 4,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-06',
    name: "Magical Girl Sparkle",
    description: "Starry ribbons, glowing wands, and vibrant pastel gradient badges.",
    category: "Creative & Anime-Inspired",
    accent: '#ec4899',
    tags: ['colorful', 'frontend', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 91,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Creative Web Developer. Focus: Starry ribbons, glowing wands, and vibrant pastel gradient badges.. Styling: light theme with #ec4899 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Magical Girl Sparkle Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Magical Girl Sparkle",
          role: "Creative Web Developer",
          bio: "Transforming bland web pages into shimmering, delightful digital experiences.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "css3",
                                              "react",
                                              "tailwind",
                                              "framer"
                                      ],
                                      "perLine": 4,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-07',
    name: "Cyberpunk Edgerunner",
    description: "Sandevistan motion blurs, neon yellow jacket accents, and urban skyline.",
    category: "Creative & Anime-Inspired",
    accent: '#facc15',
    tags: ['animated', 'backend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 88,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a High-Frequency Trading Coder. Focus: Sandevistan motion blurs, neon yellow jacket accents, and urban skyline.. Styling: dark theme with #facc15 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Cyberpunk Edgerunner Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Cyberpunk Edgerunner",
          role: "High-Frequency Trading Coder",
          bio: "Never fade away. Pushing overclocked microsecond execution on the edge.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#facc15',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "SANDEVISTAN ENGAGED",
                                              "SPEED OF EXECUTION: 0.1MS",
                                              "NEVER FADE AWAY"
                                      ],
                                      "color": "#facc15"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-08',
    name: "Studio Ghibli Meadow",
    description: "Hand-painted lush green meadows, floating dandelion seeds, and gentle breeze.",
    category: "Creative & Anime-Inspired",
    accent: '#22c55e',
    tags: ['light', 'fullstack', 'beginner'],
    visualStyle: 'light',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 85,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Stack Creative. Focus: Hand-painted lush green meadows, floating dandelion seeds, and gentle breeze.. Styling: light theme with #22c55e accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Studio Ghibli Meadow Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Studio Ghibli Meadow",
          role: "Full-Stack Creative",
          bio: "Handcrafted software inspired by nature, clouds, and gentle wind.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#22c55e',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-09',
    name: "Shonen Power Level HUD",
    description: "Commit streak power gauge with electrical lightning aura animations.",
    category: "Creative & Anime-Inspired",
    accent: '#ef4444',
    tags: ['animated', 'fullstack', 'beginner'],
    visualStyle: 'animated',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 82,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Competitive Programmer. Focus: Commit streak power gauge with electrical lightning aura animations.. Styling: dark theme with #ef4444 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Shonen Power Level HUD Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Shonen Power Level HUD",
          role: "Competitive Programmer",
          bio: "Commit power level: OVER 9000! Training daily in the hyperbolic code chamber.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "radical",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'anime-10',
    name: "Retro Manga Screentone",
    description: "Black-and-white comic halftone dots, dynamic action speed lines, and speech balloons.",
    category: "Creative & Anime-Inspired",
    accent: '#000000',
    tags: ['dark', 'fullstack', 'beginner'],
    visualStyle: 'dark',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 79,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Graphic Novel & Tech Lead. Focus: Black-and-white comic halftone dots, dynamic action speed lines, and speech balloons.. Styling: dark theme with #000000 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Retro Manga Screentone Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Retro Manga Screentone",
          role: "Graphic Novel & Tech Lead",
          bio: "Drawing high-contrast comic panels by day, writing Rust microservices by night.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#000000',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "rust",
                                              "typescript",
                                              "figma"
                                      ],
                                      "perLine": 3,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-01',
    name: "Computer Science Undergrad",
    description: "University coursework, academic milestones, and data structures roadmap.",
    category: "Student & Learning Journey",
    accent: '#2563eb',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 108,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a CS Student & Aspiring SDE. Focus: University coursework, academic milestones, and data structures roadmap.. Styling: dark theme with #2563eb accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Computer Science Undergrad Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Computer Science Undergrad",
          role: "CS Student & Aspiring SDE",
          bio: "Junior year Computer Science student. Studying algorithms, databases, and operating systems.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#2563eb',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "java",
                                              "python",
                                              "c",
                                              "git"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-02',
    name: "Bootcamp Career Switcher",
    description: "100 Days of Code tracker, project showcase, and before/after progression.",
    category: "Student & Learning Journey",
    accent: '#059669',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 105,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Junior Full-Stack Engineer. Focus: 100 Days of Code tracker, project showcase, and before/after progression.. Styling: dark theme with #059669 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Bootcamp Career Switcher Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Bootcamp Career Switcher",
          role: "Junior Full-Stack Engineer",
          bio: "Former educator turned full-stack developer. Completing 100 Days of Code.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#059669',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "javascript",
                                              "react",
                                              "nodejs",
                                              "mongodb"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-03',
    name: "Open-Source Apprentice",
    description: "First-timers-only issues conquered, mentor thank-yous, and learning roadmap.",
    category: "Student & Learning Journey",
    accent: '#7c3aed',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 102,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Junior Contributor. Focus: First-timers-only issues conquered, mentor thank-yous, and learning roadmap.. Styling: dark theme with #7c3aed accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Open-Source Apprentice Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Open-Source Apprentice",
          role: "Junior Contributor",
          bio: "Learning in public. Contributing bug fixes and docs to open-source libraries.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#7c3aed',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 3
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-04',
    name: "Self-Taught Polyglot",
    description: "Interactive skills tree with unlocked levels and current exploration targets.",
    category: "Student & Learning Journey",
    accent: '#ea580c',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 99,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Self-Taught Developer. Focus: Interactive skills tree with unlocked levels and current exploration targets.. Styling: dark theme with #ea580c accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Self-Taught Polyglot Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Self-Taught Polyglot",
          role: "Self-Taught Developer",
          bio: "Zero formal CS degree. Driven by curiosity, documentation, and building real projects.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ea580c',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "html5",
                                              "css3",
                                              "javascript",
                                              "python"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-05',
    name: "Research Lab Fellow",
    description: "arXiv preprints, thesis objectives, lab experiment logs, and advisor notes.",
    category: "Student & Learning Journey",
    accent: '#0284c7',
    tags: ['light', 'backend', 'advanced'],
    visualStyle: 'light',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 96,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Graduate Research Assistant. Focus: arXiv preprints, thesis objectives, lab experiment logs, and advisor notes.. Styling: light theme with #0284c7 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Research Lab Fellow Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Research Lab Fellow",
          role: "Graduate Research Assistant",
          bio: "Conducting empirical research on distributed consensus and formal verification.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "email"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-06',
    name: "LeetCode Grindmaster",
    description: "Algorithm problem counts (Easy/Med/Hard), contest rating badge, and tips.",
    category: "Student & Learning Journey",
    accent: '#f59e0b',
    tags: ['data', 'backend', 'advanced'],
    visualStyle: 'data',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 93,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Algorithm Problem Solver. Focus: Algorithm problem counts (Easy/Med/Hard), contest rating badge, and tips.. Styling: dark theme with #f59e0b accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "LeetCode Grindmaster Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "LeetCode Grindmaster",
          role: "Algorithm Problem Solver",
          bio: "Solved 800+ LeetCode problems. Daily algorithmic practice in C++ and Python.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "cplusplus",
                                              "python",
                                              "java"
                                      ],
                                      "perLine": 3,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-07',
    name: "Hackathon Champion",
    description: "Trophy showcase, live demo links, and hackathon winner badges.",
    category: "Student & Learning Journey",
    accent: '#e11d48',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 90,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Hackathon Team Captain. Focus: Trophy showcase, live demo links, and hackathon winner badges.. Styling: dark theme with #e11d48 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Hackathon Champion Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Hackathon Champion",
          role: "Hackathon Team Captain",
          bio: "12 hackathons won. 48-hour prototype machine turning caffeine into working MVPs.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#e11d48',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "radical",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-08',
    name: "Full-Stack Certificate Path",
    description: "Verified certifications with issue dates, credential badges, and roadmap.",
    category: "Student & Learning Journey",
    accent: '#0891b2',
    tags: ['minimal', 'devops', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'devops',
    difficulty: 'beginner',
    popularity: 87,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Certified Cloud Practitioner. Focus: Verified certifications with issue dates, credential badges, and roadmap.. Styling: dark theme with #0891b2 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Full-Stack Certificate Path Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Full-Stack Certificate Path",
          role: "Certified Cloud Practitioner",
          bio: "Verified AWS, GCP, and Meta certifications. Dedicated to continuous upskilling.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#0891b2',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "aws",
                                              "docker",
                                              "linux",
                                              "python"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-09',
    name: "Daily Dev Log",
    description: "TIL bullet series, weekly goals, and engineering book reading tracker.",
    category: "Student & Learning Journey",
    accent: '#4f46e5',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 84,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Junior Software Engineer. Focus: TIL bullet series, weekly goals, and engineering book reading tracker.. Styling: dark theme with #4f46e5 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Daily Dev Log Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Daily Dev Log",
          role: "Junior Software Engineer",
          bio: "Documenting daily learnings: new git tricks, CSS gotchas, and database queries.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#4f46e5',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'stud-10',
    name: "Interactive Learning Roadmap",
    description: "Visual step-by-step path from frontend basics to distributed systems.",
    category: "Student & Learning Journey",
    accent: '#16a34a',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 81,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Aspiring Systems Engineer. Focus: Visual step-by-step path from frontend basics to distributed systems.. Styling: dark theme with #16a34a accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Interactive Learning Roadmap Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Interactive Learning Roadmap",
          role: "Aspiring Systems Engineer",
          bio: "Following an ambitious 2-year roadmap from web fundamentals to OS development.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#16a34a',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "html5",
                                              "javascript",
                                              "react",
                                              "nodejs"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-01',
    name: "Best-README Flagship",
    description: "The world-standard repository template with reference shields, TOC, and 60+ tech badges.",
    category: "Open-Source Maintainer",
    accent: '#ffe600',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 110,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Open-Source Lead Maintainer. Focus: The world-standard repository template with reference shields, TOC, and 60+ tech badges.. Styling: dark theme with #ffe600 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Best-README Flagship Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Best-README Flagship",
          role: "Open-Source Lead Maintainer",
          bio: "The gold standard repository documentation template with reference shields and collapsible TOC.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "BEST-README-TEMPLATE",
                                      "theme": "cyber-amber",
                                      "height": 210
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "nextjs",
                                              "react",
                                              "typescript",
                                              "tailwind",
                                              "rust"
                                      ],
                                      "perLine": 5,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-02',
    name: "Community Ecosystem Lead",
    description: "Good first issues list, contributor wall, and sponsorship callouts.",
    category: "Open-Source Maintainer",
    accent: '#10b981',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 107,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Open Source Community Manager. Focus: Good first issues list, contributor wall, and sponsorship callouts.. Styling: dark theme with #10b981 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Community Ecosystem Lead Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Community Ecosystem Lead",
          role: "Open Source Community Manager",
          bio: "Growing healthy contributor communities. Triaging issues, writing guides, and welcoming newcomers.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "discord",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-03',
    name: "Library Author Showcase",
    description: "Download counters, version badges, bundle sizes, and quick install snippets.",
    category: "Open-Source Maintainer",
    accent: '#ef4444',
    tags: ['data', 'fullstack', 'beginner'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 104,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a npm & Crates.io Author. Focus: Download counters, version badges, bundle sizes, and quick install snippets.. Styling: dark theme with #ef4444 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Library Author Showcase Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Library Author Showcase",
          role: "npm & Crates.io Author",
          bio: "Packages downloaded 500k+ times per month. Zero-dependency utility creator.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "rust",
                                              "nodejs",
                                              "jest"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-04',
    name: "Monorepo Architecture Hub",
    description: "Multi-package directory overview, CI status matrix, and contribution guide.",
    category: "Open-Source Maintainer",
    accent: '#3b82f6',
    tags: ['minimal', 'fullstack', 'advanced'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'advanced',
    popularity: 101,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Turborepo & Nx Architect. Focus: Multi-package directory overview, CI status matrix, and contribution guide.. Styling: dark theme with #3b82f6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Monorepo Architecture Hub Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Monorepo Architecture Hub",
          role: "Turborepo & Nx Architect",
          bio: "Orchestrating multi-package monorepos with caching, parallel builds, and atomic PRs.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "typescript",
                                              "turborepo",
                                              "docker",
                                              "pnpm"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-05',
    name: "RFC & Governance Architect",
    description: "Project vision, RFC proposals, roadmap voting, and community governance.",
    category: "Open-Source Maintainer",
    accent: '#475569',
    tags: ['minimal', 'fullstack', 'advanced'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'advanced',
    popularity: 98,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Steering Committee Member. Focus: Project vision, RFC proposals, roadmap voting, and community governance.. Styling: dark theme with #475569 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "RFC & Governance Architect Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "RFC & Governance Architect",
          role: "Steering Committee Member",
          bio: "Formulating technical specifications, community RFCs, and API compatibility guarantees.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#475569',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "email"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-06',
    name: "Security & CVE Response Lead",
    description: "Security policy, vulnerability reporting protocols, and audit badges.",
    category: "Open-Source Maintainer",
    accent: '#f97316',
    tags: ['dark', 'backend', 'advanced'],
    visualStyle: 'dark',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 95,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Open-Source Security Auditor. Focus: Security policy, vulnerability reporting protocols, and audit badges.. Styling: dark theme with #f97316 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Security & CVE Response Lead Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Security & CVE Response Lead",
          role: "Open-Source Security Auditor",
          bio: "Publishing security advisories, coordinating patched releases, and threat modeling.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f97316',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-07',
    name: "Sponsorship & Backer Gallery",
    description: "GitHub Sponsors tiers, Open Collective backers grid, and thank-you notes.",
    category: "Open-Source Maintainer",
    accent: '#ec4899',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 92,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full-Time Independent Maintainer. Focus: GitHub Sponsors tiers, Open Collective backers grid, and thank-you notes.. Styling: dark theme with #ec4899 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Sponsorship & Backer Gallery Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Sponsorship & Backer Gallery",
          role: "Full-Time Independent Maintainer",
          bio: "Funded by the community. Building public goods without corporate paywalls.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "sponsor",
                                              "twitter"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-08',
    name: "Release & Changelog Tracker",
    description: "Semantic version milestones, automated release notes, and download links.",
    category: "Open-Source Maintainer",
    accent: '#14b8a6',
    tags: ['minimal', 'devops', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'devops',
    difficulty: 'beginner',
    popularity: 89,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Release Engineer. Focus: Semantic version milestones, automated release notes, and download links.. Styling: dark theme with #14b8a6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Release & Changelog Tracker Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Release & Changelog Tracker",
          role: "Release Engineer",
          bio: "Automated semantic releases, changelog generation, and zero-breaking-change migrations.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#14b8a6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-09',
    name: "Documentation Specialist",
    description: "Interactive guide links, typed API references, and translation matrix.",
    category: "Open-Source Maintainer",
    accent: '#6366f1',
    tags: ['light', 'frontend', 'beginner'],
    visualStyle: 'light',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 86,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Docs & DX Lead. Focus: Interactive guide links, typed API references, and translation matrix.. Styling: light theme with #6366f1 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Documentation Specialist Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Documentation Specialist",
          role: "Docs & DX Lead",
          bio: "If it is not documented, it does not exist. Creating delightful developer docs.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "markdown",
                                              "nextjs",
                                              "typescript",
                                              "react"
                                      ],
                                      "perLine": 4,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'oss-10',
    name: "Cross-Repo Contributor Hub",
    description: "Verified merged PRs across major open source organizations.",
    category: "Open-Source Maintainer",
    accent: '#ffe600',
    tags: ['data', 'fullstack', 'advanced'],
    visualStyle: 'data',
    developerType: 'fullstack',
    difficulty: 'advanced',
    popularity: 83,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Global Open-Source Contributor. Focus: Verified merged PRs across major open source organizations.. Styling: dark theme with #ffe600 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Cross-Repo Contributor Hub Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Cross-Repo Contributor Hub",
          role: "Global Open-Source Contributor",
          bio: "Contributed code merged into Node.js, Next.js, Biome, and Linux kernel.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "flat",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-01',
    name: "Superhero GenAI Architect",
    description: "Cyan-to-green gradient banner, status metadata pills, cape coder artwork, split about-me, and skills row.",
    category: "AI, ML & Data Science",
    accent: '#10b981',
    tags: ['colorful', 'aiml', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'aiml',
    difficulty: 'beginner',
    popularity: 112,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Full Stack & GenAI Solutions Architect. Focus: Cyan-to-green gradient banner, status metadata pills, cape coder artwork, split about-me, and skills row.. Styling: dark theme with #10b981 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Superhero GenAI Architect Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Superhero GenAI Architect",
          role: "Full Stack & GenAI Solutions Architect",
          bio: "Building production-focused scalable backend systems, LLM prompt engineering, RAG workflows, and developer tools.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-banner",
                      "type": "capsule-banner",
                      "props": {
                              "content": {
                                      "text": "FULL STACK // GENAI SOLUTIONS ARCHITECT",
                                      "theme": "ocean-blue",
                                      "height": 210
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-views",
                      "type": "profile-views",
                      "props": {
                              "content": {
                                      "color": "green"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "django",
                                              "fastapi",
                                              "react",
                                              "angular",
                                              "docker",
                                              "postgresql",
                                              "redis"
                                      ],
                                      "perLine": 8,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-socials",
                      "type": "socials",
                      "props": {
                              "content": {
                                      "platforms": [
                                              "github",
                                              "linkedin",
                                              "twitter",
                                              "email"
                                      ]
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-02',
    name: "Deep Learning Researcher",
    description: "Neural network weights architecture, PyTorch models, and loss curve metrics.",
    category: "AI, ML & Data Science",
    accent: '#8b5cf6',
    tags: ['data', 'aiml', 'advanced'],
    visualStyle: 'data',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 109,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a AI Research Scientist. Focus: Neural network weights architecture, PyTorch models, and loss curve metrics.. Styling: dark theme with #8b5cf6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Deep Learning Researcher Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Deep Learning Researcher",
          role: "AI Research Scientist",
          bio: "Investigating transformer attention mechanisms, sparse representations, and latent diffusion.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "pytorch",
                                              "python",
                                              "cuda",
                                              "cplusplus"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-03',
    name: "LLM & Agent Systems Lead",
    description: "RAG pipelines, LangChain / LlamaIndex workflows, and vector database cards.",
    category: "AI, ML & Data Science",
    accent: '#06b6d4',
    tags: ['animated', 'aiml', 'advanced'],
    visualStyle: 'animated',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 106,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a AI Agent Architect. Focus: RAG pipelines, LangChain / LlamaIndex workflows, and vector database cards.. Styling: dark theme with #06b6d4 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "LLM & Agent Systems Lead Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "LLM & Agent Systems Lead",
          role: "AI Agent Architect",
          bio: "Deploying autonomous agentic loops, function calling, and vector indexing at scale.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "AUTONOMOUS RAG PIPELINE",
                                              "VECTOR EMBEDDING INDEXED",
                                              "MULTI-AGENT CONSENSUS"
                                      ],
                                      "color": "#06b6d4"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-04',
    name: "Computer Vision Specialist",
    description: "Object detection bounding boxes, OpenCV pipeline, and diffusion models.",
    category: "AI, ML & Data Science",
    accent: '#f59e0b',
    tags: ['data', 'aiml', 'advanced'],
    visualStyle: 'data',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 103,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a CV & Robotics Engineer. Focus: Object detection bounding boxes, OpenCV pipeline, and diffusion models.. Styling: dark theme with #f59e0b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Computer Vision Specialist Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Computer Vision Specialist",
          role: "CV & Robotics Engineer",
          bio: "Real-time object detection, 3D point cloud reconstruction, and spatial computing.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "cplusplus",
                                              "opencv",
                                              "pytorch"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-05',
    name: "NLP & Transformer Engineer",
    description: "HuggingFace model cards, tokenization pipelines, and benchmark leaderboards.",
    category: "AI, ML & Data Science",
    accent: '#ec4899',
    tags: ['colorful', 'aiml', 'advanced'],
    visualStyle: 'colorful',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 100,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a NLP Research Engineer. Focus: HuggingFace model cards, tokenization pipelines, and benchmark leaderboards.. Styling: dark theme with #ec4899 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "NLP & Transformer Engineer Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "NLP & Transformer Engineer",
          role: "NLP Research Engineer",
          bio: "Fine-tuning multilingual language models, RLHF, and parameter-efficient LoRA adapters.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "radical"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-06',
    name: "Data Engineer & MLOps",
    description: "Kafka streaming pipelines, Airflow DAGs, and feature store architectures.",
    category: "AI, ML & Data Science",
    accent: '#0284c7',
    tags: ['data', 'aiml', 'advanced'],
    visualStyle: 'data',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 97,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Senior MLOps Platform Lead. Focus: Kafka streaming pipelines, Airflow DAGs, and feature store architectures.. Styling: dark theme with #0284c7 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Data Engineer & MLOps Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Data Engineer & MLOps",
          role: "Senior MLOps Platform Lead",
          bio: "Automating end-to-end model training, feature stores, and zero-downtime serving.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "docker",
                                              "kubernetes",
                                              "postgresql"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-07',
    name: "Bioinformatics & Genomics",
    description: "DNA sequence alignment, CRISPR algorithms, and molecular modeling.",
    category: "AI, ML & Data Science",
    accent: '#10b981',
    tags: ['light', 'aiml', 'advanced'],
    visualStyle: 'light',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 94,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Computational Biologist. Focus: DNA sequence alignment, CRISPR algorithms, and molecular modeling.. Styling: light theme with #10b981 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Bioinformatics & Genomics Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Bioinformatics & Genomics",
          role: "Computational Biologist",
          bio: "CRISPR off-target prediction, sequence alignment, and high-throughput genomic pipelines.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "python",
                                              "r",
                                              "cplusplus",
                                              "linux"
                                      ],
                                      "perLine": 4,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-08',
    name: "Quantitative Finance Researcher",
    description: "Low-latency backtesting algorithms, Sharpe ratios, and risk models.",
    category: "AI, ML & Data Science",
    accent: '#eab308',
    tags: ['data', 'backend', 'advanced'],
    visualStyle: 'data',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 91,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Quant Developer. Focus: Low-latency backtesting algorithms, Sharpe ratios, and risk models.. Styling: dark theme with #eab308 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Quantitative Finance Researcher Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Quantitative Finance Researcher",
          role: "Quant Developer",
          bio: "Algorithmic trading strategies, stochastic calculus, and microsecond market feeds.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#eab308',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-activity",
                      "type": "activity-graph",
                      "props": {
                              "content": {
                                      "theme": "github-dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-09',
    name: "Autonomous Robotics / ROS2",
    description: "LiDAR point clouds, SLAM navigation, and Gazebo simulation telemetry.",
    category: "AI, ML & Data Science",
    accent: '#f97316',
    tags: ['3d', 'aiml', 'advanced'],
    visualStyle: '3d',
    developerType: 'aiml',
    difficulty: 'advanced',
    popularity: 88,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Robotics Navigation Engineer. Focus: LiDAR point clouds, SLAM navigation, and Gazebo simulation telemetry.. Styling: dark theme with #f97316 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Autonomous Robotics / ROS2 Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Autonomous Robotics / ROS2",
          role: "Robotics Navigation Engineer",
          bio: "SLAM algorithms, LiDAR point clouds, and path planning on autonomous platforms.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f97316',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "cplusplus",
                                              "python",
                                              "ros",
                                              "linux"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'aiml-10',
    name: "Kaggle Grandmaster",
    description: "Medal cabinet, competition rankings, dataset cards, and notebook showcases.",
    category: "AI, ML & Data Science",
    accent: '#06b6d4',
    tags: ['data', 'aiml', 'beginner'],
    visualStyle: 'data',
    developerType: 'aiml',
    difficulty: 'beginner',
    popularity: 85,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Competitive ML Specialist. Focus: Medal cabinet, competition rankings, dataset cards, and notebook showcases.. Styling: dark theme with #06b6d4 accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Kaggle Grandmaster Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Kaggle Grandmaster",
          role: "Competitive ML Specialist",
          bio: "Ranked in the top 0.1% on Kaggle. Ensembling XGBoost, LightGBM, and neural architectures.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-trophy",
                      "type": "github-profile-trophy",
                      "props": {
                              "content": {
                                      "theme": "radical",
                                      "column": 4
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-01',
    name: "Next.js 16 Cloud Architect",
    description: "App Router showcase, server components, Tailwind CSS, and Vercel edge deployment.",
    category: "Full-Stack Developer Portfolio",
    accent: '#000000',
    tags: ['minimal', 'fullstack', 'beginner'],
    visualStyle: 'minimal',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 114,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Staff Full-Stack Architect. Focus: App Router showcase, server components, Tailwind CSS, and Vercel edge deployment.. Styling: dark theme with #000000 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Next.js 16 Cloud Architect Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Next.js 16 Cloud Architect",
          role: "Staff Full-Stack Architect",
          bio: "Shipping high-performance web applications with Next.js 16, React Server Components, and Edge Cloud.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#000000',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "nextjs",
                                              "react",
                                              "typescript",
                                              "tailwind"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              },
              {
                      "id": "sec-stats",
                      "type": "github-readme-stats",
                      "props": {
                              "content": {
                                      "showIcons": true,
                                      "theme": "tokyonight"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-02',
    name: "Distributed Rust & Go Microservices",
    description: "High-throughput Tokio actors, gRPC APIs, Redis clusters, and event streams.",
    category: "Full-Stack Developer Portfolio",
    accent: '#00add8',
    tags: ['terminal', 'backend', 'advanced'],
    visualStyle: 'terminal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 111,
    featured: true,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Backend Platform Lead. Focus: High-throughput Tokio actors, gRPC APIs, Redis clusters, and event streams.. Styling: dark theme with #00add8 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Distributed Rust & Go Microservices Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Distributed Rust & Go Microservices",
          role: "Backend Platform Lead",
          bio: "High-throughput Tokio actors, gRPC APIs, Redis clusters, and zero-allocation networking.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#00add8',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "rust",
                                              "go",
                                              "grpc",
                                              "redis"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-03',
    name: "Mobile & Cross-Platform Lead",
    description: "Flutter / React Native app store links, interactive mobile mockup, and skills.",
    category: "Full-Stack Developer Portfolio",
    accent: '#02569b',
    tags: ['colorful', 'mobile', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'mobile',
    difficulty: 'beginner',
    popularity: 108,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Mobile Architect. Focus: Flutter / React Native app store links, interactive mobile mockup, and skills.. Styling: dark theme with #02569b accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Mobile & Cross-Platform Lead Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Mobile & Cross-Platform Lead",
          role: "Mobile Architect",
          bio: "Delivering buttery-smooth 120fps cross-platform mobile apps on iOS and Android.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#02569b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "flutter",
                                              "reactnative",
                                              "dart",
                                              "typescript",
                                              "swift",
                                              "kotlin"
                                      ],
                                      "perLine": 6,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-04',
    name: "Creative Frontend & WebGL",
    description: "Three.js shaders, GSAP interactive canvas, and typography experiments.",
    category: "Full-Stack Developer Portfolio",
    accent: '#f43f5e',
    tags: ['animated', 'frontend', 'advanced'],
    visualStyle: 'animated',
    developerType: 'frontend',
    difficulty: 'advanced',
    popularity: 105,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Interactive Creative Technologist. Focus: Three.js shaders, GSAP interactive canvas, and typography experiments.. Styling: dark theme with #f43f5e accents, center alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Creative Frontend & WebGL Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Creative Frontend & WebGL",
          role: "Interactive Creative Technologist",
          bio: "Crafting mesmerizing Three.js shaders, GSAP timelines, and experimental canvas graphics.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#f43f5e',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
              {
                      "id": "sec-typing",
                      "type": "readme-typing-svg",
                      "props": {
                              "content": {
                                      "lines": [
                                              "INTERACTIVE THREE.JS SHADERS",
                                              "GSAP TIMELINE CHOREOGRAPHY",
                                              "WEBGL CANVAS EXPERIMENTS"
                                      ],
                                      "color": "#f43f5e"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-05',
    name: "Enterprise Java / Spring Boot",
    description: "Microservices mesh, Kafka event streaming, Docker containers, and CI/CD.",
    category: "Full-Stack Developer Portfolio",
    accent: '#ea580c',
    tags: ['minimal', 'backend', 'advanced'],
    visualStyle: 'minimal',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 102,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Enterprise Systems Architect. Focus: Microservices mesh, Kafka event streaming, Docker containers, and CI/CD.. Styling: dark theme with #ea580c accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Enterprise Java / Spring Boot Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Enterprise Java / Spring Boot",
          role: "Enterprise Systems Architect",
          bio: "High-scale enterprise banking microservices, Kafka event streaming, and Spring Cloud.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#ea580c',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "java",
                                              "spring",
                                              "docker",
                                              "kubernetes"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-06',
    name: "GraphQL & API Master",
    description: "Apollo / Federation schemas, query execution metrics, and REST gateways.",
    category: "Full-Stack Developer Portfolio",
    accent: '#e10098',
    tags: ['colorful', 'fullstack', 'advanced'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'advanced',
    popularity: 99,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a API Platform Architect. Focus: Apollo / Federation schemas, query execution metrics, and REST gateways.. Styling: dark theme with #e10098 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "GraphQL & API Master Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "GraphQL & API Master",
          role: "API Platform Architect",
          bio: "Federated GraphQL schemas, subgraphs, sub-millisecond query execution, and typed SDKs.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#e10098',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "graphql",
                                              "typescript",
                                              "nodejs",
                                              "apollo"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-07',
    name: "Design Systems & UI Architect",
    description: "Storybook component library, accessible Radix tokens, and Figma synchronization.",
    category: "Full-Stack Developer Portfolio",
    accent: '#8b5cf6',
    tags: ['light', 'frontend', 'beginner'],
    visualStyle: 'light',
    developerType: 'frontend',
    difficulty: 'beginner',
    popularity: 96,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Principal Design Technologist. Focus: Storybook component library, accessible Radix tokens, and Figma synchronization.. Styling: light theme with #8b5cf6 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Design Systems & UI Architect Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Design Systems & UI Architect",
          role: "Principal Design Technologist",
          bio: "Maintaining component design tokens across React, Figma, and multi-brand platforms.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'light',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "figma",
                                              "storybook",
                                              "react",
                                              "tailwind"
                                      ],
                                      "perLine": 4,
                                      "theme": "light"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-08',
    name: "Database Tuner & Postgres DBA",
    description: "Query optimization, connection pools, replication topology, and monitoring.",
    category: "Full-Stack Developer Portfolio",
    accent: '#336791',
    tags: ['data', 'backend', 'advanced'],
    visualStyle: 'data',
    developerType: 'backend',
    difficulty: 'advanced',
    popularity: 93,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Database Reliability Engineer. Focus: Query optimization, connection pools, replication topology, and monitoring.. Styling: dark theme with #336791 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Database Tuner & Postgres DBA Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Database Tuner & Postgres DBA",
          role: "Database Reliability Engineer",
          bio: "Index tuning, query optimization, streaming replication, and connection pooling.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#336791',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "postgresql",
                                              "redis",
                                              "linux",
                                              "python"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-09',
    name: "Full-Stack Indie Hacker",
    description: "Bootstrapped SaaS metrics, product showcases, changelog, and tech stack.",
    category: "Full-Stack Developer Portfolio",
    accent: '#10b981',
    tags: ['colorful', 'fullstack', 'beginner'],
    visualStyle: 'colorful',
    developerType: 'fullstack',
    difficulty: 'beginner',
    popularity: 90,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Solopreneur & Product Builder. Focus: Bootstrapped SaaS metrics, product showcases, changelog, and tech stack.. Styling: dark theme with #10b981 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Full-Stack Indie Hacker Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Full-Stack Indie Hacker",
          role: "Solopreneur & Product Builder",
          bio: "Bootstrapping profitable SaaS products from idea to revenue. Shipping daily.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "nextjs",
                                              "tailwind",
                                              "supabase",
                                              "stripe"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  },
  {
    id: 'full-10',
    name: "Platform Engineer & SRE Lead",
    description: "Terraform infrastructure-as-code, Helm charts, and Datadog observability.",
    category: "Full-Stack Developer Portfolio",
    accent: '#06b6d4',
    tags: ['data', 'devops', 'advanced'],
    visualStyle: 'data',
    developerType: 'devops',
    difficulty: 'advanced',
    popularity: 87,
    featured: false,
    prompt: "Act as a world-class personal branding consultant. Generate a GitHub Profile README for a Principal Platform Engineer. Focus: Terraform infrastructure-as-code, Helm charts, and Datadog observability.. Styling: dark theme with #06b6d4 accents, left alignment, and modern developer aesthetics.",
    config: {
      version: '1.0.0',
      title: "Platform Engineer & SRE Lead Profile",
      settings: {
        user: {
          github: 'octocat',
          name: "Platform Engineer & SRE Lead",
          role: "Principal Platform Engineer",
          bio: "Automating developer environments, Kubernetes operators, and high-availability meshes.",
          location: 'Remote',
          pronouns: '',
          status: 'Active Builder',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
              {
                      "id": "sec-skills",
                      "type": "skill-icons",
                      "props": {
                              "content": {
                                      "skills": [
                                              "kubernetes",
                                              "terraform",
                                              "docker",
                                              "go"
                                      ],
                                      "perLine": 4,
                                      "theme": "dark"
                              },
                              "styles": {},
                              "state": "default"
                      }
              }
      ],
    },
  }
];
