"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { 
  Bell, MessageSquare, ShieldCheck, 
  Globe, Database, Lock, Settings,
  CheckCircle2, AlertCircle
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="ADMINISTRATION SETTINGS" 
        subtitle="Global governance configuration, communication protocols, and security audits." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Notification Settings */}
        <GlowCard glowColor="primary" className="p-8 bg-slate-900/60 border-white/10">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                 <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-black italic tracking-tight text-white uppercase italic">National Alert Protocols</h3>
           </div>

           <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div>
                    <p className="text-sm font-black text-white italic uppercase tracking-wider">SMS Emergency Alerts</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Direct SMS to critical donors & hospitals</p>
                 </div>
                 <Button 
                   onClick={() => setSmsEnabled(!smsEnabled)}
                   className={smsEnabled ? "bg-primary text-white" : "bg-slate-800 text-slate-500"}
                 >
                    {smsEnabled ? 'ENABLED' : 'DISABLED'}
                 </Button>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div>
                    <p className="text-sm font-black text-white italic uppercase tracking-wider">WhatsApp Grid Integration</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Broadcast emergencies via WhatsApp Business</p>
                 </div>
                 <Button 
                   onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                   className={whatsappEnabled ? "bg-green-600 text-white" : "bg-slate-800 text-slate-500"}
                 >
                    {whatsappEnabled ? 'ENABLED' : 'DISABLED'}
                 </Button>
              </div>
           </div>
        </GlowCard>

        {/* Security & Access */}
        <GlowCard glowColor="primary" className="p-8 bg-slate-900/40 border-white/10">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                 <ShieldCheck className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-black italic tracking-tight text-white uppercase italic">Access Control (RBAC)</h3>
           </div>

           <div className="space-y-4">
              <Button variant="outline" className="w-full h-14 border-white/10 text-white text-[10px] font-black italic tracking-widest rounded-2xl hover:bg-white/5 flex items-center justify-between px-6">
                 <span>MANAGE HIERARCHY ROLES</span>
                 <Database className="w-5 h-5 text-primary" />
              </Button>
              <Button variant="outline" className="w-full h-14 border-white/10 text-white text-[10px] font-black italic tracking-widest rounded-2xl hover:bg-white/5 flex items-center justify-between px-6">
                 <span>VIEW SECURITY AUDIT TRAIL</span>
                 <Lock className="w-5 h-5 text-primary" />
              </Button>
           </div>
        </GlowCard>
      </div>
    </div>
  );
}
