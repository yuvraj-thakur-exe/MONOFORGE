'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '#/i18n/navigation';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfigSchema } from '#/lib/plugins/types';
import { PluginPanel } from './PluginPanel';
import { Editor } from './Editor';
import { LivePreview } from './LivePreview';
import { ExportBar } from './ExportBar';
import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import {
  Blocks,
  Code2,
  Eye,
  LayoutTemplate,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { toast } from 'sonner';

const GITHUB_HANDLE_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

function decodeBase64Utf8(rawBase64: string): string {
  const clean = rawBase64.trim().replace(/ /g, '+').replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(clean);
  const bytes = Uint8Array.from(bin, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function DeveloperWorkspace() {
  const setEntireConfig = useReadmeStore((state) => state.setEntireConfig);
  const setGithub = useReadmeStore((state) => state.setGithub);

  const [showPlugins, setShowPlugins] = useState(true);
  const [mobilePane, setMobilePane] = useState<'plugins' | 'editor' | 'preview'>('editor');
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const hasHydratedUrlRef = useRef(false);

  // Hydrate ?config=<base64> and ?user=<handle> on mount
  useEffect(() => {
    if (hasHydratedUrlRef.current || typeof window === 'undefined') return;
    hasHydratedUrlRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const configParam = params.get('config');
    const userParam = params.get('user')?.trim();

    if (configParam) {
      try {
        const jsonString = decodeBase64Utf8(configParam);
        const parsed = JSON.parse(jsonString);
        const validated = ReadmeConfigSchema.safeParse(parsed);
        if (validated.success) {
          setEntireConfig(validated.data);
          toast.success('Loaded shared MonoForge configuration from URL');
        } else {
          toast.error('Shared configuration URL failed schema validation');
        }
      } catch {
        toast.error('Could not decode shared ?config= parameter');
      }
    }

    if (userParam && GITHUB_HANDLE_REGEX.test(userParam)) {
      setGithub(userParam);
      if (!configParam) {
        toast.success(`Loaded @${userParam} into Developer IDE`);
      }
    }
  }, [setEntireConfig, setGithub]);

  return (
    <div className="h-screen flex flex-col bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      {/* Top IDE Header */}
      <header className="h-14 shrink-0 px-3 sm:px-5 border-b-2 border-slate-300 dark:border-slate-700 bg-[#f8fafc] dark:bg-[#1e293b] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg border-2 border-slate-700 bg-[#ffe600] flex items-center justify-center p-1 shadow-[2px_2px_0px_#334155] group-hover:scale-105 transition-transform">
              <MonoForgeMonkeyIcon className="w-full h-full text-slate-900" />
            </div>
            <span className="text-base font-black tracking-tight font-mono text-slate-900 dark:text-white">
              MonoForge
            </span>
          </Link>

          <span className="text-slate-400 dark:text-slate-500 font-mono text-xs">/</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold">
            /developer
          </span>
        </div>

        {/* Center / Mobile Pane Switcher */}
        <div className="flex lg:hidden items-center bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMobilePane('plugins')}
            className={`px-2 py-1 rounded-md font-bold cursor-pointer ${
              mobilePane === 'plugins'
                ? 'bg-[#ffe600] text-slate-900'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Plugins
          </button>
          <button
            type="button"
            onClick={() => setMobilePane('editor')}
            className={`px-2 py-1 rounded-md font-bold cursor-pointer ${
              mobilePane === 'editor'
                ? 'bg-[#ffe600] text-slate-900'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            JSON
          </button>
          <button
            type="button"
            onClick={() => setMobilePane('preview')}
            className={`px-2 py-1 rounded-md font-bold cursor-pointer ${
              mobilePane === 'preview'
                ? 'bg-[#ffe600] text-slate-900'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowPlugins((prev) => !prev)}
            aria-pressed={showPlugins}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fafbfc] dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-mono text-xs font-bold shadow-[2px_2px_0px_#334155] transition-colors cursor-pointer"
          >
            {showPlugins ? (
              <PanelLeftClose className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <PanelLeftOpen className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span>Plugins &amp; Presets</span>
          </button>

          <Link
            href="/templates"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fafbfc] dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold transition-colors"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-emerald-500" />
            <span>Templates</span>
          </Link>

          <Link
            href="/visualizer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fafbfc] dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Visualizer</span>
          </Link>
        </div>
      </header>

      {/* Main 3-Pane IDE Workspace */}
      <main className="flex-1 min-h-0 p-2 sm:p-3 flex gap-3 overflow-hidden">
        {/* Left Drawer: Plugins, Blocks, Templates & Schema */}
        {showPlugins && (
          <aside
            aria-label="Plugins and Presets Drawer"
            className={`${
              mobilePane === 'plugins' ? 'flex w-full' : 'hidden'
            } lg:flex lg:w-[330px] xl:w-[360px] shrink-0 h-full min-h-0 flex-col`}
          >
            <PluginPanel
              className="h-full"
              onPluginInserted={() => {
                if (mobilePane === 'plugins') {
                  setMobilePane('preview');
                }
              }}
            />
          </aside>
        )}

        {/* Center Pane: Monaco JSON Editor */}
        <section
          aria-label="JSON Configuration Editor"
          className={`${
            mobilePane === 'editor' ? 'flex' : 'hidden'
          } lg:flex flex-1 min-w-0 h-full min-h-0 flex-col`}
        >
          <div className="sr-only">
            <Blocks className="w-4 h-4" />
            <Code2 className="w-4 h-4" />
            <Eye className="w-4 h-4" />
          </div>
          <Editor className="h-full" />
        </section>

        {/* Right Pane: Live GitHub Markdown Preview */}
        <section
          aria-label="Live README Preview"
          className={`${
            mobilePane === 'preview' ? 'flex' : 'hidden'
          } lg:flex flex-1 min-w-0 h-full min-h-0 flex-col`}
        >
          <LivePreview className="h-full" />
        </section>
      </main>

      {/* Bottom Export & Action Bar (includes OptimizeModal) */}
      <ExportBar
        onOpenSync={() => setIsSyncOpen(true)}
        className="shrink-0"
      />

      {/* GitHub Direct Push & Diff Gate */}
      <GitHubSyncModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
      />
    </div>
  );
}
