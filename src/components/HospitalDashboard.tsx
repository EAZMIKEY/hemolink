import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle, Users, Heart, Droplet, Bell, MapPin,
  Activity, ArrowRight, Clock, RefreshCw, PhoneCall,
  CheckCircle2, TrendingUp, Sparkles, ShieldCheck, Settings, BarChart3
} from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { MatchResultsModal } from "./MatchResultsModal";
import { runAiMatcher, MatchScore } from "@/lib/matching/aiMatcher";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { StatusChip } from "@/components/ui/StatusChip";
import { MOCK_DONORS } from "@/lib/mock-data";

type User = { name: string; email: string; role?: string; };
interface Props { user: User; }

const NEARBY_DONORS = [
  { name: "Vikram Singh",  group: "O+",  dist: "1.2 km", active: true  },
  { name: "Priya Mehta",   group: "O-",  dist: "2.1 km", active: true  },
  { name: "Karan Mehra",   group: "AB+", dist: "3.4 km", active: false },
  { name: "Sneha Verma",   group: "O+",  dist: "4.0 km", active: true  },
];

const ACTIVE_REQUESTS = [
  { id: "REQ-001", group: "O-",  urgency: "Critical", status: "Searching", time: "5 min ago"  },
  { id: "REQ-002", group: "B+",  urgency: "High",     status: "Responding", time: "22 min ago" },
  { id: "REQ-003", group: "A+",  urgency: "Normal",   status: "Fulfilled",  time: "1 hr ago"   },
];

export function HospitalDashboard({ user }: Props) {
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchScore[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const handleSmartMatch = async (bloodType: string) => {
    setIsMatching(true);
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const results = await runAiMatcher({ bloodType }, MOCK_DONORS);
    setMatchResults(results);
    setIsMatching(false);
    setShowMatchModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* AI Smart Match Modal */}
      <MatchResultsModal 
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        matches={matchResults}
        donors={MOCK_DONORS}
        onSelect={(donor) => {
          console.log("Selected donor:", donor);
          setShowMatchModal(false);
        }}
        requestType="EMERGENCY"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold text-secondary tracking-tight">
              Welcome, <span className="text-blue-600">{user.name}</span>
            </h1>
            <Badge className="bg-blue-100 text-blue-700 border-none font-bold gap-1">
              <Activity className="h-3 w-3" /> Hospital
            </Badge>
          </div>
          <p className="text-muted-foreground font-medium">Emergency management and donor coordination centre.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-2 border-slate-200 dark:border-white/10 font-bold" asChild>
            <Link href="/dashboard/hospital/admin"><Settings className="h-4 w-4 mr-2" />Admin Panel</Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-600/20" asChild>
            <Link href="/emergency"><Bell className="h-4 w-4 mr-2" />Raise SOS</Link>
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Active Requests", value: "3",    icon: AlertCircle, color: "red" as const },
          { label: "Donors Responding", value: "9",  icon: Users,       color: "blue" as const },
          { label: "Lives Saved",  value: "4,230",   icon: Heart,       color: "green" as const },
          { label: "Avg Response",  value: "8 min",  icon: Clock,       color: "yellow" as const },
        ].map((s, i) => (
          <KPIBlock key={i} title={s.label} value={s.value} icon={s.icon} glowColor={s.color} />
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: requests + SOS */}
        <div className="lg:col-span-2 space-y-6">
          <GlowCard glowColor="red" className="p-0 border-0 shadow-none bg-transparent">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" /> Active Emergency Requests
                  </CardTitle>
                  <CardDescription>Current blood requests from your hospital</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 font-bold text-sm" asChild>
                  <Link href="/emergency">+ New Request</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {ACTIVE_REQUESTS.map((req, i) => (
                <div key={i} className={`p-4 rounded-2xl border-2 flex items-center gap-4 ${
                  req.urgency === 'Critical' ? 'border-red-200 bg-red-50 dark:bg-red-950/20' :
                  req.urgency === 'High'     ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' :
                  'border-border bg-background'
                }`}>
                  <Badge className="bg-primary text-white font-black text-sm w-12 justify-center">{req.group}</Badge>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm">{req.id}</span>
                      <AnimatedBadge variant={req.urgency === 'Critical' ? 'error' : req.urgency === 'High' ? 'warning' : 'success'} pulsing={req.urgency === 'Critical'}>
                        {req.urgency}
                      </AnimatedBadge>
                    </div>
                    <p className="text-xs text-muted-foreground">{req.time}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <StatusChip 
                      status={req.status === 'Fulfilled' ? 'success' : req.status === 'Searching' ? 'pending' : 'active'} 
                      label={req.status} 
                    />
                    {req.status === 'Searching' && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        disabled={isMatching}
                        onClick={() => handleSmartMatch(req.group)}
                        className="h-7 text-[10px] font-black bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all"
                      >
                        <Sparkles className="h-3 w-3 mr-1" /> SMART MATCH
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </GlowCard>

          {/* SOS CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/20">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2"><Bell className="h-5 w-5" /> Emergency Broadcast</h3>
            <p className="text-blue-100 text-sm mb-4">Instantly alert all verified donors in your city for urgent blood requirements.</p>
            <div className="flex gap-3">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 font-black" asChild>
                <Link href="/emergency">Broadcast SOS <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
              <Button variant="outline" className="border-white/40 text-white font-bold hover:bg-white/10">
                <PhoneCall className="h-4 w-4 mr-2" /> Call Network
              </Button>
            </div>
          </div>
        </div>

        {/* Right: nearby donors */}
        <div className="space-y-6">
          <GlowCard glowColor="blue" className="p-0 border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" /> Nearby Donors
              </CardTitle>
              <CardDescription>3 donors responding now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {NEARBY_DONORS.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border hover:bg-muted/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.dist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary text-white text-[10px] font-black">{d.group}</Badge>
                    <span className={`w-2 h-2 rounded-full ${d.active ? 'bg-green-500' : 'bg-slate-300'}`} />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full font-bold border-2" asChild>
                <Link href="/search">View All Donors <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </CardContent>
          </GlowCard>

          <GlowCard className="border-2 border-blue-100 dark:border-blue-900">
            <CardContent className="p-5 space-y-2">
              <p className="font-black text-sm text-muted-foreground uppercase tracking-widest">Network Status</p>
              <p className="text-2xl font-black text-blue-600">145 Donors Online</p>
              <p className="text-xs text-muted-foreground">in your city right now</p>
              <div className="w-full h-2 bg-blue-100 rounded-full mt-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '72%' }} />
              </div>
              <p className="text-xs text-muted-foreground">72% donor network coverage</p>
            </CardContent>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
