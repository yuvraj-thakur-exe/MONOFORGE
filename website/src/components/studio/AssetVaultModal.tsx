'use client';

import React, { useMemo, useState } from 'react';
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

function buildVaultAssets(username: string): VaultAsset[] {
  const cleanUser = encodeURIComponent(username.trim() || 'developer');
  return [
    // Dividers
    {
      id: 'div-hands',
      category: 'dividers',
      title: 'Digital Hands Kinematic Divider',
      description: 'Minimalist animated hands reaching across a cyber divide.',
      markdown: '<p align="center">\n  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/website/public/assets/digital-hands-divider.svg" width="100%" alt="Divider" />\n</p>',
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
      markdown: '<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=slice&color=1e293b&text=BUILDING%20THE%20FUTURE&fontColor=ffe600&fontSize=42&height=180" width="100%" alt="Header Banner" />\n</p>',
    },
    {
      id: 'ban-terminal-hud',
      category: 'banners',
      title: 'Terminal HUD Vector Banner',
      description: 'CRT green developer status console with real-time repo telemetry.',
      markdown: `<p align="center">\n  <img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=terminal&user=${cleanUser}" width="100%" alt="Terminal HUD" />\n</p>`,
    },
    // Tech Stacks
    {
      id: 'tech-modern-frontend',
      category: 'techs',
      title: 'Modern Frontend Power Stack',
      description: 'React, Next.js, TypeScript, Tailwind, Vite, Redux.',
      markdown: '<p align="center">\n  <img src="https://skillicons.dev/icons?i=react,nextjs,ts,tailwind,vite,redux&theme=dark" alt="Frontend Stack" />\n</p>',
    },
    {
      id: 'tech-backend-systems',
      category: 'techs',
      title: 'Distributed Backend & Cloud Systems',
      description: 'Node.js, Rust, Go, Python, Docker, Kubernetes, AWS, PostgreSQL.',
      markdown: '<p align="center">\n  <img src="https://skillicons.dev/icons?i=nodejs,rust,go,py,docker,k8s,aws,postgres&theme=dark" alt="Backend Stack" />\n</p>',
    },
    {
      id: 'tech-ai-datascience',
      category: 'techs',
      title: 'AI, Machine Learning & Data',
      description: 'Python, PyTorch, TensorFlow, Scikit-Learn, FastApi, Pandas.',
      markdown: '<p align="center">\n  <img src="https://skillicons.dev/icons?i=py,pytorch,tensorflow,fastapi,postgres,git&theme=dark" alt="AI & ML Stack" />\n</p>',
    },
    // Badges & Telemetry
    {
      id: 'badge-camo-counter',
      category: 'badges',
      title: 'Cyberpunk Visitor Counter',
      description: 'Real-time profile visits with glowing neon border.',
      markdown: `<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=${cleanUser}&label=PROFILE+VIEWS&color=ffe600&style=for-the-badge" alt="Profile Views" />\n</p>`,
    },
    {
      id: 'badge-social-trio',
      category: 'badges',
      title: 'Developer Social Connect Trio',
      description: 'High-contrast for-the-badge shields for GitHub, LinkedIn, and X.',
      markdown: '<p align="center">\n  <img src="https://img.shields.io/badge/GITHUB-334155?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />\n  <img src="https://img.shields.io/badge/LINKEDIN-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />\n  <img src="https://img.shields.io/badge/X-1E293B?style=for-the-badge&logo=x&logoColor=white" alt="X" />\n</p>',
    },
  ];
}

export const AssetVaultModal: React.FC<AssetVaultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const addSection = useReadmeStore(state => state.addSection);
  const githubUser = useReadmeStore(state => state.config.settings.user.github);

  const [activeTab, setActiveTab] = useState<'all' | 'dividers' | 'banners' | 'techs' | 'badges'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const vaultAssets = useMemo(() => buildVaultAssets(githubUser || 'developer'), [githubUser]);

  if (!isOpen) return null;

  const filteredAssets = activeTab === 'all'
    ? vaultAssets
    : vaultAssets.filter(a => a.category === activeTab);

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
      addSection('custom-html', {
        content: {
          content: asset.markdown,
          html: asset.markdown,
          raw: asset.markdown,
          align: 'center',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-[#fafbfc] dark:bg-[#1e293b] border-2 border-slate-700 rounded-2xl shadow-[8px_8px_0px_#334155] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-slate-700 text-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-900 text-[#ffe600] border border-slate-700 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight font-mono uppercase">
                Curated Asset Vault &amp; Dividers
              </h2>
              <p className="text-xs font-mono font-bold text-slate-800">
                100% Camo CDN Ready &bull; Instant 1-Click Embeds
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-700 transition-all hover:scale-105 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center px-5 py-2.5 bg-[#f8fafc] dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-700 gap-1.5 overflow-x-auto text-xs font-mono">
          {(['all', 'dividers', 'banners', 'techs', 'badges'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#ffe600] text-slate-900 font-black border border-slate-700 shadow-2xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="p-5 overflow-y-auto space-y-3 bg-[#fafbfc] dark:bg-[#1e293b]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                className="p-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-[3px_3px_0px_#334155] flex flex-col justify-between gap-3 hover:-translate-y-0.5 transition-transform"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                      {asset.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="w-3 h-3" /> Camo Safe
                    </span>
                  </div>
                  <h3 className="font-mono text-xs font-black text-slate-900 dark:text-white">
                    {asset.title}
                  </h3>
                  <p className="font-mono text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                    {asset.description}
                  </p>
                </div>

                {/* Preformatted Markdown Snippet */}
                <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-mono text-[10px] overflow-x-auto whitespace-pre truncate">
                  {asset.markdown.replace(/\n/g, ' ')}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => handleCopyMarkdown(asset)}
                    className="flex-1 py-1.5 px-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs font-bold border border-slate-400 dark:border-slate-600 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
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
                    className="flex-1 py-1.5 px-2 bg-[#ffe600] hover:bg-amber-300 text-slate-900 font-mono text-xs font-black border border-slate-700 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1 cursor-pointer"
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
        <div className="flex items-center justify-between px-5 py-3 bg-[#f8fafc] dark:bg-slate-800 border-t-2 border-slate-300 dark:border-slate-700 text-xs font-mono">
          <span className="text-slate-600 dark:text-slate-400 text-[11px]">
            Embed directly in GitHub README.md without external tracking servers
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs font-bold border-2 border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetVaultModal;
