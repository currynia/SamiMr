<script setup lang="ts">
import { type Ref } from "vue";
import Post from "./post";
import PostsManager from "./postsManager";
import PostComponent from "./PostComponent.vue";
import { useRouter } from "vue-router";

const postsManager: PostsManager = PostsManager.getPostManager();
const posts: Ref<Post[]> = postsManager.getPosts();
const router = useRouter();
const viewFullPost = (post: Post) => {
  postsManager.setViewPost(post);
  router.push("/viewpost");
};
</script>

<template>
  <div class="wrapper" style="display: flex; flex-direction: column; width: 100%; height: 100%">
    <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%; padding: 2rem">
      <li v-for="post in posts" :key="post.body" style="list-style-type: none">
        <PostComponent :post="post" @click="viewFullPost(post)" />
      </li>
    </div>
  </div>
</template>
