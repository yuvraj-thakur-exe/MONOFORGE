import {
  NormalizedDeveloperIdentity,
  VisualizationTheme,
  VisualizationConfig,
  VisualizationId,
} from './types';
import { VISUALIZATION_THEMES } from './themes';

export interface BaseSvgOptions {
  theme?: VisualizationTheme;
  title?: string;
  width?: number;
  height?: number;
}

/**
 * Escapes text for XML/SVG safety
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/* =========================================================================
   01. COMMIT CITY SVG GENERATOR (3D ISOMETRIC SKYLINE)
   ========================================================================= */
export function generateCommitCitySvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'emerald'];
  const width = options.width || 880;
  const height = options.height || 420;

  // Use the last 24 weeks (half year) for an aesthetic isometric footprint
  const recentWeeks = data.weeks.slice(-24);
  const cubeW = 16;
  const cubeH = 8;
  const originX = width / 2;
  const originY = 160;

  let buildingsSvg = '';

  recentWeeks.forEach((week, wIdx) => {
    week.days.forEach((day, dIdx) => {
      // Isometric projection: isoX = (x - y) * (cubeW / 2), isoY = (x + y) * (cubeH / 2)
      const x = wIdx - 12;
      const y = dIdx - 3.5;
      const isoX = originX + (x - y) * (cubeW * 0.95);
      const isoY = originY + (x + y) * (cubeH * 0.95);

      // Building height scaled by commit count
      const bHeight = day.count > 0 ? Math.min(95, day.count * 7 + 8) : 3;
      const levelColor = theme.levels[day.level];
      const roofColor = day.count > 0 ? theme.primary : theme.levels[0];
      const sideColor = day.count > 0 ? theme.secondary : theme.border;

      buildingsSvg += `
        <g class="city-building" transform="translate(${isoX.toFixed(1)}, ${isoY.toFixed(1)})">
          <!-- Left Wall -->
          <path d="M 0 0 L 0 ${-bHeight} L ${cubeW / 2} ${-bHeight + cubeH / 2} L ${cubeW / 2} ${cubeH / 2} Z"
                fill="${levelColor}" opacity="0.85" stroke="${theme.border}" stroke-width="0.5" />
          <!-- Right Wall -->
          <path d="M ${cubeW / 2} ${cubeH / 2} L ${cubeW / 2} ${-bHeight + cubeH / 2} L ${cubeW} ${-bHeight} L ${cubeW} 0 Z"
                fill="${sideColor}" opacity="0.65" stroke="${theme.border}" stroke-width="0.5" />
          <!-- Roof Face -->
          <path d="M 0 ${-bHeight} L ${cubeW / 2} ${-bHeight - cubeH / 2} L ${cubeW} ${-bHeight} L ${cubeW / 2} ${-bHeight + cubeH / 2} Z"
                fill="${roofColor}" stroke="${theme.primary}" stroke-width="0.75">
            ${day.level >= 3 ? `<animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />` : ''}
          </path>
        </g>
      `;
    });
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="city-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.bg}" />
      <stop offset="100%" stop-color="${theme.cardBg}" />
    </linearGradient>
    <filter id="city-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    @media (prefers-reduced-motion: reduce) {
      .city-building animate { display: none; }
    }
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="url(#city-bg)" rx="16" stroke="${theme.border}" stroke-width="1" />
  
  <!-- Header HUD -->
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" filter="url(#city-glow)" />
    <text x="22" y="10" class="hud-title">COMMIT CITY // 3D ISOMETRIC DISTRICTS</text>
    <text x="22" y="26" class="hud-text">Architectural Skyline &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">ANNUAL CONTRIBUTIONS</text>
    <text x="0" y="26" class="hud-stat">${data.totalContributions.toLocaleString()} COMMITS &bull; ${data.currentStreak}D STREAK</text>
  </g>

  <!-- Ground Grid Perspective Lines -->
  <g stroke="${theme.border}" stroke-width="0.5" opacity="0.3">
    <line x1="80" y1="360" x2="${width - 80}" y2="360" />
    <line x1="80" y1="380" x2="${width - 80}" y2="380" />
  </g>

  <!-- 3D City Buildings -->
  <g id="city-buildings">
    ${buildingsSvg}
  </g>

  <!-- Footer District Legend -->
  <g transform="translate(24, ${height - 24})">
    <text x="0" y="0" class="hud-text">LEGEND: Low Activity</text>
    <rect x="130" y="-8" width="10" height="10" rx="2" fill="${theme.levels[1]}" />
    <rect x="145" y="-8" width="10" height="10" rx="2" fill="${theme.levels[2]}" />
    <rect x="160" y="-8" width="10" height="10" rx="2" fill="${theme.levels[3]}" />
    <rect x="175" y="-8" width="10" height="10" rx="2" fill="${theme.levels[4]}" />
    <text x="195" y="0" class="hud-text">High-Rise Skyscraper</text>
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   02. COMMIT RIVER SVG GENERATOR (FLUID STREAMLINES)
   ========================================================================= */
export function generateCommitRiverSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'ocean'];
  const width = options.width || 880;
  const height = options.height || 380;

  // Aggregate commits into 12 monthly river segments
  const monthlyCounts = Array(12).fill(0);
  data.days.forEach(d => {
    const month = new Date(d.date).getMonth();
    monthlyCounts[month] += d.count;
  });
  const maxMonth = Math.max(1, ...monthlyCounts);

  // Generate river path coordinates with smooth bezier curves
  const startY = height / 2;
  const points: { x: number; y: number; width: number }[] = [];
  const segW = (width - 120) / 11;

  monthlyCounts.forEach((count, i) => {
    const x = 60 + i * segW;
    const wave = Math.sin((i / 11) * Math.PI * 2) * 45;
    const y = startY + wave;
    const riverWidth = Math.max(8, (count / maxMonth) * 48);
    points.push({ x, y, width: riverWidth });
  });

  // Top and bottom banks of the river
  let topPath = `M ${points[0].x} ${(points[0].y - points[0].width / 2).toFixed(1)}`;
  let botPath = `L ${points[points.length - 1].x} ${(points[points.length - 1].y + points[points.length - 1].width / 2).toFixed(1)}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    topPath += ` Q ${prev.x + segW * 0.4} ${(prev.y - prev.width / 2).toFixed(1)}, ${cx} ${(curr.y - curr.width / 2).toFixed(1)}`;
  }

  for (let i = points.length - 2; i >= 0; i--) {
    const curr = points[i];
    const next = points[i + 1];
    const cx = (next.x + curr.x) / 2;
    botPath += ` Q ${next.x - segW * 0.4} ${(next.y + next.width / 2).toFixed(1)}, ${cx} ${(curr.y + curr.width / 2).toFixed(1)}`;
  }

  const riverBody = `${topPath} ${botPath} Z`;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="river-water" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.3" />
      <stop offset="50%" stop-color="${theme.secondary}" stop-opacity="0.9" />
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0.4" />
    </linearGradient>
    <filter id="river-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    @keyframes river-flow {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -120; }
    }
    .flow-line {
      stroke-dasharray: 12, 18;
      animation: river-flow 4s linear infinite;
    }
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.secondary}" filter="url(#river-glow)" />
    <text x="22" y="10" class="hud-title">COMMIT RIVER // ANNUAL FLOW DYNAMICS</text>
    <text x="22" y="26" class="hud-text">Luminous Rapids &amp; Velocity Streams &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">FLOW VELOCITY</text>
    <text x="0" y="26" class="hud-stat">${data.dailyAverage} COMMITS/DAY &bull; ${data.totalContributions} TOTAL</text>
  </g>

  <!-- River Stream Bed -->
  <path d="${riverBody}" fill="url(#river-water)" filter="url(#river-glow)" />

  <!-- Flow Wave Lines -->
  <path d="${topPath}" fill="none" stroke="${theme.primary}" stroke-width="2" class="flow-line" opacity="0.85" />
  <path d="${botPath}" fill="none" stroke="${theme.accent}" stroke-width="1.5" class="flow-line" opacity="0.65" />

  <!-- Month Milestone Markers -->
  ${points
    .map((p, idx) => {
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return `
        <g transform="translate(${p.x}, ${p.y})">
          <circle cx="0" cy="0" r="4" fill="${theme.textPrimary}" stroke="${theme.border}" stroke-width="1.5" />
          <text x="0" y="${p.y > startY ? 28 : -22}" text-anchor="middle" class="hud-text">${monthNames[idx]}</text>
        </g>
      `;
    })
    .join('')}
</svg>
  `.trim();
}

/* =========================================================================
   03. DEVELOPER YEAR CLOCK SVG GENERATOR (CIRCULAR HUD RADAR)
   ========================================================================= */
