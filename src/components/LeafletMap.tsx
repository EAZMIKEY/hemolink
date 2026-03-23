"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, User, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

export interface LeafletMapRef {
  flyTo: (coords: [number, number], zoom?: number) => void;
}

const LeafletMap = React.forwardRef<LeafletMapRef, { highlightedId?: number | null }>((props, ref) => {
  const [userPos, setUserPos] = useState<[number, number]>([19.0760, 72.8777]); // Default to Mumbai
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES);
  const [hasLocated, setHasLocated] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

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

  // Map instance tracker component
  function MapFocus() {
    const map = useMap();
    useEffect(() => {
      setMapInstance(map);
    }, [map]);
    return null;
  }

  // When real location is found, spawn nodes near the user!
  useEffect(() => {
    if (hasLocated) {
      setNodes([
        { id: 1, name: 'Rahul S.', role: 'donor', group: 'A+', lat: userPos[0] + 0.012, lng: userPos[1] + 0.005, dist: '1.2 km' },
        { id: 2, name: 'City Hospital', role: 'hospital', group: 'H', lat: userPos[0] - 0.008, lng: userPos[1] - 0.015, dist: '2.5 km' },
        { id: 3, name: 'Life Bank', role: 'bloodbank', group: 'All', lat: userPos[0] + 0.020, lng: userPos[1] - 0.010, dist: '3.1 km' },
      ]);
    }
  }, [hasLocated, userPos]);

  // Simulation of moving nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(d => ({
        ...d,
        lat: d.lat + (Math.random() - 0.5) * 0.0005,
        lng: d.lng + (Math.random() - 0.5) * 0.0005,
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
                  <div className="flex justify-between items-center">
                    <span className="font-black text-foreground">{node.name}</span>
                    <Badge variant="outline" className={cn(
                      "bg-slate-800 text-white font-black text-[9px]",
                      node.role === 'hospital' ? 'border-blue-500' : node.role === 'bloodbank' ? 'border-green-500' : 'border-primary'
                    )}>
                      {node.group}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                    <MapPin className="h-3 w-3" /> {node.dist} away
                  </div>
                  <Button 
                    size="sm" 
                    className={cn(
                      "w-full h-7 text-[9px] font-black",
                      node.role === 'hospital' ? 'bg-blue-600 hover:bg-blue-700' : node.role === 'bloodbank' ? 'bg-green-600 hover:bg-green-700' : 'bg-primary'
                    )}
                    onClick={() => {
                      toast({
                        title: "Contact Initiated",
                        description: `Connecting to ${node.name}...`,
                      });
                    }}
                  >
                    {node.role === 'donor' ? 'REQUEST BLOOD' : 'CONTACT'}
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <MapFocus />
      </MapContainer>

      {/* Map UI Overlay */}
      <div className="absolute bottom-6 left-6 z-[1000] pointer-events-none">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/10 shadow-xl pointer-events-auto flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2">Network Live</span>
          <div className="h-4 w-px bg-muted-foreground/30"></div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary rounded-full"></span> <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Donor</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Hospital</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Blood Bank</span></span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LeafletMap;
