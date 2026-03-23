"use client"

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Droplet, Activity, FlaskConical, Box, Send, 
  ArrowLeft, Clock, AlertTriangle, ShieldCheck, 
  History, User, MapPin, Database, CheckCircle2,
  Trash2, FileText, Share2, Timer
} from "lucide-react";
import { COMPONENT_METADATA } from "@/lib/components/componentTypes";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ComponentDetailPage() {
  const params = useParams();
  const bagId = params.bagId as string;

  // Mock data for this specific bag
  const component = {
    id: bagId,
    type: 'PRBC',
    bloodGroup: 'O+',
    status: 'Available',
    donatedAt: '2026-03-20 10:30 AM',
    separatedAt: '2026-03-20 02:45 PM',
    ttiStatus: 'Verified Negative',
    expiry: '2026-05-01',
    storage: 'Refrigerator #4, Shelf B',
    temp: '4.2°C',
    donorId: 'DONOR-58A9',
    history: [
      { event: 'Bag Dispatched for Separation', time: '2026-03-20 02:15 PM', user: 'Lab Tech R. Sharma' },
      { event: 'TTI Screening Completed', time: '2026-03-21 09:00 AM', user: 'Serology Dept' },
      { event: 'Quality Clearance Approved', time: '2026-03-21 11:30 AM', user: 'Dr. V. Kapoor' },
    ]
  };

  const metadata = COMPONENT_METADATA[component.type as keyof typeof COMPONENT_METADATA];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Back Nav */}
      <Link href="/dashboard/blood-components" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black uppercase text-[10px] tracking-widest group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to components
      </Link>

      {/* Header Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-slate-900/40 p-10 rounded-premium border border-white/5 backdrop-blur-xl relative overflow-hidden">
        <div className="flex items-center gap-6">
           <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center shadow-neon animate-float-premium", metadata.color)}>
              <Droplet className="h-12 w-12 text-white fill-white" />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-black text-white italic tracking-tighter">{component.id}</h1>
                <Badge className="bg-green-500/10 text-green-500 border border-green-500/20 font-black text-[10px] uppercase px-3 py-1">
                  <ShieldCheck className="h-3 w-3 mr-1" /> {component.status}
                </Badge>
              </div>
              <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs transition-colors flex items-center gap-2">
                 {metadata.fullName} · <span className="text-primary">{component.bloodGroup}</span>
              </p>
           </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="btn-premium border-white/10 text-white font-black rounded-xl h-12 px-6 hover:bg-white/5 text-[10px] uppercase tracking-widest"><Share2 className="h-4 w-4 mr-2" /> Share Details</Button>
           <Button className="btn-premium bg-primary hover:bg-red-700 font-black rounded-xl h-12 px-8 shadow-lg shadow-primary/20 text-white text-[10px] uppercase tracking-widest"><FileText className="h-4 w-4 mr-2" /> Generate Certificate</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Vital Info */}
        <div className="md:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="rounded-premium border-white/5 bg-slate-900/40 shadow-premium">
                 <CardContent className="p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Screening Status</p>
                    <div className="flex items-center gap-3">
                       <FlaskConical className="h-6 w-6 text-primary" />
                       <h3 className="text-xl font-black text-white italic">{component.ttiStatus}</h3>
                    </div>
                    <p className="text-[10px] text-green-500 font-black uppercase mt-2">✓ Verified on 21 Mar 2026</p>
                 </CardContent>
              </Card>

              <Card className="rounded-premium border-white/5 bg-slate-900/40 shadow-premium animate-border-pulse">
                 <CardContent className="p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Shelf Life Expiry</p>
                    <div className="flex items-center gap-3">
                       <Timer className="h-6 w-6 text-amber-500" />
                       <h3 className="text-xl font-black text-white italic">{component.expiry}</h3>
                    </div>
                    <p className="text-[10px] text-amber-500 font-black uppercase mt-2">⏳ 42 Days remaining</p>
                 </CardContent>
              </Card>
           </div>

           <Card className="rounded-premium border-white/5 bg-slate-900/40 shadow-premium overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" /> Lifecycle History
                 </h2>
              </div>
              <CardContent className="p-8 space-y-6">
                 {component.history.map((item, i) => (
                    <div key={i} className="flex gap-6 relative group">
                       <div className="w-px bg-slate-800 absolute left-[15px] top-8 bottom-[-24px] group-last:hidden" />
                       <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                       </div>
                       <div className="pb-8">
                          <p className="font-black text-white uppercase tracking-tight text-sm">{item.event}</p>
                          <div className="flex items-center gap-4 mt-1">
                             <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-widest"><Clock className="h-3 w-3" /> {item.time}</span>
                             <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-widest"><User className="h-3 w-3" /> {item.user}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </CardContent>
           </Card>
        </div>

        {/* Sidebar Specs */}
        <div className="space-y-6">
           <Card className="rounded-premium border-white/5 bg-slate-900/40 shadow-premium">
              <CardContent className="p-6 space-y-6">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Database className="h-5 w-5 text-primary" />
                       <h3 className="text-xs font-black uppercase tracking-widest text-white">Storage Intel</h3>
                    </div>
                    <div className="space-y-4 pt-2">
                       <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Location</span>
                          <span className="text-[10px] text-white font-black">{component.storage}</span>
                       </div>
                       <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Real-temp</span>
                          <span className="text-[10px] text-green-400 font-black">{component.temp}</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                       <User className="h-5 w-5 text-primary" />
                       <h3 className="text-xs font-black uppercase tracking-widest text-white">Donor Intel</h3>
                    </div>
                    <div className="space-y-4 pt-2">
                       <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Source ID</span>
                          <Link href={`/profile/${component.donorId}`} className="text-[10px] text-primary font-black hover:underline">{component.donorId}</Link>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Donated On</span>
                          <span className="text-[10px] text-white font-black">{component.donatedAt}</span>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="grid grid-cols-1 gap-4">
              <Button className="w-full bg-slate-800 hover:bg-primary transition-all text-white font-black h-14 rounded-xl text-[10px] uppercase tracking-widest border border-white/5 shadow-xl">
                 <Box className="h-4 w-4 mr-3 text-primary" /> RELOCATE COMPONENT
              </Button>
              <Button variant="outline" className="w-full border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white font-black h-14 rounded-xl text-[10px] uppercase tracking-widest shadow-xl">
                 <Trash2 className="h-4 w-4 mr-3" /> MARK AS DISCARDED
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
