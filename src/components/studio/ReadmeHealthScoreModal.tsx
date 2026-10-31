'use client';

import React from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { calculateProfileQualityScore } from '#/lib/optimizer/quality-score';
import {
  X,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadmeHealthScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadmeHealthScoreModal: React.FC<ReadmeHealthScoreModalProps> = ({
  isOpen,
  onClose,
}) => {
  const config = useReadmeStore(state => state.config);
  const addSection = useReadmeStore(state => state.addSection);

  if (!isOpen) return null;

  const report = calculateProfileQualityScore(config);

  const handleApplyQuickFix = (type: string) => {
    if (type === 'telemetry') {
      addSection('telemetry-isocalendar', { content: { username: config.settings.user.github || 'octocat' } });
    } else if (type === 'techs') {
      addSection('techs', {
        content: {
          icons: ['typescript', 'react', 'nextjs', 'tailwind', 'nodejs', 'python', 'docker', 'git'],
        },
      });
    } else if (type === 'socials') {
      addSection('socials', {
        content: {
          github: config.settings.user.github || 'octocat',
          twitter: config.settings.user.github || 'octocat',
          linkedin: config.settings.user.github || 'octocat',
        },
      });
    }

    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors: ['#ffe600', '#10b981'] });
    } catch {
      // Ignored
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border-2 border-neutral-900 rounded-2xl shadow-[8px_8px_0px_#18181b] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight font-mono uppercase">
                README Profile Health &amp; Camo Audit
              </h2>
              <p className="text-xs font-mono font-bold text-neutral-800">
                Real-time AST Analysis &bull; Camo CDN Compliance
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 bg-[#fafafa]">
          {/* Main Score Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl border-2 border-neutral-900 flex flex-col items-center justify-center font-mono shadow-[2px_2px_0px_#18181b]"
                style={{ backgroundColor: report.overallScore >= 75 ? '#ffe600' : '#f4f4f5' }}
              >
                <span className="text-2xl font-black text-neutral-950 leading-none">
                  {report.overallScore}
                </span>
                <span className="text-[10px] font-bold text-neutral-600 uppercase mt-0.5">/ 100</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black px-2 py-0.5 rounded bg-neutral-950 text-white border border-neutral-900">
                    {report.grade}
                  </span>
                  {report.camoCompliant ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Camo Safe
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-300">
                      <AlertCircle className="w-3.5 h-3.5" /> Camo Warning
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-neutral-600 mt-1.5">
                  {report.overallScore >= 90
                    ? 'Exceptional profile! Your layout commands authority and max recruiter attention.'
                    : report.overallScore >= 75
                    ? 'Solid developer profile. A couple of visual additions will bring it to S-Tier.'
                    : 'Profile has great potential! Follow the recommendations below to elevate it.'}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Breakdown */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono font-black uppercase text-neutral-900 tracking-wider">
              Diagnostic Breakdown (5 Pillars)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {report.metrics.map(metric => (
                <div
                  key={metric.category}
                  className="p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-neutral-900">{metric.label}</span>
                    <span className="font-black text-neutral-950">
                      {metric.score} / {metric.maxScore}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 border border-neutral-300 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${(metric.score / metric.maxScore) * 100}%`,
                        backgroundColor:
                          metric.score === metric.maxScore
                            ? '#10b981'
                            : metric.score >= 12
                            ? '#ffe600'
                            : '#f59e0b',
                      }}
                    />
                  </div>
                  {metric.recommendation && (
                    <p className="text-[10px] font-mono text-neutral-500 leading-tight">
                      &bull; {metric.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendations */}
          {report.actionableImprovements.length > 0 && (
            <div className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] space-y-3">
              <h3 className="text-xs font-mono font-black uppercase text-neutral-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant 1-Click Fixes</span>
              </h3>
              <div className="space-y-2">
                {report.actionableImprovements.map((imp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50 border border-neutral-300 text-xs font-mono gap-3"
                  >
                    <span className="text-neutral-800">{imp}</span>
                    {imp.toLowerCase().includes('telemetry') ? (
                      <button
                        type="button"
                        onClick={() => handleApplyQuickFix('telemetry')}
                        className="shrink-0 px-2.5 py-1 rounded-md bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Add 3D Calendar</span>
                      </button>
                    ) : imp.toLowerCase().includes('tech') || imp.toLowerCase().includes('languages') ? (
                      <button
                        type="button"
                        onClick={() => handleApplyQuickFix('techs')}
                        className="shrink-0 px-2.5 py-1 rounded-md bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Add Tech Stack</span>
                      </button>
                    ) : imp.toLowerCase().includes('social') ? (
                      <button
                        type="button"
                        onClick={() => handleApplyQuickFix('socials')}
                        className="shrink-0 px-2.5 py-1 rounded-md bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Add Social Badges</span>
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-neutral-900 text-xs font-mono">
          <span className="text-neutral-500 text-[11px]">
            Audited via MonoForge Camo AST Lint Engine
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#ffe600] text-neutral-950 font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:bg-[#ffdf00] transition-all cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadmeHealthScoreModal;
