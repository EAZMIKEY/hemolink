
"use client"

import { useState, useMemo, useEffect } from 'react';
import { MOCK_BANKS, MOCK_DONORS, MOCK_REQUESTS } from '@/lib/mock-data';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Phone, Clock, Search, Navigation, Filter, Hospital, 
  Activity, Users, Building2, SlidersHorizontal, ChevronDown, 
  CheckCircle2, AlertTriangle, ShieldCheck, Thermometer, Info
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapView } from '@/components/MapView';
import { cn } from '@/lib/utils';

export default function BloodBanksPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroup, setBloodGroup] = useState('none');
  const [distance, setDistance] = useState([10]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [open24h, setOpen24h] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const QUICK_CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Greater Noida', 'Chandigarh'];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const filteredBanks = useMemo(() => {
    return MOCK_BANKS.filter(bank => 
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return QUICK_CITIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 min-h-screen space-y-10">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8 bg-slate-900/40 p-10 rounded-premium border border-white/5 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 rotate-12">
           <Building2 className="w-64 h-64 text-primary animate-float-premium" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-red-800 flex items-center justify-center shadow-neon animate-float-premium">
              <Hospital className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white italic tracking-tighter">Bank Locator</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                  <ShieldCheck className="h-3 w-3 mr-1" /> NATIONAL VERIFIED REGISTRY
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground font-medium text-lg ml-20">Accessing the centralized government database of authorized blood centers.</p>
        </div>
        <div className="flex gap-4 relative z-10 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "h-14 px-8 rounded-xl border-2 font-black transition-all bg-white/5 hover:bg-white/10 text-white",
              showFilters ? "border-primary text-primary shadow-[0_0_15px_rgba(255,0,0,0.3)]" : "border-white/10"
            )}
          >
            <SlidersHorizontal className={cn("h-5 w-5 mr-3", showFilters && "animate-pulse")} /> FILTERS
          </Button>
          <Button 
            onClick={handleScan}
            className={cn(
              "btn-premium h-14 px-10 bg-primary hover:bg-red-700 font-black text-lg rounded-xl shadow-lg shadow-primary/40 text-white",
              isScanning && "opacity-80"
            )}
          >
            {isScanning ? (
              <Activity className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5 mr-3" /> SCAN AREA
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── Advanced Filter Panel ─────────────────────────────────────────────── */}
      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          showFilters ? "grid-rows-[1fr] opacity-100 mb-10" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <Card className="bg-slate-900 border-none rounded-[2.5rem] shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Blood Group Match</label>
                <Select onValueChange={setBloodGroup} value={bloodGroup}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-800 border-none text-white font-bold">
                    <SelectValue placeholder="Any Group" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white border-none rounded-xl">
                    <SelectItem value="none">Any Group</SelectItem>
                    {BLOOD_GROUPS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Search Radius</label>
                   <span className="text-xs font-black text-primary italic">{distance[0]} km</span>
                </div>
                <Slider 
                  value={distance} 
                  onValueChange={setDistance} 
                  max={20} 
                  step={1} 
                  className="py-4"
                />
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl">
                  <span className="text-xs font-black uppercase tracking-widest text-white">Stock Available</span>
                  <Switch checked={availableOnly} onCheckedChange={setAvailableOnly} />
                </div>
              </div>

               <div className="space-y-4 flex flex-col justify-center">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl">
                  <span className="text-xs font-black uppercase tracking-widest text-white">24/7 Support</span>
                  <Switch checked={open24h} onCheckedChange={setOpen24h} />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
               <Button className="bg-primary hover:bg-red-700 font-black px-10 rounded-xl animate-glow-pulse">Apply Filters</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Main Layout ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        {/* List Side */}
        <div className="lg:col-span-1 space-y-6 max-h-[85vh] overflow-y-auto pr-4 custom-scrollbar">
          
          {/* Network Status Banner */}
          <div className="animate-in fade-in slide-in-from-top duration-700 delay-300">
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                   <Activity className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Live Network Status</p>
                   <p className="text-xs font-bold text-white italic">
                     <span className="text-primary">{MOCK_DONORS.length}</span> donors online · <span className="text-primary">{MOCK_BANKS.length}</span> centers active
                   </p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-none font-black text-[9px] uppercase tracking-tighter px-2">System Healthy</Badge>
            </div>
          </div>

          {/* Search Card with Suggestions */}
          <Card className="glass-card border-none overflow-visible rounded-3xl sticky top-0 z-20 shadow-xl">
            <CardContent className="p-4 relative">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search city or pincode..." 
                  className="pl-12 h-14 border-none bg-transparent shadow-none focus-visible:ring-0 text-lg font-black italic"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(s);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-white/5 text-sm font-bold text-slate-300 transition-colors border-b border-white/5 last:border-none flex items-center justify-between group"
                      >
                         <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100" />
                            {s}
                         </div>
                         <ChevronDown className="h-3 w-3 -rotate-90 opacity-0 group-hover:opacity-50" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 gap-6">
            {filteredBanks.map((bank, idx) => (
              <div 
                key={bank.id} 
                className="animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <Card className={cn(
                  "group relative overflow-hidden rounded-premium border-white/5 shadow-premium transition-all hover:scale-[1.02] hover:-translate-y-2 duration-500 bg-slate-900/60 backdrop-blur-xl text-white border-2",
                  idx === 0 && "animate-border-pulse"
                )}>
                  {/* Medical Pattern Background */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] invert" />

                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 shrink-0 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all duration-500 shadow-inner group-hover:rotate-6">
                          <Hospital className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        {/* LED Pulse Status */}
                        <div className={cn(
                          "absolute -top-1 -right-1 w-5 h-5 rounded-full border-4 border-slate-900 shadow-lg animate-pulse",
                          idx === 0 ? "bg-green-500 shadow-green-500/50" : idx === 1 ? "bg-amber-500 shadow-amber-500/50" : "bg-red-500 shadow-red-500/50"
                        )} />
                      </div>
                      <div className="space-y-2 flex-grow">
                        <div className="flex justify-between items-start gap-4">
                           <h3 className="font-black text-2xl leading-tight tracking-tighter italic text-white group-hover:text-primary transition-colors">{bank.name}</h3>
                           {idx === 0 && (
                             <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 animate-pulse">OPTIMAL MATCH</Badge>
                           )}
                        </div>
                        <p className="text-sm text-slate-400 font-bold flex items-center gap-2 uppercase tracking-tight mt-1">
                          <MapPin className="h-4 w-4 text-primary" /> {bank.address}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-6">
                          {bank.availableTypes.map(type => (
                            <Badge 
                              key={type} 
                              className="text-[9px] font-black uppercase tracking-[0.2em] py-1.5 px-4 bg-white/5 text-slate-300 border border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-default rounded-lg"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-10 pt-8 border-t border-white/10">
                      <Button variant="outline" className="flex-1 text-[10px] h-14 rounded-xl font-black border-white/10 hover:bg-white/5 text-white shadow-lg tracking-widest uppercase"><Phone className="h-4 w-4 mr-3 text-primary" /> CONTACT</Button>
                      <Button className="flex-1 text-[10px] h-14 rounded-xl font-black bg-white text-slate-900 hover:bg-primary hover:text-white transition-all shadow-xl group/nav tracking-widest uppercase">
                        <Navigation className="h-4 w-4 mr-3 group-hover/nav:animate-bounce" /> NAVIGATE
                      </Button>
                    </div>
                  </CardContent>
                  {/* Decorative corner glow */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Map Side */}
        <div className="lg:col-span-2 h-[85vh] relative animate-in zoom-in fade-in duration-1000">
           {/* Mini Compass */}
           <div className="absolute top-6 left-6 z-10 p-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl pointer-events-none animate-in fade-out duration-1000 delay-[2000ms] fill-mode-forwards">
              <div className="w-10 h-10 relative flex items-center justify-center">
                 <div className="w-0.5 h-full bg-slate-700 absolute" />
                 <div className="h-0.5 w-full bg-slate-700 absolute" />
                 <div className="absolute -top-1 font-black text-[8px] text-primary">N</div>
                 <Navigation className="h-5 w-5 text-primary fill-primary -rotate-45" />
              </div>
           </div>

          <div className="h-full w-full rounded-[3rem] overflow-hidden border-2 border-white/5 shadow-2xl shadow-primary/10 relative group/map">
            <MapView />
            {/* Live Radar Animation Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
               <div className="w-1/2 h-1/2 border-2 border-primary/20 rounded-full animate-radar-ping" />
               <div className="w-1/3 h-1/3 border-2 border-primary/10 rounded-full animate-radar-ping [animation-delay:1.5s]" />
            </div>
            {/* Subtle Map Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Floating Filter FAB */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "fixed bottom-10 right-10 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 z-50 animate-in slide-in-from-bottom-20",
                showFilters ? "bg-slate-900 hover:bg-slate-800 rotate-180" : "bg-primary hover:bg-red-700 hover:scale-110"
              )}
            >
              {showFilters ? <Filter className="h-6 w-6 text-primary" /> : <SlidersHorizontal className="h-6 w-6 text-white" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-slate-900 text-white font-black border-primary/20">
            {showFilters ? "Close Filters" : "Advanced Filters"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
