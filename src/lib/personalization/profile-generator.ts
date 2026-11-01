import { ReadmeConfig, SectionConfig } from '#/lib/plugins/types';
import { v4 as uuidv4 } from 'uuid';

export type DeveloperPersonaRole =
  | 'ai-ml'
  | 'cloud-devops'
  | 'fullstack'
  | 'frontend-creative'
  | 'systems-embedded'
  | 'backend-distributed'
  | 'data-engineer'
  | 'open-source-maintainer'
  | 'synthwave-coder'
  | 'terminal-operator'
  | 'student-learner'
  | 'mobile-engineer'
  | 'game-dev'
  | 'security-researcher';

export interface PersonalizeProfileOptions {
  github: string;
  name?: string;
  role?: DeveloperPersonaRole | string;
  seniority?: 'student' | 'junior' | 'mid' | 'senior' | 'staff' | 'principal';
  careerFocus?: string;
  skills?: string[];
  vibe?: 'cyberpunk' | 'tokyonight' | 'dracula' | 'matrix' | 'minimal' | 'solar' | 'emerald' | 'amber' | 'slate';
  includeCharts?: boolean;
  includeTrophies?: boolean;
  includeSnake?: boolean;
  includeAchievements?: boolean;
  includeSignatureTelemetry?: boolean;
}

interface PersonaDetails {
  headlineRole: string;
  tagline: string;
  accentColor: string;
  theme: string;
  typingLines: string[];
  badges: string[];
  bioBullets: string[];
}

