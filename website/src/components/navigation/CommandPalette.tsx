'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from '#/i18n/navigation';
import { Command } from 'cmdk';
import { useReadmeStore } from '#/store/useReadmeStore';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Copy,
  Download,
  FileUp,
  Sparkles,
  BookOpen,
  Globe,
  BarChart3,
  Github,
  LayoutTemplate,
  History,
  TrendingUp,
  Package,
  Brain,
  ShoppingBag,
  FolderKanban,
  Wand2,
  Code2,
  Film,
  Layers,
  FileCode2,
  Info,
  Shield,
  Bot,
  FileSpreadsheet,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { TEMPLATES } from '#/lib/templates/catalog';
import { TELEMETRY_PLUGINS_CATALOG } from '#/lib/forge-telemetry/catalog';
import { ALL_VISUALIZATION_IDS, VISUALIZATION_REGISTRY } from '#/lib/visualizations/registry';
import { pluginRegistry } from '#/lib/plugins/registry';
import { getAllDocs } from '#/content/docs/docs-data';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { ReadmeImporterModal } from '#/components/importer/ReadmeImporterModal';
import { ReadmeHealthScoreModal } from '#/components/studio/ReadmeHealthScoreModal';
import { VersionHistoryModal } from '#/components/studio/VersionHistoryModal';
import { AssetVaultModal } from '#/components/studio/AssetVaultModal';
import { DiagnosticsHUDModal } from '#/components/diagnostics/DiagnosticsHUDModal';
import { ProfileIntelligenceModal } from '#/components/intelligence/ProfileIntelligenceModal';
import { AssetMarketplaceModal } from '#/components/marketplace/AssetMarketplaceModal';
import { WorkspaceManagerModal } from '#/components/workspace/WorkspaceManagerModal';
import { AiAssistantModal } from '#/components/ai/AiAssistantModal';
import { ResumeUpload } from '#/components/enrichment/ResumeUpload';

interface CommandPaletteProps {
  onOpenImport?: () => void;
  triggerClassName?: string;
  showTrigger?: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  onOpenImport,
  triggerClassName = '',
  showTrigger = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { setTheme } = useTheme();
  const config = useReadmeStore((state) => state.config);
  const setEntireConfig = useReadmeStore((state) => state.setEntireConfig);

  // Modals state
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const allDocs = useMemo(() => getAllDocs(), []);
  const allVisualizations = useMemo(
    () => ALL_VISUALIZATION_IDS.map((id) => VISUALIZATION_REGISTRY[id]),
    []
  );

