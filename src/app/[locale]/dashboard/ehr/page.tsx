"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  Activity, FileText, Stethoscope, ShieldCheck,
  Calendar, User, Droplet, FlaskConical,
  CheckCircle, XCircle, AlertTriangle, Download,
  Heart, Clock, ArrowRight, ClipboardList
} from 'lucide-react';

const FHIR_EVENTS = [
  {
    date: "2026-03-10",
    time: "09:15 AM",
    type: "Transfusion",
    title: "Blood Transfusion – O+ (350ml)",
    location: "AIIMS, Theatre Block 4",
    result: "PASS",
    doctor: "Dr. Ravi Sharma",
    notes: "Pre-surgical preparation. Patient stable post-transfusion.",
    fhirId: "FHIR-TRF-2026-0891",
  },
  {
    date: "2026-02-28",
    time: "11:30 AM",
    type: "Screening",
    title: "TTI Screening – Full Panel",
    location: "AIIMS Blood Centre, Delhi",
    result: "PASS",
    doctor: "Dr. Meena Kapoor",
    notes: "HIV, HBsAg, HCV, VDRL all negative. Cleared for donation.",
    fhirId: "FHIR-SCR-2026-0741",
  },
  {
    date: "2026-01-15",
    time: "2:45 PM",
    type: "Deferral",
    title: "Temporary Deferral – Low Hemoglobin",
    location: "Fortis Hospital, Noida",
    result: "FAIL",
    doctor: "Dr. Anand Gupta",
    notes: "Hb level: 11.2 g/dL. Recommended iron supplementation for 8 weeks.",
    fhirId: "FHIR-DEF-2026-0312",
  },
  {
    date: "2025-11-20",
    time: "10:00 AM",
    type: "Donation",
    title: "Whole Blood Donation (450ml)",
    location: "Tata Memorial Blood Bank, Mumbai",
    result: "PASS",
    doctor: "Dr. Priya Singh",
    notes: "Successful collection. Components: PRBC, Platelets, Plasma separated.",
    fhirId: "FHIR-DON-2025-1122",
  },
  {
    date: "2025-08-05",
    time: "9:30 AM",
    type: "Screening",
    title: "Pre-Donation Eligibility Check",
    location: "Apollo Blood Bank, Chennai",
    result: "PASS",
    doctor: "Dr. Ramesh Naidu",
    notes: "All vitals normal. BP: 120/78. Pulse: 74 bpm. Cleared for donation.",
    fhirId: "FHIR-SCR-2025-0889",
  },
];

const PATIENT_RECORD = {
  id: "PAT-2024-00192",
  name: "Registered Donor",
  bloodType: "O+",
  dob: "1992-07-14",
  allergies: "None Reported",
  chronicConditions: "None",
  lastDonation: "2025-11-20",
  fhirVersion: "R4",
  aadhaarVerified: true,
  totalDonations: 4,
};

export default function EHRPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof FHIR_EVENTS[0] | null>(null);

  const typeIcon = (type: string) => {
    if (type === 'Transfusion') return <Heart className="w-4 h-4" />;
    if (type === 'Screening') return <FlaskConical className="w-4 h-4" />;
    if (type === 'Deferral') return <AlertTriangle className="w-4 h-4" />;
    return <Droplet className="w-4 h-4" />;
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <FileText className="w-3 h-3" /> FHIR R4 Compliant · Ministry of Health
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-foreground">EHR · FHIR RECORDS</h1>
          <p className="text-muted-foreground font-bold italic">Electronic health &amp; donation records, FHIR R4 compatible.</p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedBadge variant="success" pulsing>FHIR R4</AnimatedBadge>
          <Button className="bg-primary hover:bg-red-700 text-white font-black italic tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <Download className="w-4 h-4 mr-2" /> DOWNLOAD FHIR BUNDLE
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIBlock title="Total Records" value={FHIR_EVENTS.length.toString()} icon={ClipboardList} glowColor="primary" />
        <KPIBlock title="Passed Events" value={FHIR_EVENTS.filter(e => e.result === 'PASS').length.toString()} icon={CheckCircle} glowColor="green" />
        <KPIBlock title="Deferrals" value={FHIR_EVENTS.filter(e => e.type === 'Deferral').length.toString()} icon={XCircle} glowColor="red" />
        <KPIBlock title="Donations" value={FHIR_EVENTS.filter(e => e.type === 'Donation').length.toString()} icon={Heart} glowColor="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Record Card */}
        <div className="space-y-6">
          <GlowCard glowColor="primary">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{PATIENT_RECORD.id}</p>
                <p className="font-black text-white text-lg italic">{PATIENT_RECORD.name}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Blood Type", value: PATIENT_RECORD.bloodType, highlight: true },
                { label: "Date of Birth", value: PATIENT_RECORD.dob },
                { label: "Allergies", value: PATIENT_RECORD.allergies },
                { label: "Chronic Conditions", value: PATIENT_RECORD.chronicConditions },
                { label: "Total Donations", value: `${PATIENT_RECORD.totalDonations} verified` },
                { label: "FHIR Version", value: PATIENT_RECORD.fhirVersion },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{item.label}</span>
                  <span className={`font-black text-xs ${item.highlight ? 'text-primary' : 'text-white'}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Aadhaar Verification</p>
                <p className="text-xs font-black text-green-400">Verified · Gov-Compliant</p>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* FHIR Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Medical Event Timeline
          </h2>
          {FHIR_EVENTS.map((event, i) => (
            <div
              key={i}
              className={`relative cursor-pointer transition-all duration-200 ${selectedEvent?.fhirId === event.fhirId ? 'scale-[1.01]' : ''}`}
              onClick={() => setSelectedEvent(selectedEvent?.fhirId === event.fhirId ? null : event)}
            >
              <GlowCard glowColor={event.result === 'PASS' ? 'green' : 'red'} className="py-4">
                <div className="flex items-start gap-4">
                  {/* Result Indicator */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${event.result === 'PASS' ? 'bg-green-500/15 border border-green-500/40 shadow-[0_0_12px_rgba(34,197,94,0.25)]' : 'bg-red-500/15 border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.25)]'}`}>
                    {event.result === 'PASS'
                      ? <CheckCircle className="w-6 h-6 text-green-500" />
                      : <XCircle className="w-6 h-6 text-red-500" />
                    }
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <Badge className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 ${event.result === 'PASS' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                        {typeIcon(event.type)}<span className="ml-1">{event.type}</span>
                      </Badge>
                      <Badge className={`text-[9px] font-black ${event.result === 'PASS' ? 'text-green-500' : 'text-red-500'}`}>
                        {event.result}
                      </Badge>
                    </div>
                    <p className="font-black text-white text-sm mb-1">{event.title}</p>
                    <div className="flex flex-wrap gap-x-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date} · {event.time}</span>
                      <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" />{event.doctor}</span>
                    </div>
                    {selectedEvent?.fhirId === event.fhirId && (
                      <div className="mt-3 p-3 bg-slate-800/60 rounded-xl border border-white/5">
                        <p className="text-xs font-bold text-slate-300 leading-relaxed">{event.notes}</p>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-2">{event.fhirId} · {event.location}</p>
                      </div>
                    )}
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-600 flex-shrink-0 mt-1 transition-transform ${selectedEvent?.fhirId === event.fhirId ? 'rotate-90' : ''}`} />
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
