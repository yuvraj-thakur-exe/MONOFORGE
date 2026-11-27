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
    const ghUser = config.settings.user.github || 'developer';
    if (type === 'telemetry') {
      addSection('telemetry-isocalendar', {
        content: { username: ghUser, format: 'isocalendar', duration: 'half-year' },
      });
    } else if (type === 'techs') {
      addSection('skill-icons', {
        content: {
          icons: ['ts', 'react', 'nextjs', 'tailwind', 'nodejs', 'py', 'docker', 'git'],
          theme: config.settings.theme === 'light' ? 'light' : 'dark',
          perLine: 15,
        },
      });
    } else if (type === 'socials') {
      addSection('socials', {
        content: {
          socials: {
            github: {
              message: 'GitHub',
              color: '334155',
              logo: 'github',
              logoColor: 'white',
              link: `https://github.com/${ghUser}`,
            },
            linkedin: {
              message: 'LinkedIn',
              color: '0077B5',
              logo: 'linkedin',
              logoColor: 'white',
              link: `https://linkedin.com/in/${ghUser}`,
            },
            twitter: {
              message: 'X',
              color: '1e293b',
              logo: 'x',
              logoColor: 'white',
              link: `https://x.com/${ghUser}`,
            },
          },
          styles: {
            style: config.settings.badgeStyle || 'for-the-badge',
          },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border-2 border-slate-700 rounded-2xl shadow-[8px_8px_0px_#334155] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-slate-700 text-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-900 text-[#ffe600] border border-slate-700 shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight font-mono uppercase">
                README Profile Health &amp; Camo Audit
              </h2>
              <p className="text-xs font-mono font-bold text-slate-800">
                Real-time AST Analysis &bull; Camo CDN Compliance
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-950 border border-slate-700 transition-all hover:scale-105 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 bg-[#f8fafc]">
          {/* Main Score Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border-2 border-slate-700 shadow-[3px_3px_0px_#334155] gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center font-mono shadow-[2px_2px_0px_#334155]"
                style={{ backgroundColor: report.overallScore >= 75 ? '#ffe600' : '#f1f5f9' }}
              >
                <span className="text-2xl font-black text-slate-950 leading-none">
                  {report.overallScore}
                </span>
                <span className="text-[10px] font-bold text-slate-600 uppercase mt-0.5">/ 100</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black px-2 py-0.5 rounded bg-slate-900 text-white border border-slate-700">
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
                <p className="text-xs font-mono text-slate-600 mt-1.5">
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
            <h3 className="text-xs font-mono font-black uppercase text-slate-900 tracking-wider">
              Diagnostic Breakdown (5 Pillars)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {report.metrics.map(metric => (
                <div
                  key={metric.category}
                  className="p-3 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900">{metric.label}</span>
                    <span className="font-black text-slate-950">
                      {metric.score} / {metric.maxScore}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-300 overflow-hidden">
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
                    <p className="text-[10px] font-mono text-slate-500 leading-tight">
                      &bull; {metric.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendations */}
          {report.actionableImprovements.length > 0 && (
            <div className="p-4 bg-white rounded-xl border-2 border-slate-700 shadow-[3px_3px_0px_#334155] space-y-3">
              <h3 className="text-xs font-mono font-black uppercase text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant 1-Click Fixes</span>
              </h3>
              <div className="space-y-2">
                {report.actionableImprovements.map((imp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono gap-3"
                  >
                    <span className="text-slate-800">{imp}</span>
                    {imp.toLowerCase().includes('telemetry') ? (
                      <button
                        type="button"
                        onClick={() => handleApplyQuickFix('telemetry')}
                        className="shrink-0 px-2.5 py-1 rounded-md bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Add 3D Calendar</span>
                      </button>
                    ) : imp.toLowerCase().includes('tech') || imp.toLowerCase().includes('languages') ? (
                      <button
                        type="button"
                        onClick={() => handleApplyQuickFix('techs')}
                        className="shrink-0 px-2.5 py-1 rounded-md bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Add Tech Stack</span>
                      </button>
                    ) : imp.toLowerCase().includes('social') ? (
                      <button
                        type="button"
                        onClick={() => handleApplyQuickFix('socials')}
                        className="shrink-0 px-2.5 py-1 rounded-md bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-1 text-[11px]"
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
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-slate-700 text-xs font-mono">
          <span className="text-slate-500 text-[11px]">
            Audited via MonoForge Camo AST Lint Engine
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#ffe600] text-slate-950 font-black border-2 border-slate-700 shadow-[2px_2px_0px_#334155] hover:bg-amber-300 transition-all cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadmeHealthScoreModal;
