<script setup lang="ts">
import ToolBar from "@/components/ToolBar.vue";
import PostFeed from "@/components/posts/PostsFeed.vue";
import { ref, useTemplateRef, defineAsyncComponent, type Ref } from "vue";
import type { PostDto } from "@dto/postDto";
import Post from "@/components/posts/post";
import { postJsonFetch } from "@/util";
import SideMenu from "@/components/SideMenu.vue";
import { Session } from "@/session";

const PopUpBox = defineAsyncComponent(() => import("@/components/PopUpBox.vue"));
const popUpBox = useTemplateRef<typeof PopUpBox>("popUpBox");
const isPopUpBoxVisible: Ref<boolean> = ref(false);

const savePostCallback = async (s: { title: string; body: string }) => {
  const p: PostDto = new Post(s.title, s.body, "", new Date()); //placeholder username
  postJsonFetch("/api/post/save", p);
};

const session = Session.getSessionInstance();
</script>

<template>
  <div class="block h-full max-h-full">
    <ToolBar v-if="!session.isAuthenticated.value" />
    <div class="w-full h-full flex flex-row overflow-auto">
      <SideMenu
        v-if="session.isAuthenticated.value"
        @create-post="
          isPopUpBoxVisible = true;
          popUpBox?.setVisible(true);
        "
        class="grow-1"
      />
      <PostFeed class="flex flex-col gap-6 grow-4 m-2" />
      <div class="grow-4"></div>
    </div>
  </div>
  <PopUpBox
    v-if="isPopUpBoxVisible"
    ref="popUpBox"
    :save-handler-callback="savePostCallback"
    box-type="post"
  />
</template>
