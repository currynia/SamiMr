<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import PostFeed from "@/components/posts/PostsFeed.vue";
import Button from "primevue/button";
import { ref, useTemplateRef, defineAsyncComponent, type Ref } from "vue";
import PostsManager from "@/components/posts/postsManager";
import type { LoadFeedDto, PostDto } from "@dto/postDto";
import Post from "@/components/posts/post";
import { postJsonFetch } from "@/util";
import { setUpOnStart } from "@/startup";

const PopUpBox = defineAsyncComponent(() => import("@/components/PopUpBox.vue"));
const postsManager = PostsManager.getPostManager();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");
const isPopUpBoxVisible: Ref<boolean> = ref(false);

const savePostCallback = async (s: { title: string; body: string }) => {
  const p: PostDto = new Post(s.title, s.body, "", new Date()); //placeholder username
  postJsonFetch("/api/post/save", p);
  // // postsManager.addPostFront(p);
  // const response: Response = await postJsonFetch("/api/post/save", p);
  // // const postId: PostDto = await response.json();
  // // p.postId = postId.postId;
  // // console.log(p.postId);
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

function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
}

setUpOnStart();
</script>
<template>
  <div style="display: flex; flex-direction: column; max-height: 100%">
    <Toolbar style="width: 100vw; margin: 0">
      <template #start>
        <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
      </template>
      <template #end>
        <div style="display: block">
          <Button
            @click="
              isPopUpBoxVisible = true;
              popUpBox?.setVisible(true);
            "
            label="Create post"
          />
          <Button @click="$router.push('/auth/login')" label="Login" />
          <Button @click="$router.push('/auth/register')" label="Sign up" />
        </div>
      </template>
    </Toolbar>

    <PopUpBox
      v-if="isPopUpBoxVisible"
      ref="popUpBox"
      :save-handler-callback="savePostCallback"
      box-type="post"
    />
    <PostFeed @load-more-posts="loadMorePosts" />
  </div>
</template>
