<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import IconApp from "./IconApp.vue";
import { darkModeIcon, toggleDarkMode } from "@/util";
import { InputText } from "primevue";
</script>

<template>
  <Toolbar
    data-bg="surface"
    :pt="{
      root: {
        class:
          'flex flex-row pl-5 pr-6 pt-1 border-b items-center gap-40 bg-surface-600 dark:bg-surface-dark-600',
      },
      start: { class: 'grid grid-cols-[20%_80%] gap-3' },
      center: { class: 'grow' },
      end: {
        class: ' ml-auto ',
      },
    }"
  >
    <template #start>
      <IconApp />
      <span class="text-xl mb-auto mt-auto font-semibold">SamiMr</span>
    </template>
    <template #center>
      <div class="p-1 pl-3 outline-1 rounded-xl bg-surface-200 dark:bg-surface-dark-400">
        <InputIcon class="flex flex-row items-center-safe gap-3 pr-1">
          <i class="pi pi-search" />

          <InputText class="outline-0 grow" placeholder="Search" />
        </InputIcon>
      </div>
    </template>
    <template #end>
      <Button @click="$router.push('/auth/login')" label="Login" />
      <Button @click="$router.push('/auth/register')" label="Sign up" />
      <i :class="darkModeIcon" @click="toggleDarkMode()"></i>
    </template>
  </Toolbar>
</template>
