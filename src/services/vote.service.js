import { Party } from "../schemas/party.schema.js";
import db from "../configs/db.js";
import { Vote } from "../schemas/vote.schema.js";

export const getVote = async (voteInfo, many = false) => {
  const matches = await db.query.Vote.findMany({ where: voteInfo });
  return many ? matches : matches[0];
};

export const createVote = async (voteInfo) => {
  return await db.insert(Vote).values(voteInfo).returning();
};

export const updateVote = async (voteInfo, updateInfo) => {
  return await db.update(Vote).set(updateInfo).where(voteInfo).returning();
};

export const deleteVote = async (voteInfo) => {
  return await db.delete(Vote).where(voteInfo);
};
