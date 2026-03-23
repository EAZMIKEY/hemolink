import React from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: "red" | "blue" | "green" | "yellow" | "primary";
}

export function GlowCard({
  children,
  className,
  glowColor = "primary",
  ...props
}: GlowCardProps) {
  // Map our custom design tokens to the tailwind classes
  const glowMap = {
    red: "hover:shadow-[0_0_30px_-5px_var(--neon-red)]",
    blue: "hover:shadow-[0_0_30px_-5px_var(--neon-blue)]",
    green: "hover:shadow-[0_0_30px_-5px_#00ff00]",
    yellow: "hover:shadow-[0_0_30px_-5px_#ffea00]",
    primary: "hover:shadow-[0_0_30px_-5px_var(--primary-red)]",
  };

  return (
    <div
      className={cn(
        "relative rounded-[1.25rem] bg-card p-6 border border-border/40 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 overflow-hidden group",
        glowMap[glowColor],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