export function generateYearClockSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'amber'];
  const width = options.width || 880;
  const height = options.height || 420;
  const centerX = width / 2;
  const centerY = height / 2 + 15;
  const radius = 130;

  // Monthly breakdown (12 wedges)
  const monthlyCounts = Array(12).fill(0);
  data.days.forEach(d => {
    const month = new Date(d.date).getMonth();
    monthlyCounts[month] += d.count;
  });
  const maxMonthly = Math.max(1, ...monthlyCounts);

  let arcsSvg = '';
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  for (let m = 0; m < 12; m++) {
    const startAngle = (m * 30 - 90) * (Math.PI / 180);
    const endAngle = ((m + 1) * 30 - 92) * (Math.PI / 180);
    const midAngle = ((m + 0.5) * 30 - 90) * (Math.PI / 180);

    const intensity = monthlyCounts[m] / maxMonthly;
    const wedgeR = radius * (0.45 + intensity * 0.55);

    const x1 = centerX + Math.cos(startAngle) * wedgeR;
    const y1 = centerY + Math.sin(startAngle) * wedgeR;
    const x2 = centerX + Math.cos(endAngle) * wedgeR;
    const y2 = centerY + Math.sin(endAngle) * wedgeR;

    const labelX = centerX + Math.cos(midAngle) * (radius + 22);
    const labelY = centerY + Math.sin(midAngle) * (radius + 22);

    const color =
      intensity > 0.75
        ? theme.levels[4]
        : intensity > 0.5
        ? theme.levels[3]
        : intensity > 0.25
        ? theme.levels[2]
        : theme.levels[1];

    arcsSvg += `
      <path d="M ${centerX} ${centerY} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${wedgeR.toFixed(1)} ${wedgeR.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z"
            fill="${color}" opacity="0.8" stroke="${theme.cardBg}" stroke-width="1.5" />
      <text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" class="hud-text" font-weight="700">
        ${monthNames[m]}
      </text>
    `;
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    @keyframes radar-sweep {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .radar-beam {
      transform-origin: ${centerX}px ${centerY}px;
      animation: radar-sweep 8s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .radar-beam { animation: none; }
    }
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 10px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />

  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" filter="url(#radar-glow)" />
    <text x="22" y="10" class="hud-title">DEVELOPER YEAR CLOCK // 360° RADIAL CHRONOMETER</text>
    <text x="22" y="26" class="hud-text">Cadence &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">CADENCE CYCLE</text>
    <text x="0" y="26" class="hud-stat">${data.totalContributions} COMMITS &bull; 12 SECTORS</text>
  </g>

  <!-- Concentric Dial Rings -->
  <circle cx="${centerX}" cy="${centerY}" r="${radius * 0.35}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-dasharray="4, 4" opacity="0.6" />
  <circle cx="${centerX}" cy="${centerY}" r="${radius * 0.7}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-dasharray="4, 4" opacity="0.6" />
  <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="${theme.primary}" stroke-width="1.5" opacity="0.75" />

  <!-- 12 Monthly Sector Wedges -->
  <g id="clock-sectors">
    ${arcsSvg}
  </g>

  <!-- Rotating Radar Scanner Beam -->
  <g class="radar-beam">
    <line x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - radius}" stroke="${theme.secondary}" stroke-width="2" filter="url(#radar-glow)" />
  </g>

  <!-- Center Core Hub -->
  <circle cx="${centerX}" cy="${centerY}" r="32" fill="${theme.cardBg}" stroke="${theme.primary}" stroke-width="2" />
  <text x="${centerX}" y="${centerY - 4}" text-anchor="middle" class="hud-stat" font-size="12">${data.currentStreak}D</text>
  <text x="${centerX}" y="${centerY + 10}" text-anchor="middle" class="hud-text" font-size="8">STREAK</text>
</svg>
  `.trim();
}

/* =========================================================================
   04. CODING PULSE SVG GENERATOR (CARDIOGRAM OSCILLOSCOPE)
   ========================================================================= */
export function generateCodingPulseSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'matrix'];
  const width = options.width || 880;
  const height = options.height || 360;

  // Use weekly totals to create an EKG rhythm
  const weeklyCounts = data.weeks.map(w => w.days.reduce((sum, d) => sum + d.count, 0));
  const maxWeek = Math.max(1, ...weeklyCounts);

  const startX = 40;
  const endX = width - 40;
  const midY = height / 2 + 10;
  const stepX = (endX - startX) / (weeklyCounts.length - 1);

  let pulsePath = `M ${startX} ${midY}`;

  weeklyCounts.forEach((count, i) => {
    const x = startX + i * stepX;
    const ratio = count / maxWeek;

    if (ratio > 0.4) {
      // Create EKG spike (P-Q-R-S-T)
      const rSpike = ratio * 85;
      pulsePath += ` L ${(x - 4).toFixed(1)} ${midY} L ${(x - 2).toFixed(1)} ${(midY + 15).toFixed(1)} L ${x.toFixed(1)} ${(midY - rSpike).toFixed(1)} L ${(x + 2).toFixed(1)} ${(midY + 20).toFixed(1)} L ${(x + 4).toFixed(1)} ${midY}`;
    } else if (ratio > 0.1) {
      const miniSpike = ratio * 35;
      pulsePath += ` L ${(x - 2).toFixed(1)} ${midY} L ${x.toFixed(1)} ${(midY - miniSpike).toFixed(1)} L ${(x + 2).toFixed(1)} ${midY}`;
    } else {
      pulsePath += ` L ${x.toFixed(1)} ${midY}`;
    }
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    @keyframes pulse-sweep {
      0% { stroke-dashoffset: 2400; }
      100% { stroke-dashoffset: 0; }
    }
    .pulse-line {
      stroke-dasharray: 2400;
      animation: pulse-sweep 6s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .pulse-line { animation: none; stroke-dasharray: none; }
    }
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />

  <!-- Oscilloscope Background Grid -->
  <g stroke="${theme.border}" stroke-width="0.5" opacity="0.35">
    ${Array.from({ length: 15 }).map((_, i) => `<line x1="${startX + i * 55}" y1="80" x2="${startX + i * 55}" y2="${height - 40}" />`).join('')}
    ${Array.from({ length: 6 }).map((_, i) => `<line x1="${startX}" y1="${80 + i * 40}" x2="${endX}" y2="${80 + i * 40}" />`).join('')}
  </g>

  <!-- Header HUD -->
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" filter="url(#pulse-glow)" />
    <text x="22" y="10" class="hud-title">CODING PULSE // BIO-TELEMETRY OSCILLOSCOPE</text>
    <text x="22" y="26" class="hud-text">Weekly Cardiac Velocity &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">SYSTEM VITALITY</text>
    <text x="0" y="26" class="hud-stat">${data.currentStreak} DAYS STREAK &bull; ${data.dailyAverage} BPM (AVG)</text>
  </g>

  <!-- Heartbeat Cardiogram Line -->
  <path d="${pulsePath}" fill="none" stroke="${theme.primary}" stroke-width="2.5" class="pulse-line" filter="url(#pulse-glow)" />
</svg>
  `.trim();
}

/* =========================================================================
   05. DEVELOPER TERMINAL SVG GENERATOR (RETRO CRT SHELL)
   ========================================================================= */
export function generateDeveloperTerminalSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'matrix'];
  const width = options.width || 880;
  const height = options.height || 420;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="term-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    @keyframes cursor-blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .cursor { animation: cursor-blink 1s infinite; }
    .term-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; fill: ${theme.primary}; }
    .term-muted { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .term-hash { font-family: ui-monospace, monospace; font-size: 11px; font-weight: 700; fill: ${theme.secondary}; }
    .term-branch { font-family: ui-monospace, monospace; font-size: 11px; font-weight: 700; fill: ${theme.accent}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="14" stroke="${theme.border}" stroke-width="1.5" />

  <!-- Terminal Window Bar -->
  <rect width="100%" height="38" fill="${theme.cardBg}" rx="14" />
  <rect y="24" width="100%" height="14" fill="${theme.cardBg}" />
  <line x1="0" y1="38" x2="${width}" y2="38" stroke="${theme.border}" stroke-width="1" />

  <!-- Mac Buttons -->
  <circle cx="20" cy="19" r="6" fill="#ff5f56" />
  <circle cx="38" cy="19" r="6" fill="#ffbd2e" />
  <circle cx="56" cy="19" r="6" fill="#27c93f" />
  <text x="${width / 2}" y="23" text-anchor="middle" class="term-muted" font-size="11">bash &bull; octocat@monoforge:~ (git)</text>

  <!-- Terminal Content Lines -->
  <g transform="translate(24, 66)">
    <text x="0" y="0" class="term-code">$ git log --graph --oneline --stat -n 4</text>

    <!-- Commit 1 -->
    <g transform="translate(0, 26)">
      <text x="0" y="0" class="term-branch">*</text>
      <text x="14" y="0" class="term-hash">7f2a9d1</text>
      <text x="75" y="0" class="term-code">feat(engine): deploy 60fps vector animation runtime and telemetry pipeline</text>
      <text x="14" y="18" class="term-muted">Author: ${escapeXml(data.displayName)} &bull; ${data.currentStreak} day streak active</text>
    </g>

    <!-- Commit 2 -->
    <g transform="translate(0, 72)">
      <text x="0" y="0" class="term-branch">*</text>
      <text x="14" y="0" class="term-hash">4e8b11c</text>
      <text x="75" y="0" class="term-code">perf(canvas): optimize isometric skyline rasterization and viewport culling</text>
      <text x="14" y="18" class="term-muted">8 files changed, 482 insertions(+), 36 deletions(-)</text>
    </g>

    <!-- Commit 3 -->
    <g transform="translate(0, 118)">
      <text x="0" y="0" class="term-branch">*</text>
      <text x="14" y="0" class="term-hash">9c02d84</text>
      <text x="75" y="0" class="term-code">chore(deps): synchronize Camo sanitizer invariants and test suite</text>
      <text x="14" y="18" class="term-muted">Passed 766 unit and integration test assertions</text>
    </g>

    <!-- Status Output -->
    <g transform="translate(0, 168)">
      <text x="0" y="0" class="term-code">$ monoforge --inspect-identity</text>
      <text x="0" y="24" class="term-muted">Total Commits: <tspan fill="${theme.primary}">${data.totalContributions.toLocaleString()}</tspan> | Max Streak: <tspan fill="${theme.primary}">${data.maxStreak} days</tspan> | Repositories: <tspan fill="${theme.primary}">${data.repositories.length}</tspan></text>
      <text x="0" y="44" class="term-muted">Primary Languages: <tspan fill="${theme.secondary}">${data.languages.slice(0, 3).map(l => `${l.name} (${l.percentage}%)`).join(', ')}</tspan></text>
    </g>

    <!-- Prompt with blinking cursor -->
    <g transform="translate(0, 242)">
      <text x="0" y="0" class="term-code">$ <tspan fill="${theme.secondary}">await launchStudio()</tspan></text>
      <rect x="175" y="-12" width="8" height="15" fill="${theme.primary}" class="cursor" />
    </g>
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   06. CONTRIBUTION SNAKE SVG GENERATOR (RETRO ARCADE JOURNEY)
   ========================================================================= */
export function generateContributionSnakeSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'amber'];
  const width = options.width || 880;
  const height = options.height || 260;

  // Grid dimensions for 52 weeks x 7 days
  const cellS = 11;
  const cellGap = 3;
  const startX = 35;
  const startY = 80;

  let gridSvg = '';
  data.weeks.forEach((week, w) => {
    week.days.forEach((day, d) => {
      const x = startX + w * (cellS + cellGap);
      const y = startY + d * (cellS + cellGap);
      const color = theme.levels[day.level];
      gridSvg += `<rect x="${x}" y="${y}" width="${cellS}" height="${cellS}" rx="2" fill="${color}" stroke="${theme.border}" stroke-width="0.3" />`;
    });
  });

  // Animated snake path moving across the top and side
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="snake-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    @keyframes snake-crawl {
      0% { transform: translate(0px, 0px); }
      25% { transform: translate(320px, 0px); }
      50% { transform: translate(320px, 60px); }
      75% { transform: translate(120px, 60px); }
      100% { transform: translate(0px, 0px); }
    }
    .snake-body {
      animation: snake-crawl 12s ease-in-out infinite;
    }
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />

  <!-- Header -->
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" filter="url(#snake-glow)" />
    <text x="22" y="10" class="hud-title">CONTRIBUTION SNAKE // 52-WEEK ARCADE TRAIL</text>
    <text x="22" y="26" class="hud-text">Eating Active Commit Nodes &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">SCORE (COMMITS)</text>
    <text x="0" y="26" class="hud-stat">${data.totalContributions.toLocaleString()} PTS &bull; ${data.currentStreak}x STREAK</text>
  </g>

  <!-- 52-Week Grid -->
  <g id="snake-grid">
    ${gridSvg}
  </g>

  <!-- Animated Snake Entity -->
  <g class="snake-body" transform="translate(180, 100)">
    <circle cx="0" cy="0" r="7" fill="${theme.secondary}" filter="url(#snake-glow)" />
    <!-- Eyes -->
    <circle cx="3" cy="-2" r="1.5" fill="${theme.bg}" />
    <circle cx="3" cy="2" r="1.5" fill="${theme.bg}" />
    <!-- Segment Body -->
    <circle cx="-10" cy="0" r="5.5" fill="${theme.primary}" />
    <circle cx="-19" cy="0" r="4.5" fill="${theme.primary}" />
    <circle cx="-27" cy="0" r="3.5" fill="${theme.accent}" />
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   07. REPOSITORY GALAXY SVG GENERATOR (ORBITAL PLANETARY SYSTEM)
   ========================================================================= */
export function generateRepositoryGalaxySvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'cyberpunk'];
  const width = options.width || 880;
  const height = options.height || 420;
  const cx = width / 2;
  const cy = height / 2 + 15;

  let planetsSvg = '';
  const repos = data.repositories.slice(0, 5);

  repos.forEach((repo, i) => {
    const rx = 80 + i * 55;
    const ry = 35 + i * 24;
    const angle = (i * 72 + 25) * (Math.PI / 180);
    const px = cx + Math.cos(angle) * rx;
    const py = cy + Math.sin(angle) * ry;
    const planetR = Math.max(6, Math.min(18, Math.sqrt(repo.stars) * 0.45));

    planetsSvg += `
      <!-- Orbit Ellipse -->
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${theme.border}" stroke-width="0.75" stroke-dasharray="3, 3" opacity="0.6" />
      
      <!-- Planet Body -->
      <g transform="translate(${px.toFixed(1)}, ${py.toFixed(1)})">
        <circle cx="0" cy="0" r="${planetR + 3}" fill="${repo.color}" opacity="0.25" />
        <circle cx="0" cy="0" r="${planetR}" fill="${repo.color}" stroke="${theme.textPrimary}" stroke-width="1.2" />
        <text x="0" y="${planetR + 14}" text-anchor="middle" class="hud-text" font-weight="700">${escapeXml(repo.name)}</text>
        <text x="0" y="${planetR + 25}" text-anchor="middle" class="hud-text" font-size="9">${repo.stars} ★ &bull; ${escapeXml(repo.language)}</text>
      </g>
    `;
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="galaxy-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />

  <!-- Header HUD -->
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" filter="url(#galaxy-glow)" />
    <text x="22" y="10" class="hud-title">REPOSITORY GALAXY // ORBITAL PLANETARY COSMOS</text>
    <text x="22" y="26" class="hud-text">Keplerian System &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">CELESTIAL NODES</text>
    <text x="0" y="26" class="hud-stat">${repos.length} ACTIVE PLANETS &bull; ${data.totalContributions} TOTAL COMMITS</text>
  </g>

  <!-- Central Core Sun (Developer) -->
  <circle cx="${cx}" cy="${cy}" r="32" fill="${theme.primary}" opacity="0.2" filter="url(#galaxy-glow)" />
  <circle cx="${cx}" cy="${cy}" r="22" fill="${theme.secondary}" stroke="${theme.accent}" stroke-width="2" />
  <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-family="monospace" font-size="9" font-weight="800" fill="${theme.bg}">CORE</text>

  <!-- Planetary Orbits and Nodes -->
  <g id="galaxy-planets">
    ${planetsSvg}
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   08. DEVELOPER DNA SVG GENERATOR (BIOMETRIC DOUBLE-HELIX)
   ========================================================================= */
export function generateDeveloperDnaSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'cyberpunk'];
  const width = options.width || 880;
  const height = options.height || 360;

  // 18 rungs along the horizontal DNA strand
  const numRungs = 18;
  const startX = 60;
  const endX = width - 60;
  const stepX = (endX - startX) / (numRungs - 1);
  const midY = height / 2 + 15;
  const amplitude = 55;

  let rungsSvg = '';
  let strand1 = `M ${startX} ${midY}`;
  let strand2 = `M ${startX} ${midY}`;

  for (let i = 0; i < numRungs; i++) {
    const x = startX + i * stepX;
    const phase = (i / numRungs) * Math.PI * 4;
    const y1 = midY + Math.sin(phase) * amplitude;
    const y2 = midY - Math.sin(phase) * amplitude;

    if (i === 0) {
      strand1 = `M ${x} ${y1.toFixed(1)}`;
      strand2 = `M ${x} ${y2.toFixed(1)}`;
    } else {
      strand1 += ` L ${x.toFixed(1)} ${y1.toFixed(1)}`;
      strand2 += ` L ${x.toFixed(1)} ${y2.toFixed(1)}`;
    }

    // Color rungs by languages (guard empty languages array)
    const langColor =
      data.languages.length > 0
        ? data.languages[i % data.languages.length].color
        : theme.accent;

    rungsSvg += `
      <line x1="${x.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y2.toFixed(1)}"
            stroke="${langColor}" stroke-width="2" opacity="0.75" />
      <circle cx="${x.toFixed(1)}" cy="${y1.toFixed(1)}" r="4.5" fill="${theme.primary}" />
      <circle cx="${x.toFixed(1)}" cy="${y2.toFixed(1)}" r="4.5" fill="${theme.secondary}" />
    `;
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="dna-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />

  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" filter="url(#dna-glow)" />
    <text x="22" y="10" class="hud-title">DEVELOPER DNA // BIOMETRIC GENETIC STRAND</text>
    <text x="22" y="26" class="hud-text">Base-Pair Mapping &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">GENETIC PROFILE</text>
    <text x="0" y="26" class="hud-stat">${data.languages.length} VERIFIED CODES &bull; 100% EXPRESSED</text>
  </g>

  <!-- Dual Helical Strands -->
  <path d="${strand1}" fill="none" stroke="${theme.primary}" stroke-width="3" filter="url(#dna-glow)" opacity="0.9" />
  <path d="${strand2}" fill="none" stroke="${theme.secondary}" stroke-width="3" filter="url(#dna-glow)" opacity="0.9" />

  <!-- Base-Pair Rungs and Nodes -->
  <g id="dna-rungs">
    ${rungsSvg}
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   09. SKILL CONSTELLATION SVG GENERATOR (CELESTIAL STAR GRAPH)
   ========================================================================= */
export function generateSkillConstellationSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'tokyonight'];
  const width = options.width || 880;
  const height = options.height || 420;

  // Project skills onto 2D celestial coordinates
  const skillsWithCoords = data.skills.map((s, idx) => {
    const angle = (idx / data.skills.length) * Math.PI * 2;
    const r = 90 + (idx % 3) * 45;
    return {
      ...s,
      x: width / 2 + Math.cos(angle) * r,
      y: height / 2 + 15 + Math.sin(angle) * (r * 0.75),
    };
  });

  // Generate constellation connection lines
  let linesSvg = '';
  const nodeMap = new Map(skillsWithCoords.map(s => [s.id, s]));

  skillsWithCoords.forEach(skill => {
    skill.connectedTo.forEach(targetId => {
      const target = nodeMap.get(targetId);
      if (target) {
        linesSvg += `<line x1="${skill.x.toFixed(1)}" y1="${skill.y.toFixed(1)}" x2="${target.x.toFixed(1)}" y2="${target.y.toFixed(1)}" stroke="${theme.border}" stroke-width="1.2" opacity="0.5" />`;
      }
    });
  });

  // Nodes SVG
  let nodesSvg = '';
  skillsWithCoords.forEach(s => {
    const starR = s.level * 1.8 + 2;
    nodesSvg += `
      <g transform="translate(${s.x.toFixed(1)}, ${s.y.toFixed(1)})">
        <circle cx="0" cy="0" r="${starR + 4}" fill="${theme.primary}" opacity="0.2" />
        <circle cx="0" cy="0" r="${starR}" fill="${theme.secondary}" stroke="${theme.textPrimary}" stroke-width="1" />
        <text x="0" y="${starR + 13}" text-anchor="middle" class="hud-text" font-weight="700">${escapeXml(s.name)}</text>
      </g>
    `;
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="star-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    .hud-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 11px; fill: ${theme.textMuted}; }
    .hud-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; fill: ${theme.textPrimary}; }
    .hud-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 13px; font-weight: 700; fill: ${theme.primary}; }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />

  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" filter="url(#star-glow)" />
    <text x="22" y="10" class="hud-title">SKILL CONSTELLATION // CELESTIAL DEPENDENCY MAP</text>
    <text x="22" y="26" class="hud-text">Verified Architecture Nodes &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 240}, 28)">
    <text x="0" y="10" class="hud-text">STELLAR MAPPINGS</text>
    <text x="0" y="26" class="hud-stat">${data.skills.length} CONSTELLATIONS &bull; REPO VERIFIED</text>
  </g>

  <!-- Constellation Connections -->
  <g id="constellation-lines">
    ${linesSvg}
  </g>

  <!-- Constellation Stars -->
  <g id="constellation-stars" filter="url(#star-glow)">
    ${nodesSvg}
  </g>
</svg>
  `.trim();
}



// --- New Signature Generators: Engineering Radar, Skill Tree, Blueprint, Language River, Release Timeline ---

export function generateEngineeringRadarSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'emerald'] || VISUALIZATION_THEMES.emerald;
  const width = options.width || 800;
  const height = options.height || 420;
  const cx = width / 2;
  const cy = height / 2 + 15;
  const radius = 130;

  const axes = [
    { label: 'FRONTEND', value: 0.9 },
    { label: 'BACKEND', value: 0.85 },
    { label: 'SYSTEMS', value: 0.75 },
    { label: 'CLOUD/DEVOPS', value: 0.8 },
    { label: 'AI/ML', value: 0.7 },
    { label: 'TOOLING', value: 0.95 },
  ];

  const numAxes = axes.length;
  const gridRings = [0.25, 0.5, 0.75, 1.0];

  // Grid polygons
  const ringsSvg = gridRings
    .map(r => {
      const points = axes
        .map((_, i) => {
          const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
          return `${cx + Math.cos(angle) * radius * r},${cy + Math.sin(angle) * radius * r}`;
        })
        .join(' ');
      return `<polygon points="${points}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-dasharray="${r === 1.0 ? 'none' : '3,3'}" />`;
    })
    .join('\n');

  // Axis spokes and labels
  const spokesSvg = axes
    .map((axis, i) => {
      const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
      const x2 = cx + Math.cos(angle) * radius;
      const y2 = cy + Math.sin(angle) * radius;
      const labelX = cx + Math.cos(angle) * (radius + 24);
      const labelY = cy + Math.sin(angle) * (radius + 24) + 4;
      return `
        <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${theme.border}" stroke-width="1" />
        <text x="${labelX}" y="${labelY}" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">${axis.label}</text>
      `;
    })
    .join('\n');

  // Capability polygon
  const dataPoints = axes
    .map((axis, i) => {
      const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
      return `${cx + Math.cos(angle) * radius * axis.value},${cy + Math.sin(angle) * radius * axis.value}`;
    })
    .join(' ');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(32, 32)">
    <circle cx="8" cy="8" r="4" fill="${theme.primary}" />
    <text x="20" y="12" fill="${theme.textPrimary}" font-family="monospace" font-size="12" font-weight="bold">MONOFORGE // ENGINEERING CAPABILITY RADAR</text>
    <text x="20" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="10">Polyglot Architecture &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g id="radar-grid">
    ${ringsSvg}
    ${spokesSvg}
  </g>
  <polygon points="${dataPoints}" fill="${theme.primary}" fill-opacity="0.25" stroke="${theme.primary}" stroke-width="2.5" />
