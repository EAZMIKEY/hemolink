"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  Building2, ShieldCheck, FileText, 
  Search, Filter, CheckCircle2, XCircle,
  Clock, ExternalLink, MoreVertical,
  MapPin, Phone
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HOSPITALS = [
  { 
    id: "HOSP-201", 
    name: "City Care Super Specialty", 
    type: "L1 Hospital", 
    location: "South Delhi", 
    status: "Pending",
    license: "DL-HOSP-2023-8841",
    appliedDate: "2026-03-20"
  },
  { 
    id: "HOSP-188", 
    name: "LifeLine Blood Bank", 
    type: "Blood Bank", 
    location: "Gurugram, Sector 44", 
    status: "Verified",
    license: "HR-BB-2022-1102",
    appliedDate: "2026-02-15"
  },
  { 
    id: "HOSP-205", 
    name: "Metropolitan Trauma Hub", 
    type: "L1 Hospital", 
    location: "Dwarka, Delhi", 
    status: "Suspended",
    license: "DL-HOSP-2024-0019",
    appliedDate: "2026-03-21"
  },
  { 
    id: "HOSP-194", 
    name: "Global Biotech Lab", 
    type: "Component Lab", 
    location: "Noida, UP", 
    status: "Pending",
    license: "UP-LAB-2023-5521",
    appliedDate: "2026-03-18"
  }
];

export default function HospitalVerificationPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHospitals = HOSPITALS.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="FACILITY VERIFICATION" 
        subtitle="Manage licenses, regulatory approvals, and trust status of medical entities." 
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <KPIBlock title="Total Entities" value="1,240" icon={Building2} glowColor="primary" />
        <KPIBlock title="Verified Grid" value="1,192" icon={ShieldCheck} glowColor="green" />
        <KPIBlock title="Awaiting" value="34" icon={Clock} glowColor="yellow" />
        <KPIBlock title="Denied/Susp" value="14" icon={XCircle} glowColor="red" />
      </div>

      <div className="space-y-6">
        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/40 p-4 rounded-3xl border border-white/5 backdrop-blur-xl">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search by Name or License..."
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white focus:border-primary transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex gap-2">
              <Button variant="ghost" className="text-[10px] font-black italic tracking-widest text-primary bg-primary/10 rounded-xl px-6">ALL</Button>
              <Button variant="ghost" className="text-[10px] font-black italic tracking-widest text-slate-500 hover:text-white rounded-xl px-6">PENDING</Button>
              <Button variant="ghost" className="text-[10px] font-black italic tracking-widest text-slate-500 hover:text-white rounded-xl px-6">VERIFIED</Button>
           </div>
        </div>

        {/* Hospital Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredHospitals.map((h) => (
             <GlowCard key={h.id} glowColor={h.status === 'Verified' ? 'green' : h.status === 'Suspended' ? 'red' : 'primary'} className="group bg-slate-900/40 backdrop-blur-xl border-white/10 overflow-hidden">
                <div className="p-6">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                         <Building2 className="w-7 h-7 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <AnimatedBadge variant={h.status === 'Verified' ? 'success' : h.status === 'Suspended' ? 'error' : 'warning'}>
                         {h.status}
                      </AnimatedBadge>
                   </div>

                   <h3 className="text-xl font-black italic tracking-tight text-white uppercase group-hover:text-primary transition-colors truncate">
                      {h.name}
                   </h3>
                   <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">{h.type}</div>

                   <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                         <MapPin className="w-3.5 h-3.5 text-primary" /> {h.location}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                         <FileText className="w-3.5 h-3.5 text-slate-500" /> License: {h.license}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 italic">
                         <Clock className="w-3.5 h-3.5" /> Applied: {h.appliedDate}
                      </div>
                   </div>

                   <div className="flex gap-2 pt-4 border-t border-white/5">
                      <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black italic tracking-widest h-10 rounded-xl">
                         DOCUMENTS
                      </Button>
                      <Button className={cn(
                        "flex-1 text-[10px] font-black italic tracking-widest h-10 rounded-xl",
                        h.status === 'Verified' ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30" : "bg-primary text-white hover:bg-red-700 shadow-neon"
                      )}>
                         {h.status === 'Verified' ? 'REVOKE' : 'APPROVE'}
                      </Button>
                   </div>
                </div>
             </GlowCard>
           ))}

           {/* Add New Facility */}
           <GlowCard glowColor="primary" className="flex flex-col bg-slate-900/20 border-white/5 border-dashed border-2 justify-center items-center p-12 text-center group hover:bg-white/5 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Building2 className="w-8 h-8 text-slate-600 group-hover:text-white" />
              </div>
              <h3 className="text-sm font-black italic text-slate-500 uppercase tracking-widest group-hover:text-white">Onboard New Facility</h3>
              <p className="text-[10px] text-slate-600 font-bold mt-2 uppercase">National Regulatory Integration</p>
           </GlowCard>
        </div>
      </div>
    </div>
  );
}
