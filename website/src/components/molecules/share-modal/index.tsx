'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Fields } from '#/components/molecules/fields';
import { Text } from '#/components/atoms/text';
import { Dialog } from '#/components/atoms/dialog';

import { config } from '#/config';
import { DEFAULT_SHARE_COPY, socials, type ShareSocialConfig } from './socials';

function SocialVectorIcon({ id }: { id: ShareSocialConfig['id'] }) {
  switch (id) {
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'reddit':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="14" r="7" />
          <path d="M12 7l2-4 4 1" />
          <circle cx="19" cy="4" r="1" />
          <circle cx="9.5" cy="13" r="1" />
          <circle cx="14.5" cy="13" r="1" />
          <path d="M9.5 16.5c1.5 1 3.5 1 5 0" />
        </svg>
      );
    case 'bluesky':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 10.5c-2.5-4.5-6.5-6.5-8.5-5.5s-1.5 6 .5 8.5c1.5 1.8 4 2.2 6 1.5-2 1-3.5 3-2.5 5s4 2 4.5-.5c.5 2.5 3.5 2.5 4.5.5s-.5-4-2.5-5c2 .7 4.5.3 6-1.5 2-2.5 2.5-7.5.5-8.5s-6 1-8.5 5.5z" />
        </svg>
      );
  }
}

export function ShareModal() {
  const t = useTranslations('ui');
  const shareUrl = config.general.urls.app;
  const [copied, setCopied] = useState(false);

  async function handleCopyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Share link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  }

  return (
    <Dialog.Content className="max-w-3xl">
      <Dialog.Header>
        <Dialog.Title>{t('share-modal.title')}</Dialog.Title>

        <Dialog.Close />
      </Dialog.Header>

      <Text.Paragraph>{t('share-modal.description')}</Text.Paragraph>

      <div className="my-md rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-xs font-mono text-slate-700 dark:text-slate-300">
        {DEFAULT_SHARE_COPY}
      </div>

      <div className="flex flex-wrap justify-center gap-lg my-lg">
        {socials.map(({ id, label, renderButton }) => (
          <div key={id} className="flex flex-col items-center gap-1.5">
            {renderButton({
              url: shareUrl,
              copy: DEFAULT_SHARE_COPY,
              className:
                'inline-flex items-center justify-center rounded-full size-14 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-amber-500 hover:text-amber-500 transition-colors duration-150 cursor-pointer',
              children: <SocialVectorIcon id={id} />,
            })}
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              {label}
            </span>
          </div>
        ))}
      </div>

      <Dialog.Footer className="relative">
        <Fields.Atoms.Input defaultValue={shareUrl} disabled />

        <button
          type="button"
          onClick={handleCopyToClipboard}
          aria-label="Copy share link"
          className="absolute top-0 right-md h-10 inline-flex items-center gap-1.5 px-2 text-xs font-mono hover:text-amber-500 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </Dialog.Footer>
    </Dialog.Content>
  );
}