</svg>
  `.trim();
}

export function generateCodebaseBlueprintSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'slate'] || VISUALIZATION_THEMES.slate;
  const width = options.width || 800;
  const height = options.height || 420;

  const topRepos = data.repositories.slice(0, 3);
  const repoCardsSvg = topRepos
    .map((repo, idx) => {
      const y = 100 + idx * 95;
      return `
        <rect x="60" y="${y}" width="${width - 120}" height="80" rx="8" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.5" />
        <text x="80" y="${y + 26}" fill="${theme.primary}" font-family="monospace" font-size="14" font-weight="bold">${escapeXml(repo.name)}</text>
        <text x="80" y="${y + 48}" fill="${theme.textMuted}" font-family="monospace" font-size="11">${escapeXml(repo.description.substring(0, 65))}</text>
        <rect x="80" y="${y + 56}" width="70" height="16" rx="4" fill="${theme.bg}" stroke="${theme.primary}" stroke-width="0.75" />
        <text x="115" y="${y + 68}" fill="${theme.primary}" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">${escapeXml(repo.language)}</text>
        <text x="${width - 140}" y="${y + 30}" fill="${theme.accent}" font-family="monospace" font-size="12" font-weight="bold">${repo.stars} ★</text>
      `;
    })
    .join('\n');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <!-- Blueprint grid lines -->
  <defs>
    <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${theme.border}" stroke-width="0.5" stroke-opacity="0.3" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#blueprint-grid)" rx="16" />
  <g transform="translate(32, 32)">
    <text x="0" y="16" fill="${theme.primary}" font-family="monospace" font-size="14" font-weight="black">ARCHITECTURAL SCHEMATIC BLUEPRINT // ${escapeXml(data.username)}</text>
    <text x="0" y="32" fill="${theme.textMuted}" font-family="monospace" font-size="10">System Modules &bull; ${data.totalContributions} Verified Commits &bull; ${data.currentStreak}D Streak</text>
  </g>
  ${repoCardsSvg}
</svg>
  `.trim();
}

