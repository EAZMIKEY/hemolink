"use client"

import React, { useState } from 'react';
import { Sparkles, X, User, MapPin, Gauge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function DonorMatchPanel({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  const mockDonors = [
    { name: "Rahul Sharma", type: "A+", score: 98, dist: "1.2km", reliability: "99%", eta: "12m" },
    { name: "Sneha Patil", type: "O-", score: 92, dist: "3.4km", reliability: "98%", eta: "18m" },
    { name: "Amit Varma", type: "B+", score: 85, dist: "5.1km", reliability: "95%", eta: "25m" },
  ];

  return (
    <div className="absolute right-8 bottom-40 w-[400px] bg-slate-950 border border-primary/20 rounded-[2rem] shadow-[0_0_80px_rgba(239,68,68,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <h2 className="text-sm font-black text-white uppercase tracking-widest">AI Donor Matching</h2>
           </div>
           <p className="text-[10px] text-slate-500 font-bold uppercase">Optimal candidates ranked by engine.</p>
        </div>
        <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/5" onClick={onClose}>
           <X className="w-5 h-5 text-slate-400" />
        </Button>
      </div>

      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {mockDonors.map((donor, i) => (
          <div key={i} className="relative group p-4 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-primary/30 transition-all overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12">
                <Sparkles className="w-16 h-16 text-primary" />
             </div>
             
             <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-sm">
                      {donor.type}
                   </div>
                   <div>
                      <h4 className="text-xs font-black text-white italic">{donor.name}</h4>
                      <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase">
                         <MapPin className="w-3 h-3" /> {donor.dist} away
                      </div>
                   </div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-primary text-xl font-black italic tracking-tighter leading-none">{donor.score}</span>
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">MATCH SCORE</span>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/5">
                <div className="flex flex-col items-center">
                   <span className="text-[8px] font-black text-slate-500 uppercase">Reliability</span>
                   <span className="text-[11px] font-black text-green-400 italic">{donor.reliability}</span>
                </div>
                <div className="flex flex-col items-center border-x border-white/5">
                   <span className="text-[8px] font-black text-slate-500 uppercase">Travel</span>
                   <span className="text-[11px] font-black text-blue-400 italic">{donor.eta}</span>
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-[8px] font-black text-slate-500 uppercase">Priority</span>
                   <span className="text-[11px] font-black text-orange-400 italic">Level A</span>
                </div>
             </div>

             <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-[.2em] rounded-xl h-9">
                Initiate AI Request
             </Button>
          </div>
        ))}
      </div>

      <div className="p-5 bg-primary/5 border-t border-primary/10 flex justify-between items-center italic">
         <span className="text-[9px] font-black text-primary uppercase tracking-widest">Automated Dispatch Ready</span>
         <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-75" />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-150" />
         </div>
      </div>
    </div>
  );
}
