"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplet, Menu, X, LayoutDashboard, Search, MapPin, AlertCircle, Activity, History as Auditing, FileText, Globe, ShieldCheck, Users, Heart, Settings } from 'lucide-react';
import { UserStats } from "@/components/UserStats";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check for user login status
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    // Listen for storage changes (for across tabs)
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Banks', href: '/banks', icon: MapPin },
    { name: 'Emergency', href: '/emergency', icon: AlertCircle },
  ];

  const moduleLinks = [
    { name: 'State Hub', href: '/dashboard/state', icon: Droplet },
    { name: 'Components', href: '/dashboard/blood-components', icon: Activity },
    { name: 'Camps', href: '/dashboard/camps', icon: MapPin },
    { name: 'Appointments', href: '/dashboard/appointments', icon: LayoutDashboard },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Incidents', href: '/dashboard/incidents', icon: AlertCircle },
    { name: 'API Monitor', href: '/dashboard/national/api-monitor', icon: Activity },
    { name: 'Verification', href: '/dashboard/verification', icon: ShieldCheck },
    { name: 'Staff Hub', href: '/dashboard/staff', icon: Users },
    { name: 'Volunteers', href: '/dashboard/volunteers', icon: Heart },
    { name: 'Audit Logs', href: '/dashboard/audit-logs', icon: Auditing },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform shadow-sm">
              <Droplet className="h-5 w-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">HemoLink</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm transition-all duration-300 flex items-center gap-2 rounded-lg font-bold group",
                    isActive 
                      ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <link.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-muted-foreground")} />
                  {link.name}
                </Link>
              );
            })}

            {/* Modules Dropdown Placeholder/Simple Implementation */}
            <div className="relative group ml-4 h-full flex items-center">
               <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg font-bold flex items-center gap-2 transition-all">
                  <Menu className="h-4 w-4" /> MODULES
               </button>
               <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-xl p-2 z-[60]">
                  {moduleLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-3 p-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-primary/10 transition-all"
                    >
                      <link.icon className="h-4 w-4 text-primary" />
                      {link.name}
                    </Link>
                  ))}
               </div>
            </div>

            {/* Modules Dropdown ... existing code ... */}

            {/* National Mode Switch */}
            <div className="flex items-center gap-2 ml-6 pl-6 border-l border-white/10">
               <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">View Mode</span>
                  <select className="bg-transparent text-white text-[10px] font-black uppercase tracking-tighter outline-none cursor-pointer focus:text-primary transition-colors">
                     <option className="bg-slate-900">National Hub</option>
                     <option className="bg-slate-900">State: Delhi</option>
                     <option className="bg-slate-900">District: Central</option>
                  </select>
               </div>
               <Globe className="w-4 h-4 text-primary animate-pulse" />
            </div>

            <div className="ml-2 flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
              {user ? (
                <>
                  <span className="text-xs font-bold text-muted-foreground mr-2">
                    Hi, {user.name}
                  </span>
                  <Button 
                    variant="outline" 
                    className="border-2 font-bold hover:bg-red-50 hover:text-primary hover:border-primary/30 transition-all"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="font-semibold text-foreground/70 hover:text-primary" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-md" asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn("md:hidden border-t bg-background px-4 py-4 space-y-4", isOpen ? "block" : "hidden")}>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary/10 text-primary border-l-4 border-primary" 
                    : "hover:bg-slate-50 text-slate-600 dark:hover:bg-white/5 dark:text-slate-400"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 pb-2 border-t border-white/5">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-3 mb-2">System Modules</p>
             <div className="grid grid-cols-2 gap-2">
                {moduleLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-primary/10 transition-all border border-white/5"
                  >
                    <link.icon className="h-4 w-4 text-primary" />
                    {link.name}
                  </Link>
                ))}
             </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-3 py-2">
            <span className="text-sm font-bold text-muted-foreground">Appearance</span>
            <ThemeToggle />
          </div>
          {user ? (
            <Button variant="destructive" className="w-full font-bold" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
              </Button>
              <Button className="w-full bg-primary" asChild>
                <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
