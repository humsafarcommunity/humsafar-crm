"use client";

import React from "react";
import { Lead } from "@/lib/lead-types";
import { STATUS_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, color, icon }) => (
  <div
    className="bg-white rounded-xl p-6 shadow-premium border border-slate-200/60 transition-all hover:translate-y-[-2px] hover:shadow-xl flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-slate-50 shrink-0 border border-slate-100" style={{ color }}>
         {icon}
      </div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
        {label}
      </div>
    </div>
    <div>
      <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
      {sub && <div className="text-[11px] font-bold text-slate-500 mt-2 flex items-center gap-1.5 uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-sm" style={{ background: color }}></span>
        {sub}
      </div>}
    </div>
  </div>
);

interface DashboardProps {
  leads: Lead[];
  onAddLead: () => void;
  onBulkImport: () => void;
  onViewFollowUps: () => void;
  onViewPayments: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  leads,
  onAddLead,
  onBulkImport,
  onViewFollowUps,
  onViewPayments,
}) => {
  const total = leads.length;
  const confirmed = leads.filter((l) => l.status === "Confirmed").length;
  const pending = leads.filter((l) => l.status === "Pending").length;
  const followUp = leads.filter((l) => l.status === "Follow-up").length;
  const totalRevenue = leads.reduce((s, l) => s + (l.total || 0), 0);
  const collected = leads.reduce((s, l) => s + (l.advance || 0), 0);
  const balance = totalRevenue - collected;

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Executive Dashboard</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Humsafar community travel pipeline at a glance</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={onAddLead} variant="primary" className="shadow-lg shadow-indigo-100 px-6">
            ＋ Create New Lead
          </Button>
          <Button onClick={onBulkImport} variant="ghost" className="px-6 border-slate-300">
            📤 Import CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
        <StatCard
          label="Total Leads"
          value={total.toString()}
          sub={`${confirmed} in pipeline`}
          color="#0f172a"
          icon="👥"
        />
        <StatCard
          label="Conversion"
          value={`${Math.round((confirmed / total) * 100) || 0}%`}
          sub={`${confirmed} records`}
          color="#059669"
          icon="📈"
        />
        <StatCard
          label="Needs Attention"
          value={pending.toString()}
          sub="Pending review"
          color="#dc2626"
          icon="⚠️"
        />
        <StatCard
          label="Today's Follow-ups"
          value={followUp.toString()}
          sub="Schedule calls"
          color="#4f46e5"
          icon="📞"
        />
        <StatCard
          label="Potential Revenue"
          value={`₹${(totalRevenue / 1000).toFixed(0)}K`}
          sub="Projected"
          color="#1e293b"
          icon="💼"
        />
        <StatCard
          label="Revenue Collected"
          value={`₹${(collected / 1000).toFixed(0)}K`}
          sub={`₹${(balance / 1000).toFixed(0)}K pending`}
          color="#0891b2"
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-premium border border-slate-200/60 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-black text-slate-900 text-[11px] uppercase tracking-widest">Recent Activity</h3>
                <button onClick={() => {}} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors cursor-pointer">View Records</button>
              </div>
             <div className="divide-y divide-slate-50">
               {leads.slice(0, 6).map((l) => (
                 <div key={l.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-md group-hover:bg-indigo-600 transition-colors">
                       {l.name[0]}
                     </div>
                     <div>
                       <div className="font-bold text-sm text-slate-900">{l.name}</div>
                       <div className="text-[11px] text-slate-400 font-medium">
                         {l.batch} • {l.sharing} • {l.phone}
                       </div>
                     </div>
                   </div>
                   <Badge label={l.status} config={STATUS_CONFIG[l.status]} />
                 </div>
               ))}
             </div>
           </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl p-8 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-xl font-black mb-2">Grow your business</h3>
               <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                 Track your pipeline and follow up with leads consistently to increase your conversion rate.
               </p>
               <button 
                  onClick={onAddLead}
                  className="w-full py-3.5 bg-white text-slate-900 rounded-lg font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                 <span>＋</span> New Manual Lead
               </button>
             </div>
             <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white rounded-xl shadow-premium border border-slate-100 p-6">
            <h3 className="font-black text-slate-900 text-[11px] uppercase tracking-widest mb-6">Quick Filters</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={onViewFollowUps} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold border border-slate-100 hover:border-slate-300 transition-all">Pending Calls</button>
              <button onClick={onViewPayments} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold border border-slate-100 hover:border-slate-300 transition-all">Revenue Stats</button>
              <button className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold border border-slate-100 hover:border-slate-300 transition-all">Batch Lists</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
