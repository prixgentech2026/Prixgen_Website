'use client';

import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';

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
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden bg-white">
        <AmbientGlow />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeUp className="space-y-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
              <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px]">
                Global Connectivity
              </span>
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
            </div>
            
            <StaggerText 
              text={contactData.title}
              variant="gradient"
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter"
            />
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                {contactData.description}
              </p>
            </div>
          </FadeUp>
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
