<script setup lang="ts">
import {type Ref } from "vue";
import Post from "./Post";
import PostsManager from "./PostsManager";
import Card from "primevue/card";

  const postsManager : PostsManager = PostsManager.getPostManager();
const posts: Ref<Post[]> = postsManager.getPosts();
</script>

<template>
  <div class="wrapper" style="display:flex; flex-direction: column; width: 100%; height:100%">
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
