
import Link from 'next/link';
import { Droplet, ShieldCheck, Phone, Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Droplet className="h-6 w-6 text-primary fill-primary" />
              <span className="text-xl font-bold tracking-tight text-primary">HemoLink</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's smart blood donor network. Connects donors, hospitals, and blood banks to save lives during emergencies.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Govt. Verified Initiative
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-primary transition-colors">Find Donors</Link></li>
              <li><Link href="/emergency" className="hover:text-primary transition-colors">Emergency Request</Link></li>
              <li><Link href="/banks" className="hover:text-primary transition-colors">Blood Banks</Link></li>
              <li><Link href="/register" className="hover:text-primary transition-colors">Become a Donor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1800-123-4567 (Toll Free)</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> help@hemolink.gov.in</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4" /> www.hemolink.gov.in</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HemoLink - Ministry of Health & Family Welfare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
