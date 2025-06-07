<script setup lang="ts">
import { onBeforeUnmount, onMounted, type Ref } from "vue";
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

const emit = defineEmits(["loadMorePosts"]); //to load more post when scroll to end

const onScroll = (e: Event) => {
  const { scrollTop, offsetHeight, scrollHeight } = e.target as HTMLElement;
  if (scrollTop + offsetHeight + 100 >= scrollHeight) {
    emit("loadMorePosts");
  }
};
</script>

<template>
  <div
    @scroll="onScroll"
    style="
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
      padding: 2rem;
      overflow-y: auto;
      overflow: scroll;
    "
  >
    <li v-for="post in posts" :key="post.body" style="list-style-type: none">
      <PostComponent :post="post" @click="viewFullPost(post)" />
    </li>
  </div>
</template>
