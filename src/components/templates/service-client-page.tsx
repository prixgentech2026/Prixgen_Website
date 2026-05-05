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
import { servicesData } from '@/lib/data';

export default function ServiceClientPage({ service }: { service: any }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AmbientGlow />
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
      <section className="relative min-h-[75vh] flex items-center pt-24 pb-12 overflow-hidden bg-white">
        <AmbientGlow />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeUp className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-2 text-[10px] font-black text-prixgen-blue/40 uppercase tracking-[0.2em]"
            >
              <Link href="/" className="hover:text-prixgen-blue transition-colors">Home</Link>
              <span className="opacity-20">/</span>
              <Link href="/services" className="hover:text-prixgen-blue transition-colors">Services</Link>
              <span className="opacity-20">/</span>
              <span className="text-prixgen-blue">{service.title}</span>
            </motion.div>
            
            <StaggerText 
              text={service.title} 
              variant="gradient"
              className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter"
            />
            
            <div className="max-w-4xl mx-auto pt-6">
              <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
                {service.headline}
              </p>
            </div>
          </FadeUp>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-10 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-prixgen-blue">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-prixgen-blue to-transparent" />
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <article className="lg:col-span-2 space-y-16">
            {service.featuredImage && (
              <FadeUp delay={0.2} className="relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={service.featuredImage.sourceUrl}
                  alt={service.featuredImage.altText || service.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </FadeUp>
            )}

            <FadeUp delay={0.3} className="space-y-12">
              <div className="prose prose-xl max-w-none prose-headings:text-prixgen-blue prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-prixgen-blue">
                <PortableText value={service.content} />
              </div>

              {/* Unique Features / Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {service.features?.map((feature: any, i: number) => (
                  <div key={i} className="p-8 bg-prixgen-blue/[0.03] border border-prixgen-blue/5 rounded-[2rem] hover:bg-prixgen-blue/[0.06] transition-colors">
                    <h4 className="text-xl font-bold text-prixgen-blue mb-3">{feature.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Process Section */}
            <section className="pt-16 border-t border-prixgen-blue/5">
              <h2 className="text-3xl md:text-5xl font-bold text-prixgen-dark tracking-tighter mb-12">
                Our <span className="italic text-prixgen-blue">Methodology</span>
              </h2>
              <div className="space-y-12">
                {service.process?.map((step: any, i: number) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-prixgen-blue text-white flex items-center justify-center font-black text-xl shadow-lg shadow-prixgen-blue/20">
                      {i + 1}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-prixgen-dark group-hover:text-prixgen-blue transition-colors">{step.title}</h3>
                      <p className="text-lg text-slate-500 font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <FadeUp delay={0.4} className="bg-white p-10 rounded-[3rem] border border-prixgen-blue/10 shadow-2xl shadow-prixgen-blue/5 relative overflow-hidden">
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
