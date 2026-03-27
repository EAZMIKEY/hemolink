"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPIBlock } from "@/components/ui/KPIBlock";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedBadge } from "@/components/ui/AnimatedBadge";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  Code, Globe, ShieldCheck, Zap, Copy,
  CheckCircle, Activity, Lock, Server,
  ChevronDown, ChevronRight, BookOpen, Terminal
} from 'lucide-react';

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v2/donors",
    desc: "Retrieve paginated list of verified national donors",
    auth: "Bearer Token",
    rateLimit: "200/min",
    version: "v2.1",
    params: "?bloodGroup=O%2B&state=MH&verified=true&page=1&limit=20",
    response: `{
  "data": [{
    "id": "DNR-2024-001",
    "bloodGroup": "O+",
    "verified": true,
    "lastDonation": "2025-11-20",
    "state": "Maharashtra"
  }],
  "meta": { "total": 85200, "page": 1 }
}`,
  },
  {
    method: "POST",
    path: "/api/v2/requests/emergency",
    desc: "Submit an emergency blood request with SLA priority tagging",
    auth: "Bearer Token + Hospital API Key",
    rateLimit: "50/min",
    version: "v2.1",
    params: "",
    response: `{
  "requestId": "REQ-2026-00421",
  "status": "ACTIVE",
  "priority": "CRITICAL",
  "estimatedMatch": "12 minutes",
  "nearbyDonors": 24
}`,
  },
  {
    method: "GET",
    path: "/api/v2/banks/inventory",
    desc: "Retrieve blood bank inventory across all states",
    auth: "Bearer Token",
    rateLimit: "100/min",
    version: "v2.1",
    params: "?state=DL&critical=true",
    response: `{
  "banks": [{
    "id": "BB-DL-015",
    "name": "AIIMS Blood Bank",
    "stock": { "O+": 210, "AB-": 2, "O-": 3 },
    "criticalGroups": ["AB-", "O-"]
  }]
}`,
  },
  {
    method: "POST",
    path: "/api/v2/screening/submit",
    desc: "Submit donor screening results for FHIR record creation",
    auth: "Bearer Token + Lab API Key",
    rateLimit: "30/min",
    version: "v2.0",
    params: "",
    response: `{
  "fhirId": "FHIR-SCR-2026-0741",
  "status": "RECORDED",
  "result": "PASS",
  "tti": { "HIV": "Negative", "HBsAg": "Negative", "HCV": "Negative" }
}`,
  },
  {
    method: "DELETE",
    path: "/api/v2/appointments/{id}",
    desc: "Cancel a scheduled appointment by ID",
    auth: "Bearer Token",
    rateLimit: "20/min",
    version: "v2.1",
    params: "",
    response: `{
  "id": "APT-2026-0389",
  "status": "CANCELLED",
  "cancelledAt": "2026-03-22T08:14:00Z"
}`,
  },
  {
    method: "GET",
    path: "/api/v2/analytics/national",
    desc: "Fetch national-level supply, demand, and shortage analytics",
    auth: "Ministry API Key",
    rateLimit: "60/min",
    version: "v2.1",
    params: "?period=30d&granularity=state",
    response: `{
  "period": "30d",
  "states": 15,
  "fulfillmentRate": "81.4%",
  "criticalZones": 12,
  "topShortage": "O-"
}`,
  },
];

const METHOD_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  POST: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  DELETE: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  PATCH: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
};

export default function APIDocsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-1000 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <Terminal className="w-3 h-3" /> HemoLink National API · v2.1
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-foreground">API REFERENCE</h1>
          <p className="text-muted-foreground font-bold italic">National blood network API for hospitals, banks &amp; government.</p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedBadge variant="success" pulsing>REST API v2.1</AnimatedBadge>
          <Button className="bg-primary hover:bg-red-700 text-white font-black italic tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <BookOpen className="w-4 h-4 mr-2" /> FULL SDK DOCS
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIBlock title="Total Endpoints" value={ENDPOINTS.length.toString()} icon={Code} glowColor="primary" />
        <KPIBlock title="Active Version" value="v2.1" icon={Globe} glowColor="blue" />
        <KPIBlock title="Rate Limit" value="200/min" icon={Zap} glowColor="yellow" />
        <KPIBlock title="API Uptime" value="99.97%" icon={Activity} glowColor="green"
          trend={{ value: 0.03, label: "downtime this month", isPositive: false }} />
      </div>

      {/* Auth Card */}
      <GlowCard glowColor="blue">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Lock className="w-7 h-7 text-blue-400" />
          </div>
          <div className="flex-grow">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Authentication</p>
            <p className="font-black text-white text-base">Bearer Token (JWT) · Ministry API Key (Admin)</p>
            <p className="text-xs font-bold text-slate-500 mt-1">All requests require <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-[10px]">Authorization: Bearer &lt;token&gt;</code> header.</p>
          </div>
          <div className="flex flex-col gap-2">
            <StatusChip status="active" label="OAuth 2.0" />
            <StatusChip status="active" label="JWT RS256" />
          </div>
        </div>
      </GlowCard>

      {/* Base URL */}
      <GlowCard glowColor="primary" className="py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Base URL</p>
            <code className="text-green-400 font-black text-sm">https://api.hemolink.gov.in</code>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Environment</p>
              <p className="text-xs font-black text-white">Production · Sandboxed</p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 font-black text-xs uppercase tracking-widest">Operational</span>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Endpoint List */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <Server className="w-4 h-4 text-primary" /> Endpoints · {ENDPOINTS.length} Total
        </h2>
        <div className="space-y-3">
          {ENDPOINTS.map((ep, i) => {
            const style = METHOD_STYLE[ep.method];
            const isOpen = expanded === ep.path;
            return (
              <GlowCard key={i} glowColor="primary" className="py-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : ep.path)}>
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge className={`${style.bg} ${style.text} border ${style.border} font-black text-[10px] tracking-widest px-3 py-1 flex-shrink-0`}>
                    {ep.method}
                  </Badge>
                  <code className="text-white font-bold text-sm flex-grow">{ep.path}</code>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest hidden sm:block">{ep.version}</span>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                  </div>
                </div>
                <p className="text-slate-400 text-xs font-bold mt-2">{ep.desc}</p>

                {isOpen && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-white/5" onClick={e => e.stopPropagation()}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Auth", value: ep.auth },
                        { label: "Rate Limit", value: ep.rateLimit },
                        { label: "Version", value: ep.version },
                      ].map((item, j) => (
                        <div key={j} className="bg-slate-800/60 rounded-xl px-4 py-3 border border-white/5">
                          <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{item.label}</p>
                          <p className="font-black text-white text-xs mt-0.5">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {ep.params && (
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-2">Example Parameters</p>
                        <div className="bg-slate-950 rounded-xl p-4 border border-white/5 flex items-center justify-between gap-3">
                          <code className="text-green-300 text-xs break-all">{ep.path}{ep.params}</code>
                          <button
                            onClick={() => handleCopy(ep.path + ep.params, `param-${i}`)}
                            className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
                          >
                            {copied === `param-${i}` ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Sample Response</p>
                        <button
                          onClick={() => handleCopy(ep.response, `resp-${i}`)}
                          className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
                        >
                          {copied === `resp-${i}` ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          {copied === `resp-${i}` ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <pre className="bg-slate-950 rounded-xl p-4 border border-white/5 text-xs text-blue-300 overflow-x-auto leading-relaxed">
                        {ep.response}
                      </pre>
                    </div>
                  </div>
                )}
              </GlowCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
