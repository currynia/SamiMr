import type { CommentDto } from "@dto/commentDto";
export class Comment implements CommentDto {
  commentId: number;
  parentPost: number;
  parentComment?: number;
  body: string;

  constructor(parentPost: number, parentComment: number, body: string, commentId: number = -1) {
    this.parentPost = parentPost;
    this.parentComment = parentComment;
    this.body = body;
    this.commentId = commentId;
  }
}
