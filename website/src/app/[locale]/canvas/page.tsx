import { redirect } from 'next/navigation';

export default async function LocalizedCanvasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/templates`);
}
