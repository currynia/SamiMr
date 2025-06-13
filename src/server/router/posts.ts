import express from 'express';
import { pollGetPosts, savePost, saveComment, getPosts } from '../handler/postsHandler';

const postRouter = express.Router();

postRouter.post('/post/save', savePost);
postRouter.post('/post/savecomment', saveComment);
postRouter.post('/public/post/getposts', getPosts);
postRouter.post('/public/post/poll/getposts', pollGetPosts);
export default postRouter;
