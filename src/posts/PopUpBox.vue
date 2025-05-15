<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog"
import Button from "primevue/button"

import InputText from 'primevue/inputtext';
import PostsManager from "./PostsManager";
import Post from "./Post";
const visible = ref(false);
const setVisible = (v:boolean) => { 
    visible.value = v
}

const text = ref("");
const saveHandler = () => {
    visible.value = false
    PostsManager.addPost(new Post(text.value));
    text.value = ""
}

defineExpose({setVisible})
</script>

<template>

    <div class="card flex justify-center">
       
        <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Input text</span>
            <div class="flex items-center gap-4 mb-4">
                <InputText v-model="text" id="text" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="saveHandler()"></Button>
            </div>
        </Dialog>
    </div>
</template>

