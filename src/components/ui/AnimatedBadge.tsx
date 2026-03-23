import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "live" | "success" | "warning" | "error" | "info";
  pulsing?: boolean;
}

export function AnimatedBadge({
  children,
  variant = "info",
  pulsing = false,
  className,
  ...props
}: AnimatedBadgeProps) {
  
  const variants = {
    live: "bg-red-500/10 text-red-500 border-red-500/30",
    success: "bg-green-500/10 text-green-500 border-green-500/30",
    warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    error: "bg-red-500/10 text-red-500 border-red-500/30",
    info: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  };

  const dotColors = {
    live: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        {pulsing && (
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotColors[variant])}></span>
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", dotColors[variant])}></span>
      </span>
      <span className="uppercase tracking-widest">{children}</span>
    </div>
  );
}
