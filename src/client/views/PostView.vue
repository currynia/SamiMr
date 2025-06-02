<script setup lang="ts">
import type Post from '@/components/posts/post';
import PostFull from '@/components/posts/PostFull.vue';
import PostsManager from '@/components/posts/postsManager';

console.log();
const displayPost : Post = PostsManager.getPostManager().getViewPost();
</script>

<template>
  <PostFull :display-post="displayPost"/>
</template>
