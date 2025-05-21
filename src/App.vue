<script setup lang="ts">
import {RouterView } from "vue-router";
import Button from "primevue/button";
import {type Ref } from "vue";
import Post from "./components/posts/Post";
import PostsManager from "./components/posts/PostsManager";
import { useTemplateRef } from "vue";
import { defineAsyncComponent } from "vue";


import Toolbar from 'primevue/toolbar';

const PopUpBox = defineAsyncComponent(() => import("./components/posts/PopUpBox.vue"));
  const postsManager : PostsManager = PostsManager.getPostManager();
const posts: Ref<Post[]> = postsManager.getPosts();
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");
function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark');
}
let isPopUpBoxVisible : boolean;

</script>

<template>

 

  <div class="wrapper" style="display:flex; flex-direction: column; width: 100%; height:100%">
   <Toolbar style="width: 100vw; margin:0;">
      <template #start>
        <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
       
      </template>

      <template #end>
        <div style="display: block;">
           <Button @click="isPopUpBoxVisible = true; popUpBox?.setVisible(true); " label="Create post" />
            <Button @click="$router.push('/auth/login')" label="Login" />
            <Button @click="isPopUpBoxVisible = true; popUpBox?.setVisible(true); " label="Sign up" />
        </div>
        
      </template>
    </Toolbar>

    <RouterView/>
  </div>

</template>
