import type { PostDto } from "@dto/postDto";
import PostsManager from "./components/posts/postsManager";

export const setUpOnStart = () => {
  loadFeedOnStartUp();
};
const loadFeedOnStartUp = async () => {
  const postsManager = PostsManager.getPostManager();
  const res: Response = await fetch("/api/post/getposts", {
    method: "GET",
  });
  const posts: Array<PostDto> = await res.json();
  postsManager.addPost(...posts);
};
