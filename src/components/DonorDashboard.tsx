"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart, Droplet, Users, TrendingUp, MapPin, Clock,
  ShieldCheck, Star, ToggleRight, ToggleLeft, ArrowRight,
  Bell, Calendar, Activity, RefreshCw, AlertCircle
} from "lucide-react";
import { UserStats } from "@/components/UserStats";
import { TrustCenter } from "@/components/TrustCenter";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type User = {
  name: string; email: string; role?: string;
  bloodGroup?: string; lastDonationDate?: string | null;
  isFirstTimeDonor?: boolean; phoneVerified?: boolean;
  isVerified?: boolean; availability?: boolean;
};

interface Props { user: User; onUpdateUser: (u: User) => void; }

const NEARBY_REQUESTS = [
  { type: "Emergency", hospital: "Apollo Delhi", group: "O-", time: "5 min ago", urgency: "high" },
  { type: "Scheduled", hospital: "AIIMS Noida", group: "A+",  time: "30 min ago", urgency: "medium" },
  { type: "Routine",   hospital: "City Hospital", group: "B+", time: "1 hr ago",  urgency: "low" },
];

export function DonorDashboard({ user, onUpdateUser }: Props) {
  const [available, setAvailable] = useState(user?.availability ?? true);

  const toggleAvailability = () => {
    const updated = { ...user, availability: !available };
    localStorage.setItem("user", JSON.stringify(updated));
    onUpdateUser(updated);
    setAvailable(!available);
  };

  const lastDonation = user?.lastDonationDate;
  const isFirstTimer = user?.isFirstTimeDonor;
  const eligible = isFirstTimer || !lastDonation ||
    (new Date().getTime() - new Date(lastDonation).getTime()) >= 90 * 24 * 60 * 60 * 1000;

  // Simulated trust score
  const trustScore = 40 + (user.isVerified ? 30 : 0) + (user.phoneVerified ? 20 : 0) + (eligible ? 10 : 0);

  const DONATION_HISTORY = [
    { date: "2025-11-20", units: "1 unit", hospital: "Apollo Delhi", type: "Whole Blood", status: "Verified" },
    { date: "2025-08-05", units: "1 unit", hospital: "Fortis Noida", type: "Platelets", status: "Verified" },
    { date: "2025-05-12", units: "1 unit", hospital: "AIIMS Delhi", type: "Whole Blood", status: "Verified" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/40 p-8 rounded-premium border border-white/5 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute -right-8 -top-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
           <Droplet className="w-40 h-40 text-primary animate-float-premium fill-primary" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-red-800 flex items-center justify-center shadow-neon animate-float-premium">
              <Droplet className="h-10 w-10 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight italic">
                WELCOME, <span className="text-primary uppercase">{user.name}</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-primary/20 text-primary border border-primary/30 font-black gap-1 px-3 py-1 text-[10px] uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3" /> VERIFIED DONOR
                </Badge>
                <div className="flex items-center gap-1 text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">
                  <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} />
                  Live Sync Active
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground font-black italic text-lg ml-20 uppercase tracking-tighter opacity-80">National Blood Network Participant • HMK-ID: 58A9-92X</p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <Button className="btn-premium bg-primary hover:bg-red-700 font-black h-14 px-8 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] text-lg italic tracking-widest" asChild>
            <Link href="/emergency"><AlertCircle className="h-5 w-5 mr-2" />RESPOND TO SOS</Link>
          </Button>
        </div>
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBlock title="Blood Group" value={user.bloodGroup || "—"} icon={Droplet} glowColor="primary" />
        
        <GlowCard 
          glowColor={available ? "green" : "primary"} 
          className={cn("cursor-pointer flex items-center gap-5 transition-all hover:scale-[1.02]", available ? "bg-slate-900/60" : "grayscale opacity-70 hover:grayscale-0")} 
          onClick={toggleAvailability}
        >
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12", available ? "bg-green-500 shadow-green-500/40" : "bg-slate-800")}>
            {available ? <ToggleRight className="h-8 w-8 text-white" /> : <ToggleLeft className="h-8 w-8 text-white" />}
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Live Status</p>
            <p className={cn("text-2xl font-black italic tracking-tighter", available ? "text-green-500" : "text-slate-400")}>{available ? "AVAILABLE" : "INACTIVE"}</p>
          </div>
        </GlowCard>

        <KPIBlock title="Trust Score" value={trustScore.toString()} icon={Star} glowColor="blue" />
        <KPIBlock title="Life Impacts" value="03" icon={TrendingUp} glowColor="yellow" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Trust Center */}
          <TrustCenter user={user} onUpdateUser={onUpdateUser} />

          {/* Donation Eligibility */}
          <GlowCard glowColor={eligible ? "green" : "primary"}>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black italic tracking-tight text-white flex items-center gap-2">
                   <Droplet className="h-6 w-6 text-primary" /> DONATION ELIGIBILITY
                </h3>
                <AnimatedBadge variant={eligible ? "success" : "warning"} pulsing={!eligible}>
                   {eligible ? "READY TO DONATE" : "RECOVERY PHASE"}
                </AnimatedBadge>
             </div>
             
             <div className={cn(
                "p-6 rounded-2xl border transition-all duration-500",
                eligible 
                  ? "bg-green-500/5 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]" 
                  : "bg-primary/5 border-primary/20"
             )}>
                <div className="flex items-start gap-5">
                   <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-premium",
                      eligible ? "bg-green-500 shadow-green-500/40" : "bg-primary shadow-primary/40"
                   )}>
                      {eligible ? <ShieldCheck className="h-7 w-7 text-white" /> : <Clock className="h-7 w-7 text-white" />}
                   </div>
                   <div className="space-y-1">
                      {isFirstTimer ? (
                        <>
                          <p className="text-lg font-black text-white italic tracking-tight">FIRST-TIME DONOR 🩸</p>
                          <p className="text-sm text-slate-400 font-medium">You are registered and verified. You are immediately eligible to save lives!</p>
                        </>
                      ) : lastDonation ? (
                        <>
                          <p className={cn("text-lg font-black italic tracking-tight uppercase", eligible ? "text-green-400" : "text-primary")}>
                            {eligible ? 'Verified Eligible' : 'Recovery Period Active'}
                          </p>
                          <p className="text-sm text-slate-400 font-medium">
                            Last Donation: <span className="text-white font-bold">{new Date(lastDonation).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            {!eligible && " • A minimum 90-day recovery gap is required for safety."}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-black text-white italic tracking-tight">ELIGIBILITY VERIFIED</p>
                          <p className="text-sm text-slate-400 font-medium">No prior donation date detected in the national registry. You are ready to donate!</p>
                        </>
                      )}
                   </div>
                </div>
             </div>
             
             <Button 
                className={cn(
                  "w-full mt-6 h-14 rounded-xl font-black italic tracking-widest text-lg transition-all duration-500",
                  eligible ? "bg-primary hover:bg-red-700 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed"
                )} 
                disabled={!eligible} 
                asChild
              >
                <Link href="/search">{eligible ? "FIND COLLECTION CENTRES →" : "ELIBILITY COOLDOWN ACTIVE"}</Link>
             </Button>
          </GlowCard>

          {/* Donation History Timeline */}
          <GlowCard glowColor="blue">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black italic tracking-tight text-white flex items-center gap-2">
                   <Calendar className="h-6 w-6 text-blue-400" /> DONATION HISTORY
                </h3>
                <Badge variant="outline" className="border-white/10 text-slate-500 font-black">LIFETIME: {DONATION_HISTORY.length}</Badge>
             </div>
             
             <div className="space-y-6 relative ml-4">
                <div className="absolute left-[-17px] top-2 bottom-2 w-0.5 bg-slate-800" />
                {DONATION_HISTORY.map((item, i) => (
                   <div key={i} className="relative group pl-8">
                      <div className="absolute left-[-24px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-primary group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 group-hover:border-primary/30 transition-all">
                         <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{item.date}</p>
                            <h4 className="text-base font-black text-white italic">{item.hospital}</h4>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{item.type} · {item.units}</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 font-black text-[10px] px-3 py-1">
                               {item.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-white rounded-xl">
                               <ArrowRight className="h-5 w-5" />
                            </Button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </GlowCard>
        </div>

        {/* Nearby Requests Sidebar */}
        <div className="space-y-6">
          <GlowCard glowColor="red">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-black italic tracking-tight text-white flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" /> SOS HUB
               </h3>
               <AnimatedBadge variant="live" pulsing>LIVE</AnimatedBadge>
            </div>
            <CardDescription className="mb-6 font-bold text-slate-400 italic">Critical blood requests in your immediate area.</CardDescription>
            <CardContent className="space-y-4 p-0">
              {NEARBY_REQUESTS.map((req, i) => (
                <div key={i} className={cn(
                   "p-4 rounded-2xl border transition-all duration-300",
                   req.urgency === 'high' 
                    ? 'border-red-500/30 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                    : 'border-white/5 bg-slate-800/40'
                )}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-sm text-white italic uppercase tracking-tighter">{req.hospital}</span>
                    {req.urgency === 'high' && (
                      <Badge className="bg-red-500 text-white text-[9px] font-black px-2 py-0 border-none shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                        URGENT
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <Badge className="bg-primary/20 text-primary border border-primary/30 text-[9px] font-black">{req.group}</Badge>
                    <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {req.time}</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full h-12 mt-2 font-black italic tracking-widest border-white/10 hover:bg-primary/10 hover:text-primary transition-all rounded-xl" asChild>
                <Link href="/search">VIEW ALL REQUESTS <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </CardContent>
          </GlowCard>

          <UserStats />
        </div>
      </div>
    </div>
  );
}

