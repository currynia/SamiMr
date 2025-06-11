import type { PostDto } from "@dto/postDto";
import PostsManager from "./components/posts/postsManager";
import { postJsonFetch } from "./util";

const postsManager = PostsManager.getPostManager();

export const setUpOnStart = async () => {
  await loadFeedOnStartUp();
  pollGetPosts();
};

const loadFeedOnStartUp = async () => {

  const res: Response = await fetch("/api/post/getposts", {
    method: "POST",
  });
  const posts: Array<PostDto> = await res.json();
  postsManager.addPost(...posts);
};

const pollGetPosts = async () => {
  const newestPost = postsManager.getNewestPost();
  const postId = newestPost?.postId;
  const dateTime = newestPost?.dateTime;
  const res: Response = await postJsonFetch("/api/post/poll/getposts", { postId, dateTime });
  if (res.status == 502) {
    await pollGetPosts();
  } else if (res.status != 200) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await pollGetPosts();
  } else {
    const posts: Array<PostDto> = await res.json();
    postsManager.addPostFront(...posts);
    await pollGetPosts();
  }
};
