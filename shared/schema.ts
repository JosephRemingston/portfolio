import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  email: true,
  message: true,
}).extend({
  email: z.string().email(),
  message: z.string().min(10),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;