'use client';

import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import InteractiveGlobe from '@/components/ui/interactive-globe';

export default function ContactClientPage({ contactData }: { contactData: any }) {
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
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter"
            />
            
            <div className="max-w-2xl mx-auto mt-8">
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {contactData.description}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div className="space-y-16">
          <FadeUp className="space-y-6">
            <h2 className="text-sm font-bold text-prixgen-lightblue uppercase tracking-widest">Global Headquarters</h2>
            <address className="not-italic text-4xl lg:text-5xl font-bold text-prixgen-blue leading-tight max-w-md whitespace-pre-line tracking-tight">
              {contactData.address}
            </address>
            <p className="text-slate-500 font-medium">India Office</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-200">
            <FadeUp delay={0.1} className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Strategic Inquiries</h3>
              <p className="text-2xl font-bold text-prixgen-blue hover:text-prixgen-lightblue transition-colors">
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
              </p>
            </FadeUp>
            <FadeUp delay={0.2} className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Desk</h3>
              <p className="text-2xl font-bold text-prixgen-blue">{contactData.phone}</p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
            <h3 className="font-bold text-prixgen-blue mb-4 text-xl">Regional Presence</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Serving industrial leaders across the APAC region, Australia, and the Middle East. Our unified delivery model ensures architectural consistency regardless of your geographic location.
            </p>
          </FadeUp>
          
          {/* Inquiry Routing Section */}
          <FadeUp delay={0.4} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
             <div className="p-8 rounded-3xl border border-slate-200 hover:border-prixgen-blue/30 transition-colors group">
                <h4 className="font-bold text-prixgen-blue mb-2">Technical Support</h4>
                <p className="text-sm text-slate-500 mb-4">Existing clients seeking priority assistance.</p>
                <a href="mailto:support@prixgen.com" className="text-prixgen-lightblue font-bold text-sm uppercase tracking-widest group-hover:underline">support@prixgen.com</a>
             </div>
             <div className="p-8 rounded-3xl border border-slate-200 hover:border-prixgen-blue/30 transition-colors group">
                <h4 className="font-bold text-prixgen-blue mb-2">Careers & Talent</h4>
                <p className="text-sm text-slate-500 mb-4">Join our team of industrial architects.</p>
                <a href="mailto:careers@prixgen.com" className="text-prixgen-lightblue font-bold text-sm uppercase tracking-widest group-hover:underline">careers@prixgen.com</a>
             </div>
          </FadeUp>
        </div>

        {/* Form Container */}
        <FadeUp delay={0.2} className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,102,204,0.1)] border border-slate-100 h-fit">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-prixgen-blue tracking-tight">Direct Architectural Request</h2>
            <p className="text-slate-500 font-medium leading-relaxed">Submit your requirements for a prioritized response from our strategy team.</p>
          </div>
          <LeadCaptureForm source="Contact Page" />
        </FadeUp>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-slate-50 py-24 relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="text-center mb-16">
            <h2 className="text-4xl font-bold text-prixgen-blue mb-4 tracking-tight">Global Operations</h2>
            <div className="w-20 h-1 bg-prixgen-lightblue mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Delivering enterprise architecture across borders with localized expertise.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <InteractiveGlobe />
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
