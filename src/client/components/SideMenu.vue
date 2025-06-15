<template>
  <div class="card flex justify-content-center h-f">
    <Menu :model="items" class="w-full md:w-15rem border-none rounded-r-2xl">
      <template #start>
        <IconApp />
      </template>
      <template #submenuheader="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <a v-ripple class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          <span
            v-if="item.shortcut"
            class="ml-auto border-1 surface-border border-round primary-950 text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </a>
      </template>
      <template #end>
        <button
          v-ripple
          class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color border-noround"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2"
            shape="circle"
          />
          <span class="inline-flex flex-column">
            <span class="font-bold">Amy Elsner</span>
            <span class="text-sm">Admin</span>
          </span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "primevue/menu";
import IconApp from "./IconApp.vue";
import { darkModeIcon, toggleDarkMode } from "@/util";
const emit = defineEmits(["createPost"]);
const items = ref([
  {
    label: "Actions",
    items: [
      {
        label: "New post",
        icon: "pi pi-plus",
        command: () => {
          emit("createPost");
        },
      },
      {
        label: "Search",
        icon: "pi pi-search",
      },
    ],
  },
  {
    label: "Profile",
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
      },
      { label: "Toggle dark Mode", icon: darkModeIcon, command: toggleDarkMode },
      {
        label: "Messages",
        icon: "pi pi-inbox",
        badge: 2,
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
      },
    ],
  },
  {
    separator: true,
  },
]);
</script>
