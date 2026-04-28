import { Metadata } from 'next';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';

export const metadata: Metadata = {
  title: "About Us | Global Architects of Enterprise Intelligence",
  description: "Prixgen is an elite team of IT professionals with over 30+ years of combined experience in ERP, IIoT, and AI implementations.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-prixgen-dark text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-5xl leading-tight">
            Global Architects of <span className="text-prixgen-lightblue">Enterprise Intelligence.</span>
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="prose prose-xl text-prixgen-dark/80 max-w-none">
            <p className="text-2xl font-bold text-prixgen-blue leading-snug">
              Prixgen ensures the best ROI for companies by streamlining business processes.
            </p>
            <p>
              Driven by the idea of providing innovative solutions through ERP, IIoT, and AI, we are an elite team of IT professionals with over 30+ years of combined experience in enterprise implementations.
            </p>
            <p>
              We don't just deploy software; we future-proof your digital journey. Our methodology is rooted in architectural integrity and zero-tolerance for operational friction.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
            alt="The Prixgen Elite Team"
            fill
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-prixgen-blue py-20 text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">30+</div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-bold">Years Experience</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">500+</div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-bold">Implementations</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">Elite</div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-bold">Architect Team</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">Gold</div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-bold">Odoo Partner</div>
          </div>
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
