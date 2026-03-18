
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Droplet, 
  Heart, 
  AlertCircle, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Bell, 
  Calendar,
  Activity,
  ArrowRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import Link from 'next/link';

const availabilityData = [
  { group: 'A+', count: 120 },
  { group: 'B+', count: 90 },
  { group: 'O+', count: 210 },
  { group: 'AB+', count: 45 },
  { group: 'A-', count: 30 },
  { group: 'B-', count: 25 },
  { group: 'O-', count: 60 },
  { group: 'AB-', count: 15 },
];

const donationTrend = [
  { month: 'Oct', count: 450 },
  { month: 'Nov', count: 520 },
  { month: 'Dec', count: 480 },
  { month: 'Jan', count: 610 },
  { month: 'Feb', count: 590 },
  { month: 'Mar', count: 730 },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary tracking-tight">System Overview</h1>
          <p className="text-muted-foreground font-medium">Monitoring blood network health across India.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-white border-2 py-1.5 px-4 font-bold">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            March 20, 2024
          </Badge>
          <Button className="bg-primary hover:bg-red-700 font-bold shadow-lg shadow-primary/20">
            <Bell className="h-4 w-4 mr-2" /> Live Alerts
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Donors', value: '852,430', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Active Requests', value: '1,245', change: '+5%', icon: AlertCircle, color: 'text-primary', bg: 'bg-red-50' },
          { title: 'Units Collected', value: '45,670', change: '+8%', icon: Droplet, color: 'text-amber-600', bg: 'bg-amber-50' },
          { title: 'Lives Impacted', value: '1.2M', change: '+15%', icon: Heart, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge className="bg-green-100 text-green-700 border-none font-bold">
                  {stat.change} <TrendingUp className="h-3 w-3 ml-1" />
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground">{stat.title}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Blood Stock Availability</CardTitle>
                  <CardDescription>Real-time units available by blood group.</CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32"><SelectValue placeholder="Location" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All India</SelectItem></SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={availabilityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="group" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{ fill: '#F5EEEE' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {availabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.group.includes('-') ? '#1A2F60' : '#b30000'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Donation Trends</CardTitle>
              <CardDescription>Growth of blood donation sessions over last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donationTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="count" stroke="#b30000" strokeWidth={4} dot={{ fill: '#b30000', strokeWidth: 2, r: 6, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="space-y-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { type: 'Donation', user: 'Amit K.', text: 'Donated 1 unit of O+ at Mumbai Center', time: '12m ago', icon: Droplet, color: 'bg-red-50 text-primary' },
                { type: 'Request', user: 'Hosp. A', text: 'Urgent B- blood request in Delhi', time: '45m ago', icon: AlertCircle, color: 'bg-amber-50 text-amber-600' },
                { type: 'New Donor', user: 'Sanya M.', text: 'Registered as verified AB+ donor', time: '1h ago', icon: Users, color: 'bg-blue-50 text-blue-600' },
                { type: 'Success', user: 'Blood Bank', text: 'Request fulfilled in Bangalore', time: '3h ago', icon: Heart, color: 'bg-green-50 text-green-600' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 group cursor-default">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow border-b pb-4 group-last:border-none">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="font-bold text-sm">{activity.user}</h4>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {activity.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{activity.text}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-2 font-bold" asChild>
                <Link href="/admin">
                  View All Logs <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="bg-primary rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-primary/20">
             <h3 className="text-xl font-bold">Emergency Mode</h3>
             <p className="text-white/80 text-sm">System is currently monitoring high demand in the Northern region.</p>
             <Button variant="secondary" className="w-full font-bold bg-white text-primary hover:bg-white/90">
               Dispatch Emergency Team
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
