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
    <div className="my-5 rounded-xl border border-neutral-800 bg-[#0c0d0e] overflow-hidden shadow-md font-mono text-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800/80 bg-[#141517] text-neutral-400 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neutral-500" />
          <span className="font-bold text-[11px] text-neutral-300">
            {filename || language.toUpperCase()}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-[#e6edf3] leading-relaxed select-text font-mono text-[12.5px]">
        <pre className="m-0 p-0">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
