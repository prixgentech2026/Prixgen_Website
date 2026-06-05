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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-prixgen-blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
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
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-prixgen-blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
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
                <div className="relative p-[1px] overflow-hidden rounded-full group bg-[#004B87]/20 shadow-sm hover:shadow-[0_0_15px_rgba(0,75,135,0.15)] transition-all duration-300">
                  <motion.div
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                  <span className="relative px-4 py-2 rounded-full bg-white text-[#004B87] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                    <Award size={14} className="text-amber-500 fill-amber-500/20" /> Odoo Gold Partner
                    <span className="relative flex h-1.5 w-1.5 ml-0.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                  </span>
                </div>
                <div className="relative p-[1px] overflow-hidden rounded-full group bg-slate-200 shadow-sm hover:shadow-[0_0_15px_rgba(0,163,224,0.15)] transition-all duration-300">
                  <motion.div
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-prixgen-lightblue to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                  <span className="relative px-4 py-2 rounded-full bg-white text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                    <Globe size={14} /> Mysuru Engineering Hub
                    <span className="relative flex h-1.5 w-1.5 ml-0.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prixgen-lightblue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-prixgen-blue"></span>
                    </span>
                  </span>
                </div>
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
              <FadeUp delay={0.4} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4 w-full sm:w-auto">
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
      <section className="py-10 lg:py-16 bg-slate-50 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#004B87 1px, transparent 1px), linear-gradient(90deg, #004B87 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Centered Header Block with Motion Animations */}
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4 flex flex-col items-center">
            <RevealText>
              <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs block">Architectural Leadership</span>
            </RevealText>
            <h2 className="text-4xl md:text-6xl font-black text-prixgen-dark tracking-tighter flex flex-wrap justify-center gap-x-[0.25em]">
              {["Intelligent", "ERP"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue"
              >
                Architects
              </motion.span>
            </h2>
            <RevealText delay={0.15}>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                We shift the focus from basic code tweaks to full-spectrum enterprise integration and industrial-grade reliability.
              </p>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <FadeUp delay={0.1} className="group">
              <div className="h-full p-10 bg-white border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] hover:border-prixgen-blue/20 hover:shadow-[0_30px_60px_-15px_rgba(0,75,135,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.06] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/[0.15]" />
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.06] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/[0.15]" />
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.06] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/[0.15]" />
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004B87]/[0.06] rounded-bl-[2.5rem] transition-all group-hover:bg-[#004B87]/[0.15]" />
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
      <section id="pricing-pod-section" className="py-10 lg:py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              {/* Left Column: Pod Pitch & Engagement Models */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <RevealText>
                    <span className="text-prixgen-lightblue font-black tracking-[0.2em] uppercase text-xs block">Maximum Resource ROI</span>
                  </RevealText>
                  <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter leading-tight flex flex-wrap gap-x-[0.25em]">
                    {["The", "Pod", "Advantage:"].map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                    {["Enterprise", "Power,", "Zero", "Overhead"].map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: (i + 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block text-prixgen-blue"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h2>
                  <RevealText delay={0.35}>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed font-semibold">
                      A single developer cannot build, secure, and deploy an enterprise ERP alone. When you hire a full-time Prixgen Odoo developer, we allocate a comprehensive engineering pod to support them—at zero additional overhead cost to your business.
                    </p>
                  </RevealText>
                </div>

                {/* Flexible Scaling Card (Replaces Price Callout) */}
                <FadeUp delay={0.4} className="group">
                  <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#004B87] to-indigo-900 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                    <div className="space-y-8 relative z-10">
                      <div className="text-sm font-bold opacity-60 uppercase tracking-widest font-black">Capacity Scaling Models</div>

                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="font-bold text-base">Dedicated Developer Pod</span>
                          <span className="text-[10px] bg-prixgen-lightblue/30 text-prixgen-lightblue px-2.5 py-1.5 rounded-md font-black uppercase tracking-wider">Full Time</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="font-bold text-base">Fractional ERP Architect</span>
                          <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2.5 py-1.5 rounded-md font-black uppercase tracking-wider">Part Time</span>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                          <span className="font-bold text-base">Project-Based Sprint Pods</span>
                          <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2.5 py-1.5 rounded-md font-black uppercase tracking-wider">Milestone</span>
                        </div>
                      </div>

                      <p className="text-sm opacity-80 leading-relaxed font-medium">
                        All engagement tiers grant full access to Prixgen's Mysuru Hub supporting resources at zero overhead cost.
                      </p>
                      <button
                        onClick={handleScrollToForm}
                        className="w-full py-5 bg-prixgen-lightblue hover:bg-prixgen-lightblue/90 text-white rounded-xl font-black text-sm uppercase tracking-wider transition-colors shadow-lg shadow-prixgen-lightblue/25 cursor-pointer"
                      >
                        Request Capacity Briefing
                      </button>
                    </div>
                  </div>
                </FadeUp>

                {/* SLA & Security Guarantees Card */}
                <FadeUp delay={0.5} className="group">
                  <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-8 text-left">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-prixgen-dark uppercase tracking-wider">SLA & Security Guarantees</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">We protect your workflows with enterprise-grade operational standards.</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0">100% Risk Free</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 bg-white rounded-2xl border border-slate-100/80 space-y-3 shadow-sm hover:border-[#004B87]/20 transition-all duration-300">
                        <div className="text-[#004B87] font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck size={16} className="text-emerald-500" /> IP & Code Security
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Secure development environments, strict NDAs, and full IP protection transfer on code delivery.</p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-slate-100/80 space-y-3 shadow-sm hover:border-[#004B87]/20 transition-all duration-300">
                        <div className="text-[#004B87] font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                          <Activity size={16} className="text-prixgen-lightblue" /> 99.9% Availability SLA
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Dedicated backup developers and immediate replacement resources to keep sprints active without delays.</p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-slate-100/80 space-y-3 shadow-sm hover:border-[#004B87]/20 transition-all duration-300">
                        <div className="text-[#004B87] font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                          <Zap size={16} className="text-amber-500" /> Workspace Integration
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Seamless sync with Jira, Slack, Teams, and git repositories to operate directly in your workflow.</p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-slate-100/80 space-y-3 shadow-sm hover:border-[#004B87]/20 transition-all duration-300">
                        <div className="text-[#004B87] font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu size={16} className="text-purple-500" /> Code Quality Reviews
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Weekly automated test runs and Solutions Architect reviews to maintain strict standards.</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* Right Column: Interactive Pod Roles & Connected Graphic */}
              <div className="lg:col-span-5 space-y-8">

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
      <section className="py-10 lg:py-16 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl space-y-4 text-left flex flex-col items-start">
                <RevealText>
                  <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs block">Standardized Stack</span>
                </RevealText>
                <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter flex flex-wrap gap-x-[0.25em]">
                  {["Enterprise", "Tech", "Stack", "&"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                  {["Deployment", "Standards"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: (i + 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-prixgen-blue"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>
                <RevealText delay={0.3}>
                  <p className="text-lg text-slate-500 font-semibold leading-relaxed">
                    We deploy standardized, high-performance tech stacks. No legacy shortcuts. Everything is optimized for cloud availability and automated pipelines.
                  </p>
                </RevealText>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Category 1 */}
              <FadeUp delay={0.1} className="group h-full">
                <div className="p-8 bg-gradient-to-br from-blue-50/30 via-white to-prixgen-blue/[0.03] border border-prixgen-blue/10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(0,75,135,0.05)] flex flex-col justify-between h-full hover:border-prixgen-blue/30 hover:shadow-[0_20px_45px_-15px_rgba(0,75,135,0.1)] transition-all duration-300">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-[#004B87]/5 rounded-xl flex items-center justify-center text-[#004B87]">
                      <Cpu size={20} />
                    </div>
                    <h4 className="text-xl font-black text-prixgen-dark">Core Technologies</h4>
                    <p className="text-sm text-slate-400 font-medium">The foundation of every custom enterprise application we design.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-8">
                    {["Python", "Odoo Framework", "PostgreSQL", "React", "Tailwind CSS", "XML"].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white border border-prixgen-blue/10 rounded-xl text-xs font-bold text-slate-600 hover:border-prixgen-blue/30 hover:bg-prixgen-blue/5 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Category 2 */}
              <FadeUp delay={0.2} className="group h-full">
                <div className="p-8 bg-gradient-to-br from-blue-50/30 via-white to-prixgen-blue/[0.03] border border-prixgen-blue/10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(0,75,135,0.05)] flex flex-col justify-between h-full hover:border-prixgen-blue/30 hover:shadow-[0_20px_45px_-15px_rgba(0,75,135,0.1)] transition-all duration-300">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-indigo-500/5 rounded-xl flex items-center justify-center text-indigo-500">
                      <Activity size={20} />
                    </div>
                    <h4 className="text-xl font-black text-prixgen-dark">Integrations & IoT</h4>
                    <p className="text-sm text-slate-400 font-medium">Connecting ERP core modules to the physical shop floor and external applications.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-8">
                    {["MQTT", "OPC UA", "REST APIs", "GraphQL", "Webhooks", "gRPC"].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white border border-prixgen-blue/10 rounded-xl text-xs font-bold text-slate-600 hover:border-prixgen-blue/30 hover:bg-prixgen-blue/5 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Category 3 */}
              <FadeUp delay={0.3} className="group h-full">
                <div className="p-8 bg-gradient-to-br from-blue-50/30 via-white to-prixgen-blue/[0.03] border border-prixgen-blue/10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(0,75,135,0.05)] flex flex-col justify-between h-full hover:border-prixgen-blue/30 hover:shadow-[0_20px_45px_-15px_rgba(0,75,135,0.1)] transition-all duration-300">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-emerald-500/5 rounded-xl flex items-center justify-center text-emerald-500">
                      <Server size={20} />
                    </div>
                    <h4 className="text-xl font-black text-prixgen-dark">DevOps & Cloud</h4>
                    <p className="text-sm text-slate-400 font-medium">Standardized hosting environments and automated deployment pipelines.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-8">
                    {["Docker", "Kubernetes", "AWS", "GCP", "GitHub Actions", "GitLab CI"].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white border border-prixgen-blue/10 rounded-xl text-xs font-bold text-slate-600 hover:border-prixgen-blue/30 hover:bg-prixgen-blue/5 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

            </div>
          </div>
        </div>
      </section>

      {/* 5. ENTERPRISE RELIABILITY FRAMEWORK */}
      <section className="py-10 lg:py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left Column: Title & Subtext */}
              <div className="lg:col-span-5 space-y-6 text-left flex flex-col items-start">
                <RevealText>
                  <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs block">Risk Mitigation</span>
                </RevealText>
                <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter leading-tight flex flex-wrap gap-x-[0.25em]">
                  {["The", "Enterprise"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                  {["Reliability", "Framework"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: (i + 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-[#004B87]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>
                <RevealText delay={0.35}>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    ERP downtime is a production stoppage. We enforce rigorous QA protocols, dry-run data migrations, and automated regression testing to guarantee zero operational interruption during version upgrades.
                  </p>
                </RevealText>
                <FadeUp delay={0.4} className="w-full">
                  <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                    <ShieldCheck className="text-amber-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-slate-600 font-bold leading-relaxed">
                      Clients report 100% data integrity and zero downtime on major version updates since we deployed our automated testing runners.
                    </p>
                  </div>
                </FadeUp>
                {/* Embedded Reliability Motion Graphic */}
                <FadeUp delay={0.45} className="w-full">
                  <ReliabilityMotionGraphic />
                </FadeUp>
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
                  <FadeUp key={index} delay={0.1 * (index + 1)} className="flex gap-6 relative group">
                    <div className="w-14 h-14 rounded-full bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center font-black text-prixgen-blue text-lg shrink-0 group-hover:bg-[#004B87] group-hover:text-white transition-colors relative z-10">
                      {item.step}
                    </div>
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xl font-black text-prixgen-dark group-hover:text-[#004B87] transition-colors">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. ENGAGEMENT MODEL */}
      <section className="py-10 lg:py-16 bg-slate-50 border-t border-b border-slate-200/60 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Centered Header Block with Motion Animations */}
            <div className="max-w-3xl mx-auto text-center mb-20 space-y-4 flex flex-col items-center">
              <RevealText>
                <span className="text-prixgen-blue font-black tracking-[0.2em] uppercase text-xs block">Onboarding Roadmap</span>
              </RevealText>
              <h2 className="text-4xl md:text-5xl font-black text-prixgen-dark tracking-tighter flex flex-wrap justify-center gap-x-[0.25em]">
                {["Three", "Steps", "to", "Onboard"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
                {["On-Demand", "Talent"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (i + 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-prixgen-blue"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
              <RevealText delay={0.35}>
                <p className="text-lg text-slate-500 font-medium">
                  Our onboarding process is frictionless and designed to integrate developers into your active sprints within 14 days.
                </p>
              </RevealText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    opacity: { duration: 0.5, delay: index * 0.1 },
                    y: { duration: 0.4 }
                  }}
                  className="group relative h-full flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-white border border-prixgen-blue/20 hover:border-prixgen-blue/50 shadow-[0_15px_40px_-20px_rgba(0,75,135,0.06)] hover:shadow-[0_25px_50px_-20px_rgba(0,75,135,0.15)] transition-all duration-300 overflow-hidden"
                >
                  {/* Ambient Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-prixgen-blue/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-prixgen-blue/5 to-transparent rounded-bl-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-sm font-black text-prixgen-blue uppercase tracking-widest bg-prixgen-blue/5 px-3.5 py-1.5 rounded-xl border border-prixgen-blue/10 transition-colors group-hover:bg-prixgen-blue group-hover:text-white">
                        Step {item.step}
                      </span>
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prixgen-blue/50 opacity-75 group-hover:block hidden"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-prixgen-blue/20 group-hover:bg-prixgen-blue transition-colors"></span>
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-prixgen-dark tracking-tight group-hover:text-prixgen-blue transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM LEAD CAPTURE & CAREERS SECTION */}
      <section id="contact-form-section" className="py-10 lg:py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

              {/* Card 1: Client Lead Capture */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative bg-gradient-to-br from-[#004B87] to-indigo-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-white/[0.02] blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-500/[0.02] blur-[60px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-white font-black text-[10px] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-prixgen-lightblue rounded-full animate-pulse" />
                    For Businesses
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight flex flex-wrap gap-x-[0.2em]">
                    {["Ready", "to", "scale", "your"].map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                    {["technical", "capacity?"].map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (i + 4) * 0.05 }}
                        className="inline-block text-prixgen-lightblue italic font-medium"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h2>

                  <p className="text-sm text-indigo-100/80 font-medium leading-relaxed">
                    Submit your requirements and schedule a briefing directly with our Solutions Architect to align on developer seniority, scope, and timeline.
                  </p>

                  <div className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/15 mt-4">
                    <div className="scale-95 origin-top">
                      <LeadCaptureForm source="Service: Hire Odoo Developers (Bottom Client)" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Careers diversion */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-prixgen-lightblue/[0.03] blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#004B87]/[0.05] blur-[60px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                <div className="space-y-8 relative z-10 flex flex-col h-full justify-between">
                  <div className="space-y-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-prixgen-lightblue font-black text-[10px] uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      We are Hiring
                    </span>

                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight flex flex-wrap gap-x-[0.2em]">
                      {["Looking", "for", "your", "next"].map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                      ))}
                      {["career", "leap?"].map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: (i + 4) * 0.05 }}
                          className="inline-block text-emerald-400 italic font-medium"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h2>

                    <p className="text-sm text-slate-300 font-medium leading-relaxed">
                      Are you an elite Python developer, Odoo framework expert, or ERP Solutions Architect? Join our engineering hub to work on complex industrial automation, AI-driven forecasting, and global IoT implementations.
                    </p>
                  </div>

                  <div className="space-y-4 py-4 border-t border-b border-white/5 my-2">
                    {[
                      "Work on global, industrial-scale projects",
                      "Accelerated path to Solutions Architect roles",
                      "Collaborative team at Mysuru Hub & hybrid modes",
                      "IP / Certification sponsorships and bonuses"
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-slate-300 text-sm font-semibold">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 space-y-4">
                    <Link href="/careers" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-black text-base uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        Explore Open Positions
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Or send resume directly to <a href="mailto:hr@prixgen.com" className="text-emerald-400 hover:underline">careers@prixgen.com</a>
                    </p>
                  </div>
                </div>
              </motion.div>

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

        {/* Orbit Ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="#00A3E0"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="opacity-30"
        />

        {/* Revolving Odoo Modules on the same dotted path */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {/* Node 1: Inventory */}
          <g transform="translate(200, 60)">
            <circle r="18" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#004B87" fontSize="8" fontWeight="900">INV</text>
          </g>
          {/* Node 2: CRM */}
          <g transform="translate(321, 130)">
            <circle r="18" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#00A3E0" fontSize="8" fontWeight="900">CRM</text>
          </g>
          {/* Node 3: Sales */}
          <g transform="translate(321, 270)">
            <circle r="18" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#004B87" fontSize="8" fontWeight="900">SALE</text>
          </g>
          {/* Node 4: Manufacturing */}
          <g transform="translate(200, 340)">
            <circle r="18" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#00A3E0" fontSize="8" fontWeight="900">MRP</text>
          </g>
          {/* Node 5: Accounting */}
          <g transform="translate(79, 270)">
            <circle r="18" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#004B87" fontSize="8" fontWeight="900">ACC</text>
          </g>
          {/* Node 6: HR */}
          <g transform="translate(79, 130)">
            <circle r="18" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow)" />
            <text y="4" textAnchor="middle" fill="#00A3E0" fontSize="8" fontWeight="900">HR</text>
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

// 10. VALUE PROP MOTION GRAPHIC
function ValuePropMotionGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center pointer-events-none">
      <div className="absolute w-[200px] h-[200px] bg-prixgen-blue/5 rounded-full blur-[40px] animate-pulse" />
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        <defs>
          <filter id="shadow-val" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="3" floodColor="#004B87" floodOpacity="0.12" />
          </filter>
          <linearGradient id="valGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004B87" />
            <stop offset="100%" stopColor="#00A3E0" />
          </linearGradient>
        </defs>

        {/* Orbit Rings */}
        <circle cx="200" cy="200" r="110" fill="none" stroke="#004B87" strokeWidth="1" strokeDasharray="4 6" className="opacity-20" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#00A3E0" strokeWidth="1" strokeDasharray="8 8" className="opacity-30" />

        {/* Crosshair guidelines */}
        <line x1="200" y1="50" x2="200" y2="350" stroke="#004B87" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-10" />
        <line x1="50" y1="200" x2="350" y2="200" stroke="#004B87" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-10" />

        {/* Connection lines with flow pulse */}
        <motion.line
          x1="200" y1="90" x2="200" y2="200"
          stroke="url(#valGrad)" strokeWidth="2" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <motion.line
          x1="310" y1="200" x2="200" y2="200"
          stroke="url(#valGrad)" strokeWidth="2" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        />
        <motion.line
          x1="200" y1="310" x2="200" y2="200"
          stroke="url(#valGrad)" strokeWidth="2" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
        />
        <motion.line
          x1="90" y1="200" x2="200" y2="200"
          stroke="url(#valGrad)" strokeWidth="2" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        />

        {/* Central Core: DB */}
        <circle cx="200" cy="200" r="30" fill="white" stroke="#004B87" strokeWidth="2.5" filter="url(#shadow-val)" />
        <path d="M190 190h20v4h-20zm0 6h20v4h-20zm0 6h20v4h-20z" fill="#004B87" />
        <text y="222" x="200" textAnchor="middle" fill="#004B87" fontSize="6" fontWeight="bold" letterSpacing="0.05em">CORE DB</text>

        {/* Node 1: AI / Brain (Top) */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <circle cx="200" cy="90" r="22" fill="#004B87" stroke="white" strokeWidth="2" filter="url(#shadow-val)" />
          {/* Brain Path */}
          <path d="M195 86a5 5 0 0 1 10 0v2a5 5 0 0 1-10 0zm4 6a3 3 0 0 0-3-3m5 0a3 3 0 0 1 3 3" stroke="white" strokeWidth="1.5" fill="none" />
          <text y="103" x="200" textAnchor="middle" fill="white" fontSize="6" fontWeight="black">AI CORE</text>
        </motion.g>

        {/* Node 2: IoT (Right) */}
        <motion.g
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <circle cx="310" cy="200" r="22" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow-val)" />
          {/* Antenna Path */}
          <circle cx="310" cy="200" r="3" fill="#00A3E0" />
          <path d="M305 195a8 8 0 0 1 10 0M302 192a12 12 0 0 1 16 0" stroke="#00A3E0" strokeWidth="1" fill="none" />
          <text y="213" x="310" textAnchor="middle" fill="#00A3E0" fontSize="6" fontWeight="black">IoT GATE</text>
        </motion.g>

        {/* Node 3: API (Bottom) */}
        <motion.g
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        >
          <circle cx="200" cy="310" r="22" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow-val)" />
          {/* API plug icon */}
          <path d="M194 306h12v4h-12zm2 4v4h8v-4z" fill="#004B87" />
          <text y="323" x="200" textAnchor="middle" fill="#004B87" fontSize="6" fontWeight="black">API LINK</text>
        </motion.g>

        {/* Node 4: WMS / Box (Left) */}
        <motion.g
          animate={{ x: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        >
          <circle cx="90" cy="200" r="22" fill="#004B87" stroke="white" strokeWidth="2" filter="url(#shadow-val)" />
          {/* Box Path */}
          <path d="M83 194h14v12H83z M83 198h14M90 194v12" stroke="white" strokeWidth="1.2" fill="none" />
          <text y="213" x="90" textAnchor="middle" fill="white" fontSize="6" fontWeight="black">WMS ENGINE</text>
        </motion.g>
      </svg>
    </div>
  );
}

// 11. TECH STACK MOTION GRAPHIC
function TechStackMotionGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[450px] mx-auto flex items-center justify-center bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#004B87 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
        <defs>
          <filter id="shadow-tech" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="3" floodColor="#004B87" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Flow Lines */}
        <motion.line
          x1="80" y1="150" x2="200" y2="150"
          stroke="#004B87" strokeWidth="2" strokeDasharray="6 4"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        <motion.line
          x1="200" y1="150" x2="320" y2="150"
          stroke="#00A3E0" strokeWidth="2" strokeDasharray="6 4"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />

        {/* Flowing particle packets */}
        <motion.circle
          cx="80" cy="150" r="4" fill="#00A3E0"
          animate={{ cx: [80, 200] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        <motion.circle
          cx="200" cy="150" r="4" fill="#004B87"
          animate={{ cx: [200, 320] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
        />

        {/* Node 1: Code (Git) */}
        <g transform="translate(80, 150)">
          <circle r="24" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow-tech)" />
          {/* Branch logo path */}
          <circle cx="-5" cy="5" r="3" fill="none" stroke="#004B87" strokeWidth="1.5" />
          <circle cx="5" cy="-5" r="3" fill="none" stroke="#004B87" strokeWidth="1.5" />
          <path d="M-5 2v-4a3 3 0 0 1 3-3h4" stroke="#004B87" strokeWidth="1.5" fill="none" />
          <text y="20" textAnchor="middle" fill="#004B87" fontSize="6" fontWeight="black" letterSpacing="0.05em">GIT COMMIT</text>
        </g>

        {/* Node 2: Test / Build (Docker) */}
        <g transform="translate(200, 150)">
          <circle r="26" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow-tech)" />
          {/* Animated gear spinner */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <circle r="8" fill="none" stroke="#00A3E0" strokeWidth="2" strokeDasharray="3 2" />
          </motion.g>
          <text y="21" textAnchor="middle" fill="#00A3E0" fontSize="6" fontWeight="black" letterSpacing="0.05em">CI RUNNER</text>
        </g>

        {/* Node 3: Deploy (Cloud) */}
        <g transform="translate(320, 150)">
          <circle r="24" fill="#004B87" stroke="white" strokeWidth="2" filter="url(#shadow-tech)" />
          {/* Cloud logo path */}
          <path d="M-10 2a4 4 0 0 1 3-3 5 5 0 0 1 8 0 4 4 0 0 1 3 3h-14z" fill="white" />
          <text y="20" textAnchor="middle" fill="white" fontSize="6" fontWeight="black" letterSpacing="0.05em">CLOUD DEPLOY</text>
        </g>
      </svg>
    </div>
  );
}

// 12. RELIABILITY MOTION GRAPHIC
function ReliabilityMotionGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center pointer-events-none mt-6">
      <div className="absolute w-[160px] h-[160px] bg-emerald-500/5 rounded-full blur-[40px] animate-pulse" />
      <svg viewBox="0 0 300 300" className="w-full h-full relative z-10">
        <defs>
          <filter id="shadow-rel" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#10B981" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Uptime Arc gauge */}
        <path
          d="M 60 180 A 90 90 0 1 1 240 180"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.path
          d="M 60 180 A 90 90 0 1 1 240 180"
          fill="none"
          stroke="#10B981"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="420"
          initial={{ strokeDashoffset: 420 }}
          animate={{ strokeDashoffset: 15 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Needle Gauge */}
        <g transform="translate(150, 180)">
          <motion.path
            d="M -3 0 L -1 -58 L -6 -58 L 0 -76 L 6 -58 L 1 -58 L 3 0 Z"
            fill="#1A1A1A"
            initial={{ rotate: -90 }}
            animate={{ rotate: [80, 83, 80] }}
            transition={{ rotate: { repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }, default: { duration: 2, ease: "easeOut" } }}
            style={{ transformOrigin: "bottom center" }}
          />
          <circle cx="0" cy="0" r="10" fill="#1A1A1A" />
          <circle cx="0" cy="0" r="4" fill="white" />
        </g>

        {/* Uptime Status Info */}
        <text y="220" x="150" textAnchor="middle" fill="#10B981" fontSize="22" fontWeight="900" letterSpacing="-0.02em">99.9%</text>
        <text y="240" x="150" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="bold" letterSpacing="0.15em">MONITORED SLA</text>

        {/* Shield icon element */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          transform="translate(150, 80)"
        >
          <path d="M-10-10 L0-14 L10-10 L10 0 C10 6 6 12 0 14 C-6 12-10 6-10 0 Z" fill="#10B981" filter="url(#shadow-rel)" />
          <path d="M-5-4 L-1 0 L5-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </svg>
    </div>
  );
}

// 13. ONBOARDING MOTION GRAPHIC
function OnboardingMotionGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[450px] mx-auto flex items-center justify-center bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#004B87 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
        <defs>
          <filter id="shadow-onb" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="3" floodColor="#004B87" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Connecting timeline path */}
        <motion.path
          d="M 70 150 Q 135 100 200 150 T 330 150"
          fill="none"
          stroke="#004B87"
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />

        {/* Onboarding Node 1 */}
        <g transform="translate(70, 150)">
          <circle r="22" fill="white" stroke="#004B87" strokeWidth="2" filter="url(#shadow-onb)" />
          <text y="4" textAnchor="middle" fill="#004B87" fontSize="10" fontWeight="black">01</text>
          <text y="32" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="bold">DISCOVERY</text>
        </g>

        {/* Onboarding Node 2 */}
        <g transform="translate(200, 150)">
          <circle r="24" fill="white" stroke="#00A3E0" strokeWidth="2" filter="url(#shadow-onb)" />
          {/* Supporting pod orbiting circles */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          >
            <circle cx="0" cy="-32" r="6" fill="#004B87" />
            <circle cx="-28" cy="16" r="6" fill="#10B981" />
            <circle cx="28" cy="16" r="6" fill="#F59E0B" />
          </motion.g>
          <text y="4" textAnchor="middle" fill="#00A3E0" fontSize="10" fontWeight="black">02</text>
          <text y="35" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="bold">POD ASSIGN</text>
        </g>

        {/* Onboarding Node 3 */}
        <g transform="translate(330, 150)">
          <circle r="22" fill="#004B87" stroke="white" strokeWidth="2" filter="url(#shadow-onb)" />
          {/* Rocket path */}
          <path d="M-5 5L0-7L5 5L0 2Z" fill="white" />
          <text y="32" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="bold">KICKOFF</text>
        </g>
      </svg>
    </div>
  );
}

// 14. LEAD FORM MOTION GRAPHIC
function LeadFormMotionGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center pointer-events-none">
      <div className="absolute w-[100px] h-[100px] bg-prixgen-blue/15 rounded-full blur-[25px] animate-pulse" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        <defs>
          <filter id="shadow-lf" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="#00A3E0" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Pulsing connections */}
        <motion.line x1="100" y1="100" x2="100" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
        <motion.line x1="100" y1="100" x2="40" y2="100" stroke="white" strokeWidth="1" opacity="0.4" />
        <motion.line x1="100" y1="100" x2="160" y2="100" stroke="white" strokeWidth="1" opacity="0.4" />
        <motion.line x1="100" y1="100" x2="100" y2="160" stroke="white" strokeWidth="1" opacity="0.4" />

        {/* Radar Sweeper */}
        <motion.circle
          cx="100" cy="100" r="60" fill="none" stroke="#00A3E0" strokeWidth="1.5"
          initial={{ scale: 0.1, opacity: 0.8 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
        />

        {/* Central Client Node */}
        <circle cx="100" cy="100" r="16" fill="white" stroke="#004B87" strokeWidth="2.5" filter="url(#shadow-lf)" />
        <text y="103" x="100" textAnchor="middle" fill="#004B87" fontSize="8" fontWeight="black">YOU</text>

        {/* Orbital Dev Nodes */}
        {/* Node SA */}
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <circle cx="100" cy="40" r="12" fill="#00A3E0" stroke="white" strokeWidth="1.5" />
          <text y="43" x="100" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">SA</text>
        </motion.g>
        {/* Node DBA */}
        <motion.g animate={{ x: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
          <circle cx="40" cy="100" r="12" fill="#00A3E0" stroke="white" strokeWidth="1.5" />
          <text y="103" x="40" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">DBA</text>
        </motion.g>
        {/* Node DEV */}
        <motion.g animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <circle cx="160" cy="100" r="12" fill="#00A3E0" stroke="white" strokeWidth="1.5" />
          <text y="103" x="160" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">DEV</text>
        </motion.g>
        {/* Node OPS */}
        <motion.g animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}>
          <circle cx="100" cy="160" r="12" fill="#00A3E0" stroke="white" strokeWidth="1.5" />
          <text y="163" x="100" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">OPS</text>
        </motion.g>
      </svg>
    </div>
  );
}
