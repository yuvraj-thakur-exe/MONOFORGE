'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import {
  X,
  Package,
  Copy,
  Check,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface AssetVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VaultAsset {
  id: string;
  category: 'dividers' | 'badges' | 'techs' | 'banners';
  title: string;
  description: string;
  markdown: string;
  previewUrl?: string;
  badgeStyle?: string;
}

const VAULT_ASSETS: VaultAsset[] = [
  // Dividers
  {
    id: 'div-hands',
    category: 'dividers',
    title: 'Digital Hands Kinematic Divider',
    description: 'Minimalist animated hands reaching across a cyber divide.',
    markdown: '<p align="center">\n  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/digital-hands-divider.svg" width="100%" alt="Divider" />\n</p>',
    previewUrl: '/assets/digital-hands-divider.svg',
  },
  {
    id: 'div-wave',
    category: 'dividers',
    title: 'Cyber Laser Beam Ribbon',
    description: 'Crisp SVG neon wave with 60fps continuous sweep.',
    markdown: '<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,6,12&height=100&section=header" width="100%" alt="Laser Ribbon" />\n</p>',
  },
  // Banners
  {
    id: 'ban-dynamic-capsule',
    category: 'banners',
    title: 'Neon Gradient Header Banner',
    description: 'Header capsule with custom typography and subtext.',
    markdown: '<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=slice&color=18181b&text=BUILDING%20THE%20FUTURE&fontColor=ffe600&fontSize=42&height=180" width="100%" alt="Header Banner" />\n</p>',
  },
  {
    id: 'ban-terminal-hud',
    category: 'banners',
    title: 'Terminal HUD Vector Banner',
    description: 'CRT green developer status console with real-time repo telemetry.',
    markdown: '<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=terminal&user=octocat" width="100%" alt="Terminal HUD" />\n</p>',
  },
  // Tech Stacks
  {
    id: 'tech-modern-frontend',
    category: 'techs',
    title: 'Modern Frontend Power Stack',
    description: 'React, Next.js, TypeScript, Tailwind, Vite, Redux.',
    markdown: '<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=react,nextjs,ts,tailwind,vite,redux&theme=dark" alt="Frontend Stack" />\n  </a>\n</p>',
  },
  {
    id: 'tech-backend-systems',
    category: 'techs',
    title: 'Distributed Backend & Cloud Systems',
    description: 'Node.js, Rust, Go, Python, Docker, Kubernetes, AWS, PostgreSQL.',
    markdown: '<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=nodejs,rust,go,py,docker,k8s,aws,postgres&theme=dark" alt="Backend Stack" />\n  </a>\n</p>',
  },
  {
    id: 'tech-ai-datascience',
    category: 'techs',
    title: 'AI, Machine Learning & Data',
    description: 'Python, PyTorch, TensorFlow, Scikit-Learn, FastApi, Pandas.',
    markdown: '<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=py,pytorch,tensorflow,fastapi,postgres,git&theme=dark" alt="AI & ML Stack" />\n  </a>\n</p>',
  },
  // Badges & Telemetry
  {
    id: 'badge-camo-counter',
    category: 'badges',
    title: 'Cyberpunk Visitor Counter',
    description: 'Real-time profile visits with glowing neon border.',
    markdown: '<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=octocat&label=PROFILE+VIEWS&color=ffe600&style=for-the-badge" alt="Profile Views" />\n</p>',
  },
  {
    id: 'badge-social-trio',
    category: 'badges',
    title: 'Developer Social Connect Trio',
    description: 'High-contrast for-the-badge links for GitHub, LinkedIn, and X.',
    markdown: '<p align="center">\n  <a href="https://github.com"><img src="https://img.shields.io/badge/GITHUB-18181B?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>\n  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LINKEDIN-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n  <a href="https://twitter.com"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>\n</p>',
  },
];

export const AssetVaultModal: React.FC<AssetVaultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const addSection = useReadmeStore(state => state.addSection);

  const [activeTab, setActiveTab] = useState<'all' | 'dividers' | 'banners' | 'techs' | 'badges'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredAssets = activeTab === 'all'
    ? VAULT_ASSETS
    : VAULT_ASSETS.filter(a => a.category === activeTab);

  const handleCopyMarkdown = async (asset: VaultAsset) => {
    try {
      await navigator.clipboard.writeText(asset.markdown);
      setCopiedId(asset.id);
      toast.success(`Copied markdown for "${asset.title}"`);
      setTimeout(() => setCopiedId(null), 2000);

      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ['#ffe600', '#10b981'] });
      } catch {
        // Ignored
      }
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleInsertSection = (asset: VaultAsset) => {
    try {
      addSection('custom', {
        content: {
          rawMarkdown: asset.markdown,
          title: asset.title,
        },
      });
      toast.success(`Inserted "${asset.title}" into Profile Studio!`);
      onClose();
    } catch {
      toast.error('Failed to insert section');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white border-2 border-neutral-900 rounded-2xl shadow-[8px_8px_0px_#18181b] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight font-mono uppercase">
                Curated Asset Vault &amp; Dividers
              </h2>
              <p className="text-xs font-mono font-bold text-neutral-800">
                100% Camo CDN Ready &bull; Instant 1-Click Embeds
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

        {/* Filter Pills */}
        <div className="flex items-center px-5 py-2.5 bg-white border-b-2 border-neutral-900 gap-1.5 overflow-x-auto text-xs font-mono">
          {(['all', 'dividers', 'banners', 'techs', 'badges'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="p-5 overflow-y-auto space-y-3 bg-[#fafafa]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                className="p-4 bg-white rounded-xl border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] flex flex-col justify-between gap-3 hover:-translate-y-0.5 transition-transform"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-700">
                      {asset.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-bold">
                      <ShieldCheck className="w-3 h-3" /> Camo Safe
                    </span>
                  </div>
                  <h3 className="font-mono text-xs font-black text-neutral-950">
                    {asset.title}
                  </h3>
                  <p className="font-mono text-[11px] text-neutral-600 line-clamp-2">
                    {asset.description}
                  </p>
                </div>

                {/* Preformatted Markdown Snippet */}
                <div className="p-2 bg-neutral-950 rounded-lg text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-pre truncate">
                  {asset.markdown.replace(/\n/g, ' ')}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => handleCopyMarkdown(asset)}
                    className="flex-1 py-1.5 px-2 bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-xs font-bold border border-neutral-900 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
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
                    onClick={() => handleInsertSection(asset)}
                    className="flex-1 py-1.5 px-2 bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black border border-neutral-900 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>INSERT</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-neutral-900 text-xs font-mono">
          <span className="text-neutral-500 text-[11px]">
            Embed directly in GitHub README.md without external tracking servers
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-950 text-white font-mono text-xs font-bold border-2 border-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetVaultModal;
