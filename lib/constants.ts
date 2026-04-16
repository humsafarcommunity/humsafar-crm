import { Lead, LeadStatus, StatusStyle, TagStyle, LeadTag } from "./lead-types";

export const SEED_LEADS: Lead[] = [
  { id: 1, name: "Pragya Chandrakar", age: 24, phone: "6263333632", email: "pragya@email.com", sharing: "Double", batch: "07 Dec 2024", status: "Confirmed", advance: 3000, total: 6500, followUp: "2024-12-01", notes: "Excited for Manali trip", tag: "Repeat" },
  { id: 2, name: "Raj Deshmukh", age: 28, phone: "9827304482", email: "raj@email.com", sharing: "Double", batch: "07 Dec 2024", status: "Pending", advance: 1500, total: 6500, followUp: "2024-12-02", notes: "Waiting for payment", tag: "New" },
  { id: 3, name: "Vamshi Manthati", age: 24, phone: "8179392940", email: "vamshi@email.com", sharing: "Quad", batch: "07 Dec 2024", status: "Confirmed", advance: 5000, total: 5500, followUp: "", notes: "Full payment done", tag: "VIP" },
  { id: 4, name: "Piyush Raygor", age: 21, phone: "9974655208", email: "piyush@email.com", sharing: "Quad", batch: "07 Dec 2024", status: "Pending", advance: 0, total: 5500, followUp: "2024-12-03", notes: "No advance yet", tag: "New" },
  { id: 5, name: "Harshita Malviya", age: 24, phone: "9424534714", email: "harshita@email.com", sharing: "Quad", batch: "14 Dec 2024", status: "Confirmed", advance: 6000, total: 6000, followUp: "", notes: "Fully paid", tag: "Repeat" },
  { id: 6, name: "Pranav Bhatnagar", age: 21, phone: "7982371968", email: "pranav@email.com", sharing: "Quad", batch: "14 Dec 2024", status: "Follow-up", advance: 2000, total: 6500, followUp: "2024-12-10", notes: "Call tomorrow", tag: "New" },
  { id: 7, name: "Bhavesh Joshi", age: 20, phone: "7987811026", email: "bhavesh@email.com", sharing: "Quad", batch: "14 Dec 2024", status: "Closed", advance: 0, total: 5500, followUp: "", notes: "Cancelled trip", tag: "Lost" },
  { id: 8, name: "Suraj Jain", age: 25, phone: "9986619282", email: "suraj@email.com", sharing: "Triple", batch: "21 Dec 2024", status: "Confirmed", advance: 7000, total: 7000, followUp: "", notes: "Full payment", tag: "VIP" },
  { id: 9, name: "Omdev Yadav", age: 24, phone: "7987106336", email: "omdev@email.com", sharing: "Quad", batch: "21 Dec 2024", status: "Pending", advance: 2500, total: 6000, followUp: "2024-12-15", notes: "Partial advance", tag: "New" },
  { id: 10, name: "Tushar Mehta", age: 26, phone: "7838983565", email: "tushar@email.com", sharing: "Quad", batch: "28 Dec 2024", status: "Confirmed", advance: 8000, total: 8000, followUp: "", notes: "Rafting add-on booked", tag: "VIP" },
];

export const ITINERARY_TEMPLATE = `🏔️ *HUMSAFAR COMMUNITY — MANALI TRIP*
━━━━━━━━━━━━━━━━━━━━━━━

📅 *Day 1 — Departure*
🚌 Board AC Volvo from Bhopal
Night travel — Stay in bus

📅 *Day 2 — Manali Arrival*
🏨 Check-in Hotel | Freshen Up
🌊 Solang Valley | Snow Activities
🍽️ Dinner at hotel

📅 *Day 3 — Adventure Day*
🏔️ Rohtang Pass / Atal Tunnel
❄️ Snow Point | Sightseeing
🔥 Bonfire Night

📅 *Day 4 — Kasol / Return*
🌿 Kheerganga Trek option
🌙 Return bus departure

📅 *Day 5 — Back Home*
🏠 Reach Bhopal by morning

━━━━━━━━━━━━━━━━━━━━━━━
✅ *Inclusions:* Travel | Hotel | Meals
❌ *Exclusions:* Personal expenses
💰 *Amount:* ₹{amount}
📞 *Contact:* 9876543210
🌐 humsafarcommunity.com`;

export const STATUS_CONFIG: Record<LeadStatus, StatusStyle> = {
  Confirmed: { color: "#10b981", bg: "#d1fae5", icon: "✓" },
  Pending: { color: "#f59e0b", bg: "#fef3c7", icon: "⏳" },
  "Follow-up": { color: "#6366f1", bg: "#e0e7ff", icon: "📞" },
  Closed: { color: "#ef4444", bg: "#fee2e2", icon: "✗" },
};

export const TAG_CONFIG: Record<LeadTag, TagStyle> = {
  New: { color: "#3b82f6", bg: "#dbeafe" },
  Repeat: { color: "#8b5cf6", bg: "#ede9fe" },
  VIP: { color: "#f59e0b", bg: "#fef3c7" },
  Lost: { color: "#6b7280", bg: "#f3f4f6" },
};
