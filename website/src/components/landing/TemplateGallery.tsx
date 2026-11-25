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
import { playClickSound } from '#/lib/sound/sound-effects';
import { TemplateCompareModal } from '#/components/landing/TemplateCompareModal';
import { FullProfileDashboardModal } from '#/components/landing/FullProfileDashboardModal';
import { TemplateReadmePreview } from '#/components/landing/TemplateReadmePreview';
import { copyToClipboard } from '#/lib/export/clipboard';
import { useRouter } from '#/i18n/navigation';

export { TEMPLATES, type TemplateItem } from '#/lib/templates/catalog';
import { TEMPLATES, type TemplateItem } from '#/lib/templates/catalog';

const KEYWORDS = [
  'stand out from day one',
  'level up your GitHub branding',
  'demand recruiter attention',
  'showcase clean architectures',
  'impress open-source peers',
];

export const TemplateGallery: React.FC = () => {
  const router = useRouter();
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
        showToast('Added to favorites');
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
    const pool =
      activeCollection === 'showcase-30'
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

      // Difficulty filter: When selectedDifficulty !== 'all', templates without difficulty metadata MUST NOT pass!
      if (selectedDifficulty !== 'all') {
        if (!tmpl.difficulty || tmpl.difficulty !== selectedDifficulty) {
          return false;
        }
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
  }, [
    activeCollection,
    activeCategory,
    onlyFavorites,
    favorites,
    selectedStyle,
    selectedDevType,
    selectedDifficulty,
    searchQuery,
    sortBy,
  ]);

  // Reset pagination when collection, category, search or filters change
  useEffect(() => {
    setVisibleCount(36);
  }, [
    activeCollection,
    activeCategory,
    searchQuery,
    selectedStyle,
    selectedDevType,
    selectedDifficulty,
    onlyFavorites,
    sortBy,
  ]);

  const displayedTemplates = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  // Copy AI prompt to clipboard with tactile confetti
  const handleCopyPrompt = async (template: TemplateItem) => {
    const res = await copyToClipboard(template.prompt);
    if (res.ok) {
      setCopiedPromptId(template.id);
      showToast(`AI prompt for "${template.name}" copied to clipboard!`);

      try {
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
      copyToClipboard(shareUrl);
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
    playClickSound();
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
          <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-black">
            {TEMPLATES.length} READY-TO-SHIP
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase font-sans">
          CURATED STARTER ARCHETYPES
        </h2>

        {/* Animated Subtitle */}
        <p className="text-sm font-mono text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          One-click apply clean, structured templates designed to{' '}
          <span
            className={`inline-block whitespace-nowrap font-black text-slate-950 bg-[#ffe600] px-2.5 py-0.5 rounded-md border border-slate-900 shadow-xs transition-opacity duration-300 ${
              fadeKeyword ? 'opacity-100' : 'opacity-0'
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

      {/* Collection Switcher: All vs 30 Master Showcase vs 100 System Catalog */}
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
          <span className="px-1.5 py-0.5 rounded-md bg-[#ffe600] text-slate-950 text-[10px] font-black">
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#ffe600] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] font-black'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-400 shadow-xs font-bold'
              }`}
            >
              <span className="capitalize">{cat}</span>
              <span
                className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md ${
                  isActive
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
          {(activeCategory !== 'all' ||
            searchQuery ||
            selectedStyle !== 'all' ||
            selectedDevType !== 'all' ||
            selectedDifficulty !== 'all' ||
            onlyFavorites ||
            sortBy !== 'default') && (
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

      {/* Grid of Templates (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {displayedTemplates.map(tmpl => {
          const isCopied = copiedPromptId === tmpl.id;
          const isFavorited = favorites.has(tmpl.id);
          const isCompared = compareList.includes(tmpl.id);
          const activeSectionsCount = tmpl.config.sections.length;
          const uniquePlugins = Array.from(new Set(tmpl.config.sections.map(s => s.type)));
          const accent = tmpl.accent || tmpl.config.settings.accentColor || '#f59e0b';

          return (
            <div
              key={tmpl.id}
              className="rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 flex flex-col justify-between overflow-hidden group h-full"
            >
              {/* Top Accent Strip */}
              <div className="h-1.5 w-full shrink-0" style={{ background: accent }} />

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Identity Header: Category + Badges + Favorite & Compare controls */}
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-lg font-black border bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20 shadow-2xs">
                        {tmpl.category}
                      </span>
                      {tmpl.featured && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md font-black bg-[#ffe600] text-slate-950 border border-slate-900 shadow-2xs">
                          Featured
                        </span>
                      )}
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
                        onClick={e => toggleCompare(tmpl.id, e)}
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
                        onClick={e => toggleFavorite(tmpl.id, e)}
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
                        style={{ backgroundColor: accent }}
                        title={`Accent: ${accent}`}
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors uppercase font-sans tracking-tight">
                    {tmpl.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-mono">
                    {tmpl.description}
                  </p>

                  {/* Tags */}
                  {tmpl.tags && tmpl.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tmpl.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actual README Preview in scrollable GitHub-style viewport (240-300px) */}
                  <div
                    onClick={() => handleOpenPreview(tmpl)}
                    className="my-3 cursor-pointer relative group/preview"
                  >
                    <TemplateReadmePreview
                      config={tmpl.config}
                      templateName={tmpl.name}
                      mode="compact"
                    />
                  </div>

                  {/* Compact Metadata: Plugins, Sections, Style, Difficulty */}
                  <div className="flex flex-wrap items-center justify-between gap-2 py-2 px-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span>
                        <b className="text-slate-800 dark:text-slate-200">{activeSectionsCount}</b> sections
                      </span>
                      <span>&bull;</span>
                      <span>
                        <b className="text-slate-800 dark:text-slate-200">{uniquePlugins.length}</b> plugins
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {tmpl.visualStyle && (
                        <span className="capitalize text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {tmpl.visualStyle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(tmpl)}
                    title="Copy Master AI Generation Prompt"
                    aria-label={`Copy Master AI prompt for ${tmpl.name}`}
                    className={`w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer shadow-[2px_2px_0px_#cbd5e1] dark:shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#cbd5e1] dark:hover:shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                      isCopied
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
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-mono text-xs font-black border-2 border-slate-950 shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 transition-all cursor-pointer"
            aria-label={`Show all ${filtered.length} archetypes`}
          >
            <span>Show All {filtered.length} Archetypes</span>
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 space-y-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xs">
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
            No archetypes matched your search &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setSelectedStyle('all');
              setSelectedDevType('all');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#ffe600] text-slate-950 font-mono text-xs font-black shadow-xs cursor-pointer hover:bg-[#fde047]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Full README Studio Preview Modal */}
      {mounted && previewTemplate && previewConfig && (
        <FullProfileDashboardModal
          template={previewTemplate}
          config={previewConfig}
          isOpen={Boolean(previewTemplate)}
          onClose={() => {
            setPreviewTemplate(null);
            setPreviewConfig(null);
          }}
          onApply={(tpl, appliedConfig) => {
            const finalConfig = appliedConfig || tpl.config;
            setEntireConfig(finalConfig);
            setPreviewTemplate(null);
            setPreviewConfig(null);
            showToast(`Applied "${tpl.name}" dashboard to editor!`);
            router.push('/developer');
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
        onRemoveTemplate={id => setCompareList(prev => prev.filter(x => x !== id))}
        onSelectTemplate={tmpl => {
          handleOpenPreview(tmpl);
          setIsComparing(false);
        }}
      />
    </section>
  );
};

export default TemplateGallery;
