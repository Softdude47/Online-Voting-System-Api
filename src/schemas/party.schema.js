import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  serial,
  boolean,
} from "drizzle-orm/pg-core";
import { User } from "./user.schema.js";
import { sql } from "drizzle-orm";

export const Party = pgTable("parties", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  initials: varchar("initials", { length: 50 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
  firstCandidateId: uuid("first_candidate_id")
    .notNull()
    .unique()
    .references(() => User.id),
  secondCandidateId: uuid("second_candidate_id")
    .notNull()
    .unique()
    .references(() => User.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  status: boolean("status").default(true),
});
