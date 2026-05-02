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

      <section className="bg-prixgen-blue text-white py-20 lg:py-32 relative overflow-hidden">
        <AmbientGlow />
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp delay={0.1}>
            <nav className="text-sm text-white/50 mb-8">
              <Link href="/" className="hover:text-prixgen-lightblue transition-colors">Home</Link> / 
              <Link href="/industries" className="mx-2 hover:text-prixgen-lightblue transition-colors">Industries</Link> / 
              <span className="ml-2 text-prixgen-lightblue font-medium">{industry.title}</span>
            </nav>
          </FadeUp>
          <header className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-prixgen-lightblue text-sm font-bold tracking-widest uppercase">
              Industry Sector
            </div>
            <StaggerText 
              text={industry.title} 
              variant="gradient"
              mode="light"
              className="text-5xl lg:text-7xl font-extrabold leading-tight" 
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-2xl text-white font-medium max-w-4xl leading-relaxed">
                {industry.headline}
              </p>
            </motion.div>
          </header>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      </section>

      <div className="container mx-auto px-4 py-20">
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
