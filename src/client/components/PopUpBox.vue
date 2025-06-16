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
      root: { class: 'bg-surface-600 w-7/8 h-7/8 p-5' },
      headerActions: { class: 'w-fit ml-auto' },
      header: { class: 'h-1/8' },
      content: { class: 'flex flex-col h-7/8' },
    }"
  >
    <InputText
      v-model="title"
      type="text"
      size="large"
      placeholder="Title"
      v-show="boxType == 'post'"
      :unstyled="false"
    />
    <Editor
      :unstyled="false"
      v-model="body"
      id="postbody"
      :pt="{
        root: { class: 'grow bg-white stroke-black' },

        toolbar: { class: 'p-editor-toolbar ql-toolbar ql-snow  border h-1/10' },
        content: { class: 'border-b border-r border-l h-9/10' },
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
