'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';

/**
 * Premium Page Loader component for Prixgen.
 * Can be used as a global overlay during transitions.
 */
export function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Show loader on mount and pathname changes
    setIsLoading(true);
    
    // Duration: 2s for first load, 1.2s for subsequent transitions
    const duration = isFirstLoad ? 2000 : 1200;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [pathname, isFirstLoad]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Architectural Grid (Subtle) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#0047ab 1px, transparent 1px), linear-gradient(90deg, #0047ab 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Logo className="w-72 lg:w-96" />
            </motion.div>

            {/* Animated Progress Bar */}
            <div className="mt-16 w-64 h-[2px] bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-prixgen-blue"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: isFirstLoad ? 1.8 : 1.0, ease: "easeInOut" }}
              />
            </div>

            {/* Animated Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-prixgen-lightblue animate-ping" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Architecting Intelligence
              </p>
            </motion.div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-prixgen-blue/5 rounded-full blur-[100px] -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-prixgen-lightblue/5 rounded-full blur-[100px] -mr-32 -mb-32" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
