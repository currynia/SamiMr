<template>
  <Menu
    :model="items"
    :pt="{
      root: {
        class: ' pr-0 pl-5 pd-5 ',
      },
      item: {
        class: ' p-3 pr-0 max-w-3/4 rounded-xl hover:bg-primary-500 dark:hover:text-black',
      },
      separator: {
        class: 'h-1 border-t border-black -ml-5 mt-3',
      },
    }"
  >
    <template #item="{ item, props }">
      <a v-bind="props.action">
        <i :class="item.icon" />
        <span class="ml-2 font-bold">{{ item.label }}</span>
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
    items: [
      {
        label: "New post",
        icon: "pi pi-plus",
        command: () => {
          emit("createPost");
        },
      },
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
]);
</script>
