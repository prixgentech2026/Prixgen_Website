import { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/lib/data';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Services | Strategic IT & Supply Chain Consulting",
  description: "Prixgen Enterprise provides deep architectural audits, supply chain consulting, IIoT engineering, and managed cloud infrastructure.",
};

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-prixgen-dark text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Architectural <span className="text-prixgen-lightblue">Excellence.</span>
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            From rescue audits to global IIoT deployments, our senior consultants bridge the gap between business strategy and technological execution.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {servicesData.map((service, index) => (
            <div key={service.slug} className={`flex flex-col gap-8 ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
              <div className="bg-prixgen-gray/40 rounded-[48px] p-12 hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-prixgen-blue/10">
                <div className="text-prixgen-lightblue font-bold text-6xl mb-8 opacity-20 italic">0{index + 1}</div>
                <h3 className="text-3xl font-bold text-prixgen-blue mb-4">{service.title}</h3>
                <p className="text-xl font-medium text-prixgen-dark/70 mb-8 leading-tight">{service.headline}</p>
                <Link href={`/services/${service.slug}`}>
                  <Button className="rounded-full px-8 h-14 text-lg">View Service Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
