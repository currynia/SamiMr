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
      "I am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiya Apichiya am Tay Apichiyapichiya.",
      "Tay Apichiya",
      new Date(),
      1
    ),
    new Post("hello", "I am emily.", "emily Woo", new Date(), 1),
    new Post("hello", "I am emily.", "emily Woo", new Date(), 1),
    new Post("hello", "I am emily.", "emily Woo", new Date(), 1),
    new Post("hello", "I am emily.", "emily Woo", new Date(), 1),
    new Post("hello", "I am emily.", "emily Woo", new Date(), 1),
    new Post("hello", "I am emily.", "emily Woo", new Date(), 1)
  );
}

const backgroundColor = (index: number) => ({
  "bg-secondary-500 hover:bg-secondary-600": index % 2 === 0,
  "bg-tertiary-400 hover:bg-tertiary-500": index % 2 !== 0,
  "text-black": true,
});
</script>

<template>
  <div class="block border-none max-h-full">
    <p class="text-xl font-bold ml-2 mb-2 max-h-1/16">Feeds</p>
    <div @scroll="onScroll" class="max-h-15/16 overflow-auto">
      <div v-for="(post, index) in posts" :key="post.body" class="mb-3 list-none">
        <PostComponent :class="backgroundColor(index)" :post="post" @click="viewFullPost(post)" />
      </div>
    </div>
  </div>
</template>
