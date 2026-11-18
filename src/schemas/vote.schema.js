import { pgTable, uuid, serial, integer } from "drizzle-orm/pg-core";
import { User } from "./user.schema.js";
import { Party } from "./party.schema.js";

export const Vote = pgTable("votes", {
  id: serial("id").primaryKey(),
  voterId: uuid("voter_id")
    .notNull()
    .unique()
    .references(() => User.id),
  partyId: integer("party_id")
    .notNull()
    .references(() => Party.id),
});
