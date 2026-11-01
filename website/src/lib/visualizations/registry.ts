import { VisualizationManifest, VisualizationId } from './types';

export const VISUALIZATION_REGISTRY: Record<VisualizationId, VisualizationManifest> = {
  'commit-city': {
    id: 'commit-city',
    name: 'Commit City',
    tagline: '3D Isometric Architectural Skyline',
    category: 'activity',
    description:
      'Transforms every contribution day into an isometric building. Peak commit days rise into towering skyscrapers with glowing window grids, while months form distinct city districts.',
    badge: '3D Architectural',
    accent: '#10b981',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'commit-river': {
    id: 'commit-river',
    name: 'Commit River',
    tagline: 'Luminous Fluid Streamlines & Rapids',
    category: 'activity',
    description:
      'Visualizes your annual development journey as a flowing river. High-intensity sprint periods create wide, glowing rapids and turbulent currents, while quiet periods drift like calm waters.',
    badge: 'Fluid Dynamics',
    accent: '#38bdf8',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'year-clock': {
    id: 'year-clock',
    name: 'Developer Year Clock',
    tagline: '360° Radial Chronometer & Radar',
    category: 'activity',
    description:
      'Arranges 12 months into a circular HUD clock. A rotating radar scanner sweeps across your annual milestones, showing contribution intensity and seasonal cadence.',
    badge: 'Circular HUD',
    accent: '#f59e0b',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'coding-pulse': {
    id: 'coding-pulse',
    name: 'Coding Pulse',
    tagline: 'Cardiogram Waveform & Oscilloscope',
    category: 'activity',
    description:
      'Translates weekly commit rhythms into a cardiac EKG waveform with glowing phosphorescent persistence, peak voltage spikes, and dynamic frequency metrics.',
    badge: 'Cathode Waveform',
    accent: '#10b981',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'developer-terminal': {
    id: 'developer-terminal',
    name: 'Developer Terminal',
    tagline: 'Typing CRT Git Log Telemetry',
    category: 'identity',
    description:
      'A simulated retro CRT workstation typing real git commands (`git log --graph --stat`), printing contribution commit hashes, streak velocity, and platform telemetry.',
    badge: 'Terminal Shell',
    accent: '#00ff66',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'contribution-snake': {
    id: 'contribution-snake',
    name: 'Contribution Snake',
    tagline: 'Arcade Snake Eating Calendar Dots',
    category: 'activity',
    description:
      'The classic arcade snake crawls through your 52-week contribution grid, hunting down high-activity days, eating commit nodes, and illuminating your work in its wake.',
    badge: 'Retro Arcade',
    accent: '#eab308',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'repository-galaxy': {
    id: 'repository-galaxy',
    name: 'Repository Galaxy',
    tagline: 'Orbital Planetary Universe',
    category: 'repository',
    description:
      'Every repository is an orbiting planetary body. Star counts dictate planetary radius, commit velocity dictates atmospheric corona, and languages dictate surface colors.',
    badge: 'Celestial Cosmos',
    accent: '#8b5cf6',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'developer-dna': {
    id: 'developer-dna',
    name: 'Developer DNA',
    tagline: 'Biometric Double-Helix Fingerprint',
    category: 'identity',
    description:
      'A rotating 3D double-helix genetic strand where base-pair rungs are mapped to verified programming language ratios and repository architectural traits.',
    badge: 'Biometric Helix',
    accent: '#ec4899',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
  'skill-constellation': {
    id: 'skill-constellation',
    name: 'Skill Constellation',
    tagline: 'Celestial Star Graph & Dependency Map',
    category: 'skills',
    description:
      'Connects frameworks, languages, and cloud tools as stellar nodes in a celestial star map, revealing genuine technical connections backed by repository evidence.',
    badge: 'Astrophysics Map',
    accent: '#06b6d4',
    supportsCanvas: true,
    supportsSvg: true,
    exportFormats: ['svg', 'png', 'markdown', 'embed'],
  },
};

export const ALL_VISUALIZATION_IDS = Object.keys(VISUALIZATION_REGISTRY) as VisualizationId[];

