import React from "react";
import { cn } from "@/lib/utils";
import { fadeUpClass } from "@/lib/animations";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Module 3 — Global Layout Component: PageHeader
 * Standardises all page headers across the app with the National UI design token system.
 */
export function PageHeader({ title, subtitle, icon: Icon, badge, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10", fadeUpClass, className)}>
      <div className="flex items-start md:items-center gap-4">
        {Icon && (
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-neon flex-shrink-0">
            <Icon className="h-7 w-7 text-white" />
          </div>
        )}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h1>
            {badge}
          </div>
          {subtitle && (
            <p className="text-muted-foreground font-medium">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
