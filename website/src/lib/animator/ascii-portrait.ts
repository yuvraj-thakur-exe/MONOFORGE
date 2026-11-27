/**
 * MonoForge — Monochrome ASCII Portrait & Self-Hosted Terminal Profile Art Engine
 *
 * Converts any RGBA ImageData (from <canvas>) into a Camo-safe, self-typing
 * monochrome ASCII SVG (zero <script>, zero <foreignObject>) plus generates
 * self-hosted GitHub Actions + fetch-github.mjs bundles.
 */

export const ASCII_DENSITY_RAMP = ' .`:-=+*cs#%@';

export interface AsciiPortraitOptions {
  cols?: number;
  rows?: number;
  contrast?: number; // 1.0 = normal, 1.5 = high contrast
  threshold?: number; // 0..255 white cutoff
  fgColor?: string;
  bgColor?: string;
  accentColor?: string;
  staticFrame?: boolean;
  label?: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Converts RGBA pixel buffer into a monochrome ASCII character grid with
 * local contrast stretching so portraits stay crisp and readable.
 */
export function imageDataToAsciiGrid(
  rgba: Uint8ClampedArray,
  srcWidth: number,
  srcHeight: number,
  options: Pick<AsciiPortraitOptions, 'cols' | 'rows' | 'contrast' | 'threshold'> = {},
): string[] {
  const cols = Math.max(24, Math.min(120, options.cols ?? 84));
  const rows = Math.max(12, Math.min(64, options.rows ?? 42));
  const contrast = options.contrast ?? 1.35;
  const threshold = options.threshold ?? 242;

  if (srcWidth <= 0 || srcHeight <= 0 || rgba.length < 4) {
    return Array.from({ length: rows }, () => ' '.repeat(cols));
  }

  // First pass: sample cell luminances so we can stretch contrast
  const lums = new Float32Array(cols * rows);
  let minLum = 255;
  let maxLum = 0;

  for (let r = 0; r < rows; r++) {
    const sy = Math.min(srcHeight - 1, Math.floor(((r + 0.5) / rows) * srcHeight));
    for (let c = 0; c < cols; c++) {
      const sx = Math.min(srcWidth - 1, Math.floor(((c + 0.5) / cols) * srcWidth));
      const idx = (sy * srcWidth + sx) * 4;
      const alpha = (rgba[idx + 3] ?? 255) / 255;
      // Composite transparent pixels over pure white (255)
      const rVal = rgba[idx] * alpha + 255 * (1 - alpha);
      const gVal = rgba[idx + 1] * alpha + 255 * (1 - alpha);
      const bVal = rgba[idx + 2] * alpha + 255 * (1 - alpha);
      const lum = 0.299 * rVal + 0.587 * gVal + 0.114 * bVal;
      lums[r * cols + c] = lum;
      if (lum < minLum) minLum = lum;
      if (lum > maxLum) maxLum = lum;
    }
  }

  const span = Math.max(1, maxLum - minLum);
  const rampLen = ASCII_DENSITY_RAMP.length;
  const lines: string[] = [];

  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      const raw = lums[r * cols + c];
      if (raw >= threshold) {
        line += ' ';
        continue;
      }
      // Normalize + apply contrast around midpoint 128
      const norm = ((raw - minLum) / span) * 255;
      const contrasted = Math.max(0, Math.min(255, (norm - 128) * contrast + 128));
      // Bright -> sparse (0), Dark -> dense (rampLen - 1)
      const rampIdx = Math.min(
        rampLen - 1,
        Math.max(0, Math.round(((255 - contrasted) / 255) * (rampLen - 1))),
      );
      line += ASCII_DENSITY_RAMP[rampIdx];
    }
    lines.push(line);
  }

  return lines;
}

/**
 * Generates a synthetic geometric developer silhouette grid for instant preview
 * before the user uploads their own photo.
 */
export function buildSamplePortraitGrid(cols = 72, rows = 36): string[] {
  const lines: string[] = [];
  const cx = cols / 2;
  const cy = rows * 0.42;

  for (let r = 0; r < rows; r++) {
    let row = '';
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) / (cols * 0.22);
      const dy = (r - cy) / (rows * 0.34);
      const headDist = Math.sqrt(dx * dx + dy * dy);
      const shoulderDx = (c - cx) / (cols * 0.42);
      const shoulderDy = (r - rows * 0.92) / (rows * 0.36);
      const shoulderDist = Math.sqrt(shoulderDx * shoulderDx + shoulderDy * shoulderDy);

      if (headDist < 0.85) {
        // Subtle visor/glasses highlight
        if (Math.abs(dy + 0.05) < 0.14 && Math.abs(dx) < 0.58) {
          row += Math.abs(dx) < 0.12 ? '=' : '@';
        } else {
          const shade = headDist < 0.45 ? '#' : headDist < 0.68 ? '*' : ':';
          row += shade;
        }
      } else if (shoulderDist < 0.92 && r > rows * 0.62) {
        row += shoulderDist < 0.6 ? '%' : '+';
      } else {
        row += ' ';
      }
    }
    lines.push(row);
  }
  return lines;
}

