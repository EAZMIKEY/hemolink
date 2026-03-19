
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import { UserPlus, Phone, Mail, MapPin, Loader2, CheckCircle2, Gift, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const db = useFirestore();

  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    email: '',
    city: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    if (!formData.name || !formData.bloodGroup || !formData.phone || !formData.email || !formData.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to register.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const donorData = {
        ...formData,
        availability: true,
        points: 500, // Welcome points
        createdAt: serverTimestamp()
      };

      // Use phone as the unique document ID to prevent duplicates
      const donorRef = doc(db, 'donors', formData.phone);
      
      // Execute Firestore write (non-blocking according to guidelines, but here we await for demo certainty)
      await setDoc(donorRef, donorData, { merge: true });
      
      setIsSuccess(true);
      setIsSubmitting(false);
      
      toast({
        title: "Registration Successful",
        description: "You've earned 500 welcome points!",
      });

    } catch (error: any) {
      console.error("Registration failed:", error);
      
      const donorData = {
        ...formData,
        availability: true,
        points: 500,
        createdAt: serverTimestamp()
      };
      const donorRef = doc(db, 'donors', formData.phone);
      
      const permissionError = new FirestorePermissionError({
        path: donorRef.path,
        operation: 'create',
        requestResourceData: donorData,
      });
      errorEmitter.emit('permission-error', permissionError);
      
      toast({
        title: "Registration Failed",
        description: "Could not create profile. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-12 flex justify-center">
        <div className="w-full max-w-2xl animate-in slide-in-from-bottom duration-500">
          <Card className="shadow-2xl border-none overflow-hidden text-center p-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-black text-secondary mb-2">Welcome to HemoLink!</h1>
            <p className="text-muted-foreground text-lg mb-8">Your profile is active and saving lives.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex flex-col items-center">
                <Gift className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-black text-primary">+500</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Welcome Points</span>
              </div>
              <div className="bg-secondary/5 p-6 rounded-3xl border border-secondary/10 flex flex-col items-center">
                <Award className="h-8 w-8 text-secondary mb-2" />
                <span className="text-xl font-bold">Silver Tier</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Donor Status</span>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-3xl border text-left space-y-3 mb-8">
               <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Donor ID:</span>
                  <Badge variant="outline" className="font-mono bg-white">HL-{formData.phone.slice(-4)}</Badge>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Blood Group:</span>
                  <Badge className="bg-primary">{formData.bloodGroup}</Badge>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Current Points:</span>
                  <span className="text-primary font-black">500 pts</span>
               </div>
            </div>

            <Button className="w-full h-14 bg-primary font-bold text-lg" asChild>
              <a href="/dashboard">GO TO DASHBOARD</a>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10 space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold text-secondary">Become a Life Saver</h1>
          <p className="text-muted-foreground text-lg">Join the network and earn points for every donation.</p>
        </div>

        <Card className="shadow-2xl border-none overflow-hidden">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle className="text-2xl">Registration Details</CardTitle>
              <CardDescription>All fields are required for a verified profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Full Name</label>
                  <Input 
                    placeholder="Enter your full name" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Blood Group</label>
                  <Select onValueChange={(v) => handleInputChange('bloodGroup', v)} value={formData.bloodGroup} required>
                    <SelectTrigger><SelectValue placeholder="Select Group" /></SelectTrigger>
                    <SelectContent>{BLOOD_GROUPS.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="+91 XXXX-XXXXXX" 
                      className="pl-9" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="email@example.com" 
                      className="pl-9" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">City / Residence</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Enter your city" 
                    className="pl-9" 
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  <span className="font-bold text-primary">Reward Alert:</span> You will receive 500 welcome points immediately upon registration.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full h-14 bg-primary font-bold text-lg shadow-lg shadow-primary/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    REGISTERING...
                  </>
                ) : "REGISTER & EARN POINTS"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
