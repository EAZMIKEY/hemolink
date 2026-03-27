"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, User, Phone, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AIHeatmapLayer } from './AI/AIHeatmapLayer';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom pulsing user icon
const userIcon = L.divIcon({
  className: 'user-marker',
  html: `<div class="relative">
          <div class="absolute -inset-2 bg-primary/40 rounded-full animate-ping"></div>
          <div class="relative w-4 h-4 bg-primary rounded-full border-2 border-white shadow-xl"></div>
        </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Custom node icon
const COLOR_MAP = {
  donor: { border: 'border-primary', text: 'text-primary', bgHover: 'group-hover:bg-primary/40', bgRing: 'bg-primary/20' },
  hospital: { border: 'border-blue-500', text: 'text-blue-500', bgHover: 'group-hover:bg-blue-500/40', bgRing: 'bg-blue-500/20' },
  bloodbank: { border: 'border-green-500', text: 'text-green-500', bgHover: 'group-hover:bg-green-500/40', bgRing: 'bg-green-500/20' },
};

const nodeIcon = (group: string, role: string, name: string, dist: string, isHighlighted: boolean = false) => {
  const colorClasses = COLOR_MAP[role as keyof typeof COLOR_MAP] || COLOR_MAP.donor;

  return L.divIcon({
    className: 'node-marker',
    html: `<div class="relative group cursor-pointer transition-all duration-300 ${isHighlighted ? 'scale-125' : 'hover:scale-110'}">
            <div class="absolute -inset-2 ${colorClasses.bgRing} rounded-full blur-md opacity-0 ${isHighlighted ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300"></div>
            
            ${isHighlighted ? `
              <div class="absolute -inset-8 bg-primary/20 rounded-full animate-ping"></div>
              <div class="absolute -inset-4 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
            ` : ''}

            <div class="absolute -inset-1 ${colorClasses.bgRing} rounded-full ${colorClasses.bgHover} transition-colors"></div>
            <div class="relative w-8 h-8 bg-slate-900 border-2 ${colorClasses.border} rounded-lg flex items-center justify-center font-black ${colorClasses.text} text-[10px] shadow-lg ${isHighlighted ? 'shadow-[0_0_20px_rgba(255,0,0,0.6)]' : 'group-hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]'} transition-all">
              ${group}
            </div>

            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-900/95 backdrop-blur-sm text-white text-[9px] font-black rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-50 shadow-2xl scale-50 group-hover:scale-100 origin-bottom">
               <div class="flex flex-col items-center gap-0.5">
                  <span class="tracking-tight">${name}</span>
                  <span class="text-primary text-[7px] font-black tracking-[0.1em] uppercase opacity-80">${dist} away</span>
               </div>
               <div class="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
            </div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

interface NetworkNode {
  id: number;
  name: string;
  role: string;
  group: string;
  lat: number;
  lng: number;
  dist: string;
}

const INITIAL_NODES: NetworkNode[] = [
  { id: 1, name: 'Rahul S.', role: 'donor', group: 'A+', lat: 19.0760, lng: 72.8777, dist: '1.2 km' },
  { id: 2, name: 'City Hospital', role: 'hospital', group: 'H', lat: 19.0800, lng: 72.8850, dist: '2.5 km' },
  { id: 3, name: 'Life Bank', role: 'bloodbank', group: 'All', lat: 19.0700, lng: 72.8700, dist: '3.1 km' },
];

function LocationMarker({ setUserPos, setHasLocated }: { setUserPos: (pos: [number, number]) => void, setHasLocated: (val: boolean) => void }) {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setUserPos([e.latlng.lat, e.latlng.lng]);
      setHasLocated(true);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setUserPos, setHasLocated]);

  return null;
}

export interface AIEnhancedMapRef {
  flyTo: (coords: [number, number], zoom?: number) => void;
}

const AIEnhancedMap = React.forwardRef<AIEnhancedMapRef, { highlightedId?: number | null }>((props, ref) => {
  const [userPos, setUserPos] = useState<[number, number]>([19.0760, 72.8777]); // Default to Mumbai
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES);
  const [hasLocated, setHasLocated] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  React.useImperativeHandle(ref, () => ({
    flyTo: (coords: [number, number], zoom: number = 15) => {
      if (mapInstance) {
        mapInstance.flyTo(coords, zoom, {
          duration: 1.5,
          animate: true,
          easeLinearity: 0.25,
        });
      }
    }
  }));

  function MapFocus() {
    const map = useMap();
    useEffect(() => {
      setMapInstance(map);
    }, [map]);
    return null;
  }

  useEffect(() => {
    if (hasLocated) {
      setNodes([
        { id: 1, name: 'Rahul S.', role: 'donor', group: 'A+', lat: userPos[0] + 0.012, lng: userPos[1] + 0.005, dist: '1.2 km' },
        { id: 2, name: 'City Hospital', role: 'hospital', group: 'H', lat: userPos[0] - 0.008, lng: userPos[1] - 0.015, dist: '2.5 km' },
        { id: 3, name: 'Life Bank', role: 'bloodbank', group: 'All', lat: userPos[0] + 0.020, lng: userPos[1] - 0.010, dist: '3.1 km' },
      ]);
    }
  }, [hasLocated, userPos]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={userPos}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full grayscale-[0.5] invert-[0.1] contrast-[1.1]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <LocationMarker setUserPos={setUserPos} setHasLocated={setHasLocated} />
        
        <Marker position={userPos} icon={userIcon}>
          <Popup className="custom-popup">
            <div className="font-bold text-primary">You are here</div>
          </Popup>
        </Marker>

        {nodes.map((node) => {
          const isHighlighted = props.highlightedId === node.id;
          return (
            <Marker 
              key={node.id} 
              position={[node.lat, node.lng]} 
              icon={nodeIcon(node.group, node.role, node.name, node.dist, isHighlighted)}
            >
              <Popup className="custom-popup">
                <div className="space-y-2 p-1 min-w-[120px]">
                   {/* ... same popup content ... */}
                   <div className="font-black text-foreground">{node.name}</div>
                   <div className="text-[10px] text-muted-foreground font-bold">{node.dist} away</div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <AIHeatmapLayer active={showHeatmap} />
        <MapFocus />
      </MapContainer>

      {/* AI Heatmap Toggle Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000]">
         <Button 
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={cn(
              "rounded-full px-6 py-2 h-auto text-[10px] font-black uppercase tracking-widest border transition-all shadow-2xl",
              showHeatmap 
                ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(239,68,68,0.5)]" 
                : "bg-slate-900/80 backdrop-blur-md text-slate-400 border-white/10 hover:border-primary/50"
            )}
         >
            <Sparkles className={cn("w-3 h-3 mr-2", showHeatmap ? "animate-pulse" : "")} />
            {showHeatmap ? "AI Heatmap Active" : "Enable AI Heatmap"}
         </Button>
      </div>

      <div className="absolute bottom-6 left-6 z-[1000] pointer-events-none">
         {/* ... original legend ... */}
      </div>
    </div>
  );
});

export default AIEnhancedMap;
