"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  Activity, Server, Globe, Zap, 
  ShieldCheck, AlertCircle, BarChart3,
  Clock, Cpu, Network
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { cn } from "@/lib/utils";

const MONITOR_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 500) + 1000,
  latency: Math.floor(Math.random() * 50) + 20,
  errors: Math.floor(Math.random() * 5),
}));

export default function APIMonitorPage() {
  const [data, setData] = useState(MONITOR_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const next = [...prev.slice(1), {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          requests: Math.floor(Math.random() * 500) + 1000,
          latency: Math.floor(Math.random() * 50) + 20,
          errors: Math.floor(Math.random() * 5),
        }];
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="NATIONAL API MONITORING HUB" 
        subtitle="Real-time request metrics, automated throttling logs, and endpoint health grid." 
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <KPIBlock title="Total Requests" value="1.2M" icon={Globe} glowColor="primary" />
        <KPIBlock title="Avg Latency" value="42ms" icon={Zap} glowColor="green" />
        <KPIBlock title="Error Rate" value="0.04%" icon={AlertCircle} glowColor="red" />
        <KPIBlock title="Health Score" value="99.9" icon={ShieldCheck} glowColor="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Requests Chart */}
        <GlowCard glowColor="primary" className="p-6 bg-slate-900/40 backdrop-blur-xl border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black italic tracking-widest text-slate-500 uppercase">Throughput (RPM)</h3>
            <AnimatedBadge variant="live" pulsing>Live Traffic</AnimatedBadge>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#ef4444', fontSize: '12px', fontWeight: '900' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#ef4444" fillOpacity={1} fill="url(#colorRequests)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        {/* Latency Chart */}
        <GlowCard glowColor="blue" className="p-6 bg-slate-900/40 backdrop-blur-xl border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black italic tracking-widest text-slate-500 uppercase">Latency Pulse (ms)</h3>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Optimized Grid</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                   itemStyle={{ color: '#3b82f6', fontSize: '12px', fontWeight: '900' }}
                />
                <Line type="stepAfter" dataKey="latency" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>
      </div>

      {/* Endpoint Table */}
      <GlowCard glowColor="primary" className="overflow-hidden bg-slate-900/40 backdrop-blur-xl border-white/10">
        <div className="p-6 border-b border-white/5 bg-slate-950/20">
          <h3 className="text-lg font-black italic tracking-tight text-white uppercase">System Integration Health</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/40">
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Service Node</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Method</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Route</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Health</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[12px] font-bold">
              {[
                { node: "National Search", method: "GET", route: "/api/national/search", health: "99.9%", status: "success", load: "High" },
                { node: "Donor Verification", method: "POST", route: "/api/national/verify", health: "98.2%", status: "success", load: "Med" },
                { node: "FHIR Dispatch Hub", method: "PUT", route: "/api/national/fhir", health: "100%", status: "success", load: "Low" },
                { node: "Biometric Auth", method: "POST", route: "/api/biometric/scan", health: "94.5%", status: "warning", load: "High" },
                { node: "Stock Real-sync", method: "PATCH", route: "/api/national/stock", health: "99.1%", status: "success", load: "Med" },
              ].map((s, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap uppercase tracking-tight text-slate-300 font-black">{s.node}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 rounded border tracking-widest",
                      s.method === 'GET' ? 'text-blue-400 border-blue-400/30' :
                      s.method === 'POST' ? 'text-green-400 border-green-400/30' : 'text-purple-400 border-purple-400/30'
                    )}>{s.method}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap font-mono text-slate-500 ">{s.route}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <span className={cn("w-2 h-2 rounded-full", s.status === 'success' ? 'bg-green-500' : 'bg-yellow-500')} />
                       <span className="text-white font-black">{s.health}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right whitespace-nowrap text-slate-400 font-black italic">{s.load}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </div>
  );
}
