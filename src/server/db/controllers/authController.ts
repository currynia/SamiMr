import { registerModel } from "../model/authModel";
import type { DB } from "../types";

export const registerController = (db :DB, username:string, password:string) => {
  try {
    registerModel(db, username, password);
  } catch(e) {
    console.log(e)

  }

}
