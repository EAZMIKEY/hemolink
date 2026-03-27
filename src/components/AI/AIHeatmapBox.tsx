"use client"

import React from 'react';
import { Activity, ShieldAlert, TrendingDown, Map as MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIHeatmapBox({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed top-24 right-8 w-64 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-right-10 duration-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg">
           <MapIcon className="w-4 h-4 text-blue-400" />
        </div>
        <div>
           <h3 className="text-xs font-black text-white uppercase tracking-widest italic">AI Heatmap</h3>
           <p className="text-[8px] font-black text-slate-500 uppercase">3-Day Prediction Active</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
           <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-black text-red-500 uppercase underline">Critical Shortage</span>
              <ShieldAlert className="w-3 h-3 text-red-500" />
           </div>
           <p className="text-[10px] text-red-100 font-bold leading-none">Sector-7 (West): Stock {'<'} 8%</p>
        </div>

        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
           <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-black text-orange-500 uppercase">Declining Trend</span>
              <TrendingDown className="w-3 h-3 text-orange-500" />
           </div>
           <p className="text-[10px] text-orange-100 font-bold leading-none">Sector-2 (North): -14% / Day</p>
        </div>

        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
           <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-black text-green-500 uppercase">Stable Area</span>
              <Activity className="w-3 h-3 text-green-500" />
           </div>
           <p className="text-[10px] text-green-100 font-bold leading-none">Hub-Alpha: Optimal Levels</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5">
         <div className="flex justify-between items-center text-[8px] font-black text-slate-500 uppercase">
            <span>Confidence Index</span>
            <span className="text-white">94.2%</span>
         </div>
         <div className="mt-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[94%]" />
         </div>
      </div>
    </div>
  );
}
