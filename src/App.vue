<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Button from "primevue/button";
import { ref, type Ref } from "vue";
import Post from "./posts/Post";
import PostsManager from "./posts/PostsManager";
import { useTemplateRef } from "vue";
import { defineAsyncComponent } from "vue";
import Card from "primevue/card";

import Toolbar from 'primevue/toolbar';

const PopUpBox = defineAsyncComponent(() => import("./posts/PopUpBox.vue"));
  const postsManager : PostsManager = PostsManager.getPostManager();
const posts: Ref<Post[]> = postsManager.getPosts();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");
function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark');
}
</script>

<template>



  <div class="wrapper" style="display:flex; flex-direction: column; width: 100%; height:100%">
    <Toolbar style="align-self: stretch;">
      <template #start>
        <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
      </template>
    </Toolbar>

    <PopUpBox ref="popUpBox" />
    <Button @click="popUpBox?.setVisible(true)" label="l" />
    <div style="display:flex; flex-direction: column; gap: 1rem; height:100%">
      <li v-for="post in posts" :key="post.text" style="list-style-type: none;">
      <Card class="postCard">
        <template #content>
          <div v-html ="post.text" class="postContent"></div>
        </template>
      </Card>
    </li>
    </div>
    
  </div>

</template>

<style scoped>
.postContent *{
  width: 100%;
  
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}

.postContent{
  width: 100%;
  max-height:20vh;
  display:inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}


</style>