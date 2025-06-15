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
    class="postCard cursor-pointer"
    :pt="{
      title: { class: 'font-bold text-2xl' },
      content: {
        class: 'text-xl',
      },
      body: {
        class: 'shadow-md bg-surface-300 rounded-xl p-5 flex gap-5 flex-col hover:bg-surface-500',
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
