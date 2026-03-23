"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Lock, Smartphone, Fingerprint, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { logEvent } from '@/lib/audit/auditLog';

interface DonorVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  donorName: string;
}

export function DonorVerificationModal({ isOpen, onClose, onVerified, donorName }: DonorVerificationModalProps) {
  const [step, setStep] = useState(1);
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleNext = () => {
    if (step === 1 && aadhaar.length < 12) {
      toast({ title: "Invalid Input", description: "Please enter a valid 12-digit Aadhaar number.", variant: "destructive" });
      return;
    }
    setStep(step + 1);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate DigiLocker / Aadhaar API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsVerifying(false);
    logEvent({
      user: donorName,
      action: "DONOR_VERIFIED",
      role: "donor",
      details: `Aadhaar verification completed via DigiLocker simulation.`
    });
    
    toast({
      title: "Verification Successful",
      description: "Your identity has been verified with national records.",
    });
    onVerified();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-max-w-[450px] bg-slate-900 border-primary/20 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-primary animate-pulse" />
        
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-black italic tracking-tight">National Trust Verification</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400 font-medium">
            Link your HemoLink profile with national identity records for government-grade trust.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="text-xs font-black uppercase tracking-widest text-primary">Aadhaar Number (UIDAI)</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input 
                    id="aadhaar" 
                    placeholder="xxxx-xxxx-xxxx" 
                    maxLength={12}
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                    className="pl-10 bg-slate-800/50 border-white/10 text-white font-mono tracking-[0.2em]" 
                  />
                </div>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex gap-3">
                <Smartphone className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-[11px] text-blue-200/70 font-medium leading-relaxed">
                  We will send a one-time password (OTP) to the mobile number registered with your UIDAI records.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-xs font-black uppercase tracking-widest text-primary">Verification Code (OTP)</Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input 
                    id="otp" 
                    placeholder="Enter 6-digit code" 
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="pl-10 bg-slate-800/50 border-white/10 text-white font-mono tracking-[0.5em] text-center" 
                  />
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-500 font-bold">
                Didn't receive the code? <span className="text-primary cursor-pointer hover:underline">Resend in 45s</span>
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">Cancel</Button>
          {step === 1 ? (
            <Button onClick={handleNext} className="bg-primary hover:bg-red-600 text-white font-black italic">
              SEND OTP
            </Button>
          ) : (
            <Button 
              onClick={handleVerify} 
              disabled={isVerifying || otp.length < 6}
              className="bg-primary hover:bg-red-600 text-white font-black italic relative overflow-hidden group"
            >
              {isVerifying ? (
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   VERIFYING...
                 </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  CONFIRM IDENTITY
                </div>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
