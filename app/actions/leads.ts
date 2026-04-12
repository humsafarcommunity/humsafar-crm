"use server";

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { Lead, LeadStatus, LeadTag, RoomSharing } from "@/lib/types";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { SEED_LEADS } from "@/lib/constants";

// Map DB lead to UI lead
const mapLead = (l: any): Lead => ({
  ...l,
  status: l.status as LeadStatus,
  tag: l.tag as LeadTag,
  sharing: l.sharing as RoomSharing,
  age: l.age ?? "",
});

export async function getLeads(): Promise<Lead[]> {
  try {
    const result = await db.query.leads.findMany({
      orderBy: [desc(leads.createdAt)],
    });
    return result.map(mapLead);
  } catch (error) {
    console.error("Database fetch failed, falling back to seed data:", error);
    return SEED_LEADS;
  }
}

export async function addLead(data: Omit<Lead, "id">) {
  try {
    const [newLead] = await db.insert(leads).values({
      ...data,
      age: data.age === "" ? null : Number(data.age),
    }).returning();
    
    revalidatePath("/crm");
    return mapLead(newLead);
  } catch (error) {
    console.error("Failed to add lead to DB:", error);
    return { ...data, id: Date.now() } as Lead;
  }
}

export async function updateLead(id: number, data: Partial<Lead>) {
  try {
    const [updated] = await db
      .update(leads)
      .set({
        ...data,
        age: data.age === "" ? null : data.age !== undefined ? Number(data.age) : undefined,
      })
      .where(eq(leads.id, id))
      .returning();
      
    revalidatePath("/crm");
    return mapLead(updated);
  } catch (error) {
    console.error("Failed to update lead in DB:", error);
    return { ...data, id } as Lead;
  }
}

export async function deleteLead(id: number) {
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/crm");
}

export async function bulkImportLeads(items: Lead[]) {
  const values = items.map(i => ({
    name: i.name,
    age: i.age === "" ? null : Number(i.age),
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

  await db.insert(leads).values(values);
  revalidatePath("/crm");
}
