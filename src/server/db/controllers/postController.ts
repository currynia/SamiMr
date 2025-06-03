import type { PostDto } from "@root/dto/postDto";
import type { IDatabase } from "pg-promise";
import { savePostModel } from "../model/postModel";
import { getUserIdFromUsername } from "../model/userModel";

export const savePostController = (db: IDatabase<object>, post: PostDto) : Promise<number> => {
  // const authorId : number = await getUserIdFromUsername(db, post.authorName);
  // if (!Number.isInteger(authorId)) {
  //   throw new TypeError(`Expected integer for authorID got ${authorId} instead`)
  // }
  const body: string = post.body;
  const title: string = post.title;
  const dateTime: Date = post.dateTime;
  return savePostModel(db, 1, body, title, dateTime);
};