/* =========================================================================
   12. LANGUAGE RIVER SVG GENERATOR (HARMONIC STREAM GRAPH)
   ========================================================================= */
export function generateLanguageRiverSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'ocean'] || VISUALIZATION_THEMES.ocean;
  const width = options.width || 880;
  const height = options.height || 420;

  const languages = data.languages.length > 0 ? data.languages : [
    { name: 'TypeScript', percentage: 48, color: '#3178c6', bytes: 120000 },
    { name: 'JavaScript', percentage: 22, color: '#f7df1e', bytes: 55000 },
    { name: 'Python', percentage: 18, color: '#3776ab', bytes: 45000 },
    { name: 'Rust', percentage: 8, color: '#dea584', bytes: 20000 },
    { name: 'CSS/HTML', percentage: 4, color: '#e34c26', bytes: 10000 },
  ];

  const riverTop = 120;
  const riverHeight = 180;
  let currentY = riverTop;

  const streamRibbons = languages.map((lang, idx) => {
    const bandHeight = Math.max(12, (lang.percentage / 100) * riverHeight);
    const y0 = currentY;
    const y1 = currentY + bandHeight;
    currentY = y1;

    const waveAmp = (idx + 1) * 3;
    const d = `
      M 60 ${y0}
      C 220 ${y0 - waveAmp}, 380 ${y0 + waveAmp}, 500 ${y0 - waveAmp / 2}
      S 720 ${y0 + waveAmp}, 820 ${y0}
      L 820 ${y1}
      C 720 ${y1 + waveAmp}, 580 ${y1 - waveAmp / 2}, 500 ${y1 + waveAmp / 2}
      S 220 ${y1 - waveAmp}, 60 ${y1}
      Z
    `.trim().replace(/\s+/g, ' ');

    return `
      <path d="${d}" fill="${lang.color}" fill-opacity="0.82" stroke="${theme.border}" stroke-width="0.75" class="river-stream-${idx}">
        <title>${escapeXml(lang.name)}: ${lang.percentage}%</title>
      </path>
    `;
  }).join('\n');

  // Legend badges
  const legendSvg = languages.slice(0, 5).map((lang, idx) => {
    const lx = 60 + idx * 155;
    const ly = 345;
    return `
      <g transform="translate(${lx}, ${ly})">
        <rect width="145" height="42" rx="8" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
        <circle cx="20" cy="21" r="6" fill="${lang.color}" />
        <text x="34" y="19" fill="${theme.textPrimary}" font-family="monospace" font-size="12" font-weight="bold">${escapeXml(lang.name)}</text>
        <text x="34" y="32" fill="${theme.textMuted}" font-family="monospace" font-size="10">${lang.percentage}% share</text>
      </g>
    `;
  }).join('\n');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <style>
    .river-stream-0 { animation: riverWave0 6s ease-in-out infinite; }
    .river-stream-1 { animation: riverWave1 7s ease-in-out infinite; }
    .river-stream-2 { animation: riverWave2 8s ease-in-out infinite; }
    @keyframes riverWave0 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
    @keyframes riverWave1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes riverWave2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
  </style>
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" />
  <g transform="translate(40, 40)">
    <text x="0" y="20" fill="${theme.primary}" font-family="monospace" font-size="16" font-weight="bold">LANGUAGE RIVER // POLYGLOT DISTRIBUTION</text>
    <text x="0" y="40" fill="${theme.textMuted}" font-family="monospace" font-size="11">${escapeXml(data.username)} &bull; ${languages.length} Active Stacks &bull; Multi-Stream Architecture</text>
  </g>
  ${streamRibbons}
  ${legendSvg}
</svg>
  `.trim();
}

/* =========================================================================
   13. RELEASE TIMELINE SVG GENERATOR (SUBWAY TRANSIT ROADMAP)
   ========================================================================= */
export function generateReleaseTimelineSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'amber'] || VISUALIZATION_THEMES.amber;
  const width = options.width || 880;
  const height = options.height || 420;

  const milestones = [
    { tag: 'v1.0.0', title: 'Architecture & Engine', status: 'RELEASED', commits: 142, date: 'Q1' },
    { tag: 'v1.5.0', title: 'Telemetry & Git Sync', status: 'VERIFIED', commits: 284, date: 'Q2' },
    { tag: 'v2.0.0', title: 'Camo Vector Studio', status: 'STABLE', commits: 512, date: 'Q3' },
    { tag: 'v3.0.0', title: 'Developer Identity', status: 'PRODUCTION', commits: data.totalContributions, date: 'CURRENT' },
  ];

  const trackY = 220;
  const stationsSvg = milestones.map((m, idx) => {
    const sx = 100 + idx * 220;
    const isLatest = idx === milestones.length - 1;
    const accentColor = isLatest ? theme.accent : theme.primary;

    return `
      <g transform="translate(${sx}, ${trackY})">
        <line x1="0" y1="0" x2="0" y2="${idx % 2 === 0 ? -60 : 60}" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="3,3" />
        <circle cx="0" cy="0" r="14" fill="${theme.bg}" stroke="${accentColor}" stroke-width="3" />
        <circle cx="0" cy="0" r="6" fill="${accentColor}" />
        <g transform="translate(-85, ${idx % 2 === 0 ? -135 : 65})">
          <rect width="170" height="68" rx="8" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.5" />
          <text x="12" y="22" fill="${accentColor}" font-family="monospace" font-size="12" font-weight="bold">${escapeXml(m.tag)}</text>
          <text x="158" y="22" fill="${theme.textMuted}" font-family="monospace" font-size="9" text-anchor="end">${escapeXml(m.date)}</text>
          <text x="12" y="40" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="bold">${escapeXml(m.title)}</text>
          <text x="12" y="55" fill="${theme.textMuted}" font-family="monospace" font-size="9">${m.commits} Commits &bull; ${escapeXml(m.status)}</text>
        </g>
      </g>
    `;
  }).join('\n');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(40, 40)">
    <text x="0" y="20" fill="${theme.primary}" font-family="monospace" font-size="16" font-weight="bold">RELEASE TIMELINE // TRANSIT ROADMAP</text>
    <text x="0" y="40" fill="${theme.textMuted}" font-family="monospace" font-size="11">${escapeXml(data.username)} &bull; ${milestones.length} Major Epochs &bull; ${data.totalContributions} Verified Commits</text>
  </g>
  <line x1="80" y1="${trackY}" x2="800" y2="${trackY}" stroke="${theme.border}" stroke-width="8" stroke-linecap="round" />
  <line x1="80" y1="${trackY}" x2="800" y2="${trackY}" stroke="${theme.primary}" stroke-width="3" stroke-linecap="round" />
  ${stationsSvg}
</svg>
  `.trim();
}

/* =========================================================================
   14. TECH STACK SOLAR SYSTEM SVG GENERATOR (ORBITAL GALAXY)
   ========================================================================= */
export function generateTechStackSolarSystemSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'cyberpunk'] || VISUALIZATION_THEMES.cyberpunk;
  const width = options.width || 880;
  const height = options.height || 460;
  const cx = width / 2;
  const cy = height / 2 + 25;

  const orbits = [
    { radiusX: 95, radiusY: 48, planet: { name: 'TypeScript', color: '#3178c6', angle: 0.8 } },
    { radiusX: 165, radiusY: 82, planet: { name: 'Next.js', color: '#ffffff', angle: 2.3 } },
    { radiusX: 235, radiusY: 118, planet: { name: 'Node / Python', color: '#10b981', angle: 4.1 } },
    { radiusX: 305, radiusY: 154, planet: { name: 'Docker / PyTorch', color: '#a855f7', angle: 5.6 } },
  ];

  const orbitsSvg = orbits.map((o) => {
    const px = cx + Math.cos(o.planet.angle) * o.radiusX;
    const py = cy + Math.sin(o.planet.angle) * o.radiusY;

    return `
      <ellipse cx="${cx}" cy="${cy}" rx="${o.radiusX}" ry="${o.radiusY}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-dasharray="4,4" />
      <g transform="translate(${px}, ${py})">
        <circle cx="0" cy="0" r="14" fill="${theme.cardBg}" stroke="${o.planet.color}" stroke-width="2" />
        <circle cx="0" cy="0" r="6" fill="${o.planet.color}" />
        <rect x="-42" y="18" width="84" height="20" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
        <text x="0" y="32" fill="${theme.textPrimary}" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">${escapeXml(o.planet.name)}</text>
      </g>
    `;
  }).join('\n');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(40, 40)">
    <text x="0" y="20" fill="${theme.primary}" font-family="monospace" font-size="16" font-weight="bold">TECH STACK SOLAR SYSTEM // ORBITAL KINEMATICS</text>
    <text x="0" y="40" fill="${theme.textMuted}" font-family="monospace" font-size="11">${escapeXml(data.username)} &bull; Heliocentric Engineering Galaxy</text>
  </g>
  <g transform="translate(${cx}, ${cy})">
    <circle cx="0" cy="0" r="28" fill="${theme.primary}" fill-opacity="0.18" />
    <circle cx="0" cy="0" r="20" fill="${theme.primary}" fill-opacity="0.4" />
    <circle cx="0" cy="0" r="13" fill="${theme.primary}" />
    <text x="0" y="4" fill="#ffffff" font-family="monospace" font-size="10" font-weight="black" text-anchor="middle">ENG</text>
  </g>
  ${orbitsSvg}
