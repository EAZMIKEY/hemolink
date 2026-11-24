"use client"

import React, { useEffect, useState, useImperativeHandle, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Phone, Hospital, Navigation, Locate, 
  Route as RouteIcon, Clock, X, ExternalLink, Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BloodBank } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Default Leaflet marker icon fix
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// User pulsing beacon marker
const createUserIcon = () => {
  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `
      <div class="relative flex items-center justify-center w-12 h-12 cursor-grab active:cursor-grabbing">
        <div class="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping pointer-events-none"></div>
        <div class="absolute w-8 h-8 bg-primary/30 rounded-full animate-pulse pointer-events-none"></div>
        <div class="relative w-5 h-5 bg-primary rounded-full border-2 border-white shadow-[0_0_20px_rgba(255,0,0,0.9)] flex items-center justify-center">
          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        <div class="absolute -bottom-5 px-2 py-0.5 bg-slate-900 border border-primary/40 rounded-full text-[8px] font-black uppercase text-white tracking-widest whitespace-nowrap shadow-xl pointer-events-none">
          YOU ARE HERE
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  });
};

// Blood Bank custom marker icon
const createBankIcon = (bank: BloodBank, isSelected: boolean, isDestination: boolean = false) => {
  const isStocked = bank.stockStatus === 'stocked';
  const isLow = bank.stockStatus === 'low';
  const statusBg = isStocked ? 'bg-green-500' : isLow ? 'bg-amber-500' : 'bg-red-500';
  const statusBorder = isStocked ? 'border-green-500/70' : isLow ? 'border-amber-500/70' : 'border-red-500/70';
  const selectedStyle = (isSelected || isDestination)
    ? 'scale-125 z-50 ring-4 ring-primary shadow-[0_0_30px_rgba(255,0,0,0.9)]'
    : 'hover:scale-110 shadow-lg';

  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `
      <div class="relative group cursor-pointer transition-all duration-300 ${selectedStyle}">
        ${(isSelected || isDestination) ? '<div class="absolute -inset-2 bg-primary/30 rounded-2xl animate-ping pointer-events-none"></div>' : ''}
        
        <div class="relative flex items-center justify-center w-9 h-9 bg-slate-900 border-2 ${isSelected ? 'border-primary bg-primary/20' : statusBorder} rounded-xl shadow-2xl backdrop-blur-md">
          <svg class="w-4 h-4 ${isSelected ? 'text-primary fill-primary/30' : 'text-white'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 ${statusBg} border-2 border-slate-900"></span>
          </span>
        </div>

        ${isDestination ? `
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-primary text-white rounded text-[7px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
            DESTINATION
          </div>
        ` : ''}

        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900/95 border border-white/10 rounded-lg text-white text-[10px] font-black tracking-tight whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
          <span>${bank.name}</span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900"></div>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
};

export interface RouteInfo {
  coordinates: [number, number][];
  distanceKm: string;
  durationMin: string;
  steps: { instruction: string; distanceMeters: number }[];
  destinationBank: BloodBank;
}

