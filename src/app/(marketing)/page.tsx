import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { VideoFacade } from '@/components/features/video-facade';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';
import { homeData } from '@/lib/data';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';

export async function generateMetadata() {
  return {
    title: homeData.seo.title,
    description: homeData.seo.metaDesc,
  };
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      <JsonLd 
        type="Organization" 
        data={{ 
          name: "Prixgen Enterprise", 
          url: "https://www.prixgen.com",
          logo: "https://www.prixgen.com/logo.png" 
        }} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 space-y-8">
            <StaggerText 
              text={homeData.title} 
              className="text-5xl lg:text-7xl font-extrabold text-prixgen-blue leading-tight"
            />
            <FadeUp delay={0.4}>
              <p className="text-xl text-prixgen-dark/80 max-w-xl leading-relaxed">
                {homeData.subheadline}
              </p>
            </FadeUp>
            <FadeUp delay={0.5} className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/contact">{homeData.heroPrimaryCTA}</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
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
      <section className="bg-prixgen-gray py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Implementations', value: '500+' },
              { label: 'Client Retention', value: '98%' },
              { label: 'Uptime Guarantee', value: '99.9%' },
              { label: 'Support Experts', value: '50+' },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1} className="text-center group">
                <div className="text-4xl font-bold text-prixgen-blue mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
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
            { title: 'Supply Chain & WMS', slug: 'supply-chain-wms', desc: 'Frictionless logistics ecosystems for global scale.', color: 'border-blue-400' },
          ].map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.1} className={`p-8 bg-white rounded-xl border-l-4 ${item.color} shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group`}>
              <h3 className="text-2xl font-bold mb-4 text-prixgen-blue">{item.title}</h3>
              <p className="text-prixgen-dark/70 mb-6 leading-relaxed">{item.desc}</p>
              <Link href={`/solutions/${item.slug}`} className="text-prixgen-lightblue font-semibold flex items-center group-hover:gap-2 transition-all">
                View Architecture <span className="ml-1">→</span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 mb-20">
        <div className="bg-prixgen-blue rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-bold mb-6">Ready to architect your operational intelligence?</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Join 500+ industrial leaders that have eliminated supply chain friction with Prixgen.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-prixgen-blue hover:bg-gray-100">
                Book an Architecture Audit
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
    </div>
  );
}
