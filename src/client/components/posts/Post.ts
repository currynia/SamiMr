import type { PostDto } from "@dto/postDto";

class Post implements PostDto {
  title: string;
  body: string;
  authorName:string;
  dateTime : Date;
  constructor(title: string = "", body: string = "", authorName:string= "", dateTime: Date = new Date()) {
    this.body = body;
    this.title = title;
    this.authorName = authorName;
    this.dateTime = dateTime;
  }

}

export default Post;
