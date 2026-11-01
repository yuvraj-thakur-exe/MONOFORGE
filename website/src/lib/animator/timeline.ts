/**
 * MonoForge Advanced Animation Timeline Engine
 *
 * Implements layer management, keyframe choreography, timing controls,
 * motion curves, and GitHub Camo-compliant SVG code generation.
 */

export type LayerType =
  | 'character'
  | 'banner'
  | 'text'
  | 'particles'
  | 'border-beam'
  | 'badge'
  | 'custom-svg';

export type MotionCurve =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'cyber-bounce'
  | 'elastic';

export interface KeyframePoint {
  id: string;
  time: number; // 0 to 100 percentage
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
  filter?: string;
  easing?: MotionCurve;
}

export interface TimelineLayer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  opacity: number;
  duration?: number; // layer-specific override in seconds (optional)
  delay?: number; // seconds
  keyframes: KeyframePoint[];
  svgContent: string; // Inner SVG markup (paths, rects, text, groups)
}

export interface TimelineProject {
  id: string;
  name: string;
  width: number;
  height: number;
  duration: number; // Global loop duration in seconds
  loop: boolean;
  backgroundColor: string;
  motionCurve: MotionCurve;
  layers: TimelineLayer[];
}

export const MOTION_CURVE_CSS: Record<MotionCurve, string> = {
  linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'cyber-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
};

/**
 * Creates an empty default project with standard dimensions.
 */
export function createDefaultTimelineProject(name = 'MonoForge Cyber Kinetic Banner'): TimelineProject {
  return {
    id: `proj_${Date.now()}`,
    name,
    width: 800,
    height: 220,
    duration: 4,
    loop: true,
    backgroundColor: '#090d16',
    motionCurve: 'ease-in-out',
    layers: [
      {
        id: 'layer_bg_grid',
        name: 'Cyber Grid Floor',
        type: 'banner',
        visible: true,
        locked: false,
        opacity: 0.4,
        keyframes: [
          { id: 'kf_1', time: 0, opacity: 0.3 },
          { id: 'kf_2', time: 50, opacity: 0.6 },
          { id: 'kf_3', time: 100, opacity: 0.3 },
        ],
        svgContent: `
          <pattern id="tl_grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00F0FF" stroke-width="0.75" opacity="0.3"/>
          </pattern>
          <rect width="800" height="220" fill="url(#tl_grid)" />
        `,
      },
      {
        id: 'layer_border_laser',
        name: 'Perimeter Laser Beam',
        type: 'border-beam',
        visible: true,
        locked: false,
        opacity: 1,
        keyframes: [
          { id: 'kf_beam_1', time: 0, opacity: 0.8 },
          { id: 'kf_beam_2', time: 50, opacity: 1 },
          { id: 'kf_beam_3', time: 100, opacity: 0.8 },
        ],
        svgContent: `
          <rect x="2" y="2" width="796" height="216" rx="8" fill="none" stroke="#FFE600" stroke-width="2" stroke-dasharray="160 320" stroke-linecap="round" class="tl-laser-beam"/>
        `,
      },
      {
        id: 'layer_char_bot',
        name: 'Cyber Bot Avatar',
        type: 'character',
        visible: true,
        locked: false,
        opacity: 1,
        keyframes: [
          { id: 'kf_bot_0', time: 0, y: 0, rotation: 0, scale: 1 },
          { id: 'kf_bot_50', time: 50, y: -8, rotation: 2, scale: 1.02 },
          { id: 'kf_bot_100', time: 100, y: 0, rotation: 0, scale: 1 },
        ],
        svgContent: `
          <g transform="translate(70, 70)">
            <!-- Cyber Bot Torso & Head -->
            <rect x="15" y="15" width="50" height="42" rx="10" fill="#18181B" stroke="#00F0FF" stroke-width="2"/>
            <circle cx="30" cy="32" r="5" fill="#00F0FF" filter="drop-shadow(0 0 4px #00F0FF)"/>
            <circle cx="50" cy="32" r="5" fill="#FFE600" filter="drop-shadow(0 0 4px #FFE600)"/>
            <line x1="28" y1="46" x2="52" y2="46" stroke="#00F0FF" stroke-width="2" stroke-linecap="round"/>
            <!-- Antenna -->
            <line x1="40" y1="15" x2="40" y2="4" stroke="#FFE600" stroke-width="2"/>
            <circle cx="40" cy="3" r="3" fill="#FFE600" class="tl-pulse-dot"/>
            <!-- Thruster Glow -->
            <polygon points="28,58 52,58 40,74" fill="#00F0FF" opacity="0.8" class="tl-thruster"/>
          </g>
        `,
      },
      {
        id: 'layer_text_title',
        name: 'Kinetic Header Text',
        type: 'text',
        visible: true,
        locked: false,
        opacity: 1,
        keyframes: [
          { id: 'kf_txt_0', time: 0, opacity: 0.9, scale: 1 },
          { id: 'kf_txt_50', time: 50, opacity: 1, scale: 1.01 },
          { id: 'kf_txt_100', time: 100, opacity: 0.9, scale: 1 },
        ],
        svgContent: `
          <g transform="translate(180, 95)">
            <text x="0" y="0" font-family="'Courier New', monospace" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="2">
              FORGE YOUR IDENTITY
            </text>
            <text x="0" y="32" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="600" fill="#00F0FF" letter-spacing="1">
              &gt; ARCHITECT // FULL-STACK ENGINEER // OPEN SOURCE
            </text>
            <rect x="0" y="48" width="80" height="20" rx="4" fill="#FFE600"/>
            <text x="40" y="62" font-family="monospace" font-size="11" font-weight="800" fill="#000000" text-anchor="middle">
              60 FPS CAMO
            </text>
          </g>
        `,
      },
    ],
  };
}

