<script setup lang="ts">
import { ref, type Ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Editor from "primevue/editor";
import { InputText } from "primevue";

const body: Ref<string> = ref("");
const title: Ref<string> = ref("");
const isVisible: Ref<boolean> = ref(true);

interface Props {
  saveHandlerCallback: (s: { title: string; body: string }) => void;
  boxType: "comment" | "post";
}
const props = defineProps<Props>();

const onSaveClick = (s: { title: string; body: string }) => {
  isVisible.value = false;
  props.saveHandlerCallback(s);
  body.value = "";
  title.value = "";
};
const setVisible = (visible: boolean) => {
  isVisible.value = visible;
};
defineExpose({ setVisible });
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="Create post"
    :pt="{
      title: { class: 'text-xl font-bold dark:text-white ml-1' },
      mask: { class: 'bg-black/10' },
      root: {
        class: 'w-1/2 h-3/4 p-5 rounded-xl shadow-xl bg-light-background dark:bg-dark-background',
      },
      headerActions: { class: 'w-fit ml-auto self-start' },
      header: { class: 'mb-5 flex flex-row' },
      content: { class: 'flex flex-col gap-2 grow' },
      pcCloseButton: {
        root: {
          class: '!bg-transparent cursor-pointer ',
        },
        icon: { class: 'dark:text-white dark:stroke-white text-black' },
        label: { class: 'hidden' },
      },
    }"
  >
    <InputText
      v-model="title"
      type="text"
      size="large"
      placeholder="Title"
      v-show="boxType == 'post'"
      :unstyled="false"
      :pt="{
        root: {
          class:
            'bg-light-background dark:bg-dark-background dark:text-white rounded-xl border p-2 pl-3 ',
        },
      }"
    />
    <Editor
      :unstyled="false"
      data-bg="surface"
      v-model="body"
      id="postbody"
      :pt="{
        root: {
          class:
            'grow bg-light-background dark:bg-dark-background  stroke-black dark:stroke-white flex flex-col rounded-xl dark:text-white',
        },
        toolbar: { class: 'p-editor-toolbar ql-toolbar ql-snow  border rounded-t-xl' },
        content: { class: 'border-b border-r grow border-l rounded-b-xl' },
        bold: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        italic: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        underline: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        color: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        background: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        list: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        select: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        link: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        image: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        codeBlock: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        clean: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md' },
        header: { class: 'hover:bg-black/10 dark:hover:bg-white/20 rounded-md dark:text-white' },
      }"
    />

    <div class="dialogbox-button-wrapper mt-auto">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="
          isVisible = false;
          title = '';
          body = '';
        "
      ></Button>
      <Button type="button" label="Save" @click="onSaveClick({ title, body })"></Button>
    </div>
  </Dialog>
</template>

<style>
@reference "../assets/main.css";
.ql-stroke {
  @apply stroke-[1.25];
}
.ql-color-label.ql-fill {
  @apply stroke-0;
}
.ql-picker-options {
  @apply border rounded-xl p-2 shadow-xl  bg-slate-100  dark:text-on-surface-dark dark:bg-black;
}

.ql-font .ql-picker-item .ql-selected {
  @apply hover:bg-black/10 dark:hover:bg-white/20 rounded-md;
}
.ql-picker-label {
  @apply dark:text-white dark:hover:bg-white/20 rounded-md;
}
</style>
