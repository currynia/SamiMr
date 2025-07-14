<script setup lang="ts">
import type Post from "@/components/posts/post";
import PostsManager from "@/components/posts/postsManager";
import { defineAsyncComponent, ref, useTemplateRef, type Ref } from "vue";
import { Comment } from "@/components/comments/comment";
import { postCommentManager } from "@/components/comments/postCommentManager";
import ToolBar from "@/components/ToolBar.vue";
import PostComponent from "@/components/posts/PostComponent.vue";
import { Session } from "@/session";
import { postJsonFetch } from "@/util";
import CommentCard from "@/components/comments/CommentCard.vue";

const PopUpBox = defineAsyncComponent(() => import("@/components/PopUpBox.vue"));
const postsManager = PostsManager.getPostManager();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");
const displayPost: Post = postsManager.getViewPost();
const postComment = postCommentManager.postComments;
const isPopUpBoxVisible: Ref<boolean> = ref(false);
const session = Session.getSessionInstance();

const saveCommentCallback = async (s: { title: string; body: string }) => {
  if (session.user.value.id != undefined) {
    const comment: Comment = new Comment(displayPost.postId!, s.body, session.user.value.id);
    await postJsonFetch("/api/post/savecomment", comment);
  }
};
postCommentManager.getComments(displayPost.postId!);
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
  <div v-for="comment in postComment" :key="comment.commentId">
    <CommentCard class="bg-secondary-200 text-black m-5" :comment="comment" />
  </div>
  <PopUpBox
    v-if="isPopUpBoxVisible"
    ref="popUpBox"
    :save-handler-callback="saveCommentCallback"
    box-type="comment"
  />
</template>
