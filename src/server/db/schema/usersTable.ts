import type { IDatabase } from "pg-promise";

export function createUserTableIfNotExists(db: IDatabase<unknown>) {
  return db.none(` CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  );`);
}
