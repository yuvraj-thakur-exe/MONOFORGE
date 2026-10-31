'use client';

/**
 * Route Transition Loading Screen
 * Lightweight, fast, branded loading state for route transitions and async page boundaries.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md p-4 font-sans text-neutral-900 dark:text-neutral-100"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b08_1px,transparent_1px),linear-gradient(to_bottom,#18181b08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Branded Loading Box */}
      <div className="relative w-full max-w-xs p-6 rounded-2xl bg-white dark:bg-[#121216] border-2 border-neutral-900 dark:border-neutral-800 shadow-[6px_6px_0px_#18181b] dark:shadow-[6px_6px_0px_#000] text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Monkey Badge */}
        <div className="relative mx-auto w-14 h-14 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center p-2 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,230,0,0.5)]"
            fill="none"
          >
            <polygon
              points="512,195 719,310 774,493 594,733 430,733 250,493 305,310"
              stroke="#FFE600"
              strokeWidth="42"
              strokeLinejoin="miter"
              fill="none"
            />
            <path
              d="M 512 393 L 622 342 L 696 415 L 650 545 L 644 650 M 512 393 L 400 342 L 327 415 L 373 545 L 379 650"
              stroke="#FFE600"
              strokeWidth="38"
              fill="none"
            />
            <circle cx="424" cy="459" r="32" fill="#FFE600" />
            <circle cx="598" cy="459" r="32" fill="#FFE600" />
            <path d="M 453 507 L 512 558 L 571 507" stroke="#FFE600" strokeWidth="38" fill="none" />
            <line x1="512" y1="558" x2="512" y2="626" stroke="#FFE600" strokeWidth="38" />
            <path d="M 432 651 L 512 626 L 592 651" stroke="#FFE600" strokeWidth="38" fill="none" />
          </svg>
        </div>

        {/* Brand & Status Text */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping" />
            <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-900 dark:text-neutral-100 uppercase">
              Mono<span className="text-amber-500">Forge</span>
            </h3>
          </div>
          <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            Preparing workspace...
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#FFE600] rounded-full animate-pulse shadow-[0_0_8px_#FFE600]" />
        </div>
      </div>
    </div>
  );
}
