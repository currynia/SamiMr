<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import IconApp from "./IconApp.vue";
import { ref } from "vue";

const darkModeIcon = ref("pi pi-moon");
function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
  if (darkModeIcon.value === "pi pi-moon") {
    darkModeIcon.value = "pi pi-sun";
  } else if (darkModeIcon.value === "pi pi-sun") {
    darkModeIcon.value = "pi pi-moon";
  }
}
</script>

<template>
  <Toolbar
    :pt="{
      root: {
        class: 'border-none',
      },
    }"
  >
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
