'use client';

import { useEffect, useRef, useState } from 'react';

export function StudioCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    // Only enable on desktop devices with fine pointer (mouse)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the center sharp dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        // If hovering over Monaco editor, text inputs, textareas, or code blocks, hide custom cursor
        const isText = Boolean(
          target.closest('.monaco-editor, .monaco-mouse-cursor-text, input, textarea, [contenteditable="true"], pre, code')
        );
        setIsTextInput(isText);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth physics lerp loop for the trailing ring without jarring click or scale distortions
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 2.0);
      lastTime = time;

      // Spring trailing physics: 0.22 lerp factor for smooth glide
      const lerpFactor = 0.22 * dt;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  // Don't render during SSR, when invisible, or inside code/text editor
  if (!mounted || !isVisible || isTextInput) return null;

  return (
    <>
      {/* 1. Precision Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform hidden md:block"
        style={{ transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)` }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-950 dark:bg-[#ffe600]" />
      </div>

      {/* 2. Fluid Trailing Circle Follower (Constant, Elegant, Zero Jarring Click Jumps) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden md:block"
        style={{ transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)` }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-neutral-900/40 dark:border-neutral-200/50 bg-neutral-900/5 dark:bg-white/5 shadow-2xs" />
      </div>
    </>
  );
}
