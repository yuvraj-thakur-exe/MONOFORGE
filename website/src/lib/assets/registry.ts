import type { AssetDefinition, AssetSearchQuery, CommunityAsset } from './types';
import rawManifest from '../../assets/manifest.generated.json';

// In-memory typed manifest cache for app assets
const ASSETS: AssetDefinition[] = rawManifest as AssetDefinition[];

export const COMMUNITY_ASSET_REGISTRY: CommunityAsset[] = [
  // 1. Animated SVGs
  {
    id: 'svg-cyber-bot',
    name: 'Cyber Bot Kinematic Companion',
    category: 'animated-svg',
    description: '60fps GPU thruster-animated vector robot with antenna ping and speech terminal bubble.',
    tags: ['character', '60fps', 'cyber', 'robot'],
    author: {
      name: 'Yuvraj Thakur',
      github: 'yuvraj-thakur-exe',
      avatarUrl: 'https://avatars.githubusercontent.com/u/10000000?v=4',
    },
    license: 'MIT',
    version: '1.2.0',
    camoCompliant: true,
    previewUrl: '/assets/roaming-bot.svg',
    supportedOptions: [
      { key: 'color', label: 'Primary Accent', type: 'color', defaultValue: '#ffe600' },
      { key: 'showThruster', label: 'Thruster Flame', type: 'boolean', defaultValue: true },
    ],
    rawMarkdown: '<p align="center">\n  <img src="https://monoforge-studio.vercel.app/assets/roaming-bot.svg" width="220" alt="Cyber Bot" />\n</p>',
  },
  {
    id: 'svg-matrix-rain',
    name: 'Matrix Digital Glyph Rain',
    category: 'animated-svg',
    description: 'Phosphor green CRT vertical cascading digital rain with randomized glyph decay.',
    tags: ['matrix', 'crt', 'retro', 'rain'],
    author: {
      name: 'Neo Smith',
      github: 'matrix-dev',
    },
    license: 'MIT',
    version: '2.0.0',
    camoCompliant: true,
    previewUrl: '/assets/terminal_animated.svg',
    rawMarkdown: '<p align="center">\n  <img src="https://monoforge-studio.vercel.app/assets/terminal_animated.svg" width="100%" alt="Matrix Rain" />\n</p>',
  },

  // 2. Banners
  {
    id: 'ban-laser-slice',
    name: 'Neon Laser Cut Hero Banner',
    category: 'banners',
    description: 'High-contrast diagonal laser split with custom typographic headline and yellow edge glow.',
    tags: ['banner', 'capsule', 'hero', 'neon'],
    author: {
      name: 'Marco Madonna',
      github: 'marcomadonna',
    },
    license: 'Apache-2.0',
    version: '1.0.0',
    camoCompliant: true,
    supportedOptions: [
      { key: 'text', label: 'Headline Text', type: 'text', defaultValue: 'ENGINEERING AT SCALE' },
      { key: 'height', label: 'Banner Height', type: 'select', defaultValue: '180', options: ['120', '180', '240'] },
    ],
    rawMarkdown: '<p align="center">\n  <img src="https://capsule-render.vercel.app/api?type=slice&color=18181b&text=ENGINEERING%20AT%20SCALE&fontColor=ffe600&fontSize=40&height=180" width="100%" alt="Laser Cut Banner" />\n</p>',
  },
  {
    id: 'ban-hands-divider',
    name: 'Kinematic Hands Horizon Divider',
    category: 'banners',
    description: 'Minimalist editorial SVG line art divider with kinetic hover effect.',
    tags: ['divider', 'minimalist', 'line-art'],
    author: {
      name: 'Poulo Studio',
      github: 'poulo-dev',
    },
    license: 'CC-BY-4.0',
    version: '1.1.0',
    camoCompliant: true,
    previewUrl: '/assets/digital-hands-divider.svg',
    rawMarkdown: '<p align="center">\n  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/digital-hands-divider.svg" width="100%" alt="Digital Hands Divider" />\n</p>',
  },

  // 3. Badges
  {
    id: 'badge-cyber-stack',
    name: 'Tactile Monospace Tech Badge Matrix',
    category: 'badges',
    description: 'Precision-spaced for-the-badge shields with branded hex-codes and logo vectors.',
    tags: ['shields', 'badges', 'skills'],
    author: {
      name: 'MonoForge Core',
      github: 'monoforge',
    },
    license: 'MIT',
    version: '1.4.0',
    camoCompliant: true,
    rawMarkdown: '<p align="center">\n  <img src="https://img.shields.io/badge/TYPESCRIPT-18181B?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="TypeScript" />\n  <img src="https://img.shields.io/badge/RUST-18181B?style=for-the-badge&logo=rust&logoColor=DEA584" alt="Rust" />\n  <img src="https://img.shields.io/badge/NEXT.JS-18181B?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />\n  <img src="https://img.shields.io/badge/DOCKER-18181B?style=for-the-badge&logo=docker&logoColor=2496ED" alt="Docker" />\n</p>',
  },
  {
    id: 'badge-live-views',
    name: 'High-Voltage Banana Visitor Counter',
    category: 'badges',
    description: 'Real-time GitHub profile hit counter styled in signature #FFE600 brand palette.',
    tags: ['counter', 'analytics', 'views'],
    author: {
      name: 'Komarev Engine',
      github: 'antonkomarev',
    },
    license: 'MIT',
    version: '1.0.0',
    camoCompliant: true,
    rawMarkdown: '<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=octocat&label=PROFILE+VISITS&color=ffe600&style=for-the-badge" alt="Profile Visits" />\n</p>',
  },

  // 4. Section Designs
  {
    id: 'sec-project-grid',
    name: 'Tactile Editorial Project Bento',
    category: 'sections',
    description: 'Ascii-aligned Markdown bento grid highlighting 3 flagship repositories and live links.',
    tags: ['projects', 'bento', 'markdown-table'],
    author: {
      name: 'Alex Johnson',
      github: 'alexdev',
    },
    license: 'MIT',
    version: '1.0.0',
    camoCompliant: true,
    rawMarkdown: '## 🚀 Featured Open Source\n\n| Repository | Focus | Demo |\n| :--- | :--- | :--- |\n| **[QueryEngine](https://github.com)** | Ultra-fast SIMD query processor in Rust | [Live Docs](https://github.com) |\n| **[VectorStudio](https://github.com)** | 60fps GPU SVG animation engine | [App Live](https://github.com) |\n| **[ZeroCache](https://github.com)** | In-memory distributed LRU ring buffer | [Benchmark](https://github.com) |',
  },

  // 5. User-Created Templates
  {
    id: 'tpl-swiss-staff-dev',
    name: 'Swiss Typographer Staff Profile',
    category: 'templates',
    description: 'Subtle monochrome aesthetic, stark typographic hierarchy, and clean whitespace inspired by modern Swiss design.',
    tags: ['template', 'swiss', 'editorial', 'staff'],
    author: {
      name: 'Dieter Rams Fan',
      github: 'swisscoder',
    },
    license: 'MIT',
    version: '1.0.0',
    camoCompliant: true,
    rawMarkdown: '<div align="left">\n\n# Jane Doe\n### Staff Systems Architect &bull; Distributed Systems\n\nCrafting resilient distributed engines and high-throughput vector pipelines.\n\n---\n\n## Technical Focus\n- **Languages**: Rust, Go, TypeScript\n- **Infrastructure**: Kubernetes, AWS, Terraform, Docker\n\n---\n\n## 📊 Live Metrics\n<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=isocalendar&user=octocat" width="100%" alt="Metrics" />\n\n</div>',
  },

  // 6. Animation Presets
  {
    id: 'preset-laser-dash',
    name: 'Traveling Border Beam Preset',
    category: 'presets',
    description: 'Hardware accelerated perimeter stroke-dasharray laser traversal keyframe preset.',
    tags: ['preset', 'keyframe', 'border-beam'],
    author: {
      name: 'MonoForge Vector Team',
      github: 'monoforge',
    },
    license: 'MIT',
    version: '1.0.0',
    camoCompliant: true,
    rawMarkdown: '```css\n@keyframes borderBeam {\n  0% { stroke-dashoffset: 800; }\n  100% { stroke-dashoffset: 0; }\n}\n```',
  },
];

