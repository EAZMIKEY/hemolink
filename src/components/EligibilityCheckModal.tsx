"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2, History, Scale, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { logEvent } from '@/lib/audit/auditLog';

interface EligibilityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  donorName: string;
}

export function EligibilityCheckModal({ isOpen, onClose, onConfirm, donorName }: EligibilityCheckModalProps) {
  const [checks, setChecks] = useState({
    age: false,
    weight: false,
    gap: false,
    health: false,
    risk: false
  });

  const allPassed = Object.values(checks).every(v => v);

  const handleConfirm = () => {
    if (!allPassed) {
      toast({ title: "Safety Warning", description: "You must meet all government-mandated medical criteria to proceed.", variant: "destructive" });
      return;
    }
    
    logEvent({
      user: donorName,
      action: "ELIGIBILITY_PASSED",
      role: "donor",
      details: "Donor self-certified compliance with national medical guidelines."
    });
    
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-green-500/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-black italic tracking-tight">Donation Eligibility</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400 font-medium">
            Self-certification according to National Blood Transfusion Council (NBTC) guidelines.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <EligibilityItem 
            id="age"
            checked={checks.age}
            onChange={(v) => setChecks({...checks, age: v})}
            title="Age Range (18–65)"
            description="I am between 18 and 65 years of age."
            icon={<History className="w-4 h-4" />}
          />
          <EligibilityItem 
            id="weight"
            checked={checks.weight}
            onChange={(v) => setChecks({...checks, weight: v})}
            title="Minimum Weight (>50kg)"
            description="I weigh at least 50 kg (110 lbs)."
            icon={<Scale className="w-4 h-4" />}
          />
          <EligibilityItem 
            id="gap"
            checked={checks.gap}
            onChange={(v) => setChecks({...checks, gap: v})}
            title="3-Month Donation Gap"
            description="It has been more than 90 days since my last whole blood donation."
            icon={<AlertCircle className="w-4 h-4" />}
          />
          <EligibilityItem 
            id="health"
            checked={checks.health}
            onChange={(v) => setChecks({...checks, health: v})}
            title="Hemoglobin & Pulse"
            description="I feel healthy and have no fever, cold, or flu symptoms today."
            icon={<CheckCircle2 className="w-4 h-4" />}
          />
          <EligibilityItem 
            id="risk"
            checked={checks.risk}
            onChange={(v) => setChecks({...checks, risk: v})}
            title="Safety Certification"
            description="I do not have any active high-risk behaviors as defined by NBTC safety standards."
            icon={<AlertCircle className="w-4 h-4 text-primary" />}
          />
        </div>

        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-slate-500">Guidelines Source</span>
            <Badge variant="outline" className="text-[9px] bg-slate-900 border-slate-700">NACO / NBTC</Badge>
          </div>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
            Note: Final medical screening will be conducted by professional staff at the donation site.
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">I don't qualify today</Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!allPassed}
            className={`font-black italic transition-all ${
              allPassed 
                ? "bg-green-600 hover:bg-green-700 text-white scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                : "bg-slate-800 text-slate-500"
            }`}
          >
            {allPassed ? "I AM ELIGIBLE TO DONATE" : "CHECK ALL REQUIREMENTS"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EligibilityItem({ id, checked, onChange, title, description, icon }: any) {
  return (
    <div 
      className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
        checked 
          ? "bg-green-500/10 border-green-500/30" 
          : "bg-slate-800/30 border-white/5 hover:border-white/10"
      }`}
      onClick={() => onChange(!checked)}
    >
      <div className="pt-0.5">
        <Checkbox 
          id={id} 
          checked={checked} 
          onCheckedChange={onChange}
          className="rounded-full border-2 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className={`p-1 rounded-md bg-slate-900 ${checked ? 'text-green-500' : 'text-slate-400'}`}>
            {icon}
          </span>
          <Label htmlFor={id} className="text-sm font-black italic cursor-pointer">{title}</Label>
        </div>
        <p className="text-[11px] text-slate-400 font-medium leading-tight">{description}</p>
      </div>
    </div>
  );
}
