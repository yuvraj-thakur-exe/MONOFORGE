'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Star, Github, ExternalLink } from 'lucide-react';
import { playClickSound } from '#/lib/sound/sound-effects';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is MonoForge?',
    answer:
      'MonoForge is an open-source platform for creating, customizing, and managing GitHub profile READMEs with visual editing, developer telemetry, animated SVG graphics, and safe GitHub synchronization.',
  },
  {
    question: 'Is MonoForge free?',
    answer:
      'Yes. MonoForge is 100% free and open-source, released under the permissive MIT License for all developers worldwide.',
  },
  {
    question: 'Do I need coding knowledge?',
    answer:
      'No. You can select from 75+ battle-tested curated archetypes, customize 47+ live telemetry metrics, and craft 60fps vector SVGs with 1-click copy-paste precision.',
  },
  {
    question: 'Can I use the generated components in my GitHub README?',
    answer:
      'Yes. MonoForge generates embeddable Markdown and 60fps Camo-compliant SVG components specifically architected for GitHub profile READMEs without external server dependencies.',
  },
  {
    question: 'Does MonoForge support automated updates?',
    answer:
      'Yes. GitHub Actions integration can generate and synchronize telemetry on scheduled cron runs, manual triggers, or repository pushes with zero maintenance.',
  },
  {
    question: 'Can I review changes before pushing them?',
    answer:
      'Yes. GitHub synchronization enforces an explicit confirmation-gated workflow with a side-by-side git diff review before committing anything to your repository.',
  },
  {
    question: 'Can organizations use MonoForge?',
    answer:
      'Yes. The telemetry engine and visual components support individual developer profiles as well as GitHub organizations, teams, and open-source projects.',
  },
];

export function NomokeyManifesto() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleIdx = (idx: number) => {
    playClickSound();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative bg-[#fafbfc] dark:bg-[#1e293b]/50 border-b-2 border-slate-300 dark:border-slate-700 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-200">
      {/* Google Rich Snippet FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Manifesto Block */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1e293b] shadow-[5px_5px_0px_#334155] dark:shadow-[5px_5px_0px_#475569] space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
            <span className="px-2 py-0.5 rounded bg-[#ffe600] text-slate-950 font-black border border-slate-400 shadow-2xs">
              [ 07 // THE MONOFORGE MANIFESTO ]
            </span>
            <span>NO MONKEY BUSINESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[1.05] font-sans">
            FIRST IMPRESSIONS ON GITHUB ARE PERMANENT. STOP SETTLING FOR BORING.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-mono leading-relaxed text-slate-700 dark:text-slate-300">
            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-[2px_2px_0px_#334155]">
              <span className="text-amber-600 dark:text-amber-400 font-black block text-sm">01 / CRAFT</span>
              <p>
                We believe engineering excellence should be visible at first glance. Generic bulleted READMEs fail to communicate the caliber of your technical skill.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-[2px_2px_0px_#334155]">
              <span className="text-sky-600 dark:text-sky-400 font-black block text-sm">02 / INTEGRITY</span>
              <p>
                No third-party trackers, no tracking cookies, no fragile third-party CDNs that break when maintainers abandon them. 100% self-hosted &amp; open-source.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-[2px_2px_0px_#334155]">
              <span className="text-emerald-600 dark:text-emerald-400 font-black block text-sm">03 / VELOCITY</span>
              <p>
                From curated archetype selection to one-click confirmed GitHub commit in under 60 seconds. Precision tooling without friction.
              </p>
            </div>
          </div>
        </div>

        {/* Technical FAQ Accordion */}
        <div className="space-y-6">
          <div className="space-y-2 pb-2">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 stroke-[2.2]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <span className="hidden sm:inline">7 QUESTIONS ANSWERED</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-950 dark:text-white font-sans tracking-tight">
              EVERYTHING YOU NEED TO KNOW
            </h3>

            <div className="border-b-2 border-black dark:border-slate-700 pt-2" />
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-black dark:border-slate-650 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#334155] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleIdx(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full px-6 sm:px-7 py-4.5 sm:py-5 text-left flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <span className="font-sans font-bold pr-4 text-slate-950 dark:text-white text-base sm:text-lg tracking-tight">
                      {faq.question}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-2 border-black bg-[#ffe600] shrink-0 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <ChevronDown
                        className={`w-5 h-5 text-black stroke-[2.5] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="px-6 sm:px-7 pb-6 pt-3 text-sm sm:text-base font-sans text-slate-700 dark:text-slate-300 leading-relaxed border-t-2 border-black/10 dark:border-white/10 animate-in fade-in duration-150"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* GitHub Star Recommendation & Open-Source Community Banner */}
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent dark:from-amber-500/15 dark:via-slate-800 dark:to-[#1e293b] shadow-[4px_4px_0px_#f59e0b] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffe600] text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider border border-slate-400">
              <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
              <span>COMMUNITY RECOMMENDATION</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase font-sans">
              LOVE MONOFORGE? STAR THE REPOSITORY!
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed w-full">
              MonoForge is completely free and open-source. Help us empower thousands of developers by giving the repo a star on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-[#ffe600] dark:hover:bg-amber-400 dark:text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide border-2 border-slate-900 shadow-[3px_3px_0px_#334155] dark:shadow-[3px_3px_0px_#f59e0b] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer shrink-0"
          >
            <Github className="w-4 h-4" />
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 dark:fill-slate-950 dark:text-slate-950" />
            <span>STAR ON GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default NomokeyManifesto;
