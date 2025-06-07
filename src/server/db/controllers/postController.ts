import type { PostDto } from "@root/dto/postDto";
import type { IDatabase } from "pg-promise";
import { getNewPostsAfterId, getOldPostsAfterId, getPostsByTime, saveCommentModel, savePostModel } from "../model/postModel";
import type { CommentDto } from "@root/dto/commentDto";
import { type Response } from "express";
export const savePostController = (db: IDatabase<object>, post: PostDto): Promise<number> => {
  // const authorId : number = await getUserIdFromUsername(db, post.authorName);
  // if (!Number.isInteger(authorId)) {
  //   throw new TypeError(`Expected integer for authorID got ${authorId} instead`)
  // }
  const body: string = post.body;
  const title: string = post.title;
  const dateTime: Date = post.dateTime;
  return savePostModel(db, 1, title, body, dateTime);
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

const LIMIT = 5;

export const getPostController = (db: IDatabase<object>, postId?: number, dateTime?: Date, limit?: number, isOld: boolean = true): Promise<Array<PostDto>> => {
  if (limit == null) {
    limit = LIMIT; //the default limit
  } if (postId == null || dateTime == null) {
    return getPostsByTime(db, limit);
  }
  if (isOld) {
    return getOldPostsAfterId(db, postId, dateTime, limit,);

  } else {
    return getNewPostsAfterId(db, postId, dateTime, limit);
  }

};

export const pollPostController = (db: IDatabase<object>, cb: Array<() => void>) => {
  return db.connect({ direct: true })
    .then(sco => {
      sco.client.on('notification', data => {
        cb.forEach(cb => cb());
        console.log(cb);
        console.log(data);
        cb.length = 0;
      });

      return sco.none('LISTEN $1:name', 'postchannel');
    })
    .catch(error => {
      console.log('Error:', error);
    });
};




