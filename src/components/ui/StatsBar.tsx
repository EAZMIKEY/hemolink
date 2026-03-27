"use client"

import React, { useState, useEffect } from 'react';
import { Droplet, Activity, AlertCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function StatsBar() {
  const t = useTranslations('common');
  const [stats, setStats] = useState({
    donors: 2314,
    requests: 87,
    broadcasts: 12
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        donors: prev.donors + (Math.random() > 0.7 ? 1 : 0),
        requests: prev.requests + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "donorsOnline", value: stats.donors.toLocaleString(), icon: Droplet, color: "text-red-500", dot: true },
    { label: "activeRequests", value: stats.requests, icon: Activity, color: "text-blue-400" },
    { label: "emergencyBroadcasts", value: stats.broadcasts, icon: AlertCircle, color: "text-[#FF2D2D]" }
  ];


  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6">
      {/* 2.0 Horizontal Glass Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        viewport={{ once: true }}
        className="relative group w-full"
      >
        {/* Glow behind the bar */}
        <div className="absolute inset-x-0 bottom-[-20px] h-12 bg-[#FF2D2D]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-5 md:px-12 md:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-center gap-6 md:gap-14">
          {items.map((item, idx) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={cn("flex items-center justify-center", item.color)}>
                {item.dot && (
                  <span className="relative flex h-2.5 w-2.5 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                )}
                <item.icon className="w-5 h-5 md:w-6 md:h-6 drop-shadow-[0_0_8px_currentColor]" />
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                <span className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{t(item.label)}</span>

                <span className="text-white text-xl md:text-2xl font-black tracking-tighter">{item.value}</span>
              </div>
              {idx < items.length - 1 && (
                <div className="hidden lg:block w-px h-10 bg-white/10 ml-8" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trust Badges - matched to reference */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-40">
        {[
          "isoReady",
          "verifiedNetwork",
          "safeEngine"
        ].map((badge) => (
          <div key={badge} className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300">{t(badge)}</span>
          </div>
        ))}

      </div>
    </div>
  );
}
