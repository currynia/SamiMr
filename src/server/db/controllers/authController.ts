import type { IDatabase } from "pg-promise";
import { registerModel } from "../model/authModel";


export const registerController = async (db :IDatabase<object>, username:string, password:string) => {
  //to add hashing
    await registerModel(db, username, password);
};
