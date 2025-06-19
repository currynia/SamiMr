<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";

import { darkModeIcon, toggleDarkMode } from "@/util";
import { InputText } from "primevue";
import { Session } from "@/session";

const isAuthenticated = Session.getSessionInstance().isAuthenticated;
</script>

<template>
  <Toolbar
    data-bg="surface"
    :pt="{
      root: {
        class: 'flex flex-row pl-5 pr-6 pt-1 items-center gap-40',
      },
      start: { class: 'block' },
      center: { class: 'grow' },
      end: {
        class: ' ml-auto ',
      },
    }"
  >
    <template #start>
      <img src="../assets/logo.svg" class="h-20 inline-block mt-3" />
      <span class="text-xl -ml-3 mb-auto mt-auto font-semibold">SamiMr</span>
    </template>
    <!-- <template #center>
      <div class="p-1 pl-3 outline-1 rounded-xl">
        <InputIcon class="flex flex-row items-center-safe gap-3 pr-1">
          <i class="pi pi-search" />

          <InputText class="outline-0 grow" placeholder="Search" />
        </InputIcon>
      </div>
    </template> -->
    <template #end>
      <Button v-if="!isAuthenticated" @click="$router.push('/auth/login')" label="Login" />
      <Button v-if="!isAuthenticated" @click="$router.push('/auth/register')" label="Sign up" />
      <i class="text-2xl" :class="darkModeIcon" @click="toggleDarkMode()"></i>
    </template>
  </Toolbar>
</template>
