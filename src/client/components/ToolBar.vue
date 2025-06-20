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
        class: 'flex flex-row pr-6 pt-1 items-center gap-40',
      },
      start: { class: 'block' },
      center: { class: 'grow' },
      end: {
        class: ' ml-auto ',
      },
    }"
  >
    <template #start>
      <div class="cursor-pointer" @click="$router.push('/')">
        <img src="../assets/logo.svg" class="h-20 inline-block mt-3" />
        <span class="text-xl -ml-3 mb-auto mt-auto font-semibold">SamiMr</span>
      </div>
    </template>
    <template #end>
      <Button v-if="!isAuthenticated" @click="$router.push('/auth/login')" label="Login" />
      <Button v-if="!isAuthenticated" @click="$router.push('/auth/register')" label="Sign up" />
      <i class="text-2xl" :class="darkModeIcon" @click="toggleDarkMode()"></i>
    </template>
  </Toolbar>
</template>
