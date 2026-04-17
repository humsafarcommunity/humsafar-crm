"use client";

import React from "react";
import { Lead, LeadStatus } from "@/lib/lead-types";
import { STATUS_CONFIG, TAG_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Form";

interface LeadsTableProps {
  leads: Lead[];
  search: string;
  setSearch: (s: string) => void;
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  filterBatch: string;
  setFilterBatch: (s: string) => void;
  onAddLead: () => void;
  onBulkImport: () => void;
  onUpdateStatus: (id: number, status: LeadStatus) => void;
  onWhatsApp: (lead: Lead) => void;
  onEmail: (lead: Lead) => void;
  onCall: (lead: Lead) => void;
  onViewDetail: (lead: Lead) => void;
  onEditLead: (lead: Lead) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterBatch,
  setFilterBatch,
  onAddLead,
  onBulkImport,
  onUpdateStatus,
  onWhatsApp,
  onEmail,
  onCall,
  onViewDetail,
  onEditLead,
}) => {
  const batches = ["All", ...Array.from(new Set(leads.map((l) => l.batch)))];
  const statuses = ["All", ...Object.keys(STATUS_CONFIG)];

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.destination?.toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchBatch = filterBatch === "All" || l.batch === filterBatch;
    return matchSearch && matchStatus && matchBatch;
  });

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="flex flex-1 flex-wrap gap-2 md:gap-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search name, phone..."
            className="flex-1 min-w-[140px] lg:max-w-xs h-10"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:w-auto h-10"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <Select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="flex-1 sm:w-auto h-10"
            >
              {batches.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onAddLead} size="sm" className="flex-1 sm:flex-none">
            ＋ Add Lead
          </Button>
          <Button onClick={onBulkImport} variant="ghost" size="sm" className="flex-1 sm:flex-none">
            📤 Import
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-premium border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "Name & Contact",
                  "Destination",
                  "Batch",
                  "Sharing",
                  "Status",
                  "Tag",
                  "Pkg (₹)",
                  "Adv (₹)",
                  "Bal (₹)",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-extrabold text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-100 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr
                  key={l.id}
                  className={`border-b border-slate-50 transition-colors hover:bg-indigo-50/30 ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-[11px] shrink-0 shadow-sm">
                        {l.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{l.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {l.phone} {l.email && `• ${l.email}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-bold whitespace-nowrap">
                    {l.destination || "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{l.batch}</td>
                  <td className="px-4 py-3 text-slate-600">{l.sharing}</td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      onChange={(e) => onUpdateStatus(l.id, e.target.value as LeadStatus)}
                      className="px-2 py-1 rounded-md font-bold text-[11px] cursor-pointer outline-hidden border-1.5 transition-colors"
                      style={{
                        borderColor: STATUS_CONFIG[l.status]?.color,
                        color: STATUS_CONFIG[l.status]?.color,
                        backgroundColor: STATUS_CONFIG[l.status]?.bg,
                      }}
                    >
                      {Object.keys(STATUS_CONFIG).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {l.tag && <Badge label={l.tag} config={TAG_CONFIG[l.tag] || TAG_CONFIG["New"]} />}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    ₹{(l.total || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600">
                    ₹{(l.advance || 0).toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-3 font-black ${
                      l.total - l.advance > 0 ? "text-red-500" : "text-emerald-500"
                    }`}
                  >
                    ₹{(l.total - l.advance).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        title="WhatsApp Itinerary"
                        onClick={() => onWhatsApp(l)}
                        className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                      >
                        💬
                      </button>
                      <button
                        title="Send Email Bill"
                        onClick={() => onEmail(l)}
                        className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors"
                      >
                        📧
                      </button>
                      <button
                        title="Call"
                        onClick={() => onCall(l)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                      >
                        📞
                      </button>
                      <button
                        title="View Details"
                        onClick={() => onViewDetail(l)}
                        className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                      >
                        👁
                      </button>
                      <button
                        title="Edit Lead"
                        onClick={() => onEditLead(l)}
                        className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
                      >
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-20 text-center text-slate-400 text-base font-medium">
                    No leads found. Try adjusting filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-slate-100 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
          Showing {filtered.length} of {leads.length} leads
        </div>
      </div>
    </div>
  );
};
