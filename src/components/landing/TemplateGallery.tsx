'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfig } from '#/lib/plugins/types';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Check,
  LayoutTemplate,
  Sparkles,
  Copy,
  Eye,
  X,
  Search,
  Code,
  CheckCheck,
  RefreshCw,
  Trash2,
  Layers,
  Share2,
  Download,
  Star,
  GitCompare,
  Smartphone,
  Tablet,
  Monitor,
  ArrowUpDown,
  BookOpen,
  MapPin,
  Mail,
  Link as LinkIcon,
  Building,
} from 'lucide-react';
import { playClickSound, playTone } from '#/lib/sound/sound-effects';
import { TemplateCompareModal } from '#/components/landing/TemplateCompareModal';

export { TEMPLATES, type TemplateItem } from '#/lib/templates/catalog';
import { TEMPLATES, type TemplateItem } from '#/lib/templates/catalog';

const KEYWORDS = [
  'stand out from day one',
  'level up your GitHub branding',
  'demand recruiter attention',
  'showcase clean architectures',
  'impress open-source peers',
];

const TEMPLATE_PREVIEWS: Record<string, string> = {
  'best-readme-flagship': '/assets/best-readme/banner.svg',
  'best-readme-fullstack': '/assets/best-readme/screenshot.png',
  'best-readme-systems': '/assets/best-readme/banner.svg',
  'best-readme-cloud': '/assets/best-readme/screenshot.png',
  'wow-3d-city-cat': '/assets/wow-profile-full.svg',
  'bento-signal-dashboard': '/assets/bento-dashboard-full.svg',
  'isometric-terminal-connect': '/assets/isometric-terminal.svg',
  'minimal-light-unicorn': '/assets/coding-unicorn.svg',
  'neon-craftsman-owl': '/assets/owl-confetti.svg',
  'constellation-devops-desk': '/assets/developer-desk.svg',
  'terminal-matrix-digital-rain': '/assets/terminal_animated.svg',
  'cyberpunk': '/assets/snake.svg',
  'gaming-retro-arcade': '/assets/pacman.svg',
  'demon-slayer-dark': '/assets/profile/slayer-night-coder-header.svg',
  'forge-telemetry-dashboard': '/assets/about-me-telemetry.svg',
  'minimalist': '/assets/text-effects.svg',
  'fullstack': '/assets/bento-dashboard-header.svg',
  'cloud-architect': '/assets/roaming-bot.svg',
  'oss-maintainer': '/assets/octocat-coffee.svg',
  'mobile-dev': '/assets/characters/dragonborn-paladin.svg',
  'creative-frontend': '/assets/digital-hands-divider.svg',
  'pinterest-lofi-aesthetic': '/assets/profile/pixel-retro-pc.png',
  'data-engineer-streaming': '/assets/breakout.svg',
  'game-dev-3d-graphics': '/assets/galaga.svg',
  'cyber-monkey-dj-station': '/assets/monkey-cyber-dj.svg',
  'cyber-monkey-hud': '/assets/monkey-code-hud.svg',
  'pixel-desk-coffee-coder': '/assets/developer-desk.svg',
  'matrix-green-cyber-runner': '/assets/terminal_animated.svg',
  'builder-craftsman-smith': '/assets/cyber-monkey-mascot.svg',
  'retro-game-boy-rom-hacker': '/assets/puzzle-bobble.svg',
  'audio-synthesizer-vst-dsp': '/assets/telemetry-music-player.svg',
  'autonomous-ai-agent-engineer': '/assets/agent-suite.svg',
  'vector-database-rag-architect': '/assets/telemetry-languages-donut.svg',
  'linux-kernel-ebpf-specialist': '/assets/telemetry-terminal-hud.svg',
  'wasm-compiler-systems-dev': '/assets/developer-mode.svg',
  'telemetry-sre-incident-commander': '/assets/telemetry-habits-radar.svg',
  'devops-gitops-argo-flux-core': '/assets/telemetry-isocalendar-3d.svg',
  'cloud-native-finops-engineer': '/assets/mock-streak-stats.svg',
  'zero-trust-identity-architect': '/assets/telemetry-achievements-rack.svg',
  'spatial-ar-vr-engine-dev': '/assets/animated-characters.svg',
  'high-frequency-crypto-algo': '/assets/telemetry-pagespeed-audit.svg',
  'frontend-microfrontends-architect': '/assets/bento-dashboard-header.svg',
  'synthwave-80s-delorean-grid': '/assets/cyber-stickers-pack.svg',
  'solar-punk-clean-tech-dev': '/assets/characters/dragonborn-paladin.svg',
  'space-satellite-aerospace-dev': '/assets/roaming-bot.svg',
  'quantum-cryptography-postquantum': '/assets/mock-github-stats.svg',
  'neuro-tech-bci-developer': '/assets/telemetry-terminal-hud.svg',
  'edge-iot-microcontrollers-rust': '/assets/bomberman.svg',
  'decentralized-storage-ipfs-core': '/assets/breakout.svg',
  'compiler-type-systems-researcher': '/assets/text-effects.svg',
  'accessibility-a11y-wcag-champion': '/assets/about-me-telemetry.svg',
  'embedded-automotive-autosar': '/assets/galaga.svg',
  'devrel-advocate-speaker': '/assets/animated-heroes-squad.svg',
  'database-internals-storage-engine': '/assets/isometric-terminal.svg',
  'mlops-feature-store-specialist': '/assets/telemetry-languages-donut.svg',
  'pixel-craftsman': '/assets/developer-desk.svg',
  'swiss-minimalist': '/assets/text-effects.svg',
  'isometric-polyglot': '/assets/isometric-terminal.svg',
};

const MODULE_DESCRIPTIONS: Record<string, { label: string; desc: string }> = {
  'capsule-banner': { label: 'Capsule Banner', desc: '60fps Camo CDN-safe animated waving header banner.' },
  'readme-typing-svg': { label: 'Kinetic Typewriter', desc: 'Dynamic typewriter terminal highlighting specializations.' },
  'mascot-bio': { label: 'Vector Kinematics Mascot', desc: 'Animated companion avatar with idle hovering & thruster glow.' },
  'telemetry-isocalendar': { label: '3D Isometric Skyline', desc: 'Live 3D isometric GitHub contribution city calendar.' },
  'portfolio-contributions': { label: 'Contribution Grid', desc: 'Real 52-week contributor activity matrix.' },
  'pie-chart': { label: 'Language Donut', desc: 'Interactive language distribution donut chart with percentages.' },
  'github-readme-stats': { label: 'Verified Stats', desc: 'Real verified commits, pull requests, and stars telemetry.' },
  'skill-icons': { label: 'Skill Icons', desc: 'High-contrast responsive tech stack badge matrix.' },
  'socials': { label: 'Social & Sponsors', desc: 'Verified developer social pills and sponsor badges.' },
  'projects-showcase': { label: 'Project Showcase', desc: 'Curated repository cards with live star telemetry.' },
  'activity-graph': { label: 'Activity Wave', desc: 'Annual commit activity wave radar with streak counter.' },
  'waka-readme-stats': { label: 'WakaTime Metrics', desc: 'Verified editor metrics and coding time distribution.' },
  'github-profile-trophy': { label: 'Achievement Trophies', desc: 'Gamified trophies celebrating stars, PRs, and streaks.' },
  'github-achievements': { label: 'GitHub Achievements', desc: 'Official GitHub badges (Quickdraw, Pull Shark, Pair Extraordinaire).' },
  'snk': { label: 'Arcade Snake Game', desc: 'Retro arcade snake eating contribution commits in a 60fps loop.' },
  'figma-design': { label: 'Figma Showcase', desc: 'Interactive Figma design system cards and prototype links.' },
  'pinterest-image': { label: 'Visual Moodboard', desc: 'Aesthetic visual moodboard grid integration.' },
  'footer': { label: 'Camo Footer', desc: 'Camo-compliant footer emblem and visitor counter.' },
  'markdown-badges': { label: 'Markdown Badges', desc: 'Shields.io vector badges for tools and frameworks.' },
  'custom-html': { label: 'Sanitized HTML', desc: 'Safe Camo-compliant custom HTML block.' },
};

