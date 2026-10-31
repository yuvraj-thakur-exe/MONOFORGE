'use client';

import { useState, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Key,
  X,
  Check,
  Copy,
  ShieldCheck,
  AlertCircle,
  Cpu,
  Wand2,
  FileText,
  Code2,
  BarChart3,
  LayoutTemplate,
  Layers,
  Palette,
} from 'lucide-react';
import { AI_MODELS, AiActionType, AiResponseResult } from '#/lib/ai/types';
import { requestAiAssistant } from '#/lib/ai/ai-service';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';

export interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiAssistantModal({ isOpen, onClose }: AiAssistantModalProps) {
  const [action, setAction] = useState<AiActionType>('generate-readme');
  const [model, setModel] = useState<string>('google/gemini-2.0-flash-exp:free');
  const [apiKey, setApiKey] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AiResponseResult | null>(null);
  const [showConfirmGate, setShowConfirmGate] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Store actions
  const config = useReadmeStore((s) => s.config);
  const updateSettings = useReadmeStore((s) => s.updateSettings);
  const currentBio = config.settings.user.bio || '';
  const rawMarkdown = buildMarkdown(config);

  // Load API key from local storage
  useEffect(() => {
    const saved = localStorage.getItem('@monoforge_ai_key');
    if (saved) setApiKey(saved);
  }, []);

  if (!isOpen) return null;

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (key.trim()) {
      localStorage.setItem('@monoforge_ai_key', key.trim());
    } else {
      localStorage.removeItem('@monoforge_ai_key');
    }
  };

  const handleRunAi = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setApplied(false);
    setShowConfirmGate(false);

    try {
      const response = await requestAiAssistant({
        action,
        prompt,
        model,
        apiKey: apiKey.trim() || undefined,
        context: {
          currentBio,
          rawMarkdown,
        },
      });

      if (response.success && response.result) {
        setResult(response.result);
      }
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  };

  const applyToStoreWithConfirmation = () => {
    if (!result) return;

    if (result.bio) {
      updateSettings((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          bio: result.bio || prev.user.bio,
          role: result.headline || prev.user.role,
        },
      }));
    }

    setApplied(true);
    setShowConfirmGate(false);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0E1117] border-2 border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Modal Header */}
        <div className="p-4 bg-[#141A23] border-b-2 border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFE600] text-black font-black flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_#000]">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AI Profile Architect</h3>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                  OpenRouter &amp; Local Synthesis
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Generate, polish, and optimize your developer identity with model-agnostic intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Action Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'generate-readme', label: 'Full Profile', icon: Wand2 },
              { id: 'improve-readme', label: 'Improve Profile', icon: Sparkles },
              { id: 'generate-bio', label: 'Bio Generator', icon: FileText },
              { id: 'describe-project', label: 'Project Cards', icon: Code2 },
              { id: 'suggest-sections', label: 'Suggest Sections', icon: Layers },
              { id: 'generate-template', label: 'Custom Template', icon: LayoutTemplate },
              { id: 'explain-telemetry', label: 'Explain Telemetry', icon: BarChart3 },
              { id: 'recommend-design', label: 'Design Advisor', icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = action === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setAction(tab.id as AiActionType);
                    setResult(null);
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#FFE600] text-neutral-950 border-[#FFE600] shadow-[2px_2px_0px_0px_#000]'
                      : 'bg-[#141A23] text-neutral-300 border-[#1E293B] hover:border-neutral-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Model & API Key Settings Drawer */}
          <div className="bg-[#141A23] p-4 rounded-xl border border-[#1E293B] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  AI Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#0E1117] text-white text-xs border border-[#2D3748] rounded-lg px-3 py-2 outline-none focus:border-[#FFE600]"
                >
                  {AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Key className="w-3 h-3 text-[#FFE600]" /> OpenRouter API Key (Optional)
                  </span>
                  <span className="text-[10px] text-neutral-500">Stored locally only</span>
                </label>
                <input
                  type="password"
                  placeholder="sk-or-v1-... (leave blank to use free synthesis)"
                  value={apiKey}
                  onChange={(e) => handleSaveApiKey(e.target.value)}
                  className="w-full bg-[#0E1117] text-white text-xs border border-[#2D3748] rounded-lg px-3 py-2 outline-none focus:border-[#FFE600]"
                />
              </div>
            </div>
          </div>

          {/* Input Prompt Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                {action === 'generate-readme'
                  ? 'Tell us about yourself (Role, Stack, Experience, Goals)'
                  : action === 'generate-bio'
                  ? 'Your focus, seniority level, and preferred tone'
                  : action === 'describe-project'
                  ? 'Project repository name or quick notes'
                  : 'Profile instructions or focus area'}
              </label>
              <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                <button
                  type="button"
                  onClick={() =>
                    setPrompt(
                      'Senior Full-Stack Engineer with 6+ years building microservices and web platforms. Specializing in TypeScript, Next.js, Go, and PostgreSQL. Loves developer productivity tooling and mentoring.'
                    )
                  }
                  className="text-[#00F0FF] hover:underline"
                >
                  Insert Sample Brief
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Distributed systems engineer building resilient cloud pipelines. 5 years experience with Rust, TypeScript, and Kubernetes..."
              className="w-full bg-[#141A23] text-white text-xs border border-[#1E293B] rounded-xl p-3 outline-none focus:border-[#FFE600] font-sans resize-none"
            />

            <div className="flex justify-end">
              <button
                onClick={handleRunAi}
                disabled={loading || !prompt.trim()}
                className="px-5 py-2.5 bg-[#FFE600] hover:bg-[#FFD000] disabled:opacity-50 text-neutral-950 text-xs font-black rounded-xl flex items-center gap-2 shadow-[2px_2px_0px_0px_#000] active:scale-95 transition-transform"
              >
                {loading ? <Cpu className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                {loading ? 'Synthesizing Profile...' : 'Run AI Synthesis'}
              </button>
            </div>
          </div>

          {/* Result Output & Confirmation Gate */}
          {result && (
            <div className="bg-[#141A23] border border-[#1E293B] rounded-xl p-4 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                <span className="text-xs font-bold text-[#00F0FF] flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> AI Generated Result
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const text = result.markdown || result.bio || '';
                      navigator.clipboard.writeText(text);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#334155] text-xs font-semibold text-neutral-200 rounded flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>

                  <button
                    onClick={() => setShowConfirmGate(true)}
                    className="px-3 py-1 bg-[#FFE600] hover:bg-[#FFD000] text-neutral-950 text-xs font-black rounded flex items-center gap-1 shadow-[2px_2px_0px_0px_#000]"
                  >
                    Apply to Profile &rarr;
                  </button>
                </div>
              </div>

              {/* Suggestions / Insights */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.suggestions.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20"
                    >
                      &bull; {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Markdown Preview */}
              {result.markdown && (
                <div className="max-h-[240px] overflow-y-auto bg-[#0E1117] p-3 rounded-lg border border-[#1E293B] font-mono text-xs text-neutral-300 whitespace-pre-wrap">
                  {result.markdown}
                </div>
              )}

              {/* Bio Preview */}
              {result.bio && !result.markdown && (
                <div className="p-3 bg-[#0E1117] rounded-lg border border-[#1E293B] text-xs text-neutral-200 leading-relaxed">
                  <p className="font-semibold text-white mb-1">Headline: {result.headline}</p>
                  <p>{result.bio}</p>
                </div>
              )}

              {/* Summary / Analysis Preview */}
              {result.summary && (
                <div className="p-3 bg-[#0E1117] rounded-lg border border-[#1E293B] text-xs text-neutral-200 leading-relaxed">
                  <p className="font-semibold text-white mb-1">Architecture &amp; Intelligence Summary</p>
                  <p className="text-neutral-300">{result.summary}</p>
                </div>
              )}

              {/* Confirmation Gate Modal Overlay */}
              {showConfirmGate && (
                <div className="p-4 bg-amber-500/10 border-2 border-amber-500/40 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Confirmation Gate: Review changes before writing to profile
                  </div>
                  <p className="text-xs text-neutral-300">
                    Applying this result will update your active README markdown and bio configuration.
                    Are you sure you want to proceed?
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowConfirmGate(false)}
                      className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] text-xs font-bold text-neutral-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyToStoreWithConfirmation}
                      className="px-4 py-1.5 bg-[#FFE600] hover:bg-[#FFD000] text-neutral-950 text-xs font-black rounded-lg shadow-[2px_2px_0px_0px_#000]"
                    >
                      Confirm &amp; Apply
                    </button>
                  </div>
                </div>
              )}

              {applied && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Successfully applied to profile store! Closing assistant...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
