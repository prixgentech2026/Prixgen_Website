import { Metadata } from 'next';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';

export const metadata: Metadata = {
  title: "Who We Are | Global Architects of Enterprise Intelligence",
  description: "Prixgen is an elite team of IT professionals with over 30+ years of combined experience in ERP, IIoT, and AI implementations.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-prixgen-dark text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-5xl">
            We are Global Architects of <span className="text-prixgen-lightblue">Enterprise Intelligence.</span>
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="prose prose-xl text-prixgen-dark/80 max-w-none">
            <p className="text-2xl font-medium text-prixgen-blue">
              Prixgen ensures the best ROI for companies by streamlining business processes.
            </p>
            <p>
              Driven by the idea of providing innovative solutions through ERP, IIoT, and AI, we are an elite team of IT professionals with over 30+ years of combined experience in enterprise implementations.
            </p>
            <p>
              We don't just deploy software; we future-proof your digital journey. Our methodology is rooted in architectural integrity and zero-tolerance for operational friction.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <div className="text-4xl font-bold text-prixgen-blue mb-2">30+</div>
              <div className="text-sm uppercase tracking-widest text-prixgen-dark/40 font-bold">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-prixgen-blue mb-2">Elite</div>
              <div className="text-sm uppercase tracking-widest text-prixgen-dark/40 font-bold">Consulting Team</div>
            </div>
          </div>
        </div>

        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
            alt="The Prixgen Elite Team"
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
