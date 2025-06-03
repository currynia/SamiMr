import express from 'express';
import { savePost, saveComment } from '../handler/postsHandler';

const postRouter = express.Router();

postRouter.post('/save', savePost);
postRouter.post('/savecomment', saveComment);
export default postRouter;
