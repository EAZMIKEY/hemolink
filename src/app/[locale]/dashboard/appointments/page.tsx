"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import {
  Calendar, Clock, Droplet, CheckCircle,
  Plus, ChevronRight, XCircle, Activity,
  MapPin, Stethoscope, Building2
} from 'lucide-react';
import { cn } from "@/lib/utils";

const APPOINTMENTS = [
  {
    id: "APT-2026-0421",
    hospital: "AIIMS New Delhi",
    location: "Ansari Nagar, New Delhi",
    date: "March 29, 2026",
    time: "10:30 AM",
    type: "Whole Blood",
    status: "Confirmed",
    doctor: "Dr. Ravi Sharma",
  },
  {
    id: "APT-2026-0389",
    hospital: "Fortis Hospital",
    location: "Sector 62, Noida",
    date: "April 5, 2026",
    time: "2:00 PM",
    type: "Platelets (Apheresis)",
    status: "Pending",
    doctor: "Dr. Meena Kapoor",
  },
  {
    id: "APT-2026-0302",
    hospital: "Medanta Medicity",
    location: "Sector 38, Gurugram",
    date: "March 10, 2026",
    time: "9:00 AM",
    type: "Whole Blood",
    status: "Completed",
    doctor: "Dr. Anand Gupta",
  },
  {
    id: "APT-2026-0271",
    hospital: "Apollo Hospitals",
    location: "Sarita Vihar, Delhi",
    date: "February 20, 2026",
    time: "11:15 AM",
    type: "Plasma Donation",
    status: "Cancelled",
    doctor: "Dr. Priya Singh",
  },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
];

const HOSPITAL_LIST = ["AIIMS New Delhi", "Fortis Hospital Noida", "Medanta Medicity", "Apollo Hospitals Delhi", "Safdarjung Hospital"];

