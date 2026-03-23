"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, ShieldCheck, Phone, CheckCircle2, Lock, Star, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function TrustCenter({ user, onUpdateUser }: { user: any, onUpdateUser: (u: any) => void }) {
  const { toast } = useToast();
  
  // States
  const [phoneVerified, setPhoneVerified] = useState(user?.phoneVerified || false);
  const [isPhoneVrfyActive, setIsPhoneVrfyActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState("");

  const [isDigiLocked, setIsDigiLocked] = useState(user?.isVerified || false);
  const [isVerifyingDigi, setIsVerifyingDigi] = useState(false);
  const [isUpdatingData, setIsUpdatingData] = useState(false);

  // Trust Score Logic
  let trustScore = 50; // Base score
  if (user?.role === 'hospital' || user?.role === 'bloodbank') trustScore = 80;
  if (phoneVerified) trustScore += 25;
  if (isDigiLocked) trustScore += 25;
  if (trustScore > 100) trustScore = 100;

  useEffect(() => {
    if (user) {
      setPhoneVerified(user.phoneVerified || false);
      setIsDigiLocked(user.isVerified || false);
    }
  }, [user]);

  const handleSendOTP = () => {
    toast({ title: "Sending OTP...", description: "Simulated sending 4-digit code." });
    setTimeout(() => setOtpSent(true), 1000);
  };

  const handleVerifyOTP = () => {
    if (otpVal.length === 4) {
      toast({ title: "Phone Verified ✅", description: "Your phone number is successfully verified." });
      setPhoneVerified(true);
      setIsPhoneVrfyActive(false);
      updateUser({ ...user, phoneVerified: true });
    } else {
      toast({ variant: "destructive", title: "Invalid OTP", description: "Please enter a 4-digit code." });
    }
  };

  const handleDigiLocker = () => {
    setIsVerifyingDigi(true);
    toast({ title: "Connecting to DigiLocker...", description: "Secure verification via DigiLocker (simulated)" });
    
    setTimeout(() => {
      setIsVerifyingDigi(false);
      setIsDigiLocked(true);
      toast({ title: "Verification Successful ✅", description: "Government ID securely matched." });
      updateUser({ ...user, isVerified: true });
    }, 2500);
  };

  const handleUpdateDigiLocker = () => {
    setIsUpdatingData(true);
    setTimeout(() => {
      setIsUpdatingData(false);
      toast({ title: "Data updated successfully", description: "Latest credentials synced." });
    }, 2000);
  };

  const updateUser = (updated: any) => {
    onUpdateUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
      {/* Trust Score Card */}
      <Card className="rounded-[2rem] border border-border shadow-md bg-white dark:bg-slate-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
            Trust Score
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-2">
            <h3 className="text-5xl font-black">{trustScore}%</h3>
            <span className="text-sm font-bold text-muted-foreground mb-1">Reliability</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${trustScore}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {isDigiLocked && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none font-bold text-[10px]"><ShieldCheck className="w-3 h-3 mr-1" /> Govt Verified</Badge>}
            {phoneVerified && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none font-bold text-[10px]"><Phone className="w-3 h-3 mr-1" /> OTP Verified</Badge>}
          </div>
        </CardContent>
      </Card>

      {/* Identiy Verification */}
      <Card className="md:col-span-2 rounded-[2rem] border border-border bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" /> Security & Trust Center
          </CardTitle>
          <CardDescription className="text-xs font-bold">Secure verification via DigiLocker (simulated)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          
          {/* Phone Verify */}
          <div className="flex-1 space-y-4 bg-white dark:bg-slate-950 p-5 rounded-[1.5rem] border shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${phoneVerified ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Phone Number</h4>
                <p className="text-xs text-muted-foreground">{phoneVerified ? '+91 XXXXX XXXX' : 'Not verified'}</p>
              </div>
            </div>
            
            {!phoneVerified ? (
              !isPhoneVrfyActive ? (
                <Button variant="outline" size="sm" className="w-full font-bold" onClick={() => setIsPhoneVrfyActive(true)}>
                  Verify Phone
                </Button>
              ) : (
                <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                  {otpSent ? (
                    <div className="flex gap-2">
                      <Input placeholder="Code" className="h-9 font-bold tracking-widest text-center" value={otpVal} onChange={e => setOtpVal(e.target.value)} maxLength={4} />
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold" onClick={handleVerifyOTP}>Verify</Button>
                    </div>
                  ) : (
                    <Button size="sm" className="w-full bg-slate-900 text-white font-bold" onClick={handleSendOTP}>Send OTP</Button>
                  )}
                </div>
              )
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm bg-green-50 p-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4" /> Phone Verified ✅
              </div>
            )}
          </div>

          {/* DigiLocker Verify */}
          <div className="flex-1 space-y-4 bg-white dark:bg-slate-950 p-5 rounded-[1.5rem] border shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDigiLocked ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">DigiLocker KYC</h4>
                <p className="text-xs text-muted-foreground">{isDigiLocked ? 'Government Verified' : 'Action Required'}</p>
              </div>
            </div>

            {!isDigiLocked ? (
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20" 
                onClick={handleDigiLocker}
                disabled={isVerifyingDigi}
              >
                {isVerifyingDigi ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Connecting...</>
                ) : (
                  "Verify via DigiLocker 🔐"
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm bg-green-50 p-2 rounded-xl">
                  ✔ Verified Donor
                </div>
                <Button 
                  variant="outline"
                  size="sm" 
                  className="w-full font-bold text-xs" 
                  onClick={handleUpdateDigiLocker}
                  disabled={isUpdatingData}
                >
                  {isUpdatingData ? <RefreshCw className="w-3 h-3 mr-2 animate-spin" /> : <RefreshCw className="w-3 h-3 mr-2" />}
                  Update from DigiLocker
                </Button>
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
