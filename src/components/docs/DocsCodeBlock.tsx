'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface DocsCodeBlockProps {
  language?: string;
  code: string;
  filename?: string;
}

export function DocsCodeBlock({ language = 'bash', code, filename }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#0f172a] overflow-hidden shadow-lg font-mono text-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 text-slate-400 select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-[11px] text-slate-300">
              {filename || language.toUpperCase()}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 sm:p-5 overflow-x-auto text-[#e2e8f0] leading-relaxed select-text font-mono text-[12.5px] scrollbar">
        <pre className="m-0 p-0">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
