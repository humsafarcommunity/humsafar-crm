"use client";

import React from "react";
import { Lead } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PaymentsProps {
  leads: Lead[];
  onEmail: (lead: Lead) => void;
  onWhatsApp: (lead: Lead) => void;
}

export const Payments: React.FC<PaymentsProps> = ({ leads, onEmail, onWhatsApp }) => {
  const totalRevenue = leads.reduce((s, l) => s + (l.total || 0), 0);
  const collected = leads.reduce((s, l) => s + (l.advance || 0), 0);
  const balance = totalRevenue - collected;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-black text-slate-900 leading-none">Payment Tracker</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Total Revenue", val: `₹${totalRevenue.toLocaleString()}`, color: "#6366f1", icon: "💼" },
          { label: "Collected", val: `₹${collected.toLocaleString()}`, color: "#10b981", icon: "✅" },
          { label: "Outstanding", val: `₹${balance.toLocaleString()}`, color: "#ef4444", icon: "⚠️" },
        ].map((c) => (
          <div
            key={c.label}
            className="bg-white rounded-2xl p-6 shadow-xs text-center flex flex-col items-center border border-slate-100"
          >
            <div className="text-4xl mb-3">{c.icon}</div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">{c.label}</div>
            <div className="text-3xl font-black mt-1" style={{ color: c.color }}>
              {c.val}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {["Client", "Batch", "Status", "Package", "Advance", "Balance", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left font-extrabold text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-100"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...leads]
                .sort((a, b) => (b.total - b.advance) - (a.total - a.advance))
                .map((l, i) => {
                  const bal = (l.total || 0) - (l.advance || 0);
                  return (
                    <tr
                      key={l.id}
                      className={`border-b border-slate-50 transition-colors hover:bg-indigo-50/30 ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      <td className="px-6 py-4 font-extrabold text-slate-900">{l.name}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{l.batch}</td>
                      <td className="px-6 py-4">
                        <Badge label={l.status} config={STATUS_CONFIG[l.status]} />
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">₹{(l.total || 0).toLocaleString()}</td>
                      <td className="px-6 py-4 color-emerald-600 font-black">₹{(l.advance || 0).toLocaleString()}</td>
                      <td
                        className={`px-6 py-4 font-black ${
                          bal > 0 ? "text-red-500" : "text-emerald-500"
                        }`}
                      >
                        ₹{bal.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="email" onClick={() => onEmail(l)}>
                            📧 Bill
                          </Button>
                          <Button size="sm" variant="whatsapp" onClick={() => onWhatsApp(l)}>
                            💬 WA
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
