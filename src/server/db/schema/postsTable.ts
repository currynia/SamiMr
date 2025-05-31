import type { DB } from "@/db/types";

export async function createPostsTableIfNotExists(db : DB) {
  db.none(` CREATE TABLE IF NOT EXISTS Posts (
    id PRIMARY KEY AUTO_INCREMENT,
    author_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY (author_id) REFERENCES Users(id)
  );`)
}
