import { Plugin, UserSettings } from '../types';

export const footerPlugin: Plugin = {
  id: 'footer-block',
  name: 'Profile Footer Block',
  description: 'Clean concluding section with back-to-top anchor, social gateway, and attribution.',
  author: 'MonoForge',
  repository: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
  category: 'widgets',
  icon: 'layout',
  fields: [
    {
      name: 'tagline',
      label: 'Closing Tagline',
      type: 'text',
      defaultValue: 'Thanks for visiting! Feel free to reach out for collaborations or questions.',
      placeholder: 'Thanks for visiting!',
      required: false,
    },
    {
      name: 'showBackToTop',
      label: 'Include Back to Top link',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'showAttribution',
      label: 'Show MonoForge Attribution',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
  ],
  defaultConfig: {
    tagline: 'Thanks for visiting! Feel free to reach out for collaborations or questions.',
    showBackToTop: true,
    showAttribution: true,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const tagline = (props.tagline as string) || '';
    const showBackToTop = props.showBackToTop !== false;
    const showAttribution = props.showAttribution !== false;
    const align = settings.align || 'center';

    const lines: string[] = ['---'];
    const parts: string[] = [];

    if (tagline.trim()) {
      parts.push(`*${tagline.trim()}*`);
    }

    if (showBackToTop) {
      parts.push('[↑ Back to Top](#-hi-there-im--or-top)');
    }

    if (showAttribution) {
      parts.push('<sub>⚡ Crafted with <a href="https://monoforge-studio.vercel.app/en"><b>MonoForge</b></a> — Open-source GitHub Profile Studio</sub>');
      parts.push('<div align="right">\n  <a href="https://monoforge-studio.vercel.app/en" target="_blank" rel="noopener noreferrer">\n    <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/monoforge-stamp.svg" alt="Built with MonoForge" height="28" />\n  </a>\n</div>');
    }

    lines.push(`<div align="${align}">\n\n${parts.join('\n\n')}\n\n</div>`);
    return lines.join('\n\n');
  },
};
