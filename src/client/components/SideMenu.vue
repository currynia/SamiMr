<template>
  <Menu
    :model="items"
    :pt="{
      root: {
        class: ' pr-0 pl-5 pd-5 ',
      },

      itemContent: {
        class:
          'w-fit h-fit p-3 max-w-6/10 min-w-6/10 rounded-xl hover:bg-primary-500 dark:hover:text-black w-fit ',
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
