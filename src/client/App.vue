<script setup lang="ts">
import { RouterView } from "vue-router";
import { initSession, setUpOnStart } from "./startup";

setUpOnStart();
</script>

<template>
  <RouterView />
</template>
