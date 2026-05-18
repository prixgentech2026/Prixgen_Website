'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { Button } from '@/components/ui/button';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { CheckCircle2, ArrowRight, Globe2, Target, Eye, ShieldCheck, Cpu, Code2, X } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

interface Advantage {
  title: string;
  description: string;
  icon?: string;
}

interface ExperienceSection {
  title: string;
  description: string;
  points: string[];
}

interface AboutProps {
  data: {
    title: string;
    subtitle: string;
    content: any;
    vision: string;
    mission: string;
    stats: Stat[];
    whyChooseUs: Advantage[];
    whyChooseUsIntro: string;
    experienceSection: ExperienceSection;
    featuredImage?: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

const HeroImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <OptimizedImage 
      src={src} 
      alt={alt} 
      fill 
      className="object-cover transition-transform duration-1000 group-hover:scale-105"
      priority
    />
  </div>
);

export function AboutClient({ data }: AboutProps) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [selectedInsight, setSelectedInsight] = React.useState<any>(null);

  // Map for deep-dive content
  const detailedInsights: any = {
    "Assured Services": {
      content: "Our commitment to assurance goes beyond simple SLAs. We implement a multi-layered Quality Management System (QMS) that monitors every deployment phase. From initial requirement mapping to post-live support, our internal 'Enterprise Health Checks' ensure that your architecture remains stable, secure, and performant as you scale.",
      stats: ["99.9% Uptime Guarantee", "Real-time Monitoring", "ISO Certified Workflows"],
      methodology: "Phase-based validation with 24/7 oversight.",
      icon: <ShieldCheck className="text-prixgen-blue" size={32} />
    },
    "Future-Proofed Innovation": {
      content: "Prixgen operates a unified global service fabric designed for multi-national enterprises. Our 'Follow-the-Sun' architecture ensures that whether your operations are in APAC, EMEA, or AMER regions, you have access to Tier-3 engineering support 24/7. We specialize in the orchestration of multi-country rollouts, navigating fragmented tax laws, and synchronizing global supply chains through a single, unified digital core.",
      stats: ["5 Integrated Global Hubs", "Multi-Jurisdictional Compliance", "Cross-Border ERP Orchestration"],
      methodology: "Global governance with localized execution.",
      icon: <Globe2 className="text-prixgen-blue" size={32} />
    },
    "Expert Engineering": {
      content: "Our engineering philosophy is rooted in 'Clean Architecture' and modular scalability. We go beyond simple coding to build robust API ecosystems and data-driven infrastructures. By leveraging cutting-edge DevOps pipelines and containerized deployments, we ensure that your enterprise platform is not just functional today, but ready for AI integration and predictive analytics tomorrow.",
      stats: ["CI/CD Automated Pipelines", "AI-Ready Data Architecture", "100% Modular Scalability"],
      methodology: "Future-proof engineering with modular design.",
      icon: <Code2 className="text-prixgen-blue" size={32} />
    }
  };

