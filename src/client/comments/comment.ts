import type { CommentDto } from "@dto/commentDto";
class Comment implements CommentDto {
    parentPost: number;
    parentComment: number;
    body: string;

    constructor(parentPost:number, parentComment:number, body:string) {
        this.parentPost = parentPost;
        this.parentComment = parentComment;
        this.body = body;
    }
}