</svg>
  `.trim();
}

/* =========================================================================
   15. SYNTHWAVE RETROWAVE BENTO SVG GENERATOR (NEON OUTRUN METRICS)
   ========================================================================= */
export function generateSynthwaveBentoSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const width = options.width || 880;
  const height = options.height || 460;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="synth-sun" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff007f" />
      <stop offset="60%" stop-color="#ff7700" />
      <stop offset="100%" stop-color="#ffe600" />
    </linearGradient>
    <linearGradient id="synth-wave" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff007f" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#ff007f" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="synth-neon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff007f" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#00f0ff" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="#0f172a" rx="16" stroke="#334155" stroke-width="1" />

  <g transform="translate(440, 90)">
    <circle cx="0" cy="0" r="46" fill="url(#synth-sun)" />
    <rect x="-46" y="-6" width="92" height="3" fill="#0f172a" />
    <rect x="-46" y="8" width="92" height="4" fill="#0f172a" />
    <rect x="-46" y="24" width="92" height="6" fill="#0f172a" />
    <rect x="-46" y="38" width="92" height="8" fill="#0f172a" />
  </g>

  <g transform="translate(40, 36)">
    <text x="0" y="18" fill="url(#synth-neon)" font-family="monospace" font-size="16" font-weight="black">SYNTHWAVE 80S BENTO // ${escapeXml(data.username).toUpperCase()}</text>
    <text x="0" y="36" fill="#94a3b8" font-family="monospace" font-size="11">Outrun Telemetry &bull; Camo-Safe 60fps &bull; Neural Contributor</text>
  </g>

  <g transform="translate(40, 160)">
    <rect width="180" height="110" rx="12" fill="#151024" stroke="#ff007f" stroke-width="1.5" />
    <circle cx="50" cy="55" r="28" fill="none" stroke="#2a1f45" stroke-width="6" />
    <circle cx="50" cy="55" r="28" fill="none" stroke="#ff007f" stroke-width="6" stroke-dasharray="140" stroke-dashoffset="35" stroke-linecap="round" />
    <text x="50" y="60" fill="#ffffff" font-family="monospace" font-size="13" font-weight="black" text-anchor="middle">★</text>
    <text x="96" y="46" fill="#ff007f" font-family="monospace" font-size="18" font-weight="black">${data.totalContributions.toLocaleString()}</text>
    <text x="96" y="68" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold">TOTAL</text>
    <text x="96" y="82" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold">COMMITS</text>
  </g>

  <g transform="translate(240, 160)">
    <rect width="180" height="110" rx="12" fill="#151024" stroke="#ffe600" stroke-width="1.5" />
    <circle cx="50" cy="55" r="28" fill="none" stroke="#2a1f45" stroke-width="6" />
    <circle cx="50" cy="55" r="28" fill="none" stroke="#ffe600" stroke-width="6" stroke-dasharray="140" stroke-dashoffset="50" stroke-linecap="round" />
    <text x="50" y="60" fill="#ffffff" font-family="monospace" font-size="13" font-weight="black" text-anchor="middle">⚡</text>
    <text x="96" y="46" fill="#ffe600" font-family="monospace" font-size="18" font-weight="black">${data.currentStreak}D</text>
    <text x="96" y="68" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold">CURRENT</text>
    <text x="96" y="82" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold">STREAK</text>
  </g>

  <g transform="translate(440, 160)">
    <rect width="180" height="110" rx="12" fill="#151024" stroke="#00f0ff" stroke-width="1.5" />
    <circle cx="50" cy="55" r="28" fill="none" stroke="#2a1f45" stroke-width="6" />
    <circle cx="50" cy="55" r="28" fill="none" stroke="#00f0ff" stroke-width="6" stroke-dasharray="140" stroke-dashoffset="20" stroke-linecap="round" />
    <text x="50" y="60" fill="#ffffff" font-family="monospace" font-size="13" font-weight="black" text-anchor="middle">MAX</text>
    <text x="96" y="46" fill="#00f0ff" font-family="monospace" font-size="18" font-weight="black">${data.maxStreak}D</text>
    <text x="96" y="68" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold">LONGEST</text>
    <text x="96" y="82" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold">STREAK</text>
  </g>

  <g transform="translate(640, 160)">
    <rect width="200" height="110" rx="12" fill="#151024" stroke="url(#synth-neon)" stroke-width="2" />
    <circle cx="55" cy="55" r="34" fill="#201538" stroke="url(#synth-neon)" stroke-width="2" />
    <text x="55" y="64" fill="#00f0ff" font-family="monospace" font-size="24" font-weight="black" text-anchor="middle">A+</text>
    <text x="105" y="48" fill="#ffffff" font-family="monospace" font-size="13" font-weight="black">GRADE</text>
    <text x="105" y="66" fill="#00f0ff" font-family="monospace" font-size="11" font-weight="bold">Top 1% Global</text>
    <text x="105" y="84" fill="#94a3b8" font-family="monospace" font-size="10">Verified Contributor</text>
  </g>

  <g transform="translate(40, 300)">
    <rect width="800" height="120" rx="12" fill="#151024" stroke="#ff007f" stroke-width="1" />
    <text x="20" y="24" fill="#ff007f" font-family="monospace" font-size="11" font-weight="bold">CONTRIBUTION CADENCE // HARMONIC VELOCITY</text>
    <path d="M 20 100 Q 120 40, 220 70 T 420 35 T 620 60 T 780 25 L 780 110 L 20 110 Z" fill="url(#synth-wave)" />
    <path d="M 20 100 Q 120 40, 220 70 T 420 35 T 620 60 T 780 25" fill="none" stroke="#ff007f" stroke-width="3" />
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   16. NEOFECTH FASTFETCH TERMINAL SVG GENERATOR (ASCII ART CRT)
   ========================================================================= */
export function generateNeofetchTerminalSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'matrix'] || VISUALIZATION_THEMES.matrix;
  const width = options.width || 880;
  const height = options.height || 460;

  const asciiLines = [
    '       .---.       ',
    '      /     \\      ',
    '     | () () |     ',
    '      \\  _  /      ',
    '       /   \\       ',
    '      /|   |\\      ',
    '     / |   | \\     ',
    '    /  |   |  \\    ',
    '   *---|   |---*   ',
    '       |   |       ',
    '       /   \\       ',
    '      /     \\      ',
    '     /       \\     ',
    '    `---------\'    ',
  ];

  const asciiSvg = asciiLines.map((line, idx) => {
    return `<text x="50" y="${110 + idx * 18}" fill="${theme.primary}" font-family="monospace" font-size="13" font-weight="bold">${escapeXml(line)}</text>`;
  }).join('\n');

  const reposCount = data.repositories.length;
  const starsCount = data.repositories.reduce((acc, r) => acc + r.stars, 0);
  const langs = data.languages.map(l => l.name).slice(0, 4).join(', ') || 'TypeScript, Python, Go, Rust';

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="#0d1117" rx="14" stroke="#30363d" stroke-width="1.5" />
  
  <path d="M 0 14 Q 0 0 14 0 L ${width - 14} 0 Q ${width} 0 ${width} 14 L ${width} 36 L 0 36 Z" fill="#161b22" />
  <circle cx="24" cy="18" r="6" fill="#ff5f56" />
  <circle cx="44" cy="18" r="6" fill="#ffbd2e" />
  <circle cx="64" cy="18" r="6" fill="#27c93f" />
  <text x="${width / 2}" y="23" fill="#8b949e" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">${escapeXml(data.username)}@monoforge:~ (fastfetch)</text>

  <g>
    ${asciiSvg}
  </g>

  <line x1="260" y1="56" x2="260" y2="420" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4" />

  <g transform="translate(290, 75)" font-family="monospace" font-size="13">
    <text x="0" y="20" fill="${theme.primary}" font-weight="bold">${escapeXml(data.username)}<tspan fill="#8b949e">@</tspan>monoforge-station</text>
    <text x="0" y="34" fill="#30363d">----------------------------------------------------</text>

    <text x="0" y="60" fill="${theme.accent}" font-weight="bold">OS:<tspan dx="10" fill="#f0f6fc" font-weight="normal">MonoForge Linux x86_64</tspan></text>
    <text x="0" y="85" fill="${theme.accent}" font-weight="bold">Host:<tspan dx="10" fill="#f0f6fc" font-weight="normal">Developer Workstation // Production Node</tspan></text>
    <text x="0" y="110" fill="${theme.accent}" font-weight="bold">Kernel:<tspan dx="10" fill="#f0f6fc" font-weight="normal">Linux 6.12.0 (${data.totalContributions} Verified Commits)</tspan></text>
    <text x="0" y="135" fill="${theme.accent}" font-weight="bold">Uptime:<tspan dx="10" fill="#f0f6fc" font-weight="normal">${data.currentStreak} Days Consecutive Coding Streak</tspan></text>
    <text x="0" y="160" fill="${theme.accent}" font-weight="bold">IDE:<tspan dx="10" fill="#f0f6fc" font-weight="normal">Antigravity 2.0 / VS Code 1.96.0</tspan></text>
    
    <text x="0" y="185" fill="#30363d">----------------------------------------------------</text>
    
    <text x="0" y="210" fill="${theme.primary}" font-weight="bold">Languages:<tspan dx="10" fill="#f0f6fc" font-weight="normal">${escapeXml(langs)}</tspan></text>
    <text x="0" y="235" fill="${theme.primary}" font-weight="bold">Activity:<tspan dx="10" fill="#f0f6fc" font-weight="normal">${data.dailyAverage} commits/day &bull; Peak: ${data.highestDay}/day</tspan></text>
    <text x="0" y="260" fill="${theme.primary}" font-weight="bold">GitHub Stats:<tspan dx="10" fill="#f0f6fc" font-weight="normal">${reposCount} Repos &bull; ${starsCount} Stars &bull; Grade A+</tspan></text>

    <g transform="translate(0, 290)">
      <rect x="0" y="0" width="24" height="14" fill="#0d1117" />
      <rect x="28" y="0" width="24" height="14" fill="#ff5f56" />
      <rect x="56" y="0" width="24" height="14" fill="#27c93f" />
      <rect x="84" y="0" width="24" height="14" fill="#ffbd2e" />
      <rect x="112" y="0" width="24" height="14" fill="#58a6ff" />
      <rect x="140" y="0" width="24" height="14" fill="#bc8cff" />
      <rect x="168" y="0" width="24" height="14" fill="#39c5bb" />
      <rect x="196" y="0" width="24" height="14" fill="#f0f6fc" />
    </g>
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   17. PROJECT CONSTELLATION SVG GENERATOR (INTERCONNECTED STELLAR GRAPH)
   ========================================================================= */
