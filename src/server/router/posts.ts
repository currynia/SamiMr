import express from 'express';
import { pollGetPosts, savePost, saveComment, getPosts } from '../handler/postsHandler';

const postRouter = express.Router();

postRouter.post('/save', savePost);
postRouter.post('/savecomment', saveComment);
postRouter.post('/getposts', getPosts);
postRouter.post('/poll/getposts', pollGetPosts);
export default postRouter;
