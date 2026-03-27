"use client"

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { 
  Droplet, Activity, MapPin, LayoutDashboard, FileText, 
  AlertCircle, ShieldCheck, Users, Heart, History as Auditing, 
  Settings, Search, Brain, ChevronRight, Menu 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface NavLink {
  name: string;
  href: string;
  icon: any;
  color: string;
  desc?: string;
}

interface NavGroup {
  label: string;
  tagline: string;
  links: NavLink[];
}

export function UnifiedOperationsHub({ onOpenAI }: { onOpenAI: () => void }) {
  const t = useTranslations('navbar');
  const tc = useTranslations('common');
  const [search, setSearch] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const GROUPS: NavGroup[] = [
    {
      label: t('stateSystems'),
      tagline: t('regionalHubTag'),
      links: [
        { name: t('stateHub'), href: '/dashboard/state', icon: Droplet, color: "text-blue-500" },
        { name: t('bloodComponents'), href: '/dashboard/blood-components', icon: Activity, color: "text-blue-500" },
        { name: t('camps'), href: '/dashboard/camps', icon: MapPin, color: "text-blue-500" },
        { name: t('appointments'), href: '/dashboard/appointments', icon: LayoutDashboard, color: "text-blue-500" },
      ]
    },

    {
      label: t('operations'),
      tagline: t('systemicMonitorTag'),
      links: [
        { name: t('reports'), href: '/dashboard/reports', icon: FileText, color: "text-blue-400" },
        { name: t('incidents'), href: '/dashboard/incidents', icon: AlertCircle, color: "text-red-500" },
        { name: t('apiMonitor'), href: '/dashboard/national/api-monitor', icon: Activity, color: "text-blue-400" },
      ]
    },

    {
      label: t('verification'),
      tagline: t('personnelTag'),
      links: [
        { name: t('verification'), href: '/dashboard/verification', icon: ShieldCheck, color: "text-green-500" },
        { name: t('staffHub'), href: '/dashboard/staff', icon: Users, color: "text-yellow-500" },
        { name: t('volunteers'), href: '/dashboard/volunteers', icon: Heart, color: "text-yellow-400" },
      ]
    },

    {
      label: t('admin'),
      tagline: t('governanceTag'),
      links: [
        { name: t('auditLogs'), href: '/dashboard/audit-logs', icon: Auditing, color: "text-slate-400" },
        { name: t('settings'), href: '/dashboard/settings', icon: Settings, color: "text-slate-400" },
        { 
          name: tc('aiInsights'), 
          href: '#', 
          icon: Brain, 
          color: "text-primary", 
          desc: t('openInsights')
        },
      ]
    }


  ];

  // Filter links based on search
  const filteredGroups = GROUPS.map(group => ({
    ...group,
    links: group.links.filter(link => 
      link.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.links.length > 0);

  const handleLinkClick = (href: string) => {
    if (href === '#') {
      onOpenAI();
    }
    setIsVisible(false);
  };

  return (
    <div 
      className="relative ml-4 h-full flex items-center z-[100]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className={cn(
          "px-2 py-1.5 text-[8.5px] font-black tracking-[0.1em] rounded-lg flex items-center gap-1.5 transition-all uppercase whitespace-nowrap",
          isVisible 
            ? "bg-primary text-white shadow-[0_0_25px_rgba(239,68,68,0.4)]" 
            : "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        )}
      >
        <Menu className="h-4 w-4" /> {t('opsHub')}
      </button>

      {/* Main Panel */}
      <div 
        className={cn(
          "absolute top-full right-0 mt-2 w-[340px] md:w-[480px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 p-0 overflow-hidden transform origin-top-right",
          isVisible ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
        )}
      >
        
        {/* Search Header */}
        <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-3">
           <Search className="w-4 h-4 text-slate-500" />
           <Input 
              placeholder={t('searchTools')} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none placeholder:text-slate-500 text-[11px] font-black uppercase tracking-widest focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-4"
           />
        </div>

        {/* Content Area */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 max-h-[70vh] overflow-y-auto custom-scrollbar">
           {filteredGroups.map((group, gIdx) => (
             <React.Fragment key={group.label}>
               {/* Mobile/Full Category Header */}
               <div className="col-span-full px-4 pt-4 pb-1">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">{group.label}</h4>
                 <p className="text-[8px] font-black text-slate-500/50 uppercase tracking-widest">{group.tagline}</p>
               </div>

               {group.links.map((link, lIdx) => (
                 <Link
                   key={link.name}
                   href={link.href}
                   onClick={() => handleLinkClick(link.href)}
                   className="group/item flex flex-col gap-1 p-4 hover:bg-primary/10 transition-all rounded-xl relative overflow-hidden"
                 >
                   <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center transition-transform group-hover/item:scale-110 shadow-lg", link.color.replace('text-', 'bg-').replace('500', '500/10'))}>
                        <link.icon className={cn("h-4 w-4", link.color)} />
                      </div>
                      <span className="text-xs font-black text-slate-300 group-hover/item:text-white uppercase tracking-wider">{link.name}</span>
                   </div>
                   {link.desc && <span className="text-[9px] font-bold text-slate-500 group-hover/item:text-slate-400 pl-11">{link.desc}</span>}
                   
                   {/* Hover Detail */}
                   <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                 </Link>
               ))}

               {/* Separator */}
               <div className="col-span-full h-px bg-white/5 mx-4 my-2 last:hidden" />
             </React.Fragment>
           ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white/5 border-t border-white/5 flex justify-center text-center">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
               {t('opsCoreLabel')}
            </span>
        </div>

      </div>
    </div>
  );
}
