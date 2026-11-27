'use client';

import { useMemo, useState } from 'react';
import { useRouter } from '#/i18n/navigation';
import {
  Search,
  Copy,
  Check,
  Plus,
  ShieldCheck,
  Layers,
  Package,
  Sparkles,
  Link2,
  Eye,
  Code2,
} from 'lucide-react';
import {
  getAllAssets,
  COMMUNITY_ASSET_REGISTRY,
} from '#/lib/assets/registry';
import { inspect_asset } from '#/lib/assets/asset-discovery';
import type { AssetDefinition, CommunityAsset, AssetCategory, AssetFormat } from '#/lib/assets/types';
import { useReadmeStore } from '#/store/useReadmeStore';
import { toast } from 'sonner';

const RAW_ASSET_BASE = 'https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/website/public';

interface VaultCardItem {
  id: string;
  source: 'library' | 'marketplace' | 'curated';
  name: string;
  description: string;
  category: string;
  format: string;
  tags: string[];
  camoUrl: string;
  previewUrl?: string;
  markdown: string;
  isProtected?: boolean;
  authorLabel?: string;
  rawAsset?: AssetDefinition;
}

const CURATED_VAULT_STICKERS: VaultCardItem[] = [
  {
    id: 'vault-hands-divider',
    source: 'curated',
    name: 'Digital Hands Kinematic Divider',
    description: 'Minimalist animated hands reaching across a cyber divide.',
    category: 'dividers',
    format: 'svg',
    tags: ['divider', 'hands', 'kinematic'],
    camoUrl: `${RAW_ASSET_BASE}/assets/digital-hands-divider.svg`,
    previewUrl: '/assets/digital-hands-divider.svg',
    markdown: `<p align="center">\n  <img src="${RAW_ASSET_BASE}/assets/digital-hands-divider.svg" width="100%" alt="Digital Hands Kinematic Divider" />\n</p>`,
  },
  {
    id: 'vault-cyber-stickers',
    source: 'curated',
    name: 'Cyber Stickers Vector Pack',
    description: 'Camo-compliant vector stickers bundle for developer README headers.',
    category: 'stickers',
    format: 'svg',
    tags: ['stickers', 'cyber', 'mascot'],
    camoUrl: `${RAW_ASSET_BASE}/assets/cyber-stickers-pack.svg`,
    previewUrl: '/assets/cyber-stickers-pack.svg',
    markdown: `<p align="center">\n  <img src="${RAW_ASSET_BASE}/assets/cyber-stickers-pack.svg" width="100%" alt="Cyber Stickers Vector Pack" />\n</p>`,
  },
  {
    id: 'vault-terminal-hud',
    source: 'curated',
    name: 'Terminal HUD Vector Banner',
    description: 'CRT green developer status console powered by MonoForge native SVG.',
    category: 'banners',
    format: 'svg',
    tags: ['terminal', 'hud', 'telemetry'],
    camoUrl: 'https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=terminal&user=developer',
    previewUrl: '/assets/telemetry-terminal-hud.svg',
    markdown: '<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=terminal&user=developer" width="100%" alt="Terminal HUD" />\n</p>',
  },
  {
    id: 'vault-developer-desk',
    source: 'curated',
    name: 'Developer Desk Workspace Sticker',
    description: 'Dual-monitor isometric developer workstation mascot sticker.',
    category: 'stickers',
    format: 'svg',
    tags: ['desk', 'developer', 'character'],
    camoUrl: `${RAW_ASSET_BASE}/assets/developer-desk.svg`,
    previewUrl: '/assets/developer-desk.svg',
    markdown: `<p align="center">\n  <img src="${RAW_ASSET_BASE}/assets/developer-desk.svg" width="320" alt="Developer Desk Workspace" />\n</p>`,
  },
];

function extractCamoUrlFromMarkdown(md: string): string {
  const match = md.match(/src=["']([^"']+)["']/i);
  if (match?.[1]) return match[1];
  const mdMatch = md.match(/!\[[^\]]*\]\(([^)]+)\)/);
  if (mdMatch?.[1]) return mdMatch[1];
  return 'https://monoforge-studio.vercel.app/assets/monoforge-stamp.svg';
}

