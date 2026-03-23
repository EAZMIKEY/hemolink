"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight, Heart, Droplet, Zap } from 'lucide-react';
import { SOSModal } from './SOSModal';
import Link from 'next/link';

export function HeroSection() {
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background py-20 px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative z-10 mx-auto text-center space-y-12">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/5 dark:bg-primary/10 px-6 py-2 rounded-full border border-primary/20 backdrop-blur-sm animate-in fade-in slide-in-from-top duration-700">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Emergency Blood Network</span>
        </div>

        {/* Headlines */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-foreground animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <span className="block opacity-90">Connecting Donors.</span>
            <span className="text-gradient block italic">Saving Lives.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            The world's fastest emergency blood donor finder. Join thousands of heroes saving lives every day.
          </p>
        </div>

        {/* SOS Button Section */}
        <div className="flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-700 delay-500">
          <div className="relative group p-4">
            {/* Multiple Pulse Rings for Premium Feel */}
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-20"></div>
            <div className="absolute inset-[-10px] rounded-full bg-primary/20 animate-pulse-slow opacity-20"></div>
            <div className="absolute inset-[-30px] rounded-full bg-primary/10 animate-pulse-slow opacity-10" style={{ animationDelay: '1s' }}></div>
            
            <Button 
              size="lg" 
              onClick={() => setIsSOSOpen(true)}
              className="relative w-40 h-40 md:w-52 md:h-52 rounded-full bg-primary hover:bg-red-600 text-white border-[12px] border-background shadow-[0_0_60px_-15px_rgba(255,26,26,0.6)] transition-all hover:scale-110 active:scale-95 flex flex-col items-center justify-center gap-2 group-hover:border-primary/20"
            >
              <Zap className="h-12 w-12 md:h-16 md:w-16 fill-white drop-shadow-lg" />
              <span className="font-black text-3xl md:text-4xl tracking-tighter">SOS</span>
            </Button>
          </div>
          <p className="text-sm font-black text-primary animate-pulse uppercase tracking-[0.4em]">Tap for Emergency Help</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Button size="lg" className="h-16 px-12 rounded-[2rem] font-black text-xl shadow-xl shadow-primary/20 bg-primary hover:bg-red-700 transition-all hover:scale-105" asChild>
            <Link href="/register">BECOME A DONOR</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-16 px-12 rounded-[2rem] font-bold text-xl border-4 hover:bg-primary/5 transition-all" asChild>
            <Link href="/search">Search Network</Link>
          </Button>
        </div>
      </div>

      {/* SOS Modal Component */}
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
    </section>
  );
}
