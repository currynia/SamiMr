import type { PostDto } from "@dto/postDto"

class Post implements PostDto {
  title: string
  text: string
  authorName:string
  dateTime : Date
  constructor(text: string, title: string, authorName:string, dateTime: Date) {
    this.text = text;
    this.title = title;
    this.authorName = authorName;
    this.dateTime = dateTime;
  }
}

export default Post
