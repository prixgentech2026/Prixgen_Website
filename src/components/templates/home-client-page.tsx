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
    <div
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
    </div>
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

// ============ ISOLATED INSTRUMENT CLUSTER COMPONENTS (Prevents global page re-renders) ============

// 1. Lecca Vision QC Panel Component
function LeccaQCPanel() {
  const [qcCount, setQcCount] = useState(184206);
  
  useEffect(() => {
    const counterTimer = setInterval(() => {
      setQcCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1400);
    return () => clearInterval(counterTimer);
  }, []);

  return (
    <div className="r4-panel">
      <div className="r4-panel-head">
        <span className="r4-panel-title">Lecca · Vision QC</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-bold text-slate-400 tracking-wider">ACTIVE</span>
          <span className="r4-panel-led"></span>
        </div>
      </div>
      <div className="r4-panel-body flex-1 flex flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <div className="r4-counter">{qcCount.toLocaleString('en-IN')}</div>
          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">+124/min</span>
        </div>
        <div className="r4-counter-label">OBJECTS SCANNED TODAY</div>
      </div>
      <div className="r4-panel-foot">COMPUTER_VISION_QC_PIPE</div>
    </div>
  );
}

// 2. IIoT Telemetry Panel Component
function IIoTTelemetryPanel() {
  const [telemetryTemp, setTelemetryTemp] = useState(61.4);
  const [sparkPoints, setSparkPoints] = useState("0,28 22,24 44,26 66,14 88,20 110,10 132,18 154,8 176,16 198,6 220,12");

  useEffect(() => {
    const telemetryTimer = setInterval(() => {
      const newTemp = (58 + Math.random() * 8).toFixed(1);
      setTelemetryTemp(parseFloat(newTemp));
      
      let y = 20;
      const pts = [];
      for (let x = 0; x <= 220; x += 22) {
        y += (Math.random() * 14 - 7);
        y = Math.max(6, Math.min(34, y));
        pts.push(`${x},${y.toFixed(1)}`);
      }
      setSparkPoints(pts.join(' '));
    }, 2200);
    return () => clearInterval(telemetryTimer);
  }, []);

  return (
    <div className="r4-panel">
      <div className="r4-panel-head">
        <span className="r4-panel-title">IIoT Telemetry</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-bold text-slate-400 tracking-wider">SYNCED</span>
          <span className="r4-panel-led"></span>
        </div>
      </div>
      <div className="r4-panel-body flex-1 flex flex-col justify-between">
        <div className="r4-spark-row justify-between mb-1">
          <span className="r4-spark-val">{telemetryTemp.toFixed(1)}°C</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">TEMP_SENSOR_14</span>
        </div>
        <svg className="r4-spark bg-slate-50/50 rounded-lg p-1 border border-slate-100" viewBox="0 0 220 40" preserveAspectRatio="none">
          <line x1="0" y1="10" x2="220" y2="10" stroke="rgba(0, 75, 135, 0.04)" strokeWidth="0.5" />
          <line x1="0" y1="20" x2="220" y2="20" stroke="rgba(0, 75, 135, 0.04)" strokeWidth="0.5" />
          <line x1="0" y1="30" x2="220" y2="30" stroke="rgba(0, 75, 135, 0.04)" strokeWidth="0.5" />
          <polyline className="r4-spark-line" points={sparkPoints} />
        </svg>
      </div>
      <div className="r4-panel-foot">PLC_MQTT_CONNECT_OK</div>
    </div>
  );
}

// 3. GenAI Copilot Panel Component
function GenAICopilotPanel() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const lines = [
      '> optimize batch schedule — line 3',
      '> forecast raw-material shortfall: 6 days',
      '> flag anomaly — sensor 14, packaging cell',
      '> draft weekly ops summary for plant head'
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentLine = lines[lineIdx];
      if (!isDeleting) {
        charIdx++;
        setTypedText(currentLine.slice(0, charIdx));
        if (charIdx === currentLine.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 1400);
        } else {
          timeoutId = setTimeout(tick, 38);
        }
      } else {
        charIdx--;
        setTypedText(currentLine.slice(0, charIdx));
        if (charIdx === 0) {
          isDeleting = false;
          lineIdx = (lineIdx + 1) % lines.length;
        }
        timeoutId = setTimeout(tick, 22);
      }
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="r4-panel">
      <div className="r4-panel-head">
        <span className="r4-panel-title">GenAI Copilot</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-bold text-slate-400 tracking-wider">RUNNING</span>
          <span className="r4-panel-led"></span>
        </div>
      </div>
      <div className="r4-panel-body flex-1 flex flex-col justify-center">
        <div className="r4-term">
          <span>{typedText}</span>
          <span className="r4-caret"></span>
        </div>
      </div>
      <div className="r4-panel-foot">NATURAL_LANGUAGE_OPS</div>
    </div>
  );
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
        {false && (
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
        )}

        {/* ============ REDESIGNED HERO SECTION (Hero Redesign v4 - Light Brand Theme) ============ */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --r4-navy:        #004B87;   /* brand blue */
            --r4-lightblue:   #00A3E0;   /* brand lightblue */
            --r4-dark:        #1A1A1A;   /* brand dark text */
            --r4-gray:        #F4F4F4;   /* brand gray */
            --r4-white:       #FFFFFF;
          }
          
          .r4-hero {
            position: relative;
            background: #FFFFFF;
            overflow: hidden;
            text-align: left;
          }
          
          .r4-hero::before {
            content: ""; position: absolute; inset: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(0, 75, 135, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 75, 135, 0.015) 1px, transparent 1px);
            background-size: 42px 42px;
          }

          .r4-eyebrow {
            display: inline-flex; align-items: center; gap: 9px;
            font-size: 10px; font-weight: 700; letter-spacing: 0.25em;
            text-transform: uppercase; color: var(--r4-navy);
            border: 1px solid rgba(0, 163, 224, 0.25); background: rgba(0, 163, 224, 0.06);
            padding: 7px 14px 7px 10px; border-radius: 100px; margin-bottom: 26px;
          }
          
          .r4-eyebrow .r4-dot {
            width: 6px; height: 6px; border-radius: 50%; background: var(--r4-lightblue);
            box-shadow: 0 0 0 3px rgba(0, 163, 224, 0.25); animation: r4-blink 2.4s infinite;
          }
          
          @keyframes r4-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }

          .r4-h1 {
            font-weight: 700;
            line-height: 1.15;
            letter-spacing: -0.02em;
            color: var(--r4-dark);
          }

          .r4-h1-a {
            display: block; font-size: 20px; font-weight: 700; color: var(--r4-navy); margin-bottom: 8px;
          }
          
          .r4-h1-b {
            display: block; font-size: 32px; font-weight: 700;
          }
          
          @media (min-width: 768px) {
            .r4-h1-a { font-size: 24px; }
            .r4-h1-b { font-size: 44px; }
          }
          @media (min-width: 1024px) {
            .r4-h1-a { font-size: 28px; }
            .r4-h1-b { font-size: 48px; }
          }
          
          .r4-h1-b .r4-hi {
            color: var(--r4-lightblue);
          }

          .r4-sub {
            margin-top: 22px; font-size: 18px; font-weight: 500; line-height: 1.7; color: #475569; max-width: 580px;
          }

          .r4-proof-row {
            margin-top: 44px; padding-top: 22px; border-top: 1px solid rgba(0, 75, 135, 0.12);
            display: flex; gap: 28px; flex-wrap: wrap;
            font-size: 13.5px; color: #475569; letter-spacing: 0.02em;
          }
          
          .r4-proof-row b {
            color: var(--r4-navy); font-weight: 700;
          }

          .r4-console-frame {
            background: #FFFFFF;
            background-image: 
              radial-gradient(rgba(0, 163, 224, 0.05) 1.2px, transparent 1.2px),
              radial-gradient(rgba(0, 75, 135, 0.03) 1.5px, transparent 1.5px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
            border: 1px solid rgba(0, 75, 135, 0.12);
            border-radius: 20px;
            padding: 16px 18px 18px;
            box-shadow: 0 25px 60px -15px rgba(0, 75, 135, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .r4-console-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0, 75, 135, 0.08);
            padding-bottom: 12px;
          }

          .r4-console-address {
            flex: 1;
            max-w-[280px];
            margin: 0 auto;
            background: #F1F5F9;
            border-radius: 8px;
            padding: 4px 10px;
            font-family: monospace;
            font-size: 9.5px;
            color: #64748B;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            border: 1px solid rgba(0, 75, 135, 0.06);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .r4-console-status {
            font-family: monospace;
            font-size: 9px;
            font-weight: 700;
            color: var(--r4-lightblue);
            background: rgba(0, 163, 224, 0.06);
            padding: 3px 8px;
            border-radius: 5px;
            letter-spacing: 0.05em;
            white-space: nowrap;
          }

          .r4-cluster {
            display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
            gap: 14px; position: relative; z-index: 2;
          }

          .r4-panel {
            background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
            border: 1px solid rgba(0, 75, 135, 0.09);
            border-radius: 16px; padding: 16px 18px;
            display: flex; flex-direction: column; 
            height: 196px; /* Set exact matching height for all cards with bottom margin safety */
            justify-content: space-between;
            text-align: left;
            box-shadow: 0 4px 20px -2px rgba(0, 75, 135, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                        box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                        border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform, box-shadow;
          }

          .r4-panel:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 40px -12px rgba(0, 75, 135, 0.12), 0 0 0 1px rgba(0, 163, 224, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
            border-color: rgba(0, 163, 224, 0.25);
          }
          
          .r4-panel-head {
            display: flex; align-items: center; justify-content: space-between;
            border-bottom: 1px solid rgba(0, 75, 135, 0.05);
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          
          .r4-panel-title {
            font-size: 10px; font-weight: 750; letter-spacing: 0.15em;
            text-transform: uppercase; color: var(--r4-navy);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          
          .r4-panel-led {
            width: 6px; height: 6px; border-radius: 50%; background: var(--r4-lightblue);
            box-shadow: 0 0 0 3px rgba(0, 163, 224, 0.15);
            animation: r4-pulse-led 2s infinite;
          }

          @keyframes r4-pulse-led {
            0% {
              box-shadow: 0 0 0 0 rgba(0, 163, 224, 0.4);
            }
            70% {
              box-shadow: 0 0 0 6px rgba(0, 163, 224, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(0, 163, 224, 0);
            }
          }

          .r4-counter {
            font-weight: 750; font-size: 28px; color: var(--r4-navy);
            letter-spacing: 0.02em;
          }
          
          .r4-counter-label {
            font-size: 11px; font-weight: 500; color: #64748B; margin-top: 4px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }

          .r4-spark-row {
            display: flex; align-items: center; gap: 10px;
          }
          
          .r4-spark-val {
            font-size: 17px; color: var(--r4-navy); font-weight: 700; white-space: nowrap;
          }
          
          svg.r4-spark {
            width: 100%; height: 38px; overflow: visible;
          }
          
          .r4-spark-line {
            fill: none; stroke: var(--r4-lightblue); stroke-width: 2.0; stroke-linecap: round; stroke-linejoin: round;
            stroke-dasharray: 400;
            stroke-dashoffset: 0;
            animation: r4-spark-flow 8s linear infinite;
          }

          @keyframes r4-spark-flow {
            from { stroke-dashoffset: 400; }
            to { stroke-dashoffset: 0; }
          }

          .r4-term {
            font-family: monospace; font-size: 11px; color: #38BDF8; line-height: 1.55;
            min-height: 54px;
            background: #0B0F19;
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .r4-term .r4-caret {
            display: inline-block; width: 6px; height: 12px; background: #38BDF8; margin-left: 2px;
            vertical-align: middle; animation: r4-blink 1s steps(2) infinite;
          }

          .r4-panel-foot {
            font-family: monospace;
            font-size: 9px; font-weight: 600; text-transform: uppercase;
            letter-spacing: 0.06em; color: #64748B;
            margin-top: auto;
            padding-top: 10px;
            border-top: 1px dashed rgba(0, 75, 135, 0.05);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }

          .r4-bars {
            display: flex; align-items: flex-end; gap: 6px; height: 38px;
          }
          
          .r4-bars i {
            flex: 1; background: linear-gradient(180deg, var(--r4-lightblue), var(--r4-navy)); border-radius: 2px 2px 0 0;
            animation: r4-rise 2s ease-in-out infinite alternate; transform-origin: bottom;
          }
          
          .r4-bars i:nth-child(1) { height: 40%; animation-delay: 0s; animation-duration: 1.5s; }
          .r4-bars i:nth-child(2) { height: 65%; animation-delay: 0.2s; animation-duration: 2.1s; }
          .r4-bars i:nth-child(3) { height: 50%; animation-delay: 0.4s; animation-duration: 1.8s; }
          .r4-bars i:nth-child(4) { height: 85%; animation-delay: 0.6s; animation-duration: 2.4s; }
          .r4-bars i:nth-child(5) { height: 70%; animation-delay: 0.8s; animation-duration: 1.9s; }
          .r4-bars i:nth-child(6) { height: 95%; animation-delay: 1.0s; animation-duration: 2.2s; }
          
          @keyframes r4-rise {
            0% { transform: scaleY(0.45); }
            100% { transform: scaleY(1); }
          }

          .r4-strip {
            background: var(--r4-white); border-bottom: 1px solid #DCE3E8;
            text-align: left;
          }
          
          .r4-strip-inner {
            display: flex; align-items: center; gap: 40px; padding: 26px 0; flex-wrap: wrap;
          }
          
          .r4-strip-quote {
            font-size: 13.5px; color: #56636E; font-style: italic; max-width: 480px; line-height: 1.5;
            border-left: 2px solid var(--r4-lightblue); padding-left: 16px;
          }
          
          .r4-strip-quote b {
            font-style: normal; color: #0C1620;
          }
          
          .r4-strip-clients {
            display: flex; gap: 34px; flex-wrap: wrap; margin-left: auto;
          }
          
          .r4-strip-clients span {
            font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 14px; color: #9FB0BD;
            transition: color 0.2s ease; cursor: default;
          }
          
          .r4-strip-clients span:hover {
            color: var(--r4-navy);
          }

          @media (max-width: 980px) {
            .r4-hero-inner {
              grid-template-columns: 1fr;
              padding: 44px 0 40px;
              gap: 36px;
            }
            .r4-h1-b {
              font-size: 34px;
            }
            .r4-h1-a {
              font-size: 20px;
            }
            .r4-cluster {
              grid-template-columns: 1fr 1fr;
            }
            .r4-strip-clients {
              margin-left: 0;
              gap: 22px;
            }
          }
        `}} />

        <section className="r4-hero py-16 lg:py-24 px-4">
          <div className="max-w-[1360px] mx-auto px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center r4-hero-inner">
              <div className="hero-copy">
                <FadeUp delay={0.15}>
                  <div className="r4-eyebrow">
                    <span className="r4-dot"></span> In-House AI · GenAI · IIoT
                  </div>
                </FadeUp>
                
                <h1 className="r4-h1">
                  <RevealText delay={0.25}>
                    <span className="r4-h1-a">Most ERP partners resell someone else's AI.</span>
                  </RevealText>
                  <RevealText delay={0.4}>
                    <span className="r4-h1-b">We build ours <span className="r4-hi">in-house.</span></span>
                  </RevealText>
                </h1>
                
                <FadeUp delay={0.55}>
                  <p className="r4-sub">
                    We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Powered by proprietary AI, GenAI, and IIoT — our solutions run on a unified Odoo core with proven industrial intelligence.
                  </p>
                </FadeUp>
                
                <FadeUp delay={0.7}>
                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
                    <Button size="lg" className="h-14 px-8 rounded-xl shadow-md w-full sm:w-auto font-bold text-sm transition-transform hover:-translate-y-0.5 active:scale-95" asChild>
                      <Link href="/contact">Schedule an Architecture Audit</Link>
                    </Button>
                    <Link href="/blog" className="group flex items-center gap-2 text-prixgen-blue font-bold text-sm leading-snug">
                      <span>Read the 2026 Manufacturing Benchmark</span>
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </FadeUp>
                
                <FadeUp delay={0.85}>
                  <div className="r4-proof-row">
                    <span><b>20+</b> years in the field</span>
                    <span><b>100+</b> implementations shipped</span>
                    <span><b>Gold</b> Odoo Partner</span>
                  </div>
                </FadeUp>
              </div>

              <FadeUp delay={0.3}>
                <div className="r4-console-frame">
                  <div className="r4-console-nav">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80"></span>
                    </div>
                    <div className="r4-console-address">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>prixgen-engine-v4.local/status</span>
                    </div>
                    <div className="r4-console-status">
                      COGNITIVE ENGINE v4.2
                    </div>
                  </div>
                  
                  <div className="r4-cluster" role="img" aria-label="Live illustrative dashboard showing Prixgen's AI, IoT and analytics products">
                    <LeccaQCPanel />
                    <IIoTTelemetryPanel />
                    <GenAICopilotPanel />
                    <div className="r4-panel">
                      <div className="r4-panel-head">
                        <span className="r4-panel-title">Predictive Analytics</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] font-bold text-slate-400 tracking-wider">LIVE</span>
                          <span className="r4-panel-led"></span>
                        </div>
                      </div>
                      <div className="r4-panel-body flex-1 flex flex-col justify-between">
                        <div className="flex items-baseline justify-between mb-1 mt-1">
                          <span className="text-[22px] font-bold text-[#004B87] tracking-tight">98.4%</span>
                          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">YIELD_OK</span>
                        </div>
                        <div className="r4-bars mt-2">
                          <i></i><i></i><i></i><i></i><i></i><i></i>
                        </div>
                      </div>
                      <div className="r4-panel-foot">DEMAND_YIELD_FORECASTING</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>







        {/* 2. Services Section (Our Best Services / Prixgen Services) */}
        <section className="py-8 lg:py-12 px-4 bg-prixgen-gray/10 relative">
          <div className="container mx-auto px-4 pt-4">
            <div className="mb-16 text-left">
              <FadeUp>
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
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



        {/* 3. Our Solutions Section */}
        <section className="py-8 lg:py-12 bg-white relative">
          <div className="container mx-auto px-4 pt-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <FadeUp className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
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



        {/* 4. Our Patronage Section - Infinite Marquee */}
        <section className="py-8 lg:py-12 bg-prixgen-gray/20 overflow-hidden relative border-y border-slate-200/50">
          <div className="container mx-auto px-4 relative z-10 pt-4">
            <FadeUp className="text-center mb-16">
              <h2 className="text-4xl font-bold text-prixgen-blue mb-4">Our Patronage</h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
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
                    {['UAE', 'Hong Kong', 'Philippines'].map((loc) => (
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

      {false && (
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
      )}
    </div>
  );
}

