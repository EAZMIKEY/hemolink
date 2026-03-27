
"use client"

import { useState, useMemo, useEffect } from 'react';
import { BloodGroup, BLOOD_GROUPS, getCompatibleDonors } from '@/lib/blood-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowCard } from '@/components/ui/GlowCard';
import { AnimatedBadge } from '@/components/ui/AnimatedBadge';
import {
  Search, MapPin, Droplet, Phone, Mail, Info, Loader2, SlidersHorizontal,
  Building2, HeartPulse, X, RefreshCw
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const MOCK_DONORS = [
  { id: '1', name: 'Rahul Sharma', city: 'Mumbai', bloodGroup: 'O+', phone: '9876543210', email: 'rahul@example.com', role: 'donor', available: true },
  { id: '2', name: 'City Care Hospital', city: 'Mumbai', bloodGroup: 'O+', phone: '9876111111', email: 'contact@citycare.com', role: 'hospital', available: true },
  { id: '3', name: 'National Blood Centre', city: 'Delhi', bloodGroup: 'AB+', phone: '9876222222', email: 'urgent@nbc.gov', role: 'bloodbank', available: true },
  { id: '4', name: 'Priya Desai', city: 'Delhi', bloodGroup: 'A-', phone: '9876543211', email: 'priya@example.com', role: 'donor', available: true },
  { id: '5', name: 'Apex Hospital', city: 'Bangalore', bloodGroup: 'B+', phone: '9876333333', email: 'admin@apex.com', role: 'hospital', available: true },
  { id: '6', name: 'Red Cross Society', city: 'Mumbai', bloodGroup: 'A+', phone: '9876444444', email: 'help@redcross.org', role: 'bloodbank', available: false },
  { id: '7', name: 'Vikram Singh', city: 'Hyderabad', bloodGroup: 'B-', phone: '9876543212', email: 'vikram@example.com', role: 'donor', available: true },
  { id: '8', name: 'Sneha Verma', city: 'Chennai', bloodGroup: 'AB-', phone: '9876543213', email: 'sneha@example.com', role: 'donor', available: true },
];

const ROLE_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  donor: { label: 'Donor', icon: HeartPulse, color: 'text-primary' },
  hospital: { label: 'Hospital', icon: Building2, color: 'text-blue-500' },
  bloodbank: { label: 'Blood Bank', icon: Droplet, color: 'text-green-500' },
};

