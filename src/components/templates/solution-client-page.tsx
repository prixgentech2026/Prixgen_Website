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
              <Link href="/solutions" className="hover:text-prixgen-blue transition-colors">Solutions</Link>
              <span className="opacity-20">/</span>
              <span className="text-prixgen-blue">{solution.title}</span>
            </motion.div>
            
            <StaggerText 
              text={solution.title} 
              variant="gradient"
              className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter"
            />
            
            <div className="max-w-4xl mx-auto pt-6">
              <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
                {solution.headline}
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

      <div className="container mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <article className="lg:col-span-2 space-y-20">
          {/* Visual Header */}
          {solution.featuredImage?.sourceUrl && (
            <FadeUp delay={0.2} className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5">
              <OptimizedImage
                src={solution.featuredImage.sourceUrl}
                alt={solution.featuredImage.altText || solution.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </FadeUp>
          )}
          
          {/* Main Narrative */}
          <FadeUp delay={0.3} className="space-y-8">
            <h2 className="text-3xl font-black tracking-tighter text-prixgen-blue">Solution Architecture</h2>
            <PortableText 
              value={solution.content} 
              className="prose prose-lg max-w-none prose-headings:text-prixgen-blue prose-p:text-slate-600 prose-p:leading-relaxed"
            />
          </FadeUp>

          {/* Key Features/Capabilities */}
          {solution.features && (
            <FadeUp delay={0.4} className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-black tracking-tighter text-prixgen-blue">Technical Capabilities</h2>
                <div className="w-20 h-1.5 bg-prixgen-blue rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {solution.features.map((feature: any, idx: number) => (
                  <div key={idx} className="p-8 rounded-2xl bg-prixgen-gray border border-prixgen-blue/5 hover:border-prixgen-blue/20 transition-all group">
                    <div className="text-prixgen-blue font-black text-4xl mb-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-bold text-prixgen-blue mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}

          {/* Implementation Roadmap */}
          {solution.process && (
            <FadeUp delay={0.5} className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-black tracking-tighter text-prixgen-blue">The Implementation Journey</h2>
                <div className="w-20 h-1.5 bg-prixgen-blue rounded-full" />
              </div>
              <div className="space-y-6">
                {solution.process.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-6 items-start p-6 rounded-2xl hover:bg-prixgen-blue/[0.02] transition-colors border border-transparent hover:border-prixgen-blue/5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-prixgen-blue text-white flex items-center justify-center font-black shadow-lg shadow-prixgen-blue/20">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-prixgen-blue">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <FadeUp delay={0.4} className="bg-prixgen-gray p-10 rounded-[2.5rem] border border-prixgen-blue/10 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              
              <h3 className="text-2xl font-black mb-6 text-prixgen-blue relative z-10">Request an Audit</h3>
              <p className="text-slate-500 mb-8 leading-relaxed relative z-10 text-sm">
                Discuss how our specialized {solution.title} architectures can eliminate operational friction and technical debt.
              </p>
              <div className="relative z-10">
                <LeadCaptureForm source={`Solution: ${solution.title}`} />
              </div>
            </FadeUp>

            <FadeUp delay={0.5} className="bg-prixgen-blue p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-xl font-black mb-4 relative z-10">Scale Your Intelligence</h4>
              <p className="text-white/70 text-sm mb-8 relative z-10 leading-relaxed">
                Speak with our {solution.title.includes('AI') ? 'AI Specialists' : 'ERP Architects'} about your global deployment.
              </p>
              <Button variant="secondary" className="w-full bg-white text-prixgen-blue hover:bg-gray-100 relative z-10 h-14 font-black rounded-xl" asChild>
                <Link href="/contact">Contact Strategy Team</Link>
              </Button>
            </FadeUp>
          </div>
        </aside>
      </div>
    </div>
  );
}
