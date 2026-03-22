
"use client"

import Link from 'next/link';
import { Droplet, Menu, X, LayoutDashboard, Search, MapPin, AlertCircle, Cloud } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Banks', href: '/banks', icon: MapPin },
    { name: 'Emergency', href: '/emergency', icon: AlertCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Droplet className="h-6 w-6 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">HemoLink</span>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Antigravity</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:text-primary hover:bg-primary/5 rounded-full flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
            <div className="ml-6 flex items-center gap-3">
              <Button variant="ghost" className="font-bold text-slate-900 hover:bg-slate-100 rounded-full px-6" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white font-black shadow-lg shadow-primary/20 rounded-full px-8 hover-lift" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn("md:hidden border-t bg-white px-4 py-6 space-y-6 animate-in slide-in-from-top-4 duration-300", isOpen ? "block" : "hidden")}>
        <div className="grid grid-cols-2 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 hover:text-primary transition-all text-sm font-bold border border-transparent hover:border-primary/10"
            >
              <link.icon className="h-6 w-6" />
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-lg border-2" asChild>
            <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
          </Button>
          <Button className="w-full h-14 rounded-2xl font-black text-lg bg-primary hover:bg-primary/90" asChild>
            <Link href="/register" onClick={() => setIsOpen(false)}>Join Network</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
