import { redirect } from 'next/navigation';

export default async function LocalizedWizardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/docs/guides/visual-studio`);
}
