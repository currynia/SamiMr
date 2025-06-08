<script setup lang="ts">
import { type Ref } from "vue";
import Post from "./post";
import PostsManager from "./postsManager";
import PostComponent from "./PostComponent.vue";
import { useRouter } from "vue-router";
import { postJsonFetch } from "@/util";
import type { LoadFeedDto, PostDto } from "@dto/postDto";

const postsManager: PostsManager = PostsManager.getPostManager();
const posts: Ref<Post[]> = postsManager.getPosts();
const router = useRouter();

const viewFullPost = (post: Post) => {
  postsManager.setViewPost(post);
  router.push("/viewpost");
};

const loadMorePosts = async () => {
  const lastRetrievedPost = postsManager.getLastRetrievedPost();
  const postId = lastRetrievedPost?.postId;
  const dateTime = lastRetrievedPost?.dateTime;
  const body: LoadFeedDto = { postId, dateTime };
  const res: Response = await postJsonFetch("/api/post/getposts", body);
  const posts: Array<PostDto> = await res.json();
  postsManager.addPost(...posts);
};

const onScroll = (e: Event) => {
  const { scrollTop, offsetHeight, scrollHeight } = e.target as HTMLElement;
  if (scrollTop + offsetHeight + 100 >= scrollHeight) {
    loadMorePosts();
  }
};
</script>

<template>
  <div
    @scroll="onScroll"
    style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem; overflow: auto"
  >
    <li v-for="post in posts" :key="post.body" style="list-style-type: none">
      <PostComponent :post="post" @click="viewFullPost(post)" />
    </li>
  </div>
</template>
