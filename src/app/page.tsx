
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Droplet, Search, ShieldCheck, Users, Activity, Heart, ArrowRight, Cloud, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-3 bg-primary/5 px-5 py-2.5 rounded-full text-sm font-bold border border-primary/10 animate-float-slow">
                <span className="flex h-2 w-2 rounded-full bg-[#34A853] animate-pulse"></span>
                <span className="text-primary font-black uppercase tracking-wider">Google Antigravity Powered</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-slate-900">
                Lifting Lives with <br />
                <span className="google-gradient-text">Smart Connectivity.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                HemoLink leverages Google Cloud technology to create a weightless, real-time blood network. Connect with verified donors in seconds, powered by gravity-defying speed.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-16 px-10 rounded-2xl shadow-xl shadow-primary/20 hover-lift text-lg" asChild>
                  <Link href="/emergency">FIND BLOOD NOW</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 hover:bg-slate-50 font-bold hover-lift text-lg" asChild>
                  <Link href="/search">Search Network</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-6 grayscale opacity-60">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest"><Globe className="h-4 w-4" /> Global Network</div>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest"><Cloud className="h-4 w-4" /> Cloud Native</div>
              </div>
            </div>
            <div className="relative hidden lg:block">
               <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
                 <div className="absolute inset-0 bg-primary/10 rounded-[3rem] rotate-6"></div>
                 <div className="absolute inset-0 bg-accent/5 rounded-[3rem] -rotate-3"></div>
                 <Image 
                    src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7d?q=80&w=1200&h=1200&auto=format&fit=crop"
                    alt="Blood Donation Technology"
                    fill
                    className="rounded-[3rem] object-cover border-4 border-white shadow-antigravity"
                    data-ai-hint="blood donation technology"
                 />
                 {/* Floating Badges */}
                 <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl animate-float-delayed border">
                    <Heart className="h-8 w-8 text-[#EA4335] fill-[#EA4335]" />
                 </div>
                 <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl animate-float border">
                    <div className="text-2xl font-black text-primary">850K+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Heroes</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Antigravity Lift */}
      <section className="py-20 bg-slate-50/50 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Cloud Donors', value: '850K+', icon: Users, color: 'text-[#4285F4]' },
              { label: 'Lives Impacted', value: '1.2M+', icon: Heart, color: 'text-[#EA4335]' },
              { label: 'Bank Nodes', value: '3,200+', icon: Droplet, color: 'text-[#FBBC05]' },
              { label: 'Zero Friction', value: '100%', icon: ShieldCheck, color: 'text-[#34A853]' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-transparent hover:border-primary/10 shadow-sm hover-lift group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-slate-50 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">Next-Gen Blood <br />Logistics.</h2>
              <p className="text-xl text-slate-500 font-medium">Breaking the barriers of traditional blood donation with real-time cloud matching.</p>
            </div>
            <Button variant="link" className="text-primary font-black text-lg p-0" asChild>
              <Link href="/register" className="flex items-center gap-2">Join the Network <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Smart Cloud Sync',
                description: 'Instant data synchronization across all major blood banks and verified donor profiles.',
                icon: Cloud,
                color: 'bg-[#4285F4]'
              },
              {
                title: 'Antigravity Delivery',
                description: 'Our routing algorithm ensures the fastest possible connection between donor and recipient.',
                icon: Activity,
                color: 'bg-[#EA4335]'
              },
              {
                title: 'Unified Trust',
                description: 'Verified identities using secure, decentralized cloud protocols for maximum reliability.',
                icon: ShieldCheck,
                color: 'bg-[#34A853]'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-50 border-2 border-transparent hover:border-primary/20 hover:bg-white transition-all hover-lift">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-slate-200`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium mb-8 text-lg">{feature.description}</p>
                <div className="h-1.5 w-12 bg-slate-200 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Antigravity CTA */}
      <section className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-7xl font-black text-white leading-tight">
              Defy Gravity. <br />
              <span className="google-gradient-text">Save Lives Today.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-20 px-12 rounded-[2rem] text-xl shadow-2xl shadow-primary/40 hover-lift" asChild>
                <Link href="/register">JOIN HEMOLINK CLOUD</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-20 px-12 rounded-[2rem] text-xl font-black border-2 border-white/20 text-white hover:bg-white/10 hover-lift backdrop-blur-sm">
                CONTACT GOOGLE SUPPORT
              </Button>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">Official Google Antigravity Partner</p>
          </div>
        </div>
      </section>
    </div>
  );
}
