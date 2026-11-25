'use client';

import React, { useState, useMemo } from 'react';
import {
  Github,
  Sparkles,
  Terminal,
  Cpu,
  Copy,
  Check,
  Download,
  RefreshCw,
  FileCode2,
  Code2,
  Eye,
  Columns,
  ExternalLink,
  Plus,
  Trash2,
  GitBranch,
  Boxes,
} from 'lucide-react';
import { useProjectReadmeStore } from '#/store/useProjectReadmeStore';
import { ProjectTemplateType, EcosystemType } from '#/lib/project-readme/types';

export const ProjectReadmeStudio: React.FC = () => {
  const {
    config,
    viewMode,
    activeCategory,
    isAnalyzing,
    setViewMode,
    setActiveCategory,
    updateConfig,
    loadTemplate,
    analyzeRepository,
    toggleBadge,
    addFeature,
    removeFeature,
    getCompiledMarkdown,
  } = useProjectReadmeStore();

  const [repoInput, setRepoInput] = useState(config.repositoryUrl || 'https://github.com/yuvraj-thakur-exe/MONOFORGE');
  const [copied, setCopied] = useState(false);
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureDesc, setNewFeatureDesc] = useState('');

  const compiledMarkdown = useMemo(() => getCompiledMarkdown(), [config, getCompiledMarkdown]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compiledMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([compiledMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoInput.trim()) return;
    await analyzeRepository(repoInput);
  };

  const templates: { id: ProjectTemplateType; label: string; desc: string }[] = [
    { id: 'developer-tool', label: 'Developer Tool', desc: 'Monaco, AST, split-screen live preview' },
    { id: 'saas', label: 'SaaS Platform', desc: 'Enterprise microservices & architecture' },
    { id: 'oss-library', label: 'OSS Library', desc: 'Zero-deps, typed API & micro-benchmarks' },
    { id: 'cli-tool', label: 'CLI Binary', desc: 'Cross-platform terminal tool & commands' },
    { id: 'ai-ml', label: 'AI / LLM Agent', desc: 'Reasoning loops, memory graphs & sandbox' },
    { id: 'fullstack-web', label: 'Full-Stack Web', desc: 'App Router, PostgreSQL, Tailwind & auth' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 min-h-[calc(100vh-3.5rem)]">
      {/* Top Studio Control Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-[1720px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Left: Studio Identity & URL Ingestion */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-mono text-xs font-black tracking-wider uppercase">
                Project Mode
              </span>
              <h1 className="text-base font-bold text-white tracking-tight font-mono hidden sm:inline">
                README STUDIO
              </h1>
            </div>

            {/* Ingestion Input */}
            <form onSubmit={handleAnalyze} className="flex items-center gap-1.5 flex-1 min-w-[280px] max-w-[440px]">
              <div className="relative flex-1">
                <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={repoInput}
                  onChange={(e) => setRepoInput(e.target.value)}
                  placeholder="https://github.com/owner/repository"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 font-mono focus:outline-hidden focus:border-amber-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>INSPECTING</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>INSPECT</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Center: Template Archetypes */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => loadTemplate(tpl.id)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  config.template === tpl.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={tpl.desc}
              >
                {tpl.label}
              </button>
            ))}
          </div>

          {/* Right: View Modes & Output Actions */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'split' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Split View (Editor + Live Preview)"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('editor')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'editor' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Structured Inspector"
              >
                <Code2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'preview' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Full Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 font-mono text-xs font-medium transition-colors cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'COPIED' : 'COPY GFM'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 font-mono text-xs font-medium transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">EXPORT .MD</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="flex-1 max-w-[1720px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* LEFT PANE: Structured Inspector (Columns 1-5 or Full when editor mode) */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <aside
            className={`border-r border-slate-800/80 bg-slate-900/40 flex flex-col overflow-y-auto ${
              viewMode === 'editor' ? 'lg:col-span-12' : 'lg:col-span-5'
            }`}
          >
            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1 p-2.5 border-b border-slate-800/80 bg-slate-950/60 overflow-x-auto text-xs font-mono">
              {[
                { id: 'meta', label: 'Meta', icon: <FileCode2 className="w-3.5 h-3.5" /> },
                { id: 'badges', label: 'Badges', icon: <Boxes className="w-3.5 h-3.5" /> },
                { id: 'features', label: 'Features', icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'architecture', label: 'Architecture', icon: <GitBranch className="w-3.5 h-3.5" /> },
                { id: 'stack', label: 'Stack', icon: <Cpu className="w-3.5 h-3.5" /> },
                { id: 'install', label: 'Commands', icon: <Terminal className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Category Content Panels */}
            <div className="p-4 sm:p-5 space-y-5 flex-1">
              {/* META TAB */}
              {activeCategory === 'meta' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Repository Identity
                    </h2>
                    <span className="text-[10px] font-mono text-amber-400">Pillar 1 • Project README</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => updateConfig({ name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Tagline / Headline</label>
                    <input
                      type="text"
                      value={config.tagline}
                      onChange={(e) => updateConfig({ tagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Overview Description</label>
                    <textarea
                      rows={3}
                      value={config.description}
                      onChange={(e) => updateConfig({ description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">License</label>
                      <input
                        type="text"
                        value={config.license}
                        onChange={(e) => updateConfig({ license: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Ecosystem</label>
                      <select
                        value={config.ecosystem}
                        onChange={(e) => updateConfig({ ecosystem: e.target.value as EcosystemType })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                      >
                        <option value="node">Node / TypeScript</option>
                        <option value="python">Python</option>
                        <option value="rust">Rust</option>
                        <option value="go">Go (Golang)</option>
                        <option value="docker">Docker / Container</option>
                        <option value="general">Multi-Language</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Live Demo URL</label>
                    <input
                      type="text"
                      value={config.liveDemoUrl || ''}
                      onChange={(e) => updateConfig({ liveDemoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* BADGES TAB */}
              {activeCategory === 'badges' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Shields.io Badges
                    </h2>
                    <span className="text-[10px] font-mono text-emerald-400">GitHub Camo Compatible</span>
                  </div>

                  <div className="space-y-2">
                    {config.badges.map((badge) => (
                      <div
                        key={badge.id}
                        onClick={() => toggleBadge(badge.id)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                          badge.enabled
                            ? 'bg-slate-800/80 border-amber-400/50 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              badge.enabled ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                            }`}
                          >
                            {badge.enabled && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />}
                          </div>
                          <span className="font-mono text-xs font-bold">{badge.label}</span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {badge.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FEATURES TAB */}
              {activeCategory === 'features' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Core Feature Cards
                    </h2>
                    <span className="text-[10px] font-mono text-slate-400">{config.features.length} configured</span>
                  </div>

                  <div className="space-y-2">
                    {config.features.map((feat) => (
                      <div
                        key={feat.id}
                        className="p-3 rounded-lg border border-slate-800 bg-slate-950/70 space-y-1 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-amber-400">{feat.title}</span>
                          <button
                            onClick={() => removeFeature(feat.id)}
                            className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                            title="Remove feature"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-300">{feat.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Feature Form */}
                  <div className="p-3 rounded-lg border border-dashed border-slate-800 bg-slate-950/40 space-y-2">
                    <span className="font-mono text-xs text-slate-400 block font-bold">Add New Feature</span>
                    <input
                      type="text"
                      placeholder="Feature Title (e.g., Live AST Parser)"
                      value={newFeatureTitle}
                      onChange={(e) => setNewFeatureTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <textarea
                      placeholder="Concise description of the capability..."
                      rows={2}
                      value={newFeatureDesc}
                      onChange={(e) => setNewFeatureDesc(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeatureTitle.trim() && newFeatureDesc.trim()) {
                          addFeature({ title: newFeatureTitle, description: newFeatureDesc });
                          setNewFeatureTitle('');
                          setNewFeatureDesc('');
                        }
                      }}
                      className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-750 text-slate-200 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Append Feature</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ARCHITECTURE (MERMAID) TAB */}
              {activeCategory === 'architecture' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Mermaid System Diagram
                    </h2>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                      <input
                        type="checkbox"
                        checked={config.showArchitecture}
                        onChange={(e) => updateConfig({ showArchitecture: e.target.checked })}
                        className="rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-0"
                      />
                      <span>Include in README</span>
                    </label>
                  </div>

                  <p className="text-xs text-slate-400">
                    Renders natively on GitHub using GitHub&apos;s built-in Mermaid syntax highlighting.
                  </p>

                  <textarea
                    rows={10}
                    value={config.architectureMermaid}
                    onChange={(e) => updateConfig({ architectureMermaid: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-emerald-400 font-mono leading-relaxed focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              )}

              {/* TECH STACK TAB */}
              {activeCategory === 'stack' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Ecosystem &amp; Tech Stack
                    </h2>
                    <span className="text-[10px] font-mono text-slate-400">{config.techStack.length} frameworks</span>
                  </div>

                  <div className="space-y-2">
                    {config.techStack.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950/70"
                      >
                        <div className="flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-amber-400" />
                          <span className="font-mono text-xs font-bold text-white">{tech.name}</span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400 uppercase">
                          {tech.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INSTALL & COMMANDS TAB */}
              {activeCategory === 'install' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                      Terminal Quickstart &amp; Commands
                    </h2>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Quickstart One-Liner</label>
                    <input
                      type="text"
                      value={config.quickStartCommand}
                      onChange={(e) => updateConfig({ quickStartCommand: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-400 font-mono focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="block text-xs font-mono text-slate-300">Installation Sequence</span>
                    {config.installSteps.map((step, idx) => (
                      <div key={step.id} className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/70 space-y-1">
                        <span className="font-mono text-xs font-bold text-slate-200">
                          {idx + 1}. {step.step}
                        </span>
                        <code className="block text-[11px] font-mono text-emerald-400 bg-slate-900 px-2 py-1 rounded">
                          {step.command}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* RIGHT PANE: Live Compilation Canvas & Preview */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <main
            className={`flex flex-col bg-slate-950 overflow-hidden ${
              viewMode === 'preview' ? 'lg:col-span-12' : 'lg:col-span-7'
            }`}
          >
            {/* Live Canvas Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/40 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GFM COMPILED • 0 SYNTAX ERRORS</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{compiledMarkdown.length} BYTES</span>
                <span>GITHUB CAMO SAFE</span>
              </div>
            </div>

            {/* Live Preview Container (Styled GitHub-like Markdown view) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans text-slate-200 max-w-4xl mx-auto w-full space-y-6">
              {/* Header block */}
              <div className="text-center space-y-2 border-b border-slate-800 pb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                  {config.name}
                </h1>
                <p className="text-base text-slate-300 font-medium">{config.tagline}</p>

                {/* Badges preview */}
                {config.showBadges && config.badges.filter((b) => b.enabled).length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                    {config.badges
                      .filter((b) => b.enabled)
                      .map((b) => (
                        <span
                          key={b.id}
                          className="inline-flex items-center font-mono text-[10px] font-bold uppercase rounded overflow-hidden shadow-2xs"
                        >
                          <span className="bg-slate-700 text-slate-200 px-2 py-0.5">{b.label}</span>
                          <span className="bg-amber-500 text-slate-950 px-2 py-0.5">{b.text}</span>
                        </span>
                      ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-amber-400 pt-2">
                  {config.liveDemoUrl && (
                    <a
                      href={config.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {config.repositoryUrl && (
                    <a
                      href={config.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-1">Overview</h2>
                <p className="text-sm leading-relaxed text-slate-300">{config.description}</p>
              </div>

              {/* Features */}
              {config.features.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-1">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {config.features.map((feat) => (
                      <div
                        key={feat.id}
                        className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors"
                      >
                        <h3 className="text-sm font-bold text-amber-400 font-mono mb-1">{feat.title}</h3>
                        <p className="text-xs text-slate-300 leading-normal">{feat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mermaid Architecture */}
              {config.showArchitecture && config.architectureMermaid.trim() && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-1">System Architecture</h2>
                  <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/80 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                    <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">
                      Mermaid Diagram Source
                    </div>
                    <pre className="whitespace-pre">{config.architectureMermaid}</pre>
                  </div>
                </div>
              )}

              {/* Tech Stack Table */}
              {config.techStack.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-1">Tech Stack</h2>
                  <div className="rounded-lg border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Layer</th>
                          <th className="p-2.5">Technology</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {config.techStack.map((tech) => (
                          <tr key={tech.id} className="hover:bg-slate-900/30">
                            <td className="p-2.5 font-bold text-slate-300">{tech.category}</td>
                            <td className="p-2.5 text-amber-400">{tech.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Installation */}
              {config.quickStartCommand && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-1">Getting Started</h2>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/90 font-mono text-xs flex items-center justify-between">
                    <code className="text-amber-400">{config.quickStartCommand}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(config.quickStartCommand)}
                      className="text-slate-400 hover:text-white p-1"
                      title="Copy command"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

