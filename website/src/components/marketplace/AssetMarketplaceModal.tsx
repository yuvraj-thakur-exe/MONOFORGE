'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import {
  COMMUNITY_ASSET_REGISTRY,
  searchAssets,
} from '#/lib/assets/registry';
import { CommunityAsset, AssetCategory } from '#/lib/assets/types';
import {
  X,
  Package,
  Search,
  Copy,
  Check,
  Plus,
  ShieldCheck,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface AssetMarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { id: AssetCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Assets' },
  { id: 'animated-svg', label: 'Animated SVGs' },
  { id: 'banners', label: 'Hero Banners' },
  { id: 'badges', label: 'Custom Badges' },
  { id: 'sections', label: 'Section Designs' },
  { id: 'templates', label: 'Community Templates' },
  { id: 'presets', label: 'Animation Presets' },
];

function sanitizeAssetMarkdown(raw: string): string {
  return raw
    .replace(/\/main\/public\/assets\//g, '/main/website/public/assets/')
    .replace(/color=18181b/gi, 'color=1e293b')
    .replace(/-18181B\?/gi, '-334155?');
}

export const AssetMarketplaceModal: React.FC<AssetMarketplaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const addSection = useReadmeStore(state => state.addSection);

  const [activeCategory, setActiveCategory] = useState<AssetCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredAssets = searchAssets(
    searchQuery,
    activeCategory === 'all' ? undefined : activeCategory
  );

  const handleCopyMarkdown = async (asset: CommunityAsset) => {
    try {
      const md = sanitizeAssetMarkdown(asset.rawMarkdown);
      await navigator.clipboard.writeText(md);
      setCopiedId(asset.id);
      toast.success(`Copied markdown for "${asset.name}"`);
      setTimeout(() => setCopiedId(null), 2000);

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ffe600', '#10b981'],
      });
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleInsertAsset = (asset: CommunityAsset) => {
    try {
      const md = sanitizeAssetMarkdown(asset.rawMarkdown);
      addSection('custom-html', {
        content: {
          content: md,
          html: md,
          markdown: md,
          raw: md,
          align: 'center',
          title: asset.name,
        },
      });
      toast.success(`Inserted "${asset.name}" into your profile!`);
      onClose();
    } catch {
      toast.error('Failed to insert section');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border-2 border-slate-700 rounded-2xl shadow-[8px_8px_0px_#334155] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-slate-700 text-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-900 text-[#ffe600] border border-slate-700 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight font-mono uppercase">
                  Community Asset Marketplace
                </h2>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-[#ffe600] text-[10px] font-mono font-bold">
                  {COMMUNITY_ASSET_REGISTRY.length} ASSETS
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-800">
                Registry-Driven &bull; Open-Source Attributions &bull; 100% Camo Compliant
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-950 border border-slate-700 transition-all hover:scale-105 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 bg-white border-b-2 border-slate-700 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search assets by keyword, author, or tag (e.g. cyber, rust, banner)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-2 border-slate-700 rounded-xl text-xs font-mono text-slate-950 placeholder:text-slate-400 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg font-bold uppercase transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#ffe600] text-slate-950 font-black border border-slate-700 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#f8fafc]">
          {filteredAssets.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border-2 border-dashed border-slate-300 font-mono text-xs text-slate-500">
              No community assets matched your search query. Try searching for &quot;cyber&quot;, &quot;banner&quot;, or &quot;badges&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssets.map(asset => {
                const sanitizedMd = sanitizeAssetMarkdown(asset.rawMarkdown);
                return (
                  <div
                    key={asset.id}
                    className="p-4 bg-white rounded-xl border-2 border-slate-700 shadow-[3px_3px_0px_#334155] flex flex-col justify-between gap-3 font-mono hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800">
                          {asset.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="flex items-center gap-1 text-emerald-700 font-bold">
                            <ShieldCheck className="w-3.5 h-3.5" /> Camo Ready
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-white font-bold">
                            {asset.license}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-black text-xs text-slate-950">{asset.name}</h3>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {asset.description}
                      </p>

                      {/* Author Attribution (non-external label) */}
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-200 text-[10px] text-slate-500">
                        <span>Author:</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-600" />
                          <span>@{asset.author.github}</span>
                        </span>
                        <span className="ml-auto text-slate-400">v{asset.version}</span>
                      </div>

                      {/* Markdown Snippet Box */}
                      <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 text-[10px] overflow-x-auto whitespace-pre truncate">
                        {sanitizedMd.replace(/\n/g, ' ')}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleCopyMarkdown(asset)}
                        className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold border border-slate-700 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {copiedId === asset.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY MD</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInsertAsset(asset)}
                        className="flex-1 py-1.5 px-3 bg-[#ffe600] hover:bg-amber-300 text-slate-950 text-xs font-black border border-slate-700 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>INSERT</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-slate-700 text-xs font-mono">
          <span className="text-slate-500 text-[11px]">
            Want to submit an asset? See <code>CONTRIBUTING.md</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-bold border-2 border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetMarketplaceModal;
