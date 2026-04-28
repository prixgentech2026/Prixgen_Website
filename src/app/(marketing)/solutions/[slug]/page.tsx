import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { solutionsData, PageData } from '@/lib/data';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return solutionsData.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const solution = solutionsData.find((s) => s.slug === params.slug);
  if (!solution) return {};
  return {
    title: `${solution.title} | Prixgen Enterprise`,
    description: solution.seo.metaDesc,
  };
}

export default function SolutionPage({ params }: PageProps) {
  const solution = solutionsData.find((s) => s.slug === params.slug);
  
  if (!solution) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <JsonLd 
        type="Service" 
        data={{ 
          name: solution.title, 
          description: solution.seo?.metaDesc,
          provider: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />

      {/* Breadcrumbs & Header */}
      <div className="bg-prixgen-gray/50 py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-prixgen-dark/50 mb-4">
            <Link href="/" className="hover:text-prixgen-blue">Home</Link> / 
            <Link href="/solutions" className="mx-2 hover:text-prixgen-blue">Solutions</Link> / 
            <span className="ml-2 text-prixgen-blue font-medium">{solution.title}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold text-prixgen-blue max-w-4xl leading-tight">
            {solution.headline}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <article className="lg:col-span-2">
          {solution.featuredImage?.sourceUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
              <OptimizedImage
                src={solution.featuredImage.sourceUrl}
                alt={solution.featuredImage.altText || solution.title}
                fill
                priority
              />
            </div>
          )}
          
          <div 
            dangerouslySetInnerHTML={{ __html: solution.content }} 
            className="prose prose-xl max-w-none prose-headings:text-prixgen-blue prose-a:text-prixgen-lightblue"
          />
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-prixgen-gray shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
              <p className="text-prixgen-dark/60 text-sm mb-6">
                Get a personalized roadmap for implementing {solution.title} in your enterprise.
              </p>
              <LeadCaptureForm source={`Solution: ${solution.title}`} />
            </div>

            <div className="bg-prixgen-blue p-8 rounded-2xl text-white shadow-xl">
              <h4 className="text-xl font-bold mb-4">Scale Your Intelligence</h4>
              <p className="text-white/70 text-sm mb-6">
                Speak with our {solution.title.includes('AI') ? 'AI Specialists' : 'ERP Architects'} about your global deployment.
              </p>
              <Button variant="secondary" className="w-full bg-white text-prixgen-blue hover:bg-gray-100">
                Contact Strategy Team
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
