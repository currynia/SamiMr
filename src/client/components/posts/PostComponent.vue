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
    class="postCard cursor-pointer h-full rounded-3xl"
    :pt="{
      title: { class: 'font-bold text-black text-m flex flex-row gap-2' },
      content: {
        class: 'text-l h-full mt-0.5',
      },
      body: {
        class: 'p-5 h-full text-wrap block',
      },
      subtitle: { class: 'font-bold text-black text-xl mt-3' },
      footer: { class: 'w-full' },
    }"
  >
    <template #title>
      <img src="../../assets/profile_icon.svg" class="rounded-full border-1 w-10 h-10" />
      <div class="block">
        <span>{{ post.authorName }}</span>
        <p class="text-slate-500 text-xs">{{ postHoursAgo }} hours ago</p>
      </div>
    </template>
    <template #subtitle>
      {{ post.title }}
    </template>
    <template #footer>
      <div class="w-fit ml-auto"></div>
    </template>
    <template #content>
      <div v-html="post.body" class="postContent"></div>
    </template>
  </Card>
</template>
