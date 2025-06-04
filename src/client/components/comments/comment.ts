import type { CommentDto } from "@dto/commentDto";
export class Comment implements CommentDto {
  commentId?: number;
  parentPost: number;
  parentComment?: number;
  authorId: number;
  body: string;
  date: Date = new Date();
  childrenComments: Map<number, Comment> = new Map<number, Comment>();

  constructor(parentPost: number, body: string, authorId: number, commentId?: number, parentComment?: number) {
    this.parentPost = parentPost;
    this.parentComment = parentComment;
    this.body = body;
    this.commentId = commentId;
    this.authorId = authorId;
  }
}
