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
      title: { class: 'text-xl font-bold' },
      mask: { class: 'bg-black/30' },
      root: {
        class: 'bg-surface-600 w-1/2 h-3/4 p-5 rounded-xl shadow-xl',
      },
      headerActions: { class: 'w-fit ml-auto self-start' },
      header: { class: 'mt-1 flex flex-row' },
      content: { class: 'flex flex-col gap-2 grow' },
      pcCloseButton: { root: { class: 'bg-transparent' } },
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
          class: 'bg-slate-100 rounded-xl border p-2 pl-3 ',
        },
      }"
    />
    <Editor
      :unstyled="false"
      v-model="body"
      id="postbody"
      :pt="{
        root: { class: 'grow bg-slate-100 stroke-black flex flex-col rounded-xl' },

        toolbar: { class: 'p-editor-toolbar ql-toolbar ql-snow  border rounded-t-xl' },
        content: { class: 'border-b border-r grow border-l rounded-b-xl' },
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
