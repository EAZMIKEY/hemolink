"use client"

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Globe, Locate, Navigation, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LeafletMapRef, LeafletMapProps } from './LeafletMap';
import { BloodBank } from '@/lib/mock-data';

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <Globe className="w-6 h-6 text-primary absolute animate-pulse" />
      </div>
      <p className="font-black text-xs uppercase tracking-widest text-slate-400">
        Initializing Geographic Satellite Feed...
      </p>
    </div>
  ),
});

export interface MapViewProps {
  banks: BloodBank[];
  selectedBankId?: string | null;
  onSelectBank?: (bank: BloodBank) => void;
  center?: [number, number];
  zoom?: number;
  isScanning?: boolean;
}

export const MapView = forwardRef<LeafletMapRef, MapViewProps>((props, ref) => {
  const {
    banks = [],
    selectedBankId,
    onSelectBank,
    center,
    zoom,
    isScanning = false,
  } = props;

  const innerMapRef = useRef<LeafletMapRef>(null);

  useImperativeHandle(ref, () => ({
    flyTo: (coords: [number, number], customZoom: number = 15) => {
      innerMapRef.current?.flyTo(coords, customZoom);
    },
    flyToBank: (bankId: string) => {
      innerMapRef.current?.flyToBank(bankId);
    },
    locateUser: () => {
      innerMapRef.current?.locateUser();
    },
    startNavigation: (bank: BloodBank) => {
      innerMapRef.current?.startNavigation(bank);
    },
    clearNavigation: () => {
      innerMapRef.current?.clearNavigation();
    },
  }));

  const handleLocate = () => {
    innerMapRef.current?.locateUser();
  };

  const stockedCount = banks.filter((b) => b.stockStatus === 'stocked').length;

  return (
    <Card className="h-full w-full min-h-[500px] relative rounded-[2.5rem] overflow-hidden border-2 border-white/5 shadow-2xl bg-slate-950 group/map">
      {/* Real-time Interactive Map */}
      <div className="absolute inset-0 z-0">
        <LeafletMap
          ref={innerMapRef}
          banks={banks}
          selectedBankId={selectedBankId}
          onSelectBank={onSelectBank}
          center={center}
          zoom={zoom}
          isScanning={isScanning}
        />
      </div>

      {/* Subtle Scanline / Medical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%] pointer-events-none z-10" />

      {/* Scanning Radar Animation Effect */}
      {isScanning && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-primary/5 backdrop-blur-[1px] animate-in fade-in duration-300">
          <div className="w-96 h-96 border-2 border-primary/40 rounded-full animate-ping [animation-duration:2s]" />
          <div className="w-64 h-64 border-2 border-primary/30 rounded-full animate-ping [animation-duration:1.5s]" />
          <div className="w-32 h-32 border-2 border-primary/50 rounded-full animate-pulse" />
          <div className="absolute top-20 bg-slate-900/90 border border-primary/30 px-5 py-2 rounded-full shadow-2xl flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              Scanning Emergency Network Frequencies...
            </span>
          </div>
        </div>
      )}

      {/* Top Header Pill */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-white">
              {banks.length} Centers Active
            </span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-[9px] font-bold text-slate-400 hidden sm:inline">
            <span className="text-green-400 font-black">{stockedCount}</span> Stocked
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <Button
            size="sm"
            onClick={handleLocate}
            variant="outline"
            className="h-9 px-3 rounded-xl bg-slate-900/90 backdrop-blur-md border-white/10 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5"
          >
            <Locate className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">My Location</span>
          </Button>
        </div>
      </div>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-xl pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-wider text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" /> Stocked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" /> Low
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" /> Critical
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
});

MapView.displayName = 'MapView';
