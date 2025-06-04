import { ref, type Ref } from "vue";
import type { Comment } from "./comment";

export class PostComment {
  postId: number;
  comments: Ref<Map<number, Comment>> = ref(new Map<number, Comment>());

  constructor(postId: number) {
    this.postId = postId;
  }

  addComment(c: Comment) {
    const curMap: Map<number, Comment> = this.comments.value;
    curMap.set(c.commentId!, c);
    this.comments.value = new Map(curMap);
  }

}
