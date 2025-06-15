import type { PostDto } from "@dto/postDto";
import PostsManager from "./components/posts/postsManager";
import { postJsonFetch } from "./util";
import { Session } from "./session";

const postsManager = PostsManager.getPostManager();

export const setUpOnStart = async () => {
  initSession();
  await loadFeedOnStartUp();
  pollGetPosts();
};

const loadFeedOnStartUp = async () => {
  const res: Response = await fetch("/api/public/post/getposts", {
    method: "POST",
  });
  const posts: Array<PostDto> = await res.json();
  postsManager.addPost(...posts);
};

const pollGetPosts = async () => {
  const newestPost = postsManager.getNewestPost();
  const postId = newestPost?.postId;
  const dateTime = newestPost?.dateTime;
  const res: Response = await postJsonFetch("/api/public/post/poll/getposts", { postId, dateTime });
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

export const initSession = async () => {
  const res = await fetch("/api/status", { method: "GET", credentials: "same-origin" });
  const session = Session.getSessionInstance();
  if (res.status == 200) {
    session.isAuthenticated.value = true;
    const payload = await res.json();
    session.user.value = payload;
  } else {
    session.isAuthenticated.value = false;
  }
};
