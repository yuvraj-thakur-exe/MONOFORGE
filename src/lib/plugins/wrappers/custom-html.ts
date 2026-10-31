import { Plugin, UserSettings } from '../types';

/**
 * Strips dangerous executable script tags and unsafe event handlers from markdown inputs
 * while safely preserving standard HTML elements, tables, divs, images, and anchors.
 */
function sanitizeCustomHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/<(?:script|iframe|object|embed|applet|style)[\s\S]*?<\/(?:script|iframe|object|embed|applet|style)>/gi, '')
    .replace(/<\/?(?:script|iframe|object|embed|applet|style|base|form)[\s\S]*?>/gi, '')
    .replace(/on\w+\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '');
}

export const customHtmlPlugin: Plugin = {
  id: 'custom-html',
  name: 'Custom HTML / Markdown Section',
  description: 'Embed custom sanitized HTML, formatted text, or markdown sections with alignment control.',
  author: 'MonoForge',
  repository: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
  category: 'widgets',
  icon: 'code',
  fields: [
    {
      name: 'content',
      label: 'HTML / Markdown Content',
      type: 'text',
      defaultValue: '<div align="center">\n  <h3>🚀 Continuous Innovation</h3>\n  <p>Crafting high-performance distributed systems and tactile developer tools.</p>\n</div>',
      placeholder: 'Enter sanitized HTML or Markdown...',
      required: true,
    },
    {
      name: 'align',
      label: 'Section Alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    content: '<div align="center">\n  <h3>🚀 Continuous Innovation</h3>\n  <p>Crafting high-performance distributed systems and tactile developer tools.</p>\n</div>',
    align: 'left',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const rawContent = (props.content as string) || (props.markdown as string) || (props.raw as string) || (props.text as string) || '';
    const safeContent = sanitizeCustomHtml(rawContent);

    if (!safeContent.trim()) {
      return '';
    }

    const align = (props.align as string) || settings.align || 'left';
    if (align === 'center' || align === 'right') {
      // If the content is not already wrapped in an aligned container
      if (!/<div\s+align=/i.test(safeContent) && !/<p\s+align=/i.test(safeContent)) {
        return `<div align="${align}">\n\n${safeContent}\n\n</div>`;
      }
    }

    return safeContent;
  },
};
