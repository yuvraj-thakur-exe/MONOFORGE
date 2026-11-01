'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { importReadmeFromMarkdown, ImportResult } from '#/lib/parser/import-readme';
import {
  X,
  FileUp,
  Github,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface ReadmeImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadmeImporterModal: React.FC<ReadmeImporterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);
  const currentConfig = useReadmeStore(state => state.config);

  const [importMode, setImportMode] = useState<'github' | 'paste'>('github');
  const [githubUser, setGithubUser] = useState('');
  const [pastedMarkdown, setPastedMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Gate confirmation stage
  const [parsedResult, setParsedResult] = useState<ImportResult | null>(null);
  const [keepExistingBio, setKeepExistingBio] = useState(false);

  if (!isOpen) return null;

  const handleFetchGithub = async () => {
    const username = githubUser.trim();
    if (!username) {
      setErrorMsg('Please enter a valid GitHub username');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Try main branch first, then master branch
      let res = await fetch(`https://raw.githubusercontent.com/${username}/${username}/main/README.md`);
      if (!res.ok) {
        res = await fetch(`https://raw.githubusercontent.com/${username}/${username}/master/README.md`);
      }

      if (!res.ok) {
        throw new Error(
          `Could not locate a public README at github.com/${username}/${username}. Make sure the repository exists and is public.`
        );
      }

      const md = await res.text();
      const parsed = importReadmeFromMarkdown(md);
      // Guarantee username is set
      parsed.config.settings.user.github = username;
      setParsedResult(parsed);
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Failed to fetch GitHub README');
    } finally {
      setIsLoading(false);
    }
  };

  const handleParsePasted = () => {
    if (!pastedMarkdown.trim()) {
      setErrorMsg('Please paste your README.md markdown content');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const parsed = importReadmeFromMarkdown(pastedMarkdown);
      setParsedResult(parsed);
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Failed to parse markdown');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmImport = () => {
    if (!parsedResult) return;

    try {
      const finalConfig = { ...parsedResult.config };

      if (keepExistingBio && currentConfig.settings?.user?.name) {
        finalConfig.settings.user = {
          ...finalConfig.settings.user,
          name: currentConfig.settings.user.name || finalConfig.settings.user.name,
          bio: currentConfig.settings.user.bio || finalConfig.settings.user.bio,
          role: currentConfig.settings.user.role || finalConfig.settings.user.role,
        };
      }

      setEntireConfig(finalConfig);
      toast.success('Successfully imported profile into MonoForge Studio!');

      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 }, colors: ['#ffe600', '#10b981'] });
      } catch {
        // Ignored
      }

      onClose();
      // Reset local state
      setParsedResult(null);
      setGithubUser('');
      setPastedMarkdown('');
    } catch {
      toast.error('Failed to apply configuration to store');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border-2 border-neutral-900 rounded-2xl shadow-[8px_8px_0px_#18181b] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight font-mono uppercase">
                README Importer &amp; AST Parser
              </h2>
              <p className="text-xs font-mono font-bold text-neutral-800">
                100% Confirmation Gated &bull; Zero Silent Writes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-900 transition-all hover:scale-105 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#fafafa]">
          {!parsedResult ? (
            <>
              {/* Mode Toggle */}
              <div className="flex bg-white p-1 rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setImportMode('github');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    importMode === 'github'
                      ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>LOAD FROM GITHUB USERNAME</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImportMode('paste');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    importMode === 'paste'
                      ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>PASTE RAW MARKDOWN</span>
                </button>
              </div>

              {/* GitHub Input */}
              {importMode === 'github' && (
                <div className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-3">
                  <label className="block text-xs font-mono font-bold text-neutral-800">
                    GitHub Username or Organization:
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 font-mono text-xs text-neutral-400">
                        github.com/
                      </span>
                      <input
                        type="text"
                        value={githubUser}
                        onChange={e => setGithubUser(e.target.value)}
                        placeholder="torvalds"
                        className="w-full pl-24 pr-3 py-2 bg-neutral-50 border-2 border-neutral-900 rounded-lg text-xs font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:bg-white"
                        onKeyDown={e => e.key === 'Enter' && handleFetchGithub()}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleFetchGithub}
                      disabled={isLoading}
                      className="px-4 py-2 bg-[#ffe600] text-neutral-950 text-xs font-mono font-black border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#18181b] hover:bg-[#ffdf00] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? 'FETCHING...' : 'FETCH README'}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500">
                    Fetches <code>github.com/:user/:user/main/README.md</code>.
                  </p>
                </div>
              )}

              {/* Paste Input */}
              {importMode === 'paste' && (
                <div className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-3">
                  <label className="block text-xs font-mono font-bold text-neutral-800">
                    Paste raw README.md markdown text:
                  </label>
                  <textarea
                    rows={8}
                    value={pastedMarkdown}
                    onChange={e => setPastedMarkdown(e.target.value)}
                    placeholder="# Hi, I'm Alex 👋&#10;Fullstack Developer & OSS Contributor...&#10;&#10;[![Stats](...)]"
                    className="w-full p-3 bg-neutral-50 border-2 border-neutral-900 rounded-lg text-xs font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:bg-white"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleParsePasted}
                      disabled={isLoading}
                      className="px-4 py-2 bg-[#ffe600] text-neutral-950 text-xs font-mono font-black border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#18181b] hover:bg-[#ffdf00] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? 'PARSING...' : 'PARSE MARKDOWN'}
                    </button>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border-2 border-red-500 text-xs font-mono text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </>
          ) : (
            /* Explicit Confirmation Gate Stage */
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-mono text-xs font-black text-amber-900 uppercase">
                    Explicit Confirmation Gate
                  </h3>
                  <p className="font-mono text-xs text-amber-800 mt-1">
                    MonoForge never silently overwrites your profile. Review the detected features below before applying:
                  </p>
                </div>
              </div>

              {/* Detected Features Summary */}
              <div className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-3 font-mono text-xs">
                <span className="font-bold text-neutral-900 uppercase text-[11px] tracking-wider">
                  Extracted Profile Signals
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-neutral-50 border border-neutral-300">
                    <span className="text-neutral-500">GitHub Handle: </span>
                    <strong className="text-neutral-950">
                      {parsedResult.config.settings.user.github || 'Not detected'}
                    </strong>
                  </div>
                  <div className="p-2 rounded bg-neutral-50 border border-neutral-300">
                    <span className="text-neutral-500">Name: </span>
                    <strong className="text-neutral-950">
                      {parsedResult.config.settings.user.name || 'Not detected'}
                    </strong>
                  </div>
                  <div className="p-2 rounded bg-neutral-50 border border-neutral-300">
                    <span className="text-neutral-500">Role: </span>
                    <strong className="text-neutral-950">
                      {parsedResult.config.settings.user.role || 'Developer'}
                    </strong>
                  </div>
                  <div className="p-2 rounded bg-neutral-50 border border-neutral-300">
                    <span className="text-neutral-500">Sections Parsed: </span>
                    <strong className="text-neutral-950">
                      {parsedResult.config.sections.length} module(s)
                    </strong>
                  </div>
                </div>

                {parsedResult.detectedFeatures.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-neutral-200">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold">
                      Recognized Widgets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedResult.detectedFeatures.map((feat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px]"
                        >
                          &check; {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Merge Options */}
              <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-neutral-300 text-xs font-mono cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={keepExistingBio}
                  onChange={e => setKeepExistingBio(e.target.checked)}
                  className="rounded border-neutral-900 text-[#ffe600] focus:ring-0"
                />
                <span className="text-neutral-800">
                  Preserve current Studio Name &amp; Bio (merge new widgets only)
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setParsedResult(null)}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-neutral-900 text-xs font-mono font-bold text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                >
                  &larr; BACK
                </button>
                <button
                  type="button"
                  onClick={handleConfirmImport}
                  className="px-5 py-2 rounded-lg bg-[#ffe600] text-neutral-950 text-xs font-mono font-black border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CONFIRM &amp; IMPORT TO STUDIO</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadmeImporterModal;
