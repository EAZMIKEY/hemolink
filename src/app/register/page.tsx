
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import { ShieldCheck, UserPlus, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.bloodGroup || !formData.phone || !formData.email || !formData.city) {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields to continue.",
          variant: "destructive"
        });
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Aadhaar Verified",
        description: "Your identity has been successfully verified via UIDAI.",
      });
      handleSubmit();
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!db) return;
    setIsSubmitting(true);

    const donorData = {
      ...formData,
      availability: true,
      createdAt: serverTimestamp()
    };

    // Using phone number as document ID to prevent duplicates per mobile number
    const donorRef = doc(db, 'donors', formData.phone);

    setDoc(donorRef, donorData, { merge: true })
      .then(() => {
        setIsSubmitting(false);
        setStep(3);
        toast({
          title: "Registration Successful",
          description: "You are now a part of the HemoLink network.",
        });
      })
      .catch(async (error) => {
        setIsSubmitting(false);
        const permissionError = new FirestorePermissionError({
          path: donorRef.path,
          operation: 'create',
          requestResourceData: donorData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10 space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold text-secondary">Join HemoLink Network</h1>
          <p className="text-muted-foreground text-lg">Your registration can save lives in your neighborhood.</p>
          
          <div className="flex items-center justify-center gap-2 pt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-primary' : 'w-2 bg-muted'}`} />
            ))}
          </div>
        </div>

        <Card className="shadow-2xl border-none">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Basic Information</CardTitle>
                <CardDescription>Tell us a bit about yourself.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Full Name</label>
                    <Input 
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Blood Group</label>
                    <Select onValueChange={(v) => handleInputChange('bloodGroup', v)} value={formData.bloodGroup}>
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
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
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
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNextStep} className="w-full h-12 bg-primary font-bold text-lg">CONTINUE</Button>
              </CardFooter>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-blue-600" /> Identity Verification
                </CardTitle>
                <CardDescription>Securely verify your identity using Aadhaar (Mock System).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 py-8 text-center">
                <div className="max-w-xs mx-auto space-y-4">
                  <div className="bg-muted p-4 rounded-2xl border-2 border-dashed">
                    <p className="text-xs text-muted-foreground font-bold mb-2">UIDAI VERIFICATION</p>
                    <Input placeholder="XXXX-XXXX-XXXX" className="text-center text-xl tracking-widest font-mono" maxLength={12} />
                  </div>
                  <p className="text-xs text-muted-foreground">Verification ensures trust in the network and eligibility for government donor benefits.</p>
                </div>
                
                <div className="flex items-center space-x-2 justify-center">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I consent to verify my identity via HemoLink Auth.
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button onClick={handleVerify} disabled={isVerifying || isSubmitting} className="w-full h-12 bg-blue-700 font-bold text-lg">
                  {isVerifying || isSubmitting ? "Processing..." : "VERIFY & REGISTER"}
                </Button>
                <Button variant="ghost" onClick={() => setStep(1)} className="w-full">Back</Button>
              </CardFooter>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader className="text-center pt-10">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-10 w-10 text-green-600 fill-green-600 animate-pulse" />
                </div>
                <CardTitle className="text-3xl font-black text-secondary">Ready to Save Lives!</CardTitle>
                <CardDescription className="text-lg">Your profile is 100% complete and verified.</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 pb-12">
                <p className="text-muted-foreground">You will now receive emergency notifications for your blood group in your area. You can manage your availability from the dashboard.</p>
                <div className="bg-muted/30 p-6 rounded-3xl border text-left space-y-3">
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold">Donor ID:</span>
                      <Badge variant="outline" className="font-mono">HL-{formData.phone.slice(-4)}-XXXX</Badge>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold">Points Earned:</span>
                      <span className="text-primary font-black">+500 Welcome Points</span>
                   </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12 bg-primary font-bold text-lg" asChild>
                  <a href="/dashboard">GO TO DASHBOARD</a>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
