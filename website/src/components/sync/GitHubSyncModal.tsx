'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdownWithWorkflows } from '#/lib/buildMarkdown';
import { DiffPreview } from './DiffPreview';
import { fetchRemoteReadme, pushReadmeToGitHub, sanitizeErrorMessage } from '#/lib/github/sync';
import {
  Github,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  X,
  ExternalLink,
  Key,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose }) => {
  const config = useReadmeStore(state => state.config);
  const githubUser = config.settings.user.github;

  const [token, setToken] = useState<string>('');
  const [repoInput, setRepoInput] = useState<string>('');
  const [remoteContent, setRemoteContent] = useState<string>('');
  const [remoteSha, setRemoteSha] = useState<string | null>(null);
  const [isLoadingRemote, setIsLoadingRemote] = useState<boolean>(false);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [workflowWarnings, setWorkflowWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSeqRef = useRef<number>(0);

  // Initialize repo input from user config
  useEffect(() => {
    if (githubUser) {
      setRepoInput(`${githubUser}/${githubUser}`);
    } else {
      setRepoInput('');
    }
  }, [githubUser]);

  // Clean up any legacy tokens from localStorage to maintain strict in-memory security
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('monoforge_gh_token');
      } catch {
        // Ignore errors in storage-restricted environments
      }
    }
  }, []);

  const { markdown: newContent, workflows } = buildMarkdownWithWorkflows(config);

  const fetchRemote = useCallback(async (targetRepo: string, authToken: string) => {
    if (!targetRepo.includes('/')) return;
    const [owner, repo] = targetRepo.split('/');
    if (!owner || !repo) return;

    const seq = ++fetchSeqRef.current;
    setIsLoadingRemote(true);
    setError(null);

    const result = await fetchRemoteReadme(owner, repo, authToken);
    if (seq !== fetchSeqRef.current) return;

    setIsLoadingRemote(false);

    if (result.error && !result.repoExists) {
      setError(result.error);
      setRemoteContent('');
      setRemoteSha(null);
      return;
    }

    if (result.exists) {
      setRemoteContent(result.content);
      setRemoteSha(result.sha);
    } else {
      setRemoteContent('<!-- New profile repository: README.md does not exist yet -->\n');
      setRemoteSha(null);
    }
  }, []);

  // Debounce remote fetch (500ms) so typing a PAT/repo doesn't spam 401s
  useEffect(() => {
    if (!isOpen || !repoInput.trim()) return;

    const timer = setTimeout(() => {
      fetchRemote(repoInput, token);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, repoInput, token, fetchRemote]);

  if (!isOpen) return null;

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleConfirmPush = async (commitMessage: string) => {
    setError(null);
    setWorkflowWarnings([]);

    const target = repoInput.trim();
    if (!target.includes('/')) {
      setError('Target repository must be in the format "owner/repo"');
      return;
    }

    if (!token.trim()) {
      setError('A GitHub Personal Access Token with "repo" scope is required to push to your repository.');
      return;
    }

    const [owner, repo] = target.split('/');
    setIsPushing(true);

    try {
      const result = await pushReadmeToGitHub({
        owner,
        repo,
        token: token.trim(),
        content: newContent,
        existingSha: remoteSha,
        message: commitMessage,
        workflows,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to commit README to GitHub');
      }

      const warnings = (result as { workflowWarnings?: string[] }).workflowWarnings;
      if (Array.isArray(warnings) && warnings.length > 0) {
        setWorkflowWarnings(warnings);
      }

      setSuccessUrl(result.commitUrl || result.repoUrl);
    } catch (err: unknown) {
      const rawMsg = err instanceof Error ? err.message : 'Failed to push to GitHub';
      setError(sanitizeErrorMessage(rawMsg, token));
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-slate-100" />
            <h3 className="text-sm font-semibold text-slate-100">
              Direct GitHub Push &amp; Sync
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {successUrl ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-950/60 text-emerald-400 border border-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-slate-100">
                Pushed Successfully!
              </h4>
              <p className="text-xs text-slate-300 max-w-[360px] mx-auto">
                Your profile README has been verified and committed directly to GitHub via the REST API.
              </p>

              {workflowWarnings.length > 0 && (
                <div className="text-left p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs space-y-1 max-w-md mx-auto">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Companion Workflow Warnings</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
                    {workflowWarnings.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={successUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View on GitHub
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Credentials & Target Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-900 rounded-lg border border-slate-700">
                <div>
                  <label htmlFor="repo-input" className="block text-[11px] font-medium text-slate-400 mb-1">
                    Target Repository
                  </label>
                  <input
                    id="repo-input"
                    type="text"
                    value={repoInput}
                    onChange={e => setRepoInput(e.target.value)}
                    placeholder="username/username"
                    className="w-full px-2.5 py-1.5 bg-[#1e293b] border border-slate-600 rounded text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="token-input" className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Key className="w-3 h-3 text-amber-400" /> Personal Access Token
                    </span>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=MonoForge%20Sync"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-amber-400 hover:underline"
                    >
                      Generate token
                    </a>
                  </label>
                  <input
                    id="token-input"
                    type="password"
                    value={token}
                    onChange={handleTokenChange}
                    placeholder="ghp_••••••••••••••••••••"
                    className="w-full px-2.5 py-1.5 bg-[#1e293b] border border-slate-600 rounded text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <p className="mt-1 text-[10px] text-slate-400 leading-tight">
                    In-memory only. Never written to storage, URLs, or external servers.
                  </p>
                </div>
              </div>

              {/* Status and Errors */}
              {isLoadingRemote && (
                <div className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-700 rounded text-slate-300 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                  <span>Fetching latest README from remote GitHub repository...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-950/50 border border-rose-700 rounded-lg text-rose-200 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Refresh Remote Header Bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>
                  Remote status:{' '}
                  <strong className="text-slate-200">
                    {remoteSha ? `Existing README (${remoteSha.slice(0, 7)})` : 'New repository file'}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => fetchRemote(repoInput, token)}
                  disabled={isLoadingRemote}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingRemote ? 'animate-spin' : ''}`} /> Refresh remote
                </button>
              </div>

              {/* Mandatory Diff Preview Container */}
              <DiffPreview
                currentContent={remoteContent || '<!-- Empty / New README -->\n'}
                newContent={newContent}
                workflows={workflows}
                repoName={repoInput || 'octocat/octocat'}
                onConfirmPush={handleConfirmPush}
                onCancel={onClose}
              />

              {isPushing && (
                <div className="flex items-center justify-center gap-2 py-2 text-amber-400 text-xs font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating and committing to GitHub...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubSyncModal;
