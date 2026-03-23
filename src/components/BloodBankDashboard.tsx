"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Droplet, AlertCircle, TrendingUp, Package,
  RefreshCw, ArrowRight, Bell, CheckCircle2, AlertTriangle
} from "lucide-react";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

type User = { name: string; email: string; role?: string; stock?: Record<string, string> };
interface Props { user: User; }

const DEFAULT_STOCK: Record<string, number> = {
  'A+': 45, 'A-': 8, 'B+': 32, 'B-': 5, 'O+': 60, 'O-': 3, 'AB+': 18, 'AB-': 4,
};

const HOSPITAL_REQUESTS = [
  { hospital: "Apollo Delhi",    group: "O-",  urgency: "Critical", time: "10 min ago" },
  { hospital: "AIIMS Noida",    group: "B+",  urgency: "High",     time: "35 min ago" },
  { hospital: "City Hospital",   group: "A+",  urgency: "Normal",   time: "2 hr ago"   },
];

export function BloodBankDashboard({ user }: Props) {
  const [stock, setStock] = useState<Record<string, number>>(DEFAULT_STOCK);
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(DEFAULT_STOCK).map(([k, v]) => [k, String(v)]))
  );

  const lowStock = Object.entries(stock).filter(([, v]) => v < 10);

  const handleSave = () => {
    const updated: Record<string, number> = {};
    for (const [k, v] of Object.entries(editValues)) {
      updated[k] = Math.max(0, parseInt(v) || 0);
    }
    setStock(updated);
    setEditing(false);
    toast({ title: "Stock Updated ✅", description: "Blood inventory has been saved." });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold text-secondary tracking-tight">
              Welcome, <span className="text-green-700">{user.name}</span>
            </h1>
            <Badge className="bg-green-100 text-green-800 border-none font-bold gap-1">
              <Droplet className="h-3 w-3" /> Blood Bank
            </Badge>
          </div>
          <p className="text-muted-foreground font-medium">Inventory management and supply coordination.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
            <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
            Last updated: 2 min ago
          </div>
          <Button className="bg-green-700 hover:bg-green-800 font-bold shadow-lg shadow-green-700/20"
            onClick={() => setEditing(true)}>
            <Package className="h-4 w-4 mr-2" />Update Stock
          </Button>
        </div>
      </div>

      {/* Low stock warnings */}
      {lowStock.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {lowStock.map(([group, units]) => (
            <div key={group} className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 text-red-700 rounded-2xl font-bold text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>{group} is critical — only {units} units left ⚠️</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Units",     value: String(Object.values(stock).reduce((a, b) => a + b, 0)), icon: Droplet,    color: "green" as const },
          { label: "Critical Groups", value: String(lowStock.length),                                 icon: AlertCircle, color: "red" as const },
          { label: "Requests Today",  value: "12",                                                    icon: Bell,        color: "blue" as const },
          { label: "Units Dispatched",value: "38",                                                    icon: TrendingUp,  color: "yellow" as const },
        ].map((s, i) => (
          <KPIBlock key={i} title={s.label} value={s.value} icon={s.icon} glowColor={s.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blood Stock Table */}
        <div className="lg:col-span-2 space-y-6">
          <GlowCard glowColor="green" className="p-0 border-0 shadow-none bg-transparent">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-green-600" /> Blood Stock Inventory
                  </CardTitle>
                  <CardDescription>Current units available by blood group</CardDescription>
                </div>
                {!editing
                  ? <Button variant="outline" className="border-2 font-bold text-sm" onClick={() => setEditing(true)}>Edit Stock</Button>
                  : <div className="flex gap-2">
                      <Button variant="outline" className="border-2 font-bold text-sm" onClick={() => setEditing(false)}>Cancel</Button>
                      <Button className="bg-green-700 hover:bg-green-800 font-bold text-sm" onClick={handleSave}>Save</Button>
                    </div>
                }
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(stock).map(([group, units]) => {
                  const pct = Math.min(100, Math.round((units / 80) * 100));
                  const isCritical = units < 10;
                  const isLow = units < 20;
                  return (
                    <div key={group} className={`p-4 rounded-2xl border-2 text-center ${isCritical ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : isLow ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' : 'border-green-100 bg-green-50 dark:bg-green-950/10'}`}>
                      <div className={`text-2xl font-black mb-1 ${isCritical ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-green-700'}`}>{group}</div>
                      {editing ? (
                        <Input
                          type="number" min="0"
                          className="h-10 text-center rounded-xl border-2 font-black"
                          value={editValues[group]}
                          onChange={e => setEditValues(p => ({ ...p, [group]: e.target.value }))}
                        />
                      ) : (
                        <>
                          <p className="font-black text-lg">{units} <span className="text-xs font-bold text-muted-foreground">units</span></p>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
                            <div className={`h-1.5 rounded-full transition-all ${isCritical ? 'bg-red-500' : isLow ? 'bg-amber-400' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                          </div>
                          {isCritical && <p className="text-[10px] font-black text-red-600 mt-1">CRITICAL</p>}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </GlowCard>
        </div>

        {/* Hospital requests sidebar */}
        <div className="space-y-6">
          <GlowCard glowColor="red" className="p-0 border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" /> Incoming Requests
              </CardTitle>
              <CardDescription>From hospitals in your network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {HOSPITAL_REQUESTS.map((req, i) => (
                <div key={i} className={`p-4 rounded-2xl border-2 ${req.urgency === 'Critical' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : req.urgency === 'High' ? 'border-amber-100 bg-amber-50/50' : 'border-border'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-black text-sm">{req.hospital}</span>
                    <Badge className="bg-primary text-white text-[10px] font-black">{req.group}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <AnimatedBadge variant={req.urgency === 'Critical' ? 'error' : req.urgency === 'High' ? 'warning' : 'info'} pulsing={req.urgency === 'Critical'}>
                      {req.urgency}
                    </AnimatedBadge>
                    <span className="text-xs text-muted-foreground">{req.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full font-bold border-2" asChild>
                <Link href="/search">View Network <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </CardContent>
          </GlowCard>

          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-6 text-white shadow-xl group hover:shadow-green-500/20 transition-all duration-500">
            <h3 className="text-lg font-black mb-2">Request Replenishment</h3>
            <p className="text-green-100 text-sm mb-4">Send requests to active donors for critical groups.</p>
            <Button className="w-full bg-white text-green-800 hover:bg-green-50 font-black" asChild>
              <Link href="/search">Find Donors <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
