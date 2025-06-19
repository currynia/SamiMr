import type { IDatabase } from "pg-promise";
import { loginModel, registerModel } from "../model/authModel";
import { bcryptCompare, bcryptHash } from "@/auth/hash";
import { sign } from "@/auth/jwt";

export const registerController = async (
  db: IDatabase<object>,
  username: string,
  password: string
) => {
  const hashed = await bcryptHash(password);
  await registerModel(db, username, hashed);
};

export const loginController = async (db: IDatabase<object>, u?: string, p?: string) => {
  if (u == undefined || p == undefined) {
    throw new Error();
  }
  const model = await loginModel(db, u);
  const { hashed, ...payload } = model;
  if (await bcryptCompare(p, hashed)) return { payload, jwt: await sign(payload) };
  throw new Error("Invalid password");
};
