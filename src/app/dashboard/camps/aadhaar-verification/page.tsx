"use client"

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import FingerprintScanner from "@/components/FingerprintScanner";
import { 
  CreditCard, ShieldCheck, UserCheck, 
  ChevronRight, ArrowLeft, Upload, 
  User, Calendar, Landmark, Info,
  CheckCircle2, XCircle, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Matching logic simulation helper
export function simulateFingerprintMatch(storedHash: string | null, newHash: string) {
  if (!storedHash) return false;
  
  // 85% success chance for demo matches
  const matchProb = Math.random() > 0.15;
  return storedHash === newHash || matchProb;
}

export default function AadhaarVerificationPage() {
  const [step, setStep] = useState(1);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [scanResult, setScanResult] = useState<null | boolean>(null);
  const [donorData, setDonorData] = useState({
    name: "RAHUL SHARMA",
    dob: "12-05-1992",
    gender: "MALE"
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleScanSuccess = (hash: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      const matched = simulateFingerprintMatch("demo_hash", hash);
      setScanResult(matched);
      setIsVerifying(false);
      if (matched) setTimeout(() => setStep(4), 1000);
    }, 1500);
  };

  const maskedAadhaar = aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX-XXXX-$3");

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <PageHeader 
          title="NATIONAL BIOMETRIC AUTH" 
          subtitle="Camp-level identity verification for blood donation security using offline biometrics." 
        />

        {/* Custom Progress Stepper */}
        <div className="flex items-center justify-between mb-12 px-6">
          {[
            { id: 1, label: "Registry", icon: User },
            { id: 2, label: "Biometric", icon: Landmark },
            { id: 3, label: "Validation", icon: ShieldCheck }
          ].map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none group">
              <div className="flex flex-col items-center">
                 <div className={cn(
                   "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg",
                   step > s.id ? "bg-green-500 border-green-500 text-white" : 
                   step === s.id ? "bg-primary border-primary text-white shadow-neon" : "bg-slate-900 border-white/10 text-slate-600"
                 )}>
                    <s.icon className="w-5 h-5" />
                 </div>
                 <span className={cn(
                   "text-[10px] font-black uppercase mt-3 tracking-widest",
                   step === s.id ? "text-primary" : "text-slate-600"
                 )}>{s.label}</span>
              </div>
              {i < 2 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-4 transition-all duration-700",
                  step > s.id + 1 ? "bg-green-500" : step > s.id ? "bg-primary" : "bg-white/5"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Multi-Step Flow */}
        <div className="min-h-[500px]">
          {step === 1 && (
            <GlowCard glowColor="primary" className="p-10 bg-slate-900/60 backdrop-blur-3xl border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-xl font-black italic tracking-tighter text-white uppercase mb-8">Aadhaar Entry</h3>
                     <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2 block">Aadhaar Number</label>
                        <input 
                          type="text" 
                          maxLength={12}
                          value={aadhaarNumber}
                          onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="0000 0000 0000"
                          className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-xl font-black tracking-[0.3em] text-white focus:border-primary focus:shadow-neon outline-none transition-all placeholder:text-slate-800"
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2 block">Full Name (As on Card)</label>
                           <input 
                             type="text" 
                             defaultValue="RAHUL SHARMA"
                             className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white focus:border-primary transition-all outline-none"
                           />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2 block">Date of Birth</label>
                           <input type="text" defaultValue="12-05-1992" className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white focus:border-primary transition-all outline-none" />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2 block">Gender</label>
                           <select className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white focus:border-primary outline-none appearance-none">
                              <option>MALE</option>
                              <option>FEMALE</option>
                              <option>OTHER</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="p-6 bg-slate-950 border-2 border-dashed border-white/5 rounded-3xl hover:border-primary/30 transition-all group flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px]">
                        <Upload className="w-8 h-8 text-slate-600 group-hover:text-primary mb-3 transition-colors" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Aadhaar FRONT</p>
                        <p className="text-[8px] font-bold text-slate-700 mt-1 uppercase">JPEG/PDF Max 2MB</p>
                     </div>
                     <div className="p-6 bg-slate-950 border-2 border-dashed border-white/5 rounded-3xl hover:border-primary/30 transition-all group flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px]">
                        <Upload className="w-8 h-8 text-slate-600 group-hover:text-primary mb-3 transition-colors" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Aadhaar BACK</p>
                        <p className="text-[8px] font-bold text-slate-700 mt-1 uppercase">JPEG/PDF Max 2MB</p>
                     </div>
                     <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-3">
                        <Info className="w-5 h-5 text-primary" />
                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic uppercase">
                           This verification is offline and does not connect to UIDAI servers.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="mt-12 flex justify-end">
                  <Button onClick={nextStep} disabled={aadhaarNumber.length < 12} className="h-14 px-12 bg-primary hover:bg-red-700 text-white font-black italic text-lg tracking-[0.2em] rounded-2xl shadow-neon uppercase">
                     PROCEED TO BIOMETRIC <ChevronRight className="w-6 h-6 ml-2" />
                  </Button>
               </div>
            </GlowCard>
          )}

          {step === 2 && (
            <div className="animate-in fade-in zoom-in-95 duration-700">
               <div className="flex flex-col items-center justify-center space-y-12">
                  <div className="text-center">
                     <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase mb-2">Fingerprint Scan</h2>
                     <p className="text-slate-500 font-black italic uppercase tracking-[0.2em]">Step 2/3: Biometric Identity Anchor</p>
                  </div>
                  
                  <div className="max-w-md w-full">
                     <FingerprintScanner 
                        onSuccess={handleScanSuccess} 
                        onFail={() => {
                          setScanResult(false);
                          setTimeout(() => setScanResult(null), 3000);
                        }} 
                     />
                  </div>

                  <div className="max-w-md text-center p-6 bg-slate-900/40 rounded-3xl border border-white/5">
                     <div className="flex items-center justify-center gap-4 mb-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Protocol: Right Thumb Center</span>
                     </div>
                     <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic uppercase">
                        Gently place your right thumb on the biometric sensor. Maintain steady pressure until the LED ring turns green.
                     </p>
                  </div>
                  
                  <Button variant="ghost" onClick={prevStep} className="text-slate-500 hover:text-white uppercase font-black text-[10px] tracking-widest">
                     <ArrowLeft className="w-4 h-4 mr-2" /> RE-ENTER AADHAAR
                  </Button>
               </div>
            </div>
          )}

          {step === 4 && (
             <div className="animate-in fade-in zoom-in-95 duration-1000">
                <GlowCard glowColor="green" className="p-12 bg-slate-900/60 border-white/10 text-center relative overflow-hidden">
                   {/* Verification Ribbon */}
                   <div className="absolute top-0 right-0 w-48 h-48 -mr-16 -mt-16 bg-green-500/10 blur-[60px] pointer-events-none" />
                   
                   <div className="relative z-10">
                      <div className="w-24 h-24 bg-green-500 shadow-neon-success rounded-full flex items-center justify-center mx-auto mb-10">
                         <CheckCircle2 className="w-14 h-14 text-white" />
                      </div>
                      
                      <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase mb-4">IDENTITY VERIFIED</h1>
                      <div className="inline-flex items-center gap-3 px-6 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-12">
                         <ShieldCheck className="w-5 h-5 text-green-500" />
                         <span className="text-xs font-black text-green-500 uppercase tracking-widest">Digital Auth Anchor Secured</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                         <div className="p-6 bg-slate-950/80 rounded-2xl border border-white/5 space-y-4">
                            <div>
                               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Aadhaar Number</p>
                               <p className="text-xl font-black text-white italic tracking-[0.2em]">{maskedAadhaar}</p>
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Verified Name</p>
                               <p className="text-xl font-black text-primary italic tracking-tight">{donorData.name}</p>
                            </div>
                         </div>
                         <div className="p-6 bg-slate-950/80 rounded-2xl border border-white/5 space-y-6 flex flex-col justify-center">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase italic">
                               <span>Date of Birth</span>
                               <span className="text-white">{donorData.dob}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase italic">
                               <span>Gender</span>
                               <span className="text-white">{donorData.gender}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase italic">
                               <span>Trust Level</span>
                               <span className="text-green-500 font-black">PLATINUM</span>
                            </div>
                         </div>
                      </div>

                      <div className="mt-16 flex flex-col items-center gap-6">
                         <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest animate-pulse">
                             <UserCheck className="w-4 h-4 text-green-500" /> DIGITAL BIOMETRIC BADGE EARNED
                         </div>
                         <Button className="h-16 px-16 bg-primary hover:bg-red-700 text-white font-black italic text-xl tracking-[0.2em] rounded-2xl shadow-neon uppercase group">
                            APPROVE FOR DONATION <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                         </Button>
                      </div>
                   </div>
                </GlowCard>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