import { ConsentModal } from "@/components/ConsentModal";
import { logAction } from "@/lib/audit";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  const handleBookingConfirm = (signature: string) => {
    // Log the action
    logAction('donor_current', 'Donor', `Booked appointment at ${selectedHospital} (Consented)`, '/dashboard/appointments', { signature });
    setShowConsent(false);
    // Proceed with booking (simulated)
    alert("Appointment booked successfully with legal consent!");
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <Calendar className="w-3 h-3" /> Scheduling &amp; Coordination
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-foreground">APPOINTMENT SYSTEM</h1>
          <p className="text-muted-foreground font-bold italic">Book, manage, and track your donation appointments.</p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedBadge variant="live" pulsing>REAL-TIME</AnimatedBadge>
          <Button
            onClick={() => setActiveTab('book')}
            className="bg-primary hover:bg-red-700 text-white font-black italic tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            <Plus className="w-4 h-4 mr-2" /> BOOK SLOT
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIBlock title="Upcoming" value={APPOINTMENTS.filter(a => ['Confirmed','Pending'].includes(a.status)).length.toString()} icon={Calendar} glowColor="primary" />
        <KPIBlock title="Completed" value={APPOINTMENTS.filter(a => a.status === 'Completed').length.toString()} icon={CheckCircle} glowColor="green" />
        <KPIBlock title="Pending" value={APPOINTMENTS.filter(a => a.status === 'Pending').length.toString()} icon={Clock} glowColor="yellow" />
        <KPIBlock title="Cancelled" value={APPOINTMENTS.filter(a => a.status === 'Cancelled').length.toString()} icon={XCircle} glowColor="red" />
      </div>

      {/* Tab Nav */}
      <div className="flex gap-2 bg-slate-900 border border-white/5 rounded-2xl p-1.5 w-fit">
        {([
          { key: 'list' as const, label: 'My Appointments', icon: Activity },
          { key: 'book' as const, label: 'Book New Slot', icon: Plus },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === t.key ? 'bg-primary text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-slate-400 hover:text-white'}`}
          >
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {activeTab === 'list' && (
        <div className="space-y-4">
          {APPOINTMENTS.map((apt) => (
            <GlowCard key={apt.id} glowColor={apt.status === 'Confirmed' ? 'green' : apt.status === 'Pending' ? 'yellow' : apt.status === 'Cancelled' ? 'red' : 'primary'}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-7 h-7 text-primary fill-primary" />
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-black text-white text-base">{apt.hospital}</h3>
                    <AnimatedBadge
                      variant={apt.status === 'Confirmed' ? 'success' : apt.status === 'Pending' ? 'warning' : apt.status === 'Cancelled' ? 'error' : 'live'}
                      pulsing={apt.status === 'Pending'}
                    >
                      {apt.status}
                    </AnimatedBadge>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" />{apt.date} · {apt.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />{apt.location}</span>
                    <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3 text-primary" />{apt.doctor}</span>
                    <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-primary" />{apt.type}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{apt.id}</p>
                  {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                    <Button variant="outline" size="sm" className="text-red-400 border-red-500/30 hover:bg-red-500/10 font-black italic text-[10px] tracking-widest">
                      CANCEL
                    </Button>
                  )}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      )}

      {activeTab === 'book' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <GlowCard glowColor="primary">
              <h3 className="text-base font-black italic tracking-tight text-white mb-5 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" /> Select Hospital
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HOSPITAL_LIST.map(h => (
                  <button
                    key={h}
                    onClick={() => setSelectedHospital(h)}
                    className={`p-4 rounded-xl text-left text-xs font-bold transition-all border ${selectedHospital === h ? 'bg-primary/15 border-primary/50 text-white' : 'bg-slate-800/40 border-white/5 text-slate-400 hover:border-white/20'}`}
                  >
                    <Building2 className={`w-4 h-4 mb-2 ${selectedHospital === h ? 'text-primary' : 'text-slate-600'}`} />
                    {h}
                  </button>
                ))}
              </div>
            </GlowCard>

            <GlowCard glowColor="blue">
              <h3 className="text-base font-black italic tracking-tight text-white mb-5 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" /> Select Date
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-primary/50 transition-colors"
                min={new Date().toISOString().split('T')[0]}
              />
            </GlowCard>

            <GlowCard glowColor="green">
              <h3 className="text-base font-black italic tracking-tight text-white mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" /> Select Time Slot
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 rounded-xl text-xs font-black tracking-widest transition-all border ${selectedSlot === slot ? 'bg-green-500/15 border-green-500/50 text-green-400' : 'bg-slate-800/40 border-white/5 text-slate-500 hover:border-white/20 hover:text-white'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </GlowCard>
          </div>

          {/* Booking Summary */}
          <div>
            <GlowCard glowColor="primary" className="sticky top-24 bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-neon">
              <h3 className="text-xl font-black italic tracking-tight text-white mb-6 uppercase">Booking Summary</h3>
              <div className="space-y-4 mb-8">
                {([
                  { label: "Hospital", value: selectedHospital || "None selected", icon: Building2, color: "text-primary" },
                  { label: "Date", value: selectedDate || "None selected", icon: Calendar, color: "text-blue-400" },
                  { label: "Time Slot", value: selectedSlot || "None selected", icon: Clock, color: "text-green-400" },
                  { label: "Type", value: "Whole Blood", icon: Droplet, color: "text-primary" },
                ] as const).map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-950/40 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", item.color)} />
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] mb-0.5">{item.label}</p>
                      <p className={cn("font-black text-[13px] truncate italic", item.value === "None selected" ? "text-slate-600" : "text-white")}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                disabled={!selectedHospital || !selectedDate || !selectedSlot}
                className="w-full h-14 bg-primary hover:bg-red-700 text-white font-black italic tracking-widest text-lg shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-20 disabled:grayscale rounded-xl transition-all"
                onClick={() => setShowConsent(true)}
              >
                <CheckCircle className="w-5 h-5 mr-3" /> CONFIRM BOOKING
              </Button>
              {showConsent && (
                <ConsentModal 
                  onAccept={handleBookingConfirm} 
                  onCancel={() => setShowConsent(false)} 
                />
              )}
              <p className="text-[10px] text-slate-500 font-black text-center mt-4 uppercase tracking-widest opacity-60 italic">
                Secure National Health Cloud (NHC) Sync
              </p>
            </GlowCard>
          </div>
        </div>
      )}
    </div>
  );
}
