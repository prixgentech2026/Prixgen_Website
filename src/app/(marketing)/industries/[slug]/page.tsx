import { notFound } from 'next/navigation';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';
import { industriesData } from '@/lib/data';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return industriesData.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const industry = industriesData.find((i) => i.slug === params.slug);
  if (!industry) return {};
  return {
    title: `${industry.title} | Prixgen Enterprise`,
    description: industry.seo.metaDesc,
  };
}

export default function IndustryPage({ params }: PageProps) {
  const industry = industriesData.find((i) => i.slug === params.slug);
  
  if (!industry) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <JsonLd 
        type="Article" 
        data={{ 
          headline: industry.title, 
          description: industry.seo?.metaDesc,
          publisher: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />

      <div className="bg-prixgen-dark text-white py-20">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-prixgen-lightblue transition-colors">Home</Link> / 
            <Link href="/industries" className="mx-2 hover:text-prixgen-lightblue transition-colors">Industries</Link> / 
            <span className="ml-2 text-prixgen-lightblue font-medium">{industry.title}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-5xl leading-tight">
            {industry.headline}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <article className="lg:col-span-2">
          {industry.featuredImage?.sourceUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
              <OptimizedImage
                src={industry.featuredImage.sourceUrl}
                alt={industry.featuredImage.altText || industry.title}
                fill
                priority
              />
            </div>
          )}
          <div 
            dangerouslySetInnerHTML={{ __html: industry.content }} 
            className="prose prose-xl max-w-none prose-headings:text-prixgen-blue"
          />
        </article>

        <aside className="lg:col-span-1">
          <div className="bg-prixgen-gray p-10 rounded-3xl sticky top-24 border border-prixgen-blue/5 shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
            <p className="text-prixgen-dark/60 mb-8 leading-relaxed">
              Discover how Prixgen can modernize your {industry.title.toLowerCase()} operations and eliminate technical debt.
            </p>
            <LeadCaptureForm source={`Industry: ${industry.title}`} />
          </div>
        </aside>
      </div>
    </div>
  );
}
