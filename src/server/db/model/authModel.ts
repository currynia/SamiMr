import { type IDatabase } from "pg-promise";

export function registerModel(db: IDatabase<unknown>, username: string, password: string) {
  return db.none("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
};

export function loginModel(db: IDatabase<unknown>, username: string)
  : Promise<{ hashed: string; username: string }> {

  return db.one(`SELECT username,password as hashed FROM users WHERE users.username = $1`, [username]);
}
