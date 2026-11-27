/**
 * MonoForge — Pure Time-Based 6-Act GitHub Contribution Story Engine
 *
 * Every animation is a pure function `draw(ctx, w, h, t, data, state)` where `t`
 * is milliseconds elapsed since start (`t = Infinity` renders the finished frame
 * for `prefers-reduced-motion`). No external libraries required.
 */

import { ContributionDayData, NormalizedDeveloperIdentity } from './types';

export const GITHUB_GREENS: readonly [string, string, string, string, string] = [
  '#ebedf0',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
];

export const GITHUB_GREENS_DARK: readonly [string, string, string, string, string] = [
  '#1e293b',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
];

export interface StoryHoverCell {
  index: number;
  date: string;
  count: number;
  level: number;
  x: number;
  y: number;
}

export interface StoryDrawOptions {
  darkMode?: boolean;
  pointer?: { x: number; y: number; active: boolean };
  onHoverCell?: (cell: StoryHoverCell | null) => void;
}

export function clamp01(v: number): number {
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

export function easeBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = clamp01(t);
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function easeOutCubic(t: number): number {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

export function mixHex(hexA: string, hexB: string, t: number): string {
  const p = clamp01(t);
  const parse = (hex: string) => {
    const clean = hex.replace('#', '');
    const full =
      clean.length === 3
        ? clean
            .split('')
            .map((c) => c + c)
            .join('')
        : clean;
    const n = Number.parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [r1, g1, b1] = parse(hexA);
  const [r2, g2, b2] = parse(hexB);
  const r = Math.round(r1 + (r2 - r1) * p);
  const g = Math.round(g1 + (g2 - g1) * p);
  const b = Math.round(b1 + (b2 - b1) * p);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Normalizes any contribution days list into a 371-day (53×7) array, Sunday first,
 * and computes streak, best day, and scaling factor so running count-ups land
 * exactly on GitHub's `totalContributions`.
 */
export function prepareStoryCalendar(data: NormalizedDeveloperIdentity) {
  const rawDays = data.days.length > 0 ? data.days : [];
  const days: ContributionDayData[] = rawDays.slice(-371);
  const daySum = days.reduce((acc, d) => acc + d.count, 0);
  const total = Math.max(data.totalContributions, daySum);
  const scale = daySum > 0 ? total / daySum : 1;

  // Weekly totals (up to 53 weeks)
  const weekCount = Math.max(1, Math.ceil(days.length / 7));
  const weeklyTotals: number[] = [];
  for (let w = 0; w < weekCount; w++) {
    let sum = 0;
    for (let r = 0; r < 7; r++) {
      const d = days[w * 7 + r];
      if (d) sum += d.count;
    }
    weeklyTotals.push(sum);
  }

  // Best day
  let bestIdx = 0;
  for (let i = 1; i < days.length; i++) {
    if (days[i].count > days[bestIdx].count) bestIdx = i;
  }

  // Current streak: walk back from last day (skip today if 0)
  let streakEnd = days.length - 1;
  if (streakEnd >= 0 && days[streakEnd].count === 0) {
    streakEnd -= 1;
  }
  let streakStart = streakEnd + 1;
  while (streakStart - 1 >= 0 && days[streakStart - 1].count > 0) {
    streakStart -= 1;
  }
  const streakLength = streakEnd >= streakStart ? streakEnd - streakStart + 1 : 0;
  const lastDayOffIdx = streakStart > 0 && streakLength > 0 ? streakStart - 1 : -1;

  return {
    days,
    weekCount,
    weeklyTotals,
    daySum,
    total,
    scale,
    bestIdx,
    bestDay: days[bestIdx] ?? null,
    streakStart,
    streakEnd,
    streakLength,
    lastDayOffIdx,
  };
}

function getRamp(darkMode = true) {
  return darkMode ? GITHUB_GREENS_DARK : GITHUB_GREENS;
}

/**
 * 1. The Grid — Diagonal wave drop-in with overshoot, green flash settling
 *    to true level shade, scaled running count-up, and hover cell inspection.
 */
export function drawStoryGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  options: StoryDrawOptions = {},
): void {
  const dark = options.darkMode ?? true;
  const ramp = getRamp(dark);
  const cal = prepareStoryCalendar(data);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dark ? '#0f172a' : '#fafbfc';
  ctx.fillRect(0, 0, w, h);

  const padX = 24;
  const topHeader = 54;
  const padBottom = 28;
  const cols = cal.weekCount;
  const rows = 7;

  const availW = Math.max(120, w - padX * 2);
  const availH = Math.max(70, h - topHeader - padBottom);
  const step = Math.min(availW / cols, availH / rows);
  const cell = Math.max(2, step - Math.max(1.5, step * 0.22));
  const gridW = cols * step;
  const gridH = rows * step;
  const startX = (w - gridW) / 2;
  const startY = topHeader + (availH - gridH) / 2;

  let landedSum = 0;
  let hovered: StoryHoverCell | null = null;
  const flashGreen = '#39d353';

  for (let i = 0; i < cal.days.length; i++) {
    const col = Math.floor(i / 7);
    const row = i % 7;
    const day = cal.days[i];
    const delay = (col + row * 1.6) * 22;
    const p = t === Infinity ? 1 : clamp01((t - delay) / 560);
    if (p <= 0) continue;

    landedSum += day.count * p;

    const cx = startX + col * step + cell / 2;
    const cy = startY + row * step + cell / 2;
    const s = p < 1 ? cell * (0.2 + 0.8 * easeBack(p)) : cell;
    const targetColor = ramp[day.level] ?? ramp[0];
    ctx.fillStyle = p < 1 && day.level > 0 ? mixHex(flashGreen, targetColor, p) : targetColor;

    const x0 = cx - s / 2;
    const y0 = cy - s / 2;
    ctx.beginPath();
    ctx.roundRect(x0, y0, s, s, Math.max(1, s * 0.2));
    ctx.fill();

    if (
      options.pointer?.active &&
      options.pointer.x >= startX + col * step &&
      options.pointer.x <= startX + (col + 1) * step &&
      options.pointer.y >= startY + row * step &&
      options.pointer.y <= startY + (row + 1) * step
    ) {
      hovered = {
        index: i,
        date: day.date,
        count: day.count,
        level: day.level,
        x: cx,
        y: y0,
      };
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x0 - 1, y0 - 1, s + 2, s + 2);
    }
  }

  options.onHoverCell?.(hovered);

  const displayCount =
    t === Infinity ? cal.total : Math.min(cal.total, Math.round(landedSum * cal.scale));

  // Header counter
  ctx.fillStyle = dark ? '#f8fafc' : '#0f172a';
  ctx.font = '700 22px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(displayCount.toLocaleString(), padX, 34);

  ctx.fillStyle = dark ? '#94a3b8' : '#475569';
  ctx.font = '500 11px ui-sans-serif, system-ui, sans-serif';
  ctx.fillText('contributions in the last year', padX + ctx.measureText(displayCount.toLocaleString()).width + 10, 33);

  // Less -> More legend
  const legY = h - 14;
  ctx.font = '500 10px ui-monospace, monospace';
  ctx.fillStyle = dark ? '#64748b' : '#64748b';
  ctx.textAlign = 'right';
  ctx.fillText('More', w - padX, legY + 3);
  for (let lv = 4; lv >= 0; lv--) {
    ctx.fillStyle = ramp[lv];
    ctx.beginPath();
    ctx.roundRect(w - padX - 34 - (4 - lv) * 13, legY - 6, 9, 9, 2);
    ctx.fill();
  }
  ctx.fillText('Less', w - padX - 96, legY + 3);
}

/**
 * 2. Skyline — 3D oblique projection boxes (front, lit top, shaded side),
 *    drawn back-to-front, height = sqrt(count), rising wave, leader line to best day.
 */
export function drawStorySkyline(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  options: StoryDrawOptions = {},
): void {
  const dark = options.darkMode ?? true;
  const ramp = getRamp(dark);
  const cal = prepareStoryCalendar(data);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dark ? '#0f172a' : '#fafbfc';
  ctx.fillRect(0, 0, w, h);

  const cols = cal.weekCount;
  const rows = 7;
  const padX = 28;
  const baseBottom = h - 26;
  const maxBarH = Math.max(36, h * 0.42);
  const maxSqrt = Math.max(1, Math.sqrt(cal.bestDay?.count || 1));

  const cellW = Math.max(3.5, Math.min(11, (w - padX * 2 - rows * 6) / cols));
  const dx = 4;
  const dy = -3;
  const totalWidth = cols * cellW + rows * dx;
  const originX = (w - totalWidth) / 2;

  let bestTopX = 0;
  let bestTopY = 0;
  let bestProgress = 0;

  // Draw back-to-front (row 0 = back, row 6 = front)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = col * 7 + row;
      const day = cal.days[idx];
      if (!day) continue;

      // Wave from front-left to back-right
      const delay = (col * 18) + ((rows - 1 - row) * 24);
      const p = t === Infinity ? 1 : clamp01((t - delay) / 620);
      const eased = easeOutCubic(p);

      const rawH = day.count > 0 ? (Math.sqrt(day.count) / maxSqrt) * maxBarH : 2;
      const barH = Math.max(2, rawH * eased);

      const bx = originX + col * cellW + (rows - 1 - row) * dx;
      const by = baseBottom - (rows - 1 - row) * Math.abs(dy) * 1.4;

      const baseColor = ramp[day.level] ?? ramp[0];
      const frontColor = baseColor;
      const topColor = mixHex(baseColor, '#ffffff', dark ? 0.25 : 0.35);
      const sideColor = mixHex(baseColor, '#0f172a', 0.35);

      const bw = Math.max(2, cellW - 1.5);

      // Front face
      ctx.fillStyle = frontColor;
      ctx.fillRect(bx, by - barH, bw, barH);

      // Top face
      ctx.fillStyle = topColor;
      ctx.beginPath();
      ctx.moveTo(bx, by - barH);
      ctx.lineTo(bx + dx, by - barH + dy);
      ctx.lineTo(bx + bw + dx, by - barH + dy);
      ctx.lineTo(bx + bw, by - barH);
      ctx.closePath();
      ctx.fill();

      // Right shaded face
      ctx.fillStyle = sideColor;
      ctx.beginPath();
      ctx.moveTo(bx + bw, by - barH);
      ctx.lineTo(bx + bw + dx, by - barH + dy);
      ctx.lineTo(bx + bw + dx, by + dy);
      ctx.lineTo(bx + bw, by);
      ctx.closePath();
      ctx.fill();

      if (idx === cal.bestIdx) {
        bestTopX = bx + bw / 2 + dx * 0.5;
        bestTopY = by - barH + dy;
        bestProgress = p;
      }
    }
  }

  // Leader line to best day
  if (cal.bestDay && cal.bestDay.count > 0 && bestProgress > 0.85) {
    const lp = t === Infinity ? 1 : clamp01((bestProgress - 0.85) / 0.15);
    ctx.save();
    ctx.globalAlpha = lp;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(bestTopX, bestTopY - 2);
    const labelY = Math.max(26, bestTopY - 26);
    const alignLeft = bestTopX > w * 0.65;
    const labelX = alignLeft ? bestTopX - 24 : bestTopX + 24;
    ctx.lineTo(labelX, labelY);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(bestTopX, bestTopY - 2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '700 11px ui-monospace, monospace';
    ctx.textAlign = alignLeft ? 'right' : 'left';
    ctx.fillText(
      `Peak: ${cal.bestDay.count} (${cal.bestDay.date})`,
      alignLeft ? labelX - 4 : labelX + 4,
      labelY + 3,
    );
    ctx.restore();
  }
}

/**
 * 3. Week by Week (Pulse) — Weekly totals draw as a sparkline with a riding dot,
 *    then each week pours down from its point on the line into its 7 daily cells.
 */
export function drawStoryPulse(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  options: StoryDrawOptions = {},
): void {
  const dark = options.darkMode ?? true;
  const ramp = getRamp(dark);
  const cal = prepareStoryCalendar(data);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dark ? '#0f172a' : '#fafbfc';
  ctx.fillRect(0, 0, w, h);

  const padX = 24;
  const lineTop = 28;
  const lineBottom = Math.round(h * 0.36);
  const gridTop = lineBottom + 16;
  const gridBottom = h - 18;

  const cols = cal.weekCount;
  const maxWeek = Math.max(1, ...cal.weeklyTotals);
  const stepX = (w - padX * 2) / Math.max(1, cols - 1);

  const lineDur = 1200;
  const lineP = t === Infinity ? 1 : clamp01(t / lineDur);
  const visibleWeeks = Math.max(1, Math.floor(lineP * (cols - 1)) + 1);

  // Sparkline points
  const pts = cal.weeklyTotals.map((wt, wi) => ({
    x: padX + wi * stepX,
    y: lineBottom - (wt / maxWeek) * (lineBottom - lineTop),
  }));

  // Draw sparkline (fades slightly once grid pours down)
  const pourStart = 700;
  const pourGlobalP = t === Infinity ? 1 : clamp01((t - pourStart) / 1400);
  ctx.save();
  ctx.globalAlpha = pourGlobalP > 0 ? 1 - pourGlobalP * 0.65 : 1;
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < visibleWeeks && i < pts.length; i++) {
    if (i === 0) ctx.moveTo(pts[i].x, pts[i].y);
    else ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.stroke();

  // Riding dot while line draws
  if (lineP < 1 && pts.length > 0) {
    const exactIdx = lineP * (pts.length - 1);
    const i0 = Math.floor(exactIdx);
    const i1 = Math.min(pts.length - 1, i0 + 1);
    const frac = exactIdx - i0;
    const rx = pts[i0].x + (pts[i1].x - pts[i0].x) * frac;
    const ry = pts[i0].y + (pts[i1].y - pts[i0].y) * frac;
    ctx.fillStyle = '#FFE600';
    ctx.beginPath();
    ctx.arc(rx, ry, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Pour down each week's 7 days
  const cellStepY = Math.max(6, (gridBottom - gridTop) / 7);
  const cellSize = Math.max(2.5, Math.min(stepX - 1.5, cellStepY - 2));

  for (let col = 0; col < cols; col++) {
    const weekDelay = pourStart + col * 18;
    const wp = t === Infinity ? 1 : clamp01((t - weekDelay) / 480);
    if (wp <= 0) continue;

    const origin = pts[col];
    for (let row = 0; row < 7; row++) {
      const day = cal.days[col * 7 + row];
      if (!day) continue;
      const targetX = origin.x - cellSize / 2;
      const targetY = gridTop + row * cellStepY;
      const cy = origin.y + (targetY - origin.y) * easeOutCubic(wp);

      ctx.fillStyle = ramp[day.level] ?? ramp[0];
      ctx.globalAlpha = wp;
      ctx.beginPath();
      ctx.roundRect(targetX, cy, cellSize, cellSize, 1.5);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

/**
 * 4. Round the Year (Ring) — 7 concentric rings for weekdays, 1 spoke per week,
 *    sweeping hand revealing curved arc tiles.
 */
export function drawStoryRing(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  options: StoryDrawOptions = {},
): void {
  const dark = options.darkMode ?? true;
  const ramp = getRamp(dark);
  const cal = prepareStoryCalendar(data);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dark ? '#0f172a' : '#fafbfc';
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.43;
  const minR = maxR * 0.28;
  const ringStep = (maxR - minR) / 7;
  const cols = cal.weekCount;
  const angleStep = (Math.PI * 2) / cols;
  const startAngle = -Math.PI / 2;

  const sweepDur = 1800;
  const sweepP = t === Infinity ? 1 : clamp01(t / sweepDur);
  const handAngle = startAngle + sweepP * Math.PI * 2;

  for (let col = 0; col < cols; col++) {
    const weekP = col / cols;
    if (sweepP < weekP && t !== Infinity) continue;

    const a0 = startAngle + col * angleStep + 0.008;
    const a1 = startAngle + (col + 1) * angleStep - 0.008;

    for (let row = 0; row < 7; row++) {
      const day = cal.days[col * 7 + row];
      if (!day) continue;
      const inner = minR + row * ringStep + 1;
      const outer = minR + (row + 1) * ringStep - 1.5;

      ctx.fillStyle = ramp[day.level] ?? ramp[0];
      ctx.beginPath();
      ctx.arc(cx, cy, outer, a0, a1);
      ctx.arc(cx, cy, inner, a1, a0, true);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Sweeping hand while animating
  if (sweepP < 1) {
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(handAngle) * (minR - 4), cy + Math.sin(handAngle) * (minR - 4));
    ctx.lineTo(cx + Math.cos(handAngle) * (maxR + 4), cy + Math.sin(handAngle) * (maxR + 4));
    ctx.stroke();
  }

  // Center summary
  ctx.fillStyle = dark ? '#f8fafc' : '#0f172a';
  ctx.font = '700 15px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(cal.total.toLocaleString(), cx, cy + 2);
  ctx.fillStyle = dark ? '#94a3b8' : '#475569';
  ctx.font = '500 9px ui-sans-serif, system-ui, sans-serif';
  ctx.fillText('YEARLY', cx, cy + 14);
}

/**
 * 5. The Streak — Everything before the streak fades back; a dot runs through
 *    every day of the current streak with a trail; counter ticks Day 1..N;
 *    last day off gets a small red cross.
 */
export function drawStoryStreak(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  options: StoryDrawOptions = {},
): void {
  const dark = options.darkMode ?? true;
  const ramp = getRamp(dark);
  const cal = prepareStoryCalendar(data);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dark ? '#0f172a' : '#fafbfc';
  ctx.fillRect(0, 0, w, h);

  const padX = 24;
  const topHeader = 50;
  const padBottom = 20;
  const cols = cal.weekCount;
  const rows = 7;
  const availW = Math.max(120, w - padX * 2);
  const availH = Math.max(70, h - topHeader - padBottom);
  const step = Math.min(availW / cols, availH / rows);
  const cell = Math.max(2, step - Math.max(1.5, step * 0.22));
  const startX = (w - cols * step) / 2;
  const startY = topHeader + (availH - rows * step) / 2;

  const streakLen = Math.max(1, cal.streakLength);
  const dur = Math.max(900, Math.min(2600, streakLen * 18));
  const p = t === Infinity ? 1 : clamp01(t / dur);
  const activeStep = Math.floor(p * streakLen);
  const currentDay = Math.min(cal.streakLength, activeStep);

  for (let i = 0; i < cal.days.length; i++) {
    const col = Math.floor(i / 7);
    const row = i % 7;
    const day = cal.days[i];
    const x = startX + col * step;
    const y = startY + row * step;

    const inStreak = cal.streakLength > 0 && i >= cal.streakStart && i <= cal.streakEnd;
    const streakIdx = inStreak ? i - cal.streakStart : -1;
    const lit = inStreak && streakIdx <= activeStep;

    ctx.save();
    ctx.globalAlpha = lit ? 1 : 0.2;
    ctx.fillStyle = ramp[day.level] ?? ramp[0];
    ctx.beginPath();
    ctx.roundRect(x, y, cell, cell, Math.max(1, cell * 0.2));
    ctx.fill();
    ctx.restore();

    // Small red cross on the last day off
    if (i === cal.lastDayOffIdx) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + 1.5, y + 1.5);
      ctx.lineTo(x + cell - 1.5, y + cell - 1.5);
      ctx.moveTo(x + cell - 1.5, y + 1.5);
      ctx.lineTo(x + 1.5, y + cell - 1.5);
      ctx.stroke();
    }
  }

  // Running dot + fading trail
  if (cal.streakLength > 0 && p < 1) {
    const headIdx = Math.min(cal.streakEnd, cal.streakStart + activeStep);
    const trailLen = 8;
    for (let k = trailLen; k >= 0; k--) {
      const ti = headIdx - k;
      if (ti < cal.streakStart) continue;
      const col = Math.floor(ti / 7);
      const row = ti % 7;
      const cx = startX + col * step + cell / 2;
      const cy = startY + row * step + cell / 2;
      ctx.save();
      ctx.globalAlpha = 1 - k / (trailLen + 1);
      ctx.fillStyle = k === 0 ? '#FFE600' : '#10b981';
      ctx.beginPath();
      ctx.arc(cx, cy, k === 0 ? Math.max(3, cell * 0.55) : Math.max(1.5, cell * 0.32), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Counter header
  ctx.fillStyle = dark ? '#f8fafc' : '#0f172a';
  ctx.font = '700 20px ui-monospace, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(cal.streakLength > 0 ? `Day ${currentDay}` : '0 days', padX, 32);

  ctx.fillStyle = dark ? '#94a3b8' : '#475569';
  ctx.font = '500 11px ui-sans-serif, system-ui, sans-serif';
  ctx.fillText(
    cal.streakLength > 0 ? `current streak (${cal.streakLength} days)` : 'no active streak',
    padX + 94,
    31,
  );
}

const ASCII_GLYPHS = ['.', ':', '+', '#', '@'] as const;
const SCRAMBLE_POOL = '.:+*#%@01/\\';

/**
 * 6. In the Terminal — Typed command, glyphs scramble and settle into
 *    `. : + # @` by level (0..4), and a summary line types out at the end.
 */
export function drawStoryTerminal(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  data: NormalizedDeveloperIdentity,
  options: StoryDrawOptions = {},
): void {
  const dark = options.darkMode ?? true;
  const cal = prepareStoryCalendar(data);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dark ? '#0f172a' : '#1e293b';
  ctx.fillRect(0, 0, w, h);

  const padX = 20;
  const cmd = `$ gh contrib --user ${data.username || 'developer'} --year`;
  const cmdDur = 650;
  const cmdP = t === Infinity ? 1 : clamp01(t / cmdDur);
  const cmdChars = Math.floor(cmdP * cmd.length);

  ctx.fillStyle = '#10b981';
  ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(cmd.slice(0, cmdChars) + (cmdP < 1 ? '_' : ''), padX, 26);

  const cols = cal.weekCount;
  const rows = 7;
  const gridTop = 42;
  const gridBottom = h - 30;
  const stepX = (w - padX * 2) / cols;
  const stepY = (gridBottom - gridTop) / rows;
  const fontSize = Math.max(8, Math.min(12, Math.floor(Math.min(stepX, stepY))));

  ctx.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const colors = ['#334155', '#6ee7b7', '#34d399', '#10b981', '#FFE600'];
  const scrambleStart = cmdDur * 0.7;

  for (let i = 0; i < cal.days.length; i++) {
    const col = Math.floor(i / 7);
    const row = i % 7;
    const day = cal.days[i];
    const settleDelay = scrambleStart + col * 24 + row * 16;
    const p = t === Infinity ? 1 : clamp01((t - settleDelay) / 380);
    if (p <= 0) continue;

    const gx = padX + col * stepX + stepX / 2;
    const gy = gridTop + row * stepY + stepY / 2;

    if (p < 1) {
      const tick = Math.floor((t + i * 37) / 60);
      const ch = SCRAMBLE_POOL[tick % SCRAMBLE_POOL.length];
      ctx.fillStyle = '#64748b';
      ctx.fillText(ch, gx, gy);
    } else {
      ctx.fillStyle = colors[day.level] ?? colors[0];
      ctx.fillText(ASCII_GLYPHS[day.level] ?? '.', gx, gy);
    }
  }

  // Summary line types out at the end
  const summaryStart = scrambleStart + cols * 24 + 280;
  const summary = `> ${cal.total.toLocaleString()} commits | ${cal.streakLength}d streak | peak ${cal.bestDay?.count ?? 0}/day`;
  const sumP = t === Infinity ? 1 : clamp01((t - summaryStart) / 650);
  if (sumP > 0) {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(summary.slice(0, Math.floor(sumP * summary.length)), padX, h - 10);
  }
}