  // Safe lookup: try title match first, then index match as fallback
  const getInsightData = (item: any) => {
    if (!item) return null;
    
    // 1. Try direct title match
    if (detailedInsights[item.title]) return detailedInsights[item.title];
    
    // 2. Fallback to index mapping (0=Assured, 1=Innovation, 2=Engineering)
    const titles = Object.keys(detailedInsights);
    const index = data.whyChooseUs?.findIndex((i: any) => i.title === item.title);
    if (index !== -1 && titles[index]) {
      return detailedInsights[titles[index]];
    }
    
    return null;
  };

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      <AnimatePresence>
        {selectedInsight && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInsight(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedInsight(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-prixgen-blue hover:text-white transition-all z-20"
              >
                <X size={24} />
              </button>

              <div className="lg:w-1/3 bg-slate-50 p-10 flex flex-col justify-between border-r border-slate-200">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-4xl shadow-xl ring-4 ring-white/10">
                  {getInsightData(selectedInsight)?.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-prixgen-blue mb-2 uppercase tracking-tight">{selectedInsight.title}</h3>
                  <p className="text-sm font-bold text-prixgen-lightblue tracking-widest uppercase">Methodology</p>
                  <p className="text-slate-600 font-medium">{getInsightData(selectedInsight)?.methodology}</p>
                </div>
              </div>

              <div className="lg:w-2/3 p-10 lg:p-14">
                <h4 className="text-sm font-bold text-prixgen-lightblue tracking-[0.2em] uppercase mb-4">Deep Dive</h4>
                <p className="text-xl text-slate-700 leading-relaxed font-medium mb-10">
                  {getInsightData(selectedInsight)?.content}
                </p>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Performance Indicators</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getInsightData(selectedInsight)?.stats.map((stat: string) => (
                      <div key={stat} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <CheckCircle2 className="text-prixgen-blue shrink-0" size={20} />
                        <span className="text-slate-700 font-bold text-sm">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center pt-24 lg:pt-28 pb-8 px-4 overflow-hidden bg-white">
        {/* Animated Architectural Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e908_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e908_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_20%,transparent_100%)]" />
        </div>

        {/* Subdued Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-prixgen-blue/[0.02] blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-prixgen-lightblue/[0.02] blur-3xl -ml-32 -mb-32" />

        
        <div className="container mx-auto relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <FadeUp>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] w-12 bg-prixgen-blue/20 rounded-full" />
                  <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px] flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prixgen-lightblue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-prixgen-blue"></span>
                    </span>
                    {data.subtitle || "Architects of Intelligence"}
                  </span>
                </div>
                <div className="relative">
                  <StaggerText 
                    text={data.title || "Who We Are"} 
                    variant="gradient"
                    className="text-5xl md:text-6xl font-black leading-[0.9] mb-8 -ml-1 tracking-tighter"
                  />
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-4 left-0 h-2 w-40 bg-prixgen-blue origin-left"
                  />
                </div>
              </FadeUp>
              
              <FadeUp delay={0.4}>
                <div className="prose prose-xl prose-slate max-w-xl">
                  <PortableText 
                    value={data.content} 
                    components={{
                      block: {
                        normal: ({ children }) => <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed mb-6">{children}</p>,
                      }
                    }}
                  />
                </div>
                <motion.div 
                  className="flex gap-6 mt-6 items-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
                    hidden: {}
                  }}
                >
                  {data.stats?.slice(0, 2).map((stat, i) => (
                    <React.Fragment key={i}>
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, scale: 0.5 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                        }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="flex flex-col cursor-default group"
                      >
                        <span className="text-3xl font-black text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors duration-300">
                          {stat.value}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors duration-300 whitespace-nowrap">
                          {stat.label}
                        </span>
                      </motion.div>
                      <motion.div 
                        variants={{
                          hidden: { height: 0 },
                          visible: { height: 48, transition: { duration: 0.5 } }
                        }}
                        className="w-[1px] bg-slate-200" 
                      />
                    </React.Fragment>
                  ))}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col cursor-default group"
                  >
                    <motion.span 
                      animate={{ 
                        backgroundPosition: ["0%", "200%"],
                        textShadow: ["0 0 0px rgba(245,158,11,0)", "0 0 10px rgba(245,158,11,0.3)", "0 0 0px rgba(245,158,11,0)"]
                      }}
                      transition={{ 
                        backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                        textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 bg-[length:200%_auto]"
                    >
                      Gold
                    </motion.span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                      Partner
                    </span>
                  </motion.div>
                </motion.div>
              </FadeUp>
            </div>

            <FadeUp delay={0.6} className="relative">
              <div className="relative aspect-[4/5] lg:aspect-square group">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-prixgen-blue/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-prixgen-lightblue/10 rounded-full blur-2xl" />
                
                <HeroImage 
                  src={data.featuredImage?.sourceUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"} 
                  alt={data.featuredImage?.altText || "Prixgen Team"}
                  className="w-full h-full rounded-[4rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000"
                />

                {/* Floating Badge */}
                <motion.div 
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [0, -10, 0], opacity: 1 }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -right-8 bottom-20 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 border border-slate-50 hidden lg:block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-prixgen-blue flex items-center justify-center text-white">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certified</p>
                      <p className="text-lg font-bold text-prixgen-blue">Enterprise Grade</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY SECTION */}
      <section className="py-10 lg:py-14 px-4 bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <FadeUp>
              <StaggerText 
                text="Our Architectural Philosophy" 
                variant="default"
                as="h2"
                className="text-3xl lg:text-4xl font-bold text-prixgen-blue mb-6 tracking-tight justify-center"
              />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-prixgen-blue mx-auto rounded-full mb-8" 
              />
              <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
                We don&apos;t just deploy software; we future-proof your digital journey. Our methodology is rooted in architectural integrity and zero-tolerance for operational friction.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

    {/* 3. OUR FOUNDATION (Vision & Mission) */}
    <section className="py-10 lg:py-14 bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mb-24">
          <FadeUp>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight uppercase leading-tight opacity-90">
              The <span className="text-prixgen-lightblue">Foundation</span>
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1.5 bg-gradient-to-r from-prixgen-blue to-transparent rounded-full mb-8" 
            />
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <FadeUp delay={0.1}>
            <motion.div 
              whileHover={{ y: -20, scale: 1.02 }}
              className="group h-full bg-white/[0.02] backdrop-blur-3xl p-10 lg:p-14 rounded-[4rem] border border-white/10 hover:border-prixgen-blue/50 transition-all duration-700 relative overflow-hidden shadow-2xl"
            >
              <div className="mb-10 w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-white/10 shadow-inner">
                <Eye size={44} strokeWidth={1} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 tracking-tighter uppercase text-white/90">Our Vision</h3>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-medium group-hover:text-white transition-colors duration-700">
                &quot;{data.vision}&quot;
              </p>
            </motion.div>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <motion.div 
              whileHover={{ y: -20, scale: 1.02 }}
              className="group h-full bg-white/[0.02] backdrop-blur-3xl p-10 lg:p-14 rounded-[4rem] border border-white/10 hover:border-prixgen-blue/50 transition-all duration-700 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-prixgen-blue/5 rounded-full blur-[80px] group-hover:bg-prixgen-blue/10 transition-all duration-700" />
              <div className="mb-10 w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-white/10 shadow-inner">
                <Target size={44} strokeWidth={1} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 tracking-tighter uppercase relative z-10 text-white/90">Our Mission</h3>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-medium relative z-10 group-hover:text-white transition-colors duration-700">
                &quot;{data.mission}&quot;
              </p>
            </motion.div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <motion.div 
              whileHover={{ y: -20, scale: 1.02 }}
              className="group h-full bg-white/[0.02] backdrop-blur-3xl p-10 lg:p-14 rounded-[4rem] border border-white/10 hover:border-prixgen-blue/50 transition-all duration-700 relative overflow-hidden shadow-2xl"
            >
              <div className="mb-10 w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-white/10 shadow-inner">
                <Globe2 size={44} strokeWidth={1} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 tracking-tighter uppercase relative z-10 text-white/90">Our Strategy</h3>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-medium relative z-10 group-hover:text-white transition-colors duration-700">
                &quot;We combine technical edge with strong business insight to architect future-proof enterprise operations.&quot;
              </p>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* 4. WHY CHOOSE US SECTION */}
    <section className="py-10 lg:py-14 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-prixgen-blue/[0.02] blur-[100px] -mr-[15rem] -mt-[15rem]" />
      <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-prixgen-lightblue/[0.02] blur-[80px] -ml-[10rem] -mb-[10rem]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mb-24">
          <FadeUp>
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[1px] bg-prixgen-blue" 
              />
              <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-sm">Our Competitive Edge</span>
            </div>
            <StaggerText 
              text="Why Choose Us" 
              variant="default"
              as="h2"
              className="text-3xl lg:text-5xl font-bold text-prixgen-blue mb-8 tracking-tighter"
            />
            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed font-medium max-w-4xl">
              {data.whyChooseUsIntro}
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.whyChooseUs?.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.15}>
              <motion.div 
                whileHover={{ y: -20, scale: 1.02 }}
                className="group relative h-full"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-prixgen-blue/20 to-transparent rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="h-full p-12 bg-white/70 backdrop-blur-2xl rounded-[3.5rem] border border-slate-200/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] group-hover:border-prixgen-blue/30 transition-all duration-500 flex flex-col relative overflow-hidden">
                  {/* Watermark Number */}
                  <div className="absolute -right-6 -bottom-6 text-7xl lg:text-8xl font-black text-slate-100/40 group-hover:text-prixgen-blue/[0.03] transition-colors duration-700 select-none leading-none">
                    {i + 1}
                  </div>

                  <div className="mb-12 w-20 h-20 bg-gradient-to-br from-prixgen-blue to-prixgen-lightblue rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-prixgen-blue/20 group-hover:rotate-[15deg] transition-transform duration-500 relative z-10">
                    {i === 0 && <ShieldCheck size={36} strokeWidth={1.5} />}
                    {i === 1 && <Cpu size={36} strokeWidth={1.5} />}
                    {i === 2 && <Code2 size={36} strokeWidth={1.5} />}
                  </div>

                  <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight text-prixgen-blue relative z-10">{item.title}</h4>
                  <p className="text-base lg:text-lg text-slate-500 leading-relaxed font-medium relative z-10 flex-1 group-hover:text-slate-700 transition-colors">
                    {item.description}
                  </p>

                  <button 
                    onClick={() => setSelectedInsight(item)}
                    className="mt-10 pt-8 border-t border-slate-100 flex items-center text-prixgen-lightblue font-bold text-sm group-hover:gap-4 transition-all gap-2 relative z-10 w-full text-left"
                  >
                    Strategic Insight <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* 5. EXPERIENCE SECTION */}
    <section className="py-10 lg:py-14 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="absolute -left-10 top-40 text-8xl lg:text-9xl font-bold text-slate-100/40 select-none leading-none pointer-events-none italic">20</div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeUp>
            <div className="relative">
              <StaggerText 
                text={data.experienceSection?.title || "Excellence Driven"} 
                variant="default"
                as="h2"
                className="text-3xl lg:text-5xl font-bold mb-8 tracking-tight text-slate-900 leading-tight"
              />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-prixgen-blue rounded-full mb-8" 
              />
              <div className="space-y-8">
                {data.experienceSection?.points?.map((point, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start gap-6 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-prixgen-blue shrink-0 ring-1 ring-slate-100 border border-slate-50">
                      <ShieldCheck size={32} strokeWidth={1.5} />
                    </div>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed pt-1 group-hover:text-slate-900 transition-colors">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <OptimizedImage src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" alt="Prixgen Excellence" fill className="object-cover" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* 6. STATS SECTION */}
    <section className="py-10 lg:py-14 bg-[#020617] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {data.stats?.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="text-center group">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                  className="text-4xl lg:text-7xl font-black mb-4 text-white tracking-tighter leading-none"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    {stat.value}
                  </span>
                </motion.div>
                <div className="h-1.5 w-12 bg-prixgen-blue mx-auto mb-8 group-hover:w-24 transition-all duration-700 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
                <p className="text-[10px] lg:text-xs text-slate-500 font-black uppercase tracking-[0.4em] opacity-80 group-hover:text-prixgen-lightblue transition-colors">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* 7. FINAL CTA */}
    <section className="py-10 lg:py-14 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#020617] p-12 lg:p-24 rounded-[4rem] text-white text-center overflow-hidden shadow-2xl group"
        >
          {/* Animated Background for CTA */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-prixgen-blue/20 via-transparent to-prixgen-lightblue/10"
            />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <FadeUp>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-prixgen-lightblue font-bold tracking-widest uppercase text-[10px] mb-8">
                Ready to transform?
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-[1.1] tracking-tighter">
                Scale your vision <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">with Prixgen.</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="h-16 px-12 text-lg font-bold rounded-2xl bg-prixgen-blue hover:bg-prixgen-lightblue text-white shadow-[0_20px_50px_rgba(14,165,233,0.3)] transition-all border-none" 
                    asChild
                  >
                    <Link href="/contact" className="flex items-center gap-3">
                      Architecture Audit <ArrowRight size={20} />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </FadeUp>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale"
            >
              <div className="text-xs font-bold tracking-widest uppercase">Trusted by Global Enterprises</div>
            </motion.div>
          </div>
          
          {/* Decorative Corner Glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-prixgen-blue/20 blur-[100px] -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-prixgen-lightblue/20 blur-[100px] -mr-32 -mb-32" />
        </motion.div>
      </div>
    </section>
  </div>
  );
}
