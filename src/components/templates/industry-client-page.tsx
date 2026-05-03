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

export default function IndustryClientPage({ industry }: { industry: any }) {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <JsonLd 
        type="Article" 
        data={{ 
          title: industry.title, 
          description: industry.seo.metaDesc 
        }} 
      />

      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden bg-white">
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
              <Link href="/industries" className="hover:text-prixgen-blue transition-colors">Industries</Link>
              <span className="opacity-20">/</span>
              <span className="text-prixgen-blue">{industry.title}</span>
            </motion.div>
            
            <header className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue text-[10px] font-bold tracking-widest uppercase mx-auto">
                Industry Sector
              </div>
              
              <StaggerText 
                text={industry.title} 
                variant="gradient"
                className="text-5xl md:text-7xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter"
              />
              
              <div className="max-w-4xl mx-auto">
                <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                  {industry.headline}
                </p>
              </div>
            </header>
          </FadeUp>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-prixgen-blue">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-prixgen-blue to-transparent" />
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <article className="lg:col-span-2 space-y-12">
            {industry.featuredImage?.sourceUrl && (
              <FadeUp delay={0.2} className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
                <OptimizedImage
                  src={industry.featuredImage.sourceUrl}
                  alt={industry.featuredImage.altText || industry.title}
                  fill
                  priority
                />
              </FadeUp>
            )}
            
            <FadeUp delay={0.3}>
              <PortableText 
                value={industry.content} 
                className="prose prose-xl max-w-none prose-headings:text-prixgen-blue"
              />
            </FadeUp>
          </article>

          <aside className="lg:col-span-1">
            <FadeUp delay={0.4} className="bg-prixgen-gray p-10 rounded-3xl sticky top-24 border border-prixgen-blue/5 shadow-xl">
              <h3 className="text-3xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
              <p className="text-prixgen-dark/60 mb-8 leading-relaxed">
                Discover how Prixgen can modernize your {industry.title.toLowerCase()} operations and eliminate technical debt.
              </p>
              <LeadCaptureForm source={`Industry: ${industry.title}`} />
            </FadeUp>
          </aside>
        </div>
      </div>
    </div>
  );
}
