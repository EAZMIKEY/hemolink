"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  Heart, Calendar, MapPin, CheckCircle, Clock,
  Droplet, Award, User, Phone, Star,
  ChevronRight, ShieldCheck, TrendingUp, AlertCircle, Zap
} from 'lucide-react';

const DONATION_HISTORY = [
  { date: "2025-11-15", location: "AIIMS Blood Bank, Delhi", unit: "450ml", component: "Whole Blood", status: "Verified", points: 50 },
  { date: "2025-08-03", location: "Tata Memorial, Mumbai", unit: "450ml", component: "Whole Blood", status: "Verified", points: 50 },
  { date: "2025-04-22", location: "Apollo Hospital, Chennai", unit: "200ml", component: "Platelets (Apheresis)", status: "Verified", points: 75 },
  { date: "2024-12-10", location: "Fortis Blood Centre, Kolkata", unit: "450ml", component: "Whole Blood", status: "Verified", points: 50 },
];

const UPCOMING_CAMPS = [
  { name: "National Blood Drive – Delhi", date: "March 29, 2026", location: "India Gate Lawns, New Delhi", slots: 24, organizer: "Red Cross India" },
  { name: "Corporate Donation Camp", date: "April 5, 2026", location: "Cyber Hub, Gurugram", slots: 40, organizer: "Medanta Medicity" },
  { name: "University Blood Fest", date: "April 12, 2026", location: "JNU Campus, Delhi", slots: 15, organizer: "NCC & NSS Delhi" },
];

const DAYS_SINCE_DONATION = 128;
const ELIGIBILITY_DAYS = 90;
const IS_ELIGIBLE = DAYS_SINCE_DONATION >= ELIGIBILITY_DAYS;

