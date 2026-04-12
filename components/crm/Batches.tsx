"use client";

import React from "react";
import { Lead } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BatchesProps {
  leads: Lead[];
  onWhatsApp: (lead: Lead) => void;
  onCall: (lead: Lead) => void;
}

export const Batches: React.FC<BatchesProps> = ({ leads, onWhatsApp, onCall }) => {
  const batchMap: Record<string, Lead[]> = {};
  leads.forEach((l) => {
    if (!batchMap[l.batch]) batchMap[l.batch] = [];
    batchMap[l.batch].push(l);
  });

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-black text-slate-900 leading-none">Saturday Batches</h3>
      <div className="flex flex-col gap-5">
        {Object.entries(batchMap)
          .sort()
          .map(([batch, bLeads]) => {
            const conf = bLeads.filter((l) => l.status === "Confirmed").length;
            const bTotal = bLeads.reduce((s, l) => s + (l.total || 0), 0);
            const bColl = bLeads.reduce((s, l) => s + (l.advance || 0), 0);
            return (
              <div
                key={batch}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-100"
              >
                <div className="px-6 py-5 bg-linear-to-br from-slate-800 to-slate-900 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <div className="text-white font-black text-lg">🗓️ {batch}</div>
                    <div className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-widest">
                      {bLeads.length} clients • {conf} confirmed
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-right">
                      <div className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mb-0.5">Revenue</div>
                      <div className="text-white font-black text-sm">₹{bTotal.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mb-0.5">Collected</div>
                      <div className="text-emerald-400 font-black text-sm">₹{bColl.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mb-0.5">Balance</div>
                      <div className="text-red-400 font-black text-sm">₹{(bTotal - bColl).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-50">
                  {bLeads.map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-[12px] font-black">
                          {l.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-[13px] text-slate-900">{l.name}</div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {l.phone} • {l.sharing}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge label={l.status} config={STATUS_CONFIG[l.status]} />
                        <span className="text-[12px] text-red-500 font-black whitespace-nowrap">
                          ₹{(l.total - l.advance).toLocaleString()} due
                        </span>
                        <div className="flex gap-1.5 ml-2">
                          <button
                            onClick={() => onWhatsApp(l)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-black hover:bg-emerald-100 transition-colors"
                          >
                            💬 WA
                          </button>
                          <button
                            onClick={() => onCall(l)}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-black hover:bg-blue-100 transition-colors"
                          >
                            📞 Call
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
