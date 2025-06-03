<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import PostFeed from "@/components/posts/PostsFeed.vue";

import Button from "primevue/button";
import { ref, useTemplateRef, defineAsyncComponent, type Ref } from "vue";
import PostsManager from "@/components/posts/postsManager";
import type { PostDto } from "@dto/postDto";
import Post from "@/components/posts/post";

const PopUpBox = defineAsyncComponent(() => import("@/components/PopUpBox.vue"));
const postsManager = PostsManager.getPostManager();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");

function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
}

const savePostCallback = async (s: { title: string; body: string }) => {
  const p: PostDto = new Post(s.title, s.body, "", new Date()); //placeholder
  postsManager.addPost(p);
  const response: Response = await fetch("/api/post/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  const postId: PostDto = await response.json();
  p.postId = postId.postId;
  console.log(p.postId);
};
const isPopUpBoxVisible: Ref<boolean> = ref(false);
</script>
<template>
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
  <PostFeed />
</template>
