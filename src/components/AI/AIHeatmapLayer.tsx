"use client"

import React, { useEffect, useState } from 'react';
import { Rectangle, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';

interface HeatZone {
  bounds: [number, number][];
  color: string;
  label: string;
  intensity: string;
}

export function AIHeatmapLayer({ active }: { active: boolean }) {
  const map = useMap();
  const [zones, setZones] = useState<HeatZone[]>([]);

  useEffect(() => {
    if (!active) {
      setZones([]);
      return;
    }

    // Generate mock heat zones based on current map center
    const center = map.getCenter();
    const newZones: HeatZone[] = [
      {
        bounds: [
          [center.lat + 0.01, center.lng + 0.01],
          [center.lat + 0.03, center.lng + 0.03]
        ],
        color: "#ef4444", // RED
        label: "Critical Shortage",
        intensity: "High"
      },
      {
        bounds: [
          [center.lat - 0.02, center.lng - 0.02],
          [center.lat - 0.005, center.lng - 0.005]
        ],
        color: "#f97316", // ORANGE
        label: "Low Stock Warning",
        intensity: "Medium"
      },
      {
        bounds: [
          [center.lat + 0.02, center.lng - 0.02],
          [center.lat + 0.04, center.lng - 0.01]
        ],
        color: "#22c55e", // GREEN
        label: "Optimal Inventory",
        intensity: "Normal"
      }
    ];
    setZones(newZones);
  }, [active, map]);

  if (!active) return null;

  return (
    <>
      {zones.map((zone, i) => (
        <Rectangle
          key={i}
          bounds={zone.bounds as any}
          pathOptions={{
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.3,
            weight: 1,
            dashArray: '5, 5'
          }}
        >
          <Tooltip sticky>
            <div className="p-2 bg-slate-900 text-white border border-white/10 rounded-lg shadow-xl">
               <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{zone.label}</span>
               </div>
               <p className="text-[9px] font-bold text-slate-400">AI Predicted Status: {zone.intensity} Urgency</p>
            </div>
          </Tooltip>
        </Rectangle>
      ))}
    </>
  );
}
