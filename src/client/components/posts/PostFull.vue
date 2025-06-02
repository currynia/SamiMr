<script setup lang="ts">
import { type Ref } from "vue";
import Post from "./post";
import Card from "primevue/card";

interface Props {
  displayPost: Post
}
const { } = defineProps<Props>();
</script>

<template>
  <Card style="margin:2rem">
    <template #title>
      {{ displayPost.title }}
    </template>
    <template #content>
      <div v-html="displayPost.body"></div>
    </template>
  </Card>
</template>
