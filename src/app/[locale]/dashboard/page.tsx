"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DonorDashboard } from '@/components/DonorDashboard';
import { HospitalDashboard } from '@/components/HospitalDashboard';
import { BloodBankDashboard } from '@/components/BloodBankDashboard';
import { Droplet, LogIn } from 'lucide-react';
import Link from 'next/link';

type UserData = {
  name: string; email: string; role?: string;
  bloodGroup?: string; lastDonationDate?: string | null;
  isFirstTimeDonor?: boolean; phoneVerified?: boolean;
  isVerified?: boolean; availability?: boolean;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
    setLoading(false);
  }, []);

  const handleUpdateUser = (updated: UserData) => {
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-8 border-primary/10 border-t-primary animate-spin" />
          <p className="text-muted-foreground font-bold animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
          <Droplet className="h-10 w-10 text-primary fill-primary" />
        </div>
        <h1 className="text-4xl font-black">You are not signed in</h1>
        <p className="text-muted-foreground text-lg max-w-sm">Please log in to access your HemoLink dashboard.</p>
        <Button className="bg-primary hover:bg-red-700 font-black text-lg px-10 h-14 rounded-2xl" asChild>
          <Link href="/login"><LogIn className="h-5 w-5 mr-2" />Sign In</Link>
        </Button>
      </div>
    );
  }

  const role = user.role ?? 'donor';

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500">
      {role === 'hospital'  && <HospitalDashboard user={user} />}
      {role === 'bloodbank' && <BloodBankDashboard user={user} />}
      {(role === 'donor' || !['hospital', 'bloodbank'].includes(role)) && (
        <DonorDashboard user={user} onUpdateUser={handleUpdateUser} />
      )}
    </div>
  );
}
