'use client';

import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import InteractiveGlobe from '@/components/ui/interactive-globe';
import { Mail, Phone, Globe, Smartphone, MapPin } from 'lucide-react';

export default function ContactClientPage({ contactData }: { contactData: any }) {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd 
        type="ContactPage" 
        data={{ 
          name: "Prixgen Contact", 
          description: contactData.seo.metaDesc 
        }} 
      />

      {/* Hero Section - Optimized Padding */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <AmbientGlow />
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px]">
                Connect With Us
              </span>
            </div>
            
            <StaggerText 
              text={contactData.title}
              variant="gradient"
              className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-8"
            />
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              {contactData.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-5 space-y-12">
            <FadeUp className="space-y-12">
              {/* Regional Offices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* India HQ */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-prixgen-blue uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={12} />
                      India Headquarters
                    </h4>
                    <address className="text-sm text-slate-600 not-italic leading-relaxed">
                      {contactData.address}
                    </address>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Office Desk</p>
                      <p className="text-lg font-bold text-prixgen-blue">{contactData.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Strategic Sales</p>
                      <p className="text-lg font-bold text-prixgen-blue">{contactData.salesPhone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Email</p>
                      <a href={`mailto:${contactData.email}`} className="text-lg font-bold text-prixgen-blue hover:text-prixgen-lightblue transition-colors">
                        {contactData.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Australia Regional Office */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-prixgen-blue uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={12} />
                      Australia Regional Office
                    </h4>
                    <address className="text-sm text-slate-600 not-italic leading-relaxed">
                      {contactData.australiaAddress}
                    </address>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Desk</p>
                      <p className="text-lg font-bold text-prixgen-blue">{contactData.australiaPhone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Regional Email</p>
                      <a href={`mailto:${contactData.australiaEmail}`} className="text-lg font-bold text-prixgen-blue hover:text-prixgen-lightblue transition-colors">
                        {contactData.australiaEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Globe size={12} className="text-prixgen-blue" />
                    Digital Presence
                  </h4>
                  <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-prixgen-blue hover:text-prixgen-lightblue transition-colors block">
                    {contactData.website}
                  </a>
                </div>
              </div>
            </FadeUp>

            {/* Support Channels */}
            <FadeUp delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-prixgen-blue/20 transition-all group">
                  <h4 className="font-bold text-prixgen-blue mb-1 text-sm">Technical Support</h4>
                  <a href="mailto:support@prixgen.com" className="text-xs text-prixgen-lightblue font-bold uppercase tracking-wider group-hover:underline">support@prixgen.com</a>
               </div>
               <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-prixgen-blue/20 transition-all group">
                  <h4 className="font-bold text-prixgen-blue mb-1 text-sm">Corporate Sales</h4>
                  <a href="mailto:sales@prixgen.com" className="text-xs text-prixgen-lightblue font-bold uppercase tracking-wider group-hover:underline">sales@prixgen.com</a>
               </div>
            </FadeUp>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.2} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-3 text-prixgen-blue tracking-tight">Architectural Consultation</h2>
                  <p className="text-slate-500 font-medium">Briefly outline your enterprise requirements for a prioritized response.</p>
                </div>
                <LeadCaptureForm source="Contact Page" />
              </div>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-slate-50 pt-6 pb-0 relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="text-center mb-2">
            <h2 className="text-4xl font-bold text-prixgen-blue mb-4 tracking-tight">Global Operations</h2>
            <div className="w-12 h-1 bg-prixgen-lightblue mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Delivering specialized enterprise intelligence across APAC, Australia, and EMEA.
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
