'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AnimatorRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const config = searchParams?.get('c');
    const target = config
      ? `/developer?mode=animator&c=${config}`
      : '/developer?mode=animator';
    router.replace(target);
  }, [router, searchParams]);

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center gap-3 font-mono text-xs text-neutral-600">
      <div className="w-6 h-6 border-2 border-neutral-900 border-t-[#ffe600] rounded-full animate-spin" />
      <span>Redirecting to MonoForge Vector Animator...</span>
    </div>
  );
}

export default function AnimatorRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-white flex items-center justify-center font-mono text-xs text-neutral-400">
          Loading Vector Animator...
        </div>
      }
    >
      <AnimatorRedirectContent />
    </Suspense>
  );
}