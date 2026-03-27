"use client"

import React, { useState, useEffect } from 'react';
import { Sparkles, X, Brain, Activity, ShieldAlert, Route, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NationalAIPanel } from '@/components/AI/NationalAIPanel';
import { DonorMatchPanel } from '@/components/AI/DonorMatchPanel';
import { AIHeatmapBox } from '@/components/AI/AIHeatmapBox';

export function AIModuleContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'none' | 'insights' | 'donor' | 'heatmap'>('none');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Global listener for toggling AI Panel from external components (like Navbar)
    const handleToggle = () => {
      setIsOpen(prev => !prev);
      setActivePanel('insights');
    };

    window.addEventListener('hemolink:toggle-ai', handleToggle);
    return () => window.removeEventListener('hemolink:toggle-ai', handleToggle);
  }, []);

  if (!mounted) return null;

  const toggleAI = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setActivePanel('insights');
    else setActivePanel('none');
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[2000]">
      {/* Floating AI Assist Button - Now z-indexed to stay accessible */}
      <div className="absolute bottom-24 right-8 pointer-events-auto">
        <Button
          onClick={toggleAI}
          className={cn(
            "w-14 h-14 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-500 group overflow-hidden z-[2100]",
            isOpen ? "bg-slate-900 border-2 border-primary/50 scale-0" : "bg-primary hover:scale-110"
          )}
        >
          <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        </Button>
      </div>

      {/* AI Components Render Logic */}
      <div className="pointer-events-auto">
        <NationalAIPanel 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      </div>
    </div>
  );
}
