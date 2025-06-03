export interface CommentDto {
  commentId?:number;
  parentPost : number;
  parentComment? : number;
  body : string;
  authorId:number;
  date : Date;
}
