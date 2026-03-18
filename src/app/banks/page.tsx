
"use client"

import { MOCK_BANKS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Search, Navigation, Filter, Hospital } from 'lucide-react';
import Image from 'next/image';

export default function BloodBanksPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary">Blood Bank Locator</h1>
          <p className="text-muted-foreground mt-1">Find and contact authorized blood centers near you.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
          <Button className="bg-primary font-bold"><Search className="h-4 w-4 mr-2" /> Search Area</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* List Side */}
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-white p-3 rounded-xl border-2 border-primary/10 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search city or pincode..." className="pl-9 border-none shadow-none focus-visible:ring-0" />
            </div>
          </div>
          
          {MOCK_BANKS.map((bank) => (
            <Card key={bank.id} className="hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 shrink-0 bg-muted rounded-xl flex items-center justify-center text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Hospital className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 flex-grow">
                    <h3 className="font-bold text-sm leading-tight">{bank.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {bank.address}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {bank.availableTypes.map(type => (
                        <Badge key={type} variant="secondary" className="text-[10px] py-0 px-1 bg-red-50 text-red-700">{type}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-8"><Phone className="h-3 w-3 mr-1.5" /> Call</Button>
                  <Button size="sm" className="flex-1 text-xs h-8 bg-secondary"><Navigation className="h-3 w-3 mr-1.5" /> Navigate</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Side (Mock) */}
        <div className="lg:col-span-2">
          <Card className="h-[70vh] overflow-hidden relative shadow-inner border-2 bg-muted/20">
            <div className="absolute inset-0">
               {/* Mock Map Image */}
               <Image 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&h=400&auto=format&fit=crop"
                alt="Hospital Map"
                fill
                className="object-cover opacity-60 grayscale-[0.5]"
                data-ai-hint="map location"
               />
               <div className="absolute inset-0 bg-secondary/5"></div>
               
               {/* Map Markers (Mock) */}
               <div className="absolute top-1/4 left-1/3 group">
                  <div className="relative">
                    <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg animate-bounce"></div>
                    <div className="absolute -top-12 -left-12 bg-white px-3 py-1 rounded-lg shadow-xl text-xs font-bold hidden group-hover:block whitespace-nowrap">
                       City Central Blood Bank
                    </div>
                  </div>
               </div>
               
               <div className="absolute top-1/2 left-1/2 group">
                  <div className="relative">
                    <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                  </div>
               </div>
               
               <div className="absolute bottom-1/4 right-1/4 group">
                  <div className="relative">
                    <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur p-4 rounded-2xl shadow-2xl border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Your Location</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Andheri East, Mumbai</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-xs font-bold text-primary">RE-CENTER MAP</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