// Fetch real driving route from OSRM
async function fetchRoadRoute(
  start: [number, number],
  end: [number, number],
  bank: BloodBank
): Promise<RouteInfo> {
  const [startLat, startLng] = start;
  const [endLat, endLng] = end;

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('OSRM routing request failed');
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coordinates: [number, number][] = route.geometry.coordinates.map(
        (c: [number, number]) => [c[1], c[0]]
      );
      const distanceKm = (route.distance / 1000).toFixed(1);
      const durationMin = Math.max(1, Math.round(route.duration / 60)).toString();

      const steps = route.legs?.[0]?.steps?.map((s: any) => ({
        instruction: s.maneuver?.instruction || (s.name ? `Proceed onto ${s.name}` : 'Follow road'),
        distanceMeters: Math.round(s.distance || 0),
      })) || [];

      return { coordinates, distanceKm, durationMin, steps, destinationBank: bank };
    }
  } catch (err) {
    console.warn('Fallback to direct calculation:', err);
  }

  // Fallback Haversine straight route
  const R = 6371;
  const dLat = ((endLat - startLat) * Math.PI) / 180;
  const dLon = ((endLng - startLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((startLat * Math.PI) / 180) *
      Math.cos((endLat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const directDist = (R * c).toFixed(1);
  const directTime = Math.max(2, Math.round(parseFloat(directDist) * 2.2)).toString();

  const coordinates: [number, number][] = [];
  const segments = 6;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    coordinates.push([
      startLat + (endLat - startLat) * t,
      startLng + (endLng - startLng) * t,
    ]);
  }

  return {
    coordinates,
    distanceKm: directDist,
    durationMin: directTime,
    steps: [
      { instruction: `Head directly toward ${bank.name}`, distanceMeters: Math.round(parseFloat(directDist) * 1000) },
      { instruction: `Arrive at destination`, distanceMeters: 50 },
    ],
    destinationBank: bank,
  };
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 600);

    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    const container = map.getContainer();
    if (container) {
      observer.observe(container);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [map]);
  return null;
}

// Initial Map Centering and Resizing
function MapInitialLocator({ 
  userPos, 
  onLocationFound 
}: { 
  userPos: [number, number]; 
  onLocationFound: (pos: [number, number]) => void;
}) {
  const map = useMap();

  useEffect(() => {
    // Attempt real browser GPS on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          onLocationFound(coords);
          map.flyTo(coords, 14, { duration: 1.5 });
        },
        () => {
          // If denied, center on default userPos
          map.setView(userPos, 13);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      map.setView(userPos, 13);
    }
  }, [map, userPos, onLocationFound]);

  return null;
}

