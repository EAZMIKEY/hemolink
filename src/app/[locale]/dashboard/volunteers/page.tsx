"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  Heart, Users, MapPin, Calendar, 
  MessageSquare, Star, Zap, Bell,
  CheckCircle2, ChevronRight, Share2, 
  Info, ShieldCheck, Activity
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MISSIONS = [
  { id: "MIS-001", title: "Gurugram Mega Camp Assist", location: "Leisure Valley", type: "On-site", date: "2026-03-28", spots: 12, points: 50 },
  { id: "MIS-002", title: "Emergency Rare Donor Call", location: "District Wide", type: "Call Squad", date: "Immediate", spots: 5, points: 200 },
  { id: "MIS-003", title: "NHC Awareness Drive", location: "Noida Sector 62", type: "Outreach", date: "2026-04-02", spots: 24, points: 80 },
];

export default function VolunteerPortalPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="VOLUNTEER COMMAND" 
        subtitle="National citizen network for emergency response, camp coordination, and outreach." 
      />

      {/* Volunteer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <KPIBlock title="Total Volunteers" value="14.2K" icon={Users} glowColor="primary" />
        <KPIBlock title="Lives Touched" value="840" icon={Heart} glowColor="red" />
        <KPIBlock title="SOS Squad" value="Active" icon={Zap} glowColor="yellow" />
        <KPIBlock title="Trust Level" value="Gold" icon={Star} glowColor="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Missions */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex justify-between items-center px-2">
              <h2 className="text-sm font-black italic tracking-widest text-slate-500 uppercase">Open Combat Missions</h2>
              <AnimatedBadge variant="warning">Urgent Needs</AnimatedBadge>
           </div>

           {MISSIONS.map((m) => (
             <GlowCard key={m.id} glowColor={m.date === 'Immediate' ? 'red' : 'primary'} className="group bg-slate-900/40 backdrop-blur-xl border-white/10 hover:bg-slate-900/60 transition-all duration-500 overflow-hidden">
                <div className="p-6">
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className={cn(
                           "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all",
                           m.date === 'Immediate' ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-white/5 border-white/10 text-slate-400"
                         )}>
                            {m.type === 'Call Squad' ? <Zap className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
                         </div>
                         <div>
                            <h3 className="text-lg font-black italic tracking-tight text-white uppercase group-hover:text-primary transition-colors">{m.title}</h3>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                               <MapPin className="w-3 h-3" /> {m.location}
                            </p>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[10px] font-black text-primary uppercase tracking-widest">{m.points} Trust Pts</div>
                         <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">{m.spots} Spots Left</div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex gap-6">
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
                            <Calendar className="w-4 h-4 text-primary" /> {m.date}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
                            <Users className="w-4 h-4 text-blue-400" /> {m.type}
                         </div>
                      </div>
                      <Button className="h-10 px-6 bg-primary hover:bg-red-700 text-white font-black italic text-[10px] tracking-widest rounded-xl shadow-neon uppercase">
                         Enlist Now <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                   </div>
                </div>
             </GlowCard>
           ))}

           {/* Rewards Showcase */}
           <GlowCard glowColor="blue" className="p-8 bg-slate-900/40 border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Star className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10">
                 <h2 className="text-2xl font-black italic tracking-tight text-white uppercase mb-4">Elite Rewards Grid</h2>
                 <p className="text-xs text-slate-400 font-bold max-w-lg mb-6 italic leading-relaxed">
                    Earn Trust Points for active participation. Highly active volunteers receive official National Health Merit certificates and priority medical access.
                 </p>
                 <div className="flex gap-4">
                    <Button variant="outline" className="h-12 px-6 border-white/10 text-white font-black italic text-[10px] tracking-widest rounded-xl hover:bg-white/10 uppercase">
                       View Ranking
                    </Button>
                    <Button variant="outline" className="h-12 px-6 border-white/10 text-white font-black italic text-[10px] tracking-widest rounded-xl hover:bg-white/10 uppercase">
                       Rewards Shop
                    </Button>
                 </div>
              </div>
           </GlowCard>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <GlowCard glowColor="primary" className="p-6 bg-slate-900/60 backdrop-blur-xl border-white/10">
              <h3 className="text-sm font-black italic tracking-widest text-slate-500 mb-6 uppercase">Volunteer Shield</h3>
              <div className="space-y-4 mb-8">
                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                    <div>
                       <p className="text-[11px] font-black text-white italic uppercase tracking-wider">Certified Member</p>
                       <p className="text-[9px] font-bold text-slate-500 uppercase">Verified via NHC Biometric</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                    <div>
                       <p className="text-[11px] font-black text-white italic uppercase tracking-wider">National Alert Hub</p>
                       <p className="text-[9px] font-bold text-slate-500 uppercase">Direct SMS Escalations</p>
                    </div>
                 </div>
              </div>
              <Button className="w-full h-14 bg-slate-800 hover:bg-slate-700 text-white font-black italic tracking-widest text-lg rounded-2xl transition-all">
                 UPDATE PROFILE
              </Button>
           </GlowCard>

           <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl">
              <div className="flex items-center gap-3 mb-3">
                 <Info className="w-5 h-5 text-primary" />
                 <span className="text-[10px] font-black uppercase text-primary tracking-widest">National Duty</span>
              </div>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                 Volunteers are part of the National Integrated Health Grid. All actions are logged and contribute to your national trust score.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
