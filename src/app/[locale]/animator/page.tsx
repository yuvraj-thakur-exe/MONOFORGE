import { redirect } from 'next/navigation';

export default async function LocalizedAnimatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/docs/guides/svg-animator`);
}
