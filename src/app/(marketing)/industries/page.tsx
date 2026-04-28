import { Metadata } from 'next';
import Link from 'next/link';
import { industriesData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';

export const metadata: Metadata = {
  title: "Industries | Enterprise ERP Solutions for Global Sectors",
  description: "Explore how Prixgen Enterprise architects unified ecosystems for Manufacturing, Chemicals, FMCG, Retail, and Dairy.",
};

export default function IndustriesIndexPage() {
  return (
    <div className="min-h-screen bg-prixgen-gray/20">
      <section className="bg-prixgen-dark text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Sectors We <span className="text-prixgen-lightblue">Transform.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
            We specialize in high-complexity, high-velocity industries where operational friction is the enemy of growth.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.map((industry) => (
            <Link 
              key={industry.slug} 
              href={`/industries/${industry.slug}`}
              className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-prixgen-gray"
            >
              <div className="relative h-64 overflow-hidden">
                {industry.featuredImage ? (
                  <OptimizedImage 
                    src={industry.featuredImage.sourceUrl} 
                    alt={industry.title}
                    fill
                    className="group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-prixgen-blue/10 flex items-center justify-center text-prixgen-blue text-4xl">
                    🏢
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-prixgen-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-prixgen-blue mb-4 group-hover:text-prixgen-lightblue transition-colors">
                  {industry.title}
                </h3>
                <p className="text-prixgen-dark/60 text-sm line-clamp-3 mb-6 leading-relaxed">
                   {industry.headline}
                </p>
                <div className="flex items-center text-prixgen-lightblue font-bold text-sm uppercase tracking-widest">
                  Explore Architecture <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
