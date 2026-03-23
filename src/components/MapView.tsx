"use client"

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { Navigation, ShieldCheck, MapPin, SignalHigh, Globe, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LeafletMapRef } from './LeafletMap';
import { cn } from '@/lib/utils';

// Dynamically import the map to avoid SSR issues with Leaflet
const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 dark:bg-slate-900 animate-pulse flex items-center justify-center font-black text-muted-foreground italic">Calibrating Satellite...</div>
});

const mockNearNodes = [
  { id: 1, name: 'Rahul S.', role: 'donor', group: 'A+', dist: '1.2 km', time: '4 min', status: 'Available', lat: 19.0880, lng: 72.8827 },
  { id: 2, name: 'City Hospital', role: 'hospital', group: 'H', dist: '2.5 km', time: '8 min', status: 'Urgent', lat: 19.0680, lng: 72.8627 },
  { id: 3, name: 'Life Bank', role: 'bloodbank', group: 'ALL', dist: '3.1 km', time: '12 min', status: 'Stocked', lat: 19.0960, lng: 72.8677 },
];

const getRoleColors = (role: string) => {
  if (role === 'hospital') return { bg: 'bg-blue-500', text: 'text-blue-500', shadow: 'shadow-blue-500/20', hover: 'hover:bg-blue-600', ring: 'bg-blue-500/5' };
  if (role === 'bloodbank') return { bg: 'bg-green-500', text: 'text-green-500', shadow: 'shadow-green-500/20', hover: 'hover:bg-green-600', ring: 'bg-green-500/5' };
  return { bg: 'bg-primary', text: 'text-primary', shadow: 'shadow-primary/20', hover: 'hover:bg-primary', ring: 'bg-primary/5' };
};

export function MapView() {
  const mapRef = useRef<LeafletMapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedDonor, setHighlightedDonor] = useState<number | null>(null);

  const trackDonor = (node: any) => {
    if (!mapRef.current) return;

    // Smooth scroll map into view
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Normalize coordinates
    const lat = node.lat || node.latitude;
    const lng = node.lng || node.longitude;

    if (lat && lng) {
      // Smooth map animation
      mapRef.current.flyTo([lat, lng], 15);

      // Highlight marker effect
      setHighlightedDonor(node.id);

      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightedDonor(null), 3000);
    }
  };

  return (
    <Card ref={containerRef} className="overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 h-[600px] relative group border border-white/5">
      {/* National Network Status Banner */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto">
         <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full flex items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-700">
            <div className="flex items-center gap-2">
               <Globe className="w-4 h-4 text-blue-400 animate-pulse" />
               <span className="text-[10px] font-black text-white italic tracking-widest uppercase">Live Network</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex gap-4">
               <div className="flex flex-col items-center">
                  <span className="text-primary text-[10px] font-black">1.2K+</span>
                  <span className="text-[7px] text-slate-500 font-bold uppercase">Donors</span>
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-blue-400 text-[10px] font-black">84</span>
                  <span className="text-[7px] text-slate-500 font-bold uppercase">Banks</span>
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-green-400 text-[10px] font-black">210</span>
                  <span className="text-[7px] text-slate-500 font-bold uppercase">Hospitals</span>
               </div>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[8px] font-black text-green-500 uppercase">Secure</span>
            </div>
         </div>
      </div>

      {/* Map Compass */}
      <div className="absolute top-24 right-8 z-50 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-xl animate-in slide-in-from-right duration-1000 delay-500">
         <Compass className="w-6 h-6 text-slate-400/50 hover:text-primary transition-colors cursor-help" />
      </div>

      {/* Real-time Interactive Map */}
      <div className="absolute inset-0 z-0">
         <LeafletMap ref={mapRef} highlightedId={highlightedDonor} />
      </div>
      
      {/* Map Overlay Grid (Subtle Scanline Effect) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,4px_100%] pointer-events-none z-10"></div>

      {/* Proximity Cards Overlay */}
      <div className="absolute top-6 left-6 right-6 z-20 flex flex-col gap-3 pointer-events-none">
         <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-[1.5rem] border border-primary/20 shadow-2xl flex items-center justify-between pointer-events-auto max-w-md mx-auto md:mx-0 w-full">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <Navigation className="h-5 w-5 text-primary animate-pulse" />
               </div>
               <div>
                  <h4 className="font-black text-sm tracking-tight italic">Nearby Donors</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Live Radar Active</p>
                  </div>
               </div>
            </div>
            <Badge className="bg-slate-800 text-white text-[10px] font-black italic rounded-lg">{mockNearNodes.length} TRACKING</Badge>
         </div>

         <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 pointer-events-none">
            {mockNearNodes.map((node, i) => {
               const colors = getRoleColors(node.role);
               return (
               <Card key={i} className={`glass-card border-none shadow-2xl hover:scale-[1.02] transition-transform cursor-default pointer-events-auto rounded-2xl overflow-hidden group/card relative`}>
                  <div className={`absolute inset-0 ${colors.ring} opacity-0 group-hover/card:opacity-100 transition-opacity`}></div>
                  <CardContent className="p-4 space-y-3 relative z-10">
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                           <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center font-black text-white text-[10px] shadow-lg ${colors.shadow}`}>
                              {node.group}
                           </div>
                           <span className="font-black text-sm tracking-tight">{node.name}</span>
                        </div>
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-1"><MapPin className={`h-3 w-3 ${colors.text}`} /> {node.dist}</span>
                        <span className="text-secondary font-black italic">{node.status}</span>
                     </div>
                      <Button 
                        size="sm" 
                        onClick={() => trackDonor(node)}
                        className={`w-full h-8 rounded-xl bg-slate-900 ${colors.hover} text-white text-[9px] font-black italic transition-all group-hover/card:scale-105`}
                      >
                        {node.role === 'donor' ? 'TRACK DONOR' : 'VIEW ON MAP'}
                      </Button>
                  </CardContent>
               </Card>
               );
            })}
         </div>
      </div>
    </Card>
  );
}
