import { Metadata } from 'next';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { getAboutData } from '@/lib/data';
import { PortableText } from '@/components/ui/portable-text';
import { JsonLd } from '@/components/seo/json-ld';

export async function generateMetadata() {
  const aboutData = await getAboutData();
  return {
    title: aboutData.seo.title,
    description: aboutData.seo.metaDesc,
  };
}

export default async function AboutPage() {
  const aboutData = await getAboutData();

  return (
    <div className="flex flex-col">
      <JsonLd 
        type="Article" 
        data={{ 
          title: aboutData.title, 
          description: aboutData.seo.metaDesc 
        }} 
      />

      {/* Hero */}
      <section className="bg-prixgen-dark text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-5xl">
            {aboutData.title}
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="prose prose-xl text-prixgen-dark/80 max-w-none">
            <PortableText value={aboutData.content} />
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-8">
            {aboutData.stats.slice(0, 2).map((stat: any, i: number) => (
              <div key={i}>
                <div className="text-4xl font-bold text-prixgen-blue mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-prixgen-dark/40 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <OptimizedImage
            src={aboutData.featuredImage.sourceUrl}
            alt={aboutData.featuredImage.altText || "The Prixgen Elite Team"}
            fill
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-prixgen-gray py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
          <h2 className="text-4xl font-bold text-prixgen-blue">Partner with Excellence</h2>
          <div className="bg-white p-12 rounded-3xl shadow-xl">
             <LeadCaptureForm source="About Us Page" />
          </div>
        </div>
      </section>
    </div>
  );
}
