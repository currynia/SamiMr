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
  <Card
    class="postCard cursor-pointer h-full bg-secondary-100 hover:bg-secondary-200/80"
    data-bg="surface"
    :pt="{
      title: { class: 'font-bold text-tertiary-800 text-2xl' },
      content: {
        class: 'text-xl h-full',
      },
      body: {
        class: ' p-3 h-full text-wrap flex gap-5 flex-col',
      },
      subtitle: { class: 'text-slate-500' },
      footer: { class: 'w-full' },
    }"
  >
    <template #subtitle>
      <span>{{ post.authorName }}</span>
    </template>
    <template #title>
      {{ post.title }}
    </template>
    <template #footer>
      <div class="w-fit ml-auto">{{ postHoursAgo }} hours ago</div>
    </template>
    <template #content>
      <div v-html="post.body" class="postContent"></div>
    </template>
  </Card>
</template>
