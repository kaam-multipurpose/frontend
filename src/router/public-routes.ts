import type {RouteRecordRaw} from "vue-router";
import LoginView from "@/views/LoginView.vue";

export const publicRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Login",
        component: LoginView,
        meta: {
            requiresAuth: false,
        }
    }
];