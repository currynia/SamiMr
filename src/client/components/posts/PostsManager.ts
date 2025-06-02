import Post from "./post"
import { ref, type Ref } from 'vue';
class PostsManager {
    private posts:Ref<Post[]> = ref([]);
    private static manager:PostsManager;
    private viewingPost?:Post;
    private emptyPost:Post = new Post();
    addPost(post:Post) : void {

        this.posts.value.push(post);
    }

    getPosts() : Ref<Post[]> {
        return this.posts;
    }

    static getPostManager() : PostsManager {
        PostsManager.manager ??= new PostsManager();
        return PostsManager.manager;
    }

    setViewPost(post:Post) : void {
      this.viewingPost = post
    }

    getViewPost() : Post {
      if (this.viewingPost != undefined) {
         return this.viewingPost;
      }
      return this.emptyPost;
    }

}

export default PostsManager
