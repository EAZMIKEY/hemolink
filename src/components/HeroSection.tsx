"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight, Heart, Droplet, Zap } from 'lucide-react';
import { SOSModal } from './SOSModal';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroSection() {
  const t = useTranslations('common');
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  
  // SOS Hold Logic (Refined 2.0s)
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    setIsHolding(true);
    let startTimestamp = Date.now();
    const duration = 2000; // 2.0 seconds
    
    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const progress = (elapsed / duration) * 100;
      setHoldProgress(Math.min(progress, 100));
      
      if (progress >= 100) {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        setIsSOSOpen(true);
        setHoldProgress(0);
        setIsHolding(false);
      }
    }, 20); // High frequency updates for smoothness
  };

  const endHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldProgress(0);
    setIsHolding(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-20 pb-16 px-4">
      
      <div className="container relative z-10 mx-auto text-center space-y-6 md:space-y-8">
        {/* Animated Clickable Badge */}
        <Link href="/emergency">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group inline-flex items-center gap-2.5 bg-[#FF2D2D]/10 px-8 py-3 rounded-full border border-[#FF2D2D]/40 backdrop-blur-xl cursor-pointer hover:bg-[#FF2D2D]/20 transition-all relative overflow-hidden shadow-[0_0_30px_rgba(255,45,45,0.25)]"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF2D2D] animate-pulse ring-4 ring-red-500/30"></span>
            <span className="text-[#FF2D2D] font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">{t('emergencyNetwork')}</span>

          </motion.div>
        </Link>

        {/* Headlines: Tight, Bold 2.0 Composition */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl lg:text-[7rem] font-black leading-[0.95] tracking-tight text-white mb-2"

          >
            <span className="block">{t('connecting')}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF2D2D] via-red-500 to-red-800 block pb-2">
              {t('savingLives')}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300/70 font-medium max-w-2xl mx-auto leading-relaxed italic"
          >
            {t('tagline')}
          </motion.p>

        </div>

        {/* SOS Button Section (200px+ Circular) */}
        <div className="flex flex-col items-center justify-center gap-6 pt-2">
          <div className="relative group p-4">
            {/* Multiple Dramatic Pulse Rings */}
            <div className="absolute inset-[-80px] rounded-full bg-[#FF2D2D]/5 animate-pulse-slow pointer-events-none blur-3xl"></div>
            <div className="absolute inset-[-40px] rounded-full border border-[#FF2D2D]/10 animate-pulse pointer-events-none"></div>
            
            <AnimatePresence>
              {isHolding && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.3 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 rounded-full bg-[#FF2D2D]/30 blur-2xl pointer-events-none"
                />
              )}
            </AnimatePresence>
            
            {/* Progress Ring SVG (matched to 200px+ button) */}
            <svg className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90 pointer-events-none z-20">
               <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255, 45, 45, 0.1)" strokeWidth="4" />
               <motion.circle 
                 cx="50%" cy="50%" r="48%" fill="none" stroke="#FF2D2D" strokeWidth="6" 
                 strokeDasharray="300" 
                 strokeDashoffset={300 - (300 * holdProgress) / 100} 
                 className="transition-all duration-75 ease-linear" 
                 strokeLinecap="round"
                 filter="drop-shadow(0 0 12px #FF2D2D)"
               />
            </svg>

            {/* Main SOS Button: 200px class (w-52 h-52 is ~208px) */}
            <button 
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className={cn(
                "relative w-48 h-48 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-500 outline-none select-none z-10",
                isHolding 
                  ? "bg-gradient-to-br from-red-800 to-red-600 scale-[0.97] shadow-[0_0_120px_rgba(255,45,45,0.9)] border-red-500/50" 
                  : "bg-gradient-to-br from-[#FF2D2D] via-[#FF2D2D] to-red-900 border-8 border-black shadow-[0_0_80px_rgba(255,45,45,0.4)] hover:shadow-[0_0_100px_rgba(255,45,45,0.6)] hover:scale-105 active:scale-95"
              )}
            >
              <Droplet className="h-14 w-14 md:h-16 md:w-16 text-white fill-white/90 drop-shadow-2xl" />
              <span className="font-black text-4xl md:text-5xl tracking-tighter text-white drop-shadow-2xl">{t('sos')}</span>

              
              {/* Internal glow ring */}
              <div className="absolute inset-2 rounded-full border border-white/20 pointer-events-none" />
            </button>
          </div>
          
          {/* Action Prompts: COMPACT */}
          <div className="space-y-2">
             <p className={cn(
               "text-[10px] md:text-xs font-black uppercase tracking-[0.5em] transition-colors duration-300",
               isHolding ? "text-[#FF2D2D] animate-pulse" : "text-red-500/80"
             )}>
                {isHolding ? t('initiating') : t('holdEmergency')}
             </p>

             
             {/* Smart Hint Badge */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="flex items-center justify-center gap-2 text-slate-400 text-[10px] md:text-xs font-bold"
             >
               <span>{t('delhiHint')}</span>
             </motion.div>
          </div>
        </div>
      </div>

      {/* SOS Modal Component */}
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </section>
  );
}
