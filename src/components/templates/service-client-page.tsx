'use client';

import React from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { motion } from 'framer-motion';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { PortableText } from '@/components/ui/portable-text';
import { servicesData } from '@/lib/data';
import { urlFor } from '@/sanity/lib/image';
import { Magnetic } from '@/components/animations/magnetic';
import { RevealText } from '@/components/animations/reveal-text';
import { AnimatedConnector } from '@/components/shared/animated-connector';
import { HeroBadge } from '@/components/shared/hero-badge';
import { HeroBackground } from '@/components/shared/hero-background';
import { 
  Database, Activity, LineChart, Zap, ArrowRight, 
  Server, ShieldCheck, Cpu, Award, Globe
} from 'lucide-react';

export default function ServiceClientPage({ service }: { service: any }) {
  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    
    // 1. If it's our custom projection with sourceUrl
    if (img.sourceUrl) return img.sourceUrl;
    
    // 2. If it's a raw Sanity image object or reference
    try {
      if (img.asset?._ref || img.asset?._id || img.asset?.url) {
        return urlFor(img).url();
      }
    } catch (e) {
      console.warn("Failed to resolve Sanity image:", e);
    }
    
    // 3. Fallback for absolute URLs or custom asset objects
    return img.asset?.url || (typeof img.asset === 'string' ? img.asset : null);
  };

  const bannerImageUrl = getImageUrl(service.summaryImage) || getImageUrl(service.featuredImage) || service.externalImageUrl;
  const bannerImageAlt = service.summaryImage?.altText || service.featuredImage?.altText || service.title;

  if (service.slug === 'hiring-odoo-developers') {
    return <OdooDevelopersLanding service={service} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <JsonLd 
        type="Service" 
        data={{ 
          name: service.title, 
          description: service.seo?.metaDesc,
          provider: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        data={{ 
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prixgen.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://www.prixgen.com/services" },
            { "@type": "ListItem", position: 3, name: service.title, item: `https://www.prixgen.com/services/${service.slug}` }
          ]
        }} 
      />

      {/* Hero Header */}
      <section className="relative min-h-[80vh] flex items-center pt-32 overflow-hidden bg-white">
        <HeroBackground />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <FadeUp delay={0.1} className="space-y-6 flex flex-col items-center">
            <HeroBadge text={service.title || "Intelligent Architecture"} align="center" />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 flex items-center justify-center gap-2 text-[10px] font-black text-prixgen-blue/60 uppercase tracking-[0.2em]"
            >
              <Magnetic>
                <Link href="/" className="hover:text-prixgen-blue transition-colors">Home</Link>
              </Magnetic>
              <span className="opacity-20">/</span>
              <Magnetic>
                <Link href="/services" className="hover:text-prixgen-blue transition-colors">Services</Link>
              </Magnetic>
              <span className="opacity-20">/</span>
              <span className="text-prixgen-blue">{service.title}</span>
            </motion.div>
            
            <StaggerText 
              text={service.title} 
              variant="gradient"
              className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter"
            />
            
            <div className="max-w-3xl mx-auto pt-6">
              <RevealText delay={0.2}>
                <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                  {service.headline}
                </p>
              </RevealText>
            </div>
          </FadeUp>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
          <AnimatedConnector height="h-32" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 lg:py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <article className="lg:col-span-2 space-y-8 lg:space-y-12">
            {bannerImageUrl && (
              <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={bannerImageUrl}
                  alt={bannerImageAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Executive Summary (Content) */}
            <FadeUp delay={0.3} className="relative bg-white rounded-[3rem] p-6 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,102,204,0.05)] border border-slate-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-prixgen-blue/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-prixgen-blue/5 flex items-center justify-center">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-prixgen-blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-prixgen-dark tracking-tight">Executive Summary</h3>
              </div>

              <div className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-prixgen-blue prose-p:text-slate-600 prose-p:leading-[1.8] prose-strong:text-prixgen-blue prose-strong:font-bold">
                <PortableText value={service.content} />
              </div>
            </FadeUp>

            {/* Key Capabilities / Features */}
            <div className="pt-8">
              <FadeUp>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-2 h-10 bg-prixgen-blue rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-bold text-prixgen-dark tracking-tighter">
                    Solution <span className="italic text-prixgen-blue text-opacity-80">Capabilities</span>
                  </h2>
                </div>
              </FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.features?.map((feature: any, i: number) => (
                  <FadeUp 
                    key={feature._key || `feature-${i}`} 
                    delay={0.1 * i}
                    className={i === 0 ? "md:col-span-2" : ""}
                  >
                    <div className="group h-full p-10 bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,102,204,0.15)] rounded-[2.5rem] hover:border-prixgen-blue/20 transition-all duration-700 relative overflow-hidden">
                      {/* Hover Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-prixgen-blue/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-8">
                        <Magnetic>
                          <div className="w-16 h-16 shrink-0 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-prixgen-blue/5 group-hover:border-prixgen-blue/20 transition-all duration-700">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-prixgen-blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          </div>
                        </Magnetic>
                        <div className="space-y-3">
                          <h4 className="text-2xl font-bold text-prixgen-dark group-hover:text-prixgen-blue transition-colors tracking-tight">{feature.title}</h4>
                          <p className="text-slate-500 font-medium leading-relaxed text-lg">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Business Outcomes Banner */}
            <FadeUp delay={0.2} className="relative rounded-[3rem] bg-prixgen-dark overflow-hidden p-6 lg:p-12 my-6 shadow-2xl">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-prixgen-blue/40 to-transparent opacity-30 pointer-events-none" />
               
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
                  <div className="space-y-3">
                     <div className="text-4xl font-black text-prixgen-lightblue tracking-tighter">Zero</div>
                     <h4 className="font-bold text-lg">Operational Friction</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Streamline workflows and eliminate bottlenecks across your entire enterprise architecture.</p>
                  </div>
                  <div className="space-y-3">
                     <div className="text-4xl font-black text-prixgen-lightblue tracking-tighter">100%</div>
                     <h4 className="font-bold text-lg">Data Transparency</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Achieve complete visibility and governance over your mission-critical operations.</p>
                  </div>
                  <div className="space-y-3">
                     <div className="text-4xl font-black text-prixgen-lightblue tracking-tighter">Accelerated</div>
                     <h4 className="font-bold text-lg">Time to Market</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Deploy robust industrial solutions faster with our expert engineering methodology.</p>
                  </div>
               </div>
            </FadeUp>

            {/* Process Section - Vertical Timeline */}
            {service.process && service.process.length > 0 && (
              <section className="py-8 lg:py-12">
                <FadeUp>
                  <h2 className="text-3xl md:text-4xl font-bold text-prixgen-dark tracking-tighter mb-12">
                    Implementation <span className="italic text-prixgen-blue text-opacity-80">Roadmap</span>
                  </h2>
                </FadeUp>
                <div className="space-y-0 relative pl-4 md:pl-8">
                  {/* Vertical Line */}
                  <div className="absolute top-0 bottom-0 left-[27px] md:left-[43px] w-0.5 bg-gradient-to-b from-prixgen-blue/30 via-slate-200 to-transparent" />
                  
                  {service.process.map((step: any, i: number) => (
                    <FadeUp key={step._key || `step-${i}`} delay={0.1 * i} className="relative flex gap-8 md:gap-12 group pb-16 last:pb-0">
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border-4 border-prixgen-blue/10 flex items-center justify-center font-black text-prixgen-blue text-lg shadow-sm group-hover:border-prixgen-blue group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500">
                        {i + 1}
                      </div>
                      <div className="space-y-3 pt-1 md:pt-2">
                        <h3 className="text-2xl font-bold text-prixgen-dark group-hover:text-prixgen-blue transition-colors tracking-tight">{step.title}</h3>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">{step.description}</p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <FadeUp delay={0.4} className="bg-white p-8 lg:p-10 rounded-[3rem] border border-prixgen-blue/10 shadow-2xl shadow-prixgen-blue/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <h3 className="text-2xl font-bold mb-6 text-prixgen-blue relative z-10">Strategic Consultation</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium relative z-10">
                  Ready to transform your business with our expertise in {service.title}? Schedule a technical briefing with our leads.
                </p>
                <div className="relative z-10">
                  <LeadCaptureForm source={`Service: ${service.title}`} />
                </div>
              </FadeUp>

              {/* Related Services */}
              <div className="p-10 bg-prixgen-blue/[0.02] rounded-[3rem] border border-prixgen-blue/5">
                <h4 className="text-lg font-bold text-prixgen-dark mb-6 uppercase tracking-widest opacity-50">Related Solutions</h4>
                <div className="space-y-4">
                  {servicesData
                    .filter(s => s.slug !== service.slug)
                    .slice(0, 4)
                    .map((related, i) => (
                      <Link 
                        key={i} 
                        href={`/services/${related.slug}`}
                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all group"
                      >
                        <span className="font-bold text-slate-600 group-hover:text-prixgen-blue">{related.title}</span>
                        <div className="w-8 h-8 rounded-full bg-prixgen-blue/5 flex items-center justify-center text-prixgen-blue group-hover:bg-prixgen-blue group-hover:text-white transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Custom Premium Landing Page for Odoo Developers
function OdooDevelopersLanding({ service }: { service: any }) {
  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    if (img.sourceUrl) return img.sourceUrl;
    try {
      if (img.asset?._ref || img.asset?._id || img.asset?.url) {
        return urlFor(img).url();
      }
    } catch (e) {
      console.warn("Failed to resolve Sanity image:", e);
    }
    return img.asset?.url || (typeof img.asset === 'string' ? img.asset : null);
  };

  const bannerImageUrl = getImageUrl(service.summaryImage) || getImageUrl(service.featuredImage) || service.externalImageUrl;
  const bannerImageAlt = service.summaryImage?.altText || service.featuredImage?.altText || service.title;

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const formElement = document.getElementById('contact-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingElement = document.getElementById('pricing-pod-section');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white text-prixgen-dark selection:bg-prixgen-blue selection:text-white">
      <JsonLd 
        type="Service" 
        data={{ 
          name: service.title, 
          description: service.seo?.metaDesc,
          provider: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        data={{ 
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prixgen.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://www.prixgen.com/services" },
            { "@type": "ListItem", position: 3, name: service.title, item: `https://www.prixgen.com/services/${service.slug}` }
          ]
        }} 
      />

      {/* 1. HERO COMPONENT */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        <HeroBackground />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-prixgen-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-prixgen-lightblue/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Column: Context & Copy */}
            <div className="lg:col-span-7 space-y-8 flex flex-col items-start text-left">
              
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-[#004B87]/5 border border-[#004B87]/20 text-[#004B87] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Award size={14} className="text-amber-500 fill-amber-500/20" /> Odoo Gold Partner
                </span>
                <span className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Globe size={14} /> Mysuru Engineering Hub
                </span>
              </div>

              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest"
              >
                <Link href="/" className="hover:text-prixgen-blue transition-colors">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-prixgen-blue transition-colors">Services</Link>
                <span>/</span>
                <span className="text-prixgen-blue">Hire Odoo Developers</span>
              </motion.div>

              {/* H1 Heading */}
              <StaggerText 
                text="Hire Elite Odoo Developers & ERP Architects" 
                variant="gradient"
                className="text-4xl md:text-6xl font-black leading-[1.0] tracking-tighter"
              />

              {/* Sub-headline */}
              <div className="pt-2">
                <RevealText delay={0.2}>
                  <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                    Stop hiring generic module customizers. Augment your technical capacity with pre-vetted Odoo architects capable of building intelligent data pipelines, high-throughput WMS, and industrial IoT hardware loops.
                  </p>
                </RevealText>
              </div>

              {/* Capacity Announcement Banner */}
              <FadeUp delay={0.3} className="pt-2">
                <div className="inline-flex flex-wrap items-center gap-3 p-2.5 pl-5 pr-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-100/50">
                  <span className="text-sm font-bold text-slate-500">Resource Model</span>
                  <span className="text-base font-black text-prixgen-blue">Elastic SLA-Backed Pods</span>
                  <span className="px-3 py-1.5 rounded-lg bg-prixgen-lightblue/10 text-prixgen-blue text-xs font-black uppercase tracking-wider">
                    Full Stack Allocation
                  </span>
                </div>
              </FadeUp>

              {/* CTAs */}
              <FadeUp delay={0.4} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
                <Magnetic>
                  <button 
                    onClick={handleScrollToForm}
                    className="px-8 py-5 bg-[#004B87] hover:bg-[#003560] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#004B87]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer w-full sm:w-auto"
                  >
                    Secure Your Engineering Pod
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Magnetic>
                <Magnetic>
                  <button 
                    onClick={handleScrollToPricing}
                    className="px-8 py-5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-black text-lg transition-all cursor-pointer w-full sm:w-auto text-center"
                  >
                    Explore the Pod Advantage
                  </button>
                </Magnetic>
              </FadeUp>

            </div>

            {/* Right Column: Dynamic ERP Hub Motion Graphic */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <ErpHubMotionGraphic />
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
          <AnimatedConnector height="h-32" />
        </div>
      </section>

      {/* 1b. TEAM SHOWCASE BANNER IMAGE */}
      {bannerImageUrl && (
        <section className="container mx-auto px-4 -mt-10 mb-20 relative z-30">
          <div className="relative aspect-[21/9] w-full max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,75,135,0.15)] border-4 border-white group">
            <OptimizedImage
              src={bannerImageUrl}
              alt={bannerImageAlt || "Prixgen Odoo Team"}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-prixgen-dark/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-10 text-white z-10 hidden md:block">
              <span className="text-[10px] font-black uppercase tracking-widest bg-prixgen-lightblue px-3 py-1.5 rounded-lg mb-2 inline-block">Mysuru Hub</span>
              <p className="text-xl font-bold">Prixgen Certified Odoo Gold Partner Engineers</p>
            </div>
          </div>
        </section>
      )}

      {/* 2. VALUE PROPOSITION GRID (Intelligent ERP Focus) */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#004B87 1px, transparent 1px), linear-gradient(90deg, #004B87 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs">Architectural Leadership</span>
            <h2 className="text-4xl md:text-6xl font-black text-prixgen-dark tracking-tighter">
              Intelligent ERP <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">Architects</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              We shift the focus from basic code tweaks to full-spectrum enterprise integration and industrial-grade reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <FadeUp delay={0.1} className="group">
              <div className="h-full p-10 bg-white border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] hover:border-prixgen-blue/20 hover:shadow-[0_30px_60px_-15px_rgba(0,75,135,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.02] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/5" />
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#004B87]/5 flex items-center justify-center text-[#004B87] group-hover:scale-110 group-hover:bg-[#004B87] group-hover:text-white transition-all duration-500">
                    <Database size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-prixgen-dark tracking-tight">Industrial WMS & Logistics</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Architect high-velocity inventory routes, custom picking/putaway algorithms, and real-time multi-warehouse sync capable of processing millions of SKUs with zero lag.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Card 2 */}
            <FadeUp delay={0.2} className="group">
              <div className="h-full p-10 bg-white border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] hover:border-prixgen-blue/20 hover:shadow-[0_30px_60px_-15px_rgba(0,75,135,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.02] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/5" />
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#004B87]/5 flex items-center justify-center text-[#004B87] group-hover:scale-110 group-hover:bg-[#004B87] group-hover:text-white transition-all duration-500">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-prixgen-dark tracking-tight">Physical IoT & RFID Telemetry</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Connect Odoo directly to the shop floor. We design low-level interfaces for hardware scales, barcode scanners, RFID gates, and PLCs using MQTT and OPC UA protocols.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Card 3 */}
            <FadeUp delay={0.3} className="group">
              <div className="h-full p-10 bg-white border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] hover:border-prixgen-blue/20 hover:shadow-[0_30px_60px_-15px_rgba(0,75,135,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.02] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/5" />
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#004B87]/5 flex items-center justify-center text-[#004B87] group-hover:scale-110 group-hover:bg-[#004B87] group-hover:text-white transition-all duration-500">
                    <LineChart size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-prixgen-dark tracking-tight">AI/ML Forecasting Pipelines</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Integrate custom machine learning models into Odoo's database for predictive inventory ordering, dynamic price optimization, and automated demand sensing.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Card 4 */}
            <FadeUp delay={0.4} className="group">
              <div className="h-full p-10 bg-white border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] hover:border-prixgen-blue/20 hover:shadow-[0_30px_60px_-15px_rgba(0,75,135,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.02] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/5" />
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#004B87]/5 flex items-center justify-center text-[#004B87] group-hover:scale-110 group-hover:bg-[#004B87] group-hover:text-white transition-all duration-500">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-prixgen-dark tracking-tight">Zero-Latency API Orchestration</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Build hardened middleware bridges connecting Odoo to Salesforce, SAP, Shopify, and legacy mainframes with robust error-queuing and automated retries.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 3. THE "ENGINEERING POD" HIGHLIGHT */}
      <section id="pricing-pod-section" className="py-20 lg:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Pod Pitch & Engagement Models */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="text-prixgen-lightblue font-black tracking-[0.2em] uppercase text-xs">Maximum Resource ROI</span>
                  <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter leading-tight">
                    The Pod Advantage: <br />
                    <span className="text-prixgen-blue">Enterprise Power, Zero Overhead</span>
                  </h2>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed font-semibold">
                    A single developer cannot build, secure, and deploy an enterprise ERP alone. When you hire a full-time Prixgen Odoo developer, we allocate a comprehensive engineering pod to support them—at zero additional overhead cost to your business.
                  </p>
                </div>

                {/* Flexible Scaling Card (Replaces Price Callout) */}
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#004B87] to-indigo-900 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                  <div className="space-y-6 relative z-10">
                    <div className="text-sm font-bold opacity-60 uppercase tracking-widest font-black">Capacity Scaling Models</div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="font-bold text-sm">Dedicated Developer Pod</span>
                        <span className="text-[10px] bg-prixgen-lightblue/30 text-prixgen-lightblue px-2.5 py-1 rounded-md font-black uppercase tracking-wider">Full Time</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="font-bold text-sm">Fractional ERP Architect</span>
                        <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2.5 py-1 rounded-md font-black uppercase tracking-wider">Part Time</span>
                      </div>
                      <div className="flex justify-between items-center pb-1">
                        <span className="font-bold text-sm">Project-Based Sprint Pods</span>
                        <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2.5 py-1 rounded-md font-black uppercase tracking-wider">Milestone</span>
                      </div>
                    </div>

                    <p className="text-xs opacity-75 leading-relaxed">
                      All engagement tiers grant full access to Prixgen's Mysuru Hub supporting resources at zero overhead cost.
                    </p>
                    <button 
                      onClick={handleScrollToForm}
                      className="w-full py-4 bg-prixgen-lightblue hover:bg-prixgen-lightblue/90 text-white rounded-xl font-black text-sm uppercase tracking-wider transition-colors shadow-lg shadow-prixgen-lightblue/25 cursor-pointer"
                    >
                      Request Capacity Briefing
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Pod Roles & Connected Graphic */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* SVG Telemetry Motion Graphic */}
                <PrixgenPodGraphic />

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-black text-slate-600 uppercase tracking-wider">What's Included in Your Pod:</span>
                  <span className="text-xs font-bold text-prixgen-blue bg-prixgen-blue/5 px-3 py-1 rounded-full">Zero Extra Overhead</span>
                </div>

                <div className="space-y-4">
                  {/* Role 1 */}
                  <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-[#004B87]/20 hover:shadow-md transition-all flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#004B87]/5 flex items-center justify-center text-[#004B87] shrink-0 font-bold">1</div>
                    <div className="space-y-1">
                      <div className="font-black text-lg text-prixgen-dark flex items-center gap-2">
                        Dedicated Senior Odoo Developer
                        <span className="text-[10px] font-black text-[#004B87] bg-[#004B87]/5 px-2 py-0.5 rounded-md uppercase tracking-wider">100% Allocation</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Python & Odoo framework expert, integrated directly into your Slack, Git, and Jira.</p>
                    </div>
                  </div>

                  {/* Role 2 */}
                  <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-[#004B87]/20 hover:shadow-md transition-all flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 flex items-center justify-center text-indigo-500 shrink-0 font-bold">2</div>
                    <div className="space-y-1">
                      <div className="font-black text-lg text-prixgen-dark flex items-center gap-2">
                        Senior Solutions Architect
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded-md uppercase tracking-wider">Scoping & Code Review</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Oversight and code quality governance. Ensures custom models conform to Odoo core API best practices.</p>
                    </div>
                  </div>

                  {/* Role 3 */}
                  <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-[#004B87]/20 hover:shadow-md transition-all flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 flex items-center justify-center text-emerald-500 shrink-0 font-bold">3</div>
                    <div className="space-y-1">
                      <div className="font-black text-lg text-prixgen-dark flex items-center gap-2">
                        DevOps & CI/CD Engineer
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-md uppercase tracking-wider">Deployment Support</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Configures automated testing runners, staging environments, and zero-downtime release pipelines.</p>
                    </div>
                  </div>

                  {/* Role 4 */}
                  <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-[#004B87]/20 hover:shadow-md transition-all flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/5 flex items-center justify-center text-amber-500 shrink-0 font-bold">4</div>
                    <div className="space-y-1">
                      <div className="font-black text-lg text-prixgen-dark flex items-center gap-2">
                        Database Administrator (DBA)
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50/50 px-2 py-0.5 rounded-md uppercase tracking-wider">Performance Tuning</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">PostgreSQL indexing, query optimization, database security auditing, and transaction logs optimization.</p>
                    </div>
                  </div>

                  {/* Role 5 */}
                  <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-[#004B87]/20 hover:shadow-md transition-all flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/5 flex items-center justify-center text-purple-500 shrink-0 font-bold">5</div>
                    <div className="space-y-1">
                      <div className="font-black text-lg text-prixgen-dark flex items-center gap-2">
                        Functional ERP Consultant
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50/50 px-2 py-0.5 rounded-md uppercase tracking-wider">Business Alignment</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Ensures written code maps exactly to real physical operations, inventory workflows, and reporting requirements.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK & DEPLOYMENT ARCHITECTURE */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl space-y-4">
                <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs">Standardized Stack</span>
                <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter">
                  Enterprise Tech Stack & <span className="text-prixgen-blue">Deployment Standards</span>
                </h2>
                <p className="text-lg text-slate-500 font-semibold leading-relaxed">
                  We deploy standardized, high-performance tech stacks. No legacy shortcuts. Everything is optimized for cloud availability and automated pipelines.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category 1 */}
              <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-[#004B87]/5 rounded-xl flex items-center justify-center text-[#004B87]">
                    <Cpu size={20} />
                  </div>
                  <h4 className="text-xl font-black text-prixgen-dark">Core Technologies</h4>
                  <p className="text-sm text-slate-400 font-medium">The foundation of every custom enterprise application we design.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-8">
                  {["Python", "Odoo Framework", "PostgreSQL", "React", "Tailwind CSS", "XML"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-600 hover:border-[#004B87]/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-indigo-500/5 rounded-xl flex items-center justify-center text-indigo-500">
                    <Activity size={20} />
                  </div>
                  <h4 className="text-xl font-black text-prixgen-dark">Integrations & IoT</h4>
                  <p className="text-sm text-slate-400 font-medium">Connecting ERP core modules to the physical shop floor and external applications.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-8">
                  {["MQTT", "OPC UA", "REST APIs", "GraphQL", "Webhooks", "gRPC"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-600 hover:border-[#004B87]/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-emerald-500/5 rounded-xl flex items-center justify-center text-emerald-500">
                    <Server size={20} />
                  </div>
                  <h4 className="text-xl font-black text-prixgen-dark">DevOps & Cloud</h4>
                  <p className="text-sm text-slate-400 font-medium">Standardized hosting environments and automated deployment pipelines.</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-8">
                  {["Docker", "Kubernetes", "AWS", "GCP", "GitHub Actions", "GitLab CI"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-600 hover:border-[#004B87]/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENTERPRISE RELIABILITY FRAMEWORK */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Title & Subtext */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs">Risk Mitigation</span>
                <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter leading-tight">
                  The Enterprise <br />
                  <span className="text-[#004B87]">Reliability Framework</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  ERP downtime is a production stoppage. We enforce rigorous QA protocols, dry-run data migrations, and automated regression testing to guarantee zero operational interruption during version upgrades.
                </p>
                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                  <ShieldCheck className="text-amber-500 shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-slate-600 font-bold leading-relaxed">
                    Clients report 100% data integrity and zero downtime on major version updates since we deployed our automated testing runners.
                  </p>
                </div>
              </div>

              {/* Right Column: Step Breakdown */}
              <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-10 relative">
                <div className="absolute top-0 bottom-0 left-[27px] w-0.5 bg-slate-100 hidden sm:block" />

                {[
                  {
                    step: "01",
                    title: "Automated Regressions & Testing",
                    desc: "Every custom module is tested using Odoo's test framework (odoo.tests). Code changes trigger automated regression test runs in staging before deployment."
                  },
                  {
                    step: "02",
                    title: "Sanitized Staging Environments",
                    desc: "We build exact clones of your production environment. Updates are thoroughly vetted against realistic transactional loads, never directly in production."
                  },
                  {
                    step: "03",
                    title: "Zero-Data-Loss Migration Protocols",
                    desc: "Our DBAs specialize in secure, dry-run schema migrations. We handle complex data sanitization and verify database integrity at every milestone."
                  },
                  {
                    step: "04",
                    title: "Continuous DevOps & Rollbacks",
                    desc: "Deployments are managed via GitLab/GitHub CI/CD pipelines with automated rollback scripts, ensuring 99.9% availability during version upgrades."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 relative group">
                    <div className="w-14 h-14 rounded-full bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center font-black text-prixgen-blue text-lg shrink-0 group-hover:bg-[#004B87] group-hover:text-white transition-colors relative z-10">
                      {item.step}
                    </div>
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xl font-black text-prixgen-dark group-hover:text-[#004B87] transition-colors">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. ENGAGEMENT MODEL */}
      <section className="py-20 lg:py-32 bg-slate-50 border-t border-b border-slate-200/60 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
              <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs">Onboarding Roadmap</span>
              <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter">
                Three Steps to Onboard On-Demand Talent
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Our onboarding process is frictionless and designed to integrate developers into your active sprints within 14 days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Technical Discovery",
                  desc: "We align on your system architecture, scoping documents, active code repositories, and developer seniority requirements."
                },
                {
                  step: "02",
                  title: "Developer Selection & Pod Assignment",
                  desc: "Review resume shortlists and interview pre-vetted engineers. Once selected, we assign your supporting Solutions Architect, DevOps, and DBA resources."
                },
                {
                  step: "03",
                  title: "Agile Kickoff & Workspace Sync",
                  desc: "Developers join your communication channels (Slack/Teams), configure local environments, sync with your Jira board, and start daily standups."
                }
              ].map((item, index) => (
                <div key={index} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="text-6xl font-black text-slate-100">{item.step}</div>
                    <h3 className="text-xl font-black text-prixgen-dark">{item.title}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM LEAD CAPTURE FORM SECTION */}
      <section id="contact-form-section" className="py-20 lg:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#004B87] to-indigo-900 rounded-[3.5rem] p-12 lg:p-24 overflow-hidden shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/[0.02] blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Side: Pitch */}
                <div className="lg:col-span-7 text-left space-y-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-black text-xs uppercase tracking-wider">
                    <span className="w-2 h-2 bg-prixgen-lightblue rounded-full animate-pulse" />
                    Connect with Architects
                  </span>
                  <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                    Ready to scale your <br />
                    <span className="text-prixgen-lightblue italic font-medium">technical capacity?</span>
                  </h2>
                  <p className="text-lg text-indigo-100/80 font-medium leading-relaxed max-w-xl">
                    Submit your details to schedule a dedicated technical brief. Speak directly with our solutions architect to outline your scope and timeline.
                  </p>
                  
                  <div className="border-t border-white/10 pt-8 grid grid-cols-2 gap-8 text-white">
                    <div className="space-y-1">
                      <div className="text-2xl font-black">14 Days</div>
                      <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Average Onboarding Time</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-black">98.4%</div>
                      <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Developer Retention Rate</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:col-span-5 bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] shadow-2xl border border-white/20">
                  <div className="mb-6 border-b border-slate-100 pb-4">
                    <h4 className="text-xl font-black text-prixgen-blue">Secure Your Pod</h4>
                    <p className="text-xs text-slate-500 font-bold mt-1">Submit your requirements and an architect will contact you.</p>
                  </div>
                  <div className="scale-95 origin-top">
                    <LeadCaptureForm source="Service: Hire Odoo Developers" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// 8. ERP HUB MOTION GRAPHIC (SVG + FRAMER MOTION)
function ErpHubMotionGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center pointer-events-none">
      {/* Central glow */}
      <div className="absolute w-[200px] h-[200px] bg-prixgen-blue/10 rounded-full blur-[50px] animate-pulse" />
      
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        <defs>
          <radialGradient id="odooGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#004B87" stopOpacity="0" />
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#004B87" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Orbit Rings */}
        <motion.circle
          cx="200"
          cy="200"
          r="80"
          fill="none"
          stroke="#004B87"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="opacity-20"
        />
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="#00A3E0"
          strokeWidth="1.5"
          strokeDasharray="8 8"
          className="opacity-30"
        />
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#004B87"
          strokeWidth="0.75"
          className="opacity-15"
        />

        {/* Outer Orbit Animation */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {/* Node 1: Python */}
          <g transform="translate(200, 20)">
            <circle r="18" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#004B87" fontSize="10" fontWeight="900">Py</text>
          </g>
          {/* Node 2: PostgreSQL */}
          <g transform="translate(380, 200)">
            <circle r="18" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#00A3E0" fontSize="9" fontWeight="900">SQL</text>
          </g>
          {/* Node 3: IoT / Edge */}
          <g transform="translate(200, 380)">
            <circle r="18" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#004B87" fontSize="9" fontWeight="900">IoT</text>
          </g>
          {/* Node 4: AI Forecasting */}
          <g transform="translate(20, 200)">
            <circle r="18" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#00A3E0" fontSize="9" fontWeight="900">AI</text>
          </g>
        </motion.g>

        {/* Inner Orbit Animation */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {/* Node 5: WMS Routing */}
          <g transform="translate(200, 120)">
            <circle r="14" fill="#004B87" filter="url(#shadow)" />
            <text y="3" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">WMS</text>
          </g>
          {/* Node 6: API Bridges */}
          <g transform="translate(200, 280)">
            <circle r="14" fill="#00A3E0" filter="url(#shadow)" />
            <text y="3" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">API</text>
          </g>
        </motion.g>

        {/* Central Core: Odoo */}
        <circle cx="200" cy="200" r="45" fill="url(#odooGlow)" />
        <circle cx="200" cy="200" r="32" fill="white" stroke="#004B87" strokeWidth="3" filter="url(#shadow)" />
        <text y="196" x="200" textAnchor="middle" fill="#004B87" fontSize="9" fontWeight="900" letterSpacing="0.05em">PRIXGEN</text>
        <text y="209" x="200" textAnchor="middle" fill="#00A3E0" fontSize="10" fontWeight="900" letterSpacing="0.1em">ODOO</text>
        <text y="220" x="200" textAnchor="middle" fill="#B45309" fontSize="6" fontWeight="bold" letterSpacing="0.05em">GOLD</text>
      </svg>
    </div>
  );
}

// 9. PRIXGEN POD GRAPHIC (SVG + FRAMER MOTION)
function PrixgenPodGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto flex items-center justify-center bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-6 overflow-hidden">
      {/* Background glow grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#004B87 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
        <defs>
          <filter id="shadow-pod" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="3" floodColor="#004B87" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Connection lines from supporting roles to Client Team (center) */}
        {/* Solutions Architect Connection */}
        <motion.line
          x1="70" y1="70" x2="200" y2="150"
          stroke="#004B87" strokeWidth="2" strokeDasharray="6 4"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        {/* DBA Connection */}
        <motion.line
          x1="330" y1="70" x2="200" y2="150"
          stroke="#004B87" strokeWidth="2" strokeDasharray="6 4"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        />
        {/* DevOps Connection */}
        <motion.line
          x1="70" y1="230" x2="200" y2="150"
          stroke="#004B87" strokeWidth="2" strokeDasharray="6 4"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
        />
        {/* Functional Consultant Connection */}
        <motion.line
          x1="330" y1="230" x2="200" y2="150"
          stroke="#004B87" strokeWidth="2" strokeDasharray="6 4"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        />
        {/* Developer (Core Partner) Connection - solid & thick */}
        <motion.line
          x1="200" y1="50" x2="200" y2="150"
          stroke="#00A3E0" strokeWidth="3"
        />

        {/* Nodes */}
        {/* 1. Central Node: Client Core */}
        <circle cx="200" cy="150" r="32" fill="#1A1A1A" stroke="white" strokeWidth="2" filter="url(#shadow-pod)" />
        <text y="148" x="200" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">CLIENT</text>
        <text y="158" x="200" textAnchor="middle" fill="#00A3E0" fontSize="8" fontWeight="black">CORE</text>

        {/* 2. Solutions Architect Node (Top Left) */}
        <circle cx="70" cy="70" r="22" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow-pod)" />
        <text y="73" x="70" textAnchor="middle" fill="#004B87" fontSize="8" fontWeight="black">SA</text>

        {/* 3. DBA Node (Top Right) */}
        <circle cx="330" cy="70" r="22" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow-pod)" />
        <text y="73" x="330" textAnchor="middle" fill="#004B87" fontSize="8" fontWeight="black">DBA</text>

        {/* 4. DevOps Node (Bottom Left) */}
        <circle cx="70" cy="230" r="22" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow-pod)" />
        <text y="233" x="70" textAnchor="middle" fill="#004B87" fontSize="7" fontWeight="black">DEVOPS</text>

        {/* 5. Functional Consultant Node (Bottom Right) */}
        <circle cx="330" cy="230" r="22" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow-pod)" />
        <text y="233" x="330" textAnchor="middle" fill="#004B87" fontSize="8" fontWeight="black">FC</text>

        {/* 6. Dedicated Developer Node (Top Center) */}
        <circle cx="200" cy="50" r="24" fill="#00A3E0" stroke="white" strokeWidth="2" filter="url(#shadow-pod)" />
        <text y="48" x="200" textAnchor="middle" fill="white" fontSize="8" fontWeight="black">ODOO</text>
        <text y="58" x="200" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">DEV</text>
      </svg>
    </div>
  );
}