export function generateProjectConstellationSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'cyberpunk'] || VISUALIZATION_THEMES.cyberpunk;
  const width = options.width || 880;
  const height = options.height || 420;
  const repos = data.repositories.slice(0, 7);

  const nodes = repos.map((repo, idx) => {
    const angle = (idx / Math.max(1, repos.length)) * Math.PI * 2 - Math.PI / 2;
    const r = 105 + (idx % 2) * 45;
    return {
      repo,
      x: width / 2 + Math.cos(angle) * r * 1.35,
      y: height / 2 + 18 + Math.sin(angle) * (r * 0.72),
      starR: Math.max(6, Math.min(16, Math.sqrt(repo.stars + 1) * 0.4 + 5)),
    };
  });

  let edgesSvg = '';
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].repo.language === nodes[j].repo.language || j === i + 1) {
        edgesSvg += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="${theme.primary}" stroke-width="1" stroke-dasharray="4,4" opacity="0.45" />`;
      }
    }
  }

  const starsSvg = nodes
    .map(
      (n) => `
      <g transform="translate(${n.x.toFixed(1)}, ${n.y.toFixed(1)})">
        <circle cx="0" cy="0" r="${n.starR + 5}" fill="${n.repo.color}" opacity="0.2" />
        <circle cx="0" cy="0" r="${n.starR}" fill="${n.repo.color}" stroke="${theme.textPrimary}" stroke-width="1.2" />
        <text x="0" y="${n.starR + 15}" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="700">${escapeXml(n.repo.name)}</text>
        <text x="0" y="${n.starR + 27}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="9">${n.repo.stars} stars &bull; ${escapeXml(n.repo.language)}</text>
      </g>`
    )
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">PROJECT CONSTELLATION // INTERCONNECTED STELLAR GRAPH</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Repository Topology &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 230}, 28)">
    <text x="0" y="10" fill="${theme.textMuted}" font-family="monospace" font-size="11">STELLAR CLUSTERS</text>
    <text x="0" y="26" fill="${theme.primary}" font-family="monospace" font-size="13" font-weight="700">${repos.length} REPOS LINKED</text>
  </g>
  ${edgesSvg}
  ${starsSvg || `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">NO PUBLIC REPOSITORIES INDEXED</text>`}
</svg>
  `.trim();
}

/* =========================================================================
   18. SKILL TREE SVG GENERATOR (RPG TALENT MATRIX)
   ========================================================================= */
export function generateSkillTreeSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'amber'] || VISUALIZATION_THEMES.amber;
  const width = options.width || 880;
  const height = options.height || 420;
  const skills = data.skills.slice(0, 8);

  const rootX = width / 2;
  const rootY = 104;

  const nodesSvg = skills
    .map((skill, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const x = 130 + col * 205;
      const y = 185 + row * 115;
      const fillPct = Math.min(100, Math.max(20, skill.level * 20));
      return `
      <path d="M ${rootX} ${rootY + 18} C ${rootX} ${y - 45}, ${x} ${y - 45}, ${x} ${y}" fill="none" stroke="${theme.border}" stroke-width="1.5" />
      <g transform="translate(${x - 82}, ${y})">
        <rect width="164" height="72" rx="10" fill="${theme.cardBg}" stroke="${theme.primary}" stroke-width="1.2" />
        <text x="12" y="22" fill="${theme.textPrimary}" font-family="monospace" font-size="11" font-weight="700">${escapeXml(skill.name)}</text>
        <text x="12" y="38" fill="${theme.textMuted}" font-family="monospace" font-size="9">${escapeXml(skill.category.toUpperCase())} &bull; TIER ${skill.level}/5</text>
        <rect x="12" y="48" width="140" height="8" rx="4" fill="${theme.bg}" />
        <rect x="12" y="48" width="${(1.4 * fillPct).toFixed(0)}" height="8" rx="4" fill="${theme.primary}" />
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">SKILL TREE // RPG TALENT MATRIX</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Mastery Progression &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 230}, 28)">
    <text x="0" y="10" fill="${theme.textMuted}" font-family="monospace" font-size="11">UNLOCKED NODES</text>
    <text x="0" y="26" fill="${theme.primary}" font-family="monospace" font-size="13" font-weight="700">${data.skills.length} TALENTS</text>
  </g>
  <g transform="translate(${rootX}, ${rootY})">
    <rect x="-74" y="-16" width="148" height="34" rx="17" fill="${theme.cardBg}" stroke="${theme.secondary}" stroke-width="2" />
    <text x="0" y="5" text-anchor="middle" fill="${theme.secondary}" font-family="monospace" font-size="11" font-weight="800">CORE ENGINEER</text>
  </g>
  ${nodesSvg || `<text x="${width / 2}" y="240" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">0 VERIFIED SKILL NODES</text>`}
</svg>
  `.trim();
}

/* =========================================================================
   19. COMMIT WATERFALL SVG GENERATOR (GRAVITY-DRIVEN CASCADE)
   ========================================================================= */
export function generateCommitWaterfallSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'ocean'] || VISUALIZATION_THEMES.ocean;
  const width = options.width || 880;
  const height = options.height || 420;
  const recentWeeks = data.weeks.slice(-16);
  const weekTotals = recentWeeks.map((w) => w.days.reduce((s, d) => s + d.count, 0));
  const maxVal = Math.max(1, ...weekTotals);

  const cascadesSvg = weekTotals
    .map((total, idx) => {
      const x = 60 + idx * 48;
      const barH = Math.max(18, (total / maxVal) * 210);
      const y = 95;
      return `
      <rect x="${x}" y="${y}" width="32" height="230" rx="8" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="0.8" />
      <rect x="${x + 4}" y="${y + 4}" width="24" height="${barH.toFixed(1)}" rx="6" fill="${theme.primary}" opacity="0.85" />
      <circle cx="${x + 16}" cy="${(y + barH + 14).toFixed(1)}" r="4" fill="${theme.accent}" />
      <text x="${x + 16}" y="${y + 248}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="9">W${idx + 1}</text>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">COMMIT WATERFALL // GRAVITY-DRIVEN CASCADE</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">16-Week Sprint Reservoir &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 230}, 28)">
    <text x="0" y="10" fill="${theme.textMuted}" font-family="monospace" font-size="11">PEAK VOLUME</text>
    <text x="0" y="26" fill="${theme.primary}" font-family="monospace" font-size="13" font-weight="700">${data.highestDay} MAX/DAY &bull; ${data.totalContributions} TOTAL</text>
  </g>
  ${cascadesSvg}
  <rect x="48" y="365" width="${width - 96}" height="24" rx="12" fill="${theme.secondary}" opacity="0.22" />
</svg>
  `.trim();
}

/* =========================================================================
   20. CONTRIBUTION TOPOGRAPHY SVG GENERATOR (ELEVATION CONTOUR MAP)
   ========================================================================= */
export function generateContributionTopographySvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'emerald'] || VISUALIZATION_THEMES.emerald;
  const width = options.width || 880;
  const height = options.height || 420;
  const layers = 6;
  const weekTotals = data.weeks.slice(-24).map((w) => w.days.reduce((s, d) => s + d.count, 0));
  const maxVal = Math.max(1, ...weekTotals);

  let contoursSvg = '';
  for (let l = 0; l < layers; l++) {
    const baseY = 140 + l * 38;
    const scale = 1 - l * 0.1;
    let d = `M 40 ${baseY}`;
    const step = (width - 80) / Math.max(1, weekTotals.length - 1);
    weekTotals.forEach((val, idx) => {
      const x = 40 + idx * step;
      const elev = (val / maxVal) * 58 * scale;
      d += ` L ${x.toFixed(1)} ${(baseY - elev).toFixed(1)}`;
    });
    d += ` L ${width - 40} ${height - 30} L 40 ${height - 30} Z`;
    const levelColor = theme.levels[Math.min(4, Math.max(1, Math.ceil((l + 1) * 0.7)))];
    contoursSvg += `<path d="${d}" fill="${levelColor}" fill-opacity="0.35" stroke="${theme.primary}" stroke-width="1.2" />`;
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">CONTRIBUTION TOPOGRAPHY // ELEVATION CONTOUR MAP</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Isohypse Terrain Ridges &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(${width - 230}, 28)">
    <text x="0" y="10" fill="${theme.textMuted}" font-family="monospace" font-size="11">SUMMIT ELEVATION</text>
    <text x="0" y="26" fill="${theme.primary}" font-family="monospace" font-size="13" font-weight="700">${data.highestDay}M PEAK &bull; ${data.activeDaysCount} ACTIVE DAYS</text>
  </g>
  ${contoursSvg}
</svg>
  `.trim();
}

/* =========================================================================
   21. CODING WEATHER SVG GENERATOR (ATMOSPHERIC TELEMETRY)
   ========================================================================= */
export function generateCodingWeatherSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'tokyonight'] || VISUALIZATION_THEMES.tokyonight;
  const width = options.width || 880;
  const height = options.height || 420;
  const condition =
    data.dailyAverage >= 4
      ? 'SOLAR SURGE'
      : data.dailyAverage >= 1.5
      ? 'ELECTRIC AURORA'
      : 'CALM HORIZON';

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">CODING WEATHER // ATMOSPHERIC TELEMETRY</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Meteorological Velocity &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <g transform="translate(60, 100)">
    <rect width="340" height="250" rx="14" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.2" />
    <circle cx="170" cy="110" r="46" fill="${theme.primary}" opacity="0.25" />
    <circle cx="170" cy="110" r="28" fill="${theme.secondary}" />
    <path d="M 110 150 Q 170 115 230 150" fill="none" stroke="${theme.accent}" stroke-width="3" />
    <text x="170" y="195" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="16" font-weight="800">${condition}</text>
    <text x="170" y="218" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="11">${data.dailyAverage} COMMITS/DAY VELOCITY</text>
  </g>
  <g transform="translate(430, 100)">
    <rect width="390" height="74" rx="12" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
    <text x="20" y="30" fill="${theme.textMuted}" font-family="monospace" font-size="10">BAROMETRIC COMMIT PRESSURE</text>
    <text x="20" y="54" fill="${theme.primary}" font-family="monospace" font-size="18" font-weight="800">${data.totalContributions.toLocaleString()} hPa (COMMITS)</text>
  </g>
  <g transform="translate(430, 188)">
    <rect width="390" height="74" rx="12" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
    <text x="20" y="30" fill="${theme.textMuted}" font-family="monospace" font-size="10">STREAK WIND FRONT</text>
    <text x="20" y="54" fill="${theme.secondary}" font-family="monospace" font-size="18" font-weight="800">${data.currentStreak} DAYS CURRENT &bull; ${data.maxStreak}D MAX</text>
  </g>
  <g transform="translate(430, 276)">
    <rect width="390" height="74" rx="12" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
    <text x="20" y="30" fill="${theme.textMuted}" font-family="monospace" font-size="10">PEAK STORM SURGE</text>
    <text x="20" y="54" fill="${theme.accent}" font-family="monospace" font-size="18" font-weight="800">${data.highestDay} COMMITS IN 24H</text>
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   22. DEVELOPER SEASONS SVG GENERATOR (QUARTERLY ECOLOGY CYCLES)
   ========================================================================= */
export function generateDeveloperSeasonsSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'emerald'] || VISUALIZATION_THEMES.emerald;
  const width = options.width || 880;
  const height = options.height || 420;
  const quarters = [0, 0, 0, 0];
  data.days.forEach((d) => {
    const m = new Date(d.date).getMonth();
    const q = Math.min(3, Math.max(0, Math.floor(m / 3)));
    quarters[q] += d.count;
  });
  const maxQ = Math.max(1, ...quarters);
  const seasonMeta = [
    { name: 'Q1 SPRING', sub: 'Seed & Architecture', color: '#34d399' },
    { name: 'Q2 SUMMER', sub: 'Peak Feature Bloom', color: '#fbbf24' },
    { name: 'Q3 AUTUMN', sub: 'Release Harvest', color: '#f97316' },
    { name: 'Q4 WINTER', sub: 'Deep Refactoring', color: '#38bdf8' },
  ];

  const cardsSvg = seasonMeta
    .map((s, idx) => {
      const x = 40 + idx * 204;
      const pct = Math.round((quarters[idx] / maxQ) * 100);
      return `
      <g transform="translate(${x}, 96)">
        <rect width="188" height="276" rx="14" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.2" />
        <circle cx="94" cy="78" r="40" fill="${s.color}" opacity="0.2" />
        <circle cx="94" cy="78" r="24" fill="${s.color}" opacity="0.85" />
        <text x="94" y="148" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="13" font-weight="800">${s.name}</text>
        <text x="94" y="168" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="10">${s.sub}</text>
        <text x="94" y="212" text-anchor="middle" fill="${s.color}" font-family="monospace" font-size="22" font-weight="900">${quarters[idx]}</text>
        <text x="94" y="232" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="10">COMMITS (${pct}%)</text>
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">DEVELOPER SEASONS // QUARTERLY ECOLOGY CYCLES</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Annual Cadence Breakdown &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${cardsSvg}
</svg>
  `.trim();
}

/* =========================================================================
   23. OPEN SOURCE FOOTPRINTS SVG GENERATOR (CONTRIBUTOR TRAILS)
   ========================================================================= */
export function generateOpenSourceFootprintsSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'emerald'] || VISUALIZATION_THEMES.emerald;
  const width = options.width || 880;
  const height = options.height || 420;
  const repos = data.repositories.slice(0, 5);

  const waypoints = repos.map((repo, idx) => ({
    x: 110 + idx * 165,
    y: 230 + (idx % 2 === 0 ? -45 : 45),
    repo,
  }));

  let trailPath = '';
  if (waypoints.length > 0) {
    trailPath = `M ${waypoints[0].x} ${waypoints[0].y}`;
    for (let i = 1; i < waypoints.length; i++) {
      const prev = waypoints[i - 1];
      const curr = waypoints[i];
      const mx = (prev.x + curr.x) / 2;
      trailPath += ` C ${mx} ${prev.y}, ${mx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
  }

  const markersSvg = waypoints
    .map(
      (w, idx) => `
      <g transform="translate(${w.x}, ${w.y})">
        <circle cx="0" cy="0" r="18" fill="${theme.cardBg}" stroke="${w.repo.color}" stroke-width="2.5" />
        <text x="0" y="4" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="800">#${idx + 1}</text>
        <text x="0" y="34" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="700">${escapeXml(w.repo.name)}</text>
        <text x="0" y="48" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="9">${w.repo.stars} stars &bull; ${w.repo.forks} forks</text>
      </g>`
    )
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">OPEN SOURCE FOOTPRINTS // CONTRIBUTOR TRAILS</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Ecosystem Impact Waypoints &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${trailPath ? `<path d="${trailPath}" fill="none" stroke="${theme.primary}" stroke-width="3" stroke-dasharray="8,6" />` : ''}
  ${markersSvg || `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">NO PUBLIC FOOTPRINTS INDEXED</text>`}
</svg>
  `.trim();
}

/* =========================================================================
   24. PR FLIGHT PATH SVG GENERATOR (BALLISTIC MERGE ARCS)
   ========================================================================= */
export function generatePrFlightpathSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'ocean'] || VISUALIZATION_THEMES.ocean;
  const width = options.width || 880;
  const height = options.height || 420;
  const repos = data.repositories.slice(0, 4);
  const targetX = width - 130;
  const targetY = 230;

  const arcsSvg = repos
    .map((repo, idx) => {
      const startY = 120 + idx * 65;
      const startX = 120;
      const ctrlY = Math.max(70, startY - 85);
      return `
      <path d="M ${startX} ${startY} Q ${(startX + targetX) / 2} ${ctrlY}, ${targetX} ${targetY}" fill="none" stroke="${repo.color}" stroke-width="2" stroke-dasharray="5,4" opacity="0.85" />
      <circle cx="${startX}" cy="${startY}" r="6" fill="${repo.color}" />
      <text x="${startX + 14}" y="${startY + 4}" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="700">${escapeXml(repo.name)}</text>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">PR FLIGHT PATH // BALLISTIC MERGE ARCS</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Branch-to-Main Trajectories &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${arcsSvg || `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">NO REPOSITORY FLIGHT ARCS</text>`}
  <g transform="translate(${targetX}, ${targetY})">
    <circle cx="0" cy="0" r="28" fill="${theme.primary}" opacity="0.2" />
    <circle cx="0" cy="0" r="16" fill="${theme.primary}" stroke="${theme.textPrimary}" stroke-width="2" />
    <text x="0" y="34" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="800">MAIN MERGE</text>
  </g>
</svg>
  `.trim();
}

/* =========================================================================
   25. ISSUE GARDEN SVG GENERATOR (GENERATIVE BOTANICAL FLORA)
   ========================================================================= */
export function generateIssueGardenSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'emerald'] || VISUALIZATION_THEMES.emerald;
  const width = options.width || 880;
  const height = options.height || 420;
  const repos = data.repositories.slice(0, 5);
  const groundY = 345;

  const plantsSvg = repos
    .map((repo, idx) => {
      const x = 130 + idx * 155;
      const stemH = Math.max(65, Math.min(180, 70 + repo.activityScore * 1.1));
      const bloomY = groundY - stemH;
      return `
      <g>
        <path d="M ${x} ${groundY} Q ${x - 10} ${groundY - stemH / 2}, ${x} ${bloomY}" fill="none" stroke="${theme.primary}" stroke-width="3" />
        <ellipse cx="${x - 14}" cy="${groundY - stemH * 0.45}" rx="12" ry="6" fill="${theme.secondary}" opacity="0.8" />
        <ellipse cx="${x + 14}" cy="${groundY - stemH * 0.65}" rx="12" ry="6" fill="${theme.secondary}" opacity="0.8" />
        <circle cx="${x}" cy="${bloomY}" r="16" fill="${repo.color}" stroke="${theme.textPrimary}" stroke-width="1.5" />
        <text x="${x}" y="${groundY + 22}" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="700">${escapeXml(repo.name)}</text>
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">ISSUE GARDEN // GENERATIVE BOTANICAL FLORA</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Resolved Milestones &amp; Living Canopy &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <line x1="50" y1="${groundY}" x2="${width - 50}" y2="${groundY}" stroke="${theme.border}" stroke-width="2" />
  ${plantsSvg || `<text x="${width / 2}" y="220" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">GARDEN AWAITING FIRST REPOSITORY</text>`}
</svg>
  `.trim();
}

/* =========================================================================
   26. REPOSITORY TREE SVG GENERATOR (ARCHITECTURAL BRANCHING)
   ========================================================================= */
export function generateRepositoryTreeSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'emerald'] || VISUALIZATION_THEMES.emerald;
  const width = options.width || 880;
  const height = options.height || 420;
  const trunkX = width / 2;
  const repos = data.repositories.slice(0, 6);

  const branchesSvg = repos
    .map((repo, idx) => {
      const side = idx % 2 === 0 ? -1 : 1;
      const tier = Math.floor(idx / 2);
      const startY = 300 - tier * 58;
      const endX = trunkX + side * (145 + tier * 35);
      const endY = startY - 40;
      return `
      <path d="M ${trunkX} ${startY} Q ${trunkX + side * 60} ${startY - 10}, ${endX} ${endY}" fill="none" stroke="${theme.secondary}" stroke-width="2.5" />
      <circle cx="${endX}" cy="${endY}" r="14" fill="${repo.color}" stroke="${theme.textPrimary}" stroke-width="1.2" />
      <text x="${endX + side * 20}" y="${endY + 4}" text-anchor="${side > 0 ? 'start' : 'end'}" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="700">${escapeXml(repo.name)} (${repo.stars}★)</text>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">REPOSITORY TREE // ARCHITECTURAL BRANCHING</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Modular Canopy &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <line x1="${trunkX}" y1="365" x2="${trunkX}" y2="120" stroke="${theme.primary}" stroke-width="6" stroke-linecap="round" />
  ${branchesSvg || `<text x="${width / 2}" y="220" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">NO REPOSITORY BRANCHES</text>`}
</svg>
  `.trim();
}

/* =========================================================================
   27. COMMIT CONSTELLATION SVG GENERATOR (CHRONOLOGICAL STARFIELD)
   ========================================================================= */
export function generateCommitConstellationSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'tokyonight'] || VISUALIZATION_THEMES.tokyonight;
  const width = options.width || 880;
  const height = options.height || 420;
  const recentWeeks = data.weeks.slice(-26);
  const maxWeek = Math.max(1, ...recentWeeks.map((w) => w.days.reduce((s, d) => s + d.count, 0)));

  const pts = recentWeeks.map((w, idx) => {
    const count = w.days.reduce((s, d) => s + d.count, 0);
    const x = 60 + idx * ((width - 120) / Math.max(1, recentWeeks.length - 1));
    const y = 290 - (count / maxWeek) * 165 + Math.sin(idx * 0.9) * 20;
    const r = Math.max(2.5, (count / maxWeek) * 8 + 2);
    const color =
      data.languages.length > 0 ? data.languages[idx % data.languages.length].color : theme.accent;
    return { x, y, r, color };
  });

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const starsSvg = pts
    .map(
      (p) =>
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(p.r + 3).toFixed(1)}" fill="${p.color}" opacity="0.22" />
         <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.r.toFixed(1)}" fill="${p.color}" stroke="${theme.textPrimary}" stroke-width="0.8" />`
    )
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">COMMIT CONSTELLATION // CHRONOLOGICAL STARFIELD</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">26-Week Stellar Cadence &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${pts.length > 1 ? `<path d="${linePath}" fill="none" stroke="${theme.border}" stroke-width="1.2" stroke-dasharray="3,3" />` : ''}
  ${starsSvg}
</svg>
  `.trim();
}

/* =========================================================================
   28. YEAR IN CODE SVG GENERATOR (CINEMATIC ANNUAL RECAP)
   ========================================================================= */
export function generateYearInCodeSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'cyberpunk'] || VISUALIZATION_THEMES.cyberpunk;
  const width = options.width || 880;
  const height = options.height || 420;
  const topLang = data.languages[0]?.name || 'Polyglot';
  const topRepo = data.repositories[0]?.name || 'Open Source';

  const cards = [
    { label: 'TOTAL COMMITS', val: data.totalContributions.toLocaleString(), sub: `${data.activeDaysCount} Active Days` },
    { label: 'LONGEST STREAK', val: `${data.maxStreak} DAYS`, sub: `Current: ${data.currentStreak}D` },
    { label: 'PRIMARY STACK', val: topLang, sub: `${data.languages.length} Languages` },
    { label: 'FLAGSHIP REPO', val: topRepo, sub: `${data.repositories[0]?.stars ?? 0} Stars` },
  ];

  const cardsSvg = cards
    .map((c, idx) => {
      const x = 40 + idx * 204;
      return `
      <g transform="translate(${x}, 115)">
        <rect width="188" height="235" rx="14" fill="${theme.cardBg}" stroke="${theme.primary}" stroke-width="1.2" />
        <text x="18" y="34" fill="${theme.textMuted}" font-family="monospace" font-size="10" font-weight="700">${escapeXml(c.label)}</text>
        <text x="18" y="128" fill="${theme.primary}" font-family="monospace" font-size="20" font-weight="900">${escapeXml(c.val.slice(0, 14))}</text>
        <text x="18" y="160" fill="${theme.textPrimary}" font-family="monospace" font-size="11">${escapeXml(c.sub)}</text>
        <rect x="18" y="198" width="152" height="6" rx="3" fill="${theme.secondary}" opacity="0.55" />
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">YEAR IN CODE // CINEMATIC ANNUAL RECAP</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Annual Engineering Retrospective &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${cardsSvg}
</svg>
  `.trim();
}

/* =========================================================================
   29. PROJECT DNA SVG GENERATOR (COMPARATIVE REPO BARCODE)
   ========================================================================= */
export function generateProjectDnaSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'cyberpunk'] || VISUALIZATION_THEMES.cyberpunk;
  const width = options.width || 880;
  const height = options.height || 420;
  const repos = data.repositories.slice(0, 4);

  const rowsSvg = repos
    .map((repo, idx) => {
      const y = 96 + idx * 74;
      const bars = Array.from({ length: 18 })
        .map((_, bIdx) => {
          const bx = 260 + bIdx * 28;
          const bw = ((repo.activityScore + bIdx * 17) % 14) + 4;
          const opacity = 0.4 + ((bIdx * 7) % 6) * 0.1;
          return `<rect x="${bx}" y="12" width="${bw}" height="34" rx="2" fill="${repo.color}" opacity="${opacity.toFixed(2)}" />`;
        })
        .join('');
      return `
      <g transform="translate(40, ${y})">
        <rect width="${width - 80}" height="58" rx="10" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1" />
        <text x="18" y="26" fill="${theme.textPrimary}" font-family="monospace" font-size="12" font-weight="800">${escapeXml(repo.name)}</text>
        <text x="18" y="44" fill="${theme.textMuted}" font-family="monospace" font-size="10">${escapeXml(repo.language)} &bull; ${repo.stars} stars</text>
        ${bars}
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">PROJECT DNA // COMPARATIVE REPO BARCODE</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Architectural Genetic Signatures &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${rowsSvg || `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">NO REPOSITORIES FOR GENETIC BARCODE</text>`}
</svg>
  `.trim();
}

