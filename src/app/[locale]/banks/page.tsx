"use client"

import { useState, useMemo, useRef, useEffect } from 'react';
import { MOCK_BANKS, CITY_COORDINATES, BloodBank } from '@/lib/mock-data';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Phone, Search, Navigation, Filter, Hospital, 
  Activity, Building2, SlidersHorizontal, ChevronDown, 
  ShieldCheck, RefreshCw, Crosshair, X
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
import { LeafletMapRef } from '@/components/LeafletMap';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function BloodBanksPage() {
  const mapRef = useRef<LeafletMapRef>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroup, setBloodGroup] = useState('none');
  const [distance, setDistance] = useState([35]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [open24h, setOpen24h] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]);

  const QUICK_CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Greater Noida', 'Chandigarh'];

  // Acquire user's location immediately on load and center map on it
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
          mapRef.current?.flyTo(coords, 14);
          toast({
            title: "Your Location Detected",
            description: "Displaying blood banks & hospitals closest to you.",
          });
        },
        () => {
          setUserLocation([19.0760, 72.8777]);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setUserLocation([19.0760, 72.8777]);
    }
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    toast({
      title: "Scanning Area",
      description: "Detecting blood banks and medical supply nodes in range...",
    });

    setTimeout(() => {
      setIsScanning(false);
      if (filteredBanks.length > 0 && filteredBanks[0].location) {
        handleNavigate(filteredBanks[0]);
      }
    }, 1600);
  };

  const handleSelectCity = (city: string) => {
    setSearchQuery(city);
    setShowSuggestions(false);
    const key = city.toLowerCase();
    if (CITY_COORDINATES[key]) {
      const coords = CITY_COORDINATES[key];
      setMapCenter(coords);
      setUserLocation(coords);
      mapRef.current?.flyTo(coords, 13);
      toast({
        title: `Relocating to ${city}`,
        description: `Searching blood centers and hospitals near ${city}.`,
      });
    }
  };

  const handleNavigate = (bank: BloodBank) => {
    setSelectedBankId(bank.id);
    if (bank.location) {
      mapRef.current?.startNavigation(bank);
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        document.getElementById('map-container-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContact = (bank: BloodBank) => {
    window.open(`tel:${bank.contact}`, '_self');
    toast({
      title: "Connecting to Hotline",
      description: `Dialing ${bank.name} (${bank.contact})`,
    });
  };

  const handleSelectBankFromMap = (bank: BloodBank) => {
    setSelectedBankId(bank.id);
    const element = document.getElementById(`bank-card-${bank.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleClearRoute = () => {
    setSelectedBankId(null);
    mapRef.current?.clearNavigation();
  };

  // Dynamically compute distance from user and sort nearest centers first
  const filteredBanks = useMemo(() => {
    const origin = userLocation || mapCenter;

    const list = MOCK_BANKS.map((bank) => {
      let liveDist = bank.distance || 0;
      if (origin && bank.location) {
        const R = 6371;
        const dLat = ((bank.location.lat - origin[0]) * Math.PI) / 180;
        const dLon = ((bank.location.lng - origin[1]) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((origin[0] * Math.PI) / 180) *
            Math.cos((bank.location.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        liveDist = parseFloat((R * c).toFixed(1));
      }
      return { ...bank, distance: liveDist };
    }).filter((bank) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        bank.name.toLowerCase().includes(q) ||
        bank.address.toLowerCase().includes(q) ||
        (bank.city && bank.city.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (bloodGroup !== 'none') {
        const hasGroup =
          bank.availableTypes.includes(bloodGroup) ||
          bank.availableTypes.includes('All Groups') ||
          bank.availableTypes.includes('All');
        if (!hasGroup) return false;
      }

      if (availableOnly && bank.stockStatus === 'critical') {
        return false;
      }

      if (open24h && !bank.is24x7) {
        return false;
      }

      if (bank.distance && bank.distance > distance[0]) {
        return false;
      }

      return true;
    });

    // Closest centers always appear first
    return list.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [searchQuery, bloodGroup, availableOnly, open24h, distance, userLocation, mapCenter]);

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return QUICK_CITIES.filter((c) =>
      c.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 min-h-screen space-y-10">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8 bg-slate-900/40 p-8 md:p-10 rounded-premium border border-white/5 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute right-0 top-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 rotate-12 pointer-events-none">
          <Building2 className="w-64 h-64 text-primary animate-float-premium" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-red-800 flex items-center justify-center shadow-neon animate-float-premium shrink-0">
              <Hospital className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">Bank Locator</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                  <ShieldCheck className="h-3 w-3 mr-1" /> NATIONAL VERIFIED REGISTRY
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground font-medium text-sm md:text-base md:ml-20">
            Accessing centralized government and state-authorized blood centers with real-time radar mapping.
          </p>
        </div>
        <div className="flex gap-4 relative z-10 mt-4 md:mt-0 w-full md:w-auto">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "h-12 md:h-14 flex-1 md:flex-none px-6 md:px-8 rounded-xl border-2 font-black transition-all bg-white/5 hover:bg-white/10 text-white",
              showFilters ? "border-primary text-primary shadow-[0_0_15px_rgba(255,0,0,0.3)]" : "border-white/10"
            )}
          >
            <SlidersHorizontal className={cn("h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3", showFilters && "animate-pulse")} /> FILTERS
          </Button>
          <Button 
            onClick={handleScan}
            disabled={isScanning}
            className={cn(
              "btn-premium h-12 md:h-14 flex-1 md:flex-none px-6 md:px-10 bg-primary hover:bg-red-700 font-black text-sm md:text-base rounded-xl shadow-lg shadow-primary/40 text-white",
              isScanning && "opacity-80"
            )}
          >
            {isScanning ? (
              <Activity className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" /> SCAN AREA
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
          <Card className="bg-slate-900 border-none rounded-[2.5rem] shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Blood Group Match</label>
                <Select onValueChange={setBloodGroup} value={bloodGroup}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-800 border-none text-white font-bold">
                    <SelectValue placeholder="Any Group" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white border-none rounded-xl">
                    <SelectItem value="none">Any Group</SelectItem>
                    {BLOOD_GROUPS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Search Radius</label>
                   <span className="text-xs font-black text-primary italic">{distance[0]} km</span>
                </div>
                <Slider 
                  value={distance} 
                  onValueChange={setDistance} 
                  max={50} 
                  step={5} 
                  className="py-4"
                />
              </div>

              <div className="space-y-3 flex flex-col justify-center">
                <div className="flex items-center justify-between p-3.5 bg-slate-800 rounded-2xl">
                  <span className="text-xs font-black uppercase tracking-widest text-white">Stock Available Only</span>
                  <Switch checked={availableOnly} onCheckedChange={setAvailableOnly} />
                </div>
              </div>

              <div className="space-y-3 flex flex-col justify-center">
                <div className="flex items-center justify-between p-3.5 bg-slate-800 rounded-2xl">
                  <span className="text-xs font-black uppercase tracking-widest text-white">24/7 Support Only</span>
                  <Switch checked={open24h} onCheckedChange={setOpen24h} />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center">
               <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchQuery('');
                  setBloodGroup('none');
                  setDistance([25]);
                  setAvailableOnly(false);
                  setOpen24h(false);
                }}
                className="text-slate-400 hover:text-white text-xs font-black"
               >
                 <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reset Filters
               </Button>
               <Button 
                onClick={() => setShowFilters(false)}
                className="bg-primary hover:bg-red-700 font-black px-8 rounded-xl text-xs uppercase"
               >
                 Done
               </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Main Layout: Bank List + Interactive Map ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-start">
        {/* Left Side: Bank List & Search */}
        <div className="lg:col-span-1 space-y-6 max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Quick City Filter Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">Cities:</span>
            {QUICK_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => handleSelectCity(city)}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                  searchQuery.toLowerCase() === city.toLowerCase()
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:border-primary/50"
                )}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search Card with Auto-suggestions */}
          <Card className="glass-card border-none overflow-visible rounded-3xl sticky top-0 z-20 shadow-xl bg-slate-900/90 backdrop-blur-xl">
            <CardContent className="p-3 relative">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search city, bank name, or pincode..." 
                  className="pl-12 h-13 border-none bg-transparent shadow-none focus-visible:ring-0 text-base md:text-lg font-black italic text-white"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectCity(s)}
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

          {/* Results Summary & Location Status */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-wider text-slate-300">
                <span className="text-primary font-black">{filteredBanks.length}</span> Centers Near You
              </p>
            </div>
            {selectedBankId ? (
              <button 
                onClick={handleClearRoute}
                className="text-[10px] font-black text-primary hover:text-white flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 transition-colors"
              >
                <X className="w-3 h-3" /> Clear Route
              </button>
            ) : (
              <span className="text-[10px] text-slate-500 font-bold">Sorted by nearest</span>
            )}
          </div>
          
          {/* Bank Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredBanks.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/40 rounded-3xl border border-white/5 space-y-3">
                <Hospital className="w-10 h-10 text-muted-foreground mx-auto opacity-50" />
                <h3 className="font-black text-white text-base">No blood centers match criteria</h3>
                <p className="text-xs text-slate-400">
                  Try widening the search radius, switching blood group, or selecting another city.
                </p>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setBloodGroup('none');
                    setAvailableOnly(false);
                  }}
                  className="text-xs font-black"
                >
                  Reset Search
                </Button>
              </div>
            ) : (
              filteredBanks.map((bank, idx) => {
                const isSelected = bank.id === selectedBankId;

                return (
                  <div 
                    key={bank.id} 
                    id={`bank-card-${bank.id}`}
                    className="animate-in fade-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <Card 
                      onClick={() => handleNavigate(bank)}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl border transition-all duration-300 bg-slate-900/70 backdrop-blur-xl text-white cursor-pointer",
                        isSelected
                          ? "border-primary shadow-[0_0_25px_rgba(255,0,0,0.3)] ring-2 ring-primary/40 -translate-y-1"
                          : "border-white/5 hover:border-white/20 hover:scale-[1.01]"
                      )}
                    >
                      <CardContent className="p-5 md:p-6 relative z-10 space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="relative shrink-0">
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300",
                              isSelected 
                                ? "bg-primary/20 border-primary" 
                                : "bg-white/5 border-white/10 group-hover:bg-primary/10"
                            )}>
                              <Hospital className={cn("h-6 w-6", isSelected ? "text-primary" : "text-slate-300 group-hover:text-primary")} />
                            </div>
                            <span className={cn(
                              "absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900",
                              bank.stockStatus === 'stocked' ? "bg-green-500" : bank.stockStatus === 'low' ? "bg-amber-500" : "bg-red-500"
                            )} />
                          </div>

                          <div className="space-y-1 flex-grow min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-black text-lg leading-tight tracking-tight text-white group-hover:text-primary transition-colors truncate">
                                {bank.name}
                              </h3>
                              {bank.stockStatus === 'stocked' && (
                                <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-[8px] font-black uppercase shrink-0">
                                  STOCKED
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-between gap-1 mt-1">
                              <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 truncate">
                                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> {bank.address}
                              </p>
                              {bank.distance !== undefined && (
                                <Badge variant="outline" className="text-[9px] font-black text-primary border-primary/30 bg-primary/10 shrink-0 ml-2">
                                  {bank.distance} km
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Blood Groups Available */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {bank.availableTypes.map((type) => (
                            <Badge 
                              key={type} 
                              className={cn(
                                "text-[9px] font-black uppercase py-0.5 px-2.5 rounded-md border transition-all",
                                bloodGroup !== 'none' && type === bloodGroup
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white/5 text-slate-300 border-white/10"
                              )}
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleContact(bank)}
                            className="flex-1 text-[10px] h-10 rounded-xl font-black border-white/10 hover:bg-white/10 text-white tracking-wider uppercase"
                          >
                            <Phone className="h-3.5 w-3.5 mr-2 text-primary" /> CALL
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleNavigate(bank)}
                            className={cn(
                              "flex-1 text-[10px] h-10 rounded-xl font-black tracking-wider uppercase transition-all",
                              isSelected 
                                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                                : "bg-white text-slate-900 hover:bg-primary hover:text-white"
                            )}
                          >
                            <Navigation className="h-3.5 w-3.5 mr-2" /> ROUTE
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Map */}
        <div id="map-container-section" className="lg:col-span-2 h-[550px] lg:h-[82vh] sticky top-6 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <MapView
            ref={mapRef}
            banks={filteredBanks}
            selectedBankId={selectedBankId}
            onSelectBank={handleSelectBankFromMap}
            center={mapCenter}
            isScanning={isScanning}
          />
        </div>
      </div>

      {/* Floating Filter FAB on Mobile */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 z-50 md:hidden",
                showFilters ? "bg-slate-900 text-primary" : "bg-primary text-white"
              )}
            >
              {showFilters ? <Filter className="h-5 w-5" /> : <SlidersHorizontal className="h-5 w-5" />}
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
