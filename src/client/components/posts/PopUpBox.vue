<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog"
import Button from "primevue/button"
import Editor from 'primevue/editor';
import PostsManager from "./PostsManager";
import Post from "./Post";
import type { PostDto } from "@dto/postDto"

const visible = ref(false);
const setVisible = (v: boolean) => {
  visible.value = v
}
const postsManager: PostsManager = PostsManager.getPostManager();
const text = ref("");
const saveHandler = () => {
  visible.value = false
  const p: PostDto = new Post(text.value, "", "", new Date())//placeholder
  postsManager.addPost(p);
  text.value = ""
  fetch("/api/post/save",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p)
    })
}

defineExpose({ setVisible })
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Create post" style="width:75%;height:80%"
    contentStyle="height:100%; display:flex; flex-direction:column;">

    <Editor style="flex-grow:1; display:flex; flex-direction: column; margin-bottom: 0.5rem;" v-model="text"
      id="text" />

    <div class="dialogbox-button-wrapper" style="margin-top: auto;">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="saveHandler()"></Button>
    </div>


  </Dialog>

</template>
