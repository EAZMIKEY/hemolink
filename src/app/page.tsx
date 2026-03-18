import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Droplet, Search, ShieldCheck, Users, Activity, Heart, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20">
                <Activity className="h-4 w-4 text-red-400" />
                Live: 12,450+ Active Donors in India
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Your Single Click <br />
                Can Save a <span className="text-red-500">Life</span>.
              </h1>
              <p className="text-xl text-white/80 max-w-lg leading-relaxed">
                HemoLink is India's most advanced real-time blood donor network. We connect those in need with verified donors in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-red-700 text-white font-bold h-14 px-8" asChild>
                  <Link href="/emergency">FIND BLOOD NOW</Link>
                </Button>
                <Button size="lg" className="bg-primary hover:bg-red-700 text-white font-bold h-14 px-8" asChild>
                  <Link href="/register">Become a Donor</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000">
               <div className="relative w-full aspect-square max-w-md mx-auto">
                 <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
                 <Image 
                    src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7d?q=80&w=1200&h=1200&auto=format&fit=crop"
                    alt="Blood Donation"
                    fill
                    className="rounded-full object-cover border-8 border-white/10 shadow-2xl"
                    data-ai-hint="blood donation"
                 />
               </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Registered Donors', value: '850K+', icon: Users },
              { label: 'Lives Saved', value: '1.2M+', icon: Heart },
              { label: 'Blood Banks', value: '3,200+', icon: Droplet },
              { label: 'Cities Covered', value: '500+', icon: ShieldCheck },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2 p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Smart Technology, Faster Response</h2>
            <p className="text-muted-foreground text-lg">Our intelligent system is designed for maximum efficiency during life-or-death situations.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Intelligent Matching',
                description: 'Our algorithm considers blood group compatibility, proximity, and availability to find the perfect match.',
                icon: Search,
              },
              {
                title: 'Real-time Alerts',
                description: 'Instant SMS and app notifications sent to donors within 5km radius during emergency requests.',
                icon: Activity,
              },
              {
                title: 'Verified Network',
                description: 'Every donor and blood bank is verified via Aadhaar or government IDs for 100% trust.',
                icon: ShieldCheck,
              }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-3xl border shadow-sm hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                <Link href="#" className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl shadow-primary/30">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl space-y-6 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Ready to make a difference?</h2>
                <p className="text-xl text-white/80">Register as a donor today and join thousands of heroes saving lives every hour across India.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold h-14 px-10">
                  Register as Donor
                </Button>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold h-14 px-10">
                  Contact Support
                </Button>
              </div>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
