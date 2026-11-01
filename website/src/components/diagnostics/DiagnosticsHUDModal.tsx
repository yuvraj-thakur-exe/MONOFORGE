'use client';

import { useState, useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Wrench,
  X,
  Filter,
  Check,
} from 'lucide-react';
import {
  autoFixDiagnostics,
  runDiagnostics,
} from '#/lib/diagnostics/validator';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';

export interface DiagnosticsHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiagnosticsHUDModal({ isOpen, onClose }: DiagnosticsHUDModalProps) {
  const config = useReadmeStore((s) => s.config);
  const rawMarkdown = useMemo(() => buildMarkdown(config), [config]);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [fixedNotice, setFixedNotice] = useState<boolean>(false);

  const report = useMemo(() => {
    return runDiagnostics(rawMarkdown, config);
  }, [rawMarkdown, config]);

  if (!isOpen) return null;

  const filteredIssues = report.issues.filter((issue) => {
    if (filterCategory === 'all') return true;
    return issue.category === filterCategory;
  });

  const handleAutoFix = () => {
    const fixed = autoFixDiagnostics(rawMarkdown);
    navigator.clipboard?.writeText(fixed);
    setFixedNotice(true);
    setTimeout(() => setFixedNotice(false), 2500);
  };

  const scoreBadgeColor =
    report.score >= 90
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      : report.score >= 70
      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      : 'text-red-400 bg-red-500/10 border-red-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0E1117] border-2 border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-4 bg-[#141A23] border-b-2 border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFE600] text-black font-black flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_#000]">
              <ShieldAlert className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Diagnostics &amp; Quality HUD</h3>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                  Camo &amp; Markdown Guard
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Continuous AST validation, security sanitization, and GitHub Camo compliance check
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

        {/* Top Metric Cards */}
        <div className="p-6 bg-[#111620] border-b border-[#1E293B] grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Quality Score */}
          <div className="bg-[#141A23] p-4 rounded-xl border border-[#1E293B] flex flex-col justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Quality Score
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-white">{report.score}</span>
              <span className="text-xs text-neutral-500">/ 100</span>
              <span className={`ml-auto px-2 py-0.5 text-xs font-black rounded border ${scoreBadgeColor}`}>
                {report.score >= 90 ? 'CLASS S' : report.score >= 70 ? 'CLASS A' : 'NEEDS FIX'}
              </span>
            </div>
          </div>

          {/* Camo Safe Status */}
          <div className="bg-[#141A23] p-4 rounded-xl border border-[#1E293B] flex flex-col justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Camo CDN Safety
            </span>
            <div className="mt-2 flex items-center gap-2">
              {report.camoSafe ? (
                <>
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <div>
                    <span className="text-sm font-black text-emerald-400">100% Camo Safe</span>
                    <p className="text-[10px] text-neutral-400">0 stripped tags</p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-6 h-6 text-red-400" />
                  <div>
                    <span className="text-sm font-black text-red-400">Violations Found</span>
                    <p className="text-[10px] text-red-300">Scripts or unsafe URIs</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Issues Count */}
          <div className="bg-[#141A23] p-4 rounded-xl border border-[#1E293B] flex flex-col justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Issue Breakdown
            </span>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                {report.errorCount} Errors
              </span>
              <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                {report.warningCount} Warn
              </span>
            </div>
          </div>

          {/* 1-Click Auto Fix Action */}
          <div className="bg-[#141A23] p-4 rounded-xl border border-[#1E293B] flex flex-col justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Quick Repair
            </span>
            <button
              onClick={handleAutoFix}
              disabled={report.issues.filter((i) => i.autoFixable).length === 0}
              className="mt-2 w-full py-2 bg-[#FFE600] hover:bg-[#FFD000] disabled:opacity-40 text-neutral-950 text-xs font-black rounded-lg flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:scale-95 transition-transform"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Auto-Fix All ({report.issues.filter((i) => i.autoFixable).length})</span>
            </button>
          </div>
        </div>

        {/* Notice after auto-fix */}
        {fixedNotice && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" /> Successfully auto-fixed fixable issues and copied clean markdown to clipboard!
          </div>
        )}

        {/* Filters & Issues List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#00F0FF]" />
              Filter by Category
            </span>

            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Issues' },
                { id: 'security', label: 'Security' },
                { id: 'markdown', label: 'Markdown' },
                { id: 'camo-svg', label: 'Camo SVG' },
                { id: 'urls', label: 'URLs' },
                { id: 'accessibility', label: 'A11y' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                    filterCategory === c.id
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/50'
                      : 'bg-[#141A23] text-neutral-400 border-[#1E293B] hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Issue Cards */}
          {filteredIssues.length === 0 ? (
            <div className="p-8 text-center bg-[#141A23] rounded-2xl border border-[#1E293B] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Issues Found in Category</h4>
              <p className="text-xs text-neutral-400">
                Your profile configuration satisfies all MonoForge standards for this check.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredIssues.map((issue) => {
                const isError = issue.severity === 'error';
                const isWarn = issue.severity === 'warning';

                return (
                  <div
                    key={issue.id}
                    className={`p-3.5 rounded-xl border flex items-start justify-between gap-4 transition-all ${
                      isError
                        ? 'bg-red-500/5 border-red-500/30'
                        : isWarn
                        ? 'bg-amber-500/5 border-amber-500/30'
                        : 'bg-cyan-500/5 border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isError ? (
                          <ShieldAlert className="w-4 h-4 text-red-400" />
                        ) : isWarn ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Info className="w-4 h-4 text-[#00F0FF]" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{issue.title}</span>
                          <span
                            className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border ${
                              isError
                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                : isWarn
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                            }`}
                          >
                            {issue.severity}
                          </span>
                          {issue.line && (
                            <span className="text-[10px] text-neutral-500 font-mono">
                              Line {issue.line}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {issue.description}
                        </p>
                      </div>
                    </div>

                    {issue.autoFixable && (
                      <span className="px-2 py-1 rounded bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30 text-[10px] font-bold whitespace-nowrap">
                        {issue.fixLabel || 'Fixable'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
