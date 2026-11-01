'use client';

import React, { useEffect, useState } from 'react';

interface KineticTypewriterProps {
  words: string[];
  prefix?: string;
  suffix?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

/**
 * High-performance kinetic typewriter text animation with zero hydration mismatch.
 * Cycles smoothly through developer phrases and titles.
 */
export function KineticTypewriter({
  words,
  prefix = '',
  suffix = '',
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1800,
  className = '',
}: KineticTypewriterProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !words.length) return;

    const currentWord = words[currentWordIdx % words.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIdx((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIdx, words, typingSpeed, deletingSpeed, pauseDuration, mounted]);

  if (!mounted) {
    return (
      <span className={className}>
        {prefix}
        <span>{words[0] || ''}</span>
        {suffix}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span className="relative">
        <span className="font-bold tracking-tight">{displayText}</span>
        <span
          aria-hidden="true"
          className="inline-block w-[3px] h-[1.1em] ml-1 bg-amber-400 dark:bg-amber-300 align-middle animate-pulse rounded-xs"
        />
      </span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

interface KineticGradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

/**
 * Animated gradient sweep text effect for main hero headlines.
 */
export function KineticGradientText({
  children,
  className = '',
  from = 'from-amber-500',
  via = 'via-amber-400',
  to = 'to-indigo-500',
}: KineticGradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease-in-out_infinite] font-black ${className}`}
    >
      {children}
    </span>
  );
}

