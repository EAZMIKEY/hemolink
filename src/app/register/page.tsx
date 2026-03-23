"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import {
  User, Phone, Mail, MapPin, Loader2, Droplet,
  ArrowRight, Heart, Gift, CheckCircle2, Award,
  UserPlus, Lock, Building2, Stethoscope, ArrowLeft,
  Calendar, ToggleLeft
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

type Role = 'donor' | 'hospital' | 'bloodbank' | null;

// ─── Role selector card config ───────────────────────────────────────────────
const ROLES = [
  {
    id: 'donor' as Role,
    label: 'Individual Donor',
    sub: 'Register as a blood donor & earn points',
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/20',
    border: 'border-red-200 dark:border-red-800',
    ring: 'ring-red-400',
    btnClass: 'bg-primary hover:bg-red-700',
  },
  {
    id: 'hospital' as Role,
    label: 'Hospital',
    sub: 'Manage emergency requests & find donors',
    icon: Stethoscope,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-800',
    ring: 'ring-blue-400',
    btnClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'bloodbank' as Role,
    label: 'Blood Bank',
    sub: 'Track stock levels & coordinate supply',
    icon: Droplet,
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-950/20',
    border: 'border-green-200 dark:border-green-800',
    ring: 'ring-green-400',
    btnClass: 'bg-green-700 hover:bg-green-800',
  },
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredData, setRegisteredData] = useState<any>(null);
  const db = useFirestore();

  // ── Donor form data ───────────────────────────────────────────────────────
  const [donorData, setDonorData] = useState({
    name: '', bloodGroup: '', phone: '', email: '', city: '',
    password: '', confirmPassword: '', lastDonationDate: '', availability: true,
    isFirstTimeDonor: false,
    role: 'donor',
  });

  // ── Hospital form data ────────────────────────────────────────────────────
  const [hospitalData, setHospitalData] = useState({
    name: '', address: '', phone: '', emergencyPhone: '', licenseId: '',
    email: '', password: '', confirmPassword: '', city: '',
    role: 'hospital',
  });

  // ── Blood Bank form data ──────────────────────────────────────────────────
  const [bankData, setBankData] = useState({
    name: '', address: '', phone: '', email: '', password: '',
    confirmPassword: '', city: '',
    stock: { 'A+': '', 'A-': '', 'B+': '', 'B-': '', 'O+': '', 'O-': '', 'AB+': '', 'AB-': '' },
    role: 'bloodbank',
  });

  // Safety timeout
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isSubmitting) t = setTimeout(() => setIsSubmitting(false), 10000);
    return () => clearTimeout(t);
  }, [isSubmitting]);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('user')) window.location.href = '/dashboard';
  }, []);

  // ── Generic input helper ─────────────────────────────────────────────────
  const updateDonor  = (f: string, v: string | boolean) => setDonorData(p => ({ ...p, [f]: v }));
  const updateHosp   = (f: string, v: string) => setHospitalData(p => ({ ...p, [f]: v }));
  const updateBank   = (f: string, v: string) => setBankData(p => ({ ...p, [f]: v }));
  const updateStock  = (g: string, v: string) => setBankData(p => ({ ...p, stock: { ...p.stock, [g]: v } }));
  const toggleFirstTimeDonor = () => setDonorData(p => ({ ...p, isFirstTimeDonor: !p.isFirstTimeDonor, lastDonationDate: !p.isFirstTimeDonor ? '' : p.lastDonationDate }));

  // ── Submit logic ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let userData: any = {};

    if (selectedRole === 'donor') {
      if (!donorData.name || !donorData.bloodGroup || !donorData.phone || !donorData.email || !donorData.city || !donorData.password) {
        toast({ title: 'Missing Fields', description: 'Please fill all required fields.', variant: 'destructive' });
        setIsSubmitting(false); return;
      }
      if (donorData.password !== donorData.confirmPassword) {
        toast({ title: 'Passwords Do Not Match', variant: 'destructive' });
        setIsSubmitting(false); return;
      }
      userData = {
        name: donorData.name, email: donorData.email, role: 'donor',
        bloodGroup: donorData.bloodGroup, phone: donorData.phone, city: donorData.city,
        availability: true,
        isFirstTimeDonor: donorData.isFirstTimeDonor,
        lastDonationDate: donorData.isFirstTimeDonor ? null : donorData.lastDonationDate || null,
        points: 500,
      };
    }

    if (selectedRole === 'hospital') {
      if (!hospitalData.name || !hospitalData.address || !hospitalData.phone || !hospitalData.email || !hospitalData.password) {
        toast({ title: 'Missing Fields', description: 'Please fill all required fields.', variant: 'destructive' });
        setIsSubmitting(false); return;
      }
      if (hospitalData.password !== hospitalData.confirmPassword) {
        toast({ title: 'Passwords Do Not Match', variant: 'destructive' });
        setIsSubmitting(false); return;
      }
      userData = { name: hospitalData.name, email: hospitalData.email, role: 'hospital', phone: hospitalData.phone, address: hospitalData.address, city: hospitalData.city, licenseId: hospitalData.licenseId };
    }

    if (selectedRole === 'bloodbank') {
      if (!bankData.name || !bankData.address || !bankData.phone || !bankData.email || !bankData.password) {
        toast({ title: 'Missing Fields', description: 'Please fill all required fields.', variant: 'destructive' });
        setIsSubmitting(false); return;
      }
      if (bankData.password !== bankData.confirmPassword) {
        toast({ title: 'Passwords Do Not Match', variant: 'destructive' });
        setIsSubmitting(false); return;
      }
      userData = { name: bankData.name, email: bankData.email, role: 'bloodbank', phone: bankData.phone, address: bankData.address, city: bankData.city, stock: bankData.stock };
    }

    // Try Firebase, fall back gracefully
    try {
      if (db) {
        const ref = doc(db, selectedRole === 'donor' ? 'donors' : selectedRole === 'hospital' ? 'hospitals' : 'bloodbanks', userData.phone);
        await Promise.race([
          setDoc(ref, { ...userData, createdAt: serverTimestamp() }, { merge: true }),
          new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 3000)),
        ]);
      } else {
        await new Promise(r => setTimeout(r, 1200));
      }
    } catch (err) {
      console.warn('Firebase write failed, continuing locally.', err);
    }

    localStorage.setItem('user', JSON.stringify(userData));
    setRegisteredData(userData);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({ title: 'Registered Successfully ✅', description: `Welcome to HemoLink as a ${selectedRole}!` });
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Success screen
  // ─────────────────────────────────────────────────────────────────────────
  if (isSuccess && registeredData) {
    const roleConfig = ROLES.find(r => r.id === selectedRole)!;
    return (
      <div className="container mx-auto px-4 md:px-8 py-12 flex justify-center">
        <div className="w-full max-w-lg animate-in slide-in-from-bottom duration-500">
          <Card className="shadow-2xl border-none text-center p-8 bg-background/50 backdrop-blur-xl rounded-[2.5rem]">
            <div className={`mx-auto w-20 h-20 ${roleConfig.bg} rounded-full flex items-center justify-center mb-6`}>
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-black text-secondary mb-2">Welcome to HemoLink!</h1>
            <p className="text-muted-foreground text-lg mb-6">Your <span className="font-bold">{roleConfig.label}</span> profile is active.</p>

            <div className={`${roleConfig.bg} border ${roleConfig.border} p-5 rounded-2xl text-left space-y-2.5 mb-6`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Name:</span>
                <span className="font-black">{registeredData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Role:</span>
                <Badge className={`${roleConfig.btnClass} text-white`}>{roleConfig.label}</Badge>
              </div>
              {registeredData.bloodGroup && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Blood Group:</span>
                  <Badge className="bg-primary">{registeredData.bloodGroup}</Badge>
                </div>
              )}
              {registeredData.points && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Welcome Points:</span>
                  <span className="font-black text-primary">+{registeredData.points} pts</span>
                </div>
              )}
            </div>

            <Button className={`w-full h-14 ${roleConfig.btnClass} text-white font-bold text-lg rounded-2xl`} asChild>
              <a href="/dashboard">GO TO DASHBOARD →</a>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Step 1 — Role Selector
  // ─────────────────────────────────────────────────────────────────────────
  if (!selectedRole) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-black tracking-tight">Join HemoLink</h1>
            <p className="text-muted-foreground text-xl">Choose your registration type to get started.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES.map(role => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group text-left p-7 rounded-[2rem] border-2 ${role.border} ${role.bg} transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:ring-4 ${role.ring} focus:outline-none`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white/60 dark:bg-white/10 flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon className={`h-7 w-7 ${role.color}`} />
                  </div>
                  <h3 className="text-xl font-black mb-1">{role.label}</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{role.sub}</p>
                  <div className={`mt-5 flex items-center gap-2 text-sm font-black uppercase tracking-widest ${role.color}`}>
                    Register <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 font-medium">
            Already have an account? <a href="/login" className="text-primary font-bold hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Step 2 — Role-specific form
  // ─────────────────────────────────────────────────────────────────────────
  const roleConfig = ROLES.find(r => r.id === selectedRole)!;
  const RoleIcon = roleConfig.icon;

  const fieldCls = "h-14 rounded-2xl border-2 focus:ring-primary bg-background/50 transition-all";
  const labelCls = "text-xs font-black uppercase tracking-widest text-muted-foreground";
  const fieldWrap = "space-y-2";

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={() => setSelectedRole(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-bold text-sm mx-auto mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Change Role
          </button>
          <div className={`mx-auto w-16 h-16 ${roleConfig.bg} border-2 ${roleConfig.border} rounded-3xl flex items-center justify-center mb-4`}>
            <RoleIcon className={`h-8 w-8 ${roleConfig.color}`} />
          </div>
          <h1 className="text-4xl font-black">{roleConfig.label} Registration</h1>
          <p className="text-muted-foreground mt-2 font-medium">{roleConfig.sub}</p>
        </div>

        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-8 px-8">

              {/* ── DONOR FORM ─────────────────────────────────────────── */}
              {selectedRole === 'donor' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Full Name *</label>
                      <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Your full name" className={`pl-11 ${fieldCls}`} value={donorData.name} onChange={e => updateDonor('name', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Blood Group *</label>
                      <Select onValueChange={v => updateDonor('bloodGroup', v)} value={donorData.bloodGroup} disabled={isSubmitting}>
                        <SelectTrigger className={fieldCls}><SelectValue placeholder="Select group" /></SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          {BLOOD_GROUPS.map(g => <SelectItem key={g} value={g} className="font-bold">{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Phone *</label>
                      <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="+91 XXXXX XXXXX" className={`pl-11 ${fieldCls}`} value={donorData.phone} onChange={e => updateDonor('phone', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Email *</label>
                      <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="email" placeholder="you@example.com" className={`pl-11 ${fieldCls}`} value={donorData.email} onChange={e => updateDonor('email', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>City *</label>
                      <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Your city" className={`pl-11 ${fieldCls}`} value={donorData.city} onChange={e => updateDonor('city', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Last Donation Date</label>
                      {/* Never Donated Before checkbox */}
                      <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer select-none transition-colors ${
                        donorData.isFirstTimeDonor
                          ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                          : 'border-border hover:border-primary/40'
                      }`}>
                        <input
                          type="checkbox"
                          checked={donorData.isFirstTimeDonor}
                          onChange={toggleFirstTimeDonor}
                          className="w-5 h-5 accent-primary rounded cursor-pointer"
                          disabled={isSubmitting}
                        />
                        <div>
                          <span className="text-sm font-black text-foreground">🩸 Never Donated Before</span>
                          <p className="text-xs text-muted-foreground">Select if this is your first time donating blood</p>
                        </div>
                      </label>
                      {/* Conditional date picker */}
                      {!donorData.isFirstTimeDonor && (
                        <div className="relative mt-2">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="date"
                            className={`w-full pl-11 ${fieldCls} rounded-2xl border-2 border-input bg-background/50 px-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary`}
                            value={donorData.lastDonationDate}
                            onChange={e => updateDonor('lastDonationDate', e.target.value)}
                            disabled={isSubmitting}
                            max={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      )}
                      {donorData.isFirstTimeDonor && (
                        <p className="text-xs text-green-600 dark:text-green-400 font-bold mt-1 ml-1">✓ You are immediately eligible to donate!</p>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer select-none ${donorData.availability ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : 'bg-slate-50 border-slate-200'}`}
                    onClick={() => updateDonor('availability', String(!donorData.availability))}>
                    <ToggleLeft className={`h-6 w-6 ${donorData.availability ? 'text-green-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="font-black text-sm">Currently Available to Donate</p>
                      <p className="text-xs text-muted-foreground">Toggle your availability status</p>
                    </div>
                    <div className={`ml-auto w-10 h-6 rounded-full transition-colors ${donorData.availability ? 'bg-green-500' : 'bg-slate-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full mt-0.5 shadow transition-transform ${donorData.availability ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Password *</label>
                      <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Min. 6 characters" className={`pl-11 ${fieldCls}`} value={donorData.password} onChange={e => updateDonor('password', e.target.value)} minLength={6} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Confirm Password *</label>
                      <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Repeat password" className={`pl-11 ${fieldCls}`} value={donorData.confirmPassword} onChange={e => updateDonor('confirmPassword', e.target.value)} minLength={6} required disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ── HOSPITAL FORM ───────────────────────────────────────── */}
              {selectedRole === 'hospital' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Hospital Name *</label>
                      <div className="relative"><Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Official hospital name" className={`pl-11 ${fieldCls}`} value={hospitalData.name} onChange={e => updateHosp('name', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>City *</label>
                      <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="City" className={`pl-11 ${fieldCls}`} value={hospitalData.city} onChange={e => updateHosp('city', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelCls}>Full Address *</label>
                    <Input placeholder="Street, Area, City" className={fieldCls} value={hospitalData.address} onChange={e => updateHosp('address', e.target.value)} required disabled={isSubmitting} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Contact Number *</label>
                      <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Main contact" className={`pl-11 ${fieldCls}`} value={hospitalData.phone} onChange={e => updateHosp('phone', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Emergency Contact</label>
                      <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="24/7 emergency line" className={`pl-11 ${fieldCls}`} value={hospitalData.emergencyPhone} onChange={e => updateHosp('emergencyPhone', e.target.value)} disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Email *</label>
                      <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="email" placeholder="hospital@email.com" className={`pl-11 ${fieldCls}`} value={hospitalData.email} onChange={e => updateHosp('email', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>License ID (optional)</label>
                      <Input placeholder="Govt. license number" className={fieldCls} value={hospitalData.licenseId} onChange={e => updateHosp('licenseId', e.target.value)} disabled={isSubmitting} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Password *</label>
                      <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Min. 6 characters" className={`pl-11 ${fieldCls}`} value={hospitalData.password} onChange={e => updateHosp('password', e.target.value)} minLength={6} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Confirm Password *</label>
                      <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Repeat password" className={`pl-11 ${fieldCls}`} value={hospitalData.confirmPassword} onChange={e => updateHosp('confirmPassword', e.target.value)} minLength={6} required disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ── BLOOD BANK FORM ──────────────────────────────────────── */}
              {selectedRole === 'bloodbank' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Blood Bank Name *</label>
                      <div className="relative"><Droplet className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Official name" className={`pl-11 ${fieldCls}`} value={bankData.name} onChange={e => updateBank('name', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>City *</label>
                      <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="City" className={`pl-11 ${fieldCls}`} value={bankData.city} onChange={e => updateBank('city', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelCls}>Full Address *</label>
                    <Input placeholder="Street, Area, City" className={fieldCls} value={bankData.address} onChange={e => updateBank('address', e.target.value)} required disabled={isSubmitting} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Contact Number *</label>
                      <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Main contact" className={`pl-11 ${fieldCls}`} value={bankData.phone} onChange={e => updateBank('phone', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Email *</label>
                      <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="email" placeholder="bank@email.com" className={`pl-11 ${fieldCls}`} value={bankData.email} onChange={e => updateBank('email', e.target.value)} required disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>

                  {/* Blood Stock Grid */}
                  <div>
                    <label className={`${labelCls} block mb-3`}>Blood Stock Levels (units)</label>
                    <div className="grid grid-cols-4 gap-3">
                      {Object.keys(bankData.stock).map(group => (
                        <div key={group} className="space-y-1">
                          <label className="text-[10px] font-black text-center block text-muted-foreground">{group}</label>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            className="h-12 rounded-xl border-2 text-center font-black text-lg"
                            value={(bankData.stock as any)[group]}
                            onChange={e => updateStock(group, e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={fieldWrap}>
                      <label className={labelCls}>Password *</label>
                      <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Min. 6 characters" className={`pl-11 ${fieldCls}`} value={bankData.password} onChange={e => updateBank('password', e.target.value)} minLength={6} required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelCls}>Confirm Password *</label>
                      <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Repeat password" className={`pl-11 ${fieldCls}`} value={bankData.confirmPassword} onChange={e => updateBank('confirmPassword', e.target.value)} minLength={6} required disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                </>
              )}

            </CardContent>
            <CardFooter className="pb-10 pt-4 px-8">
              <Button
                type="submit"
                className={`w-full h-16 ${roleConfig.btnClass} text-white font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 group`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> REGISTERING...</>
                ) : (
                  <>REGISTER AS {roleConfig.label.toUpperCase()} <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
