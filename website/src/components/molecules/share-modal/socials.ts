import { createElement, type ComponentType, type ReactNode } from 'react';
import {
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  BlueskyShareButton,
} from 'react-share';

export const SHARE_HASHTAGS = ['GitHub', 'OpenSource', 'DevTools'] as const;

export const DEFAULT_SHARE_COPY =
  'Just forged my GitHub Profile README with MonoForge — 350+ curated archetypes, 30+ Camo-safe 60fps SVG visualizations & live telemetry! #GitHub #OpenSource #DevTools';

export interface ShareSocialConfig {
  id: 'x' | 'linkedin' | 'reddit' | 'bluesky';
  label: string;
  renderButton: (props: {
    url: string;
    copy: string;
    className: string;
    children: ReactNode;
  }) => ReactNode;
}

function wrapButton<P extends { url: string; className?: string; children?: ReactNode }>(
  Component: ComponentType<P>,
  buildProps: (url: string, copy: string) => Omit<P, 'url' | 'className' | 'children'>
): ShareSocialConfig['renderButton'] {
  return ({ url, copy, className, children }) => {
    const extra = buildProps(url, copy) as P;
    return createElement(Component, { ...extra, url, className }, children);
  };
}

export const socials: ShareSocialConfig[] = [
  {
    id: 'x',
    label: 'Share on X',
    renderButton: wrapButton(TwitterShareButton, (_url, copy) => ({
      title: copy.replace(/\s*#GitHub\s*#OpenSource\s*#DevTools\s*$/i, ''),
      hashtags: [...SHARE_HASHTAGS],
    })),
  },
  {
    id: 'linkedin',
    label: 'Share on LinkedIn',
    renderButton: wrapButton(LinkedinShareButton, (_url, copy) => ({
      title: 'MonoForge — GitHub Profile README Studio',
      summary: copy,
      source: 'MonoForge',
    })),
  },
  {
    id: 'reddit',
    label: 'Share on Reddit',
    renderButton: wrapButton(RedditShareButton, (_url, copy) => ({
      title: copy,
    })),
  },
  {
    id: 'bluesky',
    label: 'Share on Bluesky',
    renderButton: wrapButton(BlueskyShareButton, (_url, copy) => ({
      title: copy,
    })),
  },
];
