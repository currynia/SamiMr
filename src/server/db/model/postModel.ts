import type { IDatabase } from "pg-promise";


export const savePostModel = (
  db: IDatabase<unknown>,
  authorId: number,
  title: string,
  body: string,
  dateTime: Date) => {

  return db.none(
    `
    INSERT INTO posts (author_id, title, body, created_at)
    VALUES ($1, $2, $3, $4)
    `,
    [authorId, title, body, dateTime]);
};
