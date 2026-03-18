
"use client"

import { useState, useMemo } from 'react';
import { BloodGroup, BLOOD_GROUPS, getCompatibleDonors } from '@/lib/blood-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Droplet, Phone, Mail, Calendar, Info, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';

export default function SearchPage() {
  const [bloodGroup, setBloodGroup] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');
  const [showCompatibility, setShowCompatibility] = useState(false);
  const firestore = useFirestore();

  // Create stabilized query
  const donorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    
    let q = query(collection(firestore, 'donors'), where('availability', '==', true));
    
    if (bloodGroup && !showCompatibility) {
      q = query(q, where('bloodGroup', '==', bloodGroup));
    }
    
    if (citySearch) {
      // Note: Firestore doesn't support case-insensitive "includes" natively.
      // For this MVP, we match exact city names if provided.
      q = query(q, where('city', '==', citySearch));
    }

    return q;
  }, [firestore, bloodGroup, citySearch, showCompatibility]);

  const { data: rawDonors, loading } = useCollection(donorsQuery);

  // Client-side filtering for compatibility and partial city matches if needed
  const filteredDonors = useMemo(() => {
    if (!rawDonors) return [];
    
    return rawDonors.filter(donor => {
      // Compatibility filtering
      if (bloodGroup && showCompatibility) {
        const compatibleGroups = getCompatibleDonors(bloodGroup as BloodGroup);
        if (!compatibleGroups.includes(donor.bloodGroup as BloodGroup)) return false;
      }
      return true;
    });
  }, [rawDonors, bloodGroup, showCompatibility]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary">Find Blood Donors</h1>
          <p className="text-muted-foreground mt-1">Search through our verified network of active donors.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 py-1.5 px-3">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            Live Network Status: Online
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-2 border-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Filter Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Blood Group Required</label>
                <Select onValueChange={(v) => setBloodGroup(v)} value={bloodGroup}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOOD_GROUPS.map(bg => (
                      <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">City / Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Enter city (e.g. Mumbai)" 
                    className="pl-9" 
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="compat" 
                  className="rounded border-gray-300" 
                  checked={showCompatibility}
                  onChange={(e) => setShowCompatibility(e.target.checked)}
                />
                <label htmlFor="compat" className="text-xs font-medium cursor-pointer">Show compatible blood groups</label>
              </div>
              <Button className="w-full bg-primary font-bold" onClick={() => {}}>
                <Search className="h-4 w-4 mr-2" />
                Refresh Search
              </Button>
            </CardContent>
          </Card>

          {bloodGroup && (
            <Alert className="bg-blue-50 border-blue-100">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800 font-bold text-xs uppercase tracking-wider">Donor Tip</AlertTitle>
              <AlertDescription className="text-blue-700 text-xs">
                Recipients with {bloodGroup} can also receive from: {getCompatibleDonors(bloodGroup as BloodGroup).join(', ')}.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Results List */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-muted-foreground font-medium">Searching live database...</p>
            </div>
          ) : filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDonors.map((donor) => (
                <Card key={donor.id} className="hover:shadow-md transition-shadow group overflow-hidden border-2 border-transparent hover:border-primary/10">
                  <div className="bg-muted/30 p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {donor.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm leading-none">{donor.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {donor.city}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-primary uppercase bg-primary/10 px-2 py-1 rounded">
                        Group: {donor.bloodGroup}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-muted-foreground block">Email</span>
                        <span className="font-semibold flex items-center gap-1 truncate">
                          <Mail className="h-3 w-3" /> {donor.email}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground block">Status</span>
                        <span className="font-semibold flex items-center gap-1 text-green-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                          Available Now
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-primary font-bold" asChild>
                        <a href={`tel:${donor.phone}`}>
                          <Phone className="h-4 w-4 mr-2" /> Call Now
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 font-bold border-secondary text-secondary" asChild>
                        <a href={`mailto:${donor.email}`}>
                          <Mail className="h-4 w-4 mr-2" /> Message
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-card border rounded-2xl p-20 text-center">
              <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No donors found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                No donors available for this blood group in your area. Try broadening your search or checking compatibility.
              </p>
              <Button variant="link" className="text-primary font-bold mt-4" onClick={() => {setBloodGroup(''); setCitySearch('');}}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