export function AssetsClient() {
  const router = useRouter();
  const addSection = useReadmeStore((s) => s.addSection);
  const githubHandle = useReadmeStore((s) => s.config.settings.user.github);

  const [activeScope, setActiveScope] = useState<'all' | 'library' | 'marketplace' | 'curated'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<AssetFormat | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const libraryAssets = useMemo<AssetDefinition[]>(() => getAllAssets(), []);

  const unifiedItems = useMemo<VaultCardItem[]>(() => {
    const libItems: VaultCardItem[] = libraryAssets.map((asset) => {
      const camoUrl = `${RAW_ASSET_BASE}${asset.publicUrl}`;
      const markdown = `<p align="center">\n  <img src="${camoUrl}" alt="${asset.name}" width="${asset.width || '100%'}" />\n</p>`;
      return {
        id: `lib:${asset.id}`,
        source: 'library',
        name: asset.name,
        description: asset.description || `${asset.format.toUpperCase()} asset (${asset.category})`,
        category: asset.category,
        format: asset.format,
        tags: asset.tags,
        camoUrl,
        previewUrl: asset.publicUrl,
        markdown,
        isProtected: asset.isProtected,
        rawAsset: asset,
      };
    });

    const mktItems: VaultCardItem[] = COMMUNITY_ASSET_REGISTRY.map((asset: CommunityAsset) => {
      const sanitizedMd = asset.rawMarkdown
        .replace(/\/main\/public\/assets\//g, '/main/website/public/assets/')
        .replace(/color=18181b/gi, 'color=1e293b')
        .replace(/-18181B\?/gi, '-334155?');
      return {
        id: `mkt:${asset.id}`,
        source: 'marketplace',
        name: asset.name,
        description: asset.description,
        category: asset.category,
        format: 'svg',
        tags: asset.tags,
        camoUrl: asset.previewUrl ? `${RAW_ASSET_BASE}${asset.previewUrl}` : extractCamoUrlFromMarkdown(sanitizedMd),
        previewUrl: asset.previewUrl,
        markdown: sanitizedMd,
        authorLabel: `@${asset.author.github} · ${asset.license}`,
      };
    });

    const userSlug = encodeURIComponent(githubHandle?.trim() || 'developer');
    const curatedItems = CURATED_VAULT_STICKERS.map((item) => ({
      ...item,
      camoUrl: item.camoUrl.replace('user=developer', `user=${userSlug}`),
      markdown: item.markdown.replace('user=developer', `user=${userSlug}`),
    }));

    return [...curatedItems, ...mktItems, ...libItems];
  }, [libraryAssets, githubHandle]);

  const categories = useMemo(() => {
    const set = new Set<string>(['all']);
    unifiedItems.forEach((item) => set.add(item.category));
    return Array.from(set);
  }, [unifiedItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return unifiedItems.filter((item) => {
      if (activeScope !== 'all' && item.source !== activeScope) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedFormat !== 'all' && item.format !== selectedFormat) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [unifiedItems, activeScope, selectedCategory, selectedFormat, searchQuery]);

  const selectedItem = useMemo(
    () => unifiedItems.find((i) => i.id === selectedItemId) || null,
    [unifiedItems, selectedItemId]
  );

  const inspectedRaw = useMemo(() => {
    if (!selectedItem?.rawAsset) return null;
    return inspect_asset(selectedItem.rawAsset.id);
  }, [selectedItem]);

  const handleCopy = async (text: string, key: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success(`Copied ${label} to clipboard`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleInsertIntoStore = (item: VaultCardItem) => {
    addSection('custom-html', {
      content: {
        content: item.markdown,
        html: item.markdown,
        align: 'center',
        title: item.name,
      },
    });
    toast.success(`Inserted "${item.name}" into Profile IDE store`);
  };

  return (
    <div className="flex-1 max-w-[1680px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_#334155] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-[#ffe600] text-slate-950 font-mono text-xs font-black border border-slate-800">
              ASSET &amp; STICKER VAULT
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-mono text-[11px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {unifiedItems.length} Camo-Safe Assets &amp; Stickers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Unified Asset Vault &amp; Community Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Search verified SVGs, animated characters, dividers, shields, and marketplace presets. Copy Camo-safe URLs, copy Markdown, or insert straight into your profile store.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/developer')}
            className="px-4 py-2 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-950 font-mono text-xs font-black border-2 border-slate-800 shadow-[2px_2px_0px_#334155] flex items-center gap-1.5 cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>Open Developer IDE</span>
          </button>
        </div>
      </div>

      {/* Scope, Search & Category Toolbar */}
      <div className="p-4 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stickers, characters, dividers, brands, or tags..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {(
              [
                { id: 'all', label: 'All Sources', icon: Layers },
                { id: 'curated', label: 'Stickers Vault', icon: Sparkles },
                { id: 'marketplace', label: 'Marketplace', icon: Package },
                { id: 'library', label: 'Indexed SVGs', icon: ShieldCheck },
              ] as const
            ).map((scope) => {
              const Icon = scope.icon;
              return (
                <button
                  key={scope.id}
                  type="button"
                  onClick={() => setActiveScope(scope.id)}
                  className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeScope === scope.id
                      ? 'bg-[#ffe600] text-slate-950 border-slate-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{scope.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap font-mono text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat as AssetCategory | 'all')}
                className={`px-2.5 py-1 rounded-lg border font-bold capitalize whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white border-slate-700 dark:bg-amber-400 dark:text-slate-950'
                    : 'bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {(['all', 'svg', 'png', 'webp', 'gif'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2 py-1 rounded text-[10px] uppercase font-bold border cursor-pointer ${
                  selectedFormat === fmt
                    ? 'bg-amber-400 text-slate-950 border-slate-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={selectedItem ? 'lg:col-span-8' : 'lg:col-span-12'}>
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-500">
              No assets matched your filters. Try clearing your search or selecting &quot;All Sources&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredItems.slice(0, 60).map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`p-4 rounded-2xl border-2 bg-white dark:bg-slate-900 flex flex-col justify-between gap-3 cursor-pointer transition-all hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-[4px_4px_0px_#334155]'
                        : 'border-slate-300 dark:border-slate-700 shadow-[3px_3px_0px_#334155]'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 uppercase font-bold text-slate-700 dark:text-slate-300">
                          {item.category}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Camo Safe
                        </span>
                      </div>

                      {item.previewUrl ? (
                        <div className="w-full h-28 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-3 overflow-hidden">
                          <img
                            src={item.previewUrl}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-28 rounded-xl bg-slate-800 border border-slate-700 p-3 font-mono text-[10px] text-emerald-300 overflow-hidden flex items-center">
                          <pre className="whitespace-pre-wrap line-clamp-4">{item.markdown}</pre>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xs font-bold font-mono text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                          {item.description}
                        </p>
                        {item.authorLabel && (
                          <p className="text-[10px] font-mono text-slate-500 mt-1">{item.authorLabel}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 font-mono text-[10px]" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.camoUrl, `url:${item.id}`, 'Camo URL')}
                        className="py-1.5 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold flex items-center justify-center gap-1 cursor-pointer"
                        title="Copy Camo-safe URL"
                      >
                        {copiedKey === `url:${item.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Link2 className="w-3 h-3" />}
                        <span>URL</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.markdown, `md:${item.id}`, 'Markdown')}
                        className="py-1.5 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold flex items-center justify-center gap-1 cursor-pointer"
                        title="Copy Markdown snippet"
                      >
                        {copiedKey === `md:${item.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>MD</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInsertIntoStore(item)}
                        className="py-1.5 px-2 rounded-lg border border-slate-800 bg-[#ffe600] hover:bg-amber-300 text-slate-950 font-black flex items-center justify-center gap-1 cursor-pointer"
                        title="Insert into MonoForge Profile store"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Insert</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Inspector Sidebar */}
        {selectedItem && (
          <aside className="lg:col-span-4">
            <div className="sticky top-20 p-5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_#334155] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-black uppercase flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-500" />
                  Asset Inspector
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedItemId(null)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              {selectedItem.previewUrl && (
                <div className="w-full h-40 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-4">
                  <img
                    src={selectedItem.previewUrl}
                    alt={selectedItem.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              <div>
                <h2 className="font-black text-sm text-slate-900 dark:text-white">{selectedItem.name}</h2>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{selectedItem.description}</p>
              </div>

              {inspectedRaw && (
                <div className="space-y-1 text-[11px] border-t border-slate-200 dark:border-slate-800 pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dimensions</span>
                    <span>{inspectedRaw.width || '?'} x {inspectedRaw.height || '?'}</span>
                  </div>
                  {inspectedRaw.viewBox && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">ViewBox</span>
                      <span>{inspectedRaw.viewBox}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500">Camo-Safe URL</span>
                <div className="p-2 rounded-lg bg-slate-900 text-cyan-300 text-[10px] break-all border border-slate-700">
                  {selectedItem.camoUrl}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500">README Markdown</span>
                <pre className="p-2 rounded-lg bg-slate-900 text-emerald-300 text-[10px] overflow-x-auto border border-slate-700 whitespace-pre-wrap">
                  {selectedItem.markdown}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(selectedItem.camoUrl, 'insp-url', 'Camo URL')}
                  className="py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Copy URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedItem.markdown, 'insp-md', 'Markdown')}
                  className="py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy MD</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleInsertIntoStore(selectedItem)}
                className="w-full py-2.5 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-950 font-black border-2 border-slate-800 shadow-[2px_2px_0px_#334155] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Insert into Profile Store</span>
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
