import { type Request, type Response } from "express";
import type { LoadFeedDto, PostDto } from "@root/dto/postDto";
import {
  getCommentsController,
  getPostController,
  saveCommentController,
  savePostController,
} from "@/db/controllers/postController";
import DBManager from "@/db/dbManager";
import type { CommentDto } from "@root/dto/commentDto";

const db = DBManager.getDBManager().db;

export const savePost = async (req: Request, res: Response) => {
  try {
    const p: PostDto = req.body;
    const postId: number = await savePostController(db, p);
    res.status(200).send(postId);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

export const saveComment = async (req: Request, res: Response) => {
  try {
    const c: CommentDto = req.body;
    const savedComment: CommentDto = await saveCommentController(db, c);
    res.status(200).send(savedComment);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
export const getComments = async (req: Request, res: Response) => {
  try {
    const postId: number = req.body.postId;
    const comments: Array<CommentDto> = await getCommentsController(db, postId);
    res.status(200).send(comments);
  } catch {}
};
export const getPosts = async (req: Request, res: Response) => {
  try {
    const body: LoadFeedDto = req.body;
    const feedPost: Array<PostDto> = await getPostController(
      db,
      body?.postId,
      body?.dateTime,
      body?.limit
    );
    res.status(200).send(feedPost);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

export const pollGetPosts = async (req: Request, res: Response) => {
  let responded = false;
  const body: LoadFeedDto = req.body;
  db.connect({ direct: true })
    .then((sco) => {
      sco.client.on("notification", async () => {
        if (responded) return;
        responded = true;
        const feedPost: Array<PostDto> = await getPostController(
          db,
          body?.postId,
          body?.dateTime,
          body?.limit,
          false
        );
        res.status(200).send(feedPost);
      });

      return sco.none("LISTEN $1:name", "postchannel");
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  setTimeout(() => {
    if (!responded) {
      responded = true;
      res.status(204).end();
    }
  }, 30000);
};
