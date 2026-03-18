
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
    { name: 'Search Donors', href: '/search', icon: Search },
    { name: 'Blood Banks', href: '/banks', icon: MapPin },
    { name: 'Emergency', href: '/emergency', icon: AlertCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold tracking-tight text-primary">HemoLink</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5"
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/register">Register as Donor</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn("md:hidden border-t bg-background px-4 py-4 space-y-4", isOpen ? "block" : "hidden")}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 py-2 text-lg font-medium hover:text-primary"
          >
            <link.icon className="h-5 w-5" />
            {link.name}
          </Link>
        ))}
        <div className="flex flex-col gap-2 pt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/register" onClick={() => setIsOpen(false)}>Register as Donor</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
