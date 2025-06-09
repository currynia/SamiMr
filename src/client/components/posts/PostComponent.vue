<script setup lang="ts">
import type Post from "./post";
import Card from "primevue/card";
interface Props {
  post: Post;
}
const props = defineProps<Props>();
const now = new Date();
const pDate = new Date(props.post.dateTime);
const postHoursAgo = Math.round(Math.abs(now.getTime() - pDate.getTime()) / (1000 * 60 * 60));
</script>

<template>
  <Card class="postCard cursor-pointer">
    <template #subtitle>
      <span>{{ post.authorName }}</span>
    </template>
    <template #title>
      {{ post.title }}
    </template>
    <template #footer>
      <div class="float-right">{{ postHoursAgo }} hours ago</div>
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
