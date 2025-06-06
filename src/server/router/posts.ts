import express from 'express';
import { savePost, saveComment, getPosts } from '../handler/postsHandler';

const postRouter = express.Router();

postRouter.post('/save', savePost);
postRouter.post('/savecomment', saveComment);
postRouter.post('/getposts', getPosts);
export default postRouter;
