/**
 * HemoLink — Premium Animation Utilities (Module 20)
 * Centralised animation class helpers for consistent motion across the app.
 */

// Stagger delay for list items  (pass `index` to get a tailwind-safe delay class)
export const staggerDelay = (index: number, base: number = 100): string => {
  const ms = base * index;
  // Use inline style instead of Tailwind to avoid purge issues
  return `${ms}ms`;
};

// Fade + slide from bottom — use as className
export const fadeUpClass = "animate-in fade-in slide-in-from-bottom-4 duration-700";

// Fade + slide from left
export const fadeLeftClass = "animate-in fade-in slide-in-from-left-4 duration-500";

// Fade + slide from right  
export const fadeRightClass = "animate-in fade-in slide-in-from-right-4 duration-500";

// Zoom in fade
export const zoomInClass = "animate-in fade-in zoom-in-95 duration-500";

// Shimmer skeleton loader — apply to placeholder elements
export const shimmerClass = "shimmer rounded-xl bg-muted/30 animate-pulse";

// Premium hover card effect
export const hoverLiftClass = "transition-all duration-500 hover:-translate-y-1 hover:shadow-premium";

// Glow pulse on critical elements
export const glowPulseClass = "animate-pulse shadow-neon";

// Border rotate animation for KPI cards
export const borderPulseClass = "animate-border-pulse";

// Floating animation for decorative icons
export const floatingClass = "animate-float-premium";

// Gradient text  
export const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-400 to-red-700";

// Page container with standard padding — Module 3 global layout
export const pageContainerClass = "container mx-auto px-4 md:px-8 py-10 min-h-screen";

// Section padding standardised
export const sectionClass = "space-y-8 animate-in fade-in duration-700";

// Card with glassmorphism
export const glassCardClass = "bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 rounded-[1.25rem] shadow-xl";
