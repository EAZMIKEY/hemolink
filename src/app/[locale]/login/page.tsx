"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { LogIn, Mail, Lock, Loader2, ArrowRight, Droplet, Heart, Stethoscope } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

type RoleId = 'donor' | 'hospital' | 'bloodbank';

const ROLES: { id: RoleId; label: string; icon: React.ElementType; color: string; border: string; bg: string; ring: string; welcome: string }[] = [
  {
    id: 'donor',
    label: 'Donor',
    icon: Heart,
    color: 'text-red-500',
    border: 'border-red-200 dark:border-red-800',
    bg: 'bg-red-50 dark:bg-red-950/20',
    ring: 'ring-red-400',
    welcome: 'Welcome back, life saver 👋',
  },
  {
    id: 'hospital',
    label: 'Hospital',
    icon: Stethoscope,
    color: 'text-blue-500',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    ring: 'ring-blue-400',
    welcome: 'Welcome back, medical team 👋',
  },
  {
    id: 'bloodbank',
    label: 'Blood Bank',
    icon: Droplet,
    color: 'text-green-600',
    border: 'border-green-200 dark:border-green-800',
    bg: 'bg-green-50 dark:bg-green-950/20',
    ring: 'ring-green-400',
    welcome: 'Welcome back 👋',
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<RoleId>('donor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) window.location.href = '/dashboard';
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Try to match against a stored user in localStorage
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Email match check
          if (parsed.email && parsed.email !== formData.email) {
            toast({ title: 'Invalid Credentials ❌', description: 'Email or password is incorrect.', variant: 'destructive' });
            return;
          }
          // Role match check
          if (parsed.role && parsed.role !== selectedRole) {
            toast({ title: 'Incorrect Role Selected ❌', description: `Your account is registered as a "${parsed.role}". Please select the correct role.`, variant: 'destructive' });
            return;
          }
        } catch {}
      }

      // Build / refresh user session with selected role
      const userData = {
        name: formData.email.split('@')[0].charAt(0).toUpperCase() + formData.email.split('@')[0].slice(1),
        email: formData.email,
        role: selectedRole,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      const roleConfig = ROLES.find(r => r.id === selectedRole)!;
      toast({ title: roleConfig.welcome, description: `Signed in as ${userData.name}.` });

      setTimeout(() => { window.location.href = '/dashboard'; }, 500);
    }, 1400);
  };

  const selectedConfig = ROLES.find(r => r.id === selectedRole)!;

  return (
    <div className="container mx-auto px-4 md:px-8 py-20 flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-4 border border-primary/20 shadow-xl shadow-primary/5">
            <Droplet className="h-8 w-8 text-primary fill-primary" />
          </div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground font-medium">Sign in to your HemoLink account.</p>
        </div>

        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
          <form onSubmit={handleLogin}>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>Select your role and enter credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {/* Role selector */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Login As</label>
                <div className="grid grid-cols-3 gap-3">
                  {ROLES.map(role => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? `${role.bg} ${role.border} ring-2 ${role.ring} scale-[1.03]`
                            : 'border-border hover:border-muted-foreground/30'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isSelected ? role.color : 'text-muted-foreground'}`} />
                        <span className={`text-xs font-black ${isSelected ? role.color : 'text-muted-foreground'}`}>{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="pl-12 h-14 rounded-2xl border-2 focus:ring-primary bg-background/50"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                  <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-12 h-14 rounded-2xl border-2 focus:ring-primary bg-background/50"
                    value={formData.password}
                    onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pb-8">
              <Button
                type="submit"
                className={`w-full h-14 font-black text-lg rounded-2xl shadow-xl transition-transform active:scale-95 group text-white ${
                  selectedConfig.id === 'donor'     ? 'bg-primary hover:bg-red-700 shadow-primary/20' :
                  selectedConfig.id === 'hospital'  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' :
                                                      'bg-green-700 hover:bg-green-800 shadow-green-700/20'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> SIGNING IN...</>
                ) : (
                  <>SIGN IN AS {selectedConfig.label.toUpperCase()} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
              <p className="text-center text-sm font-medium text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary font-bold hover:underline">Register Now</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
