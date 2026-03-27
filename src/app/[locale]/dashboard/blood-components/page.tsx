"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Droplet, Activity, FlaskConical, Box, Send, 
  Search, Plus, ArrowRight, Clock, AlertTriangle, 
  ShieldCheck, History, MoreHorizontal, Waves, Snowflake,
  Heart, Building2, Timer, QrCode, ExternalLink
} from "lucide-react";
import { COMPONENT_METADATA, BloodComponentType } from "@/lib/components/componentTypes";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { KPIBlock } from "@/components/ui/KPIBlock";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MOCK_COMPONENTS = [
  { id: 'BAG-7721-A', type: 'PRBC' as BloodComponentType, bloodGroup: 'O+', status: 'Available', expiry: '2026-05-02', tti: 'Negative' },
  { id: 'BAG-7721-B', type: 'Platelets' as BloodComponentType, bloodGroup: 'O+', status: 'Testing', expiry: '2026-03-27', tti: 'Pending' },
  { id: 'BAG-5582-A', type: 'Plasma' as BloodComponentType, bloodGroup: 'A-', status: 'Available', expiry: '2027-03-22', tti: 'Negative' },
  { id: 'BAG-9901-A', type: 'PRBC' as BloodComponentType, bloodGroup: 'B+', status: 'Issued', expiry: '2026-04-15', tti: 'Negative' },
];

