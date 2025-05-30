import { registerModel } from "../model/authModel";
import type { DB } from "../types";

export const registerController = async (db :DB, username:string, password:string) => {
  //to add hashing
    await registerModel(db, username, password);
}
