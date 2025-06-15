<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import IconApp from "./IconApp.vue";
import { darkModeIcon, toggleDarkMode } from "@/util";
import { InputText } from "primevue";
</script>

<template>
  <Toolbar
    :pt="{
      root: {
        class: 'flex flex-row pl-5 pr-6 pt-1 border-b items-center gap-40 bg-surface-500',
      },

      center: { class: 'grow' },
      end: {
        class: ' ml-auto ',
      },
    }"
  >
    <template #start>
      <IconApp />
    </template>
    <template #center>
      <div class="p-1 pl-3 outline-1 rounded-xl bg-gray-200">
        <InputIcon>
          <i class="pi pi-search text-stone-700" />
        </InputIcon>
        <InputText class="ml-3 text-stone-700" placeholder="Search" />
      </div>
    </template>
    <template #end>
      <Button @click="$router.push('/auth/login')" label="Login" />
      <Button @click="$router.push('/auth/register')" label="Sign up" />
      <i :class="darkModeIcon" @click="toggleDarkMode()"></i>
    </template>
  </Toolbar>
</template>
