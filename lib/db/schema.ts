import { pgTable, serial, text, integer, doublePrecision, varchar, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age"),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  sharing: varchar("sharing", { length: 50 }).default("Double"),
  batch: text("batch"),
  status: varchar("status", { length: 50 }).default("Pending"),
  advance: doublePrecision("advance").default(0),
  total: doublePrecision("total").default(0),
  notes: text("notes"),
  tag: varchar("tag", { length: 50 }).default("New"),
  followUp: text("follow_up"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type LeadDB = typeof leads.$inferSelect;
export type NewLeadDB = typeof leads.$inferInsert;
