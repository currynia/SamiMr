import { type Request, type Response } from 'express';
import type { PostDto } from '@root/dto/postDto';
import { savePostController } from '@/db/controllers/postController';
import DBManager from '@/db/dbManager';
import type { CommentDto } from '@root/dto/commentDto';

const db = DBManager.getDBManager().db;

export const savePost = async (req : Request, res: Response) => {
  try {
    const p : PostDto = req.body;
    await savePostController(db, p);
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }

};

export const saveComment = async (req : Request, res: Response) => {
  const c : CommentDto = req.body;
  console.log(c);
  res.status(401).send();
};
