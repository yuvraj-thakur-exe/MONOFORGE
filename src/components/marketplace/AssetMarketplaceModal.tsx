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
  Github,
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
      await navigator.clipboard.writeText(asset.rawMarkdown);
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
      addSection('custom', {
        content: {
          rawMarkdown: asset.rawMarkdown,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border-2 border-neutral-900 rounded-2xl shadow-[8px_8px_0px_#18181b] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight font-mono uppercase">
                  Community Asset Marketplace
                </h2>
                <span className="px-2 py-0.5 rounded bg-neutral-950 text-[#ffe600] text-[10px] font-mono font-bold">
                  {COMMUNITY_ASSET_REGISTRY.length} ASSETS
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-neutral-800">
                Registry-Driven &bull; Open-Source Attributions &bull; 100% Camo Compliant
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-900 transition-all hover:scale-105 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 bg-white border-b-2 border-neutral-900 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search assets by keyword, author, or tag (e.g. cyber, rust, banner)..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border-2 border-neutral-900 rounded-xl text-xs font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:bg-white"
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
                    ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#fafafa]">
          {filteredAssets.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border-2 border-dashed border-neutral-300 font-mono text-xs text-neutral-500">
              No community assets matched your search query. Try searching for &quot;cyber&quot;, &quot;banner&quot;, or &quot;badges&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssets.map(asset => (
                <div
                  key={asset.id}
                  className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-3 font-mono hover:-translate-y-0.5 transition-transform"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-800">
                        {asset.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5" /> Camo Ready
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-neutral-950 text-white font-bold">
                          {asset.license}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-black text-xs text-neutral-950">{asset.name}</h3>
                    <p className="text-[11px] text-neutral-600 line-clamp-2">
                      {asset.description}
                    </p>

                    {/* Author Attribution */}
                    <div className="flex items-center gap-2 pt-1 border-t border-neutral-200 text-[10px] text-neutral-500">
                      <span>Author:</span>
                      <a
                        href={`https://github.com/${asset.author.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-neutral-900 hover:text-amber-600 flex items-center gap-1 underline"
                      >
                        <Github className="w-3 h-3" />
                        <span>@{asset.author.github}</span>
                      </a>
                      <span className="ml-auto text-neutral-400">v{asset.version}</span>
                    </div>

                    {/* Markdown Snippet Box */}
                    <div className="p-2 bg-neutral-950 rounded-lg text-emerald-400 text-[10px] overflow-x-auto whitespace-pre truncate">
                      {asset.rawMarkdown.replace(/\n/g, ' ')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={() => handleCopyMarkdown(asset)}
                      className="flex-1 py-1.5 px-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold border border-neutral-900 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
                      className="flex-1 py-1.5 px-3 bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 text-xs font-black border border-neutral-900 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>INSERT</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-neutral-900 text-xs font-mono">
          <span className="text-neutral-500 text-[11px]">
            Want to submit an asset? See <code>docs/COMMUNITY_ASSETS.md</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-950 text-white font-bold border-2 border-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetMarketplaceModal;
