'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Copy,
  Check,
  Sparkles,
  Shield,
  Layers,
  Star,
  Eye,
  Plus,
} from 'lucide-react';
import { getAllAssets } from '../../lib/assets/registry';
import { inspect_asset } from '../../lib/assets/asset-discovery';
import type { AssetDefinition, AssetCategory, AssetFormat } from '../../lib/assets/types';
import { useReadmeStore } from '../../store/useReadmeStore';

interface AssetLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset?: (asset: AssetDefinition) => void;
}

const CATEGORIES: { label: string; value: AssetCategory | 'all' }[] = [
  { label: 'All Assets', value: 'all' },
  { label: 'Social Logos', value: 'social' },
  { label: 'Brand & Emblems', value: 'brand' },
  { label: 'Characters & Avatars', value: 'character' },
  { label: 'Dynamic Telemetry', value: 'telemetry' },
  { label: 'Illustrations', value: 'illustration' },
  { label: 'Arcade & Games', value: 'game' },
  { label: 'Banners & Headers', value: 'banner' },
  { label: 'Mascots', value: 'mascot' },
];

export const AssetLibraryModal: React.FC<AssetLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectAsset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all');
  const [selectedFormat, setSelectedFormat] = useState<AssetFormat | 'all'>('all');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const addSection = useReadmeStore(state => state.addSection);

  const allAssets = useMemo(() => getAllAssets(), []);

  const filteredAssets = useMemo(() => {
    return allAssets.filter(asset => {
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) {
        return false;
      }
      if (selectedFormat !== 'all' && asset.format !== selectedFormat) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = asset.name.toLowerCase().includes(q);
        const matchesBrand = asset.brand?.toLowerCase().includes(q) ?? false;
        const matchesTags = asset.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [allAssets, selectedCategory, selectedFormat, searchQuery]);

  const activeInspection = useMemo(() => {
    if (!selectedAssetId) return null;
    return inspect_asset(selectedAssetId);
  }, [selectedAssetId]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopyMarkdown = (asset: AssetDefinition, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const md = `<p align="center">\n  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/website/public${asset.publicUrl}" alt="${asset.name}" width="${asset.width || '100%'}" />\n</p>`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(md);
      setCopiedId(asset.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInsertIntoProfile = (asset: AssetDefinition) => {
    if (onSelectAsset) {
      onSelectAsset(asset);
      onClose();
      return;
    }
    // Default action: inject as a custom image section
    addSection('custom-html', {
      content: {
        html: `<p align="center">\n  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/website/public${asset.publicUrl}" alt="${asset.name}" />\n</p>`,
      },
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-slate-950 font-black shadow-[2px_2px_0px_#0f172a]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase font-sans tracking-tight">
                  MonoForge Asset Intelligence
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-black border border-emerald-300 dark:border-emerald-800">
                  {allAssets.length} Indexed Assets
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Discover, inspect, verify Camo safety, and reuse authentic application graphics & icons.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors shadow-2xs"
            aria-label="Close Asset Library"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 space-y-3">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by asset name, brand (Discord, GitHub), category, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono placeholder:text-slate-400 focus:outline-hidden focus:border-amber-400 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs font-mono">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-lg border font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#ffe600] text-slate-950 border-slate-950 font-black shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Format toggle */}
            <div className="flex items-center gap-1 shrink-0">
              {(['all', 'svg', 'png'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-2 py-1 rounded text-[11px] border cursor-pointer uppercase ${
                    selectedFormat === fmt
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-slate-900'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Stage: Asset Grid & Inspector Split */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Grid Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {filteredAssets.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                  No matching assets found
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  Try adjusting your search query or switching categories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {filteredAssets.map(asset => {
                  const isSelected = selectedAssetId === asset.id;
                  const isFav = favorites.has(asset.id);

                  return (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`group p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between bg-white dark:bg-slate-800/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${
                        isSelected
                          ? 'border-amber-400 ring-2 ring-amber-400/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500'
                      }`}
                    >
                      {/* Top Action Pills & Favorite Button */}
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-bold truncate max-w-[90px]">
                          {asset.category}
                        </span>

                        <div className="flex items-center gap-1">
                          {asset.isProtected && (
                            <span title="Protected Application Asset" className="text-amber-500">
                              <Shield className="w-3.5 h-3.5 fill-current" />
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={e => toggleFavorite(asset.id, e)}
                            className="p-1 rounded text-slate-400 hover:text-amber-400 transition-colors"
                            title="Favorite asset"
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                isFav ? 'fill-amber-400 text-amber-500' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Graphic Preview Container */}
                      <div className="w-full h-28 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-3 overflow-hidden relative group-hover:bg-slate-50 transition-colors">
                        <img
                          src={asset.publicUrl}
                          alt={asset.name}
                          className="max-h-full max-w-full object-contain filter drop-shadow-xs transition-transform group-hover:scale-110 duration-200"
                        />
                      </div>

                      {/* Metadata & Actions */}
                      <div className="pt-2.5 space-y-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block truncate">
                            {asset.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <span>{asset.format.toUpperCase()}</span>
                            <span>&bull;</span>
                            <span>{Math.round(asset.fileSize / 1024 * 10) / 10} KB</span>
                          </span>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={e => handleCopyMarkdown(asset, e)}
                            className="py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center justify-center gap-1 shadow-2xs"
                            title="Copy Markdown embed snippet"
                          >
                            {copiedId === asset.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedId === asset.id ? 'Copied' : 'MD'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              handleInsertIntoProfile(asset);
                            }}
                            className="py-1 px-2 rounded-lg border border-slate-950 bg-[#ffe600] hover:bg-[#fde047] text-slate-950 text-[10px] font-mono font-black flex items-center justify-center gap-1 shadow-2xs"
                            title="Insert asset into README"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Insert</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Inspector Drawer (Active on Selected Asset) */}
          {activeInspection && (
            <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-950 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 p-5 overflow-y-auto space-y-4 shrink-0 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-black uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-500" /> Asset Inspector
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedAssetId(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full Preview Showcase */}
              <div className="w-full h-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center p-4">
                <img
                  src={activeInspection.previewUrl}
                  alt={activeInspection.asset.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Asset Specs Table */}
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400">ID:</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[160px]">
                    {activeInspection.asset.id}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400">Format:</span>
                  <span className="font-bold uppercase text-slate-900 dark:text-white">
                    {activeInspection.asset.format}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400">Dimensions:</span>
                  <span>
                    {activeInspection.width || '?'} &times; {activeInspection.height || '?'}
                  </span>
                </div>
                {activeInspection.viewBox && (
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">ViewBox:</span>
                    <span>{activeInspection.viewBox}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400">Governance:</span>
                  <span className={activeInspection.asset.isProtected ? 'text-emerald-500 font-bold' : ''}>
                    {activeInspection.asset.isProtected ? 'Protected' : 'Standard'}
                  </span>
                </div>
              </div>

              {/* Color Palette Extraction */}
              {activeInspection.colorInformation.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Extracted Palette ({activeInspection.colorInformation.length})
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {activeInspection.colorInformation.map((hex, idx) => (
                      <span
                        key={idx}
                        className="w-5 h-5 rounded-md border border-slate-700 shadow-2xs"
                        style={{ backgroundColor: hex }}
                        title={`Color: ${hex}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleInsertIntoProfile(activeInspection.asset)}
                  className="w-full py-2.5 rounded-xl bg-[#ffe600] hover:bg-[#fde047] text-slate-950 font-black border border-slate-950 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert into README</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyMarkdown(activeInspection.asset)}
                  className="w-full py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown Link</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