export function getAllAssets(): AssetDefinition[] {
  return [...ASSETS];
}

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSETS.find(a => a.id.toLowerCase() === id.toLowerCase());
}

export function getAssetsByCategory(category: string): any[] {
  const commMatches = COMMUNITY_ASSET_REGISTRY.filter(a => a.category === category);
  if (commMatches.length > 0) {
    return commMatches;
  }
  return ASSETS.filter(a => a.category === category);
}

// Overload signatures for searchAssets
export function searchAssets(query: string, category?: string): CommunityAsset[];
export function searchAssets(options: AssetSearchQuery): AssetDefinition[];
export function searchAssets(queryOrOptions: string | AssetSearchQuery, categoryParam?: string): any[] {
  // If called with string query for CommunityAsset
  if (typeof queryOrOptions === 'string') {
    const cleanQ = queryOrOptions.trim().toLowerCase();
    return COMMUNITY_ASSET_REGISTRY.filter(a => {
      const matchesCategory = !categoryParam || categoryParam === 'all' || categoryParam === a.category;
      const matchesQuery =
        !cleanQ ||
        a.name.toLowerCase().includes(cleanQ) ||
        a.description.toLowerCase().includes(cleanQ) ||
        a.tags.some(t => t.toLowerCase().includes(cleanQ)) ||
        a.author.name.toLowerCase().includes(cleanQ);

      return matchesCategory && matchesQuery;
    });
  }

  // Otherwise, called with AssetSearchQuery options for AssetDefinition
  const options = queryOrOptions;
  const { query, category, format, tags, brand, onlyProtected } = options;
  const q = query ? query.toLowerCase().trim() : '';

  return ASSETS.filter(asset => {
    if (category && category !== 'all' && asset.category !== category) {
      return false;
    }
    if (format && format !== 'all' && asset.format !== format) {
      return false;
    }
    if (brand && asset.brand?.toLowerCase() !== brand.toLowerCase()) {
      return false;
    }
    if (onlyProtected && !asset.isProtected) {
      return false;
    }
    if (tags && tags.length > 0) {
      const hasAllTags = tags.every(t => asset.tags.some(at => at.toLowerCase() === t.toLowerCase()));
      if (!hasAllTags) return false;
    }
    if (q) {
      const matchName = asset.name.toLowerCase().includes(q);
      const matchId = asset.id.toLowerCase().includes(q);
      const matchBrand = asset.brand?.toLowerCase() !== undefined && asset.brand.toLowerCase().includes(q);
      const matchTags = asset.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchId && !matchBrand && !matchTags) {
        return false;
      }
    }
    return true;
  });
}
