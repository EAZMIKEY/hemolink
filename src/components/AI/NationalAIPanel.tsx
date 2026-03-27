"use client"

import React, { useEffect, useRef } from 'react';
import { Sparkles, X, Brain, ShieldAlert, Route, Activity, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NationalAIPanel({ isOpen, onClose }: Props) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Invisible backdrop for reliable outside-click handling */}
      <div 
        className={cn(
          "fixed inset-0 z-[2500] pointer-events-auto transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose} 
      />

      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-[90%] md:w-[380px] bg-slate-900/90 backdrop-blur-md border-l border-white/5 z-[2501] shadow-2xl transition-all duration-300 transform ease-in-out pointer-events-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-br from-primary/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] italic leading-none">National AI</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Unified Operations Hub</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="rounded-full hover:bg-red-500/20 text-slate-400 hover:text-red-500 transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8 h-[calc(100%-80px)] overflow-y-auto custom-scrollbar">
        
        {/* Confidence Section */}
        <div className="space-y-4">
           <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Engine Confidence Center</span>
              <span className="text-primary italic">94.8% Active</span>
           </div>
           <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-red-600 to-primary w-[94.8%] animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
           </div>
        </div>

        {/* Heatmap Section */}
        <div className="space-y-4 animate-in fade-in slide-in-from-right-10 duration-500 delay-100">
           <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest">AI Availability Heatmap</h3>
           </div>
           <div className="grid gap-3">
              <div className="p-4 bg-slate-800/50 border border-white/5 rounded-2xl group hover:border-red-500/30 transition-all hover:scale-[1.02] cursor-default">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Critical Shortage</span>
                    <ShieldAlert className="w-3 h-3 text-red-500 animate-pulse" />
                 </div>
                 <p className="text-[10px] font-bold text-slate-300">Sector-7 (West Hub): Inventory level {'<'} 8% (PRBC+)</p>
              </div>

              <div className="p-4 bg-slate-800/50 border border-white/5 rounded-2xl group hover:border-orange-500/30 transition-all hover:scale-[1.02] cursor-default">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Declining Trend</span>
                    <TrendingDown className="w-3 h-3 text-orange-500" />
                 </div>
                 <p className="text-[10px] font-bold text-slate-300">Sector-2 (North): Usage spikes detected (+14% relative)</p>
              </div>

              <div className="p-4 bg-slate-800/50 border border-white/5 rounded-2xl group hover:border-green-500/30 transition-all hover:scale-[1.02] cursor-default">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Stable Areas</span>
                    <ShieldAlert className="w-3 h-3 text-green-500" />
                 </div>
                 <p className="text-[10px] font-bold text-slate-300">Hub-Alpha / Beta Zones: Optimal levels maintained.</p>
              </div>
           </div>
        </div>

        {/* Real-time Alerts */}
        <div className="space-y-4 animate-in fade-in slide-in-from-right-10 duration-500 delay-200">
           <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Security & Fraud Guard</h3>
           </div>
           <div className="space-y-2">
              <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl flex items-center gap-4 group hover:bg-red-500/10 transition-colors">
                 <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-red-500" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-400">Anomalous login pattern detected in National Admin Hub.</span>
              </div>
              <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center gap-4 group hover:bg-blue-500/10 transition-colors">
                 <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Route className="w-4 h-4 text-blue-500" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-400">Route 42-A optimized via AI routing engine (New ETA: 12m).</span>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
           <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-2xl shadow-lg transition-transform hover:scale-[1.03]">
              Switch to Live Radar
           </Button>
           <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-slate-400 font-black uppercase text-[10px] tracking-widest h-12 rounded-2xl">
              System Health Report
           </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 text-center">
         <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] leading-relaxed">
           HemoLink National Guard • AI Engine v5.2
         </span>
      </div>
    </div>
    </>
  );
}
