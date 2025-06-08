<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";

function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
}
defineEmits<{
  createPost: [];
}>();
</script>

<template>
  <Toolbar style="width: 100vw; margin: 0">
    <template #start>
      <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
    </template>
    <template #end>
      <div style="display: block">
        <Button @click="$emit('createPost')" label="Create post" />
        <Button @click="$router.push('/auth/login')" label="Login" />
        <Button @click="$router.push('/auth/register')" label="Sign up" />
      </div>
    </template>
  </Toolbar>
</template>
