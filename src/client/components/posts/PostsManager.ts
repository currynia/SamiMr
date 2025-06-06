import type { PostDto } from "@dto/postDto";
import Post from "./post";
import { ref, type Ref } from 'vue';
class PostsManager {
  private posts: Ref<PostDto[]> = ref([]);
  private static manager: PostsManager;
  private viewingPost?: Post;
  private emptyPost: Post = new Post();

  addPost(...post: Array<PostDto>): void {
    for (const p of post) {
      this.posts.value.push(p);
    }
  }

  getPosts(): Ref<Post[]> {
    return this.posts;
  }

  static getPostManager(): PostsManager {
    PostsManager.manager ??= new PostsManager();
    return PostsManager.manager;
  }

  setViewPost(post: Post): void {
    this.viewingPost = post;
  }

  getViewPost(): Post {
    if (this.viewingPost != undefined) {
      return this.viewingPost;
    }
    return this.emptyPost;
  }

  getLastRetrievedPost(): PostDto {
    return this.posts.value[this.posts.value.length - 1];
  }
}

export default PostsManager;
