import { type Request, type Response } from 'express';
import type { LoadFeedDto, PostDto } from '@root/dto/postDto';
import { getPostController, saveCommentController, savePostController } from '@/db/controllers/postController';
import DBManager from '@/db/dbManager';
import type { CommentDto } from '@root/dto/commentDto';

const db = DBManager.getDBManager().db;

export const savePost = async (req: Request, res: Response) => {
  try {
    const p: PostDto = req.body;
    const postId: number = await savePostController(db, p);
    res.status(200).send(postId);
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }

};

export const saveComment = async (req: Request, res: Response) => {
  try {
    const c: CommentDto = req.body;
    const savedComment: CommentDto = await saveCommentController(db, c);
    res.status(200).send(savedComment);
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const body: LoadFeedDto = req.body;
    const feedPost: Array<PostDto> = await getPostController(db, body?.postId, body?.limit);
    res.status(200).send(feedPost);
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
};

