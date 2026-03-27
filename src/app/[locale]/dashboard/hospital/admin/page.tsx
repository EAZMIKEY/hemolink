"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Settings, PieChart, Users, Package, 
  FileText, ShieldCheck, Mail, Phone, ArrowUpRight,
  TrendingUp, TrendingDown, Clock, Search, Droplet, AlertCircle
} from 'lucide-react';
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { StatusChip } from "@/components/ui/StatusChip";

const MOCK_STOCK = [
  { group: "A+", units: 145, status: "Healthy", trend: "up" },
  { group: "A-", units: 12, status: "Low", trend: "down" },
  { group: "B+", units: 89, status: "Healthy", trend: "up" },
  { group: "B-", units: 5, status: "Critical", trend: "down" },
  { group: "O+", units: 210, status: "Healthy", trend: "up" },
  { group: "O-", units: 2, status: "Critical", trend: "down" },
  { group: "AB+", units: 45, status: "Low", trend: "up" },
  { group: "AB-", units: 8, status: "Low", trend: "down" },
];

export default function HospitalAdminPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-foreground mb-1">HOSPITAL OPERATIONS</h1>
          <p className="text-muted-foreground font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> Professional Healthcare Management Panel
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-2 font-black italic tracking-widest"><FileText className="w-4 h-4 mr-2" /> AUDIT LOGS</Button>
          <Button className="bg-primary hover:bg-black text-white font-black italic tracking-widest shadow-xl shadow-primary/20 transition-all"><Plus className="w-4 h-4 mr-2" /> NEW CASE</Button>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <KPIBlock title="Blood Bags" value={MOCK_STOCK.reduce((a, b) => a + b.units, 0).toString()} icon={Droplet} glowColor="primary" />
        <KPIBlock title="Critical Stock" value={MOCK_STOCK.filter(s => s.status === 'Critical').length.toString()} icon={AlertCircle} glowColor="red" />
        <KPIBlock title="Total Staff" value="14" icon={Users} glowColor="blue" />
        <KPIBlock title="Requests Today" value="7" icon={Package} glowColor="yellow" />
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-slate-900 border border-white/10 p-1 rounded-2xl h-14 mb-8">
          <TabsTrigger value="inventory" className="px-8 font-black italic tracking-widest rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all h-full">INVENTORY</TabsTrigger>
          <TabsTrigger value="staff" className="px-8 font-black italic tracking-widest rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all h-full">STAFF</TabsTrigger>
          <TabsTrigger value="logs" className="px-8 font-black italic tracking-widest rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all h-full">COMMUNICATION</TabsTrigger>
        </TabsList>


        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {MOCK_STOCK.map((item) => (
              <GlowCard key={item.group} glowColor={item.status === 'Healthy' ? 'green' : item.status === 'Low' ? 'yellow' : 'red'} className="group cursor-default">
                <div className="flex justify-between items-center mb-4">
                    <span className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl font-black text-white group-hover:bg-primary transition-colors">
                      {item.group}
                    </span>
                    <AnimatedBadge 
                      variant={item.status === 'Healthy' ? 'success' : item.status === 'Low' ? 'warning' : 'error'}
                      pulsing={item.status === 'Critical'}
                    >
                      {item.status}
                    </AnimatedBadge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-end">
                      <span className="text-3xl font-black text-white">{item.units}</span>
                      <span className={item.trend === 'up' ? 'text-green-500 flex items-center text-[10px] font-bold' : 'text-red-500 flex items-center text-[10px] font-bold'}>
                        {item.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {Math.floor(Math.random() * 10)}%
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Units Available</p>
                  </div>
              </GlowCard>
            ))}
          </div>

          <GlowCard glowColor="primary" className="p-0">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-xl font-black italic">Recent Inventory Logs</CardTitle>
                   <CardDescription>Real-time audit of blood movements.</CardDescription>
                </div>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                   <Input placeholder="Search logs..." className="pl-10 h-9 bg-slate-900 border-white/10 w-[250px]" />
                </div>
             </CardHeader>
             <CardContent>
                <Table>
                   <TableHeader className="bg-slate-900/50">
                      <TableRow className="border-white/5 font-black uppercase text-[10px] tracking-widest hover:bg-transparent">
                         <TableHead>Event Type</TableHead>
                         <TableHead>Group</TableHead>
                         <TableHead>Units</TableHead>
                         <TableHead>Admin</TableHead>
                         <TableHead>Time</TableHead>
                         <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {[1,2,3,4].map((i) => (
                        <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                           <TableCell className="font-bold flex items-center gap-2">
                             <ArrowUpRight className="w-3 h-3 text-green-500" /> INWARD_BATCH 
                           </TableCell>
                           <TableCell><Badge className="bg-slate-800">O+</Badge></TableCell>
                           <TableCell className="font-black text-white">40 Units</TableCell>
                           <TableCell className="text-slate-400 font-bold">Admin-04</TableCell>
                           <TableCell className="text-slate-500 italic">22 min ago</TableCell>
                           <TableCell className="text-right">
                               <StatusChip status="active" label="CONFIRMED" />
                            </TableCell>
                        </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </CardContent>
          </GlowCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
