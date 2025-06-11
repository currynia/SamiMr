<script setup lang="ts">
import ToolBar from "@/components/ToolBar.vue";
import PostFeed from "@/components/posts/PostsFeed.vue";
import { ref, useTemplateRef, defineAsyncComponent, type Ref } from "vue";
import type { PostDto } from "@dto/postDto";
import Post from "@/components/posts/post";
import { postJsonFetch } from "@/util";
import { setUpOnStart } from "@/startup";
import SideMenu from "@/components/SideMenu.vue";

const PopUpBox = defineAsyncComponent(() => import("@/components/PopUpBox.vue"));
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");
const isPopUpBoxVisible: Ref<boolean> = ref(false);

const savePostCallback = async (s: { title: string; body: string }) => {
  const p: PostDto = new Post(s.title, s.body, "", new Date()); //placeholder username
  postJsonFetch("/api/post/save", p);
};

setUpOnStart();
</script>

<template>
  <div class="flex flex-col h-full max-h-full">
    <ToolBar />
    <div class="grow flex flex-row overflow-auto">
      <SideMenu
        @create-post="
          isPopUpBoxVisible = true;
          popUpBox?.setVisible(true);
        "
      />
      <PostFeed class="grow" />
    </div>
  </div>
  <PopUpBox
    v-if="isPopUpBoxVisible"
    ref="popUpBox"
    :save-handler-callback="savePostCallback"
    box-type="post"
  />
</template>
