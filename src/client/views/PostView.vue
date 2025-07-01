<script setup lang="ts">
import type Post from "@/components/posts/post";
import PostsManager from "@/components/posts/postsManager";
import { defineAsyncComponent, ref, useTemplateRef, type Ref } from "vue";
import { Comment } from "@/components/comments/comment";
import { postCommentManger } from "@/components/comments/postCommentManager";
import ToolBar from "@/components/ToolBar.vue";
import PostComponent from "@/components/posts/PostComponent.vue";

const PopUpBox = defineAsyncComponent(() => import("@/components/PopUpBox.vue"));
const postsManager = PostsManager.getPostManager();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");
const displayPost: Post = postsManager.getViewPost();
const postComment = postCommentManger.function().getPostComment(displayPost.postId!);
const isPopUpBoxVisible: Ref<boolean> = ref(false);

const saveCommentCallback = async (s: { title: string; body: string }) => {
  const comment: Comment = new Comment(displayPost.postId!, s.body, 1);
  const res: Response = await fetch("/api/post/savecomment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  const data = await res.json();
  comment.commentId = data.insertcomment.commentid; //to fix
  postComment.addComment(comment);
};
</script>

<template>
  <ToolBar />

  <PostComponent
    :post="displayPost"
    :is-full-post="true"
    class="h-fit bg-primary-200 m-5 text-black"
    @start-comment="
      isPopUpBoxVisible = true;
      popUpBox?.setVisible(true);
    "
  />
  <li v-for="comments in postComment.comments.value.values()" :key="comments.commentId">
    <div v-html="comments.body"></div>
  </li>
  <PopUpBox
    v-if="isPopUpBoxVisible"
    ref="popUpBox"
    :save-handler-callback="saveCommentCallback"
    box-type="comment"
  />
</template>
