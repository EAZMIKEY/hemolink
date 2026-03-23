"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, Heart, AlertTriangle, 
  Globe, Activity, ShieldCheck, Zap 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DEMAND_DATA = [
  { month: 'Jan', demand: 400, supply: 240 },
  { month: 'Feb', demand: 300, supply: 139 },
  { month: 'Mar', demand: 200, supply: 980 },
  { month: 'Apr', demand: 278, supply: 390 },
  { month: 'May', demand: 189, supply: 480 },
  { month: 'Jun', demand: 239, supply: 380 },
];

const GROUP_DISTRIBUTION = [
  { name: 'O+', value: 400 },
  { name: 'A+', value: 300 },
  { name: 'B+', value: 300 },
  { name: 'AB+', value: 200 },
];

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b'];

export default function AnalyticsDashboard() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <Globe className="w-3 h-3" /> Ministry of Health Intelligence
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-foreground">NATIONAL ANALYTICS</h1>
          <p className="text-muted-foreground font-bold italic">Real-time supply & demand monitoring across 15 states.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-2xl border border-white/5">
           <div className="text-right">
              <p className="text-[10px] text-slate-500 font-black uppercase">Platform Health</p>
              <p className="text-xs font-black text-green-500">OPTIMAL / 99.9% OSC</p>
           </div>
           <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Lives Saved Net", value: "142,502", icon: Heart, color: "text-primary" },
          { label: "Active Donors", value: "85.2K", icon: Users, color: "text-blue-500" },
          { label: "Fulfillment Rate", value: "92.4%", icon: Activity, color: "text-green-500" },
          { label: "Critical Shortage", value: "12 Areas", icon: AlertTriangle, color: "text-orange-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-white/5 hover:border-primary/20 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-black italic tracking-tighter">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-slate-900/80 border-white/5 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-black italic tracking-tight">Demand vs Supply Trends</CardTitle>
            <CardDescription>Monthly aggregates for verified network nodes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMAND_DATA}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} fontStyle="italic" />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="demand" stroke="#ef4444" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={3} />
                  <Area type="monotone" dataKey="supply" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-white/5">
          <CardHeader>
            <CardTitle className="text-xl font-black italic tracking-tight">Blood Group Inventory Mix</CardTitle>
            <CardDescription>Global distribution across all certified banks.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={GROUP_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {GROUP_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black italic">14 States</span>
                <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Monitored</span>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <Card className="bg-red-500/5 border-red-500/20 col-span-1 lg:col-span-2">
            <CardHeader>
               <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-black italic">Critical Shortage Heatmap Data</CardTitle>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {[
                    { state: "Maharashtra", shortage: "AB-", level: 85, city: "Pune" },
                    { state: "Delhi NCR", shortage: "O-", level: 92, city: "Gurugram" },
                    { state: "Karnataka", shortage: "A-", level: 40, city: "Bengaluru" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-900 border border-white/5">
                       <div className="flex justify-between items-center text-[10px] font-black tracking-widest">
                          <span className="italic">{s.state} · {s.city}</span>
                          <span className="text-primary">{s.level}% CRITICALITY</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-primary shadow-[0_0_10px_rgba(239,68,68,0.5)]`} style={{ width: `${s.level}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="bg-slate-900 border-white/5">
            <CardHeader>
               <CardTitle className="text-lg font-black italic">Security & Audit Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-slate-800/20">
                  <ShieldCheck className="w-8 h-8 text-blue-400 opacity-50" />
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Verification Rate</p>
                    <p className="text-lg font-black tracking-tighter italic">98.2% Aadhaar Verified</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-slate-800/20">
                  <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Retention Rate</p>
                    <p className="text-lg font-black tracking-tighter italic">64% Recurring Donors</p>
                  </div>
               </div>
               <Badge className="w-full bg-slate-800 text-slate-400 cursor-not-allowed border-white/10 font-black italic tracking-widest py-2">
                 DOWNLOAD MINISTRY REPORT (PDF)
               </Badge>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
