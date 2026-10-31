'use client';

import { useState, useMemo } from 'react';
import {
  buildTelemetryActionWorkflow,
  buildTelemetryEmbedUrl,
  buildTelemetryMarkdownSnippet,
} from '#/lib/forge-telemetry/builder';
import {
  ForgeTelemetryConfig,
  TelemetryTemplate,
  TelemetryOutputMode,
} from '#/lib/forge-telemetry/types';
import {
  TELEMETRY_PLUGINS_CATALOG,
  TELEMETRY_CATEGORIES,
} from '#/lib/forge-telemetry/catalog';
import {
  BarChart3,
  Calendar,
  Code2,
  Clock,
  Trophy,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Sparkles,
  Globe,
  Download,
  Music,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';

export function TelemetryStudio() {
  // Primary State
  const [username, setUsername] = useState('octocat');
  const [template, setTemplate] = useState<TelemetryTemplate>('classic');
  const [outputMode, setOutputMode] = useState<TelemetryOutputMode>('direct_svg');
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'action' | 'url'>('preview');
  const [selectedPluginPreset, setSelectedPluginPreset] = useState<
    'isocalendar' | 'languages' | 'habits' | 'achievements' | 'terminal' | 'pagespeed' | 'music' | 'leetcode' | 'full'
  >('isocalendar');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dynamic Plugin Configuration Map
  const [enabledPlugins, setEnabledPlugins] = useState<Record<string, boolean>>({
    isocalendar: true,
    languages: true,
    habits: true,
    achievements: true,
    leetcode: false,
    topics: false,
    wakatime: false,
    pagespeed: false,
    music: false,
    terminal: false,
  });

  const [pluginOptions, setPluginOptions] = useState<Record<string, string | number | boolean>>({
    'isocalendar.duration': 'half-year',
    'languages.limit': 8,
    'languages.indepth': false,
    'habits.from': 200,
    'habits.days': 14,
    'habits.facts': true,
    'habits.charts': true,
    'achievements.threshold': 'B',
    'achievements.secrets': false,
    'achievements.display': 'compact',
    'topics.mode': 'starred',
    'topics.limit': 15,
  });

  // Base switches
  const [baseHeader, setBaseHeader] = useState(true);
  const [baseActivity, setBaseActivity] = useState(true);
  const [baseCommunity, setBaseCommunity] = useState(true);
  const [baseRepositories, setBaseRepositories] = useState(true);

  // Filtered plugins catalog
  const filteredPlugins = useMemo(() => {
    return TELEMETRY_PLUGINS_CATALOG.filter(plugin => {
      const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Unified Config Object
  const telemetryConfig: ForgeTelemetryConfig = useMemo(() => {
    return {
      username: username.trim() || 'octocat',
      template,
      outputMode,
      base: {
        header: baseHeader,
        activity: baseActivity,
        community: baseCommunity,
        repositories: baseRepositories,
        metadata: true,
      },
      isocalendar: {
        enabled: enabledPlugins.isocalendar,
        duration: (pluginOptions['isocalendar.duration'] as 'half-year' | 'full-year') || 'half-year',
      },
      languages: {
        enabled: enabledPlugins.languages,
        limit: Number(pluginOptions['languages.limit']) || 8,
        indepth: Boolean(pluginOptions['languages.indepth']),
      },
      habits: {
        enabled: enabledPlugins.habits,
        from: Number(pluginOptions['habits.from']) || 200,
        days: Number(pluginOptions['habits.days']) || 14,
        facts: pluginOptions['habits.facts'] !== false,
        charts: pluginOptions['habits.charts'] !== false,
      },
      achievements: {
        enabled: enabledPlugins.achievements,
        threshold: (pluginOptions['achievements.threshold'] as 'C' | 'B' | 'A' | 'S' | 'X') || 'B',
        secrets: Boolean(pluginOptions['achievements.secrets']),
        display: 'compact',
      },
      leetcode: {
        enabled: enabledPlugins.leetcode,
        user: String(pluginOptions['leetcode.user'] || username.trim() || 'octocat'),
      },
      topics: {
        enabled: enabledPlugins.topics,
        limit: Number(pluginOptions['topics.limit']) || 15,
      },
      wakatime: {
        enabled: enabledPlugins.wakatime,
        days: 7,
      },
    };
  }, [
    username,
    template,
    outputMode,
    baseHeader,
    baseActivity,
    baseCommunity,
    baseRepositories,
    enabledPlugins,
    pluginOptions,
  ]);

  // Derived outputs (100% native, zero external dependencies)
  const embedUrl = useMemo(() => buildTelemetryEmbedUrl(telemetryConfig), [telemetryConfig]);
  const actionWorkflow = useMemo(() => buildTelemetryActionWorkflow(telemetryConfig), [telemetryConfig]);
  const markdownSnippet = useMemo(() => buildTelemetryMarkdownSnippet(telemetryConfig, 'center'), [telemetryConfig]);

  const activeSvgUrl = useMemo(() => {
    if (selectedPluginPreset === 'full') return embedUrl;
    const cleanUser = encodeURIComponent(username.trim() || 'octocat');
    return `/api/telemetry/svg?plugin=${selectedPluginPreset}&user=${cleanUser}`;
  }, [selectedPluginPreset, username, embedUrl]);

  const activeMarkdownSnippet = useMemo(() => {
    if (selectedPluginPreset === 'full') return markdownSnippet;
    const cleanUser = username.trim() || 'octocat';
    return `<!-- MonoForge Standalone Telemetry: ${selectedPluginPreset.toUpperCase()} -->
<p align="center">
  <img src="https://raw.githubusercontent.com/${cleanUser}/${cleanUser}/main/public/assets/telemetry-${selectedPluginPreset}.svg" alt="${cleanUser}'s MonoForge Telemetry" width="100%" />
</p>

<!-- Native dynamic API route: -->
<!-- <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${selectedPluginPreset}&user=${cleanUser}" alt="${cleanUser}'s MonoForge Telemetry" /> -->`;
  }, [selectedPluginPreset, username, markdownSnippet]);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadSvg = async () => {
    try {
      const res = await fetch(activeSvgUrl);
      const text = await res.text();
      const blob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `monoforge-telemetry-${selectedPluginPreset}-${username || 'octocat'}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success(`Downloaded telemetry-${selectedPluginPreset}.svg!`);
    } catch {
      toast.error('Failed to download SVG');
    }
  };

  const templates: Array<{ id: TelemetryTemplate; label: string; desc: string }> = [
    { id: 'classic', label: 'Classic', desc: 'Standard balanced card format' },
    { id: 'terminal', label: 'Terminal', desc: 'Sleek CLI command-line aesthetic' },
    { id: 'repository', label: 'Repository', desc: 'Repository-centric statistics' },
    { id: 'markdown', label: 'Markdown', desc: 'Lightweight native tables' },
    { id: 'community', label: 'Community', desc: 'Spotlight on discussions & PRs' },
  ];

  const svgPresets = [
    { id: 'isocalendar' as const, label: '3D Isometric', desc: 'Voxel activity landscape', icon: Calendar, tag: '3D' },
    { id: 'languages' as const, label: 'Languages Donut', desc: 'Multi-ring polyglot breakdown', icon: Code2, tag: 'DONUT' },
    { id: 'habits' as const, label: '24h Habits Radar', desc: 'Activity clock & weekdays', icon: Clock, tag: 'RADAR' },
    { id: 'achievements' as const, label: 'Achievements Rack', desc: 'S-Rank trophy badges', icon: Trophy, tag: 'S-TIER' },
    { id: 'terminal' as const, label: 'Terminal HUD', desc: 'Cyberpunk CRT scanline console', icon: Terminal, tag: 'HUD' },
    { id: 'pagespeed' as const, label: 'PageSpeed Audit', desc: 'Lighthouse 4-pillar web vitals', icon: Sparkles, tag: '100%' },
    { id: 'music' as const, label: 'Music Equalizer', desc: 'Spotify now-playing visualizer', icon: Music, tag: 'AUDIO' },
    { id: 'leetcode' as const, label: 'LeetCode Mastery', desc: 'Problem solving radar gauge', icon: BarChart3, tag: 'ALGO' },
    { id: 'full' as const, label: 'Full Action Suite', desc: 'All-in-one GitHub Action', icon: Globe, tag: 'ACTION' },
  ];

  const togglePlugin = (pluginId: string) => {
    setEnabledPlugins(prev => ({
      ...prev,
      [pluginId]: !prev[pluginId],
    }));
  };

  const updatePluginOption = (key: string, value: string | number | boolean) => {
    setPluginOptions(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTabSwitch = (tab: 'preview' | 'markdown' | 'action' | 'url') => {
    setActiveTab(tab);
    if (tab === 'action') {
      setOutputMode('action');
    } else {
      setOutputMode('direct_svg');
    }
  };

  return (
    <div className="w-full bg-[#fafafa] text-neutral-950 font-sans selection:bg-[#ffe600] selection:text-neutral-950">
      {/* Container */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b-2 border-neutral-900">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-1.5 rounded-lg bg-[#ffe600] border-2 border-neutral-900 text-neutral-950 shadow-[2px_2px_0px_#18181b]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 uppercase">
                MonoForge Telemetry
              </h1>
              <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-lg bg-[#ffe600] text-neutral-950 border border-neutral-900 shadow-2xs">
                47+ Plugins • 100% Native
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl font-mono">
              High-performance GitHub profile infographics &amp; developer telemetry. Live preview, customizable templates, and 1-click GitHub Actions or standalone SVG embeds. Zero external proxies.
            </p>
          </div>

          {/* Quick preset profile buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-600 font-mono font-bold hidden sm:inline">Try samples:</span>
            {['octocat', 'torvalds', 'developer'].map(handle => (
              <button
                key={handle}
                type="button"
                onClick={() => setUsername(handle)}
                className={`px-3 py-1 rounded-lg border-2 border-neutral-900 text-xs font-mono font-bold transition-all btn-tactile cursor-pointer ${
                  username === handle
                    ? 'bg-[#ffe600] text-neutral-950 font-black shadow-[2px_2px_0px_#18181b]'
                    : 'bg-white text-neutral-800 hover:bg-[#ffe600] shadow-[1px_1px_0px_#18181b]'
                }`}
              >
                @{handle}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column: Configuration Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Account & Source Selection */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b]">
              <label className="block text-xs font-mono font-black text-neutral-950 mb-2 uppercase tracking-wider">
                Target GitHub Account
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="e.g. torvalds, octocat"
                  className="w-full pl-3 pr-24 py-2 rounded-xl bg-white border-2 border-neutral-900 text-sm font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ffe600] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setUsername('octocat')}
                  className="absolute right-2 top-1.5 px-2.5 py-1 text-[11px] rounded-lg bg-neutral-900 text-neutral-200 hover:bg-[#ffe600] hover:text-neutral-950 font-mono font-bold transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Template Archetype Selector */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-black text-neutral-950 uppercase tracking-wider">
                  Visual Template Theme
                </label>
                <span className="text-[11px] font-mono font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                  {template}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {templates.map(tpl => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setTemplate(tpl.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      template === tpl.id
                        ? 'border-neutral-900 bg-[#ffe600] text-neutral-950 shadow-[2px_2px_0px_#18181b]'
                        : 'border-neutral-900 bg-white text-neutral-700 hover:bg-neutral-100 shadow-[1px_1px_0px_#18181b]'
                    }`}
                  >
                    <div className="text-xs font-mono font-black">{tpl.label}</div>
                    <div className="text-[11px] font-mono text-neutral-600 truncate mt-0.5">{tpl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Core Base Sections Toggle */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] space-y-3">
              <label className="block text-xs font-mono font-black text-neutral-950 uppercase tracking-wider">
                Core Base Sections
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
                {[
                  { label: 'Header', val: baseHeader, set: setBaseHeader },
                  { label: 'Activity', val: baseActivity, set: setBaseActivity },
                  { label: 'Community', val: baseCommunity, set: setBaseCommunity },
                  { label: 'Repositories', val: baseRepositories, set: setBaseRepositories },
                ].map(item => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => item.set(!item.val)}
                    className={`px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      item.val
                        ? 'bg-[#ffe600] text-neutral-950 font-black shadow-[2px_2px_0px_#18181b]'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100 shadow-[1px_1px_0px_#18181b]'
                    }`}
                  >
                    {item.val ? '✓' : '✗'} {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plugin Arsenal Catalog */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono font-black text-neutral-950 uppercase tracking-wider">
                    Plugins &amp; Telemetry Modules ({TELEMETRY_PLUGINS_CATALOG.length})
                  </label>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-600 bg-[#ffe600]/20 px-2 py-0.5 rounded border border-neutral-900">
                  {Object.values(enabledPlugins).filter(Boolean).length} Active
                </span>
              </div>

              {/* Search & Category Filter */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search 47+ telemetry engines..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border-2 border-neutral-900 text-xs font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ffe600]"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
                  {TELEMETRY_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-lg shrink-0 border transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-neutral-950 text-white font-bold border-neutral-950'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {filteredPlugins.map(plugin => {
                  const isEnabled = Boolean(enabledPlugins[plugin.id]);
                  return (
                    <div
                      key={plugin.id}
                      className={`p-3.5 rounded-xl border-2 transition-all ${
                        isEnabled
                          ? 'border-neutral-900 bg-[#fffde6] shadow-[2px_2px_0px_#18181b]'
                          : 'border-neutral-300 bg-white hover:border-neutral-500'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-neutral-950">
                              {plugin.name}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-600 bg-neutral-200 px-1.5 py-0.5 rounded">
                              {plugin.category}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-neutral-700 leading-relaxed">
                            {plugin.description}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => togglePlugin(plugin.id)}
                          className="w-4 h-4 rounded border-2 border-neutral-900 accent-[#ffe600] cursor-pointer mt-0.5"
                        />
                      </div>

                      {/* Configurable Sub-options */}
                      {isEnabled && plugin.inputs && plugin.inputs.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-neutral-900/60 pl-6 space-y-2">
                          {plugin.inputs.map(input => {
                            const optionKey = `${plugin.id}.${input.name}`;
                            const currentVal = pluginOptions[optionKey] ?? input.default;

                            return (
                              <div key={input.name} className="flex items-center justify-between text-[11px] font-mono">
                                <span className="text-neutral-700">{input.description}</span>
                                {input.type === 'boolean' && (
                                  <input
                                    type="checkbox"
                                    checked={Boolean(currentVal)}
                                    onChange={e => updatePluginOption(optionKey, e.target.checked)}
                                    className="rounded border-neutral-900 accent-[#ffe600] cursor-pointer"
                                  />
                                )}
                                {input.type === 'number' && (
                                  <input
                                    type="number"
                                    value={Number(currentVal) || 0}
                                    min={input.min}
                                    max={input.max}
                                    onChange={e => updatePluginOption(optionKey, Number(e.target.value))}
                                    className="w-16 px-1.5 py-0.5 rounded bg-white border border-neutral-900 font-mono text-neutral-900 text-right"
                                  />
                                )}
                                {input.type === 'select' && input.values && (
                                  <select
                                    value={String(currentVal)}
                                    onChange={e => updatePluginOption(optionKey, e.target.value)}
                                    className="px-2 py-0.5 rounded bg-white border border-neutral-900 text-neutral-900 font-mono text-[11px]"
                                  >
                                    {input.values.map(val => (
                                      <option key={val} value={val}>{val}</option>
                                    ))}
                                  </select>
                                )}
                                {input.type === 'text' && (
                                  <input
                                    type="text"
                                    value={String(currentVal || '')}
                                    placeholder={input.name}
                                    onChange={e => updatePluginOption(optionKey, e.target.value)}
                                    className="w-32 px-2 py-0.5 rounded bg-white border border-neutral-900 text-neutral-900 font-mono text-[11px]"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Camo SVG Previews & Embed Snippets (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Standalone Vector Selector Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black text-neutral-950 uppercase tracking-wider">
                  Standalone Vector Visualizers (100% Native Pure SVG)
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-neutral-900">
                  GitHub Camo Proxy Safe
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {svgPresets.map(preset => {
                  const isSelected = selectedPluginPreset === preset.id;
                  const Icon = preset.icon;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPluginPreset(preset.id)}
                      className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'border-neutral-900 bg-[#ffe600] text-neutral-950 shadow-[2px_2px_0px_#18181b]'
                          : 'border-neutral-900 bg-white text-neutral-700 hover:bg-neutral-100 shadow-[1px_1px_0px_#18181b]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-mono font-bold truncate max-w-full">
                        {preset.label}
                      </span>
                      <span className="text-[9px] font-mono font-black px-1.5 rounded bg-neutral-900 text-white">
                        {preset.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="rounded-2xl border-2 border-neutral-900 bg-white shadow-[4px_4px_0px_#18181b] overflow-hidden">
              {/* Box Top Navigation Tabs */}
              <div className="flex items-center justify-between border-b-2 border-neutral-900 px-4 py-2.5 bg-neutral-100">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('preview')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === 'preview'
                        ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                        : 'text-neutral-700 hover:text-neutral-950'
                    }`}
                  >
                    Live Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('markdown')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === 'markdown'
                        ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                        : 'text-neutral-700 hover:text-neutral-950'
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('action')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === 'action'
                        ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                        : 'text-neutral-700 hover:text-neutral-950'
                    }`}
                  >
                    Action YAML
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('url')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === 'url'
                        ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                        : 'text-neutral-700 hover:text-neutral-950'
                    }`}
                  >
                    API Endpoint
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-600 hidden sm:inline">
                    60fps Keyframes Ready
                  </span>
                </div>
              </div>

              {/* Tab 1: Live Pure SVG Render */}
              {activeTab === 'preview' && (
                <div className="p-4 sm:p-6 bg-[#0a0d14] flex flex-col items-center justify-center min-h-[380px] overflow-hidden relative">
                  <div className="w-full flex justify-between items-center pb-3 text-neutral-400 font-mono text-xs border-b border-neutral-800 mb-4">
                    <span>
                      telemetry-{selectedPluginPreset}.svg (Vector SVG)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadSvg}
                        className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                      <a
                        href={activeSvgUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Raw</span>
                      </a>
                    </div>
                  </div>

                  {/* Pure SVG Vector Object Container */}
                  <div className="w-full flex items-center justify-center p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeSvgUrl}
                      alt={`MonoForge Telemetry ${selectedPluginPreset}`}
                      className="max-w-full h-auto rounded shadow-lg transition-transform hover:scale-[1.01]"
                    />
                  </div>

                  <div className="w-full flex justify-between items-center text-[10px] font-mono text-neutral-400 mt-4">
                    <span>✓ GitHub Camo safe (0 &lt;foreignObject&gt;)</span>
                    <span>MonoForge Native Engine</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Markdown Embed Snippet */}
              {activeTab === 'markdown' && (
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700">
                      Copy and paste directly into your GitHub README.md:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeMarkdownSnippet, 'md', 'Markdown')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 text-white font-mono text-xs font-bold border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile transition-all cursor-pointer"
                    >
                      {copiedKey === 'md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'md' ? 'Copied!' : 'Copy Snippet'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-neutral-950 border-2 border-neutral-900 font-mono text-xs text-amber-300 overflow-x-auto shadow-inner leading-relaxed">
                    {activeMarkdownSnippet}
                  </pre>
                </div>
              )}

              {/* Tab 3: GitHub Actions Workflow */}
              {activeTab === 'action' && (
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700">
                      Save as <code>.github/workflows/monoforge-telemetry.yml</code>:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(actionWorkflow, 'act', 'Workflow YAML')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 text-white font-mono text-xs font-bold border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile transition-all cursor-pointer"
                    >
                      {copiedKey === 'act' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'act' ? 'Copied!' : 'Copy Workflow'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-neutral-950 border-2 border-neutral-900 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner leading-relaxed max-h-[400px]">
                    {actionWorkflow}
                  </pre>
                </div>
              )}

              {/* Tab 4: Direct API Endpoint URL */}
              {activeTab === 'url' && (
                <div className="p-4 sm:p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                      Direct SVG Route
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={activeSvgUrl}
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-neutral-900 font-mono text-xs text-neutral-950"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(activeSvgUrl, 'url', 'Embed URL')}
                        className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-[#ffe600] hover:text-neutral-950 text-white text-xs font-mono font-bold flex items-center gap-1 border-2 border-neutral-900 transition-all cursor-pointer shrink-0"
                      >
                        {copiedKey === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                      cURL Command
                    </label>
                    <pre className="p-3.5 rounded-xl bg-neutral-950 border-2 border-neutral-900 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                      curl -s "https://monoforge-studio.vercel.app{activeSvgUrl}" -o telemetry-{selectedPluginPreset}.svg
                    </pre>
                  </div>
                </div>
              )}

              {/* Bottom Quick-Action Bar */}
              <div className="p-3 sm:p-4 border-t-2 border-neutral-900 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-neutral-600 font-mono text-[11px]">
                  Engine: <span className="text-neutral-950 font-bold">@monoforge/telemetry</span> &bull; Module: <span className="text-amber-600 font-bold">{selectedPluginPreset}</span>
                </span>
                <div className="flex items-center gap-2">
                  {selectedPluginPreset !== 'full' && (
                    <button
                      type="button"
                      onClick={handleDownloadSvg}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffe600] text-neutral-950 font-mono text-xs font-bold border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-neutral-700" />
                      <span>Download .svg</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCopy(activeMarkdownSnippet, 'bottom_md', 'Markdown Snippet')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(actionWorkflow, 'bottom_action', 'Workflow YAML')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffe600] text-neutral-950 font-mono text-xs font-bold border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] btn-tactile transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Copy Action YAML</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}