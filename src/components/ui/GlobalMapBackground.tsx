"use client";

import React, { useMemo, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { InteractiveWorldMap } from "@/components/ui/InteractiveWorldMap";

// ─────────────────────────────────────────────────────────────
// Premium Background 3.0 — Deep Cinematic Parity
// ─────────────────────────────────────────────────────────────

const ParticleLayer = memo(() => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 10,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-600/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: '0 0 12px rgba(255, 45, 45, 0.4)',
          }}
          animate={{
            y: [0, -150 - (p.id % 200)],
            opacity: [0, 0.4, 0],
            scale: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: -p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

ParticleLayer.displayName = "ParticleLayer";

export function GlobalMapBackground() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#050505] overflow-hidden">
      {/* 1. Base Layer: Deep Atmospheric Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a0000]/50 via-[#050505] to-[#050505]"
      />
      
      {/* 2. Heatmap & Horizon Glow (Behind Map) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120vw] h-[120vh] z-[1] pointer-events-none opacity-40 blur-[100px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 45, 45, 0.15) 0%, rgba(255, 45, 45, 0.05) 40%, transparent 75%)',
        }}
      />

      {/* 3. Dotted World Map 3.0 (Spherical & High-Density) */}
      <InteractiveWorldMap />

      {/* 4. Particle Atmosphere */}
      <ParticleLayer />

      {/* 5. Deep Final Vignette — For the "Emerging from Shadows" feel */}
      <div 
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 42%, transparent 25%, rgba(0,0,0,0.92) 100%)'
        }}
      />
      
      {/* 6. Cinematic Noise / Film Grain (Very Subtle) */}
      <div className="absolute inset-0 z-[4] opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat" />
      
      {/* Edge Softener */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-[5]" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black to-transparent z-[5]" />
    </div>
  );
}
