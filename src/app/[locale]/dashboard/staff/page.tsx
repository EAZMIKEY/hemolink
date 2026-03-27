"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  Users, UserPlus, ShieldCheck, 
  Search, Filter, Mail, Phone,
  MapPin, Briefcase, Clock, ShieldAlert,
  MoreVertical, ChevronRight, CheckCircle2, Building2, Activity
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STAFF = [
  { id: "ST-001", name: "Dr. Ananya Iyer", role: "Chief Medical Officer", facility: "National Blood Center", status: "Active", access: "National Admin" },
  { id: "ST-002", name: "Rahul Deshmukh", role: "Senior Technician", facility: "Fortis Noida Bank", status: "On Leave", access: "Lab Technician" },
  { id: "ST-003", name: "Sarah Khan", role: "Field Coordinator", facility: "Red Cross Delhi", status: "Active", access: "Volunteer" },
  { id: "ST-004", name: "Vikram Malhotra", role: "IT Security", facility: "NHC Data Center", status: "Active", access: "District Admin" },
];

export default function StaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = STAFF.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="STAFF COMMAND CENTER" 
        subtitle="Manage national medical personnel, assign access hierarchies, and track field coordination." 
      />

      {/* Staff Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <KPIBlock title="Total Staff" value="8,421" icon={Users} glowColor="primary" />
        <KPIBlock title="Active Now" value="3,102" icon={Activity} glowColor="green" />
        <KPIBlock title="Access Requests" value="12" icon={ShieldAlert} glowColor="yellow" />
        <KPIBlock title="Verified IDs" value="100%" icon={ShieldCheck} glowColor="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <GlowCard glowColor="primary" className="p-6 bg-slate-900/60 backdrop-blur-xl border-white/10">
             <h3 className="text-sm font-black italic tracking-widest text-slate-500 mb-6 uppercase">Admin Controls</h3>
             <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">Personnel Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text"
                      placeholder="Name, Role, or ID..."
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-white focus:border-primary transition-all outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
               </div>
               <Button className="w-full h-12 bg-primary hover:bg-red-700 text-white text-[10px] font-black italic tracking-widest rounded-xl shadow-neon uppercase">
                  <UserPlus className="w-4 h-4 mr-2" /> Onboard New Staff
               </Button>
               <Button variant="outline" className="w-full h-12 border-white/10 text-white text-[10px] font-black italic tracking-widest rounded-xl hover:bg-white/5 uppercase">
                  <ShieldCheck className="w-4 h-4 mr-2 text-primary" /> RBAC Matrix Edit
               </Button>
             </div>
          </GlowCard>

          <GlowCard glowColor="primary" className="p-6 bg-slate-900/40 border-white/10">
             <h3 className="text-sm font-black italic tracking-widest text-slate-500 mb-4 uppercase">Hierarchy Overview</h3>
             <div className="space-y-3">
                {[
                  { label: "National Admin", count: 12 },
                  { label: "State Admin", count: 48 },
                  { label: "Blood Bank Admin", count: 420 },
                  { label: "Lab Technician", count: 1840 },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-slate-400">{r.label}</span>
                    <span className="text-white px-2 py-0.5 bg-white/5 rounded-lg border border-white/5">{r.count}</span>
                  </div>
                ))}
             </div>
          </GlowCard>
        </div>

        {/* Staff Table */}
        <div className="lg:col-span-3">
           <GlowCard glowColor="primary" className="overflow-hidden bg-slate-900/40 backdrop-blur-xl border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-slate-950/40">
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Personnel / ID</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Designation</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Access Tier</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                      <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-transparent">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStaff.map((s) => (
                      <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-5 whitespace-nowrap">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/50 transition-all font-black text-slate-400 group-hover:text-primary">
                                 <Building2 className="w-4 h-4" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-white italic group-hover:text-primary transition-colors">{s.name}</p>
                                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.id}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                           <div className="flex flex-col">
                              <span className="text-[11px] font-bold text-slate-300">{s.role}</span>
                              <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                 <MapPin className="w-2.5 h-2.5 text-primary" /> {s.facility}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                           <span className="text-[10px] font-black px-2 py-0.5 border border-blue-500/30 text-blue-400 bg-blue-500/5 rounded uppercase tracking-widest">
                              {s.access}
                           </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                           <AnimatedBadge variant={s.status === 'Active' ? 'success' : 'warning'}>
                              {s.status}
                           </AnimatedBadge>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                           <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-white">
                              <MoreVertical className="w-4 h-4" />
                           </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </GlowCard>
        </div>
      </div>
    </div>
  );
}

