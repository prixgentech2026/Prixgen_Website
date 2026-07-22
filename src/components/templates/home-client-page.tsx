'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { VideoFacade } from '@/components/features/video-facade';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronDown } from 'lucide-react';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { PortableText } from '@/components/ui/portable-text';
import { urlFor } from '@/sanity/lib/image';
import { Magnetic } from '@/components/animations/magnetic';
import { RevealText } from '@/components/animations/reveal-text';
import { Parallax } from '@/components/animations/parallax';
import { Floating } from '@/components/animations/floating';

// Dynamic import for performance-heavy globe component
const InteractiveGlobe = dynamic(() => import('@/components/ui/interactive-globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-prixgen-blue/20 border-t-prixgen-blue rounded-full animate-spin" />
    </div>
  )
});

/**
 * Custom component to handle patron logos with robust fallback
 */

const PatronLogo = ({ patron }: { patron: { filename: string; name: string } }) => {
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center min-w-[280px] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-default opacity-60 hover:opacity-100 px-10 group"
    >
      <div className="w-44 h-16 mb-4 flex items-center justify-center relative bg-transparent transition-all duration-300">
        {!error ? (
          <OptimizedImage
            fill
            src={`/images/patron/${patron.filename}`}
            alt={patron.name}
            className="object-contain"
            wrapperClassName="bg-transparent"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-prixgen-blue font-black text-xl">
            {patron.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
        )}
      </div>
      <span className="text-[10px] font-black text-prixgen-blue/80 tracking-[0.2em] uppercase text-center max-w-[200px] line-clamp-1">{patron.name}</span>
    </motion.div>
  );
};

const PATRONS = [
  { filename: 'EL-Steel.png', name: 'EL Steel' },
  { filename: 'Licious-Logo.png', name: 'Licious' },
  { filename: 'curefit-1.png', name: 'Curefit' },
  { filename: 'Ravago.png', name: 'Ravago' },
  { filename: 'zetwerk.png', name: 'Zetwerk' },
  { filename: 'G-S-E-commerce-Designcafe.png', name: 'Designcafe' },
  { filename: 'Starpipe.png', name: 'Starpipe' },
  { filename: 'WITTMANN-BATTENFELD.png', name: 'Wittmann Battenfeld' },
  { filename: 'world-of-outdoor.png', name: 'World of Outdoor' },
  { filename: 'Murudeshwar.png', name: 'Murudeshwar' },
  { filename: 'ceezet.png', name: 'Ceezet' },
  { filename: 'SF-Dyes.png', name: 'SF Dyes' },
  { filename: 'Star-Flex.png', name: 'Star Flex' },
  { filename: 'L-S-Engineering.png', name: 'L S Engineering' },
  { filename: 'Synthesis-Solutions.png', name: 'Synthesis Solutions' },
  { filename: 'Vahini-Irrigation.png', name: 'Vahini Irrigation' },
  { filename: 'bi-worldwide.png', name: 'BI Worldwide' },
  { filename: 'Mas-Furniture.png', name: 'Mas Furniture' },
  { filename: 'one-town-enginnering..png', name: 'One Town Engineering' },
  { filename: 'diamond-metal-screen.png', name: 'Diamond Metal Screen' },
  { filename: 'AI-Ansari.png', name: 'Al Ansari' },
  { filename: 'MorrisAndSons.png', name: 'Morris And Sons' },
  { filename: 'PLYMODULD.png', name: 'Plymoduld' },
  { filename: 'instellars.png', name: 'Instellars' },
  { filename: 'star-water-tanker.png', name: 'Star Water Tanker' },
];

