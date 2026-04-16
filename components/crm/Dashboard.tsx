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
    className="bg-white rounded-2xl p-6 shadow-premium border border-slate-50 transition-all hover:translate-y-[-2px] hover:shadow-lg flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 shrink-0" style={{ color }}>
         {icon}
      </div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
        {label}
      </div>
    </div>
    <div>
      <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
      {sub && <div className="text-[11px] font-bold text-slate-500 mt-2 flex items-center gap-1.5 uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }}></span>
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
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Good day, Humsafar 🏔️</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Here's your travel business at a glance</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button onClick={onAddLead} variant="primary" className="flex-1 md:flex-none">
            ＋ Add Lead
          </Button>
          <Button onClick={onBulkImport} variant="ghost" className="flex-1 md:flex-none">
            📤 Import
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        <StatCard
          label="Total Leads"
          value={total}
          sub={`${confirmed} confirmed`}
          color="#6366f1"
          icon="👥"
        />
        <StatCard
          label="Confirmed"
          value={confirmed}
          sub={`${Math.round((confirmed / total) * 100) || 0}% conversion`}
          color="#10b981"
          icon="✅"
        />
        <StatCard
          label="Pending"
          value={pending}
          sub="Need follow-up"
          color="#f59e0b"
          icon="⏳"
        />
        <StatCard
          label="Follow-ups"
          value={followUp}
          sub="Due today"
          color="#6366f1"
          icon="📞"
        />
        <StatCard
          label="Total Revenue"
          value={`₹${(totalRevenue / 1000).toFixed(0)}K`}
          sub="Gross bookings"
          color="#059669"
          icon="💼"
        />
        <StatCard
          label="Collected"
          value={`₹${(collected / 1000).toFixed(0)}K`}
          sub={`₹${(balance / 1000).toFixed(0)}K pending`}
          color="#3b82f6"
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-xs">
          <div className="font-extrabold text-base text-slate-900 mb-4">Recent Leads</div>
          <div className="space-y-4">
            {leads.slice(0, 5).map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                    {l.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-[13px] text-slate-900">{l.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {l.batch} • {l.sharing}
                    </div>
                  </div>
                </div>
                <Badge label={l.status} config={STATUS_CONFIG[l.status]} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xs">
          <div className="font-extrabold text-base text-slate-900 mb-4">Quick Actions</div>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={onAddLead}
              className="p-3.5 rounded-xl border-1.5 border-dashed border-indigo-200 bg-indigo-50/50 text-indigo-600 font-bold cursor-pointer text-left text-sm hover:bg-indigo-50 transition-colors"
            >
              ＋ Add New Lead Manually
            </button>
            <button
              onClick={onBulkImport}
              className="p-3.5 rounded-xl border-1.5 border-dashed border-emerald-200 bg-emerald-50/50 text-emerald-700 font-bold cursor-pointer text-left text-sm hover:bg-emerald-50 transition-colors"
            >
              📤 Import from Excel / CSV
            </button>
            <button
              onClick={onViewFollowUps}
              className="p-3.5 rounded-xl border-1.5 border-dashed border-amber-200 bg-amber-50/50 text-amber-700 font-bold cursor-pointer text-left text-sm hover:bg-amber-50 transition-colors"
            >
              📞 View Pending Follow-ups ({followUp + pending})
            </button>
            <button
              onClick={onViewPayments}
              className="p-3.5 rounded-xl border-1.5 border-dashed border-blue-200 bg-blue-50/50 text-blue-700 font-bold cursor-pointer text-left text-sm hover:bg-blue-50 transition-colors"
            >
              💰 Check Payment Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