export const InteractiveArchetypeCardPreview: React.FC<{
  tmpl: TemplateItem;
  staticImage?: string;
  onOpenModal: () => void;
}> = ({ tmpl, staticImage, onOpenModal }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'stack' | 'telemetry'>('visual');
  const [showStatic, setShowStatic] = useState<boolean>(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const accent = tmpl.accent || '#ffe600';
  const gh = tmpl.config.settings.user.github || 'octocat';
  const role = tmpl.config.settings.user.role || 'Software Craftsman';
  const initial = (tmpl.config.settings.user.name?.[0] || gh?.[0] || 'D').toUpperCase();

  const uniqueModules = useMemo(() => {
    return Array.from(new Set(tmpl.config.sections.map(s => s.type)));
  }, [tmpl.config.sections]);

  const activeModuleInfo = selectedModule ? MODULE_DESCRIPTIONS[selectedModule] : null;

  return (
    <div className="my-3.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f172a] shadow-xs hover:border-slate-900 dark:hover:border-slate-500 transition-all overflow-hidden">
      {/* Top Interactive Sub-Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono">
        {/* Sub-tab pills */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('visual');
              setShowStatic(false);
              playClickSound();
            }}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'visual' && !showStatic
                ? 'bg-[#ffe600] text-slate-950 border border-slate-900 shadow-2xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Live Vector
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('stack');
              playClickSound();
            }}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'stack'
                ? 'bg-[#ffe600] text-slate-950 border border-slate-900 shadow-2xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Modules ({uniqueModules.length})
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('telemetry');
              playClickSound();
            }}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-[#ffe600] text-slate-950 border border-slate-900 shadow-2xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Telemetry
          </button>

          {staticImage && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowStatic(prev => !prev);
                playClickSound();
              }}
              title="Toggle between Interactive Canvas and Static Artwork"
              className={`ml-1 px-1.5 py-0.5 rounded border text-[10px] font-bold cursor-pointer transition-colors ${
                showStatic
                  ? 'bg-emerald-500 text-slate-950 border-emerald-600 font-black'
                  : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              Art
            </button>
          )}
        </div>

        {/* Action badge to inspect in full modal */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="text-[10px] font-black flex items-center gap-1 px-2 py-0.5 rounded bg-[#ffe600] text-slate-950 border border-slate-900 shadow-2xs hover:bg-[#fde047] active:scale-95 transition-transform cursor-pointer"
          title="Inspect full archetype and specification"
          aria-label={`Inspect archetype ${tmpl.name}`}
        >
          <Eye className="w-3 h-3 text-slate-950" />
          <span>Inspect</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div
        onClick={onOpenModal}
        className="p-3 cursor-pointer relative select-none transition-colors group/preview"
      >
        {/* If user toggled static art and an image exists, show the artwork */}
        {showStatic && staticImage ? (
          <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 max-h-48 group-hover/preview:scale-[1.01] transition-transform bg-white dark:bg-[#060913]">
            <img
              src={staticImage}
              alt={`${tmpl.name} Visual Preview`}
              width={400}
              height={160}
              decoding="async"
              className="w-full h-40 object-cover object-top"
              style={{ aspectRatio: '400 / 160' }}
            />
          </div>
        ) : activeTab === 'stack' ? (
          /* TAB: Modules Arsenal */
          <div className="w-full h-40 p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between overflow-hidden font-mono">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[10px]">
              <span className="text-slate-400 font-bold uppercase tracking-wider">
                Active Modules &amp; Plugins ({uniqueModules.length})
              </span>
              <span className="text-emerald-400 font-black">● 100% CAMO SAFE</span>
            </div>

            <div className="flex flex-wrap gap-1.5 py-1.5 overflow-y-auto max-h-24 scrollbar">
              {uniqueModules.map((mod) => {
                const info = MODULE_DESCRIPTIONS[mod] || { label: mod, desc: mod };
                const isSelected = selectedModule === mod;
                return (
                  <button
                    key={mod}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModule(isSelected ? null : mod);
                      playTone(1200, 'sine', 0.04, 0.02);
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ffe600] text-slate-950 border-slate-950 font-black scale-105 shadow-2xs'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {info.label}
                  </button>
                );
              })}
            </div>

            {/* Micro description ticker */}
            <div className="pt-1 border-t border-slate-800 text-[9px] text-slate-400 truncate">
              {activeModuleInfo ? (
                <span className="text-amber-400 font-bold">
                  {activeModuleInfo.label}: {activeModuleInfo.desc}
                </span>
              ) : (
                <span>Hover or click a module chip to inspect capability.</span>
              )}
            </div>
          </div>
        ) : activeTab === 'telemetry' ? (
          /* TAB: Telemetry Radar & Activity */
          <div className="w-full h-40 p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between overflow-hidden font-mono text-white">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[10px]">
              <span className="text-slate-400 font-bold uppercase">Dynamic Telemetry Engine</span>
              <span className="text-amber-400 font-black">LIVE GITHUB FETCH</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[8px] text-slate-400 uppercase font-bold block">VERIFIED COMMITS</span>
                <span className="text-sm font-black text-emerald-400">2,847</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[8px] text-slate-400 uppercase font-bold block">ACTIVE STREAK</span>
                <span className="text-sm font-black" style={{ color: accent }}>🔥 42 Days</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[8px] text-slate-400 uppercase font-bold block">GLOBAL RANK</span>
                <span className="text-sm font-black text-cyan-400">Top 1%</span>
              </div>
            </div>

            {/* Language distribution bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                <span>LANGUAGES (DONUT BREAKDOWN)</span>
                <span className="text-slate-300">TS 58% · Rust 24% · Python 18%</span>
              </div>
              <div className="h-2 w-full rounded-full overflow-hidden flex bg-slate-800">
                <div style={{ width: '58%', backgroundColor: accent }} />
                <div style={{ width: '24%', backgroundColor: '#10b981' }} />
                <div style={{ width: '18%', backgroundColor: '#06b6d4' }} />
              </div>
            </div>
          </div>
        ) : (
          /* TAB: Interactive Live Vector Canvas */
          <div
            className="w-full h-40 p-3 rounded-lg border border-slate-800 flex flex-col justify-between overflow-hidden relative shadow-inner select-none transition-transform group-hover/preview:scale-[1.01]"
            style={{
              background: `radial-gradient(circle at 85% 15%, ${accent}25, transparent 65%), #0f172a`,
            }}
          >
            {/* Top Bar with Mini Mascot / Avatar & User */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-slate-950 border border-slate-900 shadow-2xs transition-transform group-hover/preview:rotate-6"
                  style={{ backgroundColor: accent }}
                >
                  {initial}
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-mono font-black text-white block truncate max-w-[140px]">
                    @{gh}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-300 block truncate max-w-[140px]">
                    {role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className="text-[9px] font-mono font-black px-2 py-0.5 rounded-md border border-slate-900 shadow-2xs uppercase"
                  style={{ backgroundColor: accent, color: '#0f172a' }}
                >
                  {tmpl.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="60fps Camo Safe" />
              </div>
            </div>

            {/* Simulated Bento / Metric Badges */}
            <div className="grid grid-cols-3 gap-1.5 py-1">
              <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-center hover:bg-slate-850 transition-colors">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">COMMITS</span>
                <span className="text-xs font-mono font-black text-emerald-400">2,840+</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-center hover:bg-slate-850 transition-colors">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">STREAK</span>
                <span className="text-xs font-mono font-black flex items-center justify-center gap-0.5" style={{ color: accent }}>
                  🔥 42d
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-center hover:bg-slate-850 transition-colors">
                <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">GLOBAL</span>
                <span className="text-xs font-mono font-black text-cyan-400">Top 1%</span>
              </div>
            </div>

            {/* Interactive Velocity Wave Line Strip with Hover Feedback */}
            <div className="relative">
              {hoveredBar !== null && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[9px] font-mono text-amber-400 shadow-md pointer-events-none whitespace-nowrap z-10">
                  Week {hoveredBar + 1}: {Math.round(hoveredBar * 14 + 22)} actions
                </div>
              )}
              <div className="flex items-end gap-1 h-5 px-1.5 pt-1 bg-slate-950/90 rounded-md border border-slate-800">
                {[25, 45, 80, 40, 100, 65, 30, 90, 75, 50, 85, 95, 60, 70, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="flex-1 rounded-t-xs transition-all hover:scale-y-125 hover:brightness-125 cursor-pointer"
                    style={{
                      height: `${h}%`,
                      backgroundColor: hoveredBar === i ? '#ffe600' : (i % 2 === 0 ? accent : '#10b981'),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function renderProceduralPreview(tmpl: TemplateItem) {
  const accent = tmpl.accent || '#ffe600';
  const gh = tmpl.config.settings.user.github || 'developer';
  const role = tmpl.config.settings.user.role || 'Software Craftsman';
  const initial = (tmpl.config.settings.user.name?.[0] || gh?.[0] || 'D').toUpperCase();

  return (
    <div
      className="w-full h-40 p-3 rounded-lg border-2 border-slate-900 dark:border-slate-700 flex flex-col justify-between overflow-hidden relative shadow-inner select-none transition-transform group-hover/preview:scale-[1.01]"
      style={{
        background: `radial-gradient(circle at 85% 15%, ${accent}30, transparent 65%), #0f172a`,
      }}
    >
      {/* Top Bar with Mini Mascot / Avatar & User */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-slate-950 border border-slate-900 shadow-2xs"
            style={{ backgroundColor: accent }}
          >
            {initial}
          </div>
          <div className="leading-tight">
            <span className="text-xs font-mono font-black text-white block truncate max-w-[150px]">
              @{gh}
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-300 block truncate max-w-[150px]">
              {role}
            </span>
          </div>
        </div>

        <span
          className="text-[9px] font-mono font-black px-2 py-0.5 rounded-md border border-slate-900 shadow-2xs"
          style={{ backgroundColor: accent, color: '#0f172a' }}
        >
          {tmpl.category}
        </span>
      </div>

      {/* Simulated Bento / Metric Badges */}
      <div className="grid grid-cols-3 gap-1.5 py-1">
        <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-center">
          <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">COMMITS</span>
          <span className="text-xs font-mono font-black text-emerald-400">2,840+</span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-center">
          <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">STREAK</span>
          <span className="text-xs font-mono font-black flex items-center justify-center gap-0.5" style={{ color: accent }}>
            🔥 42d
          </span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-center">
          <span className="text-[8px] font-mono text-slate-400 uppercase block font-bold">GLOBAL</span>
          <span className="text-xs font-mono font-black text-cyan-400">Top 1%</span>
        </div>
      </div>

      {/* Activity Wave Line Strip */}
      <div className="flex items-end gap-1 h-5 px-1.5 pt-1 bg-slate-950/90 rounded-md border border-slate-800">
        {[25, 45, 80, 40, 100, 65, 30, 90, 75, 50, 85, 95, 60, 70, 85, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-xs"
            style={{
              height: `${h}%`,
              backgroundColor: i % 2 === 0 ? accent : '#10b981',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function renderModuleVisual(
  sec: { id: string; type: string; props?: Record<string, any> },
  isCentered: boolean = false,
  username: string = 'octocat',
  accentColor: string = '#ec4899',
) {
  switch (sec.type) {
    case 'snk':
      return (
        <div
          className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-slate-300 dark:border-slate-700 shadow-[3px_3px_0px_#334155] dark:shadow-[3px_3px_0px_#0f172a] space-y-3 ${isCentered ? 'text-center' : 'text-left'
            }`}
        >
          <div
            className={`flex items-center justify-between text-xs font-mono font-bold text-slate-900 dark:text-white ${isCentered ? 'flex-col sm:flex-row gap-2' : ''
              }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                github contribution grid snake animation
              </span>
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-emerald-400 text-slate-950 border border-slate-900 font-black shadow-2xs">
              ● 60FPS CAMO SAFE
            </span>
          </div>

          {/* Snake Grid Graphic */}
          <div className="rounded-xl bg-slate-950 p-3 sm:p-4 border-2 border-slate-800 overflow-x-auto shadow-inner">
            <div className={`flex items-center justify-between gap-4 min-w-[320px] ${isCentered ? 'mx-auto' : ''}`}>
              <div className="flex gap-1.5">
                {[...Array(18)].map((_, col) => (
                  <div key={col} className="flex flex-col gap-1.5">
                    {[...Array(5)].map((_, row) => {
                      const isSnakeHead = col === 12 && row === 2;
                      const isSnakeBody =
                        (col === 11 && row === 2) ||
                        (col === 10 && row === 2) ||
                        (col === 9 && row === 2) ||
                        (col === 9 && row === 3) ||
                        (col === 8 && row === 3);
                      const isFood = (col === 13 && row === 2) || (col === 16 && row === 1);
                      const isCommit =
                        (col + row) % 3 === 0
                          ? '#216e39'
                          : (col * 2 + row) % 5 === 0
                            ? '#30a14e'
                            : (col + row * 3) % 4 === 0
                              ? '#9be9a8'
                              : '#161b22';

                      return (
                        <div
                          key={row}
                          className={`w-3 h-3 rounded-xs relative ${isSnakeHead
                              ? 'bg-[#ffe600] scale-110 shadow-[0_0_8px_#ffe600] z-10'
                              : isSnakeBody
                                ? 'bg-[#40c463]'
                                : isFood
                                  ? 'bg-[#ec4899] animate-ping'
                                  : ''
                            }`}
                          style={{
                            backgroundColor: isSnakeHead
                              ? '#ffe600'
                              : isSnakeBody
                                ? '#40c463'
                                : isFood
                                  ? '#ec4899'
                                  : isCommit,
                          }}
                          title={`Col ${col}, Row ${row}`}
                        >
                          {isSnakeHead && (
                            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-slate-950 font-black">
                              ••
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-black text-[#ffe600] block">
                  🐍 eating commits
                </span>
                <span className="text-[10px] font-mono text-slate-400 block">
                  60fps Camo CDN Loop
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'pie-chart':
      return (
        <div
          className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-slate-300 dark:border-slate-700 shadow-[3px_3px_0px_#334155] dark:shadow-[3px_3px_0px_#0f172a] space-y-3 ${isCentered ? 'text-center' : 'text-left'
            }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h5 className="font-mono text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Top Languages Breakdown
              </h5>
              <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-bold">
                {username}&apos;s Language Donut Chart
              </p>
            </div>
            <span className="self-start sm:self-auto text-[10px] px-2.5 py-0.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-950 dark:text-cyan-300 border border-slate-900 dark:border-cyan-700 font-black shadow-2xs">
              DONUT CHART
            </span>
          </div>

          <div className={`flex flex-col sm:flex-row items-center gap-4 pt-1 ${isCentered ? 'justify-center' : ''}`}>
            {/* Donut SVG */}
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#3178c6"
                  strokeWidth="4.5"
                  strokeDasharray="51 88"
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#dea584"
                  strokeWidth="4.5"
                  strokeDasharray="21 88"
                  strokeDashoffset="-51"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="4.5"
                  strokeDasharray="16 88"
                  strokeDashoffset="-72"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-black text-slate-900 dark:text-white">
                100%
              </div>
            </div>

            {/* Language Breakdown Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3178c6] border border-slate-900" />
                TypeScript <b className="text-slate-950 dark:text-white font-black">58.4%</b>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dea584] border border-slate-900" />
                Rust <b className="text-slate-950 dark:text-white font-black">23.6%</b>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899] border border-slate-900" />
                WebGL / GLSL <b className="text-slate-950 dark:text-white font-black">18.0%</b>
              </span>
            </div>
          </div>
        </div>
      );

    case 'activity-graph':
      return (
        <div
          className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-slate-300 dark:border-slate-700 shadow-[3px_3px_0px_#334155] dark:shadow-[3px_3px_0px_#0f172a] space-y-3 ${isCentered ? 'text-center' : 'text-left'
            }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h5 className="font-mono text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Annual Contribution Activity
              </h5>
              <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-bold">
                {username}&apos;s Contribution Activity Graph
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#ffe600] text-slate-950 border border-slate-900 font-black shadow-2xs">
                🔥 42 DAYS STREAK
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-300 border border-slate-900 dark:border-emerald-700 font-bold">
                2,847 COMMITS
              </span>
            </div>
          </div>

          {/* Activity Graph Wave Bars */}
          <div className="h-16 flex items-end gap-1.5 pt-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            {[35, 60, 25, 80, 95, 55, 40, 75, 100, 68, 88, 48, 72, 85, 92, 64].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-xs border border-slate-900 dark:border-slate-700 transition-all hover:opacity-80"
                style={{
                  height: `${h}%`,
                  backgroundColor: i % 3 === 0 ? (accentColor || '#ec4899') : '#ffe600',
                }}
                title={`Week ${i + 1}: ${h * 3} actions`}
              />
            ))}
          </div>
        </div>
      );

    case 'github-profile-trophy':
      return (
        <div
          className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-slate-300 dark:border-slate-700 shadow-[3px_3px_0px_#334155] dark:shadow-[3px_3px_0px_#0f172a] space-y-3 ${isCentered ? 'text-center' : 'text-left'
            }`}
        >
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-900 dark:text-white">
            <span className="font-mono text-xs font-black uppercase tracking-wider">
              🏆 GitHub Achievements &amp; Trophies
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-300 border border-slate-900 dark:border-amber-700 font-black">
              RANK AAA
            </span>
          </div>
          <div className={`flex items-center gap-2 pt-1 overflow-x-auto ${isCentered ? 'justify-center' : ''}`}>
            {[
              { icon: '🥇', label: 'Multi-Language Polyglot', rank: 'AAA' },
              { icon: '⚡', label: 'Fast PR Master', rank: 'S' },
              { icon: '⭐', label: '1K Stars Earned', rank: 'Gold' },
              { icon: '🔥', label: '365 Streak Active', rank: 'AAA' },
            ].map((trophy, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-xs font-mono font-black text-slate-900 dark:text-white shadow-2xs whitespace-nowrap flex items-center gap-1.5"
              >
                <span>{trophy.icon}</span>
                <span>{trophy.label}</span>
                <span className="text-[9px] px-1 rounded bg-[#ffe600] text-slate-950 ml-1">
                  {trophy.rank}
                </span>
              </span>
            ))}
          </div>
        </div>
      );

    case 'github-readme-stats':
      return (
        <div
          className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-slate-300 dark:border-slate-700 shadow-[3px_3px_0px_#334155] dark:shadow-[3px_3px_0px_#0f172a] space-y-3 ${isCentered ? 'text-center' : 'text-left'
            }`}
        >
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-900 dark:text-white">
            <span className="font-mono text-xs font-black uppercase tracking-wider">
              📊 Verified GitHub Statistics
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#ffe600] text-slate-950 border border-slate-900 font-black">
              LIVE TELEMETRY
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 font-mono text-xs">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xs text-center">
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-bold">TOTAL COMMITS</span>
              <span className="font-black text-lg text-slate-900 dark:text-white">2,847</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xs text-center">
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-bold">PULL REQUESTS</span>
              <span className="font-black text-lg text-amber-600 dark:text-amber-400">142</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xs text-center">
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-bold">STARS EARNED</span>
              <span className="font-black text-lg text-emerald-600 dark:text-emerald-400">890</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xs text-center">
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-bold">REPOSITORIES</span>
              <span className="font-black text-lg text-cyan-600 dark:text-cyan-400">38</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="p-4 rounded-xl bg-white dark:bg-[#1e293b] border-2 border-slate-300 dark:border-slate-700 shadow-[2px_2px_0px_#334155] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-mono text-xs font-black text-slate-900 dark:text-white uppercase">{sec.type}</span>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">Module ID: {sec.id}</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-mono font-bold">
            Configured
          </span>
        </div>
      );
  }
}

export const TemplateGallery: React.FC = () => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Preview & Customize Modal State
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [previewConfig, setPreviewConfig] = useState<ReadmeConfig | null>(null);
  const [previewTab, setPreviewTab] = useState<'visual' | 'github' | 'markdown' | 'prompt' | 'plugins'>('visual');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  // Studio Filter & Compare States
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedDevType, setSelectedDevType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'featured' | 'popular' | 'name' | 'sections'>('default');
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('monoforge:favorites');
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    } catch {
      // Ignored
    }
  }, []);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playClickSound();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from favorites');
      } else {
        next.add(id);
        showToast('Added to favorites! ⭐');
        try {
          confetti({ particleCount: 22, spread: 50, origin: { y: 0.7 } });
        } catch {
          // Ignored
        }
      }
      try {
        localStorage.setItem('monoforge:favorites', JSON.stringify(Array.from(next)));
      } catch {
        // Ignored
      }
      return next;
    });
  };

  const toggleCompare = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playClickSound();
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 archetypes can be compared at once');
        return prev;
      }
      showToast('Added to comparison matrix');
      return [...prev, id];
    });
  };

  // Dynamic Keyword Text Animation
  const [keywordIdx, setKeywordIdx] = useState<number>(0);
  const [fadeKeyword, setFadeKeyword] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeKeyword(false);
      setTimeout(() => {
        setKeywordIdx(prev => (prev + 1) % KEYWORDS.length);
        setFadeKeyword(true);
      }, 250);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    TEMPLATES.forEach(t => {
      if (t.category) set.add(t.category);
    });
    return ['all', ...Array.from(set)];
  }, []);

  const [visibleCount, setVisibleCount] = useState<number>(36);

  const filtered = useMemo(() => {
    let list = TEMPLATES.filter(tmpl => {
      const matchesCat = activeCategory === 'all' || tmpl.category === activeCategory;
      if (!matchesCat) return false;

      if (onlyFavorites && !favorites.has(tmpl.id)) {
        return false;
      }

      if (selectedStyle !== 'all') {
        const style = selectedStyle.toLowerCase();
        const matchesStyle =
          tmpl.visualStyle === selectedStyle ||
          tmpl.category.toLowerCase().includes(style) ||
          tmpl.name.toLowerCase().includes(style) ||
          (tmpl.tags && tmpl.tags.some(t => t.toLowerCase().includes(style)));
        if (!matchesStyle) return false;
      }

      if (selectedDevType !== 'all') {
        const dev = selectedDevType.toLowerCase();
        const matchesDev =
          tmpl.developerType === selectedDevType ||
          tmpl.category.toLowerCase().includes(dev) ||
          tmpl.name.toLowerCase().includes(dev) ||
          (tmpl.tags && tmpl.tags.some(t => t.toLowerCase().includes(dev)));
        if (!matchesDev) return false;
      }

      if (selectedDifficulty !== 'all') {
        if (tmpl.difficulty && tmpl.difficulty !== selectedDifficulty) return false;
      }

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const matchesSearch =
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q) ||
        tmpl.category.toLowerCase().includes(q) ||
        (tmpl.tags && tmpl.tags.some(t => t.toLowerCase().includes(q))) ||
        tmpl.config.sections.some(s => s.type.toLowerCase().includes(q));

      return matchesSearch;
    });

    if (sortBy === 'featured') {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'popular') {
      list = [...list].sort((a, b) => (b.popularity || 80) - (a.popularity || 80));
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'sections') {
      list = [...list].sort((a, b) => b.config.sections.length - a.config.sections.length);
    }

    return list;
  }, [activeCategory, onlyFavorites, favorites, selectedStyle, selectedDevType, selectedDifficulty, searchQuery, sortBy]);

  // Reset pagination when category, search or filters change
  useEffect(() => {
    setVisibleCount(36);
  }, [activeCategory, searchQuery, selectedStyle, selectedDevType, selectedDifficulty, onlyFavorites, sortBy]);

  const displayedTemplates = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  // Copy AI prompt to clipboard with tactile confetti
  const handleCopyPrompt = async (template: TemplateItem) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(template.prompt);
      setCopiedPromptId(template.id);
      showToast(`AI prompt for "${template.name}" copied to clipboard!`);

      try {
        const { default: confetti } = await import('canvas-confetti');
        confetti({
          particleCount: 22,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#ffe600', '#f59e0b', '#06b6d4', '#10b981'],
        });
      } catch {
        // Ignored
      }

      setTimeout(() => {
        setCopiedPromptId(null);
      }, 2200);
    }
  };


  // Download generated markdown file
  const handleDownloadMarkdown = (tmplName: string, markdownContent: string) => {
    try {
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${tmplName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-README.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded ${link.download}!`);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch {
        // Ignored
      }
    } catch {
      showToast('Download failed, copying markdown to clipboard instead.');
      navigator.clipboard?.writeText(markdownContent);
    }
  };

  // Share archetype via direct URL
  const handleShareTemplate = (tmpl: TemplateItem) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}${window.location.pathname}#template=${tmpl.id}`;
      navigator.clipboard?.writeText(shareUrl);
      showToast(`Direct link to "${tmpl.name}" copied!`);
      try {
        confetti({ particleCount: 20, spread: 45, origin: { y: 0.8 }, colors: ['#ffe600', '#06b6d4'] });
      } catch {
        // Ignored
      }
    }
  };

  // Open Preview Modal
  const handleOpenPreview = (template: TemplateItem) => {
    setPreviewTemplate(template);
    setPreviewConfig(JSON.parse(JSON.stringify(template.config)));
    setPreviewTab('visual');
  };

  // Remove a plugin from the active preview
  const handleRemovePluginFromPreview = (sectionId: string) => {
    if (!previewConfig) return;
    setPreviewConfig({
      ...previewConfig,
      sections: previewConfig.sections.filter(s => s.id !== sectionId),
    });
    showToast('Plugin removed from preview');
  };

  // Reset plugins in preview to original template state
  const handleResetPreviewPlugins = () => {
    if (!previewTemplate) return;
    setPreviewConfig(JSON.parse(JSON.stringify(previewTemplate.config)));
    showToast('All plugins restored to template default');
  };

  // Apply directly from preview modal
  const handleApplyFromPreview = () => {
    if (!previewConfig || !previewTemplate) return;
    setEntireConfig(previewConfig);
    const md = buildMarkdown(previewConfig);
    setPreviewTemplate(null);
    setPreviewConfig(null);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(md);
      showToast(`Customized "${previewTemplate.name}" applied & Markdown copied!`);
    } else {
      showToast(`Customized "${previewTemplate.name}" applied to profile!`);
    }
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }
  };

  // Merge directly from preview modal
  const handleMergeFromPreview = () => {
    if (!previewConfig || !previewTemplate) return;
    const current = useReadmeStore.getState().config;
    setEntireConfig({
      ...current,
      sections: [...current.sections, ...previewConfig.sections],
    });
    setPreviewTemplate(null);
    setPreviewConfig(null);
    showToast(`Plugins from "${previewTemplate.name}" merged into your profile!`);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }
  };

  // Generated Markdown for preview
  const previewMarkdown = useMemo(() => {
    if (!previewConfig) return '';
    try {
      return buildMarkdown(previewConfig);
    } catch {
      return '# README Preview';
    }
  }, [previewConfig]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto space-y-8 relative font-sans text-slate-900 dark:text-slate-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold shadow-[4px_4px_0px_#0f172a] animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Dynamic Text Animation */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono font-bold shadow-xs">
          <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
          <span>CURATED STARTERS &amp; ARCHETYPES</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-black">{TEMPLATES.length} READY-TO-SHIP</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase font-sans">
          CURATED STARTER ARCHETYPES
        </h2>

        {/* Animated Subtitle */}
        <p className="text-sm font-mono text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          One-click apply clean, structured templates designed to{' '}
          <span
            className={`inline-block whitespace-nowrap font-black text-slate-950 bg-[#ffe600] px-2.5 py-0.5 rounded-md border border-slate-900 shadow-xs transition-opacity duration-300 ${fadeKeyword ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {KEYWORDS[keywordIdx]}
          </span>
          .
        </p>

        {/* Search Bar */}
        <div className="pt-3 w-full max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by archetype, stack, or keyword..."
              aria-label="Search archetypes by name, category, or tech stack"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3 text-slate-500 hover:text-slate-900 dark:hover:text-white p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map(cat => {
          const count = cat === 'all' ? TEMPLATES.length : TEMPLATES.filter(t => t.category === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${isActive
                  ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] font-black'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-400 shadow-xs font-bold'
                }`}
            >
              <span className="capitalize">{cat}</span>
              <span
                className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md ${isActive
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                  }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-Filters & Studio Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-mono shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Visual Style Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Style:</span>
            <select
              value={selectedStyle}
              onChange={e => setSelectedStyle(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:border-amber-400 cursor-pointer text-xs"
            >
              <option value="all">All Styles</option>
              <option value="minimal">Minimalist</option>
              <option value="cyberpunk">Cyberpunk &amp; Neon</option>
              <option value="terminal">Terminal &amp; ASCII</option>
              <option value="editorial">Editorial &amp; Typography</option>
              <option value="isometric">3D &amp; Isometric</option>
              <option value="illustrated">Illustrated &amp; Mascots</option>
              <option value="anime">Anime &amp; Gaming</option>
              <option value="dashboard">Data Dashboard</option>
            </select>
          </div>

          {/* Dev Role Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Role:</span>
            <select
              value={selectedDevType}
              onChange={e => setSelectedDevType(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:border-amber-400 cursor-pointer text-xs"
            >
              <option value="all">All Disciplines</option>
              <option value="fullstack">Full-Stack Engineer</option>
              <option value="frontend">Frontend Specialist</option>
              <option value="backend">Backend &amp; Distributed</option>
              <option value="devops">Cloud &amp; DevOps</option>
              <option value="ai-ml">AI / ML / Data Science</option>
              <option value="mobile">Mobile &amp; Cross-Platform</option>
              <option value="oss-maintainer">Open-Source Maintainer</option>
              <option value="student">Student &amp; Learner</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:border-amber-400 cursor-pointer text-xs"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner (Zero Config)</option>
              <option value="intermediate">Intermediate (Telemetry)</option>
              <option value="advanced">Advanced (3D / Animations)</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:border-amber-400 cursor-pointer text-xs"
            >
              <option value="default">Default Order</option>
              <option value="featured">Featured First</option>
              <option value="popular">Most Popular</option>
              <option value="name">Name (A-Z)</option>
              <option value="sections">Module Arsenal Count</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Favorites Filter Toggle */}
          <button
            type="button"
            onClick={() => setOnlyFavorites(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
              onlyFavorites
                ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-900'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current text-slate-950' : 'text-amber-500'}`} />
            <span>Favorites ({favorites.size})</span>
          </button>

          {/* Reset All Filters Button */}
          {(activeCategory !== 'all' || searchQuery || selectedStyle !== 'all' || selectedDevType !== 'all' || selectedDifficulty !== 'all' || onlyFavorites || sortBy !== 'default') && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedStyle('all');
                setSelectedDevType('all');
                setSelectedDifficulty('all');
                setOnlyFavorites(false);
                setSortBy('default');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Archetypes Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 px-1 pt-1">
        <span>
          Showing <b className="text-slate-900 dark:text-white">{displayedTemplates.length}</b> of{' '}
          <b className="text-slate-900 dark:text-white">{filtered.length}</b> Signature Archetypes
        </span>
        {visibleCount < filtered.length ? (
          <button
            type="button"
            onClick={() => setVisibleCount(filtered.length)}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
          >
            Show All ({filtered.length})
          </button>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> All Loaded
          </span>
        )}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {displayedTemplates.map((tmpl) => {
          const isCopied = copiedPromptId === tmpl.id;
          const isFavorited = favorites.has(tmpl.id);
          const isCompared = compareList.includes(tmpl.id);

          return (
            <div
              key={tmpl.id}
              className="rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div
                className="h-1.5 w-full shrink-0"
                style={{ background: tmpl.accent || '#f59e0b' }}
              />

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Card Controls: Category + Difficulty + Accent + Compare + Favorite */}
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-lg font-black border bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20 shadow-2xs">
                        {tmpl.category}
                      </span>
                      {tmpl.difficulty && (
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md font-black border ${
                            tmpl.difficulty === 'beginner'
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                              : tmpl.difficulty === 'intermediate'
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                              : 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30'
                          }`}
                        >
                          {tmpl.difficulty}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Compare Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleCompare(tmpl.id, e)}
                        title={isCompared ? 'Remove from comparison matrix' : 'Add to compare (max 3)'}
                        aria-label={`Compare ${tmpl.name}`}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isCompared
                            ? 'bg-[#ffe600] text-slate-950 border-slate-950 font-black shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>

                      {/* Favorite Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(tmpl.id, e)}
                        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                        aria-label={`Favorite ${tmpl.name}`}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isFavorited
                            ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current text-slate-950' : ''}`} />
                      </button>

                      {/* Accent Dot */}
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-xs border border-slate-900/40 ml-0.5"
                        style={{ backgroundColor: tmpl.accent }}
                        title={`Accent: ${tmpl.accent}`}
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors uppercase font-sans tracking-tight">
                    {tmpl.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-mono">
                    {tmpl.description}
                  </p>

                  {/* Tag Pills */}
                  {tmpl.tags && tmpl.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tmpl.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interactive Visual Preview Window Box */}
                  <InteractiveArchetypeCardPreview
                    tmpl={tmpl}
                    staticImage={TEMPLATE_PREVIEWS[tmpl.id]}
                    onOpenModal={() => handleOpenPreview(tmpl)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(tmpl)}
                    title="Copy Archetype Spec"
                    aria-label={`Copy archetype specification for ${tmpl.name}`}
                    className={`w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer shadow-[2px_2px_0px_#cbd5e1] dark:shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#cbd5e1] dark:hover:shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${isCopied
                        ? 'bg-emerald-600 text-white border-emerald-700 font-black'
                        : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-slate-900'
                      }`}
                  >
                    {isCopied ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                        <span className="text-white font-black">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
                        <span className="font-bold text-slate-900 dark:text-white">Copy Spec</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenPreview(tmpl)}
                    title="Preview Archetype & Markdown"
                    aria-label={`Preview archetype ${tmpl.name}`}
                    style={{ backgroundColor: '#ffe600', color: '#020617' }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono font-black border-2 border-slate-950 shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#0f172a] hover:bg-[#fde047] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a] transition-all cursor-pointer active:scale-95"
                  >
                    <Eye className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                    <span className="text-slate-950 font-black tracking-wide">Live Preview</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination / Load More Bar */}
      {visibleCount < filtered.length && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-2">
          <button
            type="button"
            onClick={() => setVisibleCount(prev => Math.min(prev + 24, filtered.length))}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs font-bold border-2 border-slate-300 dark:border-slate-700 shadow-xs hover:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
            aria-label={`Load 24 more archetypes. ${filtered.length - visibleCount} remaining`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load More Archetypes (+24) &bull; {filtered.length - visibleCount} remaining</span>
          </button>
          <button
            type="button"
            onClick={() => setVisibleCount(filtered.length)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 transition-all cursor-pointer"
            aria-label={`Show all ${filtered.length} archetypes`}
          >
            <span>Show All {filtered.length} Archetypes</span>
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 space-y-3 bg-white dark:bg-[#111827] border-2 border-[#DCE3EF] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
          <p className="text-sm font-mono text-[#64748B] dark:text-slate-300">No archetypes matched your search &quot;{searchQuery}&quot;.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-mono text-xs font-black shadow-xs cursor-pointer hover:opacity-95"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================
          FULL INTERACTIVE PREVIEW & CUSTOMIZE MODAL
          ======================================================== */}
      {mounted && previewTemplate && previewConfig && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#111827] border-2 border-[#DCE3EF] dark:border-slate-700 rounded-3xl flex flex-col overflow-hidden text-[#172033] dark:text-slate-100 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)]"
          >
            {/* Top Accent Strip */}
            <div className="h-2 w-full shrink-0 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4]" />

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#F8FAFC] dark:bg-[#0B101D] border-b border-[#DCE3EF] dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border border-slate-900 shadow-xs shrink-0"
                  style={{ backgroundColor: previewTemplate.accent }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-[#172033] dark:text-white uppercase font-sans tracking-tight">
                      {previewTemplate.name}
                    </h3>
                    <span
                      className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-black border bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE] dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800 shadow-2xs"
                    >
                      {previewTemplate.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] dark:text-slate-300 font-mono line-clamp-1">{previewTemplate.description}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setPreviewTemplate(null);
                  setPreviewConfig(null);
                }}
                className="p-1.5 rounded-xl border border-[#DCE3EF] dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#EEF2FF] dark:hover:bg-slate-700 text-[#172033] dark:text-slate-100 transition-colors shadow-xs cursor-pointer"
                title="Close preview"
                aria-label="Close template preview modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs & Viewport Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-2.5 bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-300 dark:border-slate-800 text-xs font-mono font-bold">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setPreviewTab('visual')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${previewTab === 'visual'
                      ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-900 shadow-2xs font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:text-slate-900 hover:border-slate-900'
                    }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTab('github')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${previewTab === 'github'
                      ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-900 shadow-2xs font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:text-slate-900 hover:border-slate-900'
                    }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>GitHub Profile View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTab('markdown')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${previewTab === 'markdown'
                      ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-900 shadow-2xs font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:text-slate-900 hover:border-slate-900'
                    }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Markdown Output</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTab('prompt')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${previewTab === 'prompt'
                      ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-900 shadow-2xs font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:text-slate-900 hover:border-slate-900'
                    }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Archetype Spec</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTab('plugins')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${previewTab === 'plugins'
                      ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-900 shadow-2xs font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:text-slate-900 hover:border-slate-900'
                    }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Manage Plugins ({previewConfig.sections.length})</span>
                </button>
              </div>

              {/* Viewport Switcher */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700 shrink-0">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  title="Desktop (100% width)"
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-[#ffe600] text-slate-950 font-black shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  title="Tablet (768px width)"
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    previewDevice === 'tablet'
                      ? 'bg-[#ffe600] text-slate-950 font-black shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  title="Mobile (375px width)"
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-[#ffe600] text-slate-950 font-black shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100">
              <div
                className={`transition-all duration-300 mx-auto ${
                  previewDevice === 'desktop'
                    ? 'w-full'
                    : previewDevice === 'tablet'
                    ? 'w-full max-w-[768px] border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-slate-900 shadow-xl'
                    : 'w-full max-w-[375px] border-2 border-slate-300 dark:border-slate-700 rounded-3xl p-3 bg-white dark:bg-slate-900 shadow-2xl'
                }`}
              >
              {/* TAB 1: Visual Simulated GitHub Profile */}
              {previewTab === 'visual' && (
                <div className="space-y-4">
                  {/* High-Fidelity Asset Banner or Procedural Fallback */}
                  {TEMPLATE_PREVIEWS[previewTemplate.id] ? (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-md space-y-2">
                      <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-mono text-slate-900 dark:text-white font-black flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-amber-500" /> High-Fidelity Showcase
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                          100% Camo Compliant
                        </span>
                      </div>
                      <img
                        src={TEMPLATE_PREVIEWS[previewTemplate.id]}
                        alt={`${previewTemplate.name} Showcase`}
                        className="w-full h-auto object-contain rounded-lg max-h-[380px] mx-auto"
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-md space-y-2">
                      <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-mono text-slate-900 dark:text-white font-black flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-amber-500" /> Dynamic Vector Archetype Showcase
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                          Live Procedural Preview
                        </span>
                      </div>
                      {renderProceduralPreview(previewTemplate)}
                    </div>
                  )}

                  {/* macOS Profile Header Box */}
                  {(() => {
                    const isCentered = previewConfig.settings.align === 'center';
                    return (
                      <div
                        className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5 shadow-sm ${isCentered ? 'text-center' : 'text-left'
                          }`}
                      >
                        {/* macOS Window Controls Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                            <span className="w-3 h-3 rounded-full bg-[#eab308]" />
                            <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                            <span className="ml-2 font-mono text-xs font-black text-slate-900 dark:text-white px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                              README.md
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>● 60FPS CAMO SAFE</span>
                          </span>
                        </div>

                        {/* Developer Heading, Role & Bio */}
                        <div className="space-y-3">
                          <h4 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                            Hi there, I&apos;m {previewConfig.settings.user.name} 👋
                          </h4>
                          <div className={isCentered ? 'flex justify-center' : 'flex justify-start'}>
                            <span
                              className="inline-block px-3.5 py-1.5 rounded-xl text-slate-950 font-mono text-xs sm:text-sm font-black border border-slate-900 shadow-xs"
                              style={{ backgroundColor: previewTemplate.accent || '#ffe600' }}
                            >
                              {previewConfig.settings.user.role}
                            </span>
                          </div>
                          <p
                            className={`text-sm sm:text-base text-slate-600 dark:text-slate-300 font-mono pt-1 leading-relaxed max-w-2xl ${isCentered ? 'mx-auto' : ''
                              }`}
                          >
                            {previewConfig.settings.user.bio}
                          </p>
                        </div>

                        {/* Metadata Badges */}
                        <div
                          className={`flex flex-wrap gap-2.5 pt-2 text-xs font-mono font-bold ${isCentered ? 'justify-center' : 'justify-start'
                            }`}
                        >
                          {previewConfig.settings.user.location && (
                            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700">
                              📍 Based in <b>{previewConfig.settings.user.location}</b>
                            </span>
                          )}
                          {previewConfig.settings.user.status && (
                            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700">
                              🔭 Currently: <b>{previewConfig.settings.user.status}</b>
                            </span>
                          )}
                          {previewConfig.settings.user.pronouns && (
                            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700">
                              💬 Pronouns: <b>{previewConfig.settings.user.pronouns}</b>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Plugins Simulated Cards */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-black">
                      Active Telemetry Modules &amp; SVGs ({previewConfig.sections.length})
                    </h5>

                    {previewConfig.sections.length === 0 ? (
                      <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center text-xs font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/50">
                        This archetype is ultra-minimalist and relies purely on clean bio, markdown lists, and typography.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {previewConfig.sections.map(sec => (
                          <div key={sec.id} className="relative group/sec">
                            {renderModuleVisual(sec, previewConfig.settings.align === 'center', previewConfig.settings.user.github || 'octocat', previewTemplate.accent || '#ffe600')}
                            <button
                              type="button"
                              onClick={() => handleRemovePluginFromPreview(sec.id)}
                              className="absolute top-3 right-3 p-1 rounded-lg bg-red-50 dark:bg-red-950/60 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900 text-xs font-mono transition-colors shadow-xs"
                              title="Remove plugin from this preview"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: Full GitHub Profile View Simulation */}
              {previewTab === 'github' && (
                <div className="space-y-4 font-sans text-slate-900 dark:text-slate-100">
                  {/* Simulated GitHub Top Navigation */}
                  <div className="rounded-xl bg-[#24292f] text-slate-200 px-4 py-2.5 flex items-center justify-between text-xs font-mono border border-slate-700 shadow-sm">
                    <div className="flex items-center gap-3">
                      <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20" fill="currentColor">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                      </svg>
                      <span className="font-bold text-white">github.com/{previewConfig.settings.user.github || 'octocat'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-300">
                      <span className="hidden sm:inline bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-slate-400">Type / to search</span>
                      <span className="font-bold">Pull requests</span>
                      <span className="font-bold">Issues</span>
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                        {(previewConfig.settings.user.name?.[0] || 'O').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Simulated GitHub Sub-Tabs */}
                  <div className="flex items-center gap-4 px-2 border-b border-slate-200 dark:border-slate-800 text-xs font-sans font-medium text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 py-2.5 border-b-2 border-[#fd8c73] text-slate-900 dark:text-white font-bold">
                      <BookOpen className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      <span>Overview</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-2.5 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                      <span>Repositories</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">42</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-2.5 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                      <span>Projects</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">3</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-2.5 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                      <span>Packages</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-2.5 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                      <span>Stars</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">128</span>
                    </div>
                  </div>

                  {/* Realistic 2-Column GitHub Profile Layout */}
                  <div className="flex flex-col md:flex-row gap-6 pt-2">
                    {/* Left Column: User Sidebar */}
                    <div className="w-full md:w-64 lg:w-72 shrink-0 space-y-4">
                      <div className="flex flex-col items-start space-y-3">
                        {/* Large Circular Avatar */}
                        <div className="relative">
                          <div
                            className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-slate-900 shadow-md flex items-center justify-center text-4xl font-black"
                            style={{ color: previewTemplate.accent || '#ffe600' }}
                          >
                            {(previewConfig.settings.user.name?.[0] || 'O').toUpperCase()}
                          </div>
                          <span className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-xs shadow-xs" title="Status: Focus Mode">
                            ⚡
                          </span>
                        </div>

                        {/* User Identity */}
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {previewConfig.settings.user.name || 'Alex Mercer'}
                          </h2>
                          <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                            @{previewConfig.settings.user.github || 'octocat'}
                          </span>
                        </div>

                        {/* Edit Profile Button */}
                        <button
                          type="button"
                          className="w-full py-1.5 px-3 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer"
                        >
                          Edit profile
                        </button>

                        {/* User Bio */}
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                          {previewConfig.settings.user.bio || 'Building open-source tools and high-performance distributed systems.'}
                        </p>

                        {/* Followers / Following Stats */}
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-sans">
                          <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                            👥 814 <span className="font-normal text-slate-500">followers</span>
                          </span>
                          <span>&bull;</span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            23 <span className="font-normal text-slate-500">following</span>
                          </span>
                        </div>

                        {/* Metadata Details */}
                        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-1 font-sans">
                          <div className="flex items-center gap-2">
                            <Building className="w-3.5 h-3.5 text-slate-500" />
                            <span>MonoForge Open Source</span>
                          </div>
                          {previewConfig.settings.user.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-500" />
                              <span>{previewConfig.settings.user.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span className="truncate">{previewConfig.settings.user.github || 'developer'}@monoforge.dev</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-blue-600 dark:text-blue-400 truncate">https://monoforge-studio.vercel.app</span>
                          </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 w-full">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Achievements</h4>
                          <div className="flex items-center gap-2 flex-wrap text-lg">
                            <span title="Pull Shark (x2)">🦈</span>
                            <span title="Quickdraw">⚡</span>
                            <span title="Pair Extraordinaire">👥</span>
                            <span title="Starstruck">⭐</span>
                            <span title="Heart On Your Sleeve">💖</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Pinned Repos + README Container */}
                    <div className="flex-1 space-y-5 min-w-0">
                      {/* Pinned Repos Section */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                          <span className="font-semibold text-slate-900 dark:text-white">Pinned</span>
                          <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Customize your pins</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { name: 'monoforge-engine', desc: 'Deterministic Camo-compliant SVG animator & profile studio', lang: 'TypeScript', color: '#3178c6', stars: '1.4k', forks: '182' },
                            { name: 'distributed-raft-kv', desc: 'Zero-allocation distributed consensus log in Rust', lang: 'Rust', color: '#dea584', stars: '890', forks: '64' },
                            { name: 'neural-mesh-transformer', desc: 'Edge-accelerated vector embedding search in WASM', lang: 'Python', color: '#3572A5', stars: '640', forks: '48' },
                            { name: 'hyper-kernel-ebpf', desc: 'Real-time network observability driver for high throughput', lang: 'C', color: '#555555', stars: '415', forks: '32' },
                          ].map((repo, i) => (
                            <div key={i} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs hover:border-slate-400 transition-colors">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate">
                                  {repo.name}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 font-mono">
                                  Public
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {repo.desc}
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
                                  {repo.lang}
                                </span>
                                <span>⭐ {repo.stars}</span>
                                <span>🍴 {repo.forks}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* GitHub Profile README Container */}
                      <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                        {/* README.md Header Box */}
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-300 dark:border-slate-700 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-bold text-slate-900 dark:text-white">
                              {previewConfig.settings.user.github || 'octocat'} / README.md
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                              ● Camo Safe
                            </span>
                            <span className="text-slate-400">✏️</span>
                          </div>
                        </div>

                        {/* README Rendered Content */}
                        <div className="p-4 sm:p-6 space-y-4">
                          <div className={`space-y-2 ${previewConfig.settings.align === 'center' ? 'text-center' : 'text-left'}`}>
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                              Hi there, I&apos;m {previewConfig.settings.user.name} 👋
                            </h3>
                            <span
                              className="inline-block px-3 py-1 rounded-md text-xs font-bold text-slate-950 shadow-2xs"
                              style={{ backgroundColor: previewTemplate.accent || '#ffe600' }}
                            >
                              {previewConfig.settings.user.role}
                            </span>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-mono pt-1">
                              {previewConfig.settings.user.bio}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2">
                            {previewConfig.sections.map(sec => (
                              <div key={sec.id}>
                                {renderModuleVisual(sec, previewConfig.settings.align === 'center', previewConfig.settings.user.github || 'octocat', previewTemplate.accent || '#ffe600')}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Raw Markdown Source */}
              {previewTab === 'markdown' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">Generated Markdown Output</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(previewMarkdown);
                          setCopiedMarkdown(true);
                          showToast('Markdown copied to clipboard!');
                          setTimeout(() => setCopiedMarkdown(false), 2200);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-mono text-xs font-black shadow-xs cursor-pointer"
                    >
                      {copiedMarkdown ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Markdown!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800 text-xs text-slate-100 font-mono overflow-x-auto whitespace-pre-wrap max-h-96 select-all leading-relaxed shadow-lg">
                    {previewMarkdown}
                  </pre>
                </div>
              )}

              {/* TAB 3: AI Prompt */}
              {previewTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-black uppercase text-slate-900 dark:text-white font-mono">
                          Archetype Specification &amp; Markdown
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">
                        Deterministic Camo-Compliant Markdown
                      </span>
                    </div>

                    <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-mono bg-slate-50 dark:bg-[#0a0f1d] p-4 rounded-xl border border-slate-200 dark:border-slate-800 select-all">
                      {previewTemplate.prompt}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(previewTemplate)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-mono font-black text-xs bg-[#ffe600] hover:bg-[#fde047] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] cursor-pointer"
                    >
                      {copiedPromptId === previewTemplate.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Prompt Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Archetype Spec</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: Manage Plugins */}
              {previewTab === 'plugins' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-black text-slate-900 dark:text-white uppercase">
                        Active Plugins in this Archetype ({previewConfig.sections.length})
                      </h4>
                      <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                        Remove plugins to customize before applying to your profile.
                      </p>
                    </div>
                    {previewConfig.sections.length < previewTemplate.config.sections.length && (
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-mono text-xs font-bold border border-slate-900 shadow-xs hover:bg-amber-300 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Restore All Plugins</span>
                      </button>
                    )}
                  </div>

                  {previewConfig.sections.length === 0 ? (
                    <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3 bg-white dark:bg-slate-800/50">
                      <p className="text-xs font-mono text-slate-600 dark:text-slate-400">All plugins have been removed from this preview.</p>
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="px-4 py-2 rounded-xl bg-[#ffe600] text-slate-950 font-mono text-xs font-bold border-2 border-slate-900 shadow-xs cursor-pointer"
                      >
                        Restore Plugins
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {previewConfig.sections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-mono text-[11px] text-slate-900 dark:text-slate-100 font-black">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="text-xs font-black text-slate-900 dark:text-white font-mono uppercase">
                                {sec.type}
                              </span>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                ID: {sec.id}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemovePluginFromPreview(sec.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/60 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900 text-xs font-mono transition-colors shadow-xs cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(previewTemplate)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Copy Spec</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(previewMarkdown);
                      setCopiedMarkdown(true);
                      showToast('Markdown copied to clipboard!');
                      setTimeout(() => setCopiedMarkdown(false), 2000);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadMarkdown(previewTemplate.name, previewMarkdown)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs cursor-pointer"
                  title="Download README.md"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Download .md</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareTemplate(previewTemplate)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs cursor-pointer"
                  title="Share direct link to this archetype"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Share</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMergeFromPreview}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs font-bold border-2 border-slate-900 dark:border-slate-700 shadow-xs cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Add to My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyFromPreview}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-mono text-xs font-black border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] hover:shadow-[4px_4px_0px_#0f172a] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Floating Compare Dock */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-2 border-[#ffe600] text-white shadow-2xl animate-in slide-in-from-bottom-5 max-w-[95vw]">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-[#ffe600] animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Comparing <b className="text-[#ffe600]">{compareList.length}</b>/3:
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {compareList.map(id => {
                const item = TEMPLATES.find(t => t.id === id);
                return (
                  <span
                    key={id}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-amber-300 border border-slate-700 truncate max-w-[120px]"
                    title={item?.name || id}
                  >
                    {item?.name || id}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            <button
              type="button"
              onClick={() => setIsComparing(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-mono text-xs font-black border border-slate-950 shadow-xs cursor-pointer flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Compare Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => setCompareList([])}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Clear comparison list"
              aria-label="Clear comparison list"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Template Comparison Modal */}
      <TemplateCompareModal
        templates={TEMPLATES.filter(t => compareList.includes(t.id))}
        isOpen={isComparing}
        onClose={() => setIsComparing(false)}
        onSelectTemplate={(tmpl) => {
          handleOpenPreview(tmpl);
          setIsComparing(false);
        }}
      />
    </section>
  );
};

export default TemplateGallery;
