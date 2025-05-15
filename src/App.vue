<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Button from "primevue/button";
import { ref, type Ref } from 'vue';
import Post from "./posts/Post"
import PostsManager from './posts/PostsManager';
import { useTemplateRef } from 'vue'
import { defineAsyncComponent } from 'vue'
const PopUpBox = defineAsyncComponent(() => import('./posts/PopUpBox.vue'))
const posts : Ref<Post[]>  = PostsManager.getPosts()
const popUpBox = useTemplateRef<typeof PopUpBox>('popUpBox')

</script>


<template>
  <header>
    <div class="wrapper">
      <PopUpBox ref="popUpBox"/>
      <Button @click="popUpBox?.setVisible(true)" label="l" />
      <li v-for="post in posts" :key="post.text">
        {{ post.text }}
      </li>
    </div>
  </header>

</template>
