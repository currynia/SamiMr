import Post from "./Post"
import { ref, type Ref } from 'vue';
class PostsManager {
    private static posts:Ref<Post[]> = ref([]);

    static addPost(post:Post) : void {
        PostsManager.posts.value.push(post);
    }

    static getPosts() : Ref<Post[]> {
        return PostsManager.posts;
    }
    
}

export default PostsManager