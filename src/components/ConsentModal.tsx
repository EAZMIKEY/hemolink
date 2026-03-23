"use client"

import { useState } from "react";
import { 
  ShieldCheck, FileText, CheckCircle2, 
  AlertTriangle, Signature, Info, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { cn } from "@/lib/utils";

interface ConsentModalProps {
  onAccept: (signature: string) => void;
  onCancel: () => void;
}

export function ConsentModal({ onAccept, onCancel }: ConsentModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");

  const CONSENT_POINTS = [
    { title: "Voluntary Donation", content: "I am donating blood voluntarily without any pressure or incentive." },
    { title: "Risk Acknowledgement", content: "I understand the minor risks involved (bruising, dizziness) and have been briefed." },
    { title: "Data Usage (ABDM)", content: "I consent to my screening results being stored in the National Health Cloud (ABDM)." },
    { title: "Emergency Use", content: "I authorize HemoLink to notify me of urgent matching SOS requests." },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <GlowCard glowColor="primary" className="max-w-2xl w-full bg-slate-900 border-white/10 overflow-hidden shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tight text-white uppercase">Digital Legal Consent</h2>
              <p className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">National NBTC Standard v4.2</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar mb-8">
            {CONSENT_POINTS.map((point, i) => (
              <div key={i} className="p-4 bg-slate-950/40 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                <div className="flex items-center gap-3 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">{point.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">{point.content}</p>
              </div>
            ))}
            
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Medical Disclaimer</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold italic">
                I declare that I have not engaged in high-risk behaviors as defined by the National Blood Transfusion Council.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="agree"
                className="mt-1 w-4 h-4 rounded border-white/10 bg-slate-950 text-primary focus:ring-primary"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="agree" className="text-xs font-bold text-slate-300 leading-tight cursor-pointer">
                I have read and understood all the terms of the HemoLink National Blood Donation agreement.
              </label>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">Digital Signature (Type Full Name)</label>
              <div className="relative">
                <Signature className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Rahul Sharma"
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-black italic text-white focus:border-primary transition-all outline-none tracking-widest"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 h-14 border-white/10 font-black italic tracking-widest text-slate-400 hover:bg-white/5 rounded-2xl"
                onClick={onCancel}
              >
                DECLINE
              </Button>
              <Button 
                disabled={!agreed || signature.length < 3}
                className="flex-1 h-14 bg-primary hover:bg-red-700 text-white font-black italic tracking-widest text-lg shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-20 disabled:grayscale rounded-2xl transition-all"
                onClick={() => onAccept(signature)}
              >
                ACCEPT & PROCEED
              </Button>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
