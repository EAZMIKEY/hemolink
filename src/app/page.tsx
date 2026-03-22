import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Droplet, Search, ShieldCheck, Users, Activity, Heart, ArrowRight, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full text-sm font-bold border border-primary/10">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary font-bold uppercase tracking-wider">ACTIVE DONORS IN INDIA +52,430</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-slate-900">
                Connecting Donors <br />
                <span className="text-primary">Saving Lives.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                HemoLink connects verified blood donors with hospitals and individuals in real-time. Join our network and become a hero in your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-primary/20" asChild>
                  <Link href="/register">REGISTER AS DONOR</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl border-2 hover:bg-slate-50 font-bold" asChild>
                  <Link href="/search">Search Donors</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
               <div className="relative w-full aspect-square max-w-lg mx-auto">
                 <div className="absolute inset-0 bg-primary/5 rounded-[2rem] rotate-3"></div>
                 <Image 
                    src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7d?q=80&w=1200&h=1200&auto=format&fit=crop"
                    alt="Blood Donation"
                    fill
                    className="rounded-[2rem] object-cover border shadow-xl"
                    data-ai-hint="blood donation"
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Registered Donors', value: '850K+', icon: Users, color: 'text-primary' },
              { label: 'Lives Saved', value: '1.2M+', icon: Heart, color: 'text-red-500' },
              { label: 'Blood Banks', value: '3,200+', icon: Droplet, color: 'text-blue-500' },
              { label: 'Verified Safely', value: '100%', icon: ShieldCheck, color: 'text-green-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover-lift text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-slate-50`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Ready to Save a Life?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold h-14 px-10 rounded-xl" asChild>
              <Link href="/register">BECOME A DONOR</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl border-white/30 text-primary hover:bg-white/10 font-bold bg-white">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
