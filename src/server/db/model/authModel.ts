import { type IDatabase } from "pg-promise";

export function registerModel(db: IDatabase<unknown>, username: string, password: string) {
  return db.none("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
};
