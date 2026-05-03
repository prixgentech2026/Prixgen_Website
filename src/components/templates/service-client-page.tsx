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

      {/* Hero Header */}
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
              <Link href="/services" className="hover:text-prixgen-blue transition-colors">Services</Link>
              <span className="opacity-20">/</span>
              <span className="text-prixgen-blue">{service.title}</span>
            </motion.div>
            
            <StaggerText 
              text={service.title} 
              variant="gradient"
              className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter"
            />
            
            <div className="max-w-4xl mx-auto">
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-prixgen-blue">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-prixgen-blue to-transparent" />
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {service.featuredImage && (
            <FadeUp delay={0.2} className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <OptimizedImage
                src={service.featuredImage.sourceUrl}
                alt={service.featuredImage.altText || service.title}
                fill
                priority
              />
            </FadeUp>
          )}
          <FadeUp delay={0.3}>
            <PortableText 
              value={service.content} 
              className="prose prose-lg max-w-none prose-headings:text-prixgen-blue prose-p:text-prixgen-dark/80"
            />
          </FadeUp>
        </article>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-1">
          <FadeUp delay={0.4} className="bg-prixgen-gray p-10 rounded-3xl sticky top-24 border border-prixgen-blue/5 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
            <p className="text-prixgen-dark/60 mb-8 leading-relaxed">
              Our senior consultants will analyze your {service.title.toLowerCase()} stack and provide a comprehensive modernization roadmap.
            </p>
            <LeadCaptureForm source={`Service: ${service.title}`} />
          </FadeUp>
        </aside>
      </div>
    </div>
  );
}
