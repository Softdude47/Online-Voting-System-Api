import {
  uuid,
  pgTable,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  isAdmin: boolean("is_admin").default(false),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login")
    .$onUpdate(() => new Date())
    .notNull(),
});
