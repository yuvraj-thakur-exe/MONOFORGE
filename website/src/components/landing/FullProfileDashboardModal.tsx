'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Eye,
  FileText,
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  Copy,
  Check,
  Download,
  Sparkles,
  Github,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Users,
  Star,
  GitFork,
  BookOpen,
  Calendar,
  Flame,
  Award,
  Layers,
  Code2,
  Cpu,
  Target,
  ArrowUpRight,
  ExternalLink,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { TemplateItem } from '#/lib/templates/catalog';
import { ReadmeConfig } from '#/lib/plugins/types';

interface FullProfileDashboardModalProps {
  template: TemplateItem;
  config: ReadmeConfig;
  isOpen: boolean;
  onClose: () => void;
  onApply: (template: TemplateItem) => void;
}

export const FullProfileDashboardModal: React.FC<FullProfileDashboardModalProps> = ({
  template,
  config,
  isOpen,
  onClose,
  onApply,
}) => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'readme' | 'prompt'>('dashboard');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
    config.settings.theme === 'light' ? 'light' : 'dark'
  );
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2026');

  const user = config.settings.user;
  const accent = template.accent || config.settings.accentColor || '#38bdf8';

  const handleCopyPromptText = async () => {
    try {
      if (template.prompt && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(template.prompt);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  const handleCopy = async () => {
    try {
      const { buildMarkdown } = await import('#/lib/markdown-builder/generator');
      const md = buildMarkdown(config);
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = async () => {
    try {
      const { buildMarkdown } = await import('#/lib/markdown-builder/generator');
      const md = buildMarkdown(config);
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-README.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  const isDark = themeMode === 'dark';
  const containerBg = isDark ? 'bg-[#0d1117] text-[#c9d1d9]' : 'bg-[#f6f8fa] text-[#24292f]';
  const cardBg = isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-[#d0d7de]';

  // Featured Repositories
  const repos = [
    {
      name: `${user.github || 'developer'}/core-engine`,
      desc: 'High-throughput distributed event streaming and real-time AST compiler.',
      lang: 'TypeScript',
      langColor: '#3178c6',
      stars: 482,
      forks: 64,
    },
    {
      name: `${user.github || 'developer'}/neural-reasoning`,
      desc: 'Autonomous multi-agent orchestration framework with vector memory graphs.',
      lang: 'Python',
      langColor: '#3572A5',
      stars: 1240,
      forks: 189,
    },
    {
      name: `${user.github || 'developer'}/web-gpu-shaders`,
      desc: 'Hardware-accelerated 60fps WebGL/WebGPU shaders and volumetric rendering.',
      lang: 'Rust',
      langColor: '#dea584',
      stars: 310,
      forks: 42,
    },
    {
      name: `${user.github || 'developer'}/microservices-mesh`,
      desc: 'Zero-trust service mesh with automated eBPF observability and TLS mTLS.',
      lang: 'Go',
      langColor: '#00ADD8',
      stars: 620,
      forks: 88,
    },
    {
      name: `${user.github || 'developer'}/design-system`,
      desc: 'Accessible WCAG AA design tokens, micro-interactions, and component library.',
      lang: 'TypeScript',
      langColor: '#3178c6',
      stars: 215,
      forks: 29,
    },
    {
      name: `${user.github || 'developer'}/cloud-infra-cdk`,
      desc: 'Declarative Terraform and AWS CDK infrastructure as code deployments.',
      lang: 'HCL',
      langColor: '#844FBA',
      stars: 145,
      forks: 18,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="flex flex-col w-full max-w-[1720px] h-[95vh] rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-2xl">
        {/* Top Control Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 text-xs font-mono">
          {/* Left: Template info */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="font-bold text-white text-sm tracking-tight">
              {template.name}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">
              {template.category}
            </span>
          </div>

          {/* Center: Viewport & Mode Controls */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                viewMode === 'dashboard'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Profile</span>
            </button>
            <button
              onClick={() => setViewMode('readme')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                viewMode === 'readme'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>README Only</span>
            </button>
            <button
              onClick={() => setViewMode('prompt')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                viewMode === 'prompt'
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Prompt</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            {/* Device Toggle */}
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1 rounded transition-colors cursor-pointer ${
                device === 'desktop' ? 'text-amber-400' : 'text-slate-500 hover:text-white'
              }`}
              title="Desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1 rounded transition-colors cursor-pointer ${
                device === 'tablet' ? 'text-amber-400' : 'text-slate-500 hover:text-white'
              }`}
              title="Tablet"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1 rounded transition-colors cursor-pointer ${
                device === 'mobile' ? 'text-amber-400' : 'text-slate-500 hover:text-white'
              }`}
              title="Mobile"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            {/* Theme Toggle */}
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle theme preview"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPromptText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
              title="Copy Master AI Generation Prompt"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedPrompt ? 'PROMPT COPIED' : 'COPY PROMPT'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>EXPORT</span>
            </button>

            <button
              onClick={() => onApply(template)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>APPLY TEMPLATE</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Simulated GitHub Chrome Bar */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-slate-800 bg-[#161b22] text-xs font-mono text-slate-300">
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 text-white" />
            <span className="font-bold text-white">github.com/{user.github || 'developer'}</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">Overview</span>
            <span className="hidden md:inline text-slate-400">Repositories (38)</span>
            <span className="hidden md:inline text-slate-400">Projects (4)</span>
            <span className="hidden md:inline text-slate-400">Packages (2)</span>
            <span className="hidden md:inline text-slate-400">Stars (412)</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800 font-bold">
            Simulated GitHub Environment
          </span>
        </div>

        {/* Main Canvas Scroll Area */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-8 ${containerBg}`}>
          <div
            className={`mx-auto transition-all duration-300 ${
              device === 'mobile'
                ? 'max-w-[420px]'
                : device === 'tablet'
                ? 'max-w-[768px]'
                : 'max-w-[1440px]'
            }`}
          >
            {viewMode === 'prompt' ? (
              <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in py-2">
                {/* Prompt Banner */}
                <div className={`p-6 sm:p-8 rounded-2xl border ${cardBg} space-y-4`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                          AI Generation Master Prompt
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {template.name}
                      </h3>
                      <p className="text-sm font-mono text-slate-400 mt-1">
                        {template.description}
                      </p>
                    </div>

                    <button
                      onClick={handleCopyPromptText}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm cursor-pointer shadow-lg transition-transform active:scale-95"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                          <span>COPIED TO CLIPBOARD</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                          <span>COPY FULL PROMPT</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Target Specs Chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      Archetype: <b className="text-white">{template.name}</b>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      Category: <b className="text-white">{template.category}</b>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      Accent: <b style={{ color: accent }}>{accent}</b>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      Length: <b className="text-white">{template.prompt?.length || 0} characters</b>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800 font-bold">
                      11/11 Dashboard Sections Specified
                    </span>
                  </div>
                </div>

                {/* Prompt Terminal Container */}
                <div className="rounded-2xl border border-slate-700 bg-[#0d1117] overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-slate-400">master-prompt.md — Ready for Google Antigravity / Claude 3.7 / GPT-4o / Cursor</span>
                    </div>
                    <button
                      onClick={handleCopyPromptText}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono cursor-pointer"
                    >
                      {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-6 font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed select-text overflow-x-auto max-h-[50vh]">
                    {template.prompt}
                  </pre>
                </div>

                {/* How to Use Guidance */}
                <div className={`p-6 rounded-2xl border ${cardBg} font-mono text-xs space-y-3`}>
                  <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>How to Use This Archetype Prompt</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-amber-400 font-black mb-1">01. COPY PROMPT</div>
                      <p className="text-[11px] text-slate-400">Click the copy button above to load the complete specification into your clipboard.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-sky-400 font-black mb-1">02. PASTE IN AGENT</div>
                      <p className="text-[11px] text-slate-400">Paste into Google Antigravity, Claude, ChatGPT, Cursor, or MonoForge AI Assistant.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-emerald-400 font-black mb-1">03. SHIP TO GITHUB</div>
                      <p className="text-[11px] text-slate-400">Review the generated Camo-compliant SVG assets and sync directly to your profile repository.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            /* Dashboard Layout: Left Sidebar + Main Content */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* SECTION A: PROFILE SIDEBAR */}
              {viewMode === 'dashboard' && (
                <aside className="lg:col-span-3 space-y-6">
                  {/* Large Avatar */}
                  <div className="relative group">
                    <div
                      className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 shadow-lg mx-auto lg:mx-0 flex items-center justify-center font-black text-4xl"
                      style={{
                        borderColor: accent,
                        backgroundColor: isDark ? '#1f2937' : '#e5e7eb',
                        color: isDark ? '#ffffff' : '#111827',
                      }}
                    >
                      {user.name
                        ? user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                        : 'DEV'}
                    </div>
                    {/* Status Pill */}
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border shadow-xs"
                      style={{ borderColor: accent, background: isDark ? '#161b22' : '#ffffff' }}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{user.status || 'Focusing on distributed systems'}</span>
                    </div>
                  </div>

                  {/* Name & Designation */}
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{user.name || 'Developer Name'}</h2>
                    <p className="font-mono text-sm text-slate-400">{user.github || 'username'}</p>
                    <p className="font-mono text-xs font-bold mt-1" style={{ color: accent }}>
                      {user.role || 'Senior Software Engineer'}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm leading-relaxed text-slate-300">
                    {user.bio || 'Building reliable, high-performance systems for the modern web.'}
                  </p>

                  {/* Edit profile simulated button */}
                  <button
                    disabled
                    className="w-full py-1.5 rounded-lg border text-xs font-mono font-bold text-slate-400 opacity-60 cursor-not-allowed"
                    style={{ borderColor: isDark ? '#30363d' : '#d0d7de' }}
                  >
                    Edit profile (Preview)
                  </button>

                  {/* Follower Stats */}
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <strong className="text-white">1.4k</strong> followers
                    </div>
                    <span>•</span>
                    <div>
                      <strong className="text-white">72</strong> following
                    </div>
                  </div>

                  {/* Profile Metadata Links */}
                  <div className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{user.location || 'San Francisco, CA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                      <a href="https://monoforge-studio.vercel.app" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                        monoforge-studio.vercel.app
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Twitter className="w-3.5 h-3.5 text-slate-400" />
                      <span>@{user.github || 'dev'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                      <span>/in/{user.github || 'dev'}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Achievements
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400" title="Pull Shark">
                        <Award className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400" title="Quickdraw">
                        <Zap className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400" title="Starstruck">
                        <Star className="w-4 h-4 text-emerald-400 fill-current" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400" title="Arctic Code Vault">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                  </div>
                </aside>
              )}

              {/* MAIN CONTENT AREA */}
              <main className={viewMode === 'dashboard' ? 'lg:col-span-9 space-y-6' : 'col-span-12 space-y-6'}>
                {/* SECTION B: MAIN HERO BANNER */}
                <div
                  className="rounded-2xl p-6 sm:p-10 relative overflow-hidden border shadow-lg"
                  style={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#e2e8f0',
                  }}
                >
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: accent }}
                  />

                  <div className="relative z-10 space-y-3">
                    <span
                      className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase text-slate-950"
                      style={{ backgroundColor: accent }}
                    >
                      HI, I&apos;M {user.name?.toUpperCase() || 'DEVELOPER'}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
                      {user.role || 'Staff Full-Stack Architect'}
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl">
                      {user.bio || 'Designing high-throughput microservices, WebGL shaders, and scalable cloud architectures.'}
                    </p>
                  </div>
                </div>

                {/* SECTION C: DEVELOPER STATISTICS KPI ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { label: 'Public Repos', val: '38', icon: <BookOpen className="w-4 h-4 text-sky-400" /> },
                    { label: 'Total Stars', val: '1.4k', icon: <Star className="w-4 h-4 text-amber-400" /> },
                    { label: 'Total Forks', val: '284', icon: <GitFork className="w-4 h-4 text-purple-400" /> },
                    { label: 'Followers', val: '1.4k', icon: <Users className="w-4 h-4 text-emerald-400" /> },
                    { label: 'Following', val: '72', icon: <Users className="w-4 h-4 text-blue-400" /> },
                    { label: 'Contributions', val: '3,842', icon: <Calendar className="w-4 h-4 text-rose-400" /> },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between ${cardBg}`}
                    >
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        {stat.icon}
                        <span className="font-mono text-[10px] uppercase font-bold">{stat.label}</span>
                      </div>
                      <span className="text-xl font-black text-white font-mono">{stat.val}</span>
                    </div>
                  ))}
                </div>

                {/* SECTION D: POPULAR REPOSITORIES */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" style={{ color: accent }} />
                      <span>Popular Repositories</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500">6 featured</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {repos.map((repo, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${cardBg} hover:border-slate-500 transition-colors`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-sky-400 hover:underline cursor-pointer truncate">
                              {repo.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">
                              Public
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                            {repo.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                            <span>{repo.lang}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400" />
                              <span>{repo.stars}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="w-3 h-3" />
                              <span>{repo.forks}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION E: GITHUB CONTRIBUTION ACTIVITY */}
                <div className={`p-5 rounded-2xl border ${cardBg} space-y-4`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span>3,842 contributions in {selectedYear}</span>
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">Continuous delivery &amp; verified commit cadence</p>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                      {['2026', '2025', '2024'].map((yr) => (
                        <button
                          key={yr}
                          onClick={() => setSelectedYear(yr)}
                          className={`px-2.5 py-0.5 rounded ${
                            selectedYear === yr ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated 52-week Contribution Heatmap */}
                  <div className="overflow-x-auto pb-2">
                    <div className="min-w-[680px] grid grid-cols-52 gap-1">
                      {Array.from({ length: 52 * 7 }).map((_, idx) => {
                        const level = (idx * 17) % 5;
                        const colors = isDark
                          ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                          : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
                        return (
                          <div
                            key={idx}
                            className="w-2.5 h-2.5 rounded-2xs transition-transform hover:scale-125"
                            style={{ backgroundColor: colors[level] }}
                            title={`Activity level: ${level}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                    <span>Learn how we count contributions</span>
                    <div className="flex items-center gap-1.5">
                      <span>Less</span>
                      <span className="w-2.5 h-2.5 rounded-2xs bg-[#161b22]" />
                      <span className="w-2.5 h-2.5 rounded-2xs bg-[#0e4429]" />
                      <span className="w-2.5 h-2.5 rounded-2xs bg-[#006d32]" />
                      <span className="w-2.5 h-2.5 rounded-2xs bg-[#26a641]" />
                      <span className="w-2.5 h-2.5 rounded-2xs bg-[#39d353]" />
                      <span>More</span>
                    </div>
                  </div>
                </div>

                {/* SECTION F: TECHNOLOGY STACK */}
                <div className={`p-5 rounded-2xl border ${cardBg} space-y-4`}>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4" style={{ color: accent }} />
                    <span>Technology Stack &amp; Toolchain</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <span className="font-bold text-sky-400">Languages</span>
                      <p className="text-slate-300">TypeScript, Rust, Go, Python, SQL</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <span className="font-bold text-emerald-400">Frontend</span>
                      <p className="text-slate-300">Next.js 16, React 19, Tailwind CSS, Three.js</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <span className="font-bold text-purple-400">Backend &amp; DB</span>
                      <p className="text-slate-300">Node.js, PostgreSQL, Redis, ClickHouse</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <span className="font-bold text-amber-400">Cloud &amp; DevOps</span>
                      <p className="text-slate-300">Docker, Kubernetes, AWS, GitHub Actions</p>
                    </div>
                  </div>
                </div>

                {/* SECTION G & H & I: FOCUS, LANGUAGES & STATS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Currently Focusing On */}
                  <div className={`p-5 rounded-2xl border ${cardBg} space-y-3`}>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-rose-400" />
                      <span>Current Focus</span>
                    </h4>
                    <ul className="space-y-2 text-xs font-mono text-slate-300">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Building: Autonomous Agent Workflows</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span>Learning: WebGPU Compute Shaders</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>Research: Deterministic AST Compilers</span>
                      </li>
                    </ul>
                  </div>

                  {/* Top Programming Languages */}
                  <div className={`p-5 rounded-2xl border ${cardBg} space-y-3`}>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-sky-400" />
                      <span>Top Languages</span>
                    </h4>
                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>TypeScript</span>
                          <span>54%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-sky-400" style={{ width: '54%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Rust</span>
                          <span>28%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-amber-400" style={{ width: '28%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Go</span>
                          <span>18%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-emerald-400" style={{ width: '18%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Streak Card */}
                  <div className={`p-5 rounded-2xl border ${cardBg} space-y-3 flex flex-col justify-between`}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span>Commit Streak</span>
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">ACTIVE</span>
                    </div>

                    <div className="text-center py-2">
                      <div className="text-4xl font-black font-mono text-amber-400">412</div>
                      <div className="text-xs font-mono text-slate-400 mt-1">Consecutive Days</div>
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                      <span>Longest: 580 Days</span>
                      <span>Total: 3,842 Days</span>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
