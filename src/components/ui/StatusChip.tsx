import React from "react";
import { cn } from "@/lib/utils";

interface StatusChipProps {
  status: "active" | "inactive" | "pending" | "critical" | "resolved" | "success";
  label?: string;
  className?: string;
}

export function StatusChip({ status, label, className }: StatusChipProps) {
  const styles = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    critical: "bg-red-500/10 text-red-500 border-red-500/20",
    resolved: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <span className={cn("px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg border", styles[status], className)}>
      {label || status}
    </span>
  );
}
