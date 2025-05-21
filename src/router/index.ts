import LoginForm from "@/components/auth/LoginForm.vue";
import AuthenticationView from "@/views/AuthenticationView.vue";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/auth", component: AuthenticationView, children: [{path:'login', component:LoginForm}] },
  ],
});

export default router;
