'use client';

import React, { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { 
  Calendar, ArrowLeft, Clock, 
  Twitter, Linkedin, 
  Copy, CheckCircle2, Bookmark
} from 'lucide-react';
import { BlogPost } from '@/lib/data';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { LinkedInEmbed } from '@/components/shared/linkedin-embed';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { Magnetic } from '@/components/animations/magnetic';
import { AnimatedConnector } from '@/components/shared/animated-connector';
import { HeroBadge } from '@/components/shared/hero-badge';
import { HeroBackground } from '@/components/shared/hero-background';
import { urlFor } from '@/sanity/lib/image';

interface PostClientProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-black text-prixgen-blue mt-16 mb-8 tracking-tighter leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-5xl font-bold text-prixgen-blue mt-20 mb-8 tracking-tighter flex items-center gap-5">
        <span className="h-10 w-1.5 bg-gradient-to-b from-prixgen-blue to-prixgen-lightblue rounded-full" />
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold text-prixgen-blue mt-10 mb-4 tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-xl leading-[1.9] text-slate-500 mb-10 font-medium">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="relative border-l-8 border-prixgen-lightblue bg-slate-50 p-10 italic my-12 rounded-r-[3rem] shadow-inner">
        <span className="absolute top-4 left-4 text-6xl text-prixgen-lightblue/10 font-serif">"</span>
        <div className="relative z-10 text-2xl md:text-3xl text-prixgen-blue font-bold tracking-tight leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none mb-10 space-y-4 text-slate-600 text-xl font-medium ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-10 space-y-4 text-slate-600 text-xl font-medium ml-4 marker:text-prixgen-blue marker:font-black">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-4">
        <span className="mt-2.5 h-2 w-2 rounded-full bg-prixgen-lightblue shrink-0" />
        <div>{children}</div>
      </li>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-16 group">
        <div className="relative w-full overflow-hidden shadow-2xl border-8 border-white bg-white">
          <img 
            src={urlFor(value).url()} 
            alt={value.alt || 'Industrial Insight'} 
            className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.02]" 
          />
        </div>
        {value.alt && (
          <figcaption className="mt-6 text-center text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default function PostClient({ post, relatedPosts = [] }: PostClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Specific components for author bio (smaller text, different spacing)
  const authorComponents = {
    block: {
      normal: ({ children }: any) => (
        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-4">
          {children}
        </p>
      ),
    },
  };

  // Parallax for Hero and Author
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);
  const authorY = useTransform(scrollYProgress, [0.6, 1], [20, -20]);
  
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers/environments where navigator.clipboard is unavailable
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      // Make it invisible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Copy failed: ', e);
      }
      document.body.removeChild(textArea);
    }
  };

  if (!post) return null;

  return (
    <article className="bg-white selection:bg-prixgen-blue selection:text-white overflow-hidden" style={{ willChange: 'transform' }}>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-prixgen-lightblue z-[100] origin-left shadow-[0_0_15px_rgba(0,191,255,0.5)]"
        style={{ scaleX }}
      />

      {/* Premium White Hero */}
      <header className="relative pt-24 lg:pt-32 pb-16 flex items-center overflow-hidden bg-white">
        <HeroBackground />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeUp className="space-y-6 max-w-5xl mx-auto">
            <HeroBadge text="Intelligence Center" align="center" />
            
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue hover:bg-prixgen-blue hover:text-white transition-all font-black text-[10px] uppercase tracking-widest group mx-auto"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Intelligence Center
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {post.categories?.map((cat: { title: string }) => (
                <span key={cat.title} className="px-5 py-2 rounded-2xl bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue text-[10px] font-black uppercase tracking-[0.2em]">
                  {cat.title}
                </span>
              ))}
              <div className="h-4 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <Calendar size={14} className="text-prixgen-lightblue" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Analysis Pending'}
              </div>
            </div>

            <StaggerText 
              text={post.title} 
              variant="gradient"
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1] tracking-tighter"
            />

            <div className="flex items-center justify-center gap-6 pt-4">
               <div className="flex items-center gap-4">
                  {post.author?.image && (
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-xl ring-1 ring-slate-100">
                      <OptimizedImage src={post.author.image} alt={post.author.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="text-left">
                    <div className="text-lg font-black text-prixgen-blue tracking-tight leading-none mb-1">{post.author?.name}</div>
                    <div className="text-prixgen-lightblue text-[10px] font-black uppercase tracking-widest">{post.author?.position || 'Principal Architect'}</div>
                  </div>
               </div>
               <div className="h-8 w-px bg-slate-100" />
               <div className="flex items-center gap-2">
                 <motion.button 
                   onClick={handleCopy}
                   whileHover={{ scale: 1.1 }}
                   className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-prixgen-blue hover:bg-white hover:shadow-xl transition-all"
                   title="Copy link"
                 >
                   {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                 </motion.button>
               </div>
            </div>
          </FadeUp>
        </div>
        

      </header>

      {/* Feature Image */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] lg:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,102,204,0.15)] border-[8px] md:border-[12px] border-white ring-1 ring-slate-100 overflow-hidden">
          <div className="relative aspect-[21/9]">
            <OptimizedImage 
              src={post.mainImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"} 
              alt={post.title} 
              fill 
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
          </div>
        </div>
      </div>


      {/* Content Section */}
      <div className="container mx-auto px-6 py-12 lg:py-20 relative">
        <div className="flex flex-col lg:flex-row gap-20">
           {/* Sidebar - Left (Desktop Only) */}
           <aside className="hidden lg:block w-16 shrink-0">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="sticky top-40 space-y-6 flex flex-col items-center"
              >
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 vertical-text rotate-180 mb-4 whitespace-nowrap">Share Intelligence</span>
                 <div className="w-px h-10 bg-slate-100" />
                 <Magnetic>
                    <a href="https://www.linkedin.com/company/prixgen-tech-solutions-pvt-ltd/" target="_blank" rel="noopener noreferrer">
                      <motion.button whileHover={{ scale: 1.1, color: '#0066cc' }} className="text-slate-300 transition-colors p-2">
                         <Linkedin size={20} />
                      </motion.button>
                    </a>
                 </Magnetic>
                 <Magnetic>
                    <a href="https://twitter.com/prixgen" target="_blank" rel="noopener noreferrer">
                      <motion.button whileHover={{ scale: 1.1, color: '#1da1f2' }} className="text-slate-300 transition-colors p-2">
                         <Twitter size={20} />
                      </motion.button>
                    </a>
                 </Magnetic>
              </motion.div>
           </aside>

           <div className="flex-1 max-w-4xl">
              <FadeUp>
                <div className="max-w-none text-left">
                  {post.linkedinUrl ? (
                    <div className="my-12">
                      <LinkedInEmbed url={post.linkedinUrl} />
                    </div>
                  ) : (
                    post.body && <PortableText value={post.body} components={components} />
                  )}
                </div>
              </FadeUp>

              <footer className="mt-32 pt-20 border-t-2 border-slate-50">
                <div className="relative group p-8 lg:p-12 bg-slate-50 rounded-[3rem] overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-prixgen-blue/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
                   
                   <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                      {post.author?.image && (
                        <motion.div style={{ y: authorY }} className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden shrink-0 border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                          <OptimizedImage src={post.author.image} alt={post.author.name} fill className="object-cover" />
                        </motion.div>
                      )}
                      <div className="space-y-6">
                        <div className="space-y-1">
                           <h3 className="text-3xl font-black text-prixgen-blue tracking-tighter">About {post.author?.name}</h3>
                           <p className="text-prixgen-lightblue font-black uppercase tracking-[0.3em] text-[10px]">{post.author?.position || 'Principal Enterprise Architect'}</p>
                        </div>
                        {post.author?.bio ? (
                          <div className="max-w-none">
                            <PortableText value={post.author.bio} components={authorComponents} />
                          </div>
                        ) : (
                          <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            Enterprise digital transformation expert specializing in industrial automation and resilient ecosystems. Helping global leaders architect high-performance operations through data intelligence.
                          </p>
                        )}
                        <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                           <Link href="#" className="text-sm font-black uppercase tracking-widest text-prixgen-blue hover:text-prixgen-lightblue transition-colors">View All Reviews</Link>
                           <Link href="#" className="text-sm font-black uppercase tracking-widest text-prixgen-blue hover:text-prixgen-lightblue transition-colors">LinkedIn Profile</Link>
                        </div>
                      </div>
                   </div>
                </div>
              </footer>
           </div>

            <aside className="hidden xl:block w-80 shrink-0">
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="sticky top-40 space-y-12"
               >
                  <div className="p-10 bg-gradient-to-br from-prixgen-blue to-indigo-900 rounded-[3rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                     <h4 className="text-xl font-black tracking-tight mb-4 leading-tight relative z-10">Architectural Support</h4>
                     <p className="text-white/60 mb-8 font-medium text-xs relative z-10">Schedule an executive review of your industrial workflows.</p>
                     <Magnetic>
                        <Button className="w-full bg-white text-prixgen-blue hover:bg-prixgen-lightblue hover:text-white rounded-2xl py-6 font-black uppercase tracking-widest text-[10px] h-auto shadow-xl relative z-10" asChild>
                           <Link href="/contact">Inquire Now</Link>
                        </Button>
                     </Magnetic>
                  </div>

                 <div className="space-y-6 px-4 text-left">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Trending Analysis</h5>
                    {relatedPosts.length > 0 ? relatedPosts.map((relatedPost, i) => (
                      <Link href={`/blog/${relatedPost.slug}`} key={i}>
                        <motion.div 
                          whileHover={{ x: 10 }}
                          className="group cursor-pointer block mb-8"
                        >
                           <div className="text-slate-300 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-prixgen-lightblue rounded-full" />
                              {relatedPost.categories?.[0]?.title || 'Insight'}
                           </div>
                           <h6 className="text-lg font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors leading-tight">
                              {relatedPost.title}
                           </h6>
                        </motion.div>
                      </Link>
                    )) : [1, 2, 3].map((_, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ x: 10 }}
                        className="group cursor-pointer mb-8"
                      >
                         <div className="text-slate-300 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-prixgen-lightblue rounded-full" />
                            Industrial AI
                         </div>
                         <h6 className="text-lg font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors leading-tight">
                            Synthesizing Operational Data in High-Latency Environments
                         </h6>
                      </motion.div>
                    ))}
                 </div>
              </motion.div>
           </aside>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-white rounded-[3rem] lg:rounded-[4rem] p-8 lg:p-20 overflow-hidden shadow-2xl border border-slate-100 group text-left"
          >
            <div className="absolute bottom-0 right-0 w-full h-full bg-prixgen-blue/5 -z-10 translate-y-1/2 rounded-full blur-[100px]" style={{ willChange: 'transform, opacity' }} />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeUp className="space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-prixgen-blue/5 rounded-full text-prixgen-blue font-bold text-sm uppercase tracking-widest">
                  <span className="w-2 h-2 bg-prixgen-lightblue rounded-full animate-pulse" />
                  Industrial Briefing
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-prixgen-blue leading-[1.1] tracking-tighter">
                  Stay ahead of the <br /> <span className="text-prixgen-lightblue italic">industrial curve.</span>
                </h2>
                <p className="text-xl text-slate-500 max-w-xl font-medium">
                  Get our quarterly executive review of Industry 5.0 shifts and architectural breakthroughs.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="max-w-md ml-auto bg-slate-50 p-8 lg:p-12 rounded-[4rem] shadow-inner border border-white">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Work Email</label>
                        <input 
                          type="email" 
                          placeholder="arvinth@prixgen.com" 
                          className="w-full bg-white border-2 border-slate-100 rounded-3xl px-8 py-6 text-prixgen-blue outline-none focus:border-prixgen-lightblue transition-all font-bold text-lg"
                        />
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-6 bg-prixgen-blue text-white rounded-3xl font-black text-lg shadow-2xl shadow-blue-500/20 hover:bg-prixgen-dark transition-all uppercase tracking-widest"
                      >
                        Subscribe to Insights
                      </motion.button>
                      <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                        Zero spam. Pure industrial intelligence.
                      </p>
                   </div>
                </div>
              </FadeUp>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Styles for Sidebars */}
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </article>
  );
}
