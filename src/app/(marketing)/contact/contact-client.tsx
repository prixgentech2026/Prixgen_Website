'use client';

import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';

export default function ContactClient({ contactData }: { contactData: any }) {
  return (
    <div className="min-h-screen">
      <JsonLd 
        type="ContactPage" 
        data={{ 
          name: "Prixgen Contact", 
          description: contactData.seo.metaDesc 
        }} 
      />

      {/* Hero */}
      <section className="bg-prixgen-dark text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prixgen-blue/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="container mx-auto px-4 relative z-10">
          <StaggerText 
            text={contactData.title}
            variant="gradient"
            mode="light"
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/70 max-w-3xl leading-relaxed"
          >
            {contactData.description}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div className="space-y-16">
          <FadeUp className="space-y-8">
            <h2 className="text-sm font-bold text-prixgen-lightblue uppercase tracking-widest">Global Headquarters</h2>
            <address className="not-italic text-3xl font-bold text-prixgen-blue leading-tight max-w-md whitespace-pre-line">
              {contactData.address}
            </address>
            <p className="text-prixgen-dark/40 font-medium">India Office</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-prixgen-gray">
            <FadeUp delay={0.1} className="space-y-4">
              <h3 className="text-xs font-bold text-prixgen-dark/30 uppercase tracking-widest">Strategic Inquiries</h3>
              <p className="text-2xl font-bold text-prixgen-blue hover:text-prixgen-lightblue transition-colors">
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
              </p>
            </FadeUp>
            <FadeUp delay={0.2} className="space-y-4">
              <h3 className="text-xs font-bold text-prixgen-dark/30 uppercase tracking-widest">Global Desk</h3>
              <p className="text-2xl font-bold text-prixgen-blue">{contactData.phone}</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="bg-prixgen-gray p-10 rounded-3xl border border-prixgen-blue/5 shadow-inner">
            <h3 className="font-bold text-prixgen-blue mb-4">Regional Presence</h3>
            <p className="text-prixgen-dark/60 leading-relaxed">
              Serving industrial leaders across the APAC region, Australia, and the Middle East. Our unified delivery model ensures architectural consistency regardless of your geographic location.
            </p>
          </FadeUp>
        </div>

        {/* Form Container */}
        <FadeUp delay={0.2} className="bg-white p-12 rounded-[40px] shadow-2xl border border-prixgen-gray">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-prixgen-blue">Direct Architectural Request</h2>
            <p className="text-prixgen-dark/60">Submit your requirements for a prioritized response from our strategy team.</p>
          </div>
          <LeadCaptureForm source="Contact Page" />
        </FadeUp>
      </section>

      {/* Map Placeholder */}
      <FadeUp className="h-[500px] bg-prixgen-gray relative overflow-hidden grayscale contrast-[1.1] opacity-60 flex items-center justify-center">
         <div className="absolute inset-0 bg-gradient-to-b from-prixgen-dark/10 to-transparent pointer-events-none" />
         <div className="text-prixgen-dark/20 font-bold uppercase tracking-[0.2em] text-5xl text-center px-4">
            Interactive Global Operations Map
         </div>
      </FadeUp>
    </div>
  );
}