function MapViewController({
  center,
  zoom,
  selectedBank,
  onMapReady,
}: {
  center?: [number, number];
  zoom?: number;
  selectedBank?: BloodBank | null;
  onMapReady: (map: L.Map) => void;
}) {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  useEffect(() => {
    if (selectedBank?.location) {
      map.flyTo([selectedBank.location.lat, selectedBank.location.lng], 15, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    } else if (center) {
      map.flyTo(center, zoom || 13, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [selectedBank, center, zoom, map]);

  return null;
}

function RouteBoundsFitter({ routeCoords }: { routeCoords?: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (routeCoords && routeCoords.length > 1) {
      const bounds = L.latLngBounds(routeCoords);
      map.fitBounds(bounds, { padding: [70, 70], maxZoom: 16 });
    }
  }, [routeCoords, map]);
  return null;
}

export interface LeafletMapRef {
  flyTo: (coords: [number, number], zoom?: number) => void;
  flyToBank: (bankId: string) => void;
  locateUser: () => void;
  startNavigation: (bank: BloodBank) => void;
  clearNavigation: () => void;
}

export interface LeafletMapProps {
  banks?: BloodBank[];
  selectedBankId?: string | null;
  onSelectBank?: (bank: BloodBank) => void;
  center?: [number, number];
  zoom?: number;
  highlightedId?: number | string | null;
  isScanning?: boolean;
}

const LeafletMap = React.forwardRef<LeafletMapRef, LeafletMapProps>((props, ref) => {
  const {
    banks = [],
    selectedBankId,
    onSelectBank,
    center = [19.0760, 72.8777],
    zoom = 13,
  } = props;

  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [userPos, setUserPos] = useState<[number, number]>(center);
  const [hasLocatedUser, setHasLocatedUser] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<RouteInfo | null>(null);
  const [tileMode, setTileMode] = useState<'dark' | 'standard'>('dark');

  const selectedBank = banks.find((b) => b.id === selectedBankId);

  // Sync userPos if center changes and user has not manually located
  useEffect(() => {
    if (!hasLocatedUser && center) {
      setUserPos(center);
    }
  }, [center, hasLocatedUser]);

  const handleMapReady = useCallback((map: L.Map) => {
    setMapInstance(map);
  }, []);

  const routeToBank = useCallback(
    async (bank: BloodBank, startPoint?: [number, number]) => {
      if (!bank.location) return;
      const origin = startPoint || userPos;
      const route = await fetchRoadRoute(origin, [bank.location.lat, bank.location.lng], bank);
      setActiveRoute(route);
    },
    [userPos]
  );

  const handleLocationFound = useCallback((coords: [number, number]) => {
    setUserPos(coords);
    setHasLocatedUser(true);
  }, []);

  useImperativeHandle(ref, () => ({
    flyTo: (coords: [number, number], customZoom: number = 15) => {
      if (mapInstance) {
        mapInstance.flyTo(coords, customZoom, {
          duration: 1.2,
          animate: true,
          easeLinearity: 0.25,
        });
      }
    },
    flyToBank: (bankId: string) => {
      const bank = banks.find((b) => b.id === bankId);
      if (bank?.location && mapInstance) {
        mapInstance.flyTo([bank.location.lat, bank.location.lng], 15, {
          duration: 1.2,
          animate: true,
          easeLinearity: 0.25,
        });
      }
    },
    locateUser: () => {
      if (mapInstance) {
        mapInstance.locate({ setView: true, maxZoom: 15 });
      }
    },
    startNavigation: (bank: BloodBank) => {
      routeToBank(bank);
    },
    clearNavigation: () => {
      setActiveRoute(null);
      if (mapInstance) {
        mapInstance.flyTo(userPos, 14, { duration: 1.2 });
      }
    },
  }));

  // Handle marker click on any hospital/bank
  const handleMarkerClick = (bank: BloodBank) => {
    onSelectBank?.(bank);
    routeToBank(bank);
  };

  // Clear route and return focus to user
  const handleClearRoute = () => {
    setActiveRoute(null);
    if (mapInstance) {
      mapInstance.flyTo(userPos, 14, { duration: 1.2 });
    }
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={userPos}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        {/* OpenStreetMap Standard Tiles - 100% Free, NO API Key Required! */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className={tileMode === 'dark' ? 'dark-tiles' : 'standard-tiles'}
          maxZoom={19}
        />

        <MapResizer />
        <MapInitialLocator userPos={userPos} onLocationFound={handleLocationFound} />
        <MapViewController
          center={activeRoute ? undefined : userPos}
          zoom={zoom}
          selectedBank={activeRoute ? null : selectedBank}
          onMapReady={handleMapReady}
        />

        {activeRoute && <RouteBoundsFitter routeCoords={activeRoute.coordinates} />}

        {/* User Location Marker - Anchors Our Location */}
        <Marker
          position={userPos}
          icon={createUserIcon()}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              const newCoords: [number, number] = [position.lat, position.lng];
              setUserPos(newCoords);
              setHasLocatedUser(true);
              if (activeRoute) {
                routeToBank(activeRoute.destinationBank, newCoords);
              }
            },
          }}
        >
          <Popup className="custom-popup">
            <div className="p-3 text-center space-y-1">
              <span className="text-xs font-black text-primary uppercase tracking-wider">Your Location</span>
              <p className="text-[10px] text-slate-400">
                {hasLocatedUser ? 'Verified GPS Coords' : 'Active Location Anchor'}
              </p>
              <p className="text-[9px] text-slate-500 italic">Drag pin to change origin</p>
            </div>
          </Popup>
        </Marker>

        {/* Road Navigation Polyline to Clicked Bank */}
        {activeRoute && activeRoute.coordinates.length > 1 && (
          <>
            {/* Outer red neon path */}
            <Polyline
              positions={activeRoute.coordinates}
              pathOptions={{
                color: '#ef4444',
                weight: 7,
                opacity: 0.7,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Inner dashed road line */}
            <Polyline
              positions={activeRoute.coordinates}
              pathOptions={{
                color: '#ffffff',
                weight: 3,
                opacity: 0.95,
                dashArray: '8, 8',
                lineCap: 'round',
              }}
            />
          </>
        )}

        {/* All Nearby Hospital & Bank Markers */}
        {banks.map((bank) => {
          if (!bank.location?.lat || !bank.location?.lng) return null;
          const isSelected = bank.id === selectedBankId;
          const isDest = activeRoute?.destinationBank.id === bank.id;

          return (
            <Marker
              key={bank.id}
              position={[bank.location.lat, bank.location.lng]}
              icon={createBankIcon(bank, isSelected, isDest)}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(bank);
                },
              }}
            >
              <Popup className="custom-popup" offset={[0, -10]}>
                <div className="p-4 space-y-3 min-w-[250px] max-w-[280px]">
                  <div>
                    <h4 className="font-black text-sm text-white tracking-tight flex items-center gap-1.5">
                      <Hospital className="h-4 w-4 text-primary shrink-0" />
                      {bank.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-primary shrink-0" /> {bank.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      className={cn(
                        'text-[8px] font-black uppercase px-2 py-0.5 border',
                        bank.stockStatus === 'stocked'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : bank.stockStatus === 'low'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      )}
                    >
                      {bank.stockStatus === 'stocked'
                        ? 'Stock Available'
                        : bank.stockStatus === 'low'
                        ? 'Low Stock'
                        : 'Critical Stock'}
                    </Badge>

                    {bank.is24x7 && (
                      <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[8px] font-black uppercase px-2 py-0.5">
                        24/7 Active
                      </Badge>
                    )}
                  </div>

                  {bank.availableTypes && bank.availableTypes.length > 0 && (
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1">
                        Blood Groups Available
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {bank.availableTypes.map((type) => (
                          <span
                            key={type}
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-200"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <Button
                      size="sm"
                      onClick={() => routeToBank(bank)}
                      className="flex items-center justify-center gap-1.5 h-8 rounded-lg bg-primary hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-wider transition-colors shadow-lg shadow-primary/20"
                    >
                      <RouteIcon className="h-3 w-3" /> Navigate
                    </Button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${userPos[0]},${userPos[1]}&destination=${bank.location.lat},${bank.location.lng}&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-wider border border-white/10 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> Live GPS
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Tactical Navigation HUD - Only shown when user clicks a Bank/Hospital */}
      {activeRoute && (
        <div className="absolute bottom-6 left-4 right-4 md:left-6 md:right-auto md:w-96 z-[1000] animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-primary/50 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-white space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                  <RouteIcon className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-primary block">Active Navigation</span>
                  <h5 className="font-black text-sm tracking-tight leading-tight">
                    {activeRoute.destinationBank.name}
                  </h5>
                  <p className="text-[10px] text-slate-400 font-medium truncate max-w-[210px] mt-0.5">
                    {activeRoute.destinationBank.address}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClearRoute}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Close Navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Distance & Time Metrics */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-primary" />
                <div>
                  <span className="text-[8px] font-black uppercase text-slate-400 block tracking-wider">Road Distance</span>
                  <span className="text-base font-black text-white">{activeRoute.distanceKm} km</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-400" />
                <div>
                  <span className="text-[8px] font-black uppercase text-slate-400 block tracking-wider">Drive Time</span>
                  <span className="text-base font-black text-green-400">~{activeRoute.durationMin} mins</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${userPos[0]},${userPos[1]}&destination=${activeRoute.destinationBank.location?.lat},${activeRoute.destinationBank.location?.lng}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-primary hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-primary/30 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Start GPS
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearRoute}
                className="col-span-1 h-9 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-white text-[11px] font-black uppercase tracking-wider"
              >
                Clear Route
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Map Layer Mode Toggle Button */}
      <div className="absolute top-4 right-36 z-[900]">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setTileMode((prev) => (prev === 'dark' ? 'standard' : 'dark'))}
          className="h-9 px-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border-white/10 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5"
          title="Toggle Map Style"
        >
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">{tileMode === 'dark' ? 'Dark' : 'Street'}</span>
        </Button>
      </div>
    </div>
  );
});

LeafletMap.displayName = 'LeafletMap';

export default LeafletMap;