/**
 * Validates that project adheres to GitHub Camo requirements:
 * 1. Zero <script> tags.
 * 2. Zero <foreignObject> tags.
 * 3. Valid dimensions (>0).
 * 4. At least one layer.
 */
export function validateTimelineProject(project: TimelineProject): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!project.name || project.name.trim() === '') {
    errors.push('Project name cannot be empty.');
  }

  if (project.width <= 0 || project.height <= 0) {
    errors.push('Dimensions must be greater than zero.');
  }

  if (project.duration <= 0) {
    errors.push('Timeline duration must be positive.');
  }

  if (!project.layers || project.layers.length === 0) {
    errors.push('Timeline must contain at least one layer.');
  }

  for (const layer of project.layers) {
    const content = layer.svgContent.toLowerCase();
    if (content.includes('<script')) {
      errors.push(`Layer "${layer.name}" contains prohibited <script> tag.`);
    }
    if (content.includes('<foreignobject')) {
      errors.push(`Layer "${layer.name}" contains prohibited <foreignObject> tag.`);
    }
    if (content.includes('javascript:')) {
      errors.push(`Layer "${layer.name}" contains forbidden inline javascript: URI.`);
    }
    if (content.includes('onload=') || content.includes('onerror=')) {
      errors.push(`Layer "${layer.name}" contains unsafe DOM event handlers.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generates pure Camo-compliant SVG string with CSS @keyframes.
 */
export function generateTimelineSvg(project: TimelineProject): string {
  const validation = validateTimelineProject(project);
  if (!validation.valid) {
    throw new Error(`Invalid timeline project: ${validation.errors.join('; ')}`);
  }

  const durationSec = project.duration || 4;
  const loopMode = project.loop ? 'infinite' : '1';
  const easeCurve = MOTION_CURVE_CSS[project.motionCurve] || 'ease-in-out';

  // Build keyframes for each layer
  let cssRules = `
    * {
      box-sizing: border-box;
    }
    .tl-canvas {
      width: 100%;
      height: 100%;
      background: ${project.backgroundColor};
      border-radius: 8px;
    }
    .tl-pulse-dot {
      animation: tlGlow 1.2s ease-in-out infinite alternate;
    }
    .tl-thruster {
      animation: tlThruster 0.4s ease-in-out infinite alternate;
      transform-origin: 40px 58px;
    }
    .tl-laser-beam {
      animation: tlLaserDash ${durationSec}s linear infinite;
    }
    @keyframes tlGlow {
      from { opacity: 0.3; filter: drop-shadow(0 0 2px #FFE600); }
      to { opacity: 1; filter: drop-shadow(0 0 8px #FFE600); }
    }
    @keyframes tlThruster {
      from { transform: scaleY(0.7); opacity: 0.6; }
      to { transform: scaleY(1.3); opacity: 1; }
    }
    @keyframes tlLaserDash {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -480; }
    }
  `;

  const layerMarkups: string[] = [];

  project.layers.forEach((layer, idx) => {
    if (!layer.visible) return;

    const layerClass = `tl-layer-${idx}`;
    const animName = `tlAnim_${idx}`;

    if (layer.keyframes && layer.keyframes.length > 0) {
      // Sort keyframes by time
      const sortedKfs = [...layer.keyframes].sort((a, b) => a.time - b.time);

      const kfSteps = sortedKfs
        .map((kf) => {
          const transforms: string[] = [];
          if (kf.x !== undefined || kf.y !== undefined) {
            transforms.push(`translate(${kf.x ?? 0}px, ${kf.y ?? 0}px)`);
          }
          if (kf.rotation !== undefined) {
            transforms.push(`rotate(${kf.rotation}deg)`);
          }
          if (kf.scale !== undefined) {
            transforms.push(`scale(${kf.scale})`);
          }

          const declarations: string[] = [];
          if (transforms.length > 0) {
            declarations.push(`transform: ${transforms.join(' ')};`);
          }
          if (kf.opacity !== undefined) {
            declarations.push(`opacity: ${kf.opacity};`);
          }
          if (kf.filter) {
            declarations.push(`filter: ${kf.filter};`);
          }

          return `      ${kf.time}% { ${declarations.join(' ')} }`;
        })
        .join('\n');

      cssRules += `
    .${layerClass} {
      animation: ${animName} ${layer.duration || durationSec}s ${easeCurve} ${layer.delay || 0}s ${loopMode};
      transform-box: fill-box;
      transform-origin: center;
      opacity: ${layer.opacity};
    }
    @keyframes ${animName} {
${kfSteps}
    }
`;
    }

    layerMarkups.push(`
    <!-- Layer: ${layer.name} (${layer.type}) -->
    <g class="${layerClass}" id="${layer.id}">
      ${layer.svgContent.trim()}
    </g>
    `);
  });

  // Reduced motion media query
  cssRules += `
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${project.width} ${project.height}" width="${project.width}" height="${project.height}" preserveAspectRatio="xMidYMid meet">
  <defs>
    <style>
${cssRules}
  </style>
  </defs>
  <rect width="100%" height="100%" fill="${project.backgroundColor}" rx="8"/>
${layerMarkups.join('\n')}
</svg>`;
}

/**
 * Curated Preset Scenes ready to load into the timeline.
 */
export const PRESET_TIMELINE_SCENES: TimelineProject[] = [
  createDefaultTimelineProject('Cyber Bot Hero Terminal'),
  {
    id: 'proj_matrix_rain',
    name: 'Matrix Digital Rain & Terminal',
    width: 800,
    height: 220,
    duration: 3,
    loop: true,
    backgroundColor: '#050c08',
    motionCurve: 'linear',
    layers: [
      {
        id: 'matrix_columns',
        name: 'Binary Green Streams',
        type: 'particles',
        visible: true,
        locked: false,
        opacity: 0.75,
        keyframes: [
          { id: 'm_1', time: 0, y: -20, opacity: 0.5 },
          { id: 'm_2', time: 50, y: 0, opacity: 0.9 },
          { id: 'm_3', time: 100, y: 20, opacity: 0.5 },
        ],
        svgContent: `
          <g font-family="monospace" font-size="11" fill="#00FF66" opacity="0.6">
            <text x="50" y="30">01011001 01010101 01010110</text>
            <text x="50" y="60">11000101 00101101 10100101</text>
            <text x="50" y="90">00101010 11010101 00011010</text>
            <text x="50" y="120">01110010 10101100 11100011</text>
            <text x="450" y="40">INIT_SYSTEM_AUTH // OK</text>
            <text x="450" y="70">SEC_LEVEL_ROOT: GRANTED</text>
            <text x="450" y="100">KERNEL_CLOCK_HZ: 4000</text>
            <text x="450" y="130">MONOFORGE_DAEMON: ACTIVE</text>
          </g>
        `,
      },
      {
        id: 'matrix_prompt',
        name: 'Terminal CLI Prompt',
        type: 'text',
        visible: true,
        locked: false,
        opacity: 1,
        keyframes: [
          { id: 'p_1', time: 0, scale: 1 },
          { id: 'p_2', time: 50, scale: 1.01 },
          { id: 'p_3', time: 100, scale: 1 },
        ],
        svgContent: `
          <g transform="translate(60, 160)">
            <text x="0" y="0" font-family="'Courier New', monospace" font-size="20" font-weight="900" fill="#00FF66">
              $ mono --profile --compile --target=production
            </text>
            <rect x="570" y="-18" width="12" height="22" fill="#00FF66" opacity="0.85"/>
          </g>
        `,
      },
    ],
  },
  {
    id: 'proj_ninja_coder',
    name: 'Ninja Coder Combat Blade',
    width: 800,
    height: 220,
    duration: 3.5,
    loop: true,
    backgroundColor: '#0f0514',
    motionCurve: 'cyber-bounce',
    layers: [
      {
        id: 'ninja_blade_glow',
        name: 'Katana Slash Arc',
        type: 'character',
        visible: true,
        locked: false,
        opacity: 0.9,
        keyframes: [
          { id: 'n_1', time: 0, rotation: -5, scale: 0.98 },
          { id: 'n_2', time: 50, rotation: 8, scale: 1.05 },
          { id: 'n_3', time: 100, rotation: -5, scale: 0.98 },
        ],
        svgContent: `
          <g transform="translate(100, 110)">
            <!-- Katana Blade -->
            <path d="M 0 -70 Q 40 -20 80 0 Q 30 10 -10 -40 Z" fill="#FFE600" opacity="0.9" filter="drop-shadow(0 0 12px #FFE600)"/>
            <path d="M 10 -60 Q 45 -15 75 0 Q 35 5 0 -35 Z" fill="#FFFFFF"/>
            <!-- Ninja Headband flutter -->
            <path d="M -50 -10 Q -90 -25 -130 -10 Q -90 -5 -50 -5 Z" fill="#FF0055"/>
            <circle cx="-35" cy="-8" r="14" fill="#18181B" stroke="#FF0055" stroke-width="2"/>
            <rect x="-42" y="-12" width="14" height="4" fill="#FFFFFF"/>
          </g>
        `,
      },
      {
        id: 'ninja_headline',
        name: 'Code Warrior Callout',
        type: 'text',
        visible: true,
        locked: false,
        opacity: 1,
        keyframes: [
          { id: 'nh_1', time: 0, opacity: 0.85 },
          { id: 'nh_2', time: 50, opacity: 1 },
          { id: 'nh_3', time: 100, opacity: 0.85 },
        ],
        svgContent: `
          <g transform="translate(260, 95)">
            <text x="0" y="0" font-family="'Segoe UI', sans-serif" font-size="30" font-weight="900" fill="#FFFFFF">
              SILENT CODE. LETHAL SHIPS.
            </text>
            <text x="0" y="32" font-family="monospace" font-size="14" font-weight="700" fill="#FF0055">
              10,000+ COMMITS // 0 DEFECTS ALLOWED
            </text>
          </g>
        `,
      },
    ],
  },
];

