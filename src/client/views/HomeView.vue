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
const session = Session.getSessionInstance();
const savePostCallback = async (s: { title: string; body: string }) => {
  const p: PostDto = new Post(s.title, s.body, "", new Date()); //placeholder username
  postJsonFetch("/api/post/save", p);
};
</script>

<template>
  <div class="block h-full max-h-full">
    <ToolBar class="h-1/8" />
    <div class="w-full h-7/8 flex flex-row max-h-7/8 gap-3 p-3 pt-5">
      <SideMenu
        v-if="session.isAuthenticated.value"
        @create-post="
          isPopUpBoxVisible = true;
          popUpBox?.setVisible(true);
        "
        class="w-2/10 mt-6"
      />

      <PostFeed :class="{ 'w-5/8': !session.isAuthenticated.value }" class="w-3/8" />
      <div class="w-1/2 relative overflow-hidden">
        <iframe
          frameborder="0"
          scrolling="no"
          src="https://mczak.com/code/piano/pianoframe/"
          style="
            border: 1px solid #000;
            border-radius: 25px;
            overflow: hidden;
            height: 340px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          "
          width="700"
        ></iframe>
      </div>
    </div>
  </div>
  <PopUpBox
    v-if="isPopUpBoxVisible"
    ref="popUpBox"
    :save-handler-callback="savePostCallback"
    box-type="post"
  />
</template>
