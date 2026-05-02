import { getAboutData } from '@/lib/data';
import { WhoWeAreClient } from './who-we-are-client';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutData();
  return {
    title: data?.seo?.title || 'Who We Are | Prixgen',
    description: data?.seo?.metaDesc || 'Learn about Prixgen Tech Solutions and our expertise in ERP and IoT.',
  };
}

export default async function WhoWeArePage() {
  const data = await getAboutData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">Content loading...</p>
      </div>
    );
  }

  return <WhoWeAreClient data={data} />;
}
