import React from "react";
import { cn } from "@/lib/utils";
import { GlowCard } from "./GlowCard";
import { LucideIcon } from "lucide-react";

interface KPIBlockProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string; isPositive: boolean };
  glowColor?: "red" | "blue" | "green" | "yellow" | "primary";
  className?: string;
}

export function KPIBlock({ title, value, icon: Icon, trend, glowColor = "primary", className }: KPIBlockProps) {
  return (
    <GlowCard glowColor={glowColor} className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center bg-background/50 border border-border/50",
          glowColor === "primary" ? "text-primary-red" : `text-${glowColor}-500`
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="flex flex-col gap-1 mt-2">
        <h3 className="text-3xl md:text-4xl font-black tracking-tighter">{value}</h3>
        {trend && (
          <p className="text-xs font-semibold flex items-center gap-1 mt-1">
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.isPositive ? "▲" : "▼"} {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </p>
        )}
      </div>
    </GlowCard>
  );
}
