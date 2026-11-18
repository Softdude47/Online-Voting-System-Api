import { drizzle } from "drizzle-orm/node-postgres";
import relations from "../schemas/relations.schema.js";

export default drizzle(process.env.DATABASE_URL, { relations });