const PERSONA_CONFIGS: Record<string, PersonaDetails> = {
  'ai-ml': {
    headlineRole: 'AI Researcher & Machine Learning Engineer',
    tagline: 'Training frontier multi-modal models and architecting autonomous agent runtimes.',
    accentColor: '#10b981',
    theme: 'tokyonight',
    typingLines: [
      'Frontier Machine Learning & Transformer Models',
      'Autonomous Multi-Agent Architecture & Fine-Tuning',
      'High-Throughput Distributed Inference & RAG Runtimes',
    ],
    badges: ['python', 'pytorch', 'tensorflow', 'fastapi', 'huggingface', 'docker', 'cuda'],
    bioBullets: [
      'Exploring latent representations, generative video, and chain-of-thought architectures.',
      'Optimizing inference with TensorRT-LLM and vLLM on multi-GPU clusters.',
      'Active contributor to open-source ML research and Hugging Face models.',
    ],
  },
  'cloud-devops': {
    headlineRole: 'Staff Platform & Cloud SRE Architect',
    tagline: 'Automating everything between `git push` and resilient multi-region production.',
    accentColor: '#06b6d4',
    theme: 'nord',
    typingLines: [
      'Zero-Trust Multi-Region Kubernetes Meshes',
      'Declarative Infrastructure as Code with Terraform',
      'Sub-Second GitOps Pipelines & High-Availability Observability',
    ],
    badges: ['kubernetes', 'docker', 'terraform', 'go', 'rust', 'amazonwebservices', 'prometheus'],
    bioBullets: [
      'Hardening zero-downtime microservice topologies and Istio service meshes.',
      'Architecting multi-cloud cost reduction and automated failover pipelines.',
      'Believer in immutable infrastructure and complete observability observability.',
    ],
  },
  'fullstack': {
    headlineRole: 'Senior Full-Stack & Distributed Systems Engineer',
    tagline: 'Crafting responsive, high-velocity web applications from database index to edge cache.',
    accentColor: '#8b5cf6',
    theme: 'radical',
    typingLines: [
      'Building Full-Stack Reactive Web Platforms',
      'TypeScript, Next.js 16 & Serverless Edge APIs',
      'Distributed Postgres & High-Concurrency Systems',
    ],
    badges: ['typescript', 'react', 'nextdotjs', 'nodedotjs', 'postgresql', 'redis', 'tailwindcss'],
    bioBullets: [
      'Translating complex product requirements into resilient, maintainable distributed code.',
      'Passionate about sub-50ms TTFB, optimistic UI updates, and zero-flash layouts.',
      'Proud open-source builder and creator of high-traction developer toolkits.',
    ],
  },
  'frontend-creative': {
    headlineRole: 'Creative Developer & UI/UX Motion Specialist',
    tagline: 'Bridging engineering rigor with 60fps micro-interactions, shaders, and spatial web design.',
    accentColor: '#ec4899',
    theme: 'radical',
    typingLines: [
      'Designing Fluid 60fps Web Animations & Shaders',
      'Three.js, WebGL & Spatial Interactive 3D UIs',
      'Design Token Architectures & Accessible Micro-Interactions',
    ],
    badges: ['typescript', 'react', 'threedotjs', 'tailwindcss', 'framer', 'figma', 'vite'],
    bioBullets: [
      'Obsessed with motion physics, spring curves, and delightful developer experiences.',
      'Auditing Core Web Vitals, accessible color contrast, and vestibular reduced-motion.',
      'Creating interactive web experiments that blur the line between utility and art.',
    ],
  },
  'systems-embedded': {
    headlineRole: 'Systems & Embedded Software Engineer',
    tagline: 'Writing high-performance, memory-safe software close to bare metal and silicon.',
    accentColor: '#f97316',
    theme: 'onedark',
    typingLines: [
      'High-Performance Systems in Rust & Modern C++',
      'Low-Latency Networking & Lock-Free Data Structures',
      'Embedded Firmware, Linux Drivers & SIMD Acceleration',
    ],
    badges: ['rust', 'cplusplus', 'c', 'linux', 'webassembly', 'cmake', 'git'],
    bioBullets: [
      'Benchmarking cache-locality, instruction throughput, and lock-free concurrency.',
      'Building zero-overhead abstractions for memory-constrained embedded environments.',
      'Enthusiast for deterministic execution and low-level kernel tracing.',
    ],
  },
  'backend-distributed': {
    headlineRole: 'Principal Backend & Distributed Systems Architect',
    tagline: 'Architecting high-concurrency microservices, event streams, and sub-millisecond data planes.',
    accentColor: '#3b82f6',
    theme: 'tokyonight',
    typingLines: [
      'Event-Driven Distributed Topologies with Apache Kafka',
      'High-Concurrency Microservices in Go & Rust',
      'Database Sharding, Distributed Transactions & Cache Invalidation',
    ],
    badges: ['go', 'rust', 'postgresql', 'redis', 'apachekafka', 'docker', 'grpc'],
    bioBullets: [
      'Designing fault-tolerant distributed pipelines processing millions of events per minute.',
      'Optimizing query plans, connection pools, and high-availability database failover.',
      'Advocate for simple, pragmatic engineering patterns and rigorous load testing.',
    ],
  },
  'data-engineer': {
    headlineRole: 'Staff Data Platform & MLOps Engineer',
    tagline: 'Turning petabyte-scale data lakes into real-time analytical intelligence.',
    accentColor: '#0ea5e9',
    theme: 'nord',
    typingLines: [
      'Lakehouse Architectures with Spark, Trino & ClickHouse',
      'Declarative Real-Time ETL with dbt & Airflow',
      'Feature Stores, Embeddings & Large-Scale Vector Search',
    ],
    badges: ['python', 'apachespark', 'clickhouse', 'postgresql', 'docker', 'snowflake', 'dbt'],
    bioBullets: [
      'Building declarative, reproducible data pipelines with sub-second analytical latencies.',
      'Scaling feature stores and vector databases for real-time inference workloads.',
      'Bridging raw infrastructure with actionable executive metrics and data models.',
    ],
  },
  'open-source-maintainer': {
    headlineRole: 'Open-Source Maintainer & Core Contributor',
    tagline: 'Empowering global developer communities through accessible, well-documented software.',
    accentColor: '#10b981',
    theme: 'emerald',
    typingLines: [
      'Maintaining High-Traction Open-Source Packages',
      'Authoring RFC Standards & Developer Ecosystems',
      'Mentoring First-Time Contributors & Triaging Issues',
    ],
    badges: ['typescript', 'javascript', 'rust', 'python', 'github', 'git', 'markdown'],
    bioBullets: [
      'Maintained packages with millions of weekly npm and crates.io downloads.',
      'Focused on zero-dependency utilities, strict semantic versioning, and crystal-clear docs.',
      'Believer in open collaboration, transparent roadmaps, and community governance.',
    ],
  },
  'synthwave-coder': {
    headlineRole: 'Neon Cyberpunk & Creative Outrun Hacker',
    tagline: 'Coding through the digital twilight with glowing wireframes, retro synth, and raw velocity.',
    accentColor: '#ff007f',
    theme: 'cyberpunk',
    typingLines: [
      'Retro 80s Synthwave Wireframe Rendering',
      'Cyberpunk Telemetry Dashboards & Neon Bento',
      'Full-Stack Velocity under Midnight Fluorescents',
    ],
    badges: ['typescript', 'react', 'python', 'tailwindcss', 'fastapi', 'docker', 'git'],
    bioBullets: [
      'Translating nostalgic outrun aesthetics into modern 60fps web experiences.',
      'Building high-velocity side projects, terminal emulators, and aesthetic dashboards.',
      'Fuelled by synthwave beats, dark mode themes, and clean clean code.',
    ],
  },
  'terminal-operator': {
    headlineRole: 'Linux Workstation & CLI Tools Operator',
    tagline: 'Live inside the terminal: Neovim, Tmux, Zsh, and keyboard-driven productivity.',
    accentColor: '#22c55e',
    theme: 'matrix',
    typingLines: [
      'Keyboard-Driven Workflow in Neovim & Tmux',
      'Shell Automation, Posix Scripts & Fastfetch Telemetry',
      'Clean ASCII Architecture & Terminal Art',
    ],
    badges: ['linux', 'bash', 'rust', 'c', 'python', 'git', 'neovim'],
    bioBullets: [
      'Master of command-line ergonomics, dotfiles management, and shell pipelines.',
      'Refined ASCII art enthusiast and minimalism advocate.',
      'Believer that the fastest interface is a well-crafted CLI tool.',
    ],
  },
  'student-learner': {
    headlineRole: 'Computer Science Student & Emerging Software Builder',
    tagline: 'Passionate learner exploring algorithms, web architectures, and collaborative open source.',
    accentColor: '#f59e0b',
    theme: 'amber',
    typingLines: [
      'Mastering Data Structures & LeetCode Algorithms',
      'Building Full-Stack Web Projects with React & Next.js',
      'Contributing to Open-Source Repositories & Hackathons',
    ],
    badges: ['python', 'javascript', 'typescript', 'java', 'react', 'git', 'cplusplus'],
    bioBullets: [
      'Currently studying Computer Science and building real-world software every day.',
      'Active participant in hackathons, competitive programming, and tech communities.',
      'Eager to learn, collaborate with senior mentors, and ship meaningful code.',
    ],
  },
  'security-researcher': {
    headlineRole: 'Application Security Engineer & Reverse Engineer',
    tagline: 'Uncovering vulnerabilities, auditing smart contracts, and hardening defensive architectures.',
    accentColor: '#ef4444',
    theme: 'dracula',
    typingLines: [
      'Static & Dynamic Application Security Testing',
      'Binary Exploitation, Reverse Engineering & Fuzzing',
      'Zero-Trust Threat Modeling & Cryptographic Hardening',
    ],
    badges: ['python', 'c', 'rust', 'linux', 'wireshark', 'git', 'docker'],
    bioBullets: [
      'Conducting rigorous threat modeling across cloud architectures and client binaries.',
      'Passionate about defense-in-depth, memory safety, and secure software supply chains.',
      'Active researcher participating in responsible disclosure bug bounty programs.',
    ],
  },
  'mobile-engineer': {
    headlineRole: 'Mobile Platform & Cross-Platform Architect',
    tagline: 'Shipping fluid 120Hz native and cross-platform mobile experiences to millions of devices.',
    accentColor: '#8b5cf6',
    theme: 'radical',
    typingLines: [
      'Native iOS (Swift) & Android (Kotlin) Architecture',
      'Cross-Platform Velocity with React Native & Flutter',
      'Offline-First Data Sync & Smooth Gesture Kinematics',
    ],
    badges: ['swift', 'kotlin', 'react', 'typescript', 'android', 'apple', 'figma'],
    bioBullets: [
      'Crafting silky-smooth 120fps interactions and robust offline-first synchronization.',
      'Deep experience with app store distribution, crash telemetry, and battery optimization.',
      'Advocate for human interface guidelines and intuitive mobile interaction models.',
    ],
  },
  'game-dev': {
    headlineRole: 'Game Engine & Interactive 3D Technologist',
    tagline: 'Bringing virtual worlds to life with physics simulations, shaders, and spatial gameplay.',
    accentColor: '#ec4899',
    theme: 'cyberpunk',
    typingLines: [
      'Real-Time Shaders, Lighting & GPU Optimization',
      'Gameplay Programming in C++ & Modern C#',
      'Spatial Mechanics, Physics Kinematics & Procedural Worlds',
    ],
    badges: ['cplusplus', 'csharp', 'unity', 'unrealengine', 'webassembly', 'blender', 'git'],
    bioBullets: [
      'Obsessed with game feel, frame pacing, and deterministic physics engines.',
      'Authoring custom HLSL shaders and procedural terrain generation algorithms.',
      'Bridging technical computational math with artistic visual design.',
    ],
  },
};

