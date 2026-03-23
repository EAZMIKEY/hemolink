"use client"

import { PageHeader } from "@/components/ui/PageHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { 
  FileText, Download, PieChart, BarChart3, 
  Table as TableIcon, Calendar, Filter, 
  CheckCircle2, AlertTriangle, Activity,
  Database, MapPin
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const REPORTS = [
  { 
    id: "REP-001", 
    title: "Monthly Screening Compliance", 
    type: "Medical/TTI", 
    date: "2026-03-01", 
    status: "Verified",
    description: "Summary of all TTI screenings (HIV, HBV, HCV, etc.) conducted across the national grid."
  },
  { 
    id: "REP-002", 
    title: "National Inventory Health", 
    type: "Inventory", 
    date: "2026-03-15", 
    status: "Active",
    description: "Real-time stock levels of PRBC, Platelets, and Plasma across all L1/L2 blood banks."
  },
  { 
    id: "REP-003", 
    title: "State Shortage Analysis", 
    type: "Strategic", 
    date: "2026-03-22", 
    status: "Critical",
    description: "Identifies districts with <10% fulfillment rate for rare blood groups."
  },
  { 
    id: "REP-004", 
    title: "Donation Eligibility Audit", 
    type: "Donor Care", 
    date: "2026-02-28", 
    status: "Verified",
    description: "Audit of donor deferrals and recall efficiency for repeat donors."
  }
];

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (id: string, format: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Report ${id} downloaded successfully as ${format}.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <PageHeader 
        title="NATIONAL COMPLIANCE REGISTRY" 
        subtitle="Mandatory government reports, inventory audits, and clinical compliance summaries." 
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <KPIBlock title="Reports Generated" value="142" icon={FileText} glowColor="primary" />
        <KPIBlock title="Comp. Rate" value="99.8%" icon={CheckCircle2} glowColor="green" />
        <KPIBlock title="Pending Audits" value="03" icon={AlertTriangle} glowColor="yellow" />
        <KPIBlock title="Data Fidelity" value="High" icon={Activity} glowColor="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {REPORTS.map((report) => (
          <GlowCard key={report.id} glowColor={report.status === 'Critical' ? 'red' : 'primary'} className="flex flex-col bg-slate-900/40 backdrop-blur-xl border-white/10 group hover:bg-slate-900/60 transition-all duration-500">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                  <FileText className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                </div>
                <AnimatedBadge 
                  variant={report.status === 'Verified' ? 'success' : report.status === 'Critical' ? 'error' : 'warning'}
                >
                  {report.status}
                </AnimatedBadge>
              </div>

              <h3 className="text-xl font-black italic tracking-tight text-white uppercase mb-2 group-hover:text-primary transition-colors">
                {report.title}
              </h3>
              <div className="flex gap-3 mb-4">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest border border-white/10 px-2 py-0.5 rounded">ID: {report.id}</span>
                <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest bg-blue-400/10 px-2 py-0.5 rounded">{report.type}</span>
              </div>
              <p className="text-xs text-slate-400 font-bold leading-relaxed mb-6 italic opacity-80">
                {report.description}
              </p>

              <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {report.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="w-3 h-3" /> 24.8 MB
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/40 border-t border-white/5 flex gap-2">
              <Button 
                onClick={() => handleDownload(report.id, 'PDF')}
                disabled={downloading === report.id}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black italic tracking-widest h-10 rounded-xl transition-all"
              >
                {downloading === report.id ? "GENERATING..." : <><Download className="w-3.5 h-3.5 mr-2" /> PDF</>}
              </Button>
              <Button 
                onClick={() => handleDownload(report.id, 'CSV')}
                disabled={downloading === report.id}
                variant="outline"
                className="flex-1 border-white/10 text-white text-[10px] font-black italic tracking-widest h-10 rounded-xl hover:bg-white/5 transition-all"
              >
                <TableIcon className="w-3.5 h-3.5 mr-2" /> CSV
              </Button>
            </div>
          </GlowCard>
        ))}

        {/* Generate Custom Report Placeholder */}
        <GlowCard glowColor="primary" className="flex flex-col bg-slate-900/20 border-white/5 border-dashed border-2 justify-center items-center p-12 text-center group hover:bg-white/5 transition-all cursor-pointer">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Plus className="w-8 h-8 text-slate-600 group-hover:text-white" />
          </div>
          <h3 className="text-sm font-black italic text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">Generate Custom Query</h3>
          <p className="text-[10px] text-slate-600 font-bold mt-2 uppercase tracking-tight">Structured SQL/FHIR Data Export</p>
        </GlowCard>
      </div>
    </div>
  );
}

// Helper icons
function Plus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
