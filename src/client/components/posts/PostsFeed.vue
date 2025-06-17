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

console.log(import.meta.env.MODE);
if (import.meta.env.MODE == "development") {
  postsManager.addPost(
    new Post("hello", "I am emily.", "emily Woo", new Date(), 1),
    new Post(
      "Kranji Primary School",
      "I am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya.",
      "Tay Apichiya",
      new Date(),
      1
    )
  );
}
</script>

<template>
  <div @scroll="onScroll" class="overflow-auto">
    <li v-for="post in posts" :key="post.body" class="max-h-7/8 list-none border-b-1 border-r-1">
      <PostComponent :post="post" @click="viewFullPost(post)" />
    </li>
  </div>
</template>
