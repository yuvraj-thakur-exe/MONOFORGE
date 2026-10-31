'use client';

import { useState, useEffect } from 'react';
import { Link } from '#/i18n/navigation';
import {
  Copy,
  Check,
  Code2,
  RefreshCw,
  AlertCircle,
  Loader2,
  PlusCircle,
  Flame,
} from 'lucide-react';
import { toast } from 'sonner';
import { playClickSound, playTone } from '#/lib/sound/sound-effects';
import { useReadmeStore } from '#/store/useReadmeStore';

const SAMPLE_USERS = ['octocat', 'shadcn', 'torvalds', 'alexdev', 'antigravity'];
const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

type PluginType = 'isocalendar' | 'heatmap' | 'velocity' | 'habits' | 'languages';

interface LiveStatsData {
  totalContributions: number;
  currentStreak: number;
  maxStreak: number;
  dailyAverage: number;
  highestDay: number;
  isRealData: boolean;
}

export function LivePlaygroundBar() {
  const [inputVal, setInputVal] = useState('octocat');
  const [debouncedUsername, setDebouncedUsername] = useState('octocat');
  const [activePlugin, setActivePlugin] = useState<PluginType>('isocalendar');
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [liveStats, setLiveStats] = useState<LiveStatsData | null>(null);

  const addSection = useReadmeStore((state) => state.addSection);

  // Debounce input updates (~350ms) to avoid request spamming and fetch real contributions
  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(() => {
      const trimmed = inputVal.trim();
      const targetUser = !trimmed ? 'octocat' : GITHUB_USERNAME_REGEX.test(trimmed) ? trimmed : 'octocat';
      setDebouncedUsername(targetUser);

      // Fetch live contribution telemetry
      fetch(`/api/telemetry/contributions?user=${encodeURIComponent(targetUser)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (!isCancelled && json?.success && json.data) {
            setLiveStats(json.data);
          }
        })
        .catch(() => {
          // Graceful ignore
        });
    }, 350);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [inputVal]);

  const isValidInput = !inputVal || GITHUB_USERNAME_REGEX.test(inputVal.trim());
  const effectiveUsername = debouncedUsername || 'octocat';

  const embedUrl = `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${activePlugin}&user=${encodeURIComponent(effectiveUsername)}`;
  const markdownSnippet = `<a href="https://github.com/${effectiveUsername}">\n  <img src="${embedUrl}" alt="${effectiveUsername}'s MonoForge Contributor Telemetry" width="100%" />\n</a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSnippet);
    setCopied(true);
    playClickSound();
    playTone(880, 'sine', 0.1, 0.04);
    toast.success(`Copied Camo SVG Markdown for @${effectiveUsername}!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToProfile = () => {
    playClickSound();
    playTone(940, 'sine', 0.15, 0.05);
    addSection('telemetry-isocalendar', {
      username: effectiveUsername,
      format: activePlugin === 'heatmap' ? 'heatmap' : activePlugin === 'velocity' ? 'velocity' : 'isocalendar',
      duration: 'half-year',
    });
    setAdded(true);
    toast.success(`Added ${activePlugin.toUpperCase()} to your profile README!`, {
      description: 'Open the /developer IDE or Visual Studio to preview and commit to GitHub.',
    });
    setTimeout(() => setAdded(false), 2500);
  };

  const handleRetry = () => {
    playClickSound();
    setHasError(false);
    setLoading(true);
    setRetryKey((prev) => prev + 1);
  };

  return (
    <section className="relative bg-white border-b-2 border-neutral-900 py-12 sm:py-16 px-4 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-neutral-900 pb-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
                LIVE SANDBOX
              </span>
              <span className="font-bold text-neutral-800">INSTANT TELEMETRY PREVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-950 uppercase font-sans">
              TEST YOUR GITHUB HANDLE LIVE.
            </h2>
          </div>
        </div>

        {/* Input & Sample Controls */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-3 text-sm font-mono text-neutral-600 font-bold select-none">@</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setLoading(true);
                  setHasError(false);
                }}
                placeholder="github-username"
                className={`w-full pl-8 pr-4 py-2.5 rounded-xl border-2 bg-white text-neutral-950 font-mono text-sm font-bold shadow-[2px_2px_0px_#18181b] focus:outline-hidden ${
                  isValidInput
                    ? 'border-neutral-900 focus:border-[#ffe600]'
                    : 'border-red-500 focus:border-red-500 bg-red-50/30'
                }`}
              />
            </div>

            {/* Sample Handle Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] font-mono text-neutral-800 font-black hidden md:inline">TRY:</span>
              {SAMPLE_USERS.map((user) => (
                <button
                  key={user}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setInputVal(user);
                    setDebouncedUsername(user);
                    setLoading(true);
                    setHasError(false);
                  }}
                  className={`px-2.5 py-2 rounded-lg font-mono text-xs font-bold border-2 transition-all cursor-pointer shrink-0 btn-tactile ${
                    effectiveUsername === user
                      ? 'bg-[#ffe600] text-neutral-950 border-neutral-950 shadow-[2px_2px_0px_#18181b] font-black'
                      : 'bg-white text-neutral-900 border-neutral-900 hover:bg-[#ffe600] hover:text-neutral-950'
                  }`}
                >
                  @{user}
                </button>
              ))}
            </div>
          </div>

          {!isValidInput && (
            <p className="text-xs font-mono text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Invalid GitHub handle format (alphanumeric and single hyphens only, max 39 chars).</span>
            </p>
          )}
        </div>

        {/* Contributor Activity & Telemetry Form Selector Tabs */}
        <div className="flex items-center gap-2 border-b-2 border-slate-300 pb-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'isocalendar', label: '3D ISOMETRIC CALENDAR' },
            { id: 'heatmap', label: '2D ANNUAL HEATMAP' },
            { id: 'velocity', label: 'VELOCITY & STREAK RADAR' },
            { id: 'habits', label: 'CODING HABITS & HOURS' },
            { id: 'languages', label: 'LANGUAGE BREAKDOWN' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playClickSound();
                setActivePlugin(tab.id as PluginType);
                setLoading(true);
                setHasError(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-black transition-all border-2 cursor-pointer shrink-0 btn-tactile ${
                activePlugin === tab.id
                  ? 'bg-[#ffe600] text-slate-950 border-slate-900 shadow-[2px_2px_0px_#334155]'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-700 hover:text-slate-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live SVG Preview Card with Real-Data Telemetry Strip */}
        <div className="rounded-2xl border-2 border-slate-400 bg-white p-4 sm:p-8 shadow-[6px_6px_0px_#334155] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-slate-200 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-black text-slate-900">
                LIVE OUTPUT FOR @{effectiveUsername}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                DYNAMIC REAL DATA
              </span>
            </div>
            <span className="text-[11px] text-slate-600 font-bold hidden sm:inline">
              100% GITHUB CAMO CDN SAFE // UPDATES WITH CONTRIBUTIONS
            </span>
          </div>

          {/* Live Real Telemetry Metrics Strip */}
          {liveStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">YEARLY COMMITS</span>
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {liveStats.totalContributions.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">ACTIVE STREAK</span>
                <span className="text-base sm:text-lg font-black text-emerald-700 flex items-center gap-1">
                  <span>{liveStats.currentStreak} days</span>
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">PEAK DAY</span>
                <span className="text-base sm:text-lg font-black text-blue-700">
                  {liveStats.highestDay} commits
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">DAILY AVG</span>
                <span className="text-base sm:text-lg font-black text-slate-800">
                  ~{liveStats.dailyAverage}/day
                </span>
              </div>
            </div>
          )}

          {/* SVG Frame with Skeleton & Error Handling */}
          <div className="relative p-4 rounded-xl bg-slate-50 border-2 border-slate-300 flex items-center justify-center min-h-[180px] overflow-x-auto">
            {loading && !hasError && (
              <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-2 z-10">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span className="text-xs font-mono font-bold text-slate-700">Fetching Real Contributor Activity...</span>
              </div>
            )}

            {hasError ? (
              <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                <AlertCircle className="w-8 h-8 text-amber-500" />
                <p className="text-xs font-mono text-slate-700">
                  Could not load preview for @{effectiveUsername}.
                </p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffe600] text-slate-950 font-mono text-xs font-black border-2 border-slate-900 shadow-2xs hover:bg-[#ffdf00] btn-tactile"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Preview</span>
                </button>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${effectiveUsername}-${activePlugin}-${retryKey}`}
                src={`/api/telemetry/svg?plugin=${activePlugin}&user=${encodeURIComponent(effectiveUsername)}`}
                alt={`${effectiveUsername} real contributor telemetry`}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setHasError(true);
                }}
                className={`max-w-full h-auto drop-shadow-sm transition-opacity duration-200 ${
                  loading ? 'opacity-30' : 'opacity-100'
                }`}
              />
            )}
          </div>

          {/* Action Row: Add to Profile, Copy Markdown, Open IDE */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <span className="text-xs font-mono text-slate-500 truncate max-w-sm">
              {embedUrl}
            </span>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {/* 1-Click Add to Profile README */}
              <button
                type="button"
                onClick={handleAddToProfile}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#334155] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer btn-tactile"
                title="Inject this real contribution widget directly into your active profile store"
              >
                {added ? <Check className="w-3.5 h-3.5 text-white" /> : <PlusCircle className="w-3.5 h-3.5 text-white" />}
                <span>{added ? 'ADDED TO PROFILE!' : 'ADD TO MY PROFILE'}</span>
              </button>

              {/* Copy Markdown Snippet */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-slate-950 font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#334155] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer btn-tactile"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY CAMO MARKDOWN'}</span>
              </button>

              <Link
                href="/developer"
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-900 font-mono text-xs font-bold border-2 border-slate-400 shadow-[2px_2px_0px_#334155] hover:bg-slate-100 transition-all cursor-pointer btn-tactile"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>OPEN IN /DEVELOPER</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