/**
 * Generates a completely customized, persona-tailored ReadmeConfig.
 * Ensures that two different developers receive unique, highly personalized profiles
 * reflecting their specific domain, color harmonies, and technical strengths.
 */
export function generatePersonalizedProfile(options: PersonalizeProfileOptions): ReadmeConfig {
  const userGithub = options.github.trim() || 'developer';
  const userName = options.name?.trim() || userGithub;
  const roleKey = (options.role as string) in PERSONA_CONFIGS ? (options.role as string) : 'fullstack';
  const persona = PERSONA_CONFIGS[roleKey];

  const theme = options.vibe ? options.vibe : persona.theme;
  const accentColor = options.vibe === 'cyberpunk'
    ? '#ec4899'
    : options.vibe === 'matrix'
    ? '#10b981'
    : options.vibe === 'minimal'
    ? '#64748b'
    : options.vibe === 'solar'
    ? '#f59e0b'
    : persona.accentColor;

  const sections: SectionConfig[] = [];

  // 1. Dynamic Typing Hero
  sections.push({
    id: uuidv4(),
    type: 'readme-typing-svg',
    props: {
      content: {
        lines: persona.typingLines,
        color: accentColor.replace('#', ''),
      },
      styles: { align: 'center' },
      state: 'default',
    },
  });

  // 2. Languages Donut & Pie Chart (if charts enabled)
  if (options.includeCharts !== false) {
    sections.push({
      id: uuidv4(),
      type: 'pie-chart',
      props: {
        content: {
          chartMode: 'top-langs-donut',
          title: 'Top Languages Breakdown',
          theme,
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });

    sections.push({
      id: uuidv4(),
      type: 'activity-graph',
      props: {
        content: {
          color: accentColor.replace('#', ''),
          title: 'Commit Velocity & Contribution Activity',
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  // 3. Stats & Streaks
  sections.push({
    id: uuidv4(),
    type: 'github-readme-stats',
    props: {
      content: {
        username: userGithub,
        theme,
        showStats: true,
        showStreak: true,
        showLanguages: false, // Languages are spotlighted in the pie chart above
      },
      styles: { align: 'center' },
      state: 'default',
    },
  });

  // 4. Trophies (if requested)
  if (options.includeTrophies !== false) {
    sections.push({
      id: uuidv4(),
      type: 'github-profile-trophy',
      props: {
        content: {
          username: userGithub,
          mirror: 'https://github-profile-repo.vercel.app',
          theme: 'flat',
          row: 1,
          column: 6,
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  // 5. Official GitHub Achievements (if requested)
  if (options.includeAchievements !== false) {
    sections.push({
      id: uuidv4(),
      type: 'github-achievements',
      props: {
        content: {
          username: userGithub,
          badgeSize: 64,
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  // 6. Contribution Snake (if requested)
  if (options.includeSnake !== false) {
    sections.push({
      id: uuidv4(),
      type: 'snk',
      props: {
        content: {
          username: userGithub,
          theme: 'dark',
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  return {
    version: '1.0.0',
    title: `${userName}'s Personalized GitHub Profile`,
    settings: {
      user: {
        github: userGithub,
        name: userName,
        role: persona.headlineRole,
        bio: persona.tagline,
        status: persona.bioBullets[0],
      },
      theme: 'dark',
      accentColor,
      badgeStyle: 'for-the-badge',
      align: 'left',
    },
    sections,
  };
}
