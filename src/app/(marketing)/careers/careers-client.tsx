'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Upload, 
  User, 
  Mail, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Zap,
  Globe,
  Users,
  Trophy
} from 'lucide-react';
import { HeroBadge } from '@/components/shared/hero-badge';
import { CareersPageData } from '@/lib/data';
import { submitJobApplication } from '@/actions/careers';

export default function CareersClient({ data }: { data: CareersPageData }) {
  const { title, subtitle, badge, openings = [] } = data;
  
  // Reverse openings to show latest first
  const reversedOpenings = Array.isArray(openings) ? [...openings].reverse() : [];
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedJob, setSelectedJob] = useState<string>('General Application');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size too large. Maximum 10MB allowed.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    if (selectedFile) {
      formData.set('resume', selectedFile);
    }
    formData.set('appliedFor', selectedJob);

    try {
      const result = await submitJobApplication(formData);
      setIsSubmitting(false);
      if (result.success) {
        setSubmitStatus('success');
        formRef.current?.reset();
        setSelectedFile(null);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Something went wrong');
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  const benefits = [
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: "Accelerated Growth", 
      desc: "Mentorship from industrial veterans with 30+ years of experience in ERP and Automation." 
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      title: "Global Exposure", 
      desc: "Architect large-scale implementations across APAC, EMEA, and Australia for industrial giants." 
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      title: "Elite Engineering", 
      desc: "Join a zero-friction team dedicated to solving high-stakes industrial challenges." 
    },
    { 
      icon: <Trophy className="w-6 h-6" />, 
      title: "Innovation First", 
      desc: "Hands-on experience with GenAI, IIoT, and high-velocity ERP systems at scale." 
    }
  ];

  return (
    <div className="bg-white selection:bg-prixgen-blue selection:text-white pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-24 overflow-hidden">
        <AmbientGlow />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-prixgen-blue/[0.03] to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <FadeUp className="space-y-10">
              <HeroBadge text={badge || "Career Opportunities"} align="left" />
              
              <StaggerText 
                text={title} 
                variant="gradient"
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter"
              />
              
              <div className="max-w-3xl">
                <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                  {subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-8">
                <Button 
                  size="lg" 
                  className="rounded-2xl h-16 px-12 text-lg font-bold shadow-xl shadow-prixgen-blue/20 bg-prixgen-blue text-white hover:bg-prixgen-blue/90"
                  onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Openings
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl h-16 px-12 text-lg font-bold border-slate-200 hover:border-prixgen-blue hover:bg-prixgen-blue hover:text-white transition-all duration-300"
                  onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Direct Apply
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="container mx-auto px-4 py-12 relative">

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <FadeUp key={i} delay={i * 0.1} className="group p-10 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-prixgen-blue group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 mb-8">
                {benefit.icon}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{benefit.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 border-t border-slate-100" id="openings">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Left Column: Open Positions */}
          <div className="lg:col-span-7 space-y-16">
            <FadeUp>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-prixgen-blue" />
                  <span className="text-xs font-black uppercase tracking-widest text-prixgen-blue">Live Roles</span>
                </div>
                <h2 className="text-5xl font-black text-prixgen-dark tracking-tighter">Current Openings</h2>
                <p className="text-xl text-slate-500 font-medium">Join an elite squad of industrial digital architects.</p>
              </div>
            </FadeUp>
            
            <div className="space-y-8">
              {reversedOpenings.length > 0 ? (
                reversedOpenings.map((job, i) => (
                  <FadeUp key={i} delay={i * 0.05}>
                    <div className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-prixgen-blue/5 hover:border-prixgen-blue/20 transition-all duration-700 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/[0.02] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                        <div className="space-y-6">
                          <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 text-[10px] font-black uppercase tracking-widest text-prixgen-blue border border-prixgen-blue/10">
                              {job.team}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">
                              {job.type}
                            </span>
                          </div>
                          <h3 className="text-3xl font-black text-prixgen-dark group-hover:text-prixgen-blue transition-colors tracking-tighter">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                            <MapPin className="w-4 h-4 text-prixgen-blue/40" /> {job.location}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="rounded-2xl px-8 h-16 font-bold border-slate-200 bg-white shadow-sm hover:bg-prixgen-blue hover:text-white hover:border-prixgen-blue group-hover:shadow-lg transition-all duration-300"
                          onClick={() => {
                            setSelectedJob(job.title);
                            document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Apply Now <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </FadeUp>
                ))
              ) : (
                <div className="p-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold uppercase tracking-widest">No active openings at this moment.</p>
                  <p className="text-slate-400 text-sm mt-2">Check back soon or send a general application.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-5" id="apply-form">
            <FadeUp delay={0.2} className="sticky top-24">
              <div className="bg-[#020617] p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-prixgen-blue/20 relative overflow-hidden text-white border border-white/5">
                <div className="absolute top-0 right-0 w-80 h-80 bg-prixgen-blue/20 rounded-full blur-[100px] -mr-40 -mt-40 opacity-50" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-12">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-prixgen-blue flex items-center justify-center text-white shadow-2xl shadow-prixgen-blue/50">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter">Direct Entry</h3>
                      <p className="text-white/40 font-bold text-xs uppercase tracking-widest">Architect your future</p>
                    </div>
                  </div>
                  
                  <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
                    {/* Position Display */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Target Role</span>
                      <span className="text-sm font-black text-prixgen-lightblue">{selectedJob}</span>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Identify Yourself</label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input 
                          name="fullName"
                          type="text" 
                          required
                          className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-3xl border border-white/5 focus:border-prixgen-blue focus:bg-white/10 transition-all outline-none font-bold text-white placeholder:text-white/20" 
                          placeholder="Full Name" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Communication</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input 
                          name="email"
                          type="email" 
                          required
                          className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-3xl border border-white/5 focus:border-prixgen-blue focus:bg-white/10 transition-all outline-none font-bold text-white placeholder:text-white/20" 
                          placeholder="professional@email.com" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Credentials (PDF)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`group relative cursor-pointer border-2 border-dashed rounded-3xl p-10 transition-all flex flex-col items-center justify-center text-center
                          ${selectedFile 
                            ? 'border-prixgen-blue bg-prixgen-blue/10' 
                            : 'border-white/10 bg-white/[0.02] hover:border-prixgen-blue/50 hover:bg-white/5'
                          }`}
                      >
                        {selectedFile ? (
                          <>
                            <div className="w-14 h-14 rounded-2xl bg-prixgen-blue flex items-center justify-center text-white mb-4 shadow-lg">
                              <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-black text-white truncate max-w-full px-4">
                              {selectedFile.name}
                            </span>
                            <span className="text-[10px] font-black text-prixgen-lightblue mt-2 uppercase tracking-widest">
                              Verification Ready
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mb-4 text-white/20 group-hover:text-prixgen-blue transition-colors" />
                            <span className="text-sm font-black text-white/60 group-hover:text-white transition-colors">
                              Drop Resume or Browse
                            </span>
                            <span className="text-[10px] font-black text-white/20 mt-2 uppercase tracking-widest">
                              PDF format only
                            </span>
                          </>
                        )}
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          className="hidden" 
                          accept=".pdf"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting || !selectedFile}
                      className="w-full h-20 text-lg rounded-3xl bg-prixgen-blue text-white hover:bg-prixgen-blue/90 shadow-2xl shadow-prixgen-blue/40 font-black tracking-[0.2em] uppercase transition-all border-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-6 w-6 animate-spin" /> 
                          <span>Processing...</span>
                        </div>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>

                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-6 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center gap-4 text-green-400"
                        >
                          <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                          <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Transmission Successful. Our architects will contact you shortly.</p>
                        </motion.div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center gap-4 text-red-400"
                        >
                          <AlertCircle className="w-6 h-6 flex-shrink-0" />
                          <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{errorMessage}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}


