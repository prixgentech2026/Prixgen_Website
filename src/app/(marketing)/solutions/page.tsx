import { Metadata } from 'next';
import Link from 'next/link';
import { getSolutions, PageData } from '@/lib/data';
import { OptimizedImage } from '@/components/ui/optimized-image';

export const metadata: Metadata = {
  title: "Solutions | Strategic ERP & AI Architectures",
  description: "Discover our specialized solutions including Odoo Enterprise, SAP Ecosystems, Microsoft Dynamics 365, and Lecca AI.",
};

export default async function SolutionsIndexPage() {
  const solutionsData = await getSolutions();
  return (
    <div className="min-h-screen">
      <section className="bg-prixgen-blue text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Engineered <span className="text-prixgen-lightblue">Solutions.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
            We don't just sell software. We engineer operational engines that empower global enterprises to scale without limits.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        {solutionsData.map((solution: PageData) => (
          <Link 
            key={solution.slug} 
            href={`/solutions/${solution.slug}`}
            className="group relative bg-prixgen-gray/30 rounded-[40px] p-10 flex flex-col justify-between hover:bg-prixgen-blue transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-sm font-bold text-prixgen-blue uppercase tracking-widest mb-4 group-hover:text-white/50 transition-colors">
                {solution.title.includes('AI') ? 'Proprietary Technology' : 'Enterprise ERP'}
              </div>
              <h3 className="text-4xl font-bold text-prixgen-blue mb-6 group-hover:text-white transition-colors">
                {solution.title}
              </h3>
              <p className="text-prixgen-dark/60 text-lg mb-8 group-hover:text-white/80 transition-colors leading-relaxed">
                {solution.headline}
              </p>
            </div>

            <div className="relative z-10 flex items-center text-prixgen-blue font-bold group-hover:text-white transition-colors">
              View Deployment Roadmap <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-prixgen-blue/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
          </Link>
        ))}
      </section>
    </div>
  );
}
