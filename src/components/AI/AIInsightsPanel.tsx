"use client"

import React from 'react';
import { Brain, ShieldAlert, Route, Activity, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  active: boolean;
  onClose: () => void;
  onSwitch: (panel: 'insights' | 'donor' | 'heatmap') => void;
}

export function AIInsightsPanel({ active, onSwitch }: Props) {
  if (!active) return null;

  const insights = [
    { title: "Security Alert", desc: "Abnormal Aadhaar usage detected in Hub-7", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Route Optimized", desc: "New ETA for Van-X2: 38m (-12m)", icon: Route, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Growth Trend", desc: "O- Demand up 14% in Central District", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <div className="absolute right-8 bottom-40 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
      <div className="p-6 border-b border-white/10 bg-gradient-to-br from-primary/20 to-transparent">
        <div className="flex items-center gap-3 mb-1">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">National AI Insights</h2>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
          Real-time systemic intelligence active.
        </p>
      </div>

      <div className="p-4 space-y-3">
        {insights.map((item, i) => (
          <div key={i} className="group cursor-help p-3 rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
            <div className="flex items-start gap-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.bg)}>
                <item.icon className={cn("w-5 h-5", item.color)} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-black text-white uppercase tracking-wider">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold leading-tight line-clamp-2">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 grid grid-cols-2 gap-2">
           <Button 
            onClick={() => onSwitch('donor')}
            className="bg-primary/10 hover:bg-primary/20 text-primary text-[9px] font-black uppercase tracking-tighter h-10 border border-primary/20"
           >
             <Sparkles className="w-3 h-3 mr-2" /> Match Donors
           </Button>
           <Button 
            onClick={() => onSwitch('heatmap')}
            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-tighter h-10 border border-blue-500/20"
           >
             <Activity className="w-3 h-3 mr-2" /> Heatmap
           </Button>
        </div>
      </div>

      <div className="p-3 bg-white/5 border-t border-white/5 flex justify-center">
         <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
           Engine: HemoLink-v5-National-Flash
         </span>
      </div>
    </div>
  );
}
