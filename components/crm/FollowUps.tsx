"use client";

import React from "react";
import { Lead, LeadStatus } from "@/lib/lead-types";
import { STATUS_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface FollowUpsProps {
  leads: Lead[];
  onUpdateStatus: (id: number, status: LeadStatus) => void;
  onWhatsApp: (lead: Lead) => void;
  onCall: (lead: Lead) => void;
  onEmail: (lead: Lead) => void;
}

export const FollowUps: React.FC<FollowUpsProps> = ({
  leads,
  onUpdateStatus,
  onWhatsApp,
  onCall,
  onEmail,
}) => {
  const due = leads.filter((l) => l.status === "Follow-up" || l.status === "Pending");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-2xl font-black text-slate-900 leading-none">Follow-up Manager</h3>
        <p className="text-slate-500 text-sm mt-1.5">{due.length} leads need attention</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {due.map((l) => (
          <div
            key={l.id}
            className="bg-white rounded-2xl p-5 shadow-xs border-l-4"
            style={{ borderLeftColor: STATUS_CONFIG[l.status]?.color }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-black text-base">
                  {l.name[0]}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-base">{l.name}</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{l.batch}</div>
                </div>
              </div>
              <Badge label={l.status} config={STATUS_CONFIG[l.status]} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 p-3.5 bg-slate-50 rounded-xl">
              <div className="text-[11px]">
                <span className="text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Phone</span>
                <b className="text-slate-900 text-[13px]">{l.phone}</b>
              </div>
              <div className="text-[11px]">
                <span className="text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Balance</span>
                <b className="text-red-500 text-[13px]">₹{(l.total - l.advance).toLocaleString()}</b>
              </div>
              {l.followUp && (
                <div className="text-[11px]">
                  <span className="text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Next Call</span>
                  <b className="text-slate-900 text-[13px]">{l.followUp}</b>
                </div>
              )}
              <div className="text-[11px]">
                <span className="text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Sharing</span>
                <b className="text-slate-900 text-[13px]">{l.sharing}</b>
              </div>
            </div>

            {l.notes && (
              <div className="text-[12px] text-slate-500 mb-4 italic px-2 border-l-2 border-slate-100 italic">
                📝 {l.notes}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
              <Button size="sm" variant="whatsapp" onClick={() => onWhatsApp(l)}>
                💬 WA
              </Button>
              <Button size="sm" variant="call" onClick={() => onCall(l)}>
                📞 Call
              </Button>
              <Button size="sm" variant="email" onClick={() => onEmail(l)}>
                📧 Email
              </Button>
              <select
                value={l.status}
                onChange={(e) => onUpdateStatus(l.id, e.target.value as LeadStatus)}
                className="px-2 py-1 h-[34px] rounded-lg border-1.5 border-slate-200 text-[11px] font-extrabold text-slate-600 bg-white cursor-pointer outline-hidden focus:border-indigo-500 transition-colors"
              >
                {Object.keys(STATUS_CONFIG).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {due.length === 0 && (
          <div className="col-span-full py-20 bg-white rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4">🎉</div>
            <div className="text-lg font-black text-slate-900 italic">All caught up!</div>
            <div className="text-sm text-slate-400 mt-1">No pending follow-ups right now.</div>
          </div>
        )}
      </div>
    </div>
  );
};
