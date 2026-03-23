"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  Map as MapIcon, Filter, Layers, 
  Search, Maximize2, Download,
  AlertTriangle, Droplet, Users,
  Activity, Zap, Info
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DATA_POINTS = [
  { id: 1, x: "25%", y: "40%", intensity: "High", type: "Shortage", region: "Delhi NCR" },
  { id: 2, x: "60%", y: "75%", intensity: "Critical", type: "Emergency", region: "Mumbai Hub" },
  { id: 3, x: "45%", y: "30%", intensity: "Moderate", type: "Shortage", region: "Lucknow Grid" },
  { id: 4, x: "80%", y: "20%", intensity: "High", type: "Expiry", region: "Kolkata Central" },
  { id: 5, x: "30%", y: "85%", intensity: "Moderate", type: "Donor Density", region: "Bengaluru South" },
];

export default function NationalHeatmapPage() {
  const [filter, setFilter] = useState("Shortages");

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="NATIONAL INCIDENT HEATMAP" 
        subtitle="Real-time visualization of component shortages, emergencies, and donor concentrations." 
      />

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/60 p-4 rounded-3xl border border-white/10 backdrop-blur-xl mb-8">
         <div className="flex gap-2">
            {["Shortages", "Emergencies", "Expiry", "Donors"].map((t) => (
              <Button 
                key={t}
                onClick={() => setFilter(t)}
                variant="ghost" 
                className={cn(
                  "text-[10px] font-black italic tracking-widest rounded-xl px-6 transition-all",
                  filter === t ? "text-primary bg-primary/10 border border-primary/20" : "text-slate-500 hover:text-white"
                )}
              >
                {t.toUpperCase()}
              </Button>
            ))}
         </div>
         <div className="flex gap-3">
            <Button variant="outline" className="h-10 border-white/10 text-white text-[10px] font-black italic tracking-widest rounded-xl hover:bg-white/5 uppercase">
               <Layers className="w-4 h-4 mr-2 text-primary" /> Overlay: Districts
            </Button>
            <Button variant="outline" className="h-10 border-white/10 text-white text-[10px] font-black italic tracking-widest rounded-xl hover:bg-white/5 uppercase">
               <Download className="w-4 h-4 mr-2" /> Export Map
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Statistics Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <GlowCard glowColor="red" className="p-6 bg-slate-900/60 border-white/10">
              <div className="flex items-center gap-3 mb-6">
                 <AlertTriangle className="w-5 h-5 text-primary" />
                 <h3 className="text-sm font-black italic tracking-widest text-white uppercase">Critical Zones</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { name: "West Bengal", type: "PRBC Shortage", intensity: "Critical" },
                   { name: "Maharashtra", type: "Emergency SOS", intensity: "High" },
                   { name: "Karnataka", type: "Platelet Shortage", intensity: "Moderate" },
                 ].map((z, i) => (
                   <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[11px] font-black text-white italic uppercase">{z.name}</span>
                         <span className={cn(
                           "text-[8px] font-black px-1.5 py-0.5 rounded-full border tracking-widest uppercase",
                           z.intensity === 'Critical' ? "text-red-500 border-red-500/30 bg-red-500/10" : "text-yellow-500 border-yellow-500/30 bg-yellow-500/10"
                         )}>{z.intensity}</span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase">{z.type}</p>
                   </div>
                 ))}
              </div>
           </GlowCard>

           <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl">
              <div className="flex items-center gap-3 mb-3">
                 <Info className="w-5 h-5 text-primary" />
                 <span className="text-[10px] font-black uppercase text-primary tracking-widest">Map Intelligence</span>
              </div>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                 The heatmap uses Haversine distance and real-time inventory pulses to identify high-concentration risk areas.
              </p>
           </div>
        </div>

        {/* Heatmap Visualization */}
        <div className="lg:col-span-3">
           <GlowCard glowColor="primary" className="h-[600px] relative overflow-hidden bg-slate-950 border-white/10 flex items-center justify-center">
              {/* Map Placeholder Graphic */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <svg className="w-full h-full" viewBox="0 0 800 600">
                    <path d="M100,100 Q400,50 700,100 T700,500 Q400,550 100,500 T100,100" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10,10" />
                    <circle cx="400" cy="300" r="200" fill="rgba(239, 68, 68, 0.05)" />
                 </svg>
              </div>

              {/* Data Points (Glow Blobs) */}
              {DATA_POINTS.map((p) => (
                <div 
                  key={p.id}
                  style={{ left: p.x, top: p.y }}
                  className={cn(
                    "absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  )}
                >
                   <div className={cn(
                     "w-full h-full rounded-full animate-ping opacity-20",
                     p.intensity === 'Critical' ? "bg-red-500" : "bg-primary"
                   )} />
                   <div className={cn(
                     "absolute inset-0 rounded-full border-2 transform scale-100 group-hover:scale-125 transition-all shadow-neon",
                     p.intensity === 'Critical' ? "bg-red-500 border-red-400" : "bg-primary border-red-300"
                   )} />
                   
                   {/* Tooltip on Hover */}
                   <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-30">
                      <div className="bg-slate-900 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-xl w-40">
                         <p className="text-[10px] font-black text-white italic uppercase tracking-wider">{p.region}</p>
                         <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">{p.type} detected</p>
                         <div className="mt-2 text-[8px] font-black text-primary uppercase">Click to Deploy Match Engine</div>
                      </div>
                   </div>
                </div>
              ))}

              {/* Map Footer Info */}
              <div className="absolute bottom-8 left-8 flex items-center gap-6 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-neon-red" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Emergency SOS</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-neon" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Component Shortage</span>
                 </div>
                 <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Pulse: Active</span>
                 </div>
              </div>

              <div className="absolute top-8 right-8">
                 <Button variant="ghost" className="w-10 h-10 p-0 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/10 text-white hover:text-primary transition-all">
                    <Maximize2 className="w-5 h-5" />
                 </Button>
              </div>

              <div className="text-center pointer-events-none">
                 <h2 className="text-sm font-black italic text-slate-600 uppercase tracking-[0.5em] mb-2">National Health Grid Visualization</h2>
                 <p className="text-[10px] text-slate-700 font-bold uppercase">Dynamic Layer V4.0</p>
              </div>
           </GlowCard>
        </div>
      </div>
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}
