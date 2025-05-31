import express from 'express';
import { savePost } from '../handler/postsHandler';

const postRouter = express.Router();

postRouter.post('/save', savePost);

export default postRouter;
