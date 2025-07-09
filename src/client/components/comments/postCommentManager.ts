import { ref } from "vue";
import type { Comment } from "./comment";
import { postJsonFetch } from "@/util";
import type { CommentDto } from "@dto/commentDto";

export const postCommentManager = {
  postComments: ref<Array<Comment>>([]),

  getComments: async function (postId: number) {
    const res: Response = await postJsonFetch("/api/public/post/getcomments", {
      postId,
    });
    const comments: Array<CommentDto> = await res.json();
    this.postComments.value = comments;
  },
};
