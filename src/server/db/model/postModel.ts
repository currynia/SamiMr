import type { PostDto } from "@root/dto/postDto";
import type { IDatabase } from "pg-promise";


export const savePostModel = (
  db: IDatabase<unknown>,
  authorId: number,
  title: string,
  body: string,
  dateTime: Date) : Promise<number> => {

  return db.one(
    `
    INSERT INTO posts (author_id, title, body, created_at)
    VALUES ($1, $2, $3, $4) RETURNING id
    `,
    [authorId, title, body, dateTime]);
};
