import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import AuthenticationView from "@/views/AuthenticationView.vue";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/auth", component: AuthenticationView, children: [{ path: 'login', component: LoginForm }, { path: 'register', component: RegisterForm }] },
  ],
});

export default router;
