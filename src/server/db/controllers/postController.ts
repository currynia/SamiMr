import type { PostDto } from "@root/dto/postDto";
import type { IDatabase } from "pg-promise";
import {
  getCommentsModel,
  getNewPostsAfterId,
  getOldPostsAfterId,
  getPostsByTime,
  saveCommentModel,
  savePostModel,
} from "../model/postModel";
import type { CommentDto } from "@root/dto/commentDto";
import { getUserIdFromUsername } from "../model/userModel";

export const savePostController = async (db: IDatabase<object>, post: PostDto): Promise<number> => {
  const authorId: number = await getUserIdFromUsername(db, post.authorName);
  if (!Number.isInteger(authorId)) {
    throw new TypeError(`Expected integer for authorID got ${authorId} instead`);
  }
  const body: string = post.body;
  const title: string = post.title;
  const dateTime: Date = post.dateTime;
  return savePostModel(db, authorId, title, body, dateTime);
};

export const saveCommentController = (
  db: IDatabase<object>,
  comment: CommentDto
): Promise<CommentDto> => {
  const parentPost = comment.parentPost;
  const parentComment = comment.parentComment;
  const body: string = comment.body;
  const dateTime: Date = comment.date;
  return saveCommentModel(db, parentPost, body, comment.authorId, dateTime, parentComment);
};
export const getCommentsController = (
  db: IDatabase<object>,
  postId: number
): Promise<Array<CommentDto>> => {
  return getCommentsModel(db, postId);
};

const LIMIT = 5;

export const getPostController = (
  db: IDatabase<object>,
  postId?: number,
  dateTime?: Date,
  limit?: number,
  isOld: boolean = true
): Promise<Array<PostDto>> => {
  let result: Promise<Array<PostDto>>;
  if (limit == null) {
    limit = LIMIT; //the default limit
  }
  if (postId == null || dateTime == null) {
    result = getPostsByTime(db, limit);
  } else if (isOld) {
    result = getOldPostsAfterId(db, postId, dateTime, limit);
  } else {
    result = getNewPostsAfterId(db, postId, dateTime, limit);
  }
  return result;
};
