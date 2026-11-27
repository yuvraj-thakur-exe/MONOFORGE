'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Sun, Moon, Sparkles, Terminal } from 'lucide-react';
import { NormalizedDeveloperIdentity } from '#/lib/visualizations/types';
import {
  drawStoryGrid,
  drawStorySkyline,
  drawStoryPulse,
  drawStoryRing,
  drawStoryStreak,
  drawStoryTerminal,
  prepareStoryCalendar,
  StoryHoverCell,
} from '#/lib/visualizations/contribution-story';

type StoryActId = 'grid' | 'skyline' | 'pulse' | 'ring' | 'streak' | 'terminal';

interface StoryActMeta {
  id: StoryActId;
  actNumber: string;
  title: string;
  subtitle: string;
  draw: typeof drawStoryGrid;
}

const STORY_ACTS: StoryActMeta[] = [
  {
    id: 'grid',
    actNumber: '01',
    title: 'The Grid',
    subtitle: 'Diagonal wave drop-in with scaled count-up & hover inspection',
    draw: drawStoryGrid,
  },
  {
    id: 'skyline',
    actNumber: '02',
    title: 'Skyline',
    subtitle: '3D oblique projection with sqrt height scaling & peak leader line',
    draw: drawStorySkyline,
  },
  {
    id: 'pulse',
    actNumber: '03',
    title: 'Week by Week',
    subtitle: 'Weekly sparkline with riding dot pouring into 7-day columns',
    draw: drawStoryPulse,
  },
  {
    id: 'ring',
    actNumber: '04',
    title: 'Round the Year',
    subtitle: '7 weekday rings & 53 week spokes revealed by a sweeping hand',
    draw: drawStoryRing,
  },
  {
    id: 'streak',
    actNumber: '05',
    title: 'The Streak',
    subtitle: 'Active streak traced day by day with trail & last-day-off marker',
    draw: drawStoryStreak,
  },
  {
    id: 'terminal',
    actNumber: '06',
    title: 'In the Terminal',
    subtitle: 'Typed command with scrambling glyphs settling into . : + # @',
    draw: drawStoryTerminal,
  },
];

interface StoryCanvasCardProps {
  act: StoryActMeta;
  data: NormalizedDeveloperIdentity;
  darkMode: boolean;
  globalReplayNonce: number;
}

function StoryCanvasCard({
  act,
  data,
  darkMode,
  globalReplayNonce,
}: StoryCanvasCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startRef = useRef<number | null>(null);
  const visibleRef = useRef<boolean>(false);
  const hasPlayedRef = useRef<boolean>(false);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1,
    y: -1,
    active: false,
  });
  const [hoverCell, setHoverCell] = useState<StoryHoverCell | null>(null);
  const [replayNonce, setReplayNonce] = useState(0);

  const handleReplay = useCallback(() => {
    startRef.current = performance.now();
    hasPlayedRef.current = true;
    setReplayNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    if (globalReplayNonce > 0) {
      startRef.current = performance.now();
      hasPlayedRef.current = true;
    }
  }, [globalReplayNonce]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let rafId: number | null = null;
    let width = 0;
    let height = 0;
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawFrame = (now: number) => {
      if (width <= 0 || height <= 0) return;
      if (prefersReducedMotion) {
        act.draw(ctx, width, height, Infinity, data, {
          darkMode,
          pointer: pointerRef.current,
          onHoverCell: act.id === 'grid' ? setHoverCell : undefined,
        });
        return;
      }

      if (startRef.current === null) {
        startRef.current = now;
      }
      const elapsed = now - startRef.current;
      act.draw(ctx, width, height, elapsed, data, {
        darkMode,
        pointer: pointerRef.current,
        onHoverCell: act.id === 'grid' ? setHoverCell : undefined,
      });

      if (visibleRef.current) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!hasPlayedRef.current) {
            startRef.current = performance.now();
            hasPlayedRef.current = true;
          }
          if (rafId === null) {
            rafId = requestAnimationFrame(drawFrame);
          }
        } else if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      if (prefersReducedMotion || !visibleRef.current) {
        drawFrame(performance.now());
      }
    };

    const onMouseLeave = () => {
      pointerRef.current = { x: -1, y: -1, active: false };
      setHoverCell(null);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [act, data, darkMode, replayNonce, globalReplayNonce]);

  return (
    <div
      ref={containerRef}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-800/80 bg-slate-950/60">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
              {act.actNumber}
            </span>
            <h3 className="text-sm font-mono font-bold text-slate-100 truncate">{act.title}</h3>
          </div>
          <p className="text-[11px] text-slate-400 truncate mt-0.5">{act.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono font-semibold border border-slate-700 transition-colors shrink-0 cursor-pointer"
          title={`Replay ${act.title}`}
        >
          <RotateCcw className="w-3 h-3" />
          <span>Replay</span>
        </button>
      </div>

      <div className="relative h-[220px] sm:h-[240px] w-full">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {act.id === 'grid' && hoverCell && (
          <div
            className="pointer-events-none absolute z-10 px-2.5 py-1 rounded-lg bg-slate-950/95 border border-amber-400/60 text-[11px] font-mono text-slate-100 shadow-lg -translate-x-1/2 -translate-y-full"
            style={{
              left: `${Math.max(70, hoverCell.x)}px`,
              top: `${Math.max(36, hoverCell.y - 6)}px`,
            }}
          >
            <span className="text-amber-300 font-bold">{hoverCell.count}</span>{' '}
            <span>commits on {hoverCell.date}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface ContributionStoryCanvasesProps {
  data: NormalizedDeveloperIdentity;
}

export function ContributionStoryCanvases({ data }: ContributionStoryCanvasesProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [globalReplayNonce, setGlobalReplayNonce] = useState(0);
  const cal = prepareStoryCalendar(data);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>6-Act Contribution Story (Pure Canvas)</span>
          </div>
          <p className="text-xs text-slate-300 font-mono">
            {cal.total.toLocaleString()} total &bull; {cal.streakLength}d streak &bull; peak{' '}
            {cal.bestDay?.count ?? 0} on {cal.bestDay?.date ?? 'N/A'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{darkMode ? 'Light Greens' : 'Dark Greens'}</span>
          </button>

          <button
            type="button"
            onClick={() => setGlobalReplayNonce((n) => n + 1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay All 6</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {STORY_ACTS.map((act) => (
          <StoryCanvasCard
            key={act.id}
            act={act}
            data={data}
            darkMode={darkMode}
            globalReplayNonce={globalReplayNonce}
          />
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] font-mono text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pure time-based draw(ctx, w, h, t) &bull; IntersectionObserver 40% &bull; Reduced-motion safe</span>
        </span>
        <span className="text-slate-500">GitHub 5-green ramp</span>
      </div>
    </div>
  );
}
