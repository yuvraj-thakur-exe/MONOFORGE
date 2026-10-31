'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function WizardRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const template = searchParams?.get('template');
    const target = template
      ? `/developer?mode=visual&template=${template}`
      : '/developer?mode=visual';
    router.replace(target);
  }, [router, searchParams]);

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center gap-3 font-mono text-xs text-neutral-600">
      <div className="w-6 h-6 border-2 border-neutral-900 border-t-[#ffe600] rounded-full animate-spin" />
      <span>Redirecting to MonoForge All-in-One Studio...</span>
    </div>
  );
}

export default function WizardRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-white flex items-center justify-center font-mono text-xs text-neutral-400">
          Loading Studio...
        </div>
      }
    >
      <WizardRedirectContent />
    </Suspense>
  );
}