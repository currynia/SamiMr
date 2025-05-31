import type { DB } from "../types";

export const savePostModel = (db:DB, authorName: string, title : string, body :string) => {
  db.none("",[]);
}
