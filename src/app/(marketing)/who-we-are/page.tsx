import { client } from '@/sanity/lib/client';
import { aboutQuery } from '@/sanity/lib/queries';
import { WhoWeAreClient } from './who-we-are-client-v2';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = await client?.fetch(aboutQuery);
  return {
    title: data?.seo?.title || 'Who We Are | Prixgen',
    description: data?.seo?.metaDesc || 'Learn about Prixgen Tech Solutions and our expertise in ERP and IoT.',
  };
}

export default async function WhoWeArePage() {
  if (!client) {
    return <div>Sanity client not configured</div>;
  }

  const data = await client.fetch(aboutQuery);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">Content loading from Sanity...</p>
      </div>
    );
  }

  return <WhoWeAreClient data={data} />;
}