/* =========================================================================
   30. COLLABORATION NETWORK SVG GENERATOR (PEER SOCIAL GRAPH)
   ========================================================================= */
export function generateCollaborationNetworkSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'ocean'] || VISUALIZATION_THEMES.ocean;
  const width = options.width || 880;
  const height = options.height || 420;
  const cx = width / 2;
  const cy = height / 2 + 20;
  const repos = data.repositories.slice(0, 6);

  const nodesSvg = repos
    .map((repo, idx) => {
      const angle = (idx / Math.max(1, repos.length)) * Math.PI * 2;
      const nx = cx + Math.cos(angle) * 210;
      const ny = cy + Math.sin(angle) * 115;
      return `
      <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="${theme.primary}" stroke-width="1.5" opacity="0.6" />
      <g transform="translate(${nx.toFixed(1)}, ${ny.toFixed(1)})">
        <circle cx="0" cy="0" r="18" fill="${theme.cardBg}" stroke="${repo.color}" stroke-width="2" />
        <text x="0" y="30" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="10" font-weight="700">${escapeXml(repo.name)}</text>
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">COLLABORATION NETWORK // PEER SOCIAL GRAPH</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Repository &amp; Ecosystem Bonds &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${nodesSvg}
  <circle cx="${cx}" cy="${cy}" r="32" fill="${theme.primary}" stroke="${theme.textPrimary}" stroke-width="2" />
  <text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="${theme.bg}" font-family="monospace" font-size="10" font-weight="900">@${escapeXml(data.username.slice(0, 8))}</text>
</svg>
  `.trim();
}

/* =========================================================================
   31. CODE IMPACT MAP SVG GENERATOR (VELOCITY HEAT INTENSITY)
   ========================================================================= */
export function generateCodeImpactMapSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'amber'] || VISUALIZATION_THEMES.amber;
  const width = options.width || 880;
  const height = options.height || 420;
  const repos = data.repositories.slice(0, 6);

  const cellsSvg = repos
    .map((repo, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = 40 + col * 272;
      const y = 96 + row * 144;
      const intensity = Math.min(1, Math.max(0.2, repo.activityScore / 100));
      return `
      <g transform="translate(${x}, ${y})">
        <rect width="256" height="128" rx="12" fill="${theme.cardBg}" stroke="${theme.primary}" stroke-width="1.2" />
        <rect x="14" y="14" width="228" height="10" rx="5" fill="${theme.bg}" />
        <rect x="14" y="14" width="${(228 * intensity).toFixed(0)}" height="10" rx="5" fill="${theme.primary}" />
        <text x="14" y="54" fill="${theme.textPrimary}" font-family="monospace" font-size="13" font-weight="800">${escapeXml(repo.name)}</text>
        <text x="14" y="76" fill="${theme.textMuted}" font-family="monospace" font-size="10">${escapeXml(repo.language)} &bull; ${repo.stars} stars &bull; ${repo.forks} forks</text>
        <text x="14" y="106" fill="${theme.accent}" font-family="monospace" font-size="11" font-weight="700">IMPACT SCORE: ${repo.activityScore}/100</text>
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">CODE IMPACT MAP // VELOCITY HEAT INTENSITY</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">High-Impact Engineering Hotspots &bull; ${escapeXml(data.displayName)}</text>
  </g>
  ${cellsSvg || `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="12">NO REPOSITORY IMPACT DATA</text>`}
</svg>
  `.trim();
}

/* =========================================================================
   32. DEVELOPER TIMELINE SVG GENERATOR (CHRONOLOGICAL CAREER JOURNEY)
   ========================================================================= */
export function generateDeveloperTimelineSvg(
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions = {}
): string {
  const theme = VISUALIZATION_THEMES[options.theme || 'tokyonight'] || VISUALIZATION_THEMES.tokyonight;
  const width = options.width || 880;
  const height = options.height || 420;
  const epochs = [
    { label: 'FOUNDATION', metric: `${data.languages[0]?.name || 'Core'}`, detail: `${data.languages.length} Languages` },
    { label: 'SHIPPED CODE', metric: `${data.repositories.length} REPOS`, detail: `${data.repositories.reduce((s, r) => s + r.stars, 0)} Total Stars` },
    { label: 'CONSISTENCY', metric: `${data.maxStreak}D STREAK`, detail: `${data.activeDaysCount} Active Days` },
    { label: 'MOMENTUM', metric: `${data.totalContributions} COMMITS`, detail: `${data.dailyAverage}/day Avg` },
  ];

  const trackY = 230;
  const nodesSvg = epochs
    .map((ep, idx) => {
      const x = 120 + idx * 210;
      return `
      <g transform="translate(${x}, ${trackY})">
        <circle cx="0" cy="0" r="10" fill="${theme.primary}" stroke="${theme.textPrimary}" stroke-width="2" />
        <rect x="-82" y="${idx % 2 === 0 ? -105 : 28}" width="164" height="68" rx="10" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.2" />
        <text x="0" y="${idx % 2 === 0 ? -82 : 50}" text-anchor="middle" fill="${theme.textMuted}" font-family="monospace" font-size="9" font-weight="700">${ep.label}</text>
        <text x="0" y="${idx % 2 === 0 ? -62 : 70}" text-anchor="middle" fill="${theme.primary}" font-family="monospace" font-size="13" font-weight="800">${escapeXml(ep.metric)}</text>
        <text x="0" y="${idx % 2 === 0 ? -46 : 86}" text-anchor="middle" fill="${theme.textPrimary}" font-family="monospace" font-size="10">${escapeXml(ep.detail)}</text>
      </g>`;
    })
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet">
  <rect width="100%" height="100%" fill="${theme.bg}" rx="16" stroke="${theme.border}" stroke-width="1" />
  <g transform="translate(24, 28)">
    <circle cx="6" cy="6" r="5" fill="${theme.primary}" />
    <text x="22" y="10" fill="${theme.textPrimary}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">DEVELOPER TIMELINE // CHRONOLOGICAL JOURNEY</text>
    <text x="22" y="26" fill="${theme.textMuted}" font-family="monospace" font-size="11">Engineering Evolution &bull; ${escapeXml(data.displayName)}</text>
  </g>
  <line x1="70" y1="${trackY}" x2="${width - 70}" y2="${trackY}" stroke="${theme.border}" stroke-width="4" stroke-linecap="round" />
  <line x1="70" y1="${trackY}" x2="${width - 70}" y2="${trackY}" stroke="${theme.primary}" stroke-width="2" stroke-linecap="round" />
  ${nodesSvg}
</svg>
  `.trim();
}

/**
 * Exhaustive master dispatcher for all 30 signature visualizations.
 * Zero silent fallbacks: every VisualizationId maps to its own distinct generator.
 */
export function generateUniversalVisualizationSvg(
  id: VisualizationId,
  data: NormalizedDeveloperIdentity,
  options: BaseSvgOptions | Partial<VisualizationConfig> = {}
): string {
  switch (id) {
    case 'commit-city':
      return generateCommitCitySvg(data, options);
    case 'commit-river':
      return generateCommitRiverSvg(data, options);
    case 'year-clock':
      return generateYearClockSvg(data, options);
    case 'coding-pulse':
      return generateCodingPulseSvg(data, options);
    case 'developer-terminal':
      return generateDeveloperTerminalSvg(data, options);
    case 'contribution-snake':
      return generateContributionSnakeSvg(data, options);
    case 'commit-waterfall':
      return generateCommitWaterfallSvg(data, options);
    case 'contribution-topography':
      return generateContributionTopographySvg(data, options);
    case 'coding-weather':
      return generateCodingWeatherSvg(data, options);
    case 'developer-seasons':
      return generateDeveloperSeasonsSvg(data, options);
    case 'repository-galaxy':
      return generateRepositoryGalaxySvg(data, options);
    case 'project-constellation':
      return generateProjectConstellationSvg(data, options);
    case 'codebase-blueprint':
      return generateCodebaseBlueprintSvg(data, options);
    case 'language-river':
      return generateLanguageRiverSvg(data, options);
    case 'tech-stack-solar-system':
      return generateTechStackSolarSystemSvg(data, options);
    case 'release-timeline':
      return generateReleaseTimelineSvg(data, options);
    case 'repository-tree':
      return generateRepositoryTreeSvg(data, options);
    case 'commit-constellation':
      return generateCommitConstellationSvg(data, options);
    case 'code-impact-map':
      return generateCodeImpactMapSvg(data, options);
    case 'collaboration-network':
      return generateCollaborationNetworkSvg(data, options);
    case 'developer-dna':
      return generateDeveloperDnaSvg(data, options);
    case 'engineering-radar':
      return generateEngineeringRadarSvg(data, options);
    case 'skill-tree':
      return generateSkillTreeSvg(data, options);
    case 'skill-constellation':
      return generateSkillConstellationSvg(data, options);
    case 'project-dna':
      return generateProjectDnaSvg(data, options);
    case 'opensource-footprints':
      return generateOpenSourceFootprintsSvg(data, options);
    case 'pr-flightpath':
      return generatePrFlightpathSvg(data, options);
    case 'issue-garden':
      return generateIssueGardenSvg(data, options);
    case 'year-in-code':
      return generateYearInCodeSvg(data, options);
    case 'developer-timeline':
      return generateDeveloperTimelineSvg(data, options);
    default: {
      const exhaustiveCheck: never = id;
      throw new Error(`Unsupported visualization id: ${String(exhaustiveCheck)}`);
    }
  }
}
