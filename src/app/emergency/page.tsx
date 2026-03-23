
"use client"

import { useState, useEffect, useMemo } from 'react';
import { MOCK_REQUESTS } from '@/lib/mock-data';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, Plus, MapPin, Hospital, Phone, Clock, Share2, 
  ShieldCheck, SignalHigh, Info, Timer, RefreshCw
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function EmergencyPage() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [showForm, setShowForm] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Set current time on mount to avoid hydration mismatch
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getRelativeTime = (dateString: string) => {
    if (!currentTime) return 'Loading...';
    const diff = Math.floor((currentTime.getTime() - new Date(dateString).getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minutes ago`;
    return `${Math.floor(diff / 60)} hours ago`;
  };

  const getExpiration = (dateString: string) => {
    if (!currentTime) return 60;
    const baseTime = new Date(dateString).getTime();
    const expiryTime = baseTime + (60 * 60 * 1000); // 1 hour expiry
    const diff = Math.floor((expiryTime - currentTime.getTime()) / 60000);
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "SOS Alert Dispatched",
      description: "Notified nearby donors, hospitals, and blood banks. 3 donors and 1 hospital found nearby.",
    });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="space-y-4">
          <div className="relative inline-block pl-2">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tight text-foreground flex items-center gap-4 animate-in fade-in slide-in-from-left duration-700">
              <AlertCircle className="text-primary h-14 w-14 drop-shadow-xl animate-pulse" /> 
              Emergency Case
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-red-500 to-transparent rounded-full animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground font-medium animate-in fade-in slide-in-from-left duration-700 delay-100 italic">High-priority blood requirements across the national network.</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="h-16 px-8 bg-primary hover:bg-red-700 font-black text-xl rounded-[1.5rem] shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-right duration-700 delay-200"
        >
          <Plus className="h-6 w-6 mr-3" /> BROADCAST SOS
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Overlay or Side (Conditional) */}
        {showForm && (
          <div className="lg:col-span-1 animate-in slide-in-from-left duration-700">
             <Card className="glass-card border-none overflow-hidden rounded-[2.5rem] shadow-2xl border-2 border-primary/20">
               <CardHeader className="bg-primary p-8 text-white relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                 <CardTitle className="text-2xl font-black italic tracking-tight relative z-10">Broadcast Emergency</CardTitle>
                 <CardDescription className="text-white/80 font-medium relative z-10">Notify all donors and hospitals instantly.</CardDescription>
               </CardHeader>
               <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Blood Group</label>
                      <Select required>
                        <SelectTrigger className="h-14 rounded-2xl border-2 focus:ring-primary font-bold text-lg"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent className="rounded-2xl border-2">{BLOOD_GROUPS.map(bg => <SelectItem key={bg} value={bg} className="font-bold">{bg}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Units (ML)</label>
                      <Input type="number" min="1" placeholder="Qty" className="h-14 rounded-2xl border-2 focus:ring-primary font-bold text-lg" required />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Medical Center</label>
                    <div className="relative">
                      <Hospital className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Hospital name" className="pl-12 h-14 rounded-2xl border-2 focus:ring-primary font-bold text-lg" required />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Direct Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="E.g. Juhu, Mumbai" className="pl-12 h-14 rounded-2xl border-2 focus:ring-primary font-bold text-lg" required />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Intel</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Phone number" className="pl-12 h-14 rounded-2xl border-2 focus:ring-primary font-bold text-lg" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 p-8 pt-0">
                  <Button type="submit" className="w-full bg-primary h-16 font-black text-xl rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">ESTABLISH BROADCAST</Button>
                  <Button type="button" variant="ghost" className="w-full font-black text-xs uppercase tracking-widest text-muted-foreground hover:text-primary" onClick={() => setShowForm(false)}>Abort Mission</Button>
                </CardFooter>
               </form>
             </Card>
          </div>
        )}

        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="space-y-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-black text-red-500 uppercase tracking-widest">Live SOS Feed</span>
              </div>
              <Badge className="bg-primary/5 text-primary border-primary/20 py-2 px-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/5">NATIONAL NETWORK ACTIVE</Badge>
              <div className="hidden md:flex items-center gap-2">
                <RefreshCw className="h-3 w-3 text-muted-foreground animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Real-time Sync Active</span>
              </div>
            </div>

            {requests.map((request, idx) => {
              const expiresIn = getExpiration(request.createdAt);
              const isUrgent = request.urgency === 'Critical' || request.urgency === 'Urgent';
              
              return (
                <Card 
                  key={request.id} 
                  className={cn(
                    "group relative overflow-hidden rounded-premium border-white/5 shadow-premium transition-all hover:scale-[1.01] hover:-translate-y-1 duration-500 bg-slate-900/60 backdrop-blur-xl text-white animate-in slide-in-from-bottom duration-700",
                    isUrgent && "animate-border-pulse"
                  )} 
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Severity Strip */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-[8px] z-10",
                    request.urgency === 'Critical' ? "bg-gradient-to-b from-red-600 to-red-900 shadow-[0_0_20px_rgba(255,0,0,0.5)]" : 
                    request.urgency === 'Urgent' ? "bg-orange-500" : "bg-yellow-500"
                  )} />

                  {/* Medical Pattern Background */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] invert" />

                  <CardContent className="p-10 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-white/5 rounded-[2rem] p-8 min-w-[160px] border border-white/10 group-hover:bg-primary/20 transition-all duration-500 shadow-inner relative overflow-hidden">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 relative z-10">Blood Group</span>
                        <div className="relative">
                           <span className={cn(
                             "text-6xl font-black text-primary italic drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] group-hover:scale-110 transition-transform relative z-10 block",
                             request.urgency === 'Critical' && "animate-blink"
                           )}>
                             {request.bloodType}
                           </span>
                           {request.urgency === 'Critical' && (
                             <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                           )}
                        </div>
                        <div className="flex flex-col items-center mt-4 relative z-10">
                           <span className="text-sm font-black text-white uppercase tracking-widest">{request.units} Units</span>
                           {request.urgency === 'Critical' && (
                             <Badge className="bg-primary text-white text-[8px] font-black mt-2 animate-bounce tracking-tighter px-2">REQUIRED NOW</Badge>
                           )}
                        </div>
                      </div>

                      <div className="flex-grow space-y-8">
                        <div className="flex flex-col xl:flex-row items-start justify-between gap-6">
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                   <h3 className="text-4xl font-black italic tracking-tighter text-white group-hover:text-primary transition-colors">{request.hospital}</h3>
                                   <TooltipProvider>
                                     <Tooltip>
                                       <TooltipTrigger asChild>
                                         <Info className="h-5 w-5 text-slate-500 cursor-help hover:text-primary transition-colors" />
                                       </TooltipTrigger>
                                       <TooltipContent className="bg-slate-900 border-white/10 p-6 rounded-premium shadow-premium min-w-[280px]">
                                         <div className="space-y-3">
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                               <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Attending Dr.</span>
                                               <span className="text-xs text-white font-black">Dr. Malhotra</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                               <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Case ID</span>
                                               <span className="text-xs text-primary font-black">#SOS-7721</span>
                                            </div>
                                            <div className="pt-2">
                                               <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-primary pl-3">"Immediate requirement for surgery. No alternatives available in internal stock."</p>
                                            </div>
                                         </div>
                                       </TooltipContent>
                                     </Tooltip>
                                   </TooltipProvider>
                                </div>
                                <div className={cn(
                                  "px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] border-2", 
                                  request.urgency === 'Critical' ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(255,0,0,0.3)]' : 
                                  request.urgency === 'Urgent' ? 'bg-orange-500/20 border-orange-500 text-orange-500' : 
                                  'bg-yellow-500/20 border-yellow-500 text-yellow-500'
                                )}>
                                   {request.urgency} SEVERITY
                                </div>
                            </div>
                            <p className="text-slate-300 flex items-center gap-3 font-bold text-lg uppercase tracking-tight">
                              <MapPin className="h-6 w-6 text-primary animate-float" /> {request.location}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-4 min-w-[200px]">
                            <div className="flex flex-col items-end">
                                <p className="text-[10px] font-black text-slate-500 flex items-center gap-2 justify-end uppercase tracking-[0.2em] mb-1">
                                  <Clock className="h-3.5 w-3.5" /> POSTED {getRelativeTime(request.createdAt)}
                                </p>
                                <div className={cn(
                                  "flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest",
                                  expiresIn < 15 ? "bg-red-500/10 border-red-500 text-red-500 animate-pulse" : "bg-white/5 border-white/10 text-slate-400"
                                )}>
                                   <Timer className="h-4 w-4" />
                                   ⏱️ Expiring in {expiresIn} min
                                </div>
                            </div>
                            <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 py-2 px-5 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all hover:bg-green-500/20">
                               <ShieldCheck className="h-4 w-4 mr-2" /> GOVERNMENT VERIFIED
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
                          <Button className="btn-premium bg-white text-slate-900 hover:bg-primary hover:text-white font-black px-12 rounded-xl h-14 transition-all shadow-xl text-sm">
                            <Phone className="h-5 w-5 mr-3 animate-wiggle" /> CONNECT WITH HOSPITAL
                          </Button>
                          <Button variant="outline" className="btn-premium font-black border-white/10 text-white hover:bg-white/5 rounded-xl h-14 px-10 uppercase tracking-widest text-[10px] transition-all hover:border-primary/40 group">
                            <Share2 className="h-5 w-5 mr-3 group-hover:text-primary transition-colors" /> SHARE SOS
                          </Button>
                          <div className="ml-auto hidden xl:flex items-center gap-3 text-slate-500">
                             <div className="flex -space-x-3">
                                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black">D{i}</div>)}
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-widest">3 Donors Responding</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Critical Pulse Glow */}
                  {request.urgency === 'Critical' && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                  )}
                </Card>
              );
            })}
          </div>
          
          <Card className="mt-16 glass-card border-none rounded-[3rem] p-12 text-center animate-in fade-in zoom-in duration-700 delay-500">
            <h4 className="text-3xl font-black italic tracking-tight mb-4 text-foreground">Mission Critical: Every Second Counts.</h4>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-medium italic">Regular donors are the backbone of our emergency response. Register today to ensure the network is always ready for the next crisis.</p>
            <Button size="lg" className="h-16 px-12 bg-white text-slate-900 hover:bg-primary hover:text-white font-black text-xl rounded-2xl transition-all shadow-2xl hover:scale-105" asChild>
              <a href="/register">ENLIST AS A HERO</a>
            </Button>
          </Card>
        </div>
      </div>

      {/* Floating SOS Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
             <Button 
               onClick={() => setShowForm(!showForm)}
               className="fixed bottom-10 right-10 w-20 h-20 rounded-full bg-primary hover:bg-red-700 shadow-[0_0_30px_rgba(255,0,0,0.5)] z-50 transition-all duration-300 hover:scale-110 active:scale-90 animate-in slide-in-from-bottom-20"
             >
               <div className="flex flex-col items-center">
                  <AlertCircle className="h-7 w-7 text-white" />
                  <span className="text-[10px] font-black uppercase mt-1">NEW SOS</span>
               </div>
               <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20 pointer-events-none" />
             </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-slate-900 text-white font-black border-primary">
            Broadcast Emergency SOS
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