export default function SearchPage() {
  const [bloodGroup, setBloodGroup] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [rawDonors, setRawDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRawDonors(MOCK_DONORS);
      setLoading(false);
    }, 300);
  }, []);

  const filteredDonors = useMemo(() => {
    if (!rawDonors) return [];
    return rawDonors.filter(donor => {
      if (bloodGroup && showCompatibility) {
        const compatibleGroups = getCompatibleDonors(bloodGroup as BloodGroup);
        if (!compatibleGroups.includes(donor.bloodGroup as BloodGroup)) return false;
      }
      if (bloodGroup && !showCompatibility && donor.bloodGroup !== bloodGroup) return false;
      if (citySearch && !donor.city.toLowerCase().includes(citySearch.toLowerCase())) return false;
      if (roleFilter !== 'all' && donor.role !== roleFilter) return false;
      return true;
    });
  }, [rawDonors, bloodGroup, showCompatibility, citySearch, roleFilter]);

  const clearFilters = () => {
    setBloodGroup('');
    setCitySearch('');
    setRoleFilter('all');
    setShowCompatibility(false);
  };

  const hasActiveFilters = bloodGroup || citySearch || roleFilter !== 'all';

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 min-h-screen animate-in fade-in duration-500">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-neon">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Find Blood Donors</h1>
          </div>
          <p className="text-muted-foreground font-medium ml-15 ml-[60px]">
            Search our verified national network of active donors, hospitals & blood banks.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedBadge variant="live" pulsing>Live Network</AnimatedBadge>
          <AnimatedBadge variant="success">{rawDonors.length} Members</AnimatedBadge>
          <Button
            variant="outline"
            className="border-2 font-bold gap-2"
            onClick={() => setShowFilters(v => !v)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1 space-y-4 animate-in slide-in-from-left duration-500">
            <GlowCard glowColor="primary" className="p-0">
              <CardHeader className="pb-3 bg-gradient-to-br from-primary/10 to-transparent rounded-t-[1.25rem]">
                <CardTitle className="text-base flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  Filter & Refine
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" className="ml-auto h-6 text-xs text-primary p-1" onClick={clearFilters}>
                      <X className="h-3 w-3 mr-1" /> Clear
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Blood Group</label>
                  <Select onValueChange={(v) => setBloodGroup(v === 'any' ? '' : v)} value={bloodGroup || 'any'}>
                    <SelectTrigger className="h-12 rounded-xl border-2 font-bold">
                      <SelectValue placeholder="Any Blood Group" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2">
                      <SelectItem value="any">Any Blood Group</SelectItem>
                      {BLOOD_GROUPS.map(bg => (
                        <SelectItem key={bg} value={bg} className="font-bold">{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">City / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      placeholder="Enter city (e.g. Mumbai)"
                      className="pl-9 h-12 rounded-xl border-2 font-medium"
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Network Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: 'all', label: 'All' },
                      { val: 'donor', label: 'Donors' },
                      { val: 'hospital', label: 'Hospitals' },
                      { val: 'bloodbank', label: 'Banks' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setRoleFilter(opt.val)}
                        className={cn(
                          "h-9 rounded-xl text-xs font-black border-2 transition-all",
                          roleFilter === opt.val
                            ? "bg-primary border-primary text-white shadow-neon"
                            : "border-border hover:border-primary/40 text-muted-foreground"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50">
                  <input
                    type="checkbox"
                    id="compat"
                    className="w-4 h-4 rounded accent-primary"
                    checked={showCompatibility}
                    onChange={(e) => setShowCompatibility(e.target.checked)}
                  />
                  <label htmlFor="compat" className="text-xs font-bold cursor-pointer">Show compatible blood groups</label>
                </div>

                <Button className="w-full bg-primary font-black h-11 rounded-xl shadow-neon">
                  <RefreshCw className="h-4 w-4 mr-2" /> Refresh Results
                </Button>
              </CardContent>
            </GlowCard>

            {bloodGroup && (
              <Alert className="bg-blue-500/10 border-blue-500/30 rounded-xl">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-400 font-black text-xs uppercase tracking-wider">Blood Compatible Groups</AlertTitle>
                <AlertDescription className="text-blue-300/80 text-xs mt-1">
                  {bloodGroup} can receive from: <span className="font-black">{getCompatibleDonors(bloodGroup as BloodGroup).join(', ')}</span>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Results */}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-muted-foreground">
              {loading ? 'Scanning network...' : `${filteredDonors.length} results found`}
            </p>
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                {bloodGroup && <AnimatedBadge variant="info">{bloodGroup}</AnimatedBadge>}
                {citySearch && <AnimatedBadge variant="info">{citySearch}</AnimatedBadge>}
                {roleFilter !== 'all' && <AnimatedBadge variant="info">{roleFilter}</AnimatedBadge>}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <p className="text-muted-foreground font-bold animate-pulse">Searching live network...</p>
            </div>
          ) : filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDonors.map((donor, idx) => {
                const meta = ROLE_META[donor.role] || ROLE_META.donor;
                const RoleIcon = meta.icon;
                return (
                  <GlowCard
                    key={donor.id}
                    glowColor={donor.role === 'donor' ? 'primary' : donor.role === 'hospital' ? 'blue' : 'green'}
                    className="p-0 animate-in fade-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${idx * 80}ms` } as React.CSSProperties}
                  >
                    {/* Card Header Strip */}
                    <div className="p-5 border-b border-border/40 flex justify-between items-center bg-gradient-to-r from-muted/30 to-transparent rounded-t-[1.1rem]">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white shadow-lg",
                          donor.role === 'donor' ? 'bg-primary' : donor.role === 'hospital' ? 'bg-blue-600' : 'bg-green-600'
                        )}>
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-black text-sm leading-tight">{donor.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" /> {donor.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={cn("text-2xl font-black drop-shadow-sm", meta.color)}>
                          {donor.bloodGroup}
                        </span>
                        <AnimatedBadge variant={donor.available ? 'success' : 'warning'} pulsing={donor.available}>
                          {donor.available ? 'Available' : 'Busy'}
                        </AnimatedBadge>
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <RoleIcon className={cn("h-4 w-4", meta.color)} />
                          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{meta.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {donor.email}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-primary font-black h-10 rounded-xl shadow-neon" asChild>
                          <a href={`tel:${donor.phone}`}>
                            <Phone className="h-4 w-4 mr-2" /> Call Now
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 font-bold h-10 rounded-xl border-2" asChild>
                          <a href={`mailto:${donor.email}`}>
                            <Mail className="h-4 w-4 mr-2" /> Email
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </GlowCard>
                );
              })}
            </div>
          ) : (
            <GlowCard className="text-center py-20">
              <div className="mx-auto w-20 h-20 bg-muted/30 rounded-3xl flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-black mb-2">No Results Found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                No donors match your current filters. Try broadening your search.
              </p>
              <Button variant="outline" className="font-bold border-2" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </GlowCard>
          )}
        </div>
      </div>
    </div>
  );
}
