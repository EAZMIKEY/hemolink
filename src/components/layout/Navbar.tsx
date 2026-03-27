"use client"

import { Link, usePathname, useRouter } from '@/i18n/routing';
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
import { useTranslations } from 'next-intl';
import { LanguageSelector } from './LanguageSelector';


import { UnifiedOperationsHub } from './UnifiedOperationsHub';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navbar');
  const tc = useTranslations('common');


  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);


  const toggleAI = () => {
    // Dispatch custom event for the global AI Module Container
    window.dispatchEvent(new CustomEvent('hemolink:toggle-ai'));
  };

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
    router.push("/login");
  };

  const navLinks = [
    { name: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'search', href: '/search', icon: Search },
    { name: 'banks', href: '/banks', icon: MapPin },
    { name: 'emergency', href: '/emergency', icon: AlertCircle },
  ];


  const moduleLinks = [
    { name: t('stateHub'), href: '/dashboard/state', icon: Droplet },
    { name: t('bloodComponents'), href: '/dashboard/blood-components', icon: Activity },
    { name: t('camps'), href: '/dashboard/camps', icon: MapPin },
    { name: t('appointments'), href: '/dashboard/appointments', icon: LayoutDashboard },
    { name: t('reports'), href: '/dashboard/reports', icon: FileText },
    { name: t('incidents'), href: '/dashboard/incidents', icon: AlertCircle },
    { name: t('apiMonitor'), href: '/dashboard/national/api-monitor', icon: Activity },
    { name: t('verification'), href: '/dashboard/verification', icon: ShieldCheck },
    { name: t('staffHub'), href: '/dashboard/staff', icon: Users },
    { name: t('volunteers'), href: '/dashboard/volunteers', icon: Heart },
    { name: t('auditLogs'), href: '/dashboard/audit-logs', icon: Auditing },
    { name: t('settings'), href: '/dashboard/settings', icon: Settings },



  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transition-transform shadow-sm">
              <Droplet className="h-5 w-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">HemoLink</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-4">
            {/* Unified Hub and Nav Links Group */}
            <div className="flex items-center gap-2 flex-1 justify-center">
              <div className="flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "px-2 xl:px-3 py-2 text-[11px] xl:text-[13px] transition-all duration-300 flex items-center gap-1.5 rounded-lg font-bold group",
                        isActive 
                          ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <link.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span className="inline">{tc(link.name)}</span>

                  </Link>

                  );
                })}
              </div>
              
              <div className="h-4 w-px bg-white/10 mx-1" />
              
              {/* Unified Operations Hub (MODULES) - Moved to center-right group */}
              <UnifiedOperationsHub onOpenAI={toggleAI} />
            </div>

            {/* Right Side Tools */}
            <div className="flex items-center gap-1 shrink-0">

              {/* National Hub Toggle */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-all">
                 <Globe className="w-4 h-4 text-primary animate-pulse" />
                 <select className="bg-transparent text-white text-[9px] font-black uppercase tracking-wider outline-none cursor-pointer focus:text-primary transition-colors appearance-none px-1">
                    <option className="bg-slate-900">{t('nationalHub')}</option>
                    <option className="bg-slate-900">{t('stateDelhi')}</option>
                    <option className="bg-slate-900">{t('districtCentral')}</option>

                 </select>
              </div>

              <div className="shrink-0">
                 <LanguageSelector />
              </div>

              
              {user ? (

                <div className="flex items-center gap-2 pl-2 border-l border-white/10 shrink-0">

                  <span className="text-xs font-bold text-slate-300">
                    {user.name}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/10 font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all text-xs"
                    onClick={handleLogout}
                  >
                    {t('logout', { defaultValue: 'Logout' })}


                  </Button>


                </div>
              ) : (
                <div className="flex items-center gap-1 pl-1.5 border-l border-white/10 shrink-0">
                  <Button variant="ghost" size="sm" className="font-bold text-slate-300 hover:text-white text-[10px] px-1.5" asChild>
                    <Link href="/login">{t('login')}</Link>
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-neon-red text-white font-black uppercase tracking-wider text-[9px] px-2 rounded-lg h-7" asChild>
                    <Link href="/register">{t('register')}</Link>
                  </Button>



                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-300 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
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
                {tc(link.name)}


              </Link>

            );
          })}

          <div className="pt-4 pb-2 border-t border-white/5">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-3 mb-4">{t('opsHubLabel')}</p>



             <div className="grid grid-cols-2 gap-2 px-3">
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
               <button
                 onClick={() => {
                   toggleAI();
                   setIsOpen(false);
                 }}
                 className="flex items-center gap-2 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-primary/10 transition-all border border-white/5 text-left"
               >
                 <Activity className="h-4 w-4 text-primary" />
                 {t('aiPanel')}
               </button>

             </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-3 py-2">
            <span className="text-sm font-bold text-muted-foreground">{t('versionLabel')}</span>
            <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">v2.4.0-PRO</span>
          </div>



          {user ? (
            <Button variant="destructive" className="w-full font-bold" onClick={handleLogout}>
              {t('logout')}
            </Button>
          ) : (
            <>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login" onClick={() => setIsOpen(false)}>{t('signIn')}</Link>
              </Button>
              <Button className="w-full bg-primary" asChild>
                <Link href="/register" onClick={() => setIsOpen(false)}>{t('registerBtn')}</Link>
              </Button>

            </>


          )}
        </div>
      </div>
    </nav>
  );
}
