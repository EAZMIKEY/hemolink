"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  ShieldAlert, History as Auditing, User, Activity, 
  Search, Filter, Clock, Download, ExternalLink,
  Lock, LogIn, Database, AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { getAuditLogs, AuditLog } from "@/lib/audit";
import { seedAuditLogs } from "@/lib/seed";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    seedAuditLogs();
    setLogs(getAuditLogs());
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLogIcon = (action: string) => {
    if (action.includes("login") || action.includes("logout")) return LogIn;
    if (action.includes("screening")) return Activity;
    if (action.includes("emergency")) return AlertCircle;
    if (action.includes("stock")) return Database;
    return Auditing;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="NATIONAL AUDIT REGISTRY" 
        subtitle="Government-grade immutable action logs and system access trail." 
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <KPIBlock title="Total Events" value={logs.length.toString()} icon={Auditing} glowColor="primary" />
        <KPIBlock title="Security Alerts" value="00" icon={ShieldAlert} glowColor="red" />
        <KPIBlock title="Active Admins" value="12" icon={User} glowColor="green" />
        <KPIBlock title="System Pulse" value="Healthy" icon={Activity} glowColor="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <GlowCard glowColor="primary" className="p-6 bg-slate-900/60 backdrop-blur-xl border-white/10">
            <h3 className="text-sm font-black italic tracking-widest text-slate-500 mb-6 uppercase">Control Center</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">Search Registry</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text"
                    placeholder="User, Role, or Action..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-white focus:border-primary/50 transition-all outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start text-[10px] font-black italic tracking-widest border-white/5 hover:bg-white/5">
                  <Filter className="w-3.5 h-3.5 mr-2 text-primary" /> FILTER BY ROLE
                </Button>
                <Button variant="outline" className="w-full justify-start text-[10px] font-black italic tracking-widest border-white/5 hover:bg-white/5">
                  <Clock className="w-3.5 h-3.5 mr-2 text-blue-400" /> DATE RANGE
                </Button>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black italic tracking-widest rounded-xl transition-all">
                  <Download className="w-3.5 h-3.5 mr-2" /> EXPORT AUDIT BUNDLE
                </Button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase text-primary tracking-widest">Signed Log</span>
              </div>
              <p className="text-[9px] text-slate-400 font-bold leading-relaxed italic">
                All records are cryptographically signed and stored in compliance with National Digital Health standards.
              </p>
            </div>
          </GlowCard>
        </div>

        {/* Audit Timeline */}
        <div className="lg:col-span-3">
          <GlowCard glowColor="primary" className="overflow-hidden bg-slate-900/40 backdrop-blur-xl border-white/10">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-black italic tracking-tight text-white uppercase">Primary Event Stream</h3>
              <AnimatedBadge variant="success" pulsing>LIVE FEED: SYNCED</AnimatedBadge>
            </div>

            <div className="overflow-x-auto">
              {filteredLogs.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-slate-950/40">
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Timestamp</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Principal</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Action/Event</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Role</th>
                      <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLogs.map((log) => {
                      const Icon = getLogIcon(log.action.toLowerCase());
                      return (
                        <tr key={log.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-5 whitespace-nowrap">
                            <p className="text-[11px] font-black text-white tracking-widest">{new Date(log.timestamp).toLocaleDateString()}</p>
                            <p className="text-[9px] font-bold text-slate-500 italic uppercase">{new Date(log.timestamp).toLocaleTimeString()}</p>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                <User className="w-3 h-3 text-slate-400" />
                              </div>
                              <span className="text-xs font-black text-slate-300 uppercase tracking-tight">{log.userId}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4 text-primary" />
                              <span className="text-[13px] font-black text-white italic truncate max-w-[200px]">{log.action}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className={cn(
                              "text-[10px] font-black px-2.5 py-1 rounded-md uppercase border tracking-widest",
                              log.role.includes("Admin") ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-800 text-slate-400 border-white/5"
                            )}>
                              {log.role}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right whitespace-nowrap">
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/20 text-slate-500 hover:text-primary transition-all rounded-lg">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="py-24 text-center">
                  <Auditing className="w-12 h-12 text-slate-800 mx-auto mb-4 opacity-20" />
                  <p className="text-slate-500 font-black italic uppercase tracking-widest">No matching logs found in registry</p>
                </div>
              )}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
