'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';
import { playClickSound, playTone } from '#/lib/sound/sound-effects';

interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  bgHex: string;
  textHex: string;
  cardClasses: string;
  pillClasses: string;
  rotation: string;
  markdown: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 'banana-engine',
    name: 'ZERO MONKEY BUSINESS',
    emoji: '🍌',
    bgHex: '#ffe600',
    textHex: '#0a0a0a',
    cardClasses: 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[5px_5px_0px_#18181b]',
    pillClasses: 'bg-neutral-950 text-white',
    rotation: '-rotate-2',
    markdown: '[![Zero Monkey Business](https://img.shields.io/badge/MonoForge-Zero_Monkey_Business-f59e0b?style=for-the-badge&logo=shield)](https://monoforge-studio.vercel.app)',
  },
  {
    id: 'camo-certified',
    name: '60FPS CAMO CERTIFIED',
    emoji: '⚡',
    bgHex: '#22d3ee',
    textHex: '#0a0a0a',
    cardClasses: 'bg-cyan-400 text-neutral-950 border-neutral-900 shadow-[5px_5px_0px_#18181b]',
    pillClasses: 'bg-neutral-950 text-white',
    rotation: 'rotate-2',
    markdown: '[![60fps Camo Certified](https://img.shields.io/badge/Camo_CDN-60fps_GPU_SVG-06b6d4?style=for-the-badge&logo=fastapi)](https://monoforge-studio.vercel.app)',
  },
  {
    id: 'night-owl',
    name: 'NIGHT OWL DEV',
    emoji: '🦉',
    bgHex: '#0f172a',
    textHex: '#ffffff',
    cardClasses: 'bg-slate-900 text-white border-neutral-900 shadow-[5px_5px_0px_#18181b]',
    pillClasses: 'bg-emerald-400 text-slate-950 font-black',
    rotation: '-rotate-1',
    markdown: '[![Night Owl Dev](https://img.shields.io/badge/Telemetry-Night_Owl_89%25-10b981?style=for-the-badge&logo=github)](https://monoforge-studio.vercel.app/telemetry)',
  },
  {
    id: 'pixel-crafter',
    name: 'PIXEL CRAFTSMAN',
    emoji: '👾',
    bgHex: '#34d399',
    textHex: '#0a0a0a',
    cardClasses: 'bg-emerald-400 text-neutral-950 border-neutral-900 shadow-[5px_5px_0px_#18181b]',
    pillClasses: 'bg-neutral-950 text-white',
    rotation: 'rotate-3',
    markdown: '[![Pixel Craftsman](https://img.shields.io/badge/Vector-Pixel_Craftsman-10b981?style=for-the-badge&logo=gamepad)](https://monoforge-studio.vercel.app/animator)',
  },
  {
    id: 'zero-js',
    name: 'ZERO RUNTIME JS',
    emoji: '🛡️',
    bgHex: '#e9d5ff',
    textHex: '#3b0764',
    cardClasses: 'bg-purple-200 text-purple-950 border-neutral-900 shadow-[5px_5px_0px_#18181b]',
    pillClasses: 'bg-purple-950 text-purple-100 font-black',
    rotation: '-rotate-2',
    markdown: '[![Zero Runtime JS](https://img.shields.io/badge/Performance-Zero_Runtime_JS-18181b?style=for-the-badge&logo=html5)](https://monoforge-studio.vercel.app)',
  },
  {
    id: 'monaco-ide',
    name: 'AST-SAFE MONACO',
    emoji: '⚔️',
    bgHex: '#f59e0b',
    textHex: '#0a0a0a',
    cardClasses: 'bg-amber-500 text-neutral-950 border-neutral-900 shadow-[5px_5px_0px_#18181b]',
    pillClasses: 'bg-neutral-950 text-white',
    rotation: 'rotate-2',
    markdown: '[![AST-Safe Monaco](https://img.shields.io/badge/IDE-Monaco_Raw_Mode-d97706?style=for-the-badge&logo=visualstudiocode)](https://monoforge-studio.vercel.app/developer)',
  },
];

export function NomokeyStickerBoard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySticker = (sticker: StickerItem) => {
    navigator.clipboard.writeText(sticker.markdown);
    setCopiedId(sticker.id);
    playClickSound();
    playTone(920, 'sine', 0.12, 0.05);
    toast.success(`Copied "${sticker.name}" markdown sticker!`, {
      description: 'Paste directly into your GitHub README.md profile',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative bg-[#faf9f6] border-b-2 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-neutral-900 pb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
                [ 05 // TACTILE STICKER DECK ]
              </span>
              <span className="font-bold text-neutral-800">CLICK TO COPY BADGE MARKDOWN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 uppercase font-sans">
              THE MONKEY STICKER VAULT.
            </h2>
          </div>
        </div>

        {/* Sticker Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {STICKERS.map((sticker) => {
            const isCopied = copiedId === sticker.id;
            return (
              <button
                type="button"
                key={sticker.id}
                onClick={() => handleCopySticker(sticker)}
                style={{ backgroundColor: sticker.bgHex, color: sticker.textHex }}
                className={`text-left w-full cursor-pointer p-6 rounded-2xl border-2 border-neutral-900 ${sticker.rotation} hover:translate-x-[2px] hover:translate-y-[2px] active:scale-[0.98] transition-all select-none group relative overflow-hidden focus:outline-hidden focus:ring-4 focus:ring-[#ffe600] btn-tactile shadow-[5px_5px_0px_#18181b]`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                    {sticker.emoji}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black flex items-center gap-1.5 border border-neutral-900 shadow-2xs ${sticker.pillClasses}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                        <span className="font-black">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span className="font-black">CLICK TO COPY</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight font-sans uppercase">
                  {sticker.name}
                </h3>

                <div className="mt-4 pt-3 border-t-2 border-neutral-900/20 flex items-center justify-between text-[11px] font-mono font-black">
                  <span className="opacity-95 tracking-wide">SHIELDS.IO // CAMO COMPLIANT</span>
                  <span className="px-2 py-0.5 rounded bg-black/15 uppercase tracking-wider font-mono font-black">
                    1-CLICK
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
