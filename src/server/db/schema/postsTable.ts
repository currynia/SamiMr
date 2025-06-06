import type { IDatabase } from "pg-promise";


export function createPostsTableIfNotExists(db: IDatabase<unknown>) {
  return db.none(` CREATE TABLE IF NOT EXISTS Posts (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Users(id)
  );`);
}
