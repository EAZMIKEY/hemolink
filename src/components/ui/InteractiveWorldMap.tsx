"use client";

import React, { memo, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Premium Cinematic Globe 3.0 — High-Density Spherical Projection
// ─────────────────────────────────────────────────────────────

// More detailed world paths (using simplified coordinates but better resolution)
const DETAILED_WORLD_PATHS = [
  // North America
  "M10,20 C15,15 25,12 35,18 C40,22 42,35 35,45 C30,48 20,40 10,25 Z",
  // South America
  "M30,48 C35,48 40,55 38,75 C35,85 25,85 25,65 C25,55 28,48 30,48 Z",
  // Africa
  "M45,35 C50,30 60,30 65,40 C68,55 62,75 55,80 C48,75 42,55 45,35 Z",
  // Europe
  "M45,20 C50,15 55,15 58,22 C55,28 48,28 45,20 Z",
  // Asia
  "M58,15 C70,10 85,10 95,20 C98,35 90,60 75,65 C65,60 58,45 58,15 Z",
  // Australia
  "M78,65 C85,65 92,70 90,82 C85,88 75,85 78,65 Z",
  // Greenland
  "M35,10 C40,8 45,8 48,15 C42,18 35,15 35,10 Z",
];

// Refined Fisheye/Spherical Projection Algorithm
const projectSpherical = (x: number, y: number, center: { x: number, y: number }, strength: number = 0.4) => {
  const dx = (x - center.x) / 50;
  const dy = (y - center.y) / 50;
  const distSq = dx * dx + dy * dy;
  const dist = Math.sqrt(distSq);
  
  if (dist > 1.2) return { x, y, opacity: 0, scale: 0 }; // Clip at horizon
  
  // Stronger spherical wrap-around factor
  const factor = 1 + strength * (1 - Math.cos((dist * Math.PI) / 1.5));
  
  return {
    x: center.x + dx * 50 * factor,
    y: center.y + dy * 50 * factor,
    opacity: Math.max(0, 1 - distSq * 0.8), // Fades at the edges (Z-depth)
    scale: 1 - distSq * 0.4
  };
};

interface Node {
  id: number;
  x: number;
  y: number;
  status: 'active' | 'idle';
  label?: string;
}

const INITIAL_NODES: Node[] = [
  { id: 1, x: 67, y: 38, status: 'active', label: "Delhi" },
  { id: 2, x: 47, y: 22, status: 'active', label: "London" },
  { id: 3, x: 24, y: 30, status: 'idle', label: "New York" },
  { id: 4, x: 82, y: 28, status: 'active', label: "Tokyo" },
  { id: 5, x: 54, y: 36, status: 'active', label: "Cairo" },
  { id: 6, x: 32, y: 68, status: 'idle', label: "São Paulo" },
  { id: 7, x: 84, y: 72, status: 'active', label: "Sydney" },
  { id: 8, x: 56, y: 55, status: 'idle', label: "Nairobi" },
];

const MapChart = () => {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        status: Math.random() > 0.8 ? (n.status === 'active' ? 'idle' : 'active') : n.status
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Generate 2x Density Dot Grid with Spherical Projection
  const dots = useMemo(() => {
    const d = [];
    const spacing = 1.0; // Tighter spacing for higher density
    const center = { x: 50, y: 42 };
    for (let x = 0; x <= 100; x += spacing) {
      for (let y = 0; y <= 100; y += spacing) {
        const proj = projectSpherical(x, y, center, 0.45);
        if (proj.opacity > 0) {
          d.push({ ...proj, originalX: x, originalY: y });
        }
      }
    }
    return d;
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="detailWorldMask">
            <rect width="100" height="100" fill="black" />
            {DETAILED_WORLD_PATHS.map((path, i) => (
              <path key={i} d={path} fill="white" filter="blur(0.8px)" />
            ))}
          </mask>
          
          <filter id="bloom" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="strongBloom" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Global Ambient Red "Core Glow" */}
        <radialGradient id="globeCoreGlow" cx="50%" cy="42%" r="50%">
          <stop offset="0%" stopColor="#FF2D2D" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#FF2D2D" stopOpacity="0.02" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <circle cx="50" cy="42" r="50" fill="url(#globeCoreGlow)" />

        {/* 1:1 Parity High-Density Dotted Globe */}
        <g mask="url(#detailWorldMask)">
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={0.11 * dot.scale}
              fill="#FF2D2D"
              opacity={dot.opacity * 0.25}
            />
          ))}
        </g>

        {/* Live Network Activity Connections */}
        <g opacity="0.12">
          {[
            [1, 2], [2, 3], [3, 6], [1, 5], [5, 8], [1, 4], [4, 7]
          ].map(([fromId, toId], i) => {
            const from = nodes.find(n => n.id === fromId);
            const to = nodes.find(n => n.id === toId);
            if (!from || !to) return null;
            return (
              <motion.line
                key={`line-${i}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke="#FF2D2D"
                strokeWidth="0.04"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, delay: i * 0.4 }}
              />
            );
          })}
        </g>

        {/* Glowing Nodes (matched to reference pulse) */}
        {nodes.map((node) => (
          <g key={node.id}>
             {/* Sub-node glow heatmap */}
             <circle
                cx={node.x} cy={node.y}
                r={node.status === 'active' ? 1.5 : 0.8}
                fill="#FF2D2D"
                opacity={node.status === 'active' ? 0.08 : 0.02}
                filter="url(#bloom)"
             />

             {/* Radar Pulse */}
             <motion.circle
                cx={node.x} cy={node.y}
                r={0.3}
                fill="none"
                stroke="#FF2D2D"
                strokeWidth="0.08"
                animate={{
                  r: node.status === 'active' ? [0.3, 2.5] : [0.2, 1.2],
                  opacity: [0.7, 0]
                }}
                transition={{
                  duration: node.status === 'active' ? 1.2 : 4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
             />

             {/* Core Dot (Luminous) */}
             <motion.circle
                cx={node.x} cy={node.y}
                r="0.25"
                fill="#FF2D2D"
                filter="url(#strongBloom)"
                animate={{
                  scale: node.status === 'active' ? [1, 1.4, 1] : 1,
                  opacity: node.status === 'active' ? [0.6, 1, 0.6] : 0.4
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
             />
          </g>
        ))}
      </svg>

      {/* Atmospheric Horizon Glow (Red Mist) */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{
        background: 'radial-gradient(circle at 50% 42%, transparent 40%, rgba(255, 45, 45, 0.04) 55%, transparent 70%)'
      }} />
    </div>
  );
};

export const InteractiveWorldMap = memo(MapChart);
