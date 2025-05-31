import { type Request, type Response } from 'express';
import type { PostDto } from '@root/dto/postDto';

export const savePost = (req : Request, res: Response) => {
  const p : PostDto = req.body
}
