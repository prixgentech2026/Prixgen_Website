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
import { AmbientGlow } from '@/components/animations/ambient-glow';

interface PostClientProps {
  post: BlogPost;
}

const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-black text-prixgen-blue mt-16 mb-8 tracking-tighter leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold text-prixgen-blue mt-14 mb-6 tracking-tight flex items-center gap-4">
        <span className="h-8 w-1 bg-prixgen-lightblue rounded-full" />
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold text-prixgen-blue mt-10 mb-4 tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-xl leading-[1.8] text-slate-600 mb-8 font-medium">
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
        {React.Children.map(children, (child) => (
          <li className="flex items-start gap-4">
            <span className="mt-2.5 h-2 w-2 rounded-full bg-prixgen-lightblue shrink-0" />
            {child}
          </li>
        ))}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-10 space-y-4 text-slate-600 text-xl font-medium ml-4 marker:text-prixgen-blue marker:font-black">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-16 group">
        <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
          <OptimizedImage 
            src={value.asset?._ref || value.url} 
            alt={value.alt || 'Industrial Insight'} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
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

export default function PostClient({ post }: PostClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax for Hero
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) return null;

  return (
    <article className="bg-white selection:bg-prixgen-blue selection:text-white">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-prixgen-lightblue z-[100] origin-left shadow-[0_0_15px_rgba(0,191,255,0.5)]"
        style={{ scaleX }}
      />

      {/* Hero Header */}
      <header className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-prixgen-blue text-white">
        <AmbientGlow />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 opacity-10 grayscale mix-blend-overlay"
        >
          {post.mainImage && (
            <OptimizedImage 
              src={post.mainImage} 
              alt="" 
              fill 
              className="object-cover scale-110 blur-xl"
            />
          )}
        </motion.div>
        
        {/* Living background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-full h-full bg-prixgen-lightblue/10 rounded-full blur-[120px]"
          />
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-prixgen-blue transition-all mb-12 font-black text-[10px] uppercase tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Architectural Feed
          </Link>
          
          <div className="max-w-5xl">
            <FadeUp className="space-y-10">
              <div className="flex flex-wrap items-center gap-6">
                {post.categories?.map((cat: { title: string }) => (
                  <span key={cat.title} className="px-5 py-2 rounded-2xl bg-prixgen-lightblue/20 backdrop-blur-xl border border-prixgen-lightblue/30 text-prixgen-lightblue text-[10px] font-black uppercase tracking-[0.2em]">
                    {cat.title}
                  </span>
                ))}
                <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  <Calendar size={14} className="text-prixgen-lightblue" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Analysis Pending'}
                </div>
                <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  <Clock size={14} className="text-prixgen-lightblue" />
                  8 Min Read
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-12">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-white/10">
                <div className="flex items-center gap-6">
                  {post.author?.image && (
                    <div className="relative w-20 h-20 rounded-[2rem] overflow-hidden border-2 border-prixgen-lightblue shadow-2xl rotate-6">
                      <OptimizedImage src={post.author.image} alt={post.author.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <div className="text-2xl font-black tracking-tight">{post.author?.name}</div>
                    <div className="text-prixgen-lightblue text-[10px] font-black uppercase tracking-widest">Principal Architect</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <motion.button 
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-prixgen-blue transition-colors"
                   >
                     <Linkedin size={20} />
                   </motion.button>
                   <motion.button 
                     onClick={handleCopy}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-prixgen-blue transition-colors"
                   >
                     {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                   </motion.button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </header>

      {/* Main Feature Image */}
      <div className="container mx-auto px-4 -mt-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="relative aspect-[21/9] max-w-7xl mx-auto rounded-[4rem] overflow-hidden shadow-[0_100px_150px_-50px_rgba(0,102,204,0.4)] border-[12px] border-white"
        >
          <OptimizedImage 
            src={post.mainImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"} 
            alt={post.title} 
            fill 
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-32 relative">
        <div className="flex flex-col lg:flex-row gap-20">
           {/* Sidebar - Left (Desktop Only) */}
           <aside className="hidden lg:block w-24 shrink-0 relative">
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ margin: "-100px" }}
                className="sticky top-40 space-y-8 flex flex-col items-center"
              >
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 vertical-text rotate-180 mb-4">Share Analysis</span>
                    <div className="w-px h-12 bg-slate-100" />
                 </div>
                 <motion.button whileHover={{ y: -5, scale: 1.1 }} className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-prixgen-blue hover:bg-white hover:shadow-xl transition-all">
                    <Linkedin size={18} />
                 </motion.button>
                 <motion.button whileHover={{ y: -5, scale: 1.1 }} className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-prixgen-blue hover:bg-white hover:shadow-xl transition-all">
                    <Twitter size={18} />
                 </motion.button>
                 <motion.button whileHover={{ y: -5, scale: 1.1 }} className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-prixgen-blue hover:bg-white hover:shadow-xl transition-all">
                    <Bookmark size={18} />
                 </motion.button>
              </motion.div>
           </aside>

           {/* Main Content */}
           <div className="flex-1 max-w-4xl">
              <FadeUp>
                <div className="prose prose-2xl prose-slate max-w-none text-left">
                  {post.body && <PortableText value={post.body} components={components} />}
                </div>
              </FadeUp>

              {/* Author Bio Section */}
              <footer className="mt-32 pt-20 border-t-2 border-slate-50">
                <div className="relative group p-12 bg-slate-50 rounded-[4rem] overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-prixgen-blue/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
                   
                   <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                      {post.author?.image && (
                        <div className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden shrink-0 border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                          <OptimizedImage src={post.author.image} alt={post.author.name} fill className="object-cover" />
                        </div>
                      )}
                      <div className="space-y-6">
                        <div className="space-y-1">
                           <h3 className="text-3xl font-black text-prixgen-blue tracking-tighter">About {post.author?.name}</h3>
                           <p className="text-prixgen-lightblue font-black uppercase tracking-[0.3em] text-[10px]">Principal Enterprise Architect</p>
                        </div>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                          Enterprise digital transformation expert specializing in industrial automation and resilient ecosystems. Helping global leaders architect high-performance operations through data intelligence.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                           <Link href="#" className="text-sm font-black uppercase tracking-widest text-prixgen-blue hover:text-prixgen-lightblue transition-colors">View All Reviews</Link>
                           <Link href="#" className="text-sm font-black uppercase tracking-widest text-prixgen-blue hover:text-prixgen-lightblue transition-colors">LinkedIn Profile</Link>
                        </div>
                      </div>
                   </div>
                </div>
              </footer>
           </div>

           {/* Sidebar - Right (Desktop Only) */}
           <aside className="hidden xl:block w-80 shrink-0">
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ margin: "-100px" }}
                className="sticky top-40 space-y-12"
              >
                 <div className="p-10 bg-prixgen-blue rounded-[3rem] text-white shadow-2xl shadow-blue-900/20">
                    <h4 className="text-2xl font-black tracking-tighter mb-6 leading-tight">Need a customized architecture?</h4>
                    <p className="text-white/60 mb-10 font-medium">Schedule an executive review of your industrial workflows.</p>
                    <Button className="w-full bg-white text-prixgen-blue hover:bg-prixgen-lightblue hover:text-white rounded-2xl py-6 font-black uppercase tracking-widest text-xs h-auto shadow-xl" asChild>
                       <Link href="/contact">Inquire Now</Link>
                    </Button>
                 </div>

                 <div className="space-y-6 px-4 text-left">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Trending Analysis</h5>
                    {[1, 2, 3].map((_, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ x: 10 }}
                        className="group cursor-pointer"
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
      <section className="py-24 lg:py-40 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-white rounded-[4rem] lg:rounded-[6rem] p-12 lg:p-32 overflow-hidden shadow-2xl border border-slate-100 group text-left"
          >
            <div className="absolute bottom-0 right-0 w-full h-full bg-prixgen-blue/5 -z-10 translate-y-1/2 rounded-full blur-[120px]" />
            
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
                  Get our quarterly executive review of Industry 4.0 shifts and architectural breakthroughs.
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
