<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import IconApp from "./IconApp.vue";
import { darkModeIcon, toggleDarkMode } from "@/util";
</script>

<template>
  <Toolbar pt:root:class="border-none">
    <template #start>
      <IconApp />
    </template>
    <template #end>
      <div style="display: block">
        <Button @click="$router.push('/auth/login')" label="Login" />
        <Button @click="$router.push('/auth/register')" label="Sign up" />
        <i :class="darkModeIcon" @click="toggleDarkMode()"></i>
      </div>
    </template>
  </Toolbar>
</template>
