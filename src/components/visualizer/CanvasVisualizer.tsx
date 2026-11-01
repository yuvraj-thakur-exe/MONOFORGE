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

function drawEngineeringRadar(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  _data: NormalizedDeveloperIdentity,
  theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const cx = w / 2;
  const cy = h / 2 + 10;
  const radius = Math.min(w, h) * 0.32;

  const axes = [
    { label: 'Frontend', val: 0.92, detail: 'React / Next.js / TypeScript' },
    { label: 'Backend', val: 0.88, detail: 'Node.js / Python / REST & GraphQL' },
    { label: 'Systems', val: 0.76, detail: 'Linux / Rust / Memory & Performance' },
    { label: 'DevOps', val: 0.82, detail: 'Docker / CI/CD / Cloud Architecture' },
    { label: 'AI & Data', val: 0.72, detail: 'PyTorch / LLMs / Vector Embeddings' },
    { label: 'Tooling', val: 0.95, detail: 'Git / Antigravity / Testing / Build Tools' },
  ];
  const numAxes = axes.length;

  // Background Concentric Rings (Web)
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

  // Axis Spokes & Labels
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

  // Radar Rotating Sonar Beam
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

  // Skill Value Polygon with Breathing Motion
  const breath = Math.sin(t * 2) * 3;
  ctx.beginPath();
  let hoveredAxis: any = null;

  axes.forEach((axis, i) => {
    const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
    const r = (axis.val * radius) + breath;
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

  // Vertex Markers
  axes.forEach((axis, i) => {
    const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
    const r = (axis.val * radius) + breath;
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
    onHover?.(`📊 ${hoveredAxis.label}: ${Math.round(hoveredAxis.val * 100)}% Proficiency — ${hoveredAxis.detail}`);
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
  theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  // CAD Grid lines
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

  // Header Title
  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`ARCHITECTURAL SCHEMATIC // ${data.username.toUpperCase()}`, 28, 30);
  ctx.fillStyle = theme.textMuted;
  ctx.font = '10px monospace';
  ctx.fillText(`Kernel Modules: ${data.repositories.length} | Commits: ${data.totalContributions} | Streak: ${data.currentStreak}D`, 28, 46);

  // Central Hub
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
  ctx.fillText('CORE ENGINE', hubX, hubY - 6);
  ctx.fillStyle = theme.accent;
  ctx.font = 'bold 10px monospace';
  ctx.fillText(`${data.totalContributions} commits`, hubX, hubY + 12);

  // Repository Module Cards on the right
  const repos = data.repositories.slice(0, 3);
  let hoveredRepo: any = null;

  repos.forEach((repo, idx) => {
    const rx = w * 0.54;
    const ry = 80 + idx * 105;
    const rw = w * 0.40;
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

    const packetProgress = ((t * 0.8 + idx * 0.33) % 1);
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
    ctx.fillText(repo.description.substring(0, 36) + '...', rx + 16, ry + 46);

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
    ctx.fillText(`${repo.stars} ★`, rx + rw - 16, ry + 28);
  });

  if (hoveredRepo) {
    onHover?.(`📦 Module: ${hoveredRepo.name} (${hoveredRepo.language}) • ${hoveredRepo.stars} Stars • Score: ${hoveredRepo.activityScore}/100`);
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
  theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  const languages = data.languages.length > 0 ? data.languages : [
    { name: 'TypeScript', percentage: 48, color: '#3178c6', bytes: 120000 },
    { name: 'JavaScript', percentage: 22, color: '#f7df1e', bytes: 55000 },
    { name: 'Python', percentage: 18, color: '#3776ab', bytes: 45000 },
    { name: 'Rust', percentage: 8, color: '#dea584', bytes: 20000 },
    { name: 'CSS/HTML', percentage: 4, color: '#e34c26', bytes: 10000 },
  ];

  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`LANGUAGE RIVER // HARMONIC STREAM GRAPH`, 36, 32);
  ctx.fillStyle = theme.textMuted;
  ctx.font = '10px monospace';
  ctx.fillText(`${data.username} • Polyglot Flow • ${languages.length} Active Stacks`, 36, 48);

  const riverTop = 90;
  const riverH = h * 0.55;
  let currentY = riverTop;

  let hoveredLang: any = null;

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
    onHover?.(`🌊 ${hoveredLang.name}: ${hoveredLang.percentage}% share • ${hoveredLang.bytes ? hoveredLang.bytes.toLocaleString() : 'N/A'} bytes`);
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
  theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`RELEASE TIMELINE // TRANSIT ROADMAP`, 36, 32);
  ctx.fillStyle = theme.textMuted;
  ctx.font = '10px monospace';
  ctx.fillText(`${data.username} • Epoch Pipeline • ${data.totalContributions} Verified Commits`, 36, 48);

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

  const milestones = [
    { tag: 'v1.0.0', title: 'Architecture & Engine', status: 'RELEASED', commits: 142, date: 'Q1' },
    { tag: 'v1.5.0', title: 'Telemetry & Git Sync', status: 'VERIFIED', commits: 284, date: 'Q2' },
    { tag: 'v2.0.0', title: 'Camo Vector Studio', status: 'STABLE', commits: 512, date: 'Q3' },
    { tag: 'v3.0.0', title: 'Developer Identity', status: 'PRODUCTION', commits: data.totalContributions, date: 'CURRENT' },
  ];

  let hoveredMilestone: any = null;

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
    onHover?.(`🚀 Release: ${hoveredMilestone.tag} - ${hoveredMilestone.title} (${hoveredMilestone.status}) • ${hoveredMilestone.commits} commits`);
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
  _theme: any,
  mouse: { x: number; y: number; active: boolean },
  onHover?: (info: string | null) => void
) {
  ctx.fillStyle = '#0a0714';
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

  ctx.fillStyle = '#0a0714';
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
  ctx.fillText('Outrun Telemetry • Grade A+ Contributor', 28, 44);

  const cards = [
    { label: 'TOTAL COMMITS', val: data.totalContributions.toLocaleString(), color: '#ff007f', icon: '★' },
    { label: 'CURRENT STREAK', val: `${data.currentStreak}D`, color: '#ffe600', icon: '⚡' },
    { label: 'LONGEST STREAK', val: `${data.maxStreak}D`, color: '#00f0ff', icon: '🔥' },
  ];

  let hoveredCard: any = null;
  const cw = 140;
  const ch = 52;

  cards.forEach((card, idx) => {
    const cx = 28 + idx * (cw + 12);
    const cy = 60;
    const isHovered = mouse.active && mouse.x >= cx && mouse.x <= cx + cw && mouse.y >= cy && mouse.y <= cy + ch;
    if (isHovered) hoveredCard = card;

    ctx.fillStyle = '#151024';
    ctx.strokeStyle = isHovered ? '#ffffff' : card.color;
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cw, ch, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = card.color;
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${card.icon} ${card.val}`, cx + 10, cy + 24);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    ctx.fillText(card.label, cx + 12, cy + 40);
  });

  if (hoveredCard) {
    onHover?.(`⚡ ${hoveredCard.label}: ${hoveredCard.val} Verified Telemetry`);
  } else if (mouse.active) {
    onHover?.(null);
  }
}
