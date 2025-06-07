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

  addPostFront(...post: Array<PostDto>): void {
    for (const p of post) {
      this.posts.value.unshift(p);
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

  getLastRetrievedPost(): PostDto | undefined {
    return this.posts.value[this.posts.value.length - 1];
  }

  getNewestPost(): PostDto | undefined {
    console.log("ASDASDASD");
    console.log(this.posts.value.length);
    return this.posts.value.slice(0, 1)[0];
  }
}

export default PostsManager;
