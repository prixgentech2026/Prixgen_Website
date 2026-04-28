import { Metadata } from 'next';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';

export const metadata: Metadata = {
  title: "Contact Us | Let's Transform Your Operations",
  description: "Connect with Prixgen Enterprise Headquarters in Mysuru to discuss your operational intelligence roadmap and ERP strategy.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-prixgen-dark text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prixgen-blue/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Let's Transform Your <span className="text-prixgen-lightblue">Operations.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Whether you are rescuing a failed implementation, architecting a new global ecosystem, or exploring proprietary AI solutions, our senior consultants are ready to assist.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div className="space-y-16">
          <div className="space-y-8">
            <h2 className="text-sm font-bold text-prixgen-lightblue uppercase tracking-widest">Global Headquarters</h2>
            <address className="not-italic text-3xl font-bold text-prixgen-blue leading-tight max-w-md">
              #244 Kalabhairaveshwara Complex,<br />
              1st Stage, Niveditha Nagara,<br />
              Mysuru, Karnataka 570022
            </address>
            <p className="text-prixgen-dark/40 font-medium">India Office</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-prixgen-gray">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-prixgen-dark/30 uppercase tracking-widest">Strategic Inquiries</h3>
              <p className="text-2xl font-bold text-prixgen-blue hover:text-prixgen-lightblue transition-colors">
                <a href="mailto:solutions@prixgen.com">solutions@prixgen.com</a>
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-prixgen-dark/30 uppercase tracking-widest">Global Desk</h3>
              <p className="text-2xl font-bold text-prixgen-blue">+91 (821) 400-XXXX</p>
            </div>
          </div>

          <div className="bg-prixgen-gray p-10 rounded-3xl border border-prixgen-blue/5 shadow-inner">
            <h3 className="font-bold text-prixgen-blue mb-4">Regional Presence</h3>
            <p className="text-prixgen-dark/60 leading-relaxed">
              Serving industrial leaders across the APAC region, Australia, and the Middle East. Our unified delivery model ensures architectural consistency regardless of your geographic location.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-prixgen-gray">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-prixgen-blue">Direct Architectural Request</h2>
            <p className="text-prixgen-dark/60">Submit your requirements for a prioritized response from our strategy team.</p>
          </div>
          <LeadCaptureForm source="Contact Page" />
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] bg-prixgen-gray relative overflow-hidden grayscale contrast-[1.1] opacity-60 flex items-center justify-center">
         <div className="absolute inset-0 bg-gradient-to-b from-prixgen-dark/10 to-transparent pointer-events-none" />
         <div className="text-prixgen-dark/20 font-bold uppercase tracking-[0.2em] text-5xl text-center px-4">
            Interactive Global Operations Map
         </div>
      </section>
    </div>
  );
}
