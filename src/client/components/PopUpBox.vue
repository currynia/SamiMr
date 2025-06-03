<script setup lang="ts">
import { ref, type Ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Editor from 'primevue/editor';
import PostsManager from "./posts/postsManager";
import Post from "./posts/post";
import type { PostDto } from "@dto/postDto";
import { InputText } from "primevue";


const body: Ref<string> = ref("");
const title: Ref<string> = ref("");
const isVisible : Ref<boolean> = ref(true);

  interface Props {
    saveHandlerCallback : (s : {title:string; body:string}) => void;
    boxType : "comment" | "post";
  }
const props = defineProps<Props>();

const onSaveClick = (s : {title:string; body:string}) => {
  isVisible.value = false;
  props.saveHandlerCallback(s);
  body.value = "";
};
const setVisible = (visible:boolean) => {
  isVisible.value = visible;
};
defineExpose({setVisible});
</script>

<template>
  <Dialog v-model:visible="isVisible" modal header="Create post" style="width:75%;height:80%"
    contentStyle="height:100%; display:flex; flex-direction:column;">
    <InputText v-model="title" type="text" size="large" placeholder="Title" v-show="boxType=='post'"/>
    <Editor style="flex-grow:1; display:flex; flex-direction: column; margin-bottom: 0.5rem;" v-model="body"
      id="postbody" />

    <div class="dialogbox-button-wrapper" style="margin-top: auto;">
      <Button type="button" label="Cancel" severity="secondary" @click="isVisible = false"></Button>
      <Button type="button" label="Save" @click="onSaveClick({title, body})"></Button>
    </div>
  </Dialog>

</template>
