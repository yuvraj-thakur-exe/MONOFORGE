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
      const ghUser = config.settings.user.github || 'developer';
      if (suggestion.autoFixType === 'add-isocalendar') {
        addSection('telemetry-isocalendar', {
          content: { username: ghUser, format: 'isocalendar', duration: 'half-year' },
        });
        toast.success('Added 3D Isometric Calendar to profile');
      } else if (suggestion.autoFixType === 'add-techs') {
        addSection('skill-icons', {
          content: {
            icons: 'ts,react,nextjs,tailwind,nodejs,py,docker,git',
            theme: config.settings.theme === 'light' ? 'light' : 'dark',
            perLine: 15,
          },
        });
        toast.success('Added curated Tech Stack icons');
      } else if (suggestion.autoFixType === 'add-socials') {
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
                color: '1E293B',
                logo: 'x',
                logoColor: 'white',
                link: `https://x.com/${ghUser}`,
              },
            },
            styles: {
              style: config.settings.badgeStyle || 'for-the-badge',
              type: 'badge',
              height: 35,
            },
          },
        });
        toast.success('Added Social connect badges');
      } else if (suggestion.autoFixType === 'add-projects') {
        addSection('projects-showcase', {
          content: {
            layout: 'cards',
            sectionTitle: 'Featured Projects',
          },
        });
        toast.success('Added Flagship Projects Showcase section');
      } else if (suggestion.autoFixType === 'add-h1' || suggestion.autoFixType === 'set-name') {
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
      } else if (suggestion.autoFixType === 'sync-badges') {
        updateSettings(prev => ({
          ...prev,
          badgeStyle: 'for-the-badge',
        }));
        toast.success('Synchronized badge style to for-the-badge');
      } else {
        toast.info(`Manual refinement suggested: ${suggestion.title}`);
        return;
      }

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffe600', '#334155', '#10b981'],
      });
    } catch {
      toast.error('Failed to apply fix');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white border-2 border-slate-700 rounded-2xl shadow-[8px_8px_0px_#334155] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-slate-700 text-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-900 text-[#ffe600] border border-slate-700 shadow-xs">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight font-mono uppercase">
                  Profile Intelligence &amp; AST Radar
                </h2>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-[#ffe600] text-[10px] font-mono font-bold">
                  IQ {report.profileIQ}
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-800">
                Cognitive Evaluation &bull; Scannability &bull; Recruiter Psychology
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

        {/* Sub-nav Tabs */}
        <div className="flex items-center px-5 py-2 bg-white border-b-2 border-slate-700 gap-1 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dimensions')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'dimensions'
                ? 'bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            9 Dimensions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('suggestions')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'suggestions'
                ? 'bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Actionable Fixes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-[#ffe600] text-[10px] font-black">
              {report.suggestions.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('readability')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'readability'
                ? 'bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Readability &amp; Tone
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#f8fafc]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 font-mono">
              <div className="p-4 bg-white rounded-xl border-2 border-slate-700 shadow-[3px_3px_0px_#334155] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-[#ffe600] border-2 border-slate-700 shadow-[2px_2px_0px_#334155] flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-950 leading-none">
                      {report.overallScore}
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 uppercase mt-0.5">/ 100</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white font-black text-xs">
                        {report.grade}
                      </span>
                      <span className="text-xs text-slate-600 font-bold">
                        Profile IQ: <strong>{report.profileIQ}</strong>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-md">
                      {report.overallScore >= 80
                        ? 'Your profile exhibits authoritative developer presence, balanced structure, and compelling scannability.'
                        : 'Your profile has high potential. Addressing the priority suggestions will elevate it into the top 5% of developer READMEs.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('suggestions')}
                  className="px-4 py-2 bg-[#ffe600] hover:bg-amber-300 text-slate-950 text-xs font-black border-2 border-slate-700 rounded-lg shadow-[2px_2px_0px_#334155] flex items-center gap-1.5 cursor-pointer shrink-0"
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
                    className="p-3 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-[11px] truncate">{dim.name}</span>
                      <span className="font-black px-1.5 py-0.2 rounded bg-slate-100 border border-slate-300 text-[10px]">
                        {dim.grade}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
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
                  className="p-3.5 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-950 text-xs">{dim.name}</span>
                      <span className="px-2 py-0.2 rounded bg-slate-900 text-white font-black text-[10px]">
                        {dim.grade} ({dim.score}/{dim.maxScore})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">{dim.summary}</span>
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
                <div className="p-8 text-center bg-white rounded-xl border-2 border-dashed border-slate-300 text-xs text-slate-500">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">Flawless Profile Architecture!</p>
                  <p>Zero critical issues detected. Your profile meets highest industry standards.</p>
                </div>
              ) : (
                report.suggestions.map(sugg => (
                  <div
                    key={sugg.id}
                    className="p-3.5 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155] flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.2 rounded font-black text-[9px] uppercase ${
                            sugg.priority === 'critical'
                              ? 'bg-red-500 text-white'
                              : sugg.priority === 'high'
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {sugg.priority}
                        </span>
                        <h4 className="font-black text-slate-950 text-xs">{sugg.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {sugg.description}
                      </p>
                    </div>

                    {sugg.autoFixAvailable && (
                      <button
                        type="button"
                        onClick={() => handleApplyFix(sugg)}
                        className="px-3 py-1.5 bg-[#ffe600] hover:bg-amber-300 text-slate-950 font-black text-xs border border-slate-700 rounded-lg shadow-2xs transition-all shrink-0 flex items-center gap-1 cursor-pointer"
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
                <div className="p-3 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Word Count</span>
                  <p className="text-xl font-black text-slate-950 mt-1">{report.readability.wordCount}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Reading Time</span>
                  <p className="text-xl font-black text-slate-950 mt-1">{report.readability.readingTimeMinutes} min</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Flesch Reading Ease</span>
                  <p className="text-xl font-black text-slate-950 mt-1">{report.readability.fleschKincaidScore} / 100</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Profile Tone</span>
                  <p className="text-base font-black text-slate-950 mt-1 uppercase">{report.readability.tone}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border-2 border-slate-700 shadow-[2px_2px_0px_#334155] space-y-1.5">
                <h4 className="font-black text-slate-950">Psychological Recruiter Scannability Analysis</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Technical recruiters and engineering managers spend an average of <strong>12 to 18 seconds</strong> reviewing a candidate’s GitHub profile. Profiles with a balanced word count ({'<'}250 words) combined with clear iconography and compact telemetry metrics retain attention 3.2x longer than lengthy prose blocks.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-slate-700 text-xs font-mono">
          <span className="text-slate-500 text-[11px]">
            MonoForge Cognitive AST &bull; 100% Client-Side Engine
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-bold border-2 border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntelligenceModal;
