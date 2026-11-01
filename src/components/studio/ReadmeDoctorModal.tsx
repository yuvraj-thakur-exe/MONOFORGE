'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  X,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  Wand2,
  Copy,
  Check,
  Activity,
  Code2,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { auditReadmeContent, autoFixReadmeContent, ReadmeAuditReport } from '#/lib/diagnostics/readme-doctor';
import { toast } from 'sonner';

interface ReadmeDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMarkdown: string;
  onApplyFix?: (fixedMarkdown: string) => void;
}

export function ReadmeDoctorModal({
  isOpen,
  onClose,
  initialMarkdown,
  onApplyFix,
}: ReadmeDoctorModalProps) {
  const [content, setContent] = useState(initialMarkdown);
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'code' | 'preview'>('diagnostics');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setContent(initialMarkdown);
  }, [initialMarkdown]);

  const report: ReadmeAuditReport = useMemo(() => {
    return auditReadmeContent(content);
  }, [content]);

  if (!isOpen) return null;

  const handleAutoFix = () => {
    const fixed = autoFixReadmeContent(content);
    setContent(fixed);
    onApplyFix?.(fixed);
    toast.success('README Doctor automatically repaired identified issues!');
  };

  const handleReset = () => {
    setContent(initialMarkdown);
    toast.info('Reverted to original markdown');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Cleaned Markdown copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApplyFix?.(content);
    toast.success('Applied sanitized markdown to profile!');
    onClose();
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (score >= 75) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-red-500/10 text-red-400 border-red-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-mono text-white">MONOFORGE README DOCTOR</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  DIAGNOSTIC ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Auditing Camo security, accessibility, syntax, and mobile readability
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2.5 border-b border-slate-800 bg-slate-950/20">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('diagnostics')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer font-bold ${
                activeTab === 'diagnostics' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Diagnostics ({report.issues.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer font-bold ${
                activeTab === 'code' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Cleaned Markdown</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer font-bold ${
                activeTab === 'preview' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visual Preview</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoFix}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>1-Click Auto-Fix</span>
            </button>
            {content !== initialMarkdown && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Reset to original content"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'diagnostics' && (
            <>
              {/* Top Score Banner */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${getScoreBadgeColor(report.score)}`}>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Health Score</span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-4xl font-black font-mono">{report.score}</span>
                    <span className="text-xs font-bold font-mono opacity-80">/100</span>
                  </div>
                  <span className="text-xs font-mono font-bold">Grade: {report.grade}</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col justify-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Total Metrics</span>
                  <span className="text-lg font-bold font-mono text-white mt-1">{report.metrics.totalLines} Lines &bull; {report.metrics.totalWords} Words</span>
                  <span className="text-xs font-mono text-slate-500">{report.metrics.imageCount} Images &bull; {report.metrics.linkCount} Links</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col justify-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Telemetry Embeds</span>
                  <span className="text-lg font-bold font-mono text-emerald-400 mt-1">{report.metrics.badgesCount} Badges / Shields</span>
                  <span className="text-xs font-mono text-slate-500">{report.metrics.codeBlockCount} Code Blocks</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col justify-center">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Issues Detected</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-lg font-bold font-mono ${report.issues.length === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {report.issues.length} {report.issues.length === 1 ? 'Notice' : 'Notices'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {report.issues.filter(i => i.severity === 'critical').length} Critical Errors
                  </span>
                </div>
              </div>

              {/* Issues List */}
              {report.issues.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Identified Diagnostic Opportunities ({report.issues.length})
                  </h3>
                  <div className="space-y-2">
                    {report.issues.map(issue => (
                      <div
                        key={issue.id}
                        className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/40 flex items-start gap-3"
                      >
                        {issue.severity === 'critical' ? (
                          <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        ) : issue.severity === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-white font-mono">{issue.title}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-bold bg-slate-800 text-slate-400">
                              {issue.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{issue.description}</p>
                          <p className="text-xs text-emerald-400 font-mono mt-1">
                            &rarr; Fix: {issue.recommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passed Checks */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Passed Audit Invariants ({report.passedChecks.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {report.passedChecks.map((check, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-800/60 bg-slate-950/30 text-xs text-slate-300 font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'code' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Interactive Markdown Editor &bull; Live score updates as you type</span>
                <span>Health Score: <strong className="text-amber-400">{report.score}/100</strong></span>
              </div>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={16}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 leading-relaxed resize-y"
                placeholder="Enter markdown to inspect..."
              />
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 prose prose-invert prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-xs bg-transparent border-0 p-0 text-slate-300">
                {content}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/40 text-xs font-mono text-slate-400">
          <span>MonoForge Camo Security &bull; 0 Scripts &bull; 0 ForeignObjects</span>
          <div className="flex items-center gap-2">
            {onApplyFix && (
              <button
                type="button"
                onClick={handleApply}
                className="px-4 py-1.5 rounded-lg font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Apply to Profile
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            >
              Close Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
