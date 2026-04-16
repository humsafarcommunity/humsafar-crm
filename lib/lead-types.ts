export type LeadStatus = "Confirmed" | "Pending" | "Follow-up" | "Closed";
export type LeadTag = "New" | "Repeat" | "VIP" | "Lost";
export type RoomSharing = "Single" | "Double" | "Triple" | "Quad" | "5+ Sharing";

export interface Lead {
  id: number;
  name: string;
  age: number | "";
  phone: string;
  email: string;
  destination: string;
  sharing: RoomSharing;
  batch: string;
  status: LeadStatus;
  advance: number;
  total: number;
  followUp: string;
  notes: string;
  tag: LeadTag;
  createdAt?: string | Date | null;
}

export interface StatusStyle {
  color: string;
  bg: string;
  icon?: string;
}

export interface TagStyle {
  color: string;
  bg: string;
}