export default function BloodComponentsDashboard() {
  const [activeStep, setActiveStep] = useState(2); // Testing

  const STEPS = [
    { name: 'Donation', icon: Heart, description: 'Raw whole blood collection' },
    { name: 'Separation', icon: Droplet, description: 'Centrifugation into components' },
    { name: 'Testing', icon: FlaskConical, description: 'TTI & Crossmatching' },
    { name: 'Inventory', icon: Box, description: 'Stored in cold chain' },
    { name: 'Issuance', icon: Send, description: 'Dispatched to medical center' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-slate-900/40 p-10 rounded-premium border border-white/5 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 rotate-12">
           <Activity className="w-64 h-64 text-primary animate-float-premium" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-red-800 flex items-center justify-center shadow-neon animate-float-premium">
              <Droplet className="h-10 w-10 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white italic tracking-tighter">Blood Components</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-red-500/10 text-primary border border-primary/30 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                  <Activity className="h-3 w-3 mr-1" /> NATIONAL COMPONENT LIFECYCLE ENGINE
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground font-medium text-lg ml-20">Managing the transition from whole blood to lifesaving components.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <Button className="btn-premium h-14 px-8 bg-primary hover:bg-red-700 font-black text-lg rounded-xl shadow-lg shadow-primary/40 text-white">
            <Plus className="h-5 w-5 mr-3" /> SEPARATE NEW BAG
          </Button>
        </div>
      </div>

      {/* Visual Lifecycle Timeline */}
      <div className="bg-slate-900/40 p-10 rounded-premium border border-white/5 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white flex items-center gap-3">
              <Timer className="h-6 w-6 text-primary animate-pulse" /> Lifecycle Progress Tracking
           </h2>
           <Badge variant="outline" className="border-white/10 text-slate-400 font-black px-4 py-1">REAL-TIME SYNC ACTIVE</Badge>
        </div>
        
        <div className="relative flex justify-between">
           {/* Connection Lines */}
           <div className="absolute top-8 left-0 right-0 h-1 bg-slate-800 z-0" />
           <div className="absolute top-8 left-0 h-1 bg-primary z-0 transition-all duration-1000" style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} />
           
           {STEPS.map((step, i) => (
             <div key={i} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => setActiveStep(i)}>
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-xl",
                  i < activeStep ? "bg-primary border-primary text-white shadow-primary/20" : 
                  i === activeStep ? "bg-slate-900 border-primary text-primary animate-border-pulse shadow-neon scale-110" : 
                  "bg-slate-900 border-slate-700 text-slate-500 grayscale opacity-50"
                )}>
                   <step.icon className={cn("h-8 w-8", i === activeStep && "animate-float")} />
                </div>
                <div className="mt-4 text-center">
                   <p className={cn("text-xs font-black uppercase tracking-widest", i <= activeStep ? "text-white" : "text-slate-500")}>{step.name}</p>
                   <p className="text-[10px] text-muted-foreground font-medium w-32 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{step.description}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <KPIBlock title="Screened Today" value="142" icon={ShieldCheck} glowColor="green" trend={{ value: 12, label: "vs yesterday", isPositive: true }} />
        <KPIBlock title="Pass Rate" value="94.2%" icon={Activity} glowColor="primary" trend={{ value: 0.8, label: "improvement", isPositive: true }} />
        <KPIBlock title="Deferred" value="08" icon={AlertTriangle} glowColor="red" />
        <KPIBlock title="Critical Stock" value="03" icon={Box} glowColor="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Active Inventory List */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">Active Components</h2>
              <div className="relative w-64 pointer-events-none opacity-50">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                 <div className="h-10 w-full bg-slate-800 rounded-xl" />
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {MOCK_COMPONENTS.map((comp, idx) => {
                const metadata = COMPONENT_METADATA[comp.type];
                return (
                  <Card key={comp.id} className="group rounded-premium border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-500 shadow-premium overflow-hidden">
                    <CardContent className="p-6">
                       <div className="flex items-center gap-6">
                          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", metadata.color)}>
                             <Droplet className="h-7 w-7 text-white fill-white" />
                          </div>
                          <div className="flex-grow">
                              <div className="flex items-center justify-between mb-1">
                                 <h3 className="text-lg font-black text-white italic tracking-tighter">{comp.id} · <span className={cn("text-primary")}>{comp.bloodGroup}</span></h3>
                                  <AnimatedBadge
                                    variant={comp.status === 'Available' ? 'success' : comp.status === 'Testing' ? 'warning' : 'info'}
                                    pulsing={comp.status === 'Testing'}
                                  >
                                    {comp.status}
                                  </AnimatedBadge>
                              </div>
                             <div className="flex items-center gap-3 mt-2">
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black italic tracking-widest text-slate-500 hover:text-white" asChild>
                                  <a href={`/qr/bag/${comp.id}?group=${comp.bloodGroup}&type=${comp.type}&status=${comp.status}`} target="_blank">
                                    <QrCode className="w-3.5 h-3.5 mr-1" /> PRINT LABEL
                                  </a>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/20 text-slate-500 hover:text-primary transition-all rounded-lg">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                             <div className="flex items-center gap-6 mt-2">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{metadata.fullName}</p>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                                   <FlaskConical className="h-3.5 w-3.5 text-primary" /> TTI: {comp.tti}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                                   <Clock className="h-3.5 w-3.5" /> Expiry: {comp.expiry}
                                </div>
                             </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/5 rounded-full" asChild>
                            <Link href={`/dashboard/blood-components/${comp.id}`}><ArrowRight className="h-5 w-5" /></Link>
                          </Button>
                       </div>
                    </CardContent>
                  </Card>
                );
              })}
           </div>
        </div>

        {/* Component Stats Sidebar */}
        <div className="space-y-6">
           <GlowCard glowColor="primary" className="p-0">
              <CardHeader>
                 <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-primary" /> Stock Distribution
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 {Object.values(COMPONENT_METADATA).slice(0, 4).map((meta, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase text-white">{meta.type}</span>
                          <span className="text-xs font-black text-primary">{Math.floor(Math.random() * 50) + 10} Units</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", meta.color)} style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }} />
                       </div>
                    </div>
                 ))}
              </CardContent>
           </GlowCard>

           <GlowCard glowColor="red" className="p-0">
              <CardHeader>
                 <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" /> Critical Expiring
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[1, 2].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 group">
                       <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
                       <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">Platelets · O+</p>
                          <p className="text-[10px] text-red-400 font-bold uppercase mt-1">Expires in 12 hours</p>
                       </div>
                    </div>
                 ))}
                 <Button className="w-full btn-premium bg-white/5 border border-white/10 text-white font-black py-2 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 mt-2">View Compliance Log</Button>
              </CardContent>
           </GlowCard>
        </div>
      </div>
    </div>
  );
}
