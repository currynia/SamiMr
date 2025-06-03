import type {Comment} from "./comment";
export class postComment {
  postId: number;
  comments: Map<number, Comment> = new Map<number, Comment>();

  constructor(postId: number) {
    this.postId = postId;
  }

  addComment(c: Comment) {
    this.comments.set(c.commentId!, c);
  }

}
