
import Link from 'next/link';
import { Droplet, ShieldCheck, Phone, Mail, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Droplet className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-slate-900">HemoLink</span>
            </Link>
            <p className="text-slate-500 font-medium">
              A real-time network connecting donors and hospitals to ensure blood availability when it's needed most.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-slate-400 hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-primary"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-semibold">
              <li><Link href="/search" className="hover:text-primary">Donor Search</Link></li>
              <li><Link href="/emergency" className="hover:text-primary">Emergency Requests</Link></li>
              <li><Link href="/banks" className="hover:text-primary">Blood Banks</Link></li>
              <li><Link href="/register" className="hover:text-primary">Become a Donor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-semibold">
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Safety Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
                <Phone className="h-4 w-4" /> 1800-HEMOLINK
              </li>
              <li className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
                <Mail className="h-4 w-4" /> support@hemolink.org
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-semibold">© {new Date().getFullYear()} HemoLink Network. All rights reserved.</p>
          <div className="flex items-center gap-4 opacity-40">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Verified System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
