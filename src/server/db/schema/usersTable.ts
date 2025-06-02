import type { IDatabase } from "pg-promise";

export async function createUserTableIfNotExists(db:IDatabase<unknown>) {
  db.none(` CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
  );`);
}