const FAQ_ITEMS = [
  {
    question: "What core ERP platforms does Prixgen specialize in?",
    answer: "We are an official Odoo Gold Partner and SAP solutions provider. We specialize in architecting, customizing, and scaling Odoo Enterprise and SAP S/4HANA ecosystems for complex manufacturing, FMCG, and supply chain operations.",
    link: { label: "Explore ERP Solutions", href: "/solutions" }
  },
  {
    question: "How does Prixgen integrate AI & Machine Learning into enterprise workflows?",
    answer: "We build custom AI and Machine Learning models (like Lecca for visual factory inspection) that train on industrial data to automate quality control, forecast inventory demand, and predict machinery maintenance needs.",
    link: { label: "Explore AI Capabilities", href: "/services/ai-machine-learning" }
  },
  {
    question: "What are Prixgen's Industrial IoT (IIoT) and telemetry capabilities?",
    answer: "We connect factory-floor sensors, RFID scanners, and production line PLCs directly to your central ERP. This enables real-time tracking of assets, automated logs, and live telemetry dashboards with zero human entry.",
    link: { label: "Explore IoT Solutions", href: "/engineering-services/iiot-telemetry" }
  },
  {
    question: "What cloud infrastructure and hosting services do you provide?",
    answer: "We design, migrate, and manage resilient cloud architectures across AWS, Microsoft Azure, and private servers. Our environments are optimized specifically for ERP scalability, highly secure, and backed by strict SLA guarantees.",
    link: { label: "Explore Cloud Infrastructure", href: "/engineering-services/cloud-infrastructure" }
  },
  {
    question: "How do you handle legacy data migration?",
    answer: "We utilize a robust extraction, cleansing, and validation methodology. We map your legacy data structures to the target database, run simulated dry-runs in staging, and perform final cutovers with zero data loss and minimal operational downtime.",
    link: { label: "Explore Services", href: "/services" }
  },
  {
    question: "What post-deployment support and SLA packages do you offer?",
    answer: "We provide SLA-backed support and maintenance contracts (Prixgen Preferred Care). This includes proactive 24/7 server monitoring, routine security patches, helpdesk ticketing, and functional upgrades.",
    link: { label: "Get in Touch", href: "/contact" }
  }
];




interface HomeClientPageProps {
  homeData: any;
  latestPost?: any;
  latestCareer?: any;
}

