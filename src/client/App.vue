<script setup lang="ts">
import { RouterView } from "vue-router";
import { setUpOnStart } from "./startup";

setUpOnStart();
</script>

<template>
  <RouterView />
</template>
