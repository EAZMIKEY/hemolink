"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Droplet, Search, ShieldCheck, Users, Activity, Heart,
  Globe, Zap, Sparkles, Hospital, Building2,
  UserPlus, AlertCircle, Handshake, ChevronDown, MapPin
} from 'lucide-react';
import Image from 'next/image';
import { HeroSection } from '@/components/HeroSection';
import { ChatbotPopup } from '@/components/ChatbotPopup';
import { StatsBar } from '@/components/ui/StatsBar';
import { SmartHelpBubble } from '@/components/ui/SmartHelpBubble';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Home() {
  const t = useTranslations('common');
  const th = useTranslations('homepage');

  const ROLE_CARDS = [
    { title: t('donateBlood'),  desc: t('donateDesc'),     icon: Droplet,    color: 'text-red-500',   bg: 'bg-red-500/10',   border: 'border-red-500/20',   hover: 'hover:border-red-500/50 hover:shadow-red-500/20',   link: '/register' },
    { title: t('needBlood'),    desc: t('needDesc'),        icon: Search,     color: 'text-primary',   bg: 'bg-primary/10',   border: 'border-primary/20',   hover: 'hover:border-primary/50 hover:shadow-primary/20',   link: '/search'   },
    { title: t('hospital'),     desc: t('hospitalDesc'),    icon: Hospital,   color: 'text-blue-500',  bg: 'bg-blue-500/10',  border: 'border-blue-500/20',  hover: 'hover:border-blue-500/50 hover:shadow-blue-500/20',  link: '/register' },
    { title: t('bloodBank'),    desc: t('bloodBankDesc'),   icon: Building2,  color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', hover: 'hover:border-green-500/50 hover:shadow-green-500/20', link: '/register' },
  ];

  return (
    <div className="flex flex-col gap-0 selection:bg-primary/20 transition-colors duration-300 relative min-h-screen overflow-hidden">
      
      {/* Hero Section (100vh Layered Experience) */}
      <HeroSection />

      {/* 4. Live Global Stats Bar (Floating overlap) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 -mt-24 relative z-20 mb-20"
      >
        <StatsBar />
      </motion.div>

      {/* 5. Quick Action Dashboard Panel */}
      <div className="container mx-auto px-4 mb-16 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: t("findDonorHeader"), desc: t("findDonorDesc"), href: "/search", icon: Search, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
              { name: t("banksHeader"), desc: t("banksDesc"), href: "/banks", icon: MapPin, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
              { name: t("emergencyHeader"), desc: t("emergencyDesc"), href: "/emergency", icon: AlertCircle, color: "text-[#FF2D2D]", bg: "bg-[#FF2D2D]/10", border: "border-[#FF2D2D]/20", isSOS: true },
              { name: t("dashboardHeader"), desc: t("dashboardDesc"), href: "/dashboard", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" }
            ].map((card, idx) => (

              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={card.href} className="block h-full block">
                  <div className={cn(
                    "group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 h-full flex flex-col",
                    card.isSOS 
                      ? "bg-[#FF2D2D]/5 hover:bg-[#FF2D2D]/10 border-2 border-[#FF2D2D]/30 shadow-[0_0_30px_rgba(255,45,45,0.15)] hover:shadow-[0_0_40px_rgba(255,45,45,0.3)] hover:-translate-y-2" 
                      : "bg-[#111111]/90 backdrop-blur-xl hover:bg-white/5 border border-white/10 hover:border-white/20 shadow-xl hover:-translate-y-2"
                  )}>
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg", card.bg)}>
                      <card.icon className={cn("w-7 h-7 drop-shadow-md", card.color)} />
                    </div>
                    <div className="mt-auto">
                      <h3 className={cn("text-xl font-black tracking-tight mb-2", card.isSOS ? "text-[#FF2D2D]" : "text-white")}>{card.name}</h3>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
         </div>
      </div>

      {/* 6. High-Impact Search & Location Section */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         viewport={{ once: true }}
         className="container mx-auto px-4 mb-24 relative z-20"
      >
         <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2D2D]/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
               <div className="w-full md:w-2/5">
                 <h2 className="text-3xl font-black text-white tracking-tighter mb-2">{t('findBloodTitle')}</h2>
                 <p className="text-slate-400 font-medium">{t('findBloodSub')}</p>
               </div>

               
               <div className="w-full md:w-3/5 flex flex-col xl:flex-row gap-4">
                  <div className="relative flex-1 group min-w-[140px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#FF2D2D] transition-colors" />
                    <input 
                      type="text" 
                      placeholder={t('bloodGroupPlaceholder')} 
                      className="w-full h-16 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/10 focus:border-[#FF2D2D] focus:ring-1 focus:ring-[#FF2D2D] outline-none text-white font-bold placeholder:font-normal placeholder:text-slate-500 transition-all font-mono uppercase"
                    />

                  </div>
                  <div className="relative flex-1 group min-w-[200px]">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#FF2D2D] transition-colors" />
                    <input 
                      type="text" 
                      placeholder={t('locationPlaceholder')} 
                      className="w-full h-16 pl-12 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-[#FF2D2D] focus:ring-1 focus:ring-[#FF2D2D] outline-none text-white font-bold placeholder:font-normal placeholder:text-slate-500 transition-all text-ellipsis"
                    />

                    <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#FF2D2D] hover:text-white transition-all text-slate-400" title={t('locationPlaceholder')}>
                      <Activity className="w-5 h-5" />
                    </button>

                  </div>
                  <Button className="h-16 px-8 rounded-2xl bg-[#FF2D2D] hover:bg-red-700 text-white font-black text-lg shadow-[0_0_20px_rgba(255,45,45,0.3)] transition-all hover:scale-[1.02] whitespace-nowrap">
                    {t('findNow')}
                  </Button>

               </div>
            </div>
         </div>
      </motion.div>

      {/* 7. How HemoLink Works (Replaces Join the Network) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <section className="py-24 bg-transparent relative z-10 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">{th('howItWorks')}</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">{th('howItWorksTitle')}</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto mb-20">{th('howSub')}</p>

            {/* Steps Container */}
            <div className="relative max-w-5xl mx-auto mb-20">
              {/* Connecting Lines (Desktop) */}
              <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
                {[
                  { title: th('step1Title'), desc: th('step1Desc'), icon: UserPlus, color: "bg-red-500", shadow: "shadow-red-500/20", step: "1" },
                  { title: th('step2Title'), desc: th('step2Desc'), icon: AlertCircle, color: "bg-blue-500", shadow: "shadow-blue-500/20", step: "2" },
                  { title: th('step3Title'), desc: th('step3Desc'), icon: Handshake, color: "bg-green-500", shadow: "shadow-green-500/20", step: "3" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative mb-8 group">
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#111111] border border-white/20 flex items-center justify-center text-white text-xs font-black z-20 group-hover:bg-white group-hover:text-black transition-colors">
                        {step.step}
                      </div>

                      {/* Icon Circle */}
                      <div className={cn(
                        "w-32 h-32 rounded-[2.5rem] flex items-center justify-center relative transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105",
                        step.color,
                        step.shadow,
                        "shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
                      )}>
                        <step.icon className="w-12 h-12 text-white drop-shadow-lg" />
                        
                        {/* Inner Ring */}
                        <div className="absolute inset-2 rounded-[2rem] border border-white/20 pointer-events-none" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-[#FF2D2D] hover:bg-red-600 text-white font-black text-lg gap-3 shadow-[0_20px_50px_-10px_rgba(255,45,45,0.4)] transition-all" asChild>
                <Link href="/register">
                  {th('getStartedNow')}
                  <Heart className="w-5 h-5 fill-white" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </motion.div>




      {/* Footer / Floating help replaced with SmartHelpBubble */}
      <SmartHelpBubble />
    </div>
  );
}
