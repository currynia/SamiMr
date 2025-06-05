import type { IDatabase } from "pg-promise";
import { registerModel } from "../model/authModel";
import { bcryptHash } from "@/auth/hash";

export const registerController = async (db: IDatabase<object>, username: string, password: string) => {
  const hashed = await bcryptHash(password);
  await registerModel(db, username, hashed);
};
