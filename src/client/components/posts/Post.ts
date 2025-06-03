import type { PostDto } from "@dto/postDto";

class Post implements PostDto {
  postId : number;
  title: string;
  body: string;
  authorName:string;
  dateTime : Date;
  constructor(
    title: string = "",
    body: string = "",
    authorName:string= "",
    dateTime: Date = new Date(),
  postId : number = -1, ) {
    this.body = body;
    this.title = title;
    this.authorName = authorName;
    this.dateTime = dateTime;
    this.postId = postId;
  }

}

export default Post;