export default function DonorPortalPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'camps' | 'health'>('history');

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000 max-w-7xl">
      {/* Header */}
      <div className="relative overflow-hidden bg-slate-900/60 border border-white/5 rounded-[1.25rem] p-8 backdrop-blur-xl">
        <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
          <Heart className="w-56 h-56 text-primary fill-primary" />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-red-900 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.35)] flex-shrink-0">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-black italic tracking-tighter text-white">DONOR PORTAL</h1>
              <AnimatedBadge variant="success" pulsing>VERIFIED</AnimatedBadge>
            </div>
            <p className="text-slate-400 font-bold italic">Blood Group: <span className="text-primary font-black">O+</span> · Member since 2024 · National Certified Donor</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-xl px-4 py-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-black text-lg">225</span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">LifePoints</span>
            </div>
            <Button className="bg-primary hover:bg-red-700 text-white font-black italic tracking-widest px-6 h-10 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <Heart className="w-4 h-4 mr-2" /> DONATE NOW
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIBlock title="Total Donations" value="4" icon={Heart} glowColor="primary"
          trend={{ value: 1, label: "this year", isPositive: true }} />
        <KPIBlock title="Lives Impacted" value="12" icon={Award} glowColor="green"
          trend={{ value: 3, label: "est. beneficiaries", isPositive: true }} />
        <KPIBlock title="Blood Donated" value="1.55L" icon={Droplet} glowColor="blue" />
        <KPIBlock title="LifePoints" value="225" icon={Star} glowColor="yellow"
          trend={{ value: 75, label: "vs last year", isPositive: true }} />
      </div>

      {/* Eligibility Tracker */}
      <GlowCard glowColor={IS_ELIGIBLE ? "green" : "yellow"} className="flex flex-col md:flex-row gap-6 items-center">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${IS_ELIGIBLE ? 'bg-green-500/15 border border-green-500/30' : 'bg-yellow-500/15 border border-yellow-500/30'}`}>
          {IS_ELIGIBLE ? <CheckCircle className="w-10 h-10 text-green-500" /> : <Clock className="w-10 h-10 text-yellow-500" />}
        </div>
        <div className="flex-grow w-full">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Donation Eligibility Status</p>
              <p className="text-2xl font-black italic tracking-tighter text-white">
                {IS_ELIGIBLE ? '✓ ELIGIBLE TO DONATE' : `${ELIGIBILITY_DAYS - DAYS_SINCE_DONATION} days remaining`}
              </p>
            </div>
            <AnimatedBadge variant={IS_ELIGIBLE ? "success" : "warning"} pulsing={IS_ELIGIBLE}>
              {IS_ELIGIBLE ? "ELIGIBLE" : "COOLDOWN"}
            </AnimatedBadge>
          </div>
          <Progress value={Math.min((DAYS_SINCE_DONATION / ELIGIBILITY_DAYS) * 100, 100)} className="h-2 bg-slate-800" />
          <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase mt-1.5">
            <span>Last Donation: 128 days ago</span>
            <span>Threshold: 90 days · {DAYS_SINCE_DONATION}d elapsed</span>
          </div>
        </div>
      </GlowCard>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-slate-900 border border-white/5 rounded-2xl p-1.5">
        {[
          { key: 'history', label: 'Donation History', icon: Heart },
          { key: 'camps', label: 'Find Camps', icon: MapPin },
          { key: 'health', label: 'Health Profile', icon: ShieldCheck },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.key ? 'bg-primary text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-slate-400 hover:text-white'}`}
          >
            <tab.icon className="w-3.5 h-3.5" />{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {DONATION_HISTORY.map((d, i) => (
            <GlowCard key={i} glowColor="primary" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <Droplet className="w-6 h-6 text-primary fill-primary" />
              </div>
              <div className="flex-grow">
                <p className="font-black text-white text-sm">{d.location}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{d.component} · {d.unit}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <AnimatedBadge variant="success">{d.status}</AnimatedBadge>
                <p className="text-[10px] text-slate-500 italic font-bold">{d.date}</p>
              </div>
              <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 font-black text-xs">+{d.points}</span>
              </div>
            </GlowCard>
          ))}
        </div>
      )}

      {activeTab === 'camps' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UPCOMING_CAMPS.map((camp, i) => (
            <GlowCard key={i} glowColor="blue" className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{camp.organizer}</p>
                <AnimatedBadge variant="info">{camp.slots} Slots</AnimatedBadge>
              </div>
              <p className="text-lg font-black italic tracking-tight text-white leading-tight">{camp.name}</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-primary" />{camp.date}
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-primary" />{camp.location}
                </div>
              </div>
              <Button className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-black italic tracking-widest text-xs mt-auto">
                REGISTER <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </GlowCard>
          ))}
        </div>
      )}

      {activeTab === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlowCard glowColor="green">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Health Indicators
            </p>
            {[
              { label: "Hemoglobin", value: "14.2 g/dL", status: "Normal", ok: true },
              { label: "Blood Pressure", value: "118/76 mmHg", status: "Optimal", ok: true },
              { label: "Heart Rate", value: "72 bpm", status: "Normal", ok: true },
              { label: "TTI Screening", value: "Negative", status: "Clear", ok: true },
              { label: "BMI", value: "22.4", status: "Healthy", ok: true },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                <span className="text-sm font-bold text-slate-400">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-sm">{item.value}</span>
                  <StatusChip status={item.ok ? "active" : "inactive"} label={item.status} />
                </div>
              </div>
            ))}
          </GlowCard>
          <GlowCard glowColor="primary">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-primary" /> Achievements
            </p>
            {[
              { label: "First Donation", icon: Heart, earned: true, desc: "Welcome to the community" },
              { label: "Life Saver", icon: Award, earned: true, desc: "10+ lives impacted" },
              { label: "Regular Donor", icon: TrendingUp, earned: true, desc: "3+ donations completed" },
              { label: "Platinum Hero", icon: Star, earned: false, desc: "Donate 10 times to unlock" },
            ].map((ach, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl mb-2 ${ach.earned ? 'bg-primary/5 border border-primary/20' : 'bg-slate-800/40 border border-white/5 opacity-50'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ach.earned ? 'bg-primary/20' : 'bg-slate-700'}`}>
                  <ach.icon className={`w-5 h-5 ${ach.earned ? 'text-primary' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className="font-black text-xs text-white uppercase tracking-widest">{ach.label}</p>
                  <p className="text-[10px] text-slate-500 font-bold">{ach.desc}</p>
                </div>
                {ach.earned && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
              </div>
            ))}
          </GlowCard>
        </div>
      )}
    </div>
  );
}
