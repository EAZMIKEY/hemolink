
import Link from 'next/link';
import { Droplet, ShieldCheck, Phone, Mail, Globe, Cloud, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Droplet className="h-6 w-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">HemoLink</span>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed">
              Accelerating life-saving connections through Google Antigravity cloud infrastructure. The fastest, weightless blood network in India.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-slate-500 font-bold">
              <li><Link href="/search" className="hover:text-primary transition-colors">Donor Search</Link></li>
              <li><Link href="/emergency" className="hover:text-primary transition-colors">Emergency Pulse</Link></li>
              <li><Link href="/banks" className="hover:text-primary transition-colors">Cloud Nodes</Link></li>
              <li><Link href="/register" className="hover:text-primary transition-colors">Become a Hero</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-slate-500 font-bold">
              <li><Link href="#" className="hover:text-primary transition-colors">Cloud Docs</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Developer API</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Antigravity Guide</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Safety Protocols</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center"><Phone className="h-4 w-4" /></div>
                1800-ANTIGRAVITY
              </li>
              <li className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center"><Mail className="h-4 w-4" /></div>
                cloud@hemolink.google
              </li>
              <li className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center"><Cloud className="h-4 w-4 text-primary" /></div>
                Powered by Google Cloud
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-bold text-xs">© {new Date().getFullYear()} HemoLink Cloud Network. All rights reserved.</p>
          <div className="flex items-center gap-8 grayscale opacity-50">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Antigravity Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
