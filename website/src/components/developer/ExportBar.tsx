'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Check,
  Download,
  Share2,
  Undo2,
  Redo2,
  RotateCcw,
  Sparkles,
  Github,
  Bot,
  Zap,
  Star,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';
import { OptimizeModal } from './OptimizeModal';

interface ExportBarProps {
  onOpenSync?: () => void;
  className?: string;
}

function encodeBase64Utf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin);
}

const REPO_URL = 'https://github.com/yuvraj-thakur-exe/MONOFORGE';

export const ExportBar: React.FC<ExportBarProps> = ({ onOpenSync, className = '' }) => {
  const config = useReadmeStore(state => state.config);
  const updateSettings = useReadmeStore(state => state.updateSettings);
  const undo = useReadmeStore(state => state.undo);
  const redo = useReadmeStore(state => state.redo);
  const resetConfig = useReadmeStore(state => state.resetConfig);
  const history = useReadmeStore(state => state.history);
  const future = useReadmeStore(state => state.future);

  const [copied, setCopied] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [copiedAiPrompt, setCopiedAiPrompt] = useState<boolean>(false);
  const [isOptimizeOpen, setIsOptimizeOpen] = useState<boolean>(false);
  const [showStarPrompt, setShowStarPrompt] = useState<boolean>(false);

  const includeAttribution =
    (config.settings as { includeAttribution?: boolean })?.includeAttribution !== false;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#06b6d4', '#10b981', '#fbbf24'],
      });
    } catch {
      // Ignored if canvas not available
    }
  };

  const notifyStarMandate = (actionLabel: string) => {
    setShowStarPrompt(true);
    toast.success(`${actionLabel} — Ready for GitHub!`, {
      description: 'If MonoForge elevated your GitHub profile, give us a star on GitHub.',
      action: {
        label: 'Star Repo',
        onClick: () => {
          window.open(REPO_URL, '_blank', 'noopener,noreferrer');
        },
      },
    });
  };

  const handleToggleAttribution = () => {
    updateSettings({
      includeAttribution: !includeAttribution,
    } as Partial<typeof config.settings>);
  };

  const handleCopyMarkdown = async () => {
    try {
      const markdown = buildMarkdown(config);
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      triggerCelebration();
      notifyStarMandate('README copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMarkdown = () => {
    try {
      const markdown = buildMarkdown(config);
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      notifyStarMandate('Downloaded README.md');
    } catch {
      // Fallback
    }
  };

  const handleShareUrl = async () => {
    try {
      const json = JSON.stringify(config);
      const base64 = encodeBase64Utf8(json);
      const shareUrl = new URL(window.location.href);
      shareUrl.searchParams.set('config', base64);
      await navigator.clipboard.writeText(shareUrl.toString());
      setCopiedUrl(true);
      toast.success('Copied shareable /developer link!');
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyAiPrompt = async () => {
    try {
      const json = JSON.stringify(config, null, 2);
      const prompt = `I am using MonoForge to craft my GitHub profile README. Below is my current configuration JSON conforming to the official schema. Please help me review, optimize, and suggest additional visual telemetry sections for it. Output only valid MonoForge config JSON:\n\n${json}`;
      await navigator.clipboard.writeText(prompt);
      setCopiedAiPrompt(true);
      setTimeout(() => setCopiedAiPrompt(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#f8fafc] dark:bg-[#1e293b] border-t-2 border-slate-300 dark:border-slate-700 text-xs shadow-sm ${className}`}
    >
      {/* History and Reset Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => undo()}
          disabled={history.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-[2px_2px_0px_#334155] btn-tactile font-mono text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">UNDO</span>
        </button>

        <button
          type="button"
          onClick={() => redo()}
          disabled={future.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-[2px_2px_0px_#334155] btn-tactile font-mono text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">REDO</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (confirm('Reset entire configuration to default? All changes will be cleared.')) {
              resetConfig();
            }
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-2 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:text-rose-600 shadow-[2px_2px_0px_#334155] btn-tactile transition-colors font-mono text-xs font-bold ml-1 cursor-pointer"
          title="Reset configuration to empty profile"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">RESET</span>
        </button>

        {/* Attribution Badge Toggle */}
        <button
          type="button"
          onClick={handleToggleAttribution}
          aria-pressed={includeAttribution}
          className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 font-mono text-[11px] font-bold transition-colors ml-1 cursor-pointer ${
            includeAttribution
              ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-800 dark:text-emerald-300'
              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
          }`}
          title="Toggle Powered by MonoForge attribution badge in exported README"
        >
          <Award className="w-3.5 h-3.5" />
          <span>ATTRIBUTION: {includeAttribution ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Center status or Star Prompt */}
      {showStarPrompt ? (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-500/40 font-mono text-[11px] font-bold text-amber-900 dark:text-amber-200">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Enjoying MonoForge?</span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-700 dark:hover:text-white font-black"
          >
            Star on GitHub
          </a>
          <button
            type="button"
            onClick={() => setShowStarPrompt(false)}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white ml-1 cursor-pointer"
            aria-label="Dismiss star prompt"
          >
            &times;
          </button>
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-2 text-slate-600 dark:text-slate-400 font-mono text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>MONOFORGE AST LINT ENGINE ACTIVE</span>
        </div>
      )}

      {/* Export & Push Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyAiPrompt}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-[2px_2px_0px_#334155] btn-tactile font-mono text-xs font-bold transition-all cursor-pointer"
          title="Copy config wrapped in AI assistant prompt"
        >
          {copiedAiPrompt ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Bot className="w-3.5 h-3.5 text-amber-500" />
          )}
          <span>{copiedAiPrompt ? 'PROMPT COPIED' : 'AI PROMPT'}</span>
        </button>

        <button
          type="button"
          onClick={handleShareUrl}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-[2px_2px_0px_#334155] btn-tactile font-mono text-xs font-bold transition-all cursor-pointer"
          title="Copy shareable URL containing base64 configuration"
        >
          {copiedUrl ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Share2 className="w-3.5 h-3.5 text-sky-500" />
          )}
          <span>{copiedUrl ? 'LINK COPIED' : 'SHARE'}</span>
        </button>

        {onOpenSync && (
          <button
            type="button"
            onClick={onOpenSync}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-mono text-xs font-black border-2 border-slate-700 shadow-[2px_2px_0px_#334155] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none btn-tactile hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
            title="Push directly to GitHub repository"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">PUSH GITHUB</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleDownloadMarkdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-mono text-xs font-bold shadow-[2px_2px_0px_#334155] transition-all btn-tactile cursor-pointer"
          title="Download README.md file"
        >
          <Download className="w-3.5 h-3.5" />
          <span>README.MD</span>
        </button>

        <button
          type="button"
          onClick={() => setIsOptimizeOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-mono text-xs font-black border-2 border-slate-700 shadow-[2px_2px_0px_#334155] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all btn-tactile cursor-pointer"
          title="Optimize Markdown output for GitHub Camo CDN caching and size reduction"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>OPTIMIZE</span>
        </button>

        <button
          type="button"
          onClick={handleCopyMarkdown}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-mono text-xs font-black border-2 border-slate-700 shadow-[3px_3px_0px_#334155] hover:shadow-[1px_1px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all btn-tactile cursor-pointer"
          title="Copy markdown with celebratory confetti"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-slate-900" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          )}
          <span>{copied ? 'COPIED!' : 'COPY README'}</span>
        </button>
      </div>

      <OptimizeModal isOpen={isOptimizeOpen} onClose={() => setIsOptimizeOpen(false)} />
    </div>
  );
};

export default ExportBar;
