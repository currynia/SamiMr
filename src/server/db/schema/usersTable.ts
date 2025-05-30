import type { DB } from "@/db/types";

export async function createUserTableIfNotExists(db : DB) {
  db.none(` CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
  );`)
}
