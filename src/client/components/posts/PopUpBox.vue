<script setup lang="ts">
import { ref, type Ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Editor from 'primevue/editor';
import PostsManager from "./postsManager";
import Post from "./post";
import type { PostDto } from "@dto/postDto";
import { InputText } from "primevue";
const visible = ref(false);
const setVisible = (v: boolean) => {
  visible.value = v;
};
const postsManager: PostsManager = PostsManager.getPostManager();
const body: Ref<string> = ref("");
const title: Ref<string> = ref("");
const saveHandler = () => {
  visible.value = false;
  const p: PostDto = new Post(body.value, title.value, "", new Date());//placeholder
  postsManager.addPost(p);
  body.value = "";
  fetch("/api/post/save",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p)
    });
};

defineExpose({ setVisible });
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Create post" style="width:75%;height:80%"
    contentStyle="height:100%; display:flex; flex-direction:column;">
    <InputText v-model="title" type="text" size="large" placeholder="Title" />
    <Editor style="flex-grow:1; display:flex; flex-direction: column; margin-bottom: 0.5rem;" v-model="body"
      id="postbody" />

    <div class="dialogbox-button-wrapper" style="margin-top: auto;">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="saveHandler()"></Button>
    </div>


  </Dialog>

</template>
