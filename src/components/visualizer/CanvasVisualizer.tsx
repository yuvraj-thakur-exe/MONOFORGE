'use client';

import { useEffect, useRef } from 'react';
import {
  NormalizedDeveloperIdentity,
  VisualizationId,
  VisualizationTheme,
} from '#/lib/visualizations/types';
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

    // Mouse tracking
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

    // Animation loop
    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying) {
        timeRef.current += delta * speed;
      }
      const t = timeRef.current;

      // Clear Canvas
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, width, height);

      // Render Active Visualization
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
        default:
          drawCommitCity(ctx, width, height, t, data, theme, mouseRef.current, onHoverInfo);
          break;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [id, data, themeKey, speed, isPlaying, onHoverInfo]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block rounded-xl cursor-crosshair select-none"
      style={{ touchAction: 'none' }}
    />
  );
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
  theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const originX = w / 2;
  const originY = h * 0.42;
  const cubeW = 20;
  const cubeH = 10;
  const recentWeeks = data.weeks.slice(-24);

  let hoveredDay: any = null;

  recentWeeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      const x = wIdx - 12;
      const y = dIdx - 3.5;
      const isoX = originX + (x - y) * (cubeW * 0.95);
      const isoY = originY + (x + y) * (cubeH * 0.95);

      const wave = Math.sin(t * 2 + wIdx * 0.2 + dIdx * 0.3) * 2;
      const bHeight = day.count > 0 ? Math.min(105, day.count * 8 + 10 + wave) : 4;

      // Mouse detection
      if (mouse.active && Math.hypot(mouse.x - isoX, mouse.y - (isoY - bHeight / 2)) < 14) {
        hoveredDay = day;
      }

      // Left Face
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

      // Right Face
      ctx.fillStyle = day.count > 0 ? theme.secondary : theme.border;
      ctx.beginPath();
      ctx.moveTo(isoX + cubeW / 2, isoY + cubeH / 2);
      ctx.lineTo(isoX + cubeW / 2, isoY - bHeight + cubeH / 2);
      ctx.lineTo(isoX + cubeW, isoY - bHeight);
      ctx.lineTo(isoX + cubeW, isoY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Roof Face
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
    onHover?.(`📅 ${hoveredDay.date}: ${hoveredDay.count} commits (Level ${hoveredDay.level})`);
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
  theme: any,
  _mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const startY = h / 2;
  const numParticles = 65;

  // Draw River Gradient Stream
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 32;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(40, startY);

  for (let x = 40; x <= w - 40; x += 30) {
    const wave = Math.sin((x / w) * Math.PI * 3 + t * 1.5) * 40;
    ctx.lineTo(x, startY + wave);
  }
  ctx.stroke();

  // Floating Particles
  for (let p = 0; p < numParticles; p++) {
    const progress = ((t * 0.15 + p / numParticles) % 1);
    const x = 50 + progress * (w - 100);
    const wave = Math.sin((x / w) * Math.PI * 3 + t * 1.5) * 40;
    const y = startY + wave + (Math.sin(p * 99) * 12);

    ctx.fillStyle = p % 2 === 0 ? theme.secondary : theme.accent;
    ctx.beginPath();
    ctx.arc(x, y, 3 + (p % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  onHover?.(`🌊 Flow Velocity: ${data.dailyAverage} commits/day (${data.totalContributions} total)`);
}

function drawYearClock(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: any,
  _mouse?: { x: number; y: number; active: boolean },
  _onHover?: (info: string | null) => void
) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.38;

  // Draw 12 Concentric Radial Wedges
  for (let m = 0; m < 12; m++) {
    const startA = ((m * 30 - 90) * Math.PI) / 180;
    const endA = (((m + 1) * 30 - 92) * Math.PI) / 180;
    const color = theme.levels[(m % 4) + 1];

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius * (0.6 + ((m % 5) * 0.08)), startA, endA);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = theme.bg;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Rotating Radar Scanner
  const sweepAngle = (t * 0.8) % (Math.PI * 2);
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
  ctx.stroke();

  // Center Hub
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
  _data: NormalizedDeveloperIdentity,
  theme: any
) {
  const midY = h / 2;
  const startX = 40;
  const endX = w - 40;

  // Background Oscilloscope Grid
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

  // Waveform
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(startX, midY);

  const step = (endX - startX) / 50;
  for (let i = 0; i <= 50; i++) {
    const x = startX + i * step;
    const progress = (i / 50 + t * 0.3) % 1;
    let spike = 0;

    if (progress > 0.45 && progress < 0.55) {
      spike = Math.sin((progress - 0.45) * Math.PI * 10) * 80;
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
  theme: any
) {
  ctx.fillStyle = theme.cardBg;
  ctx.fillRect(30, 30, w - 60, h - 60);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, w - 60, h - 60);

  // Shell Title
  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`bash • ${data.username}@monoforge:~$ git log --stat`, 50, 60);

  // Commits
  const commits = [
    { hash: '7f2a9d1', msg: 'feat(engine): deploy 60fps vector animation runtime' },
    { hash: '4e8b11c', msg: 'perf(canvas): optimize isometric skyline rasterization' },
    { hash: '9c02d84', msg: 'chore(deps): synchronize Camo sanitizer invariants' },
  ];

  commits.forEach((c, idx) => {
    ctx.fillStyle = theme.secondary;
    ctx.fillText(`* ${c.hash}`, 50, 95 + idx * 30);
    ctx.fillStyle = theme.textPrimary;
    ctx.fillText(c.msg, 130, 95 + idx * 30);
  });

  // Prompt Cursor
  const cursorBlink = Math.floor(t * 2) % 2 === 0;
  if (cursorBlink) {
    ctx.fillStyle = theme.primary;
    ctx.fillRect(50, 200, 8, 14);
  }
}

function drawContributionSnake(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: any
) {
  const cellSize = 11;
  const gap = 3;
  const startX = (w - 52 * (cellSize + gap)) / 2;
  const startY = (h - 7 * (cellSize + gap)) / 2;

  // 52 x 7 Grid
  data.weeks.forEach((week, wi) => {
    week.days.forEach((day, di) => {
      const x = startX + wi * (cellSize + gap);
      const y = startY + di * (cellSize + gap);
      ctx.fillStyle = theme.levels[day.level];
      ctx.fillRect(x, y, cellSize, cellSize);
    });
  });

  // Snake Position
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
  theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const cx = w / 2;
  const cy = h / 2;

  // Central Sun
  ctx.fillStyle = theme.primary;
  ctx.beginPath();
  ctx.arc(cx, cy, 24, 0, Math.PI * 2);
  ctx.fill();

  let hoveredRepo: any = null;

  data.repositories.slice(0, 5).forEach((repo, idx) => {
    const rx = 65 + idx * 45;
    const ry = 30 + idx * 20;
    const angle = t * (0.4 / (idx + 1)) + idx * 1.3;
    const px = cx + Math.cos(angle) * rx;
    const py = cy + Math.sin(angle) * ry;

    // Orbit ellipse
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Planet
    ctx.fillStyle = repo.color;
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fill();

    if (mouse.active && Math.hypot(mouse.x - px, mouse.y - py) < 16) {
      hoveredRepo = repo;
    }
  });

  if (hoveredRepo) {
    onHover?.(`🪐 ${hoveredRepo.name}: ${hoveredRepo.stars}★ (${hoveredRepo.language})`);
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
  theme: any
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

    const lang = data.languages[i % data.languages.length];
    ctx.strokeStyle = lang.color;
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
}

function drawSkillConstellation(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
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

  // Lines
  const map = new Map(nodes.map(n => [n.id, n]));
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1;

  nodes.forEach(n => {
    n.connectedTo.forEach(targetId => {
      const target = map.get(targetId);
      if (target) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    });
  });

  // Nodes
  let hoveredSkill: any = null;
  nodes.forEach(n => {
    ctx.fillStyle = theme.primary;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.level * 1.8 + 2, 0, Math.PI * 2);
    ctx.fill();

    if (mouse.active && Math.hypot(mouse.x - n.x, mouse.y - n.y) < 14) {
      hoveredSkill = n;
    }
  });

  if (hoveredSkill) {
    onHover?.(`✨ Skill: ${hoveredSkill.name} (Level ${hoveredSkill.level}/5, ${hoveredSkill.category})`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}
