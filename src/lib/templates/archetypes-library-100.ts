import { ReadmeConfig } from '#/lib/plugins/types';

export interface LibraryTemplateItem {
  id: string;
  name: string;
  description: string;
  category: string;
  accent: string;
  prompt: string;
  config: ReadmeConfig;
}

export const ARCHETYPE_LIBRARY_100: LibraryTemplateItem[] = [
  {
    id: "cy01",
    name: "Neon Grid Runner",
    description: "Designed for cyberpunk full-stack developer. Featuring a rain-soaked megacity skyline with a tiny courier avatar sprinting across a luminous perspective grid.",
    category: "cyberpunk",
    accent: "#00E5FF",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Neon Grid Runner\" for a cyberpunk full-stack developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: midnight navy #08111F, electric cyan #00E5FF, hot magenta #FF3CAC, and ice white. Hero illustration: a rain-soaked megacity skyline with a tiny courier avatar sprinting across a luminous perspective grid. Layout: asymmetric hero on the left, compact identity rail on the right, then stacked neon dashboard panels. Browser and web presentation: a narrow browser-chrome strip with verified project demo tabs, plus a real desktop/mobile README preview.\n\nDATA & MODULES: real 52-week contribution heatmap plus velocity radar and a compact language donut. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, readme-typing-svg, mascot-bio, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: chromatic glitch title, moving grid horizon, cyan laser border beam, and subtle rain particles. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy01\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Neon Grid Runner Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Neon",
                  "role": "Cyberpunk full-stack developer",
                  "bio": "a rain-soaked megacity skyline with a tiny courier avatar sprinting across a luminous perspective grid",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 52-week contribution heatmap plus velocity ra"
            },
            "theme": "dark",
            "accentColor": "#00E5FF",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy01-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy01-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy01-mascot-bio-3",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy01-telemetry-isocalendar-4",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy01-pie-chart-5",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy01-github-readme-stats-6",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy01-skill-icons-7",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy01-socials-8",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Neon Grid Runner",
                              "color": "00E5FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy02",
    name: "Matrix Rain Operator",
    description: "Designed for systems programmer and security researcher. Featuring a hooded terminal operator beneath cascading native-SVG glyph columns and a command prompt.",
    category: "cyberpunk",
    accent: "#39FF14",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Matrix Rain Operator\" for a systems programmer and security researcher. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep graphite #101820, phosphor green #39FF14, emerald #10B981, and muted silver. Hero illustration: a hooded terminal operator beneath cascading native-SVG glyph columns and a command prompt. Layout: terminal-first composition with a single-column narrative, shell-style section headers, and a two-card metrics row. Browser and web presentation: a compact browser-tab motif for verified security writeups and public lab demos; test mobile line wrapping.\n\nDATA & MODULES: live contribution heatmap, real contributor velocity radar, and language distribution. Build the section sequence from these registered MonoForge plugin IDs where relevant: readme-typing-svg, capsule-banner, telemetry-isocalendar, github-readme-stats, skill-icons, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: falling Matrix columns, blinking cursor, scanlines, and restrained phosphor glow. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy02\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Matrix Rain Operator Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Matrix",
                  "role": "Systems programmer and security researcher",
                  "bio": "a hooded terminal operator beneath cascading native-SVG glyph columns and a command prompt",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "live contribution heatmap, real contributor veloci"
            },
            "theme": "dark",
            "accentColor": "#39FF14",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy02-readme-typing-svg-1",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Matrix Rain Operator",
                              "color": "39FF14",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy02-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Matrix Rain Operator",
                              "color": "39FF14",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy02-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Matrix Rain Operator",
                              "color": "39FF14",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy02-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Matrix Rain Operator",
                              "color": "39FF14",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy02-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Matrix Rain Operator",
                              "color": "39FF14",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy02-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Matrix Rain Operator",
                              "color": "39FF14",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy02-footer-7",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Matrix Rain Operator",
                              "color": "39FF14",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy03",
    name: "Outrun Sunset Circuit",
    description: "Designed for creative coder and WebGL engineer. Featuring a retro-futurist sun sinking behind a wireframe highway and chrome developer monogram.",
    category: "cyberpunk",
    accent: "#FF5A5F",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Outrun Sunset Circuit\" for a creative coder and WebGL engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: sunset coral #FF5A5F, ultraviolet #7957D5, neon peach #FFB86B, and deep indigo #171432. Hero illustration: a retro-futurist sun sinking behind a wireframe highway and chrome developer monogram. Layout: centered cinematic banner, three-column skill strip, then a split project showcase and activity section. Browser and web presentation: frame selected live demos inside retro browser windows with real supplied URLs and accurate page titles.\n\nDATA & MODULES: real 3D isometric contribution calendar with language donut and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, readme-typing-svg, portfolio-contributions, pie-chart, github-readme-stats, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow parallax-style SVG layers, gradient chrome sweep, horizon grid pulse, and short title typewriter. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy03\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Outrun Sunset Circuit Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Outrun",
                  "role": "Creative coder and WebGL engineer",
                  "bio": "a retro-futurist sun sinking behind a wireframe highway and chrome developer monogram",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 3D isometric contribution calendar with langu"
            },
            "theme": "dark",
            "accentColor": "#FF5A5F",
            "badgeStyle": "for-the-badge",
            "align": "center"
      },
      "sections": [
            {
                  "id": "cy03-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Outrun Sunset Circuit",
                              "color": "FF5A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy03-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Outrun Sunset Circuit",
                              "color": "FF5A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy03-portfolio-contributions-3",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Outrun Sunset Circuit",
                              "color": "FF5A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy03-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Outrun Sunset Circuit",
                              "color": "FF5A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy03-github-readme-stats-5",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Outrun Sunset Circuit",
                              "color": "FF5A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy03-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Outrun Sunset Circuit",
                              "color": "FF5A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy03-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Outrun Sunset Circuit",
                              "color": "FF5A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy04",
    name: "Bioluminescent Net Diver",
    description: "Designed for network engineer and distributed-systems builder. Featuring a deep-sea diver mascot surrounded by glowing network nodes, jellyfish-like data forms, and cable reefs.",
    category: "cyberpunk",
    accent: "#2DE2C5",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Bioluminescent Net Diver\" for a network engineer and distributed-systems builder. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: abyssal navy #071B2C, bioluminescent teal #2DE2C5, mint #A8FFDB, and moonlit blue #6C9EFF. Hero illustration: a deep-sea diver mascot surrounded by glowing network nodes, jellyfish-like data forms, and cable reefs. Layout: wide underwater hero with floating identity capsule, flowing project cards, and a calm telemetry footer. Browser and web presentation: use a browser-frame gallery for public demos as if they are glass research windows underwater.\n\nDATA & MODULES: real contribution heatmap, weekly WakaTime only when connected, and top-language donut. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, capsule-banner, telemetry-isocalendar, waka-readme-stats, pie-chart, projects-showcase, skill-icons. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: drifting bubbles, pulsing node links, soft caustic light bands, and gentle mascot hover. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy04\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Bioluminescent Net Diver Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Bioluminescent",
                  "role": "Network engineer and distributed-systems builder",
                  "bio": "a deep-sea diver mascot surrounded by glowing network nodes, jellyfish-like data forms, and cable reefs",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, weekly WakaTime only wh"
            },
            "theme": "dark",
            "accentColor": "#2DE2C5",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy04-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioluminescent Net Diver",
                              "color": "2DE2C5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy04-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioluminescent Net Diver",
                              "color": "2DE2C5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy04-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioluminescent Net Diver",
                              "color": "2DE2C5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy04-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioluminescent Net Diver",
                              "color": "2DE2C5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy04-pie-chart-5",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioluminescent Net Diver",
                              "color": "2DE2C5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy04-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioluminescent Net Diver",
                              "color": "2DE2C5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy04-skill-icons-7",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioluminescent Net Diver",
                              "color": "2DE2C5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy05",
    name: "Arctic Cyber Sentinel",
    description: "Designed for cloud security engineer and infrastructure defender. Featuring a futuristic sentinel in an ice observatory with shield-shaped SVG geometry and a frozen data horizon.",
    category: "cyberpunk",
    accent: "#9BE7FF",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Arctic Cyber Sentinel\" for a cloud security engineer and infrastructure defender. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: glacier blue #9BE7FF, arctic cyan #19B5FE, slate #263746, and frost white #F4FBFF. Hero illustration: a futuristic sentinel in an ice observatory with shield-shaped SVG geometry and a frozen data horizon. Layout: crisp editorial hero, shield-shaped status panel, orderly skill matrix, and two-column project cards. Browser and web presentation: place verified advisories, audit reports, and project documentation in small browser-window link cards.\n\nDATA & MODULES: real contribution velocity radar, GitHub stats, and language donut; security metrics only from verified sources. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, mascot-bio, telemetry-isocalendar, github-readme-stats, pie-chart, skill-icons, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow snow drift, shield pulse, crystalline border shimmer, and a reduced-motion static fallback. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy05\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Arctic Cyber Sentinel Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Arctic",
                  "role": "Cloud security engineer and infrastructure defender",
                  "bio": "a futuristic sentinel in an ice observatory with shield-shaped SVG geometry and a frozen data horizon",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar, GitHub stats, an"
            },
            "theme": "dark",
            "accentColor": "#9BE7FF",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy05-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Arctic Cyber Sentinel",
                              "color": "9BE7FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy05-mascot-bio-2",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Arctic Cyber Sentinel",
                              "color": "9BE7FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy05-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Arctic Cyber Sentinel",
                              "color": "9BE7FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy05-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Arctic Cyber Sentinel",
                              "color": "9BE7FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy05-pie-chart-5",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Arctic Cyber Sentinel",
                              "color": "9BE7FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy05-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Arctic Cyber Sentinel",
                              "color": "9BE7FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy05-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Arctic Cyber Sentinel",
                              "color": "9BE7FF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy06",
    name: "Ember Circuit Smith",
    description: "Designed for platform engineer and hardware-minded builder. Featuring a mechanical builder mascot striking a circuit anvil as tiny sparks become modular technology blocks.",
    category: "cyberpunk",
    accent: "#F59E0B",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Ember Circuit Smith\" for a platform engineer and hardware-minded builder. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: charcoal #18212B, forge amber #F59E0B, ember orange #F97316, and signal cyan #38BDF8. Hero illustration: a mechanical builder mascot striking a circuit anvil as tiny sparks become modular technology blocks. Layout: workshop header, bold nameplate, horizontal technology belt, then project forge cards and a contribution footer. Browser and web presentation: display verified repositories in small tool-window frames with language and release links.\n\nDATA & MODULES: real 3D isometric contribution calendar, heatmap, and current GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, capsule-banner, portfolio-contributions, telemetry-isocalendar, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: hammer-swing silhouette, spark bursts, glowing block assembly, and animated perimeter dashes. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy06\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Ember Circuit Smith Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Ember",
                  "role": "Platform engineer and hardware-minded builder",
                  "bio": "a mechanical builder mascot striking a circuit anvil as tiny sparks become modular technology blocks",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 3D isometric contribution calendar, heatmap, "
            },
            "theme": "dark",
            "accentColor": "#F59E0B",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy06-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Ember Circuit Smith",
                              "color": "F59E0B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy06-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Ember Circuit Smith",
                              "color": "F59E0B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy06-portfolio-contributions-3",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Ember Circuit Smith",
                              "color": "F59E0B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy06-telemetry-isocalendar-4",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Ember Circuit Smith",
                              "color": "F59E0B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy06-github-readme-stats-5",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Ember Circuit Smith",
                              "color": "F59E0B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy06-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Ember Circuit Smith",
                              "color": "F59E0B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy06-projects-showcase-7",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Ember Circuit Smith",
                              "color": "F59E0B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy07",
    name: "Holographic Command Deck",
    description: "Designed for AI systems engineer and product builder. Featuring a floating holographic command table with layered translucent SVG panels and a central developer insignia.",
    category: "cyberpunk",
    accent: "#4DEBFF",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Holographic Command Deck\" for a AI systems engineer and product builder. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep indigo #10142D, holo cyan #4DEBFF, ultraviolet #9B8CFF, and pearl #F4F6FF. Hero illustration: a floating holographic command table with layered translucent SVG panels and a central developer insignia. Layout: radial hero with a central identity hub, orbiting specialization chips, then clean bento cards. Browser and web presentation: include a browser-like live-demo module with verified project tabs and a clear external-link affordance.\n\nDATA & MODULES: real contribution heatmap, language donut, WakaTime when configured, and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, readme-typing-svg, telemetry-isocalendar, pie-chart, waka-readme-stats, github-readme-stats, skill-icons. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: orbital badges, rotating thin rings, hologram flicker, and slow opacity pulses. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy07\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Holographic Command Deck Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Holographic",
                  "role": "AI systems engineer and product builder",
                  "bio": "a floating holographic command table with layered translucent SVG panels and a central developer insignia",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, WakaTim"
            },
            "theme": "dark",
            "accentColor": "#4DEBFF",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy07-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Holographic Command Deck",
                              "color": "4DEBFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy07-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Holographic Command Deck",
                              "color": "4DEBFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy07-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Holographic Command Deck",
                              "color": "4DEBFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy07-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Holographic Command Deck",
                              "color": "4DEBFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy07-waka-readme-stats-5",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Holographic Command Deck",
                              "color": "4DEBFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy07-github-readme-stats-6",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Holographic Command Deck",
                              "color": "4DEBFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy07-skill-icons-7",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Holographic Command Deck",
                              "color": "4DEBFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy08",
    name: "Glitchwave Data Samurai",
    description: "Designed for data engineer and creative technologist. Featuring a geometric samurai avatar with a split-color visor and diagonal data ribbons.",
    category: "cyberpunk",
    accent: "#FF3B5C",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Glitchwave Data Samurai\" for a data engineer and creative technologist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: signal red #FF3B5C, electric cyan #00D1FF, dark plum #21152B, and white. Hero illustration: a geometric samurai avatar with a split-color visor and diagonal data ribbons. Layout: diagonal hero composition, two-column skills and project panels, with a full-width activity strip. Browser and web presentation: show verified notebooks and deployed dashboards in browser cards; do not invent screenshots or links.\n\nDATA & MODULES: real velocity radar, contribution heatmap, language donut, and verified LeetCode panel if connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, readme-typing-svg, telemetry-isocalendar, pie-chart, github-readme-stats, github-profile-trophy, skill-icons. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: brief chromatic glitch, katana light sweep, animated ribbon drift, and cursor blink. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy08\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Glitchwave Data Samurai Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Glitchwave",
                  "role": "Data engineer and creative technologist",
                  "bio": "a geometric samurai avatar with a split-color visor and diagonal data ribbons",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real velocity radar, contribution heatmap, languag"
            },
            "theme": "dark",
            "accentColor": "#FF3B5C",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy08-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Glitchwave Data Samurai",
                              "color": "FF3B5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy08-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Glitchwave Data Samurai",
                              "color": "FF3B5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy08-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Glitchwave Data Samurai",
                              "color": "FF3B5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy08-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Glitchwave Data Samurai",
                              "color": "FF3B5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy08-github-readme-stats-5",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Glitchwave Data Samurai",
                              "color": "FF3B5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy08-github-profile-trophy-6",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Glitchwave Data Samurai",
                              "color": "FF3B5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy08-skill-icons-7",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Glitchwave Data Samurai",
                              "color": "FF3B5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy09",
    name: "Cyber Bot Pilot Bay",
    description: "Designed for developer tooling engineer and automation specialist. Featuring a compact floating Cyber Bot with antenna beacon, twin thrusters, and a terminal speech bubble.",
    category: "cyberpunk",
    accent: "#22D3EE",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Cyber Bot Pilot Bay\" for a developer tooling engineer and automation specialist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: navy #0D1726, bot cyan #22D3EE, warning amber #FBBF24, and emerald #10B981. Hero illustration: a compact floating Cyber Bot with antenna beacon, twin thrusters, and a terminal speech bubble. Layout: robot positioned beside the name, status terminal below, modular bento sections, and compact footer. Browser and web presentation: use browser tabs as the bot's mission console linking to actual docs, demos, and repositories.\n\nDATA & MODULES: real 3D isometric calendar, annual heatmap, and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, capsule-banner, telemetry-isocalendar, portfolio-contributions, github-readme-stats, skill-icons, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: purposeful hover, antenna blink, thruster opacity flicker, and slow border beam. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy09\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Cyber Bot Pilot Bay Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Cyber",
                  "role": "Developer tooling engineer and automation specialist",
                  "bio": "a compact floating Cyber Bot with antenna beacon, twin thrusters, and a terminal speech bubble",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 3D isometric calendar, annual heatmap, and Gi"
            },
            "theme": "dark",
            "accentColor": "#22D3EE",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy09-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cyber Bot Pilot Bay",
                              "color": "22D3EE",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy09-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cyber Bot Pilot Bay",
                              "color": "22D3EE",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy09-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cyber Bot Pilot Bay",
                              "color": "22D3EE",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy09-portfolio-contributions-4",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cyber Bot Pilot Bay",
                              "color": "22D3EE",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy09-github-readme-stats-5",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cyber Bot Pilot Bay",
                              "color": "22D3EE",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy09-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cyber Bot Pilot Bay",
                              "color": "22D3EE",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy09-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cyber Bot Pilot Bay",
                              "color": "22D3EE",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy10",
    name: "Zero-Day Ninja Guardian",
    description: "Designed for ethical security researcher and defensive tooling developer. Featuring a stealth ninja coder with flowing headband ribbons and a glowing defensive shield glyph.",
    category: "cyberpunk",
    accent: "#F43F5E",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Zero-Day Ninja Guardian\" for a ethical security researcher and defensive tooling developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: near-black slate #111827, crimson #F43F5E, cold cyan #22D3EE, and ash #CBD5E1. Hero illustration: a stealth ninja coder with flowing headband ribbons and a glowing defensive shield glyph. Layout: right-flank character, sharp left-aligned identity, compact security-tool matrix, and evidence-first project cards. Browser and web presentation: browser research may verify public writeups and tool repositories; never expose private targets or imply unauthorized work.\n\nDATA & MODULES: real contribution heatmap and velocity radar; show certifications and vulnerability work only when supplied. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, readme-typing-svg, telemetry-isocalendar, github-readme-stats, skill-icons, markdown-badges, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: headband flutter, blade-glint sweep, crosshair corners, and low-frequency aura pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy10\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Zero-Day Ninja Guardian Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Zero-Day",
                  "role": "Ethical security researcher and defensive tooling developer",
                  "bio": "a stealth ninja coder with flowing headband ribbons and a glowing defensive shield glyph",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and velocity radar; show"
            },
            "theme": "dark",
            "accentColor": "#F43F5E",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy10-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Zero-Day Ninja Guardian",
                              "color": "F43F5E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy10-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Zero-Day Ninja Guardian",
                              "color": "F43F5E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy10-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Zero-Day Ninja Guardian",
                              "color": "F43F5E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy10-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Zero-Day Ninja Guardian",
                              "color": "F43F5E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy10-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Zero-Day Ninja Guardian",
                              "color": "F43F5E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy10-markdown-badges-6",
                  "type": "markdown-badges",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Zero-Day Ninja Guardian",
                              "color": "F43F5E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy10-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Zero-Day Ninja Guardian",
                              "color": "F43F5E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy11",
    name: "Quantum Signal Laboratory",
    description: "Designed for quantum software developer and research engineer. Featuring a quantum-inspired lattice of orbiting nodes surrounding a luminous qubit emblem.",
    category: "cyberpunk",
    accent: "#7868E6",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Quantum Signal Laboratory\" for a quantum software developer and research engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: quantum violet #7868E6, mint #50E3C2, deep navy #12182B, and pale lavender. Hero illustration: a quantum-inspired lattice of orbiting nodes surrounding a luminous qubit emblem. Layout: precise centered hero, orbital skill diagram, paper/project cards, then compact analytics. Browser and web presentation: place verified publications and demos in browser-style experiment cards with DOI or canonical URLs.\n\nDATA & MODULES: real contribution calendar, language donut, and verified research or coding metrics. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, readme-typing-svg, telemetry-isocalendar, pie-chart, github-readme-stats, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow orbital paths, node pulses, probabilistic sparkle accents, and geometric border beams. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy11\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Quantum Signal Laboratory Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Quantum",
                  "role": "Quantum software developer and research engineer",
                  "bio": "a quantum-inspired lattice of orbiting nodes surrounding a luminous qubit emblem",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar, language donut, and ve"
            },
            "theme": "dark",
            "accentColor": "#7868E6",
            "badgeStyle": "for-the-badge",
            "align": "center"
      },
      "sections": [
            {
                  "id": "cy11-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Quantum Signal Laboratory",
                              "color": "7868E6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy11-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Quantum Signal Laboratory",
                              "color": "7868E6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy11-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Quantum Signal Laboratory",
                              "color": "7868E6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy11-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Quantum Signal Laboratory",
                              "color": "7868E6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy11-github-readme-stats-5",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Quantum Signal Laboratory",
                              "color": "7868E6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy11-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Quantum Signal Laboratory",
                              "color": "7868E6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy11-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Quantum Signal Laboratory",
                              "color": "7868E6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy12",
    name: "CRT Terminal Archivist",
    description: "Designed for Linux enthusiast and low-level developer. Featuring an old CRT monitor displaying a structured terminal greeting and a tiny blinking block cursor.",
    category: "cyberpunk",
    accent: "#FFB000",
    prompt: "Create a production-grade GitHub Profile README archetype named \"CRT Terminal Archivist\" for a Linux enthusiast and low-level developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: phosphor amber #FFB000, muted green #7CFC98, charcoal #1B232A, and warm paper #E8E1C9. Hero illustration: an old CRT monitor displaying a structured terminal greeting and a tiny blinking block cursor. Layout: monospace terminal frame with numbered section labels, simple skills list, and a single project shelf. Browser and web presentation: show documentation and live terminal demos as separate browser tabs styled like vintage window chrome.\n\nDATA & MODULES: real contribution heatmap, contribution velocity, and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: readme-typing-svg, telemetry-isocalendar, github-readme-stats, skill-icons, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: CRT scanlines, typewriter reveal, subtle phosphor flicker, and restrained rolling cursor. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy12\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "CRT Terminal Archivist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "CRT",
                  "role": "Linux enthusiast and low-level developer",
                  "bio": "an old CRT monitor displaying a structured terminal greeting and a tiny blinking block cursor",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, contribution velocity, "
            },
            "theme": "dark",
            "accentColor": "#FFB000",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy12-readme-typing-svg-1",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CRT Terminal Archivist",
                              "color": "FFB000",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy12-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CRT Terminal Archivist",
                              "color": "FFB000",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy12-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CRT Terminal Archivist",
                              "color": "FFB000",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy12-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CRT Terminal Archivist",
                              "color": "FFB000",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy12-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CRT Terminal Archivist",
                              "color": "FFB000",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy12-footer-6",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CRT Terminal Archivist",
                              "color": "FFB000",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy13",
    name: "Mecha Robotics Pilot",
    description: "Designed for robotics engineer and autonomous systems developer. Featuring a towering mecha shoulder silhouette with a miniature pilot badge and schematic callouts.",
    category: "cyberpunk",
    accent: "#344054",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Mecha Robotics Pilot\" for a robotics engineer and autonomous systems developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: gunmetal #344054, electric blue #27C2FF, safety orange #FF8A3D, and titanium #E8EDF2. Hero illustration: a towering mecha shoulder silhouette with a miniature pilot badge and schematic callouts. Layout: wide mech silhouette behind the header, engineering skill matrix, hardware project cards, and telemetry footer. Browser and web presentation: browser-frame each robot demo or simulation with verified repository and deployed visualization links.\n\nDATA & MODULES: real contribution heatmap, language breakdown, and WakaTime only if connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, capsule-banner, telemetry-isocalendar, pie-chart, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: servo-like limb micro-movements, scan sweep, warning LEDs, and subtle mechanical parallax. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy13\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Mecha Robotics Pilot Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Mecha",
                  "role": "Robotics engineer and autonomous systems developer",
                  "bio": "a towering mecha shoulder silhouette with a miniature pilot badge and schematic callouts",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language breakdown, and"
            },
            "theme": "dark",
            "accentColor": "#344054",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy13-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Robotics Pilot",
                              "color": "344054",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy13-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Robotics Pilot",
                              "color": "344054",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy13-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Robotics Pilot",
                              "color": "344054",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy13-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Robotics Pilot",
                              "color": "344054",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy13-waka-readme-stats-5",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Robotics Pilot",
                              "color": "344054",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy13-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Robotics Pilot",
                              "color": "344054",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy13-projects-showcase-7",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Robotics Pilot",
                              "color": "344054",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy14",
    name: "Orbital Satellite Console",
    description: "Designed for aerospace software engineer and telemetry specialist. Featuring a CubeSat in orbit with antenna beams, telemetry packets, and a clean orbital path diagram.",
    category: "cyberpunk",
    accent: "#4CC9F0",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Orbital Satellite Console\" for a aerospace software engineer and telemetry specialist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: space navy #0B1535, orbital cyan #4CC9F0, solar gold #FFC857, and star white #F5F7FF. Hero illustration: a CubeSat in orbit with antenna beams, telemetry packets, and a clean orbital path diagram. Layout: mission-control header with orbit labels, two-column systems skills, and project payload cards. Browser and web presentation: use browser-window payload cards for verified flight software docs, simulators, and public datasets.\n\nDATA & MODULES: real contribution calendar and velocity radar; only show actual mission or sensor metrics provided by the user. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, github-readme-stats, pie-chart, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow satellite orbit, blinking signal beacon, moving packet dots, and tiny star twinkles. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy14\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Orbital Satellite Console Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Orbital",
                  "role": "Aerospace software engineer and telemetry specialist",
                  "bio": "a CubeSat in orbit with antenna beams, telemetry packets, and a clean orbital path diagram",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar and velocity radar; onl"
            },
            "theme": "dark",
            "accentColor": "#4CC9F0",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy14-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Orbital Satellite Console",
                              "color": "4CC9F0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy14-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Orbital Satellite Console",
                              "color": "4CC9F0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy14-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Orbital Satellite Console",
                              "color": "4CC9F0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy14-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Orbital Satellite Console",
                              "color": "4CC9F0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy14-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Orbital Satellite Console",
                              "color": "4CC9F0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy14-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Orbital Satellite Console",
                              "color": "4CC9F0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy14-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Orbital Satellite Console",
                              "color": "4CC9F0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy15",
    name: "Vaporwave Arcade Protocol",
    description: "Designed for game developer and frontend experimenter. Featuring an arcade cabinet with a pixel avatar, neon palm silhouettes, and a retro scoreboard.",
    category: "cyberpunk",
    accent: "#FF5DB1",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Vaporwave Arcade Protocol\" for a game developer and frontend experimenter. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: electric pink #FF5DB1, aqua #55F7E8, violet #8B5CF6, and midnight #19152E. Hero illustration: an arcade cabinet with a pixel avatar, neon palm silhouettes, and a retro scoreboard. Layout: arcade marquee hero, pixel skill chips, game showcase tiles, and a contribution-game footer. Browser and web presentation: show playable browser demos as game cartridges with verified links and clear launch labels.\n\nDATA & MODULES: real contribution snake when supported, heatmap, game-project stats, and language donut. Build the section sequence from these registered MonoForge plugin IDs where relevant: snk, mascot-bio, capsule-banner, telemetry-isocalendar, pie-chart, github-profile-trophy, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: pixel sprite bob, scanline shimmer, blinking marquee, and gentle CRT glow. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy15\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Vaporwave Arcade Protocol Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Vaporwave",
                  "role": "Game developer and frontend experimenter",
                  "bio": "an arcade cabinet with a pixel avatar, neon palm silhouettes, and a retro scoreboard",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution snake when supported, heatmap, g"
            },
            "theme": "dark",
            "accentColor": "#FF5DB1",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy15-snk-1",
                  "type": "snk",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Vaporwave Arcade Protocol",
                              "color": "FF5DB1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy15-mascot-bio-2",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Vaporwave Arcade Protocol",
                              "color": "FF5DB1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy15-capsule-banner-3",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Vaporwave Arcade Protocol",
                              "color": "FF5DB1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy15-telemetry-isocalendar-4",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Vaporwave Arcade Protocol",
                              "color": "FF5DB1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy15-pie-chart-5",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Vaporwave Arcade Protocol",
                              "color": "FF5DB1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy15-github-profile-trophy-6",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Vaporwave Arcade Protocol",
                              "color": "FF5DB1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy15-projects-showcase-7",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Vaporwave Arcade Protocol",
                              "color": "FF5DB1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "cy16",
    name: "Stealth Redline Systems",
    description: "Designed for systems architect and performance engineer. Featuring an abstract stealth aircraft silhouette built from precise vector facets and a single signal line.",
    category: "cyberpunk",
    accent: "#FF5A36",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Stealth Redline Systems\" for a systems architect and performance engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: graphite #202833, redline orange #FF5A36, muted steel #A8B4C2, and cold white. Hero illustration: an abstract stealth aircraft silhouette built from precise vector facets and a single signal line. Layout: high-contrast horizontal header, tight typography, architecture index, and a narrow metrics sidebar. Browser and web presentation: add compact browser tabs for benchmarks and technical demos only when linked and verifiable.\n\nDATA & MODULES: real contribution velocity radar, 52-week heatmap, and language distribution. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, github-readme-stats, pie-chart, skill-icons, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: single redline sweep, restrained HUD markers, and a short glitch only on the title. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"cy16\", name, category \"cyberpunk\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Stealth Redline Systems Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Stealth",
                  "role": "Systems architect and performance engineer",
                  "bio": "an abstract stealth aircraft silhouette built from precise vector facets and a single signal line",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar, 52-week heatmap,"
            },
            "theme": "dark",
            "accentColor": "#FF5A36",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "cy16-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Stealth Redline Systems",
                              "color": "FF5A36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy16-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Stealth Redline Systems",
                              "color": "FF5A36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy16-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Stealth Redline Systems",
                              "color": "FF5A36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy16-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Stealth Redline Systems",
                              "color": "FF5A36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy16-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Stealth Redline Systems",
                              "color": "FF5A36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "cy16-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Stealth Redline Systems",
                              "color": "FF5A36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi01",
    name: "Swiss Typographer",
    description: "Designed for senior software engineer who values clarity. Featuring a typographic monogram and a precise Swiss grid with oversized name and one-line role.",
    category: "minimalist",
    accent: "#253041",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Swiss Typographer\" for a senior software engineer who values clarity. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: paper white #FAFBFC, charcoal #253041, cobalt #3157D5, and quiet gray #98A2B3. Hero illustration: a typographic monogram and a precise Swiss grid with oversized name and one-line role. Layout: asymmetric editorial grid, strong baseline alignment, generous whitespace, and no decorative card clutter. Browser and web presentation: a slim browser-link index for portfolio, résumé, and two verified project demos; keep URLs readable.\n\nDATA & MODULES: one slim real contribution heatmap and small language donut only if they add useful information. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, skill-icons, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: no character animation; use one subtle underline reveal and reduced-motion-safe SVG monogram. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi01\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Swiss Typographer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Swiss",
                  "role": "Senior software engineer who values clarity",
                  "bio": "a typographic monogram and a precise Swiss grid with oversized name and one-line role",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "one slim real contribution heatmap and small langu"
            },
            "theme": "auto",
            "accentColor": "#253041",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi01-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Swiss Typographer",
                              "color": "253041",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi01-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Swiss Typographer",
                              "color": "253041",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi01-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Swiss Typographer",
                              "color": "253041",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi01-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Swiss Typographer",
                              "color": "253041",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi01-footer-5",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Swiss Typographer",
                              "color": "253041",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi02",
    name: "Nordic Snowfield",
    description: "Designed for frontend engineer and design systems builder. Featuring a minimal mountain-line SVG with a small sun and a quiet geometric avatar.",
    category: "minimalist",
    accent: "#334155",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Nordic Snowfield\" for a frontend engineer and design systems builder. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: snow white #F8FAFC, glacier #DCEAF2, slate #334155, and arctic blue #7AA6C2. Hero illustration: a minimal mountain-line SVG with a small sun and a quiet geometric avatar. Layout: single-column layout with soft section dividers, compact skills row, and two understated project summaries. Browser and web presentation: browser frames should look like clean Nordic tabs with verified live-site titles and no fake preview text.\n\nDATA & MODULES: real 52-week contribution heatmap as the only major graphic. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow sun drift and tiny snowfall only in the banner; keep the README body static. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi02\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Nordic Snowfield Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Nordic",
                  "role": "Frontend engineer and design systems builder",
                  "bio": "a minimal mountain-line SVG with a small sun and a quiet geometric avatar",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 52-week contribution heatmap as the only majo"
            },
            "theme": "auto",
            "accentColor": "#334155",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi02-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Nordic Snowfield",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi02-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Nordic Snowfield",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi02-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Nordic Snowfield",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi02-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Nordic Snowfield",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi02-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Nordic Snowfield",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi03",
    name: "Warm Paper Studio",
    description: "Designed for independent developer and technical writer. Featuring a paper-cut monogram with hand-drawn corner marks and an editorial title block.",
    category: "minimalist",
    accent: "#C56B4A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Warm Paper Studio\" for a independent developer and technical writer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: ivory #F7F2E8, ink #292A2D, terracotta #C56B4A, and muted olive #8A9272. Hero illustration: a paper-cut monogram with hand-drawn corner marks and an editorial title block. Layout: magazine-like two-column layout with an about note, selected work, and small contact row. Browser and web presentation: browser-style cards resemble printed project clippings with verified URL, role, and one-line summary.\n\nDATA & MODULES: real contributor heatmap as a compact endnote; omit noisy charts. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: animated pencil underline, subtle paper-grain SVG texture, and no looping motion in content. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi03\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Warm Paper Studio Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Warm",
                  "role": "Independent developer and technical writer",
                  "bio": "a paper-cut monogram with hand-drawn corner marks and an editorial title block",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contributor heatmap as a compact endnote; omi"
            },
            "theme": "auto",
            "accentColor": "#C56B4A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi03-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Warm Paper Studio",
                              "color": "C56B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi03-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Warm Paper Studio",
                              "color": "C56B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi03-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Warm Paper Studio",
                              "color": "C56B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi03-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Warm Paper Studio",
                              "color": "C56B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi03-footer-5",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Warm Paper Studio",
                              "color": "C56B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi04",
    name: "Graphite Monochrome",
    description: "Designed for backend engineer and open-source contributor. Featuring a monochrome abstract code bracket symbol with one mint accent dot.",
    category: "minimalist",
    accent: "#AAB4C0",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Graphite Monochrome\" for a backend engineer and open-source contributor. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: graphite #20252D, soft white #F4F6F8, silver #AAB4C0, and mint #70D6B5. Hero illustration: a monochrome abstract code bracket symbol with one mint accent dot. Layout: left-aligned typographic identity, compact skill icons, a tidy project table, and minimal stats row. Browser and web presentation: use a restrained browser-tab strip containing only verified repositories or portfolio links.\n\nDATA & MODULES: real contribution velocity radar in muted gray with a mint highlight. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, skill-icons, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow opacity pulse on the accent dot; avoid any other visual noise. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi04\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Graphite Monochrome Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Graphite",
                  "role": "Backend engineer and open-source contributor",
                  "bio": "a monochrome abstract code bracket symbol with one mint accent dot",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar in muted gray wit"
            },
            "theme": "auto",
            "accentColor": "#AAB4C0",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi04-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Graphite Monochrome",
                              "color": "AAB4C0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi04-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Graphite Monochrome",
                              "color": "AAB4C0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi04-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Graphite Monochrome",
                              "color": "AAB4C0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi04-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Graphite Monochrome",
                              "color": "AAB4C0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi05",
    name: "Sage Botanical Engineer",
    description: "Designed for sustainability-minded full-stack developer. Featuring a botanical line-art branch growing into a circuit trace with tiny leaf nodes.",
    category: "minimalist",
    accent: "#8DAA91",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Sage Botanical Engineer\" for a sustainability-minded full-stack developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: warm cream #F6F5EF, sage #8DAA91, forest #355E4B, and dark ink #29332E. Hero illustration: a botanical line-art branch growing into a circuit trace with tiny leaf nodes. Layout: airy vertical flow, short mission statement, grouped skills, and selected projects with generous spacing. Browser and web presentation: present environmental or civic-tech demos in browser-like link cards with verified project sources.\n\nDATA & MODULES: real annual contribution heatmap using sage intensity levels. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: leaf sway, gentle growth-line reveal, and a static reduced-motion version. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi05\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Sage Botanical Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Sage",
                  "role": "Sustainability-minded full-stack developer",
                  "bio": "a botanical line-art branch growing into a circuit trace with tiny leaf nodes",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real annual contribution heatmap using sage intens"
            },
            "theme": "auto",
            "accentColor": "#8DAA91",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi05-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sage Botanical Engineer",
                              "color": "8DAA91",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi05-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sage Botanical Engineer",
                              "color": "8DAA91",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi05-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sage Botanical Engineer",
                              "color": "8DAA91",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi05-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sage Botanical Engineer",
                              "color": "8DAA91",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi05-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sage Botanical Engineer",
                              "color": "8DAA91",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi05-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sage Botanical Engineer",
                              "color": "8DAA91",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi06",
    name: "Coastal Blue Minimal",
    description: "Designed for API and web platform engineer. Featuring a fine-line coastal horizon with a single lighthouse-shaped developer mark.",
    category: "minimalist",
    accent: "#17324D",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Coastal Blue Minimal\" for a API and web platform engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: mist white #F7FAFC, ocean navy #17324D, seafoam #8CCFC1, and sky #79AEE8. Hero illustration: a fine-line coastal horizon with a single lighthouse-shaped developer mark. Layout: wide calm hero, short bio, a two-column stack and project section, and a tiny footer. Browser and web presentation: browser tabs use clean ocean-blue chrome for verified documentation and deployed project pages.\n\nDATA & MODULES: real contribution heatmap paired with a narrow language donut. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow lighthouse beam sweep and small wave motion only in the header. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi06\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Coastal Blue Minimal Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Coastal",
                  "role": "API and web platform engineer",
                  "bio": "a fine-line coastal horizon with a single lighthouse-shaped developer mark",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap paired with a narrow lan"
            },
            "theme": "auto",
            "accentColor": "#17324D",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi06-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Coastal Blue Minimal",
                              "color": "17324D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi06-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Coastal Blue Minimal",
                              "color": "17324D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi06-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Coastal Blue Minimal",
                              "color": "17324D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi06-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Coastal Blue Minimal",
                              "color": "17324D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi06-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Coastal Blue Minimal",
                              "color": "17324D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi07",
    name: "Editorial Serif Engineer",
    description: "Designed for technical lead and engineering writer. Featuring a refined serif wordmark with a thin botanical divider and editorial subtitle.",
    category: "minimalist",
    accent: "#8E3B4A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Editorial Serif Engineer\" for a technical lead and engineering writer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: warm white #FBF8F4, ink #28242A, burgundy #8E3B4A, and muted blush #D9B5B8. Hero illustration: a refined serif wordmark with a thin botanical divider and editorial subtitle. Layout: publication-style layout with a lead essay, selected work, writing links, and a compact skills index. Browser and web presentation: show articles and product demos as magazine browser tabs with real titles and canonical URLs.\n\nDATA & MODULES: one real contribution calendar or small WakaTime card only when connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, waka-readme-stats, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: one animated rule draw and restrained fade-in SVG; typography remains static. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi07\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Editorial Serif Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Editorial",
                  "role": "Technical lead and engineering writer",
                  "bio": "a refined serif wordmark with a thin botanical divider and editorial subtitle",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "one real contribution calendar or small WakaTime c"
            },
            "theme": "auto",
            "accentColor": "#8E3B4A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi07-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Editorial Serif Engineer",
                              "color": "8E3B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi07-waka-readme-stats-2",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Editorial Serif Engineer",
                              "color": "8E3B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi07-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Editorial Serif Engineer",
                              "color": "8E3B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi07-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Editorial Serif Engineer",
                              "color": "8E3B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi07-footer-5",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Editorial Serif Engineer",
                              "color": "8E3B4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi08",
    name: "Blueprint Quiet Engineer",
    description: "Designed for software architect and technical documentation author. Featuring a clean isometric blueprint of a modular system drawn with thin technical lines.",
    category: "minimalist",
    accent: "#7FB2D9",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Blueprint Quiet Engineer\" for a software architect and technical documentation author. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: blueprint navy #12243A, drafting white #F3F7FB, line blue #7FB2D9, and slate #51657A. Hero illustration: a clean isometric blueprint of a modular system drawn with thin technical lines. Layout: two-column blueprint grid, labeled architecture callouts, skills legend, and concise project specs. Browser and web presentation: browser-style project sheets link to verified architecture documents and live demos.\n\nDATA & MODULES: real contribution heatmap plus a language donut. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: drafting-line reveal, small rotating compass tick, and no constant glow. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi08\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Blueprint Quiet Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Blueprint",
                  "role": "Software architect and technical documentation author",
                  "bio": "a clean isometric blueprint of a modular system drawn with thin technical lines",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap plus a language donut"
            },
            "theme": "auto",
            "accentColor": "#7FB2D9",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi08-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Blueprint Quiet Engineer",
                              "color": "7FB2D9",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi08-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Blueprint Quiet Engineer",
                              "color": "7FB2D9",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi08-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Blueprint Quiet Engineer",
                              "color": "7FB2D9",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi08-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Blueprint Quiet Engineer",
                              "color": "7FB2D9",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi08-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Blueprint Quiet Engineer",
                              "color": "7FB2D9",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi09",
    name: "One-Line Craftsman",
    description: "Designed for individual contributor who prefers a concise profile. Featuring a single typographic line with a small abstract bracket mark.",
    category: "minimalist",
    accent: "#E07A45",
    prompt: "Create a production-grade GitHub Profile README archetype named \"One-Line Craftsman\" for a individual contributor who prefers a concise profile. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: pure white #FFFFFF, near charcoal #24292F, signal orange #E07A45, and cool gray #9AA4AE. Hero illustration: a single typographic line with a small abstract bracket mark. Layout: one-sentence introduction, one row of skills, three selected repositories, and a compact social line. Browser and web presentation: keep browser references to three verified project links maximum; no fake cards or invented metrics.\n\nDATA & MODULES: no large charts; optionally one actual contribution heatmap at the bottom. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: static identity mark with a single short SVG stroke reveal. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi09\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "One-Line Craftsman Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "One-Line",
                  "role": "Individual contributor who prefers a concise profile",
                  "bio": "a single typographic line with a small abstract bracket mark",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "no large charts; optionally one actual contributio"
            },
            "theme": "auto",
            "accentColor": "#E07A45",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi09-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "One-Line Craftsman",
                              "color": "E07A45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi09-skill-icons-2",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "One-Line Craftsman",
                              "color": "E07A45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi09-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "One-Line Craftsman",
                              "color": "E07A45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi09-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "One-Line Craftsman",
                              "color": "E07A45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi10",
    name: "Bento Essentials",
    description: "Designed for product-minded full-stack developer. Featuring a clean modular bento composition with one prominent monogram tile.",
    category: "minimalist",
    accent: "#334155",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Bento Essentials\" for a product-minded full-stack developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cloud #F8FAFC, slate #334155, cyan #0891B2, and lime #84CC16. Hero illustration: a clean modular bento composition with one prominent monogram tile. Layout: asymmetric bento grid of about, skills, selected work, and one telemetry tile with clear hierarchy. Browser and web presentation: browser preview windows appear as two bento tiles with supplied verified demo URLs.\n\nDATA & MODULES: real contribution heatmap, language donut, and compact GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: small hover-like SVG highlights only in the hero; no faux interaction in static Markdown. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi10\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Bento Essentials Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Bento",
                  "role": "Product-minded full-stack developer",
                  "bio": "a clean modular bento composition with one prominent monogram tile",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and com"
            },
            "theme": "auto",
            "accentColor": "#334155",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi10-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bento Essentials",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi10-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bento Essentials",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi10-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bento Essentials",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi10-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bento Essentials",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi10-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bento Essentials",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi11",
    name: "Soft Lavender Minimal",
    description: "Designed for UX engineer and accessibility-minded frontend developer. Featuring a rounded abstract cursor-and-orbit monogram in soft lavender.",
    category: "minimalist",
    accent: "#C4B5FD",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Soft Lavender Minimal\" for a UX engineer and accessibility-minded frontend developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: soft white #FBFAFF, lavender #C4B5FD, ink #34304A, and lilac gray #8B85A3. Hero illustration: a rounded abstract cursor-and-orbit monogram in soft lavender. Layout: centered intro, accessible skill groups, Figma project links, and a quiet social footer. Browser and web presentation: browser frames resemble minimal portfolio tabs with verified Figma or live demo links.\n\nDATA & MODULES: real activity graph and language donut in muted lavender/gray. Build the section sequence from these registered MonoForge plugin IDs where relevant: figma-design, telemetry-isocalendar, pie-chart, skill-icons, socials, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: cursor orbit rotates once slowly; reduced-motion fallback is fully static. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi11\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Soft Lavender Minimal Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Soft",
                  "role": "UX engineer and accessibility-minded frontend developer",
                  "bio": "a rounded abstract cursor-and-orbit monogram in soft lavender",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real activity graph and language donut in muted la"
            },
            "theme": "auto",
            "accentColor": "#C4B5FD",
            "badgeStyle": "flat",
            "align": "center"
      },
      "sections": [
            {
                  "id": "mi11-figma-design-1",
                  "type": "figma-design",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Soft Lavender Minimal",
                              "color": "C4B5FD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi11-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Soft Lavender Minimal",
                              "color": "C4B5FD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi11-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Soft Lavender Minimal",
                              "color": "C4B5FD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi11-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Soft Lavender Minimal",
                              "color": "C4B5FD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi11-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Soft Lavender Minimal",
                              "color": "C4B5FD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi11-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Soft Lavender Minimal",
                              "color": "C4B5FD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi12",
    name: "Sandstone Architect",
    description: "Designed for developer focused on reliable architecture and backend systems. Featuring a sandstone arch with a geometric code-bracket shadow.",
    category: "minimalist",
    accent: "#7C8062",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Sandstone Architect\" for a developer focused on reliable architecture and backend systems. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: sand #EEE7DA, limestone #FAF8F3, olive #7C8062, and dark brown #39352D. Hero illustration: a sandstone arch with a geometric code-bracket shadow. Layout: structured editorial sections with architecture principles, project summaries, and a small skills matrix. Browser and web presentation: show architecture case studies in understated browser-window cards linking to public documents.\n\nDATA & MODULES: real 3D isometric contribution calendar as a muted stone relief. Build the section sequence from these registered MonoForge plugin IDs where relevant: portfolio-contributions, telemetry-isocalendar, skill-icons, github-readme-stats, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow shadow shift and geometric line reveal; no particle clutter. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi12\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Sandstone Architect Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Sandstone",
                  "role": "Developer focused on reliable architecture and backend systems",
                  "bio": "a sandstone arch with a geometric code-bracket shadow",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 3D isometric contribution calendar as a muted"
            },
            "theme": "auto",
            "accentColor": "#7C8062",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi12-portfolio-contributions-1",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sandstone Architect",
                              "color": "7C8062",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi12-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sandstone Architect",
                              "color": "7C8062",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi12-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sandstone Architect",
                              "color": "7C8062",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi12-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sandstone Architect",
                              "color": "7C8062",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi12-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sandstone Architect",
                              "color": "7C8062",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi13",
    name: "Solar Clean-Tech Minimal",
    description: "Designed for clean-energy and IoT software engineer. Featuring a minimal sun-and-circuit line drawing with an elegant half-ring horizon.",
    category: "minimalist",
    accent: "#2F855A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Solar Clean-Tech Minimal\" for a clean-energy and IoT software engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: warm white #FAFCF7, jade #2F855A, solar yellow #E6B94A, and dark green #244536. Hero illustration: a minimal sun-and-circuit line drawing with an elegant half-ring horizon. Layout: light-mode profile, compact mission statement, sustainability project list, and slim skills line. Browser and web presentation: browser links open verified dashboards, public datasets, and live product pages.\n\nDATA & MODULES: real contribution heatmap and language donut; use only real environmental datasets in project links. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow sunrise gradient and a tiny solar orbit, with no motion in data charts. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi13\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Solar Clean-Tech Minimal Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Solar",
                  "role": "Clean-energy and IoT software engineer",
                  "bio": "a minimal sun-and-circuit line drawing with an elegant half-ring horizon",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language donut; use "
            },
            "theme": "auto",
            "accentColor": "#2F855A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi13-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Solar Clean-Tech Minimal",
                              "color": "2F855A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi13-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Solar Clean-Tech Minimal",
                              "color": "2F855A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi13-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Solar Clean-Tech Minimal",
                              "color": "2F855A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi13-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Solar Clean-Tech Minimal",
                              "color": "2F855A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi13-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Solar Clean-Tech Minimal",
                              "color": "2F855A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi13-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Solar Clean-Tech Minimal",
                              "color": "2F855A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "mi14",
    name: "Dark Quiet Minimal",
    description: "Designed for staff engineer and technical mentor. Featuring a single gold-line monogram floating in a quiet slate field.",
    category: "minimalist",
    accent: "#C7A76C",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Dark Quiet Minimal\" for a staff engineer and technical mentor. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep slate #202A35, soft white #E8EDF2, muted gold #C7A76C, and steel #8291A3. Hero illustration: a single gold-line monogram floating in a quiet slate field. Layout: dark editorial layout, compact bio, three project columns, and a discreet data footer. Browser and web presentation: use a single compact browser bar for selected, verified case studies and portfolio domain.\n\nDATA & MODULES: real velocity radar with low-contrast styling and GitHub stats only if useful. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: one gold accent line animates across the banner; body remains motionless. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"mi14\", name, category \"minimalist\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Dark Quiet Minimal Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Dark",
                  "role": "Staff engineer and technical mentor",
                  "bio": "a single gold-line monogram floating in a quiet slate field",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real velocity radar with low-contrast styling and "
            },
            "theme": "auto",
            "accentColor": "#C7A76C",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "mi14-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Dark Quiet Minimal",
                              "color": "C7A76C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi14-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Dark Quiet Minimal",
                              "color": "C7A76C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi14-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Dark Quiet Minimal",
                              "color": "C7A76C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi14-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Dark Quiet Minimal",
                              "color": "C7A76C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "mi14-footer-5",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Dark Quiet Minimal",
                              "color": "C7A76C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex01",
    name: "Principal Architect Blueprint",
    description: "Designed for principal engineer and distributed-systems architect. Featuring a layered system architecture blueprint with service nodes, queues, and a central compass mark.",
    category: "executive",
    accent: "#4B88C7",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Principal Architect Blueprint\" for a principal engineer and distributed-systems architect. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: architect navy #14263D, blueprint blue #4B88C7, frost #EFF5FA, and amber #E0A84B. Hero illustration: a layered system architecture blueprint with service nodes, queues, and a central compass mark. Layout: executive summary hero, architecture principles, verified impact metrics, and selected systems projects. Browser and web presentation: browser research can verify public architecture writeups and system demos; include source links beside every claim.\n\nDATA & MODULES: real contribution velocity radar, language distribution, and GitHub statistics; performance metrics must come from supplied sources. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: animated data-flow paths and a single laser-blue edge sweep. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex01\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Principal Architect Blueprint Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Principal",
                  "role": "Principal engineer and distributed-systems architect",
                  "bio": "a layered system architecture blueprint with service nodes, queues, and a central compass mark",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar, language distrib"
            },
            "theme": "auto",
            "accentColor": "#4B88C7",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex01-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Principal Architect Blueprint",
                              "color": "4B88C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex01-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Principal Architect Blueprint",
                              "color": "4B88C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex01-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Principal Architect Blueprint",
                              "color": "4B88C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex01-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Principal Architect Blueprint",
                              "color": "4B88C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex01-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Principal Architect Blueprint",
                              "color": "4B88C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex01-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Principal Architect Blueprint",
                              "color": "4B88C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex01-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Principal Architect Blueprint",
                              "color": "4B88C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex02",
    name: "Engineering Leader Scorecard",
    description: "Designed for engineering director or senior technical leader. Featuring a refined scorecard shield with a small leadership monogram.",
    category: "executive",
    accent: "#D6B77A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Engineering Leader Scorecard\" for a engineering director or senior technical leader. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: midnight navy #17243A, champagne #D6B77A, teal #4CA6A8, and warm white #F4F4F0. Hero illustration: a refined scorecard shield with a small leadership monogram. Layout: top-level executive summary, three evidence-backed impact tiles, leadership principles, and selected initiatives. Browser and web presentation: browser-verify published talks, case studies, and official company pages before adding them.\n\nDATA & MODULES: real GitHub stats and contribution heatmap; impact metrics must be user-provided or sourced, never fabricated. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, github-profile-trophy, socials, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: subtle number-tile reveal without fake count-up values, thin gold separators. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex02\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Engineering Leader Scorecard Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Engineering",
                  "role": "Engineering director or senior technical leader",
                  "bio": "a refined scorecard shield with a small leadership monogram",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real GitHub stats and contribution heatmap; impact"
            },
            "theme": "auto",
            "accentColor": "#D6B77A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex02-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Leader Scorecard",
                              "color": "D6B77A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex02-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Leader Scorecard",
                              "color": "D6B77A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex02-github-profile-trophy-3",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Leader Scorecard",
                              "color": "D6B77A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex02-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Leader Scorecard",
                              "color": "D6B77A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex02-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Leader Scorecard",
                              "color": "D6B77A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex03",
    name: "Product Engineering Leader",
    description: "Designed for product-minded engineering manager or tech lead. Featuring a roadmap ribbon connecting user problems to shipped product milestones.",
    category: "executive",
    accent: "#1F3654",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Product Engineering Leader\" for a product-minded engineering manager or tech lead. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cream #F6F4EE, deep navy #1F3654, citrus #C6D94E, and graphite #4B5563. Hero illustration: a roadmap ribbon connecting user problems to shipped product milestones. Layout: editorial roadmap hero, product outcomes, engineering principles, team practices, and a selected-work grid. Browser and web presentation: present verified shipped products in browser cards showing live demo, docs, and case-study links.\n\nDATA & MODULES: real contributor activity and language donut; product KPIs only from verified public case studies. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: roadmap progress-line animation and gentle milestone pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex03\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Product Engineering Leader Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Product",
                  "role": "Product-minded engineering manager or tech lead",
                  "bio": "a roadmap ribbon connecting user problems to shipped product milestones",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contributor activity and language donut; prod"
            },
            "theme": "auto",
            "accentColor": "#1F3654",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex03-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Product Engineering Leader",
                              "color": "1F3654",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex03-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Product Engineering Leader",
                              "color": "1F3654",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex03-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Product Engineering Leader",
                              "color": "1F3654",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex03-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Product Engineering Leader",
                              "color": "1F3654",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex03-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Product Engineering Leader",
                              "color": "1F3654",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex03-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Product Engineering Leader",
                              "color": "1F3654",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex04",
    name: "SRE Reliability Command",
    description: "Designed for site reliability engineer and platform operations leader. Featuring an observability command center with a clean service topology and status beacon.",
    category: "executive",
    accent: "#10B981",
    prompt: "Create a production-grade GitHub Profile README archetype named \"SRE Reliability Command\" for a site reliability engineer and platform operations leader. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep slate #1F2937, reliability emerald #10B981, alert amber #F59E0B, and ice #E5EEF5. Hero illustration: an observability command center with a clean service topology and status beacon. Layout: reliability mission statement, platform capabilities, incident-learning principles, and project evidence cards. Browser and web presentation: browser research may inspect public status pages and runbooks; cite the exact source and date.\n\nDATA & MODULES: real contribution heatmap and velocity radar; SLO, uptime, and incident numbers only when the user supplies verifiable values. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, skill-icons, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: heartbeat pulse, signal sweep, and quiet status LED. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex04\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "SRE Reliability Command Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "SRE",
                  "role": "Site reliability engineer and platform operations leader",
                  "bio": "an observability command center with a clean service topology and status beacon",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and velocity radar; SLO,"
            },
            "theme": "auto",
            "accentColor": "#10B981",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex04-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "SRE Reliability Command",
                              "color": "10B981",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex04-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "SRE Reliability Command",
                              "color": "10B981",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex04-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "SRE Reliability Command",
                              "color": "10B981",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex04-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "SRE Reliability Command",
                              "color": "10B981",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex04-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "SRE Reliability Command",
                              "color": "10B981",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex04-footer-6",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "SRE Reliability Command",
                              "color": "10B981",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex05",
    name: "Cloud FinOps Strategist",
    description: "Designed for cloud platform architect and cost-optimization engineer. Featuring a cloud made of modular service blocks with a balanced resource gauge.",
    category: "executive",
    accent: "#78D6B0",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Cloud FinOps Strategist\" for a cloud platform architect and cost-optimization engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cloud navy #13243A, mint #78D6B0, gold #D6AA52, and cool gray #AAB6C4. Hero illustration: a cloud made of modular service blocks with a balanced resource gauge. Layout: executive overview, cloud skill matrix, architecture case studies, and cost-governance principles. Browser and web presentation: browser-verify linked case studies, cloud architecture diagrams, and public project cost reports.\n\nDATA & MODULES: real GitHub activity and language stats; cloud savings/usage numbers only from documented case studies. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: floating cloud nodes, a slow resource-bar shimmer, and restrained amber highlights. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex05\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Cloud FinOps Strategist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Cloud",
                  "role": "Cloud platform architect and cost-optimization engineer",
                  "bio": "a cloud made of modular service blocks with a balanced resource gauge",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real GitHub activity and language stats; cloud sav"
            },
            "theme": "auto",
            "accentColor": "#78D6B0",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex05-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cloud FinOps Strategist",
                              "color": "78D6B0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex05-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cloud FinOps Strategist",
                              "color": "78D6B0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex05-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cloud FinOps Strategist",
                              "color": "78D6B0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex05-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cloud FinOps Strategist",
                              "color": "78D6B0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex05-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cloud FinOps Strategist",
                              "color": "78D6B0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex05-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Cloud FinOps Strategist",
                              "color": "78D6B0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex06",
    name: "Security & Trust Executive",
    description: "Designed for security engineering leader and privacy advocate. Featuring a geometric trust seal surrounded by concentric verification rings.",
    category: "executive",
    accent: "#253447",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Security & Trust Executive\" for a security engineering leader and privacy advocate. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: steel slate #253447, trusted emerald #21A179, indigo #6677CC, and white #F4F7FA. Hero illustration: a geometric trust seal surrounded by concentric verification rings. Layout: trust principles, secure engineering capabilities, verified certifications, projects, and public writing. Browser and web presentation: browser research only public advisories, certifications, talks, and policies; attach source links.\n\nDATA & MODULES: real contribution calendar and verified repository statistics; do not invent audit scores or certifications. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, skill-icons, markdown-badges, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: slow rotating seal ring and a single green signal pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex06\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Security & Trust Executive Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Security",
                  "role": "Security engineering leader and privacy advocate",
                  "bio": "a geometric trust seal surrounded by concentric verification rings",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar and verified repository"
            },
            "theme": "auto",
            "accentColor": "#253447",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex06-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security & Trust Executive",
                              "color": "253447",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex06-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security & Trust Executive",
                              "color": "253447",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex06-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security & Trust Executive",
                              "color": "253447",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex06-markdown-badges-4",
                  "type": "markdown-badges",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security & Trust Executive",
                              "color": "253447",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex06-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security & Trust Executive",
                              "color": "253447",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex06-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security & Trust Executive",
                              "color": "253447",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex07",
    name: "Data Platform Strategist",
    description: "Designed for data platform lead and analytics architect. Featuring a layered data lake and pipeline diagram rendered as an elegant SVG isometric scene.",
    category: "executive",
    accent: "#39BFE0",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Data Platform Strategist\" for a data platform lead and analytics architect. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep ocean #16324A, signal cyan #39BFE0, plum #7C6CA8, and mist #EAF1F5. Hero illustration: a layered data lake and pipeline diagram rendered as an elegant SVG isometric scene. Layout: data strategy overview, platform principles, architecture projects, and an orderly metric rail. Browser and web presentation: browser-frame public dashboards, notebooks, and architecture papers using their real destinations.\n\nDATA & MODULES: real language donut, contribution heatmap, and verified Kaggle or WakaTime widgets when connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: pipeline packets flow between nodes and graph edges illuminate sequentially. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex07\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Data Platform Strategist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Data",
                  "role": "Data platform lead and analytics architect",
                  "bio": "a layered data lake and pipeline diagram rendered as an elegant SVG isometric scene",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut, contribution heatmap, and ver"
            },
            "theme": "auto",
            "accentColor": "#39BFE0",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex07-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Platform Strategist",
                              "color": "39BFE0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex07-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Platform Strategist",
                              "color": "39BFE0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex07-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Platform Strategist",
                              "color": "39BFE0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex07-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Platform Strategist",
                              "color": "39BFE0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex07-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Platform Strategist",
                              "color": "39BFE0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex07-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Platform Strategist",
                              "color": "39BFE0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex08",
    name: "AI Systems Executive",
    description: "Designed for AI infrastructure lead and applied AI architect. Featuring a layered neural-system diagram with model, data, and serving planes.",
    category: "executive",
    accent: "#8172D8",
    prompt: "Create a production-grade GitHub Profile README archetype named \"AI Systems Executive\" for a AI infrastructure lead and applied AI architect. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: pearl #F4F1FF, midnight #161A35, violet #8172D8, and aqua #63C9C2. Hero illustration: a layered neural-system diagram with model, data, and serving planes. Layout: executive intro, AI systems map, model deployment projects, engineering principles, and publications. Browser and web presentation: browser-research model cards and public benchmark papers; record model version and source date.\n\nDATA & MODULES: real contribution heatmap and language distribution; model benchmarks only from reproducible linked reports. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: neural node pulses, inference-path sweep, and controlled violet glow. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex08\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "AI Systems Executive Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "AI",
                  "role": "AI infrastructure lead and applied AI architect",
                  "bio": "a layered neural-system diagram with model, data, and serving planes",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language distributio"
            },
            "theme": "auto",
            "accentColor": "#8172D8",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex08-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI Systems Executive",
                              "color": "8172D8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex08-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI Systems Executive",
                              "color": "8172D8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex08-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI Systems Executive",
                              "color": "8172D8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex08-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI Systems Executive",
                              "color": "8172D8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex08-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI Systems Executive",
                              "color": "8172D8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex08-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI Systems Executive",
                              "color": "8172D8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex09",
    name: "Engineering Manager People Systems",
    description: "Designed for engineering manager and developer-experience leader. Featuring a collaborative network of small human-centered nodes around a team compass.",
    category: "executive",
    accent: "#245B5B",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Engineering Manager People Systems\" for a engineering manager and developer-experience leader. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: warm gray #F2F0EC, deep teal #245B5B, coral #E58C75, and ink #29323A. Hero illustration: a collaborative network of small human-centered nodes around a team compass. Layout: warm leadership statement, team operating principles, mentoring topics, selected tools, and concise project cards. Browser and web presentation: browser-link public talks, mentoring resources, engineering blogs, and verified open-source contributions.\n\nDATA & MODULES: real GitHub contribution activity; team performance numbers only if explicitly supplied and approved. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: soft connecting paths, small node glow, and a welcoming but restrained hero transition. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex09\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Engineering Manager People Systems Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Engineering",
                  "role": "Engineering manager and developer-experience leader",
                  "bio": "a collaborative network of small human-centered nodes around a team compass",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real GitHub contribution activity; team performanc"
            },
            "theme": "auto",
            "accentColor": "#245B5B",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex09-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Manager People Systems",
                              "color": "245B5B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex09-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Manager People Systems",
                              "color": "245B5B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex09-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Manager People Systems",
                              "color": "245B5B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex09-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Manager People Systems",
                              "color": "245B5B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex09-footer-5",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Engineering Manager People Systems",
                              "color": "245B5B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex10",
    name: "API Ecosystem Architect",
    description: "Designed for API platform architect and developer-experience specialist. Featuring a clean API endpoint map with connected request and response nodes.",
    category: "executive",
    accent: "#3178C6",
    prompt: "Create a production-grade GitHub Profile README archetype named \"API Ecosystem Architect\" for a API platform architect and developer-experience specialist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cool white #F5F8FC, API blue #3178C6, orange #F29D49, and charcoal #2B3442. Hero illustration: a clean API endpoint map with connected request and response nodes. Layout: API portfolio hero, interface principles, SDK/project showcase, standards, and integration badge row. Browser and web presentation: render verified API docs and Swagger/OpenAPI pages in browser-tab cards; never fabricate endpoint status.\n\nDATA & MODULES: real contribution heatmap, language donut, and repository stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: request packets travel along SVG paths and endpoint nodes blink softly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex10\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "API Ecosystem Architect Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "API",
                  "role": "API platform architect and developer-experience specialist",
                  "bio": "a clean API endpoint map with connected request and response nodes",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and rep"
            },
            "theme": "auto",
            "accentColor": "#3178C6",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex10-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Ecosystem Architect",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex10-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Ecosystem Architect",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex10-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Ecosystem Architect",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex10-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Ecosystem Architect",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex10-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Ecosystem Architect",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex10-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Ecosystem Architect",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex11",
    name: "Enterprise Modernization Leader",
    description: "Designed for enterprise architect and modernization consultant. Featuring a split architecture visual transitioning from legacy monolith blocks to modular services.",
    category: "executive",
    accent: "#29323C",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Enterprise Modernization Leader\" for a enterprise architect and modernization consultant. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: charcoal #29323C, steel blue #5C85A4, amber #D7A44A, and cream #F2EFE7. Hero illustration: a split architecture visual transitioning from legacy monolith blocks to modular services. Layout: before/after transformation narrative, architecture principles, project case studies, and technology matrix. Browser and web presentation: browser-verify public migration case studies, demos, and documentation before linking.\n\nDATA & MODULES: real GitHub metrics and contribution heatmap; transformation results need cited case studies. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, pie-chart, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: old blocks dissolve into modular nodes using opacity and transform only. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex11\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Enterprise Modernization Leader Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Enterprise",
                  "role": "Enterprise architect and modernization consultant",
                  "bio": "a split architecture visual transitioning from legacy monolith blocks to modular services",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real GitHub metrics and contribution heatmap; tran"
            },
            "theme": "auto",
            "accentColor": "#29323C",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex11-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Enterprise Modernization Leader",
                              "color": "29323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex11-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Enterprise Modernization Leader",
                              "color": "29323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex11-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Enterprise Modernization Leader",
                              "color": "29323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex11-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Enterprise Modernization Leader",
                              "color": "29323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex11-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Enterprise Modernization Leader",
                              "color": "29323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex11-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Enterprise Modernization Leader",
                              "color": "29323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ex12",
    name: "Technical Founder Launchboard",
    description: "Designed for technical founder and startup builder. Featuring a launch dashboard with a rocket-shaped monogram and modular product tiles.",
    category: "executive",
    accent: "#246BFD",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Technical Founder Launchboard\" for a technical founder and startup builder. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: warm ivory #F7F4ED, ink #20252E, electric blue #246BFD, and punchy lime #B8D64B. Hero illustration: a launch dashboard with a rocket-shaped monogram and modular product tiles. Layout: founder story, product portfolio, current focus, technology stack, open-source work, and contact links. Browser and web presentation: browser cards must link to real products, waitlists, docs, and case studies supplied or verified by the user.\n\nDATA & MODULES: real contribution calendar, GitHub stats, and WakaTime only when configured. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, github-readme-stats, waka-readme-stats, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: small launch trajectory animation and a steady status beacon. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ex12\", name, category \"executive\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Technical Founder Launchboard Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Technical",
                  "role": "Technical founder and startup builder",
                  "bio": "a launch dashboard with a rocket-shaped monogram and modular product tiles",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar, GitHub stats, and Waka"
            },
            "theme": "auto",
            "accentColor": "#246BFD",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ex12-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Technical Founder Launchboard",
                              "color": "246BFD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex12-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Technical Founder Launchboard",
                              "color": "246BFD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex12-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Technical Founder Launchboard",
                              "color": "246BFD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex12-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Technical Founder Launchboard",
                              "color": "246BFD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex12-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Technical Founder Launchboard",
                              "color": "246BFD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ex12-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Technical Founder Launchboard",
                              "color": "246BFD",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma01",
    name: "Open-Source Garden Gardener",
    description: "Designed for open-source maintainer and community builder. Featuring a flourishing code garden where repository nodes grow as trees and issue leaves.",
    category: "maintainer",
    accent: "#174B3A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Open-Source Garden Gardener\" for a open-source maintainer and community builder. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: forest #174B3A, leaf #71B77B, cream #F6F3E8, and marigold #E9B44C. Hero illustration: a flourishing code garden where repository nodes grow as trees and issue leaves. Layout: friendly introduction, flagship repositories, contributor guide, community links, and release notes. Browser and web presentation: browser tabs link to real contribution guides, docs, issue trackers, and package pages.\n\nDATA & MODULES: real contribution heatmap, 3D isometric calendar, and verified project stars/forks. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, portfolio-contributions, github-readme-stats, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: leaves sway, small growth-line reveal, and contributor nodes gently illuminate. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma01\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Open-Source Garden Gardener Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Open-Source",
                  "role": "Open-source maintainer and community builder",
                  "bio": "a flourishing code garden where repository nodes grow as trees and issue leaves",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, 3D isometric calendar, "
            },
            "theme": "dark",
            "accentColor": "#174B3A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma01-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Garden Gardener",
                              "color": "174B3A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma01-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Garden Gardener",
                              "color": "174B3A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma01-portfolio-contributions-3",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Garden Gardener",
                              "color": "174B3A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma01-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Garden Gardener",
                              "color": "174B3A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma01-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Garden Gardener",
                              "color": "174B3A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma01-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Garden Gardener",
                              "color": "174B3A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma01-footer-7",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Garden Gardener",
                              "color": "174B3A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma02",
    name: "Release Train Operator",
    description: "Designed for maintainer of developer tools and release automation. Featuring a vector train moving through release stations labeled plan, build, test, ship.",
    category: "maintainer",
    accent: "#F08C46",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Release Train Operator\" for a maintainer of developer tools and release automation. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: railway navy #172D46, signal orange #F08C46, mint #77C9A5, and cloud #F4F7FA. Hero illustration: a vector train moving through release stations labeled plan, build, test, ship. Layout: release timeline hero, packages, changelog links, contribution guidelines, and maintainer notes. Browser and web presentation: browser-style station cards link to actual releases, changelogs, CI workflows, and docs.\n\nDATA & MODULES: real contribution velocity radar and activity heatmap; release cadence must be derived from actual tags. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, readme-typing-svg, telemetry-isocalendar, github-readme-stats, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: train glides along a track, station lights sequence, and a small status ticker blinks. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma02\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Release Train Operator Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Release",
                  "role": "Maintainer of developer tools and release automation",
                  "bio": "a vector train moving through release stations labeled plan, build, test, ship",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar and activity heat"
            },
            "theme": "dark",
            "accentColor": "#F08C46",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma02-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Release Train Operator",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma02-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Release Train Operator",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma02-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Release Train Operator",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma02-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Release Train Operator",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma02-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Release Train Operator",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma02-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Release Train Operator",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma03",
    name: "Documentation Librarian",
    description: "Designed for docs maintainer and technical writer. Featuring an open book with SVG page tabs, index marks, and a tiny librarian mascot.",
    category: "maintainer",
    accent: "#2C7A7B",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Documentation Librarian\" for a docs maintainer and technical writer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: parchment #F6F0E4, teal #2C7A7B, ink #28343A, and plum #8B668B. Hero illustration: an open book with SVG page tabs, index marks, and a tiny librarian mascot. Layout: documentation-first layout with a welcome index, guides, writing, repositories, and community entry points. Browser and web presentation: browser-research canonical docs, tutorials, and changelogs; show verified page titles and links.\n\nDATA & MODULES: real contribution heatmap and WakaTime only if connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, waka-readme-stats, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: page-turn loop, bookmark slide, and subtle text cursor. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma03\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Documentation Librarian Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Documentation",
                  "role": "Docs maintainer and technical writer",
                  "bio": "an open book with SVG page tabs, index marks, and a tiny librarian mascot",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and WakaTime only if con"
            },
            "theme": "dark",
            "accentColor": "#2C7A7B",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma03-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Documentation Librarian",
                              "color": "2C7A7B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma03-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Documentation Librarian",
                              "color": "2C7A7B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma03-waka-readme-stats-3",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Documentation Librarian",
                              "color": "2C7A7B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma03-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Documentation Librarian",
                              "color": "2C7A7B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma03-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Documentation Librarian",
                              "color": "2C7A7B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma03-footer-6",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Documentation Librarian",
                              "color": "2C7A7B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma04",
    name: "Community Orbit Network",
    description: "Designed for community maintainer and ecosystem coordinator. Featuring a constellation of contributor avatars represented by abstract circles orbiting a project hub.",
    category: "maintainer",
    accent: "#302B63",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Community Orbit Network\" for a community maintainer and ecosystem coordinator. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cosmic indigo #302B63, orbit cyan #4CC9F0, coral #F08A8A, and white. Hero illustration: a constellation of contributor avatars represented by abstract circles orbiting a project hub. Layout: central community hub, contribution pathways, project cards, sponsors, and social links. Browser and web presentation: browser-card links point to the real community forum, discussions, docs, and contribution guide.\n\nDATA & MODULES: real activity heatmap and verified repository contribution graphs; never fabricate community counts. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, github-profile-trophy, github-achievements, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: orbits rotate slowly, stars twinkle lightly, and connected nodes pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma04\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Community Orbit Network Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Community",
                  "role": "Community maintainer and ecosystem coordinator",
                  "bio": "a constellation of contributor avatars represented by abstract circles orbiting a project hub",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real activity heatmap and verified repository cont"
            },
            "theme": "dark",
            "accentColor": "#302B63",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma04-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Community Orbit Network",
                              "color": "302B63",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma04-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Community Orbit Network",
                              "color": "302B63",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma04-github-profile-trophy-3",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Community Orbit Network",
                              "color": "302B63",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma04-github-achievements-4",
                  "type": "github-achievements",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Community Orbit Network",
                              "color": "302B63",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma04-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Community Orbit Network",
                              "color": "302B63",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma04-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Community Orbit Network",
                              "color": "302B63",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma05",
    name: "Package Maintainer Foundry",
    description: "Designed for package author and library maintainer. Featuring a modular package box unfolding into code modules and version labels.",
    category: "maintainer",
    accent: "#68C9A1",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Package Maintainer Foundry\" for a package author and library maintainer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: package mint #68C9A1, deep navy #1F3349, lime #C4D96C, and white. Hero illustration: a modular package box unfolding into code modules and version labels. Layout: package registry hero, package grid, installation snippets, API docs, and support section. Browser and web presentation: browser windows show real npm, PyPI, crates.io, or documentation pages for packages the user owns.\n\nDATA & MODULES: real contribution calendar, GitHub stats, and verified package download metrics only if available. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, github-readme-stats, projects-showcase, skill-icons, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: package blocks snap into place and version tag glows briefly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma05\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Package Maintainer Foundry Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Package",
                  "role": "Package author and library maintainer",
                  "bio": "a modular package box unfolding into code modules and version labels",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar, GitHub stats, and veri"
            },
            "theme": "dark",
            "accentColor": "#68C9A1",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma05-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Package Maintainer Foundry",
                              "color": "68C9A1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma05-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Package Maintainer Foundry",
                              "color": "68C9A1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma05-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Package Maintainer Foundry",
                              "color": "68C9A1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma05-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Package Maintainer Foundry",
                              "color": "68C9A1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma05-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Package Maintainer Foundry",
                              "color": "68C9A1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma05-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Package Maintainer Foundry",
                              "color": "68C9A1",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma06",
    name: "Bug Hunter Lab",
    description: "Designed for quality engineer and bug-fix open-source maintainer. Featuring a magnifying-glass mascot inspecting a bug-shaped code glyph.",
    category: "maintainer",
    accent: "#F2D15C",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Bug Hunter Lab\" for a quality engineer and bug-fix open-source maintainer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: lemon #F2D15C, charcoal #30333B, red #E35D5B, and pale gray #F2F4F7. Hero illustration: a magnifying-glass mascot inspecting a bug-shaped code glyph. Layout: lab notebook hero, quality principles, testing tools, selected fixes, and issue/PR links. Browser and web presentation: browser-verify public pull requests, issues, test reports, and release pages; never invent counts.\n\nDATA & MODULES: real contribution velocity radar, heatmap, and actual public PR/review history if provided. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, github-readme-stats, github-achievements, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: magnifier sweep, bug wings flutter, and small alert pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma06\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Bug Hunter Lab Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Bug",
                  "role": "Quality engineer and bug-fix open-source maintainer",
                  "bio": "a magnifying-glass mascot inspecting a bug-shaped code glyph",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar, heatmap, and act"
            },
            "theme": "dark",
            "accentColor": "#F2D15C",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma06-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bug Hunter Lab",
                              "color": "F2D15C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma06-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bug Hunter Lab",
                              "color": "F2D15C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma06-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bug Hunter Lab",
                              "color": "F2D15C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma06-github-achievements-4",
                  "type": "github-achievements",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bug Hunter Lab",
                              "color": "F2D15C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma06-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bug Hunter Lab",
                              "color": "F2D15C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma06-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bug Hunter Lab",
                              "color": "F2D15C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma07",
    name: "Sponsor Steward",
    description: "Designed for maintainer of widely used community software. Featuring a warm stewardship crest with a heart-shaped repository node and sponsor ribbon.",
    category: "maintainer",
    accent: "#174D3E",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Sponsor Steward\" for a maintainer of widely used community software. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: evergreen #174D3E, antique gold #C8A45D, charcoal #27323A, and ivory #F8F5ED. Hero illustration: a warm stewardship crest with a heart-shaped repository node and sponsor ribbon. Layout: project mission, sponsor tiers/links, transparent maintenance goals, releases, and contributor credits. Browser and web presentation: browser-links verified GitHub Sponsors, Open Collective, Patreon, project roadmap, and financial transparency pages.\n\nDATA & MODULES: real contribution heatmap and repository stats; funding totals only when the owner supplies them. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, github-profile-trophy, github-achievements, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: gold ribbon unfurls and small star halo pulses around the crest. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma07\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Sponsor Steward Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Sponsor",
                  "role": "Maintainer of widely used community software",
                  "bio": "a warm stewardship crest with a heart-shaped repository node and sponsor ribbon",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and repository stats; fu"
            },
            "theme": "dark",
            "accentColor": "#174D3E",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma07-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sponsor Steward",
                              "color": "174D3E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma07-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sponsor Steward",
                              "color": "174D3E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma07-github-profile-trophy-3",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sponsor Steward",
                              "color": "174D3E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma07-github-achievements-4",
                  "type": "github-achievements",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sponsor Steward",
                              "color": "174D3E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma07-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sponsor Steward",
                              "color": "174D3E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma07-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sponsor Steward",
                              "color": "174D3E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma07-footer-7",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Sponsor Steward",
                              "color": "174D3E",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma08",
    name: "CLI Toolsmith Workshop",
    description: "Designed for CLI developer and terminal tooling maintainer. Featuring a terminal window rendered like a precision workshop console with command tokens.",
    category: "maintainer",
    accent: "#F6B94A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"CLI Toolsmith Workshop\" for a CLI developer and terminal tooling maintainer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: graphite #202936, warm amber #F6B94A, mint #5FE0B2, and cool white. Hero illustration: a terminal window rendered like a precision workshop console with command tokens. Layout: command-first hero, install/use examples, CLI project cards, platform support, and docs links. Browser and web presentation: browser tabs show verified docs, package registry, and release downloads for each CLI tool.\n\nDATA & MODULES: real contribution heatmap and WakaTime only when configured. Build the section sequence from these registered MonoForge plugin IDs where relevant: readme-typing-svg, capsule-banner, telemetry-isocalendar, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: typewriter prompt, blinking cursor, command output scroll, and subtle terminal scanline. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma08\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "CLI Toolsmith Workshop Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "CLI",
                  "role": "CLI developer and terminal tooling maintainer",
                  "bio": "a terminal window rendered like a precision workshop console with command tokens",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and WakaTime only when c"
            },
            "theme": "dark",
            "accentColor": "#F6B94A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma08-readme-typing-svg-1",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CLI Toolsmith Workshop",
                              "color": "F6B94A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma08-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CLI Toolsmith Workshop",
                              "color": "F6B94A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma08-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CLI Toolsmith Workshop",
                              "color": "F6B94A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma08-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CLI Toolsmith Workshop",
                              "color": "F6B94A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma08-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CLI Toolsmith Workshop",
                              "color": "F6B94A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma08-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "CLI Toolsmith Workshop",
                              "color": "F6B94A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma09",
    name: "API Library Maintainer",
    description: "Designed for maintainer of SDKs and reusable API libraries. Featuring a library shelf of modular API blocks with small request/response glyphs.",
    category: "maintainer",
    accent: "#153E4A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"API Library Maintainer\" for a maintainer of SDKs and reusable API libraries. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep teal #153E4A, coral #FF8A75, cream #F7F5EF, and slate #536471. Hero illustration: a library shelf of modular API blocks with small request/response glyphs. Layout: SDK matrix, language bindings, API documentation, compatibility notes, and contributor guide. Browser and web presentation: browser cards open verified API reference, package documentation, and SDK quickstarts.\n\nDATA & MODULES: real language donut, contribution heatmap, and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: request nodes connect, shelf labels slide in, and small coral indicator pulses. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma09\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "API Library Maintainer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "API",
                  "role": "Maintainer of SDKs and reusable API libraries",
                  "bio": "a library shelf of modular API blocks with small request/response glyphs",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut, contribution heatmap, and Git"
            },
            "theme": "dark",
            "accentColor": "#153E4A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma09-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Library Maintainer",
                              "color": "153E4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma09-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Library Maintainer",
                              "color": "153E4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma09-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Library Maintainer",
                              "color": "153E4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma09-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Library Maintainer",
                              "color": "153E4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma09-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Library Maintainer",
                              "color": "153E4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma09-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "API Library Maintainer",
                              "color": "153E4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma10",
    name: "Localization Bridge Builder",
    description: "Designed for open-source localization maintainer. Featuring a bridge connecting language bubbles and locale tiles across a globe outline.",
    category: "maintainer",
    accent: "#245A9B",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Localization Bridge Builder\" for a open-source localization maintainer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: sapphire #245A9B, saffron #E3AD4A, jade #3E9D83, and white. Hero illustration: a bridge connecting language bubbles and locale tiles across a globe outline. Layout: language selector motif, supported locale list, translation contribution guide, and project directory. Browser and web presentation: browser-research translated docs and live locales; verify each locale URL before including it.\n\nDATA & MODULES: real contribution heatmap; locale coverage displayed only when derived from repository config. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: locale bubbles travel across a bridge, subtle globe rotation, and no flashing. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma10\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Localization Bridge Builder Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Localization",
                  "role": "Open-source localization maintainer",
                  "bio": "a bridge connecting language bubbles and locale tiles across a globe outline",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap; locale coverage display"
            },
            "theme": "dark",
            "accentColor": "#245A9B",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma10-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Localization Bridge Builder",
                              "color": "245A9B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma10-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Localization Bridge Builder",
                              "color": "245A9B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma10-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Localization Bridge Builder",
                              "color": "245A9B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma10-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Localization Bridge Builder",
                              "color": "245A9B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma10-footer-5",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Localization Bridge Builder",
                              "color": "245A9B",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma11",
    name: "Security Patch Guardian",
    description: "Designed for maintainer of security-sensitive open-source infrastructure. Featuring a shield-bearing builder mascot guarding a modular dependency graph.",
    category: "maintainer",
    accent: "#17453A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Security Patch Guardian\" for a maintainer of security-sensitive open-source infrastructure. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: pine #17453A, gold #D4A84F, cool gray #A9B6C2, and snow #F5F8FA. Hero illustration: a shield-bearing builder mascot guarding a modular dependency graph. Layout: security posture statement, supported projects, disclosure policy, patch history, and contact route. Browser and web presentation: browser-verify security policy, advisories, release notes, and signed project artifacts.\n\nDATA & MODULES: real contribution velocity and heatmap; vulnerability counts only from official linked advisories. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, github-readme-stats, skill-icons, markdown-badges, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: shield glint, scanning arc, and a calm green status glow. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma11\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Security Patch Guardian Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Security",
                  "role": "Maintainer of security-sensitive open-source infrastructure",
                  "bio": "a shield-bearing builder mascot guarding a modular dependency graph",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity and heatmap; vulnerabil"
            },
            "theme": "dark",
            "accentColor": "#17453A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma11-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security Patch Guardian",
                              "color": "17453A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma11-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security Patch Guardian",
                              "color": "17453A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma11-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security Patch Guardian",
                              "color": "17453A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma11-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security Patch Guardian",
                              "color": "17453A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma11-markdown-badges-5",
                  "type": "markdown-badges",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security Patch Guardian",
                              "color": "17453A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma11-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Security Patch Guardian",
                              "color": "17453A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma12",
    name: "Accessibility Advocate",
    description: "Designed for accessibility-focused frontend engineer and open-source contributor. Featuring an inclusive abstract avatar with clear geometric shapes and a universal-access-inspired pattern.",
    category: "maintainer",
    accent: "#E8E1F7",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Accessibility Advocate\" for a accessibility-focused frontend engineer and open-source contributor. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: soft lilac #E8E1F7, ink #303044, accessible green #2F855A, and peach #F4B7A6. Hero illustration: an inclusive abstract avatar with clear geometric shapes and a universal-access-inspired pattern. Layout: accessibility manifesto, assistive-tech skills, design system demos, audit notes, and project links. Browser and web presentation: browser-check public demos for accessible labels, keyboard flows, and verified audit pages.\n\nDATA & MODULES: real contribution heatmap and language donut; audit scores only from linked reports. Build the section sequence from these registered MonoForge plugin IDs where relevant: figma-design, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: gentle focus-ring sweep, clear contrast, and motion-safe reveal. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma12\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Accessibility Advocate Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Accessibility",
                  "role": "Accessibility-focused frontend engineer and open-source contributor",
                  "bio": "an inclusive abstract avatar with clear geometric shapes and a universal-access-inspired pattern",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language donut; audi"
            },
            "theme": "dark",
            "accentColor": "#E8E1F7",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma12-figma-design-1",
                  "type": "figma-design",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Accessibility Advocate",
                              "color": "E8E1F7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma12-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Accessibility Advocate",
                              "color": "E8E1F7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma12-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Accessibility Advocate",
                              "color": "E8E1F7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma12-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Accessibility Advocate",
                              "color": "E8E1F7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma12-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Accessibility Advocate",
                              "color": "E8E1F7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma12-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Accessibility Advocate",
                              "color": "E8E1F7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma13",
    name: "Open-Source Festival",
    description: "Designed for community organizer and hackathon project maintainer. Featuring a lively stage with pixel contributors, floating pull-request confetti, and a code banner.",
    category: "maintainer",
    accent: "#F08C46",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Open-Source Festival\" for a community organizer and hackathon project maintainer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: festival orange #F08C46, electric violet #7A5CE6, sky #54BDE5, and midnight #20233A. Hero illustration: a lively stage with pixel contributors, floating pull-request confetti, and a code banner. Layout: event-style hero, project lineup, contribution checklist, community links, and past work. Browser and web presentation: browser cards link to verified event pages, hackathon demos, repos, and community recordings.\n\nDATA & MODULES: real contribution snake or heatmap plus GitHub stats; event attendance not fabricated. Build the section sequence from these registered MonoForge plugin IDs where relevant: snk, mascot-bio, capsule-banner, telemetry-isocalendar, github-profile-trophy, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: confetti drift, stage spotlight sweep, and celebratory mascot gesture. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma13\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Open-Source Festival Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Open-Source",
                  "role": "Community organizer and hackathon project maintainer",
                  "bio": "a lively stage with pixel contributors, floating pull-request confetti, and a code banner",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution snake or heatmap plus GitHub sta"
            },
            "theme": "dark",
            "accentColor": "#F08C46",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma13-snk-1",
                  "type": "snk",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Festival",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma13-mascot-bio-2",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Festival",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma13-capsule-banner-3",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Festival",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma13-telemetry-isocalendar-4",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Festival",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma13-github-profile-trophy-5",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Festival",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma13-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Festival",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma13-socials-7",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open-Source Festival",
                              "color": "F08C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma14",
    name: "Monorepo Gardener",
    description: "Designed for maintainer of large TypeScript or multi-package repositories. Featuring a branching package tree with workspace leaves and dependency edges.",
    category: "maintainer",
    accent: "#1C5260",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Monorepo Gardener\" for a maintainer of large TypeScript or multi-package repositories. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: blue spruce #1C5260, coral #EF876B, mint #87C8A5, and cream #F3F5F0. Hero illustration: a branching package tree with workspace leaves and dependency edges. Layout: monorepo map hero, package groups, internal tooling, release strategy, and contributor route. Browser and web presentation: browser tabs open actual package docs, workspace guides, CI runs, and package registry pages.\n\nDATA & MODULES: real contribution heatmap, velocity radar, and language donut. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: dependency lines draw in, package nodes pulse, and leaf tips sway slightly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma14\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Monorepo Gardener Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Monorepo",
                  "role": "Maintainer of large TypeScript or multi-package repositories",
                  "bio": "a branching package tree with workspace leaves and dependency edges",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, velocity radar, and lan"
            },
            "theme": "dark",
            "accentColor": "#1C5260",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma14-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Monorepo Gardener",
                              "color": "1C5260",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma14-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Monorepo Gardener",
                              "color": "1C5260",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma14-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Monorepo Gardener",
                              "color": "1C5260",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma14-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Monorepo Gardener",
                              "color": "1C5260",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma14-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Monorepo Gardener",
                              "color": "1C5260",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ma15",
    name: "Open Data Commons",
    description: "Designed for open-data maintainer and civic technology contributor. Featuring a map of linked open-data tiles with a clean civic data emblem.",
    category: "maintainer",
    accent: "#246B9A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Open Data Commons\" for a open-data maintainer and civic technology contributor. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: data blue #246B9A, signal yellow #F2C14E, slate #526777, and white. Hero illustration: a map of linked open-data tiles with a clean civic data emblem. Layout: data catalog, methodology notes, datasets, APIs, contribution guidelines, and citations. Browser and web presentation: browser-verify dataset portals, license pages, API docs, and public dashboards with exact sources.\n\nDATA & MODULES: real contribution calendar and data-language donut; dataset update metrics sourced from real endpoints. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: map tile reveal, flowing data dots, and subtle location pin pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ma15\", name, category \"maintainer\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Open Data Commons Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Open",
                  "role": "Open-data maintainer and civic technology contributor",
                  "bio": "a map of linked open-data tiles with a clean civic data emblem",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar and data-language donut"
            },
            "theme": "dark",
            "accentColor": "#246B9A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ma15-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Data Commons",
                              "color": "246B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma15-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Data Commons",
                              "color": "246B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma15-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Data Commons",
                              "color": "246B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma15-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Data Commons",
                              "color": "246B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma15-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Data Commons",
                              "color": "246B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ma15-footer-6",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Data Commons",
                              "color": "246B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga01",
    name: "Pixel Desk & Coffee Steam",
    description: "Designed for indie game developer and full-stack creator. Featuring a pixel developer at a dual-monitor desk with typing hands, coffee steam, and tiny desk plants.",
    category: "gamedev",
    accent: "#6C4D7D",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Pixel Desk & Coffee Steam\" for a indie game developer and full-stack creator. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cozy cream #F6E9D8, pixel plum #6C4D7D, mint #70C1A1, and dark cocoa #3F3542. Hero illustration: a pixel developer at a dual-monitor desk with typing hands, coffee steam, and tiny desk plants. Layout: cozy pixel-art hero, game projects as cartridge cards, technology shelf, and a compact contribution strip. Browser and web presentation: browser mockup cards look like game storefront pages but link only to real itch.io, Steam, or web demos.\n\nDATA & MODULES: real contribution heatmap and WakaTime only when connected; language donut for actual repositories. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, capsule-banner, telemetry-isocalendar, waka-readme-stats, pie-chart, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: typing hands loop, coffee steam curls, monitor pixels scroll, and small idle character sway. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga01\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Pixel Desk & Coffee Steam Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Pixel",
                  "role": "Indie game developer and full-stack creator",
                  "bio": "a pixel developer at a dual-monitor desk with typing hands, coffee steam, and tiny desk plants",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and WakaTime only when c"
            },
            "theme": "dark",
            "accentColor": "#6C4D7D",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga01-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Pixel Desk & Coffee Steam",
                              "color": "6C4D7D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga01-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Pixel Desk & Coffee Steam",
                              "color": "6C4D7D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga01-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Pixel Desk & Coffee Steam",
                              "color": "6C4D7D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga01-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Pixel Desk & Coffee Steam",
                              "color": "6C4D7D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga01-pie-chart-5",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Pixel Desk & Coffee Steam",
                              "color": "6C4D7D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga01-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Pixel Desk & Coffee Steam",
                              "color": "6C4D7D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga02",
    name: "8-Bit Arcade Champion",
    description: "Designed for retro game programmer and competitive gameplay engineer. Featuring a cabinet marquee with a pixel champion sprite and a high-score panel.",
    category: "gamedev",
    accent: "#F04F5D",
    prompt: "Create a production-grade GitHub Profile README archetype named \"8-Bit Arcade Champion\" for a retro game programmer and competitive gameplay engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: arcade navy #171B3B, cherry red #F04F5D, cyan #41D9E8, and coin gold #F3C969. Hero illustration: a cabinet marquee with a pixel champion sprite and a high-score panel. Layout: arcade intro, game-jam projects, engine/tool badges, trophy shelf, and an 8-bit activity footer. Browser and web presentation: show browser-playable demos as cartridge tiles with a visible verified launch URL.\n\nDATA & MODULES: real contribution snake when supported, GitHub heatmap, and actual trophies. Build the section sequence from these registered MonoForge plugin IDs where relevant: snk, mascot-bio, github-profile-trophy, telemetry-isocalendar, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: pixel sprite idle animation, coin sparkle, CRT scanlines, and marquee blink. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga02\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "8-Bit Arcade Champion Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "8-Bit",
                  "role": "Retro game programmer and competitive gameplay engineer",
                  "bio": "a cabinet marquee with a pixel champion sprite and a high-score panel",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution snake when supported, GitHub hea"
            },
            "theme": "dark",
            "accentColor": "#F04F5D",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga02-snk-1",
                  "type": "snk",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "8-Bit Arcade Champion",
                              "color": "F04F5D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga02-mascot-bio-2",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "8-Bit Arcade Champion",
                              "color": "F04F5D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga02-github-profile-trophy-3",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "8-Bit Arcade Champion",
                              "color": "F04F5D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga02-telemetry-isocalendar-4",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "8-Bit Arcade Champion",
                              "color": "F04F5D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga02-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "8-Bit Arcade Champion",
                              "color": "F04F5D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga02-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "8-Bit Arcade Champion",
                              "color": "F04F5D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga03",
    name: "Voxel City Architect",
    description: "Designed for 3D game developer and world-building engineer. Featuring a miniature 3D isometric city where each voxel district represents a game project or contribution period.",
    category: "gamedev",
    accent: "#F3B562",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Voxel City Architect\" for a 3D game developer and world-building engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep navy #1B2942, voxel amber #F3B562, sky blue #61A8D8, and lavender #A28BD4. Hero illustration: a miniature 3D isometric city where each voxel district represents a game project or contribution period. Layout: isometric skyline hero, project districts, engine skills, and a contribution city legend. Browser and web presentation: browser-window overlays label verified game builds, playable demos, and source repositories.\n\nDATA & MODULES: real 3D isometric contribution calendar with genuine GitHub data; no decorative fake contribution blocks. Build the section sequence from these registered MonoForge plugin IDs where relevant: portfolio-contributions, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: voxel blocks rise with transform animations, small windows light up, and clouds drift slowly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga03\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Voxel City Architect Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Voxel",
                  "role": "3D game developer and world-building engineer",
                  "bio": "a miniature 3D isometric city where each voxel district represents a game project or contribution period",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 3D isometric contribution calendar with genui"
            },
            "theme": "dark",
            "accentColor": "#F3B562",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga03-portfolio-contributions-1",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Voxel City Architect",
                              "color": "F3B562",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga03-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Voxel City Architect",
                              "color": "F3B562",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga03-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Voxel City Architect",
                              "color": "F3B562",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga03-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Voxel City Architect",
                              "color": "F3B562",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga03-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Voxel City Architect",
                              "color": "F3B562",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga03-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Voxel City Architect",
                              "color": "F3B562",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga04",
    name: "Fantasy RPG Wizard Mage",
    description: "Designed for gameplay programmer and tools developer. Featuring a cosmic wizard mage with a crystal staff and rotating runic circle.",
    category: "gamedev",
    accent: "#6B4CCB",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Fantasy RPG Wizard Mage\" for a gameplay programmer and tools developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: mystic violet #6B4CCB, midnight #17152B, rune gold #E9C46A, and ice #B8E0F2. Hero illustration: a cosmic wizard mage with a crystal staff and rotating runic circle. Layout: fantasy quest header, skill spellbook, project quest cards, achievements rack, and contribution scroll. Browser and web presentation: browser demos appear as quest-scroll windows linked to actual builds and project documentation.\n\nDATA & MODULES: real contribution heatmap, language donut, and verified trophies. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, capsule-banner, telemetry-isocalendar, github-profile-trophy, pie-chart, skill-icons. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: staff crystal pulses, rune circle rotates slowly, and stars twinkle with reduced-motion fallback. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga04\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Fantasy RPG Wizard Mage Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Fantasy",
                  "role": "Gameplay programmer and tools developer",
                  "bio": "a cosmic wizard mage with a crystal staff and rotating runic circle",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and ver"
            },
            "theme": "dark",
            "accentColor": "#6B4CCB",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga04-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Fantasy RPG Wizard Mage",
                              "color": "6B4CCB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga04-capsule-banner-2",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Fantasy RPG Wizard Mage",
                              "color": "6B4CCB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga04-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Fantasy RPG Wizard Mage",
                              "color": "6B4CCB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga04-github-profile-trophy-4",
                  "type": "github-profile-trophy",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Fantasy RPG Wizard Mage",
                              "color": "6B4CCB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga04-pie-chart-5",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Fantasy RPG Wizard Mage",
                              "color": "6B4CCB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga04-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Fantasy RPG Wizard Mage",
                              "color": "6B4CCB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga05",
    name: "Mecha Arena Engineer",
    description: "Designed for gameplay/engine programmer focused on simulation. Featuring a mecha pilot next to a modular robot silhouette with targeting HUD elements.",
    category: "gamedev",
    accent: "#303A46",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Mecha Arena Engineer\" for a gameplay/engine programmer focused on simulation. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: gunmetal #303A46, neon orange #FF7A3D, cyan #2CC9E8, and white. Hero illustration: a mecha pilot next to a modular robot silhouette with targeting HUD elements. Layout: technical hero, engine/tool matrix, gameplay systems, shader demos, and project cards. Browser and web presentation: browser cards link to verified gameplay videos, builds, docs, and source code.\n\nDATA & MODULES: real velocity radar and contribution heatmap; performance benchmarks only from linked tests. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: robot visor sweep, servo rotation, targeting brackets, and short thruster pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga05\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Mecha Arena Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Mecha",
                  "role": "Gameplay/engine programmer focused on simulation",
                  "bio": "a mecha pilot next to a modular robot silhouette with targeting HUD elements",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real velocity radar and contribution heatmap; perf"
            },
            "theme": "dark",
            "accentColor": "#303A46",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga05-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Arena Engineer",
                              "color": "303A46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga05-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Arena Engineer",
                              "color": "303A46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga05-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Arena Engineer",
                              "color": "303A46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga05-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Arena Engineer",
                              "color": "303A46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga05-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mecha Arena Engineer",
                              "color": "303A46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga06",
    name: "Indie Studio Director",
    description: "Designed for indie studio founder and game producer. Featuring a studio sign with three colorful game worlds represented as tiny floating portals.",
    category: "gamedev",
    accent: "#F28C74",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Indie Studio Director\" for a indie studio founder and game producer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: navy #202A44, coral #F28C74, sunflower #F3C969, and pale lavender #D9D4F2. Hero illustration: a studio sign with three colorful game worlds represented as tiny floating portals. Layout: studio intro, team/role statement, title lineup, engine stack, press links, and community channels. Browser and web presentation: use browser-styled game pages with verified storefront URLs, release notes, and playable builds.\n\nDATA & MODULES: real GitHub contribution activity and language donut; player counts only from public verified sources. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: portal rings rotate, project thumbnails lift slightly, and title lights pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga06\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Indie Studio Director Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Indie",
                  "role": "Indie studio founder and game producer",
                  "bio": "a studio sign with three colorful game worlds represented as tiny floating portals",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real GitHub contribution activity and language don"
            },
            "theme": "dark",
            "accentColor": "#F28C74",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga06-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Indie Studio Director",
                              "color": "F28C74",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga06-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Indie Studio Director",
                              "color": "F28C74",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga06-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Indie Studio Director",
                              "color": "F28C74",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga06-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Indie Studio Director",
                              "color": "F28C74",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga06-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Indie Studio Director",
                              "color": "F28C74",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga06-footer-6",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Indie Studio Director",
                              "color": "F28C74",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga07",
    name: "Shader Lab Creator",
    description: "Designed for graphics programmer and real-time rendering specialist. Featuring a procedural shader sphere with refractive rings, wireframe planes, and mathematical annotations.",
    category: "gamedev",
    accent: "#875BFF",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Shader Lab Creator\" for a graphics programmer and real-time rendering specialist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: shader indigo #241C4F, ultraviolet #875BFF, acid lime #B7F34A, and cool white. Hero illustration: a procedural shader sphere with refractive rings, wireframe planes, and mathematical annotations. Layout: full-bleed shader hero, graphics stack, demo gallery, and code/research section. Browser and web presentation: browser cards show verified WebGL/WebGPU shader demos with their actual live URLs.\n\nDATA & MODULES: real language donut, contribution velocity radar, and actual WakaTime data if connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, waka-readme-stats, skill-icons, figma-design. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: shader-like gradient sweep and rotating geometry exported as SVG-safe simplified forms. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga07\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Shader Lab Creator Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Shader",
                  "role": "Graphics programmer and real-time rendering specialist",
                  "bio": "a procedural shader sphere with refractive rings, wireframe planes, and mathematical annotations",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut, contribution velocity radar, "
            },
            "theme": "dark",
            "accentColor": "#875BFF",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga07-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Shader Lab Creator",
                              "color": "875BFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga07-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Shader Lab Creator",
                              "color": "875BFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga07-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Shader Lab Creator",
                              "color": "875BFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga07-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Shader Lab Creator",
                              "color": "875BFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga07-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Shader Lab Creator",
                              "color": "875BFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga07-figma-design-6",
                  "type": "figma-design",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Shader Lab Creator",
                              "color": "875BFF",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga08",
    name: "Speedrun Systems Engineer",
    description: "Designed for gameplay optimization engineer and speedrun tool developer. Featuring a pixel stopwatch with a racing stripe and a small split-time board.",
    category: "gamedev",
    accent: "#E63946",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Speedrun Systems Engineer\" for a gameplay optimization engineer and speedrun tool developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: racing red #E63946, carbon #20242B, timer yellow #FFD166, and white. Hero illustration: a pixel stopwatch with a racing stripe and a small split-time board. Layout: speedrun-inspired header, tools and mods list, benchmark evidence, project table, and stats rail. Browser and web presentation: browser research public leaderboard/profile pages and actual tool demos; include source links.\n\nDATA & MODULES: real contribution heatmap; personal records only when provided or publicly verifiable. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, github-readme-stats, skill-icons, projects-showcase, github-achievements. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: stopwatch hand sweeps, split marker flashes once, and scanline accent. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga08\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Speedrun Systems Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Speedrun",
                  "role": "Gameplay optimization engineer and speedrun tool developer",
                  "bio": "a pixel stopwatch with a racing stripe and a small split-time board",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap; personal records only w"
            },
            "theme": "dark",
            "accentColor": "#E63946",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga08-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Speedrun Systems Engineer",
                              "color": "E63946",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga08-github-readme-stats-2",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Speedrun Systems Engineer",
                              "color": "E63946",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga08-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Speedrun Systems Engineer",
                              "color": "E63946",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga08-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Speedrun Systems Engineer",
                              "color": "E63946",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga08-github-achievements-5",
                  "type": "github-achievements",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Speedrun Systems Engineer",
                              "color": "E63946",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga09",
    name: "Audio Synth Game Dev",
    description: "Designed for audio programmer and interactive media developer. Featuring a synthesizer keyboard with an 18-band equalizer and waveform ribbons.",
    category: "gamedev",
    accent: "#56D6D0",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Audio Synth Game Dev\" for a audio programmer and interactive media developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep plum #302044, sonic aqua #56D6D0, neon chartreuse #C7F36B, and silver. Hero illustration: a synthesizer keyboard with an 18-band equalizer and waveform ribbons. Layout: audio-first hero, engine/audio tools, interactive project gallery, and a compact skills matrix. Browser and web presentation: browser tabs open real audio demos, sound experiments, and project pages; no autoplay media.\n\nDATA & MODULES: real WakaTime only when configured, contribution calendar, and music listening widget only if an approved plugin is available. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, waka-readme-stats, pie-chart, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: equalizer bars animate with CSS transform/opacity only; waveform ribbons drift slowly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga09\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Audio Synth Game Dev Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Audio",
                  "role": "Audio programmer and interactive media developer",
                  "bio": "a synthesizer keyboard with an 18-band equalizer and waveform ribbons",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real WakaTime only when configured, contribution c"
            },
            "theme": "dark",
            "accentColor": "#56D6D0",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga09-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Audio Synth Game Dev",
                              "color": "56D6D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga09-waka-readme-stats-2",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Audio Synth Game Dev",
                              "color": "56D6D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga09-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Audio Synth Game Dev",
                              "color": "56D6D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga09-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Audio Synth Game Dev",
                              "color": "56D6D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga09-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Audio Synth Game Dev",
                              "color": "56D6D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga10",
    name: "Worldbuilder Cartographer",
    description: "Designed for procedural world and level designer who codes. Featuring an illustrated fantasy map with compass rose, biome tiles, and route markers.",
    category: "gamedev",
    accent: "#5C7A4A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Worldbuilder Cartographer\" for a procedural world and level designer who codes. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: parchment #F0E6D2, moss #5C7A4A, ocean #4D91A6, and ink #2D3436. Hero illustration: an illustrated fantasy map with compass rose, biome tiles, and route markers. Layout: map legend hero, world-generation projects, art/engine skill groups, and a calm contribution section. Browser and web presentation: browser windows frame playable world demos and map tools with verified project URLs.\n\nDATA & MODULES: real 3D contribution calendar or heatmap, with language donut when useful. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, portfolio-contributions, pie-chart, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: compass needle rotates slowly, route path draws on, and map markers glow softly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga10\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Worldbuilder Cartographer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Worldbuilder",
                  "role": "Procedural world and level designer who codes",
                  "bio": "an illustrated fantasy map with compass rose, biome tiles, and route markers",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real 3D contribution calendar or heatmap, with lan"
            },
            "theme": "dark",
            "accentColor": "#5C7A4A",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga10-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Worldbuilder Cartographer",
                              "color": "5C7A4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga10-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Worldbuilder Cartographer",
                              "color": "5C7A4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga10-portfolio-contributions-3",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Worldbuilder Cartographer",
                              "color": "5C7A4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga10-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Worldbuilder Cartographer",
                              "color": "5C7A4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga10-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Worldbuilder Cartographer",
                              "color": "5C7A4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga10-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Worldbuilder Cartographer",
                              "color": "5C7A4A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga11",
    name: "Horror Game Fog Signal",
    description: "Designed for horror game developer and atmospheric systems artist. Featuring a lone pixel lantern in a foggy forest with eerie geometric silhouettes.",
    category: "gamedev",
    accent: "#343B45",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Horror Game Fog Signal\" for a horror game developer and atmospheric systems artist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: fog gray #343B45, blood red #B83A4B, amber #DDA15E, and pale mist #E8E7E3. Hero illustration: a lone pixel lantern in a foggy forest with eerie geometric silhouettes. Layout: cinematic but readable header, game projects, tool matrix, and a restrained activity block. Browser and web presentation: browser demo panels resemble game build windows and link to verified releases or playable pages.\n\nDATA & MODULES: real contribution heatmap and actual project statistics only. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, mascot-bio, telemetry-isocalendar, github-readme-stats, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: fog-layer opacity drift, lantern flicker, and one subtle glitch pulse; avoid seizure-inducing effects. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga11\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Horror Game Fog Signal Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Horror",
                  "role": "Horror game developer and atmospheric systems artist",
                  "bio": "a lone pixel lantern in a foggy forest with eerie geometric silhouettes",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and actual project stati"
            },
            "theme": "dark",
            "accentColor": "#343B45",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga11-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Horror Game Fog Signal",
                              "color": "343B45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga11-mascot-bio-2",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Horror Game Fog Signal",
                              "color": "343B45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga11-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Horror Game Fog Signal",
                              "color": "343B45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga11-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Horror Game Fog Signal",
                              "color": "343B45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga11-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Horror Game Fog Signal",
                              "color": "343B45",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga12",
    name: "Space Sim Developer",
    description: "Designed for simulation engineer and space game programmer. Featuring a ringed planet and spacecraft orbit with thin vector telemetry arcs.",
    category: "gamedev",
    accent: "#47C7E8",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Space Sim Developer\" for a simulation engineer and space game programmer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cosmic navy #101B3B, comet cyan #47C7E8, silver #C9D4E2, and star gold #F4CB75. Hero illustration: a ringed planet and spacecraft orbit with thin vector telemetry arcs. Layout: orbital hero, simulation systems, physics/tool stack, selected projects, and compact statistics. Browser and web presentation: browser cards link to real simulations, playable demos, documentation, and source repositories.\n\nDATA & MODULES: real contribution calendar, language donut, and WakaTime only if available. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: satellite orbit, star twinkle, and tiny telemetry packet motion. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga12\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Space Sim Developer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Space",
                  "role": "Simulation engineer and space game programmer",
                  "bio": "a ringed planet and spacecraft orbit with thin vector telemetry arcs",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar, language donut, and Wa"
            },
            "theme": "dark",
            "accentColor": "#47C7E8",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga12-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Space Sim Developer",
                              "color": "47C7E8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga12-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Space Sim Developer",
                              "color": "47C7E8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga12-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Space Sim Developer",
                              "color": "47C7E8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga12-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Space Sim Developer",
                              "color": "47C7E8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga12-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Space Sim Developer",
                              "color": "47C7E8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga12-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Space Sim Developer",
                              "color": "47C7E8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga13",
    name: "Mobile Game Crafter",
    description: "Designed for mobile game engineer and cross-platform developer. Featuring a tilted handheld console with a bright screen and floating game icons.",
    category: "gamedev",
    accent: "#F27C38",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Mobile Game Crafter\" for a mobile game engineer and cross-platform developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: sunset orange #F27C38, teal #2A9D8F, dark navy #233142, and cream #F6F4EF. Hero illustration: a tilted handheld console with a bright screen and floating game icons. Layout: device-frame hero, mobile game showcase, platform/engine skills, and release links. Browser and web presentation: browser-store cards point to verified Google Play, App Store, or web game pages.\n\nDATA & MODULES: real contribution heatmap and language donut; store installs only from published store metrics. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: screen glow pulse, button press micro-motion, and small pixel particles. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga13\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Mobile Game Crafter Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Mobile",
                  "role": "Mobile game engineer and cross-platform developer",
                  "bio": "a tilted handheld console with a bright screen and floating game icons",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language donut; stor"
            },
            "theme": "dark",
            "accentColor": "#F27C38",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga13-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Game Crafter",
                              "color": "F27C38",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga13-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Game Crafter",
                              "color": "F27C38",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga13-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Game Crafter",
                              "color": "F27C38",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga13-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Game Crafter",
                              "color": "F27C38",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga13-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Game Crafter",
                              "color": "F27C38",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga13-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Game Crafter",
                              "color": "F27C38",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga14",
    name: "Procedural Worlds Alchemist",
    description: "Designed for procedural generation developer and technical artist. Featuring a fractal tree growing into a voxel landscape with small algorithmic glyphs.",
    category: "gamedev",
    accent: "#276749",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Procedural Worlds Alchemist\" for a procedural generation developer and technical artist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: forest emerald #276749, ultraviolet #805AD5, warm cream #F7F3E9, and dark slate. Hero illustration: a fractal tree growing into a voxel landscape with small algorithmic glyphs. Layout: world-generation hero, algorithms section, interactive demos, code projects, and activity panel. Browser and web presentation: browser research linked WebGL demos and technical articles, then show them in verified demo frames.\n\nDATA & MODULES: real contribution calendar and language donut; benchmark outputs require linked reproducible data. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase, github-readme-stats. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: branching fractal reveal, slow leaf sway, and node pulses. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga14\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Procedural Worlds Alchemist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Procedural",
                  "role": "Procedural generation developer and technical artist",
                  "bio": "a fractal tree growing into a voxel landscape with small algorithmic glyphs",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar and language donut; ben"
            },
            "theme": "dark",
            "accentColor": "#276749",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga14-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Procedural Worlds Alchemist",
                              "color": "276749",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga14-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Procedural Worlds Alchemist",
                              "color": "276749",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga14-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Procedural Worlds Alchemist",
                              "color": "276749",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga14-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Procedural Worlds Alchemist",
                              "color": "276749",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga14-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Procedural Worlds Alchemist",
                              "color": "276749",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga14-github-readme-stats-6",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Procedural Worlds Alchemist",
                              "color": "276749",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ga15",
    name: "VR AR Spatial Creator",
    description: "Designed for XR developer and spatial computing engineer. Featuring a wireframe headset with spatial anchor rings and floating scene panels.",
    category: "gamedev",
    accent: "#6D5CE8",
    prompt: "Create a production-grade GitHub Profile README archetype named \"VR AR Spatial Creator\" for a XR developer and spatial computing engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: spatial violet #6D5CE8, sky blue #4DB6E5, mint #7ED6B2, and midnight #1D2340. Hero illustration: a wireframe headset with spatial anchor rings and floating scene panels. Layout: immersive hero, XR platform badges, spatial demos, research links, and a two-column project grid. Browser and web presentation: browser cards launch verified WebXR demos and documentation, with clear compatibility notes.\n\nDATA & MODULES: real contribution heatmap and language distribution; device compatibility only from user-provided facts. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, figma-design, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: headset outline assembles, anchor rings rotate, and scene nodes fade in. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ga15\", name, category \"gamedev\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "VR AR Spatial Creator Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "VR",
                  "role": "XR developer and spatial computing engineer",
                  "bio": "a wireframe headset with spatial anchor rings and floating scene panels",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language distributio"
            },
            "theme": "dark",
            "accentColor": "#6D5CE8",
            "badgeStyle": "for-the-badge",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ga15-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "VR AR Spatial Creator",
                              "color": "6D5CE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga15-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "VR AR Spatial Creator",
                              "color": "6D5CE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga15-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "VR AR Spatial Creator",
                              "color": "6D5CE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga15-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "VR AR Spatial Creator",
                              "color": "6D5CE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga15-figma-design-5",
                  "type": "figma-design",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "VR AR Spatial Creator",
                              "color": "6D5CE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ga15-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "VR AR Spatial Creator",
                              "color": "6D5CE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac01",
    name: "Research Scholar Editorial",
    description: "Designed for computer science researcher and doctoral scholar. Featuring an editorial academic seal with a fine-line open book and citation marks.",
    category: "academic",
    accent: "#20304A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Research Scholar Editorial\" for a computer science researcher and doctoral scholar. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: ivory #F7F4EC, deep navy #20304A, antique gold #B99A58, and gray #737B86. Hero illustration: an editorial academic seal with a fine-line open book and citation marks. Layout: paper-like profile with research focus, selected publications, projects, academic service, and contact links. Browser and web presentation: browser-verify DOI, arXiv, ORCID, lab, and institutional pages; show exact source links.\n\nDATA & MODULES: real contribution heatmap and language donut; citation counts only from verified scholarly profiles. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: subtle page-rule reveal and small citation mark shimmer. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac01\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Research Scholar Editorial Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Research",
                  "role": "Computer science researcher and doctoral scholar",
                  "bio": "an editorial academic seal with a fine-line open book and citation marks",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language donut; cita"
            },
            "theme": "auto",
            "accentColor": "#20304A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac01-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Research Scholar Editorial",
                              "color": "20304A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac01-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Research Scholar Editorial",
                              "color": "20304A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac01-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Research Scholar Editorial",
                              "color": "20304A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac01-socials-4",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Research Scholar Editorial",
                              "color": "20304A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac01-footer-5",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Research Scholar Editorial",
                              "color": "20304A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac02",
    name: "Mathematics & Formal Methods",
    description: "Designed for mathematician and formal verification engineer. Featuring a clean geometric formula composition with vector-rendered symbols and a proof-tree motif.",
    category: "academic",
    accent: "#2563EB",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Mathematics & Formal Methods\" for a mathematician and formal verification engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: white #FBFCFE, ink #1F2937, theorem blue #2563EB, and plum #7451A6. Hero illustration: a clean geometric formula composition with vector-rendered symbols and a proof-tree motif. Layout: theorem-style sections for research interests, papers, formal tools, and selected implementations. Browser and web presentation: browser cards open verified preprints, source proofs, documentation, and conference talks.\n\nDATA & MODULES: real language donut and contribution calendar; equations are illustrative unless linked to a paper. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: equation reveal by opacity and slow proof-tree line draw; avoid moving math glyphs excessively. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac02\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Mathematics & Formal Methods Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Mathematics",
                  "role": "Mathematician and formal verification engineer",
                  "bio": "a clean geometric formula composition with vector-rendered symbols and a proof-tree motif",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut and contribution calendar; equ"
            },
            "theme": "auto",
            "accentColor": "#2563EB",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac02-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mathematics & Formal Methods",
                              "color": "2563EB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac02-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mathematics & Formal Methods",
                              "color": "2563EB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac02-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mathematics & Formal Methods",
                              "color": "2563EB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac02-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mathematics & Formal Methods",
                              "color": "2563EB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac02-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mathematics & Formal Methods",
                              "color": "2563EB",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac03",
    name: "Machine Learning Research Lab",
    description: "Designed for ML researcher and applied scientist. Featuring a layered neural-network SVG with annotated data/model/evaluation stages.",
    category: "academic",
    accent: "#1E3354",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Machine Learning Research Lab\" for a ML researcher and applied scientist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: lab white #F5F7FA, research navy #1E3354, data cyan #35A7C8, and muted violet #8375B5. Hero illustration: a layered neural-network SVG with annotated data/model/evaluation stages. Layout: research summary, paper cards, reproducibility checklist, selected datasets, and implementation projects. Browser and web presentation: browser research papers, benchmark repositories, model cards, and datasets with version/source citations.\n\nDATA & MODULES: real contribution heatmap, language donut, and verified Kaggle/WakaTime metrics where connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: nodes illuminate sequentially, data path sweep, and calm grid pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac03\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Machine Learning Research Lab Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Machine",
                  "role": "ML researcher and applied scientist",
                  "bio": "a layered neural-network SVG with annotated data/model/evaluation stages",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and ver"
            },
            "theme": "auto",
            "accentColor": "#1E3354",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac03-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Machine Learning Research Lab",
                              "color": "1E3354",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac03-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Machine Learning Research Lab",
                              "color": "1E3354",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac03-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Machine Learning Research Lab",
                              "color": "1E3354",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac03-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Machine Learning Research Lab",
                              "color": "1E3354",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac03-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Machine Learning Research Lab",
                              "color": "1E3354",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac03-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Machine Learning Research Lab",
                              "color": "1E3354",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac04",
    name: "Bioinformatics Genome Studio",
    description: "Designed for bioinformatics engineer and computational biology researcher. Featuring a double-helix SVG braided with code symbols and annotation callouts.",
    category: "academic",
    accent: "#B9E4D0",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Bioinformatics Genome Studio\" for a bioinformatics engineer and computational biology researcher. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: mint #B9E4D0, plum #6D4C7D, warm ivory #F8F6F0, and ink #2D3940. Hero illustration: a double-helix SVG braided with code symbols and annotation callouts. Layout: research focus, computational pipelines, datasets, tools, publications, and reproducible project cards. Browser and web presentation: browser-verify published datasets, papers, and pipeline repos; show source accession/DOI links.\n\nDATA & MODULES: real contribution heatmap, language donut, and data metrics only from public linked sources. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: DNA helix gently rotates, base-pair nodes pulse, and labels stay readable. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac04\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Bioinformatics Genome Studio Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Bioinformatics",
                  "role": "Bioinformatics engineer and computational biology researcher",
                  "bio": "a double-helix SVG braided with code symbols and annotation callouts",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and dat"
            },
            "theme": "auto",
            "accentColor": "#B9E4D0",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac04-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioinformatics Genome Studio",
                              "color": "B9E4D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac04-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioinformatics Genome Studio",
                              "color": "B9E4D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac04-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioinformatics Genome Studio",
                              "color": "B9E4D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac04-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioinformatics Genome Studio",
                              "color": "B9E4D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac04-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Bioinformatics Genome Studio",
                              "color": "B9E4D0",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac05",
    name: "Robotics Research Lab",
    description: "Designed for robotics researcher and autonomous systems engineer. Featuring a schematic robotic arm with coordinate axes and sensor callouts.",
    category: "academic",
    accent: "#334155",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Robotics Research Lab\" for a robotics researcher and autonomous systems engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: slate #334155, lab cyan #35B8D5, safety amber #F2B84B, and white. Hero illustration: a schematic robotic arm with coordinate axes and sensor callouts. Layout: lab identity banner, research topics, hardware/software skills, experiment demos, and publications. Browser and web presentation: browser frames link to verified robot videos, lab papers, hardware docs, and source repositories.\n\nDATA & MODULES: real contribution heatmap and language distribution; robot benchmark values only from linked reports. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: robot joint pivots, sensor beam sweep, and small warning indicator pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac05\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Robotics Research Lab Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Robotics",
                  "role": "Robotics researcher and autonomous systems engineer",
                  "bio": "a schematic robotic arm with coordinate axes and sensor callouts",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language distributio"
            },
            "theme": "auto",
            "accentColor": "#334155",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac05-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Robotics Research Lab",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac05-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Robotics Research Lab",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac05-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Robotics Research Lab",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac05-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Robotics Research Lab",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac05-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Robotics Research Lab",
                              "color": "334155",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac06",
    name: "Climate Science Researcher",
    description: "Designed for climate-data scientist and environmental software researcher. Featuring a planet horizon with a leaf/circuit motif and layered climate data contours.",
    category: "academic",
    accent: "#255C46",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Climate Science Researcher\" for a climate-data scientist and environmental software researcher. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: forest #255C46, sky #78B9D5, warm white #F6F7F2, and sunlight #E6C65B. Hero illustration: a planet horizon with a leaf/circuit motif and layered climate data contours. Layout: research narrative, public datasets, reproducible notebooks, publications, and tool stack. Browser and web presentation: browser-verify dataset provenance, publication DOI, and dashboard source before presenting charts.\n\nDATA & MODULES: real contribution calendar; climate charts must use real cited public datasets rather than invented samples. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: contour lines draw slowly, clouds drift, and subtle globe pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac06\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Climate Science Researcher Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Climate",
                  "role": "Climate-data scientist and environmental software researcher",
                  "bio": "a planet horizon with a leaf/circuit motif and layered climate data contours",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar; climate charts must us"
            },
            "theme": "auto",
            "accentColor": "#255C46",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac06-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Climate Science Researcher",
                              "color": "255C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac06-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Climate Science Researcher",
                              "color": "255C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac06-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Climate Science Researcher",
                              "color": "255C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac06-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Climate Science Researcher",
                              "color": "255C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac06-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Climate Science Researcher",
                              "color": "255C46",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac07",
    name: "Computational Physics Observatory",
    description: "Designed for computational physicist and scientific software engineer. Featuring a particle field around a central simulation lattice with orbital annotations.",
    category: "academic",
    accent: "#42C6C4",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Computational Physics Observatory\" for a computational physicist and scientific software engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep space #17233B, plasma teal #42C6C4, particle orange #F29E4C, and silver. Hero illustration: a particle field around a central simulation lattice with orbital annotations. Layout: research interests, numerical methods, simulation projects, publications, and language/tool matrix. Browser and web presentation: browser-link reproducible notebooks, datasets, papers, and benchmark artifacts with exact versions.\n\nDATA & MODULES: real contribution heatmap and actual language statistics; simulation results only from linked reproducible artifacts. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: particles drift along SVG paths, field rings rotate slowly, and a signal dot pulses. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac07\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Computational Physics Observatory Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Computational",
                  "role": "Computational physicist and scientific software engineer",
                  "bio": "a particle field around a central simulation lattice with orbital annotations",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and actual language stat"
            },
            "theme": "auto",
            "accentColor": "#42C6C4",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac07-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Computational Physics Observatory",
                              "color": "42C6C4",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac07-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Computational Physics Observatory",
                              "color": "42C6C4",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac07-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Computational Physics Observatory",
                              "color": "42C6C4",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac07-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Computational Physics Observatory",
                              "color": "42C6C4",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac07-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Computational Physics Observatory",
                              "color": "42C6C4",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac08",
    name: "HCI & UX Research Studio",
    description: "Designed for HCI researcher and design technologist. Featuring a research canvas with cursor trails, prototype cards, and a human-centered interaction map.",
    category: "academic",
    accent: "#303044",
    prompt: "Create a production-grade GitHub Profile README archetype named \"HCI & UX Research Studio\" for a HCI researcher and design technologist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: soft lilac #E9E4F5, ink #303044, coral #E68B7A, and warm white #FBFAF7. Hero illustration: a research canvas with cursor trails, prototype cards, and a human-centered interaction map. Layout: research questions, methods, Figma prototypes, papers, usability artifacts, and portfolio work. Browser and web presentation: browser-preview verified prototypes and published studies; no fabricated usability findings.\n\nDATA & MODULES: real contribution heatmap and WakaTime only when connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: figma-design, pinterest-image, telemetry-isocalendar, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: cursor path draws in, prototype frames softly shift, and accessible motion fallback. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac08\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "HCI & UX Research Studio Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "HCI",
                  "role": "HCI researcher and design technologist",
                  "bio": "a research canvas with cursor trails, prototype cards, and a human-centered interaction map",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and WakaTime only when c"
            },
            "theme": "auto",
            "accentColor": "#303044",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac08-figma-design-1",
                  "type": "figma-design",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "HCI & UX Research Studio",
                              "color": "303044",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac08-pinterest-image-2",
                  "type": "pinterest-image",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "HCI & UX Research Studio",
                              "color": "303044",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac08-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "HCI & UX Research Studio",
                              "color": "303044",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac08-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "HCI & UX Research Studio",
                              "color": "303044",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac08-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "HCI & UX Research Studio",
                              "color": "303044",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac09",
    name: "Systems Benchmark Scientist",
    description: "Designed for systems researcher and performance engineer. Featuring a benchmark instrument panel with precise bar scales and a vector chip silhouette.",
    category: "academic",
    accent: "#60D6A5",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Systems Benchmark Scientist\" for a systems researcher and performance engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: graphite #242E38, mint #60D6A5, warning yellow #E7C65A, and white. Hero illustration: a benchmark instrument panel with precise bar scales and a vector chip silhouette. Layout: benchmark methodology, tested systems, reproducible tables, papers, and hardware/software skills. Browser and web presentation: browser research benchmark repos and official methodology pages; link data, commit, and environment details.\n\nDATA & MODULES: real contribution velocity radar; benchmark plots must use measured linked results, never synthetic curves. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, projects-showcase, skill-icons. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: instrument needle moves subtly and benchmark grid draws in once. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac09\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Systems Benchmark Scientist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Systems",
                  "role": "Systems researcher and performance engineer",
                  "bio": "a benchmark instrument panel with precise bar scales and a vector chip silhouette",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar; benchmark plots "
            },
            "theme": "auto",
            "accentColor": "#60D6A5",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac09-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Systems Benchmark Scientist",
                              "color": "60D6A5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac09-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Systems Benchmark Scientist",
                              "color": "60D6A5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac09-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Systems Benchmark Scientist",
                              "color": "60D6A5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac09-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Systems Benchmark Scientist",
                              "color": "60D6A5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac09-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Systems Benchmark Scientist",
                              "color": "60D6A5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac10",
    name: "Open Science Archivist",
    description: "Designed for open science advocate and research software maintainer. Featuring an archive drawer with a DOI tag, dataset layers, and an open-lock emblem.",
    category: "academic",
    accent: "#267C78",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Open Science Archivist\" for a open science advocate and research software maintainer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: archive white #FAFAF7, teal #267C78, orange #DB8B4B, and ink #2D3540. Hero illustration: an archive drawer with a DOI tag, dataset layers, and an open-lock emblem. Layout: open access statement, data/software records, publications, reusable methods, and contact links. Browser and web presentation: browser-verify Zenodo, OSF, DOI, institutional repository, and license pages.\n\nDATA & MODULES: real contribution heatmap and language donut; show only verified repository metadata and DOI records. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, projects-showcase, pie-chart, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: archive drawer slides gently, DOI label glints once, and paper tabs reveal. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac10\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Open Science Archivist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Open",
                  "role": "Open science advocate and research software maintainer",
                  "bio": "an archive drawer with a DOI tag, dataset layers, and an open-lock emblem",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language donut; show"
            },
            "theme": "auto",
            "accentColor": "#267C78",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac10-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Science Archivist",
                              "color": "267C78",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac10-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Science Archivist",
                              "color": "267C78",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac10-projects-showcase-3",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Science Archivist",
                              "color": "267C78",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac10-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Science Archivist",
                              "color": "267C78",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac10-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Science Archivist",
                              "color": "267C78",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac10-footer-6",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Open Science Archivist",
                              "color": "267C78",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac11",
    name: "Linguistics & NLP Scholar",
    description: "Designed for computational linguist and NLP researcher. Featuring a typographic waveform connecting phonetic symbols and language tokens.",
    category: "academic",
    accent: "#315B9A",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Linguistics & NLP Scholar\" for a computational linguist and NLP researcher. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: warm parchment #F4EBDD, cobalt #315B9A, violet #8063A6, and charcoal #30343B. Hero illustration: a typographic waveform connecting phonetic symbols and language tokens. Layout: research areas, corpora, NLP tools, publications, language resources, and project demos. Browser and web presentation: browser-link verified corpora, benchmark tasks, papers, demos, and language-resource pages.\n\nDATA & MODULES: real language donut and contribution calendar; corpus size claims need dataset references. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: phoneme tokens travel along a line, speech waveform pulses slowly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac11\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Linguistics & NLP Scholar Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Linguistics",
                  "role": "Computational linguist and NLP researcher",
                  "bio": "a typographic waveform connecting phonetic symbols and language tokens",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut and contribution calendar; cor"
            },
            "theme": "auto",
            "accentColor": "#315B9A",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac11-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Linguistics & NLP Scholar",
                              "color": "315B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac11-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Linguistics & NLP Scholar",
                              "color": "315B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac11-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Linguistics & NLP Scholar",
                              "color": "315B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac11-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Linguistics & NLP Scholar",
                              "color": "315B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac11-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Linguistics & NLP Scholar",
                              "color": "315B9A",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac12",
    name: "Astronomy Data Scientist",
    description: "Designed for astronomy software developer and observational data analyst. Featuring a telescope silhouette under a detailed starfield and orbital data rings.",
    category: "academic",
    accent: "#F2C66D",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Astronomy Data Scientist\" for a astronomy software developer and observational data analyst. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cosmic navy #121B3C, star gold #F2C66D, nebula violet #7764B7, and pale blue #C7DDF4. Hero illustration: a telescope silhouette under a detailed starfield and orbital data rings. Layout: astronomy hero, instruments/data stack, public archives, research projects, and papers. Browser and web presentation: browser-verify NASA/ESA archive records, public datasets, papers, and software documentation.\n\nDATA & MODULES: real contribution heatmap and language donut; scientific graphs must use genuine public observations. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: stars twinkle at low frequency, telescope beam sweeps, and orbit line rotates. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac12\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Astronomy Data Scientist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Astronomy",
                  "role": "Astronomy software developer and observational data analyst",
                  "bio": "a telescope silhouette under a detailed starfield and orbital data rings",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and language donut; scie"
            },
            "theme": "auto",
            "accentColor": "#F2C66D",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac12-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Astronomy Data Scientist",
                              "color": "F2C66D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac12-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Astronomy Data Scientist",
                              "color": "F2C66D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac12-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Astronomy Data Scientist",
                              "color": "F2C66D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac12-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Astronomy Data Scientist",
                              "color": "F2C66D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac12-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Astronomy Data Scientist",
                              "color": "F2C66D",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "ac13",
    name: "Education & Knowledge Engineer",
    description: "Designed for educational technologist and computer science educator. Featuring an open notebook whose pages become a learning-path flow diagram.",
    category: "academic",
    accent: "#2D6A9F",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Education & Knowledge Engineer\" for a educational technologist and computer science educator. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: paper #F7F1E5, ocean blue #2D6A9F, orange #E68A4E, and dark slate #374151. Hero illustration: an open notebook whose pages become a learning-path flow diagram. Layout: teaching philosophy, courses, tutorials, open educational resources, projects, and community links. Browser and web presentation: browser-verify course pages, lecture notes, public repositories, and demo resources.\n\nDATA & MODULES: real contribution heatmap and verified course/project stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, skill-icons, projects-showcase, socials, footer. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: page flip, learning-path nodes illuminate sequentially, and cursor blinks softly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"ac13\", name, category \"academic\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Education & Knowledge Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Education",
                  "role": "Educational technologist and computer science educator",
                  "bio": "an open notebook whose pages become a learning-path flow diagram",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap and verified course/proj"
            },
            "theme": "auto",
            "accentColor": "#2D6A9F",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "ac13-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Education & Knowledge Engineer",
                              "color": "2D6A9F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac13-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Education & Knowledge Engineer",
                              "color": "2D6A9F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac13-skill-icons-3",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Education & Knowledge Engineer",
                              "color": "2D6A9F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac13-projects-showcase-4",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Education & Knowledge Engineer",
                              "color": "2D6A9F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac13-socials-5",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Education & Knowledge Engineer",
                              "color": "2D6A9F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "ac13-footer-6",
                  "type": "footer",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Education & Knowledge Engineer",
                              "color": "2D6A9F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po01",
    name: "Full-Stack Circuit Architect",
    description: "Designed for full-stack engineer spanning frontend, backend, and infrastructure. Featuring a modular circuit linking browser UI, API services, database, and cloud nodes.",
    category: "polyglot",
    accent: "#7657D5",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Full-Stack Circuit Architect\" for a full-stack engineer spanning frontend, backend, and infrastructure. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: violet #7657D5, cyan #2CC9D8, deep slate #202B3C, and white. Hero illustration: a modular circuit linking browser UI, API services, database, and cloud nodes. Layout: wide hero, four-layer stack map, project cards, and balanced stats row. Browser and web presentation: browser cards show verified deployed apps and docs with real tab titles and project links.\n\nDATA & MODULES: real contribution calendar, language donut, and velocity radar. Build the section sequence from these registered MonoForge plugin IDs where relevant: readme-typing-svg, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: flowing request packets, connected node pulses, and a short typewriter headline. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po01\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Full-Stack Circuit Architect Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Full-Stack",
                  "role": "Full-stack engineer spanning frontend, backend, and infrastructure",
                  "bio": "a modular circuit linking browser UI, API services, database, and cloud nodes",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar, language donut, and ve"
            },
            "theme": "dark",
            "accentColor": "#7657D5",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po01-readme-typing-svg-1",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Full-Stack Circuit Architect",
                              "color": "7657D5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po01-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Full-Stack Circuit Architect",
                              "color": "7657D5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po01-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Full-Stack Circuit Architect",
                              "color": "7657D5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po01-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Full-Stack Circuit Architect",
                              "color": "7657D5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po01-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Full-Stack Circuit Architect",
                              "color": "7657D5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po01-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Full-Stack Circuit Architect",
                              "color": "7657D5",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po02",
    name: "TypeScript Product Engineer",
    description: "Designed for TypeScript engineer building polished web products. Featuring a TS monogram formed from typed interface brackets and a product UI window.",
    category: "polyglot",
    accent: "#3178C6",
    prompt: "Create a production-grade GitHub Profile README archetype named \"TypeScript Product Engineer\" for a TypeScript engineer building polished web products. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: typescript blue #3178C6, electric cyan #39C3D6, graphite #253044, and cloud #F5F8FC. Hero illustration: a TS monogram formed from typed interface brackets and a product UI window. Layout: product-focused hero, frontend/backend skills, component libraries, shipped products, and contribution row. Browser and web presentation: browser research verifies live products, npm packages, documentation, and issue trackers.\n\nDATA & MODULES: real language donut, contribution heatmap, and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, readme-typing-svg, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: typed cursor reveal, subtle UI panel slide, and small blue border sweep. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po02\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "TypeScript Product Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "TypeScript",
                  "role": "TypeScript engineer building polished web products",
                  "bio": "a TS monogram formed from typed interface brackets and a product UI window",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut, contribution heatmap, and Git"
            },
            "theme": "dark",
            "accentColor": "#3178C6",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po02-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "TypeScript Product Engineer",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po02-readme-typing-svg-2",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "TypeScript Product Engineer",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po02-telemetry-isocalendar-3",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "TypeScript Product Engineer",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po02-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "TypeScript Product Engineer",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po02-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "TypeScript Product Engineer",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po02-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "TypeScript Product Engineer",
                              "color": "3178C6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po03",
    name: "Python Data Explorer",
    description: "Designed for Python developer and data science practitioner. Featuring a data explorer mascot beside a notebook grid, plot axes, and a Python-inspired mark.",
    category: "polyglot",
    accent: "#263449",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Python Data Explorer\" for a Python developer and data science practitioner. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: slate #263449, python yellow #FFD43B, python blue #3776AB, and mint #70C1A1. Hero illustration: a data explorer mascot beside a notebook grid, plot axes, and a Python-inspired mark. Layout: notebook-style hero, data tools, project gallery, learning/research notes, and clear links. Browser and web presentation: browser tabs link to verified notebooks, dashboards, Kaggle profile, and dataset documentation.\n\nDATA & MODULES: real language donut, contribution heatmap, Kaggle stats only if connected, and WakaTime if configured. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, waka-readme-stats, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: notebook cell reveal, plot marker pulse, and subtle data-point travel. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po03\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Python Data Explorer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Python",
                  "role": "Python developer and data science practitioner",
                  "bio": "a data explorer mascot beside a notebook grid, plot axes, and a Python-inspired mark",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut, contribution heatmap, Kaggle "
            },
            "theme": "dark",
            "accentColor": "#263449",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po03-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Python Data Explorer",
                              "color": "263449",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po03-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Python Data Explorer",
                              "color": "263449",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po03-waka-readme-stats-3",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Python Data Explorer",
                              "color": "263449",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po03-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Python Data Explorer",
                              "color": "263449",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po03-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Python Data Explorer",
                              "color": "263449",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po03-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Python Data Explorer",
                              "color": "263449",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po04",
    name: "Rust Systems Craftsman",
    description: "Designed for Rust systems developer and performance engineer. Featuring a precision gear forged around a Rust-colored hexagonal emblem.",
    category: "polyglot",
    accent: "#CE6B36",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Rust Systems Craftsman\" for a Rust systems developer and performance engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: rust orange #CE6B36, midnight #192535, steel #A9BBCB, and pale cream #F6F3EE. Hero illustration: a precision gear forged around a Rust-colored hexagonal emblem. Layout: systems-oriented hero, language/runtime matrix, low-level projects, benchmarks, and activity data. Browser and web presentation: browser cards present verified crates, docs.rs, benchmarks, and live tools.\n\nDATA & MODULES: real contribution velocity radar, heatmap, and language breakdown. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: gear rotates slowly, a red-orange trace sweeps across the header, and sparks fade. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po04\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Rust Systems Craftsman Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Rust",
                  "role": "Rust systems developer and performance engineer",
                  "bio": "a precision gear forged around a Rust-colored hexagonal emblem",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar, heatmap, and lan"
            },
            "theme": "dark",
            "accentColor": "#CE6B36",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po04-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Rust Systems Craftsman",
                              "color": "CE6B36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po04-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Rust Systems Craftsman",
                              "color": "CE6B36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po04-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Rust Systems Craftsman",
                              "color": "CE6B36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po04-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Rust Systems Craftsman",
                              "color": "CE6B36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po04-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Rust Systems Craftsman",
                              "color": "CE6B36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po04-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Rust Systems Craftsman",
                              "color": "CE6B36",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po05",
    name: "Go Cloud-Native Engineer",
    description: "Designed for Go developer and cloud-native platform engineer. Featuring a gopher-inspired abstract mascot moving through container and service blocks.",
    category: "polyglot",
    accent: "#2463A6",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Go Cloud-Native Engineer\" for a Go developer and cloud-native platform engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: cobalt #2463A6, cyan #35B9C8, emerald #36A879, and dark slate #233244. Hero illustration: a gopher-inspired abstract mascot moving through container and service blocks. Layout: cloud-native hero, Go/backend skills, Kubernetes tooling, project cards, and a slim pipeline strip. Browser and web presentation: browser-link real Go modules, service demos, Helm charts, and public docs.\n\nDATA & MODULES: real contribution heatmap, velocity radar, and language donut. Build the section sequence from these registered MonoForge plugin IDs where relevant: mascot-bio, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: container blocks snap into a cluster, service routes pulse, and mascot idle motion. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po05\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Go Cloud-Native Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Go",
                  "role": "Go developer and cloud-native platform engineer",
                  "bio": "a gopher-inspired abstract mascot moving through container and service blocks",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, velocity radar, and lan"
            },
            "theme": "dark",
            "accentColor": "#2463A6",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po05-mascot-bio-1",
                  "type": "mascot-bio",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Go Cloud-Native Engineer",
                              "color": "2463A6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po05-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Go Cloud-Native Engineer",
                              "color": "2463A6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po05-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Go Cloud-Native Engineer",
                              "color": "2463A6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po05-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Go Cloud-Native Engineer",
                              "color": "2463A6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po05-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Go Cloud-Native Engineer",
                              "color": "2463A6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po05-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Go Cloud-Native Engineer",
                              "color": "2463A6",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po06",
    name: "Java Enterprise Builder",
    description: "Designed for Java engineer building reliable enterprise systems. Featuring a modular enterprise architecture tower with a subtle Java cup motif.",
    category: "polyglot",
    accent: "#1E3A5F",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Java Enterprise Builder\" for a Java engineer building reliable enterprise systems. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep blue #1E3A5F, Java red #E76F51, warm gold #E9C46A, and white. Hero illustration: a modular enterprise architecture tower with a subtle Java cup motif. Layout: professional hero, backend/service architecture, framework skills, project case studies, and stats. Browser and web presentation: browser tabs link to verified service documentation, Java packages, and product demos.\n\nDATA & MODULES: real language donut, contribution heatmap, and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: service nodes connect, warm status lights pulse, and the header line draws once. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po06\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Java Enterprise Builder Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Java",
                  "role": "Java engineer building reliable enterprise systems",
                  "bio": "a modular enterprise architecture tower with a subtle Java cup motif",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut, contribution heatmap, and Git"
            },
            "theme": "dark",
            "accentColor": "#1E3A5F",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po06-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Java Enterprise Builder",
                              "color": "1E3A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po06-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Java Enterprise Builder",
                              "color": "1E3A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po06-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Java Enterprise Builder",
                              "color": "1E3A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po06-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Java Enterprise Builder",
                              "color": "1E3A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po06-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Java Enterprise Builder",
                              "color": "1E3A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po06-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Java Enterprise Builder",
                              "color": "1E3A5F",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po07",
    name: "Frontend Motion Artisan",
    description: "Designed for frontend developer and motion-focused UI engineer. Featuring a playful motion canvas with floating UI components and a cursor-tail SVG.",
    category: "polyglot",
    accent: "#7556C8",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Frontend Motion Artisan\" for a frontend developer and motion-focused UI engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: violet #7556C8, coral #F08B83, butter #F3D98B, and ink #2E3142. Hero illustration: a playful motion canvas with floating UI components and a cursor-tail SVG. Layout: visual hero, design principles, frontend stack, Figma prototypes, and a responsive project gallery. Browser and web presentation: browser-preview real websites and Figma prototypes in polished window frames with accessible links.\n\nDATA & MODULES: real contribution heatmap, language donut, and WakaTime only when configured. Build the section sequence from these registered MonoForge plugin IDs where relevant: figma-design, pinterest-image, capsule-banner, telemetry-isocalendar, pie-chart, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: micro-interaction-inspired motion, floating cards, gradient shimmer, and reduced-motion support. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po07\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Frontend Motion Artisan Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Frontend",
                  "role": "Frontend developer and motion-focused UI engineer",
                  "bio": "a playful motion canvas with floating UI components and a cursor-tail SVG",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and Wak"
            },
            "theme": "dark",
            "accentColor": "#7556C8",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po07-figma-design-1",
                  "type": "figma-design",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Frontend Motion Artisan",
                              "color": "7556C8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po07-pinterest-image-2",
                  "type": "pinterest-image",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Frontend Motion Artisan",
                              "color": "7556C8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po07-capsule-banner-3",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Frontend Motion Artisan",
                              "color": "7556C8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po07-telemetry-isocalendar-4",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Frontend Motion Artisan",
                              "color": "7556C8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po07-pie-chart-5",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Frontend Motion Artisan",
                              "color": "7556C8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po07-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Frontend Motion Artisan",
                              "color": "7556C8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po07-projects-showcase-7",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Frontend Motion Artisan",
                              "color": "7556C8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po08",
    name: "Backend API Cartographer",
    description: "Designed for backend engineer and distributed API developer. Featuring a service map with endpoints, queues, database nodes, and directional request arrows.",
    category: "polyglot",
    accent: "#153E5C",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Backend API Cartographer\" for a backend engineer and distributed API developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: ocean #153E5C, aqua #45C4B0, amber #E8A44A, and mist #F4F7FA. Hero illustration: a service map with endpoints, queues, database nodes, and directional request arrows. Layout: API map hero, backend capabilities, architecture notes, selected services, and documentation links. Browser and web presentation: browser cards show actual API docs, OpenAPI pages, hosted demos, and repositories.\n\nDATA & MODULES: real contribution velocity radar, language distribution, and GitHub stats. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase, socials. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: request path packets move along SVG connectors, service nodes pulse in sequence. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po08\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Backend API Cartographer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Backend",
                  "role": "Backend engineer and distributed API developer",
                  "bio": "a service map with endpoints, queues, database nodes, and directional request arrows",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar, language distrib"
            },
            "theme": "dark",
            "accentColor": "#153E5C",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po08-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Backend API Cartographer",
                              "color": "153E5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po08-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Backend API Cartographer",
                              "color": "153E5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po08-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Backend API Cartographer",
                              "color": "153E5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po08-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Backend API Cartographer",
                              "color": "153E5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po08-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Backend API Cartographer",
                              "color": "153E5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po08-socials-6",
                  "type": "socials",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Backend API Cartographer",
                              "color": "153E5C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po09",
    name: "Mobile Cross-Platform Engineer",
    description: "Designed for mobile developer working across iOS and Android. Featuring a pair of overlapping phone silhouettes with a shared cross-platform code bridge.",
    category: "polyglot",
    accent: "#2F80ED",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Mobile Cross-Platform Engineer\" for a mobile developer working across iOS and Android. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: app blue #2F80ED, emerald #34A77A, graphite #293342, and white. Hero illustration: a pair of overlapping phone silhouettes with a shared cross-platform code bridge. Layout: device-frame hero, mobile stack, App Store/Play Store projects, release notes, and activity section. Browser and web presentation: browser-verify app listing and web demo pages; provide actual platform links and release status.\n\nDATA & MODULES: real contribution heatmap, language donut, and verified WakaTime data. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: screen cards tilt subtly, app icons float, and status bar indicators pulse. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po09\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Mobile Cross-Platform Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Mobile",
                  "role": "Mobile developer working across iOS and Android",
                  "bio": "a pair of overlapping phone silhouettes with a shared cross-platform code bridge",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and ver"
            },
            "theme": "dark",
            "accentColor": "#2F80ED",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po09-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Cross-Platform Engineer",
                              "color": "2F80ED",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po09-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Cross-Platform Engineer",
                              "color": "2F80ED",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po09-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Cross-Platform Engineer",
                              "color": "2F80ED",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po09-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Cross-Platform Engineer",
                              "color": "2F80ED",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po09-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Cross-Platform Engineer",
                              "color": "2F80ED",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po09-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Mobile Cross-Platform Engineer",
                              "color": "2F80ED",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po10",
    name: "AI & ML Engineer",
    description: "Designed for machine learning engineer building practical AI systems. Featuring a neural network brain built from connected vector nodes and a small model card.",
    category: "polyglot",
    accent: "#8A6BE8",
    prompt: "Create a production-grade GitHub Profile README archetype named \"AI & ML Engineer\" for a machine learning engineer building practical AI systems. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: midnight #171D3A, neural violet #8A6BE8, neon lime #B7E36A, and silver #E5E9F2. Hero illustration: a neural network brain built from connected vector nodes and a small model card. Layout: AI identity hero, model/tool matrix, model projects, paper links, and a compact experiment dashboard. Browser and web presentation: browser-research public model cards, Hugging Face Spaces, benchmark reports, and paper sources.\n\nDATA & MODULES: real contribution calendar, language donut, verified Kaggle stats, and WakaTime only when configured. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: neural nodes pulse, inference path sweeps, and a model-status indicator blinks. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po10\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "AI & ML Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "AI",
                  "role": "Machine learning engineer building practical AI systems",
                  "bio": "a neural network brain built from connected vector nodes and a small model card",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution calendar, language donut, verifi"
            },
            "theme": "dark",
            "accentColor": "#8A6BE8",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po10-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI & ML Engineer",
                              "color": "8A6BE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po10-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI & ML Engineer",
                              "color": "8A6BE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po10-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI & ML Engineer",
                              "color": "8A6BE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po10-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI & ML Engineer",
                              "color": "8A6BE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po10-waka-readme-stats-5",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI & ML Engineer",
                              "color": "8A6BE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po10-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI & ML Engineer",
                              "color": "8A6BE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po10-projects-showcase-7",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "AI & ML Engineer",
                              "color": "8A6BE8",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po11",
    name: "Data Engineering Pipeline",
    description: "Designed for data engineer building reliable streaming and batch systems. Featuring a left-to-right data pipeline with stream, warehouse, and analytics nodes.",
    category: "polyglot",
    accent: "#123C47",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Data Engineering Pipeline\" for a data engineer building reliable streaming and batch systems. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep teal #123C47, pipeline orange #F28C45, cyan #42B8C6, and cloud white #F4F7F8. Hero illustration: a left-to-right data pipeline with stream, warehouse, and analytics nodes. Layout: pipeline hero, platform/tool layers, project case studies, data sources, and skills matrix. Browser and web presentation: browser cards link to actual dashboards, pipelines, dataset docs, and workflow repositories.\n\nDATA & MODULES: real contribution heatmap, language donut, and WakaTime when connected. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: data packets move across pipes, warehouse cylinder has a subtle highlight. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po11\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Data Engineering Pipeline Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Data",
                  "role": "Data engineer building reliable streaming and batch systems",
                  "bio": "a left-to-right data pipeline with stream, warehouse, and analytics nodes",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and Wak"
            },
            "theme": "dark",
            "accentColor": "#123C47",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po11-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Engineering Pipeline",
                              "color": "123C47",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po11-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Engineering Pipeline",
                              "color": "123C47",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po11-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Engineering Pipeline",
                              "color": "123C47",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po11-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Engineering Pipeline",
                              "color": "123C47",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po11-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Engineering Pipeline",
                              "color": "123C47",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po11-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Data Engineering Pipeline",
                              "color": "123C47",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po12",
    name: "Database Internals Specialist",
    description: "Designed for database engineer and storage systems developer. Featuring a database cylinder opened into indexed pages, query paths, and storage blocks.",
    category: "polyglot",
    accent: "#333B73",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Database Internals Specialist\" for a database engineer and storage systems developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: indigo #333B73, emerald #3EAD8C, pale gray #E9EDF5, and graphite #2D3544. Hero illustration: a database cylinder opened into indexed pages, query paths, and storage blocks. Layout: database hero, engines and storage skills, performance projects, architecture notes, and stats. Browser and web presentation: browser-link verified database docs, benchmark suites, schema tools, and project demos.\n\nDATA & MODULES: real contribution velocity radar, heatmap, and language breakdown. Build the section sequence from these registered MonoForge plugin IDs where relevant: telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: index paths illuminate, record blocks shift subtly, and query cursor blinks. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po12\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Database Internals Specialist Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Database",
                  "role": "Database engineer and storage systems developer",
                  "bio": "a database cylinder opened into indexed pages, query paths, and storage blocks",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution velocity radar, heatmap, and lan"
            },
            "theme": "dark",
            "accentColor": "#333B73",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po12-telemetry-isocalendar-1",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Database Internals Specialist",
                              "color": "333B73",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po12-pie-chart-2",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Database Internals Specialist",
                              "color": "333B73",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po12-github-readme-stats-3",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Database Internals Specialist",
                              "color": "333B73",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po12-skill-icons-4",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Database Internals Specialist",
                              "color": "333B73",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po12-projects-showcase-5",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Database Internals Specialist",
                              "color": "333B73",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po13",
    name: "Embedded IoT Firmware Engineer",
    description: "Designed for embedded systems developer and firmware engineer. Featuring a microcontroller board with annotated pins, signal traces, and an oscilloscope line.",
    category: "polyglot",
    accent: "#27323C",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Embedded IoT Firmware Engineer\" for a embedded systems developer and firmware engineer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: graphite #27323C, oscilloscope cyan #38BDF8, amber #F5B942, and circuit green #53C59B. Hero illustration: a microcontroller board with annotated pins, signal traces, and an oscilloscope line. Layout: hardware-first hero, MCU/RTOS stack, firmware repositories, hardware builds, and contribution strip. Browser and web presentation: browser cards link to actual board schematics, firmware docs, release binaries, and demos.\n\nDATA & MODULES: real contribution heatmap, language donut, and verified WakaTime metrics. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, waka-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: signal waveform sweeps, board LED blinks, and tiny telemetry pulses. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po13\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Embedded IoT Firmware Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Embedded",
                  "role": "Embedded systems developer and firmware engineer",
                  "bio": "a microcontroller board with annotated pins, signal traces, and an oscilloscope line",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and ver"
            },
            "theme": "dark",
            "accentColor": "#27323C",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po13-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Embedded IoT Firmware Engineer",
                              "color": "27323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po13-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Embedded IoT Firmware Engineer",
                              "color": "27323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po13-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Embedded IoT Firmware Engineer",
                              "color": "27323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po13-waka-readme-stats-4",
                  "type": "waka-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Embedded IoT Firmware Engineer",
                              "color": "27323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po13-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Embedded IoT Firmware Engineer",
                              "color": "27323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po13-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Embedded IoT Firmware Engineer",
                              "color": "27323C",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po14",
    name: "Web3 Protocol Engineer",
    description: "Designed for smart contract and decentralized protocol developer. Featuring a chain of cryptographic blocks connected by a glowing protocol ring.",
    category: "polyglot",
    accent: "#41C7C7",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Web3 Protocol Engineer\" for a smart contract and decentralized protocol developer. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: deep indigo #24245C, chain cyan #41C7C7, token gold #E4B64E, and cloud #F4F4F8. Hero illustration: a chain of cryptographic blocks connected by a glowing protocol ring. Layout: protocol hero, language/network stack, audited projects, documentation, and community links. Browser and web presentation: browser-research audited contracts, explorers, docs, and deployed apps; include chain/network and source links.\n\nDATA & MODULES: real contribution heatmap, language donut, and repository stats; TVL/token figures only from verified sources. Build the section sequence from these registered MonoForge plugin IDs where relevant: capsule-banner, telemetry-isocalendar, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: block chain nodes connect, transaction dots travel, and ring pulses slowly. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po14\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Web3 Protocol Engineer Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Web3",
                  "role": "Smart contract and decentralized protocol developer",
                  "bio": "a chain of cryptographic blocks connected by a glowing protocol ring",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real contribution heatmap, language donut, and rep"
            },
            "theme": "dark",
            "accentColor": "#41C7C7",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po14-capsule-banner-1",
                  "type": "capsule-banner",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Web3 Protocol Engineer",
                              "color": "41C7C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po14-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Web3 Protocol Engineer",
                              "color": "41C7C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po14-pie-chart-3",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Web3 Protocol Engineer",
                              "color": "41C7C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po14-github-readme-stats-4",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Web3 Protocol Engineer",
                              "color": "41C7C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po14-skill-icons-5",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Web3 Protocol Engineer",
                              "color": "41C7C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po14-projects-showcase-6",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Web3 Protocol Engineer",
                              "color": "41C7C7",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
  {
    id: "po15",
    name: "Polyglot Language Constellation",
    description: "Designed for multi-language software engineer and open-source generalist. Featuring a constellation where each language is a distinct star cluster connected to a central developer identity.",
    category: "polyglot",
    accent: "#F27D72",
    prompt: "Create a production-grade GitHub Profile README archetype named \"Polyglot Language Constellation\" for a multi-language software engineer and open-source generalist. The design must be immediately recognisable and must not look like a recolour of another template.\n\nART DIRECTION: Use this exact visual system: coral #F27D72, azure #3986C8, emerald #39A77A, violet #8C6BD8, and midnight #222A3A. Hero illustration: a constellation where each language is a distinct star cluster connected to a central developer identity. Layout: central constellation hero, grouped language orbit cards, project clusters, and compact contribution metrics. Browser and web presentation: browser tabs group verified projects by language and show real repositories, demos, and documentation.\n\nDATA & MODULES: real language donut, 3D isometric contribution calendar, and activity heatmap. Build the section sequence from these registered MonoForge plugin IDs where relevant: readme-typing-svg, telemetry-isocalendar, portfolio-contributions, pie-chart, github-readme-stats, skill-icons, projects-showcase. Use the profile owner’s real GitHub username and verified profile information. Include a concise role headline, a human bio, a purposeful current-focus line, grouped skill icons, selected repositories/projects, and appropriate social links. Keep the section hierarchy intentional; do not add every widget merely because it exists.\n\nMOTION & SVG: star nodes brighten by category, orbital lines rotate slowly, and typing headline cycles. Create bespoke native SVG artwork, not generic clip-art. Add layered gradients, clean geometry, thoughtful negative space, careful typography, small status indicators, and one signature visual motif. Use motion only to support the concept.\n\nBROWSER & RESPONSIVE QA: Treat the browser preview as a first-class deliverable. Review the rendered README in desktop, mobile, and MonoForge’s Cyber CRT preview modes. For external research, inspect only public URLs supplied by the user or explicitly approved by them; verify project names, descriptions, release links, papers, and demos before adding them. Never invent a live demo, metric, certification, employer, project result, or social account.\n\nREAL-DATA RULE: Contribution visuals must use live GitHub-backed data, never a hand-drawn or simulated sine-wave chart. Prefer the real 3D isometric calendar, annual 52-week heatmap, or contributor velocity/streak radar. WakaTime, LeetCode, PageSpeed/Core Web Vitals, visitor counts, trophies, and project metrics must be omitted or clearly marked unavailable when their source is not configured.\n\nMONOFORGE OUTPUT: Return a valid TemplateItem with id \"po15\", name, category \"polyglot\", description, accent, prompt, and a valid ReadmeConfig JSON object. Keep the config compatible with ReadmeConfigSchema: version, title, settings.user (github, name, role, bio, location, pronouns, status), settings.theme (light/dark/auto), accentColor, badgeStyle, align, and sections [{id,type,props:{content,styles,state}}]. Use only plugin IDs registered in src/lib/plugins/registry.ts. Provide 4–8 thoughtfully selected sections, with unique IDs and valid content fields. Do not use guessed plugin IDs or unsupported props. Use user input instead of placeholder personal claims.\n\nGITHUB SVG SAFETY: Every custom animated SVG must be self-contained and Camo-safe: zero <script>, zero <foreignObject>, no external @import or web fonts, native SVG text, a valid viewBox, preserveAspectRatio=\"xMidYMid meet\", transform-box:fill-box, transform-origin:center, and CSS @keyframes that animate transform/opacity only. Add prefers-reduced-motion and prefers-color-scheme light fallbacks. Keep the visual payload lean and validate it before export.\n\nFINISH: Deliver a copy-pasteable README structure, the machine-readable config, a concise section rationale, and a preview checklist. The finished profile should feel bespoke, credible, readable, accessible, and visually memorable.",
    config: {
      "version": "1.0.0",
      "title": "Polyglot Language Constellation Profile",
      "settings": {
            "user": {
                  "github": "octocat",
                  "name": "Polyglot",
                  "role": "Multi-language software engineer and open-source generalist",
                  "bio": "a constellation where each language is a distinct star cluster connected to a central developer identity",
                  "location": "Global / Remote",
                  "pronouns": "they/them",
                  "status": "real language donut, 3D isometric contribution cal"
            },
            "theme": "dark",
            "accentColor": "#F27D72",
            "badgeStyle": "flat",
            "align": "left"
      },
      "sections": [
            {
                  "id": "po15-readme-typing-svg-1",
                  "type": "readme-typing-svg",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Polyglot Language Constellation",
                              "color": "F27D72",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po15-telemetry-isocalendar-2",
                  "type": "telemetry-isocalendar",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Polyglot Language Constellation",
                              "color": "F27D72",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po15-portfolio-contributions-3",
                  "type": "portfolio-contributions",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Polyglot Language Constellation",
                              "color": "F27D72",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po15-pie-chart-4",
                  "type": "pie-chart",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Polyglot Language Constellation",
                              "color": "F27D72",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po15-github-readme-stats-5",
                  "type": "github-readme-stats",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Polyglot Language Constellation",
                              "color": "F27D72",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po15-skill-icons-6",
                  "type": "skill-icons",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Polyglot Language Constellation",
                              "color": "F27D72",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            },
            {
                  "id": "po15-projects-showcase-7",
                  "type": "projects-showcase",
                  "props": {
                        "content": {
                              "username": "octocat",
                              "title": "Polyglot Language Constellation",
                              "color": "F27D72",
                              "theme": "radical",
                              "showIcons": true,
                              "perLine": 12
                        },
                        "styles": {},
                        "state": "default"
                  }
            }
      ]
},
  },
];
