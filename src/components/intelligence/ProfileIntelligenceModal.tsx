'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import {
  analyzeDeveloperProfile,
  ProfileIntelligenceReport,
  ActionableSuggestion,
} from '#/lib/intelligence/profile-analyzer';
import {
  X,
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface ProfileIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileIntelligenceModal: React.FC<ProfileIntelligenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const config = useReadmeStore(state => state.config);
  const updateSettings = useReadmeStore(state => state.updateSettings);
  const addSection = useReadmeStore(state => state.addSection);

  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions' | 'suggestions' | 'readability'>('overview');

  if (!isOpen) return null;

  const rawMarkdown = buildMarkdown(config);
  const report: ProfileIntelligenceReport = analyzeDeveloperProfile(rawMarkdown, config);

  const handleApplyFix = (suggestion: ActionableSuggestion) => {
    try {
      if (suggestion.autoFixType === 'add-isocalendar') {
        addSection('telemetry-isocalendar', {
          content: { username: config.settings.user.github || 'octocat' },
        });
        toast.success('Added 3D Isometric Calendar to profile');
      } else if (suggestion.autoFixType === 'add-techs') {
        addSection('techs', {
          content: {
            icons: ['typescript', 'react', 'nextjs', 'tailwind', 'nodejs', 'python', 'docker', 'git'],
          },
        });
        toast.success('Added curated Tech Stack icons');
      } else if (suggestion.autoFixType === 'add-socials') {
        addSection('socials', {
          content: {
            github: config.settings.user.github || 'octocat',
            linkedin: config.settings.user.github || 'octocat',
            twitter: config.settings.user.github || 'octocat',
          },
        });
        toast.success('Added Social connect badges');
      } else if (suggestion.autoFixType === 'set-name') {
        const username = config.settings.user.github || 'Alex Dev';
        updateSettings(prev => ({
          ...prev,
          user: {
            ...prev.user,
            name: prev.user.name || username,
          },
        }));
        toast.success('Updated name in profile');
      } else if (suggestion.autoFixType === 'set-role') {
        updateSettings(prev => ({
          ...prev,
          user: {
            ...prev.user,
            role: prev.user.role || 'Full-Stack Developer & Open Source Contributor',
          },
        }));
        toast.success('Updated target role title');
      } else {
        toast.info(`Manual refinement suggested: ${suggestion.title}`);
        return;
      }

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffe600', '#18181b', '#10b981'],
      });
    } catch {
      toast.error('Failed to apply fix');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white border-2 border-neutral-900 rounded-2xl shadow-[8px_8px_0px_#18181b] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight font-mono uppercase">
                  Profile Intelligence &amp; AST Radar
                </h2>
                <span className="px-2 py-0.5 rounded bg-neutral-950 text-[#ffe600] text-[10px] font-mono font-bold">
                  IQ {report.profileIQ}
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-neutral-800">
                Cognitive Evaluation &bull; Scannability &bull; Recruiter Psychology
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

        {/* Sub-nav Tabs */}
        <div className="flex items-center px-5 py-2 bg-white border-b-2 border-neutral-900 gap-1 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dimensions')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'dimensions'
                ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            9 Dimensions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('suggestions')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'suggestions'
                ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>Actionable Fixes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-neutral-950 text-[#ffe600] text-[10px] font-black">
              {report.suggestions.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('readability')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'readability'
                ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Readability &amp; Tone
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#fafafa]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 font-mono">
              <div className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-[#ffe600] border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-neutral-950 leading-none">
                      {report.overallScore}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-700 uppercase mt-0.5">/ 100</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-neutral-950 text-white font-black text-xs">
                        {report.grade}
                      </span>
                      <span className="text-xs text-neutral-600 font-bold">
                        Profile IQ: <strong>{report.profileIQ}</strong>
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 max-w-md">
                      {report.overallScore >= 80
                        ? 'Your profile exhibits authoritative developer presence, balanced structure, and compelling scannability.'
                        : 'Your profile has high potential. Addressing the priority suggestions will elevate it into the top 5% of developer READMEs.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('suggestions')}
                  className="px-4 py-2 bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 text-xs font-black border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#18181b] flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIEW {report.suggestions.length} FIXES</span>
                </button>
              </div>

              {/* Quick Dimension Snapshot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {Object.entries(report.dimensions).slice(0, 6).map(([key, dim]) => (
                  <div
                    key={key}
                    className="p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 text-[11px] truncate">{dim.name}</span>
                      <span className="font-black px-1.5 py-0.2 rounded bg-neutral-100 border border-neutral-300 text-[10px]">
                        {dim.grade}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden">
                      <div
                        className="h-full bg-[#ffe600] rounded-full"
                        style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 9 DIMENSIONS */}
          {activeTab === 'dimensions' && (
            <div className="space-y-3 font-mono">
              {Object.entries(report.dimensions).map(([key, dim]) => (
                <div
                  key={key}
                  className="p-3.5 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-neutral-950 text-xs">{dim.name}</span>
                      <span className="px-2 py-0.2 rounded bg-neutral-950 text-white font-black text-[10px]">
                        {dim.grade} ({dim.score}/{dim.maxScore})
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-500">{dim.summary}</span>
                  </div>

                  {dim.highlights.length > 0 && (
                    <div className="space-y-0.5">
                      {dim.highlights.map((h, i) => (
                        <p key={i} className="text-[11px] text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {dim.drawbacks.length > 0 && (
                    <div className="space-y-0.5">
                      {dim.drawbacks.map((d, i) => (
                        <p key={i} className="text-[11px] text-amber-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{d}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ACTIONABLE SUGGESTIONS */}
          {activeTab === 'suggestions' && (
            <div className="space-y-2.5 font-mono">
              {report.suggestions.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-xl border-2 border-dashed border-neutral-300 text-xs text-neutral-500">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-neutral-800">Flawless Profile Architecture!</p>
                  <p>Zero critical issues detected. Your profile meets highest industry standards.</p>
                </div>
              ) : (
                report.suggestions.map(sugg => (
                  <div
                    key={sugg.id}
                    className="p-3.5 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.2 rounded font-black text-[9px] uppercase ${
                            sugg.priority === 'critical'
                              ? 'bg-red-500 text-white'
                              : sugg.priority === 'high'
                              ? 'bg-amber-400 text-neutral-950'
                              : 'bg-neutral-200 text-neutral-800'
                          }`}
                        >
                          {sugg.priority}
                        </span>
                        <h4 className="font-black text-neutral-950 text-xs">{sugg.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-600 leading-relaxed">
                        {sugg.description}
                      </p>
                    </div>

                    {sugg.autoFixAvailable && (
                      <button
                        type="button"
                        onClick={() => handleApplyFix(sugg)}
                        className="px-3 py-1.5 bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-black text-xs border border-neutral-900 rounded-lg shadow-2xs transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>FIX</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: READABILITY & TONE */}
          {activeTab === 'readability' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Word Count</span>
                  <p className="text-xl font-black text-neutral-950 mt-1">{report.readability.wordCount}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Reading Time</span>
                  <p className="text-xl font-black text-neutral-950 mt-1">{report.readability.readingTimeMinutes} min</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Flesch Reading Ease</span>
                  <p className="text-xl font-black text-neutral-950 mt-1">{report.readability.fleschKincaidScore} / 100</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Profile Tone</span>
                  <p className="text-base font-black text-neutral-950 mt-1 uppercase">{report.readability.tone}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-1.5">
                <h4 className="font-black text-neutral-950">Psychological Recruiter Scannability Analysis</h4>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  Technical recruiters and engineering managers spend an average of <strong>12 to 18 seconds</strong> reviewing a candidate’s GitHub profile. Profiles with a balanced word count ({'<'}250 words) combined with clear iconography and compact telemetry metrics retain attention 3.2x longer than lengthy prose blocks.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-neutral-900 text-xs font-mono">
          <span className="text-neutral-500 text-[11px]">
            MonoForge Cognitive AST &bull; 100% Client-Side Engine
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-950 text-white font-bold border-2 border-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntelligenceModal;
