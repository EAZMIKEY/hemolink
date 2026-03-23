"use client"

import React, { useState, useEffect } from "react";
import { Fingerprint, CheckCircle2, XCircle, RefreshCw, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Utility for SHA-256 Simulation
async function generateSimulatedHash(seed: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(seed + Math.random().toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export type ScanState = 'idle' | 'scanning' | 'success' | 'fail';

interface FingerprintScannerProps {
  onSuccess: (hash: string) => void;
  onFail: () => void;
}

const FingerprintScanner: React.FC<FingerprintScannerProps> = ({ onSuccess, onFail }) => {
  const [state, setState] = useState<ScanState>('idle');
  const [progress, setProgress] = useState(0);

  const startScan = async () => {
    setState('scanning');
    setProgress(0);
    
    // Simulate scan duration 2-4 seconds
    const duration = Math.floor(Math.random() * 2000) + 2000;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      if (currentStep >= steps) clearInterval(interval);
    }, intervalTime);

    setTimeout(async () => {
      clearInterval(interval);
      
      // 80% success probability
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        const hash = await generateSimulatedHash(Date.now().toString());
        setState('success');
        onSuccess(hash);
      } else {
        setState('fail');
        onFail();
      }
    }, duration);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
      {/* LED Glow Ring Background */}
      <div className={cn(
        "absolute inset-0 opacity-20 blur-[80px] transition-colors duration-700 pointer-events-none",
        state === 'scanning' ? "bg-blue-500 scale-125 animate-pulse" :
        state === 'success' ? "bg-green-500 scale-110" :
        state === 'fail' ? "bg-red-600 scale-110" : "bg-transparent"
      )} />

      {/* SVG Container */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-10">
        {/* Progress Ring */}
        <div className="absolute inset-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-white/5"
            />
            {state === 'scanning' && (
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="552.92"
                strokeDashoffset={552.92 - (552.92 * progress) / 100}
                className="text-blue-500 transition-all duration-100 ease-linear shadow-neon"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        {/* Fingerprint SVG */}
        <div className={cn(
          "w-32 h-32 flex items-center justify-center transition-all duration-500 rounded-full",
          state === 'idle' ? "text-slate-600" :
          state === 'scanning' ? "text-blue-500 scale-110" :
          state === 'success' ? "text-green-500 scale-105" : "text-red-500 animate-shake"
        )}>
          {state === 'success' ? (
            <CheckCircle2 className="w-full h-full animate-in zoom-in-50 duration-500 shadow-neon" />
          ) : state === 'fail' ? (
            <XCircle className="w-full h-full animate-in zoom-in-50 duration-500 shadow-neon-red" />
          ) : (
            <Fingerprint className={cn(
              "w-full h-full transition-all duration-700",
              state === 'scanning' && "animate-pulse shadow-neon"
            )} />
          )}
        </div>
        
        {/* Scanning Line overlay */}
        {state === 'scanning' && (
          <div className="absolute left-[15%] right-[15%] h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-scan-y top-0 z-10" />
        )}
      </div>

      {/* Text Info */}
      <div className="text-center space-y-2 mb-8 relative z-10">
        <h3 className={cn(
          "text-xl font-black italic tracking-widest uppercase transition-colors",
          state === 'idle' ? "text-slate-500" :
          state === 'scanning' ? "text-blue-400" :
          state === 'success' ? "text-green-500" : "text-red-500"
        )}>
          {state === 'idle' && "Ready to Scan"}
          {state === 'scanning' && "Scanning Fingerprint..."}
          {state === 'success' && "Identity Verified"}
          {state === 'fail' && "Scan Failed"}
        </h3>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
          {state === 'idle' && "Place thumb on the center sensor"}
          {state === 'scanning' && `Local Hash Extraction: ${Math.floor(progress)}%`}
          {state === 'success' && "Encrypted Template Generated"}
          {state === 'fail' && "Matching Probability Low. Retry Needed."}
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 w-full flex gap-3">
        {state === 'idle' && (
          <Button 
            onClick={startScan} 
            className="w-full h-14 bg-primary hover:bg-red-700 text-white font-black italic tracking-[0.2em] rounded-2xl shadow-neon transition-all hover:scale-[1.02] active:scale-95 text-lg uppercase"
          >
            Start Scan <Zap className="w-5 h-5 ml-2 fill-white" />
          </Button>
        ) || (state === 'fail') && (
          <Button 
            onClick={startScan} 
            variant="ghost"
            className="w-full h-14 border border-red-500/30 bg-red-500/5 text-red-500 hover:bg-red-500/10 font-black italic tracking-[0.2em] rounded-2xl transition-all text-lg uppercase"
          >
            Try Again <RefreshCw className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-3xl group-hover:border-primary/50 transition-all" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-3xl group-hover:border-primary/50 transition-all" />
    </div>
  );
};

export default FingerprintScanner;
