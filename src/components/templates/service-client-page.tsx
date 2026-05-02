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
      <section className="bg-prixgen-blue text-white py-24 relative overflow-hidden">
        <AmbientGlow />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <nav className="text-sm text-white/50 mb-8">
              <Link href="/" className="hover:text-prixgen-lightblue transition-colors">Home</Link> / 
              <Link href="/services" className="mx-2 hover:text-prixgen-lightblue transition-colors">Services</Link> / 
              <span className="ml-2 text-prixgen-lightblue font-medium">{service.title}</span>
            </nav>
          </motion.div>
          <StaggerText 
            text={service.title} 
            variant="gradient"
            mode="light"
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-2xl text-white max-w-4xl leading-relaxed font-medium">
              {service.headline}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      </section>

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
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
              className="prose prose-xl max-w-none prose-headings:text-prixgen-blue prose-p:text-prixgen-dark/80"
            />
          </FadeUp>
        </article>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-1">
          <FadeUp delay={0.4} className="bg-prixgen-gray p-10 rounded-3xl sticky top-24 border border-prixgen-blue/5 shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-prixgen-blue">Request an Architectural Audit</h3>
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
