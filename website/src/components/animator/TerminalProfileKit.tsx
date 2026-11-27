'use client';

import { useState, useMemo, useRef } from 'react';
import {
  Upload,
  Download,
  Copy,
  Check,
  Terminal,
  Sparkles,
  FileCode,
  Calendar,
  User,
  Workflow,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  buildSamplePortraitGrid,
  buildSelfHostedKitFiles,
  generateAsciiPortraitSvg,
  imageDataToAsciiGrid,
} from '#/lib/animator/ascii-portrait';
import {
  generateDiagonalHeatmapSvg,
  generateWhoamiCardSvg,
} from '#/lib/visualizations/svg-generators';
import { buildSyntheticDeveloperIdentity } from '#/lib/visualizations/data-engine';
import { copyToClipboard, downloadTextFile } from '#/lib/export/clipboard';

export function TerminalProfileKit() {
  const [username, setUsername] = useState('yuvraj-thakur-exe');
  const [nowText, setNowText] = useState('Building MonoForge & AI Developer Tools');
  const [prevText, setPrevText] = useState('Distributed Systems & Open-Source Tooling');
  const [stackText, setStackText] = useState('TypeScript · Next.js · Rust · Go');
  const [highlightsText, setHighlightsText] = useState('330+ README templates · 30 live SVGs');

  const [contrast, setContrast] = useState(1.35);
  const [threshold, setThreshold] = useState(242);
  const [asciiGrid, setAsciiGrid] = useState<string[]>(() => buildSamplePortraitGrid(72, 36));
  const [sourceImageData, setSourceImageData] = useState<ImageData | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hostingMode, setHostingMode] = useState<'hosted' | 'self-hosted'>('self-hosted');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const syntheticIdentity = useMemo(
    () => buildSyntheticDeveloperIdentity(username.trim() || 'developer'),
    [username],
  );

  const asciiSvg = useMemo(
    () =>
      generateAsciiPortraitSvg(asciiGrid, {
        label: `${username || 'dev'}@github ~ $ whoami --ascii`,
        staticFrame: false,
      }),
    [asciiGrid, username],
  );

  const whoamiSvg = useMemo(
    () =>
      generateWhoamiCardSvg(syntheticIdentity, {
        theme: 'emerald',
        nowText,
        prevText,
        stackText,
        highlightsText,
      }),
    [syntheticIdentity, nowText, prevText, stackText, highlightsText],
  );

  const heatmapSvg = useMemo(
    () => generateDiagonalHeatmapSvg(syntheticIdentity, { theme: 'emerald' }),
    [syntheticIdentity],
  );

  const { fetchScript, workflowYml } = useMemo(
    () => buildSelfHostedKitFiles(username),
    [username],
  );

  const readmeSnippet = useMemo(() => {
    const cleanUser = username.trim() || 'YOUR_USERNAME';
    const heatmapSrc =
      hostingMode === 'hosted'
        ? `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=diagonal-heatmap&user=${cleanUser}&theme=emerald`
        : './contrib-heatmap.svg';
    const whoamiSrc =
      hostingMode === 'hosted'
        ? `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=whoami&user=${cleanUser}&theme=emerald`
        : './info-card.svg';

    return `<div align="center">
  <h3><code>${cleanUser}@github ~ $ ./contributions.sh</code></h3>
  <img src="${heatmapSrc}" width="860" alt="${cleanUser} Contribution Heatmap" />
  <br><br>
  <h3><code>${cleanUser}@github ~ $ whoami</code></h3>
  <table>
    <tr>
      <td valign="top"><img src="./ascii-portrait.svg" width="370" alt="${cleanUser} ASCII Portrait" /></td>
      <td valign="top"><img src="${whoamiSrc}" width="490" alt="${cleanUser} Info Card" /></td>
    </tr>
  </table>
</div>`;
  }, [username, hostingMode]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 160;
      canvas.height = 80;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setSourceImageData(data);
      setAsciiGrid(
        imageDataToAsciiGrid(data.data, data.width, data.height, {
          cols: 76,
          rows: 38,
          contrast,
          threshold,
        }),
      );
      URL.revokeObjectURL(objectUrl);
      toast.success('Photo converted to Camo-safe monochrome ASCII SVG');
    };
    img.src = objectUrl;
  };

  const recomputeFromParams = (nextContrast: number, nextThreshold: number) => {
    setContrast(nextContrast);
    setThreshold(nextThreshold);
    if (sourceImageData) {
      setAsciiGrid(
        imageDataToAsciiGrid(sourceImageData.data, sourceImageData.width, sourceImageData.height, {
          cols: 76,
          rows: 38,
          contrast: nextContrast,
          threshold: nextThreshold,
        }),
      );
    }
  };

  const handleCopy = async (key: string, text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      toast.success(`${label} copied`);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <Terminal className="w-4 h-4" />
            <span>TERMINAL PROFILE ART &amp; SELF-HOSTED KIT</span>
          </div>
          <p className="text-xs text-slate-300">
            Generate a self-typing monochrome ASCII portrait, a neofetch <code>whoami</code> card,
            a diagonal-reveal heatmap, and a daily GitHub Action — zero third-party server lock-in.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setHostingMode('self-hosted')}
            className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
              hostingMode === 'self-hosted'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Self-Hosted SVGs
          </button>
          <button
            type="button"
            onClick={() => setHostingMode('hosted')}
            className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
              hostingMode === 'hosted'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            MonoForge Live API
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Photo -> ASCII Portrait */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              1. Monochrome ASCII Portrait (ascii-portrait.svg)
            </span>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-mono font-bold cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Upload Photo</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSourceImageData(null);
                  setAsciiGrid(buildSamplePortraitGrid(72, 36));
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
              >
                Sample
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
            <label className="space-y-1">
              <span className="text-slate-400">Contrast ({contrast.toFixed(2)}x)</span>
              <input
                type="range"
                min={0.8}
                max={2.4}
                step={0.05}
                value={contrast}
                onChange={(e) => recomputeFromParams(Number(e.target.value), threshold)}
                className="w-full accent-amber-400"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400">White Cutoff ({threshold})</span>
              <input
                type="range"
                min={180}
                max={255}
                step={1}
                value={threshold}
                onChange={(e) => recomputeFromParams(contrast, Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </label>
          </div>

          <div
            className="rounded-lg border border-slate-800 bg-slate-950 p-2 overflow-hidden flex justify-center"
            dangerouslySetInnerHTML={{ __html: asciiSvg }}
          />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => downloadTextFile(asciiSvg, 'ascii-portrait.svg', 'image/svg+xml')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-mono font-semibold border border-slate-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download ascii-portrait.svg</span>
            </button>
          </div>
        </div>

        {/* Right: Whoami Neofetch Card */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              2. Neofetch Whoami Card (info-card.svg)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="GitHub username"
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100"
            />
            <input
              type="text"
              value={stackText}
              onChange={(e) => setStackText(e.target.value)}
              placeholder="Stack"
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100"
            />
            <input
              type="text"
              value={nowText}
              onChange={(e) => setNowText(e.target.value)}
              placeholder="Now"
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100"
            />
            <input
              type="text"
              value={prevText}
              onChange={(e) => setPrevText(e.target.value)}
              placeholder="Prev"
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100"
            />
          </div>
          <input
            type="text"
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
            placeholder="Highlights"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono"
          />

          <div
            className="rounded-lg border border-slate-800 bg-slate-950 p-2 overflow-hidden flex justify-center"
            dangerouslySetInnerHTML={{ __html: whoamiSvg }}
          />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => downloadTextFile(whoamiSvg, 'info-card.svg', 'image/svg+xml')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-mono font-semibold border border-slate-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download info-card.svg</span>
            </button>
          </div>
        </div>
      </div>

      {/* Diagonal Heatmap Preview */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            3. Diagonal Reveal Heatmap (contrib-heatmap.svg)
          </span>
          <button
            type="button"
            onClick={() => downloadTextFile(heatmapSvg, 'contrib-heatmap.svg', 'image/svg+xml')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-mono font-semibold border border-slate-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download contrib-heatmap.svg</span>
          </button>
        </div>
        <div
          className="rounded-lg border border-slate-800 bg-slate-950 p-2 overflow-x-auto flex justify-center"
          dangerouslySetInnerHTML={{ __html: heatmapSvg }}
        />
      </div>

      {/* README Layout + Self-Hosted GitHub Action Export */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              4. Terminal README Layout (860px Aligned)
            </span>
            <button
              type="button"
              onClick={() => handleCopy('readme', readmeSnippet, 'Terminal README')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-mono font-bold cursor-pointer"
            >
              {copiedKey === 'readme' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'readme' ? 'Copied' : 'Copy README'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
            {readmeSnippet}
          </pre>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-emerald-400" />
              5. Daily GitHub Action &amp; GraphQL Script
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy('script', fetchScript, 'fetch-github.mjs')}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono border border-slate-700 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy script</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy('workflow', workflowYml, 'update-profile-art.yml')}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-mono font-bold cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Action YAML</span>
              </button>
            </div>
          </div>
          <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-[210px] leading-relaxed">
            {workflowYml}
          </pre>
        </div>
      </div>
    </div>
  );
}
