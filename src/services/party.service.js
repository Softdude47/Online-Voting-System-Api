import { Party } from "../schemas/party.schema.js";
import db from "../configs/db.js";
import { and, eq } from "drizzle-orm";

export const getParty = async (partyInfo, many = false) => {
  const matches = partyInfo
    ? await db.query.Party.findMany({ where: partyInfo })
    : await db.select().from(Party);

  return many ? matches : matches[0];
};

export const createParty = async (partyInfo) => {
  return await db.insert(Party).values(partyInfo).returning();
};

export const updateParty = async (partyInfo, updateInfo) => {
  return await db
    .update(Party)
    .set(updateInfo)
    .where(
      and(
        ...Object.entries(partyInfo).map(([key, value]) =>
          eq(Party[key], value),
        ),
      ),
    )
    .returning();
};

export const deleteParty = async (partyInfo) => {
  return await db
    .update(Party)
    .set({ status: false })
    .where(
      and(
        ...Object.entries(partyInfo).map(([key, value]) =>
          eq(Party[key], value),
        ),
      ),
    )
    .returning();
};
