
"use client"

import { useState } from 'react';
import { MOCK_REQUESTS } from '@/lib/mock-data';
import { BLOOD_GROUPS } from '@/lib/blood-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Plus, MapPin, Hospital, Phone, Clock, Share2, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function EmergencyPage() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Posted Successfully",
      description: "Nearby donors and blood banks have been notified via SMS.",
    });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary flex items-center gap-2">
            <AlertCircle className="text-primary h-8 w-8" /> 
            Emergency Requests
          </h1>
          <p className="text-muted-foreground mt-1">Urgent blood requirements requiring immediate attention.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary font-bold h-12 px-6 shadow-lg shadow-primary/20">
          <Plus className="h-5 w-5 mr-2" /> Post New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Overlay or Side (Conditional) */}
        {showForm && (
          <div className="lg:col-span-1">
             <Card className="border-2 border-primary shadow-xl">
               <CardHeader className="bg-primary text-white">
                 <CardTitle>Submit Emergency Request</CardTitle>
                 <CardDescription className="text-white/80">Enter patient details and location accurately.</CardDescription>
               </CardHeader>
               <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Blood Group</label>
                      <Select required>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{BLOOD_GROUPS.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Units Needed</label>
                      <Input type="number" min="1" placeholder="Qty" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Hospital Name</label>
                    <div className="relative">
                      <Hospital className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Enter hospital name" className="pl-9" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Location (Area/City)</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="E.g. Juhu, Mumbai" className="pl-9" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Contact Person & Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Phone number" className="pl-9" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Additional Note</label>
                    <Textarea placeholder="Any specific requirements..." rows={3} />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full bg-primary h-12 font-bold text-lg">POST REQUEST</Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForm(false)}>Cancel</Button>
                </CardFooter>
               </form>
             </Card>
          </div>
        )}

        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-red-100 text-red-700 border-red-200">Active Requests (2)</Badge>
              <span className="text-xs text-muted-foreground">• Updated just now</span>
            </div>

            {requests.map((request) => (
              <Card key={request.id} className="relative overflow-hidden border-l-8 border-l-primary hover:shadow-lg transition-shadow bg-card">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center bg-muted/50 rounded-2xl p-4 min-w-[100px] border">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Needed</span>
                      <span className="text-3xl font-black text-primary">{request.bloodType}</span>
                      <span className="text-xs font-medium text-muted-foreground">{request.units} Units</span>
                    </div>

                    <div className="flex-grow space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h3 className="text-xl font-bold">{request.hospital}</h3>
                             <Badge className={request.urgency === 'Critical' ? 'bg-red-600' : 'bg-orange-500'}>
                                {request.urgency}
                             </Badge>
                          </div>
                          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                            <MapPin className="h-4 w-4" /> {request.location}
                          </p>
                        </div>
                        <div className="hidden sm:block text-right">
                          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3" /> Posted {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                             <ShieldCheck className="h-3 w-3 mr-1" /> Verified Request
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button size="sm" className="bg-secondary hover:bg-secondary/90 font-bold px-6">
                          <Phone className="h-4 w-4 mr-2" /> Call Helpdesk
                        </Button>
                        <Button size="sm" variant="outline" className="font-bold border-secondary text-secondary">
                          <Share2 className="h-4 w-4 mr-2" /> Share Case
                        </Button>
                        <p className="text-xs font-medium text-muted-foreground ml-auto md:hidden flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {new Date(request.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-8 border-2 border-dashed rounded-3xl text-center bg-muted/20">
            <h4 className="font-bold text-lg mb-2">Can't find a matching request?</h4>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">Donating regularily is the best way to ensure blood is always available for emergencies. Your single donation can save up to three lives.</p>
            <Button variant="outline" asChild>
              <a href="/register">Register as a Regular Donor</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
