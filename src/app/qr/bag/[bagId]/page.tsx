"use client"

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Droplet, Thermometer, Calendar, ShieldCheck, Box } from "lucide-react";

export default function BagQRCodePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bagId = params?.bagId as string;
  
  // Get data from query params or mock if missing
  const bloodGroup = searchParams.get("group") || "B+";
  const type = searchParams.get("type") || "Whole Blood";
  const expiry = searchParams.get("expiry") || "2026-04-12";
  const status = searchParams.get("status") || "Verified";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    JSON.stringify({ bagId, bloodGroup, type, expiry, status })
  )}`;

  return (
    <div className="min-h-screen bg-white text-black p-8 font-mono flex flex-col items-center justify-start max-w-[400px] mx-auto border-2 border-dashed border-slate-300 m-4 print:m-0 print:border-0">
      {/* Label Header */}
      <div className="w-full flex justify-between items-center border-b-4 border-black pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Droplet className="w-8 h-8 fill-black" />
          <h1 className="text-2xl font-black italic tracking-tighter">HEMOLINK</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase">National Grid</p>
          <p className="text-[12px] font-black tracking-widest">{bagId}</p>
        </div>
      </div>

      {/* Main Blood Group */}
      <div className="w-full text-center py-4 border-b-2 border-black mb-4">
        <p className="text-8xl font-black tracking-tighter">{bloodGroup}</p>
        <p className="text-xl font-bold uppercase tracking-[0.2em] mt-2">{type}</p>
      </div>

      {/* QR Code Section */}
      <div className="bg-white p-4 border-4 border-black mb-4">
        <img 
          src={qrUrl} 
          alt="Bag QR Code" 
          className="w-[150px] h-[150px] image-rendering-pixelated"
        />
      </div>

      {/* Technical Details */}
      <div className="w-full space-y-2 mb-6 text-sm font-bold">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" /> STORAGE:
          </div>
          <span>2°C to 6°C</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> EXPIRY:
          </div>
          <span className="bg-black text-white px-1">{expiry}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> SCREENING:
          </div>
          <span className="uppercase">{status}</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full border-t-2 border-black pt-4 text-center">
        <p className="text-[10px] font-bold leading-tight">
          SCAN VIA HEMOLINK APP FOR FULL CLINICAL HISTORY & DISPATCH CHAIN.
        </p>
        <div className="flex justify-center gap-2 mt-4 opacity-70 print:hidden">
          <button 
            onClick={() => window.print()} 
            className="bg-black text-white px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            PRINT LABEL
          </button>
        </div>
      </div>
    </div>
  );
}
