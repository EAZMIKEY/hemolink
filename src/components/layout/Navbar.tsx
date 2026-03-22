
"use client"

import Link from 'next/link';
import { Droplet, Menu, X, LayoutDashboard, Search, MapPin, AlertCircle } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform shadow-sm">
              <Droplet className="h-5 w-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">HemoLink</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:text-primary hover:bg-primary/5 rounded-md flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
            <div className="ml-4 flex items-center gap-2">
              <Button variant="ghost" className="font-semibold" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-md" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn("md:hidden border-t bg-white px-4 py-4 space-y-4", isOpen ? "block" : "hidden")}>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-sm font-bold"
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
          </Button>
          <Button className="w-full bg-primary" asChild>
            <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
