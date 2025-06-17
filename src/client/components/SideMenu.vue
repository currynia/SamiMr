<template>
  <Menu
    data-bg="surface"
    :model="items"
    :pt="{
      root: {
        class: ' pr-0 pl-5 pd-5 border-r bg-surface-500 dark:bg-surface-dark-500',
      },
      item: {
        class: 'hover:bg-surface-600 dark:hover:bg-surface-dark-400 p-3 pr-0 max-w-3/4 rounded-xl',
      },
      separator: {
        class: 'h-1 border-t border-black -ml-5 mt-3',
      },
      submenuLabel: { class: 'mt-3' },
    }"
  >
    <template #submenuheader="{ item }">
      <span class="text-primary font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
      <a v-bind="props.action">
        <span type="submit" :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end> </template>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "primevue/menu";
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
