"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  MapPin, AlertTriangle, Activity, Users,
  TrendingUp, TrendingDown, ShieldCheck, Globe,
  Droplet, BarChart3, Filter
} from 'lucide-react';

const STATES = [
  "All States", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu",
  "Uttar Pradesh", "Gujarat", "Rajasthan", "West Bengal"
];

const DISTRICT_DATA = [
  { state: "Maharashtra", district: "Pune", shortage: "AB-", critLevel: 85, score: 72, status: "Critical", donors: 1240, stock: 12 },
  { state: "Delhi", district: "Gurugram", shortage: "O-", critLevel: 92, score: 61, status: "Critical", donors: 980, stock: 4 },
  { state: "Karnataka", district: "Bengaluru North", shortage: "A-", critLevel: 40, score: 88, status: "Low", donors: 2100, stock: 45 },
  { state: "Tamil Nadu", district: "Chennai", shortage: "B-", critLevel: 28, score: 94, status: "Healthy", donors: 3400, stock: 102 },
  { state: "UP", district: "Lucknow", shortage: "AB+", critLevel: 55, score: 79, status: "Low", donors: 870, stock: 23 },
  { state: "Gujarat", district: "Surat", shortage: "O+", critLevel: 18, score: 97, status: "Healthy", donors: 2800, stock: 178 },
  { state: "Rajasthan", district: "Jaipur", shortage: "A+", critLevel: 62, score: 68, status: "Low", donors: 740, stock: 30 },
  { state: "West Bengal", district: "Kolkata", shortage: "O-", critLevel: 78, score: 55, status: "Critical", donors: 1560, stock: 8 },
];

const STATE_KPI = [
  { state: "Maharashtra", fulfillment: "78%", criticalZones: 4, activeBanks: 28 },
  { state: "Delhi", fulfillment: "63%", criticalZones: 6, activeBanks: 19 },
  { state: "Karnataka", fulfillment: "91%", criticalZones: 1, activeBanks: 34 },
  { state: "Tamil Nadu", fulfillment: "95%", criticalZones: 0, activeBanks: 41 },
];

export default function StateDistrictPage() {
  const [selectedState, setSelectedState] = useState("All States");

  const filtered = selectedState === "All States"
    ? DISTRICT_DATA
    : DISTRICT_DATA.filter(d => d.state === selectedState);

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <Globe className="w-3 h-3" /> State Command Centre
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-foreground">STATE &amp; DISTRICT HUB</h1>
          <p className="text-muted-foreground font-bold italic">Live shortage monitoring across all states &amp; districts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-[200px] bg-slate-900 border-white/10 font-black italic h-11">
              <Filter className="w-4 h-4 mr-2 text-primary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10">
              {STATES.map(s => (
                <SelectItem key={s} value={s} className="font-bold">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AnimatedBadge variant="live" pulsing>LIVE</AnimatedBadge>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIBlock title="Active States" value="15" icon={Globe} glowColor="primary"
          trend={{ value: 2, label: "new onboarded", isPositive: true }} />
        <KPIBlock title="Districts Tracked" value="312" icon={MapPin} glowColor="blue"
          trend={{ value: 8, label: "vs last quarter", isPositive: true }} />
        <KPIBlock title="Critical Zones" value="12" icon={AlertTriangle} glowColor="red"
          trend={{ value: 3, label: "vs yesterday", isPositive: false }} />
        <KPIBlock title="Avg Fulfillment" value="81.4%" icon={Activity} glowColor="green"
          trend={{ value: 1.2, label: "improvement", isPositive: true }} />
      </div>

      {/* State Performance Cards */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" /> State Performance Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATE_KPI.map((s, i) => (
            <div key={i} className="transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              <GlowCard glowColor={s.criticalZones === 0 ? "green" : s.criticalZones > 3 ? "red" : "yellow"}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{s.state}</p>
                <p className="text-2xl font-black italic tracking-tighter text-white">{s.fulfillment}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Fulfillment Rate</p>
                <div className="mt-3 flex justify-between text-[10px] font-black uppercase">
                  <span className="text-orange-400">{s.criticalZones} Critical Zones</span>
                  <span className="text-blue-400">{s.activeBanks} Banks</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all"
                    style={{ width: s.fulfillment }}
                  />
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>

      {/* District Data Table */}
      <GlowCard glowColor="primary" className="p-0">
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-xl font-black italic">District Shortage Intelligence</CardTitle>
            <CardDescription>Real-time criticality index across all monitored districts.</CardDescription>
          </div>
          <Button variant="outline" className="border-primary/30 text-primary font-black italic text-xs tracking-widest hover:bg-primary hover:text-white transition-all">
            <ShieldCheck className="w-4 h-4 mr-2" /> EXPORT REPORT
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-900/50">
              <TableRow className="border-white/5 hover:bg-transparent">
                {["State", "District", "Shortage Type", "Criticality", "Performance Score", "Donors", "Stock (Units)", "Status"].map(h => (
                  <TableHead key={h} className="text-[9px] font-black uppercase tracking-widest text-slate-500">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-bold text-slate-300 text-xs">{row.state}</TableCell>
                  <TableCell className="font-black text-white text-sm">{row.district}</TableCell>
                  <TableCell>
                    <Badge className="bg-primary/10 text-primary border border-primary/30 font-black text-[10px]">
                      <Droplet className="w-2 h-2 mr-1" />{row.shortage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 min-w-[100px]">
                      <span className={`text-[10px] font-black ${row.critLevel > 70 ? 'text-red-500' : row.critLevel > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {row.critLevel}%
                      </span>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${row.critLevel > 70 ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]' : row.critLevel > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${row.critLevel}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {row.score > 79 ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className="font-black text-white text-sm">{row.score}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-400 text-xs flex items-center gap-1">
                    <Users className="w-3 h-3" />{row.donors.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-black text-white">{row.stock} u.</TableCell>
                  <TableCell>
                    <AnimatedBadge
                      variant={row.status === 'Healthy' ? 'success' : row.status === 'Low' ? 'warning' : 'error'}
                      pulsing={row.status === 'Critical'}
                    >
                      {row.status}
                    </AnimatedBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </GlowCard>
    </div>
  );
}
