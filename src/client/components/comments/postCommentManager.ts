import { PostComment } from "./postComment";

export const postCommentManger = {
  function() {
    const postComments: PostComment[] = [];
    return {
      getPostComment: function (postId: number): PostComment {
        if (postComments[postId] == undefined) {
          postComments[postId] = new PostComment(postId);
        }
        return postComments[postId];
      }
    };
  }
};
