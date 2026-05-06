'use client';

import React from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { motion } from 'framer-motion';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { PortableText } from '@/components/ui/portable-text';
import { FileText, ChevronRight, Globe, Zap, BarChart3, ShieldCheck } from 'lucide-react';

export default function IndustryClientPage({ industry }: { industry: any }) {
  // Use summaryImage for the main banner, fallback to featuredImage or externalImageUrl
  const bannerImageUrl = industry.summaryImage?.sourceUrl || industry.featuredImage?.sourceUrl || industry.externalImageUrl;
  const bannerImageAlt = industry.summaryImage?.altText || industry.featuredImage?.altText || industry.title;

  return (
    <div className="min-h-screen relative overflow-hidden bg-white selection:bg-prixgen-blue selection:text-white">
      <AmbientGlow />
      <JsonLd 
        type="Article" 
        data={{ 
          title: industry.title, 
          description: industry.seo?.metaDesc,
          author: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        data={{ 
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prixgen.com" },
            { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.prixgen.com/industries" },
            { "@type": "ListItem", position: 3, name: industry.title, item: `https://www.prixgen.com/industries/${industry.slug}` }
          ]
        }} 
      />

      {/* Hero Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-16">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:30px_30px] opacity-40" />
        
        {/* Animated Floating Elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-prixgen-blue/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-prixgen-lightblue/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <FadeUp delay={0.1} className="space-y-8 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-5 py-2 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 flex items-center justify-center gap-2 text-[10px] font-black text-prixgen-blue uppercase tracking-[0.3em] backdrop-blur-sm"
            >
              <Link href="/" className="hover:text-prixgen-blue transition-colors">Home</Link>
              <ChevronRight size={10} className="opacity-30" />
              <Link href="/industries" className="hover:text-prixgen-blue transition-colors">Industries</Link>
              <ChevronRight size={10} className="opacity-30" />
              <span className="text-prixgen-blue/60">{industry.title}</span>
            </motion.div>
            
            <StaggerText 
              text={industry.title} 
              variant="gradient"
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter"
            />
            
            <div className="max-w-3xl mx-auto pt-4">
              <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                {industry.headline}
              </p>
            </div>
          </FadeUp>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
        >
          <div className="w-px h-16 bg-gradient-to-b from-prixgen-blue to-transparent" />
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Main Content */}
          <article className="lg:col-span-2 space-y-20 lg:space-y-32">
            
            {/* Visual Narrative Anchor */}
            {bannerImageUrl && (
              <FadeUp delay={0.2} className="relative aspect-[21/10] w-full rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 group">
                <OptimizedImage
                  src={bannerImageUrl}
                  alt={bannerImageAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-12 left-12">
                   <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-bold text-xs uppercase tracking-widest">
                     <Globe size={14} className="text-prixgen-lightblue" />
                     Global Sector Intelligence
                   </div>
                </div>
              </FadeUp>
            )}

            {/* Strategic Analysis (Executive Summary) */}
            <FadeUp delay={0.3} className="relative bg-white rounded-[4rem] p-12 lg:p-20 shadow-[0_40px_100px_-20px_rgba(0,102,204,0.06)] border border-slate-50 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-prixgen-blue/[0.01] rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
              
              <div className="flex items-center gap-5 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-prixgen-blue/5 flex items-center justify-center shadow-inner">
                   <FileText className="text-prixgen-blue" size={26} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-prixgen-blue/40 uppercase tracking-[0.2em]">Documentation</span>
                  <h3 className="text-3xl font-black text-prixgen-dark tracking-tighter">Sector Roadmap</h3>
                </div>
              </div>

              <div className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-prixgen-blue prose-p:text-slate-600 prose-p:leading-[1.8] prose-strong:text-prixgen-blue prose-strong:font-bold prose-ul:list-disc prose-ul:pl-6 prose-li:text-slate-600">
                <PortableText value={industry.content} />
              </div>
            </FadeUp>

            {/* Core Capabilities */}
            {industry.features && (
              <div className="space-y-16">
                <FadeUp>
                  <div className="flex items-center gap-5">
                    <div className="w-3 h-12 bg-prixgen-blue rounded-full shadow-lg shadow-prixgen-blue/20" />
                    <h2 className="text-4xl lg:text-5xl font-black text-prixgen-dark tracking-tighter leading-none">
                      Industrial <br />
                      <span className="italic text-prixgen-blue opacity-80">Specializations</span>
                    </h2>
                  </div>
                </FadeUp>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {industry.features.map((feature: any, i: number) => (
                    <FadeUp 
                      key={i} 
                      delay={0.1 * i}
                      className={i === 0 ? "md:col-span-2" : ""}
                    >
                      <div className="group h-full p-12 bg-white border border-slate-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.15)] rounded-[3rem] hover:border-prixgen-blue/20 transition-all duration-700 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0 bg-gradient-to-br from-prixgen-blue/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="space-y-8 relative z-10">
                           <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-700 text-prixgen-blue shadow-sm">
                             <Zap size={28} />
                           </div>
                           <div className="space-y-4">
                              <h4 className="text-2xl lg:text-3xl font-black text-prixgen-dark group-hover:text-prixgen-blue transition-colors tracking-tighter leading-tight">{feature.title}</h4>
                              <p className="text-slate-500 font-medium leading-relaxed text-lg">{feature.description}</p>
                           </div>
                        </div>
                        
                        <div className="mt-12 h-1 w-20 bg-slate-100 rounded-full group-hover:w-full group-hover:bg-prixgen-blue transition-all duration-700" />
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            )}

            {/* Industrial Resilience Banner */}
            <FadeUp delay={0.2} className="relative rounded-[4rem] bg-[#020617] overflow-hidden p-12 lg:p-20 shadow-2xl">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-prixgen-blue/30 to-transparent opacity-40 pointer-events-none" />
               
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  <div className="space-y-4">
                     <div className="text-5xl font-black text-prixgen-lightblue tracking-tighter">Scale</div>
                     <h4 className="font-bold text-xl text-white">Global Elasticity</h4>
                     <p className="text-white/50 text-base leading-relaxed font-medium">Engineered for infinite scalability across international supply chains.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="text-5xl font-black text-prixgen-lightblue tracking-tighter">Trust</div>
                     <h4 className="font-bold text-xl text-white">Zero-Loss Continuity</h4>
                     <p className="text-white/50 text-base leading-relaxed font-medium">Fail-safe operational architectures that ensure mission-critical uptime.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="text-5xl font-black text-prixgen-lightblue tracking-tighter">ROI</div>
                     <h4 className="font-bold text-xl text-white">Value Acceleration</h4>
                     <p className="text-white/50 text-base leading-relaxed font-medium">Rapid deployment models that compress time-to-value for stakeholders.</p>
                  </div>
               </div>
            </FadeUp>

            {/* Implementation Methodology */}
            {industry.process && industry.process.length > 0 && (
              <section className="space-y-16">
                <FadeUp>
                   <div className="flex items-center gap-5">
                    <div className="w-3 h-12 bg-prixgen-blue rounded-full shadow-lg shadow-prixgen-blue/20" />
                    <h2 className="text-4xl lg:text-5xl font-black text-prixgen-dark tracking-tighter leading-none">
                      Transformation <br />
                      <span className="italic text-prixgen-blue opacity-80">Methodology</span>
                    </h2>
                  </div>
                </FadeUp>
                
                <div className="relative pl-6 md:pl-12">
                  {/* Vertical Line */}
                  <div className="absolute top-0 bottom-0 left-[35px] md:left-[59px] w-1 bg-gradient-to-b from-prixgen-blue/40 via-slate-100 to-transparent" />
                  
                  <div className="space-y-20 relative">
                    {industry.process.map((step: any, i: number) => (
                      <FadeUp key={i} delay={0.1 * i} className="relative flex gap-10 md:gap-16 group">
                        <div className="relative z-10 flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white border-[6px] border-prixgen-blue/5 flex items-center justify-center font-black text-prixgen-blue text-2xl shadow-xl group-hover:border-prixgen-blue group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-700">
                          {i + 1}
                        </div>
                        <div className="space-y-4 pt-3 md:pt-6 text-left">
                          <h3 className="text-3xl font-black text-prixgen-dark group-hover:text-prixgen-blue transition-colors tracking-tighter">{step.title}</h3>
                          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">{step.description}</p>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-10">
              {/* Lead Capture Card */}
              <FadeUp delay={0.4} className="bg-white p-12 rounded-[4rem] border border-prixgen-blue/10 shadow-[0_40px_80px_-20px_rgba(0,102,204,0.12)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-prixgen-blue/[0.03] rounded-full blur-[80px] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <BarChart3 className="text-prixgen-blue" size={24} />
                       <span className="text-[10px] font-black text-prixgen-blue uppercase tracking-widest">Advisory Services</span>
                    </div>
                    <h3 className="text-3xl font-black text-prixgen-dark tracking-tighter">Sector Audit</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">
                      Deploy our expert architects to evaluate your {industry.title} operations for hidden efficiencies.
                    </p>
                  </div>
                  <div className="pt-4">
                    <LeadCaptureForm source={`Industry Detail: ${industry.title}`} />
                  </div>
                </div>
              </FadeUp>

              {/* Security Compliance Small Banner */}
              <FadeUp delay={0.5} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center gap-6 group">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-prixgen-blue shadow-sm group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500">
                    <ShieldCheck size={24} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="font-bold text-prixgen-dark tracking-tight">ISO Compliant</h4>
                    <p className="text-xs text-slate-500 font-medium italic">Standardized Industrial Protocols</p>
                 </div>
              </FadeUp>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
