<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import PostsFeedView from '@/components/posts/PostsFeed.vue';

import Button from "primevue/button";
import {ref, useTemplateRef, defineAsyncComponent } from "vue";



const PopUpBox = defineAsyncComponent(() => import("@/components/posts/PopUpBox.vue"));

const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");

function toggleDarkMode() {
    document.documentElement.classList.toggle('my-app-dark');
}
</script>
<template>

    <Toolbar style="width: 100vw; margin:0;">
        <template #start>
            <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />

        </template>
        <template #end>
            <div style="display: block;">
                <Button @click="popUpBox?.setVisible(true);" label="Create post" />
                <Button @click="$router.push('/auth/login')" label="Login" />
                <Button @click="$router.push('/auth/register');" label="Sign up" />
            </div>
        </template>
    </Toolbar>

    <PopUpBox ref="popUpBox"/>
    <PostsFeedView />
</template>
