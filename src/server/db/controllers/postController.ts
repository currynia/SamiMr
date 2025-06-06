import type { PostDto } from "@root/dto/postDto";
import type { IDatabase } from "pg-promise";
import { getPostFromId, getPostFromStart, saveCommentModel, savePostModel } from "../model/postModel";
import type { CommentDto } from "@root/dto/commentDto";

export const savePostController = (db: IDatabase<object>, post: PostDto): Promise<number> => {
  // const authorId : number = await getUserIdFromUsername(db, post.authorName);
  // if (!Number.isInteger(authorId)) {
  //   throw new TypeError(`Expected integer for authorID got ${authorId} instead`)
  // }
  const body: string = post.body;
  const title: string = post.title;
  const dateTime: Date = post.dateTime;
  return savePostModel(db, 1, body, title, dateTime);
};

export const saveCommentController = (db: IDatabase<object>, comment: CommentDto): Promise<CommentDto> => {
  // const authorId : number = await getUserIdFromUsername(db, post.authorName);
  // if (!Number.isInteger(authorId)) {
  //   throw new TypeError(`Expected integer for authorID got ${authorId} instead`)
  // }
  const parentPost = comment.parentPost;
  const parentComment = comment.parentComment;
  const body: string = comment.body;
  const dateTime: Date = comment.date;
  //const authorId
  return saveCommentModel(db, parentPost, body, 1, dateTime, parentComment);
};

export const getPostController = (db: IDatabase<object>, postId?: number, limit?: number): Promise<Array<PostDto>> => {
  if (limit == null) {
    limit = 5; //the default limit
  } if (postId == null) {
    return getPostFromStart(db, limit);
  }
  return getPostFromId(db, limit, postId);

};


