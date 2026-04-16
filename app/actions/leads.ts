"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Lead, LeadStatus, LeadTag, RoomSharing } from "@/lib/lead-types";
import { revalidatePath } from "next/cache";
import { SEED_LEADS } from "@/lib/constants";

// Map DB lead to UI lead (Supabase uses sneak_case for database columns)
const mapLead = (l: any): Lead => ({
  id: l.id,
  name: l.name,
  age: l.age ?? "",
  phone: l.phone,
  email: l.email,
  sharing: l.sharing as RoomSharing,
  batch: l.batch,
  status: l.status as LeadStatus,
  advance: l.advance ?? 0,
  total: l.total ?? 0,
  notes: l.notes,
  tag: l.tag as LeadTag,
  followUp: l.follow_up, // Mapping snake_case from DB to camelCase for UI
  createdAt: l.created_at,
});

// Map UI lead to DB lead
const toDB = (data: Partial<Lead>) => {
  const dbData: any = { ...data };
  if (data.followUp !== undefined) {
    dbData.follow_up = data.followUp;
    delete dbData.followUp;
  }
  if (data.age === "") dbData.age = null;
  return dbData;
};

export async function getLeads(): Promise<Lead[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch failed, falling back to seed data:", error.message);
    return SEED_LEADS;
  }

  return (data || []).map(mapLead);
}

export async function addLead(data: Omit<Lead, "id">) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: newLead, error } = await supabase
    .from("leads")
    .insert([toDB(data)])
    .select()
    .single();

  if (error) {
    console.error("Failed to add lead to Supabase:", error.message);
    return { ...data, id: Date.now() } as Lead;
  }

  revalidatePath("/crm");
  return mapLead(newLead);
}

export async function updateLead(id: number, data: Partial<Lead>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: updated, error } = await supabase
    .from("leads")
    .update(toDB(data))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update lead in Supabase:", error.message);
    return { ...data, id } as Lead;
  }

  revalidatePath("/crm");
  return mapLead(updated);
}

export async function deleteLead(id: number) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("leads").delete().eq("id", id);
  
  if (error) {
    console.error("Failed to delete lead from Supabase:", error.message);
  }

  revalidatePath("/crm");
}

export async function bulkImportLeads(items: Lead[]) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const values = items.map((i) => toDB({
    name: i.name,
    age: i.age,
    phone: i.phone,
    email: i.email,
    sharing: i.sharing,
    batch: i.batch,
    status: i.status,
    advance: i.advance,
    total: i.total,
    notes: i.notes,
    tag: i.tag,
    followUp: i.followUp,
  }));

  const { error } = await supabase.from("leads").insert(values);
  
  if (error) {
    console.error("Failed bulk import to Supabase:", error.message);
  }

  revalidatePath("/crm");
}
