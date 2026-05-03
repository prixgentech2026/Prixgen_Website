'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { motion } from 'framer-motion';
import { PortableText } from '@/components/ui/portable-text';

export default function SolutionClientPage({ solution }: { solution: any }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AmbientGlow />
      <JsonLd 
        type="Service" 
        data={{ 
          name: solution.title, 
          description: solution.seo?.metaDesc,
          provider: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }} 
      />

      {/* Breadcrumbs & Header */}
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
              <Link href="/solutions" className="hover:text-prixgen-blue transition-colors">Solutions</Link>
              <span className="opacity-20">/</span>
              <span className="text-prixgen-blue">{solution.title}</span>
            </motion.div>
            
            <StaggerText 
              text={solution.title} 
              variant="gradient"
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter"
            />
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                {solution.headline}
              </p>
            </div>
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

      <div className="container mx-auto px-4 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <article className="lg:col-span-2">
          {solution.featuredImage?.sourceUrl && (
            <FadeUp delay={0.2} className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
              <OptimizedImage
                src={solution.featuredImage.sourceUrl}
                alt={solution.featuredImage.altText || solution.title}
                fill
                priority
              />
            </FadeUp>
          )}
          
          <FadeUp delay={0.3}>
            <PortableText 
              value={solution.content} 
              className="prose prose-xl max-w-none prose-headings:text-prixgen-blue prose-a:text-prixgen-lightblue"
            />
          </FadeUp>
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <FadeUp delay={0.4} className="bg-white p-8 rounded-2xl border border-prixgen-gray shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
              <p className="text-prixgen-dark/60 text-sm mb-6">
                Get a personalized roadmap for implementing {solution.title} in your enterprise.
              </p>
              <LeadCaptureForm source={`Solution: ${solution.title}`} />
            </FadeUp>

            <FadeUp delay={0.5} className="bg-prixgen-blue p-8 rounded-2xl text-white shadow-xl">
              <h4 className="text-xl font-bold mb-4">Scale Your Intelligence</h4>
              <p className="text-white/70 text-sm mb-6">
                Speak with our {solution.title.includes('AI') ? 'AI Specialists' : 'ERP Architects'} about your global deployment.
              </p>
              <Button variant="secondary" className="w-full bg-white text-prixgen-blue hover:bg-gray-100" asChild>
                <Link href="/contact">Contact Strategy Team</Link>
              </Button>
            </FadeUp>
          </div>
        </aside>
      </div>
    </div>
  );
}
