<script setup lang="ts">
import type Post from "./post";
import Card from "primevue/card";
import { Button } from "primevue";
interface Props {
  post: Post;
  isFullPost?: boolean;
}
const props = defineProps<Props>();
const now = new Date();
const pDate = new Date(props.post.dateTime);
const postHoursAgo = Math.round(Math.abs(now.getTime() - pDate.getTime()) / (1000 * 60 * 60));
defineEmits(["startComment"]);
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
        <span>{{ post.authorName }}</span>
        <p class="text-slate-500 text-x font-light">{{ postHoursAgo }} hours ago</p>
      </div>
    </template>
    <template #subtitle>
      {{ post.title }}
    </template>
    <template #footer v-if="props.isFullPost">
      <div class="w-fit ml-auto">
        <Button label="Comment" severity="secondary" @click="$emit('startComment')" />
      </div>
    </template>
    <template #content>
      <div v-html="post.body" class="postContent"></div>
    </template>
  </Card>
</template>
