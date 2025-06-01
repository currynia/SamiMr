import type { IDatabase } from "pg-promise";

export function getUserIdFromUsername(db:IDatabase<object>, username:string) : Promise<number> {
  return db.one("SELECT id FROM users WHERE username = $1 ", [username]);
}
