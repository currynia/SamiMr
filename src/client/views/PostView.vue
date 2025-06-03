<script setup lang="ts">
import type Post from "@/components/posts/post";
import PostFull from "@/components/posts/PostFull.vue";
import PostsManager from "@/components/posts/postsManager";
import { defineAsyncComponent, ref, useTemplateRef, type Ref } from "vue";
import { Comment } from "@/components/comments/comment";
import type { CommentDto } from "@dto/commentDto";

const PopUpBox = defineAsyncComponent(() => import("@/components/PopUpBox.vue"));
const postsManager = PostsManager.getPostManager();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");

const displayPost: Post = postsManager.getViewPost();
const savePostCallback = async (s: { title: string; body: string }) => {
  const comment: Comment = new Comment(displayPost.postId!, s.body, 1);
  const res: Response = await fetch("/api/post/savecomment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  const data: CommentDto = await res.json();
  comment.commentId = data.commentId;
};

const isPopUpBoxVisible: Ref<boolean> = ref(false);
</script>

<template>
  <PostFull
    :display-post="displayPost"
    @start-comment="
      isPopUpBoxVisible = true;
      popUpBox?.setVisible(true);
    "
  />
  <PopUpBox
    v-if="isPopUpBoxVisible"
    ref="popUpBox"
    :save-handler-callback="savePostCallback"
    box-type="comment"
  />
</template>
