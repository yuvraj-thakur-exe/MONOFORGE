'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfig } from '#/lib/plugins/types';
import confetti from 'canvas-confetti';
import {
  LayoutTemplate,
  Sparkles,
  Eye,
  X,
  Search,
  CheckCheck,
  Layers,
  Star,
  GitCompare,
  ArrowUpDown,
} from 'lucide-react';
import { playClickSound, playTone } from '#/lib/sound/sound-effects';
import { TemplateCompareModal } from '#/components/landing/TemplateCompareModal';
import { FullProfileDashboardModal } from '#/components/landing/FullProfileDashboardModal';

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
          <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 max-h-48 group-hover/preview:scale-[1.01] transition-transform bg-white dark:bg-slate-900">
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

export const TemplateGallery: React.FC = () => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<'all' | 'showcase-30' | 'catalog-100'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Preview & Customize Modal State
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [previewConfig, setPreviewConfig] = useState<ReadmeConfig | null>(null);
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

    // Hydrate ?template=<id> or #template=<id> shared URLs on mount
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let sharedId = params.get('template');
      if (!sharedId && window.location.hash) {
        const hashMatch = window.location.hash.match(/^#template=([^&]+)/);
        if (hashMatch?.[1]) {
          sharedId = decodeURIComponent(hashMatch[1]);
        }
      }
      if (sharedId) {
        const match = TEMPLATES.find(t => t.id === sharedId);
        if (match) {
          setPreviewTemplate(match);
          setPreviewConfig(JSON.parse(JSON.stringify(match.config)));
        }
      }
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
    const pool = activeCollection === 'showcase-30'
      ? TEMPLATES.filter(t => /^\d{2}-/.test(t.id))
      : activeCollection === 'catalog-100'
      ? TEMPLATES.filter(t => t.id.startsWith('tpl-'))
      : TEMPLATES;

    pool.forEach(t => {
      if (t.category) set.add(t.category);
    });
    return ['all', ...Array.from(set)];
  }, [activeCollection]);

  const [visibleCount, setVisibleCount] = useState<number>(36);

  const filtered = useMemo(() => {
    let list = TEMPLATES.filter(tmpl => {
      if (activeCollection === 'showcase-30') {
        if (!/^\d{2}-/.test(tmpl.id)) return false;
      } else if (activeCollection === 'catalog-100') {
        if (!tmpl.id.startsWith('tpl-')) return false;
      }

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
        (tmpl.prompt && tmpl.prompt.toLowerCase().includes(q)) ||
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
  }, [activeCollection, activeCategory, onlyFavorites, favorites, selectedStyle, selectedDevType, selectedDifficulty, searchQuery, sortBy]);

  // Reset pagination when collection, category, search or filters change
  useEffect(() => {
    setVisibleCount(36);
  }, [activeCollection, activeCategory, searchQuery, selectedStyle, selectedDevType, selectedDifficulty, onlyFavorites, sortBy]);

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


  // Share archetype via direct URL
  const handleShareTemplate = (tmpl: TemplateItem) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}${window.location.pathname}?template=${encodeURIComponent(tmpl.id)}`;
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
  };

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

        {/* 100 Templates Showcase Banner */}
        <div className="my-6 max-w-5xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl relative group">
          <img
            src="/assets/branding/100-templates-showcase.jpg"
            alt="MonoForge 100 GitHub Profile Templates Showcase"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">{TEMPLATES.length} ARCHETYPES</span>
              <span className="text-slate-300 font-bold hidden sm:inline">From Minimal to Cyberpunk, Anime to AI</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span>10 Disciplines</span>
              <span>•</span>
              <span>100% Fully Customizable</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Camo-Safe Export</span>
            </div>
          </div>
        </div>

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

      {/* Collection Switcher: All (130) vs 30 Master Showcase vs 100 System Catalog */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => {
            setActiveCollection('all');
            setActiveCategory('all');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeCollection === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black shadow-md border-2 border-slate-900 dark:border-white'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 font-bold'
          }`}
        >
          <span>All Templates</span>
          <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
            {TEMPLATES.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCollection('showcase-30');
            setActiveCategory('all');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeCollection === 'showcase-30'
              ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-950 shadow-[2px_2px_0px_#0f172a] font-black'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 font-bold'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Master Showcase</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-amber-400 text-[10px] font-black">
            {TEMPLATES.filter(t => /^\d{2}-/.test(t.id)).length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCollection('catalog-100');
            setActiveCategory('all');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeCollection === 'catalog-100'
              ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-950 shadow-[2px_2px_0px_#0f172a] font-black'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 font-bold'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-sky-500" />
          <span>100 Profile Catalog</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-sky-400 text-[10px] font-black">
            {TEMPLATES.filter(t => t.id.startsWith('tpl-')).length}
          </span>
        </button>
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
              data-category={cat}
              aria-pressed={isActive}
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
                    title="Copy Master AI Generation Prompt"
                    aria-label={`Copy Master AI prompt for ${tmpl.name}`}
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
                        <span className="font-bold text-slate-900 dark:text-white">Copy Prompt</span>
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
      {/* FULL PROFILE DASHBOARD PREVIEW MODAL (100+30 SIGNATURE ARCHETYPES) */}
      {mounted && previewTemplate && previewConfig && (
        <FullProfileDashboardModal
          template={previewTemplate}
          config={previewConfig}
          isOpen={Boolean(previewTemplate)}
          onClose={() => {
            setPreviewTemplate(null);
            setPreviewConfig(null);
          }}
          onApply={(tpl) => {
            setEntireConfig(tpl.config);
            setPreviewTemplate(null);
            setPreviewConfig(null);
            showToast(`Applied "${tpl.name}" dashboard to editor!`);
          }}
          onShare={handleShareTemplate}
        />
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