/**
 * Generates a Camo-safe, self-contained animated monochrome ASCII SVG.
 * Uses CSS `@keyframes` clip-path reveal per row (plays once and freezes,
 * zero `<script>`, zero `<foreignObject>`).
 */
export function generateAsciiPortraitSvg(
  gridRows: string[],
  options: AsciiPortraitOptions = {},
): string {
  const rows = gridRows.length || 1;
  const cols = Math.max(1, ...gridRows.map((r) => r.length));
  const charW = 5.4;
  const lineH = 8.4;
  const padX = 16;
  const padY = 24;

  const width = Math.round(cols * charW + padX * 2);
  const height = Math.round(rows * lineH + padY + 26);
  const fgColor = options.fgColor ?? '#e2e8f0';
  const bgColor = options.bgColor ?? '#0f172a';
  const accentColor = options.accentColor ?? '#10b981';
  const staticFrame = options.staticFrame ?? false;
  const label = options.label ?? 'whoami --ascii';

  const rowDuration = 0.22;
  const stagger = 0.032;

  const textElements = gridRows
    .map((rowText, idx) => {
      const y = padY + 14 + idx * lineH;
      const delay = (idx * stagger).toFixed(3);
      const animStyle = staticFrame
        ? ''
        : ` style="animation: rowWipe ${rowDuration}s steps(24, end) ${delay}s both;"`;
      return `<text x="${padX}" y="${y}" class="ascii-row"${animStyle}>${escapeXml(rowText)}</text>`;
    })
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="MonoForge Monochrome ASCII Portrait">
  <style>
    .bg { fill: ${bgColor}; }
    .hdr { fill: #1e293b; }
    .hdr-text { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; fill: ${accentColor}; font-weight: 600; }
    .ascii-row {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 8.5px;
      fill: ${fgColor};
      white-space: pre;
    }
    @keyframes rowWipe {
      0% { opacity: 0; clip-path: inset(0 100% 0 0); }
      10% { opacity: 1; }
      100% { opacity: 1; clip-path: inset(0 0 0 0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ascii-row { animation: none !important; opacity: 1 !important; clip-path: none !important; }
    }
  </style>
  <rect class="bg" width="${width}" height="${height}" rx="10" />
  <rect class="hdr" x="0" y="0" width="${width}" height="24" rx="10" />
  <rect class="hdr" x="0" y="12" width="${width}" height="12" />
  <circle cx="14" cy="12" r="3.5" fill="#ef4444" />
  <circle cx="26" cy="12" r="3.5" fill="#f59e0b" />
  <circle cx="38" cy="12" r="3.5" fill="#10b981" />
  <text x="52" y="15.5" class="hdr-text">${escapeXml(label)}</text>
  <g>
    ${textElements}
  </g>
</svg>`;
}

/**
 * Generates self-hosted script + GitHub Actions workflow files so a user can
 * commit `data/github.json` + SVGs directly to their `<username>/<username>` repo.
 */
export function buildSelfHostedKitFiles(username: string): {
  fetchScript: string;
  workflowYml: string;
} {
  const safeUser = username.trim() || 'YOUR_USERNAME';

  const fetchScript = `// scripts/fetch-github.mjs
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const USERNAME = process.env.GITHUB_USERNAME || '${safeUser}';
const token = process.env.GITHUB_TOKEN || execSync('gh auth token').toString().trim();

const QUERY = \`{
  user(login: "\${USERNAME}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}\`;

const LEVEL = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: \`bearer \${token}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: QUERY }),
});

const json = await res.json();
const calendar = json.data.user.contributionsCollection.contributionCalendar;
const days = calendar.weeks.flatMap((w) => w.contributionDays);

mkdirSync('data', { recursive: true });
writeFileSync(
  'data/github.json',
  JSON.stringify(
    {
      username: USERNAME,
      start: days[0]?.date ?? null,
      total: calendar.totalContributions,
      counts: days.map((d) => d.contributionCount),
      levels: days.map((d) => LEVEL[d.contributionLevel] ?? 0).join(''),
    },
    null,
    2,
  ),
);
console.log(\`Saved \${days.length} days (\${calendar.totalContributions} total) to data/github.json\`);
`;

  const workflowYml = `name: Update MonoForge Profile Art

on:
  schedule:
    - cron: "17 6 * * *" # ~06:17 UTC daily
  workflow_dispatch: {}

permissions:
  contents: write

jobs:
  refresh-art:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Fetch GitHub contribution calendar
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GITHUB_USERNAME: ${safeUser}
        run: node scripts/fetch-github.mjs
      - name: Refresh diagonal contribution heatmap SVG
        run: |
          curl -fsSL "https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=diagonal-heatmap&user=${safeUser}&theme=emerald" -o contrib-heatmap.svg
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: refresh contribution graph [skip ci]"
          file_pattern: "data/github.json contrib-heatmap.svg"
`;

  return { fetchScript, workflowYml };
}