  // Listen to Cmd+K / Ctrl+K and global trigger events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setOpen(true);
    const handleOpenDiag = () => setIsDiagnosticsOpen(true);
    const handleOpenAi = () => setIsAiOpen(true);
    const handleOpenResume = () => setIsResumeOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('monoforge-open-command-palette', handleCustomOpen);
    window.addEventListener('monoforge-open-diagnostics', handleOpenDiag);
    window.addEventListener('monoforge-open-ai-assistant', handleOpenAi);
    window.addEventListener('monoforge-open-resume-upload', handleOpenResume);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('monoforge-open-command-palette', handleCustomOpen);
      window.removeEventListener('monoforge-open-diagnostics', handleOpenDiag);
      window.removeEventListener('monoforge-open-ai-assistant', handleOpenAi);
      window.removeEventListener('monoforge-open-resume-upload', handleOpenResume);
    };
  }, []);

  const closePalette = () => {
    setOpen(false);
    setSearch('');
  };

  const navigateTo = (href: string) => {
    closePalette();
    router.push(href);
  };

  const handleCopyMarkdown = async () => {
    try {
      const md = buildMarkdown(config);
      await navigator.clipboard.writeText(md);
      toast.success('README Markdown copied to clipboard!');
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 }, colors: ['#ffe600', '#10b981'] });
      } catch {
        // Ignored
      }
    } catch {
      toast.error('Failed to copy');
    }
    closePalette();
  };

  const handleDownloadMarkdown = () => {
    try {
      const md = buildMarkdown(config);
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success('Downloaded README.md');
    } catch {
      toast.error('Failed to download');
    }
    closePalette();
  };

  const handleSelectTemplate = (templateId: string) => {
    const found = TEMPLATES.find((t) => t.id === templateId);
    if (found) {
      setEntireConfig(found.config);
      toast.success(`Applied template "${found.name}"`);
      router.push('/developer');
    }
    closePalette();
  };

  const isSearching = search.trim().length > 0;
  const visibleTemplates = isSearching ? TEMPLATES : TEMPLATES.slice(0, 8);
  const visibleVisualizations = isSearching ? allVisualizations : allVisualizations.slice(0, 8);
  const visibleTelemetry = isSearching ? TELEMETRY_PLUGINS_CATALOG : TELEMETRY_PLUGINS_CATALOG.slice(0, 6);
  const visibleDocs = isSearching ? allDocs : allDocs.slice(0, 6);

  const itemClassName =
    'flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-slate-900 dark:text-slate-100 data-[selected=true]:bg-[#ffe600] data-[selected=true]:text-slate-900 hover:bg-[#ffe600] hover:text-slate-900 cursor-pointer transition-colors';
  const groupClassName =
    'text-slate-500 dark:text-slate-400 font-bold px-2 py-1 uppercase text-[10px] tracking-wider';

  return (
    <>
      {showTrigger && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-[#ffe600] dark:hover:bg-[#ffe600] text-slate-900 dark:text-slate-100 hover:text-slate-900 text-xs font-mono font-bold shadow-[2px_2px_0px_#334155] btn-tactile transition-all cursor-pointer ${triggerClassName}`}
          title="Open Command Palette (Cmd+K / Ctrl+K)"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px]">COMMANDS</span>
          <kbd className="px-1 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-white border border-slate-700 ml-0.5">
            ⌘K
          </kbd>
        </button>
      )}

      {/* Modal Dialog */}
      <Command.Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setSearch('');
        }}
        label="Global Command Menu"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-150"
      >
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-600 rounded-2xl overflow-hidden shadow-[8px_8px_0px_#334155] dark:shadow-[8px_8px_0px_#475569] flex flex-col max-h-[82vh]">
          {/* Header Input */}
          <div className="flex items-center px-4 py-3 bg-[#ffe600] border-b-2 border-slate-800 gap-2">
            <Sparkles className="w-4 h-4 text-slate-900 shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder={`Search ${TEMPLATES.length} templates, ${allVisualizations.length} visualizations, ${allDocs.length} docs, routes & tools...`}
              className="w-full bg-transparent text-xs font-mono font-bold text-slate-900 placeholder:text-slate-700 focus:outline-none"
            />
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-white shrink-0">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[28rem] overflow-y-auto p-2 text-xs font-mono space-y-2 bg-[#fafbfc] dark:bg-slate-900">
            <Command.Empty className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs font-mono">
              No matching routes, templates, visualizations, docs, or tools found.
            </Command.Empty>

            {/* All Live Routes */}
            <Command.Group heading="Pages & Studios" className={groupClassName}>
              <Command.Item value="home landing start quickstart" onSelect={() => navigateTo('/')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Home Page</span>
                </div>
                <span className="text-[10px] opacity-70">/</span>
              </Command.Item>
              <Command.Item value="wizard guided studio builder" onSelect={() => navigateTo('/wizard')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Wand2 className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Guided Profile Wizard</span>
                </div>
                <span className="text-[10px] opacity-70">/wizard</span>
              </Command.Item>
              <Command.Item value="developer ide monaco json code editor" onSelect={() => navigateTo('/developer')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Developer IDE ({pluginRegistry.length} Plugins)</span>
                </div>
                <span className="text-[10px] opacity-70">/developer</span>
              </Command.Item>
              <Command.Item value="templates archetypes gallery presets" onSelect={() => navigateTo('/templates')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <LayoutTemplate className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Curated Templates ({TEMPLATES.length} Archetypes)</span>
                </div>
                <span className="text-[10px] opacity-70">/templates</span>
              </Command.Item>
              <Command.Item value="visualizer svg canvas studio" onSelect={() => navigateTo('/visualizer')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Visualization Studio ({allVisualizations.length} Engines)</span>
                </div>
                <span className="text-[10px] opacity-70">/visualizer</span>
              </Command.Item>
              <Command.Item value="telemetry stats metrics live cards" onSelect={() => navigateTo('/telemetry')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Telemetry Hub ({TELEMETRY_PLUGINS_CATALOG.length}+ Cards)</span>
                </div>
                <span className="text-[10px] opacity-70">/telemetry</span>
              </Command.Item>
              <Command.Item value="animator svg keyframe timeline 60fps" onSelect={() => navigateTo('/animator')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Film className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">60fps SVG Animator Studio</span>
                </div>
                <span className="text-[10px] opacity-70">/animator</span>
              </Command.Item>
              <Command.Item value="assets vault stickers icons marketplace" onSelect={() => navigateTo('/assets')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Asset &amp; Sticker Vault</span>
                </div>
                <span className="text-[10px] opacity-70">/assets</span>
              </Command.Item>
              <Command.Item value="project readme repository generator inspector" onSelect={() => navigateTo('/project-readme')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <FileCode2 className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Project README Generator</span>
                </div>
                <span className="text-[10px] opacity-70">/project-readme</span>
              </Command.Item>
              <Command.Item value="docs documentation manual guides" onSelect={() => navigateTo('/docs')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Documentation Portal ({allDocs.length} Manuals)</span>
                </div>
                <span className="text-[10px] opacity-70">/docs</span>
              </Command.Item>
              <Command.Item value="info architecture guide playground badges" onSelect={() => navigateTo('/info')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Information &amp; Architecture Hub</span>
                </div>
                <span className="text-[10px] opacity-70">/info</span>
              </Command.Item>
              <Command.Item value="privacy policy local first open source" onSelect={() => navigateTo('/privacy-policy')} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Privacy Policy</span>
                </div>
                <span className="text-[10px] opacity-70">/privacy-policy</span>
              </Command.Item>
            </Command.Group>

            {/* Platform Modals & Tools */}
            <Command.Group heading="Tools & Modals" className={groupClassName}>
              <Command.Item
                value="ai assistant generate bio prompt llm"
                onSelect={() => {
                  closePalette();
                  setIsAiOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">AI Profile Assistant</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="resume upload pdf docx parser enrichment confirm"
                onSelect={() => {
                  closePalette();
                  setIsResumeOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Resume Upload &amp; Enrichment (Confirm-Gated)</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="profile intelligence developer iq audit"
                onSelect={() => {
                  closePalette();
                  setIsIntelligenceOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <Brain className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Profile Intelligence (Developer IQ Audit)</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="readme health score camo cdn audit"
                onSelect={() => {
                  closePalette();
                  setIsHealthOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">README Health Score &amp; Camo Audit</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="diagnostics hud camo guard auto fix"
                onSelect={() => {
                  closePalette();
                  setIsDiagnosticsOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Diagnostics HUD &amp; Camo Guard</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="import existing readme fetch github paste"
                onSelect={() => {
                  closePalette();
                  if (onOpenImport) onOpenImport();
                  else setIsImportOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <FileUp className="w-4 h-4 text-sky-600" />
                  <span className="font-bold">Import Existing README (GitHub or Paste)</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="workspace manager projects snapshots"
                onSelect={() => {
                  closePalette();
                  setIsWorkspaceOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <FolderKanban className="w-4 h-4 text-sky-600" />
                  <span className="font-bold">Workspace Manager (Projects &amp; Saved Drafts)</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="version history snapshots restore"
                onSelect={() => {
                  closePalette();
                  setIsHistoryOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <History className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Version History &amp; Snapshots</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="community asset marketplace components"
                onSelect={() => {
                  closePalette();
                  setIsMarketplaceOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  <span className="font-bold">Community Asset Marketplace</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="curated asset vault dividers badges"
                onSelect={() => {
                  closePalette();
                  setIsVaultOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Curated Asset Vault (Dividers &amp; Badges)</span>
                </div>
                <span className="text-[10px] opacity-70">Modal</span>
              </Command.Item>

              <Command.Item
                value="github sync authenticate push diff"
                onSelect={() => {
                  closePalette();
                  setIsSyncOpen(true);
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4" />
                  <span className="font-bold">Authenticate &amp; Push to GitHub</span>
                </div>
                <span className="text-[10px] opacity-70">Sync</span>
              </Command.Item>
            </Command.Group>

            {/* Export Actions */}
            <Command.Group heading="Export Actions" className={groupClassName}>
              <Command.Item value="copy readme markdown clipboard" onSelect={handleCopyMarkdown} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Copy className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Copy README Markdown</span>
                </div>
                <span className="text-[10px] opacity-70">Clipboard</span>
              </Command.Item>

              <Command.Item value="download readme.md file export" onSelect={handleDownloadMarkdown} className={itemClassName}>
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-sky-600" />
                  <span className="font-bold">Download README.md File</span>
                </div>
                <span className="text-[10px] opacity-70">Export</span>
              </Command.Item>
            </Command.Group>

            {/* Visualizations */}
            <Command.Group heading={`Visualizations (${allVisualizations.length})`} className={groupClassName}>
              {visibleVisualizations.map((viz) => (
                <Command.Item
                  key={viz.id}
                  value={`viz ${viz.id} ${viz.name} ${viz.tagline} ${viz.category}`}
                  onSelect={() => navigateTo(`/visualizer?viz=${encodeURIComponent(viz.id)}`)}
                  className={itemClassName}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Activity className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold truncate">{viz.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-300 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0">
                    {viz.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Templates */}
            <Command.Group heading={`Templates (${TEMPLATES.length})`} className={groupClassName}>
              {visibleTemplates.map((tpl) => (
                <Command.Item
                  key={tpl.id}
                  value={`template ${tpl.id} ${tpl.name} ${tpl.category} ${tpl.tags?.join(' ') || ''}`}
                  onSelect={() => handleSelectTemplate(tpl.id)}
                  className={itemClassName}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <LayoutTemplate className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="font-bold truncate">{tpl.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-300 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0">
                    {tpl.category}
                  </span>
                </Command.Item>
              ))}
              {!isSearching && (
                <Command.Item
                  value="view all templates archetypes gallery"
                  onSelect={() => navigateTo('/templates')}
                  className={itemClassName}
                >
                  <div className="flex items-center gap-2 font-bold">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Browse all {TEMPLATES.length} Templates &amp; Archetypes</span>
                  </div>
                </Command.Item>
              )}
            </Command.Group>

            {/* Telemetry Modules */}
            <Command.Group heading={`Telemetry Modules (${TELEMETRY_PLUGINS_CATALOG.length})`} className={groupClassName}>
              {visibleTelemetry.map((mod) => (
                <Command.Item
                  key={mod.id}
                  value={`telemetry ${mod.id} ${mod.name} ${mod.category}`}
                  onSelect={() => navigateTo('/telemetry')}
                  className={itemClassName}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold truncate">{mod.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-300 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0">
                    {mod.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Documentation */}
            <Command.Group heading={`Documentation (${allDocs.length})`} className={groupClassName}>
              {visibleDocs.map((doc) => (
                <Command.Item
                  key={doc.slug}
                  value={`doc ${doc.slug} ${doc.title} ${doc.category} ${doc.description}`}
                  onSelect={() => navigateTo(`/docs/${doc.slug}`)}
                  className={itemClassName}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold truncate">{doc.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-300 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0">
                    {doc.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Theme */}
            <Command.Group heading="Theme" className={groupClassName}>
              <Command.Item
                value="theme light mode bright"
                onSelect={() => {
                  setTheme('light');
                  closePalette();
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="font-bold">Set Light Theme</span>
                </div>
              </Command.Item>
              <Command.Item
                value="theme dark mode slate"
                onSelect={() => {
                  setTheme('dark');
                  closePalette();
                }}
                className={itemClassName}
              >
                <div className="flex items-center gap-2.5">
                  <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span className="font-bold">Set Dark Theme</span>
                </div>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-slate-900 border-t-2 border-slate-800 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span>Use ↑↓ to navigate &bull; Enter to select</span>
            <span>ESC to close</span>
          </div>
        </div>
      </Command.Dialog>

      {/* Connected Modals rendered lazily on-demand */}
      {isSyncOpen && <GitHubSyncModal isOpen={isSyncOpen} onClose={() => setIsSyncOpen(false)} />}
      {isImportOpen && <ReadmeImporterModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />}
      {isHealthOpen && <ReadmeHealthScoreModal isOpen={isHealthOpen} onClose={() => setIsHealthOpen(false)} />}
      {isHistoryOpen && <VersionHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />}
      {isVaultOpen && <AssetVaultModal isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />}
      {isDiagnosticsOpen && <DiagnosticsHUDModal isOpen={isDiagnosticsOpen} onClose={() => setIsDiagnosticsOpen(false)} />}
      {isIntelligenceOpen && <ProfileIntelligenceModal isOpen={isIntelligenceOpen} onClose={() => setIsIntelligenceOpen(false)} />}
      {isMarketplaceOpen && <AssetMarketplaceModal isOpen={isMarketplaceOpen} onClose={() => setIsMarketplaceOpen(false)} />}
      {isWorkspaceOpen && <WorkspaceManagerModal isOpen={isWorkspaceOpen} onClose={() => setIsWorkspaceOpen(false)} />}
      {isAiOpen && <AiAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />}
      {isResumeOpen && <ResumeUpload isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}
    </>
  );
};

export default CommandPalette;
