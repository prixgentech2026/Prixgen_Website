'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { motion } from 'framer-motion';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { PortableText } from '@/components/ui/portable-text';
import { solutionsData } from '@/lib/data';
import { Magnetic } from '@/components/animations/magnetic';
import { RevealText } from '@/components/animations/reveal-text';
import { Parallax } from '@/components/animations/parallax';
import { Floating } from '@/components/animations/floating';
import { AnimatedConnector } from '@/components/shared/animated-connector';
import { HeroBadge } from '@/components/shared/hero-badge';
import { HeroBackground } from '@/components/shared/hero-background';
import { urlFor } from '@/sanity/lib/image';
import { ArrowLeft } from 'lucide-react';

export default function SolutionClientPage({ solution }: { solution: any }) {
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

  const bannerImageUrl = getImageUrl(solution.summaryImage) || getImageUrl(solution.featuredImage) || solution.externalImageUrl;
  const bannerImageAlt = solution.summaryImage?.altText || solution.featuredImage?.altText || solution.title;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <JsonLd 
        type="Service" 
        data={{ 
          name: solution.title, 
          description: solution.seo?.metaDesc,
          provider: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        data={{ 
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prixgen.com" },
            { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.prixgen.com/solutions" },
            { "@type": "ListItem", position: 3, name: solution.title, item: `https://www.prixgen.com/solutions/${solution.slug}` }
          ]
        }} 
      />

      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-center pt-24 pb-8 overflow-hidden bg-white">
        <HeroBackground />
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
          <FadeUp delay={0.1} className="space-y-3 flex flex-col items-center text-center">
            <Link 
              href="/solutions" 
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue hover:bg-prixgen-blue hover:text-white transition-all font-black text-[10px] uppercase tracking-widest group mb-1"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Solutions
            </Link>
            
            <StaggerText 
              text={solution.title} 
              variant="gradient"
              className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-center"
            />
            
            <div className="max-w-3xl mx-auto pt-2 text-center">
              <RevealText delay={0.2}>
                <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                  {solution.headline}
                </p>
              </RevealText>
            </div>
          </FadeUp>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
          <AnimatedConnector height="h-32" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 lg:py-10">
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
                <PortableText value={solution.content} />
              </div>
            </FadeUp>

            {/* Key Capabilities / Features */}
            <div className="pt-8">
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-bold text-prixgen-dark tracking-tighter mb-10">
                  Solution <span className="italic text-prixgen-blue text-opacity-80">Capabilities</span>
                </h2>
              </FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {solution.features?.map((feature: any, i: number) => (
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
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-prixgen-blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
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

            {/* Strategic Outcomes Banner */}
            <FadeUp delay={0.2} className="relative rounded-[3rem] bg-prixgen-dark overflow-hidden p-6 lg:p-12 my-6 shadow-2xl">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-prixgen-blue/40 to-transparent opacity-30 pointer-events-none" />
               
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
                  <div className="space-y-3">
                     <div className="text-4xl font-black text-prixgen-lightblue tracking-tighter">Zero</div>
                     <h4 className="font-bold text-lg">System Latency</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Optimize performance and eliminate bottlenecks across your entire digital ecosystem.</p>
                  </div>
                  <div className="space-y-3">
                     <div className="text-4xl font-black text-prixgen-lightblue tracking-tighter">Scalable</div>
                     <h4 className="font-bold text-lg">Architecture</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Achieve robust growth with technical designs built to expand with your enterprise.</p>
                  </div>
                  <div className="space-y-3">
                     <div className="text-4xl font-black text-prixgen-lightblue tracking-tighter">Verified</div>
                     <h4 className="font-bold text-lg">Technical ROI</h4>
                     <p className="text-white/60 text-sm leading-relaxed">Deploy high-performance industrial solutions that deliver measurable business value.</p>
                  </div>
               </div>
            </FadeUp>

            {/* Process Section - Vertical Timeline */}
            {solution.process && solution.process.length > 0 && (
              <section className="pt-8">
                <FadeUp>
                  <h2 className="text-3xl md:text-4xl font-bold text-prixgen-dark tracking-tighter mb-12">
                    Implementation <span className="italic text-prixgen-blue text-opacity-80">Roadmap</span>
                  </h2>
                </FadeUp>
                <div className="space-y-0 relative pl-4 md:pl-8">
                  {/* Vertical Line */}
                  <div className="absolute top-0 bottom-0 left-[27px] md:left-[43px] w-0.5 bg-gradient-to-b from-prixgen-blue/30 via-slate-200 to-transparent" />
                  
                  {solution.process.map((step: any, i: number) => (
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
                <h3 className="text-2xl font-bold mb-6 text-prixgen-blue relative z-10">Solution Audit</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium relative z-10">
                  Discuss how our specialized {solution.title} architectures can eliminate operational friction and technical debt.
                </p>
                <div className="relative z-10">
                  <LeadCaptureForm source={`Solution: ${solution.title}`} />
                </div>
              </FadeUp>

              {/* Related Solutions */}
              <div className="p-10 bg-prixgen-blue/[0.02] rounded-[3rem] border border-prixgen-blue/5">
                <h4 className="text-lg font-bold text-prixgen-dark mb-6 uppercase tracking-widest opacity-50">Related Solutions</h4>
                <div className="space-y-4">
                  {solutionsData
                    .filter(s => s.slug !== solution.slug)
                    .slice(0, 4)
                    .map((related, i) => (
                      <Link 
                        key={i} 
                        href={`/solutions/${related.slug}`}
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
