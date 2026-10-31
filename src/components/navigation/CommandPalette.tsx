'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Film,
  Github,
  LayoutTemplate,
  History,
  TrendingUp,
  Package,
  Code2,
} from 'lucide-react';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { TEMPLATES } from '#/lib/templates/catalog';
import { TELEMETRY_PLUGINS_CATALOG } from '#/lib/forge-telemetry/catalog';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { ReadmeImporterModal } from '#/components/importer/ReadmeImporterModal';
import { ReadmeHealthScoreModal } from '#/components/studio/ReadmeHealthScoreModal';
import { VersionHistoryModal } from '#/components/studio/VersionHistoryModal';
import { AssetVaultModal } from '#/components/studio/AssetVaultModal';
import { AiAssistantModal } from '#/components/ai/AiAssistantModal';
import { DiagnosticsHUDModal } from '#/components/diagnostics/DiagnosticsHUDModal';

interface CommandPaletteProps {
  onOpenImport?: () => void;
  triggerClassName?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  onOpenImport,
  triggerClassName = '',
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const config = useReadmeStore(state => state.config);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  // Modals state
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);

  // Listen to Cmd+K / Ctrl+K and global trigger events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('monoforge-open-command-palette', handleCustomOpen);
    const handleOpenAi = () => setIsAiOpen(true);
    const handleOpenDiag = () => setIsDiagnosticsOpen(true);
    window.addEventListener('monoforge-open-ai', handleOpenAi);
    window.addEventListener('monoforge-open-diagnostics', handleOpenDiag);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('monoforge-open-command-palette', handleCustomOpen);
      window.removeEventListener('monoforge-open-ai', handleOpenAi);
      window.removeEventListener('monoforge-open-diagnostics', handleOpenDiag);
    };
  }, []);

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
    setOpen(false);
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
      URL.revokeObjectURL(url);
      toast.success('Downloaded README.md');
    } catch {
      toast.error('Failed to download');
    }
    setOpen(false);
  };

  const handleSelectTemplate = (templateId: string) => {
    const found = TEMPLATES.find(t => t.id === templateId);
    if (found) {
      setEntireConfig(found.config);
      toast.success(`Applied template "${found.name}"`);
      router.push('/developer?mode=visual');
    }
    setOpen(false);
  };

  return (
    <>
      {/* Quick trigger hint pill */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b] btn-tactile transition-all cursor-pointer ${triggerClassName}`}
        title="Open Command Palette (Cmd+K / Ctrl+K)"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span className="text-[11px]">COMMANDS</span>
        <kbd className="px-1 py-0.2 rounded bg-neutral-950 text-[10px] font-mono text-white border border-neutral-900 ml-0.5">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      >
        <div className="w-full max-w-xl bg-white border-2 border-neutral-900 rounded-2xl overflow-hidden shadow-[8px_8px_0px_#18181b] flex flex-col max-h-[80vh]">
          {/* Header Input */}
          <div className="flex items-center px-4 py-3 bg-[#ffe600] border-b-2 border-neutral-900 gap-2">
            <Sparkles className="w-4 h-4 text-neutral-950 shrink-0" />
            <Command.Input
              placeholder="Search actions, studio modes, templates, or telemetry..."
              className="w-full bg-transparent text-xs font-mono font-bold text-neutral-950 placeholder:text-neutral-700 focus:outline-none"
            />
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-white shrink-0">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-96 overflow-y-auto p-2 text-xs font-mono space-y-1 bg-[#fafafa]">
            <Command.Empty className="py-8 text-center text-neutral-500 text-xs font-mono">
              No matching actions or templates found.
            </Command.Empty>

            {/* Studio Modes */}
            <Command.Group heading="Studio Modes" className="text-neutral-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
              <Command.Item
                onSelect={() => {
                  router.push('/developer?mode=visual');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-bold">Visual Studio (Canvas &amp; Drag-and-Drop)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  router.push('/developer?mode=editor');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Code2 className="w-4 h-4 text-cyan-600" />
                <span className="font-bold">Developer IDE (Monaco Editor &amp; Split Preview)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  router.push('/developer?mode=telemetry');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">47+ Telemetry Studio (Isometric 3D &amp; Donut)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  router.push('/developer?mode=animator');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Film className="w-4 h-4 text-purple-600" />
                <span className="font-bold">SVG Animation Studio (Cyber Bot &amp; Motion)</span>
              </Command.Item>
            </Command.Group>

            {/* Platform Modals & Tools */}
            <Command.Group heading="Tools &amp; Modals" className="text-neutral-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  setIsAiOpen(true);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-bold">AI Profile Architect (Model-Agnostic Generation)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  setIsDiagnosticsOpen(true);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">Diagnostics HUD &amp; Camo Guard (1-Click Auto-Fix)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  setIsHealthOpen(true);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">README Health Score &amp; Camo CDN Audit</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  if (onOpenImport) onOpenImport();
                  else setIsImportOpen(true);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <FileUp className="w-4 h-4 text-blue-600" />
                <span className="font-bold">Import Existing README (Fetch or Paste)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  setIsHistoryOpen(true);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <History className="w-4 h-4 text-amber-600" />
                <span className="font-bold">Version History &amp; Snapshots</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  setIsVaultOpen(true);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Package className="w-4 h-4 text-indigo-600" />
                <span className="font-bold">Curated Asset Vault (Dividers &amp; Badges)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  setIsSyncOpen(true);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Github className="w-4 h-4 text-neutral-950" />
                <span className="font-bold">Authenticate &amp; Push to GitHub</span>
              </Command.Item>
            </Command.Group>

            {/* Export Actions */}
            <Command.Group heading="Export Actions" className="text-neutral-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
              <Command.Item
                onSelect={handleCopyMarkdown}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Copy className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">Copy README Markdown</span>
              </Command.Item>

              <Command.Item
                onSelect={handleDownloadMarkdown}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span className="font-bold">Download README.md File</span>
              </Command.Item>
            </Command.Group>

            {/* Top Archetype Templates */}
            <Command.Group heading="Popular Templates" className="text-neutral-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
              {TEMPLATES.slice(0, 8).map(tpl => (
                <Command.Item
                  key={tpl.id}
                  onSelect={() => handleSelectTemplate(tpl.id)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-bold">{tpl.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 px-1.5 py-0.5 rounded bg-white border border-neutral-300">
                    {tpl.category}
                  </span>
                </Command.Item>
              ))}
              <Command.Item
                onSelect={() => {
                  router.push('/templates');
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors font-bold"
              >
                <span>&rarr; View all 85+ Archetypes &amp; Templates</span>
              </Command.Item>
            </Command.Group>

            {/* Telemetry Modules */}
            <Command.Group heading="Telemetry Modules" className="text-neutral-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
              {TELEMETRY_PLUGINS_CATALOG.slice(0, 6).map(mod => (
                <Command.Item
                  key={mod.id}
                  onSelect={() => {
                    router.push(`/developer?mode=telemetry&plugin=${mod.id}`);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold">{mod.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 px-1.5 py-0.5 rounded bg-white border border-neutral-300">
                    {mod.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Navigation & Documentation */}
            <Command.Group heading="Navigation" className="text-neutral-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
              <Command.Item
                onSelect={() => {
                  router.push('/');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Globe className="w-4 h-4 text-cyan-600" />
                <span className="font-bold">Home Page</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  router.push('/templates');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <LayoutTemplate className="w-4 h-4 text-amber-500" />
                <span className="font-bold">85+ Templates Marketplace</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  router.push('/info');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">Documentation &amp; Archetypes Guide</span>
              </Command.Item>
            </Command.Group>

            {/* Theme */}
            <Command.Group heading="Theme" className="text-neutral-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
              <Command.Item
                onSelect={() => {
                  setTheme('light');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="font-bold">Set Light Theme</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme('dark');
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-950 hover:bg-[#ffe600] hover:text-neutral-950 cursor-pointer transition-colors"
              >
                <Moon className="w-4 h-4 text-neutral-700" />
                <span className="font-bold">Set Dark Theme</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t-2 border-neutral-900 text-[11px] font-mono text-neutral-600">
            <span>Use ↑↓ to navigate &bull; Enter to select</span>
            <span>ESC to close</span>
          </div>
        </div>
      </Command.Dialog>

      {/* Connected Modals rendered on-demand */}
      <GitHubSyncModal isOpen={isSyncOpen} onClose={() => setIsSyncOpen(false)} />
      <ReadmeImporterModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
      <ReadmeHealthScoreModal isOpen={isHealthOpen} onClose={() => setIsHealthOpen(false)} />
      <VersionHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <AssetVaultModal isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
      <AiAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <DiagnosticsHUDModal isOpen={isDiagnosticsOpen} onClose={() => setIsDiagnosticsOpen(false)} />
    </>
  );
};

export default CommandPalette;
