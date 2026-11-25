'use client';

import React, { useState, useMemo } from 'react';
import { pluginRegistry, getAllCategories } from '#/lib/plugins/registry';
import { Plugin } from '#/lib/plugins/types';
import { TEMPLATES, TemplateItem } from '#/lib/templates/catalog';
import { useReadmeStore } from '#/store/useReadmeStore';
import {
  Search,
  Code2,
  Plus,
  Sparkles,
  Check,
  LayoutTemplate,
  FileCode2,
  Copy,
  ExternalLink,
  Bot,
  Sliders,
  Layers,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  CopyPlus,
  Trash2,
  Box,
  Undo2,
} from 'lucide-react';
import { REUSABLE_BLOCKS } from '#/lib/blocks/reusable-blocks';
import { toast } from 'sonner';

interface PluginPanelProps {
  className?: string;
  onPluginInserted?: (pluginId: string) => void;
}

const TEMPLATE_PAGE_SIZE = 24;

export const PluginPanel: React.FC<PluginPanelProps> = ({
  className = '',
  onPluginInserted,
}) => {
  const config = useReadmeStore(state => state.config);
  const addSection = useReadmeStore(state => state.addSection);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);
  const undo = useReadmeStore(state => state.undo);
  const history = useReadmeStore(state => state.history);
  const toggleSectionVisibility = useReadmeStore(state => state.toggleSectionVisibility);
  const duplicateSection = useReadmeStore(state => state.duplicateSection);
  const moveSection = useReadmeStore(state => state.moveSection);
  const removeSection = useReadmeStore(state => state.removeSection);

  const [panelTab, setPanelTab] = useState<'plugins' | 'blocks' | 'templates' | 'schema'>('plugins');
  const [insertedBlockId, setInsertedBlockId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [templateLimit, setTemplateLimit] = useState<number>(TEMPLATE_PAGE_SIZE);
  const [insertedPluginId, setInsertedPluginId] = useState<string | null>(null);
  const [appliedTemplateId, setAppliedTemplateId] = useState<string | null>(null);
  const [lastAppliedTemplateName, setLastAppliedTemplateName] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const categories = useMemo(() => ['all', ...getAllCategories()], []);

  const templateCategories = useMemo(() => {
    const set = new Set<string>();
    TEMPLATES.forEach(t => set.add(t.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredPlugins = useMemo(() => {
    const query = search.trim().toLowerCase();
    return pluginRegistry.filter(plugin => {
      const matchesSearch =
        !query ||
        plugin.name.toLowerCase().includes(query) ||
        plugin.description.toLowerCase().includes(query) ||
        plugin.id.toLowerCase().includes(query) ||
        Boolean(plugin.tags?.some(t => t.toLowerCase().includes(query)));

      const matchesCategory =
        selectedCategory === 'all' || plugin.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return TEMPLATES.filter(tmpl => {
      const matchesSearch =
        !query ||
        tmpl.name.toLowerCase().includes(query) ||
        tmpl.description.toLowerCase().includes(query) ||
        tmpl.category.toLowerCase().includes(query) ||
        Boolean(tmpl.tags?.some(t => t.toLowerCase().includes(query)));

      const matchesCategory =
        selectedCategory === 'all' ||
        tmpl.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const visibleTemplates = useMemo(() => {
    if (search.trim() || selectedCategory !== 'all') {
      return filteredTemplates.slice(0, Math.max(templateLimit, 48));
    }
    return filteredTemplates.slice(0, templateLimit);
  }, [filteredTemplates, search, selectedCategory, templateLimit]);

  const handleInsert = (plugin: Plugin) => {
    const defaultContent = plugin.defaultConfig
      ? JSON.parse(JSON.stringify(plugin.defaultConfig))
      : {};

    addSection(plugin.id, { content: defaultContent });

    setInsertedPluginId(plugin.id);
    onPluginInserted?.(plugin.id);

    setTimeout(() => {
      setInsertedPluginId(null);
    }, 1800);
  };

  const handleApplyTemplate = (tmpl: TemplateItem) => {
    setEntireConfig(tmpl.config);
    setAppliedTemplateId(tmpl.id);
    setLastAppliedTemplateName(tmpl.name);

    toast.success(`Applied "${tmpl.name}" preset`, {
      description: `${tmpl.config.sections.length} sections loaded into editor.`,
      action: {
        label: 'Undo',
        onClick: () => undo(),
      },
    });

    setTimeout(() => {
      setAppliedTemplateId(null);
    }, 2000);
  };

  const handleCopyConfigJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-col h-full bg-[#fafbfc] dark:bg-[#1e293b] rounded-2xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden shadow-[4px_4px_0px_#334155] dark:shadow-[4px_4px_0px_#475569] ${className}`}>
      {/* Tab Switcher */}
      <div className="flex items-center flex-wrap border-b-2 border-slate-300 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-800 p-1.5 gap-1 text-xs font-mono">
        <button
          type="button"
          onClick={() => {
            setPanelTab('plugins');
            setSelectedCategory('all');
          }}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
            panelTab === 'plugins'
              ? 'bg-[#ffe600] text-slate-900 border-2 border-slate-700 font-black shadow-[2px_2px_0px_#334155]'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PLUGINS ({pluginRegistry.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPanelTab('blocks');
            setSelectedCategory('all');
          }}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
            panelTab === 'blocks'
              ? 'bg-[#ffe600] text-slate-900 border-2 border-slate-700 font-black shadow-[2px_2px_0px_#334155]'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>BLOCKS ({config.sections.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPanelTab('templates');
            setSelectedCategory('all');
            setTemplateLimit(TEMPLATE_PAGE_SIZE);
          }}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
            panelTab === 'templates'
              ? 'bg-[#ffe600] text-slate-900 border-2 border-slate-700 font-black shadow-[2px_2px_0px_#334155]'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>TEMPLATES ({TEMPLATES.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setPanelTab('schema')}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
            panelTab === 'schema'
              ? 'bg-[#ffe600] text-slate-900 border-2 border-slate-700 font-black shadow-[2px_2px_0px_#334155]'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Schema &amp; API</span>
        </button>
      </div>

      {/* BLOCKS & OUTLINE TAB */}
      {panelTab === 'blocks' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Active Sections Outline */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>Active Sections ({config.sections.length})</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Move / Duplicate / Hide
              </span>
            </div>

            {config.sections.length === 0 ? (
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-[#f8fafc] dark:bg-slate-800/60 text-center font-mono text-xs text-slate-500 dark:text-slate-400">
                No active sections yet. Insert a reusable block below to get started!
              </div>
            ) : (
              <div className="space-y-1.5">
                {config.sections.map((section, idx) => {
                  const plugin = pluginRegistry.find(p => p.id === section.type);
                  const isHidden = section.visible === false || (section.props as { visible?: boolean })?.visible === false;
                  return (
                    <div
                      key={section.id || idx}
                      className={`flex items-center justify-between p-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-2xs transition-all ${
                        isHidden ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-slate-300 dark:border-slate-600">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate">
                            {plugin?.name || section.type}
                          </p>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            {section.type} {isHidden && '• [HIDDEN]'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleSectionVisibility(section.id)}
                          title={isHidden ? 'Show section' : 'Hide section'}
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                        >
                          {isHidden ? (
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </button>

                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveSection(section.id, 'up')}
                          title="Move section up"
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          disabled={idx === config.sections.length - 1}
                          onClick={() => moveSection(section.id, 'down')}
                          title="Move section down"
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => duplicateSection(section.id)}
                          title="Duplicate section"
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-400 transition-colors cursor-pointer"
                        >
                          <CopyPlus className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeSection(section.id)}
                          title="Remove section"
                          className="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 11 Reusable Blocks Palette */}
          <div className="space-y-2 pt-2 border-t-2 border-slate-300 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-amber-500" />
                <span>{REUSABLE_BLOCKS.length} Reusable Blocks</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                1-Click Insert
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {REUSABLE_BLOCKS.map((block) => {
                const isJustInserted = insertedBlockId === block.type;
                return (
                  <div
                    key={block.type}
                    className="p-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-amber-400 transition-colors shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-mono text-[9px] uppercase font-bold shrink-0">
                          {block.category}
                        </span>
                        <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate">
                          {block.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const blockConfig = block.createSection(config.settings.user);
                          addSection(block.pluginId, blockConfig.props as Record<string, unknown>);
                          setInsertedBlockId(block.type);
                          setTimeout(() => setInsertedBlockId(null), 1500);
                          if (onPluginInserted) onPluginInserted(block.pluginId);
                        }}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono font-black border border-slate-700 transition-all cursor-pointer shrink-0 ${
                          isJustInserted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#ffe600] hover:bg-amber-300 text-slate-900 shadow-[1px_1px_0px_#334155]'
                        }`}
                      >
                        {isJustInserted ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>INSERT</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                      {block.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PLUGINS TAB */}
      {panelTab === 'plugins' && (
        <>
          <div className="p-3 bg-[#f8fafc] dark:bg-slate-800/80 border-b-2 border-slate-300 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-700 dark:text-slate-300 font-mono font-bold">
                {filteredPlugins.length} plugins matching
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono font-black uppercase">
                1-click insert
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400 select-none" />
              <input
                type="text"
                placeholder="Search badges, stats, widgets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-xs font-mono font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-400 shadow-2xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#ffe600] text-slate-900 font-black border-slate-700 shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Plugin Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#fafbfc] dark:bg-[#1e293b]">
            {filteredPlugins.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400 font-mono text-xs">
                No plugins match &quot;{search}&quot;
              </div>
            ) : (
              filteredPlugins.map(plugin => {
                const isJustInserted = insertedPluginId === plugin.id;

                return (
                  <div
                    key={plugin.id}
                    className="p-3.5 bg-white dark:bg-slate-800 hover:bg-amber-50/50 dark:hover:bg-slate-700/80 border-2 border-slate-300 dark:border-slate-600 rounded-xl transition-all flex flex-col justify-between shadow-[2px_2px_0px_#334155] dark:shadow-[2px_2px_0px_#475569] group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-sans">
                            {plugin.name}
                            {plugin.version && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded">
                                v{plugin.version}
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-mono">
                            {plugin.description}
                          </p>
                        </div>
                      </div>

                      {plugin.tags && plugin.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {plugin.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded font-mono font-bold"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold">
                        type: {plugin.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleInsert(plugin)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border-2 border-slate-700 shadow-2xs transition-all cursor-pointer ${
                          isJustInserted
                            ? 'bg-emerald-500 text-white font-black'
                            : 'bg-white dark:bg-slate-900 hover:bg-[#ffe600] text-slate-900 dark:text-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {isJustInserted ? (
                          <>
                            <Check className="w-3 h-3" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> Insert
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* TEMPLATES TAB */}
      {panelTab === 'templates' && (
        <>
          <div className="p-3 bg-[#f8fafc] dark:bg-slate-800/80 border-b-2 border-slate-300 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-700 dark:text-slate-300 font-mono font-bold">
                {filteredTemplates.length} archetypes
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-black uppercase">
                Production Ready
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400 select-none" />
              <input
                type="text"
                placeholder="Search templates (e.g. minimal, cyberpunk)..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setTemplateLimit(TEMPLATE_PAGE_SIZE);
                }}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-xs font-mono font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-400 shadow-2xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {templateCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setTemplateLimit(TEMPLATE_PAGE_SIZE);
                  }}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors border cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#ffe600] text-slate-900 font-black border-slate-700 shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {lastAppliedTemplateName && history.length > 0 && (
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-mono text-[11px]">
                <span className="truncate">Loaded &quot;{lastAppliedTemplateName}&quot;</span>
                <button
                  type="button"
                  onClick={() => {
                    undo();
                    setLastAppliedTemplateName(null);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] shrink-0 cursor-pointer"
                >
                  <Undo2 className="w-3 h-3" /> Undo
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#fafbfc] dark:bg-[#1e293b]">
            {visibleTemplates.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400 font-mono text-xs">
                No templates match &quot;{search}&quot;
              </div>
            ) : (
              <>
                {visibleTemplates.map(tmpl => {
                  const isApplied = appliedTemplateId === tmpl.id;

                  return (
                    <div
                      key={tmpl.id}
                      className="p-3.5 bg-white dark:bg-slate-800 hover:bg-amber-50/50 dark:hover:bg-slate-700/80 border-2 border-slate-300 dark:border-slate-600 rounded-xl transition-all flex flex-col justify-between shadow-[2px_2px_0px_#334155] dark:shadow-[2px_2px_0px_#475569] group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-sans">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-slate-700"
                              style={{ backgroundColor: tmpl.accent }}
                            />
                            {tmpl.name}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded font-bold">
                            {tmpl.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-mono">
                          {tmpl.description}
                        </p>
                        <div className="mt-2 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                          {tmpl.config.sections.length} sections · {tmpl.config.settings.badgeStyle} badges
                        </div>
                      </div>

                      <div className="flex items-center justify-end mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate(tmpl)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border-2 border-slate-700 shadow-2xs transition-all cursor-pointer ${
                            isApplied
                              ? 'bg-emerald-500 text-white font-black'
                              : 'bg-white dark:bg-slate-900 hover:bg-[#ffe600] text-slate-900 dark:text-slate-100 hover:text-slate-900'
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <Check className="w-3 h-3" /> Archetype Applied!
                            </>
                          ) : (
                            <>
                              <Sliders className="w-3 h-3" /> Load Preset
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {visibleTemplates.length < filteredTemplates.length && (
                  <button
                    type="button"
                    onClick={() => setTemplateLimit(prev => prev + TEMPLATE_PAGE_SIZE)}
                    className="w-full py-2 px-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold transition-colors cursor-pointer"
                  >
                    Show More ({filteredTemplates.length - visibleTemplates.length} remaining)
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* SCHEMA & AI TAB */}
      {panelTab === 'schema' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs bg-[#fafbfc] dark:bg-[#1e293b]">
          {/* Workspace Schema JSON */}
          <div className="p-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-[2px_2px_0px_#334155] space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>Workspace Schema JSON</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              Export the current profile state as JSON conforming to the official MonoForge schema.
            </p>
            <button
              type="button"
              onClick={handleCopyConfigJson}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-black border-2 border-slate-700 shadow-[2px_2px_0px_#334155] transition-all text-xs cursor-pointer"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-900" /> Config Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-900" /> Copy Configuration JSON
                </>
              )}
            </button>
          </div>

          {/* Machine Links */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
              Machine Endpoints
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-mono text-[11px] font-bold shadow-2xs transition-colors"
              >
                <span>/llms.txt</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              </a>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-mono text-[11px] font-bold shadow-2xs transition-colors"
              >
                <span>/llms-full.txt</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              </a>
              <a
                href="/api/schema"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-mono text-[11px] font-bold shadow-2xs transition-colors"
              >
                <span>/api/schema (Draft-07)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              </a>
            </div>
          </div>

          {/* Schema Structure Overview */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <FileCode2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Config Schema Shape</span>
            </h4>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 font-mono text-[10px] text-slate-700 dark:text-slate-200 leading-relaxed space-y-1 shadow-2xs">
              <div><span className="text-amber-600 dark:text-amber-400 font-bold">version</span>: string (&quot;1.0.0&quot;)</div>
              <div><span className="text-amber-600 dark:text-amber-400 font-bold">title</span>: string</div>
              <div><span className="text-amber-600 dark:text-amber-400 font-bold">settings</span>: &#123; user, theme, accentColor, badgeStyle, align, includeAttribution &#125;</div>
              <div><span className="text-amber-600 dark:text-amber-400 font-bold">sections</span>: Array&lt;&#123; id, type, visible?, title?, props &#125;&gt;</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PluginPanel;
