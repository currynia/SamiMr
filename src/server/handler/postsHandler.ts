import { type Request, type Response } from 'express';
import type { PostDto } from '@root/dto/postDto';
import { savePostController } from '@/db/controllers/postController';
import DBManager from '@/db/dbManager';

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
