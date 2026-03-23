"use client"

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, Loader2, CheckCircle2, MapPin, Search, BellRing } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SOSModal({ isOpen, onClose }: SOSModalProps) {
  const [step, setStep] = useState<'input' | 'finding' | 'found'>('input');
  const [formData, setFormData] = useState({
    bloodGroup: '',
    location: '',
    urgency: [50]
  });

  const handleSOSSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bloodGroup || !formData.location) return;
    
    setStep('finding');
    
    // Simulate finding process
    setTimeout(() => {
      setStep('found');
    }, 4000);
  };

  const resetAndClose = () => {
    setStep('input');
    setFormData({ bloodGroup: '', location: '', urgency: [50] });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden glassmorphism border-primary/20">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <DialogTitle className="text-2xl font-black text-center">Emergency Request</DialogTitle>
          <DialogDescription className="text-center">
            Your request will be broadcasted to all nearby donors instantly.
          </DialogDescription>
        </DialogHeader>

        {step === 'input' && (
          <form onSubmit={handleSOSSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Blood Group Needed</label>
                <Select onValueChange={(v) => setFormData({...formData, bloodGroup: v})} value={formData.bloodGroup}>
                  <SelectTrigger className="h-12 rounded-xl border-2 focus:ring-primary">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOOD_GROUPS.map(bg => (
                      <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">City / Current Hospital</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-primary" />
                  <Input 
                    placeholder="e.g. Apollo Hospital, Mumbai" 
                    className="pl-10 h-12 rounded-xl border-2"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                   <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Urgency Level</label>
                   <Badge variant="outline" className={formData.urgency[0] > 70 ? "text-primary border-primary animate-pulse" : ""}>
                     {formData.urgency[0] === 100 ? "CRITICAL" : formData.urgency[0] > 50 ? "URGENT" : "STABLE"}
                   </Badge>
                </div>
                <Slider 
                  value={formData.urgency} 
                  onValueChange={(v) => setFormData({...formData, urgency: v})} 
                  max={100} 
                  step={1} 
                  className="py-4"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 bg-primary hover:bg-red-700 font-black text-lg rounded-2xl shadow-xl shadow-primary/20 gap-2">
              <BellRing className="h-5 w-5" />
              BROADCAST ALERTS
            </Button>
          </form>
        )}

        {step === 'finding' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
             <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <Search className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
             </div>
             <div className="text-center space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black animate-pulse text-primary italic">Sending alerts...</h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Matching donors...</p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground font-medium max-w-[200px] mx-auto">
                   <div className="flex items-center gap-2 justify-start"><div className="w-2 h-2 rounded-full bg-primary animate-ping" /> <span className="text-[10px] font-black">GPS ENCRYPTED</span></div>
                   <div className="flex items-center gap-2 justify-start"><div className="w-2 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} /> <span className="text-[10px] font-black">NETWORK BROADCAST</span></div>
                </div>
             </div>
          </div>
        )}

        {step === 'found' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-500">
             <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center border-4 border-green-500/20 shadow-xl shadow-green-500/10">
                <CheckCircle2 className="h-14 w-14 text-green-600 dark:text-green-400" />
             </div>
             <div className="text-center space-y-2">
                <h3 className="text-3xl font-black text-green-600 dark:text-green-400">3 donors found nearby</h3>
                <p className="text-muted-foreground font-medium text-balance">Verified {formData.bloodGroup} donors have acknowledged your emergency request.</p>
             </div>
             
             <div className="w-full bg-muted/50 rounded-2xl p-4 border border-border space-y-3">
                <div className="flex justify-between items-center text-sm">
                   <span className="font-bold">Estimated Response:</span>
                   <span className="text-primary font-black">5 - 8 mins</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="w-3/4 h-full bg-green-500 rounded-full animate-pulse"></div>
                </div>
             </div>

             <Button onClick={resetAndClose} variant="outline" className="w-full h-12 rounded-xl font-bold border-2">
                DISMISS
             </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
