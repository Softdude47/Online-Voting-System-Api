import { and, eq } from "drizzle-orm";
import db from "../configs/db.js";
import { User } from "../schemas/user.schema.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import HttpError from "../utils/error.js";

export const getUser = async (userInfo, many = false) => {
  const matches = await db.query.User.findMany({
    where: userInfo,
    with: {
      vote: true,
    },
  });

  if (matches.length < 1) {
    throw new HttpError(404, "user not found");
  }
  return many ? matches : matches[0];
};

export const createUser = async (userInfo) => {
  userInfo.password = await hashPassword(userInfo.password);
  return await db.insert(User).values(userInfo).returning();
};

export const updateUser = async (userInfo, updateInfo) => {
  if (updateInfo.password) {
    updateInfo.password = await hashPassword(updateInfo.password);
  }

  return await db
    .update(User)
    .set(updateInfo)
    .where(
      and(
        ...Object.entries(userInfo).map(([key, value]) => eq(User[key], value)),
      ),
    )
    .returning();
};