export default function HomeClientPage({ homeData, latestPost, latestCareer }: HomeClientPageProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastIndex, setToastIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toastNotifications = React.useMemo(() => {
    const notifications = [];

    // 1. Odoo Services
    notifications.push({
      badge: "Odoo Gold Partner",
      text: "We don't just customize. We engineer high-performance Odoo Enterprise migrations.",
      cta: "Explore Odoo",
      link: "/solutions/odoo"
    });

    // 2. Software Development
    notifications.push({
      badge: "Software Consulting",
      text: "Accelerate your digital maturity with low-latency APIs and custom business applications.",
      cta: "View Services",
      link: "/services"
    });

    // 3. ERP Solutions
    notifications.push({
      badge: "ERP Ecosystems",
      text: "Fusing Odoo and SAP S/4HANA with proven industrial intelligence and clean cores.",
      cta: "ERP Solutions",
      link: "/solutions"
    });

    // 4. Cloud Infrastructure
    notifications.push({
      badge: "Managed Cloud",
      text: "Build resilient, secure, and SLA-backed cloud platforms optimized for ERP scale.",
      cta: "Explore Cloud",
      link: "/services/cloud-infrastructure"
    });

    // 5. Hiring Odoo Developers
    notifications.push({
      badge: "Odoo Talent",
      text: "Augment your team with pre-vetted Odoo architects capable of building hardware IoT loops.",
      cta: "Hire Developers",
      link: "/services/hiring-odoo-developers"
    });

    // 6. Industries We Serve
    notifications.push({
      badge: "Industries",
      text: "Specialized systems engineered for Manufacturing, FMCG, Logistics, and Retail.",
      cta: "See Industries",
      link: "/industries"
    });

    // 7. Careers (Dynamic if possible)
    if (latestCareer && latestCareer.title) {
      notifications.push({
        badge: "Careers",
        text: `We are hiring! Join our elite engineering hub as a ${latestCareer.title} in ${latestCareer.location || 'Mysuru'}.`,
        cta: "Explore Careers",
        link: "/careers"
      });
    } else {
      notifications.push({
        badge: "Careers",
        text: "Looking for your next career leap? We are hiring Python, Odoo, and SAP specialists.",
        cta: "Explore Careers",
        link: "/careers"
      });
    }

    // 8. Blogs & Insights (Dynamic if possible)
    if (latestPost && latestPost.title && latestPost.slug) {
      notifications.push({
        badge: "Latest Insight",
        text: latestPost.title,
        cta: "Read Blog",
        link: `/blog/${latestPost.slug}`
      });
    } else {
      notifications.push({
        badge: "Latest Insight",
        text: "Beyond Dashboards: How ERP Best Practices Create Real-Time Business Visibility.",
        cta: "Read Blog",
        link: "/blog/beyond-dashboards-how-erp-best-practices-create-real-time-business-visibility"
      });
    }

    // 9. Contact Us
    notifications.push({
      badge: "Consultation",
      text: "Schedule a zero-cost architecture audit with our senior engineering consultants.",
      cta: "Contact Us",
      link: "/contact"
    });

    return notifications;
  }, [latestPost, latestCareer]);

  // Initialize and check minimized state
  useEffect(() => {
    const minimized = sessionStorage.getItem('home_toast_minimized');
    if (minimized === 'true') {
      setIsMinimized(true);
      setShowToast(true);
    } else {
      setIsMinimized(false);
      // Delay toast display by 2 seconds
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Cycle notifications every 6 seconds when not minimized
  useEffect(() => {
    if (isMinimized || !showToast) return;
    const interval = setInterval(() => {
      setToastIndex((prev) => (prev + 1) % toastNotifications.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isMinimized, showToast, toastNotifications.length]);

  const handleMinimize = () => {
    setIsMinimized(true);
    sessionStorage.setItem('home_toast_minimized', 'true');
  };

  const handleExpand = () => {
    setIsMinimized(false);
    sessionStorage.setItem('home_toast_minimized', 'false');
  };

  return (
    <div className="bg-white">
      <JsonLd
        type="Organization"
        data={{
          name: "Prixgen Enterprise",
          url: "https://www.prixgen.com",
          logo: "https://www.prixgen.com/images/Logo.png"
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        }}
      />

      <main>
        <section className="relative min-h-[70vh] flex items-center pt-24 pb-12 px-4 overflow-hidden bg-white">
          <Parallax offset={100} direction="down" className="absolute inset-0 z-0">
            <AmbientGlow />
          </Parallax>

          {/* Animated Background Grid */}
          <Parallax offset={50} direction="up" className="absolute inset-0 z-0 opacity-[0.03]">
            <div className="w-full h-[150%] bg-[radial-gradient(#0066cc_1px,transparent_1px)] [background-size:40px_40px]" />
          </Parallax>



          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeUp className="space-y-6 text-left relative z-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] w-12 bg-prixgen-blue/10 relative overflow-hidden rounded-full">
                    <motion.div
                      className="absolute inset-y-0 left-0 w-1/2 bg-prixgen-lightblue"
                      initial={{ x: "-100%" }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px] flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prixgen-lightblue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-prixgen-blue"></span>
                    </span>
                    Intelligent Architecture
                  </span>
                </div>

                <StaggerText
                  text="Innovation"
                  variant="gradient"
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-10 tracking-tighter"
                />

                <div className="max-w-2xl space-y-8">
                  <RevealText delay={0.2}>
                    <h1 className="text-3xl md:text-4xl font-bold text-prixgen-blue tracking-tight leading-[1.1]">
                      {homeData.title || "Intelligent Operations. Unified Enterprise."}
                    </h1>
                  </RevealText>

                  {homeData.subheadline ? (
                    <RevealText delay={0.3}>
                      <div className="text-lg text-slate-500 font-medium leading-relaxed">
                        <PortableText value={homeData.subheadline} />
                      </div>
                    </RevealText>
                  ) : (
                    <RevealText delay={0.3}>
                      <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Powered by AI, GenAI, and IoT, our solutions fuse Odoo and SAP with proven industrial intelligence.
                      </p>
                    </RevealText>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-6 sm:gap-8 lg:gap-6 xl:gap-8 pt-6">
                  <Magnetic className="w-full sm:w-auto lg:w-auto">
                    <Button size="lg" className="h-16 px-10 text-lg rounded-2xl shadow-xl shadow-prixgen-blue/20 w-full sm:w-auto" asChild>
                      <Link href="/contact">{homeData.heroPrimaryCTA || "Get Started"}</Link>
                    </Button>
                  </Magnetic>
                  <Magnetic className="shrink-0">
                    <Link href="/solutions/odoo" className="group flex items-center gap-3 text-prixgen-blue font-bold text-lg max-w-[260px] leading-snug">
                      <span>{homeData.heroSecondaryCTA || "Explore Architecture"}</span>
                      <motion.span
                        className="shrink-0"
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </Magnetic>
                </div>
              </FadeUp>

              <FadeUp delay={0.3} className="relative z-10">
                <Floating duration={5} y={15} x={10}>
                  <div className="absolute -inset-4 bg-prixgen-blue/5 rounded-[3rem] blur-3xl -z-10 animate-pulse" />
                </Floating>
                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl group">
                  {homeData.heroImage ? (
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <OptimizedImage
                        src={
                          homeData.heroImage.url ||
                          homeData.heroImage.asset ||
                          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
                        }
                        alt="Industrial Architecture"
                        fill
                        priority
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-300 font-bold uppercase tracking-widest">Architectural Visual</span>
                    </div>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>



        {/* Animated Connector 1 */}
        <div className="relative w-full h-16 flex justify-center -mt-8 z-20">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-prixgen-blue/30 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/3 bg-prixgen-lightblue shadow-[0_0_8px_#0ea5e9]"
              initial={{ y: "-100%" }}
              animate={{ y: ['-100%', '400%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* 2. Services Section (Our Best Services / Prixgen Services) */}
        <section className="py-8 lg:py-12 px-4 bg-prixgen-gray/10 relative">
          <div className="container mx-auto px-4 pt-4">
            <div className="mb-16 text-left">
              <FadeUp>
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-[1px] bg-prixgen-blue"
                  />
                  <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">
                    Industrial Services
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-prixgen-blue mb-6 tracking-tighter">
                  Prixgen Services
                </h2>

                <p className="text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
                  Prixgen’s voyage is unique. We traverse through a stringent yet customer-driven solution method, where success derives from constant research and architectural precision.
                </p>
              </FadeUp>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Consulting', desc: 'As an Odoo Gold Partner and premier IT consultancy, we leverage our in-house R&D team to engineer custom software solutions that streamline complex enterprise operations.', link: '/services/it-consulting', icon: 'Strategy', img: '/images/consulting.png', priority: true },
                { title: 'AI & ML Advisory', desc: 'Empowering enterprises with custom machine learning systems, predictive data analytics, and strategic roadmaps to capture high-value market opportunities.', link: '/services/ai-machine-learning', icon: 'Brain', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop', priority: true },
                { title: 'Managed Cloud', desc: 'High-availability industrial cloud architectures featuring in-house hosting facilities, secure data replication, and 24/7 proactive monitoring.', link: '/engineering-services/cloud-infrastructure', icon: 'Cloud', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop', priority: true },
                { title: 'Transformation Strategy', desc: 'Re-engineering legacy workflows into digitally optimized and globally scaled operations designed to drive operational resilience.', link: '/services/business-transformation', icon: 'TrendingUp', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop' },
                { title: 'Warehouse', desc: 'Better Warehouse management can be yours. Reduce inventory and warehouse costs while improving customer service.', link: '/services/prixgen-warehouse-management-solution', icon: 'Box', img: '/images/warehouse.png' },
                { title: 'IIoT', desc: 'Manage Millions of IIOT Device Connections And Support Applications That Open New Revenues For Industries.', link: '/engineering-services/iiot-telemetry', icon: 'Cpu', img: '/images/iiot.png' },
                { title: 'Hiring Odoo Developers', desc: 'Augment your development capacity with pre-vetted Odoo architects and dedicated engineering pods to scale your enterprise applications.', link: '/services/hiring-odoo-developers', icon: 'Users', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop' },
                { title: 'PVC Manufacturing', desc: 'Specialized enterprise architectures, recipe variance controls, and IoT weighbridge integrations engineered specifically for PVC operations.', link: '/industries/pvc-manufacturing', icon: 'Factory', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop' }
              ].map((service, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <Link href={service.link} className="block h-full group">
                    <div className="flex flex-col h-full bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-[2.5rem] shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,102,204,0.15)] hover:border-prixgen-blue/20 relative overflow-hidden group">
                      {/* Image Container with Zoom */}
                      <div className="h-64 overflow-hidden relative bg-slate-100 flex-shrink-0">
                        <OptimizedImage
                          fill
                          src={service.img}
                          alt={service.title}
                          priority={service.priority}
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-6 left-6 z-20">
                        <Floating duration={3 + i} y={5}>
                          <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500">
                            <span className="text-xl">
                              {service.icon === 'Strategy' && '📊'}
                              {service.icon === 'Box' && '📦'}
                              {service.icon === 'Cpu' && '⚙️'}
                              {service.icon === 'Brain' && '🧠'}
                              {service.icon === 'TrendingUp' && '📈'}
                              {service.icon === 'Cloud' && '☁️'}
                              {service.icon === 'Users' && '👥'}
                              {service.icon === 'Factory' && '🏭'}
                            </span>
                          </div>
                        </Floating>
                      </div>

                      <div className="p-10 pt-6 relative z-10 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-prixgen-dark/70 leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                        <div className="pt-8">
                          <Magnetic>
                            <div className="flex items-center text-prixgen-lightblue font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                              Architecture Details
                              <motion.span
                                className="ml-2"
                                initial={{ x: 0 }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                →
                              </motion.span>
                            </div>
                          </Magnetic>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Animated Connector 2 */}
        <div className="relative w-full h-20 flex justify-center -mt-10 z-20">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-prixgen-blue/30 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/3 bg-prixgen-lightblue shadow-[0_0_8px_#0ea5e9]"
              initial={{ y: "-100%" }}
              animate={{ y: ['-100%', '400%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
          </div>
        </div>

        {/* 3. Our Solutions Section */}
        <section className="py-8 lg:py-12 bg-white relative">
          <div className="container mx-auto px-4 pt-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <FadeUp className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-[1px] bg-prixgen-blue"
                  />
                  <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Architecture Suite</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-prixgen-blue mb-4 tracking-tighter">Our Solutions</h2>
                <p className="text-lg text-slate-600 font-medium">
                  What’s your challenge? Let’s architect the path forward together.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <Magnetic>
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-xl font-bold" asChild>
                    <Link href="/solutions">View All Architecture</Link>
                  </Button>
                </Magnetic>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Odoo Enterprise', desc: 'Engineering Odoo into a scalable enterprise engine for global workflows.', img: '/images/odoo.png', color: 'from-purple-500/10', link: '/solutions/odoo' },
                { title: 'SAP Business One', desc: 'Advanced ERP orchestration for high-growth industrial sectors.', img: '/images/sap.png', color: 'from-blue-600/10', link: '/solutions/sap' },
                { title: 'Microsoft Dynamics', desc: 'Intelligent cloud ERP solutions for unified business processes.', img: '/images/microsoft.png', color: 'from-blue-400/10', link: '/solutions/microsoft-dynamics' },
                { title: 'Power BI Analytics', desc: 'Real-time industrial intelligence and predictive visualization.', img: '/images/powerbi.png', color: 'from-yellow-500/10', link: '/solutions/power-bi' },
                { title: 'Enterprise AI & ML', desc: 'Empower operations with predictive analytics, generative AI, and intelligent automation.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop', color: 'from-emerald-500/10', link: '/services/ai-machine-learning' },
                { title: 'Digital Transformation', desc: 'Comprehensive strategies to modernize legacy systems and build scalable future-proof operations.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', color: 'from-rose-500/10', link: '/services/business-transformation' }
              ].map((sol, i) => (
                <FadeUp key={i} delay={i * 0.1} className="group cursor-pointer h-full">
                  <Link href={sol.link} className="block h-full">
                    <div className={`h-full p-8 bg-prixgen-blue rounded-[2.5rem] text-white relative overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.4)] flex flex-col`}>
                      {/* Radial Glow Overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="relative z-10 flex-1">
                        <Floating delay={i * 0.2}>
                          <div className="aspect-square w-24 mb-6 rounded-2xl bg-white/10 p-4 flex items-center justify-center overflow-hidden">
                            <OptimizedImage fill src={sol.img} alt={sol.title} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </Floating>
                        <h3 className="text-xl font-bold mb-4">{sol.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{sol.desc}</p>
                      </div>

                      <div className="relative z-10 mt-8">
                        <Magnetic>
                          <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                            Learn Architecture <span className="ml-2">→</span>
                          </div>
                        </Magnetic>
                      </div>

                      <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110 -mb-4 -mr-4">
                        <div className="w-24 h-24 border-[4px] border-white rounded-full" />
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Animated Connector 3 */}
        <div className="relative w-full h-16 flex justify-center -mt-8 z-20">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-prixgen-blue/30 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/3 bg-prixgen-lightblue shadow-[0_0_8px_#0ea5e9]"
              initial={{ y: "-100%" }}
              animate={{ y: ['-100%', '400%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </div>
        </div>

        {/* 4. Our Patronage Section - Infinite Marquee */}
        <section className="py-8 lg:py-12 bg-prixgen-gray/20 overflow-hidden relative border-y border-slate-200/50">
          <div className="container mx-auto px-4 relative z-10 pt-4">
            <FadeUp className="text-center mb-16">
              <h2 className="text-4xl font-bold text-prixgen-blue mb-4">Our Patronage</h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-prixgen-lightblue mx-auto rounded-full"
              />
            </FadeUp>
          </div>

          <div className="relative flex overflow-x-hidden group">
            {/* Left and Right Gradients to hide edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-prixgen-gray/20 to-transparent z-20" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-prixgen-gray/20 to-transparent z-20" />

            <motion.div
              className="flex whitespace-nowrap gap-0 py-4"
              style={{ willChange: 'transform' }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear"
                }
              }}
            >
              {[...PATRONS, ...PATRONS].map((patron, i) => (
                <PatronLogo key={`${patron.filename}-${i}`} patron={patron} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. Testimonials Section */}
        <section className="py-8 lg:py-12 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <FadeUp className="text-center mb-16">
              <h2 className="text-4xl font-bold text-prixgen-blue mb-4">Success Voices</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Hear from the leaders who have transformed their operations with Prixgen.</p>
              <div className="w-20 h-1 bg-prixgen-lightblue mx-auto rounded-full mt-4" />
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Karan Shetty",
                  company: "Murudeshwar Ceramics Limited",
                  role: "Executive Director",
                  text: "We replace all legacy SAP, Tally, and Daily Tracker applications with Odoo Enterprise Edition. Now, we are working from home due to COVID-19 situation; all our teams are interconnected, and everything is happening paperless. Thanks to Prixgen's professional efforts and expert knowledge.",
                  id: "karan"
                },
                {
                  name: "Mr. Hemraj Sencha",
                  company: "Vahini Irrigations Private Limited",
                  role: "Managing Director",
                  text: "Our experience with Prixgen has been exceptional. The breadth and depth of the offering has met all our requirements, and the team has been incredibly responsive to all our needs.",
                  id: "hemraj"
                },
                {
                  name: "Kshiraj Prakash",
                  company: "BI Worldwide",
                  role: "Finance Controller",
                  text: "The COVID-19 forced us to start using Odoo. I must say Odoo ERP reduced a lot of reporting & reconsiliation time of my team. Prixgen team configured an accounting platform without disrupting current practices. We got a strong implementation partner with exceptional product knowledge.",
                  id: "kshiraj"
                }
              ].map((testimonial, i) => (
                <FadeUp key={i} delay={i * 0.1} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group hover:bg-prixgen-blue transition-all duration-500 h-full flex flex-col">
                  <div className="mb-6 text-prixgen-lightblue group-hover:text-white transition-colors">
                    <svg className="w-10 h-10 fill-current opacity-20" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V4H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.91241 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H3.01697C2.46468 8 2.01697 8.44772 2.01697 9V11C2.01697 11.5523 1.56925 12 1.01697 12H0.0169678V4H10.017V15C10.017 18.3137 7.33068 21 4.01697 21H2.01697Z"></path></svg>
                  </div>
                  <p className="text-slate-600 group-hover:text-white/90 transition-colors mb-8 text-base italic flex-1">&quot;{testimonial.text}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-prixgen-gray flex items-center justify-center font-bold text-prixgen-blue group-hover:bg-white group-hover:text-prixgen-blue transition-colors">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-prixgen-blue group-hover:text-white transition-colors">{testimonial.name}</h4>
                      <p className="text-xs text-prixgen-lightblue group-hover:text-white/70 transition-colors uppercase tracking-widest leading-tight">{testimonial.company}</p>
                      <p className="text-[10px] text-slate-400 group-hover:text-white/50 transition-colors">{testimonial.role}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Stories Section (Suppressed)
        <section className="py-8 lg:py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <FadeUp>
                <h2 className="text-4xl font-bold text-prixgen-blue mb-4">Latest From Stories</h2>
                <p className="text-slate-500 max-w-2xl">Prixgen success stories and updates. Get latest information around Prixgen and its partners.</p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <Link href="/stories">
                  <Button variant="outline" className="rounded-full border-prixgen-blue text-prixgen-blue hover:bg-prixgen-blue hover:text-white">
                    View All Stories
                  </Button>
                </Link>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "The Future of Industrial AI", category: "Technology", date: "May 2026", color: "from-blue-500 to-indigo-600" },
                { title: "Optimizing Warehouse Workflows with IIoT", category: "Operations", date: "April 2026", color: "from-indigo-500 to-prixgen-blue" },
                { title: "SAP Business One vs. Odoo: A Guide", category: "Solutions", date: "March 2026", color: "from-prixgen-blue to-prixgen-lightblue" }
              ].map((story, i) => (
                <FadeUp key={i} delay={i * 0.1} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer h-full flex flex-col">
                  <div className={`aspect-video bg-gradient-to-br ${story.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-prixgen-blue text-[10px] font-bold uppercase tracking-widest rounded-full">{story.category}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">{story.date}</p>
                    <h3 className="text-xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors line-clamp-2 mb-6">{story.title}</h3>
                    <div className="mt-auto flex items-center text-prixgen-lightblue font-bold text-sm">
                      Read Story <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* 6. FAQ Section */}
        <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

              {/* Left Column: Heading and Context */}
              <FadeUp className="lg:w-1/3 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-prixgen-blue/5 rounded-full text-prixgen-blue font-bold text-[10px] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-prixgen-lightblue rounded-full animate-pulse" />
                  Q&A
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-prixgen-blue tracking-tighter leading-tight">
                  Frequently <br /> Asked Questions
                </h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-md">
                  Have questions about custom ERP systems, AI integrations, or support contracts? Explore our answers or get in touch.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-prixgen-blue hover:text-prixgen-lightblue font-black text-xs uppercase tracking-widest transition-colors group"
                  >
                    Ask a Custom Question
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </FadeUp>

              {/* Right Column: Accordion */}
              <div className="lg:w-2/3 space-y-4">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <FadeUp
                      key={index}
                      delay={index * 0.05}
                      className="border border-slate-200/60 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-bold text-prixgen-blue hover:text-prixgen-lightblue transition-colors focus:outline-none"
                      >
                        <span className="text-base md:text-lg tracking-tight leading-snug">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-prixgen-blue"
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-6 pb-6 text-sm md:text-base text-slate-500 font-medium leading-relaxed border-t border-slate-100/50 pt-4 bg-slate-50/40 space-y-3">
                              <p>{item.answer}</p>
                              {item.link && (
                                <div className="pt-2">
                                  <Link
                                    href={item.link.href}
                                    className="inline-flex items-center gap-1.5 text-prixgen-blue hover:text-prixgen-lightblue font-black text-xs uppercase tracking-widest transition-colors group/faq-link"
                                  >
                                    {item.link.label}
                                    <ArrowRight size={12} className="transition-transform group-hover/faq-link:translate-x-1" />
                                  </Link>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Worldwide Presence Section */}
        <section className="py-8 lg:py-12 bg-white border-t border-slate-100 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headquarters */}
              <FadeUp className="space-y-12">
                <div>
                  <p className="text-prixgen-lightblue font-bold tracking-widest uppercase text-xs mb-4">Headquarters</p>
                  <h2 className="text-3xl font-bold text-prixgen-blue mb-8 leading-tight">
                    Prixgen India
                  </h2>
                  <div className="space-y-6">
                    <p className="text-lg text-prixgen-dark font-bold leading-relaxed">
                      Prixgen Tech Solutions Pvt. Ltd.
                    </p>
                    <p className="text-base text-prixgen-dark/70 leading-relaxed font-medium">
                      No 2622, Krishna Kaveri Complex, Opposite to Panchayat Office, Bhogadi, Mysuru, Karnataka 570026
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-prixgen-lightblue font-bold tracking-widest uppercase text-xs">Global Presence</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['Australia', 'Dubai', 'Hong Kong', 'Philippines'].map((loc) => (
                      <div key={loc} className="flex items-center gap-2 text-prixgen-blue font-bold">
                        <div className="w-2 h-2 bg-prixgen-lightblue rounded-full animate-pulse" />
                        {loc}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <Magnetic>
                    <Button size="lg" className="h-14 px-10 text-lg shadow-2xl shadow-prixgen-blue/20 w-full lg:w-auto" asChild>
                      <Link href="/contact">Architecture Audit</Link>
                    </Button>
                  </Magnetic>
                </div>
              </FadeUp>

              {/* Center Column: Map with enhanced scale and blending */}
              <div className="relative flex justify-center items-center py-12 lg:py-0">
                <div className="relative w-full max-w-[800px] aspect-square lg:scale-125">
                  {/* Blending Mask for the map container */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,white_100%)]" />
                  <InteractiveGlobe />
                </div>
              </div>

              {/* Right Column: Lead Form */}
              <FadeUp delay={0.2} className="relative">
                <div className="absolute inset-0 bg-prixgen-blue/5 rounded-[3rem] blur-3xl -z-10" />
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-lightblue/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <h3 className="text-2xl font-bold mb-8 text-prixgen-blue">Ready to scale worldwide?</h3>
                  <LeadCaptureForm source="Homepage Worldwide Section" />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showToast && (
          isMinimized ? (
            <motion.button
              key="minimized-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExpand}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-transparent border-none flex items-center justify-center cursor-pointer overflow-visible p-0 group"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src="/images/icon.png"
                alt="Prixgen Updates"
                className="w-full h-full object-contain rounded-full shadow-[0_10px_25px_-5px_rgba(0,102,204,0.35)] bg-transparent"
              />
            </motion.button>
          ) : (
            <motion.div
              key="expanded-toast"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-[0_25px_60px_-15px_rgba(0,102,204,0.15)] p-5 rounded-2xl text-left flex flex-col gap-3 group ring-1 ring-black/5"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Glowing Pulse Dot */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[9px] flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prixgen-lightblue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-prixgen-lightblue"></span>
                  </span>
                  {toastNotifications[toastIndex]?.badge}
                </span>
                <button
                  onClick={handleMinimize}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-prixgen-blue hover:bg-slate-100 transition-all cursor-pointer"
                  aria-label="Minimize notification"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Content Switcher Animation */}
              <div className="relative min-h-[50px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={toastIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 text-left"
                  >
                    <p className="text-sm font-bold text-prixgen-blue leading-snug tracking-tight">
                      {toastNotifications[toastIndex]?.text}
                    </p>

                    {toastNotifications[toastIndex]?.link && (
                      <Link
                        href={toastNotifications[toastIndex].link}
                        className="inline-flex items-center gap-1.5 text-prixgen-lightblue hover:text-prixgen-blue text-xs font-black uppercase tracking-widest transition-colors group/link"
                      >
                        {toastNotifications[toastIndex].cta}
                        <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

