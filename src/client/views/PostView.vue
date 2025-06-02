<script setup lang="ts">
import PostFull from '@/components/posts/PostFull.vue';
import PostsManager from '@/components/posts/postsManager';

console.log(PostsManager.getPostManager().getViewPost());
</script>

<template>
  <PostFull/>
</template>
