import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { servicesData, PageData } from '@/lib/data';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | Prixgen Enterprise`,
    description: service.seo.metaDesc,
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <JsonLd 
        type="Service" 
        data={{ 
          name: service.title, 
          description: service.seo?.metaDesc,
          provider: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />

      {/* Hero Header */}
      <div className="bg-prixgen-blue text-white py-24">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> / 
            <Link href="/services" className="mx-2 hover:text-white transition-colors">Services</Link> / 
            <span className="ml-2 text-prixgen-lightblue font-medium">{service.title}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight max-w-4xl leading-tight">
            {service.headline}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
            Strategic architectural consulting and managed services for the high-velocity enterprise.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {service.featuredImage && (
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <OptimizedImage
                src={service.featuredImage.sourceUrl}
                alt={service.featuredImage.altText || service.title}
                fill
                priority
              />
            </div>
          )}
          <div 
            dangerouslySetInnerHTML={{ __html: service.content }} 
            className="prose prose-xl max-w-none prose-headings:text-prixgen-blue prose-p:text-prixgen-dark/80"
          />
        </article>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-prixgen-gray p-10 rounded-3xl sticky top-24 border border-prixgen-blue/5 shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
            <p className="text-prixgen-dark/60 mb-8 leading-relaxed">
              Our senior consultants will analyze your {service.title.toLowerCase()} stack and provide a comprehensive modernization roadmap.
            </p>
            <LeadCaptureForm source={`Service: ${service.title}`} />
          </div>
        </aside>
      </div>
    </div>
  );
}
