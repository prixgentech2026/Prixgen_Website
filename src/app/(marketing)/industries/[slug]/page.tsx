import { notFound } from 'next/navigation';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';
import { industriesData, PageData } from '@/lib/data';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { AmbientGlow } from '@/components/animations/ambient-glow';

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
  return {
    title: industry?.seo.title,
    description: industry?.seo.metaDesc,
  };
}

export default function IndustryPage({ params }: PageProps) {
  const industry = industriesData.find((i) => i.slug === params.slug);
  
  if (!industry) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      <AmbientGlow />
      <JsonLd 
        type="Article" 
        data={{ 
          headline: industry.title, 
          description: industry.seo?.metaDesc,
          publisher: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <article className="lg:col-span-2 space-y-12">
            <header className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue text-sm font-bold tracking-widest uppercase">
                Industry Sector
              </div>
              <StaggerText 
                text={industry.title} 
                variant="gradient"
                className="text-5xl lg:text-7xl font-extrabold leading-tight" 
              />
              <FadeUp delay={0.2}>
                <p className="text-2xl text-prixgen-dark/60 font-medium">
                  {industry.headline}
                </p>
              </FadeUp>
            </header>

            {industry.featuredImage?.sourceUrl && (
              <FadeUp delay={0.2} className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
                <OptimizedImage
                  src={industry.featuredImage.sourceUrl}
                  alt={industry.featuredImage.altText || industry.title}
                  fill
                  priority
                />
              </FadeUp>
            )}
            
            <FadeUp delay={0.3}>
              <div 
                dangerouslySetInnerHTML={{ __html: industry.content }} 
                className="prose prose-xl max-w-none prose-headings:text-prixgen-blue"
              />
            </FadeUp>
          </article>

          <aside className="lg:col-span-1">
            <FadeUp delay={0.4} className="bg-prixgen-gray p-10 rounded-3xl sticky top-24 border border-prixgen-blue/5 shadow-xl">
              <h3 className="text-3xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
              <p className="text-prixgen-dark/60 mb-8 leading-relaxed">
                Discover how Prixgen can modernize your {industry.title.toLowerCase()} operations and eliminate technical debt.
              </p>
              <LeadCaptureForm source={`Industry: ${industry.title}`} />
            </FadeUp>
          </aside>
        </div>
      </div>
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <article className="lg:col-span-2">
          {industry.featuredImage?.sourceUrl && (
            <FadeUp delay={0.2} className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
              <OptimizedImage
                src={industry.featuredImage.sourceUrl}
                alt={industry.featuredImage.altText || industry.title}
                fill
                priority
              />
            </FadeUp>
          )}
          <FadeUp delay={0.3}>
            <div 
              dangerouslySetInnerHTML={{ __html: industry.content }} 
              className="prose prose-xl max-w-none prose-headings:text-prixgen-blue"
            />
          </FadeUp>
        </article>

        <aside className="lg:col-span-1">
          <FadeUp delay={0.4} className="bg-prixgen-gray p-10 rounded-3xl sticky top-24 border border-prixgen-blue/5 shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
            <p className="text-prixgen-dark/60 mb-8 leading-relaxed">
              Discover how Prixgen can modernize your {industry.title.toLowerCase()} operations and eliminate technical debt.
            </p>
            <LeadCaptureForm source={`Industry: ${industry.title}`} />
          </FadeUp>
        </aside>
      </div>
    </div>
  );
}
