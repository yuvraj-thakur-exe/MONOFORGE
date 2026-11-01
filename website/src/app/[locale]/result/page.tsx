import { redirect } from 'next/navigation';

export default async function LocalizedResultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/templates`);
}
