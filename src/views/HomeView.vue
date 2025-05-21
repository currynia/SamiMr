<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import { ref, type Ref } from "vue";
import Post from "../components/posts/Post";
import PostsManager from "../components/posts/PostsManager";
import { useTemplateRef } from "vue";
import { defineAsyncComponent } from "vue";
import Card from "primevue/card";

const PopUpBox = defineAsyncComponent(() => import("../components/posts/PopUpBox.vue"));
  const postsManager : PostsManager = PostsManager.getPostManager();
const posts: Ref<Post[]> = postsManager.getPosts();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");

let isPopUpBoxVisible : boolean;

</script>

<template>

 

  <div class="wrapper" style="display:flex; flex-direction: column; width: 100%; height:100%">

    <PopUpBox v-if = "isPopUpBoxVisible" ref="popUpBox" />
    
    <div style="display:flex; flex-direction: column; gap: 1rem; height:100%; padding: 2rem;">
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