import Post from "./Post"
import { ref, type Ref } from 'vue';
class PostsManager {
    private  posts:Ref<Post[]> = ref([]);
    private static manager:PostsManager | null = null;
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
    
}

export default PostsManager