<script setup lang="ts">
import type { Comment } from "./comment";
import { Card } from "primevue";
interface Props {
  comment: Comment;
}
const props = defineProps<Props>();
</script>

<template>
  <Card
    class="postCard rounded-3xl"
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
        <!-- <span>{{ post.authorName }}</span>
        <p class="text-slate-500 text-x font-light">{{ postHoursAgo }} hours ago</p> -->
      </div>
    </template>
    <template #content>
      <div v-html="comment.body" class="postContent"></div>
    </template>
  </Card>
</template>
