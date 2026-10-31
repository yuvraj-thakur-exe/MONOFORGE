'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function StudioCursor() {
  const pathname = usePathname();
  const isDeveloperPage = pathname?.includes('/developer');

  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
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

        // Subtle interactive hover state (buttons, links, controls) without text popups
        const isClickable = Boolean(
          target.closest('button, a, [role="button"], .btn-tactile, .tab-pill, [data-draggable]')
        );
        setIsInteractive(isClickable);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth physics lerp loop for the trailing ring
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 2.0);
      lastTime = time;

      // Spring trailing physics: 0.20 lerp factor
      const lerpFactor = 0.20 * dt;
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
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  // Don't render on developer page or when invisible or inside code/text editor
  if (!isVisible || isDeveloperPage || isTextInput) return null;

  return (
    <>
      {/* 1. Precision Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform hidden md:block"
        style={{ transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)` }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
            isInteractive
              ? 'w-1.5 h-1.5 bg-[#ffe600] ring-1 ring-neutral-900 shadow-2xs'
              : 'w-1.5 h-1.5 bg-neutral-950'
          }`}
        />
      </div>

      {/* 2. Fluid Trailing Circle Follower (Clean, Subtle, No Text Bubbles) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden md:block"
        style={{ transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)` }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 ease-out ${
            isInteractive
              ? 'w-9 h-9 border-[#ffe600] bg-[#ffe600]/15 shadow-sm scale-110'
              : isClicking
              ? 'w-5 h-5 border-neutral-950 bg-neutral-950/20 scale-90'
              : 'w-7 h-7 border-neutral-900/50 bg-transparent scale-100 shadow-2xs'
          }`}
        />
      </div>
    </>
  );
}
