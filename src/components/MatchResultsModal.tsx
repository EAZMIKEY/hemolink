"use client"

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, MapPin, SignalHigh, Info, CheckCircle2, Star } from 'lucide-react';
import { MatchScore } from '@/lib/matching/aiMatcher';
import { cn } from '@/lib/utils';

interface MatchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: MatchScore[];
  donors: any[];
  onSelect: (donor: any) => void;
  requestType: string;
}

export function MatchResultsModal({ isOpen, onClose, matches, donors, onSelect, requestType }: MatchResultsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-[#020617] border-primary/20 text-white max-h-[85vh] overflow-hidden flex flex-col p-0">
        <div className="h-1 w-full bg-gradient-to-r from-primary via-orange-500 to-primary animate-pulse" />
        
        <div className="p-6 pb-2">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <SignalHigh className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-black italic tracking-tighter">AI Match Analysis</DialogTitle>
                    <DialogDescription className="text-slate-400 font-bold text-xs">
                      Ranked by distance, reliability, and blood compatibility.
                    </DialogDescription>
                  </div>
               </div>
               <Badge className="bg-primary/20 text-primary border-primary/30 font-black italic px-3 py-1">
                 {requestType} NEEDED
               </Badge>
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-4">
          {matches.length > 0 ? (
            matches.map((match, idx) => {
              const donor = donors.find(d => d.id === match.donorId);
              if (!donor) return null;

              return (
                <div 
                  key={match.donorId}
                  className={cn(
                    "relative group p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                    idx === 0 
                      ? "bg-slate-900/80 border-primary/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]" 
                      : "bg-slate-900/40 border-white/5 hover:border-white/10"
                  )}
                  onClick={() => onSelect(donor)}
                >
                  {idx === 0 && (
                    <div className="absolute -top-3 -right-3">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-orange-600 px-3 py-1 rounded-full text-[10px] font-black italic shadow-lg animate-bounce">
                        <Star className="w-3 h-3 fill-current" /> BEST MATCH
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center font-black text-xl border border-white/10 group-hover:border-primary/50 transition-colors">
                          {donor.bloodType}
                        </div>
                        {donor.verified && (
                          <ShieldCheck className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-400 fill-slate-900 border-2 border-slate-900 rounded-full" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black italic text-white group-hover:text-primary transition-colors">{donor.name}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-black tracking-widest uppercase">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {match.distanceKm} KM</span>
                          <span className="flex items-center gap-1"><Info className="w-3 h-3" /> SCORE: {match.score}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black italic text-primary">{Math.round(match.score)}%</div>
                      <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Match Rating</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-black italic mb-1">
                      <span className="text-slate-500 uppercase tracking-[0.2em]">Compatibility Reliability Rating</span>
                      <span className={match.score > 80 ? 'text-green-500' : 'text-primary'}>{match.score > 80 ? 'EXCELLENT' : 'GOOD'}</span>
                    </div>
                    <Progress value={match.score} className="h-1 bg-slate-800" />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {match.reasons.slice(0, 3).map((reason, i) => (
                      <Badge 
                        key={i} 
                        variant="ghost" 
                        className="bg-white/5 text-slate-400 border-none text-[8px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 font-bold">No ideal AI matches found for this request.</div>
          )}
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-white/5">
           <Button 
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black italic tracking-widest"
           >
             DISMISS ANALYSIS
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
