"use client"

import { useState, useEffect } from "react";
import {
  Users, UserPlus, ShieldCheck,
  Search, Filter, Mail, Phone,
  MapPin, Briefcase, Clock, ShieldAlert,
  MoreVertical, ChevronRight, CheckCircle2, Building2, Plus, Calendar, Activity, Droplet, CheckCircle,
  WifiOff, CloudLightning, RefreshCw, Star, AlertTriangle, Heart, ClipboardList
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { StatusChip } from "@/components/ui/StatusChip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CAMPS = [
  {
    id: "CAMP-001",
    name: "National Blood Drive – India Gate",
    organizer: "Red Cross India",
    date: "March 29, 2026",
    time: "8:00 AM – 5:00 PM",
    location: "India Gate Lawns, New Delhi",
    address: "Kartavya Path, New Delhi 110001",
    registered: 78,
    capacity: 120,
    collected: 45,
    status: "Active",
    type: "Mega Drive",
    contact: "+91-98765-43210",
  },
  {
    id: "CAMP-002",
    name: "Corporate Donation Camp – Cyber Hub",
    organizer: "Medanta Medicity",
    date: "April 5, 2026",
    time: "9:00 AM – 4:00 PM",
    location: "Cyber Hub, Gurugram",
    address: "DLF Cyber Park, Gurugram 122002",
    registered: 32,
    capacity: 80,
    collected: 0,
    status: "Upcoming",
    type: "Corporate",
    contact: "+91-98101-22334",
  },
  {
    id: "CAMP-003",
    name: "University Blood Fest – JNU Campus",
    organizer: "NCC & NSS Delhi",
    date: "April 12, 2026",
    time: "10:00 AM – 3:00 PM",
    location: "JNU Campus, Delhi",
    address: "JNU Ring Road, New Delhi 110067",
    registered: 55,
    capacity: 60,
    collected: 0,
    status: "Upcoming",
    type: "University",
    contact: "+91-91234-56789",
  },
  {
    id: "CAMP-004",
    name: "Rural Health Camp – Mewat District",
    organizer: "Ministry of Health",
    date: "March 15, 2026",
    time: "7:00 AM – 2:00 PM",
    location: "Primary Health Centre, Mewat",
    address: "Nuh District, Haryana 122107",
    registered: 90,
    capacity: 90,
    collected: 87,
    status: "Completed",
    type: "Rural Outreach",
    contact: "+91-90123-45678",
  },
];

export default function CampsPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('All');

  const filtered = filter === 'All' ? CAMPS : CAMPS.filter(c => c.status === filter);

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <MapPin className="w-3 h-3" /> Field Operations Command
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-foreground">CAMP MANAGEMENT</h1>
          <p className="text-muted-foreground font-bold italic">Coordinate blood donation drives across India.</p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedBadge variant="live" pulsing>LIVE TRACKING</AnimatedBadge>
          <Button className="bg-primary hover:bg-red-700 text-white font-black italic tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <Plus className="w-4 h-4 mr-2" /> ADD CAMP
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIBlock title="Total Camps" value={CAMPS.length.toString()} icon={MapPin} glowColor="primary"
          trend={{ value: 2, label: "new this month", isPositive: true }} />
        <KPIBlock title="Active Now" value={CAMPS.filter(c => c.status === 'Active').length.toString()} icon={Activity} glowColor="green" />
        <KPIBlock title="Registered Donors" value={CAMPS.reduce((a, c) => a + c.registered, 0).toString()} icon={Users} glowColor="blue"
          trend={{ value: 12, label: "vs last drive", isPositive: true }} />
        <KPIBlock title="Blood Collected" value={`${CAMPS.reduce((a, c) => a + c.collected, 0)} u.`} icon={Droplet} glowColor="red" />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-slate-900 border border-white/5 rounded-2xl p-1.5 w-fit">
        {(['All', 'Active', 'Upcoming', 'Completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-slate-400 hover:text-white'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Camp Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((camp) => {
          const fillPercent = Math.round((camp.registered / camp.capacity) * 100);
          const glowColor = camp.status === 'Active' ? 'green' : camp.status === 'Upcoming' ? 'blue' : 'primary';
          return (
            <GlowCard key={camp.id} glowColor={glowColor}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{camp.id} · {camp.type}</p>
                  <h3 className="text-lg font-black italic tracking-tight text-white leading-tight">{camp.name}</h3>
                </div>
                <AnimatedBadge
                  variant={camp.status === 'Active' ? 'live' : camp.status === 'Upcoming' ? 'info' : 'success'}
                  pulsing={camp.status === 'Active'}
                >
                  {camp.status}
                </AnimatedBadge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span>{camp.organizer}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{camp.date} · {camp.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{camp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{camp.contact}</span>
                </div>
              </div>

              {/* Capacity Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-1.5">
                  <span>Registration</span>
                  <span className={fillPercent >= 90 ? 'text-red-500' : fillPercent >= 60 ? 'text-yellow-500' : 'text-green-500'}>
                    {camp.registered}/{camp.capacity} ({fillPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${fillPercent >= 90 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : fillPercent >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>

              {camp.status === 'Completed' && (
                <div className="flex items-center gap-2 text-xs font-black text-green-400 mb-3">
                  <CheckCircle className="w-4 h-4" />
                  <span>{camp.collected} units collected · Drive Successful</span>
                </div>
              )}

              <div className="flex gap-2 mt-auto">
                <Button variant="outline" className="flex-1 border-white/10 font-black italic tracking-widest text-[10px] hover:bg-white/5 h-11 rounded-xl">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-primary" /> VIEW ON MAP
                </Button>
                {camp.status !== 'Completed' && (
                  <Button className="flex-1 bg-primary hover:bg-red-700 text-white font-black italic tracking-widest text-[10px] h-11 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    REGISTER NOW <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
}
