"use client";

import React, { useState, useRef } from "react";
import { Lead, LeadStatus, LeadTag, RoomSharing } from "@/lib/lead-types";
import { SEED_LEADS, STATUS_CONFIG, TAG_CONFIG, ITINERARY_TEMPLATE } from "@/lib/constants";

// UI Components
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { Input, Select } from "@/components/ui/Form";

// Feature Components
import { Dashboard } from "@/components/crm/Dashboard";
import { LeadsTable } from "@/components/crm/LeadsTable";
import { FollowUps } from "@/components/crm/FollowUps";
import { Batches } from "@/components/crm/Batches";
import { Payments } from "@/components/crm/Payments";

import * as actions from "@/app/actions/leads";
import { logout } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function HumsafarCRM() {
  const [mounted, setMounted] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    actions.getLeads().then((data) => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  const [tab, setTab] = useState<"dashboard" | "leads" | "followups" | "batches" | "payments">("dashboard");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterBatch, setFilterBatch] = useState("All");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [modal, setModal] = useState<"add" | "bulk" | "detail" | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [bulkPreview, setBulkPreview] = useState<Lead[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Omit<Lead, "id">>({
    name: "",
    age: "",
    phone: "",
    email: "",
    sharing: "Double",
    batch: "",
    status: "Pending",
    advance: 0,
    total: 0,
    notes: "",
    tag: "New",
    followUp: "",
  });

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const addLead = async () => {
    const fresh = await actions.addLead(form);
    setLeads((p) => [fresh, ...p]);
    setModal(null);
    setForm({
      name: "",
      age: "",
      phone: "",
      email: "",
      sharing: "Double",
      batch: "",
      status: "Pending",
      advance: 0,
      total: 0,
      notes: "",
      tag: "New",
      followUp: "",
    });
    showToast(`${fresh.name} added to CRM`);
  };

  const updateLead = async (id: number, updates: Partial<Lead>) => {
    const updated = await actions.updateLead(id, updates);
    setLeads((p) => p.map((l) => (l.id === id ? updated : l)));
  };

  const deleteLead = async (id: number) => {
    await actions.deleteLead(id);
    setLeads((p) => p.filter((l) => l.id !== id));
    setModal(null);
    setSelected(null);
    showToast("Lead removed", "error");
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = text.split("\n").filter((r) => r.trim()).slice(1);
      const parsed: Lead[] = rows.map((row, i) => {
        const cols = row.split(",").map((c) => c.trim().replace(/"/g, ""));
        const ageVal = parseInt(cols[1]);
        return {
          id: Date.now() + i,
          name: cols[0] || `Client ${i + 1}`,
          age: (isNaN(ageVal) ? "" : ageVal) as number | "",
          phone: cols[2] || "",
          email: cols[3] || "",
          sharing: (cols[4] as RoomSharing) || "Double",
          batch: cols[5] || "TBD",
          status: (cols[6] as LeadStatus) || "Pending",
          advance: parseFloat(cols[7]) || 0,
          total: parseFloat(cols[8]) || 0,
          notes: cols[9] || "",
          tag: (cols[10] as LeadTag) || "New",
          followUp: "",
        };
      }).filter((r) => r.name);
      setBulkPreview(parsed);
    };
    reader.readAsText(file);
  };

  const confirmBulkImport = async () => {
    await actions.bulkImportLeads(bulkPreview);
    const fresh = await actions.getLeads();
    setLeads(fresh);
    showToast(`${bulkPreview.length} leads imported!`);
    setBulkPreview([]);
    setModal(null);
  };


  const openWhatsApp = (lead: Lead) => {
    const msg = ITINERARY_TEMPLATE.replace("{amount}", `₹${lead.total?.toLocaleString()}`);
    const encoded = encodeURIComponent(msg);
    const phone = lead.phone?.replace(/\D/g, "");
    window.open(`https://wa.me/${phone.length > 10 ? phone : "91" + phone}?text=${encoded}`, "_blank");
    showToast(`Opening WhatsApp for ${lead.name}`);
  };

  const sendEmail = (lead: Lead) => {
    const sub = encodeURIComponent(`Booking Confirmation — Humsafar Community | ${lead.batch}`);
    const body = encodeURIComponent(
      `Dear ${lead.name},\n\nYour booking is confirmed for the ${lead.batch} batch.\n\nPackage: ₹${lead.total?.toLocaleString()}\nAdvance Paid: ₹${lead.advance?.toLocaleString()}\nBalance Due: ₹${(
        lead.total - lead.advance
      ).toLocaleString()}\n\nThank you for choosing Humsafar Community!\n\nTeam Humsafar\nContact: 9876543210`
    );
    window.open(`mailto:${lead.email}?subject=${sub}&body=${body}`, "_blank");
    showToast(`Email client opened for ${lead.name}`);
  };

  const callLead = (lead: Lead) => {
    window.open(`tel:${lead.phone}`, "_blank");
    showToast(`Calling ${lead.name}...`);
  };

  const navItems = [
    { id: "dashboard", icon: "⬡", label: "Dashboard" },
    { id: "leads", icon: "👥", label: "All Leads" },
    { id: "followups", icon: "📞", label: "Follow-ups" },
    { id: "batches", icon: "🗓️", label: "Batches" },
    { id: "payments", icon: "💰", label: "Payments" },
  ] as const;

  if (!mounted) return <div className="h-screen w-screen bg-slate-50" />;

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="text-slate-500 font-bold text-sm tracking-widest uppercase">Initializing CRM...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl">
              🏔️
            </div>
            <div>
              <div className="text-white font-black text-base leading-none">Humsafar</div>
              <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1">
                Community CRM
              </div>
            </div>
          </div>
        </div>

        <nav className="px-3 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm mb-1 transition-all ${
                tab === item.id
                  ? "bg-linear-to-br from-indigo-500 to-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-2xl">
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Live Presence
            </div>
            <div className="text-white text-2xl font-black mt-1">{leads.length}</div>
            <div className="text-emerald-400 text-[11px] font-black mt-1">
              {leads.filter((l) => l.status === "Confirmed").length} active bookings ✓
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="px-4 py-2 flex flex-col">
               <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">Account</span>
               <span className="text-slate-300 text-xs font-bold mt-1 truncate">{user?.email || "Loading..."}</span>
            </div>
            <button 
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
            >
              <span className="text-lg">🚪</span>
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {tab === "dashboard" && (
            <Dashboard
              leads={leads}
              onAddLead={() => setModal("add")}
              onBulkImport={() => setModal("bulk")}
              onViewFollowUps={() => setTab("followups")}
              onViewPayments={() => setTab("payments")}
            />
          )}
          {tab === "leads" && (
            <LeadsTable
              leads={leads}
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterBatch={filterBatch}
              setFilterBatch={setFilterBatch}
              onAddLead={() => setModal("add")}
              onBulkImport={() => setModal("bulk")}
              onUpdateStatus={(id, status) => updateLead(id, { status })}
              onWhatsApp={openWhatsApp}
              onEmail={sendEmail}
              onCall={callLead}
              onViewDetail={(l) => {
                setSelected(l);
                setModal("detail");
              }}
            />
          )}
          {tab === "followups" && (
            <FollowUps
              leads={leads}
              onUpdateStatus={(id, status) => updateLead(id, { status })}
              onWhatsApp={openWhatsApp}
              onCall={callLead}
              onEmail={sendEmail}
            />
          )}
          {tab === "batches" && (
            <Batches leads={leads} onWhatsApp={openWhatsApp} onCall={callLead} />
          )}
          {tab === "payments" && (
            <Payments leads={leads} onEmail={sendEmail} onWhatsApp={openWhatsApp} />
          )}
        </div>
      </main>

      {/* MODALS */}
      <Modal open={modal === "add"} onClose={() => setModal(null)} title="➕ Add New Lead">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
          />
          <Input
            label="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value === "" ? "" : Number(e.target.value) })}
            placeholder="e.g. 24"
            type="number"
          />
          <Input
            label="WhatsApp Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="10-digit mobile"
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email@example.com"
          />
          <Select
            label="Room Sharing"
            value={form.sharing}
            onChange={(e) => setForm({ ...form, sharing: e.target.value as RoomSharing })}
          >
            {["Single", "Double", "Triple", "Quad", "5+ Sharing"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
          <Input
            label="Batch Date"
            value={form.batch}
            onChange={(e) => setForm({ ...form, batch: e.target.value })}
            placeholder="e.g. 07 Dec 2024"
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as LeadStatus })}
          >
            {Object.keys(STATUS_CONFIG).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
          <Select
            label="Tag"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value as LeadTag })}
          >
            {Object.keys(TAG_CONFIG).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Input
            label="Total Package (₹)"
            value={form.total}
            onChange={(e) => setForm({ ...form, total: Number(e.target.value) })}
            placeholder="e.g. 6500"
            type="number"
          />
          <Input
            label="Advance Paid (₹)"
            value={form.advance}
            onChange={(e) => setForm({ ...form, advance: Number(e.target.value) })}
            placeholder="e.g. 2000"
            type="number"
          />
          <Input
            label="Follow-up Date"
            value={form.followUp}
            onChange={(e) => setForm({ ...form, followUp: e.target.value })}
            type="date"
          />
          <div className="sm:col-span-2">
            <Input
              label="Notes / Remarks"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any special requests or notes..."
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-slate-100">
          <Button variant="ghost" onClick={() => setModal(null)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={addLead}
            disabled={!form.name || !form.phone}
          >
            ＋ Add Lead
          </Button>
        </div>
      </Modal>

      <Modal
        open={modal === "bulk"}
        onClose={() => {
          setModal(null);
          setBulkPreview([]);
        }}
        title="📤 Bulk Import Leads"
        width={680}
      >
        <div className="bg-slate-50 rounded-2xl p-5 mb-6 border-2 border-dashed border-slate-200">
          <p className="font-bold text-sm text-slate-900 mb-2">CSV Format Expectations:</p>
          <code className="text-xs bg-indigo-50 text-indigo-600 p-3 rounded-lg block font-mono">
            Name, Age, Phone, Email, Sharing, Batch, Status, Advance, Total, Notes, Tag
          </code>
          <p className="text-xs text-slate-500 mt-3 italic">
            * Note: The first row is treated as header and will be skipped.
          </p>
        </div>

        <div
          className="border-2 border-dashed border-indigo-300 rounded-2xl p-10 text-center bg-indigo-50/30 cursor-pointer hover:bg-indigo-50 transition-colors mb-6"
          onClick={() => fileRef.current?.click()}
        >
          <div className="text-5xl mb-3">📄</div>
          <div className="font-black text-indigo-600">Click to upload CSV File</div>
          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">
            Supports .csv only
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFile}
          />
        </div>

        {bulkPreview.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <div className="font-extrabold text-sm text-emerald-600 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-xs">
                ✓
              </span>
              {bulkPreview.length} records ready to import
            </div>
            <div className="max-h-52 overflow-auto bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100">
              {bulkPreview.slice(0, 5).map((l, i) => (
                <div key={i} className="px-4 py-2.5 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">{l.name}</span>
                  <span className="text-slate-500">{l.phone}</span>
                  <span className="text-slate-400 font-medium">{l.batch}</span>
                </div>
              ))}
              {bulkPreview.length > 5 && (
                <div className="px-4 py-2 text-[10px] text-slate-400 font-bold uppercase bg-white/50">
                  + {bulkPreview.length - 5} more records
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button variant="ghost" size="sm" onClick={() => setBulkPreview([])}>
                Clear
              </Button>
              <Button variant="success" size="sm" onClick={confirmBulkImport}>
                Confirm Import
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={modal === "detail" && !!selected}
        onClose={() => {
          setModal(null);
          setSelected(null);
        }}
        title={`👤 ${selected?.name}`}
        width={640}
      >
        {selected && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Age", v: selected.age },
                { k: "Phone", v: selected.phone },
                { k: "Email", v: selected.email || "—" },
                { k: "Batch", v: selected.batch },
                { k: "Sharing", v: selected.sharing },
                { k: "Tag", v: selected.tag },
                { k: "Total Package", v: `₹${selected.total.toLocaleString()}` },
                { k: "Advance Paid", v: `₹${selected.advance.toLocaleString()}` },
                { k: "Balance Due", v: `₹${(selected.total - selected.advance).toLocaleString()}` },
                { k: "Follow-up", v: selected.followUp || "—" },
              ].map((item) => (
                <div key={item.k} className="bg-slate-50 p-3 rounded-xl">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {item.k}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">{item.v}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                Update Status
              </label>
              <Select
                value={selected.status}
                onChange={(e) => {
                  const s = e.target.value as LeadStatus;
                  updateLead(selected.id, { status: s });
                  setSelected({ ...selected, status: s });
                  showToast("Status updated");
                }}
              >
                {Object.keys(STATUS_CONFIG).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </div>

            {selected.notes && (
              <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-300">
                <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">
                  Manager Notes
                </div>
                <p className="text-sm text-amber-900 font-medium italic">"{selected.notes}"</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
              <Button variant="whatsapp" onClick={() => openWhatsApp(selected)}>
                💬 WhatsApp
              </Button>
              <Button variant="email" onClick={() => sendEmail(selected)}>
                📧 Email Bill
              </Button>
              <Button variant="call" onClick={() => callLead(selected)}>
                📞 Call
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="ml-auto"
                onClick={() => deleteLead(selected.id)}
              >
                🗑 Remove Lead
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
