"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Droplet, Heart, Award, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from "@/lib/utils";

export function UserStats() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="rounded-premium border-white/5 shadow-premium bg-gradient-to-br from-primary to-red-900 text-white overflow-hidden relative group animate-border-pulse">
        <div className="absolute top-[-10%] right-[-10%] opacity-20 group-hover:scale-120 transition-transform duration-700 animate-float-premium">
           <Trophy className="w-32 h-32" />
        </div>
        <CardContent className="p-8 space-y-4 relative z-10">
           <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Recognition Points</p>
              <h3 className="text-5xl font-black drop-shadow-lg">1,250</h3>
           </div>
           <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-none font-bold px-3 py-1">
                 <Star className="h-3 w-3 mr-1 fill-white" /> SILVER TIER
              </Badge>
              <p className="text-xs font-bold text-white/80 animate-pulse">+200 THIS MONTH</p>
           </div>
        </CardContent>
      </Card>

      <Card className="rounded-premium border-white/5 shadow-premium bg-slate-900/40 backdrop-blur-xl group hover:bg-slate-900/60 transition-colors">
        <CardHeader className="pb-2">
           <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center justify-between">
              IMPACT STATUS
              <Heart className="h-4 w-4 text-primary animate-pulse" />
           </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="flex justify-between items-end">
              <div>
                 <h3 className="text-2xl md:text-3xl font-black group-hover:text-primary transition-colors">4 Donations</h3>
                 <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Lives Saved</p>
              </div>
              <div className="text-right">
                 <h4 className="font-bold text-primary">NEXT: GOLD</h4>
                 <p className="text-[10px] font-black uppercase text-muted-foreground">1 more to go</p>
              </div>
           </div>
           <div className="space-y-3">
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shimmer p-[1px]">
                <div className="h-full bg-gradient-to-r from-primary to-rose-500 rounded-full transition-all duration-1000" style={{ width: '80%' }} />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                 <span>80% Complete</span>
                 <span className="flex items-center gap-1 text-primary"><TrendingUp className="h-3 w-3" /> Trending Up</span>
              </div>
           </div>
        </CardContent>
      </Card>

      <Card className="rounded-premium border-white/5 shadow-premium bg-slate-900/40 backdrop-blur-xl">
         <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center justify-between">
               BADGES UNLOCKED
               <Award className="h-4 w-4 text-primary" />
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-4 gap-3">
               {[
                  { name: 'Lifesaver', icon: Droplet, color: 'text-primary' },
                  { name: 'Responder', icon: Star, color: 'text-amber-500' },
                  { name: 'Hero', icon: Heart, color: 'text-red-400' },
               ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group cursor-help">
                     <div className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center border border-white/5 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-lg group-hover:shadow-primary/20">
                        <badge.icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", badge.color)} />
                     </div>
                     <span className="text-[8px] font-black text-center text-muted-foreground truncate w-full">{badge.name}</span>
                  </div>
               ))}
               <div className="flex flex-col items-center gap-2 opacity-30 grayscale hover:opacity-50 transition-opacity">
                  <div className="w-12 h-12 rounded-2xl bg-dashed border-2 border-slate-700 flex items-center justify-center">
                     <Trophy className="h-6 w-6 text-slate-500" />
                  </div>
                  <span className="text-[8px] font-black text-center text-slate-600">LOCKED</span>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
