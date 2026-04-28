import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { VideoFacade } from '@/components/features/video-facade';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';
import { homeData } from '@/lib/data';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { AmbientGlow } from '@/components/animations/ambient-glow';

export async function generateMetadata() {
  return {
    title: homeData.seo.title,
    description: homeData.seo.metaDesc,
  };
}

export default function HomePage() {
  return (
    <div className="bg-white">
      <JsonLd 
        type="Organization" 
        data={{ 
          name: "Prixgen Enterprise", 
          url: "https://www.prixgen.com",
          logo: "https://www.prixgen.com/logo.png" 
        }} 
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
          <AmbientGlow />
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 space-y-8">
              <StaggerText 
                text={homeData.title} 
                variant="gradient"
                mode="dark"
                className="text-5xl lg:text-7xl font-extrabold leading-tight"
              />
              <FadeUp delay={0.4}>
                <p className="text-xl text-prixgen-dark/80 max-w-xl leading-relaxed">
                  {homeData.subheadline}
                </p>
              </FadeUp>
              <FadeUp delay={0.5} className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8 hover:scale-105 hover:shadow-xl hover:shadow-prixgen-blue/20 transition-all duration-300" asChild>
                  <Link href="/contact">{homeData.heroPrimaryCTA}</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 hover:bg-prixgen-lightblue/5 hover:border-prixgen-lightblue/50 transition-all" asChild>
                  <Link href="/industries/manufacturing">{homeData.heroSecondaryCTA}</Link>
                </Button>
              </FadeUp>
              
              <FadeUp delay={0.6} className="pt-8 border-t border-prixgen-gray">
                <p className="text-sm font-medium text-prixgen-dark/40 uppercase tracking-widest mb-4">Market Validation</p>
                <p className="text-prixgen-dark/70 font-medium italic">
                  "{homeData.socialProof}"
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.3} className="relative">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-prixgen-blue/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-prixgen-lightblue/5 rounded-full blur-3xl" />
              <VideoFacade videoId="hXnS5K1SndI" title="Prixgen Enterprise: Digital Transformation" />
            </FadeUp>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-prixgen-gray/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Enterprises Supported', value: '500+' },
                { label: 'Global Offices', value: '4' },
                { label: 'Implementation Success', value: '100%' },
                { label: 'Consultants', value: '150+' },
              ].map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
                  <div className="text-4xl font-bold text-prixgen-blue mb-2">{stat.value}</div>
                  <div className="text-sm text-prixgen-dark/60 uppercase tracking-widest">{stat.label}</div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Solutions Section */}
        <section className="container mx-auto px-4 py-20">
          <FadeUp className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-prixgen-blue">Our Strategic Solutions</h2>
            <p className="text-prixgen-dark/60 max-w-2xl mx-auto">
              We provide specialized operational ecosystems tailored for high-velocity manufacturing and FMCG leaders.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Odoo Enterprise', slug: 'odoo-enterprise', desc: 'Engineering Odoo into a scalable enterprise engine.', color: 'border-blue-500' },
              { title: 'SAP Ecosystems', slug: 'sap-ecosystems', desc: 'Unified cloud business management for process leaders.', color: 'border-indigo-500' },
              { title: 'Lecca AI Vision', slug: 'lecca-ai', desc: 'Proprietary computer vision for industrial inventory and QC.', color: 'border-blue-400' },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1} className={`p-8 bg-white rounded-xl border border-slate-100 border-l-4 ${item.color} shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-prixgen-lightblue/30 group`}>
                <h3 className="text-2xl font-bold mb-4 text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors">{item.title}</h3>
                <p className="text-prixgen-dark/70 mb-6 leading-relaxed">{item.desc}</p>
                <Link href={`/solutions/${item.slug}`} className="text-prixgen-lightblue font-semibold flex items-center group-hover:gap-3 transition-all">
                  View Architecture <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 mb-20">
          <div className="bg-prixgen-blue rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
            <AmbientGlow />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-4xl font-bold mb-6">Ready to architect your operational intelligence?</h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Join 500+ industrial leaders that have eliminated supply chain friction with Prixgen.
                </p>
                <Button size="lg" variant="secondary" className="bg-white text-prixgen-blue hover:bg-gray-100 hover:scale-105 transition-all shadow-xl" asChild>
                  <Link href="/contact">Book an Architecture Audit</Link>
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <div className="bg-white rounded-xl p-8 text-prixgen-dark shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 text-center text-prixgen-blue">Get a Strategic Consultation</h3>
                  <LeadCaptureForm source="Homepage CTA" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
