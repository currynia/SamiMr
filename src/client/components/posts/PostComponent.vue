<script setup lang="ts">
import type Post from "./post";
import Card from "primevue/card";
interface Props {
  post: Post;
}
const {} = defineProps<Props>();
</script>

<template>
  <Card class="postCard">
    <template #title>
      {{ post.title }}
    </template>
    <template #content>
      <div v-html="post.body" class="postContent"></div>
    </template>
  </Card>
</template>

<style scoped>
.postContent * {
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.postContent {
  width: 100%;
  max-height: 20vh;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
