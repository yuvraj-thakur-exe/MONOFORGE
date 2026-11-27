'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '#/i18n/navigation';
import { TopNav } from '#/components/navigation/TopNav';
import { WizardContainer } from '#/components/wizard';
import { WizardSkeleton } from '#/components/wizard/WizardSkeleton';
import { LivePreviewPane } from '#/components/wizard/LivePreviewPane';
import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { useReadmeStore } from '#/store/useReadmeStore';
import { pluginRegistry } from '#/lib/plugins/registry';
import {
  LayoutDashboard,
  ListOrdered,
  Sparkles,
  Plus,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  CopyPlus,
  Trash2,
  Github,
  Terminal,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';

function ZustandCanvasStudio() {
  const router = useRouter();
  const {
    config,
    setGithub,
    updateSettings,
    addSection,
    removeSection,
    moveSection,
    toggleSectionVisibility,
    duplicateSection,
  } = useReadmeStore();
  const [isSyncOpen, setIsSyncOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-120px)] p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Left: Quick Identity + Plugin Palette (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Profile Identity (Zustand)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold">
              Single Store
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              value={config.settings.user.github || ''}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="GitHub username"
              className="px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={config.settings.user.name || ''}
              onChange={(e) =>
                updateSettings({
                  user: { ...config.settings.user, name: e.target.value },
                })
              }
              placeholder="Display name"
              className="px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Add Modules ({pluginRegistry.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
            {pluginRegistry.map((plugin) => (
              <button
                key={plugin.id}
                type="button"
                onClick={() => {
                  const defaultContent = plugin.defaultConfig
                    ? JSON.parse(JSON.stringify(plugin.defaultConfig))
                    : {};
                  addSection(plugin.id, { content: defaultContent });
                  toast.success(`Added ${plugin.name}`);
                }}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-amber-400 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {plugin.name}
                  </span>
                  <Plus className="w-3.5 h-3.5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                  {plugin.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: Active Canvas Sections Stack (3 cols) */}
      <div className="lg:col-span-3 space-y-4">
        <div className="p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              Active Canvas ({config.sections.length})
            </h3>
          </div>

          {config.sections.length === 0 ? (
            <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center text-xs font-mono text-slate-500">
              Select a module on the left to build your visual canvas.
            </div>
          ) : (
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {config.sections.map((section, idx) => {
                const plugin = pluginRegistry.find((p) => p.id === section.type);
                const isHidden = section.visible === false;
                return (
                  <div
                    key={section.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                      isHidden
                        ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-60'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {plugin?.name || section.type}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        #{idx + 1} &bull; {section.type}
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveSection(section.id, 'up')}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === config.sections.length - 1}
                        onClick={() => moveSection(section.id, 'down')}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSectionVisibility(section.id)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        title={isHidden ? 'Show section' : 'Hide section'}
                      >
                        {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-cyan-500" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicateSection(section.id)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        title="Duplicate section"
                      >
                        <CopyPlus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="p-1 rounded hover:bg-rose-500/20 text-rose-500 cursor-pointer"
                        title="Remove section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsSyncOpen(true)}
              className="w-full py-2 rounded-lg bg-[#ffe600] hover:bg-amber-300 text-slate-950 font-mono text-xs font-black border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Sync to GitHub</span>
            </button>
            <button
              type="button"
              onClick={() => router.push('/developer')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#ffe600]" />
              <span>Open in Developer IDE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right: Live Markdown Preview (5 cols) */}
      <div className="lg:col-span-5 h-[calc(100vh-140px)] sticky top-6">
        <LivePreviewPane />
      </div>

      <GitHubSyncModal isOpen={isSyncOpen} onClose={() => setIsSyncOpen(false)} />
    </div>
  );
}

function WizardContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams?.get('mode') === 'canvas' ? 'canvas' : 'guided';
  const [studioMode, setStudioMode] = useState<'canvas' | 'guided'>(initialMode);

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 flex flex-col">
      <TopNav />

      {/* Studio Mode Switcher Bar */}
      <div className="bg-[#f8fafc] dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-300 dark:border-slate-600">
            <button
              type="button"
              onClick={() => setStudioMode('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                studioMode === 'canvas'
                  ? 'bg-[#ffe600] text-slate-900 border border-slate-700 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Visual Canvas Studio</span>
            </button>
            <button
              type="button"
              onClick={() => setStudioMode('guided')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                studioMode === 'guided'
                  ? 'bg-[#ffe600] text-slate-900 border border-slate-700 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Step-by-Step Wizard</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 hidden sm:flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {studioMode === 'canvas'
              ? 'Reorder, toggle, and compose sections directly inside the Zustand store'
              : 'Guided questions with automated archetype generation'}
          </span>
        </div>
      </div>

      <main className="flex-1 overflow-x-hidden">
        {studioMode === 'canvas' ? <ZustandCanvasStudio /> : <WizardContainer />}
      </main>
    </div>
  );
}

export function WizardClient() {
  return (
    <Suspense fallback={<WizardSkeleton />}>
      <WizardContent />
    </Suspense>
  );
}
