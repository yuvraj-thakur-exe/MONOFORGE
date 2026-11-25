'use client';

import { useEffect, useRef } from 'react';
import {
  NormalizedDeveloperIdentity,
  VisualizationId,
  VisualizationTheme,
  ThemeColors,
} from '#/lib/visualizations/types';
import { NormalizedDeveloperIdentityWithProvenance } from '#/lib/visualizations/data-engine';
import { VISUALIZATION_THEMES } from '#/lib/visualizations/themes';

interface CanvasVisualizerProps {
  id: VisualizationId;
  data: NormalizedDeveloperIdentity;
  theme: VisualizationTheme;
  speed?: number;
  isPlaying?: boolean;
  onHoverInfo?: (info: string | null) => void;
}

export function CanvasVisualizer({
  id,
  data,
  theme: themeKey,
  speed = 1,
  isPlaying = true,
  onHoverInfo,
}: CanvasVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1, y: -1, active: false });

  const theme = VISUALIZATION_THEMES[themeKey] || VISUALIZATION_THEMES.emerald;

  useEffect(() => {
    onHoverInfo?.(null);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1, active: false };
      onHoverInfo?.(null);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying) {
        timeRef.current += delta * speed;
      }
      const t = timeRef.current;

      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, width, height);

      switch (id) {
        case 'commit-city':
          drawCommitCity(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'commit-river':
          drawCommitRiver(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'year-clock':
          drawYearClock(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'coding-pulse':
          drawCodingPulse(ctx, width, height, t, data, theme);
          break;
        case 'developer-terminal':
          drawDeveloperTerminal(ctx, width, height, t, data, theme);
          break;
        case 'contribution-snake':
          drawContributionSnake(ctx, width, height, t, data, theme);
          break;
        case 'repository-galaxy':
          drawRepositoryGalaxy(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'developer-dna':
          drawDeveloperDna(ctx, width, height, t, data, theme);
          break;
        case 'skill-constellation':
          drawSkillConstellation(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'engineering-radar':
        case 'skill-tree':
          drawEngineeringRadar(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'codebase-blueprint':
        case 'repository-tree':
          drawCodebaseBlueprint(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'language-river':
          drawLanguageRiver(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        case 'release-timeline':
        case 'developer-timeline':
          drawReleaseTimeline(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
        default:
          if (id.includes('river') || id.includes('waterfall')) {
            drawLanguageRiver(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          } else if (id.includes('radar') || id.includes('skill') || id.includes('tree')) {
            drawEngineeringRadar(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          } else if (id.includes('blueprint') || id.includes('timeline')) {
            drawReleaseTimeline(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          } else if (id.includes('galaxy') || id.includes('solar') || id.includes('network')) {
            drawRepositoryGalaxy(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          } else if (id.includes('synth') || id.includes('bento') || id.includes('outrun')) {
            drawRetroSynthwave(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          } else if (id.includes('pulse') || id.includes('dna')) {
            drawDeveloperDna(ctx, width, height, t, data, theme);
          } else {
            drawCommitCity(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          }
          break;
      }

      drawProvenanceBadge(ctx, width, height, data as NormalizedDeveloperIdentityWithProvenance, theme);
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      onHoverInfo?.(null);
    };
  }, [id, data, themeKey, theme, speed, isPlaying, onHoverInfo]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block rounded-xl cursor-crosshair select-none"
      style={{ touchAction: 'none' }}
    />
  );
}

function drawProvenanceBadge(
  ctx: CanvasRenderingContext2D,
  w: number,
  _h: number,
  data: NormalizedDeveloperIdentityWithProvenance,
  theme: ThemeColors
) {
  if (w < 200) return;
  const source = data.source ?? (data.isRealData ? 'github' : 'sample');
  let label = 'LIVE GITHUB';
  let stroke = '#10b981';
  let text = '#34d399';

  if (source === 'sample') {
    label = 'SAMPLE DATA';
    stroke = '#f59e0b';
    text = '#fbbf24';
  } else if (source === 'partial') {
    label = 'PARTIAL DATA';
    stroke = '#eab308';
    text = '#fde047';
  } else if (source === 'unavailable') {
    label = data.rateLimited ? 'RATE LIMITED' : 'DATA UNAVAILABLE';
    stroke = '#ef4444';
    text = '#fca5a5';
  }

  ctx.save();
  ctx.font = 'bold 10px monospace';
  const paddingX = 10;
  const tw = ctx.measureText(label).width;
  const boxW = tw + paddingX * 2;
  const bx = w - boxW - 14;
  const by = 12;

  ctx.fillStyle = theme.cardBg;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(bx, by, boxW, 20, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, bx + boxW / 2, by + 10.5);
  ctx.restore();
}

function drawEmptyNotice(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  theme: ThemeColors,
  title: string,
  subtitle: string
) {
  ctx.save();
  ctx.fillStyle = theme.textPrimary;
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(title, w / 2, h / 2 - 8);
  ctx.fillStyle = theme.textMuted;
  ctx.font = '11px monospace';
  ctx.fillText(subtitle, w / 2, h / 2 + 14);
  ctx.restore();
}

/* =========================================================================
   CANVAS RENDERER ALGORITHMS (60FPS HIGH-DPI)
   ========================================================================= */

function drawCommitCity(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const originX = w / 2;
  const originY = h * 0.42;
  const cubeW = 20;
  const cubeH = 10;
  const recentWeeks = data.weeks.slice(-24);

  if (recentWeeks.length === 0) {
    drawEmptyNotice(ctx, w, h, theme, 'COMMIT CITY', 'No contribution calendar data available');
    return;
  }

  let hoveredDay: { date: string; count: number; level: number } | null = null;

  recentWeeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      const x = wIdx - 12;
      const y = dIdx - 3.5;
      const isoX = originX + (x - y) * (cubeW * 0.95);
      const isoY = originY + (x + y) * (cubeH * 0.95);

      const wave = day.count > 0 ? Math.sin(t * 2 + wIdx * 0.2 + dIdx * 0.3) * 2 : 0;
      const bHeight = day.count > 0 ? Math.min(105, day.count * 8 + 10 + wave) : 4;

      if (mouse.active && Math.hypot(mouse.x - isoX, mouse.y - (isoY - bHeight / 2)) < 14) {
        hoveredDay = day;
      }

      ctx.fillStyle = theme.levels[day.level];
      ctx.beginPath();
      ctx.moveTo(isoX, isoY);
      ctx.lineTo(isoX, isoY - bHeight);
      ctx.lineTo(isoX + cubeW / 2, isoY - bHeight + cubeH / 2);
      ctx.lineTo(isoX + cubeW / 2, isoY + cubeH / 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = theme.border;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.fillStyle = day.count > 0 ? theme.secondary : theme.border;
      ctx.beginPath();
      ctx.moveTo(isoX + cubeW / 2, isoY + cubeH / 2);
      ctx.lineTo(isoX + cubeW / 2, isoY - bHeight + cubeH / 2);
      ctx.lineTo(isoX + cubeW, isoY - bHeight);
      ctx.lineTo(isoX + cubeW, isoY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = day.count > 0 ? theme.primary : theme.levels[0];
      ctx.beginPath();
      ctx.moveTo(isoX, isoY - bHeight);
      ctx.lineTo(isoX + cubeW / 2, isoY - bHeight - cubeH / 2);
      ctx.lineTo(isoX + cubeW, isoY - bHeight);
      ctx.lineTo(isoX + cubeW / 2, isoY - bHeight + cubeH / 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = theme.primary;
      ctx.lineWidth = 0.75;
      ctx.stroke();
    });
  });

  if (hoveredDay) {
    const hd = hoveredDay as { date: string; count: number; level: number };
    onHover?.(`${hd.date}: ${hd.count} commits (Level ${hd.level})`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}

function drawCommitRiver(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  _mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const startY = h / 2;
  const hasActivity = data.totalContributions > 0;
  const numParticles = hasActivity ? Math.min(65, Math.max(12, Math.round(data.dailyAverage * 10))) : 0;

  ctx.strokeStyle = hasActivity ? theme.primary : theme.border;
  ctx.lineWidth = hasActivity ? 32 : 12;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(40, startY);

  for (let x = 40; x <= w - 40; x += 30) {
    const wave = hasActivity ? Math.sin((x / w) * Math.PI * 3 + t * 1.5) * 40 : 0;
    ctx.lineTo(x, startY + wave);
  }
  ctx.stroke();

  for (let p = 0; p < numParticles; p++) {
    const progress = (t * 0.15 + p / numParticles) % 1;
    const x = 50 + progress * (w - 100);
    const wave = Math.sin((x / w) * Math.PI * 3 + t * 1.5) * 40;
    const y = startY + wave + Math.sin(p * 99) * 12;

    ctx.fillStyle = p % 2 === 0 ? theme.secondary : theme.accent;
    ctx.beginPath();
    ctx.arc(x, y, 3 + (p % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  onHover?.(`Flow Velocity: ${data.dailyAverage} commits/day (${data.totalContributions} total)`);
}

function drawYearClock(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  _mouse?: { x: number; y: number; active: boolean },
  _onHover?: (info: string | null) => void
) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.38;

  const monthlyTotals = Array(12).fill(0) as number[];
  data.days.forEach((d) => {
    const parts = d.date.split('-');
    const m = Number.parseInt(parts[1] ?? '', 10);
    if (m >= 1 && m <= 12) {
      monthlyTotals[m - 1] += d.count;
    }
  });
  const maxMonth = Math.max(...monthlyTotals, 1);

  for (let m = 0; m < 12; m++) {
    const startA = ((m * 30 - 90) * Math.PI) / 180;
    const endA = (((m + 1) * 30 - 92) * Math.PI) / 180;
    const ratio = monthlyTotals[m] > 0 ? monthlyTotals[m] / maxMonth : 0;
    const levelIdx = ratio === 0 ? 0 : ratio > 0.75 ? 4 : ratio > 0.5 ? 3 : ratio > 0.25 ? 2 : 1;
    const color = theme.levels[levelIdx];

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius * (0.45 + ratio * 0.55), startA, endA);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = theme.bg;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const sweepAngle = (t * 0.8) % (Math.PI * 2);
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
  ctx.stroke();

  ctx.fillStyle = theme.cardBg;
  ctx.beginPath();
  ctx.arc(cx, cy, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = theme.textPrimary;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`${data.currentStreak}D`, cx, cy - 2);
  ctx.font = '8px monospace';
  ctx.fillStyle = theme.textMuted;
  ctx.fillText('STREAK', cx, cy + 10);
}

function drawCodingPulse(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors
) {
  const midY = h / 2;
  const startX = 40;
  const endX = w - 40;

  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.5;
  for (let x = startX; x <= endX; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x, h - 40);
    ctx.stroke();
  }
  for (let y = 40; y <= h - 40; y += 40) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }

  const weeklyCounts = data.weeks.map((wk) => wk.days.reduce((s, d) => s + d.count, 0));
  const maxWeek = Math.max(...weeklyCounts, 1);
  const hasActivity = data.totalContributions > 0;

  ctx.strokeStyle = hasActivity ? theme.primary : theme.textMuted;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(startX, midY);

  const points = Math.max(20, weeklyCounts.length || 50);
  const step = (endX - startX) / points;
  for (let i = 0; i <= points; i++) {
    const x = startX + i * step;
    let spike = 0;
    if (hasActivity && weeklyCounts.length > 0) {
      const idx = Math.floor((i + Math.floor(t * 6)) % weeklyCounts.length);
      const norm = weeklyCounts[idx] / maxWeek;
      spike = norm * 85 * Math.sin((i / points) * Math.PI * 8 + t * 2);
    }
    ctx.lineTo(x, midY - spike);
  }
  ctx.stroke();
}

function drawDeveloperTerminal(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors
) {
  ctx.fillStyle = theme.cardBg;
  ctx.fillRect(30, 30, w - 60, h - 60);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, w - 60, h - 60);

  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`bash • ${data.username}@monoforge:~$ telemetry --summary`, 50, 60);

  const topLangs = data.languages.slice(0, 3).map((l) => `${l.name} (${l.percentage}%)`).join(', ') || 'None detected';
  const lines = [
    { key: 'CONTRIBUTIONS', val: `${data.totalContributions.toLocaleString()} annual commits (${data.dailyAverage}/day avg)` },
    { key: 'STREAKS', val: `${data.currentStreak}d current • ${data.maxStreak}d longest • ${data.highestDay} peak day` },
    { key: 'REPOSITORIES', val: `${data.repositories.length} tracked public repos` },
    { key: 'LANGUAGES', val: topLangs },
  ];

  lines.forEach((line, idx) => {
    ctx.fillStyle = theme.secondary;
    ctx.fillText(`[${line.key}]`, 50, 95 + idx * 28);
    ctx.fillStyle = theme.textPrimary;
    ctx.fillText(line.val, 190, 95 + idx * 28);
  });

  const cursorBlink = Math.floor(t * 2) % 2 === 0;
  if (cursorBlink) {
    ctx.fillStyle = theme.primary;
    ctx.fillRect(50, 220, 8, 14);
  }
}

function drawContributionSnake(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors
) {
  if (data.weeks.length === 0) {
    drawEmptyNotice(ctx, w, h, theme, 'CONTRIBUTION SNAKE', 'No contribution calendar data available');
    return;
  }

  const cellSize = 11;
  const gap = 3;
  const startX = (w - 52 * (cellSize + gap)) / 2;
  const startY = (h - 7 * (cellSize + gap)) / 2;

  data.weeks.forEach((week, wi) => {
    week.days.forEach((day, di) => {
      const x = startX + wi * (cellSize + gap);
      const y = startY + di * (cellSize + gap);
      ctx.fillStyle = theme.levels[day.level];
      ctx.fillRect(x, y, cellSize, cellSize);
    });
  });

  const snakeProgress = (t * 0.1) % 1;
  const snakeX = startX + snakeProgress * (52 * (cellSize + gap));
  const snakeY = startY + (Math.sin(t * 4) * 0.5 + 0.5) * (7 * (cellSize + gap));

  ctx.fillStyle = theme.secondary;
  ctx.beginPath();
  ctx.arc(snakeX, snakeY, 7, 0, Math.PI * 2);
  ctx.fill();
}

function drawRepositoryGalaxy(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const cx = w / 2;
  const cy = h / 2;

  ctx.fillStyle = theme.primary;
  ctx.beginPath();
  ctx.arc(cx, cy, 24, 0, Math.PI * 2);
  ctx.fill();

  if (data.repositories.length === 0) {
    ctx.fillStyle = theme.textMuted;
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('0 public repositories available', cx, cy + 56);
    if (mouse.active) onHover?.(null);
    return;
  }

  let hoveredRepo: { name: string; stars: number; language: string } | null = null;

  data.repositories.slice(0, 5).forEach((repo, idx) => {
    const rx = 65 + idx * 45;
    const ry = 30 + idx * 20;
    const angle = t * (0.4 / (idx + 1)) + idx * 1.3;
    const px = cx + Math.cos(angle) * rx;
    const py = cy + Math.sin(angle) * ry;

    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = repo.color;
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fill();

    if (mouse.active && Math.hypot(mouse.x - px, mouse.y - py) < 16) {
      hoveredRepo = repo;
    }
  });

  if (hoveredRepo) {
    const hr = hoveredRepo as { name: string; stars: number; language: string };
    onHover?.(`${hr.name}: ${hr.stars} stars (${hr.language})`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}

function drawDeveloperDna(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors
) {
  const startX = 60;
  const endX = w - 60;
  const numRungs = 22;
  const step = (endX - startX) / (numRungs - 1);
  const midY = h / 2;

  for (let i = 0; i < numRungs; i++) {
    const x = startX + i * step;
    const phase = (i / numRungs) * Math.PI * 4 + t * 1.5;
    const y1 = midY + Math.sin(phase) * 50;
    const y2 = midY - Math.sin(phase) * 50;

    const langColor =
      data.languages.length > 0
        ? data.languages[i % data.languages.length].color
        : theme.border;
    ctx.strokeStyle = langColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();

    ctx.fillStyle = theme.primary;
    ctx.beginPath();
    ctx.arc(x, y1, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = theme.secondary;
    ctx.beginPath();
    ctx.arc(x, y2, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  if (data.languages.length === 0) {
    ctx.fillStyle = theme.textMuted;
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('0 verified language profiles available', w / 2, h - 36);
  }
}

function drawSkillConstellation(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  if (data.skills.length === 0) {
    drawEmptyNotice(ctx, w, h, theme, 'SKILL CONSTELLATION', 'No verified language or skill nodes available');
    if (mouse.active) onHover?.(null);
    return;
  }

  const cx = w / 2;
  const cy = h / 2;

  const nodes = data.skills.map((s, idx) => {
    const angle = (idx / data.skills.length) * Math.PI * 2 + t * 0.08;
    const r = 90 + (idx % 3) * 45;
    return {
      ...s,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * (r * 0.7),
    };
  });

  const map = new Map(nodes.map((n) => [n.id, n]));
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1;

  nodes.forEach((n) => {
    n.connectedTo.forEach((targetId) => {
      const target = map.get(targetId);
      if (target) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    });
  });

  let hoveredSkill: { name: string; level: number; category: string } | null = null;
  nodes.forEach((n) => {
    ctx.fillStyle = theme.primary;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.level * 1.8 + 2, 0, Math.PI * 2);
    ctx.fill();

    if (mouse.active && Math.hypot(mouse.x - n.x, mouse.y - n.y) < 14) {
      hoveredSkill = n;
    }
  });

  if (hoveredSkill) {
    const hs = hoveredSkill as { name: string; level: number; category: string };
    onHover?.(`Skill: ${hs.name} (Level ${hs.level}/5, ${hs.category})`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}

function drawEngineeringRadar(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const cx = w / 2;
  const cy = h / 2 + 10;
  const radius = Math.min(w, h) * 0.32;

  const scoreForCategory = (cat: string) => {
    const matching = data.skills.filter((s) => s.category === cat);
    if (matching.length === 0) return 0;
    const avg = matching.reduce((sum, s) => sum + s.level, 0) / matching.length;
    return Math.min(1, Math.max(0.15, avg / 5));
  };

  const hasData = data.skills.length > 0 || data.totalContributions > 0;
  const axes = [
    { label: 'Frontend', val: scoreForCategory('frontend'), detail: 'UI & client stack' },
    { label: 'Backend', val: scoreForCategory('backend'), detail: 'APIs & services' },
    { label: 'Systems', val: scoreForCategory('systems'), detail: 'Low-level & runtime' },
    { label: 'DevOps', val: scoreForCategory('devops'), detail: 'Tooling & infra' },
    { label: 'AI & Data', val: scoreForCategory('ai'), detail: 'ML & scripting' },
    {
      label: 'Activity',
      val: data.totalContributions > 0 ? Math.min(1, Math.max(0.2, data.activeDaysCount / 260)) : 0,
      detail: `${data.totalContributions} commits (${data.activeDaysCount} active days)`,
    },
  ];
  const numAxes = axes.length;

  const rings = [0.25, 0.5, 0.75, 1.0];
  rings.forEach((r, idx) => {
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = idx === rings.length - 1 ? 1.5 : 0.75;
    ctx.setLineDash(idx === rings.length - 1 ? [] : [4, 4]);
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
      const px = cx + Math.cos(angle) * radius * r;
      const py = cy + Math.sin(angle) * radius * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  });
  ctx.setLineDash([]);

  axes.forEach((axis, i) => {
    const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;

    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    const lx = cx + Math.cos(angle) * (radius + 24);
    const ly = cy + Math.sin(angle) * (radius + 24);
    ctx.fillStyle = theme.textPrimary;
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(axis.label, lx, ly);
  });

  if (!hasData) {
    drawEmptyNotice(ctx, w, h, theme, 'ENGINEERING RADAR', 'No verified skill or activity metrics available');
    if (mouse.active) onHover?.(null);
    return;
  }

  const sweepAngle = (t * 1.5) % (Math.PI * 2);
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, `${theme.primary}00`);
  grad.addColorStop(1, `${theme.primary}22`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, sweepAngle - 0.4, sweepAngle);
  ctx.closePath();
  ctx.fill();

  const breath = Math.sin(t * 2) * 2;
  ctx.beginPath();
  let hoveredAxis: { label: string; val: number; detail: string } | null = null;

  axes.forEach((axis, i) => {
    const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
    const r = Math.max(0, axis.val * radius + (axis.val > 0 ? breath : 0));
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;

    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);

    if (mouse.active && Math.hypot(mouse.x - px, mouse.y - py) < 18) {
      hoveredAxis = axis;
    }
  });
  ctx.closePath();
  ctx.fillStyle = `${theme.primary}33`;
  ctx.fill();
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  axes.forEach((axis, i) => {
    const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
    const r = Math.max(0, axis.val * radius + (axis.val > 0 ? breath : 0));
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;

    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.arc(px, py, hoveredAxis === axis ? 7 : 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = theme.bg;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  if (hoveredAxis) {
    const ha = hoveredAxis as { label: string; val: number; detail: string };
    onHover?.(`${ha.label}: ${Math.round(ha.val * 100)}% — ${ha.detail}`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}

function drawCodebaseBlueprint(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  ctx.strokeStyle = `${theme.border}44`;
  ctx.lineWidth = 0.5;
  const gridSize = 24;
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`ARCHITECTURAL SCHEMATIC // ${data.username.toUpperCase()}`, 28, 30);
  ctx.fillStyle = theme.textMuted;
  ctx.font = '10px monospace';
  ctx.fillText(`Modules: ${data.repositories.length} | Commits: ${data.totalContributions} | Streak: ${data.currentStreak}D`, 28, 46);

  const hubX = w * 0.22;
  const hubY = h / 2;
  ctx.fillStyle = theme.cardBg;
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(hubX - 50, hubY - 50, 100, 100, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.textPrimary;
  ctx.font = 'bold 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PROFILE CORE', hubX, hubY - 6);
  ctx.fillStyle = theme.accent;
  ctx.font = 'bold 10px monospace';
  ctx.fillText(`${data.totalContributions} commits`, hubX, hubY + 12);

  const repos = data.repositories.slice(0, 3);
  if (repos.length === 0) {
    ctx.fillStyle = theme.textMuted;
    ctx.font = '11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('0 public repository modules available', w * 0.45, h / 2);
    if (mouse.active) onHover?.(null);
    return;
  }

  let hoveredRepo: { name: string; language: string; stars: number; activityScore: number } | null = null;

  repos.forEach((repo, idx) => {
    const rx = w * 0.54;
    const ry = 80 + idx * 105;
    const rw = w * 0.4;
    const rh = 84;

    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(hubX + 50, hubY);
    const midX = (hubX + 50 + rx) / 2;
    ctx.lineTo(midX, hubY);
    ctx.lineTo(midX, ry + rh / 2);
    ctx.lineTo(rx, ry + rh / 2);
    ctx.stroke();

    const packetProgress = (t * 0.8 + idx * 0.33) % 1;
    let px = hubX + 50;
    let py = hubY;
    if (packetProgress < 0.33) {
      px = hubX + 50 + (packetProgress / 0.33) * (midX - (hubX + 50));
      py = hubY;
    } else if (packetProgress < 0.66) {
      px = midX;
      py = hubY + ((packetProgress - 0.33) / 0.33) * (ry + rh / 2 - hubY);
    } else {
      px = midX + ((packetProgress - 0.66) / 0.34) * (rx - midX);
      py = ry + rh / 2;
    }
    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();

    const isHovered = mouse.active && mouse.x >= rx && mouse.x <= rx + rw && mouse.y >= ry && mouse.y <= ry + rh;
    if (isHovered) hoveredRepo = repo;

    ctx.fillStyle = theme.cardBg;
    ctx.strokeStyle = isHovered ? theme.primary : theme.border;
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(repo.name, rx + 16, ry + 26);

    ctx.fillStyle = theme.textMuted;
    ctx.font = '10px monospace';
    const desc = repo.description ? `${repo.description.substring(0, 36)}...` : 'No repository description';
    ctx.fillText(desc, rx + 16, ry + 46);

    ctx.fillStyle = theme.bg;
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.roundRect(rx + 16, ry + 56, 70, 16, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(repo.language, rx + 51, ry + 68);

    ctx.fillStyle = theme.accent;
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${repo.stars} stars`, rx + rw - 16, ry + 28);
  });

  if (hoveredRepo) {
    const hr = hoveredRepo as { name: string; language: string; stars: number; activityScore: number };
    onHover?.(`Module: ${hr.name} (${hr.language}) • ${hr.stars} Stars • Score: ${hr.activityScore}/100`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}

function drawLanguageRiver(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const languages = data.languages;

  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('LANGUAGE RIVER // HARMONIC STREAM GRAPH', 36, 32);
  ctx.fillStyle = theme.textMuted;
  ctx.font = '10px monospace';
  ctx.fillText(`${data.username} • ${languages.length} Active Stacks`, 36, 48);

  if (languages.length === 0) {
    drawEmptyNotice(ctx, w, h, theme, 'NO LANGUAGE DATA', 'No repository language composition available');
    if (mouse.active) onHover?.(null);
    return;
  }

  const riverTop = 90;
  const riverH = h * 0.55;
  let currentY = riverTop;

  let hoveredLang: { name: string; percentage: number; bytes: number } | null = null;

  languages.forEach((lang, idx) => {
    const bandH = Math.max(14, (lang.percentage / 100) * riverH);
    const y0 = currentY;
    const y1 = currentY + bandH;
    currentY = y1;

    const waveAmp = (idx + 1) * 3;
    const waveFreq = 0.006;
    const phase = t * 1.5 + idx * 0.5;

    ctx.fillStyle = `${lang.color}cc`;
    ctx.beginPath();
    ctx.moveTo(30, y0);

    for (let x = 30; x <= w - 30; x += 15) {
      const offset = Math.sin(x * waveFreq + phase) * waveAmp;
      ctx.lineTo(x, y0 + offset);
    }
    for (let x = w - 30; x >= 30; x -= 15) {
      const offset = Math.sin(x * waveFreq + phase) * waveAmp;
      ctx.lineTo(x, y1 + offset);
    }
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = `${theme.border}88`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    if (mouse.active && mouse.x >= 30 && mouse.x <= w - 30 && mouse.y >= y0 && mouse.y <= y1) {
      hoveredLang = lang;
    }
  });

  languages.slice(0, 5).forEach((lang, idx) => {
    const lx = 36 + idx * (w / 5.2);
    const ly = h - 44;
    ctx.fillStyle = theme.cardBg;
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(lx, ly, w / 5.6, 32, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = lang.color;
    ctx.beginPath();
    ctx.arc(lx + 14, ly + 16, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = theme.textPrimary;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(lang.name, lx + 26, ly + 14);

    ctx.fillStyle = theme.textMuted;
    ctx.font = '9px monospace';
    ctx.fillText(`${lang.percentage}%`, lx + 26, ly + 25);
  });

  if (hoveredLang) {
    const hl = hoveredLang as { name: string; percentage: number; bytes: number };
    onHover?.(`${hl.name}: ${hl.percentage}% share • ${hl.bytes ? hl.bytes.toLocaleString() : '0'} bytes`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}

function drawReleaseTimeline(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('RELEASE TIMELINE // ACTIVITY QUARTERS', 36, 32);
  ctx.fillStyle = theme.textMuted;
  ctx.font = '10px monospace';
  ctx.fillText(`${data.username} • Annual Pipeline • ${data.totalContributions} Commits`, 36, 48);

  const trackY = h * 0.54;
  const startX = 60;
  const endX = w - 60;

  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(startX, trackY);
  ctx.lineTo(endX, trackY);
  ctx.stroke();

  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(startX, trackY);
  ctx.lineTo(endX, trackY);
  ctx.stroke();

  const trainProgress = (t * 0.25) % 1;
  const trainX = startX + trainProgress * (endX - startX);
  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.arc(trainX, trackY, 6, 0, Math.PI * 2);
  ctx.fill();

  const chunk = Math.max(1, Math.floor(data.days.length / 4));
  const quarterCommits = [0, 1, 2, 3].map((q) => {
    const slice = data.days.slice(q * chunk, q === 3 ? data.days.length : (q + 1) * chunk);
    return slice.reduce((sum, d) => sum + d.count, 0);
  });

  const milestones = [
    { tag: 'Q1', title: 'Quarter 1 Activity', status: `${quarterCommits[0]} commits`, commits: quarterCommits[0], date: '90D' },
    { tag: 'Q2', title: 'Quarter 2 Activity', status: `${quarterCommits[1]} commits`, commits: quarterCommits[1], date: '180D' },
    { tag: 'Q3', title: 'Quarter 3 Activity', status: `${quarterCommits[2]} commits`, commits: quarterCommits[2], date: '270D' },
    { tag: 'Q4', title: 'Current Quarter', status: `${data.currentStreak}D streak`, commits: quarterCommits[3], date: 'NOW' },
  ];

  let hoveredMilestone: { tag: string; title: string; status: string; commits: number } | null = null;

  milestones.forEach((m, idx) => {
    const sx = startX + (idx / (milestones.length - 1)) * (endX - startX);
    const isAbove = idx % 2 === 0;
    const cardY = isAbove ? trackY - 95 : trackY + 35;
    const cardH = 65;
    const cardW = 150;

    const isLatest = idx === milestones.length - 1;
    const accentCol = isLatest ? theme.accent : theme.primary;

    ctx.strokeStyle = accentCol;
    ctx.lineWidth = 3;
    ctx.fillStyle = theme.bg;
    ctx.beginPath();
    ctx.arc(sx, trackY, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = accentCol;
    ctx.beginPath();
    ctx.arc(sx, trackY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = accentCol;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(sx, trackY);
    ctx.lineTo(sx, isAbove ? cardY + cardH : cardY);
    ctx.stroke();
    ctx.setLineDash([]);

    const cardX = sx - cardW / 2;
    const isHovered = mouse.active && mouse.x >= cardX && mouse.x <= cardX + cardW && mouse.y >= cardY && mouse.y <= cardY + cardH;
    if (isHovered) hoveredMilestone = m;

    ctx.fillStyle = theme.cardBg;
    ctx.strokeStyle = isHovered ? accentCol : theme.border;
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = accentCol;
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(m.tag, cardX + 12, cardY + 20);

    ctx.fillStyle = theme.textMuted;
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(m.date, cardX + cardW - 12, cardY + 20);

    ctx.fillStyle = theme.textPrimary;
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(m.title, cardX + 12, cardY + 38);

    ctx.fillStyle = theme.textMuted;
    ctx.font = '9px monospace';
    ctx.fillText(`${m.commits} Commits • ${m.status}`, cardX + 12, cardY + 52);
  });

  if (hoveredMilestone) {
    const hm = hoveredMilestone as { tag: string; title: string; status: string; commits: number };
    onHover?.(`${hm.tag} - ${hm.title} (${hm.status}) • ${hm.commits} commits`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}

function drawRetroSynthwave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  _theme: ThemeColors,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  const sunX = w / 2;
  const sunY = h * 0.35;
  const sunR = 48;
  const sunGrad = ctx.createLinearGradient(sunX, sunY - sunR, sunX, sunY + sunR);
  sunGrad.addColorStop(0, '#ff007f');
  sunGrad.addColorStop(0.6, '#ff7700');
  sunGrad.addColorStop(1, '#ffe600');

  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  [-6, 8, 22, 34].forEach((sy, i) => {
    ctx.fillRect(sunX - sunR, sunY + sy, sunR * 2, (i + 1) * 2);
  });

  const horizonY = h * 0.58;
  ctx.strokeStyle = '#ff007f';
  ctx.lineWidth = 1;

  const offset = (t * 24) % 24;
  for (let y = horizonY; y < h; y += 18) {
    const lineY = y + offset;
    if (lineY > horizonY && lineY < h) {
      const progress = (lineY - horizonY) / (h - horizonY);
      ctx.globalAlpha = Math.min(1, progress * 1.5);
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.lineTo(w, lineY);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 0.7;
  for (let x = -w * 0.5; x <= w * 1.5; x += 60) {
    ctx.beginPath();
    ctx.moveTo(sunX, horizonY);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = '#00f0ff';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`SYNTHWAVE 80S BENTO // ${data.username.toUpperCase()}`, 28, 28);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px monospace';
  ctx.fillText(`Outrun Telemetry • ${data.activeDaysCount} Active Days`, 28, 44);

  const cards = [
    { label: 'TOTAL COMMITS', val: data.totalContributions.toLocaleString(), color: '#ff007f' },
    { label: 'CURRENT STREAK', val: `${data.currentStreak}D`, color: '#ffe600' },
    { label: 'LONGEST STREAK', val: `${data.maxStreak}D`, color: '#00f0ff' },
  ];

  let hoveredCard: { label: string; val: string } | null = null;
  const cw = 140;
  const ch = 52;

  cards.forEach((card, idx) => {
    const cx = 28 + idx * (cw + 12);
    const cy = 60;
    const isHovered = mouse.active && mouse.x >= cx && mouse.x <= cx + cw && mouse.y >= cy && mouse.y <= cy + ch;
    if (isHovered) hoveredCard = card;

    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = isHovered ? '#ffffff' : card.color;
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cw, ch, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = card.color;
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(card.val, cx + 12, cy + 24);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    ctx.fillText(card.label, cx + 12, cy + 40);
  });

  if (hoveredCard) {
    const hc = hoveredCard as { label: string; val: string };
    onHover?.(`${hc.label}: ${hc.val}`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}
