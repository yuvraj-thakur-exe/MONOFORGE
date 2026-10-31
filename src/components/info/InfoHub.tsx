'use client';

import { useState, useEffect, useMemo } from 'react';
import { Link, useRouter } from '#/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import {
  Download,
  Terminal,
  Layers,
  Check,
  Sparkles,
  ExternalLink,
  Flame,
  ShieldCheck,
  Cpu,
  BookOpen,
  Code2,
  Github,
  Monitor,
  Laptop,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
  FileCode,
  Box,
  Zap,
  Play,
  RefreshCw,
  Sliders,
  Globe,
} from 'lucide-react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { TEMPLATES, TemplateItem } from '#/components/landing/TemplateGallery';
import { CopyButton } from '#/components/common/CopyButton';
import { KineticTypewriter, KineticGradientText } from '#/components/common/KineticText';
import { GitHubStarButton } from '#/components/common/GitHubStarButton';

type TabType = 'install' | 'templates' | 'playground' | 'guide' | 'badges' | 'about';
type OsType = 'linux' | 'windows' | 'manual' | 'docker' | 'npm';

export function InfoHub() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active Tab & View States
  const [activeTab, setActiveTab] = useState<TabType>('install');
  const [activeOs, setActiveOs] = useState<OsType>('linux');
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewMode, setPreviewMode] = useState<'card' | 'markdown'>('card');
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Mini-Playground State
  const [pgUsername, setPgUsername] = useState<string>('octocat');
  const [pgName, setPgName] = useState<string>('Alex Mercer');
  const [pgRole, setPgRole] = useState<string>('Full-Stack Cloud Architect');
  const [pgTheme, setPgTheme] = useState<string>('tokyonight');
  const [pgShowStats, setPgShowStats] = useState<boolean>(true);
  const [pgShowLangs, setPgShowLangs] = useState<boolean>(true);
  const [pgShowStreak, setPgShowStreak] = useState<boolean>(true);
  const [pgShowTrophies, setPgShowTrophies] = useState<boolean>(true);

  // Interactive CLI Terminal State
  const [cliOutput, setCliOutput] = useState<string[]>([
    '🔥 MonoForge Interactive CLI ready.',
    '💡 Click any quick command chip below or review the installation instructions.',
  ]);

  // Badge category state in badges tab
  const [badgeCategory, setBadgeCategory] = useState<string>('all');

  // Sync tab with URL search parameter if present
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['install', 'templates', 'playground', 'guide', 'badges', 'about'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [searchParams]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        // Fallback for non-browser or test runner
      }
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(prev => (prev === key ? null : prev));
    }, 2000);
  };

  const handleApplyTemplate = (template: TemplateItem) => {
    useReadmeStore.getState().setEntireConfig(template.config);
    const md = buildMarkdown(template.config);
    copyToClipboard(md, `applied-${template.id}`);
  };

  const handleApplyPlayground = () => {
    const customConfig = {
      version: '1.0.0',
      title: `${pgName}'s Custom Profile`,
      settings: {
        user: {
          github: pgUsername,
          name: pgName,
          role: pgRole,
          bio: 'Synthesizing modern web technologies and high-performance distributed systems.',
          location: 'Global / Remote',
          pronouns: 'they/them',
          status: 'Building next-generation developer tooling',
        },
        theme: 'dark' as const,
        accentColor: pgTheme === 'tokyonight' ? '#7aa2f7' : pgTheme === 'radical' ? '#fe428e' : '#38bdf8',
        badgeStyle: 'for-the-badge' as const,
        align: 'left' as const,
      },
      sections: [
        ...(pgShowStats
          ? [
              {
                id: 'stats-custom',
                type: 'github-readme-stats',
                props: { content: { username: pgUsername, theme: pgTheme, showIcons: true }, styles: {}, state: 'default' },
              },
            ]
          : []),
        ...(pgShowLangs
          ? [
              {
                id: 'langs-custom',
                type: 'pie-chart',
                props: { content: { chartMode: 'top-langs-donut', theme: pgTheme, title: 'Top Languages Breakdown' }, styles: {}, state: 'default' },
              },
            ]
          : []),
        ...(pgShowStreak
          ? [
              {
                id: 'activity-custom',
                type: 'activity-graph',
                props: { content: { color: '7AA2F7', title: 'Commit Velocity & Activity' }, styles: {}, state: 'default' },
              },
            ]
          : []),
        ...(pgShowTrophies
          ? [
              {
                id: 'trophy-custom',
                type: 'github-profile-trophy',
                props: { content: { username: pgUsername, theme: pgTheme }, styles: {}, state: 'default' },
              },
            ]
          : []),
      ],
    };

    useReadmeStore.getState().setEntireConfig(customConfig);
    router.push('/');
  };

  const handleRunCliCommand = (cmd: string) => {
    const newLogs = [...cliOutput, `> ${cmd}`];
    if (cmd.includes('install')) {
      newLogs.push('⚡ Executing 1-line bootstrap for MonoForge...');
      newLogs.push('✔ Node.js runtime detected (v20.x+)');
      newLogs.push('✔ Corepack enabled & pnpm locked dependencies verified');
      newLogs.push('🚀 Server booted at http://localhost:3000');
    } else if (cmd.includes('templates')) {
      newLogs.push(`📦 Available Archetypes (${TEMPLATES.length}):`);
      TEMPLATES.forEach(t => newLogs.push(`  • [${t.category}] ${t.name}`));
    } else if (cmd.includes('privacy')) {
      newLogs.push('🔒 PRIVACY AUDIT: 100% Client-Side Private.');
      newLogs.push('  • Zero external database stores');
      newLogs.push('  • Zero persistent token telemetry');
      newLogs.push('  • Mandatory diff review before GitHub writes');
    } else if (cmd.includes('clear')) {
      setCliOutput(['🔥 MonoForge Interactive CLI ready.']);
      return;
    } else {
      newLogs.push(`✨ MonoForge: Command '${cmd}' processed successfully.`);
    }
    setCliOutput(newLogs.slice(-14));
  };

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(item => {
      const matchesFilter =
        templateFilter === 'all' ||
        item.category.toLowerCase().includes(templateFilter.toLowerCase()) ||
        (templateFilter === 'gaming' && item.category === 'Gaming') ||
        (templateFilter === 'minimal' && item.category === 'Minimal') ||
        (templateFilter === 'devops' && item.category === 'DevOps') ||
        (templateFilter === 'ai' && item.category.includes('AI')) ||
        (templateFilter === 'mobile' && item.category === 'Mobile') ||
        (templateFilter === 'security' && item.category === 'Security') ||
        (templateFilter === 'design' && item.category === 'Design') ||
        (templateFilter === 'student' && item.category === 'Student') ||
        (templateFilter === 'oss' && item.category.includes('Open Source'));

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [templateFilter, searchQuery]);

  // Commands for installer
  const linuxInstallCmd = 'curl -fsSL /install.sh | bash';
  const windowsInstallCmd = 'iwr -useb /install.ps1 | iex';
  const gitCloneCmd = 'git clone https://github.com/monoforge/MONOFORGE.git\ncd monoforge\ncorepack enable\npnpm install\npnpm dev';
  const npmCmd = 'git clone https://github.com/monoforge/MONOFORGE.git\ncd monoforge\nnpm install\nnpm run dev';
  const dockerCmd = 'docker build -t monoforge .\ndocker run -p 3000:3000 monoforge';

  const currentInstallCmd = useMemo(() => {
    switch (activeOs) {
      case 'linux':
        return linuxInstallCmd;
      case 'windows':
        return windowsInstallCmd;
      case 'manual':
        return gitCloneCmd;
      case 'npm':
        return npmCmd;
      case 'docker':
        return dockerCmd;
      default:
        return linuxInstallCmd;
    }
  }, [activeOs, linuxInstallCmd, windowsInstallCmd, gitCloneCmd, npmCmd, dockerCmd]);

  // Badges Arsenal
  const BADGES = [
    { name: 'TypeScript', cat: 'lang', color: '3178C6', logo: 'typescript', md: '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)' },
    { name: 'JavaScript', cat: 'lang', color: 'F7DF1E', logo: 'javascript', md: '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)' },
    { name: 'Python', cat: 'lang', color: '3776AB', logo: 'python', md: '![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)' },
    { name: 'Rust', cat: 'lang', color: '000000', logo: 'rust', md: '![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)' },
    { name: 'Go', cat: 'lang', color: '00ADD8', logo: 'go', md: '![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)' },
    { name: 'React', cat: 'frontend', color: '20232A', logo: 'react', md: '![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)' },
    { name: 'Next.js', cat: 'frontend', color: '000000', logo: 'nextdotjs', md: '![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)' },
    { name: 'Tailwind CSS', cat: 'frontend', color: '38B2AC', logo: 'tailwind-css', md: '![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)' },
    { name: 'Node.js', cat: 'backend', color: '339933', logo: 'nodedotjs', md: '![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)' },
    { name: 'PostgreSQL', cat: 'database', color: '316192', logo: 'postgresql', md: '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)' },
    { name: 'Redis', cat: 'database', color: 'DC382D', logo: 'redis', md: '![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)' },
    { name: 'Docker', cat: 'devops', color: '2496ED', logo: 'docker', md: '![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)' },
    { name: 'Kubernetes', cat: 'devops', color: '326CE5', logo: 'kubernetes', md: '![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)' },
    { name: 'AWS', cat: 'devops', color: '232F3E', logo: 'amazon-aws', md: '![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)' },
    { name: 'Linux', cat: 'devops', color: 'FCC624', logo: 'linux', md: '![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)' },
    { name: 'PyTorch', cat: 'ai', color: 'EE4C2C', logo: 'pytorch', md: '![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)' },
    { name: 'Flutter', cat: 'mobile', color: '02569B', logo: 'flutter', md: '![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)' },
    { name: 'Swift', cat: 'mobile', color: 'FA7343', logo: 'swift', md: '![Swift](https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white)' },
  ];

  const filteredBadges = useMemo(() => {
    return badgeCategory === 'all' ? BADGES : BADGES.filter(b => b.cat === badgeCategory);
  }, [badgeCategory]);

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* Subtle technical background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Ambient luminous glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-amber-400/[0.08] dark:bg-amber-400/[0.04] blur-[130px] rounded-full pointer-events-none" />

      {/* Main Expansive Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>MonoForge</span>
            </Link>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">
              Information Hub &amp; Archetypes
            </span>
          </div>

          <div className="flex items-center gap-3">
            <GitHubStarButton />
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 hover:border-amber-400/50 transition-all shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Documentation</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Typewriter & Quick Actions */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>MONOFORGE GUIDE &amp; ARCHETYPES HUB</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans leading-[1.08]">
              FORGE A PROFILE <br className="hidden sm:inline" />
              <KineticGradientText className="relative inline-block my-1">
                THAT DEMANDS
              </KineticGradientText>{' '}
              ATTENTION.
            </h1>

            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-amber-600 dark:text-amber-400 pt-0.5 justify-center sm:justify-start">
              <span className="font-bold text-slate-400">&gt;</span>
              <KineticTypewriter
                words={[
                  '60fps Camo-compliant SVG keyframes',
                  '47+ telemetry engines & shield badges',
                  'Deterministic single-store architecture',
                  'Zero external tracking & zero silent writes',
                ]}
                className="font-bold"
              />
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              The comprehensive guide, installation manual, and architectural reference for MonoForge. Explore 10 production developer archetypes, live CLI terminal emulator, 20+ copyable shields badges, and master GitHub profile aesthetics with 100% client-side privacy.
            </p>

            {/* Quick KPI Stat Chips */}
            <div className="flex flex-wrap gap-3 pt-1 justify-center sm:justify-start">
              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Setup Time</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">1 Command (60s)</div>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Privacy Model</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">100% Client-Side</div>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Open Source</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">MIT License</div>
                </div>
              </div>
            </div>

            {/* Quick CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => setActiveTab('templates')}
                className="btn-shimmer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md border border-amber-500 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Explore Archetypes &amp; Badges</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('playground')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-amber-500" />
                <span>Interactive Playground</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Simulated Profile Preview Mockup */}
          <div className="lg:col-span-5">
            <div className="card-hover-lift rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-5 sm:p-6 space-y-4">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] ml-1">alexmercer / README.md</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE PREVIEW
                </span>
              </div>

              {/* Profile Header Content */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-500 p-0.5 shadow-sm">
                    <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-slate-900 dark:text-white text-base font-mono">
                      AM
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-slate-900 dark:text-white text-sm">Alex Mercer</h3>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-400 text-slate-950">PRO</span>
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-mono">Full-Stack Cloud Architect &amp; OSS Lead</p>
                  </div>
                </div>

                {/* Dynamic Simulated Typing Banner */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-800 dark:text-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[10px]">
                    <span>DYNAMIC BANNER (SVG 60FPS)</span>
                    <span className="text-emerald-500 font-bold">Zero JS &bull; Camo Ready</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold truncate">
                    &gt; Synthesizing Cloud Systems &amp; Real-Time AI Toolchains
                  </div>
                </div>

                {/* Simulated GitHub Stats Cards Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">CONTRIBUTIONS</div>
                    <div className="text-sm font-black text-slate-900 dark:text-white font-mono mt-0.5">1,492 <span className="text-emerald-500 text-[11px] font-normal">this year</span></div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">COMMIT STREAK</div>
                    <div className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5">🔥 86 Days</div>
                  </div>
                </div>

                {/* Tech Badges Row */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">TECH STACK ARSENAL</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">TypeScript</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">React 19</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 font-bold">Next.js 16</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">Rust</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-bold">Docker</span>
                  </div>
                </div>

                {/* Bottom Action inside Mockup */}
                <button
                  type="button"
                  onClick={() => setActiveTab('templates')}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-900 dark:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Explore 10 Production Archetypes &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Master Navigation Tabs Bar (Clean Segmented Control) */}
        <div className="sticky top-4 z-40 flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl overflow-x-auto scrollbar-none shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'install'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Install &amp; Quickstart</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'templates'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>README Archetypes</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold">
              {TEMPLATES.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'playground'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Live Mini-Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Badge Arsenal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Studio Walkthrough</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Architecture &amp; Security</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: INSTALL & QUICKSTART
           ========================================================================= */}
        {activeTab === 'install' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Quick 1-Line Installer Section */}
            <div className="card-hover-lift rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-6 sm:p-10 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-700 dark:text-amber-400 border border-amber-400/30">
                      ⚡ 1-LINE QUICKSTART
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Automated Development Setup
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                    Run one line in your terminal. It checks Node.js 20+, activates Corepack pnpm, installs all dependencies, and launches the live studio on port 3000.
                  </p>
                </div>

                {/* OS Switcher */}
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none shrink-0 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveOs('linux')}
                    className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeOs === 'linux'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Linux / macOS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOs('windows')}
                    className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeOs === 'windows'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Windows PowerShell</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOs('manual')}
                    className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeOs === 'manual'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>pnpm</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOs('npm')}
                    className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeOs === 'npm'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>npm / yarn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOs('docker')}
                    className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeOs === 'docker'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Docker</span>
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 sm:p-6 font-mono text-xs sm:text-sm shadow-xl">
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800 text-slate-400 text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 font-mono text-slate-400">
                      {activeOs === 'linux' && 'Bash / Zsh (install.sh)'}
                      {activeOs === 'windows' && 'PowerShell 7+ (install.ps1)'}
                      {activeOs === 'manual' && 'pnpm quickstart'}
                      {activeOs === 'npm' && 'npm standard setup'}
                      {activeOs === 'docker' && 'Docker Container'}
                    </span>
                  </span>

                  <CopyButton
                    textToCopy={currentInstallCmd}
                    label="Copy Command"
                    copiedLabel="Command Copied!"
                    variant="secondary"
                    size="sm"
                    showConfetti={false}
                  />
                </div>

                <div className="overflow-x-auto whitespace-pre font-mono text-emerald-400 py-1 text-xs sm:text-sm leading-relaxed">
                  {currentInstallCmd}
                </div>
              </div>

              {/* Interactive CLI Playground Box */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-xs">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white">Interactive CLI Terminal Preview</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRunCliCommand('clear')}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto text-[11px] text-slate-300 leading-relaxed font-mono">
                  {cliOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.startsWith('>')
                          ? 'text-amber-400 font-bold'
                          : line.startsWith('✔')
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Quick Interactive Command Buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans">Run command:</span>
                  {[
                    'monoforge --install',
                    'monoforge --templates',
                    'monoforge --privacy',
                    'monoforge --help',
                  ].map(cmd => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => handleRunCliCommand(cmd)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-emerald-400 font-mono transition-colors active:scale-95 cursor-pointer"
                    >
                      $ {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Manual Step-by-Step Grid */}
            <div className="card-hover-lift rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-6 sm:p-10 space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2.5">
                  <Laptop className="w-5 h-5 text-amber-500" />
                  <span>Manual Environment Configuration</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Follow these four sequential steps to set up MonoForge from scratch in any developer environment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-amber-400/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                        STEP 01
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Prerequisites</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Node.js Version Check</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      Requires Node.js 20.x, 22.x, or 24.x LTS for Next.js 16 App Router.
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
                    <span className="truncate mr-2">node --version # v20+</span>
                    <CopyButton
                      textToCopy="node --version"
                      variant="ghost"
                      size="xs"
                      iconOnly
                      showConfetti={false}
                      title="Copy command"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-amber-400/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                        STEP 02
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Clone Repo</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Clone from GitHub</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      Pull the complete repository with all plugins and wizard components.
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
                    <span className="truncate mr-2">git clone https://...</span>
                    <CopyButton
                      textToCopy="git clone https://github.com/monoforge/MONOFORGE.git"
                      variant="ghost"
                      size="xs"
                      iconOnly
                      showConfetti={false}
                      title="Copy git clone"
                    />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-amber-400/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                        STEP 03
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Dependencies</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Install via pnpm</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      Corepack automatically provisions pnpm v10+ with locked dependencies.
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
                    <span className="truncate mr-2">corepack enable &amp;&amp; pnpm i</span>
                    <CopyButton
                      textToCopy="corepack enable && pnpm install"
                      variant="ghost"
                      size="xs"
                      iconOnly
                      showConfetti={false}
                      title="Copy install command"
                    />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-amber-400/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                        STEP 04
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Dev Server</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Start Local Server</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      Launches Turbopack-powered dev server on http://localhost:3000.
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
                    <span className="truncate mr-2">pnpm dev</span>
                    <CopyButton
                      textToCopy="pnpm dev"
                      variant="ghost"
                      size="xs"
                      iconOnly
                      showConfetti={false}
                      title="Copy pnpm dev"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & FAQ Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-hover-lift rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Quality Test &amp; Build Commands</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Run these commands before contributing or creating PRs:</p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-amber-400/40 transition-colors">
                    <div>
                      <div className="text-emerald-500 font-bold">pnpm test</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">Vitest: 158 test files across parsers, stores &amp; markdown generator</div>
                    </div>
                    <CopyButton
                      textToCopy="pnpm test"
                      variant="ghost"
                      size="xs"
                      iconOnly
                      showConfetti={false}
                      title="Copy pnpm test"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-amber-400/40 transition-colors">
                    <div>
                      <div className="text-amber-500 font-bold">pnpm lint</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">Biome: Strict formatting and hygiene verification</div>
                    </div>
                    <CopyButton
                      textToCopy="pnpm lint"
                      variant="ghost"
                      size="xs"
                      iconOnly
                      showConfetti={false}
                      title="Copy pnpm lint"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-amber-400/40 transition-colors">
                    <div>
                      <div className="text-indigo-400 font-bold">pnpm build</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">Next.js 16: Standalone production compilation</div>
                    </div>
                    <CopyButton
                      textToCopy="pnpm build"
                      variant="ghost"
                      size="xs"
                      iconOnly
                      showConfetti={false}
                      title="Copy pnpm build"
                    />
                  </div>
                </div>
              </div>

              <div className="card-hover-lift rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Quick solutions to common setup hurdles:</p>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">Q: Does MonoForge require an account or GitHub token?</div>
                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed">No. MonoForge is completely free and works client-side. A token is only needed if you want to push commits directly to your GitHub repository.</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">Q: Can I use Docker instead of local Node?</div>
                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed">Yes! Simply run <code className="text-amber-600 dark:text-amber-400 font-bold font-mono">docker build -t monoforge .</code> and <code className="text-amber-600 dark:text-amber-400 font-bold font-mono">docker run -p 3000:3000 monoforge</code>.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: README ARCHETYPES (10 Starters)
           ========================================================================= */}
        {activeTab === 'templates' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Search & Mode Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2.5 flex-1 max-w-lg">
                <Search className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 10 archetypes by title, skill, or role..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:outline-none w-full"
                />
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setPreviewMode('card')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewMode === 'card'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual Card Mockup</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('markdown')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewMode === 'markdown'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Markdown Code</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              {[
                { id: 'all', label: 'All Archetypes (10)' },
                { id: 'minimal', label: 'Minimalist' },
                { id: 'gaming', label: 'Cyberpunk' },
                { id: 'fullstack', label: 'Full-Stack' },
                { id: 'devops', label: 'DevOps & SRE' },
                { id: 'ai', label: 'AI & Data' },
                { id: 'mobile', label: 'Mobile' },
                { id: 'security', label: 'Security' },
                { id: 'design', label: 'Design' },
                { id: 'student', label: 'Student' },
                { id: 'oss', label: 'Open Source' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setTemplateFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    templateFilter === cat.id
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Archetypes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => {
                const markdownPreview = buildMarkdown(template.config);
                const isExpanded = expandedPreviewId === template.id;
                const { user, accentColor = template.accent } = template.config.settings;

                return (
                  <div
                    key={template.id}
                    className="card-hover-lift flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative group overflow-hidden min-w-0"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{ backgroundColor: template.accent }}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${template.accent}20`,
                            color: template.accent,
                            border: `1px solid ${template.accent}40`,
                          }}
                        >
                          {template.category}
                        </span>

                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          @{user.github || 'developer'}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors uppercase font-sans">
                        {template.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 mb-5 leading-relaxed font-sans">
                        {template.description}
                      </p>

                      {/* Mockup Preview vs Markdown Preview */}
                      {previewMode === 'card' ? (
                        <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white font-mono shrink-0 shadow-xs"
                              style={{ backgroundColor: accentColor }}
                            >
                              {(user.name || 'D').charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name || 'Developer'}</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">{user.role || 'Software Engineer'}</div>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-700 dark:text-slate-300 italic border-l-2 pl-2.5 border-amber-400 line-clamp-2">
                            &ldquo;{user.bio || 'Building modern software on the open web.'}&rdquo;
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-800">
                            {template.config.sections.map(sec => (
                              <span
                                key={sec.id}
                                className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9px] font-mono text-slate-700 dark:text-slate-300"
                              >
                                {sec.type}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mb-6 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-emerald-400 max-h-36 overflow-y-auto whitespace-pre leading-relaxed">
                          {markdownPreview.slice(0, 320)}...
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate(template)}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer ${
                          copiedKey === `applied-${template.id}`
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-xs'
                        }`}
                      >
                        {copiedKey === `applied-${template.id}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-slate-950 font-bold" />
                            <span>Profile Applied &amp; Copied!</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 fill-current" />
                            <span>Apply &amp; Copy Profile Markdown</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-between gap-2">
                        <CopyButton
                          textToCopy={markdownPreview}
                          label="Copy Markdown"
                          copiedLabel="Copied Markdown!"
                          variant="secondary"
                          size="sm"
                          showConfetti={false}
                          className="flex-1"
                        />

                        <button
                          type="button"
                          onClick={() => setExpandedPreviewId(isExpanded ? null : template.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide' : 'Code'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 max-h-52 overflow-y-auto whitespace-pre-wrap leading-relaxed animate-fadeIn">
                          {markdownPreview}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: LIVE MINI-STUDIO PLAYGROUND
           ========================================================================= */}
        {activeTab === 'playground' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="card-hover-lift rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-6 sm:p-10 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-700 dark:text-amber-400 border border-amber-400/30">
                      ⚡ LIVE SIMULATOR
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Instant Profile Playground
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                    Customize your profile live right here. Toggle stats, change themes, preview the layout, and launch directly into the full studio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleApplyPlayground}
                  className="btn-shimmer flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch This Profile into Studio</span>
                </button>
              </div>

              {/* Two Column Playground: Controls + Live Render */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Controls Column */}
                <div className="lg:col-span-5 space-y-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider pb-3 border-b border-slate-200 dark:border-slate-800">
                    <Sliders className="w-4 h-4" />
                    <span>Profile Parameters</span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">GitHub Username</label>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white">
                      <span className="text-slate-400">github.com/</span>
                      <input
                        type="text"
                        value={pgUsername}
                        onChange={e => setPgUsername(e.target.value)}
                        className="bg-transparent text-slate-900 dark:text-white focus:outline-none w-full font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">Display Name</label>
                    <input
                      type="text"
                      value={pgName}
                      onChange={e => setPgName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">Headline / Role</label>
                    <input
                      type="text"
                      value={pgRole}
                      onChange={e => setPgRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-2 block">Widget Theme Palette</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'tokyonight', label: 'TokyoNight', color: '#7aa2f7' },
                        { id: 'radical', label: 'Radical', color: '#fe428e' },
                        { id: 'nord', label: 'Nord', color: '#88c0d0' },
                      ].map(theme => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setPgTheme(theme.id)}
                          className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            pgTheme === theme.id
                              ? 'border-amber-400 bg-amber-400/10 text-amber-700 dark:text-amber-400'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.color }} />
                          <span>{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-2 block">Enabled Dynamic Widgets</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pgShowStats}
                          onChange={e => setPgShowStats(e.target.checked)}
                          className="accent-amber-400 rounded"
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200">GitHub Stats</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pgShowLangs}
                          onChange={e => setPgShowLangs(e.target.checked)}
                          className="accent-amber-400 rounded"
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200">Top Languages</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pgShowStreak}
                          onChange={e => setPgShowStreak(e.target.checked)}
                          className="accent-amber-400 rounded"
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200">Activity Graph</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pgShowTrophies}
                          onChange={e => setPgShowTrophies(e.target.checked)}
                          className="accent-amber-400 rounded"
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200">Trophy Rack</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Live Preview Column */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-emerald-500" />
                        <span className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono">Live Render Canvas</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                        Interactive
                      </span>
                    </div>

                    {/* Simulated Readme Box */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                      {/* Banner / Header */}
                      <div className="space-y-1">
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                          Hi there, I&apos;m {pgName || 'Developer'} 👋
                        </h2>
                        <h3 className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono">
                          {pgRole || 'Software Craftsman'}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                          Building minimal, scalable systems with continuous delivery and zero telemetry.
                        </p>
                      </div>

                      {/* Dynamic Mockup Widgets */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {pgShowStats && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                            <div className="text-amber-600 dark:text-amber-400 font-bold mb-1">GitHub Readme Stats</div>
                            <div className="text-slate-600 dark:text-slate-400">Stars: 1.2k • Commits: 2.8k</div>
                            <div className="text-slate-500 dark:text-slate-400 text-[10px]">Theme: {pgTheme}</div>
                          </div>
                        )}
                        {pgShowLangs && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                            <div className="text-indigo-500 font-bold mb-1">Top Languages Donut</div>
                            <div className="text-slate-600 dark:text-slate-400">TypeScript 60% • Rust 25%</div>
                            <div className="text-slate-500 dark:text-slate-400 text-[10px]">Theme: {pgTheme}</div>
                          </div>
                        )}
                        {pgShowStreak && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                            <div className="text-emerald-500 font-bold mb-1">Activity Velocity</div>
                            <div className="text-slate-600 dark:text-slate-400">365-day commit graph active</div>
                          </div>
                        )}
                        {pgShowTrophies && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                            <div className="text-amber-500 font-bold mb-1">GitHub Profile Trophy</div>
                            <div className="text-slate-600 dark:text-slate-400">🏆 Multi-Lang • ⚡ Committer</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span>Target user: @{pgUsername}</span>
                    <button
                      type="button"
                      onClick={handleApplyPlayground}
                      className="text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Load into full studio &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: BADGES ARSENAL
           ========================================================================= */}
        {activeTab === 'badges' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="card-hover-lift rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-700 dark:text-amber-400 border border-amber-400/30">
                      ⚡ SHIELDS &amp; ICONS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Tech Badge Arsenal
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                    High-contrast official Shields.io badges. Click any badge to copy its markdown syntax instantly.
                  </p>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none font-mono text-xs">
                  {['all', 'lang', 'frontend', 'backend', 'database', 'devops', 'mobile'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setBadgeCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                        badgeCategory === cat
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 pt-4">
                {filteredBadges.map((badge, idx) => {
                  const isCopied = copiedKey === `badge-${idx}`;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => copyToClipboard(badge.md, `badge-${idx}`)}
                      className={`p-3.5 rounded-xl transition-all duration-200 flex flex-col items-center justify-between gap-2.5 text-center group active:scale-95 relative overflow-hidden select-none cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 shadow-md scale-[1.02]'
                          : 'bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-amber-400/60 hover:shadow-sm'
                      }`}
                    >
                      {/* Rendered Badge Image */}
                      <div className="py-1 flex items-center justify-center">
                        <img
                          src={`https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=${badge.color === 'F7DF1E' || badge.color === 'FCC624' ? 'black' : 'white'}`}
                          alt={badge.name}
                          className="h-6 w-auto rounded group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center justify-between w-full pt-1.5 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono">
                        <span className={`font-bold transition-colors ${isCopied ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400'}`}>
                          {badge.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 transition-all ${
                            isCopied
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-slate-950 font-bold" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <span>Copy</span>
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: STUDIO WALKTHROUGH
           ========================================================================= */}
        {activeTab === 'guide' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="card-hover-lift p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-700 dark:text-amber-400 border border-amber-400/30">
                  WORKFLOW BLUEPRINT
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  6-Phase Profile Studio Walkthrough
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                MonoForge bridges visual drag-and-drop design with professional Monaco IDE tooling. Follow these six steps to build a profile that gets you hired or noticed.
              </p>
            </div>

            {/* 6 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { num: '01', title: 'Profile Identity & Hero', desc: 'Set display name, role, pronouns, location, and alignment with theme accents.' },
                { num: '02', title: 'Tech Stack Badges', desc: 'Select categorized shield badges with For-The-Badge, Flat, or Plastic styles.' },
                { num: '03', title: 'Dynamic API Widgets', desc: 'Configure GitHub Stats, Streak counter, Top Languages donut, and Trophy shelves.' },
                { num: '04', title: 'Vector & SVG Kinematics', desc: 'Dynamic vector characters and 60fps GPU animated headers directly in your profile.' },
                { num: '05', title: 'Live AST Synchronization', desc: 'Edits in wizard sync instantly with zero latency and complete type safety.' },
                { num: '06', title: 'Confirmation Push', desc: 'Inspect diff preview against remote README and push safely via GitHub REST API.' },
              ].map((step, idx) => (
                <div key={idx} className="card-hover-lift p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-mono font-black flex items-center justify-center text-xs">
                        {step.num}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Phase {step.num}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: ABOUT & ARCHITECTURE
           ========================================================================= */}
        {activeTab === 'about' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Mission Banner */}
            <div className="card-hover-lift p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 shadow-xs">
                  <Flame className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">About MonoForge</h2>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Open-Source Profile Studio • 100% Client-Side</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mt-2 font-sans">
                MonoForge was born to eliminate the frustration of manual profile markdown formatting. Built on Next.js 16 and Monaco, it guarantees 100% client-side privacy, live keystroke markdown rendering, and confirmation-gated GitHub commits.
              </p>
            </div>

            {/* Architecture Invariants */}
            <div className="card-hover-lift p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-500" />
                <span>Security Principles &amp; Architecture Invariants</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% Client-Side Privacy</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    Zero user data is persisted on external servers. All session state remains strictly in your browser local storage.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-500 font-bold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmation-Gated Operations</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    No remote sync or write to your GitHub repository happens silently. Every action requires diff review and explicit confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Author & Open Source */}
            <div className="card-hover-lift p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-xs shrink-0">
                  ⚡
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">MonoForge Core Contributors</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Open Source Precision Engineering
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="text-emerald-500 font-semibold font-mono">MIT License</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400">Open Source Community</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://github.com/monoforge/MONOFORGE"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
