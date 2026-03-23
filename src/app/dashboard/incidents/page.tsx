"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  AlertOctagon, Activity, ShieldAlert, 
  Clock, CheckCircle2, MessageSquare, 
  MapPin, Bell, Zap, MoreHorizontal,
  ChevronRight, Hospital, Database, Map as MapIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INCIDENTS = [
  { 
    id: "INC-9901", 
    title: "Critical Component Shortage: O- Platelets", 
    location: "Medanta Medicity (Gurugram)", 
    severity: "Critical",
    time: "4 mins ago",
    status: "Active",
    updates: 4,
    type: "Shortage"
  },
  { 
    id: "INC-9884", 
    title: "Massive Casualty Event SOS: 40 Units Needed", 
    location: "Trauma Center (Safdarjung)", 
    severity: "Emergency",
    time: "12 mins ago",
    status: "In Progress",
    updates: 12,
    type: "SOS"
  },
  { 
    id: "INC-9852", 
    title: "Inventory Sync Failure: Region East", 
    location: "National Data Grid", 
    severity: "Warning",
    time: "28 mins ago",
    status: "Investigating",
    updates: 2,
    type: "System"
  },
  { 
    id: "INC-9840", 
    title: "Expiring Stock Alert: 14 Bags PRBC", 
    location: "Fortis Noida Bank", 
    severity: "Warning",
    time: "1 hour ago",
    status: "Resolved",
    updates: 1,
    type: "Stock"
  }
];

export default function IncidentCenterPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="INCIDENT RESPONSE CENTER" 
        subtitle="National-level emergency escalation and automated early-warning grid." 
      />

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <KPIBlock title="Active Alerts" value="02" icon={Bell} glowColor="red" />
        <KPIBlock title="Mean Response" value="4.2m" icon={Clock} glowColor="blue" />
        <KPIBlock title="SOS Resolved" value="94%" icon={CheckCircle2} glowColor="green" />
        <KPIBlock title="Grid Health" value="Stable" icon={Activity} glowColor="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incident List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-sm font-black italic tracking-widest text-slate-500 uppercase">Live Incident Stream</h2>
            <div className="flex gap-2 items-center">
              <Link href="/dashboard/incidents/heatmap">
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-primary hover:bg-primary/10 tracking-widest uppercase">
                   <MapIcon className="w-3.5 h-3.5 mr-1.5" /> National Heatmap
                </Button>
              </Link>
              <AnimatedBadge variant="live" pulsing>Live Monitoring</AnimatedBadge>
            </div>
          </div>
          
          {INCIDENTS.map((inc) => (
            <GlowCard key={inc.id} glowColor={inc.severity === 'Critical' || inc.severity === 'Emergency' ? 'red' : 'yellow'} className="group bg-slate-900/40 backdrop-blur-xl border-white/10 hover:bg-slate-900/60 transition-all duration-500 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all",
                      inc.severity === 'Emergency' ? "bg-red-500/10 border-red-500/30 text-red-500 shadow-neon" : "bg-slate-800 border-white/10 text-slate-400"
                    )}>
                      {inc.type === 'SOS' ? <Zap className="w-6 h-6" /> : <AlertOctagon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-black italic tracking-tight text-white uppercase group-hover:text-primary transition-colors">{inc.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                        <MapPin className="w-3 h-3 text-primary" /> {inc.location}
                      </div>
                    </div>
                  </div>
                  <AnimatedBadge 
                    variant={inc.severity === 'Emergency' || inc.severity === 'Critical' ? 'error' : 'warning'}
                  >
                    {inc.severity}
                  </AnimatedBadge>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-6">
                     <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                        <Clock className="w-3.5 h-3.5" /> {inc.time}
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> {inc.updates} Updates
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="outline" className="h-10 px-4 border-white/10 text-white font-black italic text-[10px] tracking-widest rounded-xl hover:bg-white/5 uppercase">
                        View Log
                     </Button>
                     <Button className="h-10 px-6 bg-primary hover:bg-red-700 text-white font-black italic text-[10px] tracking-widest rounded-xl shadow-neon uppercase">
                        Acknowledge <ChevronRight className="w-3.5 h-3.5 ml-1" />
                     </Button>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Action Panel Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <GlowCard glowColor="primary" className="p-6 bg-slate-900/60 backdrop-blur-xl border-white/10">
            <h3 className="text-sm font-black italic tracking-widest text-slate-500 mb-6 uppercase">Crisis Controls</h3>
            <div className="space-y-3 mb-8">
               <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black italic tracking-widest text-lg rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-between px-6">
                  <span>INITIATE NATIONAL SOS</span>
                  <Zap className="w-6 h-6 fill-white" />
               </Button>
               <Button variant="outline" className="w-full h-14 border-white/10 text-white font-black italic tracking-widest rounded-2xl hover:bg-white/5 flex items-center justify-between px-6">
                  <span>DEPLOY INTER-BANK DISPATCH</span>
                  <Database className="w-6 h-6 text-primary" />
               </Button>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <ShieldAlert className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-black uppercase text-primary tracking-widest">Protocol Active</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                National Disaster Health Response (NDHR) protocol is currently enforcing automatic stock reallocation for critical emergencies.
              </p>
            </div>
          </GlowCard>

          <GlowCard glowColor="blue" className="p-6 bg-slate-900/40 backdrop-blur-xl border-white/10">
             <h3 className="text-sm font-black italic tracking-widest text-slate-500 mb-6 uppercase">Grid Status</h3>
             <div className="space-y-4">
                {[
                  { name: "Hospital Grid", status: "Operational", color: "green" },
                  { name: "Bank Inventory Grid", status: "Operational", color: "green" },
                  { name: "Biometric Auth Node", status: "Delayed (3s)", color: "yellow" },
                  { name: "API Monitoring HUB", status: "Maintenance", color: "blue" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{s.name}</span>
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 rounded-full border tracking-widest",
                      s.color === "green" ? "text-green-500 border-green-500/30 bg-green-500/10" : 
                      s.color === "yellow" ? "text-yellow-500 border-yellow-500/30 bg-yellow-500/10" : "text-blue-500 border-blue-500/30 bg-blue-500/10"
                    )}>
                      {s.status}
                    </span>
                  </div>
                ))}
             </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
